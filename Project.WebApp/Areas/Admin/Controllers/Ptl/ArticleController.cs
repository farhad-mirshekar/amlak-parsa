﻿using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public class ArticleController : Controller
    {
        // GET: Admin/Article
        public ActionResult Index()
        {
            return View();
        }
    }
}