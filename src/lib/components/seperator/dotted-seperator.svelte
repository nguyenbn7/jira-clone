<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		color?: string;
		height?: string;
		dotSize?: string;
		gapSize?: string;
		direction?: 'horizontal' | 'vertical';
	}

	let {
		class: className,
		color = '#d4d4d8',
		height = '2px',
		dotSize = '2px',
		gapSize = '6px',
		direction = 'horizontal'
	}: Props = $props();

	const isHorizontal = direction === 'horizontal';
</script>

<div
	class={cn(
		isHorizontal ? 'w-full flex items-center' : 'h-full flex flex-col items-center',
		className
	)}
>
	<div
		class={isHorizontal ? 'grow' : 'grow-0'}
		style:width={isHorizontal ? '100%' : height}
		style:height={isHorizontal ? height : '100%'}
		style:background-image={`radial-gradient(circle, ${color} 25%, transparent 25%)`}
		style:background-size={isHorizontal
			? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
			: `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`}
		style:background-repeat={isHorizontal ? 'repeat-x' : 'repeat-y'}
		style:background-position={'center'}
	></div>
</div>
