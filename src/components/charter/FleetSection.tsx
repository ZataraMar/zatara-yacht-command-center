
import React from 'react';

interface BoatFeature {
  icon: string;
  text: string;
}

interface Boat {
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  features: BoatFeature[];
}

const boats: Boat[] = [
  {
    name: 'Zatara',
    description: 'Our flagship vessel, a classic Mallorcan Llaut combining traditional charm with modern luxury. Perfect for those seeking an authentic Mediterranean experience.',
    image: 'https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/puravidaphotos/Cristian%20Shoot/Yacht_Charter_Mallorca_PuraVida3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=800&q=80',
    features: [
      { icon: '✓', text: 'Capacity: 12 guests + 2 crew' },
      { icon: '✓', text: 'Traditional Mallorcan design' },
      { icon: '✓', text: 'Premium sound system' },
      { icon: '✓', text: 'Shaded lounging areas' },
      { icon: '✓', text: 'Professional crew included' }
    ]
  },
  {
    name: 'PuraVida',
    description: 'Our adventure-focused vessel, equipped for water sports and coastal exploration. Ideal for active groups and families with children.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    features: [
      { icon: '✓', text: 'Capacity: 10 guests + 2 crew' },
      { icon: '✓', text: 'Water sports equipment' },
      { icon: '✓', text: 'Snorkeling gear included' },
      { icon: '✓', text: 'Spacious swim platform' },
      { icon: '✓', text: 'Family-friendly features' }
    ]
  }
];

export const FleetSection = () => {
  return (
    <section id="fleet" className="py-20 bg-zatara-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zatara-navy mb-4">Our Premium Fleet</h2>
          <p className="text-xl text-gray-600">Two beautifully maintained vessels, each with its own character and charm</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {boats.map((boat) => (
            <div key={boat.name} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src={boat.image} 
                alt={boat.name} 
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = boat.fallbackImage;
                }}
              />
              <div className="p-8">
                <h3 className="text-3xl font-bold text-zatara-navy mb-4">{boat.name}</h3>
                <p className="text-gray-600 mb-6">{boat.description}</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  {boat.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-zatara-blue mr-2">{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
