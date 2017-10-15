const initUI = function (scene) {
  return applyPublicStylesheet()
    .then(loadAndRender.bind(this, scene))
    .then(compileAndDisplayFooter);
};

const applyPublicStylesheet = function () {
  return new Promise(function(resolve, reject) {

  })
};


export initUI;