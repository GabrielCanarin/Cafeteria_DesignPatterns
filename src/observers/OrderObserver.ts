export interface OrderObserver {
  update(orderStatus: string): void;
}
