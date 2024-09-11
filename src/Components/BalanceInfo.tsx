import { Typography, Row, Col } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import UmtIcon from '../Icons/umtIcon.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import { CommonCard } from './CommonCard';

const { Title, Paragraph } = Typography;

export const BalanceInfo = ({close}: {close: () => void}) => {
  return (
    <div className="rules-page-container">
      <a onClick={close}>Вернуться</a>
      <Title level={2} className="rules-title">Баланс</Title>

      <Row gutter={16} className="tiles-container">
        <Col span={24} style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <UmtIcon className="BalanceInfo_currency-icon" />
                    <div className="BalanceInfo_currency-value">25500</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <RubbleIcon className="BalanceInfo_currency-icon" />
                    <div className="BalanceInfo_currency-value">7100</div>
                </div>
            </div>
        </Col>

        <Col style={{marginTop: '50px'}}>
            <Paragraph className="BalanceInfo_balance-description">
                В нашем сервисе существует баланс в рублях и в криптовалюте umt.<br /> 
                Баланс в рублях можно выводить на карту.<br />
                Баланс umt станет доступен после листинга.<br />
                <a href="https://t.me/UseMyTrackEarnBot">Следите за новостями в нашем официальном ТГ-канале.</a>
            </Paragraph>
        </Col>
        <Col style={{marginTop: '25px'}}>
            <Paragraph className="BalanceInfo_balance-description">
                За некоторые задания вы получаете и рубли и umt, за некоторые задания вы получаете только umt. Баланс umt влияет на ваш уровень в нашем сервисе. Чем выше уровень, тем более дорогие задания вам будут попадаться. Подробнее можно узнать, нажав на ваш уровень на главном экране
            </Paragraph>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container">
        <Col>
          <div className="lifehack">
            <div className="lifehack-description" style={{fontWeight: 500, fontSize: '13px'}}>Ежемесячно мы будем поощрять самых активных пользователей, у которых высокий umt баланс дополнительными начислениями в рублях</div>
          </div>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container" style={{paddingTop: '24px'}}>
        <Col>
          {/* Не выводить если 0? */}
          <span>История зачисления:</span>
        </Col>
        <Col span={24}>
          <CommonCard className="referralList">
            <div className="referralListItem">
              <span>Задание №1</span>
              <span>+7р, +25umt</span>
            </div>
            <div className="referralListItem">
              <span>Задание №2</span>
              <span>+7р, +25umt</span>
            </div>
            <div className="referralListItem">
              <span>Задание №3</span>
              <span>+7р, +25umt</span>
            </div>
          </CommonCard>
        </Col>
      </Row>
    </div>
  );
};
