export function UniqueKey(filename : string) {
    const extension = filename.split('.').pop()
    filename = filename.replace(/[^a-zA-Z0-9]/g, '_')
    filename = filename + Math.floor(Math.random() * 10000000) + Date.now() + '.' + extension
    return filename
}