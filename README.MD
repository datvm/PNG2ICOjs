`PNG2ICOjs` is a simple and small (1.31KB minified) Javascript ES6 module that convert PNG files into [ICO file](https://en.wikipedia.org/wiki/ICO_(file_format)). It should work on any Javascript environment including browsers.

Was it helpful for you? Please consider a donation ❤️ [PayPal](https://paypal.me/datvm).

# Installation & Usage

Right now I haven't deployed the library to any CDN yet. Please grab the script files in [Release page](https://github.com/datvm/PNG2ICOjs/releases). It is available in `TypeScript` and `Javascript` file.

To use the module, simply import it in your script:

```ts
import { PngIcoConverter } from "../src/png2icojs.js";

// ...

const inputs = [...files].map(file => ({
    png: file
}));

// Result is a Blob
const resultBlob1 = await converter.convertToBlobAsync(inputs); // Default mime type is image/x-icon
const resultBlob2 = await converter.convertToBlobAsync(inputs, "image/your-own-mime");

// Result is an Uint8Array
const resultArr = await converter.convertAsync(inputs);
```

You can check the demo at [the Demo page](https://png2icojs.lukevo.com/).

# API

The API exposes the `PngIcoConverter` class with many `protected` function so you can override them to your need.

## Methods

`PngIcoConverter` exposes publicly the following methods:

- `async convertToBlobAsync(inputs: IConvertInputItem[], mime = IcoMime): Promise<Blob>;`

Convert PNG files into a ICO Blob with optional mime type. Default: `image/x-icon`.

- `async convertAsync(inputs: IConvertInputItem[]): Promise<Uint8Array>;`

Convert PNG files into a `Uint8Array`.

## Input Options

`IConvertInputItem` has the following properties:

- `png`: the PNG file. Can be `Blob` or `ArrayBuffer`.

- `bpp` (optional, default 0): Bits per pixel. For the header of the ICO image. In my experiments, most apps just ignore this value altogether and use the value from PNG image.

- `ignoreSize` (optional, default false): Due to the `size` byte of ICO only has 1 byte, the maximum size of icons are 256px. However I have attemped to make an icon with 512px icon and it works so far. The library still throw an `Error` if your image size is more than 256px. Set this to `true` to ignore it.
