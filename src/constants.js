"use strict";

const ExitCode = {
  SUCCESS: 0,
  FAIL: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  ExitCode,
  HttpCode,
};
