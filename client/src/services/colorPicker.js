const pickColor = (id) => {
    const colors = ['primary.main', 'secondary.main', 'error.main', 'warning.main', 'info.main', 'success.main'];
    const k = (id.split('')).reduce((acc, c) => {
        return (acc + c.charCodeAt(0));
    }, 0);
    return colors[k % colors.length];
};

export default pickColor;