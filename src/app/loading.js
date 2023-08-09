import React from "react";

export default function Loading() {
  return (
    <div className="h-[80vh] w-screen flex items-center justify-center">
      <button className="btn">
        <span className="loading loading-spinner"></span>
        loading...
      </button>
    </div>
  );
}
