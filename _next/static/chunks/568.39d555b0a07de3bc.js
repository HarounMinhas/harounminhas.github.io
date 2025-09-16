"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[568],{756:function(e,t,r){r.d(t,{jl:function(){return function e(t,r){if(!(t in a)||null!=r){let e=function(e,t){if(1!==e&&2!==e)throw Error("Cannot get WebGL rendering context, WebGL is disabled.");let r=null==t?function(e){if(!(0,n.env)().getBool("IS_SAFARI")&&"undefined"!=typeof OffscreenCanvas&&2===e)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw Error("Cannot create a canvas in this context")}(e):t;return(r.addEventListener("webglcontextlost",t=>{t.preventDefault(),delete a[e]},!1),(0,n.env)().getBool("SOFTWARE_WEBGL_ENABLED")&&(i.failIfMajorPerformanceCaveat=!1),1===e)?r.getContext("webgl",i)||r.getContext("experimental-webgl",i):r.getContext("webgl2",i)}(t,r);if(null===e)return console.log("Could not get context for WebGL version",t),null;a[t]=e}let o=a[t];return null==o||o.isContextLost()?(delete a[t],e(t)):(o.disable(o.DEPTH_TEST),o.disable(o.STENCIL_TEST),o.disable(o.BLEND),o.disable(o.DITHER),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SAMPLE_COVERAGE),o.enable(o.SCISSOR_TEST),o.enable(o.CULL_FACE),o.cullFace(o.BACK),a[t])}},nd:function(){return o}});var n=r(9094);let a={},i={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function o(e,t){a[e]=t}},7615:function(e,t,r){r.d(t,{_:function(){return s}});var n=r(3821),a=r(943),i=r(445),o=r(7275);class s{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=o.m1.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?i.Kn(["r","c","d"],e):i.RW(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${t.output} = result;
      }
    `}}},7325:function(e,t,r){r.d(t,{G:function(){return s}});var n=r(3821),a=r(943),i=r(445),o=r(7275);class s{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=o.m1.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?i.Kn(["r","c","d"],e):i.RW(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${t.output} = result;
      }
    `}}},1206:function(e,t,r){r.d(t,{q:function(){return o}});var n=r(3821),a=r(445),i=r(7275);class o{constructor(e){this.variableNames=["A"],this.outTexUsage=i.v2.DOWNLOAD;let t=(0,n.A)();this.outputShape=e,this.userCode=`
      ${a.ye}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}}},8840:function(e,t,r){r.d(t,{d:function(){return o}});var n=r(3821),a=r(445),i=r(7275);class o{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=i.v2.DOWNLOAD;let t=(0,n.A)();this.outputShape=e,this.userCode=`
      ${a.ye}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}}},8155:function(e,t,r){r.d(t,{F:function(){return s}});var n=r(3821),a=r(943),i=r(445);let o={R:0,G:1,B:2,A:3};class s{constructor(e,t=!1,r="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let s=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length);let l="result";t&&(l="floor(result * 255. + 0.5)");let u="";for(let e=0;e<r.length;e++){let t=r[e];u+=`
          if(offset == ${e}) {
            result = values[${o[t]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?i.nc():i.ku(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${r.length});

        flatIndex = idiv(flatIndex, ${r.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${s.texture2D}(A, uv);
          ${u}
        }
        ${s.output} = vec4(${l}, 0., 0., 0.);
      }
    `}}},6545:function(e,t,r){r.d(t,{Z:function(){return o}});var n=r(3821),a=r(943),i=r(445);class o{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let r=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length);let o="",s="result";t&&(s="floor(result * 255. + 0.5)");for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){let a=2*t+n;o+=`
          localCoords = coords;
          if(localCoords[2] + ${n} < ${this.enableShapeUniforms?"outShape[2]":`${e[2]}`}) {
          localCoords[2] += ${n};
          if (localCoords[1] + ${t} < ${this.enableShapeUniforms?"outShape[1]":`${e[1]}`}) {
            localCoords[1] += ${t};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${r.texture2D}(A, uv);

            if (offset == 0) {
              result[${a}] = values[0];
            } else if (offset == 1) {
              result[${a}] = values[1];
            } else if (offset == 2) {
              result[${a}] = values[2];
            } else {
              result[${a}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?i.nc():i.ku(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${o}

          ${r.output} = ${s};
        }
    `}}},2156:function(e,t,r){var n=r(9094),a=r(3326);let i=(0,n.env)();i.registerFlag("HAS_WEBGL",()=>i.getNumber("WEBGL_VERSION")>0),i.registerFlag("WEBGL_VERSION",()=>(0,a.isWebGLVersionEnabled)(2)?2:(0,a.isWebGLVersionEnabled)(1)?1:0),i.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),i.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>2===i.get("WEBGL_VERSION")),i.registerFlag("WEBGL_CPU_FORWARD",()=>!0),i.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),i.registerFlag("WEBGL_PACK",()=>i.getBool("HAS_WEBGL")),i.registerFlag("WEBGL_PACK_NORMALIZATION",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_CLIP",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_REDUCE",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_LAZILY_UNPACK",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_CONV_IM2COL",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>(0,a.getWebGLMaxTextureSize)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>(0,a.getMaxTexturesInShader)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let e=i.getNumber("WEBGL_VERSION");return 0===e?0:(0,a.getWebGLDisjointQueryTimerVersion)(e)}),i.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>i.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!n.device_util.isMobile()),i.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>(0,a.isCapableOfRenderingToFloatTexture)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>!i.getBool("WEBGL_FORCE_F16_TEXTURES")&&i.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),i.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>(0,a.isDownloadFloatTextureEnabled)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_FENCE_API_ENABLED",()=>(0,a.isWebGLFenceEnabled)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>i.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0),i.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),i.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>n.device_util.isMobile()?1:-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)}),i.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128),i.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1),i.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5),i.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128),i.registerFlag("WEBGL_EXP_CONV",()=>!1),i.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>i.getBool("IS_TEST")),i.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0),i.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1),i.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1),i.registerFlag("ENGINE_COMPILE_ONLY",()=>!1)},3821:function(e,t,r){r.d(t,{A:function(){return a}});var n=r(9094);function a(){let e,t,r,a,i,o,s,l,u,d;return 2===(0,n.env)().getNumber("WEBGL_VERSION")?(e="#version 300 es",t="in",r="out",a="in",i="texture",o="outputColor",s="out vec4 outputColor;",l=(0,n.env)().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",u="",d=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(e="",t="attribute",r="varying",a="varying",i="texture2D",o="gl_FragColor",s="",l=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,d=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:r,varyingFs:a,texture2D:i,output:o,defineOutput:s,defineSpecialNaN:l,defineSpecialInf:u,defineRound:d}}},7394:function(e,t,r){r.d(t,{A:function(){return l}});var n=r(9094),a=r(756),i=r(8657),o=r(7275),s=r(3326);class l{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=(0,n.env)().getNumber("WEBGL_VERSION");if(null!=e?(this.gl=e,(0,a.nd)(t,e)):this.gl=(0,a.jl)(t),e=this.gl,2===(0,n.env)().getNumber("WEBGL_VERSION")){let t=e;this.createVertexArray=()=>s.callAndCheck(t,()=>t.createVertexArray()),this.bindVertexArray=e=>s.callAndCheck(t,()=>t.bindVertexArray(e)),this.deleteVertexArray=e=>s.callAndCheck(t,()=>t.deleteVertexArray(e)),this.getVertexArray=()=>s.callAndCheck(t,()=>t.getParameter(t.VERTEX_ARRAY_BINDING))}else if(null!=e){let t=e.getExtension("OES_vertex_array_object");if(null==t)throw Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>s.callAndCheck(e,()=>t.createVertexArrayOES()),this.bindVertexArray=r=>s.callAndCheck(e,()=>t.bindVertexArrayOES(r)),this.deleteVertexArray=r=>s.callAndCheck(e,()=>t.deleteVertexArrayOES(r)),this.getVertexArray=()=>s.callAndCheck(e,()=>e.getParameter(t.VERTEX_ARRAY_BINDING_OES))}let r="WEBGL_color_buffer_float",l="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),1===(0,n.env)().getNumber("WEBGL_VERSION")){let e="OES_texture_half_float";if(this.textureFloatExtension=s.getExtensionOrThrow(this.gl,"OES_texture_float"),s.hasExtension(this.gl,e))this.textureHalfFloatExtension=s.getExtensionOrThrow(this.gl,e);else if((0,n.env)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(r),s.hasExtension(this.gl,l))this.colorBufferHalfFloatExtension=s.getExtensionOrThrow(this.gl,l);else if((0,n.env)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(r="EXT_color_buffer_float",s.hasExtension(this.gl,r))this.colorBufferFloatExtension=this.gl.getExtension(r);else if(s.hasExtension(this.gl,l))this.colorBufferHalfFloatExtension=this.gl.getExtension(l);else throw Error("GL context does not support color renderable floats");this.vertexBuffer=i.createVertexBuffer(this.gl),this.indexBuffer=i.createIndexBuffer(this.gl),this.framebuffer=s.createFramebuffer(this.gl),this.textureConfig=o.Sq(this.gl,this.textureHalfFloatExtension)}get debug(){return(0,n.env)().getBool("DEBUG")}dispose(){if(this.disposed)return;null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let e=this.gl;s.callAndCheck(e,()=>e.finish()),s.callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),s.callAndCheck(e,()=>e.deleteFramebuffer(this.framebuffer)),s.callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),s.callAndCheck(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),s.callAndCheck(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),i.createFloat32MatrixTexture(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),i.createFloat16MatrixTexture(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),i.createUnsignedBytesMatrixTexture(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),i.uploadPixelDataToTexture(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,r,n){this.throwIfDisposed(),i.uploadDenseMatrixToTexture(this.gl,e,t,r,n,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),i.createFloat16PackedMatrixTexture(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),i.createPackedMatrixTexture(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(s.unbindColorTextureFromFramebuffer(this.gl,this.framebuffer),this.outputTexture=null),s.callAndCheck(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r){return this.downloadMatrixDriver(e,()=>i.downloadByteEncodedFloatMatrixFromOutputTexture(this.gl,t,r,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,r,n,a,o){return i.downloadPackedMatrixFromBuffer(this.gl,e,t,r,n,a,o,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return i.downloadFloat32MatrixFromBuffer(this.gl,e,t)}createBufferFromTexture(e,t,r){this.bindTextureToFrameBuffer(e);let n=i.createBufferFromOutputTexture(this.gl,t,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r;if((0,n.env)().getBool("WEBGL_FENCE_API_ENABLED")){let n=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),r=()=>{let t=e.clientWaitSync(n,0,0);return t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED},t=n}else(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),r=()=>this.isQueryAvailable(t,(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):r=()=>!0;return{query:t,isFencePassed:r}}downloadMatrixFromPackedTexture(e,t,r){return this.downloadMatrixDriver(e,()=>i.downloadMatrixFromPackedOutputTexture(this.gl,t,r))}createProgram(e){this.throwIfDisposed();let t=this.gl;null==this.vertexShader&&(this.vertexShader=i.createVertexShader(t));let r=s.createProgram(t);s.callAndCheck(t,()=>t.attachShader(r,this.vertexShader)),s.callAndCheck(t,()=>t.attachShader(r,e)),s.linkProgram(t,r);let n=Object.assign(r,{vao:this.createVertexArray()});return this.debug&&s.validateProgram(t,n),n}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;s.callAndCheck(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),i.bindVertexProgramAttributeStreams(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),null!=e&&(s.callAndCheck(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,null!=this.program&&this.debug&&s.validateProgram(this.gl,this.program),s.callAndCheck(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,r=!0){return(this.throwIfDisposed(),r)?s.getProgramUniformLocationOrThrow(this.gl,e,t):s.getProgramUniformLocation(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,r){this.throwIfDisposed(),this.throwIfNoProgram(),s.bindTextureToProgramUniformSampler(this.gl,e,t,r)}setOutputMatrixTexture(e,t,r){this.setOutputMatrixTextureDriver(e,r,t)}setOutputPackedMatrixTexture(e,t,r){this.throwIfDisposed();let[n,a]=o.qe(t,r);this.setOutputMatrixTextureDriver(e,n,a)}setOutputMatrixWriteRegion(e,t,r,n){this.setOutputMatrixWriteRegionDriver(r,e,n,t)}setOutputPackedMatrixWriteRegion(e,t,r,n){throw Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){null!=this.program&&s.validateProgram(this.gl,this.program),s.validateFramebuffer(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;this.debug&&(console.assert(this.getVertexArray()===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()),s.callAndCheck(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=s.getExtensionOrThrow(this.gl,2===(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(2===(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2(),r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(2===(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2();e.endQuery(t.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await n.util.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,(0,n.env)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(0===t)return null;if(2===t){let t=this.gl;return t.getQueryParameter(e,t.QUERY_RESULT)/1e6}{let t=this.getQueryTimerExtensionWebGL1();return t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(0===t)return!0;if(2===t){let t=this.gl,r=this.getQueryTimerExtensionWebGL2(),n=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),n&&!this.disjoint}{let t=this.getQueryTimerExtensionWebGL1(),r=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),r&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=function(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){let r;this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||("setTimeoutCustom"in(0,n.env)().platform&&(r=(0,n.env)().platform.setTimeoutCustom.bind((0,n.env)().platform)),n.util.repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length),()=>0,null,r))}bindTextureToFrameBuffer(e){this.throwIfDisposed(),s.bindColorTextureToFramebuffer(this.gl,e,this.framebuffer),this.debug&&s.validateFramebuffer(this.gl)}unbindTextureToFrameBuffer(){null!=this.outputTexture?(s.bindColorTextureToFramebuffer(this.gl,this.outputTexture,this.framebuffer),this.debug&&s.validateFramebuffer(this.gl)):s.unbindColorTextureFromFramebuffer(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let r=t();return this.unbindTextureToFrameBuffer(),r}setOutputMatrixTextureDriver(e,t,r){this.throwIfDisposed();let n=this.gl;s.bindColorTextureToFramebuffer(n,e,this.framebuffer),this.debug&&s.validateFramebuffer(n),this.outputTexture=e,s.callAndCheck(n,()=>n.viewport(0,0,t,r)),s.callAndCheck(n,()=>n.scissor(0,0,t,r))}setOutputMatrixWriteRegionDriver(e,t,r,n){this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.scissor(e,t,r,n))}throwIfDisposed(){if(this.disposed)throw Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(null==this.program)throw Error("No GPU program is currently set.")}}},943:function(e,t,r){r.d(t,{C9:function(){return c},IJ:function(){return o},Yv:function(){return s},_s:function(){return u},mi:function(){return d}});var n=r(9094),a=r(9201),i=r(3326);function o(e,t,r,o){let l=r.map((e,r)=>{let n={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0&&(n.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[r],shapeInfo:n}}),u=l.map(e=>e.shapeInfo),d={logicalShape:o.shape,texShape:o.texData.texShape,isUniform:!1,isPacked:o.texData.isPacked,flatOffset:null},c=a.Vm(l,d,t),p=(0,i.createFragmentShader)(e.gl,c),h=e.createProgram(p);return(0,n.env)().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:p,source:c,webGLProgram:h,inShapeInfos:u,outShapeInfo:d,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(e.buildVao(h),Object.assign({program:t,fragmentShader:p,source:c,webGLProgram:h,inShapeInfos:u,outShapeInfo:d},s(e,t,h)))}function s(e,t,r){let a,i,o;let s=[],l=[],u=null,d=null;for(let a of(d=e.getUniformLocation(r,"NAN",!1),1===(0,n.env)().getNumber("WEBGL_VERSION")&&(u=e.getUniformLocation(r,"INFINITY",!1)),t.variableNames)){let n={name:a,uniform:e.getUniformLocation(r,a,!1),offset:e.getUniformLocation(r,`offset${a}`,!1)};t.enableShapeUniforms&&(n.shape=e.getUniformLocation(r,`${a}Shape`,!1),n.texShape=e.getUniformLocation(r,`${a}TexShape`,!1)),s.push(n)}if(t.enableShapeUniforms&&(a=e.getUniformLocation(r,"outShape",!1),o=e.getUniformLocation(r,"outShapeStrides",!1),i=e.getUniformLocation(r,"outTexShape",!1)),t.customUniforms)for(let n of t.customUniforms)l.push(e.getUniformLocation(r,n.name,!1));return{variablesLocations:s,customUniformLocations:l,infLoc:u,nanLoc:d,outShapeLocation:a,outShapeStridesLocation:o,outTexShapeLocation:i}}function l(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,r)=>{let a=e.logicalShape,i=t[r],o=i.shape;if(!n.util.arraysEqual(a,o))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${a} and ${o} must match`);if(e.isUniform&&i.isUniform)return;let s=e.texShape,l=i.isUniform?null:i.texData.texShape;if(!n.util.arraysEqual(s,l))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${s} and ${l} must match`)})}function u(e,t,r,i,o){t.program.enableShapeUniforms||(l(t.inShapeInfos,r),l([t.outShapeInfo],[i]));let s=i.texData.texture,u=i.texData.texShape;i.texData.isPacked?e.setOutputPackedMatrixTexture(s.texture,u[0],u[1]):e.setOutputMatrixTexture(s.texture,u[0],u[1]),e.setProgram(t.webGLProgram),e.bindVertexArray(t.webGLProgram.vao),1===(0,n.env)().getNumber("WEBGL_VERSION")&&null!==t.infLoc&&e.gl.uniform1f(t.infLoc,1/0),null!==t.nanLoc&&e.gl.uniform1f(t.nanLoc,NaN);for(let i=0;i<r.length;++i){let o=r[i],{uniform:s,offset:l,shape:u,texShape:d}=t.variablesLocations[i];if(u){let{uniformShape:r}=a.Tt(t.program.packedInputs,o.shape,o.texData.texShape);switch(r.length){case 1:e.gl.uniform1iv(u,new Int32Array(r));break;case 2:e.gl.uniform2iv(u,new Int32Array(r));break;case 3:e.gl.uniform3iv(u,new Int32Array(r));break;case 4:e.gl.uniform4iv(u,new Int32Array(r))}}if(d&&e.gl.uniform2i(d,o.texData.texShape[0],o.texData.texShape[1]),null!=s){if(o.isUniform){if(2>n.util.sizeFromShape(o.shape))e.gl.uniform1f(s,o.uniformValues[0]);else{let t=o.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(s,t)}continue}null!=o.texData.slice&&null!=l&&e.gl.uniform1i(l,o.texData.slice.flatOffset),e.setInputMatrixTexture(o.texData.texture.texture,s,i)}}let d=t.outShapeLocation;if(d)switch(i.shape.length){case 1:e.gl.uniform1iv(d,new Int32Array(i.shape));break;case 2:e.gl.uniform2iv(d,new Int32Array(i.shape));break;case 3:e.gl.uniform3iv(d,new Int32Array(i.shape));break;case 4:e.gl.uniform4iv(d,new Int32Array(i.shape))}if(t.outShapeStridesLocation){let r=n.util.computeStrides(i.shape);switch(i.shape.length){case 2:e.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(r));break;case 3:e.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(r));break;case 4:e.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(r))}}if(t.outTexShapeLocation&&e.gl.uniform2i(t.outTexShapeLocation,i.texData.texShape[0],i.texData.texShape[1]),t.program.customUniforms&&o)for(let r=0;r<t.program.customUniforms.length;++r){let n=t.program.customUniforms[r],a=t.customUniformLocations[r],i=o[r];if("float"===n.type)e.gl.uniform1fv(a,i);else if("vec2"===n.type)e.gl.uniform2fv(a,i);else if("vec3"===n.type)e.gl.uniform3fv(a,i);else if("vec4"===n.type)e.gl.uniform4fv(a,i);else if("int"===n.type)e.gl.uniform1iv(a,i);else if("ivec2"===n.type)e.gl.uniform2iv(a,i);else if("ivec3"===n.type)e.gl.uniform3iv(a,i);else if("ivec4"===n.type)e.gl.uniform4iv(a,i);else throw Error(`uniform type ${n.type} is not supported yet.`)}e.executeProgram()}function d(e,t,r){let i="";t.concat(r).forEach(t=>{let o=null!=t.texData&&null!=t.texData.slice&&t.texData.slice.flatOffset>0;if(e.enableShapeUniforms&&!t.isUniform){let s=t.texData.texShape,{useSqueezeShape:l,uniformShape:u,keptDims:d}=a.Tt(e.packedInputs,t.shape,s),c="",p="",h="";if(1===u.length&&e.packedInputs){let e=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];c=`${e[0]>1}_${e[1]>1}`}else if(2!==u.length||e.packedInputs){if(u.length>2&&!e.packedInputs){let e=n.util.computeStrides(u);h=`${e[0]===s[1]}_${e[e.length-1]===s[1]}`}}else p=`${u[0]>1}_${u[1]>1}`;let f=t.shape.length,m=2===u.length&&n.util.arraysEqual(t.shape,s),x=1===n.util.sizeFromShape(t.shape),g=n.backend_util.getBroadcastDims(t.shape,r.shape),b=!e.packedInputs&&f===r.shape.length&&n.util.arraysEqual(s,r.texData.texShape),C=e.packedInputs||u.length>2?"":`${s[0]>1}_${s[1]>1}`;i+=`${f}_${b}_${l?d:""}_${u.length}_${x}_${g}_${m}_${c}_${p}_${h}_${C}_${o}`}else{let e=t.isUniform?"uniform":t.texData.texShape;i+=`${t.shape}_${e}_${o}`}});let o=e.userCode;return e.constructor.name+("_"+i+"_"+o)+`${(0,n.env)().getNumber("WEBGL_VERSION")}`}function c(e){return(0,n.env)().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&e<=4}},8657:function(e,t,r){r.r(t),r.d(t,{bindVertexProgramAttributeStreams:function(){return y},createBufferFromOutputTexture:function(){return R},createFloat16MatrixTexture:function(){return f},createFloat16PackedMatrixTexture:function(){return v},createFloat32MatrixTexture:function(){return p},createIndexBuffer:function(){return u},createPackedMatrixTexture:function(){return b},createUnsignedBytesMatrixTexture:function(){return x},createVertexBuffer:function(){return l},createVertexShader:function(){return s},downloadByteEncodedFloatMatrixFromOutputTexture:function(){return T},downloadFloat32MatrixFromBuffer:function(){return w},downloadMatrixFromPackedOutputTexture:function(){return S},downloadPackedMatrixFromBuffer:function(){return k},getInternalFormatForFloat16MatrixTexture:function(){return h},getInternalFormatForFloat16PackedMatrixTexture:function(){return C},getInternalFormatForFloat32MatrixTexture:function(){return c},getInternalFormatForPackedMatrixTexture:function(){return g},getInternalFormatForUnsignedBytesMatrixTexture:function(){return m},uploadDenseMatrixToTexture:function(){return I},uploadPixelDataToTexture:function(){return $}});var n=r(9094),a=r(3821),i=r(7275),o=r(3326);function s(e){let t=(0,a.A)(),r=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return o.createVertexShader(e,r)}function l(e){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return o.createStaticVertexBuffer(e,t)}function u(e){let t=new Uint16Array([0,1,2,2,1,3]);return o.createStaticIndexBuffer(e,t)}function d(e,t,r,a,i,s){o.validateTextureSize(t,r);let l=o.createTexture(e),u=e.TEXTURE_2D;return o.callAndCheck(e,()=>e.bindTexture(u,l)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_MIN_FILTER,e.NEAREST)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_MAG_FILTER,e.NEAREST)),1===(0,n.env)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texImage2D(u,0,a,t,r,0,i,s,null)):o.callAndCheck(e,()=>e.texStorage2D(u,1,a,t,r)),o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null)),{texture:l,texShape:[r,t]}}function c(e){return e.internalFormatFloat}function p(e,t,r,n){let[a,o]=i.kk(t,r);return d(e,a,o,c(n),n.textureFormatFloat,e.FLOAT)}function h(e){return e.internalFormatHalfFloat}function f(e,t,r,n){let[a,o]=i.kk(t,r);return d(e,a,o,h(n),n.textureFormatFloat,n.textureTypeHalfFloat)}function m(e){return e.downloadTextureFormat}function x(e,t,r,n){let[a,o]=i.kk(t,r);return d(e,a,o,m(n),e.RGBA,e.UNSIGNED_BYTE)}function g(e){return e.internalFormatPackedFloat}function b(e,t,r,n){let[a,o]=i.qe(t,r);return d(e,a,o,g(n),e.RGBA,e.FLOAT)}function C(e){return e.internalFormatPackedHalfFloat}function v(e,t,r,n){let[a,o]=i.qe(t,r);return d(e,a,o,C(n),e.RGBA,n.textureTypeHalfFloat)}function y(e,t,r){return o.callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),o.bindVertexBufferToProgramAttribute(e,t,"clipSpacePos",r,3,20,0)&&o.bindVertexBufferToProgramAttribute(e,t,"uv",r,2,20,12)}function I(e,t,r,a,i,s){let l,u,d;o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t)),i instanceof Uint8Array?(l=new Uint8Array(r*a*4),u=e.UNSIGNED_BYTE,d=e.RGBA):(l=new Float32Array(r*a*4),u=e.FLOAT,d=s.internalFormatPackedFloat),l.set(i),2===(0,n.env)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,r,a,e.RGBA,u,l)):o.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,d,r,a,0,e.RGBA,u,l)),o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function $(e,t,r){o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t)),r.data instanceof Uint8Array?2===(0,n.env)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,e.RGBA,e.UNSIGNED_BYTE,r.data)):o.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r.width,r.height,0,e.RGBA,e.UNSIGNED_BYTE,r.data)):2===(0,n.env)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,r)):o.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r)),o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function R(e,t,r,n){let a=e.createBuffer();o.callAndCheck(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,a));let i=16*t*r;return o.callAndCheck(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,i,e.STREAM_READ)),o.callAndCheck(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,0)),o.callAndCheck(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),a}function w(e,t,r){let n=new Float32Array(r);return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,n),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),n}function T(e,t,r,n){let[a,s]=i.kk(t,r),l=new Uint8Array(i.yb(t*r,4));return o.callAndCheck(e,()=>e.readPixels(0,0,a,s,n.downloadTextureFormat,e.UNSIGNED_BYTE,l)),new Float32Array(l.buffer)}function k(e,t,r,n,a,o,s,l){let u=new Float32Array(i.Se(o,s));return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,u),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),u}function S(e,t,r){let n=new Float32Array(t*r*4);return o.callAndCheck(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,n)),n}},1941:function(e,t,r){let n;r.r(t),r.d(t,{GPGPUContext:function(){return p.A},MathBackendWebGL:function(){return s.QC},forceHalfFloat:function(){return h},gpgpu_util:function(){return u},setWebGLContext:function(){return c.nd},version_webgl:function(){return l},webgl:function(){return f},webgl_util:function(){return d}});var a,i,o=r(9094),s=r(4544);let l="4.22.0";var u=r(8657),d=r(3326),c=r(756),p=r(7394);function h(){(0,o.env)().set("WEBGL_FORCE_F16_TEXTURES",!0)}o.device_util.isBrowser()&&(0,o.registerBackend)("webgl",()=>new s.QC,2);let f={forceHalfFloat:h};var m=r(943);let x=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;class g{constructor(e,t,r){this.variableNames=["A","B"],this.outputShape=o.backend_util.assertAndGetBroadcastShape(t,r),this.enableShapeUniforms=(0,m.C9)(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}}var b=r(688),C=r(9201);let v=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;class y{constructor(e,t,r,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o.backend_util.assertAndGetBroadcastShape(t,r);let a=this.outputShape.length;this.enableShapeUniforms=(0,m.C9)(a);let i="";if(n){if(0===a||1===o.util.sizeFromShape(this.outputShape))i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else{let e=(0,C.kW)(a);if(i=`
          ${e} coords = getOutputCoords();
        `,1===a)this.enableShapeUniforms?i+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:i+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let e=(0,b.Ky)("coords",a);this.enableShapeUniforms?i+=`
            bool nextRowOutOfBounds =
              (${e[a-2]} + 1) >= outShape[${a} - 2];
            bool nextColOutOfBounds =
              (${e[a-1]} + 1) >= outShape[${a} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:i+=`
            bool nextRowOutOfBounds =
              (${e[a-2]} + 1) >= ${this.outputShape[a-2]};
            bool nextColOutOfBounds =
              (${e[a-1]} + 1) >= ${this.outputShape[a-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}}}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${i}

        setOutput(result);
      }
    `}}function I(e){let{inputs:t,backend:r}=e,{x:n}=t;return r.incRef(n.dataId),{dataId:n.dataId,shape:n.shape,dtype:n.dtype}}let $={kernelName:o.Identity,backendName:"webgl",kernelFunc:I};function R(e){let{inputs:t,backend:r}=e,{real:n,imag:a}=t,i=r.makeTensorInfo(n.shape,"complex64"),o=r.texData.get(i.dataId),s=I({inputs:{x:n},backend:r}),l=I({inputs:{x:a},backend:r});return o.complexTensorInfos={real:s,imag:l},i}let w={kernelName:o.Complex,backendName:"webgl",kernelFunc:R},T="return (a < 0.) ? b * a : a;",k=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,S={kernelName:o.LeakyRelu,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{alpha:i}=n,s=r.makeTensorInfo([],"float32",o.util.createScalarValue(i,"float32")),l=(0,o.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new y(k,a.shape,s.shape):new g(T,a.shape,s.shape),u=r.runWebGLProgram(l,[a,s],"float32");return r.disposeIntermediateTensorInfo(s),u}},E="return (a < 0.) ? b * a : a;",N=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,A={kernelName:o.Prelu,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:n,alpha:a}=t,i=(0,o.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new y(N,n.shape,a.shape):new g(E,n.shape,a.shape);return r.runWebGLProgram(i,[n,a],"float32")}};var _=r(5626),F=r(5243);let O="if (isnan(x)) return x;";function D({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:r,dtype:n}){return({inputs:a,backend:i})=>{let s;let{x:l}=a,u=n||l.dtype;if(i.shouldExecuteOnCPU([l])&&null!=r){let e=r(i.texData.get(l.dataId).values,u);return i.makeTensorInfo(l.shape,u,e)}return s=(0,o.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&null!=t?new F.cc(l.shape,t):new _.l(l.shape,e),i.runWebGLProgram(s,[l],u)}}function P({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:r=!1,supportsComplex:n=!1,cpuKernelImpl:a,dtype:i}){return({inputs:s,backend:l})=>{let u;let{a:d,b:c}=s;if(n&&"complex64"===d.dtype){let t=l.texData.get(d.dataId),r=l.texData.get(c.dataId),[n,a]=[[t.complexTensorInfos.real,r.complexTensorInfos.real],[t.complexTensorInfos.imag,r.complexTensorInfos.imag]].map(t=>{let[r,n]=t,a={dataId:r.dataId,dtype:r.dtype,shape:d.shape},i={dataId:n.dataId,dtype:n.dtype,shape:c.shape},s=new g(e,d.shape,c.shape);return l.runWebGLProgram(s,[a,i],(0,o.upcastType)(r.dtype,n.dtype))}),i=R({inputs:{real:n,imag:a},backend:l});return l.disposeIntermediateTensorInfo(n),l.disposeIntermediateTensorInfo(a),i}let p=i||(0,o.upcastType)(d.dtype,c.dtype);if(("string"===d.dtype||"string"===c.dtype||l.shouldExecuteOnCPU([d,c]))&&null!=a){let e=l.texData.get(d.dataId).values,t=l.texData.get(c.dataId).values,r="string"===d.dtype?o.backend_util.fromUint8ToStringArray(e):e,n="string"===d.dtype?o.backend_util.fromUint8ToStringArray(t):t,[i,s]=a(d.shape,c.shape,r,n,p),u=l.makeTensorInfo(s,p);return l.texData.get(u.dataId).values=i,u}return u=(0,o.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&null!=t?new y(t,d.shape,c.shape,r):new g(e,d.shape,c.shape),l.runWebGLProgram(u,[d,c],p)}}function L(e,t=!1){if("linear"===e)return t?F.t$:_.t$;if("relu"===e)return t?F.RX:_.RX;if("elu"===e)return t?F.Cv:_.Cv;if("relu6"===e)return t?F.eW:_.eW;if("prelu"===e)return t?N:E;if("leakyrelu"===e)return t?k:T;if("sigmoid"===e)return t?F.Tq:_.Tq;throw Error(`Activation ${e} has not been implemented for the WebGL backend.`)}class B{constructor(e,t,r,n=!1,a=!1,i=!1,o=null,s=!1,l=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.enableShapeUniforms=(0,m.C9)(this.outputShape.length);let u=Math.ceil((n?e[1]:e[2])/2),d=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],c=a?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],p="",h="";o&&(p=s?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:l?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:`vec4 activation(vec4 x) {
          ${o}
        }`,h="result = activation(result);"),i&&this.variableNames.push("bias"),s&&this.variableNames.push("preluActivationWeights"),l&&this.variableNames.push("leakyreluAlpha");let f="rc.x",x="rc.x";e[0]<t[0]?f=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(x=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${p}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${u}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${f};
        int batchB = ${x};
        for (int i = 0; i < ${u}; i++) {
          vec4 a = getMatrixA(batchA, ${n?"i * 2, rc.y":"rc.y, i * 2"});
          vec4 b = getMatrixB(batchB, ${a?"rc.z, i * 2":"i * 2, rc.z"});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${d[0]} * ${c[0]});
          result += (${d[1]} * ${c[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${i?"result += getBiasAtOutCoords();":""}

        ${h}

        setOutput(result);
      }
    `}}let V={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"};class W{constructor(e,t,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=o.backend_util.assertAndGetBroadcastShape(t,r),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}}var M=r(4902);let G="return a * b;";function U(e){let t;let{inputs:r,backend:n}=e,{a,b:i}=r,s=o.backend_util.upcastType(a.dtype,i.dtype);if("complex64"===a.dtype){let e=n.texData.get(a.dataId),t=n.texData.get(i.dataId),r=new W(V.REAL,a.shape,i.shape),o=new W(V.IMAG,a.shape,i.shape),s=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:a.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:a.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:i.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:i.shape}],l=n.runWebGLProgram(r,s,"float32"),u=n.runWebGLProgram(o,s,"float32"),d=R({inputs:{real:l,imag:u},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(u),d}if(n.shouldExecuteOnCPU([a,i])){let e=n.texData.get(a.dataId),t=n.texData.get(i.dataId),[r,o]=(0,M.Th)(a.shape,i.shape,e.values,t.values,s),l=n.makeTensorInfo(o,s);return n.texData.get(l.dataId).values=r,l}return t=(0,o.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new y(G,a.shape,i.shape):new g(G,a.shape,i.shape),n.runWebGLProgram(t,[a,i],s)}let z={kernelName:o.Multiply,backendName:"webgl",kernelFunc:U};var X=r(1811);function H(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{shape:i}=n,s=o.util.sizeFromShape(a.shape),l=o.util.inferFromImplicitShape(i,s),u=o.util.sizeFromShape(l);o.util.assert(s===u,()=>`The new shape (${l}) has ${u} elements and the old shape (${a.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`);let c=r.texData.get(a.dataId);return!c.isPacked||(0,d.isReshapeFree)(a.shape,l)||null!==c.texture&&(0,d.isReshapeFree)(c.shape,l)?(r.incRef(a.dataId),{dataId:a.dataId,shape:l,dtype:a.dtype}):function(e,t,r){let n=[(0,d.getBatchDim)(e.shape),...(0,d.getRowsCols)(e.shape)],a={dtype:e.dtype,shape:n,dataId:e.dataId},i=[(0,d.getBatchDim)(t),...(0,d.getRowsCols)(t)],o=new X.v(i,n),s=r.runWebGLProgram(o,[a],e.dtype,[n],!0);return{dataId:s.dataId,shape:t,dtype:s.dtype}}(a,l,r)}let K={kernelName:o.Reshape,backendName:"webgl",kernelFunc:H};class j{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:a,outSize:i}=e;this.outputShape=[n,i];let s=4*Math.floor(r/4),l=r%4,u="sumValue += dot(values, ones);";if(null!=t){let e=1/t;u=`sumValue += dot(values * ${o.util.isInt(e)?e.toPrecision(2):e}, ones);`}let d="";a%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${d}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        float sumValue = 0.0;

        for (int i = 0; i < ${s}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${u}
        }

        int inIdx = inOffset + ${s};
        if (${1===l}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${u}
        } else if (${2===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${u}
        } else if (${3===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${u}
        }
        setOutput(sumValue);
      }
    `}}class q{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:a,outSize:i}=e;this.outputShape=[n,i];let o="0.0",s="";"prod"===t?o="1.0":"min"===t?(o="1.0 / 1e-20",s="min"):"max"===t&&(o="-1.0 / 1e-20",s="max");let l=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"sum"===t?l="sumValue":"prod"===t?l="prodValue":"all"===t?l="allValue":"any"===t&&(l="anyValue");let u=4*Math.floor(r/4),d=r%4,c=`
      if (${"sum"===t}) {
        sumValue += dot(values, ones);
      } else if (${"prod"===t}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${s}(values, minMaxValue);
        if (${"min"===t} || ${"max"===t}) {
          minMaxValue = ${s}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,p="vec4";"all"===t?(o="1.0",c=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,p="bvec4"):"any"===t&&(o="0.0",c=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,p="bvec4");let h="";a%r>0&&(h=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${o};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${h}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        vec4 minMaxValue = vec4(${o});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${c}
        }

        int inIdx = inOffset + ${u};
        if (${1===d}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${c}
        } else if (${2===d}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${c}
        } else if (${3===d}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${c}
        }
        setOutput(${l});
      }
    `}}function Y(e,t,r,n){let a=function(e){let t=[];for(;0===t.length||1!==t[t.length-1].outSize;){let r=t.length?t[t.length-1].outSize:e[1],n=o.backend_util.computeOptimalWindowSize(r);t.push({inSize:r,windowSize:n,outSize:Math.ceil(r/n)})}return t}(e.shape),i=e;for(let o=0;o<a.length;o++){let s,l;let{inSize:u,windowSize:d,outSize:c}=a[o];s="mean"===r?0===o?new j({windowSize:d,inSize:u,batchSize:e.shape[0],outSize:c},u):new j({windowSize:d,inSize:u,batchSize:e.shape[0],outSize:c}):new q({windowSize:d,inSize:u,batchSize:e.shape[0],outSize:c},r),l=i,i=n.runWebGLProgram(s,[i],t),l.dataId!==e.dataId&&n.disposeIntermediateTensorInfo(l)}return i}class Q{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let n=0;n<r.length;n++)r[n]=e[t[n]];this.outputShape=r,this.rank=r.length;let n=(0,C.kW)(this.rank),a=function(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],n=Array(t);for(let t=0;t<e.length;t++)n[e[t]]=r[t];return n.join()}(t);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${a}));
    }
    `}}class Z{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let r=Array(e.length);for(let n=0;n<r.length;n++)r[n]=e[t[n]];if(this.outputShape=r,this.rank=r.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=(0,C.kW)(this.rank),a=(0,b.k6)("rc",this.rank),i=Array(this.rank);for(let e=0;e<t.length;e++)i[t[e]]=a[e];let o=`vec2(${i.slice(-2).join()})`,s=`++${a[this.rank-1]} < ${r[this.rank-1]}`,l=`getChannel(getA(${i.join()}), ${o})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${l};
      if(${s}) {
        result[1] = ${l};
      }
      --${a[this.rank-1]};
      if(++${a[this.rank-2]} < ${r[this.rank-2]}) {
        result[2] = ${l};
        if(${s}) {
          result[3] = ${l};
        }
      }
      setOutput(result);
    }
    `}}function J(e,t,r){let n=(0,o.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Z(e.shape,t):new Q(e.shape,t);return r.runWebGLProgram(n,[e],e.dtype)}function ee(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:i,keepDims:s}=n;return function(e,t,r,n){let a=e.shape.length,i=o.util.parseAxisParam(t,e.shape),s=i,l=o.backend_util.getAxesPermutation(s,a),u=null!=l,d=e;u&&(d=J(e,l,n),s=o.backend_util.getInnerMostAxes(s.length,a)),o.backend_util.assertAxesAreInnerMostDims("sum",s,a);let[c,p]=o.backend_util.computeOutAndReduceShapes(d.shape,s),h=c;r&&(h=o.backend_util.expandShapeToKeepDim(c,i));let f=o.util.sizeFromShape(p),m=H({inputs:{x:d},attrs:{shape:[o.util.sizeFromShape(e.shape)/f,f]},backend:n}),x=Y(m,(0,o.sumOutType)(e.dtype),"sum",n),g=H({inputs:{x:x},attrs:{shape:h},backend:n});return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(x),u&&n.disposeIntermediateTensorInfo(d),g}(a,i,s,r)}let et={kernelName:o.Sum,backendName:"webgl",kernelFunc:ee};function er(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{perm:o}=a,s=Array(i.shape.length);for(let e=0;e<s.length;e++)s[e]=i.shape[o[e]];if(n.shouldExecuteOnCPU([i])){let e=n.texData.get(i.dataId).values,r=(0,M.Fv)(e,i.shape,i.dtype,o,s);t=n.makeTensorInfo(s,i.dtype),n.texData.get(t.dataId).values=r}else t=J(i,o,n);return t}let en={kernelName:o.Transpose,backendName:"webgl",kernelFunc:er};function ea({a:e,b:t,transposeA:r,transposeB:n,backend:a,bias:i=null,preluActivationWeights:s=null,leakyreluAlpha:l=0,activation:u=null}){let d;let c=e.shape.length,p=t.shape.length,h=r?e.shape[c-2]:e.shape[c-1],f=n?t.shape[p-1]:t.shape[p-2],m=r?e.shape[c-1]:e.shape[c-2],x=n?t.shape[p-2]:t.shape[p-1],g=e.shape.slice(0,-2),b=t.shape.slice(0,-2),C=o.util.sizeFromShape(g),v=o.util.sizeFromShape(b),y=o.broadcast_util.assertAndGetBroadcastShape(e.shape.slice(0,-2),t.shape.slice(0,-2)).concat([m,x]);o.util.assert(h===f,()=>`Error in matMul: inner shapes (${h}) and (${f}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${r} and transposeB=${n} must match.`);let I=r?[C,h,m]:[C,m,h],$=n?[v,x,f]:[v,f,x],R=H({inputs:{x:e},backend:a,attrs:{shape:I}}),w=H({inputs:{x:t},backend:a,attrs:{shape:$}}),T=[R,w],k=Math.max(C,v),S=r?R.shape[1]:R.shape[2],E=null!=i,N=null!=s,A="leakyrelu"===u,_=null!=u?L(u,!0):null,F=E||N||A||null!=_;if((1===m||1===x)&&S>1e3&&!1===F){let e=R,t=w;r&&(e=er({inputs:{x:R},backend:a,attrs:{perm:[0,2,1]}}),T.push(e)),n&&(t=er({inputs:{x:w},backend:a,attrs:{perm:[0,2,1]}}),T.push(t));let i=1!==x,o=1===x,s=e;i&&(s=H({inputs:{x:e},backend:a,attrs:{shape:[k,S,1]}}),T.push(s));let l=t;o&&(l=H({inputs:{x:t},backend:a,attrs:{shape:[k,1,S]}}),T.push(l));let u=U({inputs:{a:s,b:l},backend:a});d=ee({inputs:{x:u},backend:a,attrs:{axis:1===x?2:1,keepDims:!0}}),T.push(u)}else{let u=(0,o.upcastType)(e.dtype,t.dtype),c=new B(I,$,[k,m,x],r,n,E,_,N,A),p=[R,w];if(null!=i&&p.push(i),N&&p.push(s),A){let e=a.makeTensorInfo([],"float32",o.util.createScalarValue(l,"float32"));p.push(e),T.push(e)}d=a.runWebGLProgram(c,p,u)}let O=H({inputs:{x:d},backend:a,attrs:{shape:y}});for(let e of(T.push(d),T))a.disposeIntermediateTensorInfo(e);return O}let ei={kernelName:o._FusedMatMul,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{a,b:i,bias:o,preluActivationWeights:s}=t,{transposeA:l,transposeB:u,activation:d,leakyreluAlpha:c}=n;return ea({a,b:i,transposeA:l,transposeB:u,backend:r,bias:o,preluActivationWeights:s,leakyreluAlpha:c,activation:d})}},eo="return abs(x);",es={kernelName:o.Abs,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n}=e,{x:a}=r;if(n.shouldExecuteOnCPU([a])&&"complex64"!==a.dtype){let e=n.texData.get(a.dataId),t=(0,M.CJ)(e.values);return n.makeTensorInfo(a.shape,a.dtype,t)}return t=(0,o.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new F.cc(a.shape,eo):new _.l(a.shape,eo),n.runWebGLProgram(t,[a],a.dtype)}},el=D({opSnippet:_.D1+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`}),eu={kernelName:o.Acos,backendName:"webgl",kernelFunc:el},ed=D({opSnippet:_.D1+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`}),ec={kernelName:o.Acosh,backendName:"webgl",kernelFunc:ed},ep="return a + b;",eh=P({opSnippet:ep,packedOpSnippet:ep,supportsComplex:!0,cpuKernelImpl:M.cK}),ef={kernelName:o.Add,backendName:"webgl",kernelFunc:eh};class em{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`float v${e} = get${e}AtOutCoords();`)});let n=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        float result = ${n};
        setOutput(result);
      }
    `}}class ex{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`vec4 v${e} = get${e}AtOutCoords();`)});let n=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        vec4 result = ${n};
        setOutput(result);
      }
    `}}let eg={kernelName:o.AddN,backendName:"webgl",kernelFunc:function e(t){let{inputs:r,backend:n}=t;if(1===r.length)return I({inputs:{x:r[0]},backend:n});if(r.length>(0,o.env)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let t=Math.floor(r.length/2),a=e({inputs:r.slice(0,t),backend:n}),i=e({inputs:r.slice(t),backend:n});return e({inputs:[a,i],backend:n})}let a=r.map(e=>e.dtype).reduce((e,t)=>(0,o.upcastType)(e,t)),i=r.map(e=>e.shape),s=(0,o.env)().getBool("WEBGL_PACK")?new ex(r[0].shape,i):new em(r[0].shape,i);return n.runWebGLProgram(s,r,a)}},eb={kernelName:o.All,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,d=o.util.parseAxisParam(s,i.shape),c=d,p=o.backend_util.getAxesPermutation(c,u),h=i;null!=p&&(h=er({inputs:{x:i},backend:n,attrs:{perm:p}}),c=o.backend_util.getInnerMostAxes(c.length,u)),o.backend_util.assertAxesAreInnerMostDims("all",c,u);let[f,m]=o.backend_util.computeOutAndReduceShapes(h.shape,c),x=H({inputs:{x:h},backend:n,attrs:{shape:[-1,o.util.sizeFromShape(m)]}}),g=Y(x,x.dtype,"all",n);return t=l?H({inputs:{x:g},backend:n,attrs:{shape:o.backend_util.expandShapeToKeepDim(f,d)}}):H({inputs:{x:g},backend:n,attrs:{shape:f}}),n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(g),null!=p&&n.disposeIntermediateTensorInfo(h),t}},eC={kernelName:o.Any,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,d=o.util.parseAxisParam(s,i.shape),c=d,p=o.backend_util.getAxesPermutation(c,u),h=i;null!=p&&(h=er({inputs:{x:i},backend:n,attrs:{perm:p}}),c=o.backend_util.getInnerMostAxes(c.length,u)),o.backend_util.assertAxesAreInnerMostDims("any",c,u);let[f,m]=o.backend_util.computeOutAndReduceShapes(h.shape,c),x=H({inputs:{x:h},backend:n,attrs:{shape:[-1,o.util.sizeFromShape(m)]}}),g=Y(x,x.dtype,"any",n);return t=l?H({inputs:{x:g},backend:n,attrs:{shape:o.backend_util.expandShapeToKeepDim(f,d)}}):H({inputs:{x:g},backend:n,attrs:{shape:f}}),n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(g),null!=p&&n.disposeIntermediateTensorInfo(h),t}};class ev{constructor(e,t,r){this.variableNames=["A"];let{windowSize:n,batchSize:a,outSize:i}=e;r||this.variableNames.push("bestIndicesA"),this.outputShape=[a,i],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${n}; i++) {
          int inIdx = ${r?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));"};
          float candidate = getA(batch, inIdx);
          if (candidate ${"max"===t?">":"<"} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}}class ey{constructor(e,t,r,n){let a,i;this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,o.util.assert(e.length>2,()=>`Packed arg${r.charAt(0).toUpperCase()+r.slice(1)} supports only inputs with rank above 2.`);let s=Math.ceil(e[e.length-1]/t);this.outputShape=e.slice(0,-1),s>1&&this.outputShape.push(s),n||this.variableNames.push("bestIndicesA");let l=this.outputShape,u=l.length,d=(0,C.kW)(u),c=(0,b.Ky)("coords",u);if(1===s){i=u+1;let e=(0,C.kW)(i);a=`
        ${e} sourceLocR = ${e}(${c.join()}, 0);
        ++${c[u-1]};
        ${e} sourceLocG = ${e}(${c.join()}, 0);
        ++${c[u-2]};
        ${e} sourceLocA = ${e}(${c.join()}, 0);
        --${c[u-1]};
        ${e} sourceLocB = ${e}(${c.join()}, 0);
        --${c[u-2]};`}else i=u,a=`
        ${d} sourceLocR = coords;
        ++${c[u-1]};
        ${d} sourceLocG = coords;
        ++${c[u-2]};
        ${d} sourceLocA = coords;
        --${c[u-1]};
        ${d} sourceLocB = coords;
        --${c[u-2]};`;let p=["x","y","z","w","u","v"].slice(0,i),h="."+p[i-1],f=p.map(e=>"int "+e),m=(0,b.Ky)("sourceLocR",i-1).concat("inIdx.r"),x=(0,b.Ky)("sourceLocG",i-1).concat("inIdx.g"),g=(0,b.Ky)("sourceLocB",i-1).concat("inIdx.b"),v=(0,b.Ky)("sourceLocA",i-1).concat("inIdx.a"),y=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${m.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${v.join()})));`,I=`vec4(
            getAChannel(${m.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${g.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${v.join()}) : 0.)`,$=n?"":`
      float getBestIndicesAChannel(${f.join()}) {
        return getChannel(getBestIndicesA(${p.join()}),
                                          vec2(${p.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${f.join()}) {
        return getChannel(getA(${p.join()}),
                               vec2(${p.slice(-2).join()}));
      }
      ${$}
      void main() {
        ${d} coords = getOutputCoords();
        bool hasNextCol = ${c[u-1]} < ${l[u-1]-1};
        bool hasNextRow = ${c[u-2]} < ${l[u-2]-1};
        ${a}
        ivec4 srcIdx = ivec4(sourceLocR${h}, sourceLocG${h},
          sourceLocB${h}, sourceLocA${h}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${I};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${y}
          vec4 candidate = ${I};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${"max"===r?"greaterThan":"lessThan"}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}}function eI(e,t,r,n){let a=[r];if(o.backend_util.assertAxesAreInnerMostDims("arg"+n.charAt(0).toUpperCase()+n.slice(1),a,t.shape.length),!(0,o.env)().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let r=[],i=e.texData.get(t.dataId),s=null!==i&&i.isPacked,l=t;s&&r.push(l=e.unpackTensor(t));let[u,d]=o.backend_util.computeOutAndReduceShapes(l.shape,a),c=H({inputs:{x:l},backend:e,attrs:{shape:[-1,o.util.sizeFromShape(d)]}});r.push(c);let p=function e(t,r,n,a=null){let i=r.shape[0],s=r.shape[1];null!=a&&(i=a.shape[0],s=a.shape[1]);let l=o.backend_util.computeOptimalWindowSize(s),u=new ev({windowSize:l,inSize:s,batchSize:i,outSize:Math.ceil(s/l)},n,null==a),d=[r];null!=a&&d.push(a);let c=t.runWebGLProgram(u,d,"int32");if(1===c.shape[1])return c;let p=e(t,r,n,c);return t.disposeIntermediateTensorInfo(c),p}(e,c,n);r.push(p);let h=H({inputs:{x:p},backend:e,attrs:{shape:u}});return r.forEach(t=>e.disposeIntermediateTensorInfo(t)),h}return function e(t,r,n,a=null){let i=null!=a?a.shape:r.shape,s=i[i.length-1],l=new ey(i,o.backend_util.computeOptimalWindowSize(s),n,null==a),u=t.runWebGLProgram(l,null==a?[r]:[r,a],"int32");if(u.shape.length===r.shape.length){let a=e(t,r,n,u);return t.disposeIntermediateTensorInfo(u),a}return u}(e,t,n)}let e$={kernelName:o.ArgMax,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:i}=n,s=o.util.parseAxisParam(i,a.shape),l=o.backend_util.getAxesPermutation(s,a.shape.length),u=a,d=[];null!=l&&(d.push(u=er({inputs:{x:a},backend:r,attrs:{perm:l}})),s=o.backend_util.getInnerMostAxes(s.length,u.shape.length)),o.backend_util.assertAxesAreInnerMostDims("argMax",[s[0]],u.shape.length);let c=eI(r,u,s[0],"max");return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),c}},eR={kernelName:o.ArgMin,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:i}=n,s=o.util.parseAxisParam(i,a.shape),l=o.backend_util.getAxesPermutation(s,a.shape.length),u=a,d=[];null!=l&&(d.push(u=er({inputs:{x:a},backend:r,attrs:{perm:l}})),s=o.backend_util.getInnerMostAxes(s.length,u.shape.length)),o.backend_util.assertAxesAreInnerMostDims("argMin",[s[0]],u.shape.length);let c=eI(r,u,s[0],"min");return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),c}},ew=D({opSnippet:_.D1+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`}),eT={kernelName:o.Asin,backendName:"webgl",kernelFunc:ew},ek=D({opSnippet:_.D1+"return log(x + sqrt(x * x + 1.0));"}),eS={kernelName:o.Asinh,backendName:"webgl",kernelFunc:ek},eE=D({opSnippet:_.D1+`
  return atan(x);
`}),eN={kernelName:o.Atan,backendName:"webgl",kernelFunc:eE},eA=P({opSnippet:x+`
  return atan(a, b);
`,packedOpSnippet:`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+v+`
  return result;
`}),e_={kernelName:o.Atan2,backendName:"webgl",kernelFunc:eA},eF=D({opSnippet:_.D1+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`}),eO={kernelName:o.Atanh,backendName:"webgl",kernelFunc:eF};class eD{constructor(e,t,r,n=!1,a=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let i=e.filterWidth,o=e.strideHeight,s=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,d=e.effectiveFilterHeight,c=e.effectiveFilterWidth,p=e.padInfo.top,h=e.padInfo.left;this.outputShape=e.outShape;let f="avg"===t,m=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,x=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,g="0.0";if(f||(g="-1.0 / 1e-20"),r){this.userCode=`
        const ivec2 strides = ivec2(${o}, ${s});
        const ivec2 pads = ivec2(${p}, ${h});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${d};
              wR += ${l}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${c};
                wC += ${u}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?a?m:x:`wR * ${c} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let b=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(b="avgValue / max(count, 1.0)");let C=4*Math.floor(i/4),v=i%4,y=`
      if (${f}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${o}, ${s});
      const ivec2 pads = ivec2(${p}, ${h});
      const float initializationValue = ${g};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${g});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${d};
            wR += ${l}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${C}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${y}
          }

          int xC = xCCorner + ${C};
          if (${1===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${y}
          } else if (${2===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${y}
          } else if (${3===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${y}
          }
        }
        setOutput(${b});
      }
    `}}class eP{constructor(e,t,r,n=!1,a=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let i=e.filterWidth,o=e.strideDepth,s=e.strideHeight,l=e.strideWidth,u=e.dilationDepth,d=e.dilationHeight,c=e.dilationWidth,p=e.effectiveFilterDepth,h=e.effectiveFilterHeight,f=e.effectiveFilterWidth,m=e.padInfo.front,x=e.padInfo.top,g=e.padInfo.left;this.outputShape=e.outShape;let b="avg"===t,C="0.0";if(b||(C="-1.0 / 1e-20"),r){this.userCode=`
        const ivec3 strides =
            ivec3(${o}, ${s}, ${l});
        const ivec3 pads = ivec3(${m}, ${x}, ${g});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${p};
              wD += ${u}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${h};
                wR += ${d}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${f};
                  wC += ${c}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${n?a?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${h} * ${f} +
                      wR * ${f} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(v="avgValue / max(count, 1.0)");let y=4*Math.floor(i/4),I=i%4,$=`
      if (${b}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${o}, ${s}, ${l});
      const ivec3 pads = ivec3(${m}, ${x}, ${g});
      const float initializationValue = ${C};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${C});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${p};
            wD += ${u}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${h};
            wR += ${d}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${y}; wC += 4) {
              int xC = xCCorner + wC * ${c};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${c}, ch),
                getValue(batch, xD, xR, xC + 2 * ${c}, ch),
                getValue(batch, xD, xR, xC + 3 * ${c}, ch)
              );

              ${$}
            }

            int xC = xCCorner + ${y};
            if (${1===I}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${$}
            } else if (${2===I}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${c}, ch),
                initializationValue,
                initializationValue
              );

              ${$}
            } else if (${3===I}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${c}, ch),
                getValue(batch, xD, xR, xC + 2 * ${c}, ch),
                initializationValue
              );

              ${$}
            }
          }
        }
        setOutput(${v});
      }
    `}}let eL={kernelName:o.AvgPool,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t;(0,d.assertNotComplex)(a,"avgPool");let{filterSize:i,strides:s,pad:l,dimRoundingMode:u}=n;o.util.assert(o.backend_util.eitherStridesOrDilationsAreOne(s,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${s} and dilations '1'`);let c=o.backend_util.computePool2DInfo(a.shape,i,s,1,l,u);if(1===c.filterWidth&&1===c.filterHeight&&o.util.arraysEqual(c.inShape,c.outShape))return I({inputs:{x:a},backend:r});let p=new eD(c,"avg",!1);return r.runWebGLProgram(p,[a],"float32")}},eB={kernelName:o.AvgPool3D,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{filterSize:i,strides:s,pad:l,dimRoundingMode:u,dataFormat:d}=n,c=new eP(o.backend_util.computePool3DInfo(a.shape,i,s,[1,1,1],l,u,d),"avg",!1);return r.runWebGLProgram(c,[a],"float32")}};class eV{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,a=e.strideWidth,i=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=s-1-e.padInfo.top,d=l-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${u}, ${d});
      const float avgMultiplier = float(${1/(t*r)});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
            wR += ${i}) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${l};
            wC+= ${o}) {
            float dyC = float(dyCCorner + wC) / ${a}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}}class eW{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,n=e.filterWidth,a=e.strideDepth,i=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,d=e.effectiveFilterDepth,c=e.effectiveFilterHeight,p=e.effectiveFilterWidth,h=d-1-e.padInfo.front,f=c-1-e.padInfo.top,m=p-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${h}, ${f}, ${m});
      const float avgMultiplier = float(${1/(t*r*n)});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${d};
            wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${a}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${l}) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${p};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}let eM={kernelName:o.AvgPool3DGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i}=t,{filterSize:s,strides:l,pad:u,dimRoundingMode:d}=n,c=new eW(o.backend_util.computePool3DInfo(i.shape,s,l,[1,1,1],u,d));return r.runWebGLProgram(c,[a],i.dtype)}},eG={kernelName:o.AvgPoolGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i}=t;(0,d.assertNotComplex)([a,i],"avgPoolGrad");let{filterSize:s,strides:l,pad:u}=n,c=new eV(o.backend_util.computePool2DInfo(i.shape,s,l,1,u));return r.runWebGLProgram(c,[a],i.dtype)}},eU={kernelName:o.BatchMatMul,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{a,b:i}=t,{transposeA:o,transposeB:s}=n;return ea({a,b:i,transposeA:o,transposeB:s,backend:r})}};class ez{constructor(e,t,r,n,a,i){this.outputShape=[],this.variableNames=["x","mean","variance"],o.backend_util.assertAndGetBroadcastShape(e,t),o.backend_util.assertAndGetBroadcastShape(e,r);let s="0.0";null!=n&&(o.backend_util.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),s="getOffsetAtOutCoords()");let l="1.0";null!=a&&(o.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${s};
        float scale = ${l};
        float inv = scale * inversesqrt(variance + float(${i}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}}class eX{constructor(e,t,r,n,a,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],o.backend_util.assertAndGetBroadcastShape(e,t),o.backend_util.assertAndGetBroadcastShape(e,r);let s="vec4(0.0)";null!=n&&(o.backend_util.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),s="getOffsetAtOutCoords()");let l="vec4(1.0)";null!=a&&(o.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${s};
        vec4 scale = ${l};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${i}));

        setOutput((x - mean) * inv + offset);
      }
    `}}let eH={kernelName:o.FusedBatchNorm,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:n,mean:a,variance:i,offset:s,scale:l}=e;o.util.assert(a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),o.util.assert(null==s||a.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),o.util.assert(null==l||a.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:u}=r;null==u&&(u=.001);let d=[n,a,i],c=null;null!=s&&(c=s.shape,d.push(s));let p=null;null!=l&&(p=l.shape,d.push(l));let h=(0,o.env)().getBool("WEBGL_PACK_NORMALIZATION")?new eX(n.shape,a.shape,i.shape,c,p,u):new ez(n.shape,a.shape,i.shape,c,p,u);return t.runWebGLProgram(h,d,d[0].dtype)}};class eK{constructor(e){let t;this.variableNames=["source"],this.outputShape=e,this.rank=e.length;let r=(0,C.kW)(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let n=function(e){if(1===e)return"sourceLoc";if(e<=6)return ej.slice(0,e).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}(this.rank),a=e.map((e,t)=>`sourceLoc.${ej[t]} = start[${t}] + coords.${ej[t]};`);t=`
        ${r} sourceLoc;
        ${r} coords = getOutputCoords();
        ${a.join("\n")}
      `,this.userCode=`
      void main() {
        ${t}
        setOutput(getSource(${n}));
      }
    `}}let ej=["x","y","z","w","u","v"];class eq{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let t=(0,C.kW)(this.rank),r=(0,b.Ky)("coords",this.rank),n=(0,b.Ky)("sourceLoc",this.rank),a=1===this.rank?"sourceLoc":`vec2(${n.slice(-2).join()})`,i=`getChannel(getSource(${n.join()}), ${a})`,o=`
      result.x = ${i};
      if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${i};
        --${n[this.rank-1]};
      }
    `,s=1===this.rank?"":`
      --${r[this.rank-1]};
      if (++${r[this.rank-2]} < ${e[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${i};
        if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${i};
        }
      }
    `,l=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${n[t]} = ${r[t]} + start[${t}];`).join("\n");this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${l}
        vec4 result = vec4(0.);
        ${o}
        ${s}
        setOutput(result);
      }
    `}}function eY(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{begin:i,size:s}=n,[l,u]=o.slice_util.parseSliceParams(a,i,s);if(o.slice_util.assertParamsValid(a,l,u),0===o.util.sizeFromShape(u))return r.makeTensorInfo(u,a.dtype,[]);if(r.shouldExecuteOnCPU([a])||"string"===a.dtype){let e=r.texData.get(a.dataId),t=(0,M.nT)(e.values,l,u,a.shape,a.dtype);return r.makeTensorInfo(u,a.dtype,t)}let{isPacked:d}=r.texData.get(a.dataId),c=o.slice_util.isSliceContinous(a.shape,l,u);if(d||!c){let e=(0,o.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new eq(u):new eK(u),t=[l];return r.runWebGLProgram(e,[a],a.dtype,t)}return r.uploadToGPU(a.dataId),function(e,t,r,n){let a=n.texData.get(e.dataId),i=n.makeTensorInfo(r,e.dtype),s=n.texData.get(i.dataId);Object.assign(s,a),s.refCount=1,s.shape=r,s.dtype=e.dtype;let l=o.slice_util.computeFlatOffset(t,o.util.computeStrides(e.shape));a.slice&&(l+=a.slice.flatOffset),s.slice={flatOffset:l,origDataId:a.slice&&a.slice.origDataId||e.dataId};let u=n.dataRefCount.get(s.slice.origDataId)||1;return n.dataRefCount.set(s.slice.origDataId,u+1),i}(a,l,u,r)}let eQ={kernelName:o.Slice,backendName:"webgl",kernelFunc:eY},eZ={kernelName:o.BatchToSpaceND,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{blockShape:i,crops:s}=n;o.util.assert(a.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let l=i.reduce((e,t)=>e*t),u=o.backend_util.getReshaped(a.shape,i,l),d=o.backend_util.getPermuted(u.length,i.length),c=o.backend_util.getReshapedPermuted(a.shape,i,l),p=o.backend_util.getSliceBeginCoords(s,i.length),h=o.backend_util.getSliceSize(c,s,i.length),f=[],m=H({inputs:{x:a},backend:r,attrs:{shape:u}}),x=er({inputs:{x:m},backend:r,attrs:{perm:d}}),g=H({inputs:{x:x},backend:r,attrs:{shape:c}}),b=eY({inputs:{x:g},backend:r,attrs:{begin:p,size:h}});return f.push(m),f.push(x),f.push(g),f.forEach(e=>r.disposeIntermediateTensorInfo(e)),b}},eJ={kernelName:o.Bincount,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,weights:i}=t,{size:o}=n,s=r.readSync(a.dataId),l=r.readSync(i.dataId),u=(0,M.qO)(s,l,i.dtype,i.shape,o);return r.makeTensorInfo([o],i.dtype,u)}},e0=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,e1=`
  return float(int(a.r) & int(b.r));
