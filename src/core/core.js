import gameJson from 'game/game.json';

import Scene from './scene-new.js';
import Quill from './quill';
import smc from './module.js';

class Storysman {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.quill = new Quill({
      container: '#content'
    });
  }
  say() {
    return `I am telling you a story`;
  }

  init() {
    let currentScene = new Scene('index');
    currentScene.init().then((res) => {
      this.quill.render(currentScene);
    });
    window.onhashchange = function() {
      let filename = document.location.hash.replace('#', '');
      let currentScene = new Scene(filename);
      currentScene.init().then((res) => {
        this.quill.render(currentScene);
      });
    };
  }
  register(module) {
    smc.register(module);
  }
}


export default Storysman;