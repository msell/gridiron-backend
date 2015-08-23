/**
 * Created by matt on 11/15/14.
 */
angular.module('gridiron').config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, configuration) {

    // if none of these states fit, just go home
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: '/views/main.html'
        })

    .state('privacy', {
        url: '/privacy',
        templateUrl: '/views/privacy.html'        
    })
    
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    })

    .state('draftBoard', {
        url: '/draftboard',
        templateUrl: '/views/draftboard.html',
        controller: 'DraftBoardCtrl'
    })   
    
    .state('liveDraft', {
        url: '/livedraft',
        templateUrl: '/views/livedraft.html',
        controller: 'LiveDraftCtrl'
    })   

    .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
    });

    
    $authProvider.loginUrl = configuration.apiUrl + 'auth/login';
    $authProvider.signupUrl = configuration.apiUrl + 'auth/register';
    
    // if using express use these routes
//    $authProvider.loginUrl = API_URL + 'login';
//    $authProvider.signupUrl = API_URL + 'register';
    
    $authProvider.google({
        clientId: '293729951422-1aoar6i6acc23l8lrmb0m2dm9ommefq9.apps.googleusercontent.com',
        url: configuration.apiUrl + 'auth/google'
    });
    
    $authProvider.facebook({
        clientId: JSON.stringify(configuration.facebookClientId),
        url: configuration.apiUrl + 'auth/facebook'
    });
    
    $authProvider.twitter({
        clientId: 'UENUvKrmfHn31MmBy2Xufo8QN',
        url: configuration.apiUrl + 'auth/twitter'
    })

    $httpProvider.interceptors.push('authInterceptor');
})

.run(function ($window) {
    var params = $window.location.search.substring(1);

    if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);

        $window.opener.postMessage(code, $window.location.origin);
    }
});