/* Classes com implementação WebGL dos objetos gráficos */



// Avoid using. Too much resource use for a simple point
// Prefer use WebGLPointList
class WebGLPoint2d extends Point2d{
    constructor (gl,program,x,y,color,size = 1){
        super(x,y,color,size);
        this.gl = gl;
        this.program = program;
    }

    /* Retorna um modelo WebGL do objeto gráfico */
    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        var coords = [this.x,this.y,0.0];
        var indices = [0];
        var colors = [this.color.r,this.color.g,this.color.g];

        const webGLPoint2dModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coords,indices,colors,null,null,null);
        webGLPoint2dModel.set(attribShaderVariables,uniformShaderVariables);
        return webGLPoint2dModel;
    }
}


class WebGLPointList extends PointList{
    constructor (gl,program){
        super();
        this.gl = gl;
        this.program = program;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var indices = [];
        var colors = [];
        var i;
        for (i=0;i<this.list.length;i++){
            var p = this.list[i];
            coords.push(p.x);
            coords.push(p.y);
            coords.push(0.0);
            indices.push(i);
            colors.push(p.color.r);
            colors.push(p.color.g);
            colors.push(p.color.b);
        }
        

        const webGLPointListModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coords,indices,colors,null,null,null);
        webGLPointListModel.set(attribShaderVariables,uniformShaderVariables);
      
        return webGLPointListModel;
    }
}

class WebGLTriangle extends Triangle{
    constructor (gl,program,p0,p1,p2,c,interpolation){
        super(p0,p1,p2,c);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
        this.vertexes = [p0, p1, p2];
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        var coords = [this.p0.x,this.p0.y,0,
                      this.p1.x,this.p1.y,0,
                      this.p2.x,this.p2.y,0];
        
        var indices = [0,1,2]; 
        var colors;

        if (this.interpolation == true)
        {
            colors = [this.p0.color.r,this.p0.color.g,this.p0.color.b,
                      this.p1.color.r,this.p1.color.g,this.p1.color.b,
                      this.p2.color.r,this.p2.color.g,this.p2.color.b];
        }
        else{
            colors = [this.color.r,this.color.g,this.color.b,
                      this.color.r,this.color.g,this.color.b,
                      this.color.r,this.color.g,this.color.b];
        }    

        const webGLTriangleModel = new WebGLModel(this.gl,this.program,2,this.gl.TRIANGLES,coords,indices,colors,null,null,null, this.vertexes);
        webGLTriangleModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLTriangleModel;
    }
}

class WebGLTriangleList extends TriangleList{
    constructor (gl,program){
        super();
        this.gl = gl;
        this.program = program;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var indices = [];
        var colors = [];
        var i;
        for (i=0;i<this.list.length;i++){
            var t = this.list[i];
            coords.push(t.p0.x);
            coords.push(t.p0.y);
            coords.push(0);
            coords.push(t.p1.x);
            coords.push(t.p1.y);
            coords.push(0);
            coords.push(t.p2.x);
            coords.push(t.p2.y);
            coords.push(0);
            
            indices.push(3*i);
            indices.push(3*i+1);
            indices.push(3*i+2);

            if (this.interpolation == true)
                {
                    colors.push(t.p0.color.r);
                    colors.push(t.p0.color.g);
                    colors.push(t.p0.color.b);
                    colors.push(t.p1.color.r);
                    colors.push(t.p1.color.g);
                    colors.push(t.p1.color.b);
                    colors.push(t.p2.color.r);
                    colors.push(t.p2.color.g);
                    colors.push(t.p2.color.b);
                        }
                else{
                    colors.push(t.color.r);
                    colors.push(t.color.g);
                    colors.push(t.color.b);
                    colors.push(t.color.r);
                    colors.push(t.color.g);
                    colors.push(t.color.b);
                    colors.push(t.color.r);
                    colors.push(t.color.g);
                    colors.push(t.color.b);
            }


        }

        const webGLTriangleListModel = new WebGLModel(this.gl,this.program,2,this.gl.TRIANGLES,coords,indices,colors,null,null,null);
        webGLTriangleListModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLTriangleListModel;
    }
}

