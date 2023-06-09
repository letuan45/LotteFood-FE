// All components mapping with path for internal routes

import { lazy } from "react";

const Order = lazy(() => import("../pages/protected/Order"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Ingredient = lazy(() => import("../pages/protected/Ingredients"));
const Bill = lazy(() => import("../pages/protected/Bill"));
const IngreOrder = lazy(() => import("../pages/protected/IngreOrder"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const FoodManager = lazy(() => import("../pages/protected/FoodManager"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const Customer = lazy(() => import("../pages/protected/Customer"));

const routes = [
  {
    path: "/order", // the url
    component: Order, // view rendered
  },
  {
    path: "/customer", // the url
    component: Customer, // view rendered
  },
  {
    path: "/order", // the url
    component: Order, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/bill",
    component: Bill,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/foods",
    component: FoodManager,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/ingre-order",
    component: IngreOrder,
  },
  {
    path: "/ingre",
    component: Ingredient,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
