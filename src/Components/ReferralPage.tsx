import { Typography, Row, Col } from 'antd';
import UmtIcon from '../Icons/umtIcon.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import TelegramIcon from '../Icons/telegram.svg?react';
import { CommonCard } from './CommonCard';

const { Title, Paragraph } = Typography;

export const ReferralPage = () => {
  const onClick = () => {
    const inviteMessage = "Привет! Присоединяйся к нашему сообществу на сайте! Вот ссылка: https://example.com";
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent('https://example.com')}&text=${encodeURIComponent(inviteMessage)}`;

    window.open(telegramUrl, '_blank');
  }
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
      <Row gutter={16} className="tiles-container" style={{paddingTop: '24px'}}>
        <Col>
          {/* Не выводить если 0? */}
          <span>Твои друзья: 3</span>
        </Col>
        <Col span={24}>
          <CommonCard className="referralList">
            <div className="referralListItem">
              <span>Имя</span>
              <span>Награда</span>
            </div>
            <div className="referralListItem">
              <span>Имя</span>
              <span>Награда</span>
            </div>
            <div className="referralListItem">
              <span>Имя</span>
              <span>Награда</span>
            </div>
          </CommonCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
            <CommonCard className="referralButton" onClick={onClick}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Title level={2} className="rules-title" style={{fontSize: '16px', fontWeight: 600, paddingTop: '8px'}}>Пригласить друга</Title>
                  <TelegramIcon style={{marginLeft: '10px'}} />
                </div>
            </CommonCard>
        </Col>
      </Row>
    </div>
  );
};
