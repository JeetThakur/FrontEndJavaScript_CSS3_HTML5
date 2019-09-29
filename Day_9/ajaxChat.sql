-- If you want to make it work for yourself, you'll need to create the table!
-- 
-- Table structure for table `ajaxClass`
-- 

CREATE TABLE `ajaxClass` (
  `id` tinyint(4) NOT NULL auto_increment,
  `msg` varchar(20) NOT NULL default '',
  PRIMARY KEY  (`id`)
) TYPE=MyISAM AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `ajaxClass`
-- 

INSERT INTO `ajaxClass` VALUES (1, 'Hello World');
INSERT INTO `ajaxClass` VALUES (2, 'Hi There'); 