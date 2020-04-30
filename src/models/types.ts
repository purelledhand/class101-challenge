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
  price: string;
  availableCoupon?: boolean;
  checkOrder: boolean,
}
