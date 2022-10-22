export class FlowNodeObject {
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
        // this.type = 'camera';
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
        this.type = 'step';
    }
}