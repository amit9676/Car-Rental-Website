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
    public class UsersController : ApiController
    {
        UsersLogic logic = new UsersLogic();

        [HttpGet]
        [Route("api/users")]
        public HttpResponseMessage GetAllUsers()
        {
            try
            {
                using (logic)
                {
                    List<UsersDTO> allUsers = logic.GetAllUsers();
                    return Request.CreateResponse(HttpStatusCode.OK, allUsers);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/users")]
        public HttpResponseMessage AddUser(UsersDTO user)
        {
            try
            {
                using (logic)
                {
                    UsersDTO addedUser = logic.AddUser(user);
                    return Request.CreateResponse(HttpStatusCode.Created, addedUser);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/users/{id}")]
        public HttpResponseMessage UpdateUser(int id, UsersDTO user)
        {
            try
            {
                using (logic)
                {
                    user.id = id;

                    UsersDTO updatedUser = logic.UpdateUser(user);

                    if (updatedUser == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedUser);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPatch]
        [Route("api/users/{id}")]
        public HttpResponseMessage EditPassword(int id, UsersDTO user)
        {
            try
            {
                using (logic)
                {
                    user.id = id;

                    UsersDTO updatedUser = logic.EditPassword(user);

                    if (updatedUser == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedUser);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpDelete]
        [Route("api/users/{id}")]
        public HttpResponseMessage DeleteUser(int id)
        {
            try
            {
                using (logic)
                {
                    logic.DeleteUser(id);
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
        [Route("api/usersImage/{id}")]
        public HttpResponseMessage EditUserImage(int id)
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

                    UsersDTO updatedUser = logic.EditPicture(id, fileName);

                    if (updatedUser == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedUser);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPut]
        [Route("api/usersImage/{id}")]
        public HttpResponseMessage DeleteUserImage(int id)
        {
            try
            {
                using (logic)
                {
                    UsersDTO updatedUser = logic.EditPicture(id, null);

                    if (updatedUser == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedUser);
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
