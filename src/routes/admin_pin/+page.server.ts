import type { PageServerLoad, Actions } from './$types';
import { ADMIN_PASS } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ cookies }) => {
	const allowed = cookies.get('allowed');
	if (allowed) {
		redirect(303, '../edit_portfolio');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const inputPass = data.get('admin_pass');

		if (inputPass === ADMIN_PASS) {
			cookies.set('allowed', 'true', {
				path: '/',
				httpOnly: true,
				secure: false, // Set to true in production with HTTPS
				sameSite: 'lax'
			});
			redirect(303, '../edit_portfolio');
		}

		return fail(403, {
			incorrect: true
		});
	}
};
