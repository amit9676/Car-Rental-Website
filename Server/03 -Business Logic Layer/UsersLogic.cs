using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace Car_Rent
{
    public class UsersLogic : BaseLogic
    {
        public List<UsersDTO> GetAllUsers()
        {
            var q = DB.Users.Select(p => new UsersDTO
            {
                id = p.UserID,
                firstName = p.FirstName,
                lastName = p.LastName,
                socialNumber = p.SocialNumber,
                userName = p.UserName,
                dateOfBirth = p.DateOfBirth.Value,
                password = p.Password,
                gender = new UserGenderDTO
                {
                    id = p.Gender.GenderID,
                    gender = p.Gender.Gender1
                },
                email = p.Email,
                image = p.Image,
                rank = new UserRankDTO { id = p.Rank.RankID, rank = p.Rank.Rank1}
            });

            return q.ToList();
        }

        public UsersDTO AddUser(UsersDTO user)
        {
            User userToAdd = new User
            {
                FirstName = user.firstName,
                LastName = user.lastName,
                SocialNumber = user.socialNumber,
                UserName = user.userName,
                DateOfBirth = user.dateOfBirth,
                GenderID = (byte)user.gender.id,
                Email = user.email,
                Image = user.image,
                RankID = user.rank.id,
                Password = FormsAuthentication.HashPasswordForStoringInConfigFile(user.password, "md5")
            };

            DB.Users.Add(userToAdd);
            DB.SaveChanges();
            user.id = userToAdd.UserID;
            return user;
        }

        public UsersDTO UpdateUser(UsersDTO user)
        {
            User userToUpdate = DB.Users.Where(p => p.UserID == user.id).SingleOrDefault();

            if(userToUpdate == null)
            {
                return null;
            }

            userToUpdate.UserID = user.id;
            userToUpdate.FirstName = user.firstName;
            userToUpdate.LastName = user.lastName;
            userToUpdate.SocialNumber = user.socialNumber;
            userToUpdate.UserName = user.userName;
            userToUpdate.DateOfBirth = user.dateOfBirth;
            userToUpdate.GenderID = (byte)user.gender.id;
            userToUpdate.Email = user.email;
            userToUpdate.Image = user.image;
            userToUpdate.RankID = user.rank.id;

            DB.SaveChanges();
            return user;
        }

        public UsersDTO EditPassword(UsersDTO user)
        {
            User userToUpdate = DB.Users.Where(p => p.UserID == user.id).SingleOrDefault();

            if (userToUpdate == null)
            {
                return null;
            }

            userToUpdate.Password = user.password;

            DB.SaveChanges();
            return user;
        }

        public void DeleteUser(int id)
        {
            User userToDelete = DB.Users.Where(p => p.UserID == id).SingleOrDefault();
            if(userToDelete != null)
            {
                List<Order> usersOrders = DB.Orders.Where(p => p.OrderingUserID == id).ToList();
                if (usersOrders != null)
                {
                    DB.Orders.RemoveRange(usersOrders);
                }
                DB.Users.Remove(userToDelete);
                DB.SaveChanges();
            }
        }

        public UsersDTO EditPicture(int id, string imageCode)
        {
            User userToUpdate = DB.Users.Where(p => p.UserID == id).SingleOrDefault();

            if (userToUpdate == null)
            {
                return null;
            }
            if(userToUpdate.Image != imageCode && userToUpdate.Image != null)
            {
                
                File.Delete(HttpContext.Current.Server.MapPath("~/Uploads/" + userToUpdate.Image));
            }


            userToUpdate.Image = imageCode;

            DB.SaveChanges();
            UsersDTO userToReturn = new UsersDTO
            {
                id = userToUpdate.UserID,
                userName = userToUpdate.UserName,
                firstName = userToUpdate.FirstName,
                lastName = userToUpdate.LastName,
                socialNumber = userToUpdate.SocialNumber,
                email = userToUpdate.Email,
                password = userToUpdate.Password,
                image = userToUpdate.Image,
                dateOfBirth = userToUpdate.DateOfBirth,
                gender = new UserGenderDTO
                {
                    id = userToUpdate.Gender.GenderID,
                    gender = userToUpdate.Gender.Gender1
                },
                rank = new UserRankDTO { id = userToUpdate.Rank.RankID, rank = userToUpdate.Rank.Rank1 }

            };
            return userToReturn;
        }
    }
}
