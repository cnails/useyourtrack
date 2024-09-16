import { Typography, Row, Col } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import UmtIcon from '../Icons/umtIcon.svg?react';
import CardIcon from '../Icons/card.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import { CommonCard } from './CommonCard';

const { Title, Paragraph } = Typography;

export const PromotePage = () => {
  return (
    <div className="rules-page-container">
      <Title level={2} className="rules-title">Продвижение</Title>
      <Paragraph className="promotion-description">
        Вы можете выполнять задания, копить<br/>рубли и umt и продвигать свои треки<br/>БЕСПЛАТНО
      </Paragraph>
      
      <Row gutter={16} className="tiles-container">
        <Col>
          <CommonCard>
            <div className="promotion-tile-icon">💳</div>
            <div className="promotion-tile-description">Накопленные средства в рублях вы можете выводить на свою карту, либо покупать на них пакеты продвижения, оплачивая заказ частично либо полностью.</div>
          </CommonCard>
        </Col>
        <Col>
          <CommonCard>
            <div className="promotion-tile-icon">🔋</div>
            <div className="promotion-tile-description">Каждый новый уровень, который открывается при накоплении umt будет давать вам новый бесплатный пакет слушателей на ваш трек.</div>
          </CommonCard>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container">
        <Col>
            <div className='promotion-title'>Сейчас вам доступно:</div>
        </Col>
        <Col>
            <CommonCard className='promotion-available-button'>
                <div style={{fontSize: '16px', fontWeight: '500'}}>
                    Пакет 30 слушателей. Активировать.
                </div>
            </CommonCard>
        </Col>
        <Col>
            <div className='promotion-available-description'>
                После активации пакета, ваш трек запустится в работу в течение 48 часов
            </div>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container">
        <Col>
            <div className='pay-promotion-title'>Вы можете воспользоваться нашими платными пакетами продвижения в Яндекс Музыке:</div>
        </Col>
      </Row>
    </div>
  );
};
