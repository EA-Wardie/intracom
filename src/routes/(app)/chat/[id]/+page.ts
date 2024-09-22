import type { PageLoad } from './$types';

export const load: PageLoad = function ({ params }) {
	return {
		title: 'Chat',
		id: params.id,
	};
};
