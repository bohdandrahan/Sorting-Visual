let values;
let w = 1;
let states = []

function setup() {
	height = 512
	width = 0.9 * windowWidth;
	let canvas = createCanvas(width, height);

	values = new Array(floor(width / w))
	for (let i = 0; i < values.length; i++) {
		values[i] = random(300)
		states[i] = -1
	}

	setupGUI();
}

async function quickSort(arr, start, end) {
	if (start >= end) {
		return
	}
	let index = await partition(arr, start, end);
	states[index] = -1;
	await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end)
	]);
}

async function partition(arr, start, end) {
	for (let i = start; i < end; i++) {
		states[i] = 1;
	}
	let pivotIndex = start;
	let pivotValue = arr[end];
	states[pivotIndex] = 0
	for (let i = start; i < end; i++) {
		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex)
			states[pivotIndex] = -1;
			pivotIndex++;
			states[pivotIndex] = 0;

		}
	}
	await swap(arr, pivotIndex, end);
	for (let i = start; i < end; i++) {
		states[i] = -1;
	}

	return pivotIndex;
}

async function swap(arr, a, b) {
	await sleep(25)
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
		noStroke()
		colorMode(HSB)
		fill(values[i], 100, 100);
		rect(i * w, 100, w, 100)
		colorMode(RGB)
		if (states[i] === 0) {
			fill(255, 0, 0)
		} else if (states[i] === 1) {
			fill(100, 200, 50)
		} else {
			fill(255)
		}
		rect(i * w, 500, w, -values[i])
	}
}

function setupGUI() {

	sortButton = createButton('sort');
	sortButton.mousePressed(sortPressed);
	sortButton.position(10, 20)
}

function sortPressed() {
	quickSort(values, 0, values.length - 1)
}

function reset_values() {
	console.log('reset')

}