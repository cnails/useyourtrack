import { Progress, Tooltip } from 'antd';
import { RightOutlined } from '@ant-design/icons';

export const UserLevel = ({ levelName, currentLevel, maxLevel, experiencePercentage, onLevelClick }) => {
  return (
    <div className="user-level">
      <div className="level-header">
        <Tooltip title="Нажмите, чтобы узнать больше о вашем уровне">
          <span className="level-name" onClick={onLevelClick}>
            {levelName} <RightOutlined />
          </span>
        </Tooltip>
        <span className="level-info">Уровень <span className="level-counter">{currentLevel}/{maxLevel}</span></span>
      </div>
      <Progress
        percent={experiencePercentage}
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
