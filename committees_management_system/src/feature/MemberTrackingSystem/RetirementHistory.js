import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/RetirementMapping'
import MemberRetirementStatus from 'assets/jsons/RetirementHistory/RetirementHistory.json';

const RetirementHistory = () => {
    const data = MemberRetirementStatus;

    const fields = [
        columnMapping.id,
        columnMapping.facultyMember,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration,
        columnMapping.startedAt,
        columnMapping.expectedRetirement,
        columnMapping.status,
        columnMapping.relateddocuments
    ];

    return (
        <div>
            <TableSearch columns={fields} data={data} />
        </div>
    );
};

export default RetirementHistory;
