let currentId = 10;
export function GetnerateId() {
    currentId += 1;
    return String(currentId);
}
