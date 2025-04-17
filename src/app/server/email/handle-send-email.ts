import resend from "@/app/lib/resend";
import "server-only";

export async function handleSendSuccessEmail(
  userEmail: string,
  userName: string,
) {
  const { data, error } = await resend.emails.send({
    from: "Template Saas <template@saas.com>",
    to: [userEmail],
    subject: "Bem-vindo ao Template Saas",
    text: `Olá ${userName},\n\nObrigado por se inscrever no Template Saas! Estamos felizes em tê-lo conosco.\n\nAtenciosamente,\nEquipe Template Saas`,
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }

  return data;
}

export async function handleSendCancelEmail(
  userEmail: string,
  userName: string,
) {
  const { data, error } = await resend.emails.send({
    from: "Template Saas <template@saas.com>",
    to: [userEmail],
    subject: "Que pena que você está saindo",
    text: `Olá ${userName},\n\nLamentamos saber que você está saindo do Template Saas. Se houver algo que possamos fazer para melhorar sua experiência, não hesite em nos informar.\n\nAtenciosamente,\nEquipe Template Saas`,
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }

  return data;
}
