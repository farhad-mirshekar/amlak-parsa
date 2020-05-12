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
        => _dataSource.Get(ID,null);

        public Result<Product> Get(string TrackingCode)
        => _dataSource.Get(null, TrackingCode);

        public Result<List<Product>> List(ProductListVM listVM)
        {
            var table = ConvertDataTableToList.BindList<Product>(_dataSource.List(listVM));
            if (table.Count > 0|| table.Count == 0)
                return Result<List<Product>>.Successful(data: table);
            return Result<List<Product>>.Failure();
        }

        public Result<List<ShowProductOnHomePageListVM>> ListForWeb(ProductListVM listVM, int Count)
        {
            var table = ConvertDataTableToList.BindList<ShowProductOnHomePageListVM>(_dataSource.ListForWeb(listVM,Count));
            if (table.Count > 0 || table.Count == 0)
                return Result<List<ShowProductOnHomePageListVM>>.Successful(data: table);
            return Result<List<ShowProductOnHomePageListVM>>.Failure();
        }

        private Result ValidationModel(Product model)
        {
            List<string> Errors = new List<string>();
            if (model.Title == null || model.Title == "" || model.Title == string.Empty)
                Errors.Add("عنوان آگهی را وارد نمایید");
            if(model.SellingProductType == SellingProductType.فروش)
            {
                model.Rent = null;
                model.PrePayment = null;
                if(model.OrginalPrice == 0)
                    Errors.Add("قیمت را مشخص نمایید");
            }
            if (model.SellingProductType == SellingProductType.رهن || model.SellingProductType == SellingProductType.اجاره)
            {
                model.OrginalPrice = null;
                if(model.SellingProductType == SellingProductType.رهن)
                {
                    if (model.PrePayment == 0)
                        Errors.Add("قیمت رهن را مشخص نمایید");
                }
                if (model.SellingProductType == SellingProductType.اجاره)
                {
                    if (model.Rent == 0)
                        Errors.Add("قیمت اجاره را مشخص نمایید");
                }
            }
            if(model.HasPhone.HasValue && model.HasPhone.Value)
            {
                if(model.CountPhone.HasValue && model.CountPhone.Value == 0)
                    Errors.Add("تعداد خطوط تلفن را مشخص نمایید");
            }
            if(model.FloorCoveringType == FloorCoveringType.نامشخص)
                Errors.Add("نوع کف را مشخص نمایید");

            if (model.ProductType == ProductType.نامشخص)
                Errors.Add("نوع ملک را مشخص نمایید");

            if (model.ProvinceType == ProvinceType.نامشخص)
                Errors.Add("استان را مشخص نمایید");

            if (model.SectionID == null || model.SectionID == Guid.Empty)
                Errors.Add("شهرستان را مشخص نمایید");

            if (Errors.Any())
                return Result.Failure(message: string.Join("&&", Errors));

            return Result.Successful();
        }
    }
}
