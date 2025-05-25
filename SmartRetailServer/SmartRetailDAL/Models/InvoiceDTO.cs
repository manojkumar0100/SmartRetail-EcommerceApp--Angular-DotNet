using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class InvoiceDTO
    {
        public int invoiceID { get; set; }//

        public System.DateTime invoiceDate { get; set; }//

        public int orderID { get; set; }//

        public decimal totalAmount { get;set;}//
        public decimal taxAmount { get; set; }//
        public decimal shippingCost { get; set; }//


        public string firstName { get; set; }//

        public string lastName { get; set; }//

        public string email { get; set; }//
        public string phonenumber { get; set; }//



        public string address { get; set; }//

        public List<OrderItemDTO> orderitems { get; set; }






    }
}
