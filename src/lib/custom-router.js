import { Router } from 'express';


export default class CustomRouter {
  constructor() {
    this.router = new Router();
  }

  getRoutes() {
    return this.router;
  }

  setHandler(fn) {
    this.router.use(fn);
  }

  wrapAsync(fn) {
    return (req, res, next) => {
      fn(req, res).catch(next);
    };
  }

  get(path, fn, ...handles) {
    this.router.get(path, ...handles, this.wrapAsync(fn));
  }

  post(path, fn, ...handles) {
    this.router.post(path, ...handles, this.wrapAsync(fn));
  }

  delete(path, fn, ...handles) {
    this.router.delete(path, ...handles, this.wrapAsync(fn));
  }

  put(path, fn, ...handles) {
    this.router.put(path, ...handles, this.wrapAsync(fn));
  }

  update(path, fn, ...handles) {
    this.router.update(path, ...handles, this.wrapAsync(fn));
  }

  path(path, fn, ...handles) {
    this.router.path(path, ...handles, this.wrapAsync(fn));
  }
}
