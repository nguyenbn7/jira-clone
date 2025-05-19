<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';

	interface Props {
		title?: string;
	}

	// TODO: add more field

	const { title }: Props = $props();
</script>

<svelte:head>
	<title>{title ? `${title} - ${PUBLIC_APP_NAME}` : `${PUBLIC_APP_NAME}`}</title>
</svelte:head>
