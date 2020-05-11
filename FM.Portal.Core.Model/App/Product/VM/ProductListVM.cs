namespace FM.Portal.Core.Model
{
   public class ProductListVM
    {
        public string TrackingCode { get; set; }
        public int? Meter { get; set; }
        public decimal? OrginalPrice { get; set; }
        public DocumentForProductType DocumentType { get; set; }
        public FloorCoveringType FloorCoveringType { get; set; }
        public ProductType ProductType { get; set; }
    }
}
