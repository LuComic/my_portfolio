import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const allowed = cookies.get('allowed');

	if (!allowed) {
		redirect(303, '../admin_pin/');
	}
};

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.delete('allowed', { path: '/' });
		redirect(303, '/');
	}
};
