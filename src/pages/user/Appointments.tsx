import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { doc, setDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Calendar, MapPin, Phone, Edit, Trash2 } from "lucide-react";
import Loader from "../../components/Loader"; // Adjust the import path if necessary

interface Appointment {
  id: string;
  type: string;
  description: string;
  phone: string;
  location: string;
  date: string;
  status: string; // Added status field
}

const appointmentTypes = [
  "General Checkup",
  "Consultation",
  "Emergency",
  "Follow-up",
  "Surgery",
  "Physical Therapy",
  "Lab Test",
  "Vaccination",
  "Specialist Consultation",
  "Other"
];

const appointmentStatuses = [
  "Pending",
  "Successful",
  "Failed",
  "Cancelled"
];

const UserAppointments = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [form, setForm] = useState({
    type: "",
    description: "",
    phone: "",
    location: "",
    date: "",
    status: "Pending", // Default status
  });
  const [editMode, setEditMode] = useState<{ id?: string; isEditing: boolean }>({
    id: undefined,
    isEditing: false,
  });
  const [loading, setLoading] = useState<boolean>(false); // State for loading

  useEffect(() => {
    if (currentUser) {
      const fetchAppointments = async () => {
        setLoading(true); // Set loading true when starting to fetch
        try {
          const appointmentCollection = collection(db, "appointments");
          const querySnapshot = await getDocs(appointmentCollection);
          const fetchedAppointments = querySnapshot.docs
            .filter(doc => doc.data().userId === currentUser.uid) // Filter by user ID
            .map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
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
    }
  }, [currentUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const appointmentData = {
        ...form,
        userId: currentUser?.uid,
        date: new Date(form.date).toISOString(),
      };

      if (editMode.isEditing && editMode.id) {
        await updateDoc(doc(db, "appointments", editMode.id), appointmentData);
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === editMode.id ? { ...appointment, ...appointmentData } : appointment
          )
        );
        Swal.fire({
          icon: "success",
          title: "Appointment updated!",
        });
      } else {
        const newAppointmentRef = doc(collection(db, "appointments"));
        await setDoc(newAppointmentRef, appointmentData);
        setAppointments((prev) => [
          ...prev,
          { id: newAppointmentRef.id, ...appointmentData },
        ]);
        Swal.fire({
          icon: "success",
          title: "Appointment created!",
        });
      }

      setForm({
        type: "",
        description: "",
        phone: "",
        location: "",
        date: "",
        status: "Pending",
      });
      setEditMode({ id: undefined, isEditing: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      Swal.fire({
        icon: "error",
        title: "Error submitting appointment",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setForm({
      type: appointment.type,
      description: appointment.description,
      phone: appointment.phone,
      location: appointment.location,
      date: appointment.date,
      status: appointment.status, // Include status
    });
    setEditMode({ id: appointment.id, isEditing: true });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "appointments", id));
      Swal.fire({
        icon: "success",
        title: "Appointment deleted!",
      });
      setAppointments(prev => prev.filter(appointment => appointment.id !== id)); // Update appointments state
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
      <h2 className="text-2xl font-bold mb-4">Manage Your Appointments</h2>
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>Select an appointment type</option>
              {appointmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {appointmentStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {editMode.isEditing ? "Update Appointment" : "Create Appointment"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Your Appointments</h3>
      <div className="gap-x-10 grid md:grid-cols-2">
        {appointments.map(appointment => (
          <div className="">
            <div key={appointment.id} className="p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
   <div className="flex flex-col md:flex-row md:items-center w-full space-y-4 md:space-y-0 md:space-x-6">
    <div className="flex flex-col space-y-2">
      <h4 className=" font-bold text-gray-800">{appointment.type}</h4>
      <p className="text-gray-600">{appointment.description}</p>
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
              <button
                className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                onClick={() => handleEdit(appointment)}
              >
                <Edit className="h-4 w-4" />
              </button>
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

export default UserAppointments;

