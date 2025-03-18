import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const origin = process.env.NEXT_PUBLIC_URL;

export async function POST(req) {
  try {
    const body = await req.json();
    const { items } = body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          quantity: item.quantity
        })))
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
