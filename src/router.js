import Chatroom from "./modules/chatroom/views/Chatroom";
import Signin from "./modules/user/views/Signin";

const routes = [
  {
    path: "/",
    name: "signin",
    component: Signin
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: Chatroom
  }
];

export default routes;
