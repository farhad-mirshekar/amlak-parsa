﻿using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public class GeneralSettingController : Controller
    {
        // GET: Admin/GeneralSetting
        public ActionResult Index()
        {
            return View();
        }
    }
}