<script lang="ts">
	import type { PageData } from './$types';

	import { Metadata } from '$lib/components/metadata';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();
</script>

<Metadata title="Dashboard" />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
