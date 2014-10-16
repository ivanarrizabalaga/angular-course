'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [

        function() {

        }
    ])
    .controller('WaitlistController', ['$scope','partyService','textMessageService',
        function($scope,partyService,textMessageService) {

            //Bind Firebase parties to $scope
            $scope.parties = partyService.parties;

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
                partyService.saveParty($scope.newParty);
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
                textMessageService.sendTextMessage(party);
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