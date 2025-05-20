<script lang="ts">
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import UsersIcon from '@lucide/svelte/icons/users';

	import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from '$lib/components/icons';

	import { cn } from '$lib/utils';
	import { page } from '$app/state';

	const routes = [
		{
			label: 'Home',
			href: '/',
			icon: GoHome,
			activeIcon: GoHomeFill
		},
		{
			label: 'My Tasks',
			href: '/tasks',
			icon: GoCheckCircle,
			activeIcon: GoCheckCircleFill
		},
		{
			label: 'Settings',
			href: '/settings',
			icon: SettingsIcon,
			activeIcon: SettingsIcon
		},
		{
			label: 'Members',
			href: '/members',
			icon: UsersIcon,
			activeIcon: UsersIcon
		}
	];

	$inspect(page.url.pathname);
</script>

<div class="flex flex-col">
	{#each routes as route (route.href)}
		{@const isActive = route.href === page.url.pathname}
		{@const Icon = isActive ? route.activeIcon : route.icon}

		<a href={route.href}>
			<div
				class={cn(
					'flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500',
					isActive && 'bg-white shadow hover:opacity-100 text-primary'
				)}
			>
				<Icon class="size-5 text-neutral-500" />
				{route.label}
			</div>
		</a>
	{/each}
</div>
