import { readFileSync, copyFileSync, mkdirSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const baseDir = dirname(fileURLToPath(import.meta.url));
const imageSource = resolve(baseDir, 'entry.png');
const outputRoot = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const targetDestination = join(outputRoot, 'entry.png');

const fileInfo = statSync(imageSource);
const totalBytes = fileInfo.size;
if (totalBytes > 1048576) {
  throw new Error(`Gate rejected: file size ${totalBytes} bytes exceeds 1,048,576 byte limit`);
}

const fileBuffer = readFileSync(imageSource);

let detectedFormat = '';
let imageWidth = 0;
let imageHeight = 0;

const pngHeaderMatch = fileBuffer.length >= 8 &&
  fileBuffer[0] === 0x89 && fileBuffer[1] === 0x50 && fileBuffer[2] === 0x4E && fileBuffer[3] === 0x47 &&
  fileBuffer[4] === 0x0D && fileBuffer[5] === 0x0A && fileBuffer[6] === 0x1A && fileBuffer[7] === 0x0A;

const jpegHeaderMatch = fileBuffer.length >= 3 &&
  fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8 && fileBuffer[2] === 0xFF;

if (pngHeaderMatch) {
  detectedFormat = 'PNG';
  if (fileBuffer.length < 24) {
    throw new Error('Gate rejected: PNG file is too short to contain IHDR dimensions');
  }
  imageWidth = fileBuffer.readUInt32BE(16);
  imageHeight = fileBuffer.readUInt32BE(20);
} else if (jpegHeaderMatch) {
  detectedFormat = 'JPEG';
  // Validate JPEG start-of-frame (SOF) marker segments to extract dimensions
      let cursor = 2;
      let sofDiscovered = false;
      while (cursor < fileBuffer.length) {
        while (cursor < fileBuffer.length && fileBuffer[cursor] === 0xFF) {
          cursor++;
        }
        if (cursor >= fileBuffer.length) break;
        const currentMarker = fileBuffer[cursor++];
        if (currentMarker === 0xD8 || currentMarker === 0xD9 || currentMarker === 0x01 || (currentMarker >= 0xD0 && currentMarker <= 0xD9)) {
          continue;
        }
        if (cursor + 2 > fileBuffer.length) {
          throw new Error('Gate rejected: truncated JPEG marker header segment');
        }
        const segmentLength = fileBuffer.readUInt16BE(cursor);
        if (segmentLength < 2) {
          throw new Error('Gate rejected: invalid JPEG segment length');
        }
        const segmentStart = cursor - 2;
        if (segmentStart + segmentLength > fileBuffer.length) {
          throw new Error('Gate rejected: JPEG segment extends beyond buffer boundary');
        }
        if ((currentMarker >= 0xC0 && currentMarker <= 0xCF) && currentMarker !== 0xC4 && currentMarker !== 0xC8 && currentMarker !== 0xCC) {
          if (segmentStart + 9 > fileBuffer.length) {
            throw new Error('Gate rejected: truncated start-of-frame JPEG segment');
          }
          imageHeight = fileBuffer.readUInt16BE(segmentStart + 5);
          imageWidth = fileBuffer.readUInt16BE(segmentStart + 7);
          sofDiscovered = true;
          break;
        }
        cursor += segmentLength;
      }
      if (!sofDiscovered) {
        throw new Error('Gate rejected: missing start-of-frame marker in JPEG file');
      }
    } else {
      throw new Error('Gate rejected: unrecognized image format (must be PNG or JPEG)');
    }

    if (imageWidth > 1024 || imageHeight > 1024) {
      throw new Error(`Gate rejected: image dimensions ${imageWidth}x${imageHeight} exceed maximum 1024x1024`);
    }

    console.log(detectedFormat);
    console.log(totalBytes);
    console.log(`${imageWidth}x${imageHeight}`);

    mkdirSync(outputRoot, { recursive: true });
    copyFileSync(imageSource, targetDestination);

    console.log(`Successfully verified and copied entry.png to ${targetDestination} [format: ${detectedFormat}, dimensions: ${imageWidth}x${imageHeight}, size: ${totalBytes} bytes].`);


