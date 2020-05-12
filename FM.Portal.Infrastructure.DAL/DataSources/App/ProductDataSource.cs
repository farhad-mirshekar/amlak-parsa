using FM.Portal.Core.Common;
using FM.Portal.Core.Model;
using FM.Portal.Core.Owin;
using FM.Portal.Core.Result;
using FM.Portal.DataSource;
using System;
using System.Data;
using System.Data.SqlClient;

namespace FM.Portal.Infrastructure.DAL
{
    public class ProductDataSource : IProductDataSource
    {
        readonly IRequestInfo _requestInfo;
        public ProductDataSource(IRequestInfo requestInfo)
        {
            _requestInfo = requestInfo;
        }

        public Result<Product> Get(Guid? ID , string TrackingCode)
        {
            try
            {
                var obj = new Product();
                SqlParameter[] param = new SqlParameter[2];
                param[0] = new SqlParameter("@ID", SqlDbType.UniqueIdentifier);
                param[0].Value = (object)ID ?? DBNull.Value;

                param[1] = new SqlParameter("@TrackingCode", TrackingCode);

                using (SqlConnection con = new SqlConnection(SQLHelper.GetConnectionString()))
                {
                    using (SqlDataReader dr = SQLHelper.ExecuteReader(con, CommandType.StoredProcedure, "app.spGetProduct", param))
                    {
                        while (dr.Read())
                        {

                            obj.ID = SQLHelper.CheckGuidNull(dr["ID"]);
                            obj.CountPhone = SQLHelper.CheckIntNull(dr["CountPhone"]);
                            obj.CountRoom = SQLHelper.CheckIntNull(dr["CountRoom"]);
                            obj.Description = SQLHelper.CheckStringNull(dr["Description"]);
                            obj.FloorCoveringType = (FloorCoveringType)SQLHelper.CheckByteNull(dr["FloorCoveringType"]);
                            obj.HasElectricity = SQLHelper.CheckBoolNull(dr["HasElectricity"]);
                            obj.HasElevator = SQLHelper.CheckBoolNull(dr["HasElevator"]);
                            obj.HasGas = SQLHelper.CheckBoolNull(dr["HasGas"]);
                            obj.HasPhone = SQLHelper.CheckBoolNull(dr["HasPhone"]);
                            obj.HasWater = SQLHelper.CheckBoolNull(dr["HasWater"]);
                            obj.Meter = SQLHelper.CheckIntNull(dr["Meter"]);
                            obj.OrginalPrice = SQLHelper.CheckStringNull(dr["OrginalPrice"]);
                            obj.PhoneContact = SQLHelper.CheckStringNull(dr["PhoneContact"]);
                            obj.PrePayment = SQLHelper.CheckStringNull(dr["PrePayment"]);
                            obj.SellingProductType = (SellingProductType)SQLHelper.CheckByteNull(dr["SellingProductType"]);
                            obj.Rent = SQLHelper.CheckStringNull(dr["Rent"]);
                            obj.SectionID = SQLHelper.CheckGuidNull(dr["SectionID"]);
                            obj.Title = SQLHelper.CheckStringNull(dr["Title"]);
                            obj.DocumentType = (DocumentForProductType)SQLHelper.CheckByteNull(dr["DocumentType"]);
                            obj.CountryType = (CountryType)SQLHelper.CheckByteNull(dr["CountryType"]);
                            obj.ProvinceType = (ProvinceType)SQLHelper.CheckByteNull(dr["ProvinceType"]);
                            obj.UserID = SQLHelper.CheckGuidNull(dr["UserID"]);
                            obj.CreationDate = SQLHelper.CheckDateTimeNull(dr["CreationDate"]);
                            obj.UpdatedDate = SQLHelper.CheckDateTimeNull(dr["UpdatedDate"]);
                            obj.SectionName = SQLHelper.CheckStringNull(dr["SectionName"]);
                            obj.ProductType = (ProductType)SQLHelper.CheckByteNull(dr["ProductType"]);

                        }
                    }

                }
                return Result<Product>.Successful(data: obj);
            }
            catch (Exception e) { throw; }
        }

        public Result<Product> Insert(Product model)
        => Modify(true, model);

