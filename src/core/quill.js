import logger from './logger';
import mustache from 'mustache'; // a famous template
import marked from 'marked'; // a full-featured markdown parser and compiler.
import Scene from './scene';
import Emitter from './emitter';

let debug = logger('quill');

/**
 * 用于渲染Scene的类
 * 
 * @class Quill
 */
class Quill {
  constructor(options = {}) {
    this.options = {
      ...Quill.DEFAULTS,
      ...options
    };
    this.emitter = this.options.emitter;
    this.container = document.querySelector(this.options.container);
    if (this.container == null) {
      return debug.error('Invalid Quill container', this.options.container);
    }
    this.container.classList.add('ql-container');
    this.container.innerHTML = '';
    this.container.__quill = this;
    this.domEvents = {};
    this.currentScene = null;

    // state变更自动刷新
    this.emitter.on(Emitter.events.SCENE_STATE_CHANGE, (source, newState) => {
      this.render(this.currentScene);
    });
  }
  render(scene) {
    removeStyle();
    this._clear();
    if (scene.yfmParsed.context.style !== undefined) {
      injectSceneStyle(scene);
    }
    this.container.innerHTML = marked(mustache.render(scene.yfmParsed.content, scene.state));
    this._bindReact(scene);

    // 记录当前scene
    this.currentScene = scene;
    scene.setQuill(this);

    function removeStyle() {
      let head = document.getElementsByTagName('head')[0];
      let sceneStyles = [];
      for(let node of head.children) {
        if(node.tagName === 'STYLE' && node.id.match(/-style$/)) {
          sceneStyles.push(node);
        }
      }
      for(let node of sceneStyles) {
        head.removeChild(node);
      }
    }
    function injectSceneStyle(scene) {
      let head = document.getElementsByTagName('head')[0];
      let style = document.createElement('style');
      style.id = scene.filename + '-style';
      style.type = 'text/css';
      style.innerHTML = scene.yfmParsed.context.style;
      head.appendChild(style);
    }
  }

  // 绑定交互事件
  _bindReact(scene) {
    const self = this;
    this.domEvents['react'] = function (event) {
      event.preventDefault();
      let name = event.target.attributes.href.value;
      if(event.target.tagName == 'A') {
        if(name.startsWith('@')) {
          debug.log(`Pressed ${name}`);
          scene.yfmParsed.context.method[name.slice(1)].call(null, scene.state, Scene.globalState);
          // TODO: use two-way binding or Rerender
          // NOTICE: 可以考虑每次执行方法或者值有变动的时候触发一个notify方法，这个方法可以使用节流来优化性能
          self.emitter.emit(Emitter.events.SCENE_STATE_CHANGE, Emitter.sources.SILENT, scene.state);
        } else {
          var hash = '#' + name;
          window.location = hash;
        }
      }
    };
    this.container.addEventListener('click', this.domEvents['react']);
  }
  _clear() {
    this.container.removeEventListener('click', this.domEvents['react']);
  }
}

Quill.DEFAULTS = {

};

export default Quill;