import { supabase } from './supabase';

// Load projects
export async function loadProjects() {
	const { data, error } = await supabase
		.from('projects')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading projects:', error);
		return [];
	}
	return data || [];
}

// Load coding
export async function loadCoding() {
	const { data, error } = await supabase
		.from('coding')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading coding:', error);
		return [];
	}
	return data || [];
}

// Load experiences
export async function loadExperiences() {
	const { data, error } = await supabase
		.from('experiences')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading experiences:', error);
		return [];
	}
	return data || [];
}

// Load socials
export async function loadSocials() {
	const { data, error } = await supabase
		.from('socials')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading socials:', error);
		return [];
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
