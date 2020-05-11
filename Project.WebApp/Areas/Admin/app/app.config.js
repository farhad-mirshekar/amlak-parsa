﻿(function () {
    'use strict';

    var app = angular.module('portal');

    app.config([
        '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $locationProvider.html5Mode(false);
            $routeProvider.when("/command/:state/:id?", { templateUrl: "/admin/command/index", controller: 'commandController', reloadOnUrl: false })
                .when("/role/:state/:id?", { templateUrl: "/admin/role/index", controller: 'roleController', reloadOnUrl: false })
                .when("/position/:state/:id?", { templateUrl: "/admin/position/index", controller: 'positionController', reloadOnUrl: false })
                .when("/product/:state/:id?", { templateUrl: "/admin/product/index", controller: 'productController', reloadOnUrl: false})
                .when("/section/:state/:id?", { templateUrl: "/admin/section/index", controller: 'sectionController', reloadOnUrl: false })
                .when("/faq-group/:state/:id?", { templateUrl: "/admin/faqgroup/index", controller: 'faqGroupController', reloadOnUrl: false })
                .when("/profile", {templateUrl: '/admin/profile/index', controller: 'profileController'})
                .when("/profile/change-password", { templateUrl: '/admin/profile/ChangePassword', controller: 'changePasswordController'})
                .when("/category/:state/:id?", { templateUrl: "/admin/category/index", controller: 'categoryController', reloadOnUrl: false })
                .when("/", {templateUrl: '/admin/home/main', controller: 'homeController'})
                .when("/comment/:state/:id?", { templateUrl: '/admin/comment/index', controller: 'commentController', reloadOnUrl: false })
                .when("/category-portal/:state/:id?", { templateUrl: "/Admin/CategoryPortal/index", controller: 'categoryPortalController', reloadOnUrl: false })
                .when("/article/:state/:id?", { templateUrl: "/Admin/article/index", controller: 'articleController', reloadOnUrl: false })
                .when("/news/:state/:id?", { templateUrl: "/Admin/news/index", controller: 'newsController', reloadOnUrl:false })
                .when("/pages/:state/:id?", { templateUrl: "/Admin/pages/index", controller: 'pagesController', reloadOnUrl: false })
                .when("/menu/:state/:id?", { templateUrl: "/Admin/menu/index", controller: 'menuController', reloadOnUrl: false })
                .when("/slider/:state/:id?", { templateUrl: "/Admin/slider/index", controller: 'sliderController', reloadOnUrl: false })
                .when("/general-setting", { templateUrl: "/Admin/generalSetting/index", controller: 'generalSettingController' })
                .when("/events/:state/:id?", { templateUrl: "/Admin/events/index", controller: 'eventsController', reloadOnUrl: false })
                .when("/comment-portal/:state/:id?", { templateUrl: "/Admin/comment/listForportal", controller: 'commentPortalController', reloadOnUrl: false })
                .when("/pages/:state/:id?", { templateUrl: "/Admin/pages/index", controller: 'pagesController', reloadOnUrl: false })
                .when("/notification/:state/:id?", { templateUrl: "/Admin/notification/index", controller: 'notificationController', reloadOnUrl: false })// add;
                .when("/department/:state/:id?", { templateUrl: "/Admin/department/index", controller: 'departmentController', reloadOnUrl: false })// add;
                .when("/user/:state/:id?", { templateUrl: "/Admin/user/index", controller: 'userController', reloadOnUrl: false })// add;

                .otherwise({
                    templateUrl: './areas/admin/app/NotFound/not-found.html'
                });

        }
    ]);



})();