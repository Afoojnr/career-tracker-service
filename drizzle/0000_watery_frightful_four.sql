CREATE TABLE "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"years_of_experience" integer NOT NULL,
	"address" varchar(500) NOT NULL
);
