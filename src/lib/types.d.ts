export interface project_type {
	id: number;
	name: string;
	website: string;
	description: string;
	specifications: string;
	images: string[];
}

export interface coding_type {
	id: number;
	description: string;
}

export interface experiences_type {
	id: number;
	description: string;
}

export interface social_type {
	id: number;
	platform: string;
	social_name: string;
	social_url: string;
}

export interface personal_type {
	id: number;
	bio_text: string;
}

export interface footer_type {
	id: number;
	footer_text: string;
}
