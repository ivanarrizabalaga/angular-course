'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function() {

    }])
    .controller('WaitlistController', ['$scope', '$firebase','FIREBASE_URL', function($scope, $firebase,FIREBASE_URL) {
        //Connect $scope.parties to live Firebase data.
        var partiesRef = new Firebase(FIREBASE_URL+'parties');
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
            var textMessageRef = new Firebase(FIREBASE_URL+'textMessages');
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
    .controller('AuthController', ['$scope','$firebaseSimpleLogin','$location','FIREBASE_URL',function($scope,$firebaseSimpleLogin,$location,FIREBASE_URL) {
        var authRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseSimpleLogin(authRef);

        $scope.user = {email:'',password:''};

        //Register user against firebase
        $scope.register = function(){
            auth.$createUser($scope.user.email,$scope.user.password).then(function(data){
                console.log(data);
                $scope.login();
            });
        };

        //Login user
        $scope.login = function(){
            auth.$login('password',$scope.user).then(function(data){
                console.log(data);
                $location.path('/waitlist');
            });
        };

        //Log out user
        $scope.logout = function(){
            auth.$logout();            
            $location.path('/');
        };


    }]);