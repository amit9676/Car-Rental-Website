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
    public class MessagesController : ApiController
    {
        MessagesLogic logic = new MessagesLogic();

        [HttpPost]
        [Route("api/messages")]
        public HttpResponseMessage AddMessage(MessagesDTO givenMessage)
        {
            try
            {
                using (logic)
                {
                    MessagesDTO addedMessage = logic.AddMessage(givenMessage);
                    return Request.CreateResponse(HttpStatusCode.Created, addedMessage);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }
    }
}
