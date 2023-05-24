import { createContext, useContext } from "react";
import { configure, observable } from "mobx";
import EntityStore from "./EntityStore";

configure({ enforceActions: "observed" });

class RootStore {
  @observable entityStore = EntityStore;
}

const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider, shame on you.");
  }
  return store;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new RootStore();