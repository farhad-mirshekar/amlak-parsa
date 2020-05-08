USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('ptl.spModifyEvents'))
	DROP PROCEDURE ptl.spModifyEvents
GO

CREATE PROCEDURE ptl.spModifyEvents
@ID UNIQUEIDENTIFIER,
@Title NVARCHAR(max),
@Body nvarchar(max),
@MetaKeywords nvarchar(400),
@Description nvarchar(max),
@CommentStatus Tinyint,
@UrlDesc nvarchar(max),
@IsShow tinyint,
@CategoryID uniqueidentifier,
@UserID uniqueidentifier,
@TrackingCode nvarchar(100),
@isNewRecord bit,
@ReadingTime NVARCHAR(200)
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;

	IF @isNewRecord = 1 --insert
		BEGIN

			SET @TrackingCode = (select STR(FLOOR(RAND(CHECKSUM(NEWID()))*(9999999999-1000000000+1)+1000000000)))

			INSERT INTO [ptl].[Events]
				([ID],Body,CommentStatus,CreationDate,[Description],DisLikeCount,IsShow,LikeCount,MetaKeywords,ModifiedDate,RemoverID,Title,UrlDesc,UserID,VisitedCount , TrackingCode,CategoryID,[ReadingTime])
			VALUES
				(@ID , @Body  , @CommentStatus , GETDATE() , @Description , 0,@IsShow , 0 , @MetaKeywords , GETDATE() , null , @Title ,@UrlDesc, @UserID , 0 , @TrackingCode,@CategoryID,@ReadingTime)
		END
	ELSE -- update
		BEGIN
			UPDATE [ptl].[Events]
			SET
				[Title] = @Title ,
				[ModifiedDate] = GETDATE() ,
				[Body] = @Body ,
				[MetaKeywords] = @MetaKeywords,
				[Description] = @Description,
				[CommentStatus] = @CommentStatus,
				[UrlDesc] = @UrlDesc,
				[IsShow] = @IsShow,
				[CategoryID] = @CategoryID,
				[UserID] = @UserID,
				[ReadingTime] = @ReadingTime
			WHERE
				[ID] = @ID
		END
			RETURN @@ROWCOUNT
END
