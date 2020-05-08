USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetsSection'))
	DROP PROCEDURE app.spGetsSection
GO

CREATE PROCEDURE app.spGetsSection
@Name NVARCHAR(1000),
@CountryType TINYINT,
@ProvinceType TINYINT
--WITH ENCRYPTION
AS
BEGIN
	SELECT
		*
	FROM app.Section
	WHERE
		(@Name IS NULL OR [Name] = @Name)
	AND (@ProvinceType IS NULL OR ProvinceType = @ProvinceType)
	AND (@CountryType IS NULL OR CountryType = @CountryType)
END