/**
 * @fileoverview Disallow non-256 bit integers
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

const ALLOWED_INTS = [
	"int", // alias for int256
	"int256",
	"uint", // alias for uint256
	"uint256"
];

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Discourage use of non-256 bit integers"
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

			if (
				(variableType.indexOf("int") === 0 || variableType.indexOf("uint") === 0) &&
				ALLOWED_INTS.indexOf(variableType) === -1
			) {
				context.report({
					node: node,
					message: `${variableType} is a non-256 bit integer. Avoid usage.`
				});
			}
		}

		return {
			DeclarativeExpression: inspectDeclarationExpression
		};
	}
};
