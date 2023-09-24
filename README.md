
# Svelte Card Carousel

<div align="left">


[![npm](https://img.shields.io/npm/v/svelte-card-carousel.svg)](https://www.npmjs.com/package/svelte-card-carousel)
[![npm](https://img.shields.io/npm/dm/svelte-card-carousel.svg)](https://www.npmjs.com/package/svelte-card-carousel)
[![GitHub repo](https://img.shields.io/badge/github-repo-green.svg?style=flat)](https://github.com/ryanspice/svelte-card-carousel)
[![GitHub followers](https://img.shields.io/github/followers/ryanspice.svg?style=social&label=Follow)](https://github.com/ryanspice)

</div>

The ultimate card carousel component for Svelte 4.

## Installation
```bash
yarn add svelte-card-carousal
```
```bash
npm install svelte-card-carousal
```
```bash
pnpm install svelte-card-carousal
```

## Import Component
```jsx
<script>
  import Carousel from 'svelte-card-carousal';
  ...
</script>
```

## SvelteKit Support
If you're using SvelteKit, follow these additional steps:
1. Install as a dev dependency.
```bash
pnpm install svelte-card-carousal -D
```
2. Extend `kit` in `svelte.config.js` to include the `vite` property.
```js
const config = {
  kit: {
    vite: {
      optimizeDeps: {
        include: ['dependency1', 'dependency2']
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
