#!/usr/bin/env node
/**
 * Asset validation script for the Birthday Project.
 *
 * Dependency-free validator that scans the project's data layer (memories, songs, videos)
 * and verifies that all referenced assets exist under public/.
 *
 * Usage: node scripts/validate-assets.mjs
 * Exit code: 0 if all referenced assets exist, non-zero if any are missing.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')

/** Parse a JSON/ESM file manually to extract string paths (simple regex-based extraction). */
function extractPathsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const paths = new Set()

  // Match patterns like src: '/path/to/file' or audioSrc: '/music/file.mp3'
  const pathPattern = /(?:src|audioSrc|videoSrc|poster|coverPhoto):\s*['"`]([^'"`]+)['"`]/g
  let match
  while ((match = pathPattern.exec(content)) !== null) {
    paths.add(match[1])
  }

  return Array.from(paths)
}

/** Check if a file exists under public/. */
function assetExists(assetPath) {
  // Ensure the path starts with /
  const normalizedPath = assetPath.startsWith('/') ? assetPath : '/' + assetPath
  const fullPath = path.join(publicDir, normalizedPath)

  // Security: prevent directory traversal
  if (!fullPath.startsWith(publicDir)) {
    return false
  }

  return fs.existsSync(fullPath)
}

/** Main validation function. */
function validateAssets() {
  const dataFiles = [
    path.join(projectRoot, 'lib', 'memories.ts'),
    path.join(projectRoot, 'lib', 'songs.ts'),
    path.join(projectRoot, 'lib', 'videos.ts'),
    path.join(projectRoot, 'lib', 'love-letter.ts'),
  ]

  let allFound = true
  const missingAssets = []

  console.log('🔍 Validating project assets...\n')

  for (const dataFile of dataFiles) {
    if (!fs.existsSync(dataFile)) {
      console.log(`⚠️  Data file not found: ${dataFile}`)
      continue
    }

    const fileName = path.basename(dataFile)
    const paths = extractPathsFromFile(dataFile)

    if (paths.length === 0) {
      console.log(`✓ ${fileName} — no asset references to validate`)
      continue
    }

    console.log(`Checking ${fileName}:`)
    for (const assetPath of paths) {
      const exists = assetExists(assetPath)
      const status = exists ? '✓' : '✗'
      console.log(`  ${status} ${assetPath}`)

      if (!exists) {
        allFound = false
        missingAssets.push({
          file: fileName,
          path: assetPath,
        })
      }
    }
    console.log()
  }

  if (missingAssets.length > 0) {
    console.log(`\n❌ VALIDATION FAILED: ${missingAssets.length} missing asset(s):\n`)
    for (const { file, path: assetPath } of missingAssets) {
      console.log(`  - ${assetPath} (referenced by ${file})`)
    }
    console.log()
    return 1
  }

  console.log('✅ All referenced assets exist!\n')
  return 0
}

// Run validation and exit with appropriate code
process.exit(validateAssets())