class WebGLRectangle extends Rectangle {
    constructor(gl, program, p0, height, width, c, interpolation) {
        super(p0, height, width, c);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
        this.vertexes = [
            p0,
            new Point2d(this.p0.x, this.p0.y - this.height, this.color),
            new Point2d(this.p0.x + this.width, this.p0.y - this.height, this.color),
            new Point2d(this.p0.x + this.width, this.p0.y, this.color)
        ];
    }

    getWebGLModel(attribShaderVariables = null, uniformShaderVariables = null) {
        var coords = [
            this.p0.x, this.p0.y, 0,
            this.p0.x, this.p0.y - this.height, 0,
            this.p0.x + this.width, this.p0.y - this.height, 0,
            this.p0.x + this.width, this.p0.y, 0
        ];

        var indices = [0, 1, 2, 2, 0, 3];
        var colors;

        if (this.interpolation == true) {
            colors = [
                this.p0.color.r, this.p0.color.g, this.p0.color.b,
                this.p0.color.r, this.p0.color.g, this.p0.color.b,
                this.p0.color.r, this.p0.color.g, this.p0.color.b,
                this.p0.color.r, this.p3.color.g, this.p0.color.b
            ];
        } else {
            colors = [
                this.color.r, this.color.g, this.color.b,
                this.color.r, this.color.g, this.color.b,
                this.color.r, this.color.g, this.color.b,
                this.color.r, this.color.g, this.color.b
            ];
        }

        const webGLRectangleModel = new WebGLModel(this.gl, this.program, 3, this.gl.TRIANGLES, coords, indices, colors, null, null, null, this.vertexes);
        webGLRectangleModel.set(attribShaderVariables, uniformShaderVariables);

        return webGLRectangleModel;
    }
}


class WebGLLine extends Line{
    constructor(gl,program,p0,p1,c,interpolation){
        super(p0,p1,c);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
        this.vertexes = [p0, p1];
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        var coords = [this.p0.x, this.p0.y,0,
                    this.p1.x, this.p1.y,0
        ];
        var indices = [0,1];
        var colors;

        if (this.interpolation == true)
        {
            colors = [this.p0.color.r,this.p0.color.g,this.p0.color.b,
                    this.p1.color.r,this.p1.color.g,this.p1.color.b,
                    ];
        }
        else{
            colors = [this.color.r,this.color.g,this.color.b,
                    this.color.r,this.color.g,this.color.b,
                    ];
        }

        const webGLLineModel = new WebGLModel(
            this.gl,this.program,2,this.gl.LINES,coords,indices,colors,null,null,null, this.vertexes
        );
        webGLLineModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLLineModel;
    }

}


class WebGLPolygon extends Polygon{
    constructor (gl,program,color,interpolation){
        super(color,interpolation);
        this.gl = gl;
        this.program = program;
    }

    sign(p1,p2,p3)
    {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    isInTriangle(p, p0, p1, p2){
        const A = 0.5 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y );
        const sinal = A < 0 ? -1 : 1;
        const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sinal;
        const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sinal;
        return s > 0 && t > 0 && (s + t) < 2*A*sinal;
    }

