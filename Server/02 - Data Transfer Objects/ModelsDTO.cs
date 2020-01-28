using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class ModelsDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing manufactor")]
        public ManufactorsDTO manufactor { get; set; }

        [Required(ErrorMessage = "Missing model")]
        [MaxLength(20, ErrorMessage = "Model must be maximum 20 chars")]
        public string model { get; set; }
    }
}
