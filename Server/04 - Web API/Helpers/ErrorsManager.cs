using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Car_Rent
{
    public class ErrorsManager
    {
        public static string GetInnerMeesage(Exception ex)
        {
#if DEBUG
            if (ex.InnerException == null)
                return ex.Message;

            return GetInnerMeesage(ex.InnerException);
#else
            return "Some error occurred, please try again.";
#endif
        }

        /*public static List<string> GetErrors(ModelStateDictionary modelState)
        {
            // אוסף של כל הודעות השגיאה
            List<string> errors = new List<string>();

            //ריצה על כל המאפיינים של המודל שנכשלו
            foreach (var property in modelState.Values)
            {
                // ריצה על כל השגיאות של כל מאפיין
                foreach (var err in property.Errors)
                {
                    errors.Add(err.ErrorMessage);
                }

            }


            return errors;
        }*/
    }
}