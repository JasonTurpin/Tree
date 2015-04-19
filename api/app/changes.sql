CREATE TABLE IF NOT EXISTS `Factories` (
  `factory_id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `upperBound` INT(20) NOT NULL,
  `lowerBound` INT(20) NOT NULL,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY(`factory_id`)
);
CREATE TABLE IF NOT EXISTS `FactoryMembers` (
  `member_id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `factory_id` INT(10) unsigned,
  `value` INT(20) NOT NULL,
  `created_at` TIMESTAMP,
  `updated_at` TIMESTAMP,
  PRIMARY KEY(`member_id`)
);
