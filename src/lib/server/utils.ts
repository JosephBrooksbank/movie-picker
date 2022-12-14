export const pojo = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}