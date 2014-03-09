'use strict'

### Controllers ###

angular.module('app.controllers', [])



.controller('AppCtrl', [
  '$scope'
  '$location'
  '$resource'
  '$rootScope'

($scope, $location, $resource, $rootScope) ->
  # Uses the url to determine if the selected
  # menu item should have the class active.
  $scope.$location = $location
  $scope.playingElement = null


  $scope.$watch('$location.path()', (path) ->
    $scope.activeNavId = path || '/'
  )

  $scope.getClass = (id) ->
    if $scope.activeNavId.substring(0, id.length) == id
      return 'active'
    else
      return ''





])

.controller('LocalMedias', [
  '$scope', '$rootScope'

($scope, $rootScope) ->
  $scope.medias = []

  $scope.onElementListClick = (element) ->
    console.log(element)
    $rootScope.$broadcast 'audio.set', element.fullPath
    $rootScope.$broadcast 'audio.play'

  $scope.searchForLocalMedias = (dir) ->
    readdirp = require('readdirp')

    readdirp({ root: dir, fileFilter: ['*.mp3', '*.avi', '*.ogg'] })
    .on('data', (entry) ->
        console.log(entry)
        $scope.medias.push(entry)
        $scope.$apply()
      )
    .on('end', (tmp) ->
        console.log('END WALKING')
      )

  $scope.searchForLocalMedias('/home/gdestrem/workspace/musicplayer/')

])

