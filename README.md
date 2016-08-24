# React Router Transition

A simple component for easily enable transitions for components. Built for `react-router`, powered by `react-motion`. [Some demos](http://xiaobuu.github.io/react-router-transition/demos/)

You'll define transitions in your component which is the main difference from the original version.

```jsx
import { RouteTransition } from 'react-router-transitioner';

// in your root app component:
<div>
  <RouteTransition>
    {this.props.children}
  </RouteTransition>
</div>


// And in your component that need transition

class AComponent extends Componet {...}


AComponent.sceneConfig = {
  atEnter: {
    opacity: 0,
    offset: -100
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(100, slideConfig)
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig)
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`
    };
  }
}
```

### Installation

Install the modified version

`npm install --save react-router-transitioner`

If you want to install the original version

`npm install --save react-router-transition`

### Usage

You need to place `RouteTransition` at your root of the router, and wrap your `{this.props.children}`

If you want to add transition to a component in the route tree,
 add a static property with key `sceneConfig`
 `sceneConfig` requires a few props:
- `component`: the element type (`'div'`, `'span'`, etc.) to wrap transitioning routes. use `false` to transition routes themselves (this will require consuming a `style` prop in your route components).Default is `div`.
- `atEnter`: an object of interpolatable style values for a route that is mounting (required)
- `atBack`: an object of interpolatable style values for a route that is mounting by poping, can be useful to create mobile feeling transitions (optional)
- `atLeave`: an object of interpolatable style values for a route that is unmounting (required)
- `atActive`: interpolatable style values for a route that has mounted (required)
- `mapStyles`: an optional function to transform styles that aren't 1:1 (e.g. animating `translateX` or other values of `transform`)
- `runOnMount`: a boolean to signal whether or not to run the transition on initial `RouteTransition` mount (Not sure if it's working now)
- `defaultConfig`: set default scene configuration for all child routes, default is `{}`

and supports a couple optional props:
- `className`: applies to the wrapper component
- `style`: applies to the wrapper component

If you want more granular control over the transition, pass in `spring` objects accordingly. For more information on springs, check out [`react-motion`'s documentation](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig).


### Nesting Transitions
It's supported! Since transitions are defined at component level!
