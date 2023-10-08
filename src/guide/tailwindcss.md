# Tailwind CSS ![Tailwind CSS](/icons/logo/TailwindCSS.svg){class="u-right-brand" style="width:auto;height:3rem;"}
>Rapidly build modern websites without ever leaving your HTML.

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework packed with classes like ``flex``, ``pt-4``, ``text-center`` and ``rotate-90`` that can be composed to build any design, directly in your markup.

## An API for your design system.
Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.

## Customization
By default, Tailwind will look for an optional tailwind.config.js file at the root of your project where you can define any customizations.

Customizing the default color palette allow to add semantic color names like ``Fire`` and ``Water`` to your project.

``tailwind.config.js``
```js
import colors from 'tailwindcss/colors'
export default {
  theme: {
    ...
    colors: {
      fire: {
        DEFAULT: '#ff5a37',
        secondary: '#ffa42c'
      },
      water: {
        DEFAULT: '#1873b4',
        secondary: '#53b8de'
      }
    }
    ...

```

The customized colors are supported by the Tailwind CSS tooling for VS Code:

![Intelligent Tailwind CSS tooling for VS Code - Color Completion](/tailwind-css-vsc-color-completion.png)

## Using PostCSS as preprocessor
Tailwind is used as a PostCSS plugin together with [Autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](https://cssnano.co/).

This has a few benefits:

Benefit | Description
:-----: | -----------
Your builds will be faster | Since your CSS doesn’t have to be parsed and processed by multiple tools, your CSS will compile much quicker using only PostCSS.
No quirks or workarounds | Because Tailwind adds some new non-standard keywords to CSS (like @tailwind, @apply, theme(), etc.), you often have to write your CSS in annoying, unintuitive ways to get a preprocessor to give you the expected output. Working exclusively with PostCSS avoids this.


## It’s tiny — never ship unused CSS again.
Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10kB of CSS to the client.
