import React from 'react';

const KukaLogo = ({ className }: { className?: string }) => (
  <svg 
    version="1.1" 
    id="layer" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    x="0px" 
    y="0px"
    viewBox="0 0 652 652" 
    // FIXED: Removed the 'style' prop completely
    xmlSpace="preserve"
    className={className}
    aria-label="KUKA Logo"
  >
    <defs>
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="10.2248" y1="2615.5815" x2="558.2778" y2="2514.0061" gradientTransform="matrix(1 0 0 1 0 -2279.8899)">
            <stop offset="0" style={{ stopColor: '#FF6000' }}/>
            <stop offset="1" style={{ stopColor: '#FF5800' }}/>
        </linearGradient>
        <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="14.7417" y1="2639.9521" x2="562.7946" y2="2538.3767" gradientTransform="matrix(1 0 0 1 0 -2279.8899)">
            <stop offset="0" style={{ stopColor: '#FF6000' }}/>
            <stop offset="1" style={{ stopColor: '#FF5800' }}/>
        </linearGradient>
        <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="18.7358" y1="2661.5024" x2="566.7888" y2="2559.927" gradientTransform="matrix(1 0 0 1 0 -2279.8899)">
            <stop offset="0" style={{ stopColor: '#FF6000' }}/>
            <stop offset="1" style={{ stopColor: '#FF5800' }}/>
        </linearGradient>
        <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="24.5541" y1="2692.8955" x2="572.6071" y2="2591.3201" gradientTransform="matrix(1 0 0 1 0 -2279.8899)">
            <stop offset="0" style={{ stopColor: '#FF6000' }}/>
            <stop offset="1" style={{ stopColor: '#FF5800' }}/>
        </linearGradient>
        <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="12.0081" y1="335.4709" x2="58.6667" y2="326.8232" gradientTransform="matrix(1 0 0 -1 0 651.89)">
            <stop offset="0" style={{ stopColor: '#FF6000' }}/>
            <stop offset="1" style={{ stopColor: '#FF5800' }}/>
        </linearGradient>
        <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="320.3848" y1="335.4596" x2="367.0434" y2="326.8119" gradientTransform="matrix(1 0 0 -1 0 651.89)">
            <stop offset="0" style={{ stopColor: '#FF6000' }}/>
            <stop offset="1" style={{ stopColor: '#FF5800' }}/>
        </linearGradient>
    </defs>
    
    <g>
      <g>
        <g>
          <polygon fill="url(#SVGID_1_)" points="111.9,270.6 53.3,320.2 53.3,270.6 20.9,270.6 20.9,371.5 53.3,371.5 53.3,320.2 111.9,371.5 157.4,371.5 95.1,320.2 157.4,270.6"/>
          <path fill="url(#SVGID_2_)" d="M271.8,330.5c0,12.9-4.8,16.6-18,16.6h-32c-13.2,0-18-3.8-18-16.6v-59.8h-32.3v65.6c0,25.1,13.5,37,43.1,37 h46.2c29.7,0.1,43.2-11.8,43.2-37v-65.6h-32.3V330.5z"/>
          <polygon fill="url(#SVGID_3_)" points="329.2,270.6 329.2,371.5 361.6,371.5 361.6,320.2 361.6,270.6"/>
          <path fill="url(#SVGID_4_)" d="M557.5,270.6H529l-63.4,100.8l-62.1-51.2l62.2-49.6h-45.5l-58.7,49.6l58.7,51.3h45.4h0.1h36.9l10.7-17.5 h59.7l10.7,17.5h37L557.5,270.6z M524.5,333.9l18.8-32.1l18.8,32.1H524.5z"/>
        </g>
      </g>
    </g>
    <g>
      <g>
        <rect x="20.9" y="270.6" fill="url(#SVGID_5_)" width="32.4" height="100.9"/>
      </g>
    </g>
    <rect x="329.2" y="270.6" fill="url(#SVGID_6_)" width="32.4" height="100.9"/>
  </svg>
);

export default KukaLogo;