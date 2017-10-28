import config from 'config'
import gameJson from 'game/game.json'
import axios from 'axios'
import yfm from 'yfm' // A simple to use YAML Front-Matter parsing and extraction Library
import mustache from 'mustache' // a famous template
import marked from 'marked' // a full-featured markdown parser and compiler.

import module from './module'

// store the middle value (scene, parsed)
let sceneContext = {}

// load and render the scene by hash value
const runScene = function(hash) {
  var scene = parse(hash);
  let promise = Promise.resolve(scene);
  
  sceneContext.scene = scene;

  return promise.then(loadScene)
    .then(renderScene)

  function parse (hash) {
    var path = hash.slice(1);
    var segments = path.split('/');
    var scene = segments.join('/');

    if (scene === '') {
      return 'index';
    }

    return scene;
  };
}

// load scene file by its filename
const loadScene = function(scene) {
  console.log(module);
  let promise = _getSceneContent(scene)
    .then(_extractYFM.bind(this, scene))
    .then((res) => {
      module.notify('beforeInit');
      return res;
    })
    .then(_initScene)
    .then((res) => {
      module.notify('afterInit');
      return res;
    })
  return promise
}
// render scene by its parsed object(extracted by yfm)
const renderScene = function(parsed) {
  let promise = _playTrack(parsed)
    .then(_updateGameState)
    .then(_renderMustache)
    .then(_renderMarkdown)
    .then(_outputContent)
    .then(_handleInternalLinks)
    .then(()=>{

    })
  return promise;
}


/*
****Load part
*/
const _getSceneContent = function (scene) {
  let fileName = `${scene}.markdown`
  //var file = gameJson[files][fileName];


  let fileURL = '../' + config.baseAddress + '/' + fileName;

  return axios.get(fileURL)
};

// extract scene style from scene file's content
const _extractYFM = function(scene, result) {
  // see the https://www.npmjs.com/package/yfm
  var parsed = yfm(result.data);
  sceneContext.parsed = parsed;
  // clear the style before inject
  removeStyle();
  if (parsed.context.style !== undefined) {
    injectSceneStyle(scene, parsed.context.style);
  }
  function removeStyle() {
    let head = document.getElementsByTagName('head')[0];
    let sceneStyles = []
    for(let node of head.children) {
      if(node.tagName === 'STYLE' && node.id.match(/-style$/)) {
        sceneStyles.push(node);
      }
    }
    for(let node of sceneStyles) {
      head.removeChild(node);
    }
  }
  function injectSceneStyle(scene, content) {
    let head = document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.id = scene + '-style';
    style.type = 'text/css';
    style.innerHTML = content;
    head.appendChild(style);
  };
  return Promise.resolve(parsed);
}

// run init function of the scene file
const _initScene = function(parsed) {
  if (parsed.context.init !== undefined) {
    parsed.context.init();
  }
  return Promise.resolve(parsed);
}

/*
****Render part
*/
const _playTrack = function (parsed) {
  // play BGM
  /*if (parsed.context.track !== undefined) {
    if (currentTrack !== undefined && !currentTrack.paused) {
      $(currentTrack).animate({ volume: 0 }, 1000, playSceneTrack.bind(this, parsed.context.track));
    } else {
      playSceneTrack(parsed.context.track);
    }
  }*/
  return Promise.resolve(parsed);
};

// update the state (using parsed object's state)
const _updateGameState = function (parsed) {
  if(!window.state) {
    window.state = {};
  }
  Object.assign(window.state, parsed.context.state);
  return parsed.content;
};

// render the Mustache template using "state"
const _renderMustache = function (content) {
  return mustache.render(content, window.state);
};

const _renderMarkdown = function (content) {
  // render markdown and output html code
  return marked(content);
};

// reset the innerHTML of '#content'
const _outputContent = function (content) {
  let elem = document.getElementById('content');
  elem.innerHTML = content
  return Promise.resolve(elem);
};

// redirect the 'a' tag's href to change the hash.
const _handleInternalLinks = function (contentElement) {
  let aList = document.querySelectorAll(`#${contentElement.id} a`)
  contentElement.addEventListener('click', function (event) {
    event.preventDefault();
    let sceneName = event.target.attributes.href.value
    if(event.target.tagName == 'A') {
      if(sceneName.startsWith('@')) {
        sceneContext.parsed.context.method[sceneName.slice(1)].call(null)

        // TODO: use two-way binding or Rerender
        
      } else {
        var hash = '#' + sceneName;
        window.location = hash
      }
      
    }
  });
  return Promise.resolve;
};

export {
  runScene
}