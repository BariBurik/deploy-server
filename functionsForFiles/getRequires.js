import mammoth from "mammoth"

export async function getRequires(filePath) {
    return new Promise((resolve, reject) => {
        mammoth.extractRawText({path: filePath})
            .then(result => {
                const text = result.value;
                const regex = /\{([^}]+)\}/g;
                let match;
                let arrayWithContent = [];
                while ((match = regex.exec(text)) !== null) {
                    arrayWithContent.push(match[1]);
                }
                resolve(arrayWithContent);
            })
            .catch(error => {
                reject(error);
            });
    });
}