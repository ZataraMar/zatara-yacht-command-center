import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId: string;
  maxReviews?: number;
  className?: string;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  placeId = "109872317444958228757",
  maxReviews = 6,
  className = ""
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    fetchGoogleReviews();
  }, [placeId]);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      
      // Call the Supabase edge function for Google Places API
      const response = await fetch(`https://eefenqehcesevuudtpti.supabase.co/functions/v1/google-reviews?placeId=${placeId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      
      if (data.result) {
        setReviews(data.result.reviews?.slice(0, maxReviews) || []);
        setAverageRating(data.result.rating || 0);
        setTotalReviews(data.result.user_ratings_total || 0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching Google reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-muted-foreground" />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground mb-4">Unable to load Google reviews</p>
        <Button variant="outline" onClick={fetchGoogleReviews}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Reviews Header */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Google Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {renderStars(averageRating)}
          </div>
          <span className="text-sm text-muted-foreground">
            {averageRating.toFixed(1)} · {totalReviews} reviews
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              {review.profile_photo_url ? (
                <img 
                  src={review.profile_photo_url} 
                  alt={review.author_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  {review.author_name.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{review.author_name}</h4>
                  <div className="flex text-yellow-400">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{review.relative_time_description}</div>
              </div>
            </div>
            
            <div className="relative">
              <Quote className="absolute top-0 left-0 w-4 h-4 text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm pl-6 leading-relaxed">
                {review.text}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Google Attribution */}
      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground">
          Reviews powered by Google
        </p>
      </div>
    </div>
  );
};