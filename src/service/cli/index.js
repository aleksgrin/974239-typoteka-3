"use strict";

const info = require(`./info`);
const version = require(`./version`);
const generate = require(`./generate`);
const server = require(`./server`);

const Cli = {
  [info.name]: info,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server,
};

module.exports = {
  Cli
};
