import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    uv: 10000,
    pv: 2400,
  },
  {
    uv: 3000,
    pv: 1398,
  },
  {
    uv: 2000,
    pv: 9800,
  },
  {
    uv: 2780,
    pv: 3908,
  },
  {
    uv: 1890,
    pv: 4800,
  },
  {
    uv: 2390,
    pv: 3800,
  },
  {
    uv: 3490,
    pv: 4300,
  },
  {
    uv: 4490,
    pv: 4300,
  },
];

function Graph(props) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="liquido" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="vapor" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
