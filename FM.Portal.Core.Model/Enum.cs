namespace FM.Portal.Core.Model
{

    public enum AttachmentType : byte
    {
        نامشخص = 0,
        اصلی = 1,
        ثانویه = 2
    }
    public enum PathType : byte
    {
        unknown = 0,
        product = 6,
        article = 4,
        news = 3,
        slider = 5,
        video=7,
        events=8,
        editor=9,
        file=10
    }
    public enum UserType : byte
    {
        Unknown = 0,
        کاربر_درون_سازمانی = 1,
        کاربر_برون_سازمانی = 2
    }
    public enum CommandsType : byte
    {
        نامشخص = 0,

        برنامه = 1,
        منو = 2,
        صفحه = 3
    }
    public enum ShowArticleType : byte
    {
        نامشخص = 0,
        عدم_نمایش = 1,
        نمایش = 2
    }
    public enum CommentArticleType : byte
    {
        نامشخص = 0,
        بسته = 1,
        باز = 2
    }
    public enum PositionType : byte
    {
        Unknown = 0,
        راهبر = 100
    }
    public enum CommentType : byte
    {
        نامشخص = 0,
        در_حال_بررسی = 1,
        تایید = 2,
        عدم_تایید = 3
    }
    public enum EnableMenuType : byte
    {
        نامشخص = 0,
        فعال = 1,
        غیرفعال = 2
    }
    public enum CommentForType : byte
    {
        unknown = 0,
        محصولات = 6,
        مقالات = 4,
        اخبار = 3,
        رویدادها = 8
    }
    public enum DocumentTypeForTags : byte
    {
        نامشخص = 0,
        اخبار = 3,
        مقاله = 4,
        محصولات = 6,
        رویداد = 8
    }
    public enum SellingProductType : byte
    {
        نامشخص = 0,
        فروش = 1,
        اجاره = 2,
        رهن = 3

    }
    public enum ProductType : byte
    {
        نامشخص = 0,
        خانه = 1,
        مغازه = 2,
        زمین = 3,
        ویلایی = 4,
        آپارتمان = 5,

    }
    public enum CountryType : byte
    {
        نامشخص = 0,
        ایران = 1
    }
    public enum ProvinceType : byte
    {
        نامشخص = 0,
        تهران = 21,
        کرج = 26
    }
    public enum FloorCoveringType : byte
    {
        نامشخص = 0,
        سرامیک = 1,
        موزائیک = 2,
        سنگ = 3,
        چوبی = 4,
        لمینت = 5,

    }
    public enum DocumentForProductType : byte
    {
        نامشخص = 0,
        سند_شش_دانگ = 1,
        قولنامه_ای = 2

    }
}
