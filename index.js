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
		"enforce-explicit-visibility": require("./rules/enforce-explicit-visibility"),
		"maximum-statements-in-function": require("./rules/maximum-statements-in-function"),
		"no-bit-operations": require("./rules/no-bit-operations"),
		"no-block-members": require("./rules/no-block-members"),
		"no-call-value": require("./rules/no-call-value"),
		"no-continue": require("./rules/no-continue"),
		"no-fixed": require("./rules/no-fixed"),
		"no-inline-assembly": require("./rules/no-inline-assembly"),
		"no-low-level-calls": require("./rules/no-low-level-calls"),
		"no-named-parameters": require("./rules/no-named-parameters"),
		"no-non-256-bit-ints": require("./rules/no-non-256-bit-ints"),
		"no-sha3": require("./rules/no-sha3"),
		"no-suicide-or-selfdestruct": require("./rules/no-suicide-or-selfdestruct"),
		"no-throw": require("./rules/no-throw"),
		"no-type-deduction": require("./rules/no-type-deduction"),
		"no-tx-origin": require("./rules/no-tx-origin"),
		"no-unreachable-code": require("./rules/no-unreachable-code"),
		"no-user-defined-modifiers": require("./rules/no-user-defined-modifiers")
	}
};
