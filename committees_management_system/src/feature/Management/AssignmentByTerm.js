import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, message, Form, Input, Modal, Select } from 'antd';
import { saveAs } from 'file-saver';
import PrimaryButton from 'product/components/PrimaryButton';
import * as XLSX from 'xlsx';
import ProductHeader from 'product/components/ProductHeader';
import ExcelButton from 'product/components/ExcelButton';
import CopyButton from 'product/components/CopyButton';
import StringConstants from 'product/constants/StringConstants';
import Terms from 'assets/jsons/report/terms.json';

const AssignmentByTerm = () => {
    const location = useLocation();
    const { term } = location.state;
    const [mailListData, setMailListData] = useState(null);
    const [listEmailData, setlistEmailData] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    

    const navigate = useNavigate();

    useEffect(() => {
        fetchDataAndOrganize();
    }, []);

    const fetchDataAndOrganize = async () => {
        try {
            console.log("term is ", term);
            const response = await axios.get(`http://localhost:8080/api/mailing-lists/findByTerm/${term}`);
            const organizedData = {};
            response.data.forEach(item => {
                const listEmail = item.listEmail;
                if (!organizedData[listEmail]) {
                    organizedData[listEmail] = [];
                }
                organizedData[listEmail].push(item);
            });
            setMailListData(organizedData);
            setExpandedRowKeys(Object.keys(organizedData));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllData = async () => {
        try {
            console.log("term is ", term);
            const response = await axios.get(`http://localhost:8080/api/mailing-lists/getAll`);
            const organizedData = {};
            response.data.forEach(item => {
                const listEmail = item.listEmail;
                if (!organizedData[listEmail]) {
                    organizedData[listEmail] = [];
                }
                organizedData[listEmail].push(item);
            });
            setlistEmailData(organizedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    

    const handleAdd = () => {
        setIsModalVisible(true);
        fetchAllData(); 
    };

    

    const handleCancel = () => {
        setIsModalVisible(false);
    };




    const nestedColumns = [
        { title: 'Name', dataIndex: 'member', key: 'member', searchable: true },
        { title: 'Mail', dataIndex: 'memberEmail', key: 'memberEmail', searchable: true },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => showDeleteConfirmation(record.listEmail, record.id)}>
                        Delete
                    </Button>
                    <Modal
                        title= {StringConstants.CONFIRM_DELETE}
                        visible={deleteConfirmationVisible}
                        onOk={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                        mask={false}
                        maskClosable={true} 
                        style={{ border: 'none', boxShadow: 'none' }}
                    >
                        <p>{StringConstants.REMOVE_WARNING}</p>
                    </Modal>
                </>
            ),
        },
    ];

    const handleConfirmDelete = async () => {
        if (deletingItem) {
            const { listEmail, memberId } = deletingItem;
            try {
                await axios.delete(`http://localhost:8080/api/mailing-lists/delete/${memberId}`);
                // Remove the deleted member from the state
                const updatedMailListData = { ...mailListData };
                updatedMailListData[listEmail] = updatedMailListData[listEmail].filter(item => item.id !== memberId);
                setMailListData(updatedMailListData);
                message.success('Member deleted successfully');
            } catch (error) {
                console.error('Error deleting member:', error);
                message.error('Failed to delete member');
            }
            setDeleteConfirmationVisible(false);
            setDeletingItem(null);
        }
    };
    
    const handleCancelDelete = () => {
        setDeleteConfirmationVisible(false);
        setDeletingItem(null);
    };
    

    const showDeleteConfirmation = (listEmail, memberId) => {
        setDeletingItem({ listEmail, memberId });
        setDeleteConfirmationVisible(true);
    };

    const mainColumns = [
        { title: 'Email List', dataIndex: 'listEmail', key: 'listEmail' },
    ];

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(Object.values(mailListData).flat());
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Mailing List');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'mailing_list.xlsx');
    };

    const handleBackButtonClick = () => {
        navigate(`/mgmt-assignments`);
    };

    const handleCopyToClipboard = () => {
        const jsonString = JSON.stringify(mailListData);
        navigator.clipboard.writeText(jsonString);
        message.success('Response copied to clipboard');
    };

    return (
        <div className='MailListTable'>
            <ProductHeader title={`Assignment In Selected Terms`} />
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <CopyButton
                    onClick={handleCopyToClipboard}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />
                <ExcelButton
                    onClick={handleExportExcel}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />

                <PrimaryButton 
                    title={"Add"} 
                    style={{ marginLeft: 16 }}
                    onClick={handleAdd}>
                    
                </PrimaryButton>

            </div>
            <Table
                columns={mainColumns}
                dataSource={mailListData ? Object.keys(mailListData).map(key => ({ listEmail: key })) : []}
                rowKey="listEmail"
                expandable={{
                    expandedRowRender: record => (
                        <Table
                            columns={nestedColumns}
                            dataSource={mailListData[record.listEmail]}
                            rowKey="id"
                            pagination={false}
                        />
                    ),
                    onExpand: (expanded, record) => {
                        setExpandedRowKeys(expanded ? [...expandedRowKeys, record.listEmail] : expandedRowKeys.filter(key => key !== record.listEmail));
                    },
                }}
            />
            <PrimaryButton
                title={StringConstants.BACK}
                onClick={handleBackButtonClick}
                isEnabled={true}
                style={{ marginRight: 16 }}
            />
            <Modal title={StringConstants.ADD_NEW_MEMBER} visible={isModalVisible} onCancel={handleCancel} 
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    {StringConstants.CANCEL}
                </Button>
            ]}
            >
                <AddMemberForm termOptions={Terms} listEmailOptions={
                    listEmailData 
                        ? Object.keys(listEmailData).map(key => key) 
                        : []
                }/>
            </Modal>
        </div>
    );
    
};

const { Option } = Select;

const AddMemberForm = ({ listEmailOptions, termOptions}) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await form.validateFields(); // Validate the form fields
            form.resetFields(); // Reset form fields after successful submission
        } catch (error) {
            console.error('Error validating fields:', error);
        }
    };

    const handleReset = () => {
        form.resetFields(); // Reset form fields when Reset button is clicked
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                name="listEmail"
                label="Email List"
                rules={[{ required: true, message: 'Please select an email list' }]}
            >
                <Select placeholder="Select an email list">
                    {listEmailOptions.map((email, index) => (
                        <Option key={index} value={email}>
                            {email}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="term"
                label="Term"
                rules={[{ required: true, message: 'Please select a term' }]}
            >
                <Select placeholder="Select a term">
                    {termOptions.map((term, index) => (
                        <Option key={index} value={term}>
                            {term}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="member"
                label="Member"
                rules={[{ required: true, message: 'Please enter member name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="memberEmail"
                label="Member Email"
                rules={[
                    { required: true, message: 'Please enter member email' },
                    { type: 'email', message: 'Please enter a valid email address' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Add Member</Button>
                <Button style={{ marginLeft: 8 }} onClick={handleReset}>Reset</Button>
            </Form.Item>
        </Form>
    );
};



export default AssignmentByTerm;
