import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://slizvrcwdggjewufuvif.supabase.co";
const supabaseAnnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsaXp2cmN3ZGdnamV3dWZ1dmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MzAxNzMsImV4cCI6MjAzNTUwNjE3M30.N6ynBPSLRjqKruxpm0FZAUgOuDwpx0gRD5-BwJYsXoE";

export const supabase = createClient(supabaseUrl,supabaseAnnonKey)