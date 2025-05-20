<script lang="ts">
	import { UserButton } from '$features/auth/components';

	import { MobileSidebar } from '$lib/components/mobile-sidebar';
</script>

<nav class="pt-4 px-6 flex items-center justify-between">
	<div class="flex-col hidden lg:flex">
		<h1 class="text-2xl font-semibold">Home</h1>
		<p class="text-muted-foreground">Monitor all of your projects and tasks here</p>
	</div>

	<MobileSidebar />

	<UserButton />
</nav>
