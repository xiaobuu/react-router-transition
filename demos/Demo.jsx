import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import {FadeLorem, PopLorem, SlideLeftLorem, Lorem, SlideRighLorem} from './Lorem';
import RouteTransitionDemo from './RouteTransitionDemo';
import { RouteTransition } from '../src/index';

import { presets } from '../src/index';

const App = React.createClass({
  propTypes: {
    route: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    return (
      <div>
        {this.props.route.childRoutes.map(({ path }) => {
          const isActive = this.context.router.isActive(path);
          return (
            <Link
              to={`/${path}`}
              key={path}
              className={isActive ? 'link active' : 'link'}
            >
              {path}
            </Link>
          );
        })}
        <RouteTransition
          defaultConfig={presets.slideRight}
        >
          {this.props.children}
        </RouteTransition>
      </div>
    );
  }
});

const SlideRightDemo = props => (
  <RouteTransitionDemo {...props} />
);

const Demo = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route
        path="fade"
        component={FadeLorem}
      />
      <Route path="pop" component={PopLorem}/>
      <Route path="slideLeft" component={SlideLeftLorem}/>
      <Route path="slideRight" component={SlideRightDemo}>
        <IndexRoute component={SlideRighLorem} />
        <Route path="demo-1" component={Lorem} />
        <Route path="demo-2" component={Lorem} />
        <Route path="demo-3" component={SlideRighLorem} />
      </Route>
    </Route>
  </Router>
);

export default Demo;
