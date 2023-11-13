module.exports = {
  format_date: (date) => {
    // Check if the date is defined before formatting
    if (date) {
      return date.toLocaleDateString();
    }
    // Handle the case where date is undefined
    return 'Date not available';
  },
};
