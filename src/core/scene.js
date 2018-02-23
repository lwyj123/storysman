import logger from './logger';
import config from 'config';
import axios from 'axios';
import yfm from 'yfm'; // A simple to use YAML Front-Matter parsing and extraction Library
import { parseComponent } from 'vue-template-compiler';

import Emitter from './emitter';

let debug = logger('scene');

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
    this.descriptor = null;
    this.sceneContent = null;
    this.yfmParsed = null;
    this.state = {};

    // 最初设置quill只是为了获取emitter，后面看看有没有什么改动吧。
    this.quill = null;
  }

  async init(quill) {
    const cache = Scene.scenes[this.file];
    this.setQuill(quill);
    if(cache) {
      this.descriptor = cache.descriptor;
      this.sceneContent = cache.sceneContent;
      this.yfmParsed = cache.yfmParsed;
      this.state = cache.state;
      debug.log('already inited');
    } else {
      
      this.descriptor = await import(`../../game/${this.file}.vue`);
      this.descriptor = parseComponent(this.descriptor);
      debug.log('descriptor: ', this.descriptor);
      this.sceneContent = await _getSceneContent(this.file);
      debug.log('sceneContent: ', this.sceneContent);
      this.yfmParsed = this._extractYFM();
      debug.log('yfmParsed: ', this.yfmParsed);
      this.quill.emitter.emit(Emitter.events.SCENE_BEFORE_INIT, Emitter.sources.SILENT);
      this._initScene();
      this.quill.emitter.emit(Emitter.events.SCENE_AFTER_INIT, Emitter.sources.SILENT);
      Scene.scenes[this.file] = this;
    }
    debugger;
    this.quill.render(this);
  }

  setState(newState, newGlobalState) {
    if(newState) {
      this.state = {
        ...this.state,
        ...newState
      };
    }
    if(newGlobalState) {
      this.globalState = {
        ...this.globalState,
        ...newGlobalState
      };
    }
    // emitter.XXX
  }
  setQuill(quill) {
    this.quill = quill;
  }

  _initScene() {
    if (this.yfmParsed.context.init !== undefined) {
      this.yfmParsed.context.init(this.state, Scene.globalState);
    }
  }

  _extractYFM() {
    // see the https://www.npmjs.com/package/yfm
    var parsed = yfm(this.sceneContent);
    return parsed;
  }
}

Scene.globalState = {};
Scene.scenes = {};

export default Scene;
