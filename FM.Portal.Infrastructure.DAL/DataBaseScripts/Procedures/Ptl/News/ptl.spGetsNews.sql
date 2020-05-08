USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('ptl.spGetsNews'))
	DROP PROCEDURE ptl.spGetsNews
GO

CREATE PROCEDURE ptl.spGetsNews
--WITH ENCRYPTION
AS
BEGIN
	;WITH main AS(
	SELECT *
	FROM ptl.News
	)

	SELECT * 
	FROM main
	ORDER BY [CreationDate]
END