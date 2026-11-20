import { readFileSync, copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = join(__dirname, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const destPath = join(outDir, 'entry.png');

// 1. Validate file size (at most 1,048,576 bytes)
const stats = statSync(srcPath);
const sizeBytes = stats.size;
if (sizeBytes > 1048576) {
  throw new Error(`Gate failed: size ${sizeBytes} bytes exceeds maximum 1,048,576 bytes`);
}

const buffer = readFileSync(srcPath);

let format = '';
let width = 0;
let height = 0;

// Check PNG format and dimensions
const isPng = buffer.length >= 8 &&
  buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47 &&
  buffer[4] === 0x0D && buffer[5] === 0x0A && buffer[6] === 0x1A && buffer[7] === 0x0A;

// Check JPEG format
const isJpeg = buffer.length >= 3 &&
  buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;

if (isPng) {
  format = 'PNG';
  if (buffer.length < 24) {
    throw new Error('Gate failed: invalid PNG file (too short for IHDR)');
  }
  width = buffer.readUInt32BE(16);
  height = buffer.readUInt32BE(20);
} else if (isJpeg) {
  format = 'JPEG';
  let pos = 2;
  let foundSof = false;
  while (pos < buffer.length) {
    while (pos < buffer.length && buffer[pos] === 0xFF) {
      pos++;
    }
    if (pos >= buffer.length) break;
    const marker = buffer[pos++];
    // Standalone markers with no length field
    if (marker === 0xD8 || marker === 0xD9 || marker === 0x01 || (marker >= 0xD0 && marker <= 0xD9)) {
      continue;
    }
    if (pos + 2 > buffer.length) {
      throw new Error('Gate failed: truncated JPEG segment header');
    }
    const segLen = buffer.readUInt16BE(pos);
    if (segLen < 2) {
      throw new Error('Gate failed: invalid JPEG segment length');
    }
    const segStart = pos - 2;
    if (segStart + segLen > buffer.length) {
      throw new Error('Gate failed: JPEG segment runs past end of buffer');
    }

    if ((marker >= 0xC0 && marker <= 0xCF) && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      if (segStart + 9 > buffer.length) {
        throw new Error('Gate failed: truncated JPEG SOF segment');
      }
      height = buffer.readUInt16BE(segStart + 5);
      width = buffer.readUInt16BE(segStart + 7);
      foundSof = true;
      break;
    }
    pos += segLen;
  }
  if (!foundSof) {
    throw new Error('Gate failed: JPEG SOF marker not found');
  }
} else {
  throw new Error('Gate failed: unsupported image format (must be PNG or JPEG)');
}

// 2. Validate dimensions (at most 1024 x 1024 pixels)
if (width > 1024 || height > 1024) {
  throw new Error(`Gate failed: dimensions ${width}x${height} exceed maximum 1024x1024`);
}

// 3. Log gate results (one per gate result: format, size, dimensions)
console.log(`Format: ${format}`);
console.log(`Size: ${sizeBytes} bytes`);
console.log(`Dimensions: ${width}x${height}`);

// 4. Copy file byte-for-byte to output directory
mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, destPath);

// Final success line
console.log(`Successfully copied entry.png to ${destPath} (${width}x${height}, ${sizeBytes} bytes)`);

