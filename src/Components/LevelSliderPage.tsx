import { Typography, Row, Col, Carousel } from 'antd';
import ArrowLeft from '../Icons/arrowLeft.svg?react';
import ArrowRight from '../Icons/arrowRight.svg?react';
import { CommonCard } from './CommonCard';
import { levelsInfo } from './MainTask';
import { useRef, useState } from 'react';
import { useGetTgUser } from '../api';

const { Title } = Typography;

const RUB_REWARD_WITH_SUB = 7;
const UMT_REWARD_WITH_SUB = 25;
const RUB_REWARD_WITHOUT_SUB = 4;

export const LevelSliderPage = ({close}: {close: () => void}) => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const {data} = useGetTgUser();
  const carouselRef = useRef<any>(null); // Реф для управления каруселью

  // Функция для переключения на следующий слайд
  const next = () => {
    carouselRef.current.next();
  };

  // Функция для переключения на предыдущий слайд
  const prev = () => {
    carouselRef.current.prev();
  };

  const handleChange = (_, next) => {
    setSelectedLevel(next);
  }

  return (
    <div className="referral-page-container">
      <a onClick={close} style={{display: 'inline-block', marginBottom: '10px'}}>Вернуться</a>
      <Title level={2} className="rules-title" style={{marginBottom: '30px'}}>Уровни в приложении</Title>
      <div className="slider-container">
        {selectedLevel !== 0 && (<button className="slider-button left" onClick={prev}>
          <ArrowLeft />
        </button>)}
        {/* <Carousel arrows infinite={false} beforeChange={handleChange} prevArrow={<ArrowLeft />} nextArrow={<ArrowRight />}> */}
        <Carousel style={{overflow: 'visible'}} ref={carouselRef} arrows infinite={false} beforeChange={handleChange} prevArrow={<></>} nextArrow={<></>}>
          {levelsInfo.map(({imageSrc, color_1, color_2}) => {
            const colorProps = {'--color-1': color_1, '--color-2': color_2} as any;
            return (
              <div className='carousel-content-wrapper'>
                <img src={imageSrc as string} alt="Custom Icon" className="carousel-image" />
                <div className='gradient-circle' style={colorProps} />
              </div>
            );
          })}
        </Carousel>
        {selectedLevel !== (levelsInfo.length - 1) && (<button className="slider-button right" onClick={next}>
          <ArrowRight />
        </button>)}
      </div>
      <Row gutter={[16, 16]} style={{paddingTop: '24px'}}>
        <Col span={12}>
          <CommonCard className="level-info-text">
            <div style={{height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Уровень {selectedLevel + 1}
            </div>
          </CommonCard>
        </Col>
        <Col span={12}>
          <CommonCard className="level-info-text">
            <div style={{height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {levelsInfo[selectedLevel - 1]?.umt_limit || 0}{levelsInfo[selectedLevel].umt_limit ? ' -' : '+'} {levelsInfo[selectedLevel].umt_limit} umt
            </div>
          </CommonCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
            <CommonCard className="referralButton">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <div style={{textAlign: 'left', marginRight: '8px'}}>Eсли есть подписка<br/>на Я.музыку</div>
                  <div style={{color: '#EF807B'}}>задания по {RUB_REWARD_WITH_SUB + selectedLevel}₽ + {UMT_REWARD_WITH_SUB + 5 * selectedLevel}umt</div>
                </div>
            </CommonCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
            <CommonCard className="referralButton">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <div style={{textAlign: 'left', marginRight: '8px'}}>Eсли нет подписки<br/>на Я.музыку</div>
                  <div style={{color: '#EF807B'}}>задания по {RUB_REWARD_WITHOUT_SUB}₽ + {UMT_REWARD_WITH_SUB + 5 * selectedLevel - 10}umt</div>
                </div>
            </CommonCard>
        </Col>
      </Row>
      {data?.user_type === 'musician' && (
        <Row gutter={16}>
          <Col span={24}>
              {/* <CommonCard className={`referralButton ${(selectedLevel + 1) === data.level_id ? 'levelSlider_selectedLevel' : 'levelSlider'}`}> */}
              <CommonCard className="referralButton">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div>Пакет бесплатных слушателей</div>
                    <div>{30 + selectedLevel * 10}</div>
                  </div>
              </CommonCard>
          </Col>
        </Row>
      )}
    </div>
  );
};
