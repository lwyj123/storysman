import gameJson from 'game/game.json';

// import { parseComponent } from 'vue-template-compiler';
import indexVue from '../../game/index.vue';

import Scene from './scene';
import Quill from './quill';
import Emitter from './emitter';

class Storysman {
  constructor(options) {
    this.emitter = new Emitter();
    this.quill = new Quill({
      container: '#content',
      emitter: this.emitter,
    });
    this.modules = {};

    // 暂时是数组。后面要支持对象，value里面是模块的设置
    options.modules.map((option) => {
      this.register(option);
    });
  }
  say() {
    return `I am telling you a story`;
  }

  init() {
    // const test = parseComponent(indexVue);
    // console.log(test);
    console.log(indexVue)
    // 由于加载模块是异步的，暂时先这样trick一下
    setTimeout(() => {
      document.location.hash = '';
      let currentScene = new Scene('index');
      currentScene.init(this.quill).then((res) => {
      });
    }, 1400);
    window.onhashchange = () => {
      let filename = document.location.hash.replace('#', '');
      let currentScene = new Scene(filename);
      currentScene.init(this.quill).then((res) => {
      });
    };
    this.emitter.emit(Emitter.events.STORYSMAN_INITED, Emitter.sources.SILENT);
  }
  register(module, options) {
    import(`../modules/${module}`).then((Module) => {
      this.modules[module] = new Module.default(this, options);
      this.emitter.emit(Emitter.events.MODULE_MOUNTED, Emitter.sources.SILENT, module);
    });
  }
}


export default Storysman;