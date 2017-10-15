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

  setTimeout(() => {
    _pollCss(node, loaded, 0);
  }, 20)
}

// for detect css onloaded or not(Old WebKit, Old Firefox)
function _pollCss(node, callback, step) {
  // for WebKit < 536
  let isOldWebKit = navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;
  let supportOnload = "onload" in node;
  let sheet = node.sheet;
  let isLoaded;
  let pollLimit = 10;

  step = step + 1;
  if(step > pollLimit) {
    node = null;
    //callback.call(null);
    return;
  }

  if(isOldWebKit || !supportOnload) {
    if(sheet) {
      isLoaded = true;
    }
  } else if(supportOnload) {
    node.onload = function() {
      callback.call(null);
    }
  } else {
    node.onreadstatechange = function() {
      if(/loaded|complete/.test(node.readyState)) {
        callback.call(null);
      }
    }
  }


  setTimeout(function() {
    if(isLoaded) {
      callback.call(null);
    } else {
      _pollCss(node, callback, step)
    }
  })
}

export default loadCss;