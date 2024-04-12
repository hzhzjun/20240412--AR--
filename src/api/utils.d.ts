declare type Methods = 'get' | 'post';

declare interface APIArguments {
    uri: string,
    method?: Methods | Uppercase<Methods>,
    headers?: any
    withToken?: boolean
    secret?: string,
    secretKey?: string,
    contentType?: string,
    showMsg?:boolean,
    showLoading?: boolean;
}


declare type APIConfig = APIArguments | string

declare interface GenerateAPIParams {
    [key: string]: APIConfig
}

declare type RequestParamType = Record<string, any>

declare interface ResponseType<T = any> {
    code: number,
    success: boolean,
    message: string,
    data: T
}

export declare function generateAPI<
    T extends GenerateAPIParams = GenerateAPIParams,
    P = RequestParamType,
    Q = ResponseType>
(apiList: T): {
    [key in keyof T]: (args?: P) => Promise<Q>
}


