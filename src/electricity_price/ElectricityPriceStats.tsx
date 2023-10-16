import React from "react"
import { SpotPriceOnDate } from "./models/SpotPricesByDate";

export interface ElectricityPriceStatsProps {
  spotPricesOnDate: SpotPriceOnDate[];
}

export const ElectricityPriceStats = ({ spotPricesOnDate }: ElectricityPriceStatsProps) => {
  if (!spotPricesOnDate) {
    return (
      <div className="electricity-price-stats">
        <div className="electricity-price-stat">
          <span>loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="electricity-price-stats">
      <div className="electricity-price-stat">
        <span>Average: {(spotPricesOnDate.map(s => s.priceWithMargin).reduce((a,b) => a + b) / spotPricesOnDate.length).toFixed(2)}€</span>
      </div>
      <div className="electricity-price-stat">
        <span>Peak: {(spotPricesOnDate.map(s => s.priceWithMargin).sort((a, b) => b - a)[0]).toFixed(2)}€</span>
      </div>
    </div>
  )
}