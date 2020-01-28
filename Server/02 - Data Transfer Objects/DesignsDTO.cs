using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class DesignsDTO
    {
        public int id { get; set; }
        [Required(ErrorMessage = "Missing design")]
        [MaxLength(15, ErrorMessage = "Design must be maximum 15 chars")]
        public string design { get; set; }
    }
}
