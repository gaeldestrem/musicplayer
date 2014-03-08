'use strict'

### Sevices ###

services = angular.module('app.services', [])
# Define a simple audio service
services.factory "myaudio", ['$document', ($document) ->
    audioElement = $document[0].createElement("audio") # <-- Magic trick here
    audioElement: audioElement
    play: (filename) ->
      audioElement.src = filename
      audioElement.play() #  <-- Thats all you need
      return
    read: (fileName) ->
      fs = require 'fs'
      console.log(fs)
#      content
#      fs.readFile fileName, read(data) ->
#        content = data
#      content: content
  ]
#

services.factory 'filemanager', ->
  readdirp = require('readdirp')
  walk: ->
    result = []
    readdirp({ root: '/', fileFilter: ['*.mp3', '*.avi'] })
    .on('data', (entry) ->
        console.log(entry)
        result.push entry)
    .on('end', (tmp) ->
        console.log result
        console.log tmp)

services.factory 'version', -> "0.1"







#// Define a simple audio service
#mpApp.factory('audio',function ($document) {
#var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
#return {
#audioElement: audioElement,
#
#play: function(filename) {
#audioElement.src = filename;
#audioElement.play();     //  <-- Thats all you need
#}
#// Exersise for the reader - extend this service to include other functions
#// like pausing, etc, etc.
#
#}
#});