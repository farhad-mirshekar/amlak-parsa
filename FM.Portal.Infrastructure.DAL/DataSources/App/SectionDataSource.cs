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
    public class SectionDataSource : ISectionDataSource
    {
        readonly IRequestInfo _requestInfo;
        public SectionDataSource(IRequestInfo requestInfo)
        {
            _requestInfo = requestInfo;
        }

        public Result<Section> Get(Guid ID)
        {
            try
            {
                var obj = new Section();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ID", ID);

                using (var con = new SqlConnection(SQLHelper.GetConnectionString()))
                {
                    using (var dr = SQLHelper.ExecuteReader(con, CommandType.StoredProcedure, "app.spGetSection", param))
                    {
                        while (dr.Read())
                        {
                            obj.CreationDate = SQLHelper.CheckDateTimeNull(dr["CreationDate"]);
                            obj.ID = SQLHelper.CheckGuidNull(dr["ID"]);
                            obj.UserID = SQLHelper.CheckGuidNull(dr["UserID"]);
                            obj.Name = SQLHelper.CheckStringNull(dr["Name"]);
                            obj.CountryType = (CountryType)SQLHelper.CheckByteNull(dr["CountryType"]);
                            obj.ProvinceType = (ProvinceType)SQLHelper.CheckByteNull(dr["ProvinceType"]);
                        }
                    }
                    if (obj.ID != Guid.Empty)
                        return Result<Section>.Successful(data: obj);
                    else
                        return Result<Section>.Failure();
                }
            }
            catch (Exception e) { throw; }
        }

        public Result<Section> Insert(Section model)
        => Modify(true, model);

        public DataTable List(SectionListVM listVM)
        {
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("Name", SqlDbType.NVarChar);
                param[0].Value = listVM.Name != null ? (object)listVM.Name : DBNull.Value;

                param[1] = new SqlParameter("ProvinceType", SqlDbType.TinyInt);
                param[1].Value = listVM.ProvinceType != ProvinceType.نامشخص ? (object)listVM.ProvinceType : DBNull.Value;

                param[2] = new SqlParameter("CountryType", SqlDbType.TinyInt);
                param[2].Value = listVM.CountryType != CountryType.نامشخص ? (object)listVM.CountryType : DBNull.Value;

                return SQLHelper.GetDataTable(CommandType.StoredProcedure, "app.spGetsSection", param);
            }
            catch (Exception e) { throw; }
        }

        public Result<Section> Update(Section model)
        => Modify(false, model);
        private Result<Section> Modify(bool IsNewrecord, Section model)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(SQLHelper.GetConnectionString()))
                {
                    var param = new SqlParameter[6];
                    param[0] = new SqlParameter("@ID", model.ID);
                    param[1] = new SqlParameter("@CountryType", (byte) model.CountryType);
                    param[2] = new SqlParameter("@UserID", _requestInfo.UserId);
                    param[3] = new SqlParameter("@Name", model.Name);
                    param[4] = new SqlParameter("@ProvinceType", (byte)model.ProvinceType);
                    param[5] = new SqlParameter("@IsNewRecord", IsNewrecord);
                    int result =  SQLHelper.ExecuteNonQuery(con, CommandType.StoredProcedure, "app.spModifySection", param);
                    if(result > 0)
                        return Get(model.ID);
                    return Result<Section>.Failure();
                }
            }
            catch (Exception) { throw; }

        }
    }
}
