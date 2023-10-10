import { useState } from "react";

const cashRequestHook = () => {
    const [isLoading, setIsLoading] = useState<any>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        setIsLoading
    };
};

export default cashRequestHook;
