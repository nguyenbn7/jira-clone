<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	const { size = 16, ...restProps }: SVGAttributes<SVGElement> & { size?: 16 | 24 } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {size} {size}"
	fill="currentColor"
	width={size}
	height={size}
	stroke-width="2"
	{...restProps}
	><path
		d="M6.906.384a1.75 1.75 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019a1.75 1.75 0 0 1-1.75 1.75h-2.5a.75.75 0 0 1-.75-.75V8.72H6v5.25a.75.75 0 0 1-.75.75h-2.5A1.75 1.75 0 0 1 1 12.97V5.95c0-.531.242-1.034.657-1.366l5.249-4.2Z"
	></path></svg
>
