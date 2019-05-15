const Mock = require("mockjs");
const Random = Mock.Random;
const getQueryString = function(params, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = params.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

const SignIn = function(params) {
  let UserName = getQueryString(params.body, "UserName");
  let Password = getQueryString(params.body, "Password");
  console.log("UserName: " + UserName + "; Password: " + Password);
  let res = {};
  res.errors = [];
  res.code = 200;
  res.data = {};
  res.data.Name = "Jhon";
  res.data.Token = "123ABC456DEF";
  res.data.Age = "18";
  res.data.Gender = 1;
  return res;
};

const SignUp = function(params) {
  let NickName = getQueryString(params.body, "NickName");
  let Age = getQueryString(params.body, "Age");
  let Gender = getQueryString(params.body, "Gender");
  let res = {};
  res.errors = [];
  res.code = 200;
  res.data = {};
  res.data.Name = NickName;
  res.data.Token = "123ABC456DEF";
  res.data.Age = Age;
  res.data.Gender = Gender;
  return res;
};

Mock.mock("/dev/auth/signIn", "post", SignIn);
Mock.mock("/dev/auth/signUp", "post", SignUp);
