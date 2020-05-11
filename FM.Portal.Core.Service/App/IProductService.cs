using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using System;
using System.Collections.Generic;

namespace FM.Portal.Core.Service
{
   public interface IProductService : IService
    {
        Result<Product> Add(Product model);
        Result<Product> Edit(Product model);
        Result<Product> Get(Guid ID);
        Result<List<Product>> List(ProductListVM listVM);
        Result<List<ShowProductOnHomePageListVM>> ListForWeb(ProductListVM listVM,int Count);
    }
}
