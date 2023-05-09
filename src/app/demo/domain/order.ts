import {OrderLine} from "./order-line";

export class Order {
idOrder!:number;
clientName!:string;
idClient!:number;
createdBy!:string;
deadLine!:Date;
idOperator!:number;
status!:string;
total!:number;
billCodeBill!:number;
orderLines!:OrderLine[];
}
