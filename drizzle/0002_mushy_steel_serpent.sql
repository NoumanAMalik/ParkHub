ALTER TABLE `cities` DROP FOREIGN KEY `cities_country_id_countries_id_fk`;
--> statement-breakpoint
ALTER TABLE `cities` DROP COLUMN `country_id`;--> statement-breakpoint
ALTER TABLE `countries` ADD CONSTRAINT `name_idx` UNIQUE(`name`);