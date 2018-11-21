-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2018 at 01:23 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kingpes`
--

-- --------------------------------------------------------

--
-- Table structure for table `amount`
--

CREATE TABLE `amount` (
  `amountId` int(11) NOT NULL,
  `amountBuy` int(3) NOT NULL,
  `amountSell` int(3) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `amount`
--

INSERT INTO `amount` (`amountId`, `amountBuy`, `amountSell`) VALUES
(7, 100, 2),
(8, 210, 209),
(9, 5, 4),
(10, 10, 0),
(14, 30, 1),
(21, 10, 0),
(22, 2, 0),
(23, 0, 0),
(24, 0, 0),
(27, 0, 0),
(28, 0, 0),
(29, 21, 0),
(30, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `bannerId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(50) NOT NULL,
  `content` varchar(250) DEFAULT NULL,
  `productSn` varchar(15) DEFAULT NULL,
  `priority` int(3) NOT NULL DEFAULT '0',
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NULL DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`bannerId`, `title`, `image`, `content`, `productSn`, `priority`, `start`, `end`, `active`) VALUES
(1, 'Test Banner Kingpes', '1531296864806truck-1.jpg', 'Dich vu qua tang sing that Danh cho be yeu', '', 0, '2018-06-18 07:40:48', '2018-07-02 17:00:00', 1),
(2, 'Banner1', '1531296878771xebon-1.jpg', 'Thoả sức đam mê, khơi nguồn sáng tạo.', '', 0, '2018-06-18 07:43:16', NULL, 0),
(3, 'Banner2', '1531296846057airbus-1.jpg', 'Thoả sức đam mê, khơi nguồn sáng tạo.', '', 1, '2018-06-18 07:48:37', NULL, 1),
(4, 'Demo', '1531295790455bupbe-1.jpg', 'Content Demo', 'ABCDEF', 1, '2018-05-31 17:00:00', '2018-07-31 17:00:00', 0),
(5, 'Demo1', '1531218530503xebon-1.jpg', 'Demo', 'asdfg', 1, '2018-07-10 17:00:00', '2018-07-30 17:00:00', 0),
(6, '', '1531284672166sieunhan-1.jpg', '', '', 0, '2018-07-11 04:51:12', NULL, 0),
(7, '', '1532784372286banner_home.jpg', '', '', 10, '2018-06-30 17:00:00', '2018-08-31 17:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blogId` int(7) NOT NULL,
  `blogTitle` varchar(255) NOT NULL,
  `blogDescription` varchar(255) NOT NULL,
  `blogContent` text NOT NULL,
  `blogImage` varchar(50) NOT NULL,
  `source` varchar(255) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`blogId`, `blogTitle`, `blogDescription`, `blogContent`, `blogImage`, `source`, `active`, `time`) VALUES
(1, 'Demo', 'Test', '<p><a href=\"https://tinhte.vn/tags/bagi/\" title=\"\">Bagi</a>&nbsp;vừa ra mắt d&ograve;ng sản phẩm&nbsp;<a href=\"https://tinhte.vn/tags/cap-lightning/\" title=\"\">c&aacute;p lightning</a>&nbsp;thứ 2 sau phi&ecirc;n bản sử dụng chất liệu denim c&oacute; MFi. Với chứng nhận n&agrave;y, những phụ kiện b&ecirc;n thứ 3 sẽ lu&ocirc;n được đảm bảo t&iacute;nh tương th&iacute;ch 100% cho iPhone, iPad hay iPod. Nhờ chất liệu vỏ cao su n&ecirc;n mức gi&aacute; của sợi c&aacute;p lightning n&agrave;y l&agrave; 210.000 đồng, thấp hơn so với mức gi&aacute; 269.000 đồng của phi&ecirc;n bản sợi denim.<br />\n<br />\n<img class=\"responsive-img\" alt=\"Đang tải cap_bagi_lightning_mfi_CB-MFIn_tinhte_6.jpg…\" src=\"https://photo2.tinhte.vn/data/attachment-files/2018/07/4370325_cap_bagi_lightning_mfi_CB-MFIn_tinhte_6.jpg\" title=\"cap_bagi_lightning_mfi_CB-MFIn_tinhte_6.jpg\" /><br />\n<br />\nC&aacute;p của Bagi bằng vỏ cao su m&agrave;u trắng c&oacute; t&ecirc;n m&atilde; l&agrave; CB-MFIn. Do được chứng nhận MFi n&ecirc;n bạn ho&agrave;n to&agrave;n c&oacute; thể kiểm tra tr&ecirc;n website của Apple. Th&ocirc;ng thường c&aacute;p kh&ocirc;ng được chứng nhận MFi c&oacute; thể gặp một số vấn đề như thiết bị kh&ocirc;ng nhận sạc khi l&ecirc;n OS mới, hoặc gặp vấn đề về truyền dữ liệu, kh&ocirc;ng ph&aacute;t huy hết c&ocirc;ng suất sạc cho iPad vốn cần nguồn sạc cao hơn so với iPhone.<br />\n<br />\n<a href=\"https://tinhte.vn/tags/bagi-cb-mfin/\" title=\"\">Bagi CB-MFIn</a>&nbsp;được thiết kế với m&agrave;u trắng đặc trưng, v&agrave; kiểu d&aacute;ng giống đến 99% so với c&aacute;p đi k&egrave;m theo iPhone. C&aacute;c vỏ bọc cao su bảo vệ th&ecirc;m ở hai đầu tiếp gi&aacute;p với cổng giao tiếp cũng được l&agrave;m tương tự như c&aacute;p zin. V&igrave; thế x&eacute;t về cảm quan b&ecirc;n ngo&agrave;i khi ước lượng về độ bền của c&aacute;p th&igrave; c&oacute; thể vỏ cao su n&agrave;y sẽ kh&ocirc;ng bằng phi&ecirc;n bản sợi demin hay nylon. Ngo&agrave;i ra m&agrave;u trắng dễ bị ố v&agrave;ng hay b&aacute;m bẩn sau một thời gian d&agrave;i.<br />\n<br />\n<img class=\"responsive-img\" alt=\"Đang tải cap_bagi_lightning_mfi_CB-MFIn_tinhte_12.jpg…\" src=\"https://photo2.tinhte.vn/data/attachment-files/2018/07/4370331_cap_bagi_lightning_mfi_CB-MFIn_tinhte_12.jpg\" title=\"cap_bagi_lightning_mfi_CB-MFIn_tinhte_12.jpg\" /><br />\n<br />\nM&igrave;nh thử sạc iPad Pro 12.9 bằng sợi c&aacute;p với bộ sạc Anker PowerPort II 24W th&igrave; nguồn v&agrave;o đạt 5V - 2.2A, gần bằng mức 12W cho 1 cổng tr&ecirc;n sạc Anker. Khi kết nối v&agrave;o m&aacute;y t&iacute;nh để truyền dữ liệu th&igrave; m&aacute;y nhận rất nhanh, chỉ trong 1-2 gi&acirc;y khi lần đầu kết nối.<br />\n<br />\nC&aacute;p MFi rất kh&oacute; bị lỗi kh&ocirc;ng sạc hay truyền dữ liệu, trừ khi c&oacute; hư hỏng khi bị t&aacute;c động b&ecirc;n ngo&agrave;i. V&igrave; vậy Bagi bảo h&agrave;nh lỗi 1 đổi 1 trong v&ograve;ng 12 th&aacute;ng cho sản phẩm n&agrave;y n&ecirc;n bạn cứ y&ecirc;n t&acirc;m sử dụng trong điều kiện b&igrave;nh thường.<br />\n<br />\nNh&igrave;n chung, việc trang bị một sợi c&aacute;p hỗ trợ MFi gi&uacute;p người d&ugrave;ng iPhone hay iPad an t&acirc;m hơn trong việc sạc m&aacute;y h&agrave;ng ng&agrave;y. C&aacute;p lu&ocirc;n hoạt động ổn định v&agrave; kh&ocirc;ng bị n&oacute;ng cho d&ugrave; bạn c&oacute; vừa sạc hay vừa x&agrave;i đi chăng nữa. Hiện c&oacute; nhiều sợi c&aacute;p c&oacute; kết cấu xịn v&agrave; bền hơn, nhưng chắn chắn mức gi&aacute; sẽ khiến bạn phải c&acirc;n nhắc so với sản phẩm n&agrave;y.</p>\n', '1532872701153bupbe-1.jpg', 'Tuoi tre 1', 1, '2018-07-28 02:34:34'),
(2, 'Demo1', 'Huynh Ngoc Chau', '<p>Với dung lượng&nbsp;l&ecirc;n tới 4000 mAh cho chiếc&nbsp;<a href=\"https://tinhte.vn/tags/galaxy/\" title=\"\">Galaxy</a>&nbsp;<a href=\"https://tinhte.vn/tags/note-9-2/\" title=\"\">Note 9</a>&nbsp;v&agrave; bộ nhớ được n&acirc;ng cấp,&nbsp;<a href=\"https://tinhte.vn/tags/samsung/\" title=\"\">Samsung</a>&nbsp;đang c&oacute; vẻ rất tự tin về chiếc flagship sắp tới n&agrave;y của họ, khi h&atilde;ng n&agrave;y vừa mới tung ra 3 teaser về pin, bộ nhớ cũng như hiệu năng của chiếc Note mới để quảng c&aacute;o chuẩn bị cho sự kiện&nbsp;<a href=\"https://tinhte.vn/tags/unpacked-2013/\" title=\"\">Unpacked</a>&nbsp;diễn ra v&agrave;o ng&agrave;y 9 th&aacute;ng 8 tới đ&acirc;y. Theo những th&ocirc;ng tin hiện tại, Note 9 sẽ c&oacute; dung lượng pin lớn hơn 20% so với Note 8, bộ nhớ trong tối đa l&ecirc;n tới 512 GB v&agrave; cải tiến rất nhiều về hiệu năng v&agrave; c&aacute;c thay đổi mới cho c&acirc;y b&uacute;t S-Pen. Mời anh em xem 3 video quảng c&aacute;o mới n&agrave;y của họ</p>\n', '1532880166208xebon-4.jpg', 'Kingpes', 1, '2018-07-29 16:02:46');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(200) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `active`) VALUES
(1, 'V-KINGPES', 1),
(2, 'Búp bê - doi moi', 1),
(4, 'Xep hinh', 1),
(5, 'Lau dai', 1),
(6, 'Xe lua', 1),
(7, 'LOGO', 1),
(8, 'Xe Dien', 1),
(9, 'Xe con trinh', 1),
(10, 'Xe dieu khien', 1);

