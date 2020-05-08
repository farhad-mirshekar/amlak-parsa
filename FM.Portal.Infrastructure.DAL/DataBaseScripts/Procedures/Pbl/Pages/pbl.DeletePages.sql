﻿USE [Amlak-Parsa]
GO

IF EXISTS(SELECT 1 FROM sys.procedures WHERE [object_id] = OBJECT_ID('pbl.spDeletePages'))
	DROP PROCEDURE pbl.spDeletePages
GO

CREATE PROCEDURE pbl.spDeletePages
	@ID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	--SET NOCOUNT ON;
	DECLARE @Node HIERARCHYID
	SET @Node = (SELECT [Node] FROM pbl.Pages WHERE ID = @ID )
	DELETE FROM pbl.Pages
	WHERE [Node].IsDescendantOf(@Node) = 1
	RETURN @@ROWCOUNT

END