-- Enable realtime updates for sports_matches table
ALTER TABLE public.sports_matches REPLICA IDENTITY FULL;

-- Safely add table to the realtime publication (ignore if already added)
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.sports_matches;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL;
  END;
END $$;