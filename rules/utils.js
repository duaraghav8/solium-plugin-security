/**
 * @fileoverview Utility functions for the rest of the code base.
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

module.exports = {

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} isObject true if the given node is an ExpressionStatement
   */
  isExpression: function (node) {
    return node['type'] === 'ExpressionStatement';
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} isObject true if the given node is an AssignmentStatement
   */
  isAssignment: function (node) {
    return node['type'] === 'AssignmentExpression';
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} isObject true if the given node is an UpdateExpression
   */
  isUpdate: function (node) {
    return node['type'] === 'UpdateExpression';
  },

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} isObject true if the given node is an IfStatement
   */
  isIfStatement: function (node) {
    return node['type'] === 'IfStatement';
  }

  /**
   * @param {Object} node The node to check
   * @returns {Boolean} isObject true if the given node is a type of loop statement
   */
  isLoopStatement: function (node) {
    return ['ForStatement', 'WhileStatement', 'DoWhileStatement'].indexOf(node['type'])
};
