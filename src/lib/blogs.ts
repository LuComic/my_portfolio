interface qport {
	intro: string;
	idea: string;
	process: string[];
	why: string;
	techStack: string[];
	features: Record<string, string>[];
}

interface blogPost {
	id: number;
	type: 'qport' | 'personal';
	updateType?: 'Bug' | 'Feature' | 'Progress';
	title: string;
	date: string;
	version?: string;
	content?: string;
	contentAd1?: string;
	contentAd2?: string;
	contentAd3?: string;
	contentAd4?: string;
	codeAd1?: string;
	codeAd2?: string;
	codeAd3?: string;
	codeAd4?: string;
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
	],
	techStack: [
		'Frontend - Sveltekit',
		'Deployment - Vercel',
		'Auth - Supabase?',
		'Storage - Supabase?',
		'Payments - Stripe',
		'Other - unknown'
	]
};

export const blogs: blogPost[] = [
	{
		id: 1,
		type: 'qport',
		updateType: 'Progress',
		title: 'First qport Progress Report',
		date: '06.09.2025',
		version: '0.1.0',
		content: `I'm gladly announcing this as the first progress report of qport. As of 6th September, qport has just the barebones frontend.

The pages we currently have are: Homepage, partial Account page, Sign in page, Template browsing page and Setup page (includes template picking and customising it).

For themes we thought about using self made custom ones, but for simplicity opted for Skeleton UI's themes. So far happy with the progress, since the main pages are done.

More pages to develop are: finish the Account page, Payment page, user's edit page and maybe some niche pages (error pages etc). Backend still isn't being developed, which is partially why the Payment and user's edit page haven't been made yet.`
	},
	{
		id: 2,
		type: 'personal',
		title: 'Why I Prefer Svelte Over React',
		date: '06.09.2025',
		contentAd1: `Since React has become somewhat of a standard in the Javascript libraries, many of you may wonder why I prefer Svelte more. For me, there are quite a few reasons for this, but all in all, it's just personal preference. Also, for some of the examples and information AI was used, since it's been some time since I used React.

1. Nested layouts

Even though Next.js does provide better nesting that's quite similar to SvelteKit's, I still find the vanilla experience on Svelte better. Being able to create these simple layouts, like the one below, just makes creating unique layouts a lot easier and faster.`,
		codeAd1: `
<script lang="ts">
	...import necessary things

	let { children } = $props();
</script>

<Header />
{@render children()}
`,
		contentAd2: `
2. Passing props

This is one of the things that when I saw it in Svelte, I fell in love with it. The simple usage of Svelte 5's $props() makes passing values in and out of the components very quick and easy. Also, integration with Typescript is just amazing.`,
		codeAd2: `
React
type Props = { apple: string };

export default function MyComponent({ apple }: Props) {
	return <p>{apple}</p>;
}

Svelte
<script lang="ts">
	const { apple }: { apple: string } = $props();
</script>

<p>{apple}</p>
		`,
		contentAd3: `In Svelte, you can literally define the type in one line, but if you'd like you could also create a type or interface and use that instead, if you're looking for flexibility.

3. The HTML helpers in Svelte

In Svelte you have a variety of helpers that can help you create conditional elements, looping over elements, etc., much simpler than using plain JS. For example, you have {#if} blocks for conditional rendering, {#each} for looping instead of map(), {#snippet} for reusable HTML and more.

4. Syntax

This is mainly just personal preference and depends on how long you've been using React and more, but I just like the familiar and easy to read syntax of Svelte a lot more than React's. Instead of creating functions for components and returning the HTML, Svelte divides the page into Script, HTML and Style - like uniting vanilla web development. This just looks more organized in my opinion and makes dealing with either the Script or HTML separately much more comfortable.

5. Speed?

While from a speed and performance perspective Svelte does have an edge, with smaller bundles, compiling at build time and more, it often also comes down to how well the code is written. Even if you have the fastest car, if you're a bad driver you're not getting far. Also, for large scale applications React is better, thanks to server components, concurrent rendering, Suspense, streaming SSR etc. In short, for simple and medium sites, with good code, Svelte is faster, but for larger scale applications using React is better.
		`,
		contentAd4: `So, all in all, as said before, it does come down to preference. Because of the reasons above, I do personally prefer Svelte and hope that in the future we can see it more on the job market.`
	}
];
