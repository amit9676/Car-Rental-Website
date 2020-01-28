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
    public class ModelsController : ApiController
    {
        ModelsLogic logic = new ModelsLogic();

        [HttpGet]
        [Route("api/models")]
        public HttpResponseMessage GetAllManufactors()
        {
            try
            {
                using (logic)
                {
                    List<ModelsDTO> allModels = logic.GetAllModels();
                    return Request.CreateResponse(HttpStatusCode.OK, allModels);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/models")]
        public HttpResponseMessage AddModel(ModelsDTO givenModel)
        {
            try
            {
                using (logic)
                {
                    ModelsDTO addedModel = logic.AddModel(givenModel);
                    return Request.CreateResponse(HttpStatusCode.Created, addedModel);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/models/{id}")]
        public HttpResponseMessage UpdateModels(ModelsDTO givenModel, int id)
        {
            try
            {
                using (logic)
                {
                    givenModel.id = id;
                    ModelsDTO updatedModel = logic.UpdateModel(givenModel);
                    if (updatedModel == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, updatedModel);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpDelete]
        [Route("api/models/{id}")]
        public HttpResponseMessage DeleteModels(int id)
        {
            try
            {
                using (logic)
                {
                    logic.DeleteModel(id);
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
