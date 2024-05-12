import React from 'react';

const CommitteesTable = ({ committeesData }) => {
    return (
        <div>
            {Object.keys(committeesData).map(committeeId => (
                <div key={committeeId}>
                    <h2>{committeesData[committeeId].committee.committee}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Email</th>
                                <th>Program</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(committeesData[committeeId]).map(memberId => {
                                if (memberId !== 'committee') {
                                    const member = committeesData[committeeId][memberId].member;
                                    return (
                                        <tr key={memberId}>
                                            <td>{member.fullName}</td>
                                            <td>{member.email}</td>
                                            <td>{member.program}</td>
                                            <td>{member.active ? 'Active' : 'Inactive'}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default CommitteesTable;
