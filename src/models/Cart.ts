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
    checkOrder: types.boolean,
    quantity: types.number,
  })
  .actions((self) => ({
    remove() {
      // eslint-disable-next-line no-use-before-define
      getParent<typeof Cart>(self, 2).removeItem(self);
    },
    toggleOrder() {
      self.checkOrder = !self.checkOrder;
    },
    increaseQuantity() {
      self.quantity += 1;
    },
    decreaseQuantity() {
      self.quantity -= 1;
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
    get getItems() {
      return self.items;
    },
    get orderItems() {
      return self.items.filter((item) => item.checkOrder);
    },
    get totalPrice() {
      return this.orderItems.reduce((sum, entry) => sum + (entry.price * entry.quantity), 0);
    },
    get availableCouponItems() {
      return self.items.filter((item) => item.availableCoupon);
    },
    getItem(id: string) {
      return self.items.find((item) => item.id === id);
    },
    isExist(id: string) {
      return self.items.map((item) => item.id).indexOf(id) !== -1;
    },
    discountPrice(type: string, amount: number) {
      const totalCouponItemsPrice = this.availableCouponItems.reduce(
        (sum, entry) => sum + (entry.price * entry.quantity),
        0,
      );

      switch (type) {
        case 'rate': return Number(totalCouponItemsPrice * (amount / 100));
        case 'amount': return totalCouponItemsPrice < amount ? totalCouponItemsPrice : amount;
        default: throw Error;
      }
    },
  }));
