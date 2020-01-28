using System;
using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class UserRankDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing rank")]
        [MaxLength(10, ErrorMessage = "Rank must be maximum 10 chars")]
        public string rank { get; set; }
    }
}
