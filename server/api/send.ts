import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // TODO: check if user is admin
  try {
    const data = await resend.emails.send({
      from: "Malware scan <onboarding@resend.dev>",
      to: [body.email],
      subject: "You have been invited to join an organization",
      html: "<strong>It works!</strong>",
    });

    return data;
  } catch (error) {
    return { error };
  }
});
