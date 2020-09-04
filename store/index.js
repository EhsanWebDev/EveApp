import { createStore, applyMiddleware } from "redux";
import middlewarePromise from "redux-promise";

export default store = createStore(
  reducer,
  {},
  applyMiddleware(middlewarePromise)
);
