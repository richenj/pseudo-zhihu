// const _ = require('lodash');

export function getCookies(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg)
  if (arr != null)
      return (arr[2]);
  else
      return null;
}
