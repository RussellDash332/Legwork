const h1 = {
    bounds: [[510, 93], [550, 240]],
    liveCount: 80,
    dayCount: 100,
};

const h2 = {
    bounds: [[510, 280], [550, 340]],
    liveCount: 80,
    dayCount: 100,
};

const hoverData = Array.of(h1, h2);

const thresholds = [0, 20, 40, 60, 80, 100];

const getColor = (indivLiveCount, totalLiveCount) => {
    const percentage = indivLiveCount / totalLiveCount * 100;
    return percentage >= thresholds[4]
        ? "#800026"
        : percentage >= thresholds[3]
        ? "#E31A1C"
        : percentage >= thresholds[2]
        ? "#FD8D3C"
        : percentage >= thresholds[1]
        ? "#FEB24C"
        : "#FED976"
};

export { hoverData, thresholds, getColor };
