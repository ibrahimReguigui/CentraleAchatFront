import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Customer, Representative} from "../../../domain/customer";
import {Product} from "../../../domain/product";
import {Order} from "../../../domain/order";
import {OrderLine} from "../../../domain/order-line";
import {Bill} from "../../../domain/bill";
import {AppConfig} from "../../../domain/appconfig";
import {Subscription} from "rxjs";
import {CustomerService} from "../../../service/customerservice";
import {ProductService} from "../../../service/productservice";
import {AppBreadcrumbService} from "../../../../app.breadcrumb.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {OrderService} from "../../../service/order.service";
import { jsPDF } from "jspdf";
//import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {AppMainComponent} from "../../../../app.main.component";
import {NotificationService} from "../../../service/notification.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import qrcode from 'qrcode';

@Component({
    selector: 'app-order-client',
    providers: [MessageService, ConfirmationService],
    templateUrl: './order-client.component.html',
    styleUrls: ['./order-client.component.scss']
})
export class OrderClientComponent implements OnInit{

    order!:Order

    //@ts-ignore
    order11: Order = {};
    //@ts-ignore
    orderLine1:OrderLine={};

    order1:Order[];

    order2:Order[];

    order3:Order[];

    selectedOrder1:Order[];

    selectedOrder:Order[];

    orderLine: OrderLine[];

    pieData: any;

    pieOptions: any;

    bill: Bill[];

    statuses: any[];

    products: Product[];

    rowGroupMetadata: any;

    expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;


    loading:boolean = true;

    config: AppConfig;

    subscription: Subscription;





    constructor(private notificationService: NotificationService,private orderService: OrderService, public breadcrumbService: AppBreadcrumbService, private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef) {
        this.breadcrumbService.setItems([
            {label: 'Client'}
        ]);
    }
    ngOnInit(): void {

        this.orderService.getOrders().subscribe(data =>{
            // @ts-ignore
            this.order1 =data
            this.loading = false;


        })
        this.statuses = [
            {label: 'COMPLETED', value: 'COMPLETED'},
            {label: 'PENDING', value: 'PENDING'},
            {label: 'RETURNED', value: 'RETURNED'},
            {label: 'CANCELED', value: 'CANCELED'},

        ];
    }

    expandAll() {
        if(!this.isExpanded){
            this.order1.forEach(order1 => this.expandedRows[order1.idOrder] = true);

        } else {
            this.expandedRows={};
        }
        this.isExpanded = !this.isExpanded;
    }

    confirmOrder(orderId: number) {
        this.orderService.confirmOrder(orderId).subscribe(() => {
            console.log(`Order ${orderId} confirmed`);
            // refresh orders
            this.orderService.getOrders().subscribe((orders: Order[]) => {
                this.order1 = orders;
            });
        });
    }

    denyOrder(orderId: number) {
        this.orderService.denyOrder(orderId).subscribe(() => {
            console.log(`Order ${orderId} denied`);
            // refresh orders
            this.orderService.getOrders().subscribe((orders: Order[]) => {
                this.order1 = orders;
            });
        });
    }
    retournerOrder(orderId: number) {
        this.orderService.retournerOrder(orderId).subscribe(() => {
            console.log(`Order ${orderId} denied`);
            // refresh orders
            this.orderService.getOrders().subscribe((orders: Order[]) => {
                this.order1 = orders;
            });
        });
    }
    generatePdf(idOrder: number) {
        // Fetch the order data from your API
        this.orderService.generatePdf(idOrder).subscribe(bill => {
            const qrCodeData = JSON.stringify(bill);
            const qrCodeImage = qrcode.toDataURL(qrCodeData);
            const docDefinition = {
                content: [
                    {
                        text: 'Bill',
                        style: 'header'
                    },
                    {
                        style: 'tableExample',
                        table: {
                            headerRows: 1,
                            widths: ['*', '*'],
                            body: [
                                [ 'Code Bill', bill.codeBill],
                                ['HTVA',bill.htva],
                                ['TVA', bill.tva],
                                ['Bill Status', bill.billStatus],
                                ['Bill Type', bill.billType],
                                ['Operator', bill.createdBy],
                                ['Total TTC', bill.totalTTC],
                                [{
                                    text: 'QR Code',
                                    alignment: 'center',
                                    colSpan: 2,
                                    margin: [0, 10],
                                    fontSize: 16
                                },
                                    {
                                        image: qrCodeImage,
                                        width: 1000,
                                        alignment: 'center'
                                    }]

                            ]
                        }
                    },
                 //   { stack: [{ image: 'assets/layout/images/logo.svg', width: 100, alignment: 'center' }] }
                ],
                styles: {
                    header: {
                        fontSize: 40,
                        bold: true,
                        margin: [0, 0, 0, 10],
                        alignment: 'center'
                    },
                    subheader: {
                        fontSize: 40,
                        bold: true,
                        margin: [0, 10, 0, 5],
                        alignment: 'center'
                    }
                }
            };
            console.log(qrCodeData)
            console.log(qrCodeImage)
            // Generate the PDF and open it in a new tab
            pdfMake.createPdf(docDefinition).open();
        });
    }


/*
    generatePdf(idOrder: number) {
        this.orderService.generatePdf(idOrder).subscribe((bill) => {

            const doc = new jsPDF();
            const tableData = [
                ['Code Bill', bill.codeBill],
                ['HTVA', bill.htva],
                ['TVA', bill.tva],
                ['Bill Status', bill.billStatus],
                ['Bill Type', bill.billType],
                ['ID Client', bill.idClient],
                ['ID Company', bill.idCompany],
                ['ID Supplier', bill.idSupplier],
                ['Total TTC', bill.totalttc]
            ];

            doc.autoTable({
                head: [['Facture']],
                body: tableData,
            });
            doc.save(`facture_${bill.codeBill}.pdf`);
        });
    }*/

}
