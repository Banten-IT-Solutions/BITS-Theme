/* BITS sidebar icons: decorate menu-bits links + brand + mobile toggle
   Ikon menu = inline SVG 24x24 stroke currentColor (gaya Lucide), warisi warna tema */
(function(){
  var ICONS = {
    'logout': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    'refresh': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    'save': '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    'package': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    'chart': '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
    'image': '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    'list': '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    'container': '<path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/>',
    'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'eraser': '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
    'calendar': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
    'wand': '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
    'rocket': '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    'clipboard': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    'cpu': '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/>',
    'gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'wifi': '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>',
    'activity': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    'traffic': '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
    'shuffle': '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>',
    'repeat': '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    'list-ordered': '<line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
    'bulb': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    'fan': '<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/>',
    'key': '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
    'bot': '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
    'route': '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    'router': '<rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6.01 18H6"/><path d="M10.01 18H10"/><path d="M15 10v4"/><path d="M17.84 7.17a4 4 0 0 0-5.66 0"/><path d="M20.66 4.34a8 8 0 0 0-11.31 0"/>',
    'pencil': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    'stethoscope': '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'hard-drive': '<line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/>',
    'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'monitor': '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    'terminal': '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    'palette': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'network': '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    'satellite': '<path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/>',
    'sliders': '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    'smartphone': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    'shield-half': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 22V2"/>',
    'folder': '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    'ban': '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    'grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    'cog': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'file': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>',
    'files': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'flask': '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
    'book': '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    'layers': '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    'code': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    'radio': '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    'plug': '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
    'share': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
  };
  var SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  function svg(name){ return SVG_OPEN + (ICONS[name] || ICONS.file) + '</svg>'; }

  function iconFor(text, href){
    var t = ' ' + String(text || '').toLowerCase() + ' ';
    var h = ' ' + String(href || '').toLowerCase().replace(/admin|luci|cgi-bin|[:\/?.=_-]+/g, ' ') + ' ';
    function any(s){ return t.indexOf(s) >= 0 || h.indexOf(s) >= 0; }
    function word(s){ return t.indexOf(' ' + s + ' ') >= 0 || h.indexOf(' ' + s + ' ') >= 0; }
    if (any('logout') || any('log out') || any('keluar')) return 'logout';
    if (any('hilink')) return 'smartphone';
    if (any('bitsxl') || word('xl')) return 'shield-half';
    if (any('file manager') || any('filemanager')) return 'files';
    if (any('reboot') || any('mulai ulang')) return 'refresh';
    if (any('backup') || any('cadangan') || any('flash') || any('firmware')) return 'save';
    if (any('package') || any('paket') || any('software') || any('opkg')) return 'package';
    if (any('docker') || any('kontainer')) {
      if (word('config') || word('configuration')) return 'wrench';
      if (word('overview')) return 'chart';
      if (word('containers')) return 'package';
      if (word('images')) return 'image';
      if (word('networks')) return 'globe';
      if (word('volumes')) return 'database';
      if (word('events')) return 'list';
      return 'container';
    }
    if (any('overview') || any('beranda') || any('ikhtisar') || word('home')) return 'home';
    if (any('about') || any('tentang')) return 'info';
    if (any('cleanup') || any('bersih')) return 'eraser';
    if (any('scheduled') || any('tasks')) return 'calendar';
    if (any('wizard') || any('generator')) return 'wand';
    if (any('startup') || any('boot')) return 'rocket';
    if (any('process') || any('proses')) return 'clipboard';
    if (any('kernel') || any('dmesg')) return 'cpu';
    if (t.trim() === 'status' && h.indexOf('bandix') >= 0) return 'trending-up';
    if (any('syslog') || any('log') || any('logging')) return 'file-text';
    if (word('load')) return 'gauge';
    if (any('bandwidth')) return 'trending-up';
    if (any('connection')) return 'link';
    if (any('wireless') || any('wifi') || any('nirkabel')) return 'wifi';
    if (any('realtime') || any('real time') || any('monitor') || any('grafik') || any('graph')) return 'activity';
    if (any('traffic')) return 'traffic';
    if (any('forward')) return 'shuffle';
    if (word('nat')) return 'repeat';
    if (any('ipset') || any('ip set')) return 'list-ordered';
    if (any('led')) return 'bulb';
    if (any('fan') || any('kipas')) return 'fan';
    if (any('global')) return 'globe';
    if (any('profile')) return 'layers';
    if (any('editor')) return 'code';
    if (any('app config')) return 'book';
    if (any('mixin')) return 'flask';
    if (any('proxy')) return 'shuffle';
    if (any('setting') || word('config')) return 'wrench';
    if (any('custom')) return 'pencil';
    if (any('firewall')) return 'flame';
    if (any('channel')) return 'radio';
    if (any('interface') || any('antarmuka')) return 'plug';
    if (any('switch') || any('vlan')) return 'share';
    if (any('password') || any('sandi')) return 'key';
    if (any('bot')) return 'bot';
    if (any('rout') || any('rute')) return 'route';
    if (any('dhcp') || word('dns')) return 'router';
    if (any('hostname') || any('nama host')) return 'pencil';
    if (any('diagnos') || any('ping') || any('traceroute') || any('nslookup')) return 'stethoscope';
    if (any('capture')) return 'search';
    if (any('mount')) return 'hard-drive';
    if (any('repo')) return 'lock';
    if (any('ssh-key') || any('sshkey') || (word('ssh') && any('key'))) return 'key';
    if (any('ssh access') || any('dropbear')) return 'monitor';
    if (word('ssh')) return 'key';
    if (any('http')) return 'lock';
    if (any('terminal') || any('console') || any('shell') || any('perintah') || any('ttyd')) return 'terminal';
    if (any('language') || any('bahasa') || any('theme') || any('tema')) return 'palette';
    if (any('time') || any('waktu') || any('ntp') || any('zona')) return 'clock';
    if (word('user') || any('pengguna')) return 'users';
    if (any('administration') || word('admin')) return 'user';
    if (any('tailscale')) return 'network';
    if (any('bandix')) return 'satellite';
    if (t.trim() === 'system' && href && href !== '#') return 'sliders';
    if (any('modem') || any('mobile') || any('seluler') || any('sms') || any('lte') || any('qmi') || any('mbim')) return 'smartphone';
    if (any('docker') || any('container') || any('kontainer')) return 'container';
    if (any('torrent') || any('aria') || any('transmission') || any('unduh') || any('download')) return 'download';
    if (any('wireguard') || any('openvpn') || word('vpn') || any('zerotier')) return 'shield';
    if (any('tunnel') || any('momo') || any('clash') || any('passwall') || any('nikki') || any('v2ray') || any('xray')) return 'shield-half';
    if (any('samba') || any('nfs') || any('ftp') || any('dlna') || any('nas') || any('storage') || any('penyimpanan') || any('disk')) return 'folder';
    if (any('adblock')) return 'ban';
    if (any('ddns') || any('dinamis')) return 'globe';
    if (any('network') || any('jaringan')) return 'globe';
    if (any('service') || any('layanan')) return 'grid';
    if (any('system') || any('sistem')) return 'cog';
    if (any('statistic') || any('statistik') || any('vnstat')) return 'chart';
    if (any('status')) return 'chart';
    return 'file';
  }
  /* map ikon device/port LuCI (img svg) -> nama ikon SVG */
  function devIcon(name){
    name = String(name || '').toLowerCase();
    if (name.indexOf('port_up') >= 0) return 'check-circle';
    if (name.indexOf('port_down') >= 0) return 'x-circle';
    if (/modem|wwan|usb|lte|3g|4g|5g|dial|tty/.test(name)) return 'smartphone';
    if (/wifi|wireless|wlan|radio/.test(name)) return 'wifi';
    if (/bridge/.test(name)) return 'network';
    if (/tunnel|vpn|ipsec|gre/.test(name)) return 'shield';
    if (/dsl|adsl|vdsl/.test(name)) return 'phone';
    if (/loopback|^lo$/.test(name)) return 'repeat';
    if (/relay/.test(name)) return 'refresh';
    if (/ethernet|lan|wan|port|switch/.test(name)) return 'globe';
    return null;
  }
  function decorateDevIcons(){
    var imgs = document.querySelectorAll('#maincontent img[src*="icons/"]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.dataset.bitsDone) continue;
      var src = img.getAttribute('src') || '';
      var m = src.match(/\/([a-z0-9_\-]+)\.svg(?:[?#]|$)/i);
      if (!m) continue;
      var name = devIcon(m[1]);
      if (!name) continue;
      var span = document.createElement('span');
      span.className = 'bits-devico';
      span.dataset.ico = m[1].replace(/[_0-9]+$/, '');
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = svg(name);
      var t = img.getAttribute('title');
      if (t) span.title = t;
      if (/_disabled|_down/.test(m[1])) span.style.opacity = '0.45';
      img.replaceWith(span);
    }
  }
  /* status port (Connected/no link/kecepatan) -> ikon SVG + teks */
  function statusIcon(txt, low){
    var name = /no link|down/.test(low) ? 'x-circle' : (/connected|link/.test(low) ? 'check-circle' : (/\d/.test(txt) ? 'zap' : 'globe'));
    var s = document.createElement('span');
    s.className = 'bits-status-ico bits-st-' + name;
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = svg(name);
    return s;
  }
  function decorateStatus(){
    var bodies = document.querySelectorAll('.ifacebox .ifacebox-body');
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      var dev = body.firstElementChild;
      if (!dev || !dev.classList.contains('bits-devico')) continue;
      var br = dev.nextElementSibling;
      if (!br || br.tagName !== 'BR') continue;
      var node = br.nextSibling;
      if (!node) continue;
      if (node.nodeType === 1 && node.dataset.bitsSe) continue;
      var raw = (node.nodeType === 1 ? node.textContent : node.nodeValue) || '';
      var txt = raw.replace(/[\s\u202f\u00a0]+/g, ' ').trim();
      if (!txt) continue;
      txt = txt.charAt(0).toUpperCase() + txt.slice(1);
      var low = txt.toLowerCase();
      if (node.nodeType === 1) {
        var t = node.getAttribute('title');
        node.dataset.bitsSe = '1';
        node.textContent = '';
        node.appendChild(statusIcon(txt, low));
        node.appendChild(document.createTextNode(' ' + txt));
        if (t) node.setAttribute('title', t);
      } else {
        var s = document.createElement('span');
        s.className = 'bits-status';
        s.dataset.bitsSe = '1';
        s.appendChild(statusIcon(txt, low));
        s.appendChild(document.createTextNode(' ' + txt));
        node.replaceWith(s);
      }
    }
  }
  /* pisahkan ▲/▼ jadi dua span agar flex bisa dorong kiri-kanan */
  function decorateFlow(){
    var cs = document.querySelectorAll('.ifacebox .ifacebox-body .cbi-tooltip-container');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      if (c.dataset.bitsFlow) continue;
      var br = c.querySelector('br');
      if (!br) continue;
      var up = br.previousSibling, down = br.nextSibling;
      if (up && up.nodeType === 3 && (up.nodeValue || '').trim()) {
        var s1 = document.createElement('span');
        s1.className = 'bits-dir bits-up';
        s1.textContent = up.nodeValue.replace(/[\s\u202f\u00a0]+/g, ' ').trim();
        up.replaceWith(s1);
      }
      if (down && down.nodeType === 3 && (down.nodeValue || '').trim()) {
        var s2 = document.createElement('span');
        s2.className = 'bits-dir bits-down';
        s2.textContent = down.nodeValue.replace(/[\s\u202f\u00a0]+/g, ' ').trim();
        down.replaceWith(s2);
      }
      c.dataset.bitsFlow = '1';
    }
  }
  function ensureBrand(){
    var m=document.getElementById('mainmenu');
    if(!m||m.querySelector('.bits-brand')) return;
    var d=document.createElement('div');
    d.className='bits-brand';
    d.innerHTML='<a href="#" onclick="return false"><strong>BITS</strong> <em>Networks</em></a>';
    m.insertBefore(d,m.firstChild);
  }
  function ensureToggle(){
    if(document.querySelector('.bits-menu-btn')||!document.body) return;
    var b=document.createElement('button');
    b.type='button'; b.className='bits-menu-btn'; b.textContent='☰'; b.title='Menu';
    b.setAttribute('aria-label','Buka/tutup menu');
    b.addEventListener('click',function(){
      var open=document.body.classList.toggle('bits-side-open');
      var mask=document.querySelector('.darkMask');
      if(mask){ mask.style.visibility=open?'visible':''; mask.style.opacity=open?'1':''; }
    });
    document.body.appendChild(b);
    var mask=document.querySelector('.darkMask');
    if(mask&&!mask.dataset.bits){ mask.dataset.bits='1'; mask.addEventListener('click',function(){
      document.body.classList.remove('bits-side-open');
      mask.style.visibility=''; mask.style.opacity='';
    });}
  }

  // BITS: judul halaman (h2[name=content] / .bandix-header) di atas tab (#tabmenu)
  function relayoutTitle(){
    var tc=document.querySelector('#maincontent > .container');
    if(!tc) return;
    var tabmenu=tc.querySelector('#tabmenu');
    var view=tc.querySelector('#view');
    if(!tabmenu||!view) return;
    var tabs=tabmenu.querySelector('ul.tabs');
    var title=(view.querySelector('h2[name="content"]')||view.querySelector('.bandix-header')||view.querySelector('h1.bandix-title'))||tc.querySelector('[data-bits-title="1"]');
    if(!title) return;
    var old=tc.querySelectorAll('[data-bits-title="1"]');
    for(var i=0;i<old.length;i++){ if(old[i]!==title && old[i].parentNode) old[i].parentNode.removeChild(old[i]); }
    if(!tabs) return;
    if(title.parentElement===tc && title.nextElementSibling===tabmenu && title.getAttribute('data-bits-title')) return;
    title.setAttribute('data-bits-title','1');
    tc.insertBefore(title,tabmenu);
  }
  // BITS: bottom appbar — 5 section nav + sheet submenu (dari pohon #mainmenu)
  function ensureAppbar(){
    if(document.querySelector('.bits-appbar')||!document.body) return;
    if(document.body.classList.contains('node-main-login')) return;
    var m=document.getElementById('mainmenu');
    if(!m) return;
    var lis=m.querySelectorAll('.nav > li');
    var sections=[];
    for(var i=0;i<lis.length;i++){
      var li=lis[i];
      var link=li.querySelector('a');
      if(!link) continue;
      if(/logout/i.test(link.getAttribute('href')||'')) continue;
      var clone=link.cloneNode(true);
      var cico=clone.querySelector('.bits-ico');
      if(cico) cico.remove();
      var icoEl=link.querySelector('.bits-ico');
      var icon=icoEl?(icoEl.dataset.ico||'file'):'file';
      var label=(clone.textContent||'').replace(/\s+/g,' ').trim()||'Menu';
      sections.push({li:li,icon:icon,label:label});
    }
    if(!sections.length) return;

    var bar=document.createElement('nav');
    bar.className='bits-appbar';
    bar.setAttribute('aria-label','Navigasi utama');

    var backdrop=document.createElement('div');
    backdrop.className='bits-appbar-backdrop';

    var sheet=document.createElement('div');
    sheet.className='bits-appbar-sheet';
    sheet.setAttribute('aria-hidden','true');
    var head=document.createElement('div');
    head.className='bits-appbar-sheet-head';
    var title=document.createElement('span');
    title.className='bits-appbar-sheet-title';
    var close=document.createElement('button');
    close.type='button'; close.className='bits-appbar-sheet-close';
    close.setAttribute('aria-label','Tutup menu'); close.textContent='\u2715';
    head.appendChild(title); head.appendChild(close);
    var body=document.createElement('div');
    body.className='bits-appbar-sheet-body';
    sheet.appendChild(head); sheet.appendChild(body);

    function closeSheet(){
      sheet.classList.remove('open'); sheet.setAttribute('aria-hidden','true');
      backdrop.classList.remove('open');
    }
    function openSheet(section){
      title.textContent=section.label;
      body.innerHTML='';
      var sub=section.li.querySelector('ul');
      var links=sub?sub.querySelectorAll('li > a'):[];
      for(var j=0;j<links.length;j++){
        var sa=links[j];
        var sc=sa.cloneNode(true);
        var scico=sc.querySelector('.bits-ico');
        if(scico) scico.remove();
        var saico=sa.querySelector('.bits-ico');
        var sIcon=saico?(saico.dataset.ico||'file'):'file';
        var sLabel=(sc.textContent||'').replace(/\s+/g,' ').trim()||'Menu';
        var a=document.createElement('a');
        a.className='bits-app-item'; a.href=sa.getAttribute('href')||'#';
        if((sa.getAttribute('href')||'')===window.location.pathname) a.classList.add('active');
        var ispan=document.createElement('span');
        ispan.className='bits-ico'; ispan.setAttribute('aria-hidden','true'); ispan.innerHTML=svg(sIcon);
        var lspan=document.createElement('span');
        lspan.className='bits-app-item-label'; lspan.textContent=sLabel;
        a.appendChild(ispan); a.appendChild(lspan);
        body.appendChild(a);
      }
      sheet.classList.add('open'); sheet.setAttribute('aria-hidden','false');
      backdrop.classList.add('open');
    }

    var buttons=[];
    for(var k=0;k<sections.length;k++){
      (function(section){
        var btn=document.createElement('button');
        btn.type='button';
        var ispan=document.createElement('span');
        ispan.className='bits-appbar-ico'; ispan.setAttribute('aria-hidden','true'); ispan.innerHTML=svg(section.icon);
        var lspan=document.createElement('span');
        lspan.className='bits-appbar-label'; lspan.textContent=section.label;
        btn.appendChild(ispan); btn.appendChild(lspan);
        btn.addEventListener('click',function(){ openSheet(section); });
        bar.appendChild(btn);
        buttons.push({btn:btn,li:section.li});
      })(sections[k]);
    }

    close.addEventListener('click',closeSheet);
    backdrop.addEventListener('click',closeSheet);
    document.body.appendChild(backdrop);
    document.body.appendChild(sheet);
    document.body.appendChild(bar);

    window.__syncAppbarActive=function(){
      var cur=window.location.pathname;
      for(var q=0;q<buttons.length;q++){
        var subs=buttons[q].li.querySelectorAll('li > a');
        var on=false;
        for(var r=0;r<subs.length;r++){
          if((subs[r].getAttribute('href')||'')===cur) on=true;
        }
        if(!on) on=buttons[q].li.classList.contains('active');
        buttons[q].btn.classList.toggle('active',on);
      }
    };
    window.__syncAppbarActive();
  }
  function decorate(){
    ensureBrand(); ensureToggle(); decorateDevIcons(); decorateStatus(); decorateFlow(); relayoutTitle();
    var links=document.querySelectorAll('#mainmenu a');
    for(var i=0;i<links.length;i++){
      var a=links[i];
      if(a.closest&&a.closest('.bits-brand')) continue;
      if(a.querySelector('.bits-ico')) continue;
      var txt=(a.textContent||'').trim();
      if(!txt) continue;
      var name=iconFor(txt,a.getAttribute('href')||'');
      var s=document.createElement('span');
      s.className='bits-ico'; s.setAttribute('aria-hidden','true');
      s.dataset.ico=name;
      s.innerHTML=svg(name);
      a.insertBefore(s,a.firstChild);
    }
    ensureAppbar();
    if(window.__syncAppbarActive){ try{window.__syncAppbarActive();}catch(e){} }
  }
  var tries=0;
  var iv=setInterval(function(){ try{decorate();}catch(e){} if(++tries>20) clearInterval(iv); },500);
  document.addEventListener('DOMContentLoaded',decorate);
  if(document.readyState!=='loading') decorate();
  if(window.MutationObserver){
    var mo=new MutationObserver(function(){ try{decorate();}catch(e){} });
    mo.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
