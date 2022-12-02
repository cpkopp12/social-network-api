function formatDate(date) {
        const dateString = date.toString();
        console.log(date, dateString);
        const dateStringSplit = dateString.split(' ');

        const day = dateStringSplit[1] + ' ' + dateStringSplit[2] + ' ' + dateStringSplit[3];
        console.log(day);
        console.log(dateStringSplit[4]);
        const timeSplit = dateStringSplit[4].split(':');
        console.log(parseInt(timeSplit[0]));
        let amPm;
        let hour;
        if (parseInt(timeSplit[0])>= 12) {
            amPm = 'pm';
            if (parseInt(timeSplit[0]) > 12){  
                hour = (parseInt(timeSplit[0]) - 12).toString();
            } else {
                hour = timeSplit[0];
            }   
        } else {
            amPm = 'am';
            if (parseInt(timeSplit[0])>=1) {
                hour = timeSplit[0];
            } else {
                hour = '12';
            }
        }
        let minute = timeSplit[1];
        let timezone = dateStringSplit[6] + ' ' + dateStringSplit[7] + ' ' + dateStringSplit[8];
        let time_and_date = day + ', ' + hour + ':' + minute + ' ' + amPm + ' ' + timezone;
        console.log(time_and_date);
        return time_and_date;
    };

    module.exports = { formatDate };