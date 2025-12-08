import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

// Create a simple SVG with Qibla compass design
const svgContent = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="512" height="512" fill="#f97316"/>
  
  <!-- White circle border -->
  <circle cx="256" cy="256" r="200" fill="white"/>
  
  <!-- Orange inner circle -->
  <circle cx="256" cy="256" r="180" fill="#f97316"/>
  
  <!-- Compass needle (pointing north) -->
  <path d="M 256 76 L 276 256 L 256 216 L 236 256 Z" fill="white"/>
  
  <!-- Kaaba symbol -->
  <rect x="236" y="266" width="40" height="40" fill="white" rx="4"/>
  
  <!-- Arabic text "قبلة" (Qibla) -->
  <text x="256" y="360" font-family="Arial" font-size="48" font-weight="bold" fill="white" text-anchor="middle">قبلة</text>
</svg>
`;

// Generate 192x192 icon
sharp(Buffer.from(svgContent))
  .resize(192, 192)
  .png()
  .toFile('public/icon-192x192.png')
  .then(() => console.log('✅ Generated icon-192x192.png'))
  .catch(err => console.error('❌ Error generating 192x192:', err));

// Generate 512x512 icon
sharp(Buffer.from(svgContent))
  .resize(512, 512)
  .png()
  .toFile('public/icon-512x512.png')
  .then(() => console.log('✅ Generated icon-512x512.png'))
  .catch(err => console.error('❌ Error generating 512x512:', err));

// Generate maskable 192x192 (with padding for safe area)
const maskableSvg = `
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" fill="#f97316"/>
  <circle cx="96" cy="96" r="70" fill="white"/>
  <circle cx="96" cy="96" r="62" fill="#f97316"/>
  <path d="M 96 36 L 106 96 L 96 76 L 86 96 Z" fill="white"/>
  <rect x="86" y="101" width="20" height="20" fill="white" rx="2"/>
  <text x="96" y="140" font-family="Arial" font-size="20" font-weight="bold" fill="white" text-anchor="middle">قبلة</text>
</svg>
`;

sharp(Buffer.from(maskableSvg))
  .resize(192, 192)
  .png()
  .toFile('public/icon-192x192-maskable.png')
  .then(() => console.log('✅ Generated icon-192x192-maskable.png'))
  .catch(err => console.error('❌ Error generating maskable 192:', err));

// Generate maskable 512x512
const maskableSvg512 = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#f97316"/>
  <circle cx="256" cy="256" r="200" fill="white"/>
  <circle cx="256" cy="256" r="180" fill="#f97316"/>
  <path d="M 256 76 L 276 256 L 256 216 L 236 256 Z" fill="white"/>
  <rect x="236" y="266" width="40" height="40" fill="white" rx="4"/>
  <text x="256" y="360" font-family="Arial" font-size="48" font-weight="bold" fill="white" text-anchor="middle">قبلة</text>
</svg>
`;

sharp(Buffer.from(maskableSvg512))
  .resize(512, 512)
  .png()
  .toFile('public/icon-512x512-maskable.png')
  .then(() => console.log('✅ Generated icon-512x512-maskable.png'))
  .catch(err => console.error('❌ Error generating maskable 512:', err));
