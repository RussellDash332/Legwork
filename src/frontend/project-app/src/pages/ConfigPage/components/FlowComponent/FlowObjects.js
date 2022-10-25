export class CameraNodeObject {
    /**
     * Flow Node Constructor
     * @param {String} id 
     * @param {String} nodeLabel 
     * @param {Integer} nodeX 
     * @param {Integer} nodeY 
     */
    constructor(id, nodeLabel, nodeX, nodeY) {
        this.id = id;
        this.data = { label: nodeLabel };
        this.position = { x: nodeX, y: nodeY };
        this.conntectable = false;
        this.type = 'camera';
        this.zIndex = 2;
    };
}

export class CameraTopNodeObject {
    /**
     * Flow Node Constructor
     * @param {String} id 
     * @param {String} nodeLabel 
     * @param {Integer} nodeX 
     * @param {Integer} nodeY 
     */
    constructor(id, nodeLabel, nodeX, nodeY) {
        this.id = id;
        this.data = { label: nodeLabel };
        this.position = { x: nodeX, y: nodeY };
        this.conntectable = false;
        this.type = 'cameraTopRight';
        this.zIndex = 2;
    };
}

export class CameraBottomNodeObject {
    /**
     * Flow Node Constructor
     * @param {String} id 
     * @param {String} nodeLabel 
     * @param {Integer} nodeX 
     * @param {Integer} nodeY 
     */
    constructor(id, nodeLabel, nodeX, nodeY) {
        this.id = id;
        this.data = { label: nodeLabel };
        this.position = { x: nodeX, y: nodeY };
        this.conntectable = false;
        this.type = 'cameraBottomRight';
        this.zIndex = 2;
    };
}

export class ImageNodeObject {
    /**
     * Flow Node Constructor
     */
    constructor(url) {
        this.id = "floorplan";
        this.data = { label: "floorplan", data_url: url};
        this.position = { x: 0, y: 0 };
        this.conntectable = false;
        this.selectable = false;
        this.draggable = false;
        this.type = 'image';
        this.zIndex = 1;
    };
}

export class FlowEdgeObject {
    /**
     * Flow Edge Constructor
     * @param {String} source 
     * @param {String} target 
     */
    constructor(source, target) {
        this.id = 'e' + source + '-' + target;
        this.source = source;
        this.target = target;
        this.type = 'buttonEdge';
        this.zIndex = 2;
    }
}