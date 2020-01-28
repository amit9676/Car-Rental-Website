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
    public class ManufactorsController : ApiController
    {
        ManufactorsLogic logic = new ManufactorsLogic();

        [HttpGet]
        [Route("api/manufactors")]
        public HttpResponseMessage GetAllManufactors()
        {
            try
            {
                using (logic)
                {
                    List<ManufactorsDTO> allManufactors = logic.GetAllManufactors();
                    return Request.CreateResponse(HttpStatusCode.OK, allManufactors);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/manufactors")]
        public HttpResponseMessage AddManufactors(ManufactorsDTO givenManufactor)
        {
            try
            {
                using (logic)
                {
                    ManufactorsDTO addedManufactor = logic.AddManufactor(givenManufactor);
                    return Request.CreateResponse(HttpStatusCode.Created, addedManufactor);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/manufactors/{id}")]
        public HttpResponseMessage UpdateManufactors(ManufactorsDTO givenManufactor, int id)
        {
            try
            {
                using (logic)
                {
                    givenManufactor.id = id;
                    ManufactorsDTO updatedManufactor = logic.UpdateManufactor(givenManufactor);
                    if (updatedManufactor == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, updatedManufactor);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpDelete]
        [Route("api/manufactors/{id}")]
        public HttpResponseMessage DeleteManufactors(int id)
        {
            try
            {
                using (logic)
                {
                    logic.DeleteManufactor(id);
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }



    }
}
