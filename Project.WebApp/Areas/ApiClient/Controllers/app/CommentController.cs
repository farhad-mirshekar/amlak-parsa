using FM.Portal.Core.Model;
using FM.Portal.Core.Service;
using FM.Portal.FrameWork.Api.Controller;
using System;
using System.Web.Http;
using FM.Portal.Core.Common;
using FM.Portal.Core.Result;
using System.Collections.Generic;

namespace Project.WebApp.Areas.ApiClient.Controllers
{
    [RoutePrefix("api/v1/comment")]
    public class CommentController : BaseApiController<ICommentService>
    {
        public CommentController(ICommentService service) : base(service)
        {
        }

        [HttpPost, Route("List/{commentForType}")]
        public IHttpActionResult List(CommentForType commentForType)
        {
            try
            {
                var result = _service.List(commentForType);
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        [HttpPost, Route("Get/{ID:guid}")]
        public IHttpActionResult Get(Guid ID)
        {
            try
            {
                var result = _service.Get(ID);
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        //[HttpPost, Route("CommentForType")]
        //public IHttpActionResult CommentForType()
        //{
        //    var CommentForType = EnumExtensions.GetValues<CommentForType>();
        //    List<EnumCast> enumCasts = new List<EnumCast>();
        //    foreach (var item in CommentForType)
        //    {
        //        if (item.Model != 0 && item.Model != 6 )
        //            enumCasts.Add(new EnumCast {Model=item.Model , Name=item.Name });
        //    }
        //    var result = Result<List<EnumCast>>.Successful(data: enumCasts);
        //    return Ok(result);
        //}
        [HttpPost, Route("Edit")]
        public IHttpActionResult Edit(Comment model)
        {
            try
            {
                var result = _service.Edit(model);
                return Ok(result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
