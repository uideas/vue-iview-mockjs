import pathToRegexp from "path-to-regexp";

export default {
  toPath: function(api, param) {
    let toPath = pathToRegexp.compile(api);
    return toPath(param);
  },
  renderError(err, $obj) {
    let _obj = $obj;
    if (typeof err == "object") {
      for (let item in err) {
        _obj.errors[item] = err[item][0];
      }
    } else {
      _obj.$Message.error(err);
    }
  }
};
