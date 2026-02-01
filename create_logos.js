const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, 'assets', 'logos');
if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
}

// Helper to create simple text-based SVG logos
function createSvg(text, subtext = '') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <rect width="100%" height="100%" fill="none"/>
  <text x="50%" y="${subtext ? '45%' : '55%'}" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="black">${text}</text>
  ${subtext ? `<text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="black">${subtext}</text>` : ''}
</svg>`;
}

const logos = [
    { name: 'bi-group.svg', text: 'BI GROUP' },
    { name: 'bazis-a.svg', text: 'BAZIS-A' },
    { name: 'atamura.svg', text: 'ATAMURA', subtext: 'GROUP' },
    { name: 'buta-group.svg', text: 'buta', subtext: 'group' },
    { name: 'nis.svg', text: 'NIS' },
    { name: 'sheber.svg', text: 'SHEBER', subtext: 'GROUP' },
    { name: 'antikor.svg', text: 'ANTIKOR' },
    { name: 'kanfar.svg', text: 'KANFAR', subtext: 'BUILDING' },
    { name: 'art-kurylys.svg', text: 'ART-KURYLYS' },
    { name: 'kazsmu.svg', text: 'KazSMU' }
];

logos.forEach(logo => {
    fs.writeFileSync(path.join(logosDir, logo.name), createSvg(logo.text, logo.subtext));
    console.log(`Created ${logo.name}`);
});
