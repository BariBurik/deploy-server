import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'


class linkService {

    async linkToFile(link, ext) {
        let fileName
        if (ext === ".xlsx") {
            fileName = `sheet${Date.now()}.xlsx`
        } else if (ext === ".docx") {
            fileName = `template${Date.now()}.docx`
        } else {
            throw new Error("Недопустимый формат файла")
        }
        const filePath = path.resolve('static', fileName)
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }

        const data = await response.buffer();

        fs.writeFileSync(filePath, data);

        return fileName;
    }
}

export default new linkService()