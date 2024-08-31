import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { doc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import { Calendar, MapPin, Phone, Edit, Trash2, CheckCircle } from "lucide-react";
import Loader from "../../components/Loader"; // Adjust the import path if necessary

interface Appointment {
  id: string;
  type: string;
  description: string;
  phone: string;
  location: string;
  date: string;
  status: string;
  userId: string;
  userName: string; // Added userName field
}

const appointmentStatuses = ["Pending", "Successful", "Failed", "Cancelled"];

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // State for loading

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); // Set loading true when starting to fetch
      try {
        const appointmentCollection = collection(db, "appointments");
        const querySnapshot = await getDocs(appointmentCollection);
        const fetchedAppointments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Appointment));
        setAppointments(fetchedAppointments);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        Swal.fire({
          icon: "error",
          title: "Error fetching appointments",
          text: errorMessage,
        });
      } finally {
        setLoading(false); // Set loading false after fetching
      }
    };
    fetchAppointments();
  }, []);

  const handleMarkAsSuccessful = async (id: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "appointments", id), { status: "Successful" });
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === id ? { ...appointment, status: "Successful" } : appointment
        )
      );
      Swal.fire({
        icon: "success",
        title: "Appointment marked as Successful!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      Swal.fire({
        icon: "error",
        title: "Error updating appointment",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "appointments", id));
      Swal.fire({
        icon: "success",
        title: "Appointment deleted!",
      });
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      Swal.fire({
        icon: "error",
        title: "Error deleting appointment",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {loading && <Loader />} {/* Render loader when loading */}
      <h2 className="text-2xl font-bold mb-4">Manage All Appointments</h2>
      <div className="gap-x-10 grid md:grid-cols-2">
        {appointments.map(appointment => (
          <div key={appointment.id}>
            <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center w-full space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col space-y-2">
                  <h4 className="font-bold text-gray-800">{appointment.type}</h4>
                  <p className="text-gray-600">{appointment.description}</p>
                  {/* <p className="text-gray-600 font-medium">Client Name: {appointment.userName}</p> Display client name */}
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-gray-600 flex items-center text-sm capitalize">
                    <Phone className="mr-2 h-4 w-4 text-blue-500" />
                    {appointment.phone}
                  </p>
                  <p className="text-gray-600 flex items-center text-sm capitalize">
                    <MapPin className="mr-2 h-4 w-4 text-green-500" />
                    {appointment.location}
                  </p>
                  <p className="text-gray-600 flex items-center text-sm capitalize">
                    <Calendar className="mr-2 h-4 w-4 text-red-500" />
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-gray-800 font-medium">Status:</p>
                  <p className={`text-sm font-semibold ${appointment.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {appointment.status}
                  </p>
                </div>
              </div>
              <div className="flex-col items-center space-y-6 mx-3">
                {appointment.status !== "Successful" && (
                  <button
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                    onClick={() => handleMarkAsSuccessful(appointment.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                )}
                <button
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  onClick={() => handleDelete(appointment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
