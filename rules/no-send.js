/**
 * @fileoverview Discourage use of 'send' as it is unsafe
 * @author Tristan Homsi <tristanhomsi@gmail.com>
 */

'use strict';

function isSend (calleeNode) {
	return (calleeNode.property.type === 'Identifier' &&
		calleeNode.property.name === 'send'
	);
}

module.exports = {

	meta: {

		docs: {
			recommended: true,
			type: 'warning',
			description: 'Ensure no use of \'send\' in the code'
		},

		schema: []
	},

	create: function (context) {
		function inspectCallExpression (emittedObject) {
			if (!emittedObject.exit) {
				return;
			}

			var callee = emittedObject.node.callee;

			if (isSend (callee.parent)) {
				context.report ({
					node: emittedObject.node,
					message: '\'send\' is unsafe. Instead, consider using \'transfer\' or a pattern where the recipient withdraws the money.'
				});

			}
		}

		return {
			CallExpression: inspectCallExpression
		};
	}

};
