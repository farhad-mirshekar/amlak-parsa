USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetsProductBySellingProductType'))
	DROP PROCEDURE app.spGetsProductBySellingProductType
GO

CREATE PROCEDURE app.spGetsProductBySellingProductType
@SellingProductType TINYINT,
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
	    (@SellingProductType IS NULL OR product.SellingProductType = @SellingProductType)
	AND attachment.[Type] = 1
END