using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class CartDTO
    {
        public int cartID { get; set; }
        public int productQuantity { get; set; }
        public System.DateTime dateAdded { get; set; }
        public int productID { get; set; }
        public int customerID { get; set; }

        public int categoryID { get; set; }

        public CartDTO(int cartID, int productQuantity, DateTime dateAdded, int productID, int customerID,int categoryID)
        {
            this.cartID = cartID;
            this.productQuantity = productQuantity;
            this.dateAdded = dateAdded;
            this.productID = productID;
            this.customerID = customerID;
            this.categoryID = categoryID;
        }
    }
}
