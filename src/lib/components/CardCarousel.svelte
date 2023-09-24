<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import ImageCard from './ImageCard.svelte';
	import ArrowOverlay from './ArrowOverlay.svelte';
	import CarouselDots from './CarouselDots.svelte';

	import type { CardData } from '../types.ts';

	export let data: CardData[] = [];
	export let autoScroll = true; // Flag to enable/disable auto-scroll
	export let autoScrollSpeed = 1;
	export let autoScrollReset = true;
	// export let scrollSpeedDelay = 1000; // Delay before auto-scroll resumes after user interaction
	export let dragAcceleration = 1; // Acceleration factor for auto-scroll

	export let wrapLeft = true;
	export let wrapRight = true;

	let totalItems: Number;
	$: totalItems = data.length;

	let currentCardIndex = 0; // Add this line to keep track of the current card index
	let snapToCenter = false; // Flag to enable/disable snapping to center on mobile

	let scrollPosition = 0;
	let cardWidth = 316; // Assuming each card is 300px wide, adjust as needed
	let enableEasing = true; // Flag to enable/disable easing

	$: scrollSpeed = autoScrollSpeed;
	let scrollInterval: NodeJS.Timeout;
	let carousel: HTMLElement;

	let startX: number = 0; // Starting X-coordinate
	let scrollLeftStart: number = 0; // Starting scrollLeft value

	let isDown = false;

	// let draggedItem = null;

	// Handle drag start event
	// function handleDragStart(e, index) {
	// 	draggedItem = index;
	// }

	// Handle drag drop event
	// function handleDrop(e, index) {
	// 	[data[draggedItem], data[index]] = [data[index], data[draggedItem]];
	// 	draggedItem = null;
	// }

	// Handle mouse down event
	function handleMouseDown(e: MouseEvent) {
		startX = e.pageX;
		scrollLeftStart = carousel.scrollLeft;
		isDown = true;
	}

	// Handle mouse move event
	function handleMouseMove(e: MouseEvent) {
		if (!isDown) {
			return; // Skip if mouse is not down
		}
		const x = e.pageX - startX;
		const walk = x * dragAcceleration; // Scroll 3 pixels per pixel moved
		carousel.scrollLeft = scrollLeftStart - walk;
	}

	// Handle mouse up event
	function handleMouseUp(e: MouseEvent) {
		isDown = false;
		if (Math.abs(e.pageX - startX) < 5) {
			return; // Skip if mouse moved less than 5 pixels
		}

		startX = e.pageX;
		scrollPosition = carousel.scrollLeft;

		if (snapToCenter) {
			snapCardToCenter();
		}
	}

	// Handle mouse wheel and keyboard events
	function handleWheel(event: WheelEvent) {
		if (event.deltaY > 0) {
			slideCarousel('right');
		} else if (event.deltaY < 0) {
			slideCarousel('left');
		}
	}

	// Handle keyboard events
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			slideCarousel('right');
		} else if (event.key === 'ArrowLeft') {
			slideCarousel('left');
		}
	}

	// Snap the card to the center of the carousel
	function snapCardToCenter() {
		const centerPosition = carousel.clientWidth / 2;
		const closestCardIndex = Math.round(
			(carousel.scrollLeft + centerPosition - cardWidth / 2) / cardWidth
		);

		if (closestCardIndex >= 0 && closestCardIndex < data.length) {
			currentCardIndex = closestCardIndex;
			const newScrollPosition = closestCardIndex * cardWidth - centerPosition + cardWidth / 2;
			carousel.scrollLeft = newScrollPosition;
		}
	}

	// Update currentCardIndex
	function updateCurrentCardIndex() {
		const centerPosition = carousel.clientWidth / 2;
		const closestCardIndex = Math.round(
			(carousel.scrollLeft + centerPosition - cardWidth / 2) / cardWidth
		);

		if (closestCardIndex >= 0 && closestCardIndex < data.length) {
			currentCardIndex = closestCardIndex;
		}
	}

	// Slide carousel left or right
	function slideCarousel(direction: string) {
		let width = cardWidth;
		let delta = direction === 'left' ? -width : width;
		let newScrollPosition = carousel.scrollLeft + delta;
		let snap = false;

		// delay auto-scroll after user interaction
		scrollSpeed = -35;
		// Loop back logic
		if (newScrollPosition < 0) {
			if (carousel.scrollLeft > 0) {
				newScrollPosition = 0;
				updateCurrentCardIndex();
			} else if (carousel.scrollLeft < 1) {
				if (wrapLeft) {
					newScrollPosition = carousel.scrollWidth - carousel.clientWidth;
				}
			}
		} else if (newScrollPosition > carousel.scrollWidth - carousel.clientWidth - 16) {
			// console.log('1');
			if (carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 16) {
				// console.log('2');
				newScrollPosition = carousel.scrollWidth - carousel.clientWidth - 1;
			} else if (carousel.scrollLeft > carousel.scrollWidth - carousel.clientWidth - 16) {
				// console.log('3');
				if (wrapRight) {
					newScrollPosition = 0;
				}
			}
		} else {
			if (snapToCenter) {
				snap = true;
			}
		}

		if (enableEasing) {
			carousel.style.transition = 'scroll-left 0.3s ease';
			carousel.scrollLeft = newScrollPosition; // Directly update scrollLeft
		} else {
			carousel.style.transition = 'none';
			scrollPosition = newScrollPosition; // Update the reactive variable
		}

		// Debounce Snap (for mobile, further testing may render this unnecessary)
		if (snap) {
			snapCardToCenter();
			// setTimeout(() => {
			// }, 0);
		} else {
			updateCurrentCardIndex();
		}
	}

	// Fetches and stores image data for each card
	// This is necessary to prevent the carousel from
	// re-downloading images when the carousel is scrolled
	// in this demo case, unsplash!!!!
	function cacheImageData() {
		data.forEach(async (card) => {
			if (!card.base64Image) {
				const response = await fetch(card.imageSrc);
				const blob = await response.blob();
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = function () {
					data[data.indexOf(card)].base64Image = String(reader.result);
				};
			}
		});
	}

	// Checks if the window is mobile size and sets snapToCenter accordingly
	function checkMobile() {
		if (window.innerWidth < 800) {
			snapToCenter = true;
			snapCardToCenter();
		} else {
			snapToCenter = false;
		}
	}

	//
	onMount(async () => {
		cacheImageData();
		checkMobile();
		if (autoScroll) {
			scrollInterval = setInterval(() => {
				if (scrollSpeed <= autoScrollSpeed) {
					scrollSpeed++;
					return;
				}
				if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 16) {
					if (autoScrollReset && wrapRight) {
						carousel.scrollLeft = 0;
					}
				} else {
					if (!snapToCenter) carousel.scrollLeft += scrollSpeed;
				}
			}, 30);
		}
	});

	onDestroy(() => {
		if (scrollInterval) {
			clearInterval(scrollInterval);
		}
	});
