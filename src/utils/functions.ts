export function isBlank(str :string) : boolean {
    return !str || str.trim().length === 0
}