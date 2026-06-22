export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        name: "WeatherBoard",
        email: process.env.SENDER_EMAIL!,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });
}