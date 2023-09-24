<script lang="ts">
	export let totalItems: Number = 0;
	export let currentIndex = 0;
	export let setCurrentIndex: (index: number) => void = () => {};
</script>

<div class="dots-container" role="navigation" aria-label="Carousel Pagination">
	{#each Array(totalItems) as _, i}
		<div
			class="dot {currentIndex === i ? 'active' : ''}"
			role="button"
			aria-label={`Go to slide ${i + 1}`}
			tabindex="0"
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					setCurrentIndex(i);
				}
			}}
			on:click={() => setCurrentIndex(i)}
		/>
	{/each}
</div>

<style>
	.dots-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}
	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: gray;
		margin: 0 5px;
	}
	.dot.active {
		background: blue;
	}
</style>
