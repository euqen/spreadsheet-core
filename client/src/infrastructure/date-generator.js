import moment from 'moment';

const daysIndex = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6
};

export default class DateGenerator {

    static getDate(day, date) {
        let mondayDate = this.getMonday(date);
        let resultDate = new Date(mondayDate.valueOf() + daysIndex[day] * 86400000);
        return moment(resultDate).format("DD/MM/YYYY");
    }

    static getMonday(d) {
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

}