export const pojo = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj)); 
}