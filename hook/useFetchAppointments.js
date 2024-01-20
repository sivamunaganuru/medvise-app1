import { useState, useEffect } from "react";
import axios from "axios";
import { retrieveSessionInfo } from "../Firebase/sessionService";
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking'

const useFetchAppointments = (query) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://testapi.medvise.ai/api/patient/`,
    params: { ...query },
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthday = new Date(dob);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const fetchappointments = async () => {
    setIsLoading(true);

    try {
         
      const cookie = await retrieveSessionInfo();
      // console.log(cookie);
      RCTNetworking.clearCookies(() => { })
        // Add these to your request headers
      axios.defaults.headers.common['Cookie'] = `csrftoken=${cookie.csrfToken}; sessionid=${cookie.sessionId}`;
      // console.log('Axios Request Config:', axios.defaults.headers.common);
      const response = await axios.request(options);
      const parsedAppointments = response.data.map(appointment => ({
        id: appointment.id,
        patientName: appointment.user_details.full_name,
        patientAge: calculateAge(appointment.user_details.date_of_birth),
        doctorName: appointment.pcp_doctor
      }));
      setAppointments(parsedAppointments);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchappointments();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchappointments();
  };

  return { appointments, isLoading, error, refetch };
};

export default useFetchAppointments;