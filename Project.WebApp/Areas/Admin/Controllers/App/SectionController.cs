using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public class SectionController : Controller
    {
        // GET: Admin/Section
        public ActionResult Index()
        {
            return View();
        }
    }
}