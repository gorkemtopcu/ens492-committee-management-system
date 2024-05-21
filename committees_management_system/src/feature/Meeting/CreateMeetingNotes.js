import React, { useState, useEffect } from 'react';
import { Modal, Spin, notification } from 'antd';
import ProductForm from 'product/components/ProductForm';
import ProductHeader from 'product/components/ProductHeader';
import MembersService from 'product/service/members';
import StringConstants from 'product/constants/StringConstants';
import CommitteeService from 'product/service/committees';
import MeetingsService from 'product/service/meetings';

const CreateMeetingNotes = () => {
    const [committees, setCommittees] = useState([]);
    const [members, setMembers] = useState([]);
    const [committesLoading, setCommitteesLoading] = useState(false);
    const [membersLoading, setMembersLoading] = useState(false);
    const [createMeetingLoading, setCreateMeetingLoading] = useState(false);

    const fetchMembers = async () => {
        try {
            setMembersLoading(true);
            const response = await MembersService.getAll();
            const formattedData = response.data.map(member => ({
                value: member.suid,
                label: member.fullName
            }));
            setMembers(formattedData);
            setMembersLoading(false);
        } catch (error) {
            alert(StringConstants.ERROR);
        }
    };

    const fetchCommittees = async () => {
        try {
            setCommitteesLoading(true);
            const response = await CommitteeService.getAll();
            const formattedData = response.data.map(committee => ({
                value: committee.id,
                label: committee.committee
            }));
            setCommittees(formattedData);
            setCommitteesLoading(false);
        } catch (error) {
            alert(StringConstants.ERROR);
        }
    }

    const createMeetingNote = async (data) => {
        try {
            await MeetingsService.add(data);
            return true;
        } catch (error) {
            alert(StringConstants.ERROR);
            return false;
        }
    }

    useEffect(() => {
        fetchCommittees();
        fetchMembers();

    }, []);

    const formFields = [
        { name: 'committee', label: 'Committee', type: 'select', required: true, options: committees },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'place', label: 'Place', type: 'text', required: false },
        { name: 'subject', label: 'Subject', type: 'textarea', required: true },
        { name: 'decisions', label: 'Decisions', type: 'textarea', required: true },
        { name: 'participants', label: 'Participants', type: 'multiSelect', required: true, options: members },
        { name: 'guests', label: 'Guests', type: 'text', required: false },
        { name: 'attachment', label: 'Attachment', type: 'file', required: false },
        { name: 'nextMeetingDate', label: 'Next Meeting Date', type: 'date', required: true },
    ];

    const handleFinish = async (values, form, setFileList) => {
        setCreateMeetingLoading(true);
        const data = {
            "committee": values.committee,
            "date": values.date,
            "place": values.place,
            "participants": `[${values.participants.map(element => `"${element}"`).join(', ')}]`,
            "guests": values.guests,
            "subject": values.subject,
            "decisions": values.decisions,
            "attachment": `[${values.attachment.map(element => `"${element.name}"`).join(', ')}]`,
            "nextMeetingDate": values.nextMeetingDate,
            // created by will be implemented after login operations
        };

        console.log("Form data:", data);

        const isCreated = await createMeetingNote(data);
        if (!isCreated) {
            notification.error({
                message: StringConstants.ERROR,
                description: 'Meeting notes have not been successfully submitted.',
            });
            return;
        }

        notification.success({
            message: StringConstants.SUCCESS,
            description: 'Meeting notes have been successfully submitted.',
        });

        setCreateMeetingLoading(false);
        form.resetFields();
        setFileList([]);
    };

    const handleCancel = (form, setFileList) => {
        Modal.confirm({
            title: 'Are you sure you want to cancel?',
            content: 'All your changes will be lost.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                form.resetFields();
                setFileList([]);
            },
        });
    };

    return (
        <Spin spinning={createMeetingLoading || membersLoading || committesLoading}>
            <ProductHeader title={"Create Meeting Notes"} />
            <ProductForm onCancel={handleCancel} onFinish={handleFinish} fields={formFields}></ProductForm>
        </Spin>
    );
};

export default CreateMeetingNotes;
