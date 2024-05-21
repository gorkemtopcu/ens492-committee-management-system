import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import ProductForm from './ProductForm';

const { Option } = Select;

const PopupForm = ({ title, open, initialValues, onCancel, onFinish, fields }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [open, initialValues, form]);

    const handleOnFinish = (values) => {
        form.resetFields();
        onFinish(values);
    };

    const handleOnCancel = () => {
        form.resetFields();
        onCancel();
    }

    return (
        <Modal
            title={title}
            open={open}
            onCancel={handleOnCancel}
            onOk={() => form.submit()}
            footer={null} 
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
