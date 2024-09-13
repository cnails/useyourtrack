import { useState } from 'react';
import { Modal } from 'antd';

export const FullScreenImage = ({ src }: {src: string}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handleClose = () => {
    setIsFullScreen(false);
  };

  return (
    <div>
      {/* Маленькая версия изображения */}
      <img
        src={src}
        alt="example"
        className="thumbnail"
        onClick={handleImageClick}
      />

      {/* Модальное окно для полноэкранного изображения */}
      <Modal
        open={isFullScreen}
        footer={null}
        onCancel={handleClose}
        className="fullscreen-modal"
        centered
      >
        <img src={src} alt="example" className="fullscreen-image" />
      </Modal>
    </div>
  );
};
