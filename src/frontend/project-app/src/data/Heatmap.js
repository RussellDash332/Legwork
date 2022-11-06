const concatArrays = (...arr) => arr.reduce((acc, val) => acc.concat(...val), []);

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const interval = 20;
const getMultiper = (lowerBound, upperBound) => Math.floor((upperBound - lowerBound) / interval);

const genPerson = (lat, lon, intensity) => ({
    coordinates: [lat, lon],
    intensity
});

const plotPeopleHorizontal = (startLon, endLon, lat, count) => {
    const multiplier = getMultiper(startLon, endLon);
    const res = [];
    for (let n = multiplier * count; n > 0; n--) {
        res.push(genPerson(lat, randomIntFromInterval(startLon, endLon), 0.7));
    }
    return res;
};

const plotPeopleVertical = (startLat, endLat, lon, count) => {
    const multiplier = getMultiper(startLat, endLat);
    const res = [];
    for (let n = multiplier * count; n > 0; n--) {
        res.push(genPerson(randomIntFromInterval(startLat, endLat), lon, 0.7));
    }
    return res;
};

const plotPeopleSpot = (lat, lon, count) => {
    const res = [];
    for (let n = count; n > 0; n--) {
        res.push(genPerson(lat, lon, 1.0));
    }
    return res;
};

// Aisle coordinates: horizontal
const h1 = plotPeopleHorizontal(80, 240, 525, 5);
const h2 = plotPeopleHorizontal(270, 340, 525, 0);
const h3 = plotPeopleHorizontal(370, 440, 525, 1);
const h4 = plotPeopleHorizontal(470, 540, 525, 2);
const h5 = plotPeopleHorizontal(570, 640, 525, 0);
const h6 = plotPeopleHorizontal(670, 720, 525, 2);

const h7 = plotPeopleHorizontal(80, 240, 275, 1);
const h8 = plotPeopleHorizontal(270, 370, 275, 1);
const h9 = plotPeopleHorizontal(400, 500, 275, 1);
const h10 = plotPeopleHorizontal(530, 600, 275, 2);
const h11 = plotPeopleHorizontal(630, 700, 275, 1);

const h12 = plotPeopleHorizontal(80, 240, 80, 1);
const h13 = plotPeopleHorizontal(270, 370, 80, 2);
const h14 = plotPeopleHorizontal(400, 500, 80, 0);
const h15 = plotPeopleHorizontal(530, 600, 80, 0);
const h16 = plotPeopleHorizontal(630, 700, 80, 1);

// Aisle coordinates: vertical
const v1 = plotPeopleVertical(320, 500, 60, 3);
const v2 = plotPeopleVertical(320, 500, 260, 1);
const v3 = plotPeopleVertical(320, 500, 350, 3);
const v4 = plotPeopleVertical(320, 500, 440, 3);
const v5 = plotPeopleVertical(320, 500, 540, 2);
const v6 = plotPeopleVertical(320, 500, 630, 1);
const v7 = plotPeopleVertical(320, 500, 730, 4);

const v8 = plotPeopleVertical(110, 220, 60, 1);
const v9 = plotPeopleVertical(110, 220, 265, 1);
const v10 = plotPeopleVertical(110, 220, 390, 1);
const v11 = plotPeopleVertical(110, 220, 515, 3);
const v12 = plotPeopleVertical(110, 220, 610, 1);
const v13 = plotPeopleVertical(110, 220, 705, 5);

// Aisle coordinates: spot
const s1 = plotPeopleSpot(450, 890, 1);
const s2 = plotPeopleSpot(390, 890, 2);
const s3 = plotPeopleSpot(330, 890, 1);

const dataPoints = concatArrays(h1, h2, h3, h4, h5, h6, 
                                h7, h8, h9, h10, h11,
                                h12, h13, h14, h15, h16,
                                v1, v2, v3, v4, v5, v6, v7,
                                v8, v9, v10, v11, v12, v13,
                                s1, s2, s3);

export default dataPoints;
                    