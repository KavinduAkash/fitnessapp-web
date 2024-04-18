export function findAge(dob) {
    // Parse the date of birth string
    var dobDate = new Date(dob.replace(/-/g, '/'));

    // Get the current date
    var currentDate = new Date();

    // Calculate the age
    var age = currentDate.getFullYear() - dobDate.getFullYear();
    var monthDiff = currentDate.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }

    return age;
}