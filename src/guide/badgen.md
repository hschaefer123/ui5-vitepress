# Badgen
>Fast badge generating service.

The globally registered [Badgen](https://badgen.net/) Component can be used to easily link to npm or github packages.

Originally you have to use an image uri like

```
https://badgen.net/badge/:subject/:status/:color?icon=github

```

to generate a badge button like this:

![](https://badgen.net/badge/MyTitle/MyState/blue?icon=apple)

## Using Component
You can use the component, to easily generate buttons for ``npm`` and ``git``.

Code
```vue
<Badgen package="vue"/>
```

Output: 
<Badgen package="vue"/>

::: tip Have a look into ``.vitepress/theme/components/Badgen.vue``to see more options.
:::