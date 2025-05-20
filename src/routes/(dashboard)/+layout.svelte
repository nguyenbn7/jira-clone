<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { Navbar } from '$lib/components/navbar';
	import { Sidebar } from '$lib/components/sidebar';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: LayoutProps = $props();
</script>

<div class="min-h-screen">
	<div class="flex w-full h-full">
		<div class="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
			<Sidebar />
		</div>
		<div class="lg:pl-[264px] w-full">
			<div class="mx-auto max-w-screen-2xl h-full">
				<Navbar />
				<main class="h-full py-8 px-6 flex flex-col">
					{@render children()}
				</main>
			</div>
		</div>
	</div>
</div>
