import { Layout, Row, Col, Progress, Card, Typography, Tooltip, Modal } from 'antd';
import { useState } from 'react';
import { DemoPie } from './Statistic';

const { Content } = Layout;
const { Title, Text } = Typography;

export const UserProfile = () => {
  const [open, setOpen] = useState(false);

  const user = {
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

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
      <Content>
        {/* TODO: вынести в отдельный компонент */}
        <Modal
          title="Задание"
          open={open}
          okText={"Загрузить отчет"}
          cancelText={"Пропустить"}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>
            <img src="https://i.ibb.co/fkmngGn/task.jpg" alt="Задание" style={{ width: '100%' }} />
            <Text style={{fontSize: '18px'}}>Ваша задача прослушать трек полностью без перематываний (иначе он не будет отображаться как прослушанный) и поставить лайк в 2-х местах: на трек и на альбом‼️ После чего перейдите на главную (там, где "Моя волна"), прокрутите немного вниз и перейдите раздел История, сделайте скриншот, как показано на образцах выше☝️, и отправьте его в этот чат.
Нажмите на этот текст, чтобы прочитать подробную инструкцию по выполнению (https://telegra.ph/Kak-pravilno-delat-otchyoty-o-proslushannyh-trekah-dlya-Use-My-Track-06-20)

Обратите внимание. На скриншоте должен быть виден лайк и видно, что трек находится в списке прослушанных. <a href="https://music.yandex.ru/album/32592871/track/129412868" target='_blank'>Ссылка на трек</a></Text>
          </p>
        </Modal>
        <Row gutter={[16, 16]}>
          {/* Баланс в виде двух валют */}
          <Col span={12}>
            <Tooltip title={userBalanceTooltipText}>
              <Card>
                <Title level={4}>Баланс</Title>
                <Text className='largeText'>{user.balance.currency1} umt</Text><br />
                <Text className='largeText'>{user.balance.currency2} руб</Text>
              </Card>
            </Tooltip>
          </Col>

          {/* Текущий уровень пользователя и шкала опыта */}
          <Col span={12}>
            <Tooltip title={userLevelTooltipText}>
              <Card>
                <Title level={4} className='largeText'>Уровень {user.level}</Title>
                <Progress percent={(user.currentXP / user.nextLevelXP) * 100} className='largeText' />
                <Text className='largeText'>{user.currentXP} / {user.nextLevelXP} XP</Text>
              </Card>
            </Tooltip>
          </Col>
        </Row>

        {/* Информационный блок с картинкой */}
        <Row gutter={[16, 16]} style={{ marginTop: '12px' }}>
          <Col span={24}>
            <Card>
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col span={20} style={{ padding: '30px 0' }}>
                  <img src={user.imageUrl} alt="Info" style={{ width: '100%' }} onClick={() => setOpen(true)} />
                </Col>
                <Col span={18}>
                  {/* <Title level={4}>Информация</Title>
                  <Text>{user.info}</Text> */}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Информационный блок с картинкой */}
        <Row gutter={[16, 16]} style={{ marginTop: '12px' }}>
          <Col span={24}>
            <Card>
              <Title level={4}>Статистика</Title>
             <DemoPie />
            </Card>
          </Col>
        </Row>
      </Content>
  );
};
