import { Layout, Row, Col,  Typography } from 'antd';
import { useState } from 'react';
import { BalanceCard } from './BalanceCard';
import { UserLevel } from './UserLevel';
import { MainTask } from './MainTask';
import { BalanceInfo } from './BalanceInfo';

const { Content } = Layout;
const { Text } = Typography;

export const UserProfile = () => {
  const [isBalanceInfoViewActive, setIsBalanceInfoViewActive] = useState(false);

  const user = {
    name: 'Иванов Иван',
    balance: { currency1: 1500, currency2: 300 },
    level: 5,
    currentXP: 200,
    nextLevelXP: 500,
    info: 'Welcome to your profile!',
    imageUrl: 'https://pngimg.com/uploads/headphones/headphones_PNG101954.png'
  };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [_modalText, setModalText] = useState('Content of the modal');
  const userLevelTooltipText = "Уровень повышается за счет накопления umt. С увеличением уровня, увеличивается стоимость оплаты заданий в рублях. 7, 8, 9, 10 и тд рублей соответственно выплачивается за выполненное задание";
  const userBalanceTooltipText = "umt - это внутренняя криптовалюта, которая в дальнейшем пойдет на листинг. Также за накопление umt повышается ваш уровень, что позволяет получать более прибыльные задания";

  if (isBalanceInfoViewActive) {
    return <BalanceInfo close={() => setIsBalanceInfoViewActive(false)} />;
  }

  return (
      <Content>
        <Row gutter={[16, 16]}>
          <Col span={20} style={{display: 'flex'}}>
            <img width={'40px'} src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=750&h=620&fl=progressive&q=70&fm=jpg" alt="profile picture" />
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px'}}>
              <Text className='largeText'>{user.name}</Text>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{marginTop: '20px', justifyContent: 'space-between', flexWrap: 'nowrap'}}>
          <Col span={8} style={{padding: 0, alignSelf: 'center'}}>
            <UserLevel levelName="Epic" currentLevel="6" maxLevel="9" experiencePercentage="75" onLevelClick={() => {}} />
          </Col>
          <Col span={14} style={{padding: 0}}>
            <BalanceCard showBalanceInfo={() => setIsBalanceInfoViewActive(true)} />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <MainTask />
          </Col>
        </Row>
      </Content>
  );
};
