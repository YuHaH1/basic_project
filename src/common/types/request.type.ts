export type TMethods = 'get' | 'post' | 'delete' | 'put'

export interface IResponse <T>{
    code: number,
    data: T,
    msg:string,
}