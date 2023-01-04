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

export function strTimeToNumber(time: string) {
    if (!time) return 0;

    const timeSPlit = time.split(":");

    if (timeSPlit.length !== 2) return 0;

    const hours = Number(timeSPlit[0]) * 60;
    const minutes = Number(timeSPlit[1]);

    return hours + minutes;
}

export function numTimeToString(numTime: number) {
    const time = numTime || 0;

    const hours = Math.trunc(time / 60);
    const minutes = time / 60 - hours;

    const hoursStr = String(hours > 12 ? hours - 12 : hours).padStart(2, "0");
    const minutesStr = String(minutes).padStart(2, "0");

    return `${hoursStr}:${minutesStr} ${hours > 12 ? "P.M." : "A.M."}`;
}
