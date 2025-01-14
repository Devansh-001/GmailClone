import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./appSlice"

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
    reducer: {
        appSlice: persistedReducer
    }
});

export const persistor = persistStore(store);

export default store;