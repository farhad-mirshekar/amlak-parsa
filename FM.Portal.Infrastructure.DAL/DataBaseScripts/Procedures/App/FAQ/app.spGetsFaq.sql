USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spGetsFaq'))
	DROP PROCEDURE app.spGetsFaq
GO

CREATE PROCEDURE app.spGetsFaq
@FAQGroupID UNIQUEIDENTIFIER

--WITH ENCRYPTION
AS
BEGIN
	SELECT 
		faq.*
	FROM 
		[app].[FAQ] faq
	WHERE
		faq.FAQGroupID = @FAQGroupID
END