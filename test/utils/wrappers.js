// duplicated from solium's test/utils/wrappers.js

module.exports = {
	/**
	 * Wrap a solidity statement in valid contract boilerplate.
	 * @param  {String} code Solidity snippet to wrap
	 * @return {String}      wrapped snippet
	 */
	toContract: function(code) {
		var pre = "pragma solidity ^0.4.3;\n\n\ncontract Wrap {\n\t";
		var post = "\n}";
		return pre + code + post;
	}
};