        public DataTable List(ProductListVM listVM)
        {
            try
            {
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@TrackingCode", listVM.TrackingCode);

                param[1] = new SqlParameter("@Meter", SqlDbType.Int);
                param[1].Value = (object)listVM.Meter ?? DBNull.Value;

                param[2] = new SqlParameter("@OrginalPrice", SqlDbType.NVarChar);
                param[2].Value = (object)listVM.OrginalPrice ?? DBNull.Value;

                param[3] = new SqlParameter("@DocumentType", SqlDbType.TinyInt);
                param[3].Value = listVM.DocumentType != DocumentForProductType.نامشخص ? (object)listVM.DocumentType : DBNull.Value;

                param[4] = new SqlParameter("@FloorCoveringType", SqlDbType.TinyInt);
                param[4].Value = listVM.FloorCoveringType != FloorCoveringType.نامشخص ? (object)listVM.FloorCoveringType : DBNull.Value;

                param[5] = new SqlParameter("@ProductType", SqlDbType.TinyInt);
                param[5].Value = listVM.ProductType != ProductType.نامشخص ? (object)listVM.ProductType : DBNull.Value;

                return SQLHelper.GetDataTable(CommandType.StoredProcedure, "app.spGetsProduct", param);
            }
            catch (Exception e) { throw; }
        }

        public DataTable ListForWeb(ProductListVM listVM, int? Count)
        {
            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@TrackingCode", listVM.TrackingCode);

                param[1] = new SqlParameter("@Meter", SqlDbType.Int);
                param[1].Value = (object)listVM.Meter ?? DBNull.Value;

                param[2] = new SqlParameter("@OrginalPrice", SqlDbType.Money);
                param[2].Value = (object)listVM.OrginalPrice ?? DBNull.Value;

                param[3] = new SqlParameter("@DocumentType", SqlDbType.TinyInt);
                param[3].Value = listVM.DocumentType != DocumentForProductType.نامشخص ? (object)listVM.DocumentType : DBNull.Value;

                param[4] = new SqlParameter("@FloorCoveringType", SqlDbType.TinyInt);
                param[4].Value = listVM.FloorCoveringType != FloorCoveringType.نامشخص ? (object)listVM.FloorCoveringType : DBNull.Value;

                param[5] = new SqlParameter("@ProductType", SqlDbType.TinyInt);
                param[5].Value = listVM.ProductType != ProductType.نامشخص ? (object)listVM.ProductType : DBNull.Value;

                param[6] = new SqlParameter("@Count", SqlDbType.Int);
                param[6].Value = (object)Count ?? DBNull.Value;

                return SQLHelper.GetDataTable(CommandType.StoredProcedure, "app.spGetsProductForHomePage", param);
            }
            catch (Exception e) { throw; }
        }

        public Result<Product> Update(Product model)
        => Modify(false, model);
        private Result<Product> Modify(bool IsNewRecord, Product model)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(SQLHelper.GetConnectionString()))
                {
                    SqlParameter[] param = new SqlParameter[23];
                    param[0] = new SqlParameter("@ID", model.ID);

                    param[1] = new SqlParameter("@CountPhone", model.CountPhone);
                    param[2] = new SqlParameter("@CountRoom", model.CountRoom);
                    param[3] = new SqlParameter("@IsNewRecord", IsNewRecord);
                    param[4] = new SqlParameter("@Description", model.Description);
                    param[5] = new SqlParameter("@FloorCoveringType", (byte)model.FloorCoveringType);
                    param[6] = new SqlParameter("@DocumentType", (byte)model.DocumentType);
                    param[7] = new SqlParameter("@HasElectricity", model.HasElectricity);
                    param[8] = new SqlParameter("@HasElevator", model.HasElevator);
                    param[9] = new SqlParameter("@HasGas", model.HasGas);
                    param[10] = new SqlParameter("@HasPhone", model.HasPhone);
                    param[11] = new SqlParameter("@HasWater", model.HasWater);
                    param[12] = new SqlParameter("@Meter", model.Meter);
                    param[13] = new SqlParameter("@OrginalPrice", model.OrginalPrice);
                    param[14] = new SqlParameter("@PhoneContact", model.PhoneContact);
                    param[15] = new SqlParameter("@PrePayment", model.PrePayment);
                    param[16] = new SqlParameter("@SellingProductType", (byte)model.SellingProductType);
                    param[17] = new SqlParameter("@Rent", model.Rent);
                    param[18] = new SqlParameter("@SectionID", model.SectionID);
                    param[19] = new SqlParameter("@Title", model.Title);
                    param[20] = new SqlParameter("@UserID",_requestInfo.UserId);
                    param[21] = new SqlParameter("@ProductType", (byte)model.ProductType);
                    param[22] = new SqlParameter("@Enabled", model.Enabled);

                    int result = SQLHelper.ExecuteNonQuery(con, System.Data.CommandType.StoredProcedure, "app.spModifyProduct", param);
                    if (result > 0)
                        return Get(model.ID,null);
                    return Result<Product>.Failure();
                }
            }
            catch (Exception e) { throw; }
        }
    }
}
