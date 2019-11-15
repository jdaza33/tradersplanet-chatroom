import Chatroom from "./modules/chatroom/views/Chatroom";
import AuthenticationBoard from "./modules/user/views/AuthenticationBoard";
import DashboardClass from "./modules/class/views/DashboardClass";
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
  },
  {
    path: "/dashboard",
    name: "dashboardClass",
    component: DashboardClass
  }
];

export default routes;
