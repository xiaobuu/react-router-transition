import React, { Component, PropTypes, cloneElement, createElement } from 'react';
import { TransitionMotion } from 'react-motion';

import ensureSpring from './ensureSpring';
import extractSceneConfig from './extractSceneConfig';

/*
  Route Transition should be the root in the route tree
 */
class RouteTransition extends Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    // pathname: PropTypes.string.isRequired,
    // atEnter: PropTypes.object.isRequired,
    // atActive: PropTypes.object.isRequired,
    // atLeave: PropTypes.object.isRequired,
    // mapStyles: PropTypes.func,
    runOnMount: PropTypes.bool,
    // mobileLike: PropTypes.bool,
    style: PropTypes.object,
    defaultConfig: PropTypes.object,
  };

  static defaultProps = {
    component: 'div',
    runOnMount: false,
    // mobileLike: false,
    defaultConfig:  {},
  };

  _sceneConfig = {};

  componentWillMount() {
    this._sceneConfig = extractSceneConfig(this) || this.props.defaultConfig;
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => this._needResetLeave = true, 300);
    this._sceneConfig = extractSceneConfig(nextProps.children) || nextProps.defaultConfig;
  }

  getDefaultStyles = () => {
    if (!this.props.runOnMount) {
      return null;
    }

    if (!this.props.children) {
      return [];
    }

    return [{
      key: this.props.children.props.location.pathname, // props is injected by react-router
      data: this.props.children,
      style: this._sceneConfig.atEnter,
    }];
  };

  // there's only ever one route mounted at a time,
  // so just return the current match
  getStyles = () => {
    if (!this.props.children) {
      return [];
    }
    return [{
      key: this.props.children.props.location.pathname, // props is injected by react-router
      data: this.props.children,
      style: ensureSpring(this._sceneConfig.atActive)
    }];
  }

  willEnter = () => {
    /*
    if (this.props.mobileLike) {
      if (this.props.children.props.location.action === 'POP') {
        return this._sceneConfig.atActive;
      }
    }
    */
    return this._sceneConfig.atEnter;
  };

  willLeave = () => {
    if (this._needResetLeave) {
      this._needResetLeave = false;
      return null;
      // Hack to clear uncleared transitions
    }
    return ensureSpring(this._sceneConfig.atLeave);
  };

  renderRoute = (config) => {
    // create or clone
    const props = {
      style: this._sceneConfig.mapStyles ? this._sceneConfig.mapStyles(config.style) : config.style,
      key: config.key
    };
    return this.props.component
      ? createElement(this.props.component, props, config.data)
      : cloneElement(config.data, props);
  }

  renderRoutes = (interpolatedStyles) => {
    // The children in the route stack that is getting replaced
    return (
      <div className={this.props.className} style={this.props.style}>
        {interpolatedStyles.map(this.renderRoute)}
      </div>
    );
  }

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {this.renderRoutes}
      </TransitionMotion>
    );
  }
}

export default RouteTransition;
