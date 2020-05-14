namespace FM.Portal.Core.Model
{
   public class ShowProductOnHomePageListVM
    {
        public string TrackingCode { get; set; }
        public string Title { get; set; }
        public PathType PathType { get; set; }
        public string FileName { get; set; }
        public ProvinceType ProvinceType { get; set; }
        public string SectionName { get; set; }
        public SellingProductType SellingProductType { get; set; }
        public ProductType ProductType { get; set; }
        public bool? HasWater { get; set; }
        public bool? HasElectricity { get; set; }
        public bool? HasGas { get; set; }
        public bool? HasElevator { get; set; }
        public bool? HasPhone { get; set; }
    }
}
