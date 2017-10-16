import randomString from './randomString'

const loadCss = function(options) {
  let _options = {
    url: null,
    beforeMounted: () => {},
    mounted: () => {},
    loaded: () => {},
    id: randomString({length: 8})
  }
  let option = Object.assign({}, _options, options);

  // TODO: add url validator
  if(!option.url) {
    return undefined;
  }

  let node = document.createElement('link');
  node.rel = "stylesheet";
  node.type = "text/css";
  node.href = option.url;
  node.id = option.id;

  option.beforeMounted.call(null);
  document.getElementsByTagName("head")[0].appendChild(node);
  option.mounted.call(null);

  if("onload" in node) {
    node.onload = option.loaded;
  } else {
    setTimeout(() => {
      _pollCss(node, option.loaded, 0);
    }, 0)
  }
}

// for detect css onloaded or not(Old WebKit, Old Firefox)
function _pollCss(node, callback, step) {
  // for WebKit < 536
  let isOldWebKit = navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;
  let sheet = node.sheet;
  let isLoaded;
  let pollLimit = 30;

  step = step + 1;
  if(step > pollLimit) {
    node = null;
    //callback.call(null);
    return;
  }

  if(isOldWebKit) {
    if(sheet) {
      isLoaded = true;
    }
  } else if (node['sheet']) {
    if (node['sheet'].cssRules) {
      isLoaded = true;
    }
  }

  if(isLoaded) {
    setTimeout(function() {
      callback.call(null);
    }, 10)
  } else {
    setTimeout(function() {
      _pollCss(node, callback, step)
    }, 10)
  }
}

export default loadCss;