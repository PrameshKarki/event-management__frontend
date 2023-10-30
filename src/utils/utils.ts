export function camelCaseToTextCapitalize(inputString: string) {
    const newText = inputString.replace(/([A-Z])/g, ' $1');
    return newText.charAt(0).toUpperCase() + newText.slice(1).trim();
}