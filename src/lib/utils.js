/**
 * The functions below provide convenient immutable array mutations matching
 * JavaScript's core mutable array methods.
 */


export const remove = (arr, index) => [...arr.slice(0, index), ...arr.slice(index + 1)];


export const insert = (arr, index, value) => [...arr.slice(0, index), value, ...arr.slice(index)];


export const push = (arr, value) => [...arr, value];


/**
 * Move an item to other position in an array
 * @param {array} arr dragged parent array
 * @param {number} from index of dragged item in dragged parent
 * @param {number} to index of target in dragged parent
 * @returns {array} new updated array
 */
export const move = (arr, from, to) => insert(remove(arr, from), to, arr[from]);