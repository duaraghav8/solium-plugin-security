/**
 * @fileoverview Disallow unreachable code
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

module.exports = {
	meta: {
		docs: {
			recommended: true,
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

			let node = emitted.node;
			let topLevelStatements = node.body.body;
			let lastIndex = topLevelStatements.length - 1;

			let firstTopLevelReturnIndex = topLevelStatements.findIndex(
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