`,e2={kernelName:o.BitwiseAnd,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n}=e,{a,b:i}=r,s=(0,o.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS"),l=(0,o.env)().getNumber("WEBGL_VERSION");if(n.shouldExecuteOnCPU([a,i])||1===l){let e=n.texData.get(a.dataId).values,t=n.texData.get(i.dataId).values,[r,o]=(0,M.XM)(a.shape,i.shape,e,t,a.dtype),s=n.makeTensorInfo(o,a.dtype);return n.texData.get(s.dataId).values=r,s}return t=s?new y(e0,a.shape,i.shape,!1):new g(e1,a.shape,i.shape),n.runWebGLProgram(t,[a,i],a.dtype)}},e4={kernelName:o.BroadcastArgs,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{s0:n,s1:a}=t,i=r.readSync(n.dataId),s=r.readSync(a.dataId),l=o.backend_util.assertAndGetBroadcastShape(Array.from(i),Array.from(s));return r.makeTensorInfo([l.length],"int32",Int32Array.from(l))}},e3=P({opSnippet:"return float(a != b);",cpuKernelImpl:M.cZ,dtype:"bool"}),e5={kernelName:o.NotEqual,backendName:"webgl",kernelFunc:e3};function e6(e){let{inputs:t,backend:r}=e,{input:n}=t;return I({inputs:{x:r.texData.get(n.dataId).complexTensorInfos.real},backend:r})}let e9={kernelName:o.Real,backendName:"webgl",kernelFunc:e6},e8={kernelName:o.Cast,backendName:"webgl",kernelFunc:function e(t){let{inputs:r,backend:n,attrs:a}=t,{x:i}=r,{dtype:s}=a;if("complex64"===s){if("complex64"===i.dtype)return I({inputs:{x:i},backend:n});let t=o.zeros(i.shape),r=e({inputs:{x:i},backend:n,attrs:{dtype:"float32"}}),a=R({inputs:{real:r,imag:t},backend:n});return t.dispose(),n.disposeIntermediateTensorInfo(r),a}if("complex64"===i.dtype){let t=e6({inputs:{input:i},backend:n}),r=e({inputs:{x:t},backend:n,attrs:{dtype:s}});return n.disposeIntermediateTensorInfo(t),r}if(!o.util.hasEncodingLoss(i.dtype,s)){let e=I({inputs:{x:i},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:s}}if(n.shouldExecuteOnCPU([i])){let e=n.texData.get(i.dataId).values,[t,r,a]=(0,M.cm)(e,i.shape,i.dtype,s);return n.makeTensorInfo(t,r,a)}if("int32"===s)return function(e,t){let r=new _.l(e.shape,"return float(int(x));"),n=t.runWebGLProgram(r,[e],"int32");return{dataId:n.dataId,shape:n.shape,dtype:n.dtype}}(i,n);if("bool"===s){let e=n.makeTensorInfo([],"bool",o.util.getTypedArrayFromDType("bool",1)),t=e3({inputs:{a:i,b:e},backend:n});return n.disposeIntermediateTensorInfo(e),t}throw Error(`Error in Cast: failed to cast ${i.dtype} to ${s}`)}},e7="return ceil(x);",te=D({opSnippet:e7,packedOpSnippet:e7,cpuKernelImpl:M.pk}),tt={kernelName:o.Ceil,backendName:"webgl",kernelFunc:te};class tr{constructor(e){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}}class tn{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}}let ta={kernelName:o.ClipByValue,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{clipValueMin:s,clipValueMax:l}=a;return t=(0,o.env)().getBool("WEBGL_PACK_CLIP")?new tn(i.shape):new tr(i.shape),n.runWebGLProgram(t,[i],i.dtype,[[s],[l]])}};class ti{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}}function to(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}let ts={kernelName:o.ComplexAbs,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:n}=t,a=r.texData.get(n.dataId),i=new ti(n.shape),o=[to(n,a.complexTensorInfos.real),to(n,a.complexTensorInfos.imag)];return r.runWebGLProgram(i,o,o[0].dtype)}};class tl{constructor(e){this.outputShape=[],this.outputShape=o.backend_util.computeOutShape(e,1),this.variableNames=e.map((e,t)=>`T${t}`);let t=Array(e.length-1);t[0]=e[0][1];for(let r=1;r<t.length;r++)t[r]=t[r-1]+e[r][1];let r=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){let n=t[e-1];r.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${n}));`)}let n=t.length,a=t[t.length-1];r.push(`else setOutput(getT${n}(yR, yC-${a}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${r.join("\n        ")}
      }
    `}}class tu{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=o.backend_util.computeOutShape(e,t);let r=this.outputShape,n=r.length,a=(0,C.kW)(n),i=(0,b.Ky)("coords",n),s=["x","y","z","w","u","v"].slice(0,n);this.variableNames=e.map((e,t)=>`T${t}`);let l=Array(e.length-1);l[0]=e[0][t];for(let r=1;r<l.length;r++)l[r]=l[r-1]+e[r][t];let u=s[t],d=s.slice(-2),c=s.join(),p=`if (${u} < ${l[0]}) {
        return getChannel(
            getT0(${c}), vec2(${d.join()}));
        }`;for(let e=1;e<l.length;e++){let t=l[e-1];p+=`
        if (${u} < ${l[e]}  && ${u} >= ${l[e-1]}) {
          return getChannel(
            getT${e}(${td(s,u,t)}),
            vec2(${td(d,u,t)}));
        }`}let h=l.length,f=l[l.length-1];p+=`
        return getChannel(
          getT${h}(${td(s,u,f)}),
          vec2(${td(d,u,f)}));`,this.userCode=`
      float getValue(${s.map(e=>"int "+e)}) {
        ${p}
      }

      void main() {
        ${a} coords = getOutputCoords();
        vec4 result = vec4(getValue(${i}), 0., 0., 0.);

        ${i[n-1]} = ${i[n-1]} + 1;
        if (${i[n-1]} < ${r[n-1]}) {
          result.g = getValue(${i});
        }

        ${i[n-2]} = ${i[n-2]} + 1;
        if (${i[n-2]} < ${r[n-2]}) {
          result.a = getValue(${i});
        }

        ${i[n-1]} = ${i[n-1]} - 1;
        if (${i[n-2]} < ${r[n-2]} &&
            ${i[n-1]} < ${r[n-1]}) {
          result.b = getValue(${i});
        }
        setOutput(result);
      }
    `}}function td(e,t,r){let n=e.indexOf(t);return e.map((e,t)=>t===n?`${e} - ${r}`:e).join()}function tc(e){let{inputs:t,backend:r}=e,{input:n}=t;return I({inputs:{x:r.texData.get(n.dataId).complexTensorInfos.imag},backend:r})}let tp={kernelName:o.Imag,backendName:"webgl",kernelFunc:tc};function th(e){let{inputs:t,backend:r,attrs:n}=e,{axis:a}=n,i=o.util.parseAxisParam(a,t[0].shape)[0],s=t.map(e=>e.shape);o.backend_util.assertParamsConsistent(s,i);let l=o.backend_util.computeOutShape(t.map(e=>e.shape),i);if(0===o.util.sizeFromShape(l))return r.makeTensorInfo(l,t[0].dtype,[]);let u=t.filter(e=>o.util.sizeFromShape(e.shape)>0);return 1===u.length?I({inputs:{x:u[0]},backend:r}):function e(t,r,n){let a=t[0].dtype;if("complex64"===a){let a=t.map(e=>e6({inputs:{input:e},backend:n})),i=t.map(e=>tc({inputs:{input:e},backend:n})),o=e(a,r,n),s=e(i,r,n),l=R({inputs:{real:o,imag:s},backend:n});return a.forEach(e=>n.disposeIntermediateTensorInfo(e)),i.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(s),l}let i=n.shouldExecuteOnCPU(t);if("string"===a&&(i=!0),i){let e=t.map(e=>{let t=o.util.sizeFromShape(e.shape.slice(r));return H({inputs:{x:e},backend:n,attrs:{shape:[-1,t]}})}),i=e.map(e=>({vals:n.readSync(e.dataId),shape:e.shape})),s=o.backend_util.computeOutShape(e.map(e=>e.shape),1),l=1===e[0].shape[0],u=(0,M.n7)(i,s,a,l),d=o.backend_util.computeOutShape(t.map(e=>e.shape),r),c=n.makeTensorInfo(d,a,u);return e.forEach(e=>n.disposeIntermediateTensorInfo(e)),c}let s=t.filter(e=>o.util.sizeFromShape(e.shape)>0),l=(0,o.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&s[0].shape.length>1;if(1===s.length){let e=l?new _.l(t[0].shape,_.bl):new F.cc(t[0].shape,_.bl);return n.runWebGLProgram(e,t,a)}let u=(0,o.env)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(s.length>u){let t=[];for(let a=0;a<s.length;a+=u){let i=s.slice(a,a+u);t.push(e(i,r,n))}let a=e(t,r,n);for(let e of t)n.disposeIntermediateTensorInfo(e);return a}if(l){let e=new tu(s.map(e=>e.shape),r);return n.runWebGLProgram(e,s,a)}let{tensors2D:d,outShape:c}=function(e,t,r){let n=o.backend_util.computeOutShape(e.map(e=>e.shape),t);return{tensors2D:e.map(e=>H({inputs:{x:e},attrs:{shape:[-1,o.util.sizeFromShape(e.shape.slice(t))]},backend:r})),outShape:n}}(s,r,n),p=new tl(d.map(e=>e.shape)),h=n.runWebGLProgram(p,d,a);d.forEach(e=>n.disposeIntermediateTensorInfo(e));let f=H({inputs:{x:h},attrs:{shape:c},backend:n});return n.disposeIntermediateTensorInfo(h),f}(u,i,r)}let tf={kernelName:o.Concat,backendName:"webgl",kernelFunc:th};class tm{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;let i=e.padInfo.top,o=e.padInfo.left,s=e.strideHeight,l=e.strideWidth,u=e.dilationHeight,d=e.dilationWidth,c=e.filterHeight,p=e.filterWidth,h=4*Math.floor(e.inChannels/4),f=e.inChannels%4,m="channelsLast"===e.dataFormat,x="",g="";r&&(x=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:a?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,g="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${x}

      const ivec2 strides = ivec2(${s}, ${l});
      const ivec2 pads = ivec2(${i}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${m?3:1}];

        ivec2 xRCCorner =
            ivec2(coords[${m?1:2}], coords[${m?2:3}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${c}; wR++) {
          int xR = xRCorner + wR * ${u};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${p}; wC++) {
            int xC = xCCorner + wC * ${d};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${h}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${m}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${1===f}) {

              if (${m}) {
                dotProd +=
                    getX(batch, xR, xC, ${h}) *
                    getW(wR, wC, ${h}, d2);
              } else {
                dotProd +=
                    getX(batch, ${h}, xR, xC) *
                    getW(wR, wC, ${h}, d2);
              }

            } else if (${2===f}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${h}, d2),
                getW(wR, wC, ${h} + 1, d2)
              );

              if (${m}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${h}),
                  getX(batch, xR, xC, ${h} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${h}, xR, xC),
                  getX(batch, ${h} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${3===f}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${h}, d2),
                getW(wR, wC, ${h} + 1, d2),
                getW(wR, wC, ${h} + 2, d2)
              );

              if (${m}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${h}),
                  getX(batch, xR, xC, ${h} + 1),
                  getX(batch, xR, xC, ${h} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${h}, xR, xC),
                  getX(batch, ${h} + 1, xR, xC),
                  getX(batch, ${h} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${g}
        setOutput(result);
      }
    `}}class tx{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let t=e.padInfo.front,r=e.padInfo.top,n=e.padInfo.left,a=e.strideDepth,i=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,d=e.filterDepth,c=e.filterHeight,p=e.filterWidth,h=4*Math.floor(e.inChannels/4),f=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${a}, ${i}, ${o});
      const ivec3 pads = ivec3(${t}, ${r}, ${n});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${d}; wF++) {
          int xF = xFCorner + wF * ${s};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${c}; wR++) {
            int xR = xRCorner + wR * ${l};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${p}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${h}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${1===f}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${h}) *
                  getW(wF, wR, wC, ${h}, d2);
              } else if (${2===f}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${h}),
                  getX(batch, xF, xR, xC, ${h} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${h}, d2),
                  getW(wF, wR, wC, ${h} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${3===f}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${h}),
                  getX(batch, xF, xR, xC, ${h} + 1),
                  getX(batch, xF, xR, xC, ${h} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${h}, d2),
                  getW(wF, wR, wC, ${h} + 1, d2),
                  getW(wF, wR, wC, ${h} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class tg{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,m.C9)(this.outputShape.length);let i=e.padInfo.left,s=e.strideWidth,l=e.dilationWidth,u=e.filterHeight,d=e.filterWidth,c=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<d;e++)c+=`
           vec4 xTexelC${2*e};
           int xTexelC${2*e}Ready;
           vec4 xTexelC${2*e+1};
           int xTexelC${2*e+1}Ready;
           vec4 xC${e};`;c+=`
     for (int r = 0; r < ${u}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let e=0;e<d;e++)c+=`
           xTexelC${2*e} = vec4(0.0);
           xTexelC${2*e}Ready = 0;
           xTexelC${2*e+1} = vec4(0.0);
           xTexelC${2*e+1}Ready = 0;
           xC${e} = vec4(0.0);`;c+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let t=0;t<(d+1)/2;t++){let r=2*t;if(c+=`
           xC = xCCorner + ${r*l};
           `,1===s){if(r<d&&(i%2==1?(c+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }
               `,1===l&&r>0?c+=`
                 xC${r} = vec4(xTexelC${r-2}.zw, xTexelC${r}.xy);
                 `:c+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${r} = vec4(previous.zw, xTexelC${r}.xy);
                   } else {
                     xC${r} = vec4(0.0, 0.0, xTexelC${r}.xy);
                   }
                   `):c+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xC${r} = xTexelC${r};
                 `,r+1<d)){let e=i%2==0?o.util.nearestLargerEven(l):l;l%2==0&&i%2==1||l%2!=0&&i%2!=1?(c+=`
                   xCOffset = xC + imod(pads[1], 2) + ${e};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                     xTexelC${r+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${r+1}.zw = vec2(0.0);
                     }
                     xTexelC${r+1}Ready = 1;
                   }
                   `,l>1?c+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${r+1} = vec4(previous.zw, xTexelC${r+1}.xy);
                     } else {
                      xC${r+1} = vec4(0.0, 0.0, xTexelC${r+1}.xy);
                     }
                     `:c+=`
                     xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.xy);
                     `):1===e?c+=`
                     xC${r+1} = xTexelC${r};
                     `:c+=`
                     xCOffset = xC + ${e};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                       xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${r+1}.zw = vec2(0.0);
                       }
                       xTexelC${r+1}Ready = 1;
                     }

                     xC${r+1} = xTexelC${r+1};
                     `}}else r<d&&(i%2==1?(c+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${r+1}Ready == 0) {
                   xTexelC${r+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${r+1}.zw = vec2(0.0);
                   }
                   xTexelC${r+1}Ready = 1;
                 }

                 xC${r} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
               `,r+1<d&&(c+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${r+1} = vec4(xTexelC${r+1}.xy, final.xy);
                 `)):(c+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                   xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r+1}.zw = vec2(0.);
                   }
                   xTexelC${r+1}Ready = 1;
                 }

                 xC${r} = vec4(
                   xTexelC${r}.xy, xTexelC${r+1}.xy);
               `,r+1<d&&(c+=`
                   xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
                 `)));r<d&&(c+=`
             wTexel = getW(r, ${r}, d1, d2);
             dotProd += xC${r}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${r}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,r+1<d&&(c+=`
               wTexel = getW(r, ${r+1}, d1, d2);
               dotProd += xC${r+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${r+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}c+=`
     }
   
     }
   
     }
   `;let p="",h="";r&&(p=n?`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${r}
         }`:a?`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${r}
         }`:`vec4 activation(vec4 x) {
           ${r}
         }`,h="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${p}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${c}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${t?"result += getBiasAtOutCoords();":""}
         ${h}
         setOutput(result);
       }
     `}}var tb=r(3821);class tC{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=(0,m.C9)(this.outputShape.length);let{dataFormat:r}=t,n=(0,tb.A)(),a="channelsLast"===r,i=a?1:2,o=a?2:3,s=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,l="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)l+=`
          blockIndex = rc.z + ${t};
          pos = rc.y + ${e};

          ${s}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${i}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${o}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${a}) {
                  innerDims = vec2(d1, ch);
                  result[${2*e+t}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${2*e+t}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${l}

        ${n.output} = result;
      }
    `}}function tv(e,t){let r=e.length;return r>=3?t?[...e.slice(0,-3),e[r-3]*e[r-2],e[r-1]]:[...e.slice(0,-3),e[r-3],e[r-2]*e[r-1]]:!t&&1===r&&e[0]>1?[e[0],1]:null}function ty({x:e,filter:t,convInfo:r,backend:n,bias:a=null,preluActivationWeights:i=null,leakyreluAlpha:s=0,activation:l=null}){let u;let c=e.shape,p=n.texData.get(e.dataId),h=r.inChannels,f=c[0]*c[1]*c[2],m=r.outChannels,x="channelsLast"===r.dataFormat,g=[];if(null!=i){let e=tv(i.shape,x);null!=e&&(i=H({inputs:{x:i},backend:n,attrs:{shape:e}}),g.push(i))}if(null!=a){let e=tv(a.shape,x);null!=e&&(a=H({inputs:{x:a},backend:n,attrs:{shape:e}}),g.push(a))}if(!((1===f||1===m)&&h>1e3)&&p.isPacked&&x&&null!=p.texture&&c[2]%2!=0&&o.util.arraysEqual(p.shape.slice(-3),c.slice(-3))){let h=c[0]*c[1]*(c[2]+1),f={dataId:e.dataId,shape:[1,h,r.inChannels],dtype:e.dtype},m=p.shape;p.shape=p.shape.slice(),p.shape[p.shape.length-2]++,o.util.assert(d.isReshapeFree(p.shape,f.shape),()=>`packed reshape ${p.shape} to ${f.shape} isn't free`);let x=H({inputs:{x:t},backend:n,attrs:{shape:[1,r.inChannels,r.outChannels]}});g.push(x);let b=ea({a:f,b:x,backend:n,transposeA:!1,transposeB:!1,bias:a,activation:l,preluActivationWeights:i,leakyreluAlpha:s}),C=n.texData.get(b.dataId);o.util.assert(C.isPacked,()=>"batchMatMul result is expected to be packed"),p.shape=m,C.shape=r.outShape,(u=I({inputs:{x:b},backend:n})).shape=r.outShape,g.push(b)}else{let o=r.outHeight*r.outWidth,d=H({inputs:{x:e},backend:n,attrs:{shape:x?[r.batchSize,o,r.inChannels]:[r.batchSize,r.inChannels,o]}}),c=H({inputs:{x:t},backend:n,attrs:{shape:[1,r.inChannels,r.outChannels]}}),p=ea({a:x?d:c,b:x?c:d,transposeA:!x,transposeB:!1,backend:n,bias:a,activation:l,preluActivationWeights:i,leakyreluAlpha:s});u=H({inputs:{x:p},backend:n,attrs:{shape:r.outShape}}),g.push(d),g.push(c),g.push(p)}for(let e of g)n.disposeIntermediateTensorInfo(e);return u}function tI({x:e,filter:t,convInfo:r,backend:n,bias:a=null,preluActivationWeights:i=null,leakyreluAlpha:s=0,activation:l=null}){let{filterWidth:u,filterHeight:d,inChannels:c,outWidth:p,outHeight:h,dataFormat:f}=r,m="channelsLast"===f,x=u*d*c,g=h*p,b=[r.batchSize,x,g],C=[];if(null!=i){let e=tv(i.shape,m);null!=e&&(i=H({inputs:{x:i},backend:n,attrs:{shape:e}}),C.push(i))}if(null!=a){let e=tv(a.shape,m);null!=e&&(a=H({inputs:{x:a},backend:n,attrs:{shape:e}}),C.push(a))}let v=H({inputs:{x:t},backend:n,attrs:{shape:[1,x,o.util.sizeFromShape(t.shape)/x]}});C.push(v);let y=new tC(b,r),I=[e.shape,[r.padInfo.top,r.padInfo.left],[r.strideHeight,r.strideWidth],[r.dilationHeight,r.dilationWidth],[r.inChannels],[r.filterWidth*r.inChannels],[r.outWidth]],$=n.runWebGLProgram(y,[e],"float32",I),R=H({inputs:{x:$},backend:n,attrs:{shape:b}});C.push($),C.push(R);let w=null!=a,T=null!=i,k="leakyrelu"===l,S=l?L(l,!0):null,E=new B(m?R.shape:v.shape,m?v.shape:R.shape,m?[r.batchSize,g,r.outChannels]:[r.batchSize,r.outChannels,g],!0,!1,w,S,T,k),N=m?[R,v]:[v,R];if(a&&N.push(a),T&&N.push(i),k){let e=n.makeTensorInfo([],"float32",o.util.createScalarValue(s,"float32"));N.push(e),C.push(e)}let A=n.runWebGLProgram(E,N,"float32"),_=H({inputs:{x:A},backend:n,attrs:{shape:r.outShape}});for(let e of(C.push(A),C))n.disposeIntermediateTensorInfo(e);return _}let t$={kernelName:o.Conv2D,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s}=r,{strides:l,pad:u,dataFormat:d,dilations:c,dimRoundingMode:p}=a,h=o.backend_util.convertConv2DDataFormat(d),f=o.backend_util.computeConv2DInfo(i.shape,s.shape,l,c,u,p,!1,h);if(1===f.filterHeight&&1===f.filterWidth&&1===f.dilationHeight&&1===f.dilationWidth&&1===f.strideHeight&&1===f.strideWidth&&("SAME"===f.padInfo.type||"VALID"===f.padInfo.type))t=ty({x:i,filter:s,convInfo:f,backend:n});else if(f.strideWidth<=2&&"channelsLast"===h&&(0,o.env)().getBool("WEBGL_EXP_CONV")){let e=new tg(f),r=[[f.padInfo.top,f.padInfo.left],[f.strideHeight,f.strideWidth],[f.dilationHeight,f.dilationWidth],[f.inHeight,f.inWidth]];t=n.runWebGLProgram(e,[i,s],"float32",r)}else if((0,o.env)().getBool("WEBGL_CONV_IM2COL"))t=tI({x:i,filter:s,convInfo:f,backend:n});else{let e=new tm(f);t=n.runWebGLProgram(e,[i,s],"float32")}let m=H({inputs:{x:t},backend:n,attrs:{shape:f.outShape}});return n.disposeIntermediateTensorInfo(t),m}};class tR{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,n=e.padInfo.top,a=e.padInfo.left,i="channelsLast"===e.dataFormat;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${n};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${a};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${i?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class tw{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,a=e.strideWidth,i="channelsLast"===e.dataFormat,o=t-1-e.padInfo.top,s=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${i?3:1}];

        ivec2 dyCorner = ivec2(coords[${i?1:2}], coords[${i?2:3}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${a}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${i}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}}class tT{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideDepth,r=e.strideHeight,n=e.strideWidth,a=e.padInfo.front,i=e.padInfo.top,o=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${a};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${r} - ${i};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${n} - ${o};

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class tk{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,n=e.filterWidth,a=e.strideDepth,i=e.strideHeight,o=e.strideWidth,s=t-1-e.padInfo.front,l=r-1-e.padInfo.top,u=n-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${s}, ${l}, ${u});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${a}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${r}; wR++) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${r} - 1 - wR;

            for (int wC = 0; wC < ${n}; wC++) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${n} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}let tS={kernelName:o.Conv2DBackpropFilter,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,dy:i}=t,{strides:s,pad:l,dataFormat:u,dimRoundingMode:d,filterShape:c}=n,p=o.backend_util.convertConv2DDataFormat(u),h=new tR(o.backend_util.computeConv2DInfo(a.shape,c,s,1,l,d,!1,p));return r.runWebGLProgram(h,[a,i],"float32")}};class tE{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=(0,m.C9)(this.outputShape.length);let t=e.filterHeight,r=e.filterWidth,n=t-1-e.padInfo.top,a=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${n}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            int wCPerm = ${r} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}}let tN={kernelName:o.Conv2DBackpropInput,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,filter:i}=t,{inputShape:s,strides:l,pad:u,dataFormat:d,dimRoundingMode:c}=n,p=o.backend_util.convertConv2DDataFormat(d),h=o.backend_util.computeConv2DInfo(s,i.shape,l,1,u,c,!1,p);if((0,o.env)().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&"channelsLast"===p){let e=[[h.strideHeight,h.strideWidth]],t=new tE(h);return r.runWebGLProgram(t,[a,i],"float32",e)}{let e=new tw(h);return r.runWebGLProgram(e,[a,i],"float32")}}},tA={kernelName:o.Conv3D,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,filter:i}=t,{strides:s,pad:l,dilations:u}=n,d=new tx(o.backend_util.computeConv3DInfo(a.shape,i.shape,s,u,l));return r.runWebGLProgram(d,[a,i],"float32")}},t_={kernelName:o.Conv3DBackpropFilterV2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,dy:i}=t,{strides:s,pad:l,filterShape:u}=n,d=new tT(o.backend_util.computeConv3DInfo(a.shape,u,s,1,l));return r.runWebGLProgram(d,[a,i],"float32")}},tF={kernelName:o.Conv3DBackpropInputV2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,filter:i}=t,{pad:s,strides:l,inputShape:u}=n,d=new tk(o.backend_util.computeConv3DInfo(u,i.shape,l,1,s));return r.runWebGLProgram(d,[a,i],"float32")}},tO=D({opSnippet:O+`
  return cos(x);
`,packedOpSnippet:`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${v}
  return result;
`}),tD={kernelName:o.Cos,backendName:"webgl",kernelFunc:tO},tP=D({opSnippet:`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`}),tL={kernelName:o.Cosh,backendName:"webgl",kernelFunc:tP};class tB{constructor(e,t,r,n,a){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[i,o,s,l]=e,[u]=t,[d,c]=r;this.outputShape=[u,d,c,l];let[p,h]=[`${o-1}.0`,`${s-1}.0`],[f,m,x]=d>1?[`${(o-1)/(d-1)}`,"(y2-y1) * height_ratio",`y1*${p} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${p}`],[g,b,C]=c>1?[`${(s-1)/(c-1)}`,"(x2-x1) * width_ratio",`x1*${h} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${h}`];this.userCode=`
      const float height_ratio = float(${f});
      const float width_ratio = float(${g});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${i}) {
          return;
        }

        float height_scale = ${m};
        float width_scale = ${b};

        float in_y = ${x};
        if( in_y < 0.0 || in_y > ${p} ) {
          setOutput(float(${a}));
          return;
        }
        float in_x = ${C};
        if( in_x < 0.0 || in_x > ${h} ) {
          setOutput(float(${a}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${"bilinear"===n?1:0} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}}let tV={kernelName:o.CropAndResize,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{image:a,boxes:i,boxInd:o}=t,{cropSize:s,method:l,extrapolationValue:u}=n,d=new tB(a.shape,i.shape,s,l,u);return r.runWebGLProgram(d,[a,i,o],"float32")}};(a=i||(i={})).Prod="*",a.Sum="+";class tW{constructor(e,t,r,n){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let a=this.outputShape.length,o=this.op===i.Prod?"1.0":"0.0",s=r?o:`getX(${tM(a,"coords",this.op)})`,l=this.outputShape[this.outputShape.length-1],u="",d="";r?(u=n?`end != ${l-1}`:"end != 0",d=n?"end + 1":"end - 1"):(u=n?`end + pow2 < ${l}`:"end >= pow2",d=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${(0,C.kW)(a)} coords = getOutputCoords();
        int end = ${tG(a,"coords",this.op)};
        float val = ${s};
        int pow2 = int(pow(2.0, index));
        if (${u}) {
          int idx = ${d};
          ${tG(a,"coords",this.op)} = idx;
          val ${this.op}= getX(${tM(a,"coords",this.op)});
        }
        setOutput(val);
      }
    `}}function tM(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.x, ${t}.y`;if(3===e)return`${t}.x, ${t}.y, ${t}.z`;if(4===e)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}function tG(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.y`;if(3===e)return`${t}.z`;if(4===e)return`${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}function tU(e,t,r,n,a,i){let s=t.shape.length,l=o.backend_util.getAxesPermutation([n],s),u=t;null!=l&&(u=er({inputs:{x:t},backend:r,attrs:{perm:l}}));let d=o.backend_util.getInnerMostAxes(1,s)[0];if(d!==s-1)throw Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${n}`);let c=u.shape[d],p=I({inputs:{x:u},backend:r});for(let t=0;t<=Math.ceil(Math.log2(c))-1;t++){let n=new tW(e,u.shape,!1,i),a=[[t]],o=p;p=r.runWebGLProgram(n,[p],p.dtype,a),r.disposeIntermediateTensorInfo(o)}if(a){let t=new tW(e,u.shape,a,i),n=p;p=r.runWebGLProgram(t,[p],p.dtype),r.disposeIntermediateTensorInfo(n)}if(null!=l){let e=er({inputs:{x:p},backend:r,attrs:{perm:o.backend_util.getUndoAxesPermutation(l)}});return r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(u),e}return p}let tz={kernelName:o.Cumprod,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:o,exclusive:s,reverse:l}=n;return tU(i.Prod,a,r,o,s,l)}},tX={kernelName:o.Cumsum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:o,exclusive:s,reverse:l}=n;return tU(i.Sum,a,r,o,s,l)}},tH={kernelName:o.DenseBincount,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,weights:i}=t,{size:o,binaryOutput:s}=n;if(1===a.shape.length){let e=r.readSync(a.dataId),t=r.readSync(i.dataId),n=(0,M.qO)(e,t,i.dtype,i.shape,o);return r.makeTensorInfo([o],i.dtype,n)}if(2===a.shape.length){let e=r.bufferSync(a),t=r.bufferSync(i),n=(0,M.cx)(e,t,o,s);return r.makeTensorInfo(n.shape,i.dtype,n.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${a.shape.length}.`)}};class tK{constructor(e,t,r){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=r,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}}let tj={kernelName:o.DepthToSpace,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{blockSize:i,dataFormat:o}=n,s=a.shape[0],l="NHWC"===o?a.shape[1]:a.shape[2],u="NHWC"===o?a.shape[2]:a.shape[3],d="NHWC"===o?a.shape[3]:a.shape[1],c=l*i,p=u*i,h=d/(i*i),f=new tK("NHWC"===o?[s,c,p,h]:[s,h,c,p],i,o);return r.runWebGLProgram(f,[a],a.dtype)}};class tq{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,m.C9)(this.outputShape.length);let i=e.filterHeight,o=e.filterWidth,s=e.outChannels/e.inChannels,l="",u="";r&&(l=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:a?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,u="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${l}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${s};
        int q = d2 - d1 * ${s};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${i}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${o}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${u}
        setOutput(result);
      }
    `}}class tY{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,m.C9)(this.outputShape.length);let i=e.outChannels/e.inChannels,s=e.padInfo.left,l=e.strideWidth,u=e.dilationWidth,d=e.filterHeight,c=e.filterWidth,p=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<c;e++)p+=`
          vec4 xTexelC${2*e};
          int xTexelC${2*e}Ready;
          vec4 xTexelC${2*e+1};
          int xTexelC${2*e+1}Ready;
          vec4 xC${e};`;p+=`
    for (int r = 0; r < ${d}; r++) {
      `;for(let e=0;e<c;e++)p+=`
          xTexelC${2*e} = vec4(0.0);
          xTexelC${2*e}Ready = 0;
          xTexelC${2*e+1} = vec4(0.0);
          xTexelC${2*e+1}Ready = 0;
          xC${e} = vec4(0.0);`;p+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let e=0;e<(c+1)/2;e++){let t=2*e;if(p+=`
          xC = xCCorner + ${t*u};
          `,1===l){if(t<c&&(s%2==1?(p+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }
              `,1===u&&t>0?p+=`
                xC${t} = vec4(xTexelC${t-2}.zw, xTexelC${t}.xy);
                `:p+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${t} = vec4(previous.zw, xTexelC${t}.xy);
                  } else {
                    xC${t} = vec4(0.0, 0.0, xTexelC${t}.xy);
                  }
                  `):p+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xC${t} = xTexelC${t};
                `,t+1<c)){let e=s%2==0?o.util.nearestLargerEven(u):u;u%2==0&&s%2==1||u%2!=0&&s%2!=1?(p+=`
                  xCOffset = xC + imod(pads[1], 2) + ${e};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                    xTexelC${t+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${t+1}.zw = vec2(0.0);
                    }
                    xTexelC${t+1}Ready = 1;
                  }
                  `,u>1?p+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${t+1} = vec4(previous.zw, xTexelC${t+1}.xy);
                    } else {
                     xC${t+1} = vec4(0.0, 0.0, xTexelC${t+1}.xy);
                    }
                    `:p+=`
                    xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.xy);
                    `):1===e?p+=`
                    xC${t+1} = xTexelC${t};
                    `:p+=`
                    xCOffset = xC + ${e};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                      xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${t+1}.zw = vec2(0.0);
                      }
                      xTexelC${t+1}Ready = 1;
                    }

                    xC${t+1} = xTexelC${t+1};
                    `}}else t<c&&(s%2==1?(p+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.0);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
              `,t+1<c&&(p+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${t+1} = vec4(xTexelC${t+1}.xy, final.xy);
                `)):(p+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(
                  xTexelC${t}.xy, xTexelC${t+1}.xy);
              `,t+1<c&&(p+=`
                  xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
                `)));t<c&&(p+=`
            wTexel = getW(r, ${t}, d1, q);
            dotProd += xC${t} * vec4(wTexel.xz, wTexel.xz);
          `,t+1<c&&(p+=`
              wTexel = getW(r, ${t+1}, d1, q);
              dotProd += xC${t+1} * vec4(wTexel.xz, wTexel.xz);
            `))}p+=`
    }
  
      }
    `;let h="",f="";r&&(h=n?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:a?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`vec4 activation(vec4 x) {
          ${r}
        }`,f="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${h}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${i};
        int q = d2 - d1 * ${i};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${p}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${t?"result += getBiasAtOutCoords();":""}
        ${f}
        setOutput(result);
      }
    `}}let tQ={kernelName:o.DepthwiseConv2dNative,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s}=r,{strides:l,pad:u,dilations:d,dimRoundingMode:c}=a,p=d;null==p&&(p=[1,1]),o.util.assert(o.backend_util.eitherStridesOrDilationsAreOne(l,p),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${p}'`);let h=o.backend_util.computeConv2DInfo(i.shape,s.shape,l,p,u,c,!0);t=(0,o.env)().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels==1?new tY(h):new tq(h);let f=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]];return n.runWebGLProgram(t,[i,s],"float32",f)}};class tZ{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,n=e.padInfo.top,a=e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${i} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${n};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${a};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class tJ{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,a=e.strideWidth,i=t-1-e.padInfo.top,o=r-1-e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${a}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${s}; dm++) {
              int d2 = d1 * ${s} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}let t0={kernelName:o.DepthwiseConv2dNativeBackpropFilter,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,dy:i}=t,{strides:s,dilations:l,pad:u,dimRoundingMode:d,filterShape:c}=n,p=new tZ(o.backend_util.computeConv2DInfo(a.shape,c,s,l,u,d,!0));return r.runWebGLProgram(p,[a,i],"float32")}},t1={kernelName:o.DepthwiseConv2dNativeBackpropInput,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,filter:i}=t,{strides:s,dilations:l,pad:u,dimRoundingMode:d,inputShape:c}=n,p=new tJ(o.backend_util.computeConv2DInfo(c,i.shape,s,l,u,d,!0));return r.runWebGLProgram(p,[a,i],"float32")}};class t2{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}}let t4={kernelName:o.Diag,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:n}=t,a=[...n.shape,...n.shape],i=o.util.sizeFromShape(n.shape),s=H({inputs:{x:n},backend:r,attrs:{shape:[i]}}),l=new t2(i),u=r.runWebGLProgram(l,[s],s.dtype),d=H({inputs:{x:u},backend:r,attrs:{shape:a}});return r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(u),d}};class t3{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let{inHeight:t,inWidth:r,padInfo:n,strideHeight:a,strideWidth:i,filterHeight:o,filterWidth:s,dilationHeight:l,dilationWidth:u}=e,{top:d,left:c}=n;this.userCode=`
      const ivec2 strides = ivec2(${a}, ${i});
      const ivec2 pads = ivec2(${d}, ${c});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${o}; h++) {
          int hIn = hBeg + h * ${l};

          if (hIn >= 0 && hIn < ${t}) {
            for (int w = 0; w < ${s}; w++) {
              int wIn = wBeg + w * ${u};

              if (wIn >= 0 && wIn < ${r}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}}let t5={kernelName:o.Dilation2D,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s}=r,{strides:l,pad:u,dilations:d}=a,c=o.backend_util.computeDilation2DInfo(i.shape,s.shape,l,u,"NHWC",d),p=new t3(c),h=H({inputs:{x:t=n.runWebGLProgram(p,[i,s],"float32")},backend:n,attrs:{shape:c.outShape}});return n.disposeIntermediateTensorInfo(t),h}},t6={kernelName:o.Einsum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{equation:a}=n,{allDims:i,summedDims:s,idDims:l}=o.backend_util.decodeEinsumEquation(a,t.length);o.backend_util.checkEinsumDimSizes(i.length,l,t);let{path:u,steps:d}=o.backend_util.getEinsumComputePath(s,l),c=d.length,p=null,h=i.length,f=[];for(let e=0;e<c;++e){for(let n of d[e]){let e;let{permutationIndices:a,expandDims:i}=o.backend_util.getEinsumPermutation(h,l[n]);o.backend_util.isIdentityPermutation(a)?e=t[n]:(e=er({inputs:{x:t[n]},backend:r,attrs:{perm:a}}),f.push(e));let s=e.shape.slice();for(let e=0;e<i.length;++e)s.splice(i[e],0,1);o.util.arraysEqual(e.shape,s)||(e=H({inputs:{x:e},backend:r,attrs:{shape:s}}),f.push(e)),null===p?p=e:(p=U({inputs:{a:e,b:p},backend:r}),f.push(p))}e<c-1&&(u[e]>=0&&(p=ee({inputs:{x:p},backend:r,attrs:{axis:u[e]-(i.length-h),keepDims:!1}}),f.push(p)),h--)}for(let e of f)e!==p&&r.disposeIntermediateTensorInfo(e);return p}},t9=D({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`}),t8={kernelName:o.Elu,backendName:"webgl",kernelFunc:t9},t7=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,re={kernelName:o.EluGrad,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r}=e,{dy:n,y:a}=t,i=(0,o.env)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new y(t7,n.shape,a.shape):new g("return (b >= 0.0) ? a : a * (b + 1.0);",n.shape,a.shape);return r.runWebGLProgram(i,[n,a],n.dtype)}},rt=P({opSnippet:"return float(a == b);",packedOpSnippet:`
  return vec4(equal(a, b));
`,dtype:"bool",cpuKernelImpl:M.gv}),rr={kernelName:o.Equal,backendName:"webgl",kernelFunc:rt},rn=D({opSnippet:`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${o.backend_util.ERF_P};
  float a1 = ${o.backend_util.ERF_A1};
  float a2 = ${o.backend_util.ERF_A2};
  float a3 = ${o.backend_util.ERF_A3};
  float a4 = ${o.backend_util.ERF_A4};
  float a5 = ${o.backend_util.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`}),ra={kernelName:o.Erf,backendName:"webgl",kernelFunc:rn},ri=D({opSnippet:O+`
  return exp(x);
`,packedOpSnippet:`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:M.aX,dtype:"float32"}),ro={kernelName:o.Exp,backendName:"webgl",kernelFunc:ri};function rs(e){let{inputs:t,attrs:r,backend:n}=e,{dim:a}=r,{input:i}=t,s=i.shape.length,l=i.shape.slice(),u=a;return a<0&&(o.util.assert(-(s+1)<=a,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+a+1),l.splice(u,0,1),H({inputs:{x:i},backend:n,attrs:{shape:l}})}let rl={kernelName:o.ExpandDims,backendName:"webgl",kernelFunc:rs},ru="return exp(x) - 1.0;",rd=D({opSnippet:ru,packedOpSnippet:ru,cpuKernelImpl:M.tx}),rc={kernelName:o.Expm1,backendName:"webgl",kernelFunc:rd};class rp{constructor(e,t,r){let n;this.variableNames=["real","imag"];let a=t[1];this.outputShape=t;let i=r?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,o=r?`${a}.0`:"1.0";if("real"===e)n="return real * expR - imag * expI;";else if("imag"===e)n="return real * expI + imag * expR;";else throw Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${i};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${n}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${a});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${a}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${o};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}}function rh(e,t,r){let n=r.texData.get(e.dataId),a=o.util.sizeFromShape(e.shape),i=e.shape[e.shape.length-1],s=H({inputs:{x:e},backend:r,attrs:{shape:[a/i,i]}}),l=s.shape,u=new rp("real",l,t),d=new rp("imag",l,t),c=[{dataId:n.complexTensorInfos.real.dataId,dtype:n.complexTensorInfos.real.dtype,shape:l},{dataId:n.complexTensorInfos.imag.dataId,dtype:n.complexTensorInfos.imag.dtype,shape:l}],p=r.runWebGLProgram(u,c,"float32"),h=r.runWebGLProgram(d,c,"float32"),f=R({inputs:{real:p,imag:h},backend:r});r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(h);let m=H({inputs:{x:f},backend:r,attrs:{shape:e.shape}});return r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(f),m}let rf={kernelName:o.FFT,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{input:n}=t;return rh(n,!1,r)}};class rm{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}}function rx(e){let{backend:t,attrs:r}=e,{shape:n,value:a}=r,{dtype:i}=r;if("string"===(i=i||o.util.inferDtype(a))){let e=o.util.getArrayFromDType(i,o.util.sizeFromShape(n));return e.fill(a),t.makeTensorInfo(n,i,e)}{let e=new rm(n,a),r=[[a]];return t.runWebGLProgram(e,[],i,r)}}let rg={kernelName:o.Fill,backendName:"webgl",kernelFunc:rx};class rb{constructor(e){this.variableNames=["Image"],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}}let rC={kernelName:o.FlipLeftRight,backendName:"webgl",kernelFunc:({inputs:e,backend:t})=>{let{image:r}=e,n=new rb(r.shape);return t.runWebGLProgram(n,[r],r.dtype)}},rv="return floor(x);",ry=D({opSnippet:rv,packedOpSnippet:rv,cpuKernelImpl:M.MZ}),rI={kernelName:o.Floor,backendName:"webgl",kernelFunc:ry},r$=P({opSnippet:`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,packedOpSnippet:`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,dtype:"int32"}),rR={kernelName:o.FloorDiv,backendName:"webgl",kernelFunc:r$};var rw=r(7275);class rT{constructor(e){this.variableNames=["A"];let t=(0,tb.A)(),[r,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${r}.0);

        vec4 values = ${t.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}}class rk{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let t=(0,tb.A)(),[r,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${n}.0, ${r}.0);
            vec4 values = ${t.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${t.output} = result;
      }
    `}}let rS={kernelName:o.FromPixels,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{pixels:i}=t,{numChannels:s}=a,l="undefined"!=typeof HTMLVideoElement&&i instanceof HTMLVideoElement,u="undefined"!=typeof HTMLImageElement&&i instanceof HTMLImageElement,[d,c]=l?[i.videoWidth,i.videoHeight]:[i.width,i.height],p=[c,d],h=[c,d,s];if(u||l){let e=(0,o.env)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(null==n||e!==rE)&&(rE=e,n=document.createElement("canvas").getContext("2d",{willReadFrequently:rE})),n.canvas.width=d,n.canvas.height=c,n.drawImage(i,0,0,d,c),i=n.canvas}let f=r.makeTensorInfo(p,"int32");r.texData.get(f.dataId).usage=rw.v2.PIXELS,r.gpgpu.uploadPixelDataToTexture(r.getTexture(f.dataId),i);let m=(0,o.env)().getBool("WEBGL_PACK")?new rk(h):new rT(h),x=r.runWebGLProgram(m,[f],"int32");return r.disposeData(f.dataId),x}},rE=(0,o.env)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU"),rN={kernelName:o.FusedConv2D,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s,bias:l,preluActivationWeights:u}=r,{strides:d,pad:c,dataFormat:p,dilations:h,dimRoundingMode:f,activation:m,leakyreluAlpha:x}=a,g=o.backend_util.convertConv2DDataFormat(p),b=o.backend_util.computeConv2DInfo(i.shape,s.shape,d,h,c,f,!1,g),C=[],v=null!=l,y=null!=u,I="leakyrelu"===m,$=()=>{let e=[i,s],t=(e,t)=>{if("NCHW"===t&&1===e.shape.length&&1!==e.shape[0]){let t=H({inputs:{x:e},backend:n,attrs:{shape:[e.shape[0],1,1]}});return C.push(t),t}return e};if(v&&e.push(t(l,p)),y&&e.push(t(u,p)),I){let t=n.makeTensorInfo([],"float32",o.util.createScalarValue(x,"float32"));e.push(t),C.push(t)}return e};if(1===b.filterHeight&&1===b.filterWidth&&1===b.dilationHeight&&1===b.dilationWidth&&1===b.strideHeight&&1===b.strideWidth&&("SAME"===b.padInfo.type||"VALID"===b.padInfo.type))t=ty({x:i,filter:s,convInfo:b,backend:n,bias:l,activation:m,preluActivationWeights:u,leakyreluAlpha:x});else if(b.strideWidth<=2&&"channelsLast"===g&&(0,o.env)().getBool("WEBGL_EXP_CONV")){let e=new tg(b,v,m?L(m,!0):null,y,I),r=[[b.padInfo.top,b.padInfo.left],[b.strideHeight,b.strideWidth],[b.dilationHeight,b.dilationWidth],[b.inHeight,b.inWidth]],a=$();t=n.runWebGLProgram(e,a,"float32",r)}else if((0,o.env)().getBool("WEBGL_CONV_IM2COL"))t=tI({x:i,filter:s,convInfo:b,backend:n,bias:l,activation:m,preluActivationWeights:u,leakyreluAlpha:x});else{let e=new tm(b,v,m?L(m,!1):null,y,I),r=$();t=n.runWebGLProgram(e,r,"float32")}let R=H({inputs:{x:t},backend:n,attrs:{shape:b.outShape}});return C.push(t),C.forEach(e=>n.disposeIntermediateTensorInfo(e)),R}},rA={kernelName:o.FusedDepthwiseConv2D,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s,bias:l,preluActivationWeights:u}=r,{strides:d,pad:c,dilations:p,dimRoundingMode:h,activation:f,leakyreluAlpha:m}=a,x=[],g=p;null==g&&(g=[1,1]),o.util.assert(o.backend_util.eitherStridesOrDilationsAreOne(d,g),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${d} and dilations '${g}'`);let b=o.backend_util.computeConv2DInfo(i.shape,s.shape,d,g,c,h,!0),C=(0,o.env)().getBool("WEBGL_PACK_DEPTHWISECONV")&&b.strideWidth<=2&&b.outChannels/b.inChannels==1,v=f?L(f,C):null,y=[i,s],I=null!=l,$=null!=u,R="leakyrelu"===f;if(I&&y.push(l),$&&y.push(u),R){let e=n.makeTensorInfo([],"float32",o.util.createScalarValue(m,"float32"));y.push(e),x.push(e)}t=C?new tY(b,I,v,$,R):new tq(b,I,v,$,R);let w=[[b.padInfo.top,b.padInfo.left],[b.strideHeight,b.strideWidth],[b.dilationHeight,b.dilationWidth],[b.inHeight,b.inWidth]],T=n.runWebGLProgram(t,y,"float32",w);return x.forEach(e=>n.disposeIntermediateTensorInfo(e)),T}};class r_{constructor(e,t,r,n){this.sliceDim=e,this.strides=t,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=r;let a=(0,C.kW)(r.length),i=`
    int index;`;for(let e=0;e<this.sliceDim;e++)i+=`
          index = round(getIndices(coords[0], ${e}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[e]};
          flattenIndex += index * ${this.strides[e]};`;this.userCode=`
         void main() {
          ${a} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${i}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}}let rF={kernelName:o.GatherNd,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{params:n,indices:a}=t,i=a.shape,s=i[i.length-1],l=o.util.sizeFromShape(n.shape),[u,d,c,p]=o.backend_util.prepareAndValidate(n,a),h=H({inputs:{x:a},backend:r,attrs:{shape:[d,s]}}),f=H({inputs:{x:n},backend:r,attrs:{shape:[o.util.sizeFromShape(n.shape)/c,c]}});if(r.shouldExecuteOnCPU([n,a])||"string"===n.dtype){let e=r.readSync(a.dataId),t=r.bufferSync(n),i=(0,M.TD)(e,t,n.dtype,d,s,c,p,n.shape,l);return r.makeTensorInfo(u,n.dtype,i.values)}let m=new r_(s,p,[d,c],n.shape),x=r.runWebGLProgram(m,[f,h],f.dtype),g=H({inputs:{x:x},backend:r,attrs:{shape:u}});return r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(x),g}};class rO{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;let r=(0,C.kW)(this.rank),n=function(e,t){let r=["resRC.x","resRC.y","resRC.z","resRC.w"],n=[];for(let t=0;t<e.length;t++)2===t?n.push("index"):n.push(`${r[t]}`);return n.join()}(e,0);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}}function rD(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,indices:i}=t,{axis:s,batchDims:l}=n,u=o.util.parseAxisParam(s,a.shape)[0];if((0,o.env)().get("DEBUG")){let e=r.readSync(i.dataId),t=a.shape[u];for(let r=0;r<e.length;++r){let n=e[r];o.util.assert(n<=t-1&&n>=0,()=>`GatherV2: the index value ${n} is not in [0, ${t-1}]`)}}let d=o.backend_util.segment_util.collectGatherOpShapeInfo(a,i,u,l),c=o.util.sizeFromShape(i.shape),p=[],h=H({inputs:{x:a},backend:r,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),f=H({inputs:{x:i},backend:r,attrs:{shape:[d.batchSize,c/d.batchSize]}});p.push(h),p.push(f);let m=[d.batchSize,d.outerSize,c/d.batchSize,d.sliceSize];if(r.shouldExecuteOnCPU([a,i])||"string"===a.dtype){let e=r.bufferSync(f),t=r.bufferSync(h),n=(0,M.m$)(t,e,m);return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(d.outputShape,n.dtype,n.values)}let x=new rO(h.shape,m),g=r.runWebGLProgram(x,[h,f],h.dtype);p.push(g);let b=H({inputs:{x:g},backend:r,attrs:{shape:d.outputShape}});return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),b}let rP={kernelName:o.GatherV2,backendName:"webgl",kernelFunc:rD},rL=P({opSnippet:"return float(a > b);",packedOpSnippet:`
  return vec4(greaterThan(a, b));
`,cpuKernelImpl:M.B_,dtype:"bool"}),rB={kernelName:o.Greater,backendName:"webgl",kernelFunc:rL},rV=P({opSnippet:"return float(a >= b);",packedOpSnippet:`
  return vec4(greaterThanEqual(a, b));
`,dtype:"bool",cpuKernelImpl:M.ji}),rW={kernelName:o.GreaterEqual,backendName:"webgl",kernelFunc:rV},rM={kernelName:o.IFFT,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{input:n}=t;return rh(n,!0,r)}},rG=D({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),rU={kernelName:o.IsFinite,backendName:"webgl",kernelFunc:rG},rz=D({opSnippet:"return float(isinf(x));",dtype:"bool"}),rX={kernelName:o.IsInf,backendName:"webgl",kernelFunc:rz},rH=D({opSnippet:"return float(isnan(x));",dtype:"bool"}),rK={kernelName:o.IsNan,backendName:"webgl",kernelFunc:rH},rj=P({opSnippet:"return float(a < b);",packedOpSnippet:`
  return vec4(lessThan(a, b));
`,cpuKernelImpl:M.kY,dtype:"bool"}),rq={kernelName:o.Less,backendName:"webgl",kernelFunc:rj},rY=P({opSnippet:"return float(a <= b);",packedOpSnippet:`
  return vec4(lessThanEqual(a, b));
`,cpuKernelImpl:M.Rn,dtype:"bool"}),rQ={kernelName:o.LessEqual,backendName:"webgl",kernelFunc:rY},rZ={kernelName:o.LinSpace,backendName:"webgl",kernelFunc:function(e){let{backend:t,attrs:r}=e,{start:n,stop:a,num:i}=r,o=(0,M.PQ)(n,a,i);return t.makeTensorInfo([o.length],"float32",o)}},rJ=D({opSnippet:O+`
  return x < 0.0 ? 0./0. : log(x);
`,packedOpSnippet:`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cpuKernelImpl:M.Sd}),r0={kernelName:o.Log,backendName:"webgl",kernelFunc:rJ},r1=D({opSnippet:O+`
  return log(1.0 + x);
`}),r2={kernelName:o.Log1p,backendName:"webgl",kernelFunc:r1},r4=P({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,dtype:"bool"}),r3={kernelName:o.LogicalAnd,backendName:"webgl",kernelFunc:r4},r5=D({opSnippet:"return float(!(x >= 1.0));"}),r6={kernelName:o.LogicalNot,backendName:"webgl",kernelFunc:r5},r9=P({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,dtype:"bool"}),r8={kernelName:o.LogicalOr,backendName:"webgl",kernelFunc:r9};class r7{constructor(e,t,r,n,a){let i;this.variableNames=["x"],this.outputShape=[];let o=e[3]-1;this.outputShape=e;let s=`float(${r}) + float(${n}) * sum`;i=.5===a?`inversesqrt(${s})`:1===a?`1.0/(${s})`:`exp(log(${s}) * float(-${a}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${t}; j <= ${t}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${o}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${i};
        setOutput(val);
      }
    `}}class ne{constructor(e,t,r,n,a){let i;this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let o=e[3]-1;this.outputShape=e;let s=`float(${r}) + float(${n}) * sum`;i=.5===a?`inversesqrt(${s})`:1===a?`1.0/(${s})`:`exp(log(${s}) * float(-${a}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${t};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${t}; j <= ${t}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${o}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${i};
        setOutput(result);
      }
    `}}let nt={kernelName:o.LRN,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{depthRadius:i,bias:s,alpha:l,beta:u}=n,d=(0,o.env)().getBool("WEBGL_PACK_NORMALIZATION")?new ne(a.shape,i,s,l,u):new r7(a.shape,i,s,l,u);return r.runWebGLProgram(d,[a],a.dtype)}};class nr{constructor(e,t,r,n,a){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=r,this.alpha=n,this.beta=a,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${n}) * norm + float(${r});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${n})
                * float(${a})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${a});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}}let nn={kernelName:o.LRNGrad,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a,y:i,dy:o}=t,{depthRadius:s,bias:l,alpha:u,beta:d}=n,c=new nr(a.shape,s,l,u,d);return r.runWebGLProgram(c,[a,i,o],a.dtype)}};function na(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{reductionIndices:s,keepDims:l}=a,u=i.shape.length,d=o.util.parseAxisParam(s,i.shape),c=d,p=o.backend_util.getAxesPermutation(c,u),h=null!=p,f=n.shouldExecuteOnCPU([i]),m=i;if(h){if(f){let e=n.texData.get(m.dataId).values,t=Array(u);for(let e=0;e<t.length;e++)t[e]=i.shape[p[e]];let r=(0,M.Fv)(e,i.shape,i.dtype,p,t);m=n.makeTensorInfo(t,i.dtype),n.texData.get(m.dataId).values=r}else m=J(i,p,n);c=o.backend_util.getInnerMostAxes(c.length,u)}o.backend_util.assertAxesAreInnerMostDims("max",c,u);let[x,g]=o.backend_util.computeOutAndReduceShapes(m.shape,c),b=x;if(l&&(b=o.backend_util.expandShapeToKeepDim(x,d)),f){let e=n.texData.get(m.dataId).values,r=(0,M.$O)(e,o.util.sizeFromShape(g),b,i.dtype);t=n.makeTensorInfo(b,i.dtype),n.texData.get(t.dataId).values=r}else t=function(e,t,r,n){let a=o.util.sizeFromShape(t),i=o.util.sizeFromShape(e.shape),s=H({inputs:{x:e},attrs:{shape:[i/a,a]},backend:n}),l=Y(s,e.dtype,"max",n),u=H({inputs:{x:l},attrs:{shape:r},backend:n});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(l),u}(m,g,b,n);return h&&n.disposeIntermediateTensorInfo(m),t}let ni={kernelName:o.Max,backendName:"webgl",kernelFunc:na},no=P({opSnippet:x+`
  return max(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+v+`
  return result;
`,cpuKernelImpl:M.nL}),ns={kernelName:o.Maximum,backendName:"webgl",kernelFunc:no},nl={kernelName:o.MaxPool,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t;(0,d.assertNotComplex)(a,"maxPool");let{filterSize:i,strides:s,pad:l,dimRoundingMode:u}=n;o.util.assert(o.backend_util.eitherStridesOrDilationsAreOne(s,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '1'`);let c=o.backend_util.computePool2DInfo(a.shape,i,s,1,l,u);if(1===c.filterWidth&&1===c.filterHeight&&o.util.arraysEqual(c.inShape,c.outShape))return I({inputs:{x:a},backend:r});let p=new eD(c,"max",!1);return r.runWebGLProgram(p,[a],a.dtype)}},nu={kernelName:o.MaxPool3D,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{filterSize:i,strides:s,pad:l,dataFormat:u,dimRoundingMode:d}=n,c=new eP(o.backend_util.computePool3DInfo(a.shape,i,s,[1,1,1],l,d,u),"max",!1);return r.runWebGLProgram(c,[a],a.dtype)}};class nd{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideHeight,r=e.strideWidth,n=e.dilationHeight,a=e.effectiveFilterHeight,i=e.effectiveFilterWidth,o=a-1-e.padInfo.top,s=i-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${a};
          wR += ${n}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${i}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${a*i-1} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${i} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}}class nc{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideDepth,r=e.strideHeight,n=e.strideWidth,a=e.dilationDepth,i=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterDepth,l=e.effectiveFilterHeight,u=e.effectiveFilterWidth,d=s-1-e.padInfo.front,c=l-1-e.padInfo.top,p=u-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${d}, ${c}, ${p});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${s};
           wD += ${a}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${l};
              wR += ${i}) {
            float dyR = float(dyRCorner + wR) / ${r}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${o}) {
              float dyC = float(dyCCorner + wC) / ${n}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${s*l*u-1} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${l} * ${u} +
                  wR * ${u} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}let np={kernelName:o.MaxPool3DGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i}=t,{filterSize:s,strides:l,pad:u,dimRoundingMode:d}=n,c=o.backend_util.computePool3DInfo(i.shape,s,l,[1,1,1],u,d),p=new eP(c,"max",!0),h=r.runWebGLProgram(p,[i],i.dtype),f=new nc(c),m=r.runWebGLProgram(f,[a,h],i.dtype);return r.disposeIntermediateTensorInfo(h),m}},nh={kernelName:o.MaxPoolGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i,output:s}=t;(0,d.assertNotComplex)([i,s],"maxPoolGrad");let{filterSize:l,strides:u,pad:c,dimRoundingMode:p}=n,h=o.backend_util.computePool2DInfo(i.shape,l,u,1,c,p),f=new eD(h,"max",!0),m=r.runWebGLProgram(f,[i],i.dtype),x=new nd(h),g=r.runWebGLProgram(x,[a,m],i.dtype);return r.disposeIntermediateTensorInfo(m),g}},nf={kernelName:o.MaxPoolWithArgmax,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:n}=e,{filterSize:a,strides:i,pad:s,includeBatchInIndex:l}=t;o.util.assert(4===n.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${n.shape.length}.`);let u=[1,1];o.util.assert(o.backend_util.eitherStridesOrDilationsAreOne(i,u),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${u}'`);let d=o.backend_util.computePool2DInfo(n.shape,a,i,u,s),[c,p]=function(e,t,r,n){let a=new eD(r,"max",!1),i=n.runWebGLProgram(a,[e],"float32");return a=new eD(r,"max",!0,!0,t),[i,n.runWebGLProgram(a,[e],"float32")]}(n,l,d,r);return[c,p]}},nm={kernelName:o.Mean,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:n}=e,{keepDims:a,axis:i}=t,s=n.shape.length,l=o.util.parseAxisParam(i,n.shape),u=l,d=o.backend_util.getAxesPermutation(u,s),c=null!=d,p=r.shouldExecuteOnCPU([n]),h=[],f=n;if(c){if(p){let e=r.texData.get(f.dataId).values,t=Array(s);for(let e=0;e<t.length;e++)t[e]=n.shape[d[e]];let a=(0,M.Fv)(e,n.shape,n.dtype,d,t);f=r.makeTensorInfo(t,n.dtype),r.texData.get(f.dataId).values=a}else f=J(n,d,r);h.push(f),u=o.backend_util.getInnerMostAxes(u.length,s)}o.backend_util.assertAxesAreInnerMostDims("sum",u,s);let[m,x]=o.backend_util.computeOutAndReduceShapes(f.shape,u),g=m;a&&(g=o.backend_util.expandShapeToKeepDim(m,l));let b=function(e,t,r,n){let a=o.util.sizeFromShape(t),i=o.util.sizeFromShape(e.shape),s=H({inputs:{x:e},attrs:{shape:[i/a,a]},backend:n}),l=Y(s,"float32","mean",n),u=H({inputs:{x:l},attrs:{shape:r},backend:n});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(l),u}(f,x,g,r);for(let e of h)r.disposeIntermediateTensorInfo(e);return b}},nx={kernelName:o.Min,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,d=o.util.parseAxisParam(s,i.shape),c=d,p=o.backend_util.getAxesPermutation(c,u),h=i;null!=p&&(h=er({inputs:{x:i},backend:n,attrs:{perm:p}}),c=o.backend_util.getInnerMostAxes(c.length,i.shape.length)),o.backend_util.assertAxesAreInnerMostDims("min",c,u);let[f,m]=o.backend_util.computeOutAndReduceShapes(h.shape,c),x=H({inputs:{x:h},backend:n,attrs:{shape:[-1,o.util.sizeFromShape(m)]}}),g=Y(x,x.dtype,"min",n);return t=l?H({inputs:{x:g},backend:n,attrs:{shape:o.backend_util.expandShapeToKeepDim(f,d)}}):H({inputs:{x:g},backend:n,attrs:{shape:f}}),n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(g),null!=p&&n.disposeIntermediateTensorInfo(h),t}},ng=P({opSnippet:x+`
  return min(a, b);
`,packedOpSnippet:`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+v+`
  return result;
`,cpuKernelImpl:M.r}),nb={kernelName:o.Minimum,backendName:"webgl",kernelFunc:ng};class nC{constructor(e,t,r){this.variableNames=["x"],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,C.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),l="reflect"===r?0:1;if(1===n){this.userCode=`
        int start = ${i};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${l};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${l};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${a} start = ${a}(${i});
      ${a} end = ${a}(${o});

      void main() {
        ${a} outC = getOutputCoords();
        for (int i = 0; i < ${n}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${l};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${l};
          }
        }
        ${a} coords = outC - start;
        setOutput(getX(${s}));
      }
    `}}class nv{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,C.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=(0,b.Ky)("rc",n),l=(0,b.Ky)("source",n),u=`${s[n-1]} < ${this.outputShape[n-1]}`,d=1===n?"source":`vec2(${l.slice(-2).join()})`,c="reflect"===r?0:1,p="";if(1===n){let e=`
        ${a} source = rc;
        if (source < start) {
          source = start * 2 - source - ${c};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${c};
        }
        source -= start;
      `;p=`
        ${a} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${d});
        ${s[n-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${d});
        }
      `}else{let e=`
        ${a} source = rc;
        ${a} lt = ${a}(lessThan(source, start));
        ${a} gte = ${a}(greaterThanEqual(source, end));
        ${a} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${c}) +
                gte * ((end - 1) * 2 - source + ${c});
        source -= start;
      `;p=`
        ${a} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${d});
        ${s[n-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${d});
        }
        rc = outputLoc;
        ${s[n-2]} += 1;
        if(${s[n-2]} < ${this.outputShape[n-2]}) {
          ${e}
          result[2] = getChannel(getX(${l.join()}), ${d});
          ${s[n-1]} += 1;
          if(${u}) {
            ${e}
            result[3] = getChannel(getX(${l.join()}), ${d});
          }
        }
      `}this.userCode=`
      const ${a} start = ${a}(${i});
      const ${a} end = ${a}(${o});

      void main() {
        ${a} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${p}
        setOutput(result);
      }
    `}}let ny={kernelName:o.MirrorPad,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:n}=e,{paddings:a,mode:i}=r,s=(0,o.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new nv(n.shape,a,i):new nC(n.shape,a,i);return t.runWebGLProgram(s,[n],n.dtype)}},nI=P({opSnippet:`if (b == 0.0) return NAN;
  return mod(a, b);`,packedOpSnippet:`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+v+`
  return result;
`}),n$={kernelName:o.Mod,backendName:"webgl",kernelFunc:nI};class nR{constructor(e,t,r){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[e,r],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}}let nw=P({opSnippet:`
if (a == b) {
  return 1.0;
};
return a / b;`,packedOpSnippet:`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,checkOutOfBounds:!0}),nT={kernelName:o.RealDiv,backendName:"webgl",kernelFunc:nw},nk="return a - b;",nS=P({opSnippet:nk,packedOpSnippet:nk,supportsComplex:!0,cpuKernelImpl:M.kI}),nE={kernelName:o.Sub,backendName:"webgl",kernelFunc:nS};function nN(e){let{inputs:t,backend:r,attrs:n}=e,{logits:a}=t,{dim:i}=n,s=o.util.parseAxisParam([i],a.shape),l=na({inputs:{x:a},backend:r,attrs:{reductionIndices:s,keepDims:!1}}),u=o.backend_util.expandShapeToKeepDim(l.shape,s),d=H({inputs:{x:l},backend:r,attrs:{shape:u}}),c=nS({inputs:{a:a,b:d},backend:r}),p=ri({inputs:{x:c},backend:r}),h=ee({inputs:{x:p},backend:r,attrs:{axis:s,keepDims:!1}}),f=H({inputs:{x:h},backend:r,attrs:{shape:u}}),m=nw({inputs:{a:p,b:f},backend:r});return r.disposeIntermediateTensorInfo(l),r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(c),r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),m}let nA={kernelName:o.Softmax,backendName:"webgl",kernelFunc:nN},n_={kernelName:o.Multinomial,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{logits:a}=t,{numSamples:i,seed:o,normalized:s}=n,l=s?a:nN({inputs:{logits:a},backend:r,attrs:{dim:a.shape.length-1}}),u=new nR(l.shape[0],l.shape[1],i),d=r.runWebGLProgram(u,[l],"int32",[[o]]);return s||r.disposeIntermediateTensorInfo(l),d}},nF=_.D1+`
  return -x;
`,nO=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,nD={kernelName:o.Neg,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n}=e,{x:a}=r;if(n.shouldExecuteOnCPU([a])){let e=n.texData.get(a.dataId),[t,r]=(0,M.Bo)(e.values,a.shape,a.dtype);return n.makeTensorInfo(r,a.dtype,t)}return t=(0,o.env)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new F.cc(a.shape,nO):new _.l(a.shape,nF),n.runWebGLProgram(t,[a],a.dtype)}},nP=o.kernel_impls.nonMaxSuppressionV3Impl,nL={kernelName:o.NonMaxSuppressionV3,backendName:"webgl",kernelFunc:function(e){o.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:n}=e,{boxes:a,scores:i}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u}=n,{selectedIndices:d}=nP(r.readSync(a.dataId),r.readSync(i.dataId),s,l,u);return r.makeTensorInfo([d.length],"int32",new Int32Array(d))}},nB=o.kernel_impls.nonMaxSuppressionV4Impl,nV={kernelName:o.NonMaxSuppressionV4,backendName:"webgl",kernelFunc:function(e){o.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:n}=e,{boxes:a,scores:i}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u,padToMaxOutputSize:d}=n,{selectedIndices:c,validOutputs:p}=nB(r.readSync(a.dataId),r.readSync(i.dataId),s,l,u,d);return[r.makeTensorInfo([c.length],"int32",new Int32Array(c)),r.makeTensorInfo([],"int32",new Int32Array([p]))]}},nW=o.kernel_impls.nonMaxSuppressionV5Impl,nM={kernelName:o.NonMaxSuppressionV5,backendName:"webgl",kernelFunc:function(e){o.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:n}=e,{boxes:a,scores:i}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u,softNmsSigma:d}=n,{selectedIndices:c,selectedScores:p}=nW(r.readSync(a.dataId),r.readSync(i.dataId),s,l,u,d);return[r.makeTensorInfo([c.length],"int32",new Int32Array(c)),r.makeTensorInfo([p.length],"float32",new Float32Array(p))]}};class nG{constructor(e,t,r,n){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${r}),
                      float(index == coords.y)));
      }
    `}}let nU={kernelName:o.OneHot,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{indices:a}=t,{dtype:i,depth:s,onValue:l,offValue:u}=n,d=o.util.sizeFromShape(a.shape),c=new nG(d,s,l,u),p=H({inputs:{x:a},backend:r,attrs:{shape:[d]}}),h=r.runWebGLProgram(c,[p],i);r.disposeIntermediateTensorInfo(p);let f=H({inputs:{x:h},backend:r,attrs:{shape:[...a.shape,s]}});return r.disposeIntermediateTensorInfo(h),f}};function nz(e){let{inputs:t,backend:r}=e,{x:n}=t;if("complex64"!==n.dtype)return rx({attrs:{shape:n.shape,dtype:n.dtype,value:"string"===n.dtype?"":0},backend:r});{let e=e6({inputs:{input:n},backend:r}),t=nz({inputs:{x:e},backend:r}),a=tc({inputs:{input:n},backend:r}),i=nz({inputs:{x:a},backend:r}),o=R({inputs:{real:t,imag:i},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(i),o}}let nX={kernelName:o.ZerosLike,backendName:"webgl",kernelFunc:nz},nH={kernelName:o.OnesLike,backendName:"webgl",kernelFunc:function e(t){let{inputs:r,backend:n}=t,{x:a}=r;if("string"===a.dtype)throw Error("onesLike is not supported under string dtype");if("complex64"!==a.dtype)return rx({attrs:{shape:a.shape,dtype:a.dtype,value:1},backend:n});{let t=e6({inputs:{input:a},backend:n}),r=e({inputs:{x:t},backend:n}),i=tc({inputs:{input:a},backend:n}),o=nz({inputs:{x:i},backend:n}),s=R({inputs:{real:r,imag:o},backend:n});return n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(o),s}}},nK={kernelName:o.Pack,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{axis:a}=n;if(1===t.length)return rs({inputs:{input:t[0]},backend:r,attrs:{dim:a}});let i=t[0].shape,s=t[0].dtype;t.forEach(e=>{o.util.assertShapesMatch(i,e.shape,"All tensors passed to stack must have matching shapes"),o.util.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let l=[],u=th({inputs:t.map(e=>{let t=rs({inputs:{input:e},backend:r,attrs:{dim:a}});return l.push(t),t}),backend:r,attrs:{axis:a}});return l.forEach(e=>r.disposeIntermediateTensorInfo(e)),u}};class nj{constructor(e,t,r){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,C.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(1===n){this.userCode=`
        int start = ${i};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${a} start = ${a}(${i});
      ${a} end = ${a}(${o});

      void main() {
        ${a} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${a} coords = outC - start;
          setOutput(getX(${s}));
        }
      }
    `}}class nq{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,C.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=(0,b.Ky)("rc",n),l=(0,b.Ky)("source",n),u=`${s[n-1]} < ${this.outputShape[n-1]}`,d=1===n?"source":`vec2(${l.slice(-2).join()})`,c=[`${a} rc = outputLoc;`,`${s[n-1]} += 1;
       if(${u}) {
      `,1===n?"":`}
       rc = outputLoc;
       ${s[n-2]} += 1;
       if(${s[n-2]} < ${this.outputShape[n-2]}) {`,1===n?"":`  ${s[n-1]} += 1;
         if(${u}) {`],p=1===n?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",h="";for(let e=0,t=1===n?2:4;e<t;e++)h+=`
        ${c[e]}
        if (${p}) {
          result[${e}] = float(value);
        } else {
          ${a} source = rc - start;
          result[${e}] = getChannel(getX(${l.join()}), ${d});
        }
      `;h+=1===n?"} ":"}}",this.userCode=`
      const ${a} start = ${a}(${i});
      const ${a} end = ${a}(${o});

      void main() {
        ${a} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${h}
        setOutput(result);
      }
    `}}let nY=e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{paddings:i,constantValue:s}=n;if(0===o.util.sizeFromShape(a.shape))return rx({backend:r,attrs:{shape:i.map((e,t)=>e[0]+a.shape[t]+e[1]),value:s,dtype:a.dtype}});let l=(0,o.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new nq(a.shape,i,s):new nj(a.shape,i,s),u=[[s]];return r.runWebGLProgram(l,[a],a.dtype,u)},nQ={kernelName:o.PadV2,backendName:"webgl",kernelFunc:nY},nZ=P({opSnippet:`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,packedOpSnippet:`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+v+`
  return result;
`}),nJ={kernelName:o.Pow,backendName:"webgl",kernelFunc:nZ},n0={kernelName:o.Prod,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,d=[],c=o.util.parseAxisParam(s,i.shape),p=c,h=o.backend_util.getAxesPermutation(p,u),f=i;if(null!=h&&(f=er({inputs:{x:i},backend:n,attrs:{perm:h}}),p=o.backend_util.getInnerMostAxes(p.length,u),d.push(f)),o.backend_util.assertAxesAreInnerMostDims("prod",p,u),n.shouldExecuteOnCPU([f])){let e=n.texData.get(f.dataId).values,{outVals:r,outShape:a,outDtype:i}=(0,M.Tg)(f.shape,f.dtype,e,p);t=n.makeTensorInfo(a,i,r)}else{let[e,r]=o.backend_util.computeOutAndReduceShapes(f.shape,p),a=H({inputs:{x:f},backend:n,attrs:{shape:[-1,o.util.sizeFromShape(r)]}}),s=Y(a,(0,o.sumOutType)(i.dtype),"prod",n);t=H({inputs:{x:s},backend:n,attrs:{shape:e}}),d.push(a),d.push(s)}if(l){d.push(t);let e=o.backend_util.expandShapeToKeepDim(t.shape,c);t=H({inputs:{x:t},backend:n,attrs:{shape:e}})}return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),t}},n1={kernelName:o.RaggedGather,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{paramsNestedSplits:a,paramsDenseValues:i,indices:o}=t,{outputRaggedRank:s}=n,l=a.map(e=>r.readSync(e.dataId)),u=a.map(e=>e.shape),d=r.readSync(i.dataId),c=r.readSync(o.dataId),[p,h,f]=(0,M.Qs)(l,u,d,i.shape,i.dtype,c,o.shape,s),m=p.map(e=>r.makeTensorInfo([e.length],"int32",e)),x=r.makeTensorInfo(f,i.dtype,h);return m.concat([x])}},n2={kernelName:o.RaggedRange,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{starts:n,limits:a,deltas:i}=t,o=r.readSync(n.dataId),s=r.readSync(a.dataId),l=r.readSync(i.dataId),[u,d]=(0,M.M8)(o,n.shape,n.dtype,s,a.shape,l,i.shape);return[r.makeTensorInfo([u.length],"int32",u),r.makeTensorInfo([d.length],n.dtype,d)]}},n4={kernelName:o.RaggedTensorToTensor,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{shape:a,values:i,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:l}=n,u=r.readSync(a.dataId),d=r.readSync(i.dataId),c=r.readSync(o.dataId),p=s.map(e=>r.readSync(e.dataId)),h=s.map(e=>e.shape),[f,m]=(0,M.fy)(u,a.shape,d,i.shape,i.dtype,c,o.shape,p,h,l);return r.makeTensorInfo(f,i.dtype,m)}},n3=e=>{let{backend:t,attrs:r}=e,{start:n,stop:a,step:i,dtype:o}=r,s=(0,M.hO)(n,a,i,o);return t.makeTensorInfo([s.length],o,s)},n5={kernelName:o.Range,backendName:"webgl",kernelFunc:n3},n6=D({opSnippet:"return 1.0 / x;"}),n9={kernelName:o.Reciprocal,backendName:"webgl",kernelFunc:n6},n8=D({opSnippet:_.D1+`
  return (x < 0.0) ? 0.0 : x;
`,packedOpSnippet:`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),n7={kernelName:o.Relu,backendName:"webgl",kernelFunc:n8},ae=D({opSnippet:_.D1+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,packedOpSnippet:`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),at={kernelName:o.Relu6,backendName:"webgl",kernelFunc:ae};class ar{constructor(e,t,r,n,a){let i;this.variableNames=["A"],this.outputShape=[];let[o,s,l,u]=e;this.outputShape=[o,t,r,u];let d=[n&&t>1?s-1:s,n&&r>1?l-1:l],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];i=a?"(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":"vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${d[0]/c[0]},
          ${d[1]/c[1]});
      const vec2 inputShapeRC = vec2(${s}.0, ${l}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${i};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}}class an{constructor(e,t,r,n,a){let i;this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[o,s,l,u]=e;this.outputShape=[o,t,r,u];let d=[n&&t>1?s-1:s,n&&r>1?l-1:l],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];i=a?"(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":"vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${d[0]/c[0]},
          ${d[1]/c[1]},
          ${d[1]/c[1]});
      const vec3 inputShapeRC = vec3(${s}.0, ${l}.0,
                                     ${l}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${i};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${u-1};
        bool hasNextRow = coords.z < ${r-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}}let aa={kernelName:o.ResizeBilinear,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a}=t,{alignCorners:i,halfPixelCenters:s,size:l}=n,[u,d]=l,c=(0,o.env)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new an(a.shape,u,d,i,s):new ar(a.shape,u,d,i,s);return r.runWebGLProgram(c,[a],"float32")}};class ai{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,a]=t,[,i,o]=e,s=[r&&i>1?n-1:n,r&&o>1?a-1:a],l=[r&&i>1?i-1:i,r&&o>1?o-1:o],u=s[0]/l[0],d=s[1]/l[1],c=1/u,p=1/d;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${d});

        const float invHeightScale = float(${c});
        const float invWidthScale = float(${p});

        const int winHeight = int(${2*Math.ceil(c)+2});
        const int winWidth = int(${2*Math.ceil(p)+2});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${n-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${a-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}}let ao={kernelName:o.ResizeBilinearGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a,dy:i}=t,{alignCorners:o}=n,s=new ai(i.shape,a.shape,o);return r.runWebGLProgram(s,[i],i.dtype)}};class as{constructor(e,t,r,n,a){let i;this.variableNames=["A"],this.outputShape=[];let[o,s,l,u]=e;this.outputShape=[o,t,r,u];let d=[n&&t>1?s-1:s,n&&r>1?l-1:l],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];i=a?"max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":"vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${d[0]/c[0]},
          ${d[1]/c[1]});
      const vec2 inputShapeRC = vec2(${s}.0, ${l}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${i};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${n?"0.5":"0.0"})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}}class al{constructor(e,t,r,n,a){let i;this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[o,s,l,u]=e;this.outputShape=[o,t,r,u];let d=[n&&t>1?s-1:s,n&&r>1?l-1:l],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];i=a?"max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":"vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${d[0]/c[0]},
          ${d[1]/c[1]},
          ${d[1]/c[1]});
      const vec3 inputShapeRC = vec3(${s}.0, ${l}.0,
                                     ${l}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${i};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${n?"0.5":"0.0"})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${u-1};
        bool hasNextRow = coords.z < ${r-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}}let au={kernelName:o.ResizeNearestNeighbor,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a}=t,{alignCorners:i,halfPixelCenters:s,size:l}=n,[u,d]=l,c=(0,o.env)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new al(a.shape,u,d,i,s):new as(a.shape,u,d,i,s);return r.runWebGLProgram(c,[a],a.dtype)}};class ad{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,a]=t,[,i,o]=e,s=[r&&i>1?n-1:n,r&&o>1?a-1:a],l=[r&&i>1?i-1:i,r&&o>1?o-1:o],u=s[0]/l[0],d=s[1]/l[1],c=1/u,p=1/d;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${d});

        const float invHeightScale = float(${c});
        const float invWidthScale = float(${p});

        const int winHeight = int(${2*Math.ceil(c)+2});
        const int winWidth = int(${2*Math.ceil(p)+2});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float sourceFracRow =
              float(${s[0]}) *
                (float(dyR) / float(${l[0]}));

            float sourceFracCol =
                float(${s[1]}) *
                  (float(dyC) / float(${l[1]}));

            int sourceNearestRow = int(min(
                float(int(${n}) - 1),
                ${r} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${a}) - 1),
                ${r} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}}let ac={kernelName:o.ResizeNearestNeighborGrad,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a,dy:i}=t,{alignCorners:o}=n,s=new ad(i.shape,a.shape,o);return r.runWebGLProgram(s,[i],i.dtype)}};class ap{constructor(e,t){this.variableNames=["x"];let r=e.length;if(r>4)throw Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);if(this.outputShape=e,1===r){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let n=r=>-1!==t.indexOf(r)&&1!==e[r]?`${e[r]} - coords[${r}] - 1`:`coords[${r}]`,a=e.map((e,t)=>n(t)).join(","),i=(0,C.kW)(r);this.userCode=`
      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${a}));
      }
    `}}class ah{constructor(e,t){var r,n,a;this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let i=e.length;if(i>4)throw Error(`WebGL backend: Reverse of rank-${i} tensor is not yet supported`);this.outputShape=e;let o=(0,b.Ky)("rc",i),s=`${o[i-1]} + 1 < ${this.outputShape[i-1]}`,l=`${o[i-2]} + 1 < ${this.outputShape[i-2]}`,u=(0,C.kW)(i);function d(r){let n=e.map((n,a)=>-1!==t.indexOf(a)&&1!==e[a]?`${e[a]} - ${r[a]} - 1`:`${r[a]}`),a=n.join(","),i=n.slice(-2).join(",");return`getChannel(getX(${a}), vec2(${i}))`}1===i?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${s}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${u} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${d(o.slice())};
          if(${s}){
            result.g = ${(r=o.slice())[i-1]="("+r[i-1]+" + 1)",d(r)};
          }
          if(${l}) {
            result.b = ${(n=o.slice())[i-2]="("+n[i-2]+" + 1)",d(n)};
            if(${s}) {
              result.a = ${(a=o.slice())[i-1]="("+a[i-1]+" + 1)",a[i-2]="("+a[i-2]+" + 1)",d(a)};
            }
          }
          setOutput(result);
        }
    `}}let af={kernelName:o.Reverse,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{dims:i}=n,s=a.shape.length,l=o.util.parseAxisParam(i,a.shape);if(0===s)return I({inputs:{x:a},backend:r});let u=(0,o.env)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ah(a.shape,l):new ap(a.shape,l);return r.runWebGLProgram(u,[a],a.dtype)}};class am{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let r=e[1],n=e[2];this.outputShape=e;let a="";a="number"==typeof t?`float outputValue = ${t.toFixed(2)};`:`
        vec3 fill = vec3(${t.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${a}
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${r}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}}let ax={kernelName:o.RotateWithOffset,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:n}=e,{radians:a,fillValue:i,center:s}=t,l=new am(n.shape,i),[u,d]=o.backend_util.getImageCenter(s,n.shape[1],n.shape[2]);return r.runWebGLProgram(l,[n],n.dtype,[[u,d,Math.sin(a),Math.cos(a)]])}},ag=D({opSnippet:`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`}),ab={kernelName:o.Round,backendName:"webgl",kernelFunc:ag},aC=D({opSnippet:"return inversesqrt(x);",cpuKernelImpl:M.St}),av={kernelName:o.Rsqrt,backendName:"webgl",kernelFunc:aC};class ay{constructor(e,t,r,n,a,i,o=!0,s=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;let l=(0,C.kW)(a.length),u=(0,C.kW)(i.length),d="";1===r?d="i":2===r&&(d="i, j");let c=`getIndices(${d})`,p="";1===n?p="i":2===n&&(p="i, coords[1]");let h=`getUpdates(${p})`,f="";s&&(f="coords[0], coords[1]");let m=`getDefaultValue(${f})`;this.userCode=`
        ${l} strides = ${l}(${a});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${c});
              flattenedIndex += index * ${t>1?"strides[j]":"strides"};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${h};
              found = true;
            }
          }
          setOutput(mix(${m}, sum, float(found)));
        }
      `}}class aI{constructor(e,t,r,n,a,i,o=!0,s=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i;let l=(0,C.kW)(a.length),u=(0,C.kW)(i.length),d="";1===r?d="i":2===r&&(d="i, j");let c=`getIndices(${d})`,p="";1===n?p="i":2===n&&(p="i, coords[1]");let h=`getUpdates(${p})`,f="";s&&(f="coords[0], coords[1]");let m=`getDefaultValue(${f})`;this.userCode=`
        ${l} strides = ${l}(${a});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${c});
              flattenedIndex += index.xz * ${t>1?"strides[j]":"strides"};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${t>1?"strides[j + 1]":"strides"};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${h};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${m}, sum, found));
        }
      `}}let a$={kernelName:o.ScatterNd,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{indices:i,updates:s}=r,{shape:l}=a,{sliceRank:u,numUpdates:d,sliceSize:c,strides:p,outputSize:h}=o.backend_util.calculateShapes(s,i,l),f=[h/c,c];if(0===h)return n.makeTensorInfo(l,i.dtype);let m=H({inputs:{x:i},backend:n,attrs:{shape:[d,u]}}),x=H({inputs:{x:s},backend:n,attrs:{shape:[d,c]}}),g=n.makeTensorInfo([],"float32",new Float32Array([0]));t=(0,o.env)().getBool("WEBGL_PACK")?new aI(d,u,m.shape.length,x.shape.length,p,f):new ay(d,u,m.shape.length,x.shape.length,p,f);let b=n.runWebGLProgram(t,[x,m,g],x.dtype),C=H({inputs:{x:b},backend:n,attrs:{shape:l}});return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(g),C}};class aR{constructor(e,t,r,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,r];let a=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,i=2===(0,o.env)().getNumber("WEBGL_VERSION")?"while (left < right) {":a;this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${i}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${"left"===n?"<":"<="} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}}let aw={kernelName:o.SearchSorted,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{sortedSequence:a,values:i}=t,{side:o}=n,s=new aR(a.shape[0],a.shape[1],i.shape[1],o),l=[[a.shape[1]]];return r.runWebGLProgram(s,[a,i],"int32",l)}};class aT{constructor(e,t,r){let n,a;if(this.variableNames=["c","a","b"],this.outputShape=t,r>4)throw Error(`Where for rank ${r} is not yet supported`);if(1===r)a="resRC",n="resRC";else{let r=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],o=[];for(let n=0;n<t.length;n++)o.push(`${r[n]}`),n<e&&i.push(`${r[n]}`);n=i.join(),a=o.join()}let i=(0,C.kW)(r);this.userCode=`
      void main() {
        ${i} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${a}));
        } else {
          setOutput(getB(${a}));
        }
      }
    `}}let ak={kernelName:o.Select,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{condition:n,t:a,e:i}=t,s=new aT(n.shape.length,a.shape,a.shape.length);return r.runWebGLProgram(s,[n,a,i],(0,o.upcastType)(a.dtype,i.dtype))}},aS=D({opSnippet:`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${o.backend_util.SELU_SCALEALPHA};
  float scale = ${o.backend_util.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`}),aE={kernelName:o.Selu,backendName:"webgl",kernelFunc:aS},aN=D({opSnippet:O+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,packedOpSnippet:`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:M.UN}),aA={kernelName:o.Sigmoid,backendName:"webgl",kernelFunc:aN},a_=D({opSnippet:`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`}),aF={kernelName:o.Sign,backendName:"webgl",kernelFunc:a_},aO=D({opSnippet:O+`
  return sin(x);
`,packedOpSnippet:`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${v}
  return result;
`}),aD={kernelName:o.Sin,backendName:"webgl",kernelFunc:aO},aP=D({opSnippet:`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`}),aL={kernelName:o.Sinh,backendName:"webgl",kernelFunc:aP},aB=D({opSnippet:`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`}),aV={kernelName:o.Softplus,backendName:"webgl",kernelFunc:aB},aW={kernelName:o.SpaceToBatchND,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{blockShape:i,paddings:s}=n;o.util.assert(a.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let l=i.reduce((e,t)=>e*t),u=[[0,0]];u.push(...s);for(let e=1+i.length;e<a.shape.length;++e)u.push([0,0]);let d=[],c=nY({inputs:{x:a},backend:r,attrs:{paddings:u,constantValue:0}}),p=o.backend_util.getReshaped(c.shape,i,l,!1),h=o.backend_util.getPermuted(p.length,i.length,!1),f=o.backend_util.getReshapedPermuted(c.shape,i,l,!1),m=H({inputs:{x:c},backend:r,attrs:{shape:p}}),x=er({inputs:{x:m},backend:r,attrs:{perm:h}}),g=H({inputs:{x:x},backend:r,attrs:{shape:f}});return d.push(c),d.push(m),d.push(x),d.forEach(e=>r.disposeIntermediateTensorInfo(e)),g}},aM={kernelName:o.SparseFillEmptyRows,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{indices:n,values:a,denseShape:i,defaultValue:o}=t;if(1!==i.shape.length)throw Error(`Dense shape must be a vector, saw:
         ${i.shape}`);if(2!==n.shape.length)throw Error(`Indices must be a matrix, saw:
         ${n.shape}`);if(1!==a.shape.length)throw Error(`Values must be a vector, saw:
         ${a.shape}`);if(0!==o.shape.length)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=r.readSync(n.dataId),l=r.readSync(a.dataId),u=r.readSync(i.dataId),d=r.readSync(o.dataId)[0],[c,p,h,f,m]=(0,M.X8)(s,n.shape,n.dtype,l,a.dtype,u,d);return[r.makeTensorInfo(p,n.dtype,c),r.makeTensorInfo([p[0]],a.dtype,h),r.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(e=>Number(e)))),r.makeTensorInfo([m.length],n.dtype,new Int32Array(m))]}},aG={kernelName:o.SparseReshape,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{inputIndices:n,inputShape:a,newShape:i}=t;if(2!==n.shape.length)throw Error(`Input indices should be a matrix but received shape ${n.shape}`);if(1!==a.shape.length)throw Error(`Input shape should be a vector but received shape ${a.shape}`);if(1!==i.shape.length)throw Error(`Target shape should be a vector but received shape ${i.shape}`);let o=Array.from(r.readSync(a.dataId)),s=r.readSync(n.dataId),l=Array.from(r.readSync(i.dataId)),[u,d,c]=(0,M.LS)(s,n.shape,n.dtype,o,l);return[r.makeTensorInfo(d,n.dtype,u),r.makeTensorInfo([c.length],i.dtype,new Int32Array(c))]}},aU={kernelName:o.SparseSegmentMean,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{data:n,indices:a,segmentIds:i}=t;if(n.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==a.shape.length)throw Error(`Indices should be a vector but received shape
              ${a.shape}`);if(1!==i.shape.length)throw Error(`Segment ids should be a vector but received shape
              ${i.shape}`);let o=r.readSync(n.dataId),s=r.readSync(a.dataId),l=r.readSync(i.dataId),[u,d]=(0,M.AR)(o,n.shape,n.dtype,s,l,!0);return r.makeTensorInfo(d,n.dtype,u)}},az={kernelName:o.SparseSegmentSum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{data:n,indices:a,segmentIds:i}=t;if(n.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==a.shape.length)throw Error(`Indices should be a vector but received shape
             ${a.shape}`);if(1!==i.shape.length)throw Error(`Segment ids should be a vector but received shape
             ${i.shape}`);let o=r.readSync(n.dataId),s=r.readSync(a.dataId),l=r.readSync(i.dataId),[u,d]=(0,M.AR)(o,n.shape,n.dtype,s,l);return r.makeTensorInfo(d,n.dtype,u)}},aX={kernelName:o.SparseToDense,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{sparseIndices:a,sparseValues:i,defaultValue:s}=t,{outputShape:l}=n,{sliceRank:u,numUpdates:d,sliceSize:c,strides:p,outputSize:h}=o.backend_util.calculateShapes(i,a,l);if("string"===i.dtype){let e=r.bufferSync(a),t=r.bufferSync(i),n=o.util.decodeString(r.readSync(s.dataId)[0]),f=(0,M.Y1)(e,t,l,h,c,d,u,p,n,!1);return r.makeTensorInfo(l,f.dtype,f.values)}let f=new ay(d,u,a.shape.length,i.shape.length,p,[h,1],!1),m=r.runWebGLProgram(f,[i,a,s],i.dtype),x=H({inputs:{x:m},backend:r,attrs:{shape:l}});return r.disposeIntermediateTensorInfo(m),x}},aH={kernelName:o.SplitV,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{numOrSizeSplits:i,axis:s}=n,l=o.util.parseAxisParam(s,a.shape)[0],u=o.backend_util.prepareSplitSize(a,i,l),d=Array(a.shape.length).fill(0),c=a.shape.slice();return u.map(e=>{let t=[...c];t[l]=e;let n=eY({inputs:{x:a},backend:r,attrs:{begin:d,size:t}});return d[l]+=e,n})}},aK="return sqrt(x);",aj=D({opSnippet:aK,packedOpSnippet:aK,cpuKernelImpl:M.Bk}),aq={kernelName:o.Sqrt,backendName:"webgl",kernelFunc:aj},aY=D({opSnippet:"return x * x;"}),aQ={kernelName:o.Square,backendName:"webgl",kernelFunc:aY},aZ="return (a - b) * (a - b);",aJ=P({opSnippet:aZ,packedOpSnippet:aZ}),a0={kernelName:o.SquaredDifference,backendName:"webgl",kernelFunc:aJ},a1={kernelName:o.StaticRegexReplace,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t;if("string"!==a.dtype)throw Error("Input must be of datatype string");let i=r.readSync(a.dataId),s=o.backend_util.fromUint8ToStringArray(i),l=(0,M.F1)(s,"string",n);return r.makeTensorInfo(a.shape,"string",l)}},a2={kernelName:o.Step,backendName:"webgl",kernelFunc:function({inputs:e,attrs:t,backend:r}){let{x:n}=e,a=_.D1+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,i=new _.l(n.shape,a);return r.runWebGLProgram(i,[n],n.dtype)}};class a4{constructor(e,t,r){this.variableNames=["x"],this.outputShape=r;let n=r.length,a=(0,C.kW)(r.length),i=(0,C.kW)(r.length),o="";if(1===n)o="coords * strides + begin";else{let e=0;o=r.map((t,n)=>(e++,1===r.length?`coords * strides[${n}] + begin[${n}]`:`coords[${e-1}] * strides[${n}] + begin[${n}]`)).join(",")}this.userCode=`
      ${a} begin = ${a}(${e});
      ${a} strides = ${a}(${t});

      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${o}));
      }
    `}}let a3={kernelName:o.StridedSlice,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{begin:s,end:l,strides:u,beginMask:d,endMask:c,ellipsisMask:p,newAxisMask:h,shrinkAxisMask:f}=a,{finalShapeSparse:m,finalShape:x,isIdentity:g,sliceDim0:b,isSimpleSlice:C,begin:v,end:y,strides:I}=o.slice_util.sliceInfo(i.shape,s,l,u,d,c,p,h,f);if(g)t=H({inputs:{x:i},backend:n,attrs:{shape:x}});else if(b||C){o.util.assert(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=o.slice_util.computeOutShape(v,y,I),r=eY({inputs:{x:i},backend:n,attrs:{begin:v,size:e}});t=H({inputs:{x:r},backend:n,attrs:{shape:x}}),n.disposeIntermediateTensorInfo(r)}else if(n.shouldExecuteOnCPU([i])){let e=n.readSync(i.dataId),r=(0,o.buffer)(i.shape,i.dtype,e),a=(0,M.$u)(m,r,I,v);t=n.makeTensorInfo(x,i.dtype,a.values)}else{let e=new a4(v,I,m);t=n.runWebGLProgram(e,[i],i.dtype)}let $=H({inputs:{x:t},backend:n,attrs:{shape:x}});return n.disposeIntermediateTensorInfo(t),$}},a5={kernelName:o.StringNGrams,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{separator:a,nGramWidths:i,leftPad:o,rightPad:s,padWidth:l,preserveShortSequences:u}=n,{data:d,dataSplits:c}=t,p=r.readSync(d.dataId),h=r.readSync(c.dataId),[f,m]=(0,M.$j)(p,h,a,i,o,s,l,u);return[r.makeTensorInfo([f.length],"string",f),r.makeTensorInfo(c.shape,"int32",m)]}},a6={kernelName:o.StringSplit,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{skipEmpty:a}=n,{input:i,delimiter:o}=t;if("string"!==i.dtype)throw Error("Input must be of datatype string");if(1!==i.shape.length)throw Error(`Input must be a vector, got shape: ${i.shape}`);if(0!==o.shape.length)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=r.readSync(i.dataId),l=r.readSync(o.dataId)[0],[u,d,c]=(0,M.A0)(s,l,a),p=d.length;return[r.makeTensorInfo([p,2],"int32",u),r.makeTensorInfo([p],"string",d),r.makeTensorInfo([2],"int32",new Int32Array(c))]}},a9={kernelName:o.StringToHashBucketFast,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{numBuckets:a}=n,{input:i}=t;if("string"!==i.dtype)throw Error("Input must be of datatype string");if(a<=0)throw Error("Number of buckets must be at least 1");let o=r.readSync(i.dataId),s=(0,M._9)(o,a);return r.makeTensorInfo(i.shape,"int32",s)}},a8=D({opSnippet:"return tan(x);"}),a7={kernelName:o.Tan,backendName:"webgl",kernelFunc:a8},ie=D({opSnippet:`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`}),it={kernelName:o.Tanh,backendName:"webgl",kernelFunc:ie},ir={kernelName:o.TensorScatterUpdate,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{tensor:a,indices:i,updates:s}=t,{}=n,{sliceRank:l,numUpdates:u,sliceSize:d,strides:c,outputSize:p}=o.backend_util.calculateShapes(s,i,a.shape),h=[p/d,d];if(0===p)return r.makeTensorInfo(a.shape,i.dtype);let f=H({inputs:{x:i},backend:r,attrs:{shape:[u,l]}}),m=H({inputs:{x:s},backend:r,attrs:{shape:[u,d]}}),x=H({inputs:{x:a},backend:r,attrs:{shape:h}}),g=new ay(u,l,f.shape.length,m.shape.length,c,h,!1,!0),b=r.runWebGLProgram(g,[m,f,x],x.dtype),C=H({inputs:{x:b},backend:r,attrs:{shape:a.shape}});return r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(m),r.disposeIntermediateTensorInfo(x),r.disposeIntermediateTensorInfo(b),C}};class ia{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let n=0;n<r.length;n++)r[n]=e[n]*t[n];this.outputShape=r,this.rank=r.length;let n=(0,C.kW)(this.rank),a=function(e){let t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(1===t)return`imod(resRC, ${e[0]})`;let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],n=[];for(let t=0;t<e.length;t++)n.push(`imod(${r[t]}, ${e[t]})`);return n.join()}(e);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${a}));
      }
    `}}function ii(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{reps:i}=n;if("string"===a.dtype||a.shape.length>5){let e=r.readSync(a.dataId),t="string"===a.dtype?e.map(e=>o.util.decodeString(e)):e,n=(0,o.buffer)(a.shape,a.dtype,t),s=(0,M.KX)(n,i);return r.makeTensorInfo(s.shape,s.dtype,s.values)}let s=new ia(a.shape,i);return r.runWebGLProgram(s,[a],a.dtype)}let io={kernelName:o.Tile,backendName:"webgl",kernelFunc:ii};class is{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}}class il{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=e,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}}function iu(e,t){null!==t&&e.disposeIntermediateTensorInfo(t)}function id(e){let t=1;for(;t<e;)t*=2;return t}let ic={kernelName:o.TopK,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{k:i,sorted:s}=n,l=(0,o.env)().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),u=(0,o.env)().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),d=a.shape,c=d[d.length-1];if(r.shouldExecuteOnCPU([a])||c<l||i>u){let e=r.readSync(a.dataId),[t,n]=(0,M.oC)(e,d,a.dtype,i,s);return[r.makeTensorInfo(t.shape,t.dtype,t.values),r.makeTensorInfo(n.shape,n.dtype,n.values)]}if(0===i)return d[d.length-1]=0,[r.makeTensorInfo(d,a.dtype,[]),r.makeTensorInfo(d,"int32",[])];if(1===c)return[a,rx({attrs:{shape:d,dtype:"int32",value:0},backend:r})];let p=r.texData.get(a.dataId),h=null!==p&&p.isPacked,f=h?r.unpackTensor(a):a,m=o.util.sizeFromShape(d)/c,x=H({inputs:{x:f},attrs:{shape:[m,c]},backend:r});h&&iu(r,f);let g=id(i),b=id(c),C=null,v=()=>null===C?[x,x]:[x,C],y=(e,t,n)=>{let a=v(),i=new is(n),o=[[c],[null===C?1:0],[Number.NEGATIVE_INFINITY],[e],[t]],s=C;C=r.runWebGLProgram(i,a,"int32",o),iu(r,s)};for(let e=1;e<g;e*=2){let t=2*e;for(let r=e;r>=1;r/=2)y(t,r,[m,b])}for(let e=b;e>g;e/=2){let t=v(),n=new il([m,e/2]),a=[[c],[null===C?1:0],[g]],i=C;C=r.runWebGLProgram(n,t,"int32",a),iu(r,i);let o=g/2,s=2*o;for(let e=o;e>=1;e/=2)y(s,e,C.shape)}let I=C;C=eY({inputs:{x:C},backend:r,attrs:{begin:0,size:[m,i]}}),iu(r,I);let $=rD({inputs:{x:x,indices:C},backend:r,attrs:{axis:1,batchDims:1}});iu(r,x);let R=d.slice(0,-1);R.push(i),I=C,C=H({inputs:{x:C},attrs:{shape:R},backend:r}),iu(r,I);let w=$;return $=H({inputs:{x:$},attrs:{shape:R},backend:r}),iu(r,w),[$,C]}};class ip{constructor(e,t,r,n,a,i){let o;switch(this.variableNames=["Image","Transforms"],this.outputShape=i,n){case"constant":default:o=1;break;case"reflect":o=2;break;case"wrap":o=3;break;case"nearest":o=4}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${o} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${o} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${o} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${a});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${a});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

                if (${"nearest"===r?1:2} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}}let ih={kernelName:o.Transform,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{image:a,transforms:i}=t,{interpolation:o,fillMode:s,fillValue:l,outputShape:u}=n,[d,c,p,h]=a.shape,[f,m]=null!=u?u:[c,p],x=new ip(c,p,o,s,l,[d,f,m,h]);return r.runWebGLProgram(x,[a,i],"float32")}},im={kernelName:o.Unique,backendName:"webgl",kernelFunc:function(e){let{inputs:t,attrs:r,backend:n}=e,{axis:a}=r,{x:i}=t;(0,d.assertNotComplex)(i,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let o=n.readSync(i.dataId),{outputValues:s,outputShape:l,indices:u}=(0,M.CV)(o,a,i.shape,i.dtype);return[n.makeTensorInfo(l,i.dtype,s),n.makeTensorInfo([u.length],"int32",u)]}},ix={kernelName:o.Unpack,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{value:a}=t,{axis:i}=n;i<0&&(i+=a.shape.length);let o=a.shape.length,s=a.shape[i],l=Array(o-1),u=0;for(let e=0;e<o;e++)e!==i&&(l[u++]=a.shape[e]);let d=[],c=Array(o).fill(0),p=a.shape.slice();p[i]=1;let h=Array(s);for(let e=0;e<h.length;e++){c[i]=e;let t=eY({inputs:{x:a},backend:r,attrs:{begin:c,size:p}}),n=H({inputs:{x:t},backend:r,attrs:{shape:l}});h[e]=n,d.push(t)}return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),h}};class ig{constructor(e,t){this.variableNames=["x","segmentIds"];let r=e.windowSize,n=e.batchSize,a=e.inSize,i=e.numSegments;this.outputShape=[n,i*Math.ceil(a/r)];let o=4*Math.floor(r/4),s=r%4,l=`
        sumValue += dot(values, segFilter);
    `,u="";a%r>0&&(u=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return initializationValue;
        }
      `);let d="";a%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        ${u}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${d}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${i})) * float(${r}));
        int currentSeg = int(mod(float(outIdx), float(${i})));

        float sumValue = 0.0;

        for (int i = 0; i < ${o}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${l}
        }

        int inIdx = inOffset + ${o};
        if (${1===s}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${l}
        } else if (${2===s}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${l}
        } else if (${3===s}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${l}
        }
        setOutput(sumValue);
      }
    `}}for(let e of[ei,es,eu,ec,ef,eg,eb,eC,e$,eR,eT,eS,eN,e_,eO,eL,eB,eM,eG,eU,eH,eZ,eJ,e2,e4,e8,tt,ta,w,ts,tf,t$,tS,tN,tA,t_,tF,tD,tL,tV,tz,tX,tH,tj,tQ,t0,t1,t4,t5,t6,t8,re,rr,ra,ro,rl,rc,rf,rg,rC,rI,rR,rS,rN,rA,rF,rP,rB,rW,$,rM,tp,rU,rX,rK,S,rq,rQ,rZ,r0,r2,r3,r6,r8,nt,nn,ni,ns,nl,nu,np,nh,nf,nm,nx,nb,ny,n$,n_,z,nD,nL,nV,nM,e5,nU,nH,nK,nQ,nJ,A,n0,n1,n2,n4,n5,e9,nT,n9,n7,at,K,aa,ao,au,ac,af,ax,ab,av,a$,aw,ak,aE,aA,aF,aD,aL,eQ,nA,aV,aW,aM,aG,aU,az,aX,aH,aq,aQ,a0,a1,a2,a3,a5,a6,a9,nE,et,a7,it,ir,io,ic,ih,en,im,ix,{kernelName:o.UnsortedSegmentSum,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,segmentIds:i}=t,{numSegments:s}=n,l=a.shape.length,u=[],d=0,c=o.backend_util.getAxesPermutation([d],l),p=a;null!=c&&(p=er({inputs:{x:a},backend:r,attrs:{perm:c}}),u.push(p),d=o.backend_util.getInnerMostAxes(1,l)[0]);let h=o.backend_util.segment_util.computeOutShape(p.shape,d,s),f=o.util.sizeFromShape([p.shape[d]]),m=H({inputs:{x:p},backend:r,attrs:{shape:[-1,f]}});u.push(m);let x=(0,o.sumOutType)(a.dtype),g=(e,t,n,a,i)=>{let s=e.shape[0],l=e.shape[1],d=o.backend_util.segment_util.segOpComputeOptimalWindowSize(l,i),c=new ig({windowSize:d,inSize:l,batchSize:s,numSegments:i},t),p=r.compileAndRun(c,[e,n],a);if(u.push(p),p.shape[1]===i)return p;let h=n3({backend:r,attrs:{start:0,stop:i,step:1,dtype:"float32"}}),f=ii({inputs:{x:h},backend:r,attrs:{reps:[l/d]}});return u.push(h),u.push(f),g(p,t,f,a,i)},b=H({inputs:{x:g(m,"unsortedSegmentSum",i,x,s)},backend:r,attrs:{shape:h}}),C=b;return null!=c&&(u.push(b),C=er({inputs:{x:C},backend:r,attrs:{perm:o.backend_util.getUndoAxesPermutation(c)}})),u.forEach(e=>r.disposeIntermediateTensorInfo(e)),C}},nX])(0,o.registerKernel)(e)},4902:function(e,t,r){r.d(t,{cK:function(){return eC},qO:function(){return ev},cx:function(){return ey},XM:function(){return eI},cm:function(){return e$},pk:function(){return eR},n7:function(){return ew},gv:function(){return eT},aX:function(){return ek},tx:function(){return eS},MZ:function(){return eE},TD:function(){return eN},m$:function(){return eA},ji:function(){return eF},B_:function(){return e_},Rn:function(){return eD},kY:function(){return eO},PQ:function(){return eP},Sd:function(){return eL},$O:function(){return eB},nL:function(){return eV},r:function(){return eW},Th:function(){return eM},Bo:function(){return eG},cZ:function(){return eU},Tg:function(){return ez},Qs:function(){return eX},M8:function(){return eH},fy:function(){return eK},hO:function(){return ej},St:function(){return eq},Y1:function(){return eY},UN:function(){return eQ},CJ:function(){return eZ},nT:function(){return eJ},X8:function(){return e0},LS:function(){return e1},AR:function(){return e2},Bk:function(){return e4},F1:function(){return e3},$u:function(){return e5},$j:function(){return e6},A0:function(){return e9},_9:function(){return e8},kI:function(){return e7},KX:function(){return te},oC:function(){return tt},Fv:function(){return tr},CV:function(){return tn}});var n={};r.r(n),r.d(n,{addImpl:function(){return f},bincountImpl:function(){return x},bincountReduceImpl:function(){return g},bitwiseAndImpl:function(){return b},castImpl:function(){return d},ceilImpl:function(){return y},concatImpl:function(){return I},equalImpl:function(){return $},expImpl:function(){return R},expm1Impl:function(){return w},floorImpl:function(){return T},gatherNdImpl:function(){return k},gatherV2Impl:function(){return S},greaterEqualImpl:function(){return N},greaterImpl:function(){return E},lessEqualImpl:function(){return _},lessImpl:function(){return A},linSpaceImpl:function(){return F},logImpl:function(){return O},maxImpl:function(){return D},maximumImpl:function(){return P},minimumImpl:function(){return L},multiplyImpl:function(){return B},negImpl:function(){return W},notEqualImpl:function(){return M},prodImpl:function(){return U},raggedGatherImpl:function(){return X},raggedRangeImpl:function(){return H},raggedTensorToTensorImpl:function(){return Q},rangeImpl:function(){return Z},rsqrtImpl:function(){return J},scatterImpl:function(){return ee},sigmoidImpl:function(){return et},simpleAbsImpl:function(){return o},sliceImpl:function(){return er},sparseFillEmptyRowsImpl:function(){return en},sparseReshapeImpl:function(){return ea},sparseSegmentReductionImpl:function(){return ei},sqrtImpl:function(){return eo},staticRegexReplaceImpl:function(){return es},stridedSliceImpl:function(){return el},stringNGramsImpl:function(){return ed},stringSplitImpl:function(){return ec},stringToHashBucketFastImpl:function(){return ep},subImpl:function(){return eh},tileImpl:function(){return em},topKImpl:function(){return eg},transposeImpl:function(){return G},uniqueImpl:function(){return eb}});var a=r(9094);function i(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&a.util.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}function o(e){let t=new Float32Array(e.length);for(let r=0;r<e.length;++r)t[r]=Math.abs(e[r]);return t}function s(e){return(t,r,n,i,o)=>{let s=a.backend_util.assertAndGetBroadcastShape(t,r),l=s.length,u=a.util.computeStrides(s),d=a.util.sizeFromShape(s),c=a.util.getTypedArrayFromDType(o,d),p=t.length,h=r.length,f=a.util.computeStrides(t),m=a.util.computeStrides(r),x=a.backend_util.getBroadcastDims(t,s),g=a.backend_util.getBroadcastDims(r,s);if(x.length+g.length===0)for(let t=0;t<c.length;++t)c[t]=e(n[t%n.length],i[t%i.length]);else for(let t=0;t<c.length;++t){let r=a.util.indexToLoc(t,l,u),o=r.slice(-p);x.forEach(e=>o[e]=0);let s=a.util.locToIndex(o,p,f),d=r.slice(-h);g.forEach(e=>d[e]=0);let b=a.util.locToIndex(d,h,m);c[t]=e(n[s],i[b])}return[c,s]}}function l(e){let{inputs:t,backend:r}=e,{real:n,imag:a}=t,i=r.data.get(n.dataId).values,o=r.data.get(a.dataId).values,s=r.makeTensorInfo(n.shape,"complex64");return r.data.get(s.dataId).complexTensorInfos={real:r.makeTensorInfo(n.shape,"float32",i),imag:r.makeTensorInfo(a.shape,"float32",o)},s}function u(e){let{inputs:t,backend:r}=e,{x:n}=t;return r.incRef(n.dataId),{dataId:n.dataId,shape:n.shape,dtype:n.dtype}}function d(e,t,r,n){if("int32"===n)return[t,"int32",Int32Array.from(e)];if("bool"===n){let n=a.util.toTypedArray([0],r),[i,o]=s((e,t)=>e!==t?1:0)(t,[],e,n,"bool");return[o,"bool",i]}throw Error(`Error in Cast: failed to cast ${r} to ${n}`)}function c(e){let{inputs:t,backend:r,attrs:n}=e,{x:i}=t,{dtype:o}=n;if("complex64"===o){if("complex64"===i.dtype)return u({inputs:{x:i},backend:r});let e=function e(t,r,n="float32"){if("complex64"===n)return l({inputs:{real:e(t,r,"float32"),imag:e(t,r,"float32")},backend:t});let i=a.util.makeZerosTypedArray(a.util.sizeFromShape(r),n);return t.makeTensorInfo(r,n,i)}(r,i.shape,i.dtype),t=c({inputs:{x:i},backend:r,attrs:{dtype:"float32"}}),n=l({inputs:{real:t,imag:e},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),n}if("complex64"===i.dtype){let e=function(e){let{inputs:t,backend:r}=e,{input:n}=t,a=r.data.get(n.dataId).complexTensorInfos.real,i=r.data.get(a.dataId).values;return r.makeTensorInfo(a.shape,a.dtype,i)}({inputs:{input:i},backend:r}),t=c({inputs:{x:e},backend:r,attrs:{dtype:o}});return r.disposeIntermediateTensorInfo(e),t}if(!a.util.hasEncodingLoss(i.dtype,o)){let e=u({inputs:{x:i},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:o}}let[s,p,h]=d(r.data.get(i.dataId).values,i.shape,i.dtype,o);return r.makeTensorInfo(s,p,h)}function p(e,t,r,n){return null==r?({inputs:r,backend:o})=>{let{a:s,b:l}=r;i([s,l],e);let u=o.data.get(s.dataId).values,d=o.data.get(l.dataId).values,c="string"===s.dtype?a.backend_util.fromUint8ToStringArray(u):u,p="string"===s.dtype?a.backend_util.fromUint8ToStringArray(d):d,h=n||s.dtype,[f,m]=t(s.shape,l.shape,c,p,h);return o.makeTensorInfo(m,h,f)}:({inputs:e,backend:a})=>{let{a:i,b:o}=e;if("complex64"===i.dtype||"complex64"===o.dtype){let e=c({inputs:{x:i},backend:a,attrs:{dtype:"complex64"}}),t=a.data.get(e.dataId),n=t.complexTensorInfos.real,s=t.complexTensorInfos.imag,u=a.data.get(n.dataId).values,d=a.data.get(s.dataId).values,p=c({inputs:{x:o},backend:a,attrs:{dtype:"complex64"}}),h=a.data.get(p.dataId),f=h.complexTensorInfos.real,m=h.complexTensorInfos.imag,x=a.data.get(f.dataId).values,g=a.data.get(m.dataId).values,[b,C,v]=r(i.shape,o.shape,u,d,x,g),y=a.makeTensorInfo(v,"float32",b),I=a.makeTensorInfo(v,"float32",C),$=l({inputs:{real:y,imag:I},backend:a});return a.disposeIntermediateTensorInfo(e),a.disposeIntermediateTensorInfo(p),a.disposeIntermediateTensorInfo(y),a.disposeIntermediateTensorInfo(I),$}{let e=a.data.get(i.dataId).values,r=a.data.get(o.dataId).values,s=n||i.dtype,[l,u]=t(i.shape,o.shape,e,r,s);return a.makeTensorInfo(u,s,l)}}}function h(e){return(t,r,n,i,o,s)=>{let l=a.backend_util.assertAndGetBroadcastShape(t,r),u=a.util.sizeFromShape(l),d=l.length,c=a.util.computeStrides(l),p=a.util.getTypedArrayFromDType("float32",u),h=a.util.getTypedArrayFromDType("float32",u),f=a.backend_util.getBroadcastDims(t,l),m=a.backend_util.getBroadcastDims(r,l),x=a.backend_util.mergeRealAndImagArrays(n,i),g=a.backend_util.mergeRealAndImagArrays(o,s),b=t.length,C=a.util.computeStrides(t),v=r.length,y=a.util.computeStrides(r);if(f.length+m.length===0)for(let t=0;t<p.length;t++){let r=t%x.length,n=t%g.length,a=e(x[2*r],x[2*r+1],g[2*n],g[2*n+1]);p[t]=a.real,h[t]=a.imag}else for(let t=0;t<p.length;t++){let r=a.util.indexToLoc(t,d,c),n=r.slice(-b);f.forEach(e=>n[e]=0);let i=a.util.locToIndex(n,b,C),o=r.slice(-v);m.forEach(e=>o[e]=0);let s=a.util.locToIndex(o,v,y),l=e(x[2*i],x[2*i+1],g[2*s],g[2*s+1]);p[t]=l.real,h[t]=l.imag}return[p,h,l]}}a.Abs,a.Complex,a.Identity,a.Real,a.Cast;let f=s((e,t)=>e+t),m=h((e,t,r,n)=>({real:e+r,imag:t+n}));function x(e,t,r,n,i){let o=a.util.sizeFromShape(n),s=a.util.makeZerosTypedArray(i,r);for(let r=0;r<e.length;r++){let n=e[r];if(n<0)throw Error("Input x must be non-negative!");n>=i||(o>0?s[n]+=t[r]:s[n]+=1)}return s}function g(e,t,r,n=!1){let i=e.shape[0],o=e.shape[1],s=(0,a.buffer)([i,r],t.dtype);for(let a=0;a<i;a++)for(let i=0;i<o;i++){let o=e.get(a,i);if(o<0)throw Error("Input x must be non-negative!");o>=r||(n?s.set(1,a,o):t.size>0?s.set(s.get(a,o)+t.get(a,i),a,o):s.set(s.get(a,o)+1,a,o))}return s}p(a.Add,f,m),a.Add;let b=s((e,t)=>e&t);function C(e){return(t,r,n)=>{let i=a.util.getArrayFromDType(r,t.length);for(let r=0;r<t.length;++r)i[r]=e(t[r],n);return i}}function v(e,t,r){return({inputs:n,attrs:o,backend:s})=>{let l;let{x:u}=n;i(u,e);let d=s.data.get(u.dataId).values;if("string"===u.dtype){if(!Array.isArray(d))throw Error("String tensor's value was not an instance of Array");l=a.backend_util.fromUint8ToStringArray(d)}else l=d;let c=r||u.dtype,p=t(l,c,o);return s.makeTensorInfo(u.shape,c,p)}}p(a.BitwiseAnd,b),a.BitwiseAnd;let y=C(e=>Math.ceil(e));function I(e,t,r,n){let i=a.util.getArrayFromDType(r,a.util.sizeFromShape(t));if(n&&"string"!==r){let t=0;e.forEach(e=>{let r=a.util.sizeFromShape(e.shape);i.set(e.vals,t),t+=r})}else{let n=0;e.forEach(e=>{let o="string"===r?a.backend_util.fromUint8ToStringArray(e.vals):e.vals,s=0;for(let r=0;r<e.shape[0];++r){let a=r*t[1]+n;for(let t=0;t<e.shape[1];++t)i[a+t]=o[s++]}n+=e.shape[1]})}return i}v(a.Ceil,y),a.Ceil;let $=s((e,t)=>e===t?1:0);p(a.Equal,$,null,"bool"),a.Equal;let R=C(e=>Math.exp(e));v(a.Exp,R,"float32"),a.Exp;let w=C(e=>Math.expm1(e));v(a.Expm1,w),a.Expm1;let T=C(e=>Math.floor(e));function k(e,t,r,n,i,o,s,l,u){let d=(0,a.buffer)([n,o],r);for(let r=0;r<n;r++){let n=[],a=0;for(let t=0;t<i;t++){let o=e[r*i+t];a+=o*s[t],n.push(o)}if(a<0||a>=u/o)throw Error(`Invalid indices: ${n} does not index into ${l}`);for(let e=0;e<o;e++)d.values[r*o+e]=t.get(...t.indexToLoc(a*o+e))}return d}function S(e,t,r){let n=(0,a.buffer)(r,e.dtype);for(let r=0;r<n.size;++r){let a=n.indexToLoc(r).slice(),i=a[0],o=a[2],s=t.locToIndex([i,o]);a[2]=t.values[s];let l=e.locToIndex(a);0<=l&&l<e.values.length&&(n.values[r]=e.values[l])}return n}v(a.Floor,T),a.Floor;let E=s((e,t)=>e>t?1:0);p(a.Greater,E,null,"bool"),a.Greater;let N=s((e,t)=>e>=t?1:0);p(a.GreaterEqual,N,null,"bool"),a.GreaterEqual;let A=s((e,t)=>e<t?1:0);p(a.Less,A,null,"bool"),a.Less;let _=s((e,t)=>e<=t?1:0);function F(e,t,r){let n=(t-e)/(r-1),i=a.util.makeZerosTypedArray(r,"float32");i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+n;return i}p(a.LessEqual,_,null,"bool"),a.LessEqual;let O=C(e=>Math.log(e));function D(e,t,r,n){let i=a.util.getTypedArrayFromDType(n,a.util.sizeFromShape(r));for(let r=0;r<i.length;++r){let n=r*t,a=e[n];for(let r=0;r<t;++r){let t=e[n+r];(Number.isNaN(t)||t>a)&&(a=t)}i[r]=a}return i}v(a.Log,O),a.Log;let P=s((e,t)=>Math.max(e,t));p(a.Maximum,P),a.Maximum;let L=s((e,t)=>Math.min(e,t));p(a.Minimum,L),a.Minimum;let B=s((e,t)=>e*t),V=h((e,t,r,n)=>({real:e*r-t*n,imag:e*n+t*r}));function W(e,t,r){return B([],t,a.util.createScalarValue(-1,r),e,r)}p(a.Multiply,B,V),a.Multiply,a.Neg;let M=s((e,t)=>e!==t?1:0);function G(e,t,r,n,i){let o=t.length,s=a.util.sizeFromShape(t),l=a.util.computeStrides(t),u=a.util.computeStrides(i),d=a.util.getTypedArrayFromDType(r,a.util.sizeFromShape(i));for(let t=0;t<s;++t){let r=a.util.indexToLoc(t,o,l),i=Array(r.length);for(let e=0;e<i.length;e++)i[e]=r[n[e]];d[a.util.locToIndex(i,o,u)]=e[t]}return d}function U(e,t,r,n){let[i,o]=a.backend_util.computeOutAndReduceShapes(e,n),s=(0,a.upcastType)(t,"int32"),l=a.util.makeZerosTypedArray(a.util.sizeFromShape(i),s),u=a.util.sizeFromShape(o);for(let e=0;e<l.length;++e){let t=e*u,n=1;for(let e=0;e<u;++e)n*=r[t+e];l[e]=n}return{outVals:l,outShape:i,outDtype:s}}function z(e,t){let r=e.slice(0,t);for(;r.length<t;)r.push(1);for(let n=t;n<e.length;n++)r[t-1]*=e[n];return r}function X(e,t,r,n,i,o,s,l){if(0===e.length)throw Error("paramsNestedSplits must be non empty");if(0===t[0].length)throw Error("Split tensors must not be scalars");if(!function(e,t,r){e.forEach((e,n)=>{if(e<0||e>=r){let i=a.util.indexToLoc(n,t.length,a.util.computeStrides(t)).join(",");throw Error(`indices[${i}] = ${e} is not in [0, ${r})`)}})}(o,s,t[0][0]-1),0===n.length)throw Error("params.rank must be nonzero");let{outSplits:u,valueSlices:d,numValues:c}=function(e,t,r,n){let a=[],i=0,o=Array(t.length-1+r.length).fill(null).map(()=>[0]);!function(e,t){for(let r=0;r<e.length;++r){let n=e[r],a=r===e.length-1?t:e[r+1].length;if(0===n.length)throw Error("Ragged splits may not be empty");if(n[0]<0)throw Error("Ragged splits must be non-negative");if(n[n.length-1]>a)throw Error("Ragged splits must not point past values");for(let e=1;e<n.length;++e)if(n[e-1]>n[e])throw Error("Ragged splits must be sorted in ascending order")}}(r,n);let s=1;for(let e=0;e<t.length-1;++e){s*=t[e];let r=t[e+1];for(let t=1;t<s+1;++t)o[e].push(t*r)}for(let n=0;n<e.length;++n){let s=e[n],l=e[n]+1;for(let e=0;e<r.length;++e){let n=r[e],a=e+t.length-1;if(a>=0){let e=o[a],t=e[e.length-1]-n[s];for(let e=s;e<l;++e)o[a].push(n[e+1]+t)}s=n[s],l=n[l]}l!==s&&(a.push([s,l]),i+=l-s)}return{outSplits:o,valueSlices:a,numValues:i}}(o,s,e,n[0]),p=function(e){let t=[];for(let r=0;r<e.length;++r){let n=e[r].length,i=a.util.getArrayFromDType("int32",n);t.push(i),e[r].forEach((e,t)=>i[t]=e)}return t}(u),h=function(e,t,r,n,i){let o=t.slice();o[0]=i;let s=a.util.getArrayFromDType(r,a.util.sizeFromShape(o)),l=e.length,u=0===l?0:l/t[0];return!function(e,t,r,n,a,i){let o=z(t,2)[1],s=z(i,2)[1],l=0;for(let t of r)for(let r=t[0];r<t[1];++r){for(let t=0;t<n;++t)a[l*s+t]=e[r*o+t];++l}}(e,t,n,u,s,o),[s,o]}(r,n,i,d,c);return[p,h[0],h[1]]}function H(e,t,r,n,i,o,s){if(t.length>1)throw Error("starts must be a scalar or vector");if(i.length>1)throw Error("limits must be a scalar or vector");if(s.length>1)throw Error("deltas must be a scalar or vector");let l=0===t.length,u=0===i.length,d=0===s.length,c=[];l||c.push(t[0]),u||c.push(i[0]),d||c.push(s[0]);for(let e=1;e<c.length;++e)if(c[e]!==c[e-1])throw Error("starts, limits, and deltas must have the same shape");let p=0===c.length?1:c[0],h=a.util.getArrayFromDType("int32",p+1);h[0]=0;for(let t=0;t<p;++t){let r;let a=l?e[0]:e[t],i=u?n[0]:n[t],s=d?o[0]:o[t];if(0===s)throw Error("Requires delta != 0");if(s>0&&i<a||s<0&&i>a)r=0;else if((r=Math.ceil(Math.abs((i-a)/s)))>2147483647)throw Error("Requires ((limit - start) / delta) <= 2147483647");h[t+1]=h[t]+r}let f=h[p],m=a.util.getArrayFromDType(r,f),x=0;for(let t=0;t<p;++t){let r=h[t+1]-h[t],n=l?e[0]:e[t],a=d?o[0]:o[t];for(let e=0;e<r;++e)m[x++]=n,n+=a}return[h,m]}p(a.NotEqual,M,null,"bool"),a.NotEqual,a.Transpose,a.Prod;var K=a.backend_util.RowPartitionType;class j{constructor(e,t,r,n,i,o,s,l,u,d){this.shape=e,this.shapeShape=t,this.values=r,this.valuesShape=n,this.valuesDType=i,this.defaultValue=o,this.defaultValueShape=s,this.rowPartitionValues=l,this.rowPartitionValuesShapes=u,this.rowPartitionTypes=a.backend_util.getRowPartitionTypesHelper(d),this.raggedRank=a.backend_util.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===K.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===K.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){let t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case K.VALUE_ROWIDS:return j.getMaxWidthValueRowID(t);case K.ROW_SPLITS:return j.getMaxWidthRowSplit(t);default:throw Error(`Cannot handle partition type ${K[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(0===t||1===t)return 0;let r=0;for(let n=0;n<t-1;++n){let t=e[n+1]-e[n];t>r&&(r=t)}return r}static getMaxWidthValueRowID(e){let t=e.length;if(0===t)return 0;let r=0,n=e[0],a=0;for(let i=1;i<t;++i){let t=e[i];t!==n&&(n=t,a=Math.max(i-r,a),r=i)}return Math.max(t-r,a)}tensorShapeFromTensor(e,t,r=!0){if(0===t.length){if(-1===e[0])return[];throw Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return Y(e,r)}calculateOutputSize(e){let t=this.valuesShape,r=this.defaultValueShape;a.backend_util.validateDefaultValueShape(r,t);let n=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=a.backend_util.combineRaggedTensorToTensorShapes(this.raggedRank,n,t);i[0]<0&&(i[0]=e);for(let e=1;e<=this.raggedRank;++e)i[e]<0&&(i[e]=this.getMaxWidth(e));return i}calculateFirstParentOutputIndex(e,t,r){let n=Math.min(e,r),i=[],o=0;for(let e=0;e<n;++e,o+=t)i.push(o);for(let t=n;t<e;++t)i.push(-1);return a.util.assert(i.length===e,()=>"Final length of result must be equal to firstDimension."),i}calculateOutputIndexRowSplit(e,t,r,n){let a=e.length,i=[];for(let o=0;o<a-1;++o){let a=e[o+1]-e[o],s=Math.min(n,a),l=t[o];-1===l&&(s=0);for(let e=0;e<s;++e)i.push(l),l+=r;for(let e=0;e<a-s;++e)i.push(-1)}if(a>0&&i.length!==e[a-1])throw Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(e,t,r,n){let a=e.length,i=[];if(0===a)return[];let o=0,s=e[0];if(s>=t.length)throw Error(`Got currentValueRowId=${s}, which is not less than ${t.length}`);let l=t[s];i.push(l);for(let u=1;u<a;++u){let a=e[u];if(a===s)l>=0&&(++o<n?l+=r:l=-1);else{if(o=0,s=a,a>=t.length)throw Error(`Got nextValueRowId=${a} which is not less than ${t.length}`);l=t[a]}i.push(l)}if(i.length!==e.length)throw Error("Invalid row ids.");return i}calculateOutputIndex(e,t,r,n){let a=this.getRowPartitionTensor(e),i=this.getRowPartitionTypeByDimension(e);switch(i){case K.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(a,t,r,n);case K.ROW_SPLITS:if(a.length-1>t.length)throw Error(`Row partition size is greater than output size: ${a.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(a,t,r,n);default:throw Error(`Unsupported partition type: ${K[i]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(0===this.rowPartitionTypes.length)throw Error("No row_partition_types given.");let t=this.rowPartitionTypes[0];switch(t){case K.FIRST_DIM_SIZE:return e[0];case K.VALUE_ROWIDS:throw Error("Cannot handle VALUE_ROWIDS in first dimension.");case K.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${K[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw Error("Invalid first partition input. Tensor requires at least one element.");let e=this.getFirstDimensionSize(),t=this.calculateOutputSize(e),r=Array(this.raggedRank+1);r[r.length-1]=1;for(let e=r.length-2;e>=0;--e)r[e]=r[e+1]*t[e+1];let n=Y(t,!1),i=a.util.getArrayFromDType(this.valuesDType,a.util.sizeFromShape(n));if(r[0]*t[0]>0){let a=this.calculateFirstParentOutputIndex(e,r[0],t[0]);for(let e=1;e<=this.raggedRank;++e)a=this.calculateOutputIndex(e-1,a,r[e],t[e]);this.setOutput(this.raggedRank,a,i,n)}return[n,i]}setOutput(e,t,r,n){if(0===r.length)return;let i=this.values,o=n.slice();o=o.slice(e+1);let s=a.util.sizeFromShape(o),l=t.length,u=this.defaultValue;if(u.length!==s&&1!==u.length){let e=this.defaultValueShape;(0,a.tidy)(()=>{let t=(0,a.reshape)(u,e);u=(0,a.broadcastTo)(t,o).dataSync()})}let d=0,c=0,p=0;for(let e=0;e<=l;++e){let n=e<l?t[e]:-1;if(n===p){++p;continue}if(c<p){let e=i.subarray(d*s);q(r.subarray(c*s),e,(p-c)*s)}if(e>=l&&(n=Math.floor(r.length/s)),n>p){if(1===this.defaultValue.length)r.subarray(p*s,n*s).fill(this.defaultValue[0]),p=n;else for(;n>p;)q(r.slice(p*s),u,s),++p}n<0?(d=e+1,c=p):(d=e,p=(c=p)+1)}}}function q(e,t,r){for(let n=0;n<r;n++)e[n]=t[n]}function Y(e,t){let r=[];for(let n of e){if(n<0){if(!t)throw Error(`Dimension ${n} must be >= 0`);if(n<-1)throw Error(`Dimension ${n} must be >= -1`);n=-1}r.push(n)}return r}function Q(e,t,r,n,a,i,o,s,l,u){return new j(e,t,r,n,a,i,o,s,l,u).compute()}function Z(e,t,r,n){let i=e<t&&r<0,o=t<e&&r>1;if(e===t||i||o)return a.util.makeZerosTypedArray(0,n);let s=Math.abs(Math.ceil((t-e)/r)),l=a.util.makeZerosTypedArray(s,n);t<e&&1===r&&(r=-1),l[0]=e;for(let e=1;e<l.length;e++)l[e]=l[e-1]+r;return l}let J=C(e=>1/Math.sqrt(e));function ee(e,t,r,n,i,o,s,l,u,d){let c=e.values,p=t.values;if(0===n)return(0,a.buffer)(r,t.dtype);let h=u instanceof a.TensorBuffer?u:(0,a.buffer)([n/i,i],t.dtype);"string"==typeof u?h.values.fill(u):"number"==typeof u?h.values.fill(u):"boolean"==typeof u&&h.values.fill(+u);for(let e=0;e<o;e++){let a=[],o=0;for(let t=0;t<s;t++){let r=c[e*s+t];a.push(r),o+=r*l[t]}if(o<0||o>=n/i)throw Error(`Invalid indices: ${a} does not index into ${r}`);for(let r=0;r<i;r++)d?h.values[o*i+r]+=p[e*i+r]:h.values[o*i+r]=0===t.rank?p[0]:p[e*i+r]}return h}v(a.Rsqrt,J),a.Rsqrt;let et=C(e=>1/(1+Math.exp(-e)));function er(e,t,r,n,i){let o=a.slice_util.isSliceContinous(n,t,r),s=a.util.sizeFromShape(r),l=a.util.computeStrides(n);if(o){let r=a.slice_util.computeFlatOffset(t,l);return"string"===i?e.slice(r,r+s):e.subarray(r,r+s)}let u="string"===i?a.backend_util.fromUint8ToStringArray(e):e,d=(0,a.buffer)(n,i,u),c=(0,a.buffer)(r,i);for(let e=0;e<c.size;++e){let r=c.indexToLoc(e),n=r.map((e,r)=>e+t[r]);c.set(d.get(...n),...r)}return"string"===i?a.backend_util.fromStringArrayToUint8(c.values):c.values}function en(e,t,r,n,i,o,s){let l=t[0],u=o[0],d=Array(u),c=Array(l),p=t[1];if(0===u){if(0!==l)throw Error(a.backend_util.getSparseFillEmptyRowsIndicesDenseShapeMismatch(l));return[a.util.getArrayFromDType(r,0),[0,p],a.util.getArrayFromDType(i,0),d,c]}let h=!0,f=0,m=Array(u).fill(0);for(let t=0;t<l;++t){let r=e[t*p];if(r<0)throw Error(a.backend_util.getSparseFillEmptyRowsNegativeIndexErrorMessage(t,r));if(r>=u)throw Error(a.backend_util.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(t,r,u));++m[r],h=h&&r>=f,f=r}let x=!0;for(let e=0;e<u;++e){let t=0===m[e];d[e]=t,x=x&&!t,m[e]=Math.max(m[e],1),e>0&&(m[e]+=m[e-1])}if(x&&h){for(let e=0;e<l;++e)c[e]=e;return[e,[l,p],n,d,c]}{let t=m[u-1],o=a.util.getArrayFromDType(r,t*p),h=a.util.getArrayFromDType(i,t),f=Array(u).fill(0);for(let t=0;t<l;++t){let r=e[t*p],a=f[r],i=(0===r?0:m[r-1])+a;f[r]++;for(let r=0;r<p;++r)o[i*p+r]=e[t*p+r];h[i]=n[t],c[t]=i}for(let e=0;e<u;++e)if(0===f[e]){let t=0===e?0:m[e-1];o[t*p+0]=e;for(let e=1;e<p;++e)o[t*p+e]=0;h[t]=s}return[o,[t,p],h,d,c]}}function ea(e,t,r,n,i){let o=a.util.sizeFromShape(n),s=t[0],l=i.length,u=[],d=1,c=-1;for(let e=0;e<l;++e){let t=i[e];if(-1===t){if(-1!==c)throw Error(a.backend_util.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(c,e));c=e,u.push(1)}else{if(t<0)throw Error(a.backend_util.getSparseReshapeNegativeOutputDimErrorMessage(e,t));d*=t,u.push(t)}}if(-1!==c){if(d<=0)throw Error(a.backend_util.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let e=Math.trunc(o/d);if(d*e!==o)throw Error(a.backend_util.getSparseReshapeInputOutputMultipleErrorMessage(n,u));u[c]=e}if(a.util.sizeFromShape(u)!==o)throw Error(a.backend_util.getSparseReshapeInputOutputMismatchErrorMessage(n,u));let p=n.length,h=[];if(p>0){h[p-1]=1;for(let e=p-2;e>=0;--e)h[e]=h[e+1]*n[e+1]}let f=[];if(l>0){f[l-1]=1;for(let e=l-2;e>=0;--e)f[e]=f[e+1]*u[e+1]}let m=a.util.getArrayFromDType(r,s*l);for(let t=0;t<s;++t){let r=0;for(let n=0;n<p;++n)r+=e[t*p+n]*h[n];for(let e=0;e<l;++e)m[t*l+e]=Math.trunc(r/f[e]),r%=f[e]}return[m,[s,l],u]}function ei(e,t,r,n,i,o=!1,s=0){let l=n.length,u=[t[0],e.length/t[0]],d=u[1],c=l>0?i[l-1]+1:0;if(c<0)throw Error(a.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let p=t.slice();p[0]=c;let h=p.reduce((e,t)=>e*t,1),f=a.util.getArrayFromDType(r,h);if(0===l)return c>0&&f.fill(s),[f,p];if(c<=0)throw Error(a.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=0,x=1,g=0,b=i[0];for(;;){let t=0;if(x<l){if(b===(t=i[x])){++x;continue}if(b>=t)throw Error(a.backend_util.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(b<0||b>=c)throw Error(a.backend_util.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(b,c));b>g&&f.fill(s,g*d,b*d);for(let t=m;t<x;++t){let r=n[t];if(r<0||r>=u[0])throw Error(a.backend_util.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(t,n[t],u[0]));for(let t=0;t<d;t++)f[b*d+t]+=e[r*d+t]}if(o)for(let e=0;e<d;e++)f[b*d+e]/=x-m;if(m=x,++x,g=b+1,b=t,x>l)break}return g<c&&f.fill(s,g*d,c*d),[f,p]}v(a.Sigmoid,C(e=>1/(1+Math.exp(-e))),void 0),a.Sigmoid,a.Slice;let eo=C(e=>Math.sqrt(e));v(a.Sqrt,C(e=>Math.sqrt(e)),void 0),a.Sqrt;let es=C((e,t)=>{let{pattern:r,replaceGlobal:n,rewrite:a}=t;return e.replace(new RegExp(r,n?"g":""),a)});function el(e,t,r,n){let i=(0,a.buffer)(e,t.dtype);for(let e=0;e<i.size;e++){let a=i.indexToLoc(e),o=Array(a.length);for(let e=0;e<o.length;e++)o[e]=a[e]*r[e]+n[e];i.set(t.get(...o),...a)}return i}v(a.StaticRegexReplace,es),a.StaticRegexReplace;class eu{constructor(e,t,r,n,i,o){this.separator=a.util.encodeString(e),this.nGramWidths=t,this.leftPad=a.util.encodeString(r),this.rightPad=a.util.encodeString(n),this.padWidth=i,this.preserveShort=o}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){return Math.max(0,e+2*this.getPadWidth(t)-t+1)}createNGrams(e,t,r,n,a,i){for(let o=0;o<a;++o){let s;let l=this.getPadWidth(i),u=Math.max(0,l-o),d=Math.max(0,l-(a-(o+1))),c=i-(u+d),p=t+(u>0?0:o-l);s=0+u*this.leftPad.length;for(let t=0;t<c;++t)s+=e[p+t].length;s+=d*this.rightPad.length+(u+d+c-1)*this.separator.length,r[n+o]=new Uint8Array(s);let h=r[n+o],f=0,m=e=>e.forEach(e=>h[f++]=e);for(let e=0;e<u;++e)m(this.leftPad),m(this.separator);for(let t=0;t<c-1;++t)m(e[p+t]),m(this.separator);if(c>0){m(e[p+c-1]);for(let e=0;e<d;++e)m(this.separator),m(this.rightPad)}else{for(let e=0;e<d-1;++e)m(this.rightPad),m(this.separator);m(this.rightPad)}}}compute(e,t){let r=e.length,n=t.length;if(n>0){let e=t[0];if(0!==e)throw Error(`First split value must be 0, got ${e}`);for(let a=1;a<n;++a){let n=t[a]>=e;if(!(n=n&&t[a]<=r))throw Error(`Invalid split value ${t[a]}, must be in [${e}, ${r}]`);e=t[a]}if(e!==r)throw Error(`Last split value must be data size. Expected ${r}, got ${e}`)}let i=n-1,o=a.util.getArrayFromDType("int32",n);if(0===r||0===n){let e=Array(r);for(let e=0;e<=i;++e)o[e]=0;return[e,o]}o[0]=0;for(let e=1;e<=i;++e){let r=t[e]-t[e-1],n=0;this.nGramWidths.forEach(e=>{n+=this.getNumNGrams(r,e)}),this.preserveShort&&r>0&&0===n&&(n=1),o[e]=o[e-1]+n}let s=Array(o[i]);for(let r=0;r<i;++r){let n=t[r],a=o[r];if(this.nGramWidths.forEach(i=>{let o=t[r+1]-t[r],l=this.getNumNGrams(o,i);this.createNGrams(e,n,s,a,l,i),a+=l}),this.preserveShort&&a===o[r]){let i=t[r+1]-t[r];if(0===i)continue;let o=i+2*this.padWidth;this.createNGrams(e,n,s,a,1,o)}}return[s,o]}}function ed(e,t,r,n,a,i,o,s){return new eu(r,n,a,i,o,s).compute(e,t)}function ec(e,t,r){let n=e.length,i=[],o=0,s=0,l=Array(n);for(let a=0;a<n;++a){let n=i.length;!function(e,t,r,n){if(!e.length)return;if(0===t.length){for(let t=0;t<e.length;++t)n.push(e.subarray(t,t+1));return}if(1===t.length){let a=t[0],i=e.indexOf(a);for(;-1!==i;){let t=e.subarray(0,i);r&&0===t.length||n.push(t),i=(e=e.subarray(i+1)).indexOf(a)}r&&0===e.length||n.push(e);return}let a=0;for(let i=0;i<e.length+1;i++)if(i===e.length||-1!==t.indexOf(e[i])){let t=e.subarray(a,i);r&&0===t.length||n.push(t),a=i+1}}(e[a],t,r,i);let u=i.length-n;l[a]=u,o+=u,s=Math.max(s,u)}let u=a.util.getArrayFromDType("int32",2*o),d=Array(o),c=[n,s],p=0;for(let e=0;e<n;++e)for(let t=0;t<l[e];++t)u[2*p]=e,u[2*p+1]=t,d[p]=i[p],++p;return[u,d,c]}function ep(e,t){let r=a.util.getArrayFromDType("int32",e.length);for(let n=0;n<e.length;++n)r[n]=a.util.fingerPrint64(e[n]).modulo(t).getLowBitsUnsigned();return r}let eh=s((e,t)=>e-t),ef=h((e,t,r,n)=>({real:e-r,imag:t-n}));function em(e,t){let r=Array(e.rank);for(let n=0;n<r.length;n++)r[n]=e.shape[n]*t[n];let n=(0,a.buffer)(r,e.dtype);for(let t=0;t<n.values.length;++t){let r=n.indexToLoc(t),a=Array(e.rank);for(let t=0;t<a.length;t++)a[t]=r[t]%e.shape[t];let i=e.locToIndex(a);n.values[t]=e.values[i]}return n}p(a.Sub,eh,ef),a.Sub;let ex=(e,t)=>{let r=t.value-e.value;return 0===r?e.index-t.index:r};function eg(e,t,r,n,i){let o=t[t.length-1],[s,l]=[e.length/o,o],u=a.util.getTypedArrayFromDType(r,s*n),d=a.util.getTypedArrayFromDType("int32",s*n);for(let t=0;t<s;t++){let r=t*l,o=e.subarray(r,r+l),s=Array(o.length);o.forEach((e,t)=>s[t]={value:e,index:t}),n<s.length&&(function e(t,r,n=0,i=t.length-1){for(;i>n;){if(i-n>600){let a=i-n+1,o=r-n+1,s=Math.log(a),l=.5*Math.exp(2*s/3),u=.5*Math.sqrt(s*l*(a-l)/a)*Math.sign(o-a/2),d=Math.max(n,Math.floor(r-o*l/a+u)),c=Math.min(i,Math.floor(r+(a-o)*l/a+u));e(t,r,d,c)}let o=t[r],s=n,l=i;for(a.util.swap(t,n,r),ex(t[i],o)>0&&a.util.swap(t,n,i);s<l;){for(a.util.swap(t,s,l),s++,l--;0>ex(t[s],o);)s+=1;for(;ex(t[l],o)>0;)l-=1}0===ex(t[n],o)?a.util.swap(t,n,l):(l+=1,a.util.swap(t,l,i)),l<=r&&(n=l+1),r<=l&&(i=l-1)}}(s,n),s=s.slice(0,n)),i&&s.sort(ex);let c=t*n,p=u.subarray(c,c+n),h=d.subarray(c,c+n);for(let e=0;e<n;e++)p[e]=s[e].value,h[e]=s[e].index}let c=t.slice();return c[c.length-1]=n,[(0,a.buffer)(c,r,u),(0,a.buffer)(c,"int32",d)]}function eb(e,t,r,n){let i=a.util.parseAxisParam(t,r)[0],o=[1,r[0],1];for(let e=0;e<i;e++)o[0]*=r[e];o[1]=r[i];for(let e=i+1;e<r.length;e++)o[2]*=r[e];let s=new Map,l=new Int32Array(r[i]),u=new a.TensorBuffer(o,n,e),d=[],c=1===o[0]&&1===o[2];for(let t=0;t<r[i];t++){let r;if(c)r=e[t].toString();else{let e=[];for(let r=0;r<o[0];r++)for(let n=0;n<o[2];n++)e.push(u.get(r,t,n));r=e.join(",")}let n=s.get(r);if(null!=n)l[t]=n;else{let e=s.size;s.set(r,e),l[t]=e,d.push(t)}}let p=o.slice();p[1]=s.size;let h=new a.TensorBuffer(p,n);d.forEach((e,t)=>{for(let r=0;r<o[0];r++)for(let n=0;n<o[2];n++)h.set(u.get(r,e,n),r,t,n)});let f=r.slice();return f[i]=p[1],{outputValues:h.values,outputShape:f,indices:l}}let{addImpl:eC,bincountImpl:ev,bincountReduceImpl:ey,bitwiseAndImpl:eI,castImpl:e$,ceilImpl:eR,concatImpl:ew,equalImpl:eT,expImpl:ek,expm1Impl:eS,floorImpl:eE,gatherNdImpl:eN,gatherV2Impl:eA,greaterImpl:e_,greaterEqualImpl:eF,lessImpl:eO,lessEqualImpl:eD,linSpaceImpl:eP,logImpl:eL,maxImpl:eB,maximumImpl:eV,minimumImpl:eW,multiplyImpl:eM,negImpl:eG,notEqualImpl:eU,prodImpl:ez,raggedGatherImpl:eX,raggedRangeImpl:eH,raggedTensorToTensorImpl:eK,rangeImpl:ej,rsqrtImpl:eq,scatterImpl:eY,sigmoidImpl:eQ,simpleAbsImpl:eZ,sliceImpl:eJ,sparseFillEmptyRowsImpl:e0,sparseReshapeImpl:e1,sparseSegmentReductionImpl:e2,sqrtImpl:e4,staticRegexReplaceImpl:e3,stridedSliceImpl:e5,stringNGramsImpl:e6,stringSplitImpl:e9,stringToHashBucketFastImpl:e8,subImpl:e7,tileImpl:te,topKImpl:tt,transposeImpl:tr,uniqueImpl:tn}=n},3525:function(e,t,r){r.d(t,{U:function(){return o}});var n=r(943),a=r(688),i=r(9201);class o{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),0===this.rank)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=(0,a.Ky)("rc",this.rank),t=(0,i.kW)(this.rank),r=this.getOutOfBoundsCondition(e),n=this.getSetup(e),o=this.getOutput(e);this.userCode=`
        void main() {
          ${t} rc = getOutputCoords();

          if(${r}) {
            setOutput(vec4(0));
          } else {
            ${n}

            setOutput(vec4(${o}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let r=0;r<=1;r++)for(let n=0;n<=1;n++){let a=`${0===r?"r":"rp1"}, ${0===n?"c":"cp1"}`;for(let t=2;t<this.rank;t++)a=`${e[e.length-1-t]},`+a;t.push(a)}return t}getOutOfBoundsCondition(e){if(1===this.rank)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let r=this.rank-2;r<this.rank;r++)t+=`${e[r]} >= ${this.enableShapeUniforms?`outShape[${r}]`:this.outputShape[r]}`,r<this.rank-1&&(t+="||");return t}getSetup(e){if(1===this.rank)return"";let t=e.slice(-2),r=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${r};
      bool rEdge = rp1 >= ${n};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);if(1===this.rank){let e=this.enableShapeUniforms?"outShape":this.outputShape[0];return`getA(rc), (rc + 1 >= ${e} ? 0. : getA(rc + 1)), 0, 0`}return`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}}},688:function(e,t,r){function n(e,t){return["x","y","z","w","u","v"].slice(0,t).map(t=>`${e}.${t}`)}function a(e,t){return 1===t?[e]:n(e,t)}function i(e,t){if(1===e)return"rc";let r="";for(let n=0;n<e;n++)r+=t[n],n<e-1&&(r+=",");return r}r.d(t,{Ky:function(){return a},Qc:function(){return i},k6:function(){return n}})},1811:function(e,t,r){r.d(t,{v:function(){return i}});var n=r(943),a=r(445);class i{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length);let r="";for(let e=0;e<4;e++){let t="thisRC = rc;";e%2==1&&(t+="thisRC.z += 1;"),e>1&&(t+="thisRC.y += 1;"),r+=`
        ${t}
        ${e>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${e>0?"}":""}
      `}this.userCode=`
      ${function(e,t){let r=t?a.al(["r","c","d"],"inputShape"):a.RW(["r","c","d"],e);return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${r}
      return ivec3(r, c, d);
    }
  `}(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?a.nc():a.ku(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${r}

        setOutput(result);
      }
    `}}},445:function(e,t,r){r.d(t,{Kn:function(){return i},RW:function(){return a},al:function(){return o},ku:function(){return s},nc:function(){return l},ye:function(){return u}});var n=r(9094);function a(e,t,r="index"){let a=n.util.computeStrides(t);return a.map((t,n)=>{let i=`int ${e[n]} = ${r} / ${t}`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * ${t}`:`index -= ${e[n]} * ${t}`;return`${i}; ${o};`}).join("")}function i(e,t,r="index"){let a=n.util.computeStrides(t);return a.map((t,n)=>{let i=`int ${e[n]} = ${r} / outShapeStrides[${n}]`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * outShapeStrides[${n}]`:`index -= ${e[n]} * outShapeStrides[${n}]`;return`${i}; ${o};`}).join("")}function o(e,t,r="index"){let n=function(e,t){let r=e.length,n=e.map(e=>`${t}[${e}]`),a=Array(r-1);a[r-2]=n[r-1];for(let e=r-3;e>=0;--e)a[e]=`(${a[e+1]} * ${n[e+1]})`;return a}(e.map((e,t)=>t),t);return n.map((t,a)=>{let i=`int ${e[a]} = ${r} / ${n[a]}`,o=a===n.length-1?`int ${e[a+1]} = ${r} - ${e[a]} * ${n[a]}`:`index -= ${e[a]} * ${n[a]}`;return`${i}; ${o};`}).join("")}function s(e){let t=n.util.computeStrides(e).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function l(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}let u=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`},7275:function(e,t,r){r.d(t,{Se:function(){return f},Sq:function(){return m},V9:function(){return l},Yz:function(){return p},kk:function(){return d},m1:function(){return o},qe:function(){return h},v2:function(){return s},yb:function(){return c}});var n,a,i,o,s,l,u=r(9094);function d(e,t){return[t,e]}function c(e,t){return e*t}function p(e){let t=u.util.sizeFromShape(e);return u.util.sizeToSquarishShape(Math.ceil(t/4))}function h(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function f(e,t){let[r,n]=h(e,t);return r*n*4}function m(e,t){let r,n,a,i,o,s,l,d,c,p;return 2===(0,u.env)().getNumber("WEBGL_VERSION")?(r=e.R32F,n=e.R16F,a=e.RGBA16F,i=e.RGBA32F,o=e.RED,l=4,d=1,c=e.HALF_FLOAT,p=e.FLOAT,s=e.RGBA8):(r=e.RGBA,n=e.RGBA,a=e.RGBA,i=e.RGBA,o=e.RGBA,l=4,d=4,c=null!=t?t.HALF_FLOAT_OES:null,p=e.FLOAT,s=e.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:i,textureFormatFloat:o,downloadTextureFormat:s,downloadUnpackNumChannels:l,defaultNumChannels:d,textureTypeHalfFloat:c,textureTypeFloat:p}}(n=o||(o={}))[n.DENSE=0]="DENSE",n[n.SHARED_BATCH=1]="SHARED_BATCH",(a=s||(s={}))[a.RENDER=0]="RENDER",a[a.UPLOAD=1]="UPLOAD",a[a.PIXELS=2]="PIXELS",a[a.DOWNLOAD=3]="DOWNLOAD",(i=l||(l={}))[i.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",i[i.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",i[i.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",i[i.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",i[i.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"},2541:function(e,t,r){r.d(t,{I:function(){return o}});var n=r(9094),a=r(8657),i=r(7275);class o{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,r){let n;let a=l(t,r),o=u(e,a,r);o in this.freeTextures||(this.freeTextures[o]=[]),o in this.usedTextures||(this.usedTextures[o]=[]);let d=s(e,a,this.gpgpu.gl,this.gpgpu.textureConfig,r);if(this.freeTextures[o].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=d,this.log();let e=this.freeTextures[o].pop();return this.usedTextures[o].push(e),e}return a===i.V9.PACKED_2X2_FLOAT32?n=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):a===i.V9.PACKED_2X2_FLOAT16?n=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):a===i.V9.UNPACKED_FLOAT32?n=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):a===i.V9.UNPACKED_FLOAT16?n=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):a===i.V9.PACKED_4X1_UNSIGNED_BYTE&&(n=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[o].push(n),this.numUsedTextures++,this._numBytesAllocated+=d,this.log(),n}releaseTexture(e,t,r,a){if(null==this.freeTextures)return;let i=l(r,a),o=u(t,i,a);o in this.freeTextures||(this.freeTextures[o]=[]);let d=s(t,i,this.gpgpu.gl,this.gpgpu.textureConfig,a),c=(0,n.env)().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");-1!==c&&this._numBytesAllocated>c?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=d):(this.freeTextures[o].push(e),this.numFreeTextures++,this._numBytesFree+=d),this.numUsedTextures--;let p=this.usedTextures[o],h=p&&p.indexOf(e);if(null==h||h<0)throw Error("Cannot release a texture that was never provided by this texture manager");p[h]=p[p.length-1],p.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(null!=this.freeTextures){for(let e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}}function s(e,t,r,n,o){let s;let l=function(e,t){switch(e){case i.V9.PACKED_2X2_FLOAT32:return(0,a.getInternalFormatForPackedMatrixTexture)(t);case i.V9.PACKED_2X2_FLOAT16:return(0,a.getInternalFormatForFloat16PackedMatrixTexture)(t);case i.V9.UNPACKED_FLOAT32:return(0,a.getInternalFormatForFloat32MatrixTexture)(t);case i.V9.UNPACKED_FLOAT16:return(0,a.getInternalFormatForFloat16MatrixTexture)(t);case i.V9.PACKED_4X1_UNSIGNED_BYTE:return(0,a.getInternalFormatForUnsignedBytesMatrixTexture)(t);default:throw Error(`Unknown physical texture type ${e}`)}}(t,n);if(o){let[t,r]=(0,i.qe)(e[0],e[1]);s=t*r}else{let[t,r]=(0,i.kk)(e[0],e[1]);s=t*r}return s*function(e,t){if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F||t===e.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw Error(`Unknown internal format ${t}`)}(r,l)}function l(e,t){if(e===i.v2.UPLOAD)return i.V9.PACKED_2X2_FLOAT32;if(e===i.v2.RENDER||null==e)return(0,n.env)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?t?i.V9.PACKED_2X2_FLOAT32:i.V9.UNPACKED_FLOAT32:t?i.V9.PACKED_2X2_FLOAT16:i.V9.UNPACKED_FLOAT16;if(e===i.v2.DOWNLOAD||e===i.v2.PIXELS)return i.V9.PACKED_4X1_UNSIGNED_BYTE;throw Error(`Unknown logical texture type ${e}`)}function u(e,t,r){return`${e[0]}_${e[1]}_${t}_${r}`}},5626:function(e,t,r){r.d(t,{Cv:function(){return l},D1:function(){return i},Et:function(){return s},RX:function(){return u},Tq:function(){return p},bl:function(){return c},eW:function(){return d},l:function(){return a},t$:function(){return o}});var n=r(943);class a{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}}let i="if (isnan(x)) return x;",o="return x;",s="return abs(x);",l="return (x >= 0.0) ? x : (exp(x) - 1.0);",u=i+`
  return (x < 0.0) ? 0.0 : x;
`,d=i+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,c="return x;",p="return 1.0 / (1.0 + exp(-1.0 * x));"},5243:function(e,t,r){r.d(t,{Cv:function(){return i},RX:function(){return o},Tq:function(){return l},cc:function(){return u},eW:function(){return s},t$:function(){return a}});var n=r(943);let a="return x;",i=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,o=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,s=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,l="return 1.0 / (1.0 + exp(-1.0 * x));";class u{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}}},3375:function(e,t,r){r.d(t,{W:function(){return o}});var n=r(943),a=r(688),i=r(9201);class o{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length);let t=e.length,r=(0,a.Ky)("rc",t),o=(0,i.kW)(t),s=(0,a.Qc)(t,r),l=r.slice(-2),u=t<=1?"rc":`vec2(${l.join(",")})`;this.userCode=`
      void main() {
        ${o} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${u}));
      }
    `}}},3326:function(e,t,r){let n,a;r.r(t),r.d(t,{assertNotComplex:function(){return ee},bindCanvasToFramebuffer:function(){return A},bindColorTextureToFramebuffer:function(){return _},bindTextureToProgramUniformSampler:function(){return N},bindTextureUnit:function(){return T},bindVertexBufferToProgramAttribute:function(){return w},callAndCheck:function(){return l},canBeRepresented:function(){return u},createFragmentShader:function(){return h},createFramebuffer:function(){return R},createProgram:function(){return x},createStaticIndexBuffer:function(){return v},createStaticVertexBuffer:function(){return C},createTexture:function(){return I},createVertexShader:function(){return p},getBatchDim:function(){return B},getExtensionOrThrow:function(){return c},getFramebufferErrorMessage:function(){return D},getMaxTexturesInShader:function(){return H},getNumChannels:function(){return y},getProgramUniformLocation:function(){return E},getProgramUniformLocationOrThrow:function(){return S},getRowsCols:function(){return V},getShapeAs3D:function(){return W},getTextureShapeFromLogicalShape:function(){return M},getWebGLDisjointQueryTimerVersion:function(){return K},getWebGLErrorMessage:function(){return d},getWebGLMaxTextureSize:function(){return U},hasExtension:function(){return j},isCapableOfRenderingToFloatTexture:function(){return Y},isDownloadFloatTextureEnabled:function(){return Q},isReshapeFree:function(){return G},isWebGLFenceEnabled:function(){return J},isWebGLVersionEnabled:function(){return q},linkProgram:function(){return g},logShaderSourceAndInfoLog:function(){return m},resetMaxTextureSize:function(){return z},resetMaxTexturesInShader:function(){return X},unbindColorTextureFromFramebuffer:function(){return F},unbindTextureUnit:function(){return k},validateFramebuffer:function(){return O},validateProgram:function(){return b},validateTextureSize:function(){return $}});var i=r(9094),o=r(756),s=r(7275);function l(e,t){let r=t();return(0,i.env)().getBool("DEBUG")&&function(e){let t=e.getError();if(t!==e.NO_ERROR)throw Error("WebGL Error: "+d(e,t))}(e),r}function u(e){return!!((0,i.env)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===e||596e-10<Math.abs(e)&&65504>Math.abs(e))}function d(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function c(e,t){return P(e,()=>e.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function p(e,t){let r=P(e,()=>e.createShader(e.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(l(e,()=>e.shaderSource(r,t)),l(e,()=>e.compileShader(r)),!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw console.log(e.getShaderInfoLog(r)),Error("Failed to compile vertex shader.");return r}function h(e,t){let r=P(e,()=>e.createShader(e.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(l(e,()=>e.shaderSource(r,t)),l(e,()=>e.compileShader(r)),(0,i.env)().get("ENGINE_COMPILE_ONLY"))return r;if(!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw m(t,e.getShaderInfoLog(r)),Error("Failed to compile fragment shader.");return r}let f=/ERROR: [0-9]+:([0-9]+):/g;function m(e,t){let r=f.exec(t);if(null==r){console.log(`Couldn't parse line number in error: ${t}`),console.log(e);return}let n=+r[1],a=e.split("\n"),o=a.length.toString().length+2,s=a.map((e,t)=>i.util.rightPad((t+1).toString(),o)+e),l=0;for(let e=0;e<s.length;e++)l=Math.max(s[e].length,l);let u=s.slice(0,n-1),d=s.slice(n-1,n),c=s.slice(n);console.log(u.join("\n")),console.log(t.split("\n")[0]),console.log(`%c ${i.util.rightPad(d[0],l)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(c.join("\n"))}function x(e){return P(e,()=>e.createProgram(),"Unable to create WebGLProgram.")}function g(e,t){if(l(e,()=>e.linkProgram(t)),!(0,i.env)().get("ENGINE_COMPILE_ONLY")&&!1===e.getProgramParameter(t,e.LINK_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Failed to link vertex and fragment shaders.")}function b(e,t){if(l(e,()=>e.validateProgram(t)),!1===e.getProgramParameter(t,e.VALIDATE_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Shader program validation failed.")}function C(e,t){let r=P(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return l(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),l(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),r}function v(e,t){let r=P(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return l(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r)),l(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),r}function y(){return 2===(0,i.env)().getNumber("WEBGL_VERSION")?1:4}function I(e){return P(e,()=>e.createTexture(),"Unable to create WebGLTexture.")}function $(e,t){let r=(0,i.env)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e<=0||t<=0)throw Error(`Requested texture size [${e}x${t}] is invalid.`);if(e>r||t>r)throw Error(`Requested texture size [${e}x${t}] greater than WebGL maximum on this browser / GPU [${r}x${r}].`)}function R(e){return P(e,()=>e.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function w(e,t,r,n,a,i,o){let s=e.getAttribLocation(t,r);return -1!==s&&(l(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),l(e,()=>e.vertexAttribPointer(s,a,e.FLOAT,!1,i,o)),l(e,()=>e.enableVertexAttribArray(s)),!0)}function T(e,t,r){L(e,r),l(e,()=>e.activeTexture(e.TEXTURE0+r)),l(e,()=>e.bindTexture(e.TEXTURE_2D,t))}function k(e,t){L(e,t),l(e,()=>e.activeTexture(e.TEXTURE0+t)),l(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function S(e,t,r){return P(e,()=>e.getUniformLocation(t,r),'uniform "'+r+'" not present in program.')}function E(e,t,r){return e.getUniformLocation(t,r)}function N(e,t,r,n){l(e,()=>T(e,t,n)),l(e,()=>e.uniform1i(r,n))}function A(e){l(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),l(e,()=>e.viewport(0,0,e.canvas.width,e.canvas.height)),l(e,()=>e.scissor(0,0,e.canvas.width,e.canvas.height))}function _(e,t,r){l(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,r)),l(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function F(e,t){l(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),l(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function O(e){let t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw Error("Error binding framebuffer: "+D(e,t))}function D(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function P(e,t,r){let n=l(e,()=>t());if(null==n)throw Error(r);return n}function L(e,t){let r=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,n=t+e.TEXTURE0;if(n<e.TEXTURE0||n>r){let e=`[gl.TEXTURE0, gl.TEXTURE${r}]`;throw Error(`textureUnit must be in ${e}.`)}}function B(e,t=2){return i.util.sizeFromShape(e.slice(0,e.length-t))}function V(e){if(0===e.length)throw Error("Cannot get rows and columns of an empty shape array.");return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function W(e){let t=[1,1,1];return 0===e.length||1===e.length&&1===e[0]||(t=[B(e),...V(e)]),t}function M(e,t=!1){let r=(0,i.env)().getNumber("WEBGL_MAX_TEXTURE_SIZE"),n=(0,i.env)().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");n===1/0&&(0,i.env)().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(n=r/2),t&&(r*=2,n*=2,1===(e=e.map((t,r)=>r>=e.length-2?i.util.nearestLargerEven(e[r]):e[r])).length&&(e=[2,e[0]])),2!==e.length&&(e=i.util.squeezeShape(e).newShape);let a=i.util.sizeFromShape(e),o=null;e.length<=1&&a<=r?o=[1,a]:2===e.length&&e[0]<=r&&e[1]<=r?o=e:3===e.length&&e[0]*e[1]<=r&&e[2]<=r?o=[e[0]*e[1],e[2]]:3===e.length&&e[0]<=r&&e[1]*e[2]<=r?o=[e[0],e[1]*e[2]]:4===e.length&&e[0]*e[1]*e[2]<=r&&e[3]<=r?o=[e[0]*e[1]*e[2],e[3]]:4===e.length&&e[0]<=r&&e[1]*e[2]*e[3]<=r&&(o=[e[0],e[1]*e[2]*e[3]]);let s=null!=o&&Math.max(...o)>n&&Math.min(...o)<=(t?2:1)&&Math.min(...o)>0;if(null==o||s){if(t){let t=B(e),r=2,n=2;e.length&&([r,n]=V(e)),a=r/2*t*(n/2),o=i.util.sizeToSquarishShape(a).map(e=>2*e)}else o=i.util.sizeToSquarishShape(a)}return o}function G(e,t){if(e=e.slice(-2),t=t.slice(-2),i.util.arraysEqual(e,t)||!e.length||!t.length||0===e[0]||0===e[1]||0===t[0]||0===t[1])return!0;if(e.length!==t.length){let r=e[e.length-1],n=t[t.length-1];if(r===n||r%2==0&&n%2==0&&(1===e[0]||1===t[0]))return!0}return e[1]===t[1]&&e[0]%2==0&&t[0]%2==0}function U(e){if(null==n){let t=(0,o.jl)(e);n=t.getParameter(t.MAX_TEXTURE_SIZE)}return n}function z(){n=null}function X(){a=null}function H(e){if(null==a){let t=(0,o.jl)(e);a=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,a)}function K(e){if(0===e)return 0;let t=(0,o.jl)(e);return j(t,"EXT_disjoint_timer_query_webgl2")&&2===e?2:j(t,"EXT_disjoint_timer_query")?1:0}function j(e,t){return null!=e.getExtension(t)}function q(e){try{let t=(0,o.jl)(e);if(null!=t)return!0}catch(e){console.log("Error when getting WebGL context: ",e)}return!1}function Y(e){if(0===e)return!1;let t=(0,o.jl)(e);if(1===e){if(!j(t,"OES_texture_float"))return!1}else if(!j(t,"EXT_color_buffer_float"))return!1;return Z(t)}function Q(e){if(0===e)return!1;let t=(0,o.jl)(e);if(1===e){if(!j(t,"OES_texture_float")||!j(t,"WEBGL_color_buffer_float"))return!1}else{if(j(t,"EXT_color_buffer_float"))return Z(t);let e="EXT_color_buffer_half_float";if(j(t,e)){let r=t.getExtension(e);return function(e,t){let r=(0,s.Sq)(e,t),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,r.internalFormatHalfFloat,1,1,0,r.textureFormatFloat,r.textureTypeHalfFloat,null);let a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(a),i}(t,r)}return!1}return Z(t)}function Z(e){let t=(0,s.Sq)(e),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(n),a}function J(e){return 2===e&&null!=(0,o.jl)(e).fenceSync}function ee(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&i.util.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}}}]);