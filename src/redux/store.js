import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const composeEnhanced = composeWithDevTools();
const store = createStore(rootReducer, composeEnhanced);

export default store;
