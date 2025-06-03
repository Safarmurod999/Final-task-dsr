import useConnect from "./connect";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";
import Breadcrumb from "components/ui/Breadcrumb/Breadcrumb";
const Users = () => {
    const {
        users,
        navigate
    } = useConnect();
    return (
        <section className="client">
            <div className="admin-container">
                <Breadcrumb title="Users" />
                <div className="data-table-container">

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Login</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.loading ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <p className="loader"> Loading...</p>
                                        </td>
                                    </tr>
                                ) : users && users.usersList?.data?.length ? (
                                    users.usersList.data.map((user, index) => (
                                        <tr key={user.login}>
                                            <td>{index + 1}</td>
                                            <td>{user?.login}</td>
                                            <td>{user?.name}</td>
                                            <td>{user?.role}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="no-data">
                                        <td colSpan={4}>
                                            <p className="text-center">No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Users;
