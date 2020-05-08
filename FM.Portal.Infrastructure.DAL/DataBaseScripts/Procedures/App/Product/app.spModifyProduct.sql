USE [Amlak-Parsa]
GO
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE [object_id] = OBJECT_ID('app.spModifyProduct'))
	DROP PROCEDURE app.spModifyProduct
GO

CREATE PROCEDURE app.spModifyProduct
@ID uniqueidentifier,
@CountPhone int,
@CountRoom int,
@IsNewRecord bit,
@Description nvarchar(max),
@FloorCoveringType tinyint,
@DocumentType tinyint,
@SellingProductType tinyint,
@ProductType tinyint,
@HasElectricity bit,
@HasElevator bit,
@HasGas bit,
@HasPhone bit,
@HasWater bit,
@Meter int,
@OrginalPrice money,
@PhoneContact nvarchar(20),
@PrePayment money,
@Rent money,
@SectionID uniqueidentifier ,
@Title nvarchar(100),
@UserID uniqueidentifier,
@Enabled BIT

--WITH ENCRYPTION
AS
BEGIN
	IF @IsNewRecord = 1 --insert
		BEGIN
			DECLARE @TrackingCode NVARCHAR(20)
			SET @TrackingCode = (select STR(FLOOR(RAND(CHECKSUM(NEWID()))*(9999999999-1000000000+1)+1000000000)))

			INSERT INTO [app].[Product] (ID , CountPhone , CountRoom , [Description] , DocumentType , FloorCoveringType , HasElectricity , HasElevator , HasGas , HasPhone , HasWater , Meter , OrginalPrice , PhoneContact , PrePayment , Rent , SectionID , SellingProductType , Title , TrackingCode,UserID,[Enabled] , CreationDate , UpdatedDate)
			VALUES(@ID , @CountPhone , @CountRoom , @Description , @DocumentType , @FloorCoveringType , @HasElectricity , @HasElevator , @HasGas , @HasPhone , @HasWater , @Meter , @OrginalPrice , @PhoneContact , @PrePayment , @Rent , @SectionID , @SellingProductType , @Title , @TrackingCode,@UserID,@Enabled,GETDATE() , GETDATE())
		END
	ELSE -- update
		BEGIN
			UPDATE [app].[Product]
			SET
				 CountPhone = @CountPhone
				, CountRoom = @CountRoom
				, [Description] = @Description
				,FloorCoveringType = @FloorCoveringType
				,HasElectricity = @HasElectricity
				,HasElevator = @HasElevator
				,HasGas = @HasGas
				,HasPhone = @HasPhone
				,HasWater = @HasWater
				,Meter = @Meter
				,OrginalPrice = @OrginalPrice
				,PhoneContact = @PhoneContact
				,PrePayment = @PrePayment
				,Rent = @Rent
				,SectionID = @SectionID
				,Title = @Title
				,DocumentType = @DocumentType
				,SellingProductType = @SellingProductType
				,UserID = @UserID
				,[Enabled] = @Enabled
				,UpdatedDate = GETDATE()
			WHERE
				[ID] = @ID
		END
END