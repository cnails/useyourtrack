import { useState } from 'react';
import { Layout, Tabs } from 'antd';
import 'antd/dist/reset.css';  // сброс стилей
import './App.css';
import { UserProfile } from './Components/UserProfile';
import { LevelsTable } from './Components/Information';
import MenuMainIcon from './Icons/Menu/main.svg?react';
import MenuPromotionIcon from './Icons/Menu/promotion.svg?react';
import MenuReferralIcon from './Icons/Menu/referral.svg?react';
import MenuRulesIcon from './Icons/Menu/rules.svg?react';
import MenuSalaryIcon from './Icons/Menu/salary.svg?react';

const { Content, Footer } = Layout;

enum EPage {
  main = 'main',
  info = 'info',
  referral = 'referral',
  revenue = 'revenue',
  test = 'test',
}

const tabs = [
  {
    key: EPage.main,
    label: 'Главная',
    icon: <MenuMainIcon />
  },
  {
    key: EPage.info,
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
    label: 'Баланс',
    icon: <MenuSalaryIcon />
  },
  {
    key: EPage.test,
    label: 'Продвижение',
    icon: <MenuPromotionIcon />
  },
]

const App = () => {
  const [selectedPage, setSelectedPage] = useState<EPage>(EPage.main);

  const renderPage = () => {
    switch (selectedPage) {
      case EPage.main:
        return <UserProfile />
      case EPage.info:
        return <LevelsTable />
        // return <h1>Information</h1>
      case EPage.referral:
        return <h1>Рефералка</h1>
      case EPage.revenue:
        return <h1>100000$</h1>
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

      {/* Футер с меню */}
      <Footer style={{ backgroundColor: '#32363C', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', textAlign: 'center', position: 'sticky', bottom: '-1px', zIndex: 1, padding: '0 8px'}}>
        <Tabs
          defaultActiveKey={EPage.main}
          items={tabs.map(tab => ({
            key: tab.key,
            label: (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {tab.icon}
                <div>{tab.label}</div>
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
