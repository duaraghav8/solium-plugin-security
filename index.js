/**
 * @fileoverview Entry Point of Solium security plugin
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

"use strict";

module.exports = {

	meta: {
		description: "Official Security-focused lint rules for Solium"
	},

	rules: {
		"no-throw": require("./rules/no-throw"),
		"no-sha3": require("./rules/no-sha3"),
		"no-tx-origin": require("./rules/no-tx-origin"),
		"no-low-level-calls": require("./rules/no-low-level-calls"),
		"no-inline-assembly": require("./rules/no-inline-assembly"),
		"no-call-value": require("./rules/no-call-value"),
		"no-block-members": require("./rules/no-block-members"),
		"enforce-explicit-visibility": require("./rules/enforce-explicit-visibility")
	}

};