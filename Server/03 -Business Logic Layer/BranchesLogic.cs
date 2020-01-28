using System.Collections.Generic;
using System.Linq;

namespace Car_Rent
{
    public class BranchesLogic : BaseLogic
    {
        public List<BranchesDTO> getAllBranches()
        {
            return DB.Branches.Select(p => new BranchesDTO
            {
                id = p.BranchID,
                name = p.BranchName,
                address = p.Address,
                city = p.City,
                latitude = (double)p.Latitude,
                longitude = (double)p.Longitude
            }).ToList();
        }
    }
}
