import config from '../../config'
import gameJson from 'game/game.json'
import { loadCss } from 'utils'

const initUI = function (scene) {
  return applyPublicStylesheet()
    .then(loadAndRender.bind(this, scene))
    .then(compileAndDisplayFooter);
};

const applyPublicStylesheet = function () {
  if(gameJson['style.css']) {
    return new Promise(function(resolve, reject) {
      loadCss({
        url: gameJson['style.css']
      })
    })
  } else {
    return Promise.resolve();
  }

};


export initUI;