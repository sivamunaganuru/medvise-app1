import { useState, useEffect } from "react";
import axios from "axios";
import { retrieveSessionInfo } from "../Firebase/sessionService";
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking'

const useVerifyUser = () => {
  const [userdata, setUserdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://testapi.medvise.ai/api/auth/get_user_metadata/`,
    // params: { ...query },
  };

  const verifyUser = async () => {
    setIsLoading(true);

    try {
      const cookie = await retrieveSessionInfo();
      // console.log(cookie);
      RCTNetworking.clearCookies(() => { })
      axios.defaults.headers.common['Cookie'] = `csrftoken=${cookie.csrfToken}; sessionid=${cookie.sessionId}`;
      const response = await axios.request(options);
      setUserdata(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    verifyUser();
  };

  return { userdata, isLoading, error, refetch };
};

export default useVerifyUser;