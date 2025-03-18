import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';

export async function GET(req) {
  // Vérifier l'authentification
  const session = await getServerSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Récupérer les paiements des 30 derniers jours
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - (30 * 24 * 60 * 60);

    const payments = await stripe.paymentIntents.list({
      created: {
        gte: startDate,
        lte: endDate,
      },
      limit: 100,
    });

    // Calculer les statistiques
    const totalSales = payments.data.reduce((sum, payment) => {
      return sum + (payment.amount / 100);
    }, 0);

    // Récupérer les produits populaires
    const popularProducts = await stripe.products.list({
      limit: 5,
    });

    // Récupérer les commandes récentes
    const recentOrders = payments.data
      .slice(0, 5)
      .map(payment => ({
        id: payment.id,
        customerName: payment.customer_details?.name || 'Client',
        amount: payment.amount / 100,
        date: new Date(payment.created * 1000).toLocaleDateString(),
      }));

    return new Response(JSON.stringify({
      totalSales,
      popularProducts: popularProducts.data.map(product => ({
        id: product.id,
        name: product.name,
        sales: product.metadata.sales || 0,
      })),
      recentOrders,
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
