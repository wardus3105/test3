import moment from "moment";

export default function haveSameTimePeriod(time1: any , time2: any){
    if(time1 && time2){
        const duration = moment.duration(time1.diff(time2));  
        let seconds = Math.floor(duration.asSeconds());
        console.log(seconds)
        if(seconds < 60){
            return true
        }
        return false
    }
    return false;
}

