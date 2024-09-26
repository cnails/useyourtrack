import { Typography, Row, Col } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import UmtIcon from '../Icons/umtIcon.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';
import { CommonCard } from './CommonCard';

const { Title, Paragraph } = Typography;

export const RulesPage = () => {
  return (
    <div className="rules-page-container">
      <Title level={2} className="rules-title">Правила</Title>
      <Paragraph className="rules-description">
        На 1 уровне вы получаете за 1 выполненное задание по прослушиванию трека:
      </Paragraph>
      
      <Row gutter={16} className="tiles-container">
        <Col>
          <CommonCard>
            <ThunderboltFilled className="tile-icon" />
            <div className="tile-text">7₽&nbsp;+&nbsp;25&nbsp;umt</div>
            <div className="tile-description">если слушаете через приложение Яндекс Музыки с подпиской</div>
          </CommonCard>
        </Col>
        <Col>
          <CommonCard>
            <ThunderboltFilled className="tile-icon" />
            <div className="tile-text">4₽&nbsp;+&nbsp;15&nbsp;umt</div>
            <div className="tile-description">если слушаете без подписки через браузер с компьютера</div>
          </CommonCard>
        </Col>
        <Col>
          <CommonCard>
            <ThunderboltFilled className="tile-icon" />
            <div className="tile-text">7₽&nbsp;+&nbsp;25&nbsp;umt</div>
            <div className="tile-description">за прослушивание трека в Вк</div>
          </CommonCard>
        </Col>
        <Col>
          <CommonCard>
            <ThunderboltFilled className="tile-icon" />
            <div className="tile-text rules-mass-posting">Задания по масспостингу (публикации видеороликов под треки артистов в своих соц. сетях) оцениваются в зависимости от набранных просмотров от <strong style={{fontSize: '14px'}}>20р.</strong> до <strong style={{fontSize: '14px'}}>300р.</strong> + 50 umt</div>
          </CommonCard>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container">
        <Col>
          <div className="lifehack">
            <span className="lifehack-icon">💡</span>
            <div className="lifehack-title">Лайфхак</div>
            <div className="lifehack-description">Вы можете оформить пробную подписку на Яндекс.Музыку (месяц бесплатно) и получать по 7₽ за прослушивание одного трека из задания.</div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 10]}>
        <Col span={12} style={{paddingTop: '24px'}}>
            <CommonCard className="lifehack_amount">
                <div className="lifehack_amount_main">
                    <UmtIcon className="lifehack_amount_icon" />
                    <span style={{padding: "6px 2px 0 0"}}>+</span>
                    <RubbleIcon className="lifehack_amount_icon" />
                </div>
                <span className="lifehack_amount_description">Есть задания, за которые начисляются <strong>и рубли и внутренняя валюта</strong></span>
            </CommonCard>
        </Col>
        <Col span={12} style={{paddingTop: '24px'}}>
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
