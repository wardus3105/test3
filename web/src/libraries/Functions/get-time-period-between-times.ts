import moment from "moment";

export default function haveSameTimePeriod(time1: any , time2: any){
    if(time1 && time2){
        const start = time1.getTime();
        const end = time2.getTime();
        
        const diff = end - start;
        const seconds = Math.floor(diff / 1000 % 60);

        console.log(seconds);

        if(seconds < 60){
            return true;
        }
        return false;
    }
    return false;
}

