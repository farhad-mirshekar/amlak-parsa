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
    }
}
