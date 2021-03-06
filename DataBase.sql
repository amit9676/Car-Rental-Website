USE [master]
GO
/****** Object:  Database [CarRentService]    Script Date: 10/01/2020 16:08:40 ******/
CREATE DATABASE [CarRentService]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CarRentService', FILENAME = N'E:\SQL\MSSQL14.SQLEXPRESS\MSSQL\DATA\CarRentService.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CarRentService_log', FILENAME = N'E:\SQL\MSSQL14.SQLEXPRESS\MSSQL\DATA\CarRentService_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [CarRentService] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CarRentService].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CarRentService] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CarRentService] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CarRentService] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CarRentService] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CarRentService] SET ARITHABORT OFF 
GO
ALTER DATABASE [CarRentService] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CarRentService] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CarRentService] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CarRentService] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CarRentService] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CarRentService] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CarRentService] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CarRentService] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CarRentService] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CarRentService] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CarRentService] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CarRentService] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CarRentService] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CarRentService] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CarRentService] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CarRentService] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CarRentService] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CarRentService] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CarRentService] SET  MULTI_USER 
GO
ALTER DATABASE [CarRentService] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CarRentService] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CarRentService] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CarRentService] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CarRentService] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CarRentService] SET QUERY_STORE = OFF
GO
USE [CarRentService]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[BranchName] [nvarchar](30) NOT NULL,
	[Address] [nvarchar](50) NOT NULL,
	[City] [nvarchar](30) NOT NULL,
	[Latitude] [decimal](9, 6) NOT NULL,
	[Longitude] [decimal](9, 6) NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[CarNumber] [varchar](8) NOT NULL,
	[ManufactorID] [int] NOT NULL,
	[ModelID] [int] NOT NULL,
	[DesignID] [int] NOT NULL,
	[GearID] [int] NOT NULL,
	[Kilometrage] [float] NOT NULL,
	[Year] [int] NOT NULL,
	[FunctionalForRent] [bit] NOT NULL,
	[RentDayPrice] [money] NOT NULL,
	[LateDayRentPrice] [money] NOT NULL,
	[Picture] [nvarchar](100) NULL,
	[BranchID] [int] NOT NULL,
 CONSTRAINT [PK_Cars] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Designs]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Designs](
	[DesignID] [int] IDENTITY(1,1) NOT NULL,
	[CarDesign] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_Designs] PRIMARY KEY CLUSTERED 
(
	[DesignID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gears]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gears](
	[GearID] [int] IDENTITY(1,1) NOT NULL,
	[GearType] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Gears] PRIMARY KEY CLUSTERED 
