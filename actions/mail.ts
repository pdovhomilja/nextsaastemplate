import NewStoryNotificationEmail from "@/email-templates/new-story-notification";
import resendHelper from "@/lib/resend";

const domain = process.env.NEXT_PUBLIC_APP_URL;

//Authentication
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const resend = await resendHelper();
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject:
      "Kód pro dvoufaktorové ověření z " + process.env.NEXT_PUBLIC_APP_NAME,
    //TODO: Create a new email template for 2FA with react.email
    html: `<p>Váš 2FA kód: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = await resendHelper();
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Obnovení hesla - " + process.env.NEXT_PUBLIC_APP_NAME,
    html: `<p>Kliknutím na odkaz <a href="${resetLink}">zde</a> si nastavte nové heslo.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = resendHelper();
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

  (await resend).emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Potvrzení emailu - " + process.env.NEXT_PUBLIC_APP_NAME,
    text: `Kliknutím na tento odkaz potvrdíte Váš email: ${confirmLink}`,
  });
};

//User management
export const sendNewUserNotification = async (
  email: string,
  newUserEmail: string,
  newUserName?: string
) => {
  const resend = resendHelper();
  (await resend).emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Nový uživatel - " + process.env.NEXT_PUBLIC_APP_NAME,
    text: `Byl přidán nový uživatel do aplikace: ${
      process.env.NEXT_PUBLIC_APP_NAME
    }, Jméno: ${newUserName ? newUserName : "null"}, Email: ${newUserEmail}`,
  });
};

export const sendAccountActivationEmail = async (email: string) => {
  const resend = resendHelper();
  (await resend).emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Aktivace účtu - " + process.env.NEXT_PUBLIC_APP_NAME,
    text: `Váš účet byl aktivován.`,
  });
};

//Story management
export const sendStoryApprovalNotification = async (
  email: string,
  storyTitle: string,
  url: string
) => {
  const resend = resendHelper();
  (await resend).emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Nový článek na  - " + process.env.NEXT_PUBLIC_APP_NAME,
    text: `Na webu ${process.env.NEXT_PUBLIC_APP_NAME} byl publikován nový článek s názvem ${storyTitle}. Podívejte se na něj na následujícím odkazu: ${url}`,
    react: NewStoryNotificationEmail({
      email,
      storyTitle,
      url,
    }),
  });
};

export const sendStoryDeactivationNotification = async (
  email: string,
  storyTitle: string,
  url: string
) => {
  const resend = resendHelper();
  (await resend).emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Stažení článku - " + process.env.NEXT_PUBLIC_APP_NAME,
    text: `Článek -  "${storyTitle}" byl deaktivován a již se nezobrazuje ve veřejné části portálu.`,
  });
};
