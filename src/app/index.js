/// <reference path="C:/vsc/typings/jquery/jquery.d.ts" />
/// <reference path="C:/vsc/typings/angularjs/angular.d.ts" />

var magApp = angular.module('magApp', []);

magApp.value('navArray', [
	{ label:'Start', html:'start.html' },
	{ label:'Generator listy', html:'list.html' },
	{ label:'Generator kodu kreskowego', html:'barcode.html' },
	{ label:'Social - podział grup', html:'social.html' },
	{ label:'Dropdown', dropdown:[
		{ label:'podmenu', html:'podmenu.html'},
		{ label:'podmenu2', html:'podmenu2.html'},
	]}
]);

magApp.controller('PageController', ['$scope', 'navArray', function ($scope, _navArray) {
	$scope.navArray = _navArray;
	this.curPage = 0;
	this.curHtml = $scope.navArray[0].html;
	this.curLabel = $scope.navArray[0].label;

	this.isActive = function (_page) {
		return this.curPage === _page
	}

	this.openPage = function (_page) {
		this.curPage = _page;
		this.curHtml = $scope.navArray[_page].html;
		this.curLabel = $scope.navArray[_page].label;
	}
}]);