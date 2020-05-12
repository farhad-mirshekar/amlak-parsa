using FM.Portal.Core.Service;
using FM.Portal.FrameWork.MVC.Controller;
using Project.WebApp.Models;
using System.Web.Mvc;
using System.Web.Razor.Parser.SyntaxTree;

namespace Project.WebApp.Controllers
{
    public class ProductController : BaseController<IProductService>
    {
        private readonly IAttachmentService _attachmentService;
        public ProductController(IProductService service
                                 ,IAttachmentService attachmentService) : base(service)
        {
            _attachmentService = attachmentService;
        }

        // GET: Product
        public ActionResult Index(string TrackingCode , string Seo)
        {
            var productResult = _service.Get(TrackingCode);
            if (!productResult.Success)
                return View("Error", new Error {ClassCss="alert alert-danger" , ErorrDescription="آگهی مورد نظر یافت نشد" });
            var product = productResult.Data;

            var attachmentResult = _attachmentService.List(product.ID);
            var attachment = attachmentResult.Data;

            ViewBag.pic = attachment;
            return View(product);
        }
    }
}