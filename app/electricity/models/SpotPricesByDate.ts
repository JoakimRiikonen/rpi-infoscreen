export interface SpotPricesByDate {
  [date: string]: SpotPriceOnDate[];
}

export interface SpotPriceOnDate {
  hour: number;
  priceNoTax: number;
  priceWithTax: number;
  priceWithMargin: number;
};

