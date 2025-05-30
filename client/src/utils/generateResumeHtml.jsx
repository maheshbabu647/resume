const escapeHtml = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  const str = String(value);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const generalPreviewHtml = (code, data) => {
    if (!code) {
        return '<p style="text-align:center; padding:20px;">Template code is missing.</p>';
    }

    if (!data || Object.keys(data).length === 0) {
        return code;
    }

    let processedCode = code;
    const loopRegex = /\{\{#each\s+([\w.-]+)\s*\}\}([\s\S]*?)\{\{\/each\s*\1\s*\}\}/gi;

    processedCode = processedCode.replace(loopRegex, (fullMatch, arrayName, itemHtmlTemplate) => {
        const dataArray = data[arrayName];

        if (Array.isArray(dataArray) && dataArray.length > 0) {
        let allRenderedItemsHtml = '';

        dataArray.forEach(itemObject => {
            if (typeof itemObject !== 'object' || itemObject === null) {
            return;
            }

            let currentItemRenderHtml = itemHtmlTemplate;

            for (const propertyName in itemObject) {
            if (Object.prototype.hasOwnProperty.call(itemObject, propertyName)) {
                const propertyValue = itemObject[propertyName];
                const escapedPropertyValue = escapeHtml(propertyValue);

                const placeholderInItemRegex = new RegExp(`\\{\\{\\s*this\\.${propertyName}\\s*\\}\\}`, 'gi');
                currentItemRenderHtml = currentItemRenderHtml.replace(placeholderInItemRegex, escapedPropertyValue);
            }
            }
            allRenderedItemsHtml += currentItemRenderHtml;
        });
        return allRenderedItemsHtml;
        }
        return '';
    });

    const replaceSimpleAndNestedPlaceholders = (currentHtml, dataObject, pathPrefix = '') => {
        let htmlBeingProcessed = currentHtml;

        for (const key in dataObject) {
        if (Object.prototype.hasOwnProperty.call(dataObject, key)) {
            const value = dataObject[key];
            const fullPlaceholderKey = pathPrefix ? `${pathPrefix}.${key}` : key;

            if (Array.isArray(value)) {
            continue;
            } else if (typeof value === 'object' && value !== null) {
            htmlBeingProcessed = replaceSimpleAndNestedPlaceholders(htmlBeingProcessed, value, fullPlaceholderKey);
            } else {
            const escapedValue = escapeHtml(value);
            const placeholderRegex = new RegExp(`\\{\\{\\s*${fullPlaceholderKey.replace(/\./g, '\\.')}\\s*\\}\\}`, 'gi');
            htmlBeingProcessed = htmlBeingProcessed.replace(placeholderRegex, escapedValue);
            }
        }
        }
        return htmlBeingProcessed;
    };

    processedCode = replaceSimpleAndNestedPlaceholders(processedCode, data);

    return processedCode;
};

const resumeHtml = (code , data) => {
    return generalPreviewHtml(code, data)
}

export default resumeHtml