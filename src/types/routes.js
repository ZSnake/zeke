// @flow

export type Route = {
  method: string,
  path: string,
  handler: (request: Object, h?: Object) => Promise<*> | Function,
  config?: Object,
};
