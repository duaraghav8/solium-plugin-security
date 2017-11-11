/**
 * @fileoverview Set a maximum number of statements per function
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Set a maximum number of statements per function"
		},

		schema: [
			{
				type: "integer",
				minimum: 0
			}
		]
	},

	create: function(context) {
		var maximumStatements = context.options ? context.options : 25;
		var sourceCode = context.getSourceCode();

		function getStatementLines(node) {
			var lines = sourceCode
				.getText(node)
				.split(/[\r\n]/g)
				.map(line => line.trim())
				.filter(line => line);

			return lines.length;
		}

		function inspectFunctionDeclaration(emitted) {
			if (emitted.exit) {
				return;
			}

			var node = emitted.node;

			if (!node.body) {
				return;
			}

			var topLevelStatements = node.body.body;

			var numberOfStatements = topLevelStatements.reduce((total, statement) => {
				return total + getStatementLines(statement);
			}, 0);

			if (numberOfStatements > maximumStatements) {
				context.report({
					node: node,
					message:
						"function contains " +
						numberOfStatements +
						" statements, " +
						maximumStatements +
						" is the maximum allowed"
				});
			}
		}

		return {
			FunctionDeclaration: inspectFunctionDeclaration
		};
	}
};
