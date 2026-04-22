
import { useAuthStore } from "../../store/auth.store";
import { useUserStore } from "../../store/user.store";

export const DashboardPage = () => {
    const token = useAuthStore((s) => s.token);
    const user = useUserStore((s) => s.user);

    return (
        <div>
            <h1>Dashboard</h1>

            <p><strong>Token:</strong> {token}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Name:</strong> {user?.name}</p>
        </div>
    );
};
