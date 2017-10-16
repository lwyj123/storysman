import config from 'config'
import gameJson from 'game/game.json'
import { loadCss } from 'utils'

const initUI = function (scene) {
  return applyPublicStylesheet()
    .then(loadAndRender.bind(this, scene))
    .then(compileAndDisplayFooter);
};

// Apply the public style of the IF
const applyPublicStylesheet = function () {
  if(gameJson['style.css']) {
    return new Promise(function(resolve, reject) {
      loadCss({
        url: config.baseAddress + '/style.css',
        loaded: () => { resolve() },
      })
    })
  } else {
    return Promise.resolve();
  }
};

const loadAndRender = function(scene) {
  promise = getFileContent(scene)
    .then(extractYFM.bind(this, scene))
    .then(cacheContent.bind(this, scene))
    .then(runSceneInit);
}

export initUI;