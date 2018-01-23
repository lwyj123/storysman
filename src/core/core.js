import gameJson from 'game/game.json';

import { runScene } from './scene.js';
import smc from './module.js';

class Storysman {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    return `I am telling you a story`;
  }
}

// TODO: add asynchronous load
var init = function () {
  window.onhashchange = function() {
    runScene(document.location.hash);
  };
};

Storysman.init = function() {
  init();
  runScene(document.location.hash);
};

Storysman.register = function(module) {
  smc.register(module);
};



export default Storysman;