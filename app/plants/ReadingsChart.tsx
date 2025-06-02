import { Data, VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from "victory";
import { ReadingResponse } from "./models/ReadingResponse";
import dayjs from "dayjs";

interface ReadingsChartProps {
  readingsOnDate?: ReadingResponse[];
  selectedDate: string;
}

const ReadingsChart = ({ readingsOnDate, selectedDate }: ReadingsChartProps) => {
  if (!readingsOnDate) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div>
      <VictoryChart
        domain={{ y: [0, 50] }}
        width={700}
        height={430}
        style={{
          parent: {
            padding: '0px',
            margin: '-20px 0',
          }
        }}
      >
        <VictoryAxis
          tickValues={readingsOnDate.map(r => r.time)}
          tickFormat={(x, i) => i % 8 == 0 ? dayjs(x).format('HH:mm') : ''}
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
          tickFormat={(x) => (`${x} C`)}
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
        <VictoryLine
          data={readingsOnDate}
          y='temperature'
          style={{
            data: {
              stroke: '#FFF'
            }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default ReadingsChart;