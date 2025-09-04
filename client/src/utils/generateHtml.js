function generateHtmlApi(htmlText, htmlTag) {
    const lines = htmlText.split('\n');
    let html = '';
    lines.forEach((line) => {
        html += `<${htmlTag ? htmlTag : "p"} class="list-disc">${line}</${htmlTag ? htmlTag : "p"}>\n`;
    });
    return html;
}

export default generateHtmlApi;
