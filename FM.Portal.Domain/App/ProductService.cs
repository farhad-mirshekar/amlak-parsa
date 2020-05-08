using FM.Portal.Core.Common;
using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using FM.Portal.Core.Service;
using FM.Portal.DataSource;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FM.Portal.Domain
{
    public class ProductService : IProductService
    {
        readonly IProductDataSource _dataSource;
        public ProductService(IProductDataSource dataSource)
        {
            _dataSource = dataSource;
        }

        public Result<Product> Add(Product model)
        {
            var validate = ValidationModel(model);
            if (!validate.Success)
                return Result<Product>.Failure(message: validate.Message);
            model.ID = Guid.NewGuid();
            return _dataSource.Insert(model);
        }

        public Result<Product> Edit(Product model)
        {
            var validate = ValidationModel(model);
            if (!validate.Success)
                return Result<Product>.Failure(message: validate.Message);
            return _dataSource.Update(model);
        }

        public Result<Product> Get(Guid ID)
        => _dataSource.Get(ID);

        public Result<List<Product>> List(ProductListVM listVM)
        {
            var table = ConvertDataTableToList.BindList<Product>(_dataSource.List(listVM));
            if (table.Count > 0|| table.Count == 0)
                return Result<List<Product>>.Successful(data: table);
            return Result<List<Product>>.Failure();
        }

        private Result ValidationModel(Product model)
        {
            List<string> Errors = new List<string>();
            if (model.Title == null || model.Title == "" || model.Title == string.Empty)
                Errors.Add("عنوان آگهی را وارد نمایید");

            if (Errors.Any())
                return Result.Failure(message: string.Join("&&", Errors));

            return Result.Successful();
        }
    }
}
