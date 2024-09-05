import { Typography, Row, Col } from 'antd';
import UmtIcon from '../Icons/umtIcon.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import { CommonCard } from './CommonCard';

const { Title, Paragraph } = Typography;

export const ReferralPage = () => {
  return (
    <div className="referral-page-container">
      <Title level={2} className="rules-title">Пригласите друзей!</Title>
      <Paragraph className="rules-description">
        Вы и ваш друг получите бонусы
      </Paragraph>
      
      <Row gutter={16}>
        <Col span={24}>
          <CommonCard className="prize">
            <img src="https://i.ibb.co/stQHgbH/image.png" alt="prize" style={{width: '75px'}} />
            <div className="prize-title">Пригласить друга</div>
            <div className="prize-description">
             <UmtIcon className="lifehack_amount_icon" style={{zIndex: 999, transform: 'translateX(12px)'}} />
             <RubbleIcon className="lifehack_amount_icon" style={{transform: 'translateX(-12px)'}} />
             <div className="prize-text">
                + 50 umt за приглашенного друга (другу тоже +50 umt+20₽ на счет)
                + 1₽/5umt за каждое выполненное задание другом.
             </div>
            </div>
          </CommonCard>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container">
        <Col>
          <div className="lifehack">
            {/* <ThunderboltFilled className="lifehack-icon" /> */}
            <span className="lifehack-icon"></span>
            <div className="lifehack-title">Лайфхак</div>
            <div className="lifehack-description">Вы можете оформить пробную подписку на Яндекс.Музыку (месяц бесплатно) и получать по 7₽ за прослушивание каждого трека из задания.</div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 10]}>
        <Col span={12}>
            <CommonCard className="lifehack_amount">
                <div className="lifehack_amount_main">
                    <UmtIcon className="lifehack_amount_icon" />
                    <span style={{padding: "6px 2px 0 0"}}>+</span>
                    <RubbleIcon className="lifehack_amount_icon" />
                </div>
                <span className="lifehack_amount_description">Есть задания, за которые начисляются <strong>и рубли и внутренняя валюта</strong></span>
            </CommonCard>
        </Col>
        {/* Todo: вынести серую карточку с закруглением */}
        <Col span={12}>
            <CommonCard className="lifehack_amount">
                <div className="lifehack_amount_main">
                    <UmtIcon className="lifehack_amount_icon" />
                </div>
                <span className="lifehack_amount_description">Есть задания, за которые начисляются <strong>только внутренняя валюта umt</strong></span>
            </CommonCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
            <div className="lifehack_amount_ps">
                узнать подробнее можно, нажав на валюту на главном экране
            </div>
        </Col>
      </Row>
    </div>
  );
};
