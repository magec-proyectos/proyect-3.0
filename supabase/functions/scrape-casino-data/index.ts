
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    console.log('Starting casino data scraping...')

    // Check scraping metadata for oddschecker
    const { data: metadata } = await supabase
      .from('scraping_metadata')
      .select('*')
      .eq('source_name', 'oddschecker')
      .eq('is_active', true)
      .single()

    if (!metadata) {
      throw new Error('Casino scraping source not configured or inactive')
    }

    // Rate limiting check
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

    // Apply rate limiting delay
    await new Promise(resolve => setTimeout(resolve, metadata.rate_limit_delay_ms))

    // Mock casino odds data - replace with real scraping
    const mockCasinoData = [
      {
        game_type: 'roulette',
        event_name: 'European Roulette',
        bookmaker: 'Casino A',
        odds_data: {
          red: 1.95,
          black: 1.95,
          green: 35.0,
          odd: 1.95,
          even: 1.95,
          first_dozen: 2.95,
          second_dozen: 2.95,
          third_dozen: 2.95
        },
        data_source: 'oddschecker'
      },
      {
        game_type: 'blackjack',
        event_name: 'Classic Blackjack',
        bookmaker: 'Casino B', 
        odds_data: {
          player_win: 1.95,
          dealer_win: 1.95,
          tie: 8.0,
          blackjack_bonus: 1.5
        },
        data_source: 'oddschecker'
      }
    ]

    // Insert casino odds data
    const { data: insertedOdds, error: insertError } = await supabase
      .from('casino_odds')
      .insert(mockCasinoData.map(item => ({
        ...item,
        scraped_at: now.toISOString()
      })))
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
      .eq('source_name', 'oddschecker')

    console.log(`Successfully scraped and stored ${insertedOdds?.length || 0} casino odds`)

    return new Response(
      JSON.stringify({
        success: true,
        odds_processed: insertedOdds?.length || 0,
        timestamp: now.toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in casino data scraping:', error)

    // Update error count
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase
      .from('scraping_metadata')
      .update({
        error_count: 1,
        last_error: error instanceof Error ? error.message : 'Unknown error',
        updated_at: new Date().toISOString()
      })
      .eq('source_name', 'oddschecker')

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
