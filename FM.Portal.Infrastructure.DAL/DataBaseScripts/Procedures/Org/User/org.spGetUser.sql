USE [Amlak-Parsa]
GO

IF EXISTS(SELECT 1 FROM sys.procedures WHERE [object_id] = OBJECT_ID('org.spGetUser'))
	DROP PROCEDURE org.spGetUser
GO
CREATE PROCEDURE org.spGetUser
@ID uniqueidentifier,
@Username varchar(50),
@Password varchar(100),
@NationalCode varchar(10),
@UserType TINYINT

--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		*
	FROM [org].[User]
	WHERE
		(@Username IS NULL OR [Username] = @Username) AND
		(@Password IS NULL OR [Password] = @Password) AND
		(@NationalCode IS NULL OR [NationalCode] = @NationalCode) AND
		(@ID IS NULL OR [ID] = @ID) AND
		(@UserType IS NULL OR [UserType] = @UserType) AND
		[Enabled] = 1
END