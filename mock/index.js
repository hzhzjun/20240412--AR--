
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const coopFrontVariable = require("./common/coopFrontVariable");
const {AESEncrypt} = require("./Crypto");

const proxy = {
  ...require("./project"),
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /coop_frontVariable.query": coopFrontVariable,

  "GET /spring/start.do": {
    "code": "code",
    "success": true,
    "message": "message",
    "timeStamp": Date.now(),
    "data": AESEncrypt(JSON.stringify({
      "startId": "officia",
      "countDown": 30
    }), "1696BD3E5BB915A0", "cDOiBC1n2QrkAY2P"),
  },

};
module.exports = proxy;
