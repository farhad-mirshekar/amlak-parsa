USE [Amlak-Parsa]
GO

IF EXISTS(SELECT 1 FROM sys.procedures WHERE [object_id] = OBJECT_ID('org.spGetRole'))
	DROP PROCEDURE org.spGetRole
GO

CREATE PROCEDURE org.spGetRole
	@ID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	
	SELECT 
		ID,
		ApplicationID,
		[Name]
	FROM org.[Role]
	WHERE ID = @ID 

	RETURN @@ROWCOUNT
END