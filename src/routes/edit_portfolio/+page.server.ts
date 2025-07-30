import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ cookies }) => {
	const allowed = cookies.get('allowed');

	if (!allowed) {
		error(403, 'Forbidden');
	}
};

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.delete('allowed', { path: '/' });
		redirect(303, '/');
	}
};
