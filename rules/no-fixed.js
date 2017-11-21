/**
 * @fileoverview Disallow fixed point types
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Disallow fixed point types"
		},

		schema: []
	},

	create: function(context) {
		function inspectDeclarationExpression(emitted) {
			if (emitted.exit) {
				return;
			}

			var node = emitted.node;
			var variableType = node.literal.literal;

			if (typeof variableType !== "string") {
				return;
			}

			if (variableType.indexOf("fixed") === 0 || variableType.indexOf("ufixed") === 0) {
				context.report({
					node: node,
					message: `${variableType}: Avoid using fixed types.`
				});
			}
		}

		return {
			DeclarativeExpression: inspectDeclarationExpression
		};
	}
};
