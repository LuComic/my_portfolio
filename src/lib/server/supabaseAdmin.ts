import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

// Debug once on server start (safe to keep in dev; remove in prod if noisy)
console.log(
	'[supabaseAdmin] URL present:',
	!!SUPABASE_URL,
	'SR key present:',
	!!SUPABASE_SERVICE_ROLE_KEY
);

export const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
