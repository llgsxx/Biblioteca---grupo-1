export function delay(tempoms: number) {
    return new Promise(resolve => setTimeout(resolve, tempoms))
}
