"use client"

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPageViews: 0,
    totalAddToCart: 0,
    totalPurchases: 0,
    bestSellers: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    // Rafraîchir les stats toutes les 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-roller mb-8">Tableau de bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Statistiques générales */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Vues de pages</h3>
            <p className="text-3xl font-semibold">{stats.totalPageViews}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Ajouts au panier</h3>
            <p className="text-3xl font-semibold">{stats.totalAddToCart}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Achats</h3>
            <p className="text-3xl font-semibold">{stats.totalPurchases}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Taux de conversion</h3>
            <p className="text-3xl font-semibold">
              {stats.totalPageViews ? 
                ((stats.totalPurchases / stats.totalPageViews) * 100).toFixed(1) 
                : 0}%
            </p>
          </div>
        </div>

        {/* Meilleures ventes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Meilleures ventes</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ventes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.bestSellers.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
