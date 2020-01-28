using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Car_Rent
{
    public class CarsLogic : BaseLogic
    {
        public List<CarsDTO> GetAllCars()
        {
            return DB.Cars.Select(p => new CarsDTO
            {
                id = p.CarID,
                carNum = p.CarNumber,
                manufactor = new ManufactorsDTO { id = p.Manufactor.ManufactorID, manufactor = p.Manufactor.Manufactor1 },
                model = new ModelsDTO { id = p.Model.ModelID, manufactor = new ManufactorsDTO { id = p.Manufactor.ManufactorID, manufactor = p.Manufactor.Manufactor1 }, model = p.Model.Model1},
                design = new DesignsDTO {  id = p.Design.DesignID, design = p.Design.CarDesign},
                gear = new GearDTO {  id = p.Gear.GearID, gear = p.Gear.GearType},
                kilometrage = p.Kilometrage,
                year = p.Year,
                functional = p.FunctionalForRent,
                dailyRent = p.RentDayPrice,
                lateRent = p.LateDayRentPrice,
                picture = p.Picture,
                branch = new BranchesDTO { id = p.Branch.BranchID/*, name = p.Branch.BranchName*/, address = p.Branch.Address, city = p.Branch.City, latitude = (double)p.Branch.Latitude, longitude = (double)p.Branch.Longitude}

            }).ToList();
        }

        public CarsDTO AddCar(CarsDTO givenCar)
        {
            Car carToAdd = new Car
            {
                CarNumber = givenCar.carNum,
                ManufactorID = givenCar.manufactor.id,
                ModelID = givenCar.model.id,
                DesignID = givenCar.design.id,
                Year = givenCar.year,
                RentDayPrice = givenCar.dailyRent,
                LateDayRentPrice = givenCar.lateRent,
                GearID = givenCar.gear.id,
                BranchID = givenCar.branch.id,
                FunctionalForRent = givenCar.functional,
                Kilometrage = givenCar.kilometrage,
                Picture = givenCar.picture
            };

            DB.Cars.Add(carToAdd);
            DB.SaveChanges();
            givenCar.id = carToAdd.CarID;
            return givenCar;
        }

        public CarsDTO UpdateCar(CarsDTO givenCar)
        {
            Car carToUpdate = DB.Cars.Where(p => p.CarID == givenCar.id).SingleOrDefault();

            if (carToUpdate == null)
            {
                return null;
            }
            carToUpdate.CarNumber = givenCar.carNum;
            carToUpdate.ManufactorID = givenCar.manufactor.id;
            carToUpdate.ModelID = givenCar.model.id;
            carToUpdate.Year = givenCar.year;
            carToUpdate.DesignID = givenCar.design.id;
            carToUpdate.GearID = givenCar.gear.id;
            carToUpdate.RentDayPrice = givenCar.dailyRent;
            carToUpdate.LateDayRentPrice = givenCar.lateRent;
            carToUpdate.BranchID = givenCar.branch.id;
            carToUpdate.Picture = givenCar.picture;
            carToUpdate.Kilometrage = givenCar.kilometrage;
            carToUpdate.FunctionalForRent = givenCar.functional;


            DB.SaveChanges();
            return givenCar;
        }

        public void DeleteCar(int id)
        {
            Car carToDelete = DB.Cars.Where(p => p.CarID == id).SingleOrDefault();
            if (carToDelete != null)
            {
                List<Order> carsOrders = DB.Orders.Where(p => p.OrderedCarID == id).ToList();
                if (carsOrders != null)
                    DB.Orders.RemoveRange(carsOrders);

                DB.Cars.Remove(carToDelete);
                DB.SaveChanges();
            }
        }

        public CarsDTO EditPicture(int id, string imageCode)
        {
            Car carToUpdate = DB.Cars.Where(p => p.CarID == id).SingleOrDefault();

            if (carToUpdate == null)
            {
                return null;
            }
            if (carToUpdate.Picture != imageCode && carToUpdate.Picture != null)
            {

                File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + carToUpdate.Picture));
            }


            carToUpdate.Picture = imageCode;

            DB.SaveChanges();
            CarsDTO carToReturn = new CarsDTO
            {
                id = carToUpdate.CarID,
                carNum = carToUpdate.CarNumber,
                manufactor = new ManufactorsDTO { id = carToUpdate.Manufactor.ManufactorID, manufactor = carToUpdate.Manufactor.Manufactor1 },
                model = new ModelsDTO { id = carToUpdate.Model.ModelID, manufactor = new ManufactorsDTO { id = carToUpdate.Manufactor.ManufactorID, manufactor = carToUpdate.Manufactor.Manufactor1 }, model = carToUpdate.Model.Model1 },
                design = new DesignsDTO { id = carToUpdate.Design.DesignID, design = carToUpdate.Design.CarDesign },
                gear = new GearDTO { id = carToUpdate.Gear.GearID, gear = carToUpdate.Gear.GearType },
                kilometrage = carToUpdate.Kilometrage,
                year = carToUpdate.Year,
                functional = carToUpdate.FunctionalForRent,
                dailyRent = carToUpdate.RentDayPrice,
                lateRent = carToUpdate.LateDayRentPrice,
                picture = carToUpdate.Picture,
                branch = new BranchesDTO { id = carToUpdate.Branch.BranchID, address = carToUpdate.Branch.Address, city = carToUpdate.Branch.City}

            };
            return carToReturn;
        }
    }
}
