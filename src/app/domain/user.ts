import {Company} from "./company";

export class User {
    id!:string;
    firstName!:String;
    email!:String;
    lastName!:String;
    phoneNumber!:number;
    birthDate!:Date;
    role!:any;
    password!:String;
    companyDto!:Company
    adress!:String
    image!:String
    idCompany!:any
}
