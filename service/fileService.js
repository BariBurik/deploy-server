import { getRequires } from "../functionsForFiles/getRequires.js"
import { fillingFinallyFile } from "../functionsForFiles/fillingFinallyFile.js";
import { getContentFromTable } from "../functionsForFiles/getContentFromTable.js"
import { convertDocxToHtml } from "../functionsForFiles/convertDocxToHtml.js"
import * as fs from 'fs'

class fileService {
    async loadFile(sheetsName, templateName) {
        const arrayWithRequires = await getRequires(`./static/${templateName}`)
        let allContentForFinallyFile = [];
        for (let i = 0; i < arrayWithRequires.length; i++) {
            allContentForFinallyFile.push(await getContentFromTable(arrayWithRequires[i], sheetsName))
        }
        const fileBuffer = await fillingFinallyFile(`./static/${templateName}`, allContentForFinallyFile)
        return fileBuffer
    }

    async fileToHtml(fileName) {
        const htmlFinally = await convertDocxToHtml(`./static/${fileName}`)
        if (htmlFinally) {
            return htmlFinally;
        } else {
            throw new Error('Ошибка обработки')
        }
        
    }
}

export default new fileService() 