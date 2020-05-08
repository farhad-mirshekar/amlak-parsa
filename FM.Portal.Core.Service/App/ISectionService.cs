using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using System;
using System.Collections.Generic;

namespace FM.Portal.Core.Service
{
   public interface ISectionService:IService
    {
        Result<Section> Add(Section model);
        Result<Section> Edit(Section model);
        Result<Section> Get(Guid ID);
        Result<List<Section>> List(SectionListVM listVM);
    }
}
