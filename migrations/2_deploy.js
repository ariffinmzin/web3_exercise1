// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const Course = artifacts.require("Courses");

module.exports = function(deployer) {
  deployer.deploy(Course);
};