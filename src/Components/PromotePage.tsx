import { Typography, Row, Col, Segmented } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import UmtIcon from '../Icons/umtIcon.svg?react';
import CardIcon from '../Icons/card.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import { CommonCard } from './CommonCard';
import { useState } from 'react';
import WebApp from '@twa-dev/sdk';

const { Title, Paragraph } = Typography;

enum ETabs {
  yandex = 'Продвижение в Яндекс.Музыке',
  vk = 'Продвижение в ВК',
  massPosting = 'Масспостинг',
}

const DATA = [
  {
    title: 'Стартовый:',
    description: [
      '100 новых слушателей на трек',
      '100 лайков (на трек и альбов в сумме)',
    ],
    price: '2 900₽',
  },
  {
    title: 'Базовый:',
    description: [
      '200 новых слушателей на трек',
      '200 лайков (на трек и альбов в сумме)',
    ],
    price: '4 900₽',
  },
  {
    title: 'Оптимальный:',
    description: [
      '500 новых слушателей на трек',
      '500 лайков (на трек и альбов в сумме)',
    ],
    price: '11 900₽',
    withBonus: true,
  },
  {
    title: 'Продвинутый:',
    description: [
      '1000 новых слушателей на трек',
      '1000 лайков (на трек и альбов в сумме)',
    ],
    price: '19 900₽',
    withBonus: true,
  },
]

const PRESAVES = [
  {
    title: '50 пресейвов на трек/альбом',
    price: '2 000₽'
  },
  {
    title: '100 пресейвов на трек/альбом',
    price: '3 500₽'
  },
  {
    title: '200 пресейвов на трек/альбом',
    price: '6 200₽'
  },
  {
    title: '500 пресейвов на трек/альбом',
    price: '14 500₽'
  },
]

const MASS_POSTING = [
  {
    title: 'Пакет 100 видеороликов',
    subTitle: (
      <span className='promote-card-subTitle'>под трек артиста в <span style={{fontWeight: '700'}}>одной</span> из соц. сетей на выбор:</span>   
    ),
    description: [
      'Tik-Tok',
      'ВК-клипы',
      'Instagram Reels',
      'YouTube Shorts',
    ],
    price: '14 000₽',
  },
  {
    title: 'Пакет 200 видеороликов',
    subTitle: (
      <span className='promote-card-subTitle'>под трек артиста в <span style={{fontWeight: '700'}}>двух</span> из соц. сетей на выбор по 100 роликов на каждую соц.сеть:</span>   
    ),
    description: [
      'Tik-Tok',
      'ВК-клипы',
      'Instagram Reels',
      'YouTube Shorts',
    ],
    price: '25 000₽',
  },
  {
    title: 'Пакет 300 видеороликов',
    subTitle: (
      <span className='promote-card-subTitle'>под трек артиста в <span style={{fontWeight: '700'}}>трех</span> из соц. сетей на выбор по 100 роликов на каждую соц.сеть:</span>   
    ),
    description: [
      'Tik-Tok',
      'ВК-клипы',
      'Instagram Reels',
      'YouTube Shorts',
    ],
    price: '37 000₽',
  },
  {
    title: 'Пакет 400 видеороликов',
    subTitle: (
      <span className='promote-card-subTitle'>под трек артиста в <span style={{fontWeight: '700'}}>четырех</span> из соц. сетей на выбор по 100 роликов на каждую соц.сеть:</span>   
    ),
    description: [
      'Tik-Tok',
      'ВК-клипы',
      'Instagram Reels',
      'YouTube Shorts',
    ],
    price: '48 000₽',
  },
]

