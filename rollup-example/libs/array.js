/**
 * 数组类型校验
 * @param {*} target
 * @returns
 */
export const isArray = (target) => {
  return Array.isArray(target);
};
/**
 * 数组去重
 * @param {*} target
 * @returns
 */
export const duplicateKill = (target) => {
  return [...new Set(target)];
};
