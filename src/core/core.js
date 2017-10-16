import gameJson from 'game/game.json'

import { getSceneContent } from './scene.js'

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
  loaded = true;
  /*var scene = parse(document.location.hash);

  return q($.getJSON('http://localhost:8080/game/game.json'))
    .then(function (gist) {
      files = gist.files;
      return initUI(scene);
    }, function (xhr) {
      toggleLoading(false);
      toggleError(true, xhr.statusText);
    });*/
};
Storysman.game = gameJson;



Storysman.test = getSceneContent



export default Storysman;