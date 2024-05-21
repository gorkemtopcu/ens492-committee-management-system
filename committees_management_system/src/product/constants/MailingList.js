const columnMapping = {
    MailList: {
        title: 'Mail List',
        dataIndex: 'maillist',
        key: 'maillist',
        searchable: true,
    },
    data: {//this is a list there can be many elements 
        
        id: {
            title: 'Suid',
            dataIndex: 'suid',
            key: 'suid',
            searchable: true,
        },
        committee: {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            searchable: true,
        },
        facultyMember: {
            title: 'Mail',
            dataIndex: 'mail',
            key: 'mail',
            searchable: true,
        },
        email: {
            title: 'Term',
            dataIndex: 'term',
            key: 'term',
            searchable: true,
        },
        
    }

    
};

export { columnMapping };