</script>

<svelte:body
	on:mouseleave={(e) => {
		// handle mouseup if mouse leaves the window
		handleMouseUp(e);
	}}
/>

<svelte:window
	on:resize={(e) => {
		checkMobile();
	}}
/>

<div class="carousel-container" role="region" aria-label="Image Carousel">
	<ArrowOverlay
		direction="left"
		click={() => {
			slideCarousel('left');
		}}
	/>

	<div
		bind:this={carousel}
		role="listbox"
		aria-label="Image Card Carousel"
		tabindex="0"
		class={'card-carousel ' + (enableEasing ? 'easing' : '')}
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		on:mouseenter={() => {
			scrollSpeed = 0;
		}}
		on:mouseleave={() => {
			scrollSpeed = autoScrollSpeed;
		}}
		on:wheel={(e) => {
			handleWheel(e);
		}}
		on:keydown={(e) => {
			handleKeydown(e);
		}}
	>
		{#each data as card, index}
			<div
				tabindex="0"
				role="option"
				class="card-wrapper"
				aria-label={card.title}
				aria-selected={currentCardIndex === index ? 'true' : 'false'}
			>
				<ImageCard {card} />
			</div>
		{/each}
	</div>

	<ArrowOverlay
		direction="right"
		click={() => {
			slideCarousel('right');
		}}
	/>
</div>

<!-- Show dots only on mobile -->
<div class="dots-mobile">
	<CarouselDots
		{totalItems}
		currentIndex={currentCardIndex}
		setCurrentIndex={(index) => {
			currentCardIndex = index;
			carousel.scrollLeft = index * cardWidth - 16;
		}}
	/>
</div>

<style lang="scss">
	.carousel-container {
		position: relative;
		.card-carousel {
			background: transparent;
			border: none;
			width: 100%;
			overflow-x: auto;
			white-space: nowrap;
			display: flex;
			position: relative;
			flex-direction: row;
			overflow-x: auto;
			white-space: nowrap;
			.easing {
				transition: scroll-left 0.3s ease;
			}

			.card-wrapper {
				flex: 0 0 auto;
				margin-right: 16px;
				-webkit-user-drag: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
				:focus {
					outline: none;
					box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
				}
				&.hidden-card {
					visibility: hidden;
					pointer-events: none;
				}
				&.current-card {
					border: 2px solid #007bff;
				}
			}
		}
	}

	.dots-mobile {
		display: none;
	}
	@media (max-width: 768px) {
		.dots-mobile {
			display: block;
		}
	}
</style>