    isAnEar(poligono, i){
        var before = (i - 1 + poligono.length) % poligono.length;
        var after = (i + 1) % poligono.length;
        const p0 = poligono[before];
        const p1 = poligono[i];
        const p2 = poligono[after];

        const produto = -1 * (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
        console.log(produto);
        if (produto <= 0) return false;

        for (let j = 0; j < poligono.length; j++){
            if (j === i || j === before || j === after) continue;
            if (this.isInTriangle(poligono[j], p0, p1, p2)) return false;
        }

        return true;
    }

    triangulation(poligono){
        let triangles = [];
        let vertices = poligono.slice();

        while (vertices.length > 3){
            let earFound = false;
            for (let i = 0; i < vertices.length; i++){
                // console.log(this.isAnEar(vertices, i));
                if (this.isAnEar(vertices, i)){
                    var before = (i - 1 + vertices.length) % vertices.length;
                    var after = (i + 1) % vertices.length;
                    const p0 = vertices[before];
                    const p1 = vertices[i];
                    const p2 = vertices[after];
                    triangles.push([p0, p1, p2]);
                    vertices.splice(i, 1);
                    earFound = true;
                    break;
                }
            }
            if (!earFound) break;
        }

        triangles.push(vertices);
        return triangles;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        let coords = [];
        let indices = [];
        let colors = [];

        let poligono = [];
        for (let i = 0; i < this.pointList.size; i++){
            let p = this.pointList.list[i];
            poligono.push(p);
        }
        this.vertexes = poligono;

        let i = 0;
        let triangles = this.triangulation(poligono);
        for (let triangle of triangles){
            for (let vertex of triangle){
                coords.push(vertex.x);
                coords.push(vertex.y);
                coords.push(0.0);
                indices.push(i++);

                if (this.interpolation == true){
                    colors.push(this.color.r);
                    colors.push(this.color.g);
                    colors.push(this.color.b);
                }
                else{
                    colors.push(vertex.color.r);
                    colors.push(vertex.color.g);
                    colors.push(vertex.color.b);
                }
            }
            
        }


        const webGLPolygonModel = new WebGLModel(
            this.gl, this.program, 3, this.gl.TRIANGLES, coords, indices, colors, null, null, null, this.vertexes
        );
        webGLPolygonModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLPolygonModel;
    }
}


class WebGLCircle extends Circle {
    constructor(gl, program, cx, cy, radius, color, numSubdiv, filled, interpolation) {
        super(cx, cy, radius, color, numSubdiv);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
        this.filled = filled;
        this.vertexes = [];
    }

    getWebGLModel(attribShaderVariables = null, uniformShaderVariables = null) {
        var coords = [];
        var indices = [];
        var colors = [];
        var primitiveType;

        if (this.filled == true) {
            this.discreticizeFilled(this.numSubdiv, coords, indices, colors);
            primitiveType = this.gl.TRIANGLES;
        } else {
            this.discreticize(this.numSubdiv, coords, indices, colors);
            primitiveType = this.gl.LINE_LOOP;
        }

        // Initialize vertexes
        for (let i = 0; i < this.numSubdiv; i++) {
            const ang = 2 * Math.PI * i / this.numSubdiv;
            const x = this.radius * Math.cos(ang) + this.cx;
            const y = this.radius * Math.sin(ang) + this.cy;
            this.vertexes.push(new Point2d(x, y, this.color));
        }

        const webGLCircleModel = new WebGLModel(
            this.gl, this.program, 2, primitiveType, coords, indices, colors, null, null, null, this.vertexes
        );
        webGLCircleModel.set(attribShaderVariables, uniformShaderVariables);

        return webGLCircleModel;
    }
}


class WebGLElipse extends Elipse{
    constructor (gl,program,cx,cy,hRadius,vRadius,color,numSubdiv,filled,interpolation){
        super(cx,cy,hRadius,vRadius,color,numSubdiv);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
        this.filled = filled;
    
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var indices = [];
        var colors = [];
        var primitiveType;

        if (this.filled == true){
            this.discreticizeFilled(this.numSubdiv,coords,indices,colors);
            primitiveType = this.gl.TRIANGLES;
        }
        else{
            this.discreticize(this.numSubdiv,coords,indices,colors);
            primitiveType = this.gl.LINE_LOOP;
        }
 
        const webGLElipseModel = new WebGLModel(
            this.gl,this.program,2,primitiveType,coords,indices,colors,null,null,null, this.vertexes
        );
        webGLElipseModel.set(attribShaderVariables,uniformShaderVariables);


        return webGLElipseModel;
    }
}


class WebGLBezier extends Bezier{
    constructor (gl,program,color,controlPoints,degree,nDiv,filled = false, interpolation = false){
        super(controlPoints,degree,color);
        this.gl = gl;
        this.program = program;
        this.nDiv = nDiv;
        this.filled = filled;
        this.interpolation = interpolation;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var colors = [];
        var indices = [];
        var indicesEdges = [];
        var coordsPol = [];
        var colorsPol = [];
        var indicesPol = [];
        var indicesEdgesPol = [];
        
        this.discreticize(this.nDiv,coords,colors,indices,indicesEdges,coordsPol,colorsPol,indicesPol,indicesEdgesPol);
      
        const webGLBezierControlPointsModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coordsPol,indicesPol,colorsPol,null,null,null);
        webGLBezierControlPointsModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBezierControlPointsEdgesModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coordsPol,indicesEdgesPol,colorsPol,null,null,null);
        webGLBezierControlPointsEdgesModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBezierModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coords,indicesEdges,colors,null,null,null);
        webGLBezierModel.set(attribShaderVariables,uniformShaderVariables);

        return [webGLBezierControlPointsModel,webGLBezierControlPointsEdgesModel,webGLBezierModel];
    }
}

