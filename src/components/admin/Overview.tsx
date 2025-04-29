import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    patients: 400,
    doctors: 30,
  },
  {
    name: "Feb",
    patients: 500,
    doctors: 32,
  },
  {
    name: "Mar",
    patients: 600,
    doctors: 35,
  },
  {
    name: "Apr",
    patients: 700,
    doctors: 38,
  },
  {
    name: "May",
    patients: 800,
    doctors: 40,
  },
  {
    name: "Jun",
    patients: 900,
    doctors: 42,
  },
  {
    name: "Jul",
    patients: 1000,
    doctors: 45,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="patients"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="doctors"
          stroke="#82ca9d"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
