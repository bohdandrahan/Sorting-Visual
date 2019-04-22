let resetButton;
let values;
let w = 10;

function setup() {
	height = 500
	width = 0.9 * windowWidth;
	let canvas = createCanvas(width, height);

	values = new Array(floor(width / w))
	for (let i = 1; i < values.length; i++) {
		values[i] = random(360)
	}

	setupGUI();
}

function quickSort(arr, start, end) {
	if (start >= end)
}

function draw() {
	background(2);
	for (let i = 0; i < values.length; i++) {
		stroke(0)
		colorMode(HSB)
		fill(values[i], 100, 100);
		rect(i * w + w / 2, 40, w, 100)

	}
}

function setupGUI() {
	resetButton = createButton('reset');
	resetButton.mousePressed(reset_values);
	resetButton.position(10, 20)
}

function reset_values() {

}