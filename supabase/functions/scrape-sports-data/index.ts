
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SportsApiResponse {
  fixtures: Array<{
    fixture: {
      id: number
      date: string
      status: { short: string }
    }
    league: {
      name: string
      country: string
    }
    teams: {
      home: { name: string }
      away: { name: string }
    }
    goals: {
      home: number | null
      away: number | null
    }
    score: {
      fulltime: { home: number | null; away: number | null }
    }
  }>
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting sports data scraping...')

    // Check scraping metadata and rate limits
    const { data: metadata } = await supabase
      .from('scraping_metadata')
      .select('*')
      .eq('source_name', 'api-football')
      .eq('is_active', true)
      .single()

    if (!metadata) {
      throw new Error('Scraping source not configured or inactive')
    }

    // Check if enough time has passed since last scrape
    const now = new Date()
    const lastScraped = metadata.last_scraped ? new Date(metadata.last_scraped) : new Date(0)
    const timeDiff = now.getTime() - lastScraped.getTime()
    const requiredInterval = metadata.scrape_interval_minutes * 60 * 1000

    if (timeDiff < requiredInterval) {
      console.log('Rate limit: Not enough time passed since last scrape')
      return new Response(
        JSON.stringify({ 
          message: 'Rate limited', 
          nextScrapeAt: new Date(lastScraped.getTime() + requiredInterval) 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429 
        }
      )
    }

    // Simulate API call with rate limiting (replace with real API)
    await new Promise(resolve => setTimeout(resolve, metadata.rate_limit_delay_ms))

    // Mock response - in production, replace with real API call
    const mockApiResponse: SportsApiResponse = {
      fixtures: [
        {
          fixture: {
            id: 1,
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            status: { short: 'NS' }
          },
          league: { name: 'Premier League', country: 'England' },
          teams: { home: { name: 'Arsenal' }, away: { name: 'Chelsea' } },
          goals: { home: null, away: null },
          score: { fulltime: { home: null, away: null } }
        },
        {
          fixture: {
            id: 2,
            date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
            status: { short: 'NS' }
          },
          league: { name: 'La Liga', country: 'Spain' },
          teams: { home: { name: 'Real Madrid' }, away: { name: 'Barcelona' } },
          goals: { home: null, away: null },
          score: { fulltime: { home: null, away: null } }
        }
      ]
    }

    // Process and store the data
    const matchesToInsert = mockApiResponse.fixtures.map(fixture => ({
      external_id: `api-football-${fixture.fixture.id}`,
      sport_type: 'football',
      league: fixture.league.name,
      home_team: fixture.teams.home.name,
      away_team: fixture.teams.away.name,
      match_date: fixture.fixture.date,
      status: fixture.fixture.status.short === 'NS' ? 'upcoming' : 
              fixture.fixture.status.short === 'FT' ? 'finished' : 'live',
      home_score: fixture.goals.home ?? 0,
      away_score: fixture.goals.away ?? 0,
      data_source: 'api-football',
      last_updated: now.toISOString()
    }))

    // Insert or update matches
    const { data: insertedMatches, error: insertError } = await supabase
      .from('sports_matches')
      .upsert(matchesToInsert, { 
        onConflict: 'external_id',
        ignoreDuplicates: false 
      })
      .select()

    if (insertError) {
      throw insertError
    }

    // Update scraping metadata
    await supabase
      .from('scraping_metadata')
      .update({
        last_scraped: now.toISOString(),
        success_count: metadata.success_count + 1,
        updated_at: now.toISOString()
      })
      .eq('source_name', 'api-football')

    console.log(`Successfully scraped and stored ${insertedMatches?.length || 0} matches`)

    return new Response(
      JSON.stringify({
        success: true,
        matches_processed: insertedMatches?.length || 0,
        timestamp: now.toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in sports data scraping:', error)

    // Update error count in metadata
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase
      .from('scraping_metadata')
      .update({
        error_count: supabase.sql`error_count + 1`,
        last_error: error.message,
        updated_at: new Date().toISOString()
      })
      .eq('source_name', 'api-football')

    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
