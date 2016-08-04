/*

  Return the scene config of the last node containing one

  element: props: children
 */

function fetchConfig (element) {
  if (element.props && element.props.sceneConfig) {
    return element.props.sceneConfig;
  } else if (element.type && element.type.sceneConfig) {
    return element.type.sceneConfig;
  }

  /*
  if (element.props.route && element.props.route.component.sceneConfig) {
    return element.props.route.component.sceneConfig;
  }
  */
}
export default function (element) {
  let lastConfig;
  // react-router node should have only one child

  while (element.props && element.props.children) {
    lastConfig = fetchConfig(element);
    element = element.props.children;
  }
  const thisConfig = fetchConfig(element);
  return thisConfig || lastConfig;
}
