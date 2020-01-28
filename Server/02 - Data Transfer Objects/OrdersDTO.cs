using System;
using System.ComponentModel.DataAnnotations;

namespace Car_Rent
{
    public class OrdersDTO
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Missing start date")]
        public DateTime startDate { get; set; }

        [Required(ErrorMessage = "Missing end date")]
        public DateTime endDate { get; set; }

        public DateTime? actualEndDate { get; set; }

        [Required(ErrorMessage = "Missing ordered car")]
        public CarsDTO orderedCar { get; set; }

        [Required(ErrorMessage = "Missing ordering user")]
        public UsersDTO orderingUser { get; set; }
    }
}
