using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class UserGenderDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing gender")]
        [MaxLength(6, ErrorMessage = "Gender must be maximum 6 chars")]
        public string gender { get; set; }
    }
}
