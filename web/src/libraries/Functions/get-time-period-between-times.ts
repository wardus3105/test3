import moment from "moment";

export default function haveSameTimePeriod(time1: any , time2: any){
    if(time1 && time2){
        const duration = moment.duration(time1.diff(time2));  
        let minutes = Math.floor(duration.asMinutes());
        if(minutes < 0){
            return true
        }
        return false
    }
    return false;
}

