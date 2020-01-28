using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class MessagesDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing full name")]
        [MaxLength(50, ErrorMessage = "Full name must be maximum 50 chars")]
        public string fullName { get; set; }

        [Required(ErrorMessage = "Missing email")]
        [MaxLength(50, ErrorMessage = "Email must be maximum 50 chars")]
        public string email { get; set; }

        [Required(ErrorMessage = "Missing content")]
        [MaxLength(500, ErrorMessage = "Content must be maximum 500 chars")]
        public string content { get; set; }
    }
}
