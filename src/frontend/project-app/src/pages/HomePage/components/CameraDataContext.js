import { createContext, useEffect, useState } from "react";
import { subscribeCameraLog } from "../../../api/firebase-db";
import { off } from "firebase/database";

const CameraDataContext = createContext();
export default CameraDataContext;

export const CameraDataContextProvider = ({children}) => {
    const [data, setData] = useState({}); // Raw data from firebase db
    const [filteredData, setFilteredData] = useState({});
    const [dateRange, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [timeRange, setTimeRange] = useState({
        start: "00:00",
        end: "23:59"
    });
    const [filterGroupToggle, setFilterGroupToggle] = useState("day_month_year");



    // Initial Listener on data
    useEffect(() => {
        subscribeCameraLog((logData) => {
            // console.log(logData);
            setData(logData);
            // Cannot put find smallest date here because this would be triggered everytime there is new data in the database
        })
    }, [])


    useEffect(() => {
        if(data.hasOwnProperty("cameraLog")){
            const pdata = processData(data)
            console.log("processdata",pdata)
            setFilteredData(pdata)
        }   
    }, [timeRange, dateRange, filterGroupToggle]);



    /* Functions */
    const findSmallestDate = (inputData) => {
        let smallestTimeStamp = Infinity;

        Object.values(inputData.cameraLog).forEach(obj => {
            
            if(obj.timestamp < smallestTimeStamp){
                smallestTimeStamp = obj.timestamp
                // console.log(smallestTimeStamp)
            }

        })
        console.log(new Date(smallestTimeStamp*1000))
        return new Date(smallestTimeStamp*1000);
    };

    const formatTimestamp = (dataPoint) => {
        const timestamp = dataPoint['timestamp'] 
        const date = new Date(timestamp) //Tue Jan 20 1970 14:22:45 GMT+0730 (Singapore Standard Time)
        
        dataPoint['startDate'] = dateRange[0].startDate
        dataPoint['endDate'] = dateRange[0].endDate
        dataPoint['time'] =  date.getHours() + ":" + date.getMinutes()
        dataPoint['year'] = new Date(timestamp*1000).getFullYear()
        dataPoint['month_year'] = String(new Date(timestamp*1000).getMonth()) + "/" + String(new Date(timestamp*1000).getFullYear())
        dataPoint['day_month_year'] = String(new Date(timestamp*1000).getDay()) + "/" + String(new Date(timestamp*1000).getMonth()) + "/" + String(new Date(timestamp*1000).getFullYear())

        return dataPoint;
    };

    const aggregateByCameraId = (prev, current, index) => {
 
        if (!(current["camera_id"] in prev)) {
          console.log("reset")
          prev[current["camera_id"]] = {}
        }

        const key = current[filterGroupToggle]
        if (!(key in prev[current["camera_id"]])) {
          console.log("reset key")
          prev[current["camera_id"]][key] = 0;
        }
        
        const temp = prev[current["camera_id"]][key]
        prev[current["camera_id"]][key] += current["count"]
        console.log("diff", temp, prev[current["camera_id"]][key] - temp)

        return prev;
    };

    const stringToTime = (str) => {
        const strArray = str.split(':')
        const hourStr = strArray[0]
        const hour = parseInt(hourStr) 
        const minuteStr = strArray[1]
        const minute = parseInt(minuteStr) 

        return hour*60 + minute;
    };

    const checkValidRange = (dataPoint) => {
        const startDate = dateRange[0].startDate
        const endDate = dateRange[0].endDate    
        const time = dataPoint['time']
        const timestamp = dataPoint['timestamp']
        const calendarDate = String(new Date(timestamp*1000).getDay()) + 
            "/" + String(new Date(timestamp*1000).getMonth()) +
            "/" + String(new Date(timestamp*1000).getFullYear())

        const tempStartDate = new Date(startDate)
        const tempEndDate = new Date(endDate)
        const tempCalendarDate = new Date(calendarDate)
    
        return tempStartDate <= tempCalendarDate && tempCalendarDate <= tempEndDate && stringToTime(timeRange.start) <= stringToTime(time) && stringToTime(time) <= stringToTime(timeRange.end);
    };

    const processData = (data) => {

        console.log("raw data")
        // flatten data into entries
        let flattened_data = []
        // Object.values(data).forEach(user => {
            Object.values(data.cameraLog).forEach(dataPoint => {
                flattened_data.push(dataPoint);
            }) 
        // })
    
        // output the number of items that pass the range
        console.log("initial data")
        console.log(flattened_data)

        // 1. filter out values that dont have timestamp
        const flattened_data1 = flattened_data.filter(x => x.hasOwnProperty('timestamp'))
        console.log("filtering data")
        console.log(flattened_data1)
    
        // 2. format timestamps
        const flattened_data2 = flattened_data1.map(formatTimestamp)
        console.log("mapping data")
        console.log(flattened_data2)
    
        // 3. check if timestamp is within the range
        const flattened_data3 = flattened_data2.filter(checkValidRange)
        console.log("validrange data")
        console.log(flattened_data3)
        
        console.log("checkvalidrange", checkValidRange(flattened_data2[0]))

        // 4. aggregate by camera_id, year
        const flattened_data4 = flattened_data3.reduce(aggregateByCameraId, {})
        console.log("aggre data")
        console.log(flattened_data4)
    
        return flattened_data4;
    };




    return (
        <CameraDataContext.Provider
            value={{
                filteredData,
                dateRange,
                setRange,
                timeRange,
                setTimeRange,
                filterGroupToggle,
                setFilterGroupToggle
            }}
        >
            {children}
        </CameraDataContext.Provider>
    );
}




    
    
    
    
    
    
    
    

    


    