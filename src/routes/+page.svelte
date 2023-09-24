<script lang="ts">
	export let data;
	import CardCarousel from './../lib/components/CardCarousel.svelte';
</script>

<h1>Svelte Card Carousel</h1>
<hr />
<CardCarousel data={data.props.translation.cards} autoScroll={true} />
<hr />
