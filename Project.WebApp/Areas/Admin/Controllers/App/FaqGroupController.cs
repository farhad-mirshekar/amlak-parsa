using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public partial class FaqGroupController : Controller
    {
        public virtual ActionResult Index()
        {
            return View();
        }
    }
}