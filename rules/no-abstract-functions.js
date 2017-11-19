/**
 * @fileoverview Discourage use of abstract functions
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

var util = require("util");

module.exports = {

	meta: {

		docs: {
			recommended: true,
			type: "error",
			description: "Discourage use of abstract functions"
		},

		schema: []

	},

	create: function (context) {

		function inspectFunctionDeclaration(emitted) {
			var node = emitted.node, message;
			if (!emitted.exit && node.is_abstract) {
				if (node.name) {
					message = util.format("\"%s\": Avoid using abstract functions", node.name);
				} else {
					message = "Avoid using abstract fallback function";
				}

				context.report({ node, message });
			}
		}

		return {
			FunctionDeclaration: inspectFunctionDeclaration
		};

	}

};
