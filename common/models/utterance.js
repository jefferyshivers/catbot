"use strict";

const access_key_id = process.env.AWS_access_key_id;
const secret_access_key = process.env.AWS_secret_access_key;

var AWS = require("aws-sdk");
const awsRegion = "us-east-1";
AWS.config.update({
  accessKeyId: access_key_id,
  secretAccessKey: secret_access_key,
  region: awsRegion
});
const lexruntime = new AWS.LexRuntime();

const crypto = require("crypto");

const params = {
  botAlias: "CatBot" /* required */,
  botName: "CatBot" /* required */,
};

module.exports = function (Utterance) {
  Utterance.firstOpen = cb => {
    // create a unique sessionid to keep track of the session
    const sessionid = crypto.randomBytes(20).toString("hex");
    let response = { message: "Hi there. Say something a cat might say!" }
    cb(null, sessionid, response)
  };

  Utterance.remoteMethod("firstOpen", {
    returns: [
      {
        arg: "SessionKey",
        type: "string"
      },
      {
        arg: "Response",
        type: "string"
      }
    ]
  });

  Utterance.message = function (sessionkey, message, cb) {
    let req_params = Object.assign(params, {
      userId: sessionkey,
      inputText: message
    });

    lexruntime.postText(req_params, (err, data) => {
      cb(null, sessionkey, data);
    });
  };

  Utterance.remoteMethod("message", {
    accepts: [
      {
        arg: "SessionKey",
        type: "string"
      },
      {
        arg: "Message",
        type: "string"
      }
    ],
    returns: [
      {
        arg: "SessionKey",
        type: "string"
      },
      {
        arg: "Response",
        type: "string"
      }
    ]
  });
};
