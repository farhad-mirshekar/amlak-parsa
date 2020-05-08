using FM.Portal.Core.Service;
using FM.Portal.DataSource;
using FM.Portal.Domain;
using FM.Portal.Infrastructure.DAL;
using Unity;
using System.Web.Mvc;
using Unity;
using FM.Portal.Core.Owin;
using FM.Portal.FrameWork.Caching;
using System.Web;
using Unity.Injection;
using FM.Portal.Core.Common;

namespace FM.Portal.FrameWork.Unity
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            container.RegisterType<IAttachmentDataSource, AttachmentDataSource>();
            container.RegisterType<IAttachmentService, AttachmentService>();

            container.RegisterType<IUserDataSource, UserDataSource>();
            container.RegisterType<IUserService, UserService>();

            container.RegisterType<IFaqGroupDataSource, FaqGroupDataSource>();
            container.RegisterType<IFaqGroupService, FaqGroupService>();

            container.RegisterType<IFaqDataSource, FaqDataSource>();
            container.RegisterType<IFaqService, FaqService>();

            container.RegisterType<ICommentDataSource, CommentDataSource>();
            container.RegisterType<ICommentService, CommentService>();

            container.RegisterType<ICommentMapUserDataSource, CommentMapUserDataSource>();
            container.RegisterType<ICommentMapUserService, CommentMapUserService>();

            container.RegisterType<IUserAddressDataSource, UserAddressDataSource>();
            container.RegisterType<IUserAddressService, UserAddressService>();

            container.RegisterType<IArticleDataSource, ArticleDataSource>();
            container.RegisterType<IArticleService, ArticleService>();

            container.RegisterType<IRefreshTokenDataSource, RefreshTokenDataSource>();
            container.RegisterType<IRefreshTokenService, RefreshTokenService>();

            container.RegisterType<DataSource.Ptl.ICategoryDataSource, Infrastructure.DAL.Ptl.CategoryDataSource>();
            container.RegisterType<Core.Service.Ptl.ICategoryService, Domain.Ptl.CategoryService>();

            container.RegisterType<INewsDataSource, NewsDataSource>();
            container.RegisterType<INewsService, NewsService>();

            container.RegisterType<IMenuDataSource, MenuDataSource>();
            container.RegisterType<IMenuService, MenuService>();

            container.RegisterType<ISliderDataSource, SliderDataSource>();
            container.RegisterType<ISliderService, SliderService>();

            container.RegisterType<IGeneralSettingDataSource, GeneralSettingDataSource>();
            container.RegisterType<IGeneralSettingService, GeneralSettingService>();

            container.RegisterType<IEventsDataSource, EventsDataSource>();
            container.RegisterType<IEventsService, EventsService>();

            container.RegisterType<ITagsDataSource, TagsDataSource>();
            container.RegisterType<ITagsService, TagsService>();

            container.RegisterType<IProductDataSource, ProductDataSource>();
            container.RegisterType<IProductService, ProductService>();

            container.RegisterType<ISectionDataSource, SectionDataSource>();
            container.RegisterType<ISectionService, SectionService>();

            container.RegisterType<ICacheService, CacheService>();
            container.RegisterType<HttpContextBase>(new InjectionFactory(_ =>
                new HttpContextWrapper(HttpContext.Current)));
            container.RegisterType<IRequestInfo, RequestInfo>();
            container.RegisterType<IAppSetting, AppSetting>();

            DependencyResolver.SetResolver(new Unity. UnityDependencyResolver(container));
        }
    }
}
