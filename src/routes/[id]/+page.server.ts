import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) {
		return { project: null, requestedId: null, canonicalPath: null };
	}

	const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();

	if (error) {
		console.error('Error loading project for page', id, error.message);
		return { project: null, requestedId: id, canonicalPath: null };
	}

	return {
		project: data,
		requestedId: id,
		canonicalPath: data ? `/${data.id}` : null
	};
};
