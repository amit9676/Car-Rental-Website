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
    public class OrdersController : ApiController
    {
        OrdersLogic logic = new OrdersLogic();

        [HttpGet]
        [Route("api/orders")]
        public HttpResponseMessage GetAllOrders()
        {
            try
            {
                using (logic)
                {
                    List<OrdersDTO> orders = logic.GetAllOrders();
                    return Request.CreateResponse(HttpStatusCode.OK, orders);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpPost]
        [Route("api/orders")]
        public HttpResponseMessage AddOrder(OrdersDTO givenOrder)
        {
            try
            {
                using (logic)
                {
                    OrdersDTO addedOrder = logic.AddOrder(givenOrder);
                    return Request.CreateResponse(HttpStatusCode.Created, addedOrder);
                }
            }
            catch (Exception ex)
            {
                using (logic)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
                }
            }
        }

        [HttpPut]
        [Route("api/orders/{id}")]
        public HttpResponseMessage UpdateUser(int id, OrdersDTO order)
        {
            try
            {
                using (logic)
                {
                    order.id = id;

                    OrdersDTO updatedOrder = logic.UpdateOrder(order);

                    if (updatedOrder == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);

                    return Request.CreateResponse(HttpStatusCode.OK, updatedOrder);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError, ErrorsManager.GetInnerMeesage(ex));
            }
        }

        [HttpDelete]
        [Route("api/orders/{id}")]
        public HttpResponseMessage DeleteOrder(int id)
        {
            try
            {
                using (logic)
                {
                    logic.DeleteOrder(id);
                    return Request.CreateResponse(HttpStatusCode.NoContent);
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
