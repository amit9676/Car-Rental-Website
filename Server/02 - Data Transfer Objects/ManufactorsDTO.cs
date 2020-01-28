using System.ComponentModel.DataAnnotations;
namespace Car_Rent
{
    public class ManufactorsDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing manufactor")]
        [MaxLength(20, ErrorMessage = "Manufactor must be maximum 20 chars")]
        public string manufactor { get; set; }
    }
}
