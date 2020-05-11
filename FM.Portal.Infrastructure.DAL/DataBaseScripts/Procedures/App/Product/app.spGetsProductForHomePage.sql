USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetsProductForHomePage'))
	DROP PROCEDURE app.spGetsProductForHomePage
GO

CREATE PROCEDURE app.spGetsProductForHomePage
@TrackingCode NVARCHAR(10),
@Meter INT,
@OrginalPrice MONEY,
@DocumentType TINYINT,
@FloorCoveringType TINYINT,
@ProductType TINYINT,
@Count int
--WITH ENCRYPTION
AS
BEGIN
	SELECT
		product.*,
		section.Name AS SectionName,
		section.CountryType,
		section.ProvinceType,
		attachment.[FileName],
		attachment.PathType

	FROM app.Product product
	INNER JOIN
		app.Section section ON product.SectionID = section.ID
	INNER JOIN
		pbl.Attachment attachment ON product.ID = attachment.ParentID
	WHERE
		(@TrackingCode IS NULL OR TrackingCode = @TrackingCode)
	--AND (@Meter IS NULL OR Meter BETWEEN 0 AND @Meter)
	--AND (@OrginalPrice IS NULL OR OrginalPrice BETWEEN 0 AND @OrginalPrice)
	AND (@FloorCoveringType IS NULL OR FloorCoveringType = @FloorCoveringType)
	AND (@ProductType IS NULL OR ProductType = @ProductType)
	AND attachment.[Type] = 1
END