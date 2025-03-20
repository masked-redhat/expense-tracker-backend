import { response } from "express";

response.modSend = function (message, statusCode, otherData = {}) {
  this.status(statusCode).json({ message, ...otherData });
};

response.failure = function (message, statusCode = 400, otherData = {}) {
  this.modSend(message, statusCode, otherData);
};

response.ok = function (message, otherData = {}) {
  this.modSend(message, 200, otherData);
};

response.serverError = function () {
  this.modSend("Internal Server Error", 500);
};

response.created = function (message, otherData = {}) {
  this.modSend(message, 201, otherData);
};

response.unauth = function (message, otherData = {}) {
  this.modSend(message, 401, otherData);
};

response.deleted = function () {
  this.sendStatus(204);
};

response.conflict = function (message, otherData = {}) {
  this.modSend(message, 409, otherData);
};

response.forbidden = function (message, otherData = {}) {
  this.modSend(message, 403, otherData);
};
