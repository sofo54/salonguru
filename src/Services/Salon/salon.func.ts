export const averageRating = (numbers: [number]): number => {
	let average = numbers.reduce((prev: number, current: number) => prev + current, 0) / numbers.length;
	average = +average.toFixed(1); // cast to int
	return average;
};
