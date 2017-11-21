/**
 * @fileoverview Disallow unreachable code
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Disallow unreachable code"
		},

		schema: []
	},

	create: function(context) {
		function inspectFunctionDeclaration(emitted) {
			if (emitted.exit) {
				return;
			}

			var node = emitted.node;
			var topLevelStatements = node.body.body;
			var lastIndex = topLevelStatements.length - 1;

			var firstTopLevelReturnIndex = topLevelStatements.findIndex(
				statement => statement.type === "ReturnStatement"
			);

			if (firstTopLevelReturnIndex === -1) {
				return;
			}

			if (firstTopLevelReturnIndex !== lastIndex) {
				context.report({
					node: topLevelStatements[firstTopLevelReturnIndex + 1],
					message: "Code is unreachable."
				});
			}
		}

		return {
			FunctionDeclaration: inspectFunctionDeclaration
		};
	}
};
