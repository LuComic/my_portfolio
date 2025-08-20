import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = ({ cookies }) => {
	const allowed = cookies.get('allowed');

	if (!allowed) {
		redirect(303, '../admin_pin/');
	}
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('allowed', { path: '/' });
		redirect(303, '/');
	},

	delete: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const table = String(form.get('table'));
		const id = Number(form.get('id'));
		if (!table || !id) return fail(400, { message: 'Missing table or id' });
		const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	reorder: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const table = String(form.get('table')) as 'projects' | 'coding' | 'experiences' | 'socials';
		const itemsRaw = String(form.get('items') || '[]');
		let items: Array<{ id: number }> = [];
		try {
			items = JSON.parse(itemsRaw);
		} catch (_) {
			return fail(400, { message: 'Invalid items payload' });
		}
		const updates = items.map((item, idx) =>
			supabaseAdmin.from(table).update({ order_index: idx }).eq('id', item.id)
		);
		const results = await Promise.all(updates);
		const firstErr = results.find((r) => r.error)?.error;
		if (firstErr) return fail(400, { message: firstErr.message });
		return { success: true };
	},

	addProject: async ({ cookies, request }) => {
		try {
			if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
			const form = await request.formData();
			const name = String(form.get('name') || '').trim();
			const description = String(form.get('description') || '').trim();
			const website = String(form.get('website') || '').trim();
			const specifications = String(form.get('specifications') || '').trim();
			const imageUrlsRaw = String(form.get('imageUrls') || '[]');
			let imageUrls: string[] = [];
			try {
				imageUrls = JSON.parse(imageUrlsRaw);
			} catch (_) {
				imageUrls = [];
			}
			if (!name || !description || !website || !specifications) {
				return fail(400, { message: 'Missing fields' });
			}
			let nextOrderIndex: number | null = null;
			const { data: maxOrder, error: maxErr } = await supabaseAdmin
				.from('projects')
				.select('order_index')
				.order('order_index', { ascending: false })
				.limit(1)
				.maybeSingle();
			if (!maxErr && maxOrder && typeof maxOrder.order_index === 'number') {
				nextOrderIndex = maxOrder.order_index + 1;
			}
			const insertBody: Record<string, unknown> = {
				name,
				description,
				website,
				specifications,
				images: imageUrls
			};
			if (nextOrderIndex !== null) insertBody.order_index = nextOrderIndex;
			const { error } = await supabaseAdmin.from('projects').insert([insertBody]);
			if (error) return fail(400, { message: error.message, details: error.details });
			return { success: true };
		} catch (e: any) {
			console.error('addProject failed:', e);
			return fail(500, { message: e?.message || 'Internal Error' });
		}
	},

	addCoding: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const description = String(form.get('description') || '').trim();
		if (!description) return fail(400, { message: 'Missing description' });
		let nextOrderIndex: number | null = null;
		const { data: maxOrder } = await supabaseAdmin
			.from('coding')
			.select('order_index')
			.order('order_index', { ascending: false })
			.limit(1)
			.maybeSingle();
		if (maxOrder && typeof maxOrder.order_index === 'number')
			nextOrderIndex = maxOrder.order_index + 1;
		const { error } = await supabaseAdmin
			.from('coding')
			.insert([
				{ description, ...(nextOrderIndex !== null ? { order_index: nextOrderIndex } : {}) }
			]);
		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	addExperience: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const description = String(form.get('description') || '').trim();
		if (!description) return fail(400, { message: 'Missing description' });
		let nextOrderIndex: number | null = null;
		const { data: maxOrder } = await supabaseAdmin
			.from('experiences')
			.select('order_index')
			.order('order_index', { ascending: false })
			.limit(1)
			.maybeSingle();
		if (maxOrder && typeof maxOrder.order_index === 'number')
			nextOrderIndex = maxOrder.order_index + 1;
		const { error } = await supabaseAdmin
			.from('experiences')
			.insert([
				{ description, ...(nextOrderIndex !== null ? { order_index: nextOrderIndex } : {}) }
			]);
		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	addSocial: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const platform = String(form.get('platform') || '').trim();
		const social_url = String(form.get('social_url') || '').trim();
		const social_name = String(form.get('social_name') || '').trim();
		if (!platform || !social_url || !social_name) return fail(400, { message: 'Missing fields' });
		let nextOrderIndex: number | null = null;
		const { data: maxOrder } = await supabaseAdmin
			.from('socials')
			.select('order_index')
			.order('order_index', { ascending: false })
			.limit(1)
			.maybeSingle();
		if (maxOrder && typeof maxOrder.order_index === 'number')
			nextOrderIndex = maxOrder.order_index + 1;
		const { error } = await supabaseAdmin.from('socials').insert([
			{
				platform,
				social_url,
				social_name,
				...(nextOrderIndex !== null ? { order_index: nextOrderIndex } : {})
			}
		]);
		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	updateProject: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const id = Number(form.get('id'));
		const name = String(form.get('name') || '').trim();
		const description = String(form.get('description') || '').trim();
		const website = String(form.get('website') || '').trim();
		const specifications = String(form.get('specifications') || '').trim();
		const imageUrlsRaw = String(form.get('imageUrls') || '[]');
		let images: string[] = [];
		try {
			images = JSON.parse(imageUrlsRaw);
		} catch (_) {
			images = [];
		}
		if (!id || !name || !description || !website || !specifications) {
			return fail(400, { message: 'Missing fields' });
		}
		const { error } = await supabaseAdmin
			.from('projects')
			.update({ name, description, website, specifications, images })
			.eq('id', id);
		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	updateOther: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const table = String(form.get('table')) as 'coding' | 'experiences' | 'personal' | 'footer';
		const id = Number(form.get('id') || 0);
		const description = String(form.get('description') || '').trim();
		if (!table || !description) return fail(400, { message: 'Missing fields' });
		if (table === 'personal') {
			if (id) {
				const { error } = await supabaseAdmin
					.from('personal')
					.update({ bio_text: description })
					.eq('id', id);
				if (error) return fail(400, { message: error.message });
			} else {
				const { error } = await supabaseAdmin.from('personal').insert([{ bio_text: description }]);
				if (error) return fail(400, { message: error.message });
			}
		} else if (table === 'footer') {
			if (id) {
				const { error } = await supabaseAdmin
					.from('footer')
					.update({ footer_text: description })
					.eq('id', id);
				if (error) return fail(400, { message: error.message });
			} else {
				const { error } = await supabaseAdmin.from('footer').insert([{ footer_text: description }]);
				if (error) return fail(400, { message: error.message });
			}
		} else {
			const { error } = await supabaseAdmin.from(table).update({ description }).eq('id', id);
			if (error) return fail(400, { message: error.message });
		}
		return { success: true };
	},

	updateSocial: async ({ cookies, request }) => {
		if (!cookies.get('allowed')) redirect(303, '../admin_pin/');
		const form = await request.formData();
		const id = Number(form.get('id'));
		const platform = String(form.get('platform') || '').trim();
		const social_url = String(form.get('social_url') || '').trim();
		const social_name = String(form.get('social_name') || '').trim();
		if (!id || !platform || !social_url || !social_name)
			return fail(400, { message: 'Missing fields' });
		const { error } = await supabaseAdmin
			.from('socials')
			.update({ platform, social_url, social_name })
			.eq('id', id);
		if (error) return fail(400, { message: error.message });
		return { success: true };
	}
};
