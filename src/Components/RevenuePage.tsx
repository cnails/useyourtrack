import { Typography, Row, Col, Input, Form, Checkbox, Button, Card, message, Select } from 'antd';
import { CommonCard } from './CommonCard';
import CardNumberInput, { validateCardNumber } from './InputMask';
import { useState } from 'react';
import CrossIcon from '../Icons/cross.svg?react';
import { useGetTgUser, useGetWithdrawInfo } from '../api';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const RevenuePage = () => {
    const [checked, setChecked] = useState(false);
    const [isInvalidCheckbox, setIsInvalidCheckbox] = useState(false);
    const [isCustomCardExpanded, setIsCustomCardExpanded] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [bankName, setBankName] = useState<string | undefined>('Выберите банк');

    const {data: userData} = useGetTgUser();
    const {data: withdrawData} = useGetWithdrawInfo();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      setIsInvalidCheckbox(false);
    };
  
    const handleSubmit = () => {
        const cleanedCardNumber = cardNumber.replace(/\D/g, '');

        if (!validateCardNumber(cleanedCardNumber)) {
            message.error('Пожалуйста, укажите корректный номер карты.');
        } else if (bankName.length <= 3) {
            message.error('Пожалуйста, укажите корректное наименование банка.');
        } else if (!checked) {
            setIsInvalidCheckbox(true);
        } else {
            setIsCustomCardExpanded(true);
        }
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
                    <CardNumberInput onChangeCardNumber={setCardNumber} />
                </CommonCard>
            </Col>
            <Col span={24}>
                <CommonCard className="referralButton">
                <Select
                    className='bankSelect'
                    value={bankName}
                    onChange={setBankName}
                    allowClear={false}  // Позволяет очистить выбранное значение
                    >
                    {withdrawData?.available_banks.map((availableBankName) => (
                        <Option key={availableBankName} value={availableBankName}>{availableBankName}</Option>
                    ))}
                </Select>
                {/* <Input
                    placeholder="Наименование банка"
                    className='resetInputStyles'
                    onChange={(e) => setBankName(e.target.value)}
                /> */}
                </CommonCard>
            </Col>
        </Row>
        <Form onFinish={handleSubmit} style={{paddingTop: '15px'}}>
            <Form.Item style={{marginBottom: '15px'}}>
                <Checkbox checked={checked} onChange={handleChange} className={`custom-checkbox ${isInvalidCheckbox ? 'invalid-checkbox' : ''}`}>
                    <span style={{fontSize: '13px', color: 'white', opacity: '0.5'}}>согласен с обработкой персональных данных</span>
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='mainButton'>
                    Вывести
                </Button>
            </Form.Item>
        </Form>
        {isCustomCardExpanded && (
            <>
                <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}} />
                {/* 66px - высота меню */}
                <div className='revenueExpandedCard expandedCard'>
                    <Card className="custom-card" style={{'--color-1': '#46FF40', '--color-2': '#12940E'}}>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'end', margin: '-45px 0 8px 0'}}>
                            <CrossIcon onClick={() => setIsCustomCardExpanded(false)} />
                        </div>
                        <div style={{fontSize: '38px'}}>{userData?.balance_rub! >= 400 ? '🔎' : '❌'}</div>
                        <div style={{color: '#fff', fontSize: '30px', fontWeight: '600', paddingTop: '10px'}}>{userData?.balance_rub! >= 400 ? 'Ваша заявка отправлена на проверку' : 'Вывод доступен от 400₽'}</div>
                        <Button type="primary" htmlType="submit" className='mainButton revenueExpandedButton' onClick={() => setIsCustomCardExpanded(false)}>
                            Продолжить
                        </Button>
                    </Card>
                </div>
            </>
        )}
    </div>
  );
};
