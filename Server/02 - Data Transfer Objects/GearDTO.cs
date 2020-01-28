using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class GearDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing gear")]
        [MaxLength(10, ErrorMessage = "Gear must be maximum 10 chars")]
        public string gear { get; set; }
    }
}
