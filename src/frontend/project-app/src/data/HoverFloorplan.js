const createBound = (lowerLeftBound, topRightBound, liveCount, dayCount) => ({
    bounds: [lowerLeftBound, topRightBound],
    liveCount,
    dayCount
})

const h1 = createBound([510, 93], [550, 240], 80, 100);
const h2 = createBound([510, 280], [550,325], 80, 100);
const h3 = createBound([510, 375], [550,420], 80, 100);
const h4 = createBound([510, 470], [550,515], 80, 100);
const h5 = createBound([510, 565], [550,610], 80, 100);
const h6 = createBound([510, 655], [550,705], 80, 100);

const h7 = createBound([250, 93], [290, 235], 20, 100);
const h8 = createBound([250, 300], [290, 365], 80, 100);
const h9 = createBound([250, 420], [290, 485], 80, 100);
const h10 = createBound([250, 535], [290, 585], 80, 100);
const h11 = createBound([250, 630], [290, 680], 80, 100);

const h12 = createBound([55, 93], [95, 235], 80, 100);
const h13 = createBound([55, 300], [95, 365], 80, 100);
const h14 = createBound([55, 420], [95, 485], 80, 100);
const h15 = createBound([55, 535], [95, 585], 80, 100);
const h16 = createBound([55, 630], [95, 680], 80, 100);

const v1 = createBound([310, 45], [500, 85], 80, 100);
const v2 = createBound([310, 240], [500, 280], 80, 100);
const v3 = createBound([310, 330], [500, 370], 80, 100);
const v4 = createBound([310, 425], [500, 465], 80, 100);
const v5 = createBound([310, 520], [500, 560], 80, 100);
const v6 = createBound([310, 615], [500, 645], 80, 100);
const v7 = createBound([310, 710], [500, 750], 80, 100);

const v8 = createBound([105, 45], [235, 85], 80, 100);
const v9 = createBound([105, 245], [235, 285], 80, 100);
const v10 = createBound([105, 370], [235, 410], 80, 100);
const v11 = createBound([105, 490], [235, 530], 80, 100);
const v12 = createBound([105, 590], [235, 630], 80, 100);
const v13 = createBound([105, 685], [235, 725], 80, 100);

const s1 = createBound([440, 870], [470, 900], 80, 100);
const s2 = createBound([375, 870], [405, 900], 80, 100);
const s3 = createBound([310, 870], [340, 900], 80, 100);

const hoverData = Array.of(h1, h2, h3, h4, h5, h6, 
                           h7, h8, h9, h10, h11,
                           h12, h13, h14, h15, h16,
                           v1, v2, v3, v4, v5, v6, v7, 
                           v8, v9, v10, v11, v12, v13,
                           s1, s2, s3);

const thresholds = [0, 2.5, 5, 7.5, 10, 12.5, 15];

const getColor = (indivLiveCount, totalLiveCount) => {
    const percentage = indivLiveCount / totalLiveCount * 100;
    return percentage >= thresholds[6]
        ? "#FF0000"
        : percentage >= thresholds[5]
        ? "#FF3300"
        : percentage >= thresholds[4]
        ? "#ff6600"
        : percentage >= thresholds[3]
        ? "#ff8000"
        : percentage >= thresholds[2]
        ? "#ff9900"
        : percentage >= thresholds[1]
        ? "#FFCC00"
        : "#FFFF00"
};

export { hoverData, thresholds, getColor };