class WebGLBSpline extends BSpline{
    constructor (gl,program,color,controlPoints,knots,degree,nDiv,filled = false, interpolation = false){
        super(controlPoints,knots,degree,color);
        this.gl = gl;
        this.program = program;
        this.nDiv = nDiv;
        this.filled = filled;
        this.interpolation = interpolation;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var colors = [];
        var indices = [];
        var indicesEdges = [];
        var coordsPol = [];
        var colorsPol = [];
        var indicesPol = [];
        var indicesEdgesPol = [];
        
        this.discreticize(this.nDiv,coords,colors,indices,indicesEdges,coordsPol,colorsPol,indicesPol,indicesEdgesPol);
      
        const webGLBSplineControlPointsModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coordsPol,indicesPol,colorsPol,null,null,null);
        webGLBSplineControlPointsModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBSplineControlPointsEdgesModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coordsPol,indicesEdgesPol,colorsPol,null,null,null);
        webGLBSplineControlPointsEdgesModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBSplineModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coords,indicesEdges,colors,null,null,null);
        webGLBSplineModel.set(attribShaderVariables,uniformShaderVariables);

        return [webGLBSplineControlPointsModel,webGLBSplineControlPointsEdgesModel,webGLBSplineModel];
    }
}

class WebGLAngeling {
    constructor(gl, program) {
        this.gl = gl;
        this.program = program;
        this.shapes = [];
        this.initShapes();
    }

    initShapes() {
        const bodyColor = new Color(1.0, 0.6, 0.6, 1.0); 
        const eyeColor = new Color(0.0, 0.0, 0.0, 1.0); 
        const haloColor = new Color(1.0, 1.0, 0.0, 1.0); 
        const mouthColor = new Color(0.0, 0.0, 0.0, 1.0); 

        // Body (circle)
        const body = new WebGLCircle(this.gl, this.program, 0.0, 0.0, 0.3, bodyColor, 32, true);
        this.shapes.push(body);

        // Eyes (circles)
        const leftEye = new WebGLCircle(this.gl, this.program, -0.1, 0.1, 0.05, eyeColor, 32, true);
        const rightEye = new WebGLCircle(this.gl, this.program, 0.1, 0.1, 0.05, eyeColor, 32, true);
        this.shapes.push(leftEye, rightEye);

        // Halo (circle)
        const halo = new WebGLCircle(this.gl, this.program, 0.0, 0.40, 0.2, haloColor, 32, false);
        this.shapes.push(halo);

        // Mouth (lower halves of two circles, smaller and higher)
        const mouthLeftArc = new WebGLArc(this.gl, this.program, -0.07, -0.05, 0.07, Math.PI, 2 * Math.PI, mouthColor, 32);
        const mouthRightArc = new WebGLArc(this.gl, this.program, 0.07, -0.05, 0.07, Math.PI, 2 * Math.PI, mouthColor, 32);
        this.shapes.push(mouthLeftArc, mouthRightArc);
    }

    getWebGLModel() {
        return this.shapes.map(shape => shape.getWebGLModel());
    }
}

