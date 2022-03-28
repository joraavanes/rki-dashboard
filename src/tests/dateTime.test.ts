import moment from "moment";
import { getLastDates } from "../utils/dateTime";

test('should check the ending date', () => { 
    const dates = getLastDates(30);
    const endingDate = moment().subtract(1, 'days').format('MM/DD');

    expect(dates[dates.length-1]).toBe(endingDate);
});

test('should check starting date', () => { 
    const dates = getLastDates(30);
    const startingDate = moment().subtract(30, 'days').format('MM/DD');

    expect(dates[0]).toBe(startingDate);
});