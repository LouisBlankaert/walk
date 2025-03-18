import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Simple in-memory storage for analytics (in production, use a database)
let analytics = {
  pageViews: {},
  addToCart: {},
  purchases: {},
  bestSellers: {}
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, data } = body;
    const cookieStore = cookies();
    const visitorId = cookieStore.get('visitor_id')?.value || 'anonymous';

    switch (type) {
      case 'pageView':
        const { page } = data;
        analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;
        break;
      
      case 'addToCart':
        const { productId } = data;
        analytics.addToCart[productId] = (analytics.addToCart[productId] || 0) + 1;
        break;
      
      case 'purchase':
        const { products } = data;
        products.forEach(product => {
          analytics.purchases[product.id] = (analytics.purchases[product.id] || 0) + 1;
          analytics.bestSellers[product.id] = (analytics.bestSellers[product.id] || 0) + product.quantity;
        });
        break;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error tracking analytics:', err);
    return NextResponse.json({ error: 'Error tracking analytics' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = {
      totalPageViews: Object.values(analytics.pageViews).reduce((a, b) => a + b, 0),
      totalAddToCart: Object.values(analytics.addToCart).reduce((a, b) => a + b, 0),
      totalPurchases: Object.values(analytics.purchases).reduce((a, b) => a + b, 0),
      bestSellers: Object.entries(analytics.bestSellers)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id, count]) => ({ id, count }))
    };

    return NextResponse.json(stats);
  } catch (err) {
    console.error('Error getting analytics:', err);
    return NextResponse.json({ error: 'Error getting analytics' }, { status: 500 });
  }
}
