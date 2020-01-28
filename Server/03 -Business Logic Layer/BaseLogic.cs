using System;

namespace Car_Rent
{
    public class BaseLogic: IDisposable
    {
        protected CarRentServiceEntities1 DB = new CarRentServiceEntities1();

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
