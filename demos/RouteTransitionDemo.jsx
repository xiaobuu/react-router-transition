import React from 'react';
import { Link } from 'react-router';
import presets from '../src/presets';

import { RouteTransition } from '../src/index';

const RouteTransitionDemo = (props) => (
  <div>
    {props.route.childRoutes.map((childRoute, index) => {
      const to = ['', props.route.path, childRoute.path].join('/');
      return (
        <Link className="link" key={to} to={to}>
          another {props.route.path}
        </Link>
      );
    })}
    {/*

       <RouteTransition
         // component={false}
       >
         {props.children}
       </RouteTransition>

    */}
    {props.children}
  </div>
);
RouteTransitionDemo.sceneConfig = presets.slideRight;
export default RouteTransitionDemo;
