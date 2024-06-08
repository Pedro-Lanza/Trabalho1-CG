/*Esta classe descreve um modelo WebGL contendo os dados que devem ser passados da CPU para a GPU*/
/*A classe mantem uma referência para o contexto gl e para o program shader */

class WebGLModel{
    constructor(gl,program,dim,primitiveType,coords,indices,colors,normals,tangents,textureCoords, vertexes = null){
        this.gl = gl;
        this.program = program;
        this.vertexes = vertexes;
        this.dim = dim;
        this.primitiveType = primitiveType; 
        this.coords = coords; // Dados das coordenadas em CPU
        this.indices = indices; // Dados dos indices em CPU
        this.colors = colors; // Dados das cores em CPU
        this.normals = normals; // Dados das normais em CPU
        this.tangents = tangents; // Dados dos vetores tangente em CPU
        this.textureCoords = textureCoords; // Dados de coordenadas de texture em CPU
        this.VAO = null; // VAO
        this.coordsVBO = null; // Buffer de coordenadas
        this.colorsVBO = null; // Buffer de cores
        this.normalsVBO = null; // Buffer de vetores normais
        this.tangentsVBO = null; // Buffer de vetores tangentes
        this.textureCoordsVBO = null; // Buffer de coordenadas de textura
        this.IBO = null; // Buffer de indices
    }

    useProgram(){
        this.gl.useProgram(this.program); // Habilita o shader
    }

    /* Inicializa of buffers. Somente foram implementados os buffers de coordenadas, cores e indices */
    initBuffers(){
        // Create VAO
        this.VAO = this.gl.createVertexArray();

        // Bind VAO
        this.gl.bindVertexArray(this.VAO);

        //Create all VBOs
        this.coordsVBO = this.gl.createBuffer(); //VBO para as coordenadas
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordsVBO); // Ativar o buffer criado. Ele VBO ativo no momento atual
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coords), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.program.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.program.aVertexPosition);

        //Passo 3
        this.colorsVBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colors), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.program.aVertexColor, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.program.aVertexColor);
      
        //Passo 4
        this.IBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);


        // Clean
        this.gl.bindVertexArray(null);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

    }

    /* Metodo auxiliar que inicializa os buffers e o program shader */
    set(attribShaderVariables,uniformShaderVariables){
        this.initBuffers();
        this.useProgram();
    }


    setProgramUniformShaderVariablesValues(program,variables){
        if (variables == null) return;
        var v;
        for (v in variables){
            var type = variables[v][0];

            if (type==="1i"){
                this.gl.uniform1i(program[v],variables[v][1]);
            }
            else if (type === "2i"){
                this.gl.uniform2i(program[v],variables[v][1],variables[v][2]);
            }
            else if (type === "3i"){
                this.gl.uniform3i(program[v],variables[v][1],variables[v][2],variables[v][3]);
            }
            else if (type === "4i"){
                this.gl.uniform4i(program[v],variables[v][1],variables[v][2],variables[v][3],variables[v][4]);
            }
            else if (type ==="1f"){
                this.gl.uniform1f(program[v],variables[v][1]);
            }
            else if (type === "2f"){
                this.gl.uniform2f(program[v],variables[v][1],variables[v][2]);
            }
            else if (type === "3f"){
                this.gl.uniform3f(program[v],variables[v][1],variables[v][2],variables[v][3]);
            }
            else if (type === "4f"){
                this.gl.uniform3f(program[v],variables[v][1],variables[v][2],variables[v][3],variables[v][4]);
            }
            else if (type === "mat2"){
                this.gl.uniformMatrix2fv(program[v],variables[v][1],variables[v][2]);
            }
            else if (type === "mat3"){
                this.gl.uniformMatrix3fv(program[v],variables[v][1],variables[v][2]);
            }
            else if (type === "mat4"){
                this.gl.uniformMatrix4fv(program[v],variables[v][1],variables[v][2]);
            }
        }
    }

    setCenter(program, x, y){
        const centerLocation = this.gl.getUniformLocation(program, "aShapeCenter");
        this.gl.uniform3f(centerLocation,x, y, 0.0);
    }


    rotationMatrix(angle = 0){
        angle = angle * (Math.PI/180);

        return [ Math.cos(angle), Math.sin(angle), 0.0, 0.0,
                -Math.sin(angle), Math.cos(angle), 0.0, 0.0,
                0.0,              0.0,             1.0, 0.0,
                0.0,              0.0,             0.0, 1.0
               ];
      }

      setRotation(angle = 0, vertexes = []){
        const uniformShaderVariablesValues = {
          "uVertexPointSize":["1f",16.0],
          "uModelViewMatrix":["mat4",false,this.rotationMatrix(angle)]
        };

        let x = 0, y = 0;
        for (let i = 0; i < vertexes.length; i++){
          x += vertexes[i].x;
          y += vertexes[i].y;
          // console.log("x: " + vertexes[i].x + ", y: "+vertexes[i].y );
        }

        // console.log("x: " + x + ", y: "+y );
        x = x/vertexes.length;
        y = y/vertexes.length;
        // console.log("x: " + x + ", y: "+y );

        this.setCenter(this.program, x, y);

        this.setProgramUniformShaderVariablesValues(this.program,uniformShaderVariablesValues);
      }





    /* Desenha o model */
    draw(angle = 0){

        this.setRotation(angle, this.vertexes);
 
        // Bind VAO
        this.gl.bindVertexArray(this.VAO);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        this.gl.drawElements(this.primitiveType, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  
        

        // Clean
        this.gl.bindVertexArray(null);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }
}