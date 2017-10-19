import config from 'config'
import gameJson from 'game/game.json'
import axios from 'axios'
import yfm from 'yfm' // A simple to use YAML Front-Matter parsing and extraction Library
import mustache from 'mustache' // a famous template
import marked from 'marked' // a full-featured markdown parser and compiler.

// load and render the scene by hash value
const runScene = function(hash) {
  var scene = parse(hash);
  let promise = Promise.resolve(scene);
  // loadScene(scene) => parsed, renderScene(parsed) => undefined
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
  let promise = _getSceneContent(scene)
    .then(_extractYFM.bind(this, scene))
    .then(_initScene);
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
  if (parsed.context.style !== undefined) {
    injectSceneStyle(scene, parsed.context.style);
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

const _updateGameState = function (parsed) {
  if(!window.state) {
    window.state = {};
  }
  Object.assign(window.state, parsed.context.state);
  return parsed.content;
};

const _renderMustache = function (content) {
  return mustache.render(content, window.state);
};

const _renderMarkdown = function (content) {
  // render markdown and output html code
  return marked(content);
};

const _outputContent = function (content) {
  let elem = document.getElementById('content');
  elem.innerHTML = content
  return Promise.resolve(elem);
};

const _handleInternalLinks = function (contentElement) {
  /*contentElement.find('a').click(function (event) {
    event.preventDefault();
    var hash = '#' + gistId + '/' + $(this).attr('href');
    runScene(hash);
    window.history.pushState(null, null, document.location.pathname + hash);
  });*/
  return Promise.resolve;
};

export {
  runScene
}