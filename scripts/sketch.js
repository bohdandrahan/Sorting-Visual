let resetButton;
let values;
let w = 10;

function setup() {
	height = 500
	width = 0.9 * windowWidth;
	let canvas = createCanvas(width, height);

	values = new Array(floor(width / w))
	for (let i = 0; i < values.length; i++) {
		values[i] = random(200)
	}

	setupGUI();
}

async function quickSort(arr, start, end) {
	if (start >= end) {
		return
	}
	let index = await partition(arr, start, end);
	await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end)
	]);

}

async function partition(arr, start, end) {
	let pivotIndex = start;
	let pivotValue = arr[end];
	for (let i = start; i < end; i++) {
		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex)
			pivotIndex++;
		}
	}
	await swap(arr, pivotIndex, end);
	return pivotIndex;
}

async function swap(arr, a, b) {
	await sleep(100)
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
	background(2);
	for (let i = 0; i < values.length; i++) {
		stroke(0)
		colorMode(HSB)
		fill(values[i], 100, 100);
		rect(i * w, 100, w, 100)
	}
}

function setupGUI() {
	resetButton = createButton('reset');
	resetButton.mousePressed(reset_values);
	resetButton.position(10, 20)

	sortButton = createButton('sort');
	sortButton.mousePressed(sortPressed);
	sortButton.position(10, 40)
}

function sortPressed() {
	quickSort(values, 0, values.length - 1)
}

function reset_values() {
	console.log('reset')

}