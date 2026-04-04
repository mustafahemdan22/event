const fs = require('fs');
const path = require('path');

// Mocking the data structure to extract the content
// In reality, I would parse the file, but here I can just use the content I read before.

const productDataPath = 'd:/anti/event-anti/convex/productData.ts';
const content = fs.readFileSync(productDataPath, 'utf8');

// Use regex to extract the premiumProductData object
// This is a bit fragile but since I have the file content I can try.
const match = content.match(/export const premiumProductData: Record<string, { nameEn: string, nameAr: string, descriptionEn: string, descriptionAr: string }\[]> = ({[\s\S]*?});/);

if (!match) {
    console.error("Could not find premiumProductData in productData.ts");
    process.exit(1);
}

// We need to evaluate this as JS. Since it's a constant object, it's mostly JSON-like.
// We'll replace the TS types and use a safer way if possible.
let dataStr = match[1];
// Simple evaluation (Caution: eval is dangerous, but in this controlled env it's a quick way to get the object)
const premiumProductData = eval(`(${dataStr})`);

const enJsonPath = 'd:/anti/event-anti/locales/en.json';
const arJsonPath = 'd:/anti/event-anti/locales/ar.json';

const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const arJson = JSON.parse(fs.readFileSync(arJsonPath, 'utf8'));

enJson.productData = {};
arJson.productData = {};

for (const cat in premiumProductData) {
    enJson.productData[cat] = premiumProductData[cat].map(p => ({
        name: p.nameEn,
        description: p.descriptionEn
    }));
    arJson.productData[cat] = premiumProductData[cat].map(p => ({
        name: p.nameAr,
        description: p.descriptionAr
    }));
}

fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
fs.writeFileSync(arJsonPath, JSON.stringify(arJson, null, 2), 'utf8');

console.log("Migration successful!");
