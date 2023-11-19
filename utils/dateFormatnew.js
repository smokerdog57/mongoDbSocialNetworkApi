// /utils/helpers.js
module.exports = {
  format_date: (dateString) => {
    // Check if the date is defined before formatting
    if (dateString) {
      // Convert the date string to a Date object
      const dateObject = new Date(dateString);
      return dateObject.toLocaleString(); // Use toLocaleString() for both date and time
    }
    // Handle the case where date is undefined
    return 'Date not available';
  },
};
