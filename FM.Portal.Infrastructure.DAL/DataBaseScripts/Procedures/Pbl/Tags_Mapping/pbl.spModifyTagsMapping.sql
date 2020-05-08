﻿USE [Amlak-Parsa]
GO

IF EXISTS(SELECT 1 FROM sys.procedures WHERE [object_id] = OBJECT_ID('pbl.spModifyTagsMapping'))
	DROP PROCEDURE pbl.spModifyTagsMapping
GO

CREATE PROCEDURE pbl.spModifyTagsMapping
	@TagID UNIQUEIDENTIFIER,
	@DocumentID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO pbl.Tags_Mapping
		(TagID,DocumentID)
	VALUES
		(@TagID , @DocumentID)
	RETURN @@ROWCOUNT
END