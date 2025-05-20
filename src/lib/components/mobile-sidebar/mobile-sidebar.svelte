<script lang="ts">
	import MenuIcon from '@lucide/svelte/icons/menu';

	import { Sidebar } from '$lib/components/sidebar';

	import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
</script>

<Sheet>
	<SheetTrigger>
		{#snippet child({ props })}
			<Button {...props} variant="secondary" class="lg:hidden">
				<MenuIcon class="size-4 text-neutral-500" />
			</Button>
		{/snippet}
	</SheetTrigger>
	<SheetContent side="left" class="p-0" overlay={false}>
		<span class="sr-only">
			<SheetTitle>Mobile Navigation</SheetTitle>
		</span>
		<Sidebar />
	</SheetContent>
</Sheet>
