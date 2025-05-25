using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class ReviewDTO
    {
        public int reviewID { get; set; }
        public int rating { get; set; }
        public string comment { get; set; }
        public System.DateTime reviewDate { get; set; }
        public int productID { get; set; }
        public string customername { get; set; }

        public ReviewDTO(int reviewID,int rating,string comment,DateTime reviewDate,int productID,string customername)
        {
            this.reviewID = reviewID;
            this.rating = rating;
            this.comment = comment;
            this.reviewDate = reviewDate;
            this.productID = productID;
            this.customername = customername;
        }




    }
}
