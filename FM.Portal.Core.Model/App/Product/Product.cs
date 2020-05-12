using FM.Portal.BaseModel;
using System;

namespace FM.Portal.Core.Model
{
   public class Product:Entity
    {
        public SellingProductType SellingProductType { get; set; }
        public ProductType ProductType { get; set; }
        public Guid? SectionID { get; set; }
        public int? Meter { get; set; }
        public string OrginalPrice { get; set; }
        public DocumentForProductType DocumentType { get; set; }
        public string PrePayment { get; set; }
        public string Rent { get; set; }
        public bool? HasWater { get; set; }
        public bool? HasElectricity { get; set; }
        public bool? HasGas { get; set; }
        public bool? HasElevator { get; set; }
        public bool? HasPhone { get; set; }
        public int? CountPhone { get; set; }
        public string PhoneContact { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int? CountRoom { get; set; }
        public CountryType CountryType { get; set; }
        public ProvinceType ProvinceType { get; set; }
        public FloorCoveringType FloorCoveringType { get; set; }
        public Guid UserID { get; set; }
        public Guid RemoveID { get; set; }
        public DateTime RemoveDate { get; set; }
        public bool Enabled { get; set; }
        public DateTime UpdatedDate { get; set; }

        //only show
        public string SectionName { get; set; }
    }
}
