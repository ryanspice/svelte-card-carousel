<script lang="ts">
	import { scale } from 'svelte/transition';

	import Label from './svg/Label.svelte';
	import LearnMore from './svg/LearnMore.svelte';

	import type { CardData } from '../types.ts';

	export let card: CardData;

	let showVideo = false;
	let exampleVideoSrc =
		'https://www.shutterstock.com/shutterstock/videos/1071485350/preview/stock-footage-senior-african-american-couple-walking-and-holding-hands-at-the-beach-healthy-outdoor-leisure-time.webm';
</script>

<div
	role="button"
	aria-label={card.title}
	tabindex="0"
	class="card"
	in:scale={{ duration: 300, start: 1 }}
	on:mouseenter={() => (showVideo = true)}
	on:mouseleave={() => (showVideo = false)}
>
	{#if showVideo}
		<video tabindex="-1" autoplay loop muted playsinline>
			<source
				tabindex="-1"
				src={card.videoSrc || exampleVideoSrc}
				type="video/mp4"
				aria-label="Video Presentation"
			/>
		</video>
	{:else}
		<img
			tabindex="-1"
			src={card.base64Image}
			alt={card.title}
			loading="lazy"
			aria-label={card.title}
		/>
	{/if}

	<div class="card-content" tabindex="-1">
		<h2 tabindex="-1">{card.title}</h2>
		<div tabindex="-1" class="label">
			<Label />
			{card.label}
		</div>
		<p tabindex="-1">
			{card.paragraph}
		</p>
		<button
			tabindex="-1"
			aria-label="Learn More"
			on:click={() => {
				window.open(card.buttonLink, '_blank');
			}}
		>
			{card.buttonText}
			<LearnMore />
		</button>
	</div>
</div>

<style lang="scss">
	$card-padding: 16px;
	$card-margin: 8px;
	$button-height: 36px;

	.card {
		position: relative;
		width: 300px;
		height: 425px;
		overflow: hidden;
		border-radius: 8px;
		transition: all 0.3s ease;
		margin-top: 1rem;
		margin-bottom: 1rem;

		&:hover {
			cursor: pointer;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			height: calc(425px + 1rem);
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		video,
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			min-width: 100%;
			min-height: 100%;
			transform: translate(-50%, -50%);
			object-fit: cover;
		}
		.card-content {
			position: absolute;
			padding: $card-padding;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			opacity: 0;
			transition: opacity 0.3s ease;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: $card-padding;
			box-sizing: border-box;

			&:hover {
				opacity: 1;
			}

			h2,
			p {
				text-align: center;
				white-space: normal;
				overflow-wrap: break-word;
				word-wrap: break-word;
			}

			h2 {
				margin-top: 16px;
				margin-bottom: 12px;
				font-size: 24px;
				font-weight: bold;
				color: white;
			}

			.label {
				text-transform: uppercase;
				color: white;
				display: flex;
				align-items: center;
				padding: 8px 0;
			}

			p,
			button {
				margin: $card-margin;
				width: calc(100% - #{2 * $card-margin});
				color: white;
			}

			button {
				margin: $card-margin;
				width: calc(100% - #{2 * $card-margin});
				height: $button-height;
				background-color: white;
				color: black;
				border: none;
				border-radius: 4px;
				box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
					0px 1px 3px 0px rgba(0, 0, 0, 0.12);
				font-size: 14px;
				font-weight: 500;
				display: flex;
				align-items: center;
				justify-content: center;
				&:hover {
					color: black;
					cursor: pointer;
				}
			}

			@media (max-width: 768px) {
				opacity: 1; // Show the hover state by default on mobile

				h2 {
					color: black;
				}

				.label {
					display: none;
				}

				button {
					background-color: yellow;
					color: black;
				}
			}
		}

		@media (max-width: 768px) {
			img,
			video {
				position: relative;
				top: 111px;
				z-index: 1;
				width: 100%;
				left: 150px;
				min-height: 114px;
				min-width: 92%;
				max-height: 197px;
				max-width: 80%;
				border-radius: 8px !important;
				object-fit: cover;
				cursor: pointer;
				height: 1000px; // CHANGE

				&:hover {
					cursor: pointer;
					height: 1000px; // CHANGE
				}
			}
			.card-content {
				top: 190px;
				background: white;
				> p {
					color: black;
				}
			}
		}
	}

	@media (max-width: 768px) {
		.card {
			background: white;
			box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.375) !important;
			margin-top: 1rem !important;
			margin-bottom: 1rem !important;
			height: calc(425px + 1rem) !important;
		}
	}
</style>
