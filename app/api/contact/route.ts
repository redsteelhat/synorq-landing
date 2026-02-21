import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

function buildEmailHtml(data: {
  name: string;
  email: string;
  company?: string;
  sector: string;
  message: string;
  budget?: string;
}) {
  const sectorLabels: Record<string, string> = {
    fintech: "Fintech",
    ecommerce: "E-ticaret",
    elearning: "E-öğrenme",
    enterprise: "Kurumsal",
    other: "Diğer",
  };
  return `
    <h2>Yeni Lead Formu</h2>
    <p><strong>Ad Soyad:</strong> ${data.name}</p>
    <p><strong>E-posta:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Şirket:</strong> ${data.company}</p>` : ""}
    <p><strong>Sektör:</strong> ${sectorLabels[data.sector] ?? data.sector}</p>
    ${data.budget ? `<p><strong>Bütçe:</strong> ${data.budget}</p>` : ""}
    <p><strong>Mesaj:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const to = process.env.CONTACT_EMAIL ?? "hello@synorq.com";
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Synorq <noreply@synorq.com>",
      to,
      replyTo: data.email,
      subject: `New Lead: ${data.name} - ${data.sector}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
