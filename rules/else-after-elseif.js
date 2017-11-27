/**
 * @fileoverview Encourage else blocks after else-if blocks
 * @author Michelle Pokrass <michellepokrass@gmail.com>
 */

"use strict";

module.exports = {

	meta: {
		docs: {
			description: "Encourage else blocks after else-if blocks",
			recommended: false,
			type: "error"
		},

		schema: []
	},

	create(context) {
		let source = context.getSourceCode();

		function inspectElseIfStatement(node) {
			// if the else if does not have an alternate, that means there is
			// no else - report an error
			if (!node["alternate"]) {
				context.report({
					node: node,
					message: "\"else if\" statement must be followed by an \"else\" statement"
				});
			} else if (source.isIfStatement(node["alternate"])) {
				inspectElseIfStatement(node["alternate"]);
			}
		}

		function inspectIfStatement(emitted) {
			if (emitted.exit) { return; }
			let node = emitted.node;

			let sourceCode = context.getSourceCode();
			let parent = sourceCode.getParent(node);

			// only inspect top-level if statements
			if (source.isIfStatement(parent)) {
				return;
			}

			if (node["alternate"] && source.isIfStatement(node["alternate"])) {
				inspectElseIfStatement(node["alternate"]);
			}
		}

		return {
			IfStatement: inspectIfStatement
		};
	}

};
