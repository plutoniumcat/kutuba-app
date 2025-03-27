CREATE TABLE `LESSONS` (
	`ID` integer PRIMARY KEY NOT NULL,
	`LESSON_NUM` integer,
	`TITLE` text,
	`DESCRIPTION` text,
	`COMPLETED` integer
);
--> statement-breakpoint
CREATE TABLE `LESSON_SLIDES` (
	`ID` integer PRIMARY KEY NOT NULL,
	`LESSON_ID` integer,
	`TITLE` text,
	`ITEM_1` text,
	`ITEM_2` text,
	`ITEM_3` text,
	`ITEM_4` text,
	`ITEM_5` text,
	`ITEM_6` text,
	`ITEM_7` text,
	`ITEM_8` text,
	`ITEM_9` text,
	`ITEM_10` text,
	FOREIGN KEY (`LESSON_ID`) REFERENCES `LESSONS`(`ID`) ON UPDATE no action ON DELETE no action
);
