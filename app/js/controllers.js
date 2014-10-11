'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController',['$scope','$firebase',function($scope,$firebase){
  	//Connect $scope.parties to live Firebase data.
  	var partiesRef = new Firebase('https://waitandeat-ivan.firebaseio.com/parties');
  	$scope.parties = $firebase(partiesRef);

  	//Object to store data from the waitlist form
  	$scope.newParty = {name:'',phone:'',size:''};

  	//Adds a party to firebase
  	$scope.saveParty = function(){
  		$scope.parties.$add($scope.newParty);
  		$scope.newParty = {name:'',phone:'',size:''};
  	};

  	//Sends a SMS to a party
  	$scope.sendTextMessage = function(phoneNumber){
  		var textMessageRef = new Firebase('https://waitandeat-ivan.firebaseio.com/textMessages');
		var textMessages = $firebase(textMessageRef);
		textMessages.$add({phoneNumber:phoneNumber});
  	};
  }]);