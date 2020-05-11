USE [Amlak-Parsa]
GO
INSERT [org].[Application] ([ID], [Code], [Name], [Enabled], [Comment]) VALUES (N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'1000', N'مشاور املاک پارسا', 1, NULL)
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'a64dda83-f934-4aa5-90b3-fad71f88deae', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/4/1/', N'pgprofile', N'صفحه پروفایل', 3, CAST(0xAB7F057C AS SmallDateTime), N'pgprofile')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'2acf6af0-3132-449a-8f5c-f92570a585d7', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/5/1/', N'pgfaq', N'صفحه پرسش های متداول', 3, CAST(0xAB8004A1 AS SmallDateTime), N'pgfaq')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'94443d88-062d-4109-91d9-f53f54917bce', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/4/', N'mnusetting', N'مدیریت سامانه', 2, CAST(0xAB7F057A AS SmallDateTime), N'mnusetting')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'c30639be-f691-46e0-bfc1-ed59bc08f82d', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/3/2/', N'pgproduct-attribute', N'ویژگی های محصولات', 3, CAST(0xAB8004A4 AS SmallDateTime), N'pgproduct-attribute')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'6bcfc3e8-a72a-4cc4-8632-ea0c507b06ac', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/4/5/', N'pgusers', N'مدیریت کاربران', 3, CAST(0xABB40371 AS SmallDateTime), N'pgusers')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'3e442c98-03d1-49af-9f71-d3e086c7db11', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/6/1/', N'pgportal-category', N'صفحه دسته بندی اخبار و مقالات', 3, CAST(0xAB8004A8 AS SmallDateTime), N'pgportal-category')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'a7dff0bd-cc01-42a3-b0a8-ccbc558972df', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/4/3/', N'pgposition', N'مدیریت جایگاه های سازمانی', 3, CAST(0xAB7F057F AS SmallDateTime), N'pgposition')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'247bb6c9-59c7-4569-bceb-cb1b162f2eda', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/', N'store', N'فروشگاه اینترنتی اورا', 1, CAST(0xAADD04EF AS SmallDateTime), N'store')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'0f79295e-4c38-4875-b548-c05a57d6ed34', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/4/2/', N'pgrole', N'مدیریت نقش ها', 3, CAST(0xAB7F057F AS SmallDateTime), N'pgrole')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'52a20120-fcfb-4a58-8122-bac9fe871326', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/3/5/', N'pgproduct-comment', N'صفحه کارتابل نظرات', 3, CAST(0xAB8004A6 AS SmallDateTime), N'pgproduct-comment')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'db4f51a9-476f-4de9-8477-b5f6eeb7cc23', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/3/', N'mnuproduct', N'مدیریت محصولات', 2, CAST(0xAB7604CF AS SmallDateTime), N'mnuproduct')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'6d21ab4d-c758-403b-bd0d-ac5e16018a18', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/3/4/', N'pgdiscount', N'صفحه کارتابل تخفیفات', 3, CAST(0xAB8004A5 AS SmallDateTime), N'pgdiscount')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'aaf50390-b909-4f7b-b6a5-aa601110df3b', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/3/3/', N'pgproduct-category', N'صفحه دسته بندی محصولات', 3, CAST(0xAB8004A5 AS SmallDateTime), N'pgproduct-category')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'd73d1e89-a014-4823-b386-8c9cd602336f', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/6/2/', N'pg-article', N'صفحه مقالات', 3, CAST(0xAB8004A8 AS SmallDateTime), N'pg-article')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'd2b679d3-99aa-464e-a2e7-8c5bed607b8e', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/4/4/', N'pgcommand', N'صفحه مدیریت مجوزها', 3, CAST(0xAB8303AC AS SmallDateTime), N'pgcommand')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'41453051-c729-4051-a1e2-8762469d8b8a', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/5/2/', N'pgmenu', N'مدیریت منو', 3, CAST(0xAB8903F2 AS SmallDateTime), N'pgmenu')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'1585c360-c544-48f1-816f-7c105029bf21', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/5/4/', N'pgdepartment', N'مدیریت دستگاه ها', 3, CAST(0xABB304D1 AS SmallDateTime), N'pgdepartment')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'6326f233-b069-4bb8-ab49-3f08adcde500', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/3/1/', N'pgproduct-cartable', N'کارتابل محصولات', 3, CAST(0xAB7604D2 AS SmallDateTime), N'pgproduct-cartable')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'64c8b16c-9cb6-4e58-8b30-3c3a9d3f642c', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/6/5/', N'pgevents', N'منو مدیریت رویداد', 3, CAST(0xAB8E046E AS SmallDateTime), N'pgevents')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'dc6c40d2-7259-4158-956c-378f977ebc39', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/5/', N'mnubasic', N'مدیریت پایه', 2, CAST(0xAB8004A1 AS SmallDateTime), N'mnubasic')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'c661a953-32ee-4566-86e0-3781f904c62e', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/6/', N'mnuportal', N'منو پرتال', 2, CAST(0xAB8004A7 AS SmallDateTime), N'mnuportal')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'996072fa-3a32-4c15-af1f-32bb87f85b8e', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/6/3/', N'pgnews', N'صفحه مدیریت اخبار', 3, CAST(0xAB850413 AS SmallDateTime), N'pgnews')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'175d0521-12d2-47ca-84bf-17a4434ea015', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/6/4/', N'pgsliders', N'منو مدیریت صفحات کشویی', 3, CAST(0xAB8E046E AS SmallDateTime), N'pgsliders')
GO
INSERT [org].[Command] ([ID], [ApplicationID], [Node], [Name], [Title], [Type], [CreationDate], [FullName]) VALUES (N'f636b809-91cd-4dc8-86fa-10ba4a7961af', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'/1/5/3/', N'pggeneral-setting', N'مدیریت تنظیمات سایت', 3, CAST(0xAB8A02A5 AS SmallDateTime), N'pggeneral-setting')
GO
INSERT [org].[Department] ([ID], [Name], [Enabled], [RemoverID], [RemoverDate], [Address], [PostalCode], [Phone], [CodePhone], [Node]) VALUES (N'dbe78dff-a580-4793-833d-6b5540353d53', N'مشاوران ام', 1, NULL, NULL, N'مهرشهر', N'45345345  ', N'23345345', N'026', N'/1/')
GO
INSERT [org].[User] ([ID], [Enabled], [Username], [Password], [FirstName], [LastName], [NationalCode], [Email], [EmailVerified], [CellPhone], [CellPhoneVerified], [PasswordExpireDate], [UserType]) VALUES (N'c3413f08-56d2-4c69-a7da-caf9dda23d35', 1, N'amlak-parsa', N'mlfaXRXraiakfBGRjFRJmnq6Urw7qwxyO7e++c/WF/U=', N'تست', N'تست', NULL, NULL, 1, NULL, 1, CAST(0xB9F9037D AS SmallDateTime), 1)
GO
INSERT [org].[Position] ([ID], [Node], [ApplicationID], [DepartmentID], [UserID], [Type], [Default], [RemoverID], [RemoveDate], [Enabled]) VALUES (N'e09da134-6a65-46ad-b362-d3d527eadbdc', N'/2/', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'dbe78dff-a580-4793-833d-6b5540353d53', N'c3413f08-56d2-4c69-a7da-caf9dda23d35', 0, 0, NULL, NULL, 1)
GO
INSERT [org].[Role] ([ID], [ApplicationID], [Name]) VALUES (N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'db3e73b7-4d80-4daf-8f2b-de4626c78ebf', N'مدیر')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'00e66d96-a33b-4463-b75d-78fd70d334e0', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'f636b809-91cd-4dc8-86fa-10ba4a7961af')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'bece6de0-b7b5-4644-ae39-eee51dd7af88', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'175d0521-12d2-47ca-84bf-17a4434ea015')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'fdabb86c-315b-4b50-9661-dae26b67eded', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'996072fa-3a32-4c15-af1f-32bb87f85b8e')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'71945983-d8ba-4de2-8670-84a06045776e', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'c661a953-32ee-4566-86e0-3781f904c62e')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'a1ba778c-0ab7-497f-9afe-e66c0796a1c4', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'dc6c40d2-7259-4158-956c-378f977ebc39')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'8aaef949-2f84-4665-892e-e662b726f97b', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'64c8b16c-9cb6-4e58-8b30-3c3a9d3f642c')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'467aed08-c502-40e1-8943-153dc68cbaa1', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'6326f233-b069-4bb8-ab49-3f08adcde500')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'725da41e-f3a2-4568-9dbc-7e6e1ca664bb', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'1585c360-c544-48f1-816f-7c105029bf21')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'56a3344d-772a-4926-a2f9-4a520cacbec0', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'41453051-c729-4051-a1e2-8762469d8b8a')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'aa12c509-cc23-43c9-a7bb-e0c0ab873e80', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'd2b679d3-99aa-464e-a2e7-8c5bed607b8e')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'cb945071-43e4-4e27-a3c3-14b3c1c0d714', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'd73d1e89-a014-4823-b386-8c9cd602336f')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'685ee544-77cb-435c-a18a-15b7efa736c3', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'aaf50390-b909-4f7b-b6a5-aa601110df3b')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'7bd1e471-ae01-4dd5-beef-4ee4abc050bb', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'6d21ab4d-c758-403b-bd0d-ac5e16018a18')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'80a500d9-817e-4202-9474-86239f93165e', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'db4f51a9-476f-4de9-8477-b5f6eeb7cc23')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'ed8b2757-9de4-488d-9c4b-6d043874a66b', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'52a20120-fcfb-4a58-8122-bac9fe871326')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'32f9849e-3869-4410-8b1c-84dc5381847e', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'0f79295e-4c38-4875-b548-c05a57d6ed34')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'ab1cd573-96ce-41ad-9e0f-3afcd7d4809d', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'a7dff0bd-cc01-42a3-b0a8-ccbc558972df')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'65d1b716-b3b3-4b46-ac38-0752769b6294', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'3e442c98-03d1-49af-9f71-d3e086c7db11')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'39c70e3a-d8bd-4f51-a148-8ada9d692bc5', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'c30639be-f691-46e0-bfc1-ed59bc08f82d')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'710b2408-0b0b-452b-8fa7-45cde96d4f07', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'94443d88-062d-4109-91d9-f53f54917bce')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'6803658c-ca43-4c1f-93ec-87bd9eaa8154', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'2acf6af0-3132-449a-8f5c-f92570a585d7')
GO
INSERT [org].[RolePermission] ([ID], [RoleID], [CommandID]) VALUES (N'd39adb0b-c0bd-4191-8f6d-a915a068a86e', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58', N'a64dda83-f934-4aa5-90b3-fad71f88deae')
GO
INSERT [org].[PositionRole] ([ID], [PositionID], [RoleID]) VALUES (N'7320fac3-ae4f-4cbd-b3a1-457ffc6a536b', N'e09da134-6a65-46ad-b362-d3d527eadbdc', N'f7bb94a0-842b-4fbf-b165-6534b85e1a58')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'SiteMetaTag', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'FacebookUrl', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'InstagramUrl', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'TelegramUrl', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'TwitterUrl', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'WhatsAppUrl', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'Phone', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'Fax', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'Address', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'Mobile', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'CountShowSlider', N'2')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'CountShowArticle', N'2')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'CountShowNews', N'2')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'CountShowProduct', N'4')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'SiteUrl', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'SiteKeyword', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'SiteDescription', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'SiteName', N'')
GO
INSERT [pbl].[GeneralSetting] ([Name], [Value]) VALUES (N'CountShowEvents', N'')
GO
INSERT INTO ptl.Category
VALUES
(NEWID(),N'بازار مسکن',null,1,1,0,GETDATE())