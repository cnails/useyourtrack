import { Modal, Button, Spin } from 'antd';
import { useState } from 'react';
import { FullScreenImage } from './FullScreenImage';
import { useGetTask, usePostTask } from '../api';
import WebApp from '@twa-dev/sdk';
import { getUserId, invalidateQuery } from '../Utils/utils';
import { ReportUploadModal } from './ReportUploadModal';

export const TaskModal = ({onClose}: {onClose: () => void}) => {
  const userId = getUserId();
  // после мутации инвалидировать
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isLoading, data} = useGetTask({user_id: userId});
  const postMutation = usePostTask();

  const [loading, setLoading] = useState(true); // Состояние для загрузки изображения

  const handleImageLoad = () => {
    setLoading(false); // Когда изображение загрузилось, выключаем загрузку
  };

  const handleClose = () => {
    onClose();
  };

  const handleTrackUrlClick = () => {
    // TODO: нет ссылки на трек
    // open url
  }

  const handleSkip = () => {
    postMutation.mutate({user_id: userId, task_id: data?.task_id!, skip_task: true});
    invalidateQuery('getTask');
  };

  return (
    <>
      <ReportUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task_id={data?.task_id!} />
      <div className="modal-content">
          <div className="image-container">
              {loading && (
                  <div className="placeholder">
                      <Spin size="large" /> {/* Иконка загрузки */}
                  </div>
              )}
              {/* <FullScreenImage src="https://via.placeholder.com/400x200" /> */}
              <img
                  src={data?.image_url}
                  alt="example"
                  className={`modal-image ${loading ? 'hidden' : ''}`}
                  onLoad={handleImageLoad} // Событие при загрузке изображения
              />
          </div>
          <div className="modal-text-block">
          <p>{data?.text}</p>
          <a href="https://telegra.ph/Kak-pravilno-delat-otchyoty-o-proslushannyh-trekah-dlya-Use-My-Track-06-20">Нажмите на этот текст, чтобы прочитать
  подробную инструкцию по выполнению</a>
          <p style={{textAlign: "center"}}>
              <span style={{color: 'white', fontWeight: 500}}>Обратите внимание!</span><br />
              На скриншоте должен быть виден лайк и видно, что трек находится в списке прослушанных.</p>
          </div>
          <div className="modal-buttons">
          <Button className="link-button taskModal_button" type="primary" onClick={handleTrackUrlClick}>Ссылка на трек</Button>
          <Button className="upload-button taskModal_button" onClick={() => setIsModalOpen(true)}>Загрузить отчет</Button>
          <Button className="skip-button taskModal_button" type="default" onClick={handleSkip}>Пропустить</Button>
          </div>
      </div>
    </>
  );
};
