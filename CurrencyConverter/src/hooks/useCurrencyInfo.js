
import { useState, useEffect } from "react";

const useCurrencyInfo = () => {
  // State to store fetched currencies and errors
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = "d32d39ad3773eae7683fbe71"; // API Key for fetching currency codes

  useEffect(() => {
    // Function to fetch the list of supported currency codes from the API
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        const data = await res.json();
        
        // Check if API response is successful
        if (data.result === "success") {
          // Map through the supported codes and store the currency code only
          //The API contains currency code and the full name but in the ui we want the currency code only so .map function is used to iterate each array element and set only the code[0] in the setCurrencies state array
          setCurrencies(data.supported_codes.map(code => code[0]));
        } else {
          setError("Fetch API error"); // Handle API error
        }
      } catch (error) {
        setError("Fetch API error"); // Handle network or server errors
      }
    };

    // It triggers the fetchCurrencies() function once when the component mounts, and it won’t rerun unless the API_KEY changes.
    fetchCurrencies();
  }, [API_KEY]);

  // Return fetched currencies and any error
  return { currencies, error };
};

export default useCurrencyInfo;