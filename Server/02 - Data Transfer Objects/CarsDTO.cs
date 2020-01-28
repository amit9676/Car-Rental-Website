using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class CarsDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing car number")]
        [MinLength(7, ErrorMessage = "Car number must be minimum 7 chars")]
        [MaxLength(8, ErrorMessage = "Car number must be maximum 8 chars")]
        public string carNum { get; set; }

        [Required(ErrorMessage = "Missing manufactor")]
        public ManufactorsDTO manufactor { get; set; }

        [Required(ErrorMessage = "Missing model")]
        public ModelsDTO model { get; set; }

        [Required(ErrorMessage = "Missing design")]
        public DesignsDTO design { get; set; }

        [Required(ErrorMessage = "Missing gear")]
        public GearDTO gear { get; set; }

        [Required(ErrorMessage = "Missing kilometrage")]
        public double kilometrage { get; set; }

        [Required(ErrorMessage = "Missing year")]
        public int year { get; set; }

        [Required(ErrorMessage = "Missing functinality")]
        public bool functional { get; set; }

        [Required(ErrorMessage = "Missing dailyRent")]
        public decimal dailyRent { get; set; }

        [Required(ErrorMessage = "Missing lateRent")]
        public decimal lateRent { get; set; }

        [Required(ErrorMessage = "Missing picture")]
        public string picture { get; set; }

        [Required(ErrorMessage = "Missing branch")]
        public BranchesDTO branch { get; set; }
    }
}
