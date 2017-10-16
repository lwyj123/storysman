import config from 'config'
import gameJson from 'game/game.json'
import axios from 'axios'

const getSceneContent = function (scene) {
  let fileName = `${scene}.markdown`
  var file = gameJson[files][fileName];


  let fileURL = config.baseAddress + '/' + fileName;

  return axios.get(fileURL)
};


const extractYFM = function(scene, content) {
  var parsed = yfm(content);
  if (parsed.context.style !== undefined) {
    injectSceneStyle(scene, parsed.context.style);
  }
  return parsed;
}

const initScene = function(sceneContent) {

}


export {
  getSceneContent,
  extractYFM,
  initScene
}