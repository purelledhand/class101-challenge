export interface Coupon {
  type: string;
  title: string;
  discountRate?: number,
  discountAmount?: number
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  availableCoupon?: boolean;
  checkOrder: boolean,
}
