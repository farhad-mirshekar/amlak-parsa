﻿(() => {
    var app = angular.module('portal');

    app.controller('homeController', homeController);
    homeController.$inject = ['$scope', '$q', 'loadingService', 'notificationService'];
    function homeController($scope, $q, loadingService, notificationService) {
        let home = $scope;
        home.notification = {};
        home.readNotification = readNotification;
        init();

        function init() {
            loadingService.show();
            return $q.resolve().then(() => {
                return notificationService.getActiveNotification();
            }).then((result) => {
                if (result) {
                    home.notification = [].concat(result);
                }
            }).finally(loadingService.hide);
        }

        function readNotification(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return notificationService.readNotification(model);
            }).finally(loadingService.hide);
        }
    }
    //-------------------------------------------------------------------------------------------------------
    app.controller('faqGroupController', faqGroupController);
    faqGroupController.$inject = ['$scope', '$routeParams', '$location', 'toaster', 'loadingService', 'faqGroupService', 'faqService', '$q', '$timeout'];
    function faqGroupController($scope, $routeParams, $location, toaster, loadingService, faqGroupService, faqService, $q, $timeout) {
        let faqgroup = $scope;
        faqgroup.state = '';
        faqgroup.Model = {};
        faqgroup.faq = {};
        faqgroup.faq.Model = {};
        faqgroup.faq.state = '';
        faqgroup.main = {};
        faqgroup.main.changeState = {
            cartable: cartable,
            edit: edit,
            add:add
        };
        faqgroup.addFaqGroup = addFaqGroup;
        faqgroup.editFaqGroup = editFaqGroup;
        faqgroup.select = select;
        faqgroup.openModalFaq = openModalFaq;
        faqgroup.addFaq = addFaq;
        faqgroup.editFaq = editFaq;
        faqgroup.grid = {
            bindingObject: faqgroup
            , columns: [{ name: 'Title', displayName: 'دسته بندی سوال' }]
            , listService: faqGroupService.list
            , onEdit: faqgroup.main.changeState.edit
            , globalSearch: true
        };
        init();
        function init() {
            loadingService.show();
            return $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        faqgroup.main.changeState.cartable();
                        break;
                    case 'add':
                        faqgroup.main.changeState.add();
                        break;
                    case 'edit':
                        faqgroup.state = 'edit';
                        faqGroupService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            loadingService.show();
            clearModel();
            faqgroup.state = 'cartable';
            $location.path('faq-group/cartable');
            loadingService.hide();
        }
        function edit(model) {
            loadingService.show();
            faqgroup.faq = {};
            return $q.resolve().then(() => {
                return faqService.list(model.ID);
            }).then((result) => {
                faqgroup.faq = result;
                faqgroup.state = 'edit';
                faqgroup.Model = model;
                $location.path(`faq-group/edit/${faqgroup.Model.ID}`);
            }).finally(loadingService.hide);
        }
        function add() {
            loadingService.show();
            faqgroup.state = 'add';
            $location.path('/faq-group/add');
            loadingService.hide();
        }

        function addFaqGroup() {
            loadingService.show();
            return faqGroupService.add(faqgroup.Model).then((result) => {
                faqgroup.grid.getlist(false);
                toaster.pop('success', '', 'تغییرات با موفقیت انجام گردید');
                faqgroup.Model = result;
                faqgroup.main.changeState.edit(faqgroup.Model);
            }).finally(loadingService.hide);
        }
        function editFaqGroup() {
            loadingService.show();
            return $q.resolve().then(() => {
                return faqGroupService.edit(faqgroup.Model);
            }).then((result) => {
                faqgroup.grid.getlist(false);
                toaster.pop('success', '', 'تغییرات با موفقیت انجام گردید');
                faqgroup.Model = result;
                $timeout(function () {
                    cartable();
                }, 1000);
            }).finally(loadingService.hide);
        }
        function openModalFaq() {
            faqgroup.faq.Model = {};
            faqgroup.faq.state = 'add';
            $(".grid-faq").modal("show");
        }
        function select(model) {
            faqgroup.faq.state = 'edit';
            faqgroup.faq.Model = angular.copy(model);
            $(".grid-faq").modal("show");
        }

        function addFaq() {
            loadingService.show();
            return $q.resolve().then(() => {
                return faqService.add(faqgroup.faq.Model);
            }).then(() => {
                toaster.pop('success', '', 'سوال با موفقیت ثبت گردید');
                $timeout(function () {
                    $('.grid-faq').modal('hide');
                }, 100);

            }).finally(loadingService.hide);
        }
        function editFaq() {
            loadingService.show();
            return $q.resolve().then(() => {
                return faqService.edit(faqgroup.faq.Model);
            }).then(() => {
                return faqGroupService.get(faqgroup.Model.ID);
            }).then((result) => {
                return edit(result);
            }).then(() => {
                toaster.pop('success', '', 'سوال با موفقیت ویرایش گردید');
                $timeout(function () {
                    $('.grid-faq').modal('hide');
                }, 100);
            }).finally(loadingService.hide);
        }
        function clearModel() {
            faqgroup.Model = {};
            faqgroup.faq.Model = {};
            faqgroup.faq.state = '';
        }
    }
    //-------------------------------------------------------------------------------------------------------
    app.controller('faqController', faqController);
    faqController.$inject = ['$scope', '$uibModalInstance', '$timeout', 'toaster', 'loadingService', 'faqgroup', 'faqService', '$window', 'faqmodel', '$q'];
    function faqController($scope, $uibModalInstance, $timeout, toaster, loadingService, faqgroup, faqService, $window, faqmodel, $q) {
        let faq = $scope;
        faq.cancel = cancel;
        faq.add = add;
        faq.edit = edit;
        faq.state = 'addd';
        if (faqmodel === null) {
            faq.state = 'add';
            faq.Model = {};
        }
        else {
            faq.Model = faqmodel;
            faq.state = 'edit';
        }

        faq.faqgroup = faqgroup;
        function add() {
            loadingService.show();
            faq.Model.FAQGroupID = faqgroup.ID;
            return $q.resolve().then(() => {
                return faqService.add(faq.Model);
            }).then(() => {
                toaster.pop('success', '', 'تغییرات با موفقیت انجام گردید');
                $timeout(function () {
                    cancel();
                }, 100);
                $timeout(function () {
                    $window.location.reload();
                }, 100);
            }).catch((error) => {
                toaster.pop('error', "", "مشکلی اتفاق افتاده است");
            }).finally(loadingService.hide);
        }
        function edit() {
            faq.Model.FAQGroupID = faqgroup.ID;
            loadingService.show();
            return $q.resolve().then(() => {
                return faqService.edit(faq.Model);
            }).then(() => {
                toaster.pop('success', '', 'تغییرات با موفقیت انجام گردید');
                $timeout(function () {
                    cancel();
                }, 1000);
                $timeout(function () {
                    $window.location.reload();
                }, 100);
            }).catch((error) => {
                toaster.pop('error', "", "مشکلی اتفاق افتاده است");
            }).finally(loadingService.hide);
        }
        function cancel() {
            $uibModalInstance.dismiss();
        }

    }
    //-------------------------------------------------------------------------------------------------------
    app.controller('profileController', profileController);
    profileController.$inject = ['$scope', 'profileService'];
    function profileController($scope, profileService) {
        let profile = $scope;

        init();

        function init() {
            var id = localStorage.userid;
            return profileService.get(id).then((result) => {
                profile.user = result;
            })
        }
    }
    //------------------------------------------------------------------------------------------------------------
    app.controller('commandController', commandController);
    commandController.$inject = ['$scope', '$q', 'commandService', 'loadingService', '$routeParams', '$location', 'toaster', '$timeout', 'toolsService', 'enumService'];
    function commandController($scope, $q, commandService, loadingService, $routeParams, $location, toaster, $timeout, toolsService, enumService) {
        let command = $scope;
        command.Model = {};
        command.list = [];
        command.lists = [];
        command.state = 'cartable';
        command.goToPageAdd = goToPageAdd;
        command.addCommand = addCommand;
        command.addSubCommand = addSubCommand;
        command.editCommand = editCommand;
        command.commandType = toolsService.arrayEnum(enumService.CommandsType);
        command.changeState = {
            cartable: cartable
        }
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        loadingService.hide();
                        break;
                    case 'add':
                        goToPageAdd();
                        loadingService.hide();
                        break;
                    case 'edit':
                        commandService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);


        } // end init

        function cartable() {
            command.tree = {
                data: []
                , colDefs: [
                    { field: 'Name', displayName: 'عنوان انگلیسی' }
                    , { field: 'Title', displayName: 'نام مجوز' }
                    , {
                        field: ''
                        , displayName: ''
                        , cellTemplate: (
                            `<div class='pull-left'>
                            <i class='fa fa-plus tgrid-action pl-1 text-success' style='cursor:pointer;' ng-click='cellTemplateScope.add(row.branch)' title='افزودن'></i>
                            <i class='fa fa-pencil tgrid-action pl-1 text-primary' style='cursor:pointer;' ng-click='cellTemplateScope.edit(row.branch)' title='ویرایش'></i>
                            <i class='fa fa-trash tgrid-action pl-1 text-danger' style='cursor:pointer;' ng-click='cellTemplateScope.remove(row.branch)' title='حذف'></i>
                        </div>`)
                        , cellTemplateScope: {
                            edit: edit,
                            add: addSubCommand,
                            remove: remove
                        }
                    }
                ]
                , expandingProperty: {
                    field: "Title"
                    , displayName: "عنوان"
                }
            };
            commandService.list().then((result) => {
                setTreeObject(result);
            });
            command.state = 'cartable';
            $location.path('command/cartable');
        }
        function edit(parent) {
            loadingService.show();
            return $q.resolve().then(() => {
                return commandService.get(parent.ID);
            }).then((result) => {
                command.Model = result;
                return commandService.listByNode({ Node: result.ParentNode });
            }).then((result) => {
                command.Model.ParentID = result[0].ID;
                $location.path(`/command/edit/${command.Model.ID}`);
                command.state = 'edit';
            }).finally(loadingService.hide)
        }
        function goToPageAdd(parent) {
            loadingService.show();
            parent = parent || {};
            command.state = 'add';
            command.Model = { ParentID: parent.ID };
            $location.path('/command/add');
            loadingService.hide();
        }
        function addCommand() {
            command.Model.Name = command.Model.FullName;
            loadingService.show();
            return $q.resolve().then(() => {
                commandService.add(command.Model).then((result) => {
                    toaster.pop('success', '', 'مجوز جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);
                })
            }).catch((error) => {
                toaster.pop('error', '', 'خطای ناشناخته');
            }).finally(loadingService.hide);
        }
        function editCommand() {
            command.Model.Name = command.Model.FullName;
            loadingService.show();
            return $q.resolve().then(() => {
                commandService.edit(command.Model).then((result) => {
                    toaster.pop('success', '', 'مجوز جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);
                })
            }).catch((error) => {
                toaster.pop('error', '', 'خطای ناشناخته');
            }).finally(loadingService.hide);
        }
        function addSubCommand(parent) {
            command.state = 'add';
            goToPageAdd(parent);
        }
        function setTreeObject(commands) {
            commands.map((item) => {
                if (item.ParentNode === '/')
                    item.expanded = true;
            });
            command.tree.data = toolsService.getTreeObject(commands, 'Node', 'ParentNode', '/');
        }
        function remove(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return commandService.remove(model.ID);
            }).then(() => {
                return commandService.list();
            }).then((result) => {
                setTreeObject(result);
            }).finally(loadingService.hide);
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------
    app.controller('roleController', roleController);
    roleController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'roleService', 'toaster', 'commandService', '$location', 'toolsService'];
    function roleController($scope, $q, loadingService, $routeParams, roleService, toaster, commandService, $location, toolsService) {
        let role = $scope;
        role.Model = {};
        role.main = {};
        role.main.changeState = {
            cartable: cartable,
            edit: edit,
            add: add
        };
        role.Model.Permissions = [];
        role.ListCommand = [];
        role.addRole = addRole;
        role.editRole = editRole;
        role.back = back;
        role.grid = {
            bindingObject: role
            , columns: [{ name: 'Name', displayName: 'نام نقش' }]
            , listService: roleService.list
            , onEdit: role.main.changeState.edit
            , globalSearch: true
        };
        init();

        function init() {
            role.state = 'cartable';
            $q.resolve().then(() => {
                loadingService.show();
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'edit':
                        roleService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                    case 'add':
                        add();
                        break;
                }
            }).finally(loadingService.hide);

        } // end init

        function cartable() {
            role.Model = {};
            role.state = 'cartable';
            $location.path('role/cartable');
        }
        function edit(model) {
            loadingService.show;
            return $q.resolve().then(() => {
                role.Model = model;
                return commandService.list();
            }).then((result) => {
                if (result.length > 0) {
                    role.ListCommand = toolsService.getTreeObject(result, 'Node', 'ParentNode', '/');
                }
                return commandService.listForRole({ RoleID: role.Model.ID });
            }).then((result) => {
                if (result.length > 0) {
                    role.Model.Permissions = [];
                    for (var i = 0; i < result.length; i++) {
                        role.Model.Permissions.push(result[i]);
                    }
                }
                role.state = 'edit';
                $location.path(`role/edit/${role.Model.ID}`);
            }).catch(() => {
                toaster.pop('error', '', 'خطا');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function add() {
            role.state = 'add';
            $location.path('/role/add');
        }

        function editRole() {
            loadingService.show();
            return $q.resolve().then(() => {
                var json = '';
                if (role.Model.Permissions.length === 0)
                    toaster.pop('error', '', 'مجوزی برای نقش انتخاب نکردید');
                for (var i = 0; i < role.Model.Permissions.length; i++) {
                    json += role.Model.Permissions[i].ID + ',';
                }
                role.Model.Json = json;
                return roleService.edit(role.Model);
            }).then((result) => {
                role.Model = result;
                return commandService.listForRole({ RoleID: $routeParams.id });
            }).then((result) => {
                if (result.length > 0) {
                    role.Model.Permissions = [];
                    for (var i = 0; i < result.length; i++) {
                        role.Model.Permissions.push(result[i]);
                    }
                }
                role.grid.getlist(false);
                toaster.pop('success', '', 'ویرایش با موفقیت انجام شد');
            }).catch(() => {
                toaster.pop('error', '', 'خطا');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function addRole() {
            loadingService.show();
            return $q.resolve().then(() => {
                return roleService.add(role.Model);
            }).then((result) => {
                role.Model = result;
                return edit(role.Model.ID);
            }).catch((error) => {
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function back() {
            $location.path('role/cartable');
        }
    }
    //------------------------------------------------------------------------------------------------------------------------------------
    app.controller('positionController', positionController);
    positionController.$inject = ['$scope', '$q', '$timeout', '$routeParams', '$location', 'toaster', '$timeout', 'loadingService', 'positionService', 'toaster', 'profileService', 'roleService', 'departmentService'];
    function positionController($scope, $q, $timeout, $routeParams, $location, toaster, $timeout, loadingService, positionService, toaster, profileService, roleService, departmentService) {
        let position = $scope;
        position.department = $scope;
        position.department.Model = {};
        position.department.departmentDropDown = [];
        position.changeState = {
            cartable: cartable,
            add: add
        }
        position.Model = {};
        position.Model.Errors = [];
        position.listPositions = [];
        position.state = '';
        position.ResultSearch = { Enabled: false };
        position.selectCommand = {
            selected: []
        };
        position.searchNationalCode = searchNationalCode;
        position.addPosition = addPosition;
        position.departmentChange = departmentChange;
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            loadingService.show();
            return $q.resolve().then(() => {
                return departmentService.list();
            }).then((result) => {
                position.department.departmentDropDown = result;
                position.state = 'cartable';
                $location.path('/position/cartable');
            }).finally(loadingService.hide)

        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                return listRole();
            }).then(() => {
                position.state = 'add';
                $location.path('/position/add');
            }).catch(() => {
                position.changeState.cartable();
                loadingService.hide();
            }).finally(loadingService.hide)
        }
        function searchNationalCode() {
            loadingService.show();
            return $q.resolve().then(() => {
                return profileService.searchByNationalCode(position.Model);
            }).then((result) => {
                if (result.Enabled) {
                    position.ResultSearch = result;
                    position.search = true;
                } else {
                    toaster.pop('error', '', 'کاربری با کدملی وارد شده پیدا نشد');
                }
            }).catch((error) => {
                toaster.pop('error', '', 'خطای ناشناخته');
            }).finally(loadingService.hide);

        }
        function listRole() {
            roleService.list().then((result) => {
                position.listRole = [].concat(result);
            })
        }
        function addPosition() {
            loadingService.show();
            $q.resolve().then(() => {
                if (!position.ResultSearch.Enabled) {
                    toaster.pop('error', '', 'کاربری را جست و جو نکردید');
                    return false;
                } else {
                    position.Model.UserID = position.ResultSearch.ID;
                    return true;
                }
            }).then((state) => {
                if (state) {
                    var json = '';
                    if (position.selectCommand.selected.length === 0) {
                        toaster.pop('error', '', 'نقشی انتخاب نکردید');
                        return false;
                    } else {
                        for (var i = 0; i < position.selectCommand.selected.length; i++) {
                            json += position.selectCommand.selected[i] + ',';
                        }
                        position.Model.Json = json;
                        return true;
                    }
                }
            }).then((state) => {
                if (state) {
                    positionService.add(position.Model).then((result) => {
                        toaster.pop('success', '', 'با موفقیت ذخیره گردید');
                    })
                }
            }).finally(loadingService.hide);
        }

        function departmentChange() {
            loadingService.show();
            return $q.resolve().then(() => {
                return positionService.list({ DepartmentID: position.department.Model.DepartmentID });
            }).then((result) => {
                position.listPositions = [].concat(result);
            }).finally(loadingService.hide);
        }
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------
    app.controller('changePasswordController', changePasswordController);
    changePasswordController.$inject = ['$scope', '$q', '$timeout', '$window', 'toaster', 'loadingService', 'profileService', 'toolsService'];
    function changePasswordController($scope, $q, $timeout, $window, toaster, loadingService, profileService, toolsService) {
        let profile = $scope;
        profile.Model = {};
        profile.changePassword = changePassword;

        function changePassword() {
            loadingService.show();
            $q.resolve().then(() => {
                profile.Model.UserID = toolsService.userID();
                return profileService.setPassword(profile.Model)
            }).then((result) => {
                toaster.pop('success', '', result.Message);
                $timeout(function () {
                    localStorage.clear();
                    $window.location.href('/account/login');
                }, 1000);
            }).catch((error) => {
                loadingService.hide();
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------
    app.controller('productController', productController);
    productController.$inject = ['$scope', '$routeParams', 'loadingService', '$q', 'toaster', '$location', 'productService', 'attachmentService', 'toolsService', 'enumService', 'froalaOption', 'sectionService'];
    function productController($scope, $routeParams, loadingService, $q, toaster, $location, productService, attachmentService, toolsService, enumService, froalaOption, sectionService) {
        var product = $scope;

        product.Model = {};
        product.Model.Errors = [];

        product.attachment = {};
        product.attachment.listPicUploaded = [];

        product.pic = { type: '6', allowMultiple: true, validTypes:'image/jpeg' };
        product.pic.list = [];

        product.search = {};
        product.search.Model = {};

        product.main = {};
        product.main.tabNumber = 1;
        product.main.changeState = {
            add: add,
            edit: edit,
            cartable: cartable
        }
        product.grid = {
            bindingObject: product
            , columns: [{ name: 'Title', displayName: 'عنوان آگهی' },
            { name: 'ProvinceType', displayName: 'نام استان', type: 'enum', source: enumService.ProvinceType },
            { name: 'SectionName', displayName: 'نام شهرستان' },
            { name: 'ProductType', displayName: 'نوع ملک', type: 'enum', source: enumService.ProductType },
            { name: 'SellingProductType', displayName: 'نوع فروش', type: 'enum', source: enumService.SellingProductType }]
            , listService: productService.list
            , onEdit: product.main.changeState.edit
            , globalSearch: true
            , searchBy: 'Title'
            , displayNameFormat: ['Title']
            , options: () => { return product.search.Model }
        };
        product.SellingProductType = toolsService.arrayEnum(enumService.SellingProductType);
        product.ProductType = toolsService.arrayEnum(enumService.ProductType);
        product.ProvinceType = toolsService.arrayEnum(enumService.ProvinceType);
        product.FloorCoveringType = toolsService.arrayEnum(enumService.FloorCoveringType);
        product.DocumentType = toolsService.arrayEnum(enumService.DocumentForProductType);

        //search
        product.search.DocumentType = toolsService.arrayEnum(enumService.DocumentForProductType);
        product.search.FloorCoveringType = toolsService.arrayEnum(enumService.FloorCoveringType);

        product.froalaOption = froalaOption.main;
        product.ProvinceChange = ProvinceChange;
        product.addProduct = addProduct;
        product.editProduct = editProduct;
        product.search.clear = clearSearch;
        init();
        function init() {
            loadingService.show();
            return $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'add':
                        product.main.changeState.add();
                        break;
                    case 'cartable':
                        product.main.changeState.cartable();
                        break;
                    case 'edit':
                        productService.get($routeParams.id).then((result) => {
                            product.main.changeState.edit(result);
                        })
                }
            }).finally(loadingService.hide)
        }
        function add() {
            product.state = 'add';
            $location.path('product/add');
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return productService.get(model.ID);
            }).then((result) => {
                product.Model = result;
                return attachmentService.list({ ParentID: product.Model.ID });
            }).then((result) => {
                product.attachment.listPicUploaded = [];
                if (result && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        product.attachment.listPicUploaded.push(result[i]);
                    }
                }

            }).then(() => {
                return ProvinceChange();
            })
                .then(() => {
                    product.state = 'edit';
                    $location.path(`/product/edit/${product.Model.ID}`);
                })
                .catch((error) => {
                loadingService.hide();
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function cartable() {
            loadingService.show();
            clearModel();
            product.state = 'cartable';
            $location.path('product/cartable');
            loadingService.hide();
        }
        function ProvinceChange() {
            loadingService.show();
            return $q.resolve().then(() => {
                return sectionService.list({ ProvinceType: product.Model.ProvinceType });
            }).then((result) => {
                if (result.length > 0) {
                    product.sectionList = [];
                    for (var i = 0; i < result.length; i++) {
                        product.sectionList.push({ Model: result[i].ID, Name: result[i].Name });
                    }
                }

            }).finally(loadingService.hide);
        }
        function clearModel() {
            product.Model = {};
            product.Model.Errors = [];
            product.pic.list = [];
            product.attachment.listPicUploaded = [];
            product.main.tabNumber = 1;
        }
        function clearSearch() {
            loadingService.show();
            product.search.Model = {};
            product.search.searchPanel = false;
            product.grid.getlist();
            loadingService.hide();
        }


        function addProduct() {
            loadingService.show();
            return $q.resolve().then(() => {
                return productService.add(product.Model);
            }).then((result) => {
                product.Model = result;

                if (product.pic.list.length) {
                    product.pics = [];
                    if (product.attachment.listPicUploaded && product.attachment.listPicUploaded.length === 0) {
                        product.pics.push({ ParentID: product.Model.ID, Type: 1, FileName: product.pic.list[0], PathType: product.pic.type });
                        for (var i = 1; i < product.pic.list.length; i++) {
                            product.pics.push({ ParentID: product.Model.ID, Type: 2, FileName: product.pic.list[i], PathType: product.pic.type });
                        }
                    } else {
                        for (var i = 0; i < product.pic.list.length; i++) {
                            product.pics.push({ ParentID: product.Model.ID, Type: 2, FileName: product.pic.list[i], PathType: product.pic.type });
                        }
                    }
                    return attachmentService.add(product.pics);
                }
                return true;
            }).then((result) => {
                toaster.pop('success', '', 'آگهی جدید با موفقیت اضافه گردید');
                loadingService.hide();
                product.grid.getlist();
                product.attachment.reset();
                product.main.changeState.cartable();
            }).catch((error) => {
                loadingService.hide();
                if (!error) {
                    $('#content > div').animate({
                        scrollTop: $('#ProductError').offset().top - $('#ProductError').offsetParent().offset().top
                    }, 'slow');
                } else {
                    var listError = error.split('&&');
                    product.Model.Errors = [].concat(listError);
                   
                }
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function editProduct() {
            loadingService.show();
            return $q.resolve().then(() => {
                return productService.edit(product.Model);
            }).then((result) => {
                product.Model = result;

                if (product.pic.list.length) {
                    product.pics = [];
                    if (product.attachment.listPicUploaded && product.attachment.listPicUploaded.length === 0) {
                        product.pics.push({ ParentID: product.Model.ID, Type: 1, FileName: product.pic.list[0], PathType: product.pic.type });
                        for (var i = 1; i < product.pic.list.length; i++) {
                            product.pics.push({ ParentID: product.Model.ID, Type: 2, FileName: product.pic.list[i], PathType: product.pic.type });
                        }
                    } else {
                        for (var i = 0; i < product.pic.list.length; i++) {
                            product.pics.push({ ParentID: product.Model.ID, Type: 2, FileName: product.pic.list[i], PathType: product.pic.type });
                        }
                    }
                    return attachmentService.add(product.pics);
                }
                return true;
            }).then((result) => {
                toaster.pop('success', '', 'آگهی با موفقیت ویرایش گردید');
                loadingService.hide();
                product.grid.getlist();
                product.attachment.reset();
                product.main.changeState.cartable();
            }).catch((error) => {
                loadingService.hide();
                if (!error) {
                    $('html, body').animate({
                        scrollTop: $('#ProductError').offset().top - $('#ProductError').offsetParent().offset().top
                    }, 'slow'); 
                } else {
                    var listError = error.split('&&');
                    product.Model.Errors = [].concat(listError);
                    $('html, body').animate({
                        scrollTop: $('#ProductError').offset().top - $('#ProductError').offsetParent().offset().top
                    }, 'slow');  
                }
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------
    app.controller('categoryController', categoryController);
    categoryController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'categoryService', '$location', 'toaster', '$timeout'];
    function categoryController($scope, $q, loadingService, $routeParams, categoryService, $location, toaster, $timeout) {
        let category = $scope;
        category.Model = {};
        category.main = {};
        category.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        category.state = '';
        category.error = {};
        category.error.show = false;;
        category.goToPageAdd = goToPageAdd;
        category.addCategory = addCategory;
        category.editCategory = editCategory;
        category.grid = {
            bindingObject: category
            , columns: [{ name: 'Title', displayName: 'عنوان' }]
            , listService: categoryService.list
            , onEdit: category.main.changeState.edit
            , route: 'category'
            , globalSearch: true
        };
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        categoryService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);

        }
        function cartable() {
            category.state = 'cartable';
            $location.path('/category/cartable');
        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                return select();
            }).then(() => {
                category.state = 'add';
                $location.path('/category/add');
            }).finally(loadingService.hide);
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return categoryService.get(model.ID);
            }).then((result) => {
                category.Model = result;
                return select();
            }).then(() => {
                category.state = 'edit';
                if (category.Model.ParentID !== "00000000-0000-0000-0000-000000000000") {
                    $('#hassubmenu').prop('checked', true);
                    $("#ParentID").prop("disabled", false);
                } else {
                    $('#hassubmenu').prop('checked', false);
                    $("#ParentID").prop("disabled", true);
                }
                $location.path(`/category/edit/${category.Model.ID}`);;
            }).finally(loadingService.hide);
        }
        function goToPageAdd() {
            add();
        }
        function addCategory() {
            loadingService.show();
            $q.resolve().then(() => {
                return categoryService.add(category.Model);
            }).then((result) => {
                category.Model = result;
                category.grid.getlist(false);
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 100);
            }).catch((error) => {
                if (!error) {
                    $('#content > div').animate({
                        scrollTop: $('#categorySection').offset().top - $('#categorySection').offsetParent().offset().top
                    }, 'slow');
                } else {
                    var listError = error.split('&&');
                    category.Model.Errors = [].concat(listError);
                    $('#content > div').animate({
                        scrollTop: $('#categorySection').offset().top - $('#categorySection').offsetParent().offset().top
                    }, 'slow');
                }
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');

            })
        }
        function editCategory() {
            loadingService.show();
            $q.resolve().then(() => {
                return categoryService.edit(category.Model);
            }).then((result) => {
                category.Model = result;
                category.grid.getlist(false);
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 100);
            }).catch((error) => {
                category.error.show = true;
                $('#content > div').animate({
                    scrollTop: $('#categorySection').offset().top - $('#categorySection').offsetParent().offset().top
                }, 'slow');
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');

            }).finally(loadingService.hide);
        }
        function select() {
            categoryService.list().then((result) => {
                category.selectCategory = [];
                for (i = 0; i < result.length; i++) {
                    if (result[i].ParentID === '00000000-0000-0000-0000-000000000000') {
                        category.selectCategory.push({ Model: result[i].ID, Name: result[i].Title });
                    }
                }
            })
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('commentController', commentController);
    commentController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'commentService', '$location', 'toaster', '$timeout', 'toolsService', 'enumService', 'froalaOption'];
    function commentController($scope, $q, loadingService, $routeParams, commentService, $location, toaster, $timeout, toolsService, enumService, froalaOption) {
        let comment = $scope;
        comment.Model = {};
        comment.state = '';
        comment.main = {};
        comment.froalaOptionComment = froalaOption.comment;
        comment.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        comment.editComment = editComment;
        comment.grid = {
            bindingObject: comment
            , columns: [{ name: 'NameFamily', displayName: 'نام کاربر' },
            { name: 'ProductName', displayName: 'نام محصول' },
            { name: 'CommentType', displayName: 'وضعیت نظر', type: 'enum', source: { 1: 'درحال بررسی', 2: 'تایید', 3: 'عدم تایید' } }]
            , listService: commentService.list
            , onEdit: comment.main.changeState.edit
            , globalSearch: true
            , showRemove: true
            , options: () => {
                return 6;
            }
        };
        comment.selectCommentType = toolsService.arrayEnum(enumService.CommentType);
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'edit':
                        commentService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);

        }

        function cartable() {
            loadingService.show();
            return $q.resolve().then(() => {
                comment.state = 'cartable';
                $location.path('/comment/cartable');
            }).finally(loadingService.hide);
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                comment.state = 'edit';
                comment.Model = model;
                $location.path(`/comment/edit/${model.ID}`);
            }).finally(loadingService.hide);
        }
        function editComment() {
            loadingService.show();
            return $q.resolve().then(() => {
                if (comment.Model.CommentType === 0) {
                    loadingService.hide();
                    toaster.pop('error', '', 'وضعیت نظر را تعیین نمایید');
                } else {
                    commentService.edit(comment.Model).then((result) => {
                        loadingService.hide();
                        comment.grid.getlist(false);
                        $timeout(function () {
                            toaster.pop('success', '', 'نظر ویرایش گردید');
                            cartable();

                        }, 1000);
                    }).finally(loadingService.hide);
                }
            }).catch((error) => {
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            })
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('categoryPortalController', categoryPortalController);
    categoryPortalController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'categoryPortalService', '$location', 'toaster', '$timeout'];
    function categoryPortalController($scope, $q, loadingService, $routeParams, categoryPortalService, $location, toaster, $timeout) {
        let category = $scope;
        category.Model = {};
        category.main = {};
        category.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        category.state = '';
        category.goToPageAdd = goToPageAdd;
        category.addCategory = addCategory;
        category.editCategory = editCategory;
        category.grid = {
            bindingObject: category
            , columns: [{ name: 'Title', displayName: 'عنوان مقاله' }]
            , listService: categoryPortalService.list
            , onEdit: category.main.changeState.edit
            , globalSearch: true
        };
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        categoryPortalService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);

        }

        function cartable() {
            category.state = 'cartable';
            $location.path('/category-portal/cartable');
        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                return select();
            }).then(() => {
                category.state = 'add';
                $location.path('/category-portal/add');
            }).finally(loadingService.hide)

        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return categoryPortalService.get(model.ID);
            }).then((result) => {
                category.Model = result;
                if (category.Model.ParentID !== "00000000-0000-0000-0000-000000000000") {
                    $('#hassubmenu').prop('checked', true);
                    $("#ParentID").prop("disabled", false);
                } else {
                    $('#hassubmenu').prop('checked', false);
                    $("#ParentID").prop("disabled", true);
                }
                return select();
            }).then(() => {
                category.state = 'edit';
                $location.path(`/category-portal/edit/${category.Model.ID}`);
            }).finally(loadingService.hide);

        }
        function goToPageAdd() {
            add();
        }
        function addCategory() {
            loadingService.show();
            return $q.resolve().then(() => {
                return categoryPortalService.add(category.Model);
            }).then((result) => {
                category.grid.getlist(false);
                category.Model = result;
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت درج گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 100);
            }).catch((error) => {
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function editCategory() {
            loadingService.show();
            return $q.resolve().then(() => {
                return categoryPortalService.edit(category.Model);
            }).then((result) => {
                category.Model = result;
                category.grid.getlist(false);
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 100);
            }).catch((error) => {
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function select() {
            return categoryPortalService.list().then((result) => {
                category.selectCategory = [];
                for (i = 0; i < result.length; i++) {
                    if (result[i].ParentID === '00000000-0000-0000-0000-000000000000') {
                        category.selectCategory.push({ Model: result[i].ID, Name: result[i].Title });
                    }
                }
            })
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('articleController', articleController);
    articleController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'articleService', '$location', 'toaster', '$timeout', 'categoryPortalService', 'attachmentService', 'toolsService', 'enumService', 'froalaOption'];
    function articleController($scope, $q, loadingService, $routeParams, articleService, $location, toaster, $timeout, categoryPortalService, attachmentService, toolsService, enumService, froalaOption) {
        let article = $scope;
        article.Model = {};
        article.main = {};
        article.attachment = {};
        article.Model.Errors = [];
        article.attachment.listPicUploaded = [];
        article.pic = { type: '4', allowMultiple: false };
        article.pic.list = [];
        article.state = '';
        article.goToPageAdd = goToPageAdd;
        article.addArticle = addArticle;
        article.editArticle = editArticle;
        article.typeshow = toolsService.arrayEnum(enumService.ShowArticleType);
        article.typecomment = toolsService.arrayEnum(enumService.CommentArticleType);
        init();
        article.main.changeState = {
            add: add,
            edit: edit,
            cartable: cartable
        }
        article.grid = {
            bindingObject: article
            , columns: [{ name: 'Title', displayName: 'عنوان مقاله' },
            { name: 'CreationDatePersian', displayName: 'تاریخ ایجاد' },
            { name: 'TrackingCode', displayName: 'کد پیگیری رویداد' }]
            , listService: articleService.list
            , deleteService: articleService.remove
            , onAdd: article.main.changeState.add
            , onEdit: article.main.changeState.edit
            , route: 'article'
            , globalSearch: true
            , displayNameFormat: ['Title']
        };
        article.froalaOption = angular.copy(froalaOption.main);
        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        articleService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            $('.js-example-tags').empty();
            clearModel();
            article.state = 'cartable';
            $location.path('/article/cartable');
        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                return fillDropCategory();
            }).then(() => {
                article.state = 'add';
                $location.path('/article/add');
            }).finally(loadingService.hide);

        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return articleService.get(model.ID);
            }).then((model) => {
                article.Model = model;
                if (article.Model.Tags !== null && article.Model.Tags.length > 0) {
                    var newOption = [];
                    for (var i = 0; i < article.Model.Tags.length; i++) {
                        newOption.push(new Option(article.Model.Tags[i], article.Model.Tags[i], false, true));
                    }
                    $timeout(() => {
                        $('.js-example-tags').append(newOption).trigger('change');
                    }, 0);
                }
                if (article.Model.IsShow) {
                    article.Model.IsShow = 1;
                }
                else {
                    article.Model.IsShow = 0;
                }
                if (article.Model.CommentStatus) {
                    article.Model.CommentStatus = 1;
                }
                else {
                    article.Model.CommentStatus = 0;
                }
                return true;
            }).then(() => {
                return fillDropCategory();
            }).then(() => {
                return attachmentService.list({ ParentID: article.Model.ID });
            }).then((result) => {
                article.Model.listPicUploaded = [];
                if (result && result.length > 0)
                    article.attachment.listPicUploaded = [].concat(result);
                article.state = 'edit';
                $location.path(`/article/edit/${model.ID}`);
            }).finally(loadingService.hide);
        }
        function goToPageAdd() {
            add();
        }
        function addArticle() {
            loadingService.show();
            return $q.resolve().then(() => {
                return articleService.add(article.Model);
            }).then((result) => {
                article.Model = result;
                if (article.pic.list.length) {
                    article.pics = [];
                    if (article.attachment.listPicUploaded === 0) {
                        article.pics.push({ ParentID: article.Model.ID, Type: 2, FileName: article.pic.list[0], PathType: article.pic.type });
                    }
                    return attachmentService.add(article.pics);
                }
                return true;
            }).then(() => {
                return attachmentService.list({ ParentID: article.Model.ID });
            }).then((result) => {
                article.attachment.listPicUploaded = [];
                if (result && result.length > 0)
                    article.attachment.listPicUploaded = [].concat(result);
                article.pics = [];
                article.pic.list = [];
                article.grid.getlist(false);
                toaster.pop('success', '', 'مقاله جدید با موفقیت اضافه گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);//return cartable
            }).catch((error) => {
                if (!error) {
                    $('#content > div').animate({
                        scrollTop: $('#articleSection').offset().top - $('#articleSection').offsetParent().offset().top
                    }, 'slow');
                } else {
                    var listError = error.split('&&');
                    article.Model.Errors = [].concat(listError);
                    $('#content > div').animate({
                        scrollTop: $('#articleSection').offset().top - $('#articleSection').offsetParent().offset().top
                    }, 'slow');
                }

                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function editArticle() {
            loadingService.show();
            return $q.resolve().then(() => {
                return articleService.edit(article.Model);
            }).then((result) => {
                article.Model = result;
                if (article.pic.list.length) {
                    article.pics = [];
                    if (article.attachment.listPicUploaded.length === 0) {
                        article.pics.push({ ParentID: article.Model.ID, Type: 2, FileName: article.pic.list[0], PathType: article.pic.type });
                    }
                    return attachmentService.add(article.pics);
                }
                return true;
            }).then(() => {
                return attachmentService.list({ ParentID: article.Model.ID });
            }).then((result) => {
                article.attachment.listPicUploaded = [];
                if (result && result.length > 0)
                    article.attachment.listPicUploaded = [].concat(result);
                article.pics = [];
                article.pic.list = [];
                article.grid.getlist(false);
                toaster.pop('success', '', 'مقاله با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);//return cartable
            }).catch((error) => {
                if (!error) {
                    $('#content > div').animate({
                        scrollTop: $('#articleSection').offset().top - $('#articleSection').offsetParent().offset().top
                    }, 'slow');
                } else {
                    var listError = error.split('&&');
                    article.Model.Errors = [].concat(listError);
                    $('#content > div').animate({
                        scrollTop: $('#articleSection').offset().top - $('#articleSection').offsetParent().offset().top
                    }, 'slow');
                }

                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }

        function fillDropCategory() {
            categoryPortalService.list().then((result) => {
                article.typecategory = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].ParentID !== '00000000-0000-0000-0000-000000000000') {
                        article.typecategory.push({ Name: result[i].Title, Model: result[i].ID });
                    }
                }
            })
        }
        function clearModel() {
            article.Model = {};
            article.attachment.listPicUploaded = [];
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('newsController', newsController);
    newsController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'newsService', '$location', 'toaster', '$timeout', 'categoryPortalService', 'attachmentService', 'toolsService', 'enumService', 'froalaOption'];
    function newsController($scope, $q, loadingService, $routeParams, newsService, $location, toaster, $timeout, categoryPortalService, attachmentService, toolsService, enumService, froalaOption) {
        let news = $scope;
        news.Model = {};
        news.main = {};
        news.attachment = {};
        news.attachment.listPicUploaded = [];
        news.pic = { type: '3', allowMultiple: false };
        news.pic.list = [];
        news.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        news.Model.Errors = [];
        news.state = '';
        news.froalaOption = angular.copy(froalaOption.main);
        news.goToPageAdd = goToPageAdd;
        news.addNews = addNews;
        news.editNews = editNews;
        news.typeshow = toolsService.arrayEnum(enumService.ShowArticleType);
        news.typecomment = toolsService.arrayEnum(enumService.CommentArticleType);
        news.grid = {
            bindingObject: news
            , columns: [{ name: 'Title', displayName: 'عنوان خبر' },
            { name: 'CreationDatePersian', displayName: 'تاریخ ایجاد' },
            { name: 'TrackingCode', displayName: 'کد پیگیری رویداد' }]
            , listService: newsService.list
            , deleteService: newsService.remove
            , onEdit: news.main.changeState.edit
            , globalSearch: true
            , displayNameFormat: ['Title']
        };

        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        newsService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            $('.js-example-tags').empty();
            news.state = 'cartable';
            clearModel();
            $location.path('/news/cartable');
        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                return fillDropCategory();
            }).then(() => {
                news.attachment.reset();
            }).then(() => {
                news.Model = {};
                news.state = 'add';
                $location.path('/news/add');
            }).finally(loadingService.hide);

        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return newsService.get(model.ID);
            }).then((result) => {
                news.Model = angular.copy(result);
                if (news.Model.IsShow) {
                    news.Model.IsShow = 1;
                }
                else {
                    news.Model.IsShow = 0;
                }
                if (news.Model.CommentStatus) {
                    news.Model.CommentStatus = 1;
                }
                else {
                    news.Model.CommentStatus = 0;
                }
                if (news.Model.Tags !== null && news.Model.Tags.length > 0) {
                    var newOption = [];
                    for (var i = 0; i < news.Model.Tags.length; i++) {
                        newOption.push(new Option(news.Model.Tags[i], news.Model.Tags[i], false, true));
                    }
                    $timeout(() => {
                        $('.js-example-tags').append(newOption).trigger('change');
                    }, 0);
                }

                return true;
            }).then(() => {
                return fillDropCategory();
            }).then(() => {
                return attachmentService.list({ ParentID: news.Model.ID });
            }).then((result) => {
                if (result && result.length > 0)
                    news.attachment.listPicUploaded = [].concat(result);
            }).then(() => {
                news.state = 'edit';
                $location.path(`/news/edit/${model.ID}`);
            }).finally(loadingService.hide);
        }
        function goToPageAdd() {
            add();
        }
        function addNews() {
            loadingService.show();
            return $q.resolve().then(() => {
                return newsService.add(news.Model)
            }).then((result) => {
                news.Model = result;
                if (news.pic.list.length) {
                    news.pics = [];
                    if (!news.attachment.listPicUploaded) {
                        news.pics.push({ ParentID: news.Model.ID, Type: 1, FileName: news.pic.list[0], PathType: news.pic.type });
                    }
                    return attachmentService.add(news.pics);
                }
                return true;
            }).then((result) => {
                return attachmentService.list({ ParentID: news.Model.ID });
            }).then((result) => {
                news.attachment.listPicUploaded = [];
                if (result && result.length > 0)
                    news.attachment.listPicUploaded = [].concat(result);
                news.pics = [];
                news.pic.list = [];
                news.grid.getlist(false);
                toaster.pop('success', '', 'خبر جدید با موفقیت اضافه گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);//return cartable
            }).catch((error) => {
                if (!error) {
                    var listError = error.split('&&');
                    news.Model.Errors = [].concat(listError);
                    $('#content > div').animate({
                        scrollTop: $('#newsSection').offset().top - $('#newsSection').offsetParent().offset().top
                    }, 'slow');
                } else {
                    $('#content > div').animate({
                        scrollTop: $('#newsSection').offset().top - $('#newsSection').offsetParent().offset().top
                    }, 'slow');
                }

                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function editNews() {
            loadingService.show();
            return $q.resolve().then(() => {
                return newsService.edit(news.Model);
            }).then((result) => {
                news.Model = result;
                if (news.pic.list.length) {
                    news.pics = [];
                    if (!news.attachment.listPicUploaded) {
                        news.pics.push({ ParentID: news.Model.ID, Type: 1, FileName: news.pic.list[0], PathType: news.pic.type });
                    }
                    return attachmentService.add(news.pics);
                }
                return true;
            }).then((result) => {
                return attachmentService.list({ ParentID: news.Model.ID });
            }).then((result) => {
                news.attachment.listPicUploaded = [];
                if (result && result.length > 0)
                    news.attachment.listPicUploaded = [].concat(result);
                news.pics = [];
                news.pic.list = [];
                news.grid.getlist(false);
                toaster.pop('success', '', 'خبر جدید با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);//return cartable
            }).catch((error) => {
                if (!error) {
                    var listError = error.split('&&');
                    news.Model.Errors = [].concat(listError);
                    $('#content > div').animate({
                        scrollTop: $('#newsSection').offset().top - $('#newsSection').offsetParent().offset().top
                    }, 'slow');
                } else {
                    $('#content > div').animate({
                        scrollTop: $('#newsSection').offset().top - $('#newsSection').offsetParent().offset().top
                    }, 'slow');
                }

                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function fillDropCategory() {
            categoryPortalService.list().then((result) => {
                news.typecategory = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].ParentID !== '00000000-0000-0000-0000-000000000000') {
                        news.typecategory.push({ Name: result[i].Title, Model: result[i].ID });
                    }
                }
            })
        }
        function clearModel() {
            news.Model = {};
            news.attachment.listPicUploaded = [];
        }
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('pagesController', pagesController);
    pagesController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'pagesService', '$location', 'toaster', '$timeout', 'toolsService'];
    function pagesController($scope, $q, loadingService, $routeParams, pagesService, $location, toaster, $timeout, toolsService) {
        let pages = $scope;
        pages.Model = {};
        pages.main = {};
        pages.state = 'cartable';
        pages.goToPageAdd = goToPageAdd;
        pages.addPages = addPages;
        pages.editPages = editPages;
        pages.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        //< i class='fa fa-plus tgrid-action' ng-click='cellTemplateScope.add(row.branch)' title ='افزودن'></i >
        //< i class='fa fa-trash tgrid-action' ng-click='cellTemplateScope.remove(row.branch)' title ='حذف'></i >
        pages.tree = {
            data: []
            , colDefs: [
                { field: 'Title', displayName: 'عنوان' }
                , { field: 'RouteUrl', displayName: 'آدرس' }
                , {
                    field: ''
                    , displayName: ''
                    , cellTemplate: (
                        `<div style='float: left'>
                            <i class='fa fa-pencil tgrid-action pl-1 text-primary' style='cursor:pointer;' ng-click='cellTemplateScope.edit(row.branch)' title='ویرایش'></i>
                        </div>`)
                    , cellTemplateScope: {
                        edit: view,
                        //add: addFirst,
                        //remove:remove,

                    }
                }
            ]
            , expandingProperty: {
                field: "Title"
                , displayName: "عنوان"
            }
        };
        pagesService.list().then((result) => {
            setTreeObject(result);
        });
        init();
        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        pagesService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                    case 'view':
                        pagesService.get($routeParams.id).then((result) => {
                            view(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);

        }
        function cartable() {
            pages.Model = {};
            pages.state = 'cartable';
            $location.path('pages/cartable');
        }
        function add(parent) {
            parent = parent || {};
            pages.Model = { ParentID: parent.ID };
            pages.state = 'add';
            $location.path('/pages/add');
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                pages.state = 'edit';
                pages.Model = model;
                $location.path(`/pages/edit/${pages.Model.ID}`);
            }).finally(loadingService.hide);

        }
        function addFirst(parent) {
            pages.state = 'add';
            goToPageAdd(parent);
        }
        function goToPageAdd(parent) {
            add(parent);
        }
        function addPages() {
            loadingService.show();
            return $q.resolve().then(() => {
                return pagesService.add(pages.Model)
            }).then((result) => {
                return pagesService.list();
            }).then((result) => {
                setTreeObject(result);
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت اضافه گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);
            }).catch((error) => {
                toaster.pop('error', '', 'خطا');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function editPages() {
            loadingService.show();
            return $q.resolve().then(() => {
                return pagesService.edit(pages.Model)
            }).then((result) => {
                pages.Model = result;
                return pagesService.list();
            }).then((result) => {
                setTreeObject(result);
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);
            }).catch((error) => {
                toaster.pop('error', '', 'خطا');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function setTreeObject(items) {
            items.map((item) => {
                if (item.ParentNode === '/')
                    item.expanded = true;
            });
            pages.tree.data = toolsService.getTreeObject(items, 'Node', 'ParentNode', '/');
        }
        function remove(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return pagesService.remove(model.ID);
            }).then((result) => {
                return pagesService.list();
            }).then((result) => {
                setTreeObject(result);
            }).finally(loadingService.hide);
        }
        function view(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                pages.state = 'view';
                pages.Model = model;
                $location.path(`/pages/view/${pages.Model.ID}`);
            }).finally(loadingService.hide);

        }
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('menuController', menuController);
    menuController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'menuService', '$location', 'toaster', '$timeout', 'toolsService'];
    function menuController($scope, $q, loadingService, $routeParams, menuService, $location, toaster, $timeout, toolsService) {
        let menu = $scope;
        menu.Model = {};
        menu.list = [];
        menu.lists = [];
        menu.state = 'cartable';
        menu.goToPageAdd = goToPageAdd;
        menu.addMenu = addMenu;
        menu.editMenu = editMenu;
        menu.changeState = {
            cartable: cartable,
            edit: edit
        }
        menu.tree = {
            data: []
            , colDefs: [
                { field: 'Name', displayName: 'عنوان' }
                , {
                    field: ''
                    , displayName: ''
                    , cellTemplate: (
                        `<div style='float: left'>
                            <i class='fa fa-plus tgrid-action pl-1 text-success' style='cursor:pointer;' ng-click='cellTemplateScope.add(row.branch)' title='افزودن'></i>
                            <i class='fa fa-pencil tgrid-action pl-1 text-primary' style='cursor:pointer;' ng-click='cellTemplateScope.edit(row.branch)' title='ویرایش'></i>
                            <i class='fa fa-trash tgrid-action pl-1 text-danger' style='cursor:pointer;' ng-click='cellTemplateScope.remove(row.branch)' title='حذف'></i>
                        </div>`)
                    , cellTemplateScope: {
                        edit: edit,
                        add: addFirst,
                        remove: remove
                    }
                }
            ]
            , expandingProperty: {
                field: "Name"
                , displayName: "عنوان"
            }
        };
        init();


        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        menuService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);

        }

        function cartable() {
            menuService.list().then((result) => {
                setTreeObject(result);
            });
            menu.state = 'cartable';
            $location.path('menu/cartable');
        }
        function add(parent) {
            parent = parent || {};
            menu.Model = { ParentID: parent.ID };
            menu.state = 'add';
            $location.path('/menu/add');
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                menu.Model = model;
                return menuService.getbyParentNode({ ParentNode: model.ParentNode });
            }).then((result) => {
                menu.state = 'edit';
                menu.Model.ParentID = result.ID;
                $location.path(`/menu/edit/${menu.Model.ID}`);
            }).finally(loadingService.hide);

        }
        function addFirst(parent) {
            menu.state = 'add';
            goToPageAdd(parent);
        }
        function goToPageAdd(parent) {
            add(parent);
        }
        function addMenu() {
            loadingService.show();
            return $q.resolve().then(() => {
                return menuService.add(menu.Model)
            }).then((result) => {
                toaster.pop('success', '', 'منو جدید با موفقیت اضافه گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);
            }).catch((error) => {
                toaster.pop('error', '', 'خطا');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function editMenu() {
            loadingService.show();
            return $q.resolve().then(() => {
                return menuService.edit(menu.Model)
            }).then((result) => {
                menu.Model = result;
                toaster.pop('success', '', 'دسته بندی جدید با موفقیت ویرایش گردید');
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);
            }).catch((error) => {
                toaster.pop('error', '', 'خطا');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function setTreeObject(items) {
            items.map((item) => {
                if (item.ParentNode === '/')
                    item.expanded = true;
            });
            menu.tree.data = toolsService.getTreeObject(items, 'Node', 'ParentNode', '/');
        }
        function remove(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return menuService.remove(model.ID);
            }).then(() => {
                return menuService.list();
            }).then((result) => {
                setTreeObject(result);
            }).finally(loadingService.hide);
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('sliderController', sliderController);
    sliderController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'sliderService', '$location', 'toaster', '$timeout', 'attachmentService', 'toolsService', 'enumService'];
    function sliderController($scope, $q, loadingService, $routeParams, sliderService, $location, toaster, $timeout, attachmentService, toolsService, enumService) {
        let slider = $scope;
        slider.Model = {};
        slider.Model.listPicUploaded = [];
        slider.Model.Errors = [];
        slider.state = '';
        slider.pic = { type: '5', allowMultiple: false };
        slider.pic.list = [];
        slider.main = {};
        slider.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        slider.grid = {
            bindingObject: slider
            , columns: [{ name: 'Title', displayName: 'عنوان اسلایدر' }]
            , listService: sliderService.list
            , deleteService: sliderService.remove
            , onEdit: edit
            , route: 'slider'
            , globalSearch: true
            , displayNameFormat: ['Title']
        };
        slider.goToPageAdd = goToPageAdd;
        slider.addSlider = addSlider;
        slider.editSlider = editSlider;
        slider.typeEnable = toolsService.arrayEnum(enumService.ShowArticleType);
        init();
        function init() {
            loadingService.show();
            return $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        loadingService.hide();
                        break;
                    case 'add':
                        add();
                        loadingService.hide();
                        break;
                    case 'edit':
                        sliderService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        loadingService.hide();
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            slider.state = 'cartable';
            $location.path('/slider/cartable');
        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                slider.state = 'add';
                $location.path('/slider/add');
            }).finally(loadingService.hide);

        }
        function edit(model) {
            return $q.resolve().then(() => {
                slider.Model = model;
                return attachmentService.list({ ParentID: slider.Model.ID });
            }).then((result) => {
                slider.Model.listPicUploaded = [];
                if (result && result.length > 0)
                    slider.Model.listPicUploaded = [].concat(result);
            }).then(() => {
                slider.state = 'edit';
                $location.path(`/slider/edit/${model.ID}`);
            })
        }

        function goToPageAdd() {
            add();
        }
        function addSlider() {
            loadingService.show();
            return $q.resolve().then(() => {
                sliderService.add(slider.Model).then((result) => {
                    slider.Model = result;
                    slider.Model.listPicUploaded = [];
                    if (slider.pic.list.length) {
                        slider.pics = [];
                        if (slider.Model.listPicUploaded.length === 0) {
                            slider.pics.push({ ParentID: slider.Model.ID, Type: 2, FileName: slider.pic.list[0], PathType: slider.pic.type });
                        }
                        return attachmentService.add(slider.pics);
                    }
                }).then((result) => {
                    return attachmentService.list({ ParentID: slider.Model.ID });
                }).then((result) => {
                    if (result && result.length > 0)
                        slider.Model.listPicUploaded = [].concat(result);
                    slider.pics = [];
                    slider.pic.list = [];
                    slider.grid.getlist();
                    toaster.pop('success', '', 'اسلایدر جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);//return cartable
                }).catch((error) => {
                    if (error && error.length > 0) {
                        var listError = error.split('&&');
                        slider.Model.Errors = [].concat(listError);
                        $('#content > div').animate({
                            scrollTop: $('#sliderSection').offset().top - $('#sliderSection').offsetParent().offset().top
                        }, 'slow');
                    } else {
                        $('#content > div').animate({
                            scrollTop: $('#sliderSection').offset().top - $('#sliderSection').offsetParent().offset().top
                        }, 'slow');
                    }

                    toaster.pop('error', '', 'خطایی اتفاق افتاده است');
                }).finally(loadingService.hide);
            })
        }
        function editSlider() {
            loadingService.show();
            return $q.resolve().then(() => {
                sliderService.edit(slider.Model).then((result) => {
                    if (slider.pic.list.length) {
                        slider.pics = [];
                        if (slider.Model.listPicUploaded.length === 0) {
                            slider.pics.push({ ParentID: slider.Model.ID, Type: 2, FileName: slider.pic.list[0], PathType: slider.pic.type });
                        }
                        return attachmentService.add(slider.pics);
                    }
                    //slider.Model = result;
                }).then((result) => {
                    return attachmentService.list({ ParentID: slider.Model.ID });
                }).then((result) => {
                    if (result && result.length > 0)
                        slider.Model.listPicUploaded = [].concat(result);
                    slider.pics = [];
                    slider.pic.list = [];
                    slider.grid.getlist();
                    toaster.pop('success', '', 'اسلایدر جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);//return cartable
                }).catch((error) => {
                    if (!error) {
                        var listError = error.split('&&');
                        slider.Model.Errors = [].concat(listError);
                        $('#content > div').animate({
                            scrollTop: $('#sliderSection').offset().top - $('#sliderSection').offsetParent().offset().top
                        }, 'slow');
                    } else {
                        $('#content > div').animate({
                            scrollTop: $('#sliderSection').offset().top - $('#sliderSection').offsetParent().offset().top
                        }, 'slow');
                    }

                    toaster.pop('error', '', 'خطایی اتفاق افتاده است');
                }).finally(loadingService.hide);
            })
        }
    }
    //---------------------------------------------------------------------------------------------------------------------------------------
    app.controller('generalSettingController', generalSettingController);
    generalSettingController.$inject = ['$scope', 'loadingService', 'generalSettingService', 'toaster', '$q'];
    function generalSettingController($scope, loadingService, generalSettingService, toaster, $q) {
        let setting = $scope;
        setting.Model = {};
        setting.editSetting = editSetting;
        init();

        function init() {
            loadingService.show();
            return $q.resolve().then(() => {
                return generalSettingService.getSetting();
            }).then((result) => {
                setting.Model = angular.copy(result);
            }).catch((error) => {
                toaster.pop('error', '', 'خطا در بازیابی اطلاعات');
            }).finally(loadingService.hide);
        }

        function editSetting() {
            loadingService.show();
            return $q.resolve().then(() => {
                return generalSettingService.edit(setting.Model);
            }).then(() => {
                toaster.pop('success', '', 'تنظیمات با موفقیت ذخیره گردید');
                init();
            }).finally(loadingService.hide);
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('eventsController', eventsController);
    eventsController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'eventsService', '$location', 'toaster', '$timeout', 'categoryPortalService', 'attachmentService', 'toolsService', 'enumService', 'froalaOption'];
    function eventsController($scope, $q, loadingService, $routeParams, eventsService, $location, toaster, $timeout, categoryPortalService, attachmentService, toolsService, enumService, froalaOption) {
        let events = $scope;
        events.state = '';
        events.froalaOption = angular.copy(froalaOption.main);

        events.Model = {};
        events.Model.Errors = [];

        events.attachment = {};
        events.attachment.listPicUploaded = [];
        events.attachment.listVideoUploaded = [];

        events.pic = { type: '8', allowMultiple: false };
        events.pic.list = [];
        events.video = { type: '7', allowMultiple: false };
        events.video.list = [];

        events.main = {};
        events.main.changeState = {
            cartable: cartable,
            edit: edit,
            add: add
        }

        events.addEvents = addEvents;
        events.editEvents = editEvents;

        events.typeshow = toolsService.arrayEnum(enumService.ShowArticleType);
        events.typecomment = toolsService.arrayEnum(enumService.CommentArticleType);
        events.grid = {
            bindingObject: events
            , columns: [{ name: 'Title', displayName: 'عنوان رویداد' },
            { name: 'CreationDatePersian', displayName: 'تاریخ ایجاد' },
            { name: 'TrackingCode', displayName: 'کد پیگیری رویداد' }]
            , listService: eventsService.list
            , deleteService: eventsService.remove
            , onEdit: events.main.changeState.edit
            , globalSearch: true
            , searchBy: 'Title'
            , displayNameFormat: ['Title']
        };
        init();
        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'add':
                        add();
                        break;
                    case 'edit':
                        eventsService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            loadingService.show();
            clearModel();
            events.state = 'cartable';
            $location.path('/events/cartable');
            loadingService.hide();
        }
        function add() {
            loadingService.show();
            return $q.resolve().then(() => {
                return fillDropCategory();
            }).then(() => {
                events.state = 'add';
                $location.path('/events/add');
            }).finally(loadingService.hide);

        }
        function edit(model) {
            return $q.resolve().then(() => {
                return eventsService.get(model.ID);
            }).then((result) => {
                events.Model = angular.copy(result);
                if (events.Model.Tags !== null && events.Model.Tags.length > 0) {
                    var newOption = [];
                    for (var i = 0; i < events.Model.Tags.length; i++) {
                        newOption.push(new Option(events.Model.Tags[i], events.Model.Tags[i], false, true));
                    }
                    $timeout(() => {
                        $('.js-example-tags').append(newOption).trigger('change');
                    }, 0);
                }
                return fillDropCategory();
            }).then(() => {
                return attachmentService.list({ ParentID: events.Model.ID });
            }).then((result) => {
                events.attachment.listPicUploaded = [];
                events.attachment.listVideoUploaded = [];
                if (result && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].PathType === 8)
                            events.attachment.listPicUploaded = [].concat(result[i]);
                        if (result[i].PathType === 7)
                            events.attachment.listVideoUploaded = [].concat(result[i]);
                    }
                }
            }).then(() => {
                events.state = 'edit';
                $location.path(`/events/edit/${model.ID}`);
            })
        }

        function addEvents() {
            loadingService.show();
            return $q.resolve().then(() => {
                eventsService.add(events.Model).then((result) => {
                    events.Model = angular.copy(result);
                    if (events.pic.list.length) {
                        events.pics = [];
                        if (events.attachment.listPicUploaded.length === 0) {
                            events.pics.push({ ParentID: events.Model.ID, Type: 2, FileName: events.pic.list[0], PathType: events.pic.type });
                            return attachmentService.add(events.pics);
                        }
                    }
                }).then(() => {
                    if (events.video.list.length) {
                        events.videos = [];
                        if (events.attachment.listVideoUploaded.length === 0) {
                            events.videos.push({ ParentID: events.Model.ID, Type: 2, FileName: events.video.list[0], PathType: events.video.type });
                            return attachmentService.add(events.videos);
                        }
                    }
                }).then((result) => {
                    return attachmentService.list({ ParentID: events.Model.ID });
                }).then((result) => {
                    events.attachment.listPicUploaded = [];
                    events.attachment.listVideoUploaded = [];
                    if (result && result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].PathType === 8)
                                events.attachment.listPicUploaded = [].concat(result[i]);
                            if (result[i].PathType === 7)
                                events.attachment.listVideoUploaded = [].concat(result[i]);
                        }
                    }
                    events.pics = [];
                    events.pic.list = [];
                    events.videos = [];
                    event.video.list = [];
                    events.grid.getlist(false);
                    toaster.pop('success', '', 'رویداد جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        events.main.changeState.cartable();
                    }, 1000);//return cartable
                }).catch((error) => {
                    if (!error) {
                        var listError = error.split('&&');
                        events.Model.Errors = [].concat(listError);
                        $('#content > div').animate({
                            scrollTop: $('#eventsSection').offset().top - $('#eventsSection').offsetParent().offset().top
                        }, 'slow');
                    } else {
                        $('#content > div').animate({
                            scrollTop: $('#eventsSection').offset().top - $('#eventsSection').offsetParent().offset().top
                        }, 'slow');
                    }

                    toaster.pop('error', '', 'خطایی اتفاق افتاده است');
                }).finally(loadingService.hide);
            })
        }
        function editEvents() {
            loadingService.show();
            return $q.resolve().then(() => {
                eventsService.edit(events.Model).then((result) => {
                    events.Model = angular.copy(result);
                    if (events.pic.list.length) {
                        events.pics = [];
                        if (events.attachment.listPicUploaded.length === 0) {
                            events.pics.push({ ParentID: events.Model.ID, Type: 2, FileName: events.pic.list[0], PathType: events.pic.type });
                            return attachmentService.add(events.pics);
                        }
                    }
                }).then(() => {
                    if (events.video.list.length) {
                        events.videos = [];
                        if (events.attachment.listVideoUploaded.length === 0) {
                            events.videos.push({ ParentID: events.Model.ID, Type: 2, FileName: events.video.list[0], PathType: events.video.type });
                            return attachmentService.add(events.videos);
                        }
                    }
                }).then((result) => {
                    return attachmentService.list({ ParentID: events.Model.ID });
                }).then((result) => {
                    events.attachment.listPicUploaded = [];
                    events.attachment.listVideoUploaded = [];
                    if (result && result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].PathType === 8)
                                events.attachment.listPicUploaded = [].concat(result[i]);
                            if (result[i].PathType === 7)
                                events.attachment.listVideoUploaded = [].concat(result[i]);
                        }
                    }
                    events.pics = [];
                    events.pic.list = [];
                    events.videos = [];
                    events.video.list = [];
                    events.grid.getlist(false);
                    toaster.pop('success', '', 'رویداد جدید با موفقیت ویرایش گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);//return cartable
                }).catch((error) => {
                    if (!error) {
                        var listError = error.split('&&');
                        events.Model.Errors = [].concat(listError);
                        $('#content > div').animate({
                            scrollTop: $('#eventsSection').offset().top - $('#eventsSection').offsetParent().offset().top
                        }, 'slow');
                    } else {
                        $('#content > div').animate({
                            scrollTop: $('#eventsSection').offset().top - $('#eventsSection').offsetParent().offset().top
                        }, 'slow');
                    }

                    toaster.pop('error', '', 'خطایی اتفاق افتاده است');
                }).finally(loadingService.hide);
            })
        }

        function fillDropCategory() {
            return categoryPortalService.list().then((result) => {
                events.typecategory = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].ParentID !== '00000000-0000-0000-0000-000000000000') {
                        events.typecategory.push({ Name: result[i].Title, Model: result[i].ID });
                    }
                }
            })
        }
        function clearModel() {
            $('.js-example-tags').empty();
            events.Model = {};
            events.attachment.listPicUploaded = [];
            events.attachment.listVideoUploaded = [];
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
    app.controller('commentPortalController', commentPortalController);
    commentPortalController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'commentService', '$location', 'toaster', '$timeout', 'toolsService', 'enumService', 'froalaOption'];
    function commentPortalController($scope, $q, loadingService, $routeParams, commentService, $location, toaster, $timeout, toolsService, enumService, froalaOption) {
        let comment = $scope;
        comment.Model = {};
        comment.Model.Errors = [];

        comment.Search = {};
        comment.state = '';
        comment.main = {};
        comment.froalaOptionComment = angular.copy(froalaOption.comment);
        comment.main.changeState = {
            cartable: cartable,
            edit: edit
        }
        comment.editComment = editComment;
        comment.changeDrop = changeDrop;
        comment.grid = {
            bindingObject: comment
            , columns: [{ name: 'NameFamily', displayName: 'نام کاربر' },
            { name: 'ProductName', displayName: 'عنوان' },
            { name: 'CommentType', displayName: 'وضعیت نظر', type: 'enum', source: { 1: 'درحال بررسی', 2: 'تایید', 3: 'عدم تایید' } }]
            , listService: commentService.list
            , onEdit: comment.main.changeState.edit
            , globalSearch: true
            , showRemove: true
            , options: () => { return comment.Search.CommentForType }
        };

        comment.selectCommentType = toolsService.arrayEnum(enumService.CommentType);
        comment.selectCommentForType = toolsService.arrayEnum(enumService.CommentForType);
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'edit':
                        commentService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);

        }

        function cartable() {
            loadingService.show();
            return $q.resolve().then(() => {
                comment.state = 'cartable';
                $location.path('/comment-portal/cartable');
            }).finally(loadingService.hide);
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                comment.state = 'edit';
                comment.Model = model;
                $location.path(`/comment-portal/edit/${model.ID}`);
            }).finally(loadingService.hide);
        }

        function editComment() {
            loadingService.show();
            return $q.resolve().then(() => {
                return commentService.edit(comment.Model)
            }).then((result) => {
                comment.grid.getlist(false);
                loadingService.hide();
                $timeout(function () {
                    toaster.pop('success', '', 'نظر ویرایش گردید');
                    cartable();

                }, 1000);
            }).catch((error) => {
                toaster.pop('error', '', 'خطایی اتفاق افتاده است');
            }).finally(loadingService.hide);
        }
        function changeDrop() {
            loadingService.show();
            return $q.resolve().then(() => {
                comment.grid.getlist(false);
            }).finally(loadingService.hide);

        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------
    app.controller('notificationController', notificationController);
    notificationController.$inject = ['$scope', '$q', 'loadingService', '$routeParams', 'notificationService', '$location'];
    function notificationController($scope, $q, loadingService, $routeParams, notificationService, $location) {
        let notification = $scope;
        notification.Model = {};
        notification.main = {};
        notification.state = '';
        notification.main.changeState = {
            cartable: cartable,
            view: view
        }
        init();
        notification.grid = {
            bindingObject: notification
            , columns: [{ name: 'Title', displayName: 'عنوان پیام' },
            { name: 'CreationDatePersian', displayName: 'تاریخ ایجاد' },
            { name: 'ReadDatePersian', displayName: 'تاریخ مشاهده' }]
            , listService: notificationService.list
            , onEdit: notification.main.changeState.view
            , globalSearch: true
            , searchBy: 'Title'
            , displayNameFormat: ['Title']
            , checkActionVisibility: (action, item) => {
                if (action === 'remove')
                    return false;
                if (action === 'edit')
                    return true;
            }
        };
        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        break;
                    case 'view':
                        notification.main.changeState.view($routeParams.id);
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            notification.state = 'cartable';
            $location.path('/notification/cartable');
        }
        function view(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                if (model && model.ID)
                    return notificationService.get(model.ID);
                else
                    return notificationService.get($routeParams.id);
            }).then((result) => {
                notification.Model = angular.copy(result);
                notification.state = 'view';
                $location.path(`notification/view/${notification.Model.ID}`);
            })
                .finally(loadingService.hide);
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------
    app.controller('departmentController', departmentController);
    departmentController.$inject = ['$scope', '$q', 'departmentService', 'loadingService', '$routeParams', '$location', 'toaster', '$timeout', 'toolsService'];
    function departmentController($scope, $q, departmentService, loadingService, $routeParams, $location, toaster, $timeout, toolsService) {
        let department = $scope;
        department.Model = {};
        department.list = [];
        department.lists = [];
        department.state = 'cartable';
        department.goToPageAdd = goToPageAdd;
        department.addDepartment = addDepartment;
        department.addSubDepartment = addSubDepartment;
        department.editDepartment = editDepartment;
        department.changeState = {
            cartable: cartable
        }
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        loadingService.hide();
                        break;
                    case 'add':
                        goToPageAdd();
                        loadingService.hide();
                        break;
                    case 'edit':
                        departmentService.get($routeParams.id).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);


        } // end init

        function cartable() {
            department.tree = {
                data: []
                , colDefs: [
                    { field: 'Name', displayName: 'نام دستگاه' }
                    , {
                        field: ''
                        , displayName: ''
                        , cellTemplate: (
                            `<div class='pull-left'>
                            <i class='fa fa-plus tgrid-action pl-1 text-success' style='cursor:pointer;' ng-click='cellTemplateScope.add(row.branch)' title='افزودن'></i>
                            <i class='fa fa-pencil tgrid-action pl-1 text-primary' style='cursor:pointer;' ng-click='cellTemplateScope.edit(row.branch)' title='ویرایش'></i>
                        </div>`)
                        , cellTemplateScope: {
                            edit: edit,
                            add: addSubDepartment,
                            //remove: remove
                        }
                    }
                ]
                , expandingProperty: {
                    field: "Title"
                    , displayName: "عنوان"
                }
            };
            departmentService.list().then((result) => {
                setTreeObject(result);
            });
            department.state = 'cartable';
            $location.path('department/cartable');
        }
        function edit(parent) {
            loadingService.show();
            return $q.resolve().then(() => {
                return departmentService.get(parent.ID)
            }).then((result) => {
                department.Model = result;
                return departmentService.listByNode({ Node: result.ParentNode });
            }).then((result) => {
                if (result && result.length > 0) {
                    department.Model.ParentID = result[0].ID;
                } else {
                    department.Model.ParentID = '00000000-0000-0000-0000-000000000000';
                }
                $location.path(`/department/edit/${result.ID}`);
                department.state = 'edit';

            }).finally(loadingService.hide)
        }
        function goToPageAdd(parent) {
            parent = parent || {};
            department.state = 'add';
            department.Model = { ParentID: parent.ID };
            $location.path('/department/add');
        }
        function addDepartment() {
            loadingService.show();
            $q.resolve().then(() => {
                departmentService.add(department.Model).then((result) => {
                    toaster.pop('success', '', 'مجوز جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);
                })
            }).catch((error) => {
                toaster.pop('error', '', 'خطای ناشناخته');
            }).finally(loadingService.hide);
        }
        function editDepartment() {
            loadingService.show();
            $q.resolve().then(() => {
                departmentService.edit(department.Model).then((result) => {
                    toaster.pop('success', '', 'مجوز جدید با موفقیت اضافه گردید');
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);
                })
            }).catch((error) => {
                toaster.pop('error', '', 'خطای ناشناخته');
            }).finally(loadingService.hide);
        }
        function addSubDepartment(parent) {
            department.state = 'add';
            goToPageAdd(parent);
        }
        function setTreeObject(departments) {
            departments.map((item) => {
                if (item.ParentNode === '/')
                    item.expanded = true;
            });
            department.tree.data = toolsService.getTreeObject(departments, 'Node', 'ParentNode', '/');
        }
        function remove(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return departmentService.remove(model.ID);
            }).then(() => {
                return departmentService.list();
            }).then((result) => {
                setTreeObject(result);
            }).finally(loadingService.hide);
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------
    app.controller('userController', userController);
    userController.$inject = ['$scope', '$q', 'userService', 'loadingService', '$routeParams', '$location', 'toaster', '$timeout'];
    function userController($scope, $q, userService, loadingService, $routeParams, $location, toaster, $timeout) {
        let user = $scope;
        user.Model = {};
        user.goToPageAdd = goToPageAdd;
        user.addUser = addUser;
        user.changeState = {
            cartable: cartable
        }
        user.grid = {
            bindingObject: payment
            , columns: [{ name: 'FirstName', displayName: 'نام' },
            { name: 'LastName', displayName: 'نام خانوادگی' }]
            , listService: userService.list
            , globalSearch: true
            , checkActionVisibility: (action) => {
                if (action === 'edit') {
                    return false;
                }
                else
                    return true;
            }
        };
        init();

        function init() {
            loadingService.show();
            $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        cartable();
                        loadingService.hide();
                        break;
                    case 'add':
                        goToPageAdd();
                        loadingService.hide();
                        break;
                        break;
                }
            }).finally(loadingService.hide);


        } // end init

        function cartable() {
            user.state = 'cartable';
            $location.path('user/cartable');
        }
        function goToPageAdd() {
            user.state = 'add';
            $location.path('/user/add');
        }
        function addUser() {
            loadingService.show();
            $q.resolve().then(() => {
                userService.add(user.Model).then((result) => {
                    toaster.pop('success', '', 'کاربر جدید با موفقیت اضافه گردید');
                    user.grid.getlist();
                    loadingService.hide();
                    $timeout(function () {
                        cartable();
                    }, 1000);
                })
            }).catch((error) => {
                toaster.pop('error', '', 'خطای ناشناخته');
            }).finally(loadingService.hide);
        }
        function remove(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return userService.remove(model.ID);
            }).then(() => {
                return user.grid.getlist();
            }).then((result) => {
                setTreeObject(result);
            }).finally(loadingService.hide);
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------
    app.controller('sectionController', sectionController);
    sectionController.$inject = ['$scope', '$q', 'sectionService', 'loadingService', '$routeParams', '$location', 'toaster', '$timeout', 'toolsService', 'enumService'];
    function sectionController($scope, $q, sectionService, loadingService, $routeParams, $location, toaster, $timeout, toolsService, enumService) {
        let section = $scope;
        section.state = '';
        section.main = {};
        section.main.changeState = {
            add: add,
            edit: edit,
            cartable: cartable
        }

        section.Model = {};
        section.Model.Errors = [];

        section.grid = {
            bindingObject: section
            , columns: [{ name: 'Name', displayName: 'نام شهرستان' },
            { name: 'ProvinceType', displayName: 'نام استان', type: 'enum', source: enumService.ProvinceType }]
            , listService: sectionService.list
            , onEdit: section.main.changeState.edit
            , globalSearch: true
            , searchBy: 'Name'
            , displayNameFormat: ['Name']
            , options: () => { return section.Model }
        };
        section.ProvinceDropDown = toolsService.arrayEnum(enumService.ProvinceType);
        section.addSection = addSection;
        section.editSection = editSection;
        section.ProvinceChange = ProvinceChange;
        init();

        function init() {
            loadingService.show();
            return $q.resolve().then(() => {
                switch ($routeParams.state) {
                    case 'cartable':
                        section.main.changeState.cartable();
                        break;
                    case 'add':
                        section.main.changeState.add();
                        break;
                    case 'edit':
                        sectionService.get({ ID: $routeParams.id }).then((result) => {
                            edit(result);
                        })
                        break;
                }
            }).finally(loadingService.hide);
        }
        function cartable() {
            loadingService.show();
            clearModel();
            section.state = 'cartable';
            $location.path('section/cartable');
            loadingService.hide();
        }
        function add() {
            loadingService.show();
            if (section.Model.ProvinceType && section.Model.ProvinceType > 0) {
                section.state = 'add';
                $location.path('section/add');
                loadingService.hide();
            } else {
                section.main.changeState.cartable();
                toaster.pop('error', '', 'ابتدا استان را انتخاب نمایید');
                loadingService.hide();
            }
        }
        function edit(model) {
            loadingService.show();
            return $q.resolve().then(() => {
                return sectionService.get(model.ID);
            }).then((result) => {
                section.Model = angular.copy(result);
                section.state = 'edit';
                $location.path(`/section/edit/${result.ID}`);
            }).finally(loadingService.hide);
        }
        function addSection() {
            loadingService.show();
            return $q.resolve().then(() => {
                return sectionService.add(section.Model);
            }).then(() => {
                toaster.pop('success', '', 'شهرستان با موفقیت ایجاد گردید');
                clearModel();
                section.grid.getlist();
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);
            }).catch(() => {
                toaster.pop('error', '', 'خطای ناشناخته');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function editSection() {
            loadingService.show();
            return $q.resolve().then(() => {
                return sectionService.edit(section.Model);
            }).then(() => {
                toaster.pop('success', '', 'شهرستان با موفقیت ویرایش گردید');
                clearModel();
                section.grid.getlist();
                loadingService.hide();
                $timeout(function () {
                    cartable();
                }, 1000);
            }).catch(() => {
                toaster.pop('error', '', 'خطای ناشناخته');
                loadingService.hide();
            }).finally(loadingService.hide);
        }
        function ProvinceChange() {
            loadingService.show();
            return $q.resolve().then(() => {
                return section.grid.getlist();
            }).finally(loadingService.hide);
        }
        function clearModel() {
            section.Model = {};
        }
    }
})();