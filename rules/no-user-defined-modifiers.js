/**
 * @fileoverview Disallow user-defined modifiers
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Disallow user-defined modifiers"
		},

		schema: []
	},

	create: function(context) {
		function inspectModifierDeclaration(emitted) {
			var node = emitted.node;

			if (emitted.exit) {
				return;
			}

			context.report({
				node: node,
				message: "user-defined modifiers are disallowed"
			});
		}

		return {
			ModifierDeclaration: inspectModifierDeclaration
		};
	}
};
