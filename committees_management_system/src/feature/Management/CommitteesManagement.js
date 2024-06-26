import React, { useState, useEffect } from 'react';
import { Button, Modal, Spin, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columnMapping } from 'product/constants/ColumnMapping';
import TableSearch from 'product/components/TableSearch';
import PopupForm from 'product/components/PopupForm';
import ProductHeader from 'product/components/ProductHeader';
import Categories from 'assets/jsons/report/committee_categories.json';
import CommitteeService from 'product/service/committees';
import StringConstants from 'product/constants/StringConstants';

const FormActionTypes = {
  ADD: 'Add New Committee',
  EDIT: 'Edit Committee',
};

const CommitteesManagement = () => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [formActionType, setFormActionType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, [updateSuccess]);

  const fetchData = async () => {
    setLoading(true);
    CommitteeService.getAll()
      .then(response => {
        let dataToSet = response.data;
        dataToSet.forEach((item) => {
          item.category = Categories[item.category - 1];
        });
        console.log(dataToSet);
        setData(dataToSet);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      }).finally(() => {
        setLoading(false);
      });
  };

  const onDeleteButtonClicked = (record) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete "${record.committee}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setLoading(true);
        CommitteeService.deleteById(record.id)
          .then(() => {
            const updatedData = data.filter(item => item.id !== record.id);
            setData(updatedData);
          })
          .catch(error => {
            console.error('Error deleting data:', error);
          }).finally(() => {
            setLoading(false);
          });
      },
    });
  };

  const onEditButtonClicked = (record) => {
    setFormActionType(FormActionTypes.EDIT);
    setInitialValues(record);
    setModalVisible(true);
  };

  const onAddButtonClicked = () => {
    setFormActionType(FormActionTypes.ADD);
    setInitialValues(null);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setFormActionType(null);
    setInitialValues(null);
    setModalVisible(false);
  };

  const handleCreateCommittee = (values) => {
    if (!values) {
      return;
    }

    const newCommittee = {
      committee: values.committee,
      category: Categories.indexOf(values.category) + 1,
      about: values.about,
      emailListAddress: values.mailingList,
    };

    setLoading(true);
    CommitteeService.add(newCommittee)
      .then(() => {
        notification.success({
          message: StringConstants.SUCCESS,
          description: 'Committee added successfully',
        });
        fetchData();
      })
      .catch(error => {
        console.error('Error adding data:', error);
      }).finally(() => {
        setLoading(false);
        handleCancel();
      });
  };

  const handleEditCommittee = (values) => {
    console.log(values);
    if (!values || !initialValues) {
      return;
    }

    const updatedCommittee = {
      id: initialValues.id,
      committee: values.committee,
      category: Categories.indexOf(values.category) + 1,
      about: values.about,
      mailingList: values.mailingList,
    };

    setLoading(true);
    CommitteeService.update(updatedCommittee)
      .then(() => {
        fetchData();
        notification.success({
          message: StringConstants.SUCCESS,
          description: 'Committee updated successfully',
        });
      })
      .catch(error => {
        console.error('Error updating data:', error);
      })
      .finally(() => {
        setLoading(false);
        handleCancel();
      });
  };

  const tableColumns = [columnMapping.id, columnMapping.committee, columnMapping.committeeCategory, columnMapping.action(onEditButtonClicked, onDeleteButtonClicked)];
  const formFields = [
    { name: 'committee', label: 'Committee', type: 'text', required: true },
    {
      name: 'category', label: 'Category', type: 'select', required: false,
      options: Categories.map(category => ({ label: category, value: category }))
    },
    { name: 'about', label: 'About', type: 'textarea', required: false },
    { name: 'mailingList', label: 'Mailing List', type: 'text', required: false },
  ];

  return (
    <Spin spinning={loading}>
      <ProductHeader title="Committees Management" />
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddButtonClicked}>Add New Committee</Button>
      </div>
      <TableSearch columns={tableColumns} data={data} />
      <PopupForm
        title={formActionType}
        open={modalVisible}
        initialValues={initialValues}
        onCancel={handleCancel}
        onFinish={formActionType === FormActionTypes.ADD ? handleCreateCommittee : handleEditCommittee}
        fields={formFields}
      />
    </Spin>
  );
};

export default CommitteesManagement;
