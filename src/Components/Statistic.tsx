import { Typography } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const data = [
  { type: 'На проверке', value: 3 },
  { type: 'Одобрено', value: 2 },
  { type: 'Отклонено', value: 0 },
];

const COLORS = ['#adada2', '#23e63d', '#db2121'];

const RADIAN = Math.PI / 180;

// Функция для отображения меток внутри секторов
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Положение метки
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (!value) {
    return null;
  }
  return (
    <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
      {value}
    </text>
  );
};

export const DemoPie = () => {
  if (!data.length) {
    return (
      <Title level={4} italic>Тапай на наушники и приступай к выполнению заданий!</Title>
    )
  }
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel} // Использование функции для кастомных меток
              labelLine={false} // Убираем линию меток, чтобы текст находился непосредственно внутри секторов
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, _name, props) => [`${value}`, `${props.payload.type}`]} />
            <Legend
              formatter={(_value, entry) => `${(entry.payload as any).type}`}
              wrapperStyle={{ color: 'black' }} // Установка цвета текста в легенде
            />
          </PieChart>
      </ResponsiveContainer>
    </div>
  );
}