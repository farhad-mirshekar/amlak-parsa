using FM.Portal.Core.Common;
using FM.Portal.Core.Service;
using FM.Portal.FrameWork.MVC.Controller;
using System.Linq;
using System.Web.Mvc;

namespace Project.WebApp.Controllers
{
    public partial class HomeController : BaseController<FM.Portal.Core.Service.IProductService>
    {
        private readonly IAttachmentService _attachmentService;
        private readonly IMenuService _menuService;
        private readonly IArticleService _articleService;
        private readonly INewsService _newsService;
        private readonly ISliderService _sliderService;
        private readonly IEventsService _eventsService;
        public HomeController(IProductService service
                             , IAttachmentService attachmentService
                             , IMenuService menuService
                             , IArticleService articleService
                             , INewsService newsService
                             , ISliderService sliderService
                             , IEventsService eventsService) : base(service)
        {
            _attachmentService = attachmentService;
            _menuService = menuService;
            _articleService = articleService;
            _newsService = newsService;
            _sliderService = sliderService;
            _eventsService = eventsService;
        }
        // GET: Home
        public virtual ActionResult Index()
        {
            ViewBag.Title = "صفحه نخست";
            return View();
        }

        #region ChildAction
        [ChildActionOnly]
        public virtual ActionResult HomeProduct()
        {
            var result = _service.ListForWeb(new FM.Portal.Core.Model.ProductListVM {ProductType = FM.Portal.Core.Model.ProductType.خانه }, Helper.CountShowProduct);
            if (!result.Success)
                return null;
            return PartialView("_PartialHomeProduct", result.Data);
        }
        [ChildActionOnly]
        public virtual ActionResult ShopProduct()
        {
            var result = _service.ListForWeb(new FM.Portal.Core.Model.ProductListVM { ProductType = FM.Portal.Core.Model.ProductType.مغازه }, Helper.CountShowProduct);
            if (!result.Success)
                return null;
            return PartialView("_PartialShopProduct", result.Data);
        }

        [ChildActionOnly]
        public virtual ActionResult GetLastArticle()
        {
            var result = _articleService.List(Helper.CountShowArticle);
            return PartialView("~/Views/Shared/_PartialSideArticle.cshtml", result.Data);
        }
        [ChildActionOnly]
        public virtual ActionResult GetLastNews()
        {
            var result = _newsService.List(Helper.CountShowNews);
            return PartialView("~/Views/Shared/_PartialSideNews.cshtml", result.Data);
        }
        [ChildActionOnly]
        public ActionResult RenderMenu()
        {
            var result = _menuService.GetMenuForWeb("/1/");
            return PartialView("~/Views/Home/_PartialMenu.cshtml", result.Data);
        }
        [ChildActionOnly]
        public ActionResult RenderSlide()
        {
            var result = _sliderService.List(Helper.CountShowSlider);
            return PartialView("~/Views/Shared/_PartialCarousel.cshtml", result.Data);
        }
        [ChildActionOnly]
        public ActionResult GetLastEvents()
        {
            var result = _eventsService.List(Helper.CountShowEvents);
            return PartialView("~/Views/Shared/_PartialSideEvents.cshtml", result.Data);
        }
        #endregion
    }
}