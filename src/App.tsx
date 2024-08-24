// src/App.js
import { useState } from 'react';
import { Layout, Tabs } from 'antd';
import 'antd/dist/reset.css';  // сброс стилей
import './App.css';  // ваши стили
import { DollarOutlined, HomeOutlined, InfoCircleOutlined, UpSquareOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { UserProfile } from './Components/UserProfile';
import { LevelsTable } from './Components/Information';

const { Header, Content, Footer } = Layout;

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
    icon: <HomeOutlined />
  },
  {
    key: EPage.info,
    label: 'Информация',
    icon: <InfoCircleOutlined />
  },
  {
    key: EPage.referral,
    label: 'Рефералка',
    icon: <UsergroupAddOutlined />
  },
  {
    key: EPage.revenue,
    label: 'Баланс',
    icon: <DollarOutlined />
  },
  {
    key: EPage.test,
    label: 'Продвижение',
    icon: <UpSquareOutlined />
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
      {/* Хедер */}
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <h1 style={{color: 'white', marginTop: '4px'}}>UseYourTrack</h1>
      </Header>

      {/* Основной контент */}
      <Content style={{ padding: '0 16px', marginTop: 64 }}>
        <div className="site-layout-content" style={{ minHeight: 'calc(100vh - 134px)' }}>
          {renderPage()}
        </div>
      </Content>

      {/* Футер с меню */}
      <Footer style={{ textAlign: 'center', position: 'sticky', bottom: '-1px', zIndex: 1, padding: '0 8px'}}>
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
