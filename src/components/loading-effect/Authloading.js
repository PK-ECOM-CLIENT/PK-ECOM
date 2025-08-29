import React from "react";
import "./authloading.css";

const AuthLoading = () => {
  return (
    <div className="authloading" role="status" aria-live="polite">
      <div className="authloading__center">
        <div className="authloading__wrap" aria-hidden="true">
          {/* blurred glow trail (reverse spin) */}
          <div className="authloading__ring authloading__ring--glow" />
          {/* primary segmented arc (forward spin) */}
          <div className="authloading__ring authloading__ring--primary" />
          {/* subtle ticks (slow spin) */}
          <div className="authloading__ring authloading__ring--ticks" />
        </div>

        <div className="authloading__text">Signing you in…</div>
      </div>
    </div>
  );
};

export default AuthLoading;
