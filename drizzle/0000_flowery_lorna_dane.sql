CREATE TYPE "public"."role" AS ENUM('ADMIN', 'STUDENT', 'TEACHER');--> statement-breakpoint
CREATE TYPE "public"."level_name" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2');--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"language" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "examples" (
	"id" serial PRIMARY KEY NOT NULL,
	"sentence" text NOT NULL,
	"translation" text NOT NULL,
	"lesson_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"order" integer NOT NULL,
	"level_id" integer NOT NULL,
	"module_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" "level_name" NOT NULL,
	"position" integer NOT NULL,
	"course_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"level_id" integer NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'STUDENT' NOT NULL,
	"refresh_token" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vocabularies" (
	"id" serial PRIMARY KEY NOT NULL,
	"word" varchar(255) NOT NULL,
	"meaning" varchar(255) NOT NULL,
	"lesson_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "examples" ADD CONSTRAINT "examples_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_level_id_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "levels" ADD CONSTRAINT "levels_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_level_id_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "courses_deleted_at_idx" ON "courses" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "examples_lesson_idx" ON "examples" USING btree ("lesson_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_level_order_uniq" ON "lessons" USING btree ("level_id","order");--> statement-breakpoint
CREATE INDEX "lessons_level_idx" ON "lessons" USING btree ("level_id");--> statement-breakpoint
CREATE UNIQUE INDEX "levels_course_code_deleted_at_uniq" ON "levels" USING btree ("course_id","code","deleted_at");--> statement-breakpoint
CREATE INDEX "levels_course_idx" ON "levels" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "levels_course_position_idx" ON "levels" USING btree ("course_id","position");--> statement-breakpoint
CREATE INDEX "modules_level_idx" ON "modules" USING btree ("level_id");--> statement-breakpoint
CREATE UNIQUE INDEX "vocabularies_lesson_word_uniq" ON "vocabularies" USING btree ("lesson_id","word");--> statement-breakpoint
CREATE INDEX "vocabularies_lesson_idx" ON "vocabularies" USING btree ("lesson_id");