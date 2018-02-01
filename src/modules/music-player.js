// export const module = {
//   'beforeInit': function() {
//     // mount the audio tag

//   },
//   'afterInit': function() {
//     // load muisc file and play after loaded (async)

//   }
// };

import logger from '../core/logger';
import Module from '../core/module-new';

let debug = logger('module:music-player');

class MusicPlayer extends Module {
  constructor(storysman, options) {
    super(storysman, options);
    this.name = "music-player";
    // for test
    this.options = {
      container: 'body'
    };
    if(this.options.container) {
      this.container = document.querySelector(this.options.container);
    } else {
      this.container = storysman.quill.container;
    }
    
    if (!(this.container instanceof HTMLElement)) {
      return debug.error('Container required for musicplayer', this.options);
    }
    this.audioDom = mountDom(this.container);
    bindEvent(this.container, this.audioDom);
  }

  play() {
    this.audioDom.play();
  }

  stop() {
    this.audioDom.pause();
  }

  changeSong(songUrl) {
    this.audioDom.src = songUrl;
  }

  moduleMounted(moduleName) {
    if(moduleName !== this.name) {
      return;
    }
    debug.log('musicplayer mounted');
    this.audioDom.src = "http://localhost:8080/game/music/200052226565.mp3";
    this.play();
  }
  beforeInit() {
    debug.log('musicplayer before init');
  }
  afterInit() {
    debug.log('musicplayer after init');
  }
}

function mountDom(container) {
  let audio = document.createElement('audio');
  audio.classList.add('storysman-music-player');
  container.appendChild(audio);
  return audio;
}

// 辣鸡语法糖，私有方法烦得一批
function bindEvent(container, audioDom) {

}

export default MusicPlayer;