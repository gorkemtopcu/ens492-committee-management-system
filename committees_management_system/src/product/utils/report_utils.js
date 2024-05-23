import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { message } from 'antd';

class ReportUtils {
    static exportExcel(getExportData, filename) {
        const excelData = getExportData();
        if (!excelData) {
            message.error('Data is missing!');
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, filename);
        XLSX.writeFile(workbook, filename);
    }

    static copyClipboard(getExportData) {
        const data = getExportData();
        if (!data) {
            message.error('Data is missing!');
            return;
        }
        const csvData = Papa.unparse(data);
        navigator.clipboard.writeText(csvData)
            .then(() => {
                message.success('Data copied to clipboard successfully!');
            })
            .catch(err => {
                message.error('Error copying data to clipboard:', err);
            });
    }
}

export default ReportUtils;
