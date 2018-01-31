import Emitter from './emitter';

class Module {
  constructor(storysman, options = {}) {
    this.storysman = storysman;
    this.options = options;
    
    this.storysman.emitter.on(Emitter.events.SCENE_BEFORE_INIT, (source) => {
      this.beforeInit();
    });
    this.storysman.emitter.on(Emitter.events.SCENE_AFTER_INIT, (source) => {
      this.afterInit();
    });
  }
  beforeInit() {

  }
  afterInit() {
    
  }
}
Module.DEFAULTS = {};


export default Module;
