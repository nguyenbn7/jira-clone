<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	const { size = 16, ...restProps }: SVGAttributes<SVGElement> & { size?: 16 | 24 } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {size} {size}"
	width={size}
	height={size}
	stroke-width="2"
	fill="currentColor"
	{...restProps}
	><path
		d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"
	></path></svg
>
