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
		let source = context.getSourceCode();

		// eslint-disable-next-line no-unused-vars
		function hasBreakStatement(expr, index, array) {
			return source.isBreakStatement(expr);
		}

		function inspectIfStatement(node) {
			// This returns true if it finds a 'break' statement in the 'if' block
			if (node.alternate && source.isIfStatement(node.alternate)) {
				return inspectIfStatement(node.alternate);
			} else if (node.alternate && source.isBlockStatement(node.alternate)) {
				if (node.alternate.body.some(hasBreakStatement)) { return true; }
			}

			return node.consequent.body.some(hasBreakStatement);
		}

		function inspectLoopStatement(emitted) {
			if (emitted.exit) { return; }
			let node = emitted.node;
			let hasBreak = false;

			for (let expr of node.body.body) {
				if (source.isBreakStatement(expr)) {
					hasBreak = true;
					break;
				} else if (source.isIfStatement(expr)) {
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
