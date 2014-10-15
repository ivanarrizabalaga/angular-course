'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function() {

    }])
    .controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
        //Connect $scope.parties to live Firebase data.
        var partiesRef = new Firebase('https://waitandeat-ivan.firebaseio.com/parties');
        $scope.parties = $firebase(partiesRef);

        //Object to store data from the waitlist form
        $scope.newParty = {
            name: '',
            phone: '',
            size: '',
            done: false,
            notified:'No'
        };

        //Adds a party to firebase
        $scope.saveParty = function() {
            $scope.parties.$add($scope.newParty);
            $scope.newParty = {
                name: '',
                phone: '',
                size: '',
                done: false,
                notified:'No'
            };
        };

        //Sends a SMS to a party
        $scope.sendTextMessage = function(party) {
            var textMessageRef = new Firebase('https://waitandeat-ivan.firebaseio.com/textMessages');
            var textMessages = $firebase(textMessageRef);
            var newTextMessage = {
                phoneNumber: party.phone,
                size: party.size,
                name: party.name
            };
            textMessages.$add(newTextMessage);
            party.notified='Yes';
            $scope.parties.$save(party.$id);
        };
    }])
    .controller('AuthController', ['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin) {
        var authRef = new Firebase('https://waitandeat-ivan.firebaseio.com/');
        var auth = $firebaseSimpleLogin(authRef);

        $scope.user = {email:'',password:''};

        //Register user against firebase
        $scope.register = function(){
            auth.$createUser($scope.user.email,$scope.user.password).then(function(data){
                console.log(data);
            });
        }
    }]);