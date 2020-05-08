using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using System;
using System.Data;

namespace FM.Portal.DataSource
{
   public interface IProductDataSource : IDataSource
    {
        Result<Product> Insert(Product model);
        Result<Product> Update(Product model);
        Result<Product> Get(Guid ID);
        DataTable List(ProductListVM listVM);
    }
}
