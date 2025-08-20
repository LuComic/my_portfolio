import type { RequestHandler } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const POST: RequestHandler = async ({ cookies, request }) => {
	// Basic guard with your existing cookie gate
	if (!cookies.get('allowed')) {
		return new Response('Forbidden', { status: 403 });
	}

	const form = await request.formData();
	const file = form.get('file');
	if (!(file instanceof File)) {
		return new Response('No file', { status: 400 });
	}

	const ext = file.name.split('.').pop() || 'bin';
	const fileName = `${crypto.randomUUID()}.${ext}`;
	const { error } = await supabaseAdmin.storage.from('images').upload(fileName, file);
	if (error) return new Response(error.message, { status: 400 });

	const { data } = supabaseAdmin.storage.from('images').getPublicUrl(fileName);
	return Response.json({ publicUrl: data.publicUrl });
};
