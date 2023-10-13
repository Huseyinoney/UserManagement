import { Routes, Route } from "react-router-dom"
import Login from "./pages/LoginPage/Login"
import Register from "./pages/RegisterPage/Register"
import NotFound from "./pages/NotFoundPage/NotFound"
import { Home } from "./pages/HomePage/Home"
import ProtectedRouteHome, { ProtectedRoute } from "./components/ProtectedRoute"


const App = () => {

    return (

        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Route>

            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<ProtectedRouteHome />}>
                <Route path="/Home" element={<Home />} />
            </Route>
        </Routes>
    )
}
export default App;