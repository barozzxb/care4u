export function isBlank(str :String) : boolean {
    return !str || str.trim().length === 0
}