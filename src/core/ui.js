const initUI = function (scene) {
  return applyStylesheet()
    .then(loadAndRender.bind(this, scene))
    .then(compileAndDisplayFooter);
};

applyStylesheet = function () {
  var deferred = q.defer();
  if (files['style.css'] !== undefined) {
    q($.get(files['style.css'].raw_url))
      .then(function (content) {
        $('<style>')
          .attr('type', 'text/css')
          .html(content)
          .appendTo('head');
      })
      .fin(deferred.resolve);
  } else {
    deferred.resolve();
  }
  return deferred.promise;
};


export initUI;