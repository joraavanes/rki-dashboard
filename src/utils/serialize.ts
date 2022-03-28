
export const serializeResToArr = (response: any, prop: string, district: string) => 
    response.data[district].history.map((i:any) => i[prop]);
