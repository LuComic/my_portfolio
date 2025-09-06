interface qport {
	intro: string;
	idea: string;
	process: string[];
	why: string;
	features: Record<string, string>[];
}

interface blogPost {
	id: number;
	type: 'qport' | 'personal';
	updateType?: 'Bug' | 'Feature' | 'Progress';
	title: string;
	date: string;
	content: string;
}

export const qport_info: qport = {
	intro:
		"I started making qport right after creating the very portfolio, on which this site is based on! It made me realise how simple, yet informational a simple portfolio can be and how it can help students, freelancers and other peolple with quick life styles, to create themselves a personal web page. But that's just the beginning...",
	idea: "qport's focus is on simplicity and speed, so no drag-and-drop, resizable boxes,  no endless options. The process would just be:",
	process: [
		'Pick a template (formal, creative, or mixed)',
		'Choose a theme and font',
		'Edit the text fields',
		"Done -> your portfolio is live at example.com/username. You'd also get a simple example.com/username/edit page to update the content later. Because it's so stripped down, the price would also be cheap (€2-5/month) compared to bigger site builders."
	],
	why: 'Most portfolio/site builders feel bloated, complex, or too expensive for someone who just wants a quick personal page. qport is aiming at students, job seekers, or freelancers who just need something live fast.',
	features: [
		{ 'Theme and font selection': 'basic customisation of the page' },
		{ 'Edit page for each user': 'Modify the data as you go' },
		{ '*Scanning a CV and automatically filling the fields*': 'Maybe' },
		{
			'Plugin system':
				'since the page is so bare bones, implementing a plugin system would be useful'
		}
	]
};

export const blogs: blogPost[] = [
	{
		id: 1,
		type: 'qport',
		updateType: 'Progress',
		title: 'First qport Progress Report',
		date: '06.09.2025',
		content: `I'm gladly announcing this as the first progress report of qport. As of 6th September, qport has just the barebones frontend.

The pages we currently have are: Homepage, partial Account page, Sign in page, Template browsing page and Setup page (includes template picking and customising it).

For themes we thought about using self made custom ones, but for simplicity opted for Skeleton UI's themes. So far happy with the progress, since the main pages are done.

More pages to develop are: finish the Account page, Payment page, user's edit page and maybe some niche pages (error pages etc). Backend still isn't being developed, which is partially why the Payment and user's edit page haven't been made yet.`
	}
];
