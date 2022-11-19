import dayjs from 'dayjs'
import { SpotPriceOnDate  } from './models/SpotPricesByDate';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

interface ElectricityPriceChartProps {
  spotPricesOnDate: SpotPriceOnDate[];
}

const ElectricityPriceChart = ({ spotPricesOnDate } : ElectricityPriceChartProps) => {

  return (
    <div className='electricity-price-chart'>
      <VictoryChart
        domain={{ y: [0, 0.8] }}
        domainPadding={10}
        width={700}
        height={380}
      >
        <VictoryAxis
          tickValues={[0, 3, 6, 9, 12, 15, 18, 21]}
          tickFormat={['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']}
          style={{
            axis: {
              stroke: '#FFF'
            },
            tickLabels: {
              fill: '#FFF'
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickCount={8}
          tickFormat={(x) => (`${x.toFixed(2)}€`)}
          offsetX={45}
          style={{
            axis: {
              stroke: '#FFF'
            },
            tickLabels: {
              fill: '#FFF'
            },
            grid: {
              stroke: '#777',
              strokeDasharray: '10'
            }
          }}
        />
        <VictoryBar
          data={spotPricesOnDate}
          x='hour'
          y='priceWithMargin'
          style={{
            data: {
              fill: '#FFF'
            }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default ElectricityPriceChart;