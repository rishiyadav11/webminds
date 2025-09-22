CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "webmindsapp_portfolio" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"personal" json NOT NULL,
	"skills" json NOT NULL,
	"projects" json NOT NULL,
	"socials" json NOT NULL,
	"experience" json NOT NULL,
	"theme" text NOT NULL,
	"link" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webmindsapp_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webmindsapp_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"bio" text,
	"githubId" text,
	CONSTRAINT "webmindsapp_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "webmindsapp_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "webmindsapp_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "webmindsapp_portfolio" ADD CONSTRAINT "webmindsapp_portfolio_userId_webmindsapp_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."webmindsapp_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webmindsapp_session" ADD CONSTRAINT "webmindsapp_session_userId_webmindsapp_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."webmindsapp_user"("id") ON DELETE cascade ON UPDATE no action;