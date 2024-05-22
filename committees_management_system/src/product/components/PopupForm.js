import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import ProductForm from './ProductForm';

const PopupForm = ({ title, open, initialValues, onCancel, onFinish, fields }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [open, initialValues, form]);

    const handleOnFinish = (values) => {
        form.resetFields();
        onFinish(values, form);
    };

    const handleOnCancel = () => {
        form.resetFields();
        onCancel(form);
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={handleOnCancel}
            footer={null}
            destroyOnClose
        >
            <ProductForm
                initialValues={initialValues}
                onCancel={handleOnCancel}
                fields={fields}
                onFinish={handleOnFinish}
            />
        </Modal>
    );
};

export default PopupForm;
