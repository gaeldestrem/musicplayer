"use strict";var App;App=angular.module("app",["ngCookies","ngResource","ngRoute","app.controllers","app.directives","app.filters","app.services","partials","audioPlayer"]),App.config(["$routeProvider","$locationProvider",function(e,t){return e.when("/test",{templateUrl:"/partials/test.html"}).when("/zik",{templateUrl:"/partials/zik.html"}).otherwise({redirectTo:"/zik"}),t.html5Mode(!1)}]),angular.module("audioPlayer",[]).directive("audioPlayer",["$rootScope","$log","$interpolate","$timeout","throttle",function(e,t,n,a,r){var i;return i=function(e,t,n,a){return this instanceof i?(a=a||{},n=n||[],angular.extend(this,{_element:e,_audioTag:e[0],_scope:t,_playlist:n,name:a.name||"audioplayer",playing:!1,currentTrack:0,tracks:n.length,volume:e[0].volume,muted:e[0].muted,duration:e[0].duration,currentTime:e[0].currentTime,buffered:e[0].buffered,played:e[0].played,seekable:e[0].seekable,formatDuration:"",formatTime:"",loadPercent:0,position:e[0].currentTime}),void(this._unbindListeners=this._bindListeners(t))):new i(e,t,n,a)},i.prototype={load:function(e,t){var n;"boolean"==typeof e?(t=e,e=null):"object"==typeof e&&(this._clearAudioList(),this._addAudioList(e)),this._scope.$emit(this.name+":load",t),this._audioTag.load(),t&&(n=this,n._element.bind("canplaythrough",function(){n.play(),n._element.unbind("canplaythrough")}))},play:function(e){return this._playlist.length>e?(this.currentTrack=e+1,this.load(this._playlist[e],!0)):(!this.currentTrack&&this._audioTag.readyState&&this.currentTrack++,void this._audioTag.play())},playPause:function(e){"number"==typeof e&&e+1!==this.currentTrack?this.play(e):this.playing?this.pause():this.play()},pause:function(){this._audioTag.pause()},toggleMute:function(){this.muted=this._audioTag.muted=!this._audioTag.muted},next:function(e){var t,n;t=this,t.currentTrack&&t.currentTrack<t.tracks&&(n=e||t.playing,t.pause(),a(function(){t._clearAudioList(),t._addAudioList(t._playlist[t.currentTrack]),t.load(n),t.currentTrack++}))},prev:function(e){var t,n;t=this,t.currentTrack&&t.currentTrack-1&&(n=e||t.playing,t.pause(),a(function(){t._clearAudioList(),t._addAudioList(t._playlist[t.currentTrack-2]),t.load(n),t.currentTrack--}))},_addAudioList:function(e){var t,a;t=this,angular.isArray(e)?angular.forEach(e,function(e){var a;a=angular.element(n('<source src="{{ src }}" type="{{ type }}" media="{{ media }}">')(e)),t._element.append(a)}):angular.isObject(e)&&(a=angular.element(n('<source src="{{ src }}" type="{{ type }}" media="{{ media }}">')(e)),t._element.append(a))},_clearAudioList:function(){this._element.contents().remove()},_formatTime:function(e){var t,n,a,r,i;return n=parseInt(e/3600,10)%24,a=parseInt(e/60,10)%60,i=parseInt(e%60,10),r=void 0,t=(10>a?"0"+a:a)+":"+(10>i?"0"+i:i),r=n>0?(10>n?"0"+n:n)+":"+t:t},_bindListeners:function(e){var t,n,a,i,o,u,c;return a=this,t=this._element,c=r(1e3,!1,function(){e.$apply(function(){a.currentTime=a.position=a._audioTag.currentTime,a.formatTime=a._formatTime(a.currentTime)})}),o=function(t){return function(){e.$apply(function(){a.playing=t}),t?e.$emit(a.name+":play",a.currentTrack-1):e.$emit(a.name+":pause")}},i=function(){e.$apply(function(){a.currentTrack||a.currentTrack++,a.duration=a._audioTag.duration,a.formatDuration=a._formatTime(a.duration),a.loadPercent=parseInt(a._audioTag.buffered.end(a._audioTag.buffered.length-1)/a.duration*100,10)})},n=function(){a.next(!0)},u=function(){a._audioTag.buffered.length&&e.$apply(function(){a.loadPercent=parseInt(a._audioTag.buffered.end(a._audioTag.buffered.length-1)/a.duration*100,10)})},t.bind("playing",o(!0)),t.bind("pause",o(!1)),t.bind("ended",n),t.bind("timeupdate",c),t.bind("loadedmetadata",i),t.bind("progress",u),function(){t.unbind("playing"),t.unbind("pause"),t.unbind("ended"),t.unbind("timeupdate"),t.unbind("loadedmetadata"),t.unbind("progress")}}},{scope:{exposedPlayer:"=playerControl",playlist:"=playlist"},link:function(e,n){var r,o,u,c;return c=function(n,r){var i,o,u,c;if(c=e.exposedPlayer,i=void 0,u=null,void 0===n)return void 0!==r?(c.pause(),t.debug("playlist was deleted from scope, pausing and returning")):t.error("if you use playlist attribute, you need $scope.playlistVariable = []; in your code");if(c.currentTrack){for(i=r?r[c.currentTrack-1]:-1,o=0;o<n.length;){if(angular.equals(n[o],i)){u=o;break}o++}null!==u?(c.currentTrack=u+1,c.tracks=n.length):(c.pause(),n.length&&a(function(){c._clearAudioList(),c._addAudioList(n[0]),c.load(),c.tracks=n.length}))}else n.length&&(c._clearAudioList(),c._addAudioList(n[0]),c.load(),c.tracks=n.length)},"AUDIO"!==n[0].tagName?t.error("audioPlayer directive works only when attached to an <audio> type tag"):(r=[],u=n.find("source"),o=e.playlist||[],angular.forEach(u,function(e){r.push({src:e.src,type:e.type,media:e.media})}),r.length&&o.unshift(r),e.exposedPlayer=new i(n,e,o),e.$emit(e.exposedPlayer.name+":ready",e.exposedPlayer),e.$watch("playlist",c,!0),void e.$on("$destroy",function(){e.exposedPlayer._unbindListeners()}))}}}]),angular.module("audioPlayer").factory("throttle",["$timeout",function(e){return function(t,n,a,r){var i,o,u;return o=void 0,i=0,"boolean"!=typeof n&&(r=a,a=n,n=void 0),u=function(){var u,c,l,s,d;d=this,l=+new Date-i,u=arguments_,s=function(){i=+new Date,a.apply(d,u)},c=function(){o=void 0},r&&!o&&s(),o&&e.cancel(o),void 0===r&&l>t?s():n!==!0&&(o=e(r?c:s,void 0===r?t-l:t))}}}]),angular.module("app.controllers",[]).controller("AppCtrl",["$scope","$location","$resource","$rootScope",function(e,t){return e.$location=t,e.playingElement=null,e.$watch("$location.path()",function(t){return e.activeNavId=t||"/"}),e.getClass=function(t){return e.activeNavId.substring(0,t.length)===t?"active":""}}]).controller("LocalMedias",["$scope","$rootScope",function(e,t){return e.medias=[],e.onElementListClick=function(e){return console.log(e),t.$broadcast("audio.set",e.fullPath),t.$broadcast("audio.play")},e.searchForLocalMedias=function(t){var n;return n=require("readdirp"),n({root:t,fileFilter:["*.mp3","*.avi","*.ogg"]}).on("data",function(t){return console.log(t),e.medias.push(t),e.$apply()}).on("end",function(){return console.log("END WALKING")})},e.searchForLocalMedias("/home/gdestrem/workspace/musicplayer/")}]);var DataStore,createDocumentStore,createRelationalStore,createSimpleStore;DataStore="undefined"!=typeof exports&&null!==exports&&exports||(this.DataStore={}),DataStore.create=function(e){switch(e){case"simple":return createSimpleStore();case"relational":return createRelationalStore();case"document":return createDocumentStore();default:return void 0}},createSimpleStore=function(){return{get:function(e){return JSON.parse(localStorage.getItem(JSON.stringify(e)))},set:function(e,t){return localStorage.setItem(JSON.stringify(e),JSON.stringify(t))},"delete":function(e){return localStorage.removeItem(JSON.stringify(e))},count:function(){return localStorage.length},clear:function(){return localStorage.clear()}}},createRelationalStore=function(){var e,t;return e=openDatabase("nwsqldb","1.0","embedded sql database",268435456),t={run:function(t,n){return e.transaction(function(e){return e.executeSql(t,[],function(e,t){var a;return"function"==typeof n?n(function(){var e,n,r;for(r=[],a=e=0,n=t.rows.length;n>=0?n>e:e>n;a=n>=0?++e:--e)r.push(t.rows.item(a));return r}()):void 0})})}}},createDocumentStore=function(){var e,t,n,a;try{return e=require("nedb"),t=require("nw.gui").App.dataPath+"/nedb",a={collection:function(t){return new e({filename:"/"+t,autoload:!0})}}}catch(r){return n=r,console.error("MODULE_NOT_FOUND"===n.code?"NeDB not found. Try `npm install nedb --save` inside of `/app/assets`.":n)}};var directives;directives=angular.module("app.directives",["app.services"]),directives.directive("appVersion",["version",function(e){return function(t,n){return n.text(e)}}]),directives.directive("audioPlayer",["$rootScope","$interval",function(e){return{restrict:"E",scope:{},templateUrl:"/partials/player.html",link:function(t){return console.log(t),t.audio=new Audio,t.currentNum=0,t.next=function(){e.$broadcast("audio.next")},t.prev=function(){e.$broadcast("audio.prev")},t.playpause=function(){var e;e=t.audio.paused?t.audio.play():t.audio.pause()},t.audio.addEventListener("play",function(){e.$broadcast("audio.play",this)}),t.audio.addEventListener("pause",function(){e.$broadcast("audio.pause",this)}),t.audio.addEventListener("timeupdate",function(){e.$broadcast("audio.time",this)}),t.audio.addEventListener("ended",function(){e.$broadcast("audio.ended",this),t.next()}),e.$on("audio.set",function(e,n,a,r,i){var o,u;u=!t.audio.paused,t.audio.src=n,o=u?t.audio.play():t.audio.pause(),t.info=a,t.currentNum=r,t.totalNum=i,t.audio.play()})}}}]),angular.module("app.filters",[]).filter("interpolate",["version",function(e){return function(t){return String(t).replace(/\%VERSION\%/gm,e)}}]);var services;services=angular.module("app.services",[]),services.factory("version",function(){return"0.1"});