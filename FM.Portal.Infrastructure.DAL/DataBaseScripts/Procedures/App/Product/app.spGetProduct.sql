USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetProduct'))
	DROP PROCEDURE app.spGetProduct
GO

CREATE PROCEDURE app.spGetProduct
@ID UNIQUEIDENTIFIER,
@TrackingCode NVARCHAR(20)
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
		(@ID IS NULL OR product.ID = @ID)
	AND (@TrackingCode IS NULL OR product.TrackingCode = @TrackingCode)
END