import React, { useState } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import PrimaryButton from 'product/components/PrimaryButton';
import ProductHeader from 'product/components/ProductHeader';
import { Button, Modal, Spin } from 'antd';
import Filter from 'product/components/Filter';
import StringConstants from 'product/constants/StringConstants';
import TableExpandable from 'product/components/TableExpandable';
import { columnMapping } from 'product/constants/ColumnMapping';
import AssignmentsService from 'product/service/assignments';
import { PlusOutlined } from '@ant-design/icons';
import PopupForm from 'product/components/PopupForm';
import CommitteeService from 'product/service/committees';
import Categories from 'assets/jsons/report/committee_categories.json';
import MembersService from 'product/service/members';
import RolesService from 'product/service/roles';
import ExportButtons from 'product/components/ExportButtons';
import ReportUtils from 'product/utils/report_utils';


const AssignmentsManagement = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [isFilterMode, setIsFilterMode] = useState(true);
  const [committees, setCommittees] = useState([]);
  const [members, setMembers] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [initialValues] = useState(null);
  const [roles, setRoles] = useState([]);
  const [duplicateModalVisible, setDuplicateModalVisible] = useState(false);

  const isFilterable = () => selectedTerms.length > 0;
  //Create a function to get last term from list of terms
  const getLastTerm = () => {
    return Terms[0];
  };

  const fetchMembers = async () => {
    setLoading(true);
    MembersService.getAll()
      .then(response => {
        setMembers(response.data);
        console.log(members);
        setLoading(false);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      });
  };

  const fethCommittees = async () => {
    setLoading(true);
    CommitteeService.getAll()
      .then(response => {
        let dataToSet = response.data;
        dataToSet.forEach((item) => {
          item.category = Categories[item.category - 1];
        });
        setLoading(false);
        setCommittees(dataToSet);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      });
  };

  const fetchRoles = async () => {
    setLoading(true);
    RolesService.getAll()
      .then(response => {
        setRoles(response.data);
        console.log(roles);
        setLoading(false);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      });
  };


  const fetchReportData = async () => {
    setLoading(true);
    AssignmentsService.getByTerm(selectedTerms.map(t => t.value))
      .then(response => {
        const organizedData = response.data.map(item => ({
          key: item.committee,
          committee: item.committee,
          instructors: item.instructors.map(instructor => ({
            fullName: instructor.fullName,
            program: instructor.program,
            committee: item.committee,
          }))
        }));
        setReportData(organizedData);
        console.log(response);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackButtonClick = () => {
    setIsFilterMode(true);
  };

  const handleSelectedTermsChange = (terms) => {
    setSelectedTerms(terms);
  };

  const handleFilterButtonClick = () => {
    fetchReportData();
    setIsFilterMode(false);
  };

  const handleDeleteButtonClicked = (record) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete assignment "${record.fullName}" from "${record.committee}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setLoading(true);
        AssignmentsService.deleteAssignment(record, selectedTerms[0].value)
          .then(() => {
            fetchReportData();
          })
          .catch(error => {
            console.error('Error deleting data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
    console.log(record);
  };

  const onDuplicateButtonClicked = () => {
    setDuplicateModalVisible(true);
  };

  const onAddButtonClicked = () => {
    fethCommittees();
    fetchMembers();
    fetchRoles();
    setAddModalVisible(true);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
    setDuplicateModalVisible(false);
  };

  const handleCreateAssigment = (values) => {
    if (!values) {
      return;
    }
    AssignmentsService.add(values)
      .then(() => {
        fetchReportData();
        setAddModalVisible(false);
      })
      .catch(error => {
        console.error('Error creating assignment:', error);
      });

    console.log(values);
  };

  const handleDuplicateTerm = (record) => {
    if (!record) {
      return;
    }

    Modal.confirm({
      title: 'Confirm Duplicate',
      content: `Are you sure you want to duplicate term ${record.term} to last term ${getLastTerm()}?`,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        setLoading(true);
        AssignmentsService.duplicateTerm(record.term, getLastTerm())
          .then(() => {
            fetchReportData();
            setDuplicateModalVisible(false);
          })
          .catch(error => {
            console.error('Error duplicating term:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      onCancel() {
        console.log('Duplicate term operation canceled');
      }
    });

    console.log(record);
  };


  const getExportData = () => {
    if (!reportData) { return null; }
    console.log(reportData);
    return reportData.flatMap(c => c.instructors.map(m => ({
      "Committee": c.committee,
      "Name": m.fullName,
      "Program": m.program
    })));
  }

  const exportExcel = () => {
    ReportUtils.exportExcel(getExportData, 'assignments.xlsx');
  };

  const copyClipboard = () => {
    ReportUtils.copyClipboard(getExportData);
  };



  const outsideColumns = [columnMapping.committee];
  const insideColumns = [columnMapping.fullName, columnMapping.program, columnMapping.action(null, handleDeleteButtonClicked)];

  const addButtonFormFields = [
    {
      name: 'committee', label: 'Committees', type: 'select', required: true,
      options: committees.map(committee => ({ label: committee.committee, value: committee.id }))
    },
    {
      name: 'fullName', label: 'Member', type: 'select', required: true,
      options: members.map(member => ({ label: member.fullName, value: member.suid }))
    },
    {
      name: 'term', label: 'Term', type: 'select', required: true,
      options: Terms.map(term => ({ value: term, label: term }))
    },
    {
      name: 'role', label: 'Role', type: 'select', required: true,
      options: roles.map(role => ({ label: role.role, value: role.id }))
    }
  ];

  const duplicateButtonFromFields = [
    {
      name: 'term', label: 'Term', type: 'select', required: true,
      options: Terms.map(term => ({ value: term, label: term }))
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <ProductHeader title={`Assignments Management`} />
      {isFilterMode && (
        <Filter
          filterProps={[
            {
              title: StringConstants.SELECT_TERM,
              items: Terms.map(term => ({ value: term, label: term })),
              onChange: handleSelectedTermsChange,
              selected: selectedTerms,
              multipleSelection: false,
            }
          ]}
          handleFilterButtonClick={handleFilterButtonClick}
          isFilterable={isFilterable}
        />
      )}
      {!isFilterMode && (
        <div>
          <div style={{ display: 'flex', marginBottom: 16 }}>
            <div style={{ marginBottom: '20px', marginRight: '10px' }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={onAddButtonClicked}>New Assignment</Button>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={onDuplicateButtonClicked}>Duplicate Term</Button>
            </div>
          </div>
          <ExportButtons handleCopy={copyClipboard} handleExcel={exportExcel} />
          <TableExpandable
            outsideColumns={outsideColumns}
            insideColumns={insideColumns}
            dataSource={reportData}
            getNestedData={record => record.instructors}
          />
          <PrimaryButton
            title={StringConstants.BACK}
            onClick={handleBackButtonClick}
            style={{ marginTop: '30px' }}
          />
          <PopupForm
            title={StringConstants.ADD_ASSIGNMENT}
            open={addModalVisible}
            initialValues={initialValues}
            onCancel={handleCancel}
            onFinish={handleCreateAssigment}
            fields={addButtonFormFields}
          />
          <PopupForm
            title={StringConstants.DUPLICATE_TERM}
            open={duplicateModalVisible}
            initialValues={initialValues}
            onCancel={handleCancel}
            onFinish={handleDuplicateTerm}
            fields={duplicateButtonFromFields}
          />
        </div>
      )}
    </Spin>
  );
};

export default AssignmentsManagement;
