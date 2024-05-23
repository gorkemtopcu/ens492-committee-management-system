import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ProductSearch from './ProductSearch';

const { Option } = Select;
const { Dragger } = Upload;

const ProductForm = ({ initialValues = null, onCancel, onFinish, fields }) => {
    const [form] = Form.useForm();
    const [selectedItems, setSelectedItems] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        form.resetFields();
        if (initialValues) {
            form.setFieldsValue(initialValues);
            setFileList(initialValues.attachment || []);
        } else {
            setFileList([]);
        }
    }, [initialValues, form]);

    const handleFinish = (values) => {
        if (values.attachment) { values.attachment = values.attachment.fileList; }
        console.log(values);
        onFinish(values, form);
        setFileList([]);
        form.resetFields();
    };

    const handleCancel = () => {
        onCancel();
        setFileList([]);
        form.resetFields();
    };

    const handleSearchSelect = (value) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems([...selectedItems, value]);
        }
    };

    const handleRemove = (item) => {
        const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
        setSelectedItems(updatedItems);
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <Form
            form={form}
            name="productForm"
            layout="vertical"
            onFinish={handleFinish}
        >
            {fields.map((field) => (
                <Form.Item
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    rules={[{ required: field.required, message: `Please input ${field.label}!` }]}
                >
                    {field.type === 'textarea' ? (
                        <Input.TextArea readOnly={field.readOnly} />
                    ) : field.type === 'select' ? (
                        <Select
                            disabled={field.readOnly}
                            filterOption={(input, option) =>
                                option.label.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {field.options.map((option) => (
                                <Option key={option.value} value={option.value} label={option.label}>{option.label}</Option>
                            ))}
                        </Select>
                    ) : field.type === 'multiSelect' ? (
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            disabled={field.readOnly}
                            filterOption={(input, option) =>
                                option.label.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {field.options.map((option) => (
                                <Option key={option.value} value={option.value} label={option.label}>{option.label}</Option>
                            ))}
                        </Select>
                    ) : field.type === 'date' ? (
                        <DatePicker style={{ width: '100%' }} disabled={field.readOnly} />
                    ) : field.type === 'search' ? (
                        <ProductSearch options={field.options} onSelect={handleSearchSelect} />
                    ) : field.type === 'file' ? (
                        <Dragger
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false}
                            disabled={field.readOnly}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other banned files
                            </p>
                        </Dragger>
                    ) : (
                        <Input readOnly={field.readOnly} />
                    )}
                </Form.Item>
            ))}

            {selectedItems.length > 0 && (
                <Form.Item label="Selected Items">
                    {selectedItems.map((item) => (
                        <div key={item}>
                            <span>{item}</span>
                            <Button type="link" onClick={() => handleRemove(item)}>Remove</Button>
                        </div>
                    ))}
                </Form.Item>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={handleCancel} style={{ marginLeft: 8 }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;
