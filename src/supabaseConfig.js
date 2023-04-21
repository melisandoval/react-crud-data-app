import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ftemmdtxkoqmukgdfmhx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0ZW1tZHR4a29xbXVrZ2RmbWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwMDA5OTYsImV4cCI6MTk5NzU3Njk5Nn0.6c0uTA1PKyvQQP0pojGYWE1c_-0KtmrwXossPIKyoBw";

export const supabase = createClient(supabaseUrl, supabaseKey);
