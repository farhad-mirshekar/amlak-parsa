
/****** Object:  Schema [app]    Script Date: 5/8/2020 12:26:32 PM ******/
CREATE SCHEMA [app]
GO
/****** Object:  Schema [org]    Script Date: 5/8/2020 12:26:32 PM ******/
CREATE SCHEMA [org]
GO
/****** Object:  Schema [pbl]    Script Date: 5/8/2020 12:26:32 PM ******/
CREATE SCHEMA [pbl]
GO
/****** Object:  Schema [ptl]    Script Date: 5/8/2020 12:26:32 PM ******/
CREATE SCHEMA [ptl]
GO
/****** Object:  UserDefinedFunction [dbo].[fnSplitString]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


Create FUNCTION [dbo].[fnSplitString] 
( 
    @string NVARCHAR(MAX), 
    @delimiter CHAR(1) 
) 
RETURNS @output TABLE(splitdata NVARCHAR(MAX) 
) 
BEGIN 
    DECLARE @start INT, @end INT 
    SELECT @start = 1, @end = CHARINDEX(@delimiter, @string) 
    WHILE @start < LEN(@string) + 1 BEGIN 
        IF @end = 0  
            SET @end = LEN(@string) + 1
       
        INSERT INTO @output (splitdata)  
        VALUES(SUBSTRING(@string, @start, @end - @start)) 
        SET @start = @end + 1 
        SET @end = CHARINDEX(@delimiter, @string, @start)
        
    END 
    RETURN 
END


GO
/****** Object:  Table [app].[Category]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[Category](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](100) NULL,
	[ParentID] [uniqueidentifier] NULL,
	[IncludeInTopMenu] [bit] NULL,
	[IncludeInLeftMenu] [bit] NULL,
	[HasDiscountsApplied] [bit] NULL,
	[CreationDate] [smalldatetime] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [app].[Comment]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[Comment](
	[ID] [uniqueidentifier] NOT NULL,
	[Body] [nvarchar](max) NOT NULL,
	[CommentType] [tinyint] NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[LikeCount] [int] NULL,
	[DisLikeCount] [int] NULL,
	[ParentID] [uniqueidentifier] NULL,
	[UserID] [uniqueidentifier] NULL,
	[DocumentID] [uniqueidentifier] NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[CommentForType] [tinyint] NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [app].[FAQ]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[FAQ](
	[ID] [uniqueidentifier] NOT NULL,
	[FAQGroupID] [uniqueidentifier] NOT NULL,
	[Question] [nvarchar](500) NOT NULL,
	[Answer] [nvarchar](500) NOT NULL,
	[CreatorID] [uniqueidentifier] NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_FAQ] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [app].[FAQGroup]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[FAQGroup](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](500) NOT NULL,
	[CreatorID] [uniqueidentifier] NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[ApplicationID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_FAQGroup] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [org].[Application]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [org].[Application](
	[ID] [uniqueidentifier] NOT NULL,
	[Code] [varchar](20) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Enabled] [bit] NOT NULL,
	[Comment] [nvarchar](256) NULL,
 CONSTRAINT [PK_orgApplications] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [org].[Command]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [org].[Command](
	[ID] [uniqueidentifier] NOT NULL,
	[ApplicationID] [uniqueidentifier] NOT NULL,
	[Node] [hierarchyid] NOT NULL,
	[Name] [varchar](256) NOT NULL,
	[Title] [nvarchar](256) NOT NULL,
	[Type] [tinyint] NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[FullName] [varchar](1000) NOT NULL,
 CONSTRAINT [PK_orgApplicationCommands] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [org].[Department]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [org].[Department](
	[ID] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Enabled] [bit] NOT NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[RemoverDate] [smalldatetime] NULL,
	[Address] [nvarchar](1000) NULL,
	[PostalCode] [char](10) NULL,
	[Phone] [nvarchar](11) NULL,
	[CodePhone] [nvarchar](3) NULL,
	[Node] [hierarchyid] NULL,
 CONSTRAINT [PK_orgDepartments] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [org].[Position]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [org].[Position](
	[ID] [uniqueidentifier] NOT NULL,
	[Node] [hierarchyid] NOT NULL,
	[ApplicationID] [uniqueidentifier] NOT NULL,
	[DepartmentID] [uniqueidentifier] NOT NULL,
	[UserID] [uniqueidentifier] NULL,
	[Type] [tinyint] NOT NULL,
	[Default] [bit] NOT NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[RemoveDate] [smalldatetime] NULL,
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_Positions] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [org].[PositionRole]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [org].[PositionRole](
	[ID] [uniqueidentifier] NOT NULL,
	[PositionID] [uniqueidentifier] NOT NULL,
	[RoleID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_UserRole] UNIQUE NONCLUSTERED 
(
	[PositionID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [org].[RefreshToken]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [org].[RefreshToken](
	[ID] [uniqueidentifier] NOT NULL,
	[IssuedDate] [datetime] NOT NULL,
	[ExpireDate] [datetime] NOT NULL,
	[ProtectedTicket] [nvarchar](4000) NOT NULL,
	[UserID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [org].[Role]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [org].[Role](
	[ID] [uniqueidentifier] NOT NULL,
	[ApplicationID] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
 CONSTRAINT [PK_orgRoles] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [org].[RolePermission]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [org].[RolePermission](
	[ID] [uniqueidentifier] NOT NULL,
	[RoleID] [uniqueidentifier] NOT NULL,
	[CommandID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_orgRolePermission] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_orgRolePermission] UNIQUE NONCLUSTERED 
(
	[RoleID] ASC,
	[CommandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [org].[User]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [org].[User](
	[ID] [uniqueidentifier] NOT NULL,
	[Enabled] [bit] NOT NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](1000) NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](100) NULL,
	[NationalCode] [varchar](18) NULL,
	[Email] [varchar](256) NULL,
	[EmailVerified] [bit] NOT NULL,
	[CellPhone] [varchar](20) NULL,
	[CellPhoneVerified] [bit] NOT NULL,
	[PasswordExpireDate] [smalldatetime] NULL,
	[UserType] [tinyint] NULL,
 CONSTRAINT [PK_orgUsers] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [pbl].[Attachment]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [pbl].[Attachment](
	[ID] [uniqueidentifier] NOT NULL,
	[ParentID] [uniqueidentifier] NOT NULL,
	[Type] [tinyint] NOT NULL,
	[FileName] [nvarchar](256) NOT NULL,
	[Comment] [nvarchar](256) NULL,
	[Data] [varbinary](max) NOT NULL,
	[CreationDate] [smalldatetime] NULL,
	[PathType] [tinyint] NULL,
 CONSTRAINT [PK_Attachment] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [pbl].[GeneralSetting]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [pbl].[GeneralSetting](
	[Name] [nvarchar](max) NOT NULL,
	[Value] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [pbl].[Menu]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [pbl].[Menu](
	[ID] [uniqueidentifier] NOT NULL,
	[Node] [hierarchyid] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[Deleted] [bit] NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[Enabled] [tinyint] NULL,
	[Url] [nvarchar](max) NOT NULL,
	[IconText] [nvarchar](256) NULL,
	[Priority] [int] NULL,
 CONSTRAINT [PK_Menu] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [pbl].[Notification]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [pbl].[Notification](
	[ID] [uniqueidentifier] NOT NULL,
	[UserID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](3000) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[ReadDate] [smalldatetime] NULL,
	[CreationDate] [smalldatetime] NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [pbl].[Pages]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [pbl].[Pages](
	[ID] [uniqueidentifier] NOT NULL,
	[Node] [hierarchyid] NOT NULL,
	[ControllerName] [nvarchar](200) NULL,
	[ActionName] [nvarchar](200) NULL,
	[Title] [nvarchar](200) NULL,
	[Description] [nvarchar](max) NULL,
	[Enabled] [bit] NULL,
	[Deleted] [bit] NULL,
	[CreationDate] [smalldatetime] NULL,
	[RouteUrl] [nvarchar](max) NULL,
 CONSTRAINT [PK_Pages] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [pbl].[Tags]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [pbl].[Tags](
	[ID] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[CreationDate] [smalldatetime] NULL,
 CONSTRAINT [PK_Tags] PRIMARY KEY CLUSTERED 
(
	[ID] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [pbl].[Tags_Mapping]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [pbl].[Tags_Mapping](
	[TagID] [uniqueidentifier] NOT NULL,
	[DocumentID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [ptl].[Article]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ptl].[Article](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[Body] [nvarchar](max) NOT NULL,
	[MetaKeywords] [nvarchar](400) NULL,
	[Description] [nvarchar](max) NULL,
	[VisitedCount] [int] NOT NULL,
	[LikeCount] [int] NULL,
	[DisLikeCount] [int] NULL,
	[UrlDesc] [nvarchar](max) NULL,
	[IsShow] [bit] NOT NULL,
	[UserID] [uniqueidentifier] NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[TrackingCode] [nvarchar](100) NULL,
	[CommentStatus] [tinyint] NULL,
	[CategoryID] [uniqueidentifier] NULL,
	[ReadingTime] [nvarchar](200) NULL,
 CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [ptl].[Category]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ptl].[Category](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](100) NULL,
	[ParentID] [uniqueidentifier] NULL,
	[IncludeInTopMenu] [bit] NULL,
	[IncludeInLeftMenu] [bit] NULL,
	[HasDiscountsApplied] [bit] NULL,
	[CreationDate] [smalldatetime] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [ptl].[Events]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ptl].[Events](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[Body] [nvarchar](max) NOT NULL,
	[MetaKeywords] [nvarchar](400) NULL,
	[Description] [nvarchar](max) NULL,
	[CommentStatus] [tinyint] NOT NULL,
	[VisitedCount] [int] NOT NULL,
	[LikeCount] [int] NULL,
	[DisLikeCount] [int] NULL,
	[UrlDesc] [nvarchar](max) NULL,
	[CategoryID] [uniqueidentifier] NULL,
	[UserID] [uniqueidentifier] NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[TrackingCode] [nvarchar](100) NULL,
	[IsShow] [tinyint] NULL,
	[ReadingTime] [nvarchar](200) NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [ptl].[News]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ptl].[News](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[Body] [nvarchar](max) NOT NULL,
	[MetaKeywords] [nvarchar](400) NULL,
	[Description] [nvarchar](max) NULL,
	[CommentStatus] [tinyint] NOT NULL,
	[VisitedCount] [int] NOT NULL,
	[LikeCount] [int] NULL,
	[DisLikeCount] [int] NULL,
	[UrlDesc] [nvarchar](max) NULL,
	[CategoryID] [uniqueidentifier] NULL,
	[UserID] [uniqueidentifier] NULL,
	[RemoverID] [uniqueidentifier] NULL,
	[TrackingCode] [nvarchar](100) NULL,
	[IsShow] [tinyint] NULL,
	[ReadingTime] [nvarchar](200) NULL,
 CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [ptl].[Slider]    Script Date: 5/8/2020 12:26:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ptl].[Slider](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[CreationDate] [smalldatetime] NOT NULL,
	[Priority] [int] NOT NULL,
	[Enabled] [tinyint] NOT NULL,
	[Deleted] [bit] NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_Slider] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [pbl].[Menu] ADD  DEFAULT ((0)) FOR [Deleted]
GO
ALTER TABLE [pbl].[Pages] ADD  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [pbl].[Pages] ADD  DEFAULT ((0)) FOR [Deleted]
GO
ALTER TABLE [ptl].[Slider] ADD  DEFAULT ((1)) FOR [Priority]
GO
ALTER TABLE [ptl].[Slider] ADD  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [ptl].[Slider] ADD  DEFAULT ((0)) FOR [Deleted]
GO
ALTER TABLE [app].[Comment]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [app].[FAQ]  WITH CHECK ADD FOREIGN KEY([FAQGroupID])
REFERENCES [app].[FAQGroup] ([ID])
GO
ALTER TABLE [org].[Command]  WITH CHECK ADD  CONSTRAINT [FK_Command_Application] FOREIGN KEY([ApplicationID])
REFERENCES [org].[Application] ([ID])
GO
ALTER TABLE [org].[Command] CHECK CONSTRAINT [FK_Command_Application]
GO
ALTER TABLE [org].[Position]  WITH CHECK ADD  CONSTRAINT [FK_Position_Application] FOREIGN KEY([ApplicationID])
REFERENCES [org].[Application] ([ID])
GO
ALTER TABLE [org].[Position] CHECK CONSTRAINT [FK_Position_Application]
GO
ALTER TABLE [org].[Position]  WITH CHECK ADD  CONSTRAINT [FK_Position_Department] FOREIGN KEY([DepartmentID])
REFERENCES [org].[Department] ([ID])
GO
ALTER TABLE [org].[Position] CHECK CONSTRAINT [FK_Position_Department]
GO
ALTER TABLE [org].[Position]  WITH CHECK ADD  CONSTRAINT [FK_Position_User] FOREIGN KEY([UserID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [org].[Position] CHECK CONSTRAINT [FK_Position_User]
GO
ALTER TABLE [org].[Position]  WITH CHECK ADD  CONSTRAINT [FK_Position_User1] FOREIGN KEY([RemoverID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [org].[Position] CHECK CONSTRAINT [FK_Position_User1]
GO
ALTER TABLE [org].[Position]  WITH CHECK ADD  CONSTRAINT [FK_Position_Users1] FOREIGN KEY([RemoverID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [org].[Position] CHECK CONSTRAINT [FK_Position_Users1]
GO
ALTER TABLE [org].[PositionRole]  WITH CHECK ADD  CONSTRAINT [FK_PositionRole_Position] FOREIGN KEY([PositionID])
REFERENCES [org].[Position] ([ID])
GO
ALTER TABLE [org].[PositionRole] CHECK CONSTRAINT [FK_PositionRole_Position]
GO
ALTER TABLE [org].[PositionRole]  WITH CHECK ADD  CONSTRAINT [FK_PositionRole_Role] FOREIGN KEY([RoleID])
REFERENCES [org].[Role] ([ID])
GO
ALTER TABLE [org].[PositionRole] CHECK CONSTRAINT [FK_PositionRole_Role]
GO
ALTER TABLE [org].[RefreshToken]  WITH CHECK ADD  CONSTRAINT [FK_RefreshToken_User] FOREIGN KEY([UserID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [org].[RefreshToken] CHECK CONSTRAINT [FK_RefreshToken_User]
GO
ALTER TABLE [org].[RolePermission]  WITH CHECK ADD  CONSTRAINT [FK_orgRolePermission_ApplicationCommands] FOREIGN KEY([CommandID])
REFERENCES [org].[Command] ([ID])
GO
ALTER TABLE [org].[RolePermission] CHECK CONSTRAINT [FK_orgRolePermission_ApplicationCommands]
GO
ALTER TABLE [org].[RolePermission]  WITH CHECK ADD  CONSTRAINT [FK_orgRolePermission_Roles] FOREIGN KEY([RoleID])
REFERENCES [org].[Role] ([ID])
GO
ALTER TABLE [org].[RolePermission] CHECK CONSTRAINT [FK_orgRolePermission_Roles]
GO
ALTER TABLE [pbl].[Tags_Mapping]  WITH CHECK ADD  CONSTRAINT [Tags_Mapping_Tag] FOREIGN KEY([TagID])
REFERENCES [pbl].[Tags] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [pbl].[Tags_Mapping] CHECK CONSTRAINT [Tags_Mapping_Tag]
GO
ALTER TABLE [ptl].[Article]  WITH CHECK ADD FOREIGN KEY([CategoryID])
REFERENCES [ptl].[Category] ([ID])
GO
ALTER TABLE [ptl].[Article]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [ptl].[Events]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [org].[User] ([ID])
GO
ALTER TABLE [ptl].[News]  WITH CHECK ADD FOREIGN KEY([CategoryID])
REFERENCES [ptl].[Category] ([ID])
GO
ALTER TABLE [ptl].[News]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [org].[User] ([ID])
GO
