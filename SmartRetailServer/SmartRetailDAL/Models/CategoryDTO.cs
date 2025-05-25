using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRetail_DAL.Models
{
    public class CategoryDTO
    {
        public int categoryID { get; set; }
        public string name { get; set; }

        public CategoryDTO(int categoryid, string name)
        {
            this.categoryID = categoryid;
            this.name = name;
        }


    }
}
