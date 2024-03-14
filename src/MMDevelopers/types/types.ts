export interface User {
    name:string;
    email:string|boolean;
    pic:string;
    gender:string;
    role:string;
    dob:string;
    _id:string;
};

export interface Product {
    name:string,
    price:number;
    stock:number;
    category:string;
    photo:string;
    _id:string;
};
export interface Plot {
    name:string,
    price:number;
    stock:number;
    category:string;
    photo:string;
    _id:string;
};


interface PaymentState {
    _id:string;
    slipNo:string;
    amount:number;
    modeOfPayment:string;
    transactionID:number;
    chequeNumber:number;
    receiverAccount:number;
    date:string;
};
interface PlotState {
    _id:string;
    site_name:string;
    plot_no:number;
    size:number;
    rate:number;
    payments:PaymentState[];
    duration:number;
    downPayment:number;
    hasSold: true;
    client:string;
    timeCovered:number;
    agent:string;
    totalPaid:number;
    totalShouldPay:number;
};
export interface AllSitesState {
    _id: string;
    site_name: string;
    total_size: number;
    plots:PlotState[];
    allPlotsBalance:number;
    allPlotsPayments:number;
};
export interface User {
};

export interface Site {
    name:string,
    price:number;
    stock:number;
    category:string;
    photo:string;
    _id:string;
};
export interface Plot {
    _id:string;
    plot_no:number;
    size:number;
    rate:number;
    payments:PaymentState[];
    duration:number;
    downPayment:number;
    hasSold: true;
    client:string;
};
export interface AllPlotsState {
    _id?:number;
    site_name:"Jajru(Ist)"|"Jajru(IInd)"|"Jajru(IVth)"|"Jajru(Vth)"|"Jajru(VIth)"|"Sec-58";
    plot_no:number;
    size:number;
    rate:number;
    client?:string;
    payments?:string[];
    hasSold:boolean;
    totalPaid:number;
    duration:number;
    downPayment?:number;
    timeCovered:number;
    
}
export interface Client {
    name:string,
    price:number;
    stock:number;
    category:string;
    photo:string;
    _id:string;
};
export interface Payment {
    _id:string;
    slipNo:string;
    amount:number;
    modeOfPayment:string;
    transactionID:number;
    chequeNumber:number;
    receiverAccount:number;
    date:string;
};

export interface AddPlotState {
    site_name?:string;
    plot_no?:number;
    size?:number;
    rate?:number;
    duration?:number;
    downPayment?:number;
    agent?:string;
}
export interface AddSiteState {
    site_name?:string;
    total_size?:number;
};

interface ClientDashboard {
    _id?:number;
    code?:number;
    name?:string;
    careTaker?:string;
    role?:"agent"|"client";
    mobile?:number;
    address?:string;
};
interface PaymentDashboard {
    _id?:string;
    slipNo?:string;
    amount?:number;
    modeOfPayment?:string;
    transactionID?:number;
    chequeNumber?:number;
    receiverAccount?:number;
    // paymentStatus?:string;
    paymentStatus?:"token"|"emi"|"cancelled"|"bounced"|"wasted";
    createdAt?:string;
    updateAt?:string;
};

export interface PlotDashboard {
    _id?:number;
    site_name?:string;
    plot_no?:number;
    size?:number;
    rate?:number;
    client?:ClientDashboard;
    payments?:PaymentDashboard[];
    hasSold?:boolean;
    duration?:number;
    totalPaid?:number;
    downPayment?:number;
    timeCovered?:number;
    agent?:string;
};

export interface AllClientsState {
    _id:number;
    code?:number;
    name?:string;
    careTaker?:string;
    role?:"agent"|"client";
}

export interface PaymentFormType {
    slipNo?:number;
    amount?:number;
    modeOfPayment?:string;
    transactionID?:number;
    chequeNumber?:number;
    receiverAccount?:number;
    paymentStatus?:"token"|"emi"|"cancelled"|"bounced"|"wasted";
    client?:number;
};

export interface ClientBody {
    _id:number;
    code:number;
    name:string;
    careTaker:string;
    role:"agent"|"client";
};
export interface PaymentBody {
    _id:string;
    slipNo:string;
    amount:number;
    modeOfPayment:string;
    transactionID:number;
    chequeNumber:number;
    receiverAccount:number;
    date:string;
    createdAt:string;
    paymentStatus:string;
};