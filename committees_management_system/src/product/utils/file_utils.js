class FileUtils {
    static getFileExtension(filename) {
        return filename.split('.').pop() || '';
    }

    static getDocumentType(filename) {
        const extension = FileUtils.getFileExtension(filename);
        const documentTypes = {
            pdf: 'PDF Document',
            doc: 'Word Document',
            docx: 'Word Document',
            xls: 'Excel Document',
            xlsx: 'Excel Document',
            ppt: 'PowerPoint Document',
            pptx: 'PowerPoint Document',
            txt: 'Text Document',
            html: 'HTML Document',
            htm: 'HTML Document',
            png: 'Image',
            jpg: 'Image',
            jpeg: 'Image',
        };

        return documentTypes[extension.toLowerCase()] || 'Unknown Document Type';
    }
}

module.exports = FileUtils;