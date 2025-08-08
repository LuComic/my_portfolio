import { supabase } from './supabase';

// Load projects
export async function loadProjects() {
	// Try to order by custom order_index first; fall back to created_at if column does not exist
	let { data, error } = await supabase
		.from('projects')
		.select('*')
		.order('order_index', { ascending: true })
		.order('created_at', { ascending: false });

	if (error) {
		console.warn('Ordering by order_index failed, falling back to created_at. Error:', error);
		const fallback = await supabase
			.from('projects')
			.select('*')
			.order('created_at', { ascending: false });
		if (fallback.error) {
			console.error('Error loading projects:', fallback.error);
			return [];
		}
		return fallback.data || [];
	}
	return data || [];
}

// Load coding
export async function loadCoding() {
	let { data, error } = await supabase
		.from('coding')
		.select('*')
		.order('order_index', { ascending: true })
		.order('created_at', { ascending: false });

	if (error) {
		console.warn(
			'Ordering coding by order_index failed, falling back to created_at. Error:',
			error
		);
		const fallback = await supabase
			.from('coding')
			.select('*')
			.order('created_at', { ascending: false });
		if (fallback.error) {
			console.error('Error loading coding:', fallback.error);
			return [];
		}
		return fallback.data || [];
	}
	return data || [];
}

// Load experiences
export async function loadExperiences() {
	let { data, error } = await supabase
		.from('experiences')
		.select('*')
		.order('order_index', { ascending: true })
		.order('created_at', { ascending: false });

	if (error) {
		console.warn(
			'Ordering experiences by order_index failed, falling back to created_at. Error:',
			error
		);
		const fallback = await supabase
			.from('experiences')
			.select('*')
			.order('created_at', { ascending: false });
		if (fallback.error) {
			console.error('Error loading experiences:', fallback.error);
			return [];
		}
		return fallback.data || [];
	}
	return data || [];
}

// Load socials
export async function loadSocials() {
	let { data, error } = await supabase
		.from('socials')
		.select('*')
		.order('order_index', { ascending: true })
		.order('created_at', { ascending: false });

	if (error) {
		console.warn(
			'Ordering socials by order_index failed, falling back to created_at. Error:',
			error
		);
		const fallback = await supabase
			.from('socials')
			.select('*')
			.order('created_at', { ascending: false });
		if (fallback.error) {
			console.error('Error loading socials:', fallback.error);
			return [];
		}
		return fallback.data || [];
	}
	return data || [];
}

// Load personal
export async function loadPersonal() {
	const { data, error } = await supabase
		.from('personal')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading personal:', error);
		return [];
	}
	return data || [];
}

// Load footer
export async function loadFooter() {
	const { data, error } = await supabase
		.from('footer')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading footer:', error);
		return [];
	}
	return data || [];
}
