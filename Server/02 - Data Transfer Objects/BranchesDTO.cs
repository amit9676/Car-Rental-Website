using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class BranchesDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing name")]
        [MaxLength(30, ErrorMessage = "Name must be maximum 30 chars")]
        public string name { get; set; }

        [Required(ErrorMessage = "Missing address")]
        [MaxLength(50, ErrorMessage = "Address must be maximum 30 chars")]
        public string address { get; set; }

        [Required(ErrorMessage = "Missing city")]
        [MaxLength(30, ErrorMessage = "ciry must be maximum 30 chars")]
        public string city { get; set; }

        [Required(ErrorMessage = "Missing latitude")]
        public double latitude { get; set; }

        [Required(ErrorMessage = "Missing longitude")]
        public double longitude { get; set; }
    }
}
