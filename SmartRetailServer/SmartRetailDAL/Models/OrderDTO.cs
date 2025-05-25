using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class OrderDTO
    {
        public int orderID { get; set; }
        public System.DateTime orderDate { get; set; }

        public decimal amount { get; set; }

        public OrderDTO(int id,DateTime date,decimal amount)
        {
            this.orderID = id;
            this.orderDate = date;
            this.amount = amount;
        }


    }
}
