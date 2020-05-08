﻿using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public class CategoryController : Controller
    {
        // GET: Admin/Category
        public ActionResult Index()
        {
            return View();
        }
    }
}