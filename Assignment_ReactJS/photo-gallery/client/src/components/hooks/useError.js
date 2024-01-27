import { useEffect, useState } from "react";

const useError = (initial = null) => {
    const [message, setMessage] = useState(initial);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [message])
    const setError = (error) => {
        setMessage(error)
    }
    return { message, setError };
}
export default useError;