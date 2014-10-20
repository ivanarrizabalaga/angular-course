'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [

        function() {

        }
    ])
    .controller('WaitlistController', ['authService','$scope','partyService','textMessageService',
        function(authService,$scope,partyService,textMessageService) {

            //Bind user's parties to $scope.parties
            authService.getCurrentUser().then(function(user){
                if(user){
                    $scope.parties = partyService.getPartiesByUserId(user.id);
                }
            });

            //Object to store data from the waitlist form
            $scope.newParty = {
                name: '',
                phone: '',
                size: '',
                done: false,
                notified: 'No'
            };

            //Adds a party to firebase
            $scope.saveParty = function() {
                partyService.saveParty($scope.newParty,$scope.currentUser.id);
                $scope.newParty = {
                    name: '',
                    phone: '',
                    size: '',
                    done: false,
                    notified: 'No'
                };
            };

            //Sends a SMS to a party
            $scope.sendTextMessage = function(party) {
                textMessageService.sendTextMessage(party,$scope.currentUser.id);
            };
        }
    ])
    .controller('AuthController', ['$scope', 'authService',
        function($scope, authService) {
            //Object bound to inputs on the register and login pages
            $scope.user = {
                email: '',
                password: ''
            };

            //Register user against firebase
            $scope.register = function() {
                authService.register($scope.user);
            };

            //Login user
            $scope.login = function() {
                authService.login($scope.user);
            };

            //Log out user
            $scope.logout = function() {
                authService.logout();
            };
        }
    ]);