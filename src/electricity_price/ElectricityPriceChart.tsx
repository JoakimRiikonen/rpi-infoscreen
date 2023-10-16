import dayjs from 'dayjs'
import { SpotPriceOnDate  } from './models/SpotPricesByDate';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

interface ElectricityPriceChartProps {
  spotPricesOnDate: SpotPriceOnDate[];
}

const ElectricityPriceChart = ({ spotPricesOnDate } : ElectricityPriceChartProps) => {

  return (
    <div className='electricity-price-chart'>
      <VictoryChart
        domain={{ y: [-0.1, 0.8] }}
        domainPadding={10}
        width={700}
        height={360}
        style={{
          parent: {
            padding: '0px',
            margin: '-40px 0',
          }
        }}
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
            },
            labels: {
              fill: '#999'
            }
          }}
          labels={({datum}) => datum?.priceWithMargin?.toFixed(2)}
          labelComponent={
            <VictoryLabel 
              angle={45}
              dx={-15}
              dy={0}
            />
          }
        />
      </VictoryChart>
    </div>
  )
}

export default ElectricityPriceChart;