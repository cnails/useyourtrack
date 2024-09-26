import { useState } from 'react';
import { Button, Card, Layout, Tabs } from 'antd';
import 'antd/dist/reset.css';  // сброс стилей
import './App.css';
import { UserProfile } from './Components/UserProfile';
import MenuMainIcon from './Icons/Menu/main.svg?react';
import MenuPromotionIcon from './Icons/Menu/promotion.svg?react';
import MenuReferralIcon from './Icons/Menu/referral.svg?react';
import MenuRulesIcon from './Icons/Menu/rules.svg?react';
import MenuSalaryIcon from './Icons/Menu/salary.svg?react';
import { RulesPage } from './Components/RulesPage';
import { ReferralPage } from './Components/ReferralPage';
import { RevenuePage } from './Components/RevenuePage';
import { useGetTgUser } from './api';
import { PromotePage } from './Components/PromotePage';
import { Onboarding } from './Components/Onboarding';

const { Content, Footer } = Layout;

enum EPage {
  main = 'main',
  rules = 'rules',
  referral = 'referral',
  revenue = 'revenue',
  promotion = 'promotion',
}

const getTabs = (user_type?: string) => ([
  {
    key: EPage.main,
    label: 'Главная',
    icon: <MenuMainIcon />
  },
  {
    key: EPage.rules,
    label: 'Правила',
    icon: <MenuRulesIcon />
  },
  {
    key: EPage.referral,
    label: 'Рефералка',
    icon: <MenuReferralIcon />
  },
  {
    key: EPage.revenue,
    label: 'Вывод средств',
    icon: <MenuSalaryIcon style={{minHeight: '30px'}} />
  },
  {
    key: EPage.promotion,
    label: 'Продвижение',
    icon: <MenuPromotionIcon />,
    enabled: user_type === 'musician'
  },
]);

const App = () => {
  const {data} = useGetTgUser();
  const tabs = getTabs(data?.user_type).filter(({enabled}) => enabled ?? true);
  const [selectedPage, setSelectedPage] = useState<EPage>(EPage.main);

  const renderPage = () => {
    switch (selectedPage) {
      case EPage.main:
        return <UserProfile />
      case EPage.rules:
        return <RulesPage />
      case EPage.referral:
        return <ReferralPage />
      case EPage.revenue:
        return <RevenuePage />
      case EPage.promotion:
        return <PromotePage />
      default:
        break;
    }
  }

  return (
    <Layout className="layout">

      {/* Основной контент */}
      <Content style={{ padding: '0 16px', marginTop: 24 }}>
        <div className="site-layout-content" style={{ minHeight: 'calc(100vh - 134px)' }}>
          {renderPage()}
        </div>
      </Content>

      {/* TODO: получение и сохранение факта онбординга пользователя */}
      <Onboarding needToShow={false} />

      {/* Футер с меню */}
      <Footer style={{ backgroundColor: '#32363C', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', textAlign: 'center', position: 'sticky', bottom: '-1px', zIndex: 1, padding: '0 8px'}}>
        <Tabs
          defaultActiveKey={EPage.main}
          items={tabs.map(tab => ({
            key: tab.key,
            label: (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {tab.icon}
                <div style={{fontSize: '12px'}}>{tab.label}</div>
              </div>
            )
          }))}
          onChange={(key) => setSelectedPage(key as EPage)}
        />
      </Footer>
    </Layout>
  );
};

export default App;
