USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spModifySection'))
	DROP PROCEDURE app.spModifySection
GO

CREATE PROCEDURE app.spModifySection
@ID uniqueidentifier,
@IsNewRecord bit,
@Name NVARCHAR(1000),
@CountryType TINYINT,
@ProvinceType TINYINT,
@UserID UNIQUEIDENTIFIER
--WITH ENCRYPTION
AS
BEGIN
	IF @IsNewRecord = 1 --insert
		BEGIN
			INSERT INTO app.Section 
				(ID , Name , ProvinceType , CountryType , UserID , CreationDate)
			VALUES
				(@ID , @Name , @ProvinceType , @CountryType , @UserID , GETDATE())
		END
	ELSE -- update
		BEGIN
			UPDATE [app].[Section]
			SET
				 [Name] = @Name,
				 ProvinceType = @ProvinceType,
				 CountryType = @CountryType , 
				 UserID = @UserID
			WHERE
				[ID] = @ID
		END
END