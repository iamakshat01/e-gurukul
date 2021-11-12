const parseDate = (dateString) => {
    let date = new Date(dateString);
    let formattedDate = date.toDateString();
    let [day, ...d] = formattedDate.split(' ');
    return (d.join(' '));
};

export default parseDate;