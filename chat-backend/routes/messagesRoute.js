import  express  from 'express';


import { addMessage, getMessages } from "../Controllers/messagesController.js";

export const messagesRouter=express.Router()

messagesRouter.post("/addmsg", addMessage);
messagesRouter.post("/getmsg", getMessages);



export default messagesRouter;


// import { addMessage, getAllMessage} from "../Controllers/messagesController.js";





// export const messagesRouter=express.Router()

// messagesRouter.post("/sendmsg",getAllMessage)
// messagesRouter.post("/addmsg",addMessage)




// export default messagesRouter;








