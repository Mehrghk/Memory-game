import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
        const controller = new AbortController();
        setIsLoading(true);
        axios
            .get(url,{signal:controller.signal})
            .then((res) => {
            (setData(res.data), setIsLoading(false));
            })
            .catch((err)=>{
                setError(err.message),
                setIsLoading(false);
            });
        return () => controller.abort();
    };
    fetchData();
  }, [url]);
  return { data, isLoading, error };
}
