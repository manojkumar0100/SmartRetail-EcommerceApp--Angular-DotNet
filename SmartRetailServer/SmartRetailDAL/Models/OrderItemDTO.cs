using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class OrderItemDTO
    {
        public string name { get; set; }

        public decimal price { get; set; }
        public int quantity { get; set; }

        public OrderItemDTO(string name, decimal price, int quantity)
        {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }   
    }
}
