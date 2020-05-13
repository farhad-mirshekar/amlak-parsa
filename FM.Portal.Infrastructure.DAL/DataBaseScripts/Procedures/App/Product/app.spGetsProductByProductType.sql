USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetsProductByProductType'))
	DROP PROCEDURE app.spGetsProductByProductType
GO

CREATE PROCEDURE app.spGetsProductByProductType
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
	    (@ProductType IS NULL OR ProductType = @ProductType)
	AND product.[Enabled] = 1
	AND attachment.[Type] = 1
END