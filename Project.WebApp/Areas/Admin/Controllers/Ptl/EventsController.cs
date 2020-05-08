﻿using FM.Portal.FrameWork.Attributes;
using System.Web.Mvc;

namespace Project.WebApp.Areas.Admin.Controllers
{
    [UserAuthorizeAttribute(Roles = "Admin")]
    public class EventsController : Controller
    {
        // GET: Admin/Events
        public ActionResult Index()
        {
            return View();
        }
    }
}