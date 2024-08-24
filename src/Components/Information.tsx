import { Table, Tooltip } from 'antd';

const data = [
  { key: '1', level: 1, experience: '0', tasks: 'до 7р + 25 umt' },
  { key: '2', level: 2, experience: '1500', tasks: '8р + 30 umt' },
  { key: '3', level: 3, experience: '3500', tasks: 'до 9р + 35 umt' },
  { key: '4', level: 4, experience: '7000', tasks: 'до 10р + 40 umt' },
  { key: '5', level: 5, experience: '11000', tasks: 'до 11р + 45 umt' },
  { key: '6', level: 6, experience: '15000', tasks: 'до 12р + 50 umt' },
  { key: '7', level: 7, experience: '22000', tasks: 'до 13р + 55 umt' },
  { key: '8', level: 8, experience: '29000', tasks: 'до 14р + 60 umt' },
  { key: '9', level: 9, experience: '40000', tasks: 'до 15р + 65 umt' },
];

const columns = [
  {
    title: 'Уровень',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'кол-во umt для достижения',
    dataIndex: 'experience',
    key: 'experience',
  },
  {
    title: (
        <Tooltip  title="Награда за выполнение заданий на аккаунте без подписки Я.Музыки: фиксировано 4р + umt от 15 на первом, до 55 на последнем">
          <span>Награды за задания*</span>
        </Tooltip>
      ),
    dataIndex: 'tasks',
    key: 'tasks'
  }
];

export const LevelsTable = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    bordered
    title={() => 'Уровни и условия достижения'}
    rowClassName={(record) => record.level === 5 ? 'highlight-row' : ''} // текущий уровень пользователя
  />
);
