let modules = {};
modules.register = function (module) {
  if(!modules._modules) {
    modules._modules = [];
  }
  modules._modules.push(module);
};

modules.notify = function (event) {
  if( !modules._modules) {
    return;
  }
  let tempModules = modules._modules.slice();
  for(let i=0;i<tempModules.length;i++) {
    // TODO: inject relative param to different event
    tempModules[i][event].call(null);
  }
};

export default modules;