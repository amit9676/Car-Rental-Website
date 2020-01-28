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
    public class DesignsController : ApiController
    {
        DesignsLogic logic = new DesignsLogic();

        [HttpGet]
        [Route("api/designs")]
        public HttpResponseMessage GetAllDesigns()
        {
            try
            {
                using (logic)
                {
                    List<DesignsDTO> allDesigns = logic.GetAllDesigns();
                    return Request.CreateResponse(HttpStatusCode.OK, allDesigns);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/designs")]
        public HttpResponseMessage AddDesign(DesignsDTO givenDesign)
        {
            try
            {
                using (logic)
                {
                    DesignsDTO addedDesign = logic.AddDesign(givenDesign);
                    return Request.CreateResponse(HttpStatusCode.Created, addedDesign);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/designs/{id}")]
        public HttpResponseMessage UpdateDesign(DesignsDTO givenDesign, int id)
        {
            try
            {
                using (logic)
                {
                    givenDesign.id = id;
                    DesignsDTO updatedDesign = logic.UpdateDesign(givenDesign);
                    if (updatedDesign == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, updatedDesign);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpDelete]
        [Route("api/designs/{id}")]
        public HttpResponseMessage DeleteDesign(int id)
        {
            try
            {
                using (logic)
                {
                    logic.DeleteDesign(id);
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
