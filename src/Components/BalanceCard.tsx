/// <reference types="vite-plugin-svgr/client" />
import { Button } from 'antd';
import UmtIcon from '../Icons/umtIcon.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import InfoIcon from '../Icons/info.svg?react';
import { useGetTgUser } from '../api';

export const BalanceCard = ({showBalanceInfo}: {showBalanceInfo: () => void}) => {
  const {data} = useGetTgUser();

  return (
    <div className="balance-container">
      <div className="balance-info">
        <div className="balance-title">Баланс</div>
        <div className="balance-amount">
          <div className="currency">
            <RubbleIcon className="currency-icon" />
            <span className="currency-value">{data?.balance_rub}</span>
          </div>
          <div className="currency">
            <UmtIcon className="currency-icon" />
            <span className="currency-value">{data?.balance_umt}</span>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="balance-actions">
        <Button
          type="text"
          icon={<InfoIcon style={{ fontSize: '24px' }} />}
          onClick={showBalanceInfo}
          className="info-button"
        />
      </div>
    </div>
  );
};
