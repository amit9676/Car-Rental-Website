using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Car_Rent
{
    [EnableCors("*", "*", "*")]
    public class BranchesController : ApiController
    {
        BranchesLogic logic = new BranchesLogic();

        [HttpGet]
        [Route("api/branches")]
        public HttpResponseMessage GetAllBranches()
        {
            try
            {
                using (logic)
                {
                    List<BranchesDTO> branches = logic.getAllBranches();
                    return Request.CreateResponse(HttpStatusCode.OK, branches);
                }
                
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }
    }
}
