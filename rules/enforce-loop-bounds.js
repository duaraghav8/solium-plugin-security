/**
 * @fileoverview Flag all loops which don't have fixed bounds
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

module.exports = {

	meta: {

		docs: {
			recommended: true,
			type: "error",
			description: "Flag all loops which don't have fixed bounds"
		},

		schema: []

	},

	create: function (context) {

		// eslint-disable-next-line no-unused-vars
		function hasBreakStatement(expr, index, array) {
			return expr.type === "BreakStatement";
		}

		function inspectIfStatement(node) {
			// This returns true if it finds a 'break' statement in the 'if' block
			if (node.alternate && node.alternate.type === "IfStatement") {
				return inspectIfStatement(node.alternate);
			} else if (node.alternate && node.alternate.type === "BlockStatement") {
				if (node.alternate.body.some(hasBreakStatement)) { return true; }
			}

			return node.consequent.body.some(hasBreakStatement);
		}

		function inspectLoopStatement(emitted) {
			if (emitted.exit) { return; }
			var node = emitted.node;
			var hasBreak = false;

			for (let expr of node.body.body) {
				if (expr.type === "BreakStatement") {
					hasBreak = true;
					break;
				} else if (expr.type === "IfStatement") {
					hasBreak = inspectIfStatement(expr);
				}
			}

			if ((!node.test || node.test.value == true) && !hasBreak) {
				context.report({
					node: node,
					message: "Loop should have fixed bounds."
				});
			}
		}

		return {
			ForStatement: inspectLoopStatement,
			WhileStatement: inspectLoopStatement,
			DoWhileStatement: inspectLoopStatement
		};

	}

};
