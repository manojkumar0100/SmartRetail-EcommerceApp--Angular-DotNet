using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class WishlistDTO
    {
        public int wishlistID { get; set; }
        public System.DateTime dateAdded { get; set; }
        public int productID { get; set; }
        public int customerID { get; set; }

        public WishlistDTO(int wishlistID, DateTime dateAdded, int productID, int customerID)
        {
            this.wishlistID = wishlistID;
            this.dateAdded = dateAdded;
            this.productID = productID;
            this.customerID = customerID;
        }
    }
}
