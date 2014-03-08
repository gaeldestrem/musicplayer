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
  $scope.$watch('$location.path()', (path) ->
    $scope.activeNavId = path || '/'
  )

  # getClass compares the current url with the id.
  # If the current url starts with the id it returns 'active'
  # otherwise it will return '' an empty string. E.g.
  #
  #   # current url = '/products/1'
  #   getClass('/products') # returns 'active'
  #   getClass('/orders') # returns ''
  #
  $scope.getClass = (id) ->
    if $scope.activeNavId.substring(0, id.length) == id
      return 'active'
    else
      return ''
])

.controller('MusicNavList', [
  '$scope', 'myaudio', 'filemanager'

($scope, audio, filemanager) ->
  $scope.selectedElement = {name:"plop", datapath:'/home/gdestrem/test.ogg'}
  $scope.list = [
    {name:"plop", datapath:'/home/gdestrem/test.ogg'},
    {name:"plop2", datapath:'something'},
    {name:"plop3", datapath:'something'}
  ]

  $scope.onElementListClick = (element) ->
    $scope.selectedElement = element;
    console.log($scope.selectedElement)
    console.log(audio)
#    console.log(filemanager.walk())
    audio.play(element.datapath)
    audio.read(element.datapath)
])


.controller('TodoCtrl', [
  '$scope'

($scope) ->

  $scope.todos = [
    text: "learn angular"
    done: true
  ,
    text: "build an angular app"
    done: false
  ]

  $scope.addTodo = ->
    $scope.todos.push
      text: $scope.todoText
      done: false

    $scope.todoText = ""

  $scope.remaining = ->
    count = 0
    angular.forEach $scope.todos, (todo) ->
      count += (if todo.done then 0 else 1)

    count

  $scope.archive = ->
    oldTodos = $scope.todos
    $scope.todos = []
    angular.forEach oldTodos, (todo) ->
      $scope.todos.push todo  unless todo.done

])

