const addComma = (x: number) => (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

export default addComma;
