﻿using FM.Portal.Core.Common;
using FM.Portal.Core.Owin;
using FM.Portal.Core.Service;
using FM.Portal.DataSource;
using FM.Portal.Domain;
using FM.Portal.FrameWork.Caching;
using FM.Portal.Infrastructure.DAL;
using System.Web;
using Unity;
using Unity.Injection;

namespace FM.Portal.FrameWork.Unity
{
   public class LoadServices
    {
        private readonly IUnityContainer _container;
        public LoadServices(IUnityContainer container)
        {
            _container = container;
        }
        public IUnityContainer Load()
        {
            _container.RegisterType<IFaqGroupDataSource, FaqGroupDataSource>();
            _container.RegisterType<IFaqGroupService, FaqGroupService>();

            _container.RegisterType<IFaqDataSource, FaqDataSource>();
            _container.RegisterType<IFaqService, FaqService>();

            _container.RegisterType<IAttachmentDataSource, AttachmentDataSource>();
            _container.RegisterType<IAttachmentService, AttachmentService>();

            _container.RegisterType<IUserDataSource, UserDataSource>();
            _container.RegisterType<IUserService, UserService>();

            _container.RegisterType<ICommandDataSource, CommandDataSource>();
            _container.RegisterType<ICommandService, CommandService>();

            _container.RegisterType<IRoleDataSource, RoleDataSource>();
            _container.RegisterType<IRoleService, RoleService>();

            _container.RegisterType<IPositionDataSource, PositionDataSource>();
            _container.RegisterType<IPositionService, PositionService>();

            _container.RegisterType<ICategoryDataSource, CategoryDataSource>();
            _container.RegisterType<ICategoryService, CategoryService>();

            _container.RegisterType<ICommentDataSource, CommentDataSource>();
            _container.RegisterType<ICommentService, CommentService>();

            _container.RegisterType<IArticleDataSource, ArticleDataSource>();
            _container.RegisterType<IArticleService, ArticleService>();

            _container.RegisterType<IRefreshTokenDataSource, RefreshTokenDataSource>();
            _container.RegisterType<IRefreshTokenService, RefreshTokenService>();

            _container.RegisterType<FM.Portal.DataSource.Ptl.ICategoryDataSource, FM.Portal.Infrastructure.DAL.Ptl.CategoryDataSource>();
            _container.RegisterType<FM.Portal.Core.Service.Ptl.ICategoryService,FM.Portal.Domain.Ptl.CategoryService>();

            _container.RegisterType<INewsDataSource, NewsDataSource>();
            _container.RegisterType<INewsService, NewsService>();

            _container.RegisterType<IPagesDataSource, PagesDataSource>();
            _container.RegisterType<IPagesService, PagesService>();

            _container.RegisterType<IMenuDataSource, MenuDataSource>();
            _container.RegisterType<IMenuService, MenuService>();

            _container.RegisterType<ISliderDataSource, SliderDataSource>();
            _container.RegisterType<ISliderService, SliderService>();

            _container.RegisterType<IGeneralSettingDataSource, GeneralSettingDataSource>();
            _container.RegisterType<IGeneralSettingService, GeneralSettingService>();

            _container.RegisterType<IEventsDataSource, EventsDataSource>();
            _container.RegisterType<IEventsService, EventsService>();

            _container.RegisterType<ITagsDataSource, TagsDataSource>();
            _container.RegisterType<ITagsService, TagsService>();

            _container.RegisterType<IUserAddressDataSource, UserAddressDataSource>();
            _container.RegisterType<IUserAddressService, UserAddressService>();

            _container.RegisterType<INotificationDataSource, NotificationDataSource>();
            _container.RegisterType<INotificationService, NotificationService>();

            _container.RegisterType<IDepartmentDataSource, DepartmentDataSource>();
            _container.RegisterType<IDepartmentService, DepartmentService>();

            _container.RegisterType<IProductDataSource, ProductDataSource>();
            _container.RegisterType<IProductService, ProductService>();

            _container.RegisterType<ISectionDataSource, SectionDataSource>();
            _container.RegisterType<ISectionService, SectionService>();

            _container.RegisterType<ICacheService, CacheService>();
            _container.RegisterType<HttpContextBase>(new InjectionFactory(_ =>
                new HttpContextWrapper(HttpContext.Current)));
            _container.RegisterType<IRequestInfo, RequestInfo>();
            _container.RegisterType<IAppSetting, AppSetting>();
            return _container;
        }
    }
}
