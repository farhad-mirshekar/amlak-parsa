USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('ptl.spDeleteNews'))
	DROP PROCEDURE ptl.spDeleteNews
GO

CREATE PROCEDURE ptl.spDeleteNews
@ID UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM [ptl].[News] WHERE ID = @ID
	RETURN @@ROWCOUNT
END