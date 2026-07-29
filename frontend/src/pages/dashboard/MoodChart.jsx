import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function MoodChart({ moods }) {
  const chartData = moods
    .slice(0, 14)
    .reverse()
    .map(mood => ({
      date: mood.date.split(' ').slice(1, 3).join(' '),
      score: mood.score,
    }));

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3>Mood Trend (Last 14 days)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip
            formatter={(value) => {
              const emojis = ['😢', '😟', '😐', '🙂', '😊'];
              return [`${emojis[value - 1]} ${value}`, 'Mood'];
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6c63ff"
            strokeWidth={2}
            dot={{ fill: '#6c63ff', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;