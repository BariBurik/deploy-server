import mammoth from "mammoth";

export async function convertDocxToHtml(inputFilePath) {
    let html;
    await mammoth.convertToHtml({ path: inputFilePath })
        .then((result) => {
            html = result.value;
        })
    return html
}