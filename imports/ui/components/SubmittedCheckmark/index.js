import React from 'react';

export default () => (
  <svg width="35px" height="35px" viewBox="0 0 35 35">
    <defs>
      <circle id="path-1" cx="8.5" cy="8.5" r="7.5" />
      <filter
        x="-106.7%"
        y="-93.3%"
        width="313.3%"
        height="313.3%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
          type="matrix"
          in="shadowBlurOuter1"
        />
      </filter>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3">
        <stop stopColor="#2AE82B" offset="0%" />
        <stop stopColor="#09AE5E" offset="100%" />
      </linearGradient>
    </defs>
    <g id="Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Waitmode-Show" transform="translate(-329.000000, -625.000000)">
        <g id="baseline-check_circle-24px" transform="translate(338.000000, 632.000000)">
          <polygon id="Shape" points="0 0 16 0 16 16 0 16" />
          <g id="Oval">
            <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1" />
            <use fill="#f8fafc" fillRule="evenodd" xlinkHref="#path-1" />
          </g>
          <path
            d="M8.5,1 C4.36,1 1,4.36 1,8.5 C1,12.64 4.36,16 8.5,16 C12.64,16 16,12.64 16,8.5 C16,4.36 12.64,1 8.5,1 Z M7,12.25 L3.25,8.5 L4.3075,7.4425 L7,10.1275 L12.6925,4.435 L13.75,5.5 L7,12.25 Z"
            id="Shape"
            fill="url(#linearGradient-3)"
            fillRule="nonzero"
          />
        </g>
      </g>
    </g>
  </svg>
);
