<script lang="ts">
	import DoubleChevron from './svg/DoubleChevron.svelte';

	import type { Direction } from '../types.ts';

	export let direction: Direction;
	export let click = function (e: Event) {};

	// Handle click event
	function handleClick(e: MouseEvent) {
		click(e);
	}
</script>

<button
	class={`arrow-overlay ${direction}`}
	on:click={handleClick}
	aria-label={`Scroll ${direction}`}
>
	<DoubleChevron {direction} />
</button>

<style lang="scss">
	.arrow-overlay {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		width: 47px;
		height: 85px;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		padding: 0;
		cursor: pointer;

		&.left {
			left: 0;
			border-top-right-radius: 75px;
			border-bottom-right-radius: 75px;
		}

		&.right {
			right: 0;
			border-top-left-radius: 75px;
			border-bottom-left-radius: 75px;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
		}
	}
</style>
