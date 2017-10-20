import gameJson from 'game/game.json'

import { runScene } from './scene.js'

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
  }
};

Storysman.init = function() {
  init();
  runScene('');
}



export default Storysman;