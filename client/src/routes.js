import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "./components/Login/Login";
//import Icons from "views/examples/Icons.js";
//import Log from "views/examples/Log.js"
import Organisation from "./components/Organisation/Organisation"
import Users from "./components/Users/Users.js";
import DetailsUser from './components/Users/DetailsUser'
import EditSL from './components/Organisation/SL/EditSL'
import EditUser from "./components/Users/EditUser";






var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
 
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-circle-08 ",
    component: Users,
    layout: "/admin"
  },
 
  // {
  //   path: "/icons",
  //   name: "Icons",
    
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },


  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  // {
  //   path: "/log",
  //   name: "Log",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Log,
  //   layout: "/auth"
  //},
  {
    path: "/organization",
    name: "Organization",
    icon: "ni ni-circle-08 ",
    component: Organisation,
    layout: "/admin"
  },

   
  {
    path: `/edit/user/:id`,
    name: "Edit",
    icon: "ni ni-circle-08 ",
    component: EditUser,
    layout: "/admin"
  },
  
  
  // {
  //   path: `/user/:id`,
  //   name: "Details",
  //   icon: "ni ni-circle-08 ",
  //   component: DetailsStatsUser,
  //   layout: "/admin"
  // },
 
  {
    path: `/search/:id`,
    name: "Details",
    icon: "ni ni-circle-08 ",
    component: DetailsUser,
    layout: "/admin"
  },
  {
    path: `/edit/sl/:id`,
    name: "EDIT",
    icon: "ni ni-circle-08 ",
    component: EditSL,
    layout: "/admin"
  }
 
];
export default routes;
