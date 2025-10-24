export interface SpotPricesByDate {
  [date: string]: SpotPriceOnDate[];
}

export interface SpotPriceOnDate {
  dateTime: string;
  priceNoTax: number;
  priceWithTax: number;
  priceWithMargin: number;
};

