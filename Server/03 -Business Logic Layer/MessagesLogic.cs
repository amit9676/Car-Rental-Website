namespace Car_Rent
{
    public class MessagesLogic : BaseLogic
    {
        public MessagesDTO AddMessage(MessagesDTO givenMessage)
        {
            Message messageToAdd = new Message
            {
                MessageID = givenMessage.id,
                WriterFullName = givenMessage.fullName,
                WriterEmail = givenMessage.email,
                MessageContent = givenMessage.content
            };
            DB.Messages.Add(messageToAdd);
            DB.SaveChanges();
            givenMessage.id = messageToAdd.MessageID;
            return givenMessage;
        }
    }
}
