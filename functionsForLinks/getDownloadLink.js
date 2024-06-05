

export default function getDownloadLink(link, ext) {
    const fileId = link.split("/d/")[1].split('/')[0]
    let fileUrl

    if (ext === ".docx") {
        fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else if (ext === ".xlsx") {
        fileUrl = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
    }
    return fileUrl
}