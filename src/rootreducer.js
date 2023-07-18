import { combineReducers, createStore } from "redux";
import WatchListReducer from "./reducers/watchListReducer";


const appReducers = combineReducers({
    WatchListReducer,
})
const rootReducers = (state, action) => {
    return appReducers(state, action)
}

const store = createStore(rootReducers, {});

export default store;