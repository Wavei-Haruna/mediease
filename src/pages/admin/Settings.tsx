import { FC, useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../components/Loader";

// Register the necessary elements with Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Settings: FC = () => {
  const [userStats, setUserStats] = useState<number[]>([]);
  const [appointmentStats, setAppointmentStats] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch users statistics
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const roles = usersSnapshot.docs.map(doc => doc.data().role);
        const activeUsers = roles.filter(role => role !== "admin").length;
        const admins = roles.filter(role => role === "admin").length;
        setUserStats([activeUsers, admins]);

        // Fetch appointments statistics
        const appointmentsCollection = collection(db, "appointments");
        const appointmentsSnapshot = await getDocs(appointmentsCollection);
        const statuses = appointmentsSnapshot.docs.map(doc => doc.data().status);
        const pending = statuses.filter(status => status === "Pending").length;
        const successful = statuses.filter(status => status === "Successful").length;
        setAppointmentStats([pending, successful]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const userChartData = {
    labels: ['Active Users', 'Admins'],
    datasets: [
      {
        label: 'Users',
        data: userStats,
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const appointmentChartData = {
    labels: ['Pending', 'Successful'],
    datasets: [
      {
        label: 'Appointments',
        data: appointmentStats,
        backgroundColor: ['#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100">
      {loading && <Loader />}
      <div className="grid grid-cols-1 w-[70%] mx-auto md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">User Statistics</h2>
          <Doughnut data={userChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Appointment Statistics</h2>
          <Bar data={appointmentChartData} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
