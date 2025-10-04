const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
`;

const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

export class GL {
    static canvas: HTMLCanvasElement;
    static gl: WebGLRenderingContext;
    static shaderProgram: WebGLProgram;
    static programInfo: any;

    static initialize(canvas: HTMLCanvasElement) {
        GL.canvas = canvas;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            alert("WebGL unable to load!");
            throw new Error("Failed to get WebGL context from canvas");
        }
        GL.gl = gl;

        GL.shaderProgram = GL.initializeShaderProgram();

        GL.programInfo = {
            program: GL.shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(GL.shaderProgram, "aVertexPosition"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(GL.shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(GL.shaderProgram, "uModelViewMatrix")
            }
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    private static initializeShaderProgram() {
        const gl = GL.gl;
        const vertexShader = GL.loadShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = GL.loadShader(gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            throw new Error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`)
        }

        return shaderProgram;
    }

    private static loadShader(type: GLenum, source: string) {
        const gl = GL.gl;
        const shader = gl.createShader(type);
        if (!shader) {
            throw new Error("Failed to create shader...");
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            throw new Error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        }

        return shader;
    }
}