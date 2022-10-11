const excel = require('exceljs')
const path = require('path')
const book = new excel.Workbook();
const gaweExcel = (data_user, sheet_name, filedir) => {
    try {
        const dir = path.resolve(filedir);
        book.xlsx.readFile(dir).then(function(){
            const check_sheet = book.getWorksheet(sheet_name); 
            check_sheet.columns = [
                { key: 'username', width: 30 },
                { key: 'password', width: 30 },
                { key: 'user_agent', width: 100 },
                { key: 'ip_address', width: 30 },
                { key: 'cookies', width: 100 },
                { key: 'phone', width: 30 },
                { key: 'tanggal', width: 30 }
            ];
            check_sheet.addRow(data_user)
            return book.xlsx.writeFile(dir)
        });
    } catch(err) {
        console.error(err)
    }
}

module.exports = gaweExcel