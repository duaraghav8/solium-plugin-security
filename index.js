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
		"enforce-else-after-else-if": require("./rules/enforce-else-after-else-if"),
		"enforce-explicit-visibility": require("./rules/enforce-explicit-visibility"),
		"enforce-loop-bounds": require("./rules/enforce-loop-bounds"),
		"enforce-placeholder-last": require("./rules/enforce-placeholder-last"),
		"enforce-single-end-return": require("./rules/enforce-single-end-return"),
		"maximum-statements-in-function": require("./rules/maximum-statements-in-function"),
		"max-one-break-per-loop": require("./rules/max-one-break-per-loop"),
		"no-abstract-functions": require("./rules/no-abstract-functions"),
		"no-bit-operations": require("./rules/no-bit-operations"),
		"no-block-members": require("./rules/no-block-members"),
		"no-call-value": require("./rules/no-call-value"),
		"no-continue": require("./rules/no-continue"),
		"no-fixed": require("./rules/no-fixed"),
		"no-inline-assembly": require("./rules/no-inline-assembly"),
		"no-inheritance": require("./rules/no-inheritance"),
		"no-multiple-inheritance": require("./rules/no-multiple-inheritance"),
		"no-low-level-calls": require("./rules/no-low-level-calls"),
		"no-mod-iter-var-for-loop": require("./rules/no-mod-iter-var-for-loop"),
		"no-named-parameters": require("./rules/no-named-parameters"),
		"no-named-returns": require("./rules/no-named-returns"),
		"no-non-256-bit-ints": require("./rules/no-non-256-bit-ints"),
		"no-send": require("./rules/no-send"),
		"no-sha3": require("./rules/no-sha3"),
		"no-assign-parameter": require("./rules/no-assign-parameter"),
		"no-suicide-or-selfdestruct": require("./rules/no-suicide-or-selfdestruct"),
		"no-throw": require("./rules/no-throw"),
		"no-type-deduction": require("./rules/no-type-deduction"),
		"no-tx-origin": require("./rules/no-tx-origin"),
		"no-unreachable-code": require("./rules/no-unreachable-code"),
		"no-user-defined-modifiers": require("./rules/no-user-defined-modifiers"),
		"no-void-returns": require("./rules/no-void-returns")
	}
};
