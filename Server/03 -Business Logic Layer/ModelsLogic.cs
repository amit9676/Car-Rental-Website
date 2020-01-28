using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Car_Rent
{
    public class ModelsLogic : BaseLogic
    {
        public List<ModelsDTO> GetAllModels()
        {
            return DB.Models.Select(p => new ModelsDTO
            {
                id = p.ModelID,
                manufactor = new ManufactorsDTO
                {
                    id = p.Manufactor.ManufactorID,
                    manufactor = p.Manufactor.Manufactor1
                },
                model = p.Model1
            }).ToList();
        }

        public ModelsDTO AddModel(ModelsDTO givenModel)
        {
            Model modelToAdd = new Model
            {
                ManufactorID = givenModel.manufactor.id,
                Model1 = givenModel.model
            };
            DB.Models.Add(modelToAdd);
            DB.SaveChanges();
            givenModel.id = modelToAdd.ModelID;
            return givenModel;
        }

        public ModelsDTO UpdateModel(ModelsDTO givenModel)
        {
            Model modelToUpdate = DB.Models.Where(p => p.ModelID == givenModel.id).SingleOrDefault();

            if (modelToUpdate == null)
            {
                return null;
            }
            modelToUpdate.Model1 = givenModel.model;
            modelToUpdate.ManufactorID = givenModel.manufactor.id;

            DB.SaveChanges();
            return givenModel;
        }

        public void DeleteModel(int id)
        {
            Model modelToDelete = DB.Models.Where(p => p.ModelID == id).SingleOrDefault();

            if (modelToDelete != null)
            {
                List<Car> modelsCars = DB.Cars.Where(p => p.ModelID == id).ToList();
                if (modelsCars != null)
                {
                    foreach (Car item in modelsCars)
                    {
                        if (item.Picture != null)
                            File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + item.Picture));
                    }

                    List<Order> modelsOrders = DB.Orders.Where(p => p.Car.ModelID == id).ToList();
                    if (modelsOrders != null)
                        DB.Orders.RemoveRange(modelsOrders);

                    DB.Cars.RemoveRange(modelsCars);

                }

                DB.Models.Remove(modelToDelete);
                DB.SaveChanges();
            }
        }
    }
}
