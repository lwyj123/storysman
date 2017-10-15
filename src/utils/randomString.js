const randomString = function(options) {
  let _charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnqrstuvwxyz0123456789"
  let _options = {
    length: 6
  }
  let option = Object.assign({}, _options, options);

  let ans = [];
  for(let i=0;i<option.length;i++) {
    let charsetIndex = parseInt(Math.random()*60);
    ans.push(_charset[charsetIndex])
  }
  return ans.join('');
}

export default randomString;