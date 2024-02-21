import CinnoxSDK from 'm800-liveconnect-sdk/cinnox-sdk-js';

/**
 * @type {CinnoxSDK}
 */
let SDK;

export const initSDK = (config) => {
  SDK = new CinnoxSDK(config);
  return SDK;
};

export const getSDK = () => SDK;
