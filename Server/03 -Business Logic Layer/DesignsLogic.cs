using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Car_Rent
{
    public class DesignsLogic : BaseLogic
    {
        public List<DesignsDTO> GetAllDesigns()
        {
            return DB.Designs.Select(p => new DesignsDTO
            {
                id = p.DesignID,
                design = p.CarDesign
            }).ToList();
        }

        public DesignsDTO AddDesign(DesignsDTO givenDesign)
        {
            Design designToAdd = new Design { CarDesign = givenDesign.design };
            DB.Designs.Add(designToAdd);
            DB.SaveChanges();
            givenDesign.id = designToAdd.DesignID;
            return givenDesign;
        }

        public DesignsDTO UpdateDesign(DesignsDTO givenDesign)
        {
            Design designToUpdate = DB.Designs.Where(p => p.DesignID == givenDesign.id).SingleOrDefault();

            if(designToUpdate == null)
            {
                return null;
            }
            designToUpdate.CarDesign = givenDesign.design;
            DB.SaveChanges();
            return givenDesign;
        }

        public void DeleteDesign(int id)
        {
            Design designToDelete = DB.Designs.Where(p => p.DesignID == id).SingleOrDefault();

            if(designToDelete != null)
            {
                List<Car> designsCars = DB.Cars.Where(p => p.DesignID == id).ToList();
                if (designsCars != null)
                {
                    foreach (Car item in designsCars)
                    {
                        if (item.Picture != null)
                            File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + item.Picture));
                    }

                    List<Order> designsOrders = DB.Orders.Where(p => p.Car.DesignID == id).ToList();
                    if (designsOrders != null)
                        DB.Orders.RemoveRange(designsOrders);

                    DB.Cars.RemoveRange(designsCars);

                }

                DB.Designs.Remove(designToDelete);
                DB.SaveChanges();
            }
        }
    }
}
