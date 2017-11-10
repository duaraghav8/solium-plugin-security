/**
 * @fileoverview Set a maximum number of lines per function
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Set a maximum number of lines per function"
		},

		schema: [
			{
				type: "number"
			}
		]
	},

	create: function(context) {
		var maximumLines = context.options ? context.options : 25;
		var sourceCode = context.getSourceCode();

		function inspectFunctionDeclaration(emitted) {
			if (emitted.exit) {
				return;
			}

			var node = emitted.node;

			var startingLine = sourceCode.getLine(node);
			var endingLine = sourceCode.getEndingLine(node);
			var functionLines = endingLine - startingLine;

			if (functionLines > maximumLines) {
				context.report({
					node: node,
					message:
						"function is " +
						functionLines +
						" lines long, " +
						maximumLines +
						" is the maximum allowed"
				});
			}
		}

		return {
			FunctionDeclaration: inspectFunctionDeclaration
		};
	}
};
