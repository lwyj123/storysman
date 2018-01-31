import EventEmitter from 'eventemitter3';
import logger from './logger';

let debug = logger('emitter');

/**
 * Emitter，基于EventEmitter封装了一层。
 * @class Emitter
 * @extends {EventEmitter}
 */
class Emitter extends EventEmitter {
  constructor() {
    super();
    this.listeners = {};
    this.on('error', debug.error);
  }

  emit() {
    debug.log.apply(debug, arguments);
    super.emit.apply(this, arguments);
  }
}

Emitter.events = {
  SCENE_BEFORE_INIT    : 'scene-before-init',
  SCENE_AFTER_INIT     : 'scene-after-init',
  SCENE_STATE_CHANGE   : 'scene-state-change',
  
};
Emitter.sources = {
  API    : 'api',
  SILENT : 'silent',
  USER   : 'user'
};


export default Emitter;
