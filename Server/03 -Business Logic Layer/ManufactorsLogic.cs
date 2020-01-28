using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Car_Rent
{
    public class ManufactorsLogic : BaseLogic
    {
        
        public List<ManufactorsDTO> GetAllManufactors()
        {
            return DB.Manufactors.Select(p => new ManufactorsDTO
            {
                id = p.ManufactorID,
                manufactor = p.Manufactor1
            }).ToList();
        }

        public ManufactorsDTO AddManufactor(ManufactorsDTO givenManufactor)
        {
            Manufactor manufactorToAdd = new Manufactor { Manufactor1 = givenManufactor.manufactor };
            DB.Manufactors.Add(manufactorToAdd);
            DB.SaveChanges();
            givenManufactor.id = manufactorToAdd.ManufactorID;
            return givenManufactor;
        }

        public ManufactorsDTO UpdateManufactor(ManufactorsDTO givenManufactor)
        {
            Manufactor manufactorToUpdate = DB.Manufactors.Where(p => p.ManufactorID == givenManufactor.id).SingleOrDefault();

            if(manufactorToUpdate == null)
            {
                return null;
            }
            manufactorToUpdate.Manufactor1 = givenManufactor.manufactor;
            
            DB.SaveChanges();
            return givenManufactor;
        }

        public void DeleteManufactor(int id)
        {
            Manufactor manufactorToDelete = DB.Manufactors.Where(p => p.ManufactorID == id).SingleOrDefault();

            if (manufactorToDelete != null)
            {
                List<Model> manufactorsModel = DB.Models.Where(p => p.ManufactorID == id).ToList();
                List<Car> manufactorsCars = DB.Cars.Where(p => p.ManufactorID == id).ToList();
                if (manufactorsModel != null)
                    DB.Models.RemoveRange(manufactorsModel);
                if(manufactorsCars != null)
                {
                    foreach (Car item in manufactorsCars)
                    {
                        if (item.Picture != null)
                            File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + item.Picture));
                    }
                    

                    List<Order> manufactorsOrders = DB.Orders.Where(p => p.Car.ManufactorID == id).ToList();
                    if (manufactorsOrders != null)
                        DB.Orders.RemoveRange(manufactorsOrders);

                    DB.Cars.RemoveRange(manufactorsCars);
                    
                }

                DB.Manufactors.Remove(manufactorToDelete);
                DB.SaveChanges();
            }
        }
    }

}
