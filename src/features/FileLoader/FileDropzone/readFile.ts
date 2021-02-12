export function readFile (file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new window.FileReader()

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.onabort = reject

    reader.readAsText(file)
  })
}
