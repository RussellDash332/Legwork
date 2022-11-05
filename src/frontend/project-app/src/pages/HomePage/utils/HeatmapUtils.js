const flipYCoordinate = (currY, maxY) => maxY - currY;

const Mode = {
    Live: "live",
    Analytics: "analytics",
};

const getSpots = (nodes) => {
    let spotsArray = nodes.filter((node) => node.type === "camera");

    spotsArray = spotsArray.map(node => {

        const spotData = {
            id: node.id,
            label: node.data.label,
            position: node.position,               
        };

        return spotData;
    })
    
    return spotsArray;
};

const getPaths = (nodes, edges) => {
    let pathsArray = [];

    for (let i = 0; i < edges.length; i++) {
        const currEdge = edges[i];

        const id1 = currEdge.source;
        const id1Data = nodes.find((node) => node.id === id1);
        const label1 = id1Data.data.label;
        const position1 = id1Data.position;
        const leftDirection = ['cameraTopLeft', 'cameraBottomRight', 'cameraRightUp', 'cameraLeftDown'];
        const direction1 = (leftDirection.includes(id1Data.type)) ? 0 : 1; //0 is left, 1 is right

        const id2 = currEdge.target;
        const id2Data = nodes.find((node) => node.id === id2);
        const label2 = id2Data.data.label;
        const position2 = id2Data.position;
        const direction2 = (leftDirection.includes(id2Data.type)) ? 0 : 1; //0 is left, 1 is right

        const pathName = `[${label1}]-[${label2}]`;
        
        const vertNodes = ['cameraTopRight', 'cameraBottomRight', 'cameraTopLeft', 'cameraBottomLeft'];
        const orientation = (vertNodes.includes(id1Data.type)) ? "vertical" : "horizontal";

        const pathObj = {
            pathName: pathName,
            orientation: orientation,
            id1: id1,
            label1: label1,
            direction1: direction1,
            position1: position1,
            id2: id2,
            label2: label2,
            direction2: direction2,
            position2: position2
        }

        pathsArray.push(pathObj);
    }

    return pathsArray;
};

const getNumOfDays = (filterMode, data) => {
    try {
        const numOfEntries = Object.keys(data[Object.keys(data)[0]]).length;
        switch (filterMode) {
            case "year":
                return numOfEntries * 365;
            case "month":
                return numOfEntries * 30;
            default:
                return numOfEntries;
        }
    } catch (err) {
        return NaN;
    }
};

// For spots
const getCountById = (id, data) => {
    try {
        const cameraIdData = data[id];
        const totalCounts = 
            Object.values(cameraIdData["left"]).concat(
            Object.values(cameraIdData["right"])
        );
        return totalCounts.reduce((acc, c) => acc + c, 0);
    } catch (err) {
        return NaN;
    }
};

// For paths
const getCountByIdAndDirection = (id, direction, data) => {
    try {
        const cameraIdData = data[id];
        const totalCounts = direction === 0 
            ? Object.values(cameraIdData["left"]) 
            : Object.values(cameraIdData["right"]);
        return totalCounts.reduce((acc, c) => acc + c, 0);
    } catch (err) {
        return NaN
    }
}

const populateSpotObjsWithCountLive = (spotObjs) => (
    spotObjs.map((obj) => {
        return ({
            ...obj,
            count: NaN
        })
    })
);

const populateSpotObjsWithCountAnalytics = (spotObjs, data, filterMode) => {
    const numOfDays = getNumOfDays(filterMode, data);

    return (
        spotObjs.map((obj) => {
            const count = getCountById(obj.id, data);

            return ({
                ...obj,
                count: Math.round(count / numOfDays)
            })
        }));
};

const populatePathObjsWithCountLive = (pathObjs) => (
    pathObjs.map((obj) => {
        return ({
            ...obj,
            count: NaN
        })
    })
);

const populatePathObjsWithCountAnalytics = (pathObjs, data, filterMode) => {
    const numOfDays = getNumOfDays(filterMode, data);

    return (
        pathObjs.map((obj) => {
            const count1 = getCountByIdAndDirection(obj.id1, obj.direction1, data);
            const count2 = getCountByIdAndDirection(obj.id2, obj.direction2, data);

            return ({
                ...obj,
                count: Math.round((count1 + count2) / numOfDays)
            })
        }));
};

// Top Right & Bottom Left
const getBoundingBox = (pathObj, scale, maxY) => {
    const shift = (30 * (scale / 50));
    const position1 = pathObj.position1;
    const position2 = pathObj.position2;
    let topRightX;
    let topRightY;
    let bottomLeftX;
    let bottomLeftY;

    // Check if vertical or Horizontal
    if (pathObj.orientation === "vertical") {
        // Check if node1 or node2 is top
        if (position1.y <= position2.y) { // node1 is on top
            topRightX = position1.x + shift;
            topRightY = position1.y;
            bottomLeftX = position2.x;
            bottomLeftY = position2.y + shift;

        } else { // node2 is on top
            topRightX = position2.x + shift;
            topRightY = position2.y;
            bottomLeftX = position1.x;
            bottomLeftY = position1.y + shift;
        }

    } else { // Horizontal
        // Check if node1 or node2 is left
        if (position1.x <= position2.x) { // node1 is left
            topRightX = position2.x + shift;
            topRightY = position2.y;
            bottomLeftX = position1.x;
            bottomLeftY = position1.y + shift;

        } else { // node2 is on left
            topRightX = position1.x + shift;
            topRightY = position1.y;
            bottomLeftX = position2.x;
            bottomLeftY = position2.y + shift;
        }
    }
    return [[flipYCoordinate(bottomLeftY, maxY), bottomLeftX], 
            [flipYCoordinate(topRightY, maxY), topRightX]];
};

const getAdjustedSpotCenter = (spotObj, scale, maxY) => {
    const shift = (30 * (scale / 50)) / 2;
    const adjustedX = spotObj.position.x + shift;
    const adjustedY = flipYCoordinate(spotObj.position.y + shift, maxY);
    return [adjustedY, adjustedX];
};

export { 
    Mode,
    getSpots,
    getPaths,
    populateSpotObjsWithCountLive,
    populateSpotObjsWithCountAnalytics,
    populatePathObjsWithCountLive,
    populatePathObjsWithCountAnalytics,
    getBoundingBox,
    getAdjustedSpotCenter
}
