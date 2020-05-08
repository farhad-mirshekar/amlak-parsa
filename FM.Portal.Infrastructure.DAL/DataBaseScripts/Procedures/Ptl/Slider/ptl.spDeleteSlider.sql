USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('ptl.spDeleteSlider'))
	DROP PROCEDURE ptl.spDeleteSlider
GO

CREATE PROCEDURE ptl.spDeleteSlider
@ID UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE 
		ptl.Slider
	SET
		Deleted = 1
	WHERE
		ID = @ID
	RETURN @@ROWCOUNT
END