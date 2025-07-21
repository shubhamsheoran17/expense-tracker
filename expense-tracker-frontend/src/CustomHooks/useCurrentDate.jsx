import {useState , useEffect} from 'react';


const useCurrentDate = () => {
    const [currentDate , setCurrentDate] = useState({
        lastdateOfMonth : '30',
        month: 'January',
        year: 2025
    })


    useEffect(() => {

        const updateDate = () => {
            const now = new Date();

            const month = String(now.getMonth() + 1).padStart(2 , '0');
            const year = now.getFullYear();
            const lastdate = new Date(year , month , 0);
            const lastDay = lastdate.getDate();

            setCurrentDate({
                lastdateOfMonth: lastDay,
                month: month,
                year: year
            });
        };

        updateDate();

        const interval = setInterval(() => {
            updateDate();
        } , 86400000)    // update daily

        return  () => clearInterval(interval);
    } , []);


    return currentDate;
};

export default useCurrentDate;