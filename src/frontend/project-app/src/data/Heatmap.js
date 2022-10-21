const concatArrays = (...arr) => arr.reduce((acc, val) => acc.concat(...val), []);

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const plotPeopleHorizontal = (startLon, endLon, lat, count) => {
    const res = [];
    for (let n = count; n > 0; n--) {
        res.push({
            coordinates: [lat, randomIntFromInterval(startLon, endLon)],
            intensity: 2.0
        });
    }
    return res;
};

const plotPeopleVertical = (startLat, endLat, lon, count) => {
    const res = [];
    for (let n = count; n > 0; n--) {
        res.push({
            coordinates: [randomIntFromInterval(startLat, endLat), lon],
            intensity: 2.0
        });
    }
    return res;
};

const plotPeopleSpot = (lat, lon, count) => {
    const res = [];
    for (let n = count; n > 0; n--) {
        res.push({
            coordinates: [lat, lon],
            intensity: 2.0
        });
    }
    return res;
};

// Aisle coordinates: horizontal
const h1 = plotPeopleHorizontal(80, 250, 525, 1);
const h2 = plotPeopleHorizontal(80, 250, 275, 1);

// Aisle coordinates: vertical
const v1 = plotPeopleVertical(320, 500, 60, 7);

// Aisle coordinates: spot
const s1 = plotPeopleSpot(100, 900, 1);

const dataPoints = concatArrays(h1, h2, v1, s1);

export default dataPoints;
