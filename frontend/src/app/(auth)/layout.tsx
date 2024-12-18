import Login from "./Login/login";
import Register from "./Register/register";

export default function AuthLayout() {
    return (
        <div>
            <Login />
            <Register />
        </div>
    );
}
