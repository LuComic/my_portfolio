export interface qport {
	intro: string;
	idea: string;
	process: string[];
	why: string;
	features: Record<string, string>[];
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
