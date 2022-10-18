export const getDate = (string) => {
    const date = new Date(string)
    return date.toISOString().split('T')[0]
}