-- --------------------------------------------------------

--
-- Table structure for table `certify`
--

CREATE TABLE `certify` (
  `certifyId` int(11) NOT NULL,
  `session` varchar(15) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `commentQuestion` text NOT NULL,
  `commentAnswer` text NOT NULL,
  `userId` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `commentId`, `commentQuestion`, `commentAnswer`, `userId`, `status`, `date`) VALUES
(1, 7, 'Bao nhiêu tiền vậy bạn?', 'Đây là hàng tặng, không có bán bạn ơi.', 1, 1, '2018-06-13 06:29:29'),
(2, 7, 'Có bảo hành không ad?', 'Tất cả đều có bảo hành bạn ơi.', 2, 1, '2018-06-13 06:29:29'),
(3, 7, 'Giao hàng trong bao lâu vậy ad?', 'Trong vòng 2 ngày làm việc bạn ơi.', 3, 1, '2018-06-13 06:29:29'),
(4, 8, 'Có cho đổi trả không ad?', 'Tất cả đều được 1 đổi 1 ban nhé.', 3, 1, '2018-06-13 06:29:29'),
(5, 7, 'insert cau hoi', 'Try loi Cho tua hoi cua ban nhe', 3, 1, '2018-06-13 06:29:29'),
(7, 10, 'Trả lời cho Xuân Lan', 'Tra loi cau hoi cho xuan lan', 2, 1, '2018-06-13 06:29:29'),
(8, 7, 'Trả lời cho Xuân Lan', 'OK the', 3, 1, '2018-06-13 06:29:29'),
(9, 14, 'Gia bao nhieu ad oi', 'ok', 1, 1, '2018-06-14 07:17:49'),
(10, 10, 'Quoc bao dat can hot the', '', 2, 0, '2018-06-14 11:45:02'),
(12, 10, 'Them can hoi nun', 'Ok ne', 14, 1, '2018-07-08 13:09:46'),
(13, 10, 'thu can hoi moi', 'duoc roi', 14, 1, '2018-07-08 15:16:12');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventId` int(2) NOT NULL,
  `eventTitle` varchar(255) NOT NULL,
  `eventImage` varchar(50) NOT NULL,
  `eventContent` text NOT NULL,
  `start` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventId`, `eventTitle`, `eventImage`, `eventContent`, `start`, `end`, `active`) VALUES
