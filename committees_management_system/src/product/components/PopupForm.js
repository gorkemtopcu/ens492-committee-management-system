import { Modal } from 'antd';
import ProductForm from './ProductForm';

const PopupForm = ({ title, open, initialValues, onCancel, onFinish, fields }) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <ProductForm
                initialValues={initialValues}
                onCancel={onCancel}
                fields={fields}
                onFinish={onFinish}
            />
        </Modal>
    );
};

export default PopupForm;
