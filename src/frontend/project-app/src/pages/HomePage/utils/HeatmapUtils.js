import { imageOverlay } from "leaflet";

const flipYCoordinate = (currY, maxY) => maxY - currY;

const scaleXCoordinate = (currX) => {
    if (currX === 0) {
        return currX
    }
    return currX/2
};

const scaleYCoordinate = (currY, src) => {
    let naturalHeight = 10;
    let naturalWidth = 10
    const img = new Image();
    img.src = src;
    img.onload = () => {
        naturalHeight = img.naturalHeight
        naturalWidth = img.naturalWidth
        }
    if (currY === 0) {
        return currY
    }
    const heatmapHeight = (naturalHeight/naturalWidth) * 400
    const configHeight = (naturalHeight/naturalWidth) * 800
    return currY * (heatmapHeight/configHeight)
};

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
        const test = Object.values(data)[0]
        const numOfEntries = Object.keys(Object.values(test)[0]).length;
        switch (filterMode) {
            case "year":
                return numOfEntries * 365;
            case "year_month":
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
        console.log("Total Spot count", totalCounts.reduce((a, b) => a + b, 0))
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
        console.log("Total Path count", totalCounts)
        return totalCounts.reduce((acc, c) => acc + c, 0);
    } catch (err) {
        return NaN
    }
}

const populateSpotObjsWithCountLive = (spotObjs, liveData) => (
    spotObjs.map((obj) => {
        const unfoldedData = Object.values(liveData).map(x => Object.values(x));
        let compiledData = [];
        for (let i = 0; i < unfoldedData.length; i ++) {
            compiledData = compiledData.concat(unfoldedData[i]);
        }
        const liveCount = compiledData.filter(x => x.camera_id === obj.id)
        .map(x => {
            return x.count
        })
        .reduce((acc, c) => acc + c, 0)
        return ({
            ...obj,
            count: liveCount
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

const populatePathObjsWithCountLive = (pathObjs, liveData) => (
    pathObjs.map((obj) => {
        const unfoldedData = Object.values(liveData).map(x => Object.values(x));
        let compiledData = [];
        for (let i = 0; i < unfoldedData.length; i ++) {
            compiledData = compiledData.concat(unfoldedData[i]);
        }
        const liveCount = compiledData.filter(x => {
            const dir1 = (obj.direction1 === 0) ? "left" : "right";
            const dir2 = (obj.direction2 === 0) ? "left" : "right";
            return (x.camera_id === obj.id1 && x.direction === dir1) || (x.camera_id === obj.id2 && x.direction === dir2) 
        })
        .map(x => {
            return x.count
        })
        .reduce((acc, c) => acc + c, 0)
        return ({
            ...obj,
            count: liveCount
        })
    })
);

const populatePathObjsWithCountAnalytics = (pathObjs, data, filterMode) => {
    const numOfDays = getNumOfDays(filterMode, data);

    return (
        pathObjs.map((obj) => {
            const count1 = getCountByIdAndDirection(obj.id1, obj.direction1, data);
            const count2 = getCountByIdAndDirection(obj.id2, obj.direction2, data);
            console.log("Path with counts", {
                ...obj,
                count: Math.round((count1 + count2) / numOfDays)
            })
            console.log("Count1, Count2", count1, count2, numOfDays)
            return ({
                ...obj,
                count: Math.round((count1 + count2) / numOfDays)
            })
        }));
};

// Top Right & Bottom Left
const getBoundingBox = (pathObj, scale, maxY, src) => {
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
    return [[flipYCoordinate(scaleYCoordinate(bottomLeftY, src), maxY), scaleXCoordinate(bottomLeftX)], 
            [flipYCoordinate(scaleYCoordinate(topRightY, src), maxY), scaleXCoordinate(topRightX)]];
};

const getAdjustedSpotCenter = (spotObj, scale, maxY, src) => {
    const shift = (30 * (scale / 50)) / 2;
    const adjustedX = spotObj.position.x + shift;
    const adjustedY = spotObj.position.y + shift;
    return [flipYCoordinate(scaleYCoordinate(adjustedY, src), maxY), scaleXCoordinate(adjustedX)];
};

const getSpotCenter = (spotObj, scale) => {
    const shift = (30 * (scale / 50)) / 2;
    const adjustedX = spotObj.position.x + shift;
    const adjustedY = spotObj.position.y + shift;
    return [-adjustedY, adjustedX]
}

const getOriginalBoundingBox = (pathObj, scale) => {
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
    return [[-bottomLeftY, bottomLeftX], 
            [-topRightY, topRightX]];
}

const getEmptyBounds = (pathObjs, spotObjs) => {
    console.log("HERE", pathObjs, spotObjs);
    if (pathObjs.length !== 0) {
        let minX = pathObjs[0][0][1];
        let maxX = pathObjs[0][0][1];
        let minY = pathObjs[0][0][0];
        let maxY = pathObjs[0][0][0];
    } else {
        let minX = spotObjs[0][1];
        let maxX = spotObjs[0][1];
        let minY = spotObjs[0][0];
        let maxY = spotObjs[0][0];
    }
    // paths
    for (let i = 1; i < pathObjs.length; i++) {
        minX = Math.min(minX, pathObjs[i][0][1], pathObjs[i][1][1]);
        minY = Math.min(minY, pathObjs[i][0][0], pathObjs[i][1][0]);
        maxX = Math.max(maxX, pathObjs[i][0][1], pathObjs[i][1][1]);
        maxY = Math.max(maxY, pathObjs[i][0][0], pathObjs[i][1][0]);
    }
    // spots
    for (let z = 0; z < pathObjs.length; z++) {
        minX = Math.min(minX, spotObjs[z][1]);
        minY = Math.min(minY, spotObjs[z][0]);
        maxX = Math.max(maxX, spotObjs[z][1]);
        maxY = Math.max(maxY, spotObjs[z][0]);
    }
    return [(maxY - minY)/2, (maxX-minX)/2]
}

export { 
    Mode,
    getSpots,
    getPaths,
    populateSpotObjsWithCountLive,
    populateSpotObjsWithCountAnalytics,
    populatePathObjsWithCountLive,
    populatePathObjsWithCountAnalytics,
    getBoundingBox,
    getAdjustedSpotCenter,
    getSpotCenter,
    getOriginalBoundingBox,
    getEmptyBounds
}
