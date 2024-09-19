import { useState } from 'react';
import { Image, Modal, Button, Upload, message, UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { usePostTask } from '../api';
import { getUserId } from '../Utils/utils';

export const ReportUploadModal = ({isOpen, onClose, task_id, onSuccess}: {isOpen: boolean, onClose: () => void, task_id: number, onSuccess: () => void}) => {
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const user_id = getUserId();
    const postMutation = usePostTask();

    const handleOk = () => {
        if (fileList.length === 0) {
            message.error('Пожалуйста, загрузите изображение перед отправкой.');
            return;
        }
        // TODO: По идеи в ответ на данный пост запрос должен приходить факт необходимости оценки трека?
        postMutation.mutate({user_id, task_id, image_url: (fileList[0] as any).thumbUrl});
        onClose();
        setFileList([]);
        onSuccess();
        message.success('Отчет успешно отправлен!');
    };

    const handleCancel = () => {
        onClose();
        setFileList([]);
    };

    const handleChange = ({ fileList: newFileList }: any) =>
        setFileList(newFileList);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    );

  return (
    <Modal
        open={isOpen}
        title="Загрузка отчета"
        onCancel={handleCancel}
        footer={[
            <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: 'green', borderColor: 'green' }}
            onClick={handleOk}
            >
            Отправить
            </Button>,
        ]}
        style={{ backgroundColor: '#fff' }}
        centered
        >
        <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Отключаем автоматическую загрузку
            onRemove={() => {
                setFileList([]);
            }}
        >
            {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
            <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
            />
      )}
    </Modal>
  );
};

const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });