/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { Modal, Button } from 'antd';
import UmtIcon from '../assets/umtIcon.svg?react';
import RubbleIcon from '../assets/rubbleIcon.svg?react';
import InfoIcon from '../assets/info.svg?react';

export const BalanceCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="balance-container">
      <div className="balance-info">
        <div className="balance-title">Баланс</div>
        <div className="balance-amount">
          <div className="currency">
            <RubbleIcon className="currency-icon" />
            <span className="currency-value">1000</span>
          </div>
          <div className="currency">
            <UmtIcon className="currency-icon" />
            <span className="currency-value">850</span>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="balance-actions">
        <Button
          type="text"
          icon={<InfoIcon style={{ fontSize: '24px' }} />}
          onClick={showModal}
          className="info-button"
        />
      </div>
      <Modal
        title="Информация о балансе"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="info-modal"
      >
        <p>Здесь можно разместить дополнительную информацию о балансе пользователя.</p>
      </Modal>
    </div>
  );
};
