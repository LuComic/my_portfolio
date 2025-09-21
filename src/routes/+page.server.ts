import type { PageServerLoad } from './$types';

import {
  loadCoding,
  loadExperiences,
  loadFooter,
  loadPersonal,
  loadProjects,
  loadSocials
} from '$lib/supabase_data.svelte';


export const load: PageServerLoad = async () => {
  const [projects, coding, experiences, socials, personal, footer] = await Promise.all([
    loadProjects(),
    loadCoding(),
    loadExperiences(),
    loadSocials(),
    loadPersonal(),
    loadFooter()
  ])

  return {
    projects, coding, experiences, socials, personal, footer
  };
};
