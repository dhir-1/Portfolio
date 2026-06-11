import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_dark_mode;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    
    vec2 p = uv * aspect;
    vec2 m = u_mouse * aspect;
    
    vec2 motion1 = p + vec2(u_time * 0.015, u_time * 0.008);
    vec2 motion2 = p - vec2(u_time * 0.012, -u_time * 0.018);
    
    float n1 = fbm(motion1 * 1.2 + fbm(motion2 * 1.5));
    float n2 = fbm(motion2 * 1.4 - n1);
    
    float dist = distance(p, m);
    
    float glow_radius = 0.5;
    float glow_strength = smoothstep(glow_radius, 0.0, dist + n2 * 0.06);
    
    vec3 final_color;
    
    if (u_dark_mode > 0.5) {
      // Dark Mode: Deep custom ink background with electric blue interactive aura
      vec3 bg_color = vec3(0.039, 0.039, 0.058);     // Muted ink-black base (#0A0A0F)
      vec3 glow_color = vec3(0.0, 0.45, 0.95);       // Striking electric blue highlight
      vec3 accent_color = vec3(0.08, 0.05, 0.18);     // Soft dark ambient indigo
      
      vec3 ambient = mix(bg_color, accent_color, n1 * 0.35);
      final_color = mix(ambient, glow_color, glow_strength * 0.35);
      
      float core = smoothstep(0.08, 0.0, dist);
      final_color += vec3(0.25, 0.65, 1.0) * core * 0.25;
    } else {
      // Light Mode: Studio minimalist cream paper base with an airy light-blue tracking trail
      vec3 bg_color = vec3(0.96, 0.956, 0.941);      // Editorial studio cream (#F5F4F0)
      vec3 glow_color = vec3(0.75, 0.85, 0.93);      // Soft, pristine ice-blue trail
      vec3 accent_color = vec3(0.93, 0.91, 0.89);    // Subtle structural shadow fold
      
      vec3 ambient = mix(bg_color, accent_color, n2 * 0.25);
      final_color = mix(ambient, glow_color, glow_strength * 0.3);
      
      float core = smoothstep(0.1, 0.0, dist);
      final_color = mix(final_color, vec3(1.0), core * 0.12);
    }
    
    // Smooth grain calculations
    float grain_val = hash(uv + u_time) * 0.009;
    if (u_dark_mode > 0.5) {
      final_color += grain_val * 0.3;
    } else {
      final_color -= grain_val * 0.2;
    }
    
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

    const gl = canvas.getContext("webgl");
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
      targetY = 1.0 - (e.clientY / window.innerHeight);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX / window.innerWidth;
        targetY = 1.0 - (e.touches[0].clientY / window.innerHeight);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    let animationId: number;
    const startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) * 0.001;

      // Inertia interpolation tracking
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      const isDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, time);
      gl.uniform2f(uMouseLoc, currentX, currentY);
      gl.uniform1f(uDarkModeLoc, isDark);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };
    render();

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
    <div className="fixed inset-0 pointer-events-none -z-10 w-screen h-screen overflow-hidden">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}