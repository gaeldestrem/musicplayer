angular.module('partials', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/content-mock.html', [
'',
'<Lorem>ipsum dolor sit amet, consectetur adipiscing elit. Donec nec urna commodo, vehicula nibh vel, posuere nunc. Nam convallis laoreet laoreet. Sed nec condimentum lorem. Curabitur fermentum massa sit amet posuere dignissim. Maecenas tempor molestie molestie. Integer venenatis lacus quis sapien egestas, vitae euismod lorem gravida. Pellentesque varius lacus quis facilisis volutpat. In et nibh feugiat, venenatis turpis quis, vulputate ante. In placerat malesuada diam, at porta sem scelerisque sit amet. Ut sollicitudin fringilla nisl, eu rhoncus nulla venenatis vitae. Vestibulum in pretium odio, mollis ullamcorper libero. Cras eget elit eros. Suspendisse non arcu eu metus volutpat facilisis. Etiam pellentesque eu erat eu semper. Nunc ac nunc at urna tincidunt ultrices bibendum eget nulla. Aenean mauris urna, molestie eu eros a, mattis gravida quam.</Lorem>',
'<Donec>et ultrices odio. Praesent sed dui neque. Donec enim mi, hendrerit quis consectetur sollicitudin, porta sed ante. Praesent laoreet ipsum at sapien scelerisque cursus. Nulla venenatis, mi vel faucibus egestas, erat arcu accumsan mi, in condimentum massa augue nec ipsum. Cras et sollicitudin velit. Duis bibendum urna at arcu pretium cursus. Quisque vel justo consectetur, malesuada libero eget, ullamcorper urna. Sed ultrices, nunc nec cursus volutpat, elit nisl elementum sem, sed scelerisque metus lectus id massa. Integer et velit neque. Integer ac dapibus odio, eget sollicitudin massa. Etiam volutpat eleifend dui sed egestas. Vestibulum in enim in nibh vestibulum commodo vitae congue magna. Ut lacinia justo ac mi pretium, nec porttitor turpis consequat.</Donec>',
'<Donec>facilisis nisl in leo laoreet, et vehicula justo ornare. Fusce tempor elit id mi aliquet, eget euismod massa auctor. Donec condimentum sem id erat vestibulum sodales eu quis dui. Mauris viverra tincidunt placerat. Maecenas est turpis, viverra sit amet mattis in, rhoncus ac enim. Nunc consectetur nisi ut arcu egestas accumsan. Integer venenatis varius vestibulum. Nam risus erat, pretium tristique leo quis, molestie mollis libero.</Donec>',
'<Integer>molestie auctor diam. Phasellus ipsum tortor, tempus non rutrum eget, gravida id tellus. Maecenas fermentum auctor dolor sit amet congue. Donec mi nisi, bibendum at nibh sit amet, tempus mattis urna. Nullam vitae erat et ante fermentum vulputate sed a turpis. Ut non libero velit. In condimentum lorem id massa sollicitudin accumsan. Aliquam non enim imperdiet, congue est non, eleifend erat. In ligula nulla, egestas at felis pretium, volutpat commodo lectus. In in est ornare, tincidunt velit nec, tempor ante. Nullam sed est id risus dapibus tincidunt ut eget nisl. Quisque hendrerit libero odio, id porta est ultrices vel.</Integer>',
'<Cras>magna velit, tristique at vulputate mollis, rutrum in sapien. Donec quam sem, pulvinar eu mollis in, lacinia vitae quam. Suspendisse vitae diam id est posuere cursus at ut dolor. Cras at risus felis. Morbi tempor consequat dolor. In auctor sodales diam. Ut vel nibh tincidunt, ullamcorper mauris vitae, tincidunt diam. Duis luctus egestas scelerisque.</Cras>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/navigation.html', [
'',
'<div class="navbar-header">',
'  <button type="button" data-toggle="collapse" data-target=".navbar-ex1-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="index.html" class="navbar-brand">MusicPlayer</a>',
'</div>',
'<div class="collapse navbar-collapse navbar-ex1-collapse">',
'  <ul class="nav navbar-nav side-nav">',
'    <li><a href="index.html"><i class="fa fa-dashboard"></i>Zik</a></li>',
'  </ul>',
'</div>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/local-medias.html', [
'',
'<div ng-controller="LocalMedias">',
'  <h2>ZikList</h2>',
'  <div></div>',
'  <table class="table table-hover">',
'    <tr ng-repeat="media in medias">',
'      <td ng-click="onElementListClick(media)">{{media.name}}</td>',
'    </tr>',
'  </table>',
'</div>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/player.html', [
'',
'<div class="time">',
'  <input min="0" max="{{audio.duration}}" step="0.01" type="range" ng-model="audio.currentTime">',
'</div>',
'<div class="form-group">',
'  <button ng-disabled="currentNum == 0" ng-click="prev()" class="btn btn-default prev"><i class="glyphicon glyphicon-step-backward"></i>prev</button>',
'  <button ng-click="playpause()" ng-class="{paused:audio.paused}" class="btn btn-default playpause"><span class="play-text"><i class="glyphicon glyphicon-play"></i>play</span><span class="pause-text"><i class="glyphicon glyphicon-pause"></i>pause</span></button>',
'  <button ng-disabled="currentNum == 0" ng-click="next()" class="btn btn-default prev"><i class="glyphicon glyphicon-step-forward"></i>next</button>',
'</div>',''].join("\n"));
}]);