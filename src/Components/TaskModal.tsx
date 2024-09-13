import { Modal, Button, Spin } from 'antd';
import { useState } from 'react';
import { FullScreenImage } from './FullScreenImage';

export const TaskModal = ({onClose}: {onClose: () => void}) => {
  const [loading, setLoading] = useState(true); // Состояние для загрузки изображения

  const handleImageLoad = () => {
    setLoading(false); // Когда изображение загрузилось, выключаем загрузку
  };
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-content">
        <div className="image-container">
            {loading && (
                <div className="placeholder">
                    <Spin size="large" /> {/* Иконка загрузки */}
                </div>
            )}
            {/* <FullScreenImage src="https://via.placeholder.com/400x200" /> */}
            <img
                src="https://via.placeholder.com/400x200"
                alt="example"
                className={`modal-image ${loading ? 'hidden' : ''}`}
                onLoad={handleImageLoad} // Событие при загрузке изображения
            />
        </div>
        <div className="modal-text-block">
        <p >Ваша задача прослушать трек полностью без перематываний (иначе он не будет отображаться как прослушанный) и поставить лайк в 2-х местах: на трек и на альбом‼ После чего перейдите на главную (там, где "Моя волна"), прокрутите немного вниз и перейдите раздел История, сделайте скриншот, как показано на образцах выше☝, и отправьте его в этот чат.</p>
        <a href="https://telegra.ph/Kak-pravilno-delat-otchyoty-o-proslushannyh-trekah-dlya-Use-My-Track-06-20">Нажмите на этот текст, чтобы прочитать
подробную инструкцию по выполнению</a>
        <p style={{textAlign: "center"}}>
            <span style={{color: 'white', fontWeight: 500}}>Обратите внимание!</span><br />
            На скриншоте должен быть виден лайк и видно, что трек находится в списке прослушанных.</p>
        </div>
        <div className="modal-buttons">
        <Button className="link-button taskModal_button" type="primary" onClick={handleCancel}>Ссылка на трек</Button>
        <Button className="upload-button taskModal_button">Загрузить отчет</Button>
        <Button className="skip-button taskModal_button" type="default">Пропустить</Button>
        </div>
    </div>
  );
};
