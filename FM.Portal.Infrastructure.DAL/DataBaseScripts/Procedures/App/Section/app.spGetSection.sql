USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetSection'))
	DROP PROCEDURE app.spGetSection
GO

CREATE PROCEDURE app.spGetSection
@ID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	SELECT 
		*
	FROM	
		[app].[Section] 
	WHERE 
		ID = @ID
END