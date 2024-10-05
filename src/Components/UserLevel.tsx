import { Progress } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useGetTgUser } from '../api';
import { levelsInfo } from './MainTask';

export const UserLevel = ({ onLevelClick }: {onLevelClick: () => void}) => {
  const {data} = useGetTgUser();
  const userLvl = data?.level_id;
  const prevLevelInfo = levelsInfo[userLvl - 2 || 0];
  const curLevelInfo = levelsInfo[userLvl - 1 || 0];
  const progress = ((Number(data?.balance_umt) - prevLevelInfo.umt_limit!) / (curLevelInfo.umt_limit! - prevLevelInfo.umt_limit!)) * 100 || 3;

  return (
    <div className="user-level">
      <div className="level-header">
        <span className="level-name" onClick={onLevelClick}>
          {curLevelInfo.title}&nbsp;<RightOutlined />
        </span>
        <span className="level-info">Уровень&nbsp;<span className="level-counter">{userLvl}/{levelsInfo.length}</span></span>
      </div>
      <Progress
        percent={progress}
        showInfo={false}
        strokeColor={{
          '0%': '#f5222d', // Красный цвет в начале уровня
          '100%': '#54e60c', // Зеленый цвет к концу уровня
        }}
        trailColor="#32363C" // Цвет незаполненной части
        strokeWidth={13} // Высота прогресс-бара
        className="level-progress"
      />
    </div>
  );
};
