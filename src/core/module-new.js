import Emitter from './emitter';

class Module {
  constructor(storysman, options = {}) {
    this.storysman = storysman;
    this.options = options;
    this.name = null;
    
    this.storysman.emitter.on(Emitter.events.STORYSMAN_INITED, (source) => {
      this.storysmanInited();
    });
    this.storysman.emitter.on(Emitter.events.STORYSMAN_MOUNTED, (source) => {
      this.storysmanMounted();
    });

    this.storysman.emitter.on(Emitter.events.MODULE_MOUNTED, (source, moduleName) => {
      this.moduleMounted(moduleName);
    });

    this.storysman.emitter.on(Emitter.events.SCENE_BEFORE_INIT, (source) => {
      this.beforeInit();
    });
    this.storysman.emitter.on(Emitter.events.SCENE_AFTER_INIT, (source) => {
      this.afterInit();
    });
  }
  storysmanInited() {

  }
  storysmanMounted() {

  }
  moduleMounted() {

  }
  beforeInit() {

  }
  afterInit() {
    
  }
}
Module.DEFAULTS = {};


export default Module;
