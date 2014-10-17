'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
	.value('FIREBASE_URL', 'https://waitandeat-ivan.firebaseio.com/')
	.factory('dataService',function($firebase,FIREBASE_URL){
		var dataRef= new Firebase(FIREBASE_URL);	
		var fireData = $firebase(dataRef);
		return fireData
	})
	.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL) {
		var authRef = new Firebase(FIREBASE_URL);
		var auth = $firebaseSimpleLogin(authRef);

		var authServiceObject = {
			register: function(user) {
				auth.$createUser(user.email, user.password).then(function(data) {
					console.log(data);
					authServiceObject.login(user);
				});
			},
			login: function(user) {
				auth.$login('password', user).then(function(data) {
					console.log(data);
					$location.path('/waitlist');
				});
			},
			logout: function() {
				auth.$logout();
				$location.path('/');
			}
		};

		//Listening login event
		$rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
			$rootScope.currentUser = user;
		});

		//Listening logout event
		$rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
			$rootScope.currentUser = null;
		});

		return authServiceObject;
	})
	.factory('partyService', function(dataService) {
		//Connect $scope.parties to live Firebase data.
		var parties = dataService.$child('parties');
		var users = dataService.$child('users');

		var partyServiceObject = {
			parties: parties,
			saveParty: function(party,userId) {				
				users.$child(userId).$child('parties').$add(party);
			},
		};

		return partyServiceObject;
	})
	.factory('textMessageService', function(dataService,partyService) {
		var textMessages = dataService.$child('textMessages');
		var textMessageServiceObject = {
			sendTextMessage: function(party) {
				var newTextMessage = {
					phoneNumber: party.phone,
					size: party.size,
					name: party.name
				};
				textMessages.$add(newTextMessage);
				party.notified = 'Yes';
				partyService.parties.$save(party.$id);
			}
		};

		return textMessageServiceObject;
	});