import React from 'react';

const PinIcon = ({ className }: { className?: string }) => (
  <svg 
    version="1.0" 
    xmlns="http://www.w3.org/2000/svg"
    width="512.000000pt" 
    height="512.000000pt" 
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
      <path d="M2467 4150 c-222 -27 -425 -147 -552 -325 -101 -142 -147 -283 -148
      -455 -1 -137 18 -226 73 -346 77 -168 203 -296 365 -374 94 -45 204 -80 253
      -80 l22 0 0 -770 c0 -550 3 -776 11 -794 26 -55 112 -55 138 0 8 18 11 243 11
      792 l0 767 88 17 c62 12 116 32 192 70 89 44 119 66 196 143 100 98 150 178
      196 306 134 379 -47 807 -415 979 -125 59 -294 86 -430 70z m14 -413 c106 -71
      106 -203 0 -274 -97 -66 -241 15 -241 135 0 125 141 206 241 139z"/>
    </g>
  </svg>
);

const JourneyDivider = () => {
  return (
    // FIXED: Increased height to h-36, removed 'overflow-hidden', adjusted margins
    <div className="w-full hidden md:block h-36 relative mt-6 mb-10 max-w-7xl mx-auto">
      
      {/* --- LABELS & PINS --- */}
      
      {/* VN Group (Left) */}
      <div className="absolute left-4 bottom-1/2 translate-y-2 z-10 flex flex-col items-center gap-1">
        {/* Flag */}
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white bg-white">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <circle cx="32" cy="32" r="30" fill="#f42f4c"></circle>
                <path fill="#ffe62e" d="M32 39l9.9 7l-3.7-11.4l9.8-7.4H35.8L32 16l-3.7 11.2H16l9.8 7.4L22.1 46z"></path>
            </svg>
        </div>
        {/* Pin */}
        <PinIcon className="w-9 h-9 text-rose-500 fill-current" />
      </div>

      {/* DE Group (Right) */}
      <div className="absolute right-4 bottom-1/2 translate-y-2 z-10 flex flex-col items-center gap-1">
        {/* Flag */}
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white bg-white">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <path d="M31.9 2C18.8 2 7.7 10.4 3.6 22h56.6C56.1 10.4 45 2 31.9 2z" fill="#3e4347"></path>
                <path d="M31.9 62c13.1 0 24.2-8.3 28.3-20H3.6c4.1 11.7 15.2 20 28.3 20z" fill="#ffe62e"></path>
                <path d="M3.6 22c-1.1 3.1-1.7 6.5-1.7 10s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.6" fill="#ed4c5c"></path>
            </svg>
        </div>
        {/* Pin */}
        <PinIcon className="w-9 h-9 text-emerald-600 fill-current" />
      </div>

      {/* --- ANIMATION SVG --- */}
      <svg 
        viewBox="0 0 1200 120" 
        className="w-full h-full absolute inset-0 pointer-events-none" // pointer-events-none ensures clicks pass through if needed
        preserveAspectRatio="none"
      >
        {/* 1. The Flight Path */}
        <path
          id="flight-path"
          d="M 50,60 
             C 180,60 250,100 400,100 
             C 550,100 600,20 700,20 
             C 800,20 850,100 1000,100 
             C 1100,100 1130,60 1150,60"
          fill="none"
          stroke="#e5e7eb" 
          strokeWidth="2"
          strokeDasharray="8,8"
          strokeLinecap="round"
        />

        {/* 2. The Paper Plane Group */}
        <g>
           <g transform="scale(0.08) rotate(45)"> 
             <g transform="translate(-254, -254)">
                <polygon style={{fill:'#61C2AB'}} points="491.2,35 8.8,285.4 152.4,339 "></polygon>
                <path style={{fill:'#4BB19B'}} d="M155.2,342.2l47.6,137.2l68.4-99.2l-48.4-20.4l0,0L494,36.6L155.2,342.2L155.2,342.2z"></path>
                <path style={{fill:'#61C2AB'}} d="M423.6,441l77.2-408L228.4,359.4L423.6,441z M458,123.4c0.4-1.2,1.2-1.6,2.4-1.6 c1.2,0.4,1.6,1.2,1.6,2.4l-5.6,30.4c0,0.8-1.2,1.6-2,1.6H454c-1.2-0.4-1.6-1.2-1.6-2.4L458,123.4z M448.8,182.2 c1.2,0.4,1.6,1.2,1.6,2.4l-42.8,226.8c0,0.8-1.2,1.6-2,1.6h-0.4c-1.2-0.4-1.6-1.2-1.6-2.4l42.8-226.8 C446.8,182.6,447.6,182.2,448.8,182.2z"></path>
                <path d="M152.8,345.4c-0.4,0-0.8,0-1.6-0.4L2.4,289c-1.6-0.4-2.4-2-2.4-3.6s0.8-3.2,2-3.6L502,22.2c1.6-0.8,4-0.4,5.2,1.2 s0.8,4-0.8,5.2L155.2,344.2C154.8,345,154,345.4,152.8,345.4z M14,285l138,52L478,44.2L14,285z"></path>
                <path d="M201.6,487.4c-1.6,0-3.2-1.2-3.6-2.8l-48.8-142c-0.8-2,0.4-4.4,2.4-5.2c2-0.8,4.4,0.4,5.2,2.4l44,127.6L221.2,359 c0-0.4,0-0.4,0.4-0.8l0,0l0,0l0,0l0,0l0,0l0,0c0-0.4,0.4-0.8,0.8-1.2L501.6,23c1.2-1.6,3.2-2,4.8-1.2 c1.6,0.8,2.4,2.4,2.4,4.4l-79.2,418c-0.4,1.2-0.8,2.4-2,2.8s-2.4,0.8-3.6,0l-195.6-82L206,483.4C205.2,485.8,203.6,487,201.6,487.4 C202,487.4,201.6,487.4,201.6,487.4z M231.6,358.6L422,438.2l75.2-398L231.6,358.6z"></path>
                <path d="M201.6,487.4c-0.8,0-1.6-0.4-2.4-0.8c-2-1.2-2.4-3.6-1.2-5.6l52.4-79.2c1.2-2,3.6-2.4,5.6-1.2s2.4,3.6,1.2,5.6l-52.4,79.2 C204.4,486.6,202.8,487.4,201.6,487.4z"></path>
                <path d="M454,157.8c-0.4,0-0.4,0-0.8,0c-2-0.4-3.6-2.4-3.2-4.8l5.6-30.4c0.4-2,2.4-3.6,4.8-3.2c2,0.4,3.6,2.4,3.2,4.8l-5.6,30.4 C457.6,156.6,456,157.8,454,157.8z"></path>
                <path d="M405.6,414.6c-0.4,0-0.4,0-0.8,0c-2-0.4-3.6-2.4-3.2-4.8L444.4,183c0.4-2,2.4-3.6,4.8-3.2c2,0.4,3.6,2.4,3.2,4.8 l-42.8,226.8C409.2,413.4,407.6,414.6,405.6,414.6z"></path>
             </g>
           </g>

           {/* 3. Animation: Follow the path */}
           <animateMotion 
             dur="12s" 
             repeatCount="indefinite" 
             rotate="auto"
             calcMode="spline"
             keyTimes="0;1"
             keySplines="0.4 0 0.2 1" 
           >
             <mpath href="#flight-path" />
           </animateMotion>
        </g>
      </svg>
    </div>
  );
};

export default JourneyDivider;