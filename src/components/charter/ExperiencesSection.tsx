import React from 'react';
import { Button } from '@/components/ui/button';

interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  fallbackImage: string;
}

const experiences: Experience[] = [
  {
    id: 'zatara-classic',
    title: 'Zatara Classic Day Charter',
    description: '8-hour luxury experience with our classic Mallorcan Llaut. Perfect for families and groups seeking comfort and authenticity.',
    price: 150,
    image: 'https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/puravidaphotos/Cristian%20Shoot/Yacht_Charter_Mallorca_PuraVida3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'puravida-adventure',
    title: 'PuraVida Adventure',
    description: '6-hour action-packed charter with water sports, snorkeling, and coastal exploration. Ideal for active groups.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sunset-cruise',
    title: 'Magical Sunset Cruise',
    description: '3-hour romantic evening charter with premium catering and the most spectacular sunset views in Mallorca.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
  }
];

export const ExperiencesSection = () => {
  const selectExperience = (experienceId: string) => {
    // Set the experience in the booking form
    const experienceSelect = document.getElementById('experience') as HTMLSelectElement;
    if (experienceSelect) {
      experienceSelect.value = experienceId;
      experienceSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Scroll to booking section
    document.getElementById('booking')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zatara-navy mb-4">Choose Your Perfect Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From intimate sunset cruises to full-day adventures, every charter is tailored to create unforgettable memories on the Mediterranean.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <img 
                src={experience.image} 
                alt={experience.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = experience.fallbackImage;
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-zatara-navy mb-2">{experience.title}</h3>
                <p className="text-gray-600 mb-4">{experience.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-zatara-blue">
                    From €{experience.price}
                    <span className="text-sm text-gray-500">/person</span>
                  </span>
                  <Button 
                    onClick={() => selectExperience(experience.id)}
                    className="bg-zatara-blue text-white px-4 py-2 rounded-lg hover:bg-zatara-blue-dark transition"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};