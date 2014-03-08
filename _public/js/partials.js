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
  return $templateCache.put('/partials/oldnav.html', [
'',
'<li><a href="charts.html"><i class="fa fa-bar-chart-o"></i>Charts</a></li>',
'<li><a href="tables.html"><i class="fa fa-table"></i>Tables</a></li>',
'<li><a href="forms.html"><i class="fa fa-edit"></i>Forms</a></li>',
'<li><a href="typography.html"><i class="fa fa-font"></i>Typography</a></li>',
'<li><a href="bootstrap-elements.html"><i class="fa fa-desktop"></i>Bootstrap Elements</a></li>',
'<li><a href="bootstrap-grid.html"><i class="fa fa-wrench"></i>Bootstrap Grid</a></li>',
'<li class="active"><a href="blank-page.html"><i class="fa fa-file"></i>Blank Page</a></li>',
'<li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle"><i class="fa fa-caret-square-o-down"></i>Dropdown<b class="caret"></b></a>',
'  <ul class="dropdown-menu">',
'    <li><a href="#">Dropdown Item</a></li>',
'    <li><a href="#">Another Item</a></li>',
'    <li><a href="#">Third Item</a></li>',
'    <li><a href="#">Last Item</a></li>',
'  </ul>',
'</li>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/zik.html', [
'',
'<div ng-controller="MusicNavList">',
'  <ul>',
'    <h2>ZikList</h2>',
'    <div>',
'      <ul>',
'        <li ng-repeat="music in list"><span ng-click="onElementListClick(music)">{{music.name}}</span></li>',
'      </ul>',
'    </div>',
'  </ul>',
'  <div>',
'    <div class="h2">Zik!',
'      <div>{{selectedElement.name}}',
'        <audio>',
'          <source>',
'        </audio>',
'      </div>',
'    </div>',
'  </div>',
'</div>',''].join("\n"));
}]);