import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const json = await response.json();

                if (json && json[currency]) {
                    setData(json[currency]);
                } else {
                    console.error("Unexpected API structure", json);
                    setData({});
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setData({});
            }
        }

        if (currency) {
            fetchData();
        }
    }, [currency]);

    return data;
}

export default useCurrencyInfo;

