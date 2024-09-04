import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://djkrednrazrikyosymbf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3JlZG5yYXpyaWt5b3N5bWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMzc3MTksImV4cCI6MjA0MDcxMzcxOX0.UOITXFyS4k9ralBVUtUASoK2hBo-enZOYrRRjX2Aq1U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
