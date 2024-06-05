import * as fs from 'fs';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun } from 'docx';
import * as path from 'path';

const createTable = (data) => {
    const rows = data.map(row => {
        const cells = row.map(cell => new TableCell({
            children: [new Paragraph({ children: [new TextRun(cell.toString())] })],
        }));
        return new TableRow({ children: cells });
    });
    return new Table({ rows });
};

const replaceTextAndTables = (text, replacements) => {
    let paragraphs = [];
    let newText

    if (text.includes('Теперь вставляется картинка:')) {
        newText = text.split('Формируем Таблицу 1')[0] + '\n' + text.split(':{Результат-1-3}')[1]
    } else { 
        newText = text
    }

    newText.split('\n').forEach(line => {
        let replaced = false;

        replacements.forEach(replacement => {
            const [placeholder, newContent] = Object.entries(replacement)[0];

            if (line.includes(`{${placeholder}}`)) {
                replaced = true;

                if (typeof newContent === 'string') {
                    if (newContent === "./static/Picture1.png") {
                        const imageBuffer = fs.readFileSync(newContent)
                        const imageRun = new ImageRun({
                            data: imageBuffer,
                            transformation: {
                                width: 300,
                                height: 50
                            }
                        });
                        const replasingLine = line.replace(new RegExp(`{${placeholder}}`, 'g'), '') 
                        paragraphs.push(new Paragraph({ children: [new TextRun(replasingLine), imageRun] }));
                    } else {
                        paragraphs.push(new Paragraph({ children: [new TextRun(line.replace(new RegExp(`{${placeholder}}`, 'g'), newContent))] }));
                    }

                } else if (Array.isArray(newContent)) {
                    const parts = line.split(new RegExp(`{${placeholder}}`));
                    if (parts[0]) {
                        paragraphs.push(new Paragraph({ children: [new TextRun(parts[0])] }));
                    }

                    const table = createTable(newContent);
                    paragraphs.push(table);

                    if (parts[1]) {
                        paragraphs.push(new Paragraph({ children: [new TextRun(parts[1])] }));
                    }
                }
            }
        });

        if (!replaced) {
            paragraphs.push(new Paragraph({ children: [new TextRun(line)] }));
        }
    });

    return paragraphs;
};

export async function fillingFinallyFile(filePath, replacements) {
    try {
        const { value: extractedText } = await mammoth.extractRawText({ path: filePath });

        const paragraphs = replaceTextAndTables(extractedText, replacements);

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: paragraphs,
                },
            ],
        });

        const tempFilePath = path.join('./static/temp_document.docx');
        const newBuffer = await Packer.toBuffer(doc);
        fs.writeFileSync(tempFilePath, newBuffer, { mode: 0o666 });

        fs.renameSync(tempFilePath, filePath);

        console.log('Заменено успешно!');

        return newBuffer;
    } catch (err) {
        console.error('Ошибка замены:', err);
    }
}