
# Svelte Card Carousel

[![npm](https://img.shields.io/npm/v/svelte-card-carousel.svg)](https://www.npmjs.com/package/svelte-card-carousel)
[![npm](https://img.shields.io/npm/dm/svelte-card-carousel.svg)](https://www.npmjs.com/package/svelte-card-carousel)
[![GitHub repo](https://img.shields.io/badge/github-repo-green.svg?style=flat)](https://github.com/ryanspice/svelte-card-carousel)
[![GitHub followers](https://img.shields.io/github/followers/ryanspice.svg?style=social&label=Follow)](https://github.com/ryanspice)

The ultimate card carousel component for Svelte 4.

## Demo
* [REPL](https://replit.com/@spiceryan/Svelte-Card-Carousel-Demo)


## Installation
```bash
yarn add svelte-card-carousel
```
```bash
npm i svelte-card-carousel
```
```bash
pnpm i svelte-card-carousel
```

## Import Component
```svelte
<script>
  import Carousel from 'svelte-card-carousel';
  ...
</script>
```

## Usage

```svelte
<Carousel
  data={data}
  autoScroll={true}
  autoScrollSpeed={3000}
  dragAcceleration={1.5}
  wrapLeft={true}
  wrapRight={true}
/>
```

## Data
```json
{
	"cards": [
		{
			"imageSrc": "https://source.unsplash.com/featured/?landscape",
			"videoSrc": "https://www.shutterstock.com/shutterstock/videos/1052743418/preview/stock-footage--aerial-drone-distant-sunset-view-of-tour-eiffel-tower-and-seine-river-bridge-traffic-cars-driving.webm",
			"title": "Stunning Random, Landscape",
			"label": "Nature",
			"paragraph": "This is a beautiful landscape. The rolling hills stretch out as far as the eye can see. The sky above is a brilliant blue, dotted with fluffy clouds.",
			"buttonText": "Learn More",
			"buttonLink": "https://google.ca/"
		}
  ]
}
```

## SvelteKit Support
If you're using SvelteKit, follow these additional steps:
1. Install as a dev dependency.
```bash
pnpm i svelte-card-carousel -D
```
2. Extend `kit` in `svelte.config.js` to include the `vite` property.
```js
const config = {
  kit: {
    vite: {
      optimizeDeps: {
        include: ['svelte-card-carousel']
      }
    }
  }
}
```

## Props
| Prop              | Type      | Default | Description                       |
|-------------------|-----------|---------|-----------------------------------|
| `data`            | `array`   | `[]`    | An array of card data objects.    |
| `autoScroll`      | `boolean` | `false` | Enable/disable auto-scrolling.    |
| `autoScrollSpeed` | `number`  | `3000`  | Speed of auto-scrolling in ms.    |
| `dragAcceleration`| `number`  | `1.5`   | Acceleration factor for drag.     |
| `wrapLeft`        | `boolean` | `true`  | Enable/disable wrap to last item. |
| `wrapRight`       | `boolean` | `true`  | Enable/disable wrap to first item.|

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
