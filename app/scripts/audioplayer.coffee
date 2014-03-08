#! angular-audio-player v0.2.1 | date: 29-01-2014 

###
USEFUL LINKS:
Media events on <audio> and <video> tags:
https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Media_events
Properties and Methods:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

Understanding TimeRanges objects:
http://html5doctor.com/html5-audio-the-state-of-play/

Wonderful documentation from MDN, really.
###
angular.module("audioPlayer", []).directive "audioPlayer", [
  "$rootScope"
  "$log"
  "$interpolate"
  "$timeout"
  "throttle"
  ($rootScope, $log, $interpolate, $timeout, throttle) ->
    
    ###
    @usage: new AudioPlayer(element, scope, [playlist], [options]);
    
    @param {jqLite/jQuery element} element the DOM element the directive is attached to
    @param {angular Scope} [scope] scope in which call $apply, it could even be $rootScope (untested!)
    @param {Array} playlist an Array made of audioElements (refer to documentation)
    ###
    AudioPlayer = (element, scope, playlist, options) ->
      return new AudioPlayer(element, scope, playlist, options)  unless this instanceof AudioPlayer
      options = options or {}
      playlist = playlist or []
      angular.extend this,
        _element: element
        _audioTag: element[0]
        _scope: scope
        _playlist: playlist
        
        # general properties
        name: options.name or "audioplayer"
        playing: false
        currentTrack: 0
        tracks: playlist.length
        
        # <audio> properties
        volume: element[0].volume
        muted: element[0].muted
        duration: element[0].duration
        currentTime: element[0].currentTime
        
        # TimeRanges structures
        buffered: element[0].buffered
        played: element[0].played
        seekable: element[0].seekable
        
        # formatted properties
        formatDuration: ""
        formatTime: ""
        loadPercent: 0
        
        # aliases
        position: element[0].currentTime

      
      # bind listeners on <audio> events, will be broadcasted on specific `scope`
      # the function returs a de-registering function, that will be bound on _unbindListeners
      @_unbindListeners = @_bindListeners(scope)
      return

    AudioPlayer:: =
      
      ###
      @usage load([audioElement], [autoplayNext]);
      
      @param  {audioElement Obj} audioElement a single audioElement, may contain multiple <source>(s)
      @param  {boolean} autoplayNext flag to autostart loaded element
      ###
      load: (audioElement, autoplayNext) ->
        if typeof audioElement is "boolean"
          autoplayNext = audioElement
          audioElement = null
        else if typeof audioElement is "object"
          @_clearAudioList()
          @_addAudioList audioElement
        @_scope.$emit @name + ":load", autoplayNext
        @_audioTag.load()
        if autoplayNext
          self = this
          self._element.bind "canplaythrough", (evt) ->
            self.play()
            self._element.unbind "canplaythrough"
            return

        return

      
      ###
      @usage play([index])
      @param  {integer} index playlist index (0...n), to start playing from
      ###
      play: (index) ->
        if @_playlist.length > index
          @currentTrack = index + 1
          return @load(@_playlist[index], true)
        
        # readyState = HAVE_NOTHING (0) means there's nothing into the <audio> tag
        @currentTrack++  if not @currentTrack and @_audioTag.readyState
        @_audioTag.play()
        return

      playPause: (index) ->
        if typeof index is "number" and index + 1 isnt @currentTrack
          @play index
        else if @playing
          @pause()
        else
          @play()
        return

      pause: ->
        @_audioTag.pause()
        return

      toggleMute: ->
        @muted = @_audioTag.muted = not @_audioTag.muted
        return

      next: (autoplay) ->
        self = this
        if self.currentTrack and self.currentTrack < self.tracks
          wasPlaying = autoplay or self.playing
          self.pause()
          $timeout ->
            self._clearAudioList()
            self._addAudioList self._playlist[self.currentTrack]
            self.load wasPlaying # setup autoplay here.
            self.currentTrack++
            return

        return

      prev: (autoplay) ->
        self = this
        if self.currentTrack and self.currentTrack - 1
          wasPlaying = autoplay or self.playing
          self.pause()
          $timeout ->
            self._clearAudioList()
            self._addAudioList self._playlist[self.currentTrack - 2]
            self.load wasPlaying # setup autoplay here.
            self.currentTrack--
            return

        return

      _addAudioList: (audioList) ->
        self = this
        if angular.isArray(audioList)
          angular.forEach audioList, (singleElement, index) ->
            sourceElem = angular.element($interpolate("<source src=\"{{ src }}\" type=\"{{ type }}\" media=\"{{ media }}\">")(singleElement))
            self._element.append sourceElem
            return

        else if angular.isObject(audioList)
          sourceElem = angular.element($interpolate("<source src=\"{{ src }}\" type=\"{{ type }}\" media=\"{{ media }}\">")(audioList))
          self._element.append sourceElem
        return

      _clearAudioList: ->
        @_element.contents().remove()
        return

      _formatTime: (seconds) ->
        hours = parseInt(seconds / 3600, 10) % 24
        minutes = parseInt(seconds / 60, 10) % 60
        secs = parseInt(seconds % 60, 10)
        result = undefined
        fragment = ((if minutes < 10 then "0" + minutes else minutes)) + ":" + ((if secs < 10 then "0" + secs else secs))
        if hours > 0
          result = ((if hours < 10 then "0" + hours else hours)) + ":" + fragment
        else
          result = fragment
        result

      _bindListeners: (scope) ->
        self = this
        element = @_element
        updateTime = throttle(1000, false, (evt) ->
          scope.$apply ->
            self.currentTime = self.position = self._audioTag.currentTime
            self.formatTime = self._formatTime(self.currentTime)
            return

          return
        )
        updatePlaying = (isPlaying) ->
          (evt) ->
            scope.$apply ->
              self.playing = isPlaying
              return

            if isPlaying
              scope.$emit self.name + ":play", self.currentTrack - 1
            else
              scope.$emit self.name + ":pause"
            return

        setDuration = (evt) ->
          scope.$apply ->
            self.currentTrack++  unless self.currentTrack # This is triggered *ONLY* the first time a <source> gets loaded.
            self.duration = self._audioTag.duration
            self.formatDuration = self._formatTime(self.duration)
            self.loadPercent = parseInt((self._audioTag.buffered.end(self._audioTag.buffered.length - 1) / self.duration) * 100, 10)
            return

          return

        playNext = (evt) ->
          self.next true
          return

        updateProgress = (evt) ->
          if self._audioTag.buffered.length
            scope.$apply ->
              self.loadPercent = parseInt((self._audioTag.buffered.end(self._audioTag.buffered.length - 1) / self.duration) * 100, 10)
              return

          return

        element.bind "playing", updatePlaying(true)
        element.bind "pause", updatePlaying(false)
        element.bind "ended", playNext
        element.bind "timeupdate", updateTime
        element.bind "loadedmetadata", setDuration
        element.bind "progress", updateProgress
        ->
          element.unbind "playing"
          element.unbind "pause"
          element.unbind "ended"
          element.unbind "timeupdate"
          element.unbind "loadedmetadata"
          element.unbind "progress"
          return

    return (
      scope:
        exposedPlayer: "=playerControl"
        playlist: "=playlist"

      link: (scope, element, attrs, ctrl) ->
        
        # Create a single playlist element from <source> tag(s).
        
        # Put audioElement as first element in the playlist
        
        # You can listen for 'ready' event to know when DOM compilation is done
        watchFn = (playlistNew, playlistOld, watchScope) ->
          player = scope.exposedPlayer
          currentTrack = undefined
          newTrackNum = null
          if playlistNew is `undefined`
            if playlistOld isnt `undefined`
              player.pause()
              return $log.debug("playlist was deleted from scope, pausing and returning")
            else
              return $log.error("if you use playlist attribute, you need $scope.playlistVariable = []; in your code")
          
          ###
          Playlist update logic:
          If the player has started ->
          Check if the playing track is in the new Playlist [EXAMPLE BELOW]
          If it is ->
          Assign to it the new tracknumber
          Else ->
          Pause the player, and get the new Playlist
          
          Else (if the player hasn't started yet)
          Just replace the <src> tags inside the <audio>
          
          Example
          playlist: [a,b,c], playing: c, trackNum: 2
          ----delay 5 sec-----
          playlist: [f,a,b,c], playing: c, trackNum: 3
          ###
          if player.currentTrack
            currentTrack = (if playlistOld then playlistOld[player.currentTrack - 1] else -1)
            i = 0

            while i < playlistNew.length
              if angular.equals(playlistNew[i], currentTrack)
                newTrackNum = i
                break
              i++
            if newTrackNum isnt null # currentTrack it's still in the new playlist, update trackNumber
              player.currentTrack = newTrackNum + 1
              player.tracks = playlistNew.length
            else # currentTrack has been removed.
              player.pause()
              if playlistNew.length # if the new playlist has some elements, replace actual.
                $timeout -> # need $timeout because the audioTag needs a little time to launch the 'pause' event
                  player._clearAudioList()
                  player._addAudioList playlistNew[0]
                  player.load()
                  player.tracks = playlistNew.length
                  return

          else if playlistNew.length
            player._clearAudioList()
            player._addAudioList playlistNew[0]
            player.load()
            player.tracks = playlistNew.length
          return
        return $log.error("audioPlayer directive works only when attached to an <audio> type tag")  if element[0].tagName isnt "AUDIO"
        audioElement = []
        sourceElements = element.find("source")
        playlist = scope.playlist or []
        angular.forEach sourceElements, (sourceElement, index) ->
          audioElement.push
            src: sourceElement.src
            type: sourceElement.type
            media: sourceElement.media

          return

        playlist.unshift audioElement  if audioElement.length
        scope.exposedPlayer = new AudioPlayer(element, scope, playlist)
        scope.$emit scope.exposedPlayer.name + ":ready", scope.exposedPlayer
        scope.$watch "playlist", watchFn, true
        scope.$on "$destroy", ->
          scope.exposedPlayer._unbindListeners()
          return

        return
    )
]
angular.module("audioPlayer").factory "throttle", [
  "$timeout"
  ($timeout) ->
    return (delay, no_trailing, callback, debounce_mode) ->
      timeout_id = undefined
      last_exec = 0
      if typeof no_trailing isnt "boolean"
        debounce_mode = callback
        callback = no_trailing
        no_trailing = `undefined`
      wrapper = ->
        that = this
        elapsed = +new Date() - last_exec
        args = arguments_
        exec = ->
          last_exec = +new Date()
          callback.apply that, args
          return

        clear = ->
          timeout_id = `undefined`
          return

        exec()  if debounce_mode and not timeout_id
        $timeout.cancel timeout_id  if timeout_id
        if debounce_mode is `undefined` and elapsed > delay
          exec()
        else timeout_id = $timeout((if debounce_mode then clear else exec), (if debounce_mode is `undefined` then delay - elapsed else delay))  if no_trailing isnt true
        return

      wrapper
]
