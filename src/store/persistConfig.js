import localStorage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: localStorage,
  blacklist: ["todos"],
  whiteList: [],
};

export default rootPersistConfig;
