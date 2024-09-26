import { Layout, Row, Col,  Typography } from 'antd';
import { useState } from 'react';
import { BalanceCard } from './BalanceCard';
import { UserLevel } from './UserLevel';
import { MainTask } from './MainTask';
import { BalanceInfo } from './BalanceInfo';
import WebApp from '@twa-dev/sdk';
import { useGetTgUser } from '../api';
import { LevelSliderPage } from './LevelSliderPage';

const { Content } = Layout;
const { Text } = Typography;

export const UserProfile = () => {
  const [isLevelSliderOpen, setIsLevelSliderOpen] = useState(false);
  const {data} = useGetTgUser();
  const [isBalanceInfoViewActive, setIsBalanceInfoViewActive] = useState(false);

  const user = {
    name: `${WebApp.initDataUnsafe.user?.first_name} ${WebApp.initDataUnsafe.user?.last_name || ''}`,
    balance: { currency1: data?.balance_rub, currency2: data?.balance_umt },
    level: data?.level_id,
    currentXP: 200,
    nextLevelXP: 500,
    type: data?.user_type,
    // imageUrl: WebApp.initDataUnsafe.user?.photo_url || "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=750&h=620&fl=progressive&q=70&fm=jpg",
  };

  if (isBalanceInfoViewActive) {
    return <BalanceInfo close={() => setIsBalanceInfoViewActive(false)} />;
  }

  if (isLevelSliderOpen) {
    return <LevelSliderPage close={() => setIsLevelSliderOpen(false)} />
  }

  return (
      <Content>
        <Row gutter={[16, 16]}>
          <Col span={20} style={{display: 'flex'}}>
            {/* <img width={'40px'} src={user.imageUrl} alt="profile picture" /> */}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px'}}>
              <Text className='largeText'>{user.name}</Text>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{marginTop: '20px', justifyContent: 'space-between', flexWrap: 'nowrap'}}>
          <Col span={8} style={{padding: 0, alignSelf: 'center'}}>
            <UserLevel onLevelClick={() => setIsLevelSliderOpen(true)} />
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
