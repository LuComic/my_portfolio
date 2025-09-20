import type {
	project_type,
	footer_type,
	social_type,
	personal_type,
	experiences_type,
	coding_type
} from './types';

export const projects: project_type[] = [
	{
		id: 3,
		name: 'noorteKunst',
		description:
			"noorteKunst is a web gallery combined with social media aspects for young starting artists to start or boost their art jounrey. A simple way to stand out (which is basically impossible in social media), grow your portfolio and find fans. Also if you're interested in art, noorteKunst is a good way to find young artists and do things that you can do on every social media platform - like posts, save them and follow artists. (site is right now only in estonian)",
		website: 'https://noortekunst.ee',
		specifications: 'Frontend - HTML, CSS, JS',
		images: ['pictures/projects/nt1.png', 'pictures/projects/nt2.png', 'pictures/projects/nt3.png']
	},
	{
		id: 4,
		name: 'StreamList',
		description:
			"A site similar to Letterboxd, but with a new intuitive UI and a more userfriendly alternative, with analytics and more. Add movies AND SHOWS (which isn't possible in Letterboxd) to either 'Watched' or 'Watchlist', rate them, leave an overview etc. You can even create your own groups which you can share with friends, to share what each of you likes.",
		website: 'Private repo',
		specifications: 'Frontend - React + tailwind',
		images: ['pictures/projects/sl1.jpg', 'pictures/projects/sl2.jpg', 'pictures/projects/sl3.jpg']
	},
	{
		id: 6,
		name: 'termnotes',
		description:
			"A simple, elegant and yet fast terminal based note taking app! It has all the features you might need, like markdown, copying notes, moving them between folders, dailynotes etc. If you need something more, then the code is open source and you can add as many features as you'd like, since the code is written is basic python!",
		website: 'https://github.com/LuComic/terminalnotes',
		specifications: 'Python',
		images: ['pictures/projects/tn1.png', 'pictures/projects/tn2.png', 'pictures/projects/tn3.png']
	},
	{
		id: 1,
		name: 'TerminalPort',
		description:
			"A very basic 30min project, that is a portfolio about me! It has nice ASCII art and options to choose from, like 'About', 'Programming', 'Projects' and 'Socials'.",
		website: 'no repo',
		specifications: 'Node js',
		images: ['pictures/projects/tp1.png', 'pictures/projects/tp2.png', 'pictures/projects/tp3.png']
	},
	{
		id: 2,
		name: 'CatMemeGen',
		description:
			'First ever project of any kind. Made it at as a funny cat meme generator, to introduce myself to HTML, CSS and Javascript. Later changed to a gift to the Nike team I was working for.',
		website: 'https://github.com/LuComic/Cat-memes',
		specifications: 'HTML, CSS, JS',
		images: ['pictures/projects/cm.png']
	},
	{
		id: 5,
		name: 'NiceUtil',
		description:
			'A vibe coded project since I needed an utility like this. NiceUtil combines the visual aspect of applications like Spaceman, Waybar etc, to show spaces in your menubar, and applications that let you save your Workspaces/Virtual Desktops. More info in the Github repo.',
		website: 'https://github.com/LuComic/NiceUtil',
		specifications: 'Swift',
		images: ['pictures/projects/nu1.png', 'pictures/projects/nu2.png', 'pictures/projects/nu3.png']
	}
];

export const socials: social_type[] = [
	{
		id: 2,
		platform: 'Instagram',
		social_url: 'https://www.instagram.com/lucomic/',
		social_name: 'LuComic'
	},
	{
		id: 3,
		platform: 'Github',
		social_url: 'https://github.com/LuComic',
		social_name: 'LuComic'
	},
	{
		id: 4,
		platform: 'Facebook',
		social_url:
			'https://www.facebook.com/people/Lukas-J%C3%A4%C3%A4ger/pfbid0K4Vq2AzoRtYnsaYsk2T4nXLaJ8htxQLXEN25VH1VBV7gVWf7SiZinHZNuGo7ExAVl/',
		social_name: 'Lukas Jääger'
	}
];

export const footer: footer_type[] = [
	{
		id: 1,
		footer_text:
			'If you have any questions or want to contact me then you can via any of the socials or lukasjaager@gmail.com'
	}
];

export const bio: personal_type[] = [
	{
		id: 1,
		bio_text:
			'High school student, learning web dev in my own time and python in school. I really like music, I do track and field and right now program in my free time.'
	}
];

export const experiences: experiences_type[] = [
	{
		id: 1,
		description: 'other work: summer job at Nike (2024); summer job at Mikkeller (2025).'
	},
	{
		id: 2,
		description:
			'coding: currently as a hobby, though noortekunst was for a student business, making it a bigger project.'
	}
];

export const coding: coding_type[] = [
	{
		id: 1,
		description: 'Right now learning Svelte, which I like the most.'
	},
	{
		id: 2,
		description: 'Vanilla HTML, CSS and Javascript as the founding blocks of web development.'
	},
	{
		id: 3,
		description: 'React basics to know it and start learning tailwind.'
	},
	{
		id: 4,
		description: 'Typescript in React and Svelte.'
	},
	{
		id: 5,
		description: 'Python in school.'
	}
];
