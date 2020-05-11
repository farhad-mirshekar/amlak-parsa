USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetsProduct'))
	DROP PROCEDURE app.spGetsProduct
GO

CREATE PROCEDURE app.spGetsProduct
@TrackingCode NVARCHAR(10),
@Meter INT,
@OrginalPrice MONEY,
@DocumentType TINYINT,
@FloorCoveringType TINYINT
--WITH ENCRYPTION
AS
BEGIN
	SELECT
		product.*,
		section.Name AS SectionName,
		section.CountryType,
		section.ProvinceType

	FROM app.Product product
	INNER JOIN
		app.Section section ON product.SectionID = section.ID
	WHERE
		(@TrackingCode IS NULL OR TrackingCode = @TrackingCode)
	AND (@Meter IS NULL OR Meter BETWEEN 0 AND @Meter)
	AND (@OrginalPrice IS NULL OR OrginalPrice BETWEEN 0 AND @OrginalPrice)
	AND (@FloorCoveringType IS NULL OR FloorCoveringType = @FloorCoveringType)
END