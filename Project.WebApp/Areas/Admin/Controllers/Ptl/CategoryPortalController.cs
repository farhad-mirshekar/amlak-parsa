﻿using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public class CategoryPortalController : Controller
    {
        // GET: Admin/CategoryPortal
        public ActionResult Index()
        {
            return View();
        }
    }
}