import { Todos, CreateTodo, Me, EditTodo, Users } from "../pages/index";

export const adminRoutes = [
  {
    id: 1,
    path: "/todos",
    component: Todos,
  },
  {
    id: 2,
    path: "/todos/create",
    component: CreateTodo,
  },
  {
    id: 3,
    path: "/todos/edit/:id",
    component: EditTodo,
  },
  {
    id: 4,
    path: "/me",
    component: Me,
  },
  {
    id: 5,
    path: "/users",
    component: Users,
  },
];
