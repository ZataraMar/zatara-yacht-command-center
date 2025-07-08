import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  apiKey: string;
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

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center,
  zoom = 13,
  markers = [],
  polyline = [],
  className = "w-full h-64 rounded-lg"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      return;
    }

    if (!window.google) {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
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
          stylers: [{ color: "#3B82F6" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        }
      ]
    });

    // Add markers
    markers.forEach((marker) => {
      const mapMarker = new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title
      });

      if (marker.description) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>${marker.title}</h3><p>${marker.description}</p></div>`
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
        strokeColor: '#3B82F6',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      routePath.setMap(map);
    }
  };

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className={`${className} bg-muted flex items-center justify-center border border-border`}>
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Map will appear here</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            Replace YOUR_GOOGLE_MAPS_API_KEY with your actual Google Maps API key
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};

export default GoogleMap;