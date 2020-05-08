(function () {
	angular
		.module('portal')
		.factory('enumService', enumService);

	function enumService() { var enumService={};

			//enums in dll: FM.Portal.Core.Model.dll
			enumService.AttachmentType = {
				'1': 'اصلی',
				'2': 'ثانویه'
			},
			enumService.PathType = {
				'3': 'news',
				'4': 'article',
				'5': 'slider',
				'6': 'product',
				'7': 'video',
				'8': 'events',
				'9': 'editor',
				'10': 'file'
			},
			enumService.UserType = {
				'1': 'کاربر درون سازمانی',
				'2': 'کاربر برون سازمانی'
			},
			enumService.CommandsType = {
				'1': 'برنامه',
				'2': 'منو',
				'3': 'صفحه'
			},
			enumService.ShowArticleType = {
				'1': 'عدم نمایش',
				'2': 'نمایش'
			},
			enumService.CommentArticleType = {
				'1': 'بسته',
				'2': 'باز'
			},
			enumService.PositionType = {
				'100': 'راهبر'
			},
			enumService.CommentType = {
				'1': 'در حال بررسی',
				'2': 'تایید',
				'3': 'عدم تایید'
			},
			enumService.EnableMenuType = {
				'1': 'فعال',
				'2': 'غیرفعال'
			},
			enumService.CommentForType = {
				'3': 'اخبار',
				'4': 'مقالات',
				'6': 'محصولات',
				'8': 'رویدادها'
			},
			enumService.DocumentTypeForTags = {
				'3': 'اخبار',
				'4': 'مقاله',
				'6': 'محصولات',
				'8': 'رویداد'
			},
			enumService.SellingProductType = {
				'1': 'فروش',
				'2': 'اجاره',
				'3': 'رهن'
			},
			enumService.ProductType = {
				'1': 'خانه',
				'2': 'مغازه',
				'3': 'زمین',
				'4': 'ویلایی',
				'5': 'آپارتمان'
			},
			enumService.CountryType = {
				'1': 'ایران'
			},
			enumService.ProvinceType = {
				'21': 'تهران',
				'26': 'کرج'
			},
			enumService.FloorCoveringType = {
				'1': 'سرامیک',
				'2': 'موزائیک',
				'3': 'سنگ',
				'4': 'چوبی',
				'5': 'لمینت'
			},
			enumService.DocumentForProductType = {
				'1': 'سند شش دانگ',
				'2': 'قولنامه ای'
			}

		return enumService;
	}
})();
