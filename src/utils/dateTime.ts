import moment from 'moment';

export const getLastDates = (days: number) => {
    let dates:string[] = [];
    for (let i = 1; i <= days; i++) {
        const strDate = moment().subtract(i, 'days').format('MM/DD');
        dates = dates.concat(strDate);
    }
    return dates.reverse();
}
