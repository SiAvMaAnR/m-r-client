import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { role, page } from '../constants/system'
import {
  Chat,
  ConfirmedRegistration,
  Home,
  Login,
  Profile,
  Registration,
  Users
} from '../pages/_exports'
import { RoutePermissionGuard, SidebarLayout } from '../components/_exports'

function AppRouter() {
  const isLogged = useSelector((state) => state.auth.info.isLogged)

  return <div className="app-router">{isLogged ? <LoggedRouter /> : <GuestRouter />}</div>
}

function LoggedRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={page.home} />} />

      <Route element={<RoutePermissionGuard permittedRoles={[role.admin]} />}>
        <Route path="users" element={<SidebarLayout page={<Users />} />} />
      </Route>

      <Route element={<RoutePermissionGuard permittedRoles={[role.user]} />}>
        <Route path="profile" element={<SidebarLayout page={<Profile />} />} />
      </Route>

      <Route element={<RoutePermissionGuard permittedRoles={[role.user, role.admin]} />}>
        <Route path="home" element={<SidebarLayout page={<Home />} />} />
        <Route path="chat/:id?" element={<SidebarLayout page={<Chat />} />} />
      </Route>
    </Routes>
  )
}

function GuestRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={page.login} />} />

      <Route element={<RoutePermissionGuard permittedRoles={[role.public]} />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="confirm-registration" element={<ConfirmedRegistration />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
