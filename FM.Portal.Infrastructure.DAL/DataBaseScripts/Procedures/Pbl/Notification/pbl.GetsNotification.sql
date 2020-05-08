﻿USE [Amlak-Parsa]
GO

IF EXISTS(SELECT 1 FROM sys.procedures WHERE [object_id] = OBJECT_ID('pbl.spGetsNotification'))
	DROP PROCEDURE pbl.spGetsNotification
GO

CREATE PROCEDURE pbl.spGetsNotification
@UserID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		*
	FROM 
		pbl.[Notification]
	WHERE
		[UserID] = @UserID 
	ORDER BY 
		[CreationDate]

	RETURN @@ROWCOUNT
END