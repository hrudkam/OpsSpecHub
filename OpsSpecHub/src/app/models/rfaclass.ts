export interface iModule {
       functionality?: string;
       systemtype?: string; 
       resource?:string; 
       
}
export interface iRFAClass {
    rfanum?: number; 
    sinum?: number;
    hsi?: number;
    customer?: string;
    functionality?: string;
    summary?: string;
    siowner?: string;
    responsible?: string;
    approved?: string;
    rfastatus?: string;
    complexity?: number;
    rfatype?: string;
    tier?: number;
    severity?: number;
    total?: number;
    urgency?: number; 
    category?: string;
    maint?: number; 
    invest?: number; 
}
export interface iEmployee{
    name?: string;
    title?: string; 
}

export interface iRFAAssignment{
    rfanum?: number;
    sinum?: number;
    assignment?: string;
    responsible?: string;
    approved?: string; 
    functionality?: string;
    summary?: string;
    type?: string; 
    severity?: string; 
}
export interface iOpsSpec{
    opsspecnum: number;
    osfullname: string;
    isavailable: number;
}