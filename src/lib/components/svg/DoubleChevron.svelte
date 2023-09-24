<script>
	export let direction = 'left';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="50"
	height="50"
	viewBox="0 0 50 50"
	class="chevron"
	aria-hidden="true"
>
	{#if direction === 'left'}
		<!-- Left Double Chevron SVG -->
		<polygon points="35,12.5 22.5,25 35,37.5 32.5,40 17.5,25 32.5,10" />
		<polygon points="25,12.5 12.5,25 25,37.5 22.5,40 7.5,25 22.5,10" />
	{:else if direction === 'right'}
		<!-- Right Double Chevron SVG -->
		<polygon points="15,12.5 27.5,25 15,37.5 17.5,40 32.5,25 17.5,10" />
		<polygon points="25,12.5 37.5,25 25,37.5 27.5,40 42.5,25 27.5,10" />
	{/if}
</svg>

<style>
	.chevron {
		transition: fill 0.3s ease;
		transform: scale(0.95);
		fill: white;
		width: 30px;
		height: 30px;
	}
</style>
