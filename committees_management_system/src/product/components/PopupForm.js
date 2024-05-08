import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const PopupForm = ({ title, open, initialValues, onCancel, onFinish, fields }) => {
    const [form] = Form.useForm();

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
        >
            <Form
                form={form}
                name="popupForm"
                initialValues={initialValues}
                onFinish={handleOnFinish}
            >
                {fields.map((field) => (
                    <Form.Item
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        rules={[{ required: field.required, message: `Please input ${field.label}!` }]}
                    >
                        {field.type === 'select' ? (
                            <Select>
                                {field.options.map((option) => (
                                    <Option key={option} value={option}>{option}</Option>
                                ))}
                            </Select>
                        ) : field.type === 'textarea' ? (
                            <Input.TextArea />
                        ) : (
                            <Input />
                        )}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

export default PopupForm;
