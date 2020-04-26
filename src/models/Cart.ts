import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy,
} from 'mobx-state-tree';

export const CartItem = types
  .model({
    id: types.string,
    title: types.string,
    price: types.number,
    availableCoupon: types.optional(types.boolean, true),
  })
  .actions((self) => ({
    remove() {
      // eslint-disable-next-line no-use-before-define
      getParent<typeof Cart>(self, 2).removeItem(self);
    },
  }));

export const Cart = types
  .model({
    items: types.optional(types.array(CartItem), []),
  })
  .actions((self) => ({
    addItem(cartItem: SnapshotIn<typeof CartItem> | Instance<typeof CartItem>) {
      self.items.push(cartItem);
    },
    removeItem(item: SnapshotIn<typeof CartItem>) {
      destroy(item);
    },
  }))
  .views((self) => ({
    get countItems() {
      return self.items.length;
    },
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    },
    // TODO: 확인용으로 잠깐 만들어놓은 메소드, 다쓰면 지우기.
    get listIds() {
      return self.items.map((item) => item.id).join(',');
    },
    getItem(id: string) {
      return self.items.find((item) => item.id === id);
    },
    isExist(id: string) {
      return self.items.map((item) => item.id).indexOf(id) !== -1;
    },
  }));
