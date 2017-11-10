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
				type: "integer",
				minimum: 0
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

			var functionText = sourceCode.getText(node);

			var functionLines = functionText
				.split(/[\r\n]/g)
				.map(line => line.trim())
				.filter(line => line);

			if (functionLines.length > maximumLines) {
				context.report({
					node: node,
					message:
						"function is " +
						functionLines.length +
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
