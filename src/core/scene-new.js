import config from 'config';
import axios from 'axios';
import yfm from 'yfm'; // A simple to use YAML Front-Matter parsing and extraction Library

import modules from './module';

const _getSceneContent = function(scene) {
  let fileName = `${scene}.markdown`;
  //var file = gameJson[files][fileName];

  let fileURL = `../${config.baseAddress}/${fileName}`;

  return axios.get(fileURL).then(res => {
    return res.data;
  });
};

class Scene {
  constructor(scenefile) {
    this.file = scenefile;
    this.sceneContent = null;
    this.yfmParsed = null;
    this.state = {};
  }

  async init() {
    this.sceneContent = await _getSceneContent(this.file);
    console.log('sceneContent: ', this.sceneContent);
    this.yfmParsed = this._extractYFM();
    console.log('yfmParsed: ', this.yfmParsed);
    modules.notify("beforeInit");
    this._initScene();
    modules.notify("afterInit");
  }

  setState(newState) {
    if(newState)
      this.state = {
        ...this.state,
        ...newState
      };
  }

  _initScene() {
    if (this.yfmParsed.context.init !== undefined) {
      this.yfmParsed.context.init();
    }
  }

  _extractYFM() {
    // see the https://www.npmjs.com/package/yfm
    var parsed = yfm(this.sceneContent);
    return parsed;
  }

}

export default Scene;
