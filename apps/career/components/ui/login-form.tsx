"use client";
import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { loginAction, signupAction } from "@/app/auth/actions";
import { initialAuthActionState, type AuthActionState } from "@/lib/auth/types";

// Vertex shader source code
const vertexSmokeySource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

// Fragment shader source code for the smokey background effect
const fragmentSmokeySource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord / iResolution;
    vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    float time = iTime * 0.5;

    // Normalize mouse input (0.0 - 1.0) and remap to -1.0 ~ 1.0
    vec2 mouse = iMouse / iResolution;
    vec2 rippleCenter = 2.0 * mouse - 1.0;

    vec2 distortion = centeredUV;
    // Apply distortion for a wavy, smokey effect
    for (float i = 1.0; i < 8.0; i++) {
        distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 3.1415);
        distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 3.1415);
    }

    // Create a glowing wave pattern
    float wave = abs(sin(distortion.x + distortion.y + time));
    float glow = smoothstep(0.9, 0.2, wave);

    fragColor = vec4(u_color * glow, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface SmokeyBackgroundProps {
  backdropBlurAmount?: string;
  color?: string;
  className?: string;
}

const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-2 text-xs font-medium text-[var(--destructive)]" role="alert">
      {message}
    </p>
  );
}

function FormMessage({ state }: { state: AuthActionState }) {
  if (!state.message) return null;

  const isSuccess = state.status === "success";

  return (
    <p
      className={`rounded-[4px] border px-3 py-2 text-xs font-medium ${
        isSuccess
          ? "border-green-600/20 bg-green-50 text-green-700"
          : "border-[var(--destructive)]/20 bg-white/70 text-[var(--destructive)]"
      }`}
      aria-live="polite"
    >
      {state.message}
    </p>
  );
}

