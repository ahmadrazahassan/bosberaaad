import { getServiceClient } from "./_client";

/**
 * Creates the single administrator account. Run once, after the migrations.
 *
 * Credentials come from ADMIN_EMAIL and ADMIN_PASSWORD in .env.local so they
 * never appear in shell history or in a commit.
 */
async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "\nSet ADMIN_EMAIL and ADMIN_PASSWORD in .env.local, then run this again.\n" +
        "Use a long, unique password. This account can edit every page on the site.\n",
    );
    process.exit(1);
  }

  if (password.length < 12) {
    console.error("\nUse a password of at least twelve characters.\n");
    process.exit(1);
  }

  const client = getServiceClient();

  const { data, error } = await client.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.toLowerCase().includes("already")) {
      console.log(`\nAn account already exists for ${email}. Nothing to do.\n`);
      return;
    }
    console.error("\nCould not create the account:", error.message, "\n");
    process.exit(1);
  }

  console.log(`\nAdministrator created for ${data.user?.email}.`);
  console.log("Sign in at /admin/login.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
