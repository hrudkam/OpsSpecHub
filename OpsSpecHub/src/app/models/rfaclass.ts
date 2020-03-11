export interface iModule {
       functionality?: string;
       url?:string; 
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
}
export interface iEmployee{
    name?: string;
    title?: string; 
}
