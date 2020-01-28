using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Car_Rent
{
    [EnableCors("*", "*", "*")]
    public class CarsController : ApiController
    {
        CarsLogic logic = new CarsLogic();

        [HttpGet]
        [Route("api/cars")]
        public HttpResponseMessage GetAllCars()
        {
            try
            {
                using (logic)
                {
                    List<CarsDTO> cars = logic.GetAllCars();
                    return Request.CreateResponse(HttpStatusCode.OK, cars);
                }
                
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/cars")]
        public HttpResponseMessage AddCar(CarsDTO givenCar)
        {
            try
            {
                using (logic)
                {
                    CarsDTO addedCar = logic.AddCar(givenCar);
                    return Request.CreateResponse(HttpStatusCode.Created, addedCar);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/cars/{id}")]
        public HttpResponseMessage UpdateCars(CarsDTO givenCar, int id)
        {
            try
            {
                using (logic)
                {
                    givenCar.id = id;
                    CarsDTO updatedCar = logic.UpdateCar(givenCar);
                    if (updatedCar == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, updatedCar);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpDelete]
        [Route("api/cars/{id}")]
        public HttpResponseMessage DeleteCar(int id)
        {
            try
            {
                using (logic)
                {
                    logic.DeleteCar(id);
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPatch]
        [Route("api/carsImage/{id}")]
        public HttpResponseMessage EditCarImage(int id)
        {
            try
            {
                using (logic)
                {
                    string fileName = Guid.NewGuid() + ".jpg";
                    string fullPath = HttpContext.Current.Server.MapPath("~/Uploads/" + fileName);


                    using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                    {
                        HttpContext.Current.Request.InputStream.CopyTo(stream); // This will save the file
                    }

                    CarsDTO updatedCar = logic.EditPicture(id, fileName);

                    if (updatedCar == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedCar);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/carsImage/{id}")]
        public HttpResponseMessage DeleteCarImage(int id)
        {
            try
            {
                using (logic)
                {
                    CarsDTO updatedCar = logic.EditPicture(id, null);

                    if (updatedCar == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedCar);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }
    }
}
