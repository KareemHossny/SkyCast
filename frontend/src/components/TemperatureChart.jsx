import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

function formatTime(unix) {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function TemperatureChart({ forecast, theme }) {
  if (!forecast) return null;

  const data = forecast.items.slice(0, 16).map((item) => ({
    time: formatTime(item.dt),
    temp: Math.round(item.temp)
  }));

  return (
    <motion.div
      className="w-full rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur dark:bg-slate-900/70"
      style={{ boxShadow: `0 25px 60px -40px ${theme.accent}` }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Temperature Trend</h2>
      <div className="mt-4 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff'
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke={theme.accent}
              strokeWidth={3}
              dot={{ r: 3, fill: theme.accent }}
              activeDot={{ r: 5 }}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
