import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import { Lock, Trash2, Unlock } from "lucide-react";
import Loader from "../../components/Loader";

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        setUsers(fetchedUsers);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        Swal.fire({
          icon: "error",
          title: "Error fetching users",
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (id: string, currentStatus: string) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
      await updateDoc(doc(db, "users", id), { status: newStatus });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
      Swal.fire({
        icon: "success",
        title: `User ${newStatus === "Blocked" ? "Blocked" : "Unblocked"}!`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      Swal.fire({
        icon: "error",
        title: `Error ${currentStatus === "Active" ? "blocking" : "unblocking"} user`,
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      Swal.fire({
        icon: "success",
        title: "User deleted!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      Swal.fire({
        icon: "error",
        title: "Error deleting user",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {loading && <Loader />}
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-5 text-left bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-5 text-left bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-5 text-left bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider">
                Phone
              </th>
              <th className="py-3 px-5 text-left bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-5 text-left bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-5 text-left bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-5 border-b border-gray-200">{user.username}</td>
                <td className="py-3 px-5 border-b border-gray-200">{user.email}</td>
                <td className="py-3 px-5 border-b border-gray-200">{user.phoneNumber}</td>
                <td className="py-3 px-5 border-b border-gray-200">{user.role}</td>
                <td className="py-3 px-5 border-b border-gray-200">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-5 border-b border-gray-200 flex space-x-2">
                 
                {user.role !== "admin" && 
                  <button
                    className={`p-2 rounded-md ${user.status === 'Active' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                    onClick={() => handleBlock(user.id, user.status)}
                  >
                    {user.status === "Active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </button>
                  }
                  {user.role !== "admin" && ( // Hide delete button if role is admin
                    <button
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
