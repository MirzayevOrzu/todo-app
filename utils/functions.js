module.exports.findTodaysTasks = function(task) {
    let currentdate = new Date().toISOString().slice(0, 10);
    let currentyear = currentdate.slice(0, 4), currentmonth = currentdate.slice(5, 7), currentday = currentdate.slice(8);
    let uptoyear = task.date.slice(0, 4), uptomonth = task.date.slice(5, 7), uptoday = task.date.slice(8);
    if ((currentyear == uptoyear) && (currentmonth == uptomonth) && (currentday == uptoday)) { return task }
}

module.exports.findTaskWithinAweek = function(task) {
    let currentdate = new Date();
    let dateOfTask = new Date(task.date);
    function days_between(date1, date2) {

        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(date1 - date2);

        // Convert back to days and return
        return Math.round(differenceMs / ONE_DAY);

    }
    let res = days_between(dateOfTask, currentdate);
    if ((res > 1) && (res <= 6)) {
        return task
    }
}