<script lang="ts">
	import Loader from '@lucide/svelte/icons/loader';
	import LogOut from '@lucide/svelte/icons/log-out';

	import { createGetCurrentClient, createLogoutClient } from '$features/auth/api';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
		Separator
	} from '$lib/components/ui/dropdown-menu';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';

	interface Props {}

	let {}: Props = $props();

	const logoutClient = createLogoutClient();

	const getCurrentClient = createGetCurrentClient();

	const user = $derived($getCurrentClient.data);
</script>

{#if $getCurrentClient.isLoading}
	<div
		class="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300"
	>
		<Loader size={16} class="animate-spin text-muted-foreground" />
	</div>
{:else if user}
	{@const { email, name } = user}
	{@const avatarFallback = name
		? name.charAt(0).toUpperCase()
		: (email.charAt(0).toUpperCase() ?? 'U')}
	<DropdownMenu>
		<DropdownMenuTrigger class="outline-none relative">
			<Avatar class="size-10 hover:opacity-75 transition border border-neutral-300">
				<AvatarFallback
					class="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center"
				>
					{avatarFallback}
				</AvatarFallback>
			</Avatar>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end" side="bottom" class="w-60" sideOffset={10}>
			<div class="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
				<Avatar class="size-[52px] hover:opacity-75 transition border border-neutral-300">
					<AvatarFallback
						class="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center"
					>
						{avatarFallback}
					</AvatarFallback>
				</Avatar>

				<div class="flex flex-col items-center justify-center">
					<p class="text-sm font-medium text-neutral-900">{user.name}</p>
					<p class="text-xs text-neutral-500">{user.email}</p>
				</div>
			</div>

			<Separator class="mb-1" />

			<DropdownMenuItem
				class="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
				onclick={() => $logoutClient.mutate()}
			>
				<LogOut class="size-4 mr-2" />
				Log out
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
{/if}
