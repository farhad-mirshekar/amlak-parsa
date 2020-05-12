using FM.Portal.BaseModel;
using System;

namespace FM.Portal.Core.Model
{
    public class Product : Entity
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
        //جکوزی
        public bool? HasJacuzzi { get; set; }
        //بالکن
        public bool? HasBalcony { get; set; }
        //سالن کنفرانس
        public bool? HasConferenceHall { get; set; }
        //نگهبان
        public bool? HasGuard { get; set; }
        //لابی
        public bool? HasLobby { get; set; }
        //پارکینگ
        public bool? HasParking { get; set; }
        //تعداد پارکینگ
        public int? CountParking { get; set; }
        //سونا
        public bool? HasSauna { get; set; }
        //تهویه مطبوغ
        public bool? HasAirConditioning { get; set; }
        //سالن ورزش
        public bool? HasSportsHall { get; set; }
        //درب ریموت
        public bool? HasRemoteDoor { get; set; }
        //استخر
        public bool? HasSwimmingPool { get; set; }
        //آنتن مرکزی
        public bool? HasCentralAntenna { get; set; }
        //سال ساخت
        public string YearOfConstruction { get; set; }
        //only show
        public string SectionName { get; set; }
    }
}
