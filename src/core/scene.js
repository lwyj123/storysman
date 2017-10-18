import config from 'config'
import gameJson from 'game/game.json'
import axios from 'axios'
import yfm from 'yfm' // A simple to use YAML Front-Matter parsing and extraction Library

// load scene file by its filename

const runScene = function(hash) {
  var scene = parse(hash);
  let promise = Promise.resolve(scene);
  // loadScene(scene) => parsed, renderScene(parsed) => undefined
  return promise.then(loadScene)
    .then(renderScene)

  function parse (hash) {
    var path = hash.slice(1);
    var segments = path.split('/');
    gistId = segments.shift();
    var scene = segments.join('/');

    if (scene === '') {
      return 'index';
    }

    return scene;
  };
}

const loadScene = function(scene) {
  let promise = _getSceneContent(scene)
    .then(_extractYFM.bind(this, scene))
    .then(_initScene);
  return promise
}
// render scene by its parsed object(extracted by yfm)
const renderScene = function(parsed) {
  
}


/*
****Load part
*/
const _getSceneContent = function (scene) {
  let fileName = `${scene}.markdown`
  var file = gameJson[files][fileName];


  let fileURL = config.baseAddress + '/' + fileName;

  return axios.get(fileURL)
};

// extract scene style from scene file's content
const _extractYFM = function(scene, content) {
  // see the https://www.npmjs.com/package/yfm
  var parsed = yfm(content);
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
  return parsed;
}

// run init function of the scene file
const _initScene = function(parsed) {
  if (parsed.context.init !== undefined) {
    parsed.context.init();
  }
  return parsed;
}

/*
****Render part
*/
const _playTrack = function (parsed) {
  if (parsed.context.track !== undefined) {
    if (currentTrack !== undefined && !currentTrack.paused) {
      $(currentTrack).animate({ volume: 0 }, 1000, playSceneTrack.bind(this, parsed.context.track));
    } else {
      playSceneTrack(parsed.context.track);
    }
  }
  return parsed;
};

export {
  initScene
}