(
	[GearID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genders]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genders](
	[GenderID] [int] IDENTITY(1,1) NOT NULL,
	[Gender] [nvarchar](6) NOT NULL,
 CONSTRAINT [PK_Genders] PRIMARY KEY CLUSTERED 
(
	[GenderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manufactors]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manufactors](
	[ManufactorID] [int] IDENTITY(1,1) NOT NULL,
	[Manufactor] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Manufactors] PRIMARY KEY CLUSTERED 
(
	[ManufactorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[MessageID] [int] IDENTITY(1,1) NOT NULL,
	[WriterFullName] [nvarchar](50) NOT NULL,
	[WriterEmail] [nvarchar](50) NOT NULL,
	[MessageContent] [nvarchar](500) NOT NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Models]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Models](
	[ModelID] [int] IDENTITY(1,1) NOT NULL,
	[Model] [nvarchar](20) NOT NULL,
	[ManufactorID] [int] NOT NULL,
 CONSTRAINT [PK_Models] PRIMARY KEY CLUSTERED 
(
	[ModelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[OrderStartDate] [date] NOT NULL,
	[OrderEndDate] [date] NOT NULL,
	[OrderActualEndDate] [date] NULL,
	[OrderedCarID] [int] NOT NULL,
	[OrderingUserID] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ranks]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ranks](
	[RankID] [int] IDENTITY(1,1) NOT NULL,
	[Rank] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Ranks] PRIMARY KEY CLUSTERED 
(
	[RankID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/01/2020 16:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](30) NOT NULL,
	[LastName] [nvarchar](30) NOT NULL,
	[SocialNumber] [nvarchar](9) NOT NULL,
	[UserName] [nvarchar](30) NOT NULL,
	[DateOfBirth] [date] NULL,
	[GenderID] [int] NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[Image] [nvarchar](100) NULL,
	[RankID] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchID], [BranchName], [Address], [City], [Latitude], [Longitude]) VALUES (1, N'הרכב הירוק', N'רפפורט 3', N'כפר סבא', CAST(32.191960 AS Decimal(9, 6)), CAST(34.891832 AS Decimal(9, 6)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [Address], [City], [Latitude], [Longitude]) VALUES (2, N'שלך לכל מקום', N'כצנלסון 64', N'גבעתיים', CAST(32.075262 AS Decimal(9, 6)), CAST(34.809110 AS Decimal(9, 6)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [Address], [City], [Latitude], [Longitude]) VALUES (3, N'חוויה ירושלמית', N'יהושע בן נון 13', N'ירושלים', CAST(31.762208 AS Decimal(9, 6)), CAST(35.216881 AS Decimal(9, 6)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [Address], [City], [Latitude], [Longitude]) VALUES (4, N'אוטו בכינרת', N'יהודה הנשיא 7', N'טבריה', CAST(32.795649 AS Decimal(9, 6)), CAST(35.527875 AS Decimal(9, 6)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [Address], [City], [Latitude], [Longitude]) VALUES (5, N'תל אביב בכיף', N'הכרמל 20', N'תל אביב-יפו', CAST(32.066907 AS Decimal(9, 6)), CAST(34.766976 AS Decimal(9, 6)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [Address], [City], [Latitude], [Longitude]) VALUES (6, N'מלכת הנגב', N'דרך המשחררים 11', N'באר שבע', CAST(31.251280 AS Decimal(9, 6)), CAST(34.795087 AS Decimal(9, 6)))
SET IDENTITY_INSERT [dbo].[Branches] OFF
SET IDENTITY_INSERT [dbo].[Cars] ON 

INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (1, N'83571121', 1, 1, 1, 2, 432, 2008, 1, 200.0000, 350.0000, N'e8945e49-f2de-4e0e-864f-033ef14751d1.jpg', 2)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (3, N'73607491', 10, 25, 3, 2, 145, 2013, 0, 450.0000, 600.0000, N'6e79e473-0e64-4eb1-b0ee-ddc31fd835d1.jpg', 4)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (4, N'83629915', 12, 23, 3, 2, 730, 2018, 1, 950.0000, 1000.0000, N'96b5f5fc-5465-47fd-870e-eefd467a568a.jpg', 6)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (5, N'25578921', 5, 39, 2, 2, 1000, 2005, 1, 150.0000, 200.0000, N'aca9cba3-82a6-4bf0-a743-f3b2b3c18bb9.jpg', 6)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (6, N'45621386', 10, 25, 3, 1, 1587, 2016, 1, 400.0000, 450.0000, N'0390346f-c566-408c-8c90-4f22f1af4c22.jpg', 3)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (10, N'09923466', 1, 9, 1, 1, 231, 2019, 1, 312.0000, 321.0000, N'6c609079-dcad-4bad-8143-ee7d284d65e0.jpg', 5)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (11, N'12313670', 5, 39, 1, 1, 231, 2019, 1, 312.0000, 321.0000, N'92aac00a-3468-4411-b4b4-955dff76fcc7.jpg', 1)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (12, N'45231009', 11, 15, 4, 1, 70, 2019, 1, 225.0000, 2500.0000, N'cbe6152d-1714-4f30-8998-b2d02e289ed3.jpg', 3)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (13, N'7225117', 2, 6, 3, 1, 32675, 2008, 1, 80.0000, 100.0000, N'f0a0e050-5184-4464-8ca5-a096803dc573.jpg', 4)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (14, N'38135581', 1, 7, 1, 1, 42000, 2012, 1, 321.0000, 321.0000, N'dca2751e-1812-4968-ab9f-fc91a1fa1218.jpg', 1)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (15, N'12245670', 11, 17, 3, 2, 500, 2016, 1, 950.0000, 6001.0000, N'282f7bbc-1547-4b7e-8d09-33a17f9771b1.jpg', 3)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (16, N'24008795', 1, 9, 3, 2, 14000, 2014, 1, 400.0000, 480.0000, N'ebb2e0fe-8435-4719-acc6-94a02742c8c2.jpg', 4)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (17, N'7453573', 9, 29, 1, 1, 54, 2011, 1, 110.0000, 220.0000, N'acaf92d4-e15c-4089-8479-1989e72e9b96.jpg', 6)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (18, N'5435432', 9, 3, 3, 1, 4.5, 2019, 1, 450.0000, 500.5000, N'5e4e2209-26bd-47f2-9342-2f1ea1838810.jpg', 4)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (19, N'73839311', 2, 11, 4, 2, 230, 2001, 1, 3129.0000, 3200.0000, N'7e602f63-60db-42a4-b30d-854122bc2f32.jpg', 5)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (20, N'8372661', 6, 50, 1, 2, 19000, 2015, 1, 150.0000, 200.0000, N'20b37f4b-2328-4430-8edf-fba7f34611a9.jpg', 3)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (21, N'87634101', 10, 5, 4, 1, 570, 2019, 1, 3000.0000, 3500.0000, N'7baed0f9-9ca7-40f6-8153-33034af0be64.jpg', 5)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (22, N'76476575', 5, 39, 3, 1, 4500, 2011, 1, 290.0000, 390.0000, N'9fdebe67-398e-48cd-b0ba-f85a09ed887c.jpg', 1)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (23, N'72245138', 3, 45, 1, 2, 2900, 2016, 1, 250.0000, 330.0000, N'435e1878-0382-4560-9e97-c81dc4c2c1e3.jpg', 6)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (24, N'65464332', 6, 50, 1, 1, 25000, 2001, 1, 100.0000, 130.0000, N'ba446ed8-f252-4690-868a-4581d89621e2.jpg', 6)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (25, N'59352184', 6, 4, 2, 1, 3500, 2001, 1, 75.0000, 90.0000, N'd275b5e4-3a55-4079-8be2-2b1c1e080c44.jpg', 1)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (26, N'00934475', 1, 1, 1, 1, 199, 2019, 1, 900.0000, 1200.0000, N'95cf3448-9ebf-4663-9eb1-f35804155f20.jpg', 4)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (30, N'62138294', 7, 36, 1, 1, 4500, 2015, 1, 500.0000, 650.0000, N'49744b68-a61d-48db-a63a-f3caebbb8310.jpg', 2)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (107, N'82009123', 4, 40, 1, 1, 2400, 2015, 1, 490.0000, 570.0000, N'432e47f1-9097-4eac-b51b-caad00f672cc.jpg', 1)
INSERT [dbo].[Cars] ([CarID], [CarNumber], [ManufactorID], [ModelID], [DesignID], [GearID], [Kilometrage], [Year], [FunctionalForRent], [RentDayPrice], [LateDayRentPrice], [Picture], [BranchID]) VALUES (108, N'92470157', 8, 32, 1, 1, 10500, 2018, 1, 750.0000, 900.0000, N'e1ea5db6-2b21-4f33-b9f6-faf7b69a698f.jpg', 6)
SET IDENTITY_INSERT [dbo].[Cars] OFF
SET IDENTITY_INSERT [dbo].[Designs] ON 

INSERT [dbo].[Designs] ([DesignID], [CarDesign]) VALUES (1, N'משפחתית')
INSERT [dbo].[Designs] ([DesignID], [CarDesign]) VALUES (2, N'מיני')
INSERT [dbo].[Designs] ([DesignID], [CarDesign]) VALUES (3, N'מנהלים')
INSERT [dbo].[Designs] ([DesignID], [CarDesign]) VALUES (4, N'יוקרתית')
SET IDENTITY_INSERT [dbo].[Designs] OFF
SET IDENTITY_INSERT [dbo].[Gears] ON 

INSERT [dbo].[Gears] ([GearID], [GearType]) VALUES (1, N'ידני')
INSERT [dbo].[Gears] ([GearID], [GearType]) VALUES (2, N'אוטומטי')
SET IDENTITY_INSERT [dbo].[Gears] OFF
SET IDENTITY_INSERT [dbo].[Genders] ON 

INSERT [dbo].[Genders] ([GenderID], [Gender]) VALUES (1, N'זכר')
INSERT [dbo].[Genders] ([GenderID], [Gender]) VALUES (2, N'נקבה')
SET IDENTITY_INSERT [dbo].[Genders] OFF
SET IDENTITY_INSERT [dbo].[Manufactors] ON 

INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (1, N'Toyota')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (2, N'Skoda')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (3, N'Suzuki')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (4, N'Chevrolet')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (5, N'Renault')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (6, N'Fiat')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (7, N'Ford')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (8, N'Mazda')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (9, N'Opel')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (10, N'Mercedes')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (11, N'Honda')
INSERT [dbo].[Manufactors] ([ManufactorID], [Manufactor]) VALUES (12, N'Volkswagen')
SET IDENTITY_INSERT [dbo].[Manufactors] OFF
SET IDENTITY_INSERT [dbo].[Messages] ON 

INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (1, N'', N'', N'היי, אני שולח אנונימי ואני רוצה לבדוק את אופן שליחת ההודעה בצור קשר')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (2, N'אנונימוס', N'notTellingYou@gmail.com', N'הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר הנה הודעה ארוכה יותר ')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (3, N'בדש השטן', N'satan25@gmail.com', N'כאן הלקוח הנאמן שלכם בדש השטן, אני מאד מרוצה מהשירות והאתר. תודה')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (4, N'אילן רוזנפלד', N'ilani80@gmail.com', N'כאן אילן האדמין שולח הודעה למערכת')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (5, N'אילן רוזנפלד', N'ilani80@gmail.com', N'היי זוהי בדיקת להודעת מערכת')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (6, N'', N'', N'האתר שלך ממש מצוין! בברכה, אנונימי.')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (7, N'עודד פז', N'pazi@gmail.com', N'12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890')
INSERT [dbo].[Messages] ([MessageID], [WriterFullName], [WriterEmail], [MessageContent]) VALUES (8, N'אילן רוזנפלד', N'ilani80@gmail.com', N'בדיקה')
SET IDENTITY_INSERT [dbo].[Messages] OFF
SET IDENTITY_INSERT [dbo].[Models] ON 

INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (1, N'Corolla', 1)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (3, N'Adam', 9)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (4, N'500', 6)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (5, N'A-Class', 10)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (6, N'Octavia', 2)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (7, N'Camry', 1)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (8, N'Harrier', 1)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (9, N'Mirai', 1)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (11, N'Rapid', 2)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (12, N'Roomster', 2)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (13, N'Fabia', 2)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (14, N'Yeti', 2)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (15, N'Insight', 11)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (16, N'Passport', 11)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (17, N'Jazz', 11)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (18, N'Accord', 11)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (19, N'Ameo', 12)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (20, N'Santana', 12)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (21, N'Sharan', 12)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (22, N'Touran', 12)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (23, N'Fox', 12)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (24, N'Maybach', 10)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (25, N'Cabriolet', 10)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (26, N'Coupe', 10)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (27, N'Agila', 9)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (28, N'Karl', 9)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (29, N'Corsa', 9)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (30, N'Astra', 9)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (31, N'MX-5	', 8)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (32, N'Mazda6', 8)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (33, N'Focus ST', 7)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (34, N'Fiesta', 7)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (35, N'Ka', 7)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (36, N'Ecosport', 7)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (37, N'Triber', 5)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (38, N'Clio', 5)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (39, N'Latitude', 5)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (40, N'Spark', 4)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (41, N'Sonic', 4)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (42, N'Impala', 4)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (43, N'Malibu', 4)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (44, N'Traverse', 4)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (45, N'Ignis', 3)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (49, N'Linea', 6)
INSERT [dbo].[Models] ([ModelID], [Model], [ManufactorID]) VALUES (50, N'Freemont', 6)
SET IDENTITY_INSERT [dbo].[Models] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (1, CAST(N'2019-12-21' AS Date), CAST(N'2019-12-24' AS Date), CAST(N'2020-01-04' AS Date), 3, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (2, CAST(N'2019-12-21' AS Date), CAST(N'2019-12-29' AS Date), CAST(N'2020-01-01' AS Date), 5, 19)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (3, CAST(N'2019-12-21' AS Date), CAST(N'2019-12-22' AS Date), NULL, 11, 22)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (4, CAST(N'2019-12-29' AS Date), CAST(N'2019-12-31' AS Date), NULL, 18, 16)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (5, CAST(N'2019-12-28' AS Date), CAST(N'2019-12-31' AS Date), CAST(N'2020-01-01' AS Date), 10, 8)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (6, CAST(N'2019-12-24' AS Date), CAST(N'2019-12-28' AS Date), CAST(N'2020-01-01' AS Date), 13, 14)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (7, CAST(N'2019-12-20' AS Date), CAST(N'2020-01-02' AS Date), CAST(N'2020-01-10' AS Date), 22, 18)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (9, CAST(N'2019-12-30' AS Date), CAST(N'2020-01-05' AS Date), CAST(N'2020-01-05' AS Date), 11, 19)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (10, CAST(N'2019-12-26' AS Date), CAST(N'2019-12-30' AS Date), CAST(N'2019-12-31' AS Date), 14, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (11, CAST(N'2019-12-26' AS Date), CAST(N'2019-12-30' AS Date), CAST(N'2019-12-28' AS Date), 17, 4)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (12, CAST(N'2019-12-20' AS Date), CAST(N'2020-01-06' AS Date), CAST(N'2019-12-31' AS Date), 12, 9)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (13, CAST(N'2019-12-30' AS Date), CAST(N'2020-01-01' AS Date), CAST(N'2019-12-31' AS Date), 30, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (14, CAST(N'2020-01-12' AS Date), CAST(N'2020-01-18' AS Date), NULL, 17, 17)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (15, CAST(N'2020-02-01' AS Date), CAST(N'2020-02-08' AS Date), NULL, 13, 19)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (27, CAST(N'2019-12-30' AS Date), CAST(N'2019-12-31' AS Date), CAST(N'2020-01-04' AS Date), 6, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (33, CAST(N'2020-02-22' AS Date), CAST(N'2020-02-28' AS Date), NULL, 18, 11)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (34, CAST(N'2020-09-23' AS Date), CAST(N'2020-10-26' AS Date), NULL, 18, 11)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (38, CAST(N'2020-01-15' AS Date), CAST(N'2020-01-18' AS Date), NULL, 12, 27)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (40, CAST(N'2020-10-20' AS Date), CAST(N'2020-12-11' AS Date), NULL, 12, 8)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (42, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-01' AS Date), CAST(N'2020-01-06' AS Date), 16, 5)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (43, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-02' AS Date), CAST(N'2020-01-01' AS Date), 25, 12)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (45, CAST(N'2019-12-29' AS Date), CAST(N'2019-12-30' AS Date), CAST(N'2020-01-09' AS Date), 26, 13)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (46, CAST(N'2019-12-30' AS Date), CAST(N'2019-12-31' AS Date), NULL, 26, 13)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (48, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-10' AS Date), NULL, 14, 4)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (51, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-11' AS Date), NULL, 15, 4)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (52, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-05' AS Date), CAST(N'2020-01-01' AS Date), 18, 21)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (53, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-05' AS Date), NULL, 1, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (71, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-02' AS Date), CAST(N'2020-01-01' AS Date), 24, 10)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (73, CAST(N'2020-08-29' AS Date), CAST(N'2020-09-04' AS Date), NULL, 12, 9)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (75, CAST(N'2019-12-31' AS Date), CAST(N'2020-01-03' AS Date), CAST(N'2020-01-01' AS Date), 20, 22)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (76, CAST(N'2020-01-04' AS Date), CAST(N'2020-01-10' AS Date), NULL, 22, 6)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (77, CAST(N'2020-01-02' AS Date), CAST(N'2020-01-07' AS Date), NULL, 17, 18)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (78, CAST(N'2020-01-06' AS Date), CAST(N'2020-01-14' AS Date), NULL, 23, 12)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (79, CAST(N'2020-01-01' AS Date), CAST(N'2020-01-05' AS Date), NULL, 4, 8)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (81, CAST(N'2020-01-10' AS Date), CAST(N'2020-01-15' AS Date), NULL, 12, 16)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (82, CAST(N'2020-01-05' AS Date), CAST(N'2020-01-08' AS Date), NULL, 1, 18)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (84, CAST(N'2020-01-05' AS Date), CAST(N'2020-01-09' AS Date), NULL, 6, 8)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (85, CAST(N'2020-01-05' AS Date), CAST(N'2020-01-09' AS Date), NULL, 12, 10)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (86, CAST(N'2020-01-06' AS Date), CAST(N'2020-01-10' AS Date), NULL, 24, 16)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (87, CAST(N'2020-01-10' AS Date), CAST(N'2020-01-14' AS Date), NULL, 18, 14)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (90, CAST(N'2020-01-06' AS Date), CAST(N'2020-01-08' AS Date), NULL, 16, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (95, CAST(N'2020-01-07' AS Date), CAST(N'2020-01-13' AS Date), NULL, 21, 4)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (96, CAST(N'2020-01-06' AS Date), CAST(N'2020-01-11' AS Date), NULL, 30, 17)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (97, CAST(N'2020-01-06' AS Date), CAST(N'2020-01-10' AS Date), NULL, 25, 22)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (98, CAST(N'2020-01-08' AS Date), CAST(N'2020-01-20' AS Date), NULL, 13, 23)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (102, CAST(N'2020-01-07' AS Date), CAST(N'2020-01-08' AS Date), NULL, 26, 1)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (103, CAST(N'2020-01-06' AS Date), CAST(N'2020-01-10' AS Date), NULL, 20, 4)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (104, CAST(N'2020-01-08' AS Date), CAST(N'2020-01-12' AS Date), NULL, 19, 12)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (105, CAST(N'2020-01-10' AS Date), CAST(N'2020-01-16' AS Date), NULL, 5, 11)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (160, CAST(N'2020-02-09' AS Date), CAST(N'2020-02-13' AS Date), NULL, 21, 13)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (161, CAST(N'2020-01-16' AS Date), CAST(N'2020-01-19' AS Date), NULL, 5, 5)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (162, CAST(N'2020-01-15' AS Date), CAST(N'2020-01-21' AS Date), NULL, 19, 21)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (163, CAST(N'2020-01-11' AS Date), CAST(N'2020-01-16' AS Date), NULL, 26, 17)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (164, CAST(N'2020-01-22' AS Date), CAST(N'2020-01-25' AS Date), NULL, 11, 6)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (165, CAST(N'2020-02-11' AS Date), CAST(N'2020-02-14' AS Date), NULL, 30, 10)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (167, CAST(N'2020-01-30' AS Date), CAST(N'2020-02-02' AS Date), NULL, 108, 9)
INSERT [dbo].[Orders] ([OrderID], [OrderStartDate], [OrderEndDate], [OrderActualEndDate], [OrderedCarID], [OrderingUserID]) VALUES (168, CAST(N'2020-01-11' AS Date), CAST(N'2020-01-18' AS Date), NULL, 107, 5)
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Ranks] ON 

INSERT [dbo].[Ranks] ([RankID], [Rank]) VALUES (1, N'לקוח')
INSERT [dbo].[Ranks] ([RankID], [Rank]) VALUES (2, N'עובד')
INSERT [dbo].[Ranks] ([RankID], [Rank]) VALUES (3, N'מנהל')
SET IDENTITY_INSERT [dbo].[Ranks] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (1, N'אילן', N'רוזנפלד', N'056213481', N'Ilan777', CAST(N'1980-01-08' AS Date), 1, N'ilani80@gmail.com', N'4ea69f837793663c2bb543568e75f929', N'f60be74f-b7e3-4529-b53f-db40d1560730.jpg', 3)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (4, N'קובי', N'פרג''', N'938475617', N'KobiHagever', CAST(N'1980-08-29' AS Date), 1, N'kobi_f@gmail.com', N'd3130855d784138ef121392ff5e72851', N'7dd4401e-0d4f-42e8-98c0-c0fef5d0cc97.jpg', 3)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (5, N'עודד', N'פז', N'289731475', N'odedi', CAST(N'1980-07-26' AS Date), 1, N'pazi@gmail.com', N'd7f231e3b28df0bfeea364eeee5c0edf', N'3a67c335-ec15-4537-ae9b-7cd29002f185.jpg', 3)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (6, N'נתן', N'קופרמן', N'456763452', N'natan_kuperman', CAST(N'1980-12-03' AS Date), 1, N'natanK@gmail.com', N'd0dfdc9bf5da413c31ea087c5c299867', N'c4c38f71-5793-4c04-a561-f48e4c552c24.jpg', 2)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (8, N'אלונה', N'טל', N'134763183', N'alona999', CAST(N'1983-10-19' AS Date), 2, N'alona@gmail.com', N'030fddce742683537afcac81fdf2d1d1', N'b630ed68-a57e-4f34-984c-c95d6a796c2d.jpg', 2)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (9, N'ימית', N'סול', N'739825827', N'Yamit2000', CAST(N'1981-12-27' AS Date), 2, N'yamitiii@gmail.com', N'1231d487d9ac27b6579556329bf2a71b', N'1b740cfa-7184-4849-aa8f-c7d83eedb823.jpg', 2)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (10, N'דנה', N'פרידר', N'387292632', N'Frider101', CAST(N'1987-02-19' AS Date), 2, N'fridera@gmail.com', N'b22fe909d94c45dea72b78132e78d564', N'892b36c6-c027-47d4-afba-c8448cc1d6d1.jpg', 2)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (11, N'גרי', N'מנדלבאום', N'920165890', N'garyhasholet', CAST(N'1969-06-26' AS Date), 1, N'ninini@gmail.com', N'b7fd36afbb0f6357dd3bae8fe50b648b', N'af82bc0c-d5a1-46f0-9dd0-805401eec1b2.jpg', 2)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (12, N'רוני', N'מנדלבאום', N'024642732', N'Roni90', CAST(N'1990-05-17' AS Date), 2, N'roni_mendel@gmail.com', N'0b4bf43fe324bda2bcc0f2ba4efaea0c', N'6dac8343-b282-41ac-abca-fd9ddcde3ac2.jpg', 2)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (13, N'שמעון', N'צמחוני', N'876529801', N'ShimonZim', CAST(N'1964-03-05' AS Date), 1, N'zimhoni@gmail.com', N'a06850b3ee66f4c34cf2c877affbf1eb', N'6307da62-a73e-4a65-aedb-1cf6528526fe.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (14, N'ברכה', N'קישנברג', N'847279321', N'ms_braha', CAST(N'1935-01-12' AS Date), 2, N'braha@gmail.com', N'9188e827334b45d272682bb7503a8cf6', N'2f9a75cc-b8d3-41d9-85f5-25c30777c787.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (16, N'מר', N'לטין', N'847210932', N'mr.latin', CAST(N'1964-09-14' AS Date), 1, N'mr_latin@gmail.com', N'b74df323e3939b563635a2cba7a7afba', N'2cb8818b-367e-48e2-838c-88c716707327.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (17, N'בדש', N'השטן', N'738273112', N'satan25', CAST(N'1971-11-07' AS Date), 1, N'satan25@gmail.com', N'87df2cd1570fd297de238aeee667fe0a', N'9ccdc638-e981-4d70-8d95-37b65dd123af.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (18, N'אלברט', N'השיפוצניק', N'982416673', N'albert99', CAST(N'1957-03-06' AS Date), 1, N'albert57@gmail.com', N'0a602035925fc9ec0bb6f26bb67226b8', N'27c76955-7dab-44d3-b8ac-ebdc0aee4641.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (19, N'פולי', N'מנדלבאום', N'376908125', N'polipol', CAST(N'2002-01-06' AS Date), 1, N'polim@gmail.com', N'd7e7fc729f42fe739abc73afbfeaf9f8', N'c9af8bb0-aa33-4576-97e8-f6db1a60682d.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (21, N'שפרה', N'מנדלבאום', N'635731241', N'shifra200', CAST(N'1971-12-04' AS Date), 2, N'shifrush@gmail.com', N'b95677216e439d96ec4fba1240a3c1f8', NULL, 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (22, N'נג''י', N'קומרדין ג''קסון', N'747123245', N'najimehaguda', CAST(N'1942-01-31' AS Date), 1, N'najile@gmail.com', N'1a29939f5be7994fdb3f1a3c797683cc', N'f50b5bc9-222a-4f8e-91a4-aa9930324a70.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (23, N'פרדי', N'נייס טו מיט', N'454621731', N'fredieNTM', CAST(N'1967-08-27' AS Date), 1, N'amargan@gmail.com', N'c5cac7cc5ec56046e1a61b9fc41b3976', N'5df94552-0a42-4db0-a4d5-fffca94ebcca.jpg', 1)
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [SocialNumber], [UserName], [DateOfBirth], [GenderID], [Email], [Password], [Image], [RankID]) VALUES (27, N'מרסל', N'פוארו', N'855443211', N'marsel_p', CAST(N'1971-08-30' AS Date), 1, N'marsel@gmail.com', N'b43041ef35c34faa394d5ad76396ab0d', N'6b7fd35d-29eb-4f4c-a6e5-fd1f8cbfa35f.jpg', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Branches]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Designs1] FOREIGN KEY([DesignID])
REFERENCES [dbo].[Designs] ([DesignID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Designs1]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Gears] FOREIGN KEY([GearID])
REFERENCES [dbo].[Gears] ([GearID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Gears]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Manufactors] FOREIGN KEY([ManufactorID])
REFERENCES [dbo].[Manufactors] ([ManufactorID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Manufactors]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Models] FOREIGN KEY([ModelID])
REFERENCES [dbo].[Models] ([ModelID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Models]
GO
ALTER TABLE [dbo].[Models]  WITH CHECK ADD  CONSTRAINT [FK_Models_Manufactors] FOREIGN KEY([ManufactorID])
REFERENCES [dbo].[Manufactors] ([ManufactorID])
GO
ALTER TABLE [dbo].[Models] CHECK CONSTRAINT [FK_Models_Manufactors]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Orders] FOREIGN KEY([OrderedCarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Orders]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([OrderingUserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Genders] FOREIGN KEY([GenderID])
REFERENCES [dbo].[Genders] ([GenderID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Genders]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Ranks] FOREIGN KEY([RankID])
REFERENCES [dbo].[Ranks] ([RankID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Ranks]
GO
USE [master]
GO
ALTER DATABASE [CarRentService] SET  READ_WRITE 
GO
