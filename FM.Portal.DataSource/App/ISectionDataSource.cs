using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using System;
using System.Data;

namespace FM.Portal.DataSource
{
   public interface ISectionDataSource:IDataSource
    {
        Result<Section> Insert(Section model);
        Result<Section> Update(Section model);
        Result<Section> Get(Guid ID);
        DataTable List(SectionListVM listVM);
    }
}
