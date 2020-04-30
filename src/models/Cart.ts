import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  destroy,
} from 'mobx-state-tree';
import { Coupon } from 'models/types';
import { COUPON_TYPE_RATE, COUPON_TYPE_AMOUNT } from 'utils/consts';

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
    empty() {
      self.items.forEach((item) => {
        destroy(item);
      });
    },
  }))
  .views((self) => ({
    get countItems() {
      return self.items.length;
    },
    get getItems() {
      return self.items;
    },
    get checkedItems() {
      return self.items.filter((item) => item.checkOrder);
    },
    get totalPrice() {
      return this.checkedItems.reduce((sum, entry) => (sum + (entry.price * entry.quantity)), 0);
    },
    get couponApplicableItems() {
      return this.checkedItems.filter((item) => item.availableCoupon);
    },
    getItem(id: string) {
      return self.items.find((item) => item.id === id);
    },
    isExist(id: string) {
      return self.items.map((item) => item.id).indexOf(id) !== -1;
    },
    discountPrice(coupon: Coupon | undefined) {
      if (coupon === undefined) return 0;

      const { type, discountRate, discountAmount } = coupon;
      const totalCouponItemsPrice = this.couponApplicableItems.reduce(
        (sum, entry) => (sum + (entry.price * entry.quantity)),
        0,
      );

      /* TODO: 더 나은 undefined 핸들링 방안 생각해보기 */
      const rate = discountRate || 100;
      const amount = discountAmount || 0;

      switch (type) {
        case COUPON_TYPE_RATE:
          return Number(totalCouponItemsPrice * (rate / 100));
        case COUPON_TYPE_AMOUNT:
          return totalCouponItemsPrice < amount ? totalCouponItemsPrice : amount;
        default:
          throw Error(/* TODO: Write error message. */);
      }
    },
  }));
