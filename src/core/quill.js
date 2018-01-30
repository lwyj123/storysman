import logger from './logger';
import mustache from 'mustache'; // a famous template
import marked from 'marked'; // a full-featured markdown parser and compiler.

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
    this.container = document.querySelector(this.options.container);
    if (this.container == null) {
      return debug.error('Invalid Quill container', this.options.container);
    }
    this.container.classList.add('ql-container');
    this.container.innerHTML = '';
    this.container.__quill = this;
  }
  render(scene) {
    removeStyle();
    if (scene.yfmParsed.context.style !== undefined) {
      injectSceneStyle(scene);
    }
    this.container.innerHTML = marked(mustache.render(scene.yfmParsed.content, window.state));

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
}

Quill.DEFAULTS = {

};

export default Quill;