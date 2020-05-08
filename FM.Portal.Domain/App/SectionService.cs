using FM.Portal.Core.Common;
using FM.Portal.Core.Model;
using FM.Portal.Core.Result;
using FM.Portal.Core.Service;
using FM.Portal.DataSource;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System;
using System.Collections.Generic;

namespace FM.Portal.Domain
{
    public class SectionService : ISectionService
    {
        readonly ISectionDataSource _dataSource;
        public SectionService(ISectionDataSource dataSource)
        {
            _dataSource = dataSource;
        }

        public Result<Section> Add(Section model)
        {
            model.ID = Guid.NewGuid();
            return _dataSource.Insert(model);
        }

        public Result<Section> Edit(Section model)
        {
            return _dataSource.Update(model);
        }

        public Result<Section> Get(Guid ID)
        => _dataSource.Get(ID);

        public Result<List<Section>> List(SectionListVM listVM)
        {
            var table = ConvertDataTableToList.BindList<Section>(_dataSource.List(listVM));
            if (table.Count > 0 || table.Count == 0)
                return Result<List<Section>>.Successful(data: table);
            return Result<List<Section>>.Failure();
        }
    }
}
