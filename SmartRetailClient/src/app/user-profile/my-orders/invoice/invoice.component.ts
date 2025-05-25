import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { UserprofileService } from '../../services/userprofile.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

    orderID !:number;
    invoice !: Invoice; 

    constructor(private routedata : ActivatedRoute,private userprofileservice : UserprofileService) { }

    //orderID = this.routedata.params.subscribe((data)=>{this.orderID=data['id']});

    ngOnInit(): void {
        
        this.routedata.params.subscribe((params) => {
            this.orderID = +params['id']; // Use the '+' to convert the string to a number
            this.userprofileservice.getinvoice(this.orderID).subscribe((invoice) => {
              this.invoice = invoice;
              console.log(this.invoice)
            });
          });
        // this.routedata.params.subscribe((params)=>{
        //     this.orderid = params['id'];
        // })
        //this.orderid = this.routedata.snapshot.params['id'];



    }



    downloadInvoice() {
      const invoiceElement = document.getElementById('invoice');
      if (invoiceElement) {
        console.log(invoiceElement);
        html2canvas(invoiceElement).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = canvas.height * imgWidth / canvas.width; // Maintain aspect ratio
  
          let heightLeft = imgHeight;
          let position = 0;
  
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
  
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
  
          pdf.save('invoice.pdf');
          console.log(pdf);
        });
      }
    }
}