using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SmartRetail_DAL.Models
{
    public class ProductDTO
    {
        public int productID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
        
        public int categoryID { get; set; }
        public string imageUrl { get; set; }

       




        public ProductDTO(int productID, string name, string description, decimal price, int quantity, string imageUrl, int categoryID)
        {
            this.productID = productID;
            this.name = name;
            this.description = description;
            this.price = price;
            this.quantity = quantity;
            this.imageUrl = imageUrl;
            this.categoryID = categoryID;
            
        }
    }
}
