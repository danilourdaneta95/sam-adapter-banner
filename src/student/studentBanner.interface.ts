
export interface ResponseBanner {
    statusCode: number;
    body:       Body;
    message?: string;
}

export interface Body {
    person:   Person;
    phones:   Addresss;
    addresses: Addresss;
    emails:   Addresss;
}

export interface Addresss {
    statusCode: number;
    message:    string;
}

export interface Person {
    statusCode:                number;
    message:                   string;
    pidm:                      string;
    rut:                       string;
    aditional_info:            Addresss;
    international_information: Addresss;
}
