import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    google: any;
  }
}

interface SecureGoogleMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    description?: string;
  }>;
  polyline?: Array<{ lat: number; lng: number }>;
  className?: string;
}

const SecureGoogleMap: React.FC<SecureGoogleMapProps> = ({
  center,
  zoom = 13,
  markers = [],
  polyline = [],
  className = "w-full h-64 rounded-lg"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // Call Supabase edge function to get the API key securely
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        
        if (error) {
          console.error('Failed to fetch Google Maps API key:', error);
          setError('Unable to load map configuration');
          return;
        }
        
        if (data?.apiKey) {
          setApiKey(data.apiKey);
        } else {
          setError('Google Maps API key not configured');
        }
      } catch (err) {
        console.error('Error fetching API key:', err);
        setError('Failed to load map');
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    if (!window.google) {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => setError('Failed to load Google Maps');
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#00A3E4" }] // Zatara blue
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        }
      ]
    });

    // Add markers with XSS protection
    markers.forEach((marker) => {
      const mapMarker = new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title
      });

      if (marker.description) {
        // Create DOM elements instead of HTML strings to prevent XSS
        const infoContent = document.createElement('div');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        
        title.textContent = marker.title;
        description.textContent = marker.description;
        
        infoContent.appendChild(title);
        infoContent.appendChild(description);

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoContent
        });

        mapMarker.addListener('click', () => {
          infoWindow.open(map, mapMarker);
        });
      }
    });

    // Add polyline for route
    if (polyline.length > 0) {
      const routePath = new window.google.maps.Polyline({
        path: polyline,
        geodesic: true,
        strokeColor: '#00A3E4', // Zatara blue
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      routePath.setMap(map);
    }
  };

  if (loading) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center border border-border`}>
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center border border-border`}>
        <div className="text-center p-4">
          <p className="text-sm text-destructive mb-2">
            <strong>Map Unavailable</strong>
          </p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};

export default SecureGoogleMap;