"use client";

import React, { useState } from "react";

export default function YouTubePlayer({ videoId, title, className = "" }) {
  const [thumbnailError, setThumbnailError] = useState(false);

  if (!videoId) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-4xl mb-4">📹</div>
          <p className="text-gray-600">No video available for this lesson</p>
        </div>
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        title={title || "Video Lesson"}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ minHeight: "400px" }}
      />
    </div>
  );
}
