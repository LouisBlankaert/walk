import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Envoyer un email au client
    await sgMail.send({
      to: session.customer_details.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Confirmation de commande - NSK',
      html: `
        <h1>Merci pour votre commande !</h1>
        <p>Votre commande a été confirmée et sera bientôt expédiée.</p>
        <p>Numéro de commande : ${session.id}</p>
      `,
    });

    // Récupérer les détails des produits
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Envoyer une notification au propriétaire
    await sgMail.send({
      to: process.env.OWNER_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: '🛍️ Nouvelle commande ! - NSK',
      html: `
        <h1 style="color: #000; font-size: 24px; margin-bottom: 20px;">Nouvelle commande reçue</h1>
        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">📦 Détails de la commande</h2>
          <p><strong>Numéro de commande :</strong> ${session.id}</p>
          <p><strong>Date :</strong> ${new Date(session.created * 1000).toLocaleString('fr-FR')}</p>
          <p><strong>Montant total :</strong> ${session.amount_total / 100}€</p>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">👤 Informations client</h2>
          <p><strong>Nom :</strong> ${session.customer_details.name}</p>
          <p><strong>Email :</strong> ${session.customer_details.email}</p>
          <p><strong>Téléphone :</strong> ${session.customer_details.phone || 'Non renseigné'}</p>
          <p><strong>Adresse :</strong><br>
          ${session.customer_details.address.line1}<br>
          ${session.customer_details.address.line2 ? session.customer_details.address.line2 + '<br>' : ''}
          ${session.customer_details.address.postal_code} ${session.customer_details.address.city}<br>
          ${session.customer_details.address.country}</p>
        </div>

        <div style="background: #f8f8f8; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">🛍️ Produits commandés</h2>
          ${lineItems.data.map(item => `
            <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
              <p><strong>${item.description}</strong></p>
              <p>Quantité : ${item.quantity}</p>
              <p>Prix unitaire : ${item.price.unit_amount / 100}€</p>
              <p>Total : ${(item.price.unit_amount * item.quantity) / 100}€</p>
            </div>
          `).join('')}
        </div>
      `,
    });
  }

  return new Response(null, { status: 200 });
}
