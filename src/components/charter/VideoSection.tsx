
import React from 'react';

export const VideoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zatara-navy mb-4">
            Experience Zatara
          </h2>
          <p className="text-lg text-gray-600">
            See what makes our charters special
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <video 
              controls 
              className="w-full h-full object-cover"
              poster="https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/zataraphotos/zatara-thumbnail.jpg"
            >
              <source src="https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/videos/zatara-experience.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
