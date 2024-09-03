import { Typography, Row, Col } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import UmtIcon from '../Icons/umtIcon.svg?react';
import RubbleIcon from '../Icons/rubbleIcon.svg?react';

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
          <div className="rule-tile">
            <ThunderboltFilled className="tile-icon" />
            <div className="tile-text">7₽&nbsp;+&nbsp;25&nbsp;umt</div>
            <div className="tile-description">если слушаете через приложение Яндекс Музыки с подпиской</div>
          </div>
        </Col>
        <Col>
          <div className="rule-tile">
            <ThunderboltFilled className="tile-icon" />
            <div className="tile-text">4₽&nbsp;+&nbsp;15&nbsp;umt</div>
            <div className="tile-description">если слушаете без подписки через браузер с компьютера</div>
          </div>
        </Col>
        <Col>
          <div className="rule-tile">
            <ThunderboltFilled className="tile-icon" />
            {/* <span className="lifehack-icon">⚡</span> */}
            <div className="tile-text">7₽&nbsp;+&nbsp;25&nbsp;umt</div>
            <div className="tile-description">за прослушивание трека в Вк</div>
          </div>
        </Col>
      </Row>
      <Row gutter={16} className="tiles-container">
        <Col>
          <div className="lifehack">
            {/* <ThunderboltFilled className="lifehack-icon" /> */}
            <span className="lifehack-icon">💡</span>
            <div className="lifehack-title">Лайфхак</div>
            <div className="lifehack-description">Вы можете оформить пробную подписку на Яндекс.Музыку (месяц бесплатно) и получать по 7₽ за прослушивание каждого трека из задания.</div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 10]}>
        <Col span={12}>
            <div className="rule-tile lifehack_amount">
                <div className="lifehack_amount_main">
                    <UmtIcon className="lifehack_amount_icon" />
                    <span style={{padding: "6px 2px 0 0"}}>+</span>
                    <RubbleIcon className="lifehack_amount_icon" />
                </div>
                <span className="lifehack_amount_description">Есть задания, за которые начисляются <strong>и рубли и внутренняя валюта</strong></span>
            </div>
        </Col>
        <Col span={12}>
            <div className="rule-tile lifehack_amount">
                <div className="lifehack_amount_main">
                    <UmtIcon className="lifehack_amount_icon" />
                </div>
                <span className="lifehack_amount_description">Есть задания, за которые начисляются <strong>только внутренняя валюта umt</strong></span>
            </div>
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
