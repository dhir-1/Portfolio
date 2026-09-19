import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_dark_mode;

  // Lightweight pseudo-random hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Fast smooth bilinear value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // High-performance 2-octave FBM (6x faster than 4-octave nested FBM)
  float fbm(vec2 p) {
    return 0.65 * noise(p) + 0.35 * noise(p * 2.0 + vec2(10.0));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    
    vec2 p = uv * aspect;
    vec2 m = u_mouse * aspect;
    
    vec2 motion1 = p + vec2(u_time * 0.015, u_time * 0.008);
    vec2 motion2 = p - vec2(u_time * 0.012, -u_time * 0.016);
    
    // Fast domain warping
    float n1 = fbm(motion1 * 1.2);
    float n2 = fbm(motion2 * 1.3 + n1 * 0.25);
    
    float dist = distance(p, m);
    float glow_radius = 0.52;
    float glow_strength = smoothstep(glow_radius, 0.0, dist + n2 * 0.05);
    
    vec3 final_color;
    
    if (u_dark_mode > 0.5) {
      // Dark Mode: Muted ink-black base with vibrant electric blue interactive aura
      vec3 bg_color = vec3(0.039, 0.039, 0.058);     // #0A0A0F
      vec3 glow_color = vec3(0.0, 0.45, 0.95);       // Electric blue highlight
      vec3 accent_color = vec3(0.08, 0.05, 0.18);     // Indigo ambient fold
      
      vec3 ambient = mix(bg_color, accent_color, n1 * 0.35);
      final_color = mix(ambient, glow_color, glow_strength * 0.35);
      
      float core = smoothstep(0.08, 0.0, dist);
      final_color += vec3(0.25, 0.65, 1.0) * core * 0.22;
    } else {
      // Light Mode: Editorial studio cream paper with airy light-blue tracking trail
      vec3 bg_color = vec3(0.96, 0.956, 0.941);      // #F5F4F0
      vec3 glow_color = vec3(0.75, 0.85, 0.93);      // Soft ice-blue trail
      vec3 accent_color = vec3(0.93, 0.91, 0.89);    // Structural shadow fold
      
      vec3 ambient = mix(bg_color, accent_color, n2 * 0.25);
      final_color = mix(ambient, glow_color, glow_strength * 0.3);
      
      float core = smoothstep(0.1, 0.0, dist);
      final_color = mix(final_color, vec3(1.0), core * 0.12);
    }
    
    // Fast subtle film grain
    float grain_val = (hash(uv + fract(u_time * 0.5)) - 0.5) * 0.014;
    final_color += grain_val;
    
    gl_FragColor = vec4(final_color, 1.0);
  }
`;

export function BackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Request low-power, fast WebGL context
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.warn("WebGL not supported.");
      return;
    }

    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error("Shader error:", glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uDarkModeLoc = gl.getUniformLocation(program, "u_dark_mode");

    let currentX = 0.5, currentY = 0.5;
    let targetX = 0.5, targetY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = 1.0 - e.clientY / window.innerHeight;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX / window.innerWidth;
        targetY = 1.0 - e.touches[0].clientY / window.innerHeight;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // High performance resolution: scale down canvas buffer and let GPU upscale with hardware interpolation
    const resizeCanvas = () => {
      // 0.65 scale cuts rendered pixels by ~58% with virtually zero perceptible visual difference for ambient glows
      const scale = 0.65;
      const w = Math.max(320, Math.floor(window.innerWidth * scale));
      const h = Math.max(240, Math.floor(window.innerHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    let animationId: number;
    const startTime = performance.now();
    let lastRenderTime = 0;
    const frameInterval = 1000 / 60; // Cap at 60 FPS (prevents 120Hz/240Hz screen thrashing)

    const render = (now: number) => {
      animationId = requestAnimationFrame(render);

      // Pause rendering if tab is hidden
      if (document.hidden) return;

      const elapsed = now - lastRenderTime;
      if (elapsed < frameInterval) return;
      lastRenderTime = now - (elapsed % frameInterval);

      const time = (now - startTime) * 0.001;

      // Smooth inertia interpolation tracking
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const isDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, time);
      gl.uniform2f(uMouseLoc, currentX, currentY);
      gl.uniform1f(uDarkModeLoc, isDark);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-screen h-screen overflow-hidden"
      style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          imageRendering: "auto",
        }}
      />
    </div>
  );
}
