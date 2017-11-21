/**
 * @fileoverview Discourage use of named returns in functions
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

module.exports = {

	meta: {

		docs: {
			recommended: true,
			type: "error",
			description: "Discourage use of named returns in functions"
		},

		schema: []

	},

	create: function (context) {

		function inspectFunctionDeclaration(emitted) {
			var node = emitted.node;
			if (emitted.exit || !node.returnParams) { return; }

			for (let param of node.returnParams) {
				if (!param.id) { continue; }

				const message = node.name ?
					`Avoid using named returns in function ${node.name}` : "Avoid using named returns in fallback function";

				context.report({ node, message });
			}
		}

		return {
			FunctionDeclaration: inspectFunctionDeclaration
		};

	}

};
