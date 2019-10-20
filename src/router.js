import Chatroom from "./modules/chatroom/views/Chatroom";
import AuthenticationBoard from "./modules/user/views/AuthenticationBoard";

const routes = [
  {
    path: "/",
    name: "AuthenticationBoard",
    component: AuthenticationBoard
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: Chatroom
  }
];

export default routes;
