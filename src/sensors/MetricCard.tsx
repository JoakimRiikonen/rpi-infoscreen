import React from "react";

export interface MetricCard {
  icon: string;
  text: string;
}

const MetricCard = ({ icon, text }: MetricCard) => {

  return (
    <div className="metric-card">
      <i className={`bi-${icon}`}></i>
      <span className="metric-card-text">{text}</span>
    </div>
  );
}

export default MetricCard;