export const PromotePage = () => {
  const [selectedTab, setSelectedTab] = useState<ETabs>(ETabs.yandex);

  const handleBuyButtonClick = (title: string) => {
    const message = `${selectedTab} - ${title.replace(':', '')}`;
    WebApp.openLink(`https://t.me/UseMyTrackEarnBot?start=${encodeURI(message)}`);
  }

  const renderPromoteBlock = ({title, description, price, withBonus, subTitle}: {title: string, description?: string[], price: string, withBonus?: boolean, subTitle?: JSX.Element}) => {
    return (
      <CommonCard key={title} style={{padding: '10px', marginTop: '12px', display: 'flex', flexDirection: 'column'}}>
        <div className="promote-card">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className='promote-card-info'>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                  {/* <ThunderboltFilled /> */}
                  <div style={{display: 'flex', alignItems: 'center', fontSize: '18px'}}>⚡</div>
                  <span style={{marginLeft: '8px', fontSize: '16px', fontWeight: '500', textAlign: 'left', lineHeight: '20px'}}>{title}</span>
                </div>
                {subTitle}
              </div>
              {description?.length && <div style={{display: 'flex', flexDirection: 'column', paddingTop: '10px'}}>
                {description.map((descrItem, i) => (
                  <span className='promote-card-info-list' key={i}>{descrItem}</span>
                ))}
              </div>}
            </div>
            <div className='promote-card-price-with-button'>
                <span>{price}</span>
                <CommonCard className='promote-button' onClick={() => handleBuyButtonClick(title)}>
                  Купить
                </CommonCard>
            </div>
          </div>
        </div>
        {withBonus && <div className='promote-card-bonus'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontSize: '20px', marginRight: '3px'}}>🌟</span>
            <span style={{fontSize: '16px', fontWeight: '500', paddingRight: '40px'}}>Бонус!</span>
          </div>
          <div style={{fontSize: '12px', fontWeight: '400', textAlign: 'left'}}>Соберем обратную связь по вашему треку от наших пользователей.</div>
        </div>}
      </CommonCard>
    )
  }

  const renderContent = () => {
    if (selectedTab === ETabs.massPosting) {
      return (
        <>
          <Row gutter={16} className='tiles-container'>
            <Col style={{fontSize: '12px', fontWeight: '300', color: '#919295', textAlign: 'center', marginTop: '20px'}}>
              Публикация видеороликов под треки артистов<br/>в соц. сетях наших пользователей
            </Col>
          </Row>
          <Row gutter={16} className="tiles-container">
            <Col span={24} style={{marginTop: '8px'}}>
              <CommonCard style={{flexDirection: 'column'}}>
                <div style={{textAlign: 'center', fontSize: '60px'}}>🎥</div>
                <div style={{textAlign: 'center', fontSize: '15px', fontWeight: '600', marginTop: '16px'}}>Как это работает:</div>
                <div style={{textAlign: 'center', fontSize: '13px', fontWeight: '300', marginTop: '13px', marginBottom: '20px'}}>Создаем 100 уникальных видеороликов под ваш трек (mood-видео с субтитрами из трека) и наши пользователи публикуют их в своих соц. сетях, каждый свое уникальное видео.</div>
              </CommonCard>
            </Col>
          </Row>
          <Row gutter={16} className="tiles-container">
            <Col style={{marginTop: '12px'}}>
              {MASS_POSTING.map(renderPromoteBlock)}
            </Col>
          </Row>
        </>
      );
    }
    return (
      <>
        <Row gutter={16} className="tiles-container">
          <Col>
            <div className='promotion-title'>Прослушивания</div>
          </Col>
          <Col style={{marginTop: '12px'}}>
            {DATA.map(renderPromoteBlock)}
          </Col>
        </Row>
        <Row gutter={16} className="tiles-container">
          <Col>
            <div className='promotion-title'>Пресейвы</div>
          </Col>
          <Col style={{marginTop: '12px'}}>
            {PRESAVES.map(renderPromoteBlock)}
          </Col>
        </Row>
      </>
    );
  }

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
      <div className='dark-segmented'>
        <Segmented className="custom-segmented" options={[ETabs.yandex, ETabs.vk, ETabs.massPosting]} value={selectedTab} onChange={setSelectedTab} />
      </div>
      {renderContent()}
      <Row gutter={16} className='tiles-container'>
        <Col style={{fontSize: '12px', fontWeight: '300', color: '#919295', textAlign: 'center', marginTop: '20px'}}>
          подробнее об услуге на нашем сайте: <a style={{color: '#919295'}} href="https://usemytrack.ru/">https://usemytrack.ru/</a>
        </Col>
      </Row>
    </div>
  );
};
