import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const placeId = url.searchParams.get('placeId')
    
    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'Place ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Google Places API key from environment
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY')
    console.log('API Key available:', !!apiKey)
    
    if (!apiKey) {
      console.error('Google Places API key not found in environment')
      return new Response(
        JSON.stringify({ error: 'Google Places API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Fetch place details including reviews
    const placesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
    console.log('Making request to Google Places API for placeId:', placeId)
    
    const response = await fetch(placesUrl)
    console.log('Google API response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Places API error:', response.status, errorText)
      throw new Error(`Google Places API error: ${response.status} - ${errorText}`)
    }
    
    const data = await response.json()
    console.log('Google API response status:', data.status)
    
    if (data.status !== 'OK') {
      console.error('Google Places API returned error status:', data.status, data.error_message)
      throw new Error(`Google Places API status: ${data.status} - ${data.error_message || 'Unknown error'}`)
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    
    return new Response(
      JSON.stringify({ error: 'Failed to fetch reviews' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})