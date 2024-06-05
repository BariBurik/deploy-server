import XLSX from 'xlsx'
import * as fs from 'fs'

function numToLetter(num) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[num - 1];
}

export async function getContentFromTable(require, sheetsName) {
    const pathToSheet = `./static/${sheetsName}`
    const requires = require.split('-')
    for (let i = 0; i < requires.length; i++) {
        if (i !== 0) {
            requires[i] = parseFloat(requires[i].replace(/"/g, ''));
        }
    }
    const workbook =  XLSX.readFile(pathToSheet);
    const worksheet = workbook.Sheets[requires[0]];

    const cellStart = `${numToLetter(requires[1])}${requires[2]}`

    if (requires.length === 3) {
        let cellsContent = {}
        if (cellStart === "A3") {
            cellsContent[require] = './static/Picture1.png' 
        } else {
            cellsContent[require] = `${worksheet[cellStart].w}`
        }
        return cellsContent
    } else if (requires.length === 5) {
        const cellEnd = `${numToLetter(requires[3])}${requires[4]}`
        const range = XLSX.utils.decode_range(`${cellStart}:${cellEnd}`)
        const data = {};

        const arrayData = [];
        for (let row = range.s.r; row <= range.e.r; row++) {
            const rowData = [];
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({r: row, c: col})
                const cellValue = worksheet[cellAddress]
                if (cellValue && cellValue.v) {
                    rowData.push(cellValue.v);
                }
                
            }
            if (rowData.length > 0) {
                arrayData.push(rowData)
            }
        }
        data[require] = arrayData
        return data;
    }
    
}