class WebGLArc extends Shape2d {
    constructor(gl, program, cx, cy, radius, startAngle, endAngle, color, numSubdiv) {
        super(color);
        this.gl = gl;
        this.program = program;
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.numSubdiv = numSubdiv;
        this.initModel();
    }

    evaluate(ang) {
        const x = this.radius * Math.cos(ang) + this.cx;
        const y = this.radius * Math.sin(ang) + this.cy;
        return [x, y];
    }

    initModel() {
        const delta = (this.endAngle - this.startAngle) / this.numSubdiv;
        const coords = [];
        const indices = [];
        const colors = [];

        for (let i = 0; i <= this.numSubdiv; i++) {
            const ang = this.startAngle + i * delta;
            const [x, y] = this.evaluate(ang);
            coords.push(x, y, 0.0);
            colors.push(this.color.r, this.color.g, this.color.b);
            indices.push(i);
            this.vertexes.push(new Point2d(x, y, this.color));
        }

        this.model = new WebGLModel(
            this.gl, this.program, 3, this.gl.LINE_STRIP, coords, indices, colors, null, null, null, this.vertexes
        );
        this.model.initBuffers();
    }

    getWebGLModel() {
        return this.model;
    }

    draw() {
        this.model.draw();
    }
}


class WebGLAngelWing {
    constructor(gl, program, offsetX, offsetY, mirror = false) {
        this.gl = gl;
        this.program = program;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.mirror = mirror;
        this.shapes = [];
        this.initShapes();
    }

    initShapes() {
        const c0 = new Color(1.0, 0.9, 0.8); // Light color for the wing

        // Main wing structure
        const mainEllipses = [
            new WebGLElipse(this.gl, this.program, this.mirror ? this.offsetX + 0.2 : this.offsetX - 0.2, this.offsetY + 0.5, 0.15, 0.3, c0, 32, true),
            new WebGLElipse(this.gl, this.program, this.mirror ? this.offsetX + 0.1 : this.offsetX - 0.1, this.offsetY + 0.3, 0.12, 0.25, c0, 32, true),
            new WebGLElipse(this.gl, this.program, this.offsetX, this.offsetY + 0.1, 0.1, 0.2, c0, 32, true)
        ];

        // Feathers
        const featherCircles = [
            new WebGLCircle(this.gl, this.program, this.mirror ? this.offsetX + 0.3 : this.offsetX - 0.3, this.offsetY + 0.4, 0.05, c0, 32, true),
            new WebGLCircle(this.gl, this.program, this.mirror ? this.offsetX + 0.2 : this.offsetX - 0.2, this.offsetY + 0.3, 0.04, c0, 32, true),
            new WebGLCircle(this.gl, this.program, this.mirror ? this.offsetX + 0.1 : this.offsetX - 0.1, this.offsetY + 0.2, 0.03, c0, 32, true),
            new WebGLCircle(this.gl, this.program, this.offsetX, this.offsetY, 0.02, c0, 32, true)
        ];

        // Connectors (lines)
        const connectors = [
            new WebGLLine(this.gl, this.program, new Point2d(this.mirror ? this.offsetX + 0.3 : this.offsetX - 0.3, this.offsetY + 0.4, c0), new Point2d(this.mirror ? this.offsetX + 0.2 : this.offsetX - 0.2, this.offsetY + 0.5, c0), c0, false),
            new WebGLLine(this.gl, this.program, new Point2d(this.mirror ? this.offsetX + 0.2 : this.offsetX - 0.2, this.offsetY + 0.3, c0), new Point2d(this.mirror ? this.offsetX + 0.1 : this.offsetX - 0.1, this.offsetY + 0.4, c0), c0, false),
            new WebGLLine(this.gl, this.program, new Point2d(this.mirror ? this.offsetX + 0.1 : this.offsetX - 0.1, this.offsetY + 0.2, c0), new Point2d(this.offsetX, this.offsetY + 0.3, c0), c0, false),
        ];

        // this.shapes.push(...mainEllipses);
        this.shapes.push(...mainEllipses, ...featherCircles, ...connectors);
    }

    getWebGLModel() {
        return this.shapes.map(shape => shape.getWebGLModel());
    }
}

