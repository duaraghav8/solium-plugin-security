/**
 * @fileoverview Utility functions for the rest of the code base.
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

/**
 * @param {Object} node The node to check
 * @param {String} type The type of the node
 * @returns {Boolean} true if the given node is the right type
 */
function isNodeType (node, name) {
  return node['type'] === name;
}

module.exports = {

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is an BlockStatement
   */
  isBlock: function (node) {
    return isNodeType(node, 'BlockStatement');
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is an BreakStatement
   */
  isBreak: function (node) {
    return isNodeType(node, 'BreakStatement');
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is an ExpressionStatement
   */
  isExpression: function (node) {
    return isNodeType(node, 'ExpressionStatement');
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is an AssignmentStatement
   */
  isAssignment: function (node) {
    return isNodeType(node, 'AssignmentExpression');
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is an UpdateExpression
   */
  isUpdate: function (node) {
    return isNodeType(node, 'UpdateExpression');
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is an IfStatement
   */
  isIfStatement: function (node) {
    return isNodeType(node, 'IfStatement');
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} true if the given node is a type of loop statement
   */
  isLoopStatement: function (node) {
    return ['ForStatement', 'WhileStatement', 'DoWhileStatement'].indexOf(node['type']) >= 0;
  }
};
