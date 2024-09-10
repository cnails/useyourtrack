import { Typography, Row, Col, Input, Form, Checkbox, Button } from 'antd';
import { CommonCard } from './CommonCard';
import CardNumberInput from './InputMask';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export const RevenuePage = () => {
    const [checked, setChecked] = useState(false);
    const [isInvalidCheckbox, setIsInvalidCheckbox] = useState(false);    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      setIsInvalidCheckbox(false);
        // TODO: валидация на два инпута
    };
  
    const handleSubmit = () => {
        if (!checked) {
            setIsInvalidCheckbox(true);
            return;
        }
      alert('Вы согласились с обработкой персональных данных!');
    };

    return (
    <div className="referral-page-container">
        <Title level={2} className="rules-title">Вывод средств</Title>
        <Paragraph className="revenue-description">
            На данный момент выводить можно рублевый баланс от 400₽
        </Paragraph>
        
        <Row gutter={16}>
            <Col span={24}>
            <CommonCard className="prize">
                <span className="lifehack-icon">🚀</span>
                <div style={{textAlign: 'center', paddingTop: '14px', fontSize: '13px', fontWeight: 300}}>
                    Монеты umt будут доступны пользователям после листинга. Следите за новостями в нашем
                    <a href="https://t.me/UseMyTrackEarnBot"> официальном ТГ-канале.</a>
                </div>
            </CommonCard>
            </Col>
        </Row>
        <Row gutter={16} className="tiles-container" style={{paddingTop: '24px'}}>
            <Col span={24}>
            <div style={{textAlign: 'center'}}>Вывод средств в рублях осуществляется на карту любого российского банка.<br/>
            Заполните форму ниже для вывода средств.</div>
            <div style={{textAlign: 'center', color: '#8AFF43', fontWeight: 700, paddingTop: '14px'}}>Вывод средств осуществляется в течение 3-х рабочих дней после отправки заявки на вывод</div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={24}>
                <CommonCard className="referralButton">
                    <CardNumberInput />
                </CommonCard>
            </Col>
            <Col span={24}>
                <CommonCard className="referralButton">
                <Input
                    placeholder="Наименование банка"
                    className='resetInputStyles'
                />
                </CommonCard>
            </Col>
        </Row>
        <Form onFinish={handleSubmit} style={{paddingTop: '15px'}}>
            <Form.Item>
                <Checkbox checked={checked} onChange={handleChange} className={`custom-checkbox ${isInvalidCheckbox ? 'invalid-checkbox' : ''}`}>
                    <span style={{lineHeight: '30px', color: 'white'}}>Согласен с обработкой персональных данных</span>
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='revenueMainButton'>
                    Вывести
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
};
