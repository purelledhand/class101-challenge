import { useContext, createContext } from 'react';
import { types, Instance } from 'mobx-state-tree';

import { Cart } from './Cart';

const RootModel = types.model({
  cart: Cart,
});

export const rootStore = RootModel.create({
  cart: { items: [] },
});

// eslint-disable-next-line no-console
// onSnapshot(rootStore, (snapshot) => console.log('Snapshot: ', snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
