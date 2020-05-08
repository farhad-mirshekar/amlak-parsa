using FM.Portal.BaseModel;
using System;

namespace FM.Portal.Core.Model
{
   public class Section:Entity
    {
        public CountryType CountryType { get; set; }
        public ProvinceType ProvinceType { get; set; }
        public string Name { get; set; }
        public Guid UserID { get; set; }
    }
}
