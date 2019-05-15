const Mock = require("mockjs");
const Random = Mock.Random;

const GetNotificationCount = function() {
  let res = {};
  res.errors = [];
  res.code = 200;
  res.data = {};
  res.data.Code = 10;
  return res;
};

Mock.mock("/dev/notification", "get", GetNotificationCount);
