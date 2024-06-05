import fileService from "../service/fileService.js"


class fileController {
    async loadFile(req, res) {
        try {
            const {sheetName, templateName} = req.body
            const fileBuffer = await fileService.loadFile(sheetName, templateName)
            res.setHeader('Content-Disposition', 'attachment; filename=' + templateName);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.status(200).json({fileBuffer});
        } catch (e) {
            return res.status(400).json({error: "Файлы являются нечитабельными"})
        }
    }

    async fileToHtml(req, res) {
        try {
            const {fileName} = req.body
            const htmlFinally = await fileService.fileToHtml(fileName)
            return res.status(200).json({htmlFinally})
        } catch (e) {
            return res.status(400).json({error: e})
        }
    }
}

export default new fileController()