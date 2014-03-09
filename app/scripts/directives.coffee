'use strict'

### Directives ###

# register the module with Angular
directives = angular.module('app.directives', [
  # require the 'app.service' module
  'app.services'
])

directives.directive('appVersion', [
  'version'

(version) ->

  (scope, elm, attrs) ->
    elm.text(version)
])

directives.directive("audioPlayer", [
  '$rootScope'
  '$interval'

  ($rootScope, $interval) ->
    restrict: "E"
    scope: {}
    templateUrl: "/partials/player.html"
    link: (scope, $element) ->
      console.log(scope);
      scope.audio = new Audio()
      scope.currentNum = 0

      # tell others to give me my prev/next track (with audio.set message)
      scope.next = ->
        $rootScope.$broadcast "audio.next"
        return

      scope.prev = ->
        $rootScope.$broadcast "audio.prev"
        return


      # tell audio element to play/pause, you can also use $scope.audio.play() or $scope.audio.pause();
      scope.playpause = ->
        a = (if scope.audio.paused then scope.audio.play() else scope.audio.pause())
        return


      # listen for audio-element events, and broadcast stuff
      scope.audio.addEventListener "play", ->
        $rootScope.$broadcast "audio.play", this
        return


      scope.audio.addEventListener "pause", ->
        $rootScope.$broadcast "audio.pause", this
        return

      scope.audio.addEventListener "timeupdate", ->
        $rootScope.$broadcast "audio.time", this
        return

      scope.audio.addEventListener "ended", ->
        $rootScope.$broadcast "audio.ended", this
        scope.next()
        return


      # set track & play it
      $rootScope.$on "audio.set", (r, file, info, currentNum, totalNum) ->
        playing = not scope.audio.paused
        scope.audio.src = file
        a = (if playing then scope.audio.play() else scope.audio.pause())
        scope.info = info
        scope.currentNum = currentNum
        scope.totalNum = totalNum
        scope.audio.play()
        return


#      $interval(null, 1000);


])