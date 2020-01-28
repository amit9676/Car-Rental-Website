using System;
using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class UsersDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing first name")]
        [MaxLength(30, ErrorMessage = "First name must be maximum 30 chars")]
        public string firstName { get; set; }

        [Required(ErrorMessage = "Missing last name")]
        [MaxLength(30, ErrorMessage = "Last name must be maximum 30 chars")]
        public string lastName { get; set; }

        [Required(ErrorMessage = "Missing social number")]
        [MinLength(9, ErrorMessage = "Social number must be minimum 9 chars")]
        [MaxLength(9, ErrorMessage = "Social number must be maximum 9 chars")]
        public string socialNumber { get; set; }

        [Required(ErrorMessage = "Missing user name")]
        [MaxLength(30, ErrorMessage = "User name must be maximum 30 chars")]
        public string userName { get; set; }

        public DateTime? dateOfBirth { get; set; }

        [Required(ErrorMessage = "Missing gender")]
        public UserGenderDTO gender { get; set; }

        [Required(ErrorMessage = "Missing email")]
        [MaxLength(100, ErrorMessage = "Email must be maximum 100 chars")]
        public string email { get; set; }

        [Required(ErrorMessage = "Missing password")]
        [MaxLength(100, ErrorMessage = "Password must be maximum 100 chars")]
        public string password { get; set; }
        
        [MaxLength(100, ErrorMessage = "Image must be maximum 100 chars")]
        public string image { get; set; }

        [Required(ErrorMessage = "Missing rank")]
        public UserRankDTO rank { get; set; }
    }
}
