import getDownloadLink from "../functionsForLinks/getDownloadLink.js"
import linkService from "../service/linkService.js"


class linkController {
    async linkToFile(req, res) {
        try {
            const {link, ext} = req.body
            const downloadLink = getDownloadLink(link, ext)
            const fileName = await linkService.linkToFile(downloadLink, ext)
            return res.status(200).json({fileName})
        } catch (e) {
            return res.status(400).json({error: "Введена некорректная ссылка"})
        }
    }
}

export default new linkController()