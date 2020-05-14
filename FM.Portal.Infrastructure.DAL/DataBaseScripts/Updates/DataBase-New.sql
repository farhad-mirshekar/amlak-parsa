CREATE TABLE [app].[Product](
	[ID] [uniqueidentifier] NOT NULL,
	[SectionID] [uniqueidentifier]  NULL,
	[Meter] [int]  NULL,
	[OrginalPrice] [Nvarchar](1000) NULL,
	[DocumentType] [tinyint] NULL,
	[PrePayment] [Nvarchar](1000) NULL,
	[Rent] [Nvarchar](1000) NULL,
	[HasWater] [bit] NULL,
	[HasElectricity] [bit] NULL,
	[HasElevator] [bit]  NULL,
	[HasGas] [bit] NULL,
	[HasPhone] [bit] NULL,
	[CountPhone] [int] NULL,
	[CountRoom] [int] NULL,
	[Title] [nvarchar](100) NULL,
	[FloorCoveringType] [tinyint]  NULL,
	[SellingProductType] [tinyint]  NULL,
	[ProductType] [tinyint]  NULL,
	[PhoneContact] [nvarchar](20) NULL,
	[Description] [nvarchar](max) NULL,
	[TrackingCode] [nvarchar](20) NULL,
	[UserID] [uniqueidentifier]  NULL,
	[RemoverID] [uniqueidentifier]  NULL,
	[RemoverDate] [smallDatetime]  NULL,
	[Enabled] [bit]  NULL,
	[CreationDate] [smallDatetime]  NULL,
	[UpdatedDate] [smallDatetime]  NULL,
	 
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE TABLE [app].[Section](
	[ID] [uniqueidentifier] NOT NULL,
	[CountryType][Tinyint] NULL,
	[ProvinceType][Tinyint] NULL,
	[Name] NVARCHAR(1000) NULL,
	[UserID] UNIQUEIDENTIFIER NOT NULL,
	[CreationDate] [smallDatetime]  NULL,
	 
 CONSTRAINT [PK_Section] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE app.Product
ADD HasJacuzzi BIT NULL

ALTER TABLE app.Product
ADD HasBalcony BIT NULL

ALTER TABLE app.Product
ADD HasConferenceHall BIT NULL

ALTER TABLE app.Product
ADD HasGuard BIT NULL

ALTER TABLE app.Product
ADD HasLobby BIT NULL

ALTER TABLE app.Product
ADD HasParking BIT NULL

ALTER TABLE app.Product
ADD CountParking int NULL

ALTER TABLE app.Product
ADD HasSauna BIT NULL

ALTER TABLE app.Product
ADD HasAirConditioning BIT NULL

ALTER TABLE app.Product
ADD HasSportsHall BIT NULL

ALTER TABLE app.Product
ADD HasRemoteDoor BIT NULL

ALTER TABLE app.Product
ADD HasSwimmingPool BIT NULL

ALTER TABLE app.Product
ADD HasCentralAntenna BIT NULL

ALTER TABLE app.Product
ADD YearOfConstruction Nvarchar(1000)

ALTER TABLE pbl.Menu
ADD Parameters NVARCHAR(MAX) NULL