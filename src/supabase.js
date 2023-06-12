
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://amtrsziwngrojomfashv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdHJzeml3bmdyb2pvbWZhc2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyNDQ1NTksImV4cCI6MjAwMTgyMDU1OX0.I90RsAGxeA9c_J-iBChUjYUIih9zke0uDrCpJbPrt_k"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase