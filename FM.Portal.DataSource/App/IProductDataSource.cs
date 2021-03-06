﻿using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using System;
using System.Data;

namespace FM.Portal.DataSource
{
   public interface IProductDataSource : IDataSource
    {
        Result<Product> Insert(Product model);
        Result<Product> Update(Product model);
        Result<Product> Get(Guid? ID , string TrackingCode);
        DataTable List(ProductListVM listVM);
        DataTable ListForWeb(ProductListVM listVM, int? Count);
        DataTable ListBySellingProductType(SellingProductType type, int count);
        DataTable ListByProductType(ProductType type, int count);
    }
}
