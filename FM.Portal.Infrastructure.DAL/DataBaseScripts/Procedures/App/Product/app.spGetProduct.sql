USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetProduct'))
	DROP PROCEDURE app.spGetProduct
GO

CREATE PROCEDURE app.spGetProduct
@ID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	SELECT 
		product.*,
		section.CountryType,
		section.ProvinceType,
		section.Name AS SectionName
	FROM	
		[app].[Product] product 
	INNER JOIN 
		[app].Section section ON product.SectionID = section.ID
	WHERE 
		product.ID = @ID
END