# Zoom Vanilla
>A simple library for image zooming; [as seen on Medium](https://www.npmjs.com/package/medium-zoom). It zooms in really smoothly, and zooms out when you click again, scroll away, or press the <kbd class="u-kbd">ESC</kbd> key.

This solution uses a patched version of [zoom-vanilla.js](https://github.com/spinningarrow/zoom-vanilla.js/) to allow image zoom.

``Click Image to Zoom``
![](/icons/ui5/O_UI5_H.svg)

::: tip Why patched ZoomVanilla.js
MediumZoom was not working as expected on Safari zooming SVG images (pixelated), while this is working in ZoomVanilla. 

To allow max zooming SVG images (larger than defined in the viewport), i created a patched version of zoom-vanilla.js, which is part of this project.
:::
