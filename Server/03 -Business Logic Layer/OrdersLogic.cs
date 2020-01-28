using System.Collections.Generic;
using System.Linq;

namespace Car_Rent
{
    public class OrdersLogic : BaseLogic
    {
        public List<OrdersDTO> GetAllOrders()
        {
            return DB.Orders.Select(p => new OrdersDTO
            {
                id = p.OrderID,
                startDate = p.OrderStartDate,
                endDate = p.OrderEndDate,
                actualEndDate = p.OrderActualEndDate.Value,
                orderedCar = new CarsDTO
                {
                    id = p.Car.CarID,
                    carNum = p.Car.CarNumber,
                    manufactor = new ManufactorsDTO { id = p.Car.Manufactor.ManufactorID, manufactor = p.Car.Manufactor.Manufactor1},
                    model = new ModelsDTO { id = p.Car.Model.ModelID, model = p.Car.Model.Model1},
                    branch = new BranchesDTO { id = p.Car.Branch.BranchID, address = p.Car.Branch.Address, city = p.Car.Branch.City},
                    dailyRent = p.Car.RentDayPrice,
                    lateRent = p.Car.LateDayRentPrice
                },
                orderingUser = new UsersDTO { id = p.User.UserID, userName = p.User.UserName}
            }).ToList();
        }

        public OrdersDTO AddOrder(OrdersDTO givenOrder)
        {
            Order orderToAdd = new Order {
                OrderStartDate = givenOrder.startDate,
                OrderEndDate = givenOrder.endDate,
                OrderActualEndDate = null,
                OrderedCarID = givenOrder.orderedCar.id,
                OrderingUserID = givenOrder.orderingUser.id
            };
            DB.Orders.Add(orderToAdd);
            DB.SaveChanges();
            givenOrder.id = orderToAdd.OrderID;
            return givenOrder;
        }

        public OrdersDTO UpdateOrder(OrdersDTO order)
        {
            Order orderToUpdate = DB.Orders.Where(p => p.OrderID == order.id).SingleOrDefault();

            if (orderToUpdate == null)
            {
                return null;
            }

            orderToUpdate.OrderEndDate = order.endDate;
            orderToUpdate.OrderActualEndDate = order.actualEndDate;

            DB.SaveChanges();
            return order;
        }

        public void DeleteOrder(int id)
        {
            Order OrderToDelete = DB.Orders.Where(p => p.OrderID == id).SingleOrDefault();

            if (OrderToDelete != null)
            {
                DB.Orders.Remove(OrderToDelete);
                DB.SaveChanges();
            }
        }

    }
}
