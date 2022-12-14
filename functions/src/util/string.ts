export function sanitizeString(word: string): string {
    return word
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function isOnlyNumbers(word: string) {
    const isNumeric = new RegExp(/^[0-9]+$/);
    return isNumeric.test(word);
}

export function strIncludes(str: string, ...includes: string[]): boolean {
    for (let i = 0; i < includes.length; i++) {
        if (str.indexOf(includes[i]) > -1) {
            return true;
        }
    }

    return false;
}
