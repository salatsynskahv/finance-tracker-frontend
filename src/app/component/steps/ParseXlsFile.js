
import readXlsxFile from "read-excel-file";

const ParseXlsFile = (file, initAllExpences) => {
    readXlsxFile(file).then(rows => {
        const parsedRows = rows.slice(20).map(row => {
            return {
                'dateOfOperation': row[0],
                'details': row[1],
                'categoryCode': row[2],
                'sum': row[3]
            }
        });

        initAllExpences(parsedRows.filter(row => row.sum < 0));
    });
}

export default ParseXlsFile;