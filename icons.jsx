// icons.jsx — consistent stroke icon set. Exported to window.Icons.
const Ic = (paths, opts={}) => function Icon({ size=20, className='', stroke=2, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={opts.fill?'currentColor':'none'}
      stroke={opts.fill?'none':'currentColor'} strokeWidth={stroke} strokeLinecap="round"
      strokeLinejoin="round" className={className} {...rest}>
      {paths}
    </svg>
  );
};

const Icons = {
  home: Ic(<><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></>),
  book: Ic(<><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12"/></>),
  trophy: Ic(<><path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a4 4 0 0 0 4 4M17 6h3v1a4 4 0 0 1-4 4"/><path d="M12 13v4M8 21h8M9 21v-2h6v2"/></>),
  user: Ic(<><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></>),
  flame: Ic(<path d="M12 2c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.4-2 .8-2.6C9 9 8 8 8 6c2 .5 2.5 2 2.5 2S11 5 12 2z"/>, {fill:true}),
  target: Ic(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></>),
  check: Ic(<path d="M4 12.5 9 17.5 20 6.5"/>),
  checkCircle: Ic(<><circle cx="12" cy="12" r="9"/><path d="M8 12.5 11 15.5 16 9"/></>),
  x: Ic(<path d="M6 6l12 12M18 6 6 18"/>),
  xCircle: Ic(<><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></>),
  lock: Ic(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
  arrowRight: Ic(<path d="M5 12h14M13 6l6 6-6 6"/>),
  arrowLeft: Ic(<path d="M19 12H5M11 18l-6-6 6-6"/>),
  chevronRight: Ic(<path d="M9 6l6 6-6 6"/>),
  chevronDown: Ic(<path d="M6 9l6 6 6-6"/>),
  play: Ic(<path d="M7 5l12 7-12 7z"/>, {fill:true}),
  playCircle: Ic(<><circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></>),
  sparkles: Ic(<><path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z"/><path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></>),
  bolt: Ic(<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>),
  clock: Ic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  grid: Ic(<><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></>),
  doc: Ic(<><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 13h5M10 16h5"/></>),
  download: Ic(<><path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 20h14"/></>),
  volume: Ic(<><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6"/></>),
  globe: Ic(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z"/></>),
  settings: Ic(<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 7l2-2"/></>),
  logout: Ic(<><path d="M15 4h4v16h-4"/><path d="M10 12H3M6 8l-4 4 4 4"/></>),
  menu: Ic(<path d="M4 7h16M4 12h16M4 17h16"/>),
  star: Ic(<path d="M12 3l2.7 6 6.3.6-4.8 4.2 1.5 6.2L12 17l-5.7 3 1.5-6.2L3 9.6 9.3 9z"/>, {fill:true}),
  calendar: Ic(<><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></>),
  shield: Ic(<><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/></>),
  crown: Ic(<path d="M4 8l3.5 3L12 6l4.5 5L20 8l-1.5 10h-13z"/>),
  pencil: Ic(<><path d="M4 20h4L19 9a2.5 2.5 0 0 0-3.5-3.5L4 16.5z"/><path d="M13.5 7.5 16.5 10.5"/></>),
  list: Ic(<><path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></>),
  headphones: Ic(<><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="7" rx="1.5"/><rect x="17" y="13" width="4" height="7" rx="1.5"/></>),
  fire: Ic(<path d="M12 2c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.4-2 .8-2.6C9 9 8 8 8 6c2 .5 2.5 2 2.5 2S11 5 12 2z"/>, {fill:true}),
  message: Ic(<path d="M4 5h16v11H9l-5 4z"/>),
  refresh: Ic(<><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 20v-4h4"/></>),
  gift: Ic(<><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11"/><path d="M12 9C9 9 8 7.5 8 6a2 2 0 0 1 4 0c0 1.5-1 3 0 3zM12 9c3 0 4-1.5 4-3a2 2 0 0 0-4 0c0 1.5 1 3 0 3z"/></>),
  eye: Ic(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>),
  plus: Ic(<path d="M12 5v14M5 12h14"/>),
  minus: Ic(<path d="M5 12h14"/>),
  flag: Ic(<><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></>),
  brain: Ic(<><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 1 5 3 3 0 0 0 3 3V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-1 5 3 3 0 0 1-3 3V4z"/></>),
  award: Ic(<><circle cx="12" cy="9" r="5"/><path d="M9 13.5 7.5 22 12 19.5 16.5 22 15 13.5"/></>),
  layers: Ic(<><path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5M3 18l9 5 9-5" opacity=".5"/></>),
  send: Ic(<path d="M4 12 20 4l-6 16-3-7z"/>),
  mic: Ic(<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></>),
  micOff: Ic(<><path d="M3 3l18 18"/><path d="M9 9v3a3 3 0 0 0 4.6 2.5M15 12V6a3 3 0 0 0-5.6-1.5"/><path d="M5 11a7 7 0 0 0 1.6 4.5M19 11a7 7 0 0 1-1 3.5M12 18v3M9 21h6"/></>),
  pause: Ic(<><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></>, {fill:true}),
  rewind: Ic(<><path d="M11 6 4 12l7 6zM21 6l-7 6 7 6z"/></>, {fill:true}),
  edit: Ic(<><path d="M4 21h4L19 10a2.5 2.5 0 0 0-3.5-3.5L4 17z"/><path d="M14 7l3 3M14 21h7"/></>),
  speed: Ic(<><path d="M5 19a8 8 0 1 1 14 0"/><path d="M12 19l4-6"/></>),
};
window.Icons = Icons;