export function SmokeyBackground({
  backdropBlurAmount = "xl",
  color = "#a84370", // BforC primary magenta color
  className = "",
}: SmokeyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSmokeySource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSmokeySource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uColorLocation = gl.getUniformLocation(program, "u_color");

    const startTime = Date.now();
    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColorLocation, r, g, b);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, currentTime);
      gl.uniform2f(
        iMouseLocation,
        isHovering ? mousePosition.x : width / 2,
        isHovering ? height - mousePosition.y : height / 2
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering, mousePosition, color]);

  const finalBlurClass = blurClassMap[backdropBlurAmount as BlurSize] || blurClassMap["xl"];

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className={`absolute inset-0 ${finalBlurClass}`}></div>
    </div>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialAuthActionState
  );

  return (
    <div className="w-full max-w-sm p-8 space-y-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_8px_40px_rgb(0,0,0,0.15)] relative z-10">
      <div className="text-center">
        <h2 className="text-4xl font-display font-light tracking-tight text-[var(--foreground)]">Welcome Back</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Sign in to continue</p>
      </div>

      <form action={formAction} className="space-y-6 mt-8">
        <FormMessage state={state} />

        {/* Email Input */}
        <div className="relative z-0 mt-6">
          <input
            type="email"
            id="floating_email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-[var(--foreground)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--primary)] peer transition-colors"
            placeholder=" "
            autoComplete="email"
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-[var(--muted-foreground)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <User className="inline-block mr-2 -mt-1 text-[var(--primary)]" size={16} />
            Email Address
          </label>
          <FieldError message={state.fieldErrors?.email} />
        </div>

        {/* Password Input */}
        <div className="relative z-0 mt-6">
          <input
            type="password"
            id="floating_password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-[var(--foreground)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--primary)] peer transition-colors"
            placeholder=" "
            autoComplete="current-password"
            required
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-[var(--muted-foreground)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <Lock className="inline-block mr-2 -mt-1 text-[var(--primary)]" size={16} />
            Password
          </label>
          <FieldError message={state.fieldErrors?.password} />
        </div>

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-xs text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors font-medium">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="group w-full flex items-center justify-center py-3.5 px-4 bg-[var(--accent-color)] hover:bg-[var(--accent-dark)] rounded-[4px] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-300 shadow-sm"
        >
          {pending ? "Signing In..." : "Sign In"}
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[var(--border)]"></div>
          <span className="flex-shrink mx-4 text-[var(--muted-foreground)] text-xs font-mono tracking-widest uppercase">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow border-t border-[var(--border)]"></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          disabled
          className="w-full flex items-center justify-center py-3 px-4 bg-white/60 rounded-[4px] text-[var(--muted-foreground)] font-medium border border-white focus:outline-none shadow-sm transition-all duration-300 cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.613 2.5 24 2.5C11.983 2.5 2.5 11.983 2.5 24s9.483 21.5 21.5 21.5S45.5 36.017 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12.5 24 12.5c3.059 0 5.842 1.154 7.961 3.039l5.839-5.841C34.553 4.806 29.613 2.5 24 2.5C16.318 2.5 9.642 6.723 6.306 14.691z"></path>
            <path fill="#4CAF50" d="M24 45.5c5.613 0 10.553-2.306 14.802-6.341l-5.839-5.841C30.842 35.846 27.059 38 24 38c-5.039 0-9.345-2.608-11.124-6.481l-6.571 4.819C9.642 41.277 16.318 45.5 24 45.5z"></path>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.839 5.841C44.196 35.123 45.5 29.837 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
          </svg>
          Google sign-in coming next
        </button>
      </form>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signupAction,
    initialAuthActionState
  );

  return (
    <div className="w-full max-w-sm p-8 space-y-8 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_8px_40px_rgb(0,0,0,0.15)] relative z-10">
      <div className="text-center">
        <h2 className="text-4xl font-display font-light tracking-tight text-[var(--foreground)]">Create Account</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Join us to make an impact</p>
      </div>

      <form action={formAction} className="space-y-6 mt-8">
        <FormMessage state={state} />

        {/* Name Input */}
        <div className="relative z-0 mt-6">
          <input
            type="text"
            id="floating_name"
            name="fullName"
            className="block py-2.5 px-0 w-full text-sm text-[var(--foreground)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--primary)] peer transition-colors"
            placeholder=" "
            autoComplete="name"
            required
          />
          <label
            htmlFor="floating_name"
            className="absolute text-sm text-[var(--muted-foreground)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <User className="inline-block mr-2 -mt-1 text-[var(--primary)]" size={16} />
            Full Name
          </label>
          <FieldError message={state.fieldErrors?.fullName} />
        </div>

        {/* Email Input */}
        <div className="relative z-0 mt-6">
          <input
            type="email"
            id="floating_email_signup"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-[var(--foreground)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--primary)] peer transition-colors"
            placeholder=" "
            autoComplete="email"
            required
          />
          <label
            htmlFor="floating_email_signup"
            className="absolute text-sm text-[var(--muted-foreground)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <User className="inline-block mr-2 -mt-1 text-[var(--primary)]" size={16} />
            Email Address
          </label>
          <FieldError message={state.fieldErrors?.email} />
        </div>

        {/* Password Input */}
        <div className="relative z-0 mt-6">
          <input
            type="password"
            id="floating_password_signup"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-[var(--foreground)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--primary)] peer transition-colors"
            placeholder=" "
            autoComplete="new-password"
            minLength={8}
            required
          />
          <label
            htmlFor="floating_password_signup"
            className="absolute text-sm text-[var(--muted-foreground)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <Lock className="inline-block mr-2 -mt-1 text-[var(--primary)]" size={16} />
            Password
          </label>
          <FieldError message={state.fieldErrors?.password} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-[var(--muted-foreground)]">I am signing up as</p>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-[4px] border border-white/80 bg-white/50 px-3 py-2 text-xs font-medium text-[var(--foreground)] transition-colors has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--blush)]">
              <input
                type="radio"
                name="role"
                value="seeker"
                defaultChecked
                className="accent-[var(--primary)]"
              />
              Job seeker
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-[4px] border border-white/80 bg-white/50 px-3 py-2 text-xs font-medium text-[var(--foreground)] transition-colors has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--blush)]">
              <input
                type="radio"
                name="role"
                value="employer"
                className="accent-[var(--primary)]"
              />
              Employer
            </label>
          </div>
          <FieldError message={state.fieldErrors?.role} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="group w-full flex items-center justify-center py-3.5 px-4 bg-[var(--accent-color)] hover:bg-[var(--accent-dark)] rounded-[4px] text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-300 shadow-sm mt-8"
        >
          {pending ? "Creating Account..." : "Sign Up"}
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[var(--border)]"></div>
          <span className="flex-shrink mx-4 text-[var(--muted-foreground)] text-xs font-mono tracking-widest uppercase">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow border-t border-[var(--border)]"></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          disabled
          className="w-full flex items-center justify-center py-3 px-4 bg-white/60 rounded-[4px] text-[var(--muted-foreground)] font-medium border border-white focus:outline-none shadow-sm transition-all duration-300 cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.613 2.5 24 2.5C11.983 2.5 2.5 11.983 2.5 24s9.483 21.5 21.5 21.5S45.5 36.017 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12.5 24 12.5c3.059 0 5.842 1.154 7.961 3.039l5.839-5.841C34.553 4.806 29.613 2.5 24 2.5C16.318 2.5 9.642 6.723 6.306 14.691z"></path>
            <path fill="#4CAF50" d="M24 45.5c5.613 0 10.553-2.306 14.802-6.341l-5.839-5.841C30.842 35.846 27.059 38 24 38c-5.039 0-9.345-2.608-11.124-6.481l-6.571 4.819C9.642 41.277 16.318 45.5 24 45.5z"></path>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.839 5.841C44.196 35.123 45.5 29.837 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
          </svg>
          Google sign-up coming next
        </button>
      </form>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
}