(1, 'San qua cuna beaaa', '1533980205796airbus-1.jpg', '<p>DEMI DEMI MO</p>\n', '2018-08-10 17:00:00', '2018-08-24 17:00:00', 1),
(2, 'DEmo demi', '1533980426784rage-1.jpg', '<p>hahahahah</p>\n', '2018-08-16 17:00:00', '2018-08-25 17:00:00', 1),
(3, 'Su kien moi', '1533988706280truck-4.jpg', '', '2018-08-11 17:00:00', '2018-08-30 17:00:00', 1),
(4, 'Demo', '15339935652471532767686358airbus-1.jpg', '<p>KOOO</p>\n', '2018-08-27 17:00:00', '2018-08-30 17:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `flashsale`
--

CREATE TABLE `flashsale` (
  `flashsaleId` int(11) NOT NULL,
  `flashsaleName` varchar(20) NOT NULL,
  `flashsaleDiscount` int(7) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flashsale`
--

INSERT INTO `flashsale` (`flashsaleId`, `flashsaleName`, `flashsaleDiscount`, `start`, `end`) VALUES
(1, 'Supper Sale', 50, '2018-06-15 17:00:00', '2018-06-30 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `gamepoint`
--

CREATE TABLE `gamepoint` (
  `gameId` int(11) NOT NULL,
  `points` int(7) NOT NULL DEFAULT '0',
  `updates` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gamepoint`
--

INSERT INTO `gamepoint` (`gameId`, `points`, `updates`) VALUES
(5, 3, '2018-08-01 11:06:02'),
(7, 10, '2018-08-11 11:06:21'),
(8, 13, '2018-08-11 11:06:37'),
(9, 1, '2018-01-01 11:19:12');

-- --------------------------------------------------------

--
-- Table structure for table `gift`
--

CREATE TABLE `gift` (
  `giftId` int(11) NOT NULL,
  `giftName` varchar(20) NOT NULL,
  `giftValue` int(7) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gift`
--

INSERT INTO `gift` (`giftId`, `giftName`, `giftValue`, `start`, `end`) VALUES
(1, 'Q-KINGPES', 10, '2018-06-23 04:09:43', NULL),
(2, 'K-KP12', 1, '2018-07-26 17:00:00', '2018-07-12 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`userId`, `productId`) VALUES
(2, 7),
(2, 14),
(5, 7),
(5, 8),
(5, 9),
(5, 14),
(7, 14),
(8, 7),
(13, 8),
(14, 10),
(13, 7),
(13, 14),
(14, 7),
(14, 8),
(14, 14),
(14, 23),
(14, 21),
(14, 24),
(14, 27),
(15, 8),
(15, 7),
(14, 9),
(18, 7);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `image1` varchar(50) DEFAULT '""',
  `image2` varchar(50) DEFAULT '""',
  `image3` varchar(50) DEFAULT '""',
  `image4` varchar(50) DEFAULT '""',
  `image5` varchar(50) DEFAULT '""',
  `imageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`image1`, `image2`, `image3`, `image4`, `image5`, `imageId`) VALUES
('1532767686358airbus-1.jpg', '1530948813911airbus-2.jpg', '1530948823085airbus-3.jpg', '1530948833300bupbe-1.jpg', '1530948859881rage-3.jpg', 7),
('1530948948012sieunhan-1.jpg', '1530948958480truck-2.jpg', '1530948976586truck-4.jpg', '1530948985504xebon-1.jpg', '1530948995169xebon-2.jpg', 8),
('1530949103620xebon-4.jpg', '1530949111496xebon-3.jpg', '1530949120467truck-3.jpg', '1530949132078truck-2.jpg', '1530949139332xebon-1.jpg', 9),
('1530949207333truck-2.jpg', '1530949213976xebon-3.jpg', '1530949225341airbus-3.jpg', '1530949234395airbus-1.jpg', '1530949244570airbus-3.jpg', 10),
('1530949262784truck-2.jpg', '1530949270344xebon-1.jpg', '1530949279062xebon-2.jpg', '1530949289996sieunhan-1.jpg', '1530949298554rage-2.jpg', 14),
('1530949386185sieunhan-1.jpg', 'undefined', 'undefined', 'undefined', 'undefined', 23),
('1530949403167rage-2.jpg', 'undefined', 'undefined', 'undefined', 'undefined', 24),
('1530949416871bupbe-1.jpg', 'undefined', 'undefined', 'undefined', 'undefined', 27),
('1530949432458xebon-4.jpg', 'undefined', 'undefined', 'undefined', 'undefined', 28),
('1530949448776airbus-1.jpg', '1531209398272xebon-4.jpg', 'undefined', 'undefined', 'undefined', 29),
('1530950791339truck-2.jpg', '\"\"', '\"\"', '\"\"', '\"\"', 21),
('1530950810252xebon-2.jpg', '\"\"', '\"\"', '\"\"', '\"\"', 22),
('1532845410248airbus-1.jpg', '1532845410251bupbe-1.jpg', '1532845410255truck-2.jpg', '1532845410258xebon-1.jpg', '1532845410263xebon-2.jpg', 30);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `likesId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`likesId`, `userId`) VALUES
(7, 2),
(8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `loginId` int(11) NOT NULL,
  `platform` int(1) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`loginId`, `platform`, `time`) VALUES
(5, 0, '2018-07-07 02:28:45'),
(4, 0, '2018-07-07 02:55:25');

-- --------------------------------------------------------

--
-- Table structure for table `open`
--

CREATE TABLE `open` (
  `openId` varchar(20) NOT NULL,
  `platform` int(1) NOT NULL DEFAULT '0',
  `mobile` int(1) DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `open`
--

INSERT INTO `open` (`openId`, `platform`, `mobile`, `time`) VALUES
('1', 0, 0, '2018-07-06 08:29:06'),
('3v9G7', 0, 1, '2018-07-14 03:29:19'),
('8LvYP', 0, 1, '2018-07-12 12:59:54'),
('BWoT0', 0, 0, '2018-07-20 12:51:40'),
('cnJLJ', 0, 1, '2018-07-11 14:19:34'),
('fL3KE', 0, 0, '2018-07-13 03:39:36'),
('fOrIV', 0, 0, '2018-08-12 11:22:44'),
('KoxRZ', 0, 0, '2018-07-13 04:30:23'),
('kW7uW', 0, 0, '2018-07-13 03:45:55'),
('oqKZV', 0, 1, '2018-07-10 03:23:27'),
('RMZ48', 0, 1, '2018-07-10 06:17:52'),
('sjh03', 0, 0, '2018-07-13 03:40:15'),
('VXlUx', 0, 1, '2018-07-12 13:08:18');

-- --------------------------------------------------------

--
-- Table structure for table `point`
--

CREATE TABLE `point` (
  `pointId` int(11) NOT NULL,
  `pointName` varchar(255) NOT NULL,
  `pointValue` int(3) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `point`
--

INSERT INTO `point` (`pointId`, `pointName`, `pointValue`, `start`, `end`) VALUES
(1, 'default', 5, '2018-06-15 17:00:00', '2018-07-30 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `price`
--

CREATE TABLE `price` (
  `priceId` int(11) NOT NULL,
  `buy` int(6) NOT NULL,
  `sell` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `price`
--

INSERT INTO `price` (`priceId`, `buy`, `sell`) VALUES
(7, 45000, 75000),
(8, 1450000, 1750000),
(9, 115000, 155000),
(10, 105000, 215000),
(14, 245000, 375000),
(21, 1000000, 123),
(22, 0, 0),
(23, 0, 0),
(24, 0, 0),
(27, 0, 0),
(28, 0, 0),
(29, 123, 123123),
(30, 123000, 150000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `promotionId` int(11) DEFAULT NULL,
  `flashsaleId` int(11) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `shipId` int(11) NOT NULL,
  `pointId` int(11) DEFAULT NULL,
  `voucherId` int(11) DEFAULT NULL,
  `productName` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `productSn` varchar(15) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `promotionId`, `flashsaleId`, `categoryId`, `shipId`, `pointId`, `voucherId`, `productName`, `description`, `productSn`, `time`, `active`) VALUES
(7, NULL, 1, 1, 1, NULL, NULL, 'Xe chạy đà cứu hỏa v2', '<p><strong><a href=\"\"><img class=\"responsive-img\" alt=\"\" class=\"responsive-img\" src=\"https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg\" /></a></strong></p>\n\n<p>&nbsp;</p>\n\n<p><strong>Xe day chay da</strong></p>\n\n<p>Duoc thiet ke theo cong nghe Duc. Su dung pin sac. Khong gay hai cho moi truong.</p>\n\n<p>San pham duoc giao hang mien phi toan quocs</p>\n\n<p><img class=\"responsive-img\" alt=\"\" class=\"responsive-img\" src=\"https://wallpaperbrowse.com/media/images/img_fjords.jpg\" style=\"height:467px; width:700px\" /></p>\n\n<ul>\n	<li>Tang 5k</li>\n	<li>Su dung the thanh vien</li>\n</ul>\n\n<ol>\n	<li>ok</li>\n	<li>oj</li>\n	<li>oj</li>\n	<li><span style=\"color:#e74c3c\">Duo san suat theo tieu chuan hoa ky</span></li>\n</ol>\n\n<p>&nbsp;</p>\n\n<div class=\"video-container\">\n<div class=\"video-container\"><div class=\"video-container\"><iframe frameborder=\"0\" height=\"480\" src=\"//www.youtube.com/embed/Q8TXgCzxEnw?rel=0\" width=\"853\"></iframe></div></div>\n</div>\n\n<p>&nbsp;</p>\n\n<ol>\n	<li>&nbsp;</li>\n	<li><span style=\"color:#e74c3c\"><span style=\"font-size:18px\">OK NHe</span></span></li>\n	<li><span style=\"color:#e74c3c\"><span style=\"font-size:18px\"><span style=\"background-color:#16a085\">dfdsfdsfsdfsdfsdfsdfsdfdsf</span></span></span></li>\n	<li><span style=\"color:#e74c3c\"><span style=\"font-size:18px\"><span style=\"background-color:#16a085\"><span class=\"marker\"><del>fdsfdsfsdfsdfsdfsdfdsfsdfdf</del></span></span></span></span>&nbsp;</li>\n</ol>\n\n<p>Bộ Giao th&ocirc;ng ở Anh dự định sẽ ban h&agrave;nh luật giới hạn việc điều khiển&nbsp;<a href=\"https://tinhte.vn/tags/may-bay-drone/\" title=\"\">m&aacute;y bay drone</a>, theo đ&oacute; trẻ em dưới 18 tuổi chỉ được chơi c&aacute;c loại&nbsp;<a href=\"https://tinhte.vn/tags/drone/\" title=\"\">drone</a>&nbsp;nhẹ hơn 250g. Nếu muốn bay c&aacute;c loại drone nặng hơn 250g th&igrave; phải c&oacute; sự gi&aacute;m s&aacute;t của người lớn v&agrave; chiếc drone đ&oacute; phải được họ đăng k&iacute; với cơ quan chức năng.<br />\n<br />\nNgo&agrave;i ra, luật sắp tới cũng sẽ cho ph&eacute;p cảnh s&aacute;t tịch thu drone nếu nghi ngờ n&oacute; bay tr&aacute;i ph&eacute;p. Những cơ quan như Bộ An ninh quốc gia sẽ được to&agrave;n quyền quyết định những việc n&agrave;y. Kể từ ng&agrave;y 30/7, với việc bay drone tr&aacute;i ph&eacute;p, chủ nh&acirc;n của m&aacute;y bay drone c&oacute; thể phải đối mặt với &aacute;n phạt 2500 bảng Anh v&agrave; phạt t&ugrave; giam giữ l&ecirc;n tới 5 năm.&nbsp;<br />\n&nbsp;</p>\n\n<p><img class=\"responsive-img\" alt=\"[​IMG]\" src=\"https://photo2.tinhte.vn/data/attachment-files/2018/03/4256373_tk0in7hakub01.jpg\" />​</p>\n\n<p><br />\nThống k&ecirc; cho thấy tai nạn li&ecirc;n quan tới m&aacute;y bay drone ở Anh đang tăng nhanh, số lượng c&aacute;c vụ của năm 2017 tăng tới 25% so với năm 2016. C&aacute;c cơ quan chức năng cũng sẽ được quyền sử dụng c&ocirc;ng nghệ chống m&aacute;y bay drone để bảo vệ c&aacute;c sự kiện ngo&agrave;i trời, khu vực c&ocirc;ng cộng, chống ghi h&igrave;nh c&aacute;c nơi nhạy cảm... Luật cũng n&oacute;i rằng sẽ cấm m&aacute;y bay drone tiếp cận khoảng c&aacute;ch 1km v&agrave; độ cao 122m quanh v&ograve;ng đai của c&aacute;c s&acirc;n bay để đảm bảo an ninh.<br />\n<br />\nNgười ta ước t&iacute;nh rằng ng&agrave;nh c&ocirc;ng nghiệp m&aacute;y bay drone ở Anh sẽ đạt 42 tỷ bảng Anh năm 2030, do đ&oacute; việc sớm đưa ra c&aacute;c quy định quản l&yacute; drone rất cần thiết.&nbsp;</p>\n', '111111', '2018-06-30 17:23:29', 1),
(8, NULL, 1, 2, 1, NULL, NULL, 'Đồ chơi xe bus vui vẻ Niniya g', '<p>Với dung lượng&nbsp;<a href=\"https://tinhte.vn/tags/pin/\" title=\"\">pin</a>&nbsp;l&ecirc;n tới 4000 mAh cho chiếc&nbsp;<a href=\"https://tinhte.vn/tags/galaxy/\" title=\"\">Galaxy</a>&nbsp;<a href=\"https://tinhte.vn/tags/note-9-2/\" title=\"\">Note 9</a>&nbsp;v&agrave; bộ nhớ được n&acirc;ng cấp,&nbsp;<a href=\"https://tinhte.vn/tags/samsung/\" title=\"\">Samsung</a>&nbsp;đang c&oacute; vẻ rất tự tin về chiếc flagship sắp tới n&agrave;y của họ, khi h&atilde;ng n&agrave;y vừa mới tung ra 3 teaser về pin, bộ nhớ cũng như hiệu năng của chiếc Note mới để quảng c&aacute;o chuẩn bị cho sự kiện&nbsp;<a href=\"https://tinhte.vn/tags/unpacked-2013/\" title=\"\">Unpacked</a>&nbsp;diễn ra v&agrave;o ng&agrave;y 9 th&aacute;ng 8 tới đ&acirc;y. Theo những th&ocirc;ng tin hiện tại, Note 9 sẽ c&oacute; dung lượng pin lớn hơn 20% so với Note 8, bộ nhớ trong tối đa l&ecirc;n tới 512 GB v&agrave; cải tiến rất nhiều về hiệu năng v&agrave; c&aacute;c thay đổi mới cho c&acirc;y b&uacute;t S-Pen. Mời anh em xem 3 video quảng c&aacute;o mới n&agrave;y của họ.<br />\n&nbsp;</p>\n\n<p><div class=\"video-container\"><iframe frameborder=\"0\" height=\"450\" src=\"https://www.youtube.com/embed/Y-37lkw_uaQ?wmode=opaque\" width=\"800\"></iframe></div></p>\n\n<p><br />\nVideo thể hiện khi mức pin xuống thấp th&igrave; người d&ugrave;ng phải l&agrave;m h&agrave;ng loạt thao t&aacute;c để trụ lại nếu gặp việc quan trọng, Samsung đang muốn &aacute;m chỉ rằng pin tr&ecirc;n Note 9 sẽ c&oacute; hiệu năng rất tốt cho người d&ugrave;ng<br />\n&nbsp;</p>\n\n<p><div class=\"video-container\"><iframe frameborder=\"0\" height=\"450\" src=\"https://www.youtube.com/embed/16i8TH6lxmo?wmode=opaque\" width=\"800\"></iframe></div></p>\n\n<p><br />\nVới bộ nhớ trong l&ecirc;n tới 512 GB th&igrave; người d&ugrave;ng kh&ocirc;ng phải lo đến việc hết dung lượng nữa<br />\n&nbsp;</p>\n\n<p><div class=\"video-container\"><iframe frameborder=\"0\" height=\"450\" src=\"https://www.youtube.com/embed/qljRd9u1UqE?wmode=opaque\" width=\"800\"></iframe></div></p>\n\n<p><br />\nHiệu năng xử l&yacute; tổng thể của Note 9 sẽ rất tốt v&agrave; kh&ocirc;ng gặp phải t&igrave;nh trạng khựng, treo m&aacute;y hay giật lag nữa.</p>\n', '3130076890', '2018-07-11 17:23:29', 1),
(9, 1, 1, 1, 1, NULL, NULL, 'Mô hình xe công trình Bruder ', '<p><div class=\"video-container\"><iframe frameborder=\"0\" allowfullscreen src=\"https://www.youtube.com/embed/CeuDn4_NQDs\"></iframe></div></p>\n\n<p>&nbsp;</p>\n\n<p><div class=\"video-container\"><iframe frameborder=\"0\" allowfullscreen src=\"https://www.youtube.com/embed/CeuDn4_NQDs\"></iframe></div></p>\n\n<p>&nbsp;</p>\n\n<p><div class=\"video-container\"><iframe frameborder=\"0\" allowfullscreen src=\"https://www.youtube.com/embed/CeuDn4_NQDs\"></iframe></div></p>\n\n<p>&nbsp;</p>\n\n<p><div class=\"video-container\"><iframe frameborder=\"0\" allowfullscreen src=\"https://www.youtube.com/embed/CeuDn4_NQDs\"></iframe></div></p>\n', 'KP2031Cc', '2018-07-11 17:23:29', 1),
(10, 2, 1, 4, 1, NULL, NULL, 'Ô TÔ ĐIỀU KHIỂN TỪ XA 2031CCC', '<p>This paragraph contains a lot of lines in the source code, but the browser ignores it.</p>\n\n<p>This paragraph contains a lot of spaces in the source code, but the browser ignores it.</p>\n\n<p>The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change. okokok</p>\n', '2031C', '2018-07-11 17:23:29', 1),
(14, 1, 1, 1, 1, 1, 1, 'Xe Hoi Bien Hinh', '<p><strong>Danh Gia Chi Tiet</strong></p>', 'A123456', '2018-07-11 17:23:29', 1),
(21, NULL, NULL, 1, 1, NULL, NULL, '123', '<p>123</p>\n', 'and', '2018-07-11 17:23:29', 1),
(22, NULL, NULL, 1, 1, NULL, NULL, 'asdf', '<p>sdfadsf</p>\n', 'add', '2018-07-11 17:23:29', 1),
(23, NULL, NULL, 1, 1, NULL, NULL, 'pdf', '<p>sdfa</p>\n', 'af', '2018-07-11 17:23:29', 1),
(24, NULL, NULL, 1, 1, NULL, NULL, 'add', '<p>sadf</p>\n', 'afd', '2018-07-11 17:23:29', 1),
(27, NULL, NULL, 1, 1, NULL, NULL, 'xz', '<p>zxcXZCZX</p>\n', 'sdfasd', '2018-07-11 17:23:29', 1),
(28, 1, NULL, 1, 1, NULL, NULL, 'sdafsad', '<p>sdfaadsfadsf</p>\n', 'sadfasdf', '2018-07-11 17:23:29', 1),
(29, NULL, NULL, 1, 1, 1, NULL, 'asdasd', '<p>sdfsdaf</p>\n', 'dasdasd', '2018-07-11 17:23:29', 1),
(30, NULL, NULL, 1, 1, 1, NULL, 'But be', '<p>Demo</p>\n', 'kp12345', '2018-07-29 06:23:30', 1);

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `promotionId` int(11) NOT NULL,
  `promotionName` varchar(20) NOT NULL,
  `promotionDiscount` int(7) NOT NULL,
  `end` timestamp NULL DEFAULT NULL,
  `start` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`promotionId`, `promotionName`, `promotionDiscount`, `end`, `start`) VALUES
(1, 'Thương Hiệu7', 50, '2018-07-08 17:00:00', '2018-06-30 17:00:00'),
(2, 'Discount23', 90, '2018-03-31 17:00:00', '2018-06-19 17:00:00'),
(4, '12', 9, '2018-06-30 17:00:00', '2018-07-03 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `id` int(11) NOT NULL,
  `rateId` int(11) NOT NULL,
  `rate` int(1) NOT NULL,
  `rateQuestion` text NOT NULL,
  `rateAnswer` text NOT NULL,
  `userId` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`id`, `rateId`, `rate`, `rateQuestion`, `rateAnswer`, `userId`, `status`, `date`) VALUES
(1, 7, 5, 'Hàng đẹp, cho 5 sao.', '', 1, 0, '2018-06-13 06:28:55'),
(2, 7, 1, 'Đồ lừa đảo.', 'Huynh Chau Trả lời cho Quoc Bao', 2, 1, '2018-06-13 06:28:55'),
(3, 8, 5, 'Dịch vụ tốt', 'Rất cám ơn bạn', 3, 1, '2018-06-13 06:28:55'),
(12, 14, 5, 'Hang chat luong', '', 1, 0, '2018-06-14 07:17:32'),
(14, 10, 4, 'Quoc bao danh gia', '', 2, 0, '2018-06-14 11:44:44'),
(15, 8, 5, 'Hay qua', 'OK Nhw', 13, 1, '2018-07-08 09:01:58'),
(16, 10, 1, 'OK', 'Cam on ne', 14, 1, '2018-07-08 13:07:16'),
(17, 7, 1, 'Danh gia 1 sao thoi', 'Ok Now', 13, 1, '2018-07-08 15:16:51'),
(19, 7, 3, 'Kim', 'CAM ON BAN', 15, 1, '2018-07-12 13:01:27'),
(20, 7, 5, 'Test', 'Cam on ban', 18, 1, '2018-08-11 03:04:45');

-- --------------------------------------------------------

--
-- Table structure for table `receiver`
--

CREATE TABLE `receiver` (
  `receiverId` int(11) NOT NULL,
  `receiverName` varchar(200) NOT NULL,
  `receiverAddress` varchar(255) NOT NULL,
  `receiverPhone` varchar(15) NOT NULL,
  `receiverNote` varchar(255) DEFAULT NULL,
  `receiverPayment` int(1) NOT NULL DEFAULT '1',
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `userId` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `receiver`
--

INSERT INTO `receiver` (`receiverId`, `receiverName`, `receiverAddress`, `receiverPhone`, `receiverNote`, `receiverPayment`, `latitude`, `longitude`, `userId`, `time`) VALUES
(1, 'Kingpes', '65 D9 Tây Thạnh Tân Phú', '0937590127', NULL, 1, 1, 1, 1, '2018-06-20 03:05:46'),
(2, 'Nguyen Chau', 'Tay Thanh-HCM', '0937590127', NULL, 1, 0, 0, 1, '2018-06-20 03:05:46'),
(3, 'Nguyen Chau-1', 'Tay Thanh-HCM-1', '0937590127-1', '111111', 1, 0, 0, 3, '2018-06-20 03:05:46'),
(5, 'Demo', 'Ho Chi Minh City', '0123000000', 'Dong goi', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(6, 'Kingpes', 'Tien Giang', '999999999', 'Ok', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(7, 'Test', 'Tan Phu', '09999999', 'Good', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(8, 'Kingpes', 'Tay Thanh', '9999999', 'Ok', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(9, 'Kingpes', 'Tay Thanh', '8888888', 'Goog', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(10, 'Kingpes', 'Tay Thanh', '888888', 'GOOG', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(11, 'Kingpes', 'Cong Hoa', '6666666', 'OH', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(12, 'Quoc Bao', 'tay Than Tan Phu Ho Chi Miunh', '12300321', 'Khong co ghi chu gi het', 1, 0, 0, 2, '2018-06-20 03:05:46'),
(13, 'ffff', 'sss', '43432', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(14, 'chau Hong', 'tay thanh234rwer', '01555555555', 'OK', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(15, 'sdfsd', 'fsdf', 'sdf', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(16, 'sdf', 'fads', 'sdf', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(17, 'sdf', 'def', 'sdf', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(18, 'sdf', 'pdf', 'sdf', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(19, 'dsf', 'fascia', 'safd', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(20, 'fsdfas', 'fads', 'fsdf', 'pdf', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(21, 'Demo', 'test', '8895435', 'fjdfkda', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(22, 'Test1', 'Test1', '098458345', 'xxxx', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(23, 'Test2', 'test2', '34324', 'def', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(25, 'xxxxxx', 'xxxxxx', 'xxxxxx', 'xxxx', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(26, '111111', '111111', '11111', '11111', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(27, '11111', '11111', '11111', '111111', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(28, '111111', '111111', '1111', '11111', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(29, 'yyyyy', 'yyyyy', 'yyyy', 'yyyyy', 1, 0, 0, 1, '2018-06-20 03:05:46'),
(30, 'Huynh3', 'Huynh3', 'Huynh3', 'Huynh3', 1, 0, 0, 4, '2018-06-20 03:05:46'),
(31, 'zzzzz', 'zzzzz', 'zzzzz', 'zzzzz', 1, 0, 0, 1, '2018-07-02 09:37:15'),
(32, 'aaaaaaa', 'aaaaa', 'aaaa', 'aaaaa', 1, 0, 0, 1, '2018-07-05 02:27:06'),
(33, '', '', '', '', 1, 0, 0, 5, '2018-07-07 12:26:12'),
(34, 'chau Hong', 'tay thanh 5555', '01555555555', 'OK', 1, 0, 0, 14, '2018-07-09 12:59:44'),
(35, 'Chau', 'Ho Chi Minh', '0911233444', '', 1, 0, 0, 1, '2018-08-01 07:27:13'),
(36, 'user5', 'HCM', '01231231231', '', 1, 0, 0, 13, '2018-08-01 08:03:45');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `serviceId` int(2) NOT NULL,
  `serviceTitle` varchar(255) NOT NULL,
  `serviceContent` text NOT NULL,
  `serviceImage` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`serviceId`, `serviceTitle`, `serviceContent`, `serviceImage`, `active`, `time`) VALUES
(1, 'Qua tang sing nhat20-10', '<p>Dich vu qua tang sing that Danh cho be yeu</p>\n', '1533971675628bupbe-1.jpg', 1, '2018-07-24 02:39:28'),
(2, 'Trung Thu', '<p>OKOKOKO</p>\n', '1533969854300rage-2.jpg', 1, '2018-08-11 06:44:14');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `version` varchar(15) NOT NULL,
  `upgrade` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`version`, `upgrade`) VALUES
('0.0.1', 'He thong dang bao tri');

-- --------------------------------------------------------

--
-- Table structure for table `ship`
--

CREATE TABLE `ship` (
  `shipId` int(11) NOT NULL,
  `shipName` varchar(255) NOT NULL,
  `shipValue` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ship`
--

INSERT INTO `ship` (`shipId`, `shipName`, `shipValue`) VALUES
(1, 'Giao hang nhanha', 15000);

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `bought` text NOT NULL,
  `delivery` text NOT NULL,
  `returns` text NOT NULL,
  `warranty` text NOT NULL,
  `contact` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `support`
--

INSERT INTO `support` (`bought`, `delivery`, `returns`, `warranty`, `contact`) VALUES
('<h6><span style=\"font-size:18px\"><span style=\"color:#e74c3c\">Bước 1: Chọn sản phẩm</span></span></h6>\n\n<p>Chon san pham minh can mua</p>\n\n<h6><span style=\"color:#2980b9\"><span style=\"font-size:18px\">Bước 2: Cho v&agrave;o Giỏ H&agrave;ng</span></span></h6>\n\n<h6><span style=\"color:#f39c12\"><span style=\"font-size:18px\">Bước 3: X&aacute;c nhận th&ocirc;ng tin</span></span></h6>\n', '<p>Sau khi thanh to&aacute;n th&agrave;nh c&ocirc;ng, thời gian giao h&agrave;ng trong nội th&agrave;nh l&agrave; 24h-48h v&agrave; ngoại th&agrave;nh trong vòng 3-4 ngày. Li&ecirc;n tỉnh trung t&acirc;m l&agrave; trong vòng 6 ngày v&agrave; về huyện x&atilde; trong vòng 7 ngày kể từ thời điểm bưu t&aacute; sang lấy h&agrave;ng tại kho. C&aacute;c huyện v&ugrave;ng s&acirc;u, v&ugrave;ng xa trong vòng 10 ng&agrave;y. - C&aacute;c đơn h&agrave;ng được x&aacute;c nhận giao dịch th&agrave;nh c&ocirc;ng sau 14h đến 18h sẽ được lu&acirc;n chuyển thời gian giao h&agrave;ng v&agrave;o ng&agrave;y h&ocirc;m sau.</p>\n', '<p><strong>Qu&yacute; kh&aacute;ch c&oacute; thể đổi h&agrave;ng trong v&ograve;ng 3 ng&agrave;y kể từ ng&agrave;y nhận h&agrave;ng nếu l&agrave; </strong>:</p>\n\n<p>- Sản phẩm kh&ocirc;ng đ&uacute;ng với đơn đặt h&agrave;ng đ&atilde; thanh to&aacute;n. - Hoặc sản phẩm c&oacute; lỗi do ph&iacute;a nh&agrave; sản xuất: thiếu chi tiết b&ecirc;n trong, m&aacute;y m&oacute;c kh&ocirc;ng vận h&agrave;nh được, sản phẩm kh&ocirc;ng đ&uacute;ng ti&ecirc;u chuẩn chất lượng.</p>\n\n<p>Ch&uacute;ng t&ocirc;i sẽ đổi sản phẩm kh&aacute;c cho bạn. Sản phẩm muốn đổi phải l&agrave; sản phẩm kh&ocirc;ng c&oacute; dấu hiệu đ&atilde; qua sử dụng v&agrave; c&ograve;n nguy&ecirc;n tem, m&aacute;c, nguy&ecirc;n đai kiện ban đầu. Ngo&agrave;i ra, để thực hiện đổi h&agrave;ng,</p>\n\n<p>Qu&yacute; kh&aacute;ch phải c&ograve;n giữ lại chứng từ vận đơn giao nhận hoặc h&oacute;a đơn mua h&agrave;ng tại Mykingdom. Ngo&agrave;i 2 l&yacute; do tr&ecirc;n, ch&uacute;ng t&ocirc;i sẽ kh&ocirc;ng giải quyết bất kỳ trường hợp n&agrave;o y&ecirc;u cầu hủy đơn h&agrave;ng. Nếu Qu&yacute; kh&aacute;ch ki&ecirc;n quyết trả lại h&agrave;ng khi bưu t&aacute; đến giao,</p>\n\n<p>Qu&yacute; kh&aacute;ch vui l&ograve;ng thanh to&aacute;n c&aacute;c chi ph&iacute; giao h&agrave;ng: ph&iacute; vận chuyển v&agrave; ph&iacute; dịch vụ cộng th&ecirc;m (nếu c&oacute;) cho bưu cục. Nếu Qu&yacute; kh&aacute;ch muốn tiến h&agrave;nh đổi h&agrave;ng, vui l&ograve;ng li&ecirc;n hệ bộ phận chăm s&oacute;c kh&aacute;ch h&agrave;ng của ch&uacute;ng t&ocirc;i qua số điện thoại <span style=\"color:#e74c3c\"><strong>(08) 54 333 888 (09:00 đến 17:30 h&agrave;ng ng&agrave;y)</strong></span>, hoặc địa chỉ email info-mykingdom@viettinhanh.com.vn để được hướng dẫn chi tiết.</p>\n', '<p>Tất cả c&aacute;c sản phẩm do Kingpes b&aacute;n ra đều được kiểm tra kỹ c&agrave;ng. Trong thời gian sử dụng c&oacute; g&igrave; trục trặc qu&yacute; kh&aacute;ch c&oacute; thể gửi sản phẩm về lại cửa h&agrave;ng. Ch&uacute;ng t&ocirc;i sẽ kiểm tra sửa chửa miễ ph&iacute; cho qu&yacute; kh&aacute;ch.(Kh&ocirc;ng bao gồm thay thế linh kiện)</p>\n', '<p>Kingpes</p>\n');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transactionId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `promotionId` int(11) DEFAULT NULL,
  `voucherId` int(11) DEFAULT NULL,
  `pointId` int(11) DEFAULT NULL,
  `flashsaleId` int(11) DEFAULT NULL,
  `giftId` int(11) NOT NULL DEFAULT '0',
  `price` int(7) NOT NULL DEFAULT '0',
  `pointUse` int(3) NOT NULL DEFAULT '0',
  `totalFee` int(9) NOT NULL,
  `amount` int(3) NOT NULL,
  `status` int(1) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transactionId`, `receiverId`, `productId`, `promotionId`, `voucherId`, `pointId`, `flashsaleId`, `giftId`, `price`, `pointUse`, `totalFee`, `amount`, `status`, `time`) VALUES
(1, 1, 9, NULL, NULL, NULL, NULL, 0, 0, 0, 1000, 0, 4, '2018-04-23 15:45:44'),
(1, 1, 7, 1, NULL, NULL, NULL, 0, 0, 10, 160, 0, 4, '2018-04-24 13:52:10'),
(1, 1, 7, 1, 1, NULL, NULL, 0, 0, 15, 195, 0, 4, '2018-04-24 13:56:08'),
(1, 1, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 100, 0, 4, '2018-04-29 00:19:11'),
(1, 1, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 100, 0, 4, '2018-04-29 00:20:11'),
(1, 1, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 100, 0, 4, '2018-06-14 16:42:23'),
(1, 9, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 4, '2018-06-18 03:52:14'),
(1, 10, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 4, '2018-06-18 03:55:55'),
(1, 11, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 4, '2018-06-18 04:08:52'),
(1, 16, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 4, '2018-06-18 04:28:19'),
(1, 17, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 4, '2018-06-18 04:29:52'),
(2, 18, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:30:33'),
(3, 19, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:30:59'),
(4, 20, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:31:47'),
(4, 20, 9, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:31:47'),
(5, 21, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:36:02'),
(5, 21, 14, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:36:02'),
(5, 21, 9, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2018-06-18 04:36:02'),
(6, 22, 14, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, '2018-06-18 06:11:44'),
(7, 23, 9, 1, NULL, NULL, NULL, 0, 0, 10, 25970, 1, 4, '2018-06-18 06:15:59'),
(8, 12, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 2, 1, '2018-06-20 02:18:27'),
(9, 12, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 2, 0, '2018-06-20 02:23:35'),
(10, 12, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 2, 3, '2018-06-20 02:24:38'),
(12, 28, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 2, 0, '2018-06-20 02:44:21'),
(12, 28, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 15040, 1, 0, '2018-06-20 02:44:21'),
(12, 28, 9, 1, NULL, NULL, NULL, 0, 0, 0, 25970, 1, 0, '2018-06-20 02:44:21'),
(13, 12, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 2, 0, '2018-06-20 02:57:42'),
(13, 12, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 15040, 1, 0, '2018-06-20 02:57:42'),
(13, 12, 9, 1, NULL, NULL, NULL, 0, 0, 0, 25970, 1, 0, '2018-06-20 02:57:42'),
(14, 29, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 2, 0, '2018-06-20 02:58:36'),
(14, 29, 7, NULL, NULL, NULL, NULL, 0, 0, 0, 15040, 1, 0, '2018-06-20 02:58:36'),
(14, 29, 9, 1, NULL, NULL, NULL, 0, 0, 0, 25970, 1, 0, '2018-06-20 02:58:36'),
(15, 30, 14, 1, 1, 1, 1, 0, 0, 0, 144970, 1, 0, '2018-06-20 03:01:36'),
(16, 12, 9, 1, NULL, NULL, NULL, 0, 0, 0, 123500, 1, 0, '2018-06-23 08:58:55'),
(16, 12, 14, 1, 1, 1, 1, 0, 0, 0, 277500, 1, 0, '2018-06-23 08:58:55'),
(17, 1, 10, NULL, NULL, NULL, NULL, 0, 215000, 0, 215000, 1, 0, '2018-07-02 09:28:46'),
(18, 1, 10, NULL, NULL, NULL, NULL, 0, 215000, 0, 370000, 1, 0, '2018-07-02 09:30:54'),
(18, 1, 9, NULL, NULL, NULL, NULL, 0, 155000, 0, 370000, 1, 0, '2018-07-02 09:30:54'),
(19, 31, 7, NULL, NULL, NULL, NULL, 0, 90000, 0, 367500, 1, 0, '2018-07-02 09:37:15'),
(19, 31, 14, 1, 1, 1, 1, 0, 277500, 0, 367500, 1, 0, '2018-07-02 09:37:15'),
(20, 12, 7, NULL, NULL, NULL, NULL, 0, 90000, 40, 50000, 1, 3, '2018-07-02 09:53:45'),
(21, 12, 7, NULL, NULL, NULL, NULL, 1, 90000, 0, 81000, 1, 1, '2018-07-02 10:11:54'),
(22, 32, 10, NULL, NULL, NULL, NULL, 0, 230000, 0, 230000, 1, 1, '2018-07-05 02:27:06'),
(23, 1, 10, NULL, NULL, NULL, NULL, 0, 215000, 0, 215000, 1, 5, '2018-07-05 05:16:58'),
(24, 33, 7, NULL, NULL, NULL, NULL, 0, 90000, 0, 180000, 2, 0, '2018-07-07 12:26:12'),
(25, 34, 7, NULL, NULL, NULL, NULL, 0, 90000, 0, 90000, 1, 3, '2018-07-09 12:59:44'),
(26, 34, 7, NULL, NULL, NULL, NULL, 0, 90000, 0, 90000, 1, 4, '2018-07-09 15:43:43'),
(27, 34, 7, NULL, NULL, NULL, NULL, 0, 90000, 0, 367500, 1, 2, '2018-07-09 16:45:12'),
(27, 34, 14, 1, 1, 1, 1, 0, 277500, 0, 367500, 1, 2, '2018-07-09 16:45:12'),
(28, 34, 21, NULL, NULL, NULL, NULL, 0, 15123, 0, 15123, 1, 2, '2018-07-09 16:53:34'),
(29, 35, 7, NULL, NULL, NULL, NULL, 0, 90000, 0, 90000, 1, 4, '2018-08-01 07:27:13'),
(30, 36, 8, NULL, NULL, NULL, NULL, 0, 1765000, 0, 1765000, 1, 4, '2018-08-01 08:03:45');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(150) DEFAULT NULL,
  `sex` int(1) NOT NULL DEFAULT '0',
  `email` varchar(100) DEFAULT NULL,
  `groups` int(1) NOT NULL DEFAULT '0',
  `point` int(3) NOT NULL DEFAULT '0',
  `giftId` int(11) DEFAULT NULL,
  `applied` int(1) NOT NULL DEFAULT '0',
  `verify` varchar(10) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `nickname`, `address`, `phone`, `password`, `sex`, `email`, `groups`, `point`, `giftId`, `applied`, `verify`, `time`) VALUES
(1, 'Kingpes', '65 D6 Tây Thạnh Tân Phú', '0937590127', 'unknow120923!2@345+-~sdf', 0, 'unknow', 0, 0, NULL, 0, '1', '2018-04-23 15:24:13'),
(2, 'supervisor', 'Tay Thanh', '6789', '1', 0, NULL, 3, 100, 1, 1, '1', '2018-04-23 15:24:13'),
(3, 'superadmin', NULL, '123789', '1', 0, NULL, 2, 0, NULL, 0, '1', '2018-04-23 15:24:13'),
(4, 'admin', 'Luu Chi Hieu', '0937590129', '1', 1, 'adc@gmail.com', 1, 0, NULL, 0, '1', '2018-05-02 15:47:55'),
(5, 'guest', NULL, '', '1', 0, NULL, 0, 0, NULL, 0, '1', '2018-06-14 16:37:37'),
(7, 'guest1', NULL, '01234567899', '123456', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-08 04:49:46'),
(8, 'chau', NULL, '01234524234', '1', 0, NULL, 0, 0, NULL, 0, 'KkS0W', '2018-07-08 05:49:25'),
(9, 'user1', NULL, '01213456788', '123456', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-08 08:15:54'),
(10, 'user2', NULL, '01231231231', '3123123123213', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-08 08:20:46'),
(11, 'user3', NULL, '01231231232', 'sdfsdfsdafdsaffds', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-08 08:22:37'),
(12, 'user4', NULL, '01231231211', '123123123312321', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-08 08:29:02'),
(13, 'user5', NULL, '01222222223', '1', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-08 08:30:55'),
(14, 'user6', 'tay thanh', '0902500479', '1', 2, 'abc@gmail.com', 0, 0, NULL, 0, '1', '2018-07-08 09:45:16'),
(15, 'kim', NULL, '0902500567', '123456', 0, NULL, 0, 0, NULL, 0, '1', '2018-07-12 12:55:28'),
(16, 'user7', NULL, '01323232323', '1234567', 0, NULL, 0, 0, NULL, 0, 'Ec4cE', '2018-07-26 13:40:19'),
(17, 'user8', NULL, '01323232322', '1234434234', 0, NULL, 0, 0, NULL, 0, '8JY4o', '2018-07-26 13:44:02'),
(18, 'user9', NULL, '0902500478', '1234567', 0, NULL, 0, 0, NULL, 0, '1', '2018-08-11 02:45:52');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `voucherId` int(11) NOT NULL,
  `voucherName` varchar(20) NOT NULL,
  `voucherValue` int(7) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`voucherId`, `voucherName`, `voucherValue`, `start`, `end`) VALUES
(1, 'V-KINGPES', 1, '2018-06-30 17:00:00', '2018-07-27 17:00:00'),
(2, 'V-KPES', 30, '2018-06-22 17:00:00', '2018-07-29 17:00:00'),
(3, 'K-PES', 10, '2018-06-30 17:00:00', '2018-08-31 17:00:00'),
(4, 'K-KP', 20, '2018-06-30 17:00:00', '2018-11-30 17:00:00'),
(5, 'K-PPP', 10, '2018-04-30 17:00:00', '2018-06-30 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `youtube`
--

CREATE TABLE `youtube` (
  `yt1` varchar(15) DEFAULT NULL,
  `yt2` varchar(15) DEFAULT NULL,
  `yt3` varchar(15) DEFAULT NULL,
  `ytId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `youtube`
--

INSERT INTO `youtube` (`yt1`, `yt2`, `yt3`, `ytId`) VALUES
('1fdfsdf', 'VAbDSWCDUQ8', '3sfsdfsdfsdf', 7),
('gy-I7tytnKg', 'PhGsuejsBF8', 'LZJCdl7MhX8', 8),
('tSUg0ZLSMgc', '3oeybIqHmKk', 'zEUeBkuoiJ0', 9),
('FYzbCA3hEZc', '123', '421412', 10),
('youtube', 'undefined', 'undefined', 14),
('', 'undefined', 'undefined', 23),
('', 'undefined', 'undefined', 24),
('', 'undefined', 'undefined', 27),
('', 'undefined', 'undefined', 28),
('', 'undefined', 'undefined', 29),
('', 'undefined', 'undefined', 30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amount`
--
ALTER TABLE `amount`
  ADD UNIQUE KEY `amountId` (`amountId`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`bannerId`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blogId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`),
  ADD UNIQUE KEY `categoryName` (`categoryName`);

--
-- Indexes for table `certify`
--
ALTER TABLE `certify`
  ADD UNIQUE KEY `certifyId_2` (`certifyId`),
  ADD KEY `certifyId` (`certifyId`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentId` (`commentId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventId`);

--
-- Indexes for table `flashsale`
--
ALTER TABLE `flashsale`
  ADD PRIMARY KEY (`flashsaleId`);

--
-- Indexes for table `gamepoint`
--
ALTER TABLE `gamepoint`
  ADD UNIQUE KEY `userId_2` (`gameId`),
  ADD KEY `userId` (`gameId`);

--
-- Indexes for table `gift`
--
ALTER TABLE `gift`
  ADD PRIMARY KEY (`giftId`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD KEY `imageId` (`imageId`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD KEY `likesId` (`likesId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD KEY `loginId` (`loginId`);

--
-- Indexes for table `open`
--
ALTER TABLE `open`
  ADD PRIMARY KEY (`openId`);

--
-- Indexes for table `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`pointId`);

--
-- Indexes for table `price`
--
ALTER TABLE `price`
  ADD KEY `priceId` (`priceId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD UNIQUE KEY `productSn` (`productSn`),
  ADD KEY `promotionId` (`promotionId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `flashsaleId` (`flashsaleId`),
  ADD KEY `shipId` (`shipId`),
  ADD KEY `pointId` (`pointId`),
  ADD KEY `voucherId` (`voucherId`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`promotionId`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rateId` (`rateId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `receiver`
--
ALTER TABLE `receiver`
  ADD PRIMARY KEY (`receiverId`),
  ADD KEY `deliveryId` (`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`serviceId`);

--
-- Indexes for table `ship`
--
ALTER TABLE `ship`
  ADD PRIMARY KEY (`shipId`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD KEY `userId` (`receiverId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `promotionId` (`promotionId`),
  ADD KEY `voucherId` (`voucherId`),
  ADD KEY `transactionId` (`transactionId`),
  ADD KEY `pointId` (`pointId`),
  ADD KEY `flashsaleId` (`flashsaleId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `nickname` (`nickname`),
  ADD KEY `giftId` (`giftId`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`voucherId`);

--
-- Indexes for table `youtube`
--
ALTER TABLE `youtube`
  ADD KEY `ytId` (`ytId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `bannerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blogId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventId` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `flashsale`
--
ALTER TABLE `flashsale`
  MODIFY `flashsaleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gift`
--
ALTER TABLE `gift`
  MODIFY `giftId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `point`
--
ALTER TABLE `point`
  MODIFY `pointId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `promotionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `receiver`
--
ALTER TABLE `receiver`
  MODIFY `receiverId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `serviceId` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ship`
--
ALTER TABLE `ship`
  MODIFY `shipId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `voucherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `amount`
--
ALTER TABLE `amount`
  ADD CONSTRAINT `amount_ibfk_1` FOREIGN KEY (`amountId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `certify`
--
ALTER TABLE `certify`
  ADD CONSTRAINT `certify_ibfk_1` FOREIGN KEY (`certifyId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gamepoint`
--
ALTER TABLE `gamepoint`
  ADD CONSTRAINT `gamepoint_ibfk_1` FOREIGN KEY (`gameId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`imageId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`likesId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`loginId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `price`
--
ALTER TABLE `price`
  ADD CONSTRAINT `price_ibfk_1` FOREIGN KEY (`priceId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`promotionId`) REFERENCES `promotion` (`promotionId`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `product_ibfk_4` FOREIGN KEY (`flashsaleId`) REFERENCES `flashsale` (`flashsaleId`),
  ADD CONSTRAINT `product_ibfk_5` FOREIGN KEY (`voucherId`) REFERENCES `voucher` (`voucherId`),
  ADD CONSTRAINT `product_ibfk_6` FOREIGN KEY (`shipId`) REFERENCES `ship` (`shipId`),
  ADD CONSTRAINT `product_ibfk_7` FOREIGN KEY (`pointId`) REFERENCES `point` (`pointId`);

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`rateId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receiver`
--
ALTER TABLE `receiver`
  ADD CONSTRAINT `receiver_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`promotionId`) REFERENCES `promotion` (`promotionId`),
  ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`voucherId`) REFERENCES `voucher` (`voucherId`),
  ADD CONSTRAINT `transactions_ibfk_5` FOREIGN KEY (`receiverId`) REFERENCES `receiver` (`receiverId`),
  ADD CONSTRAINT `transactions_ibfk_7` FOREIGN KEY (`flashsaleId`) REFERENCES `flashsale` (`flashsaleId`),
  ADD CONSTRAINT `transactions_ibfk_8` FOREIGN KEY (`pointId`) REFERENCES `point` (`pointId`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`giftId`) REFERENCES `gift` (`giftId`);

--
-- Constraints for table `youtube`
--
ALTER TABLE `youtube`
  ADD CONSTRAINT `youtube_ibfk_1` FOREIGN KEY (`ytId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
