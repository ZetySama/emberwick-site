#!/usr/bin/env bash
# Re-encodes the mascot GIFs in /Gifs into web video (MP4 + WebM) and a poster frame.
# Requires ffmpeg on PATH. Originals are never modified. Usage: bash scripts/encode-mascots.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/media/mascots
mkdir -p "$OUT"
VF="fps=15,hqdn3d=4:3:6:5,scale=448:252:flags=lanczos,format=yuv420p"

for name in hero-greeting sleeping-dice; do
  src="Gifs/$name.gif"
  ffmpeg -y -i "$src" -an -vf "$VF" -c:v libx264 -profile:v main -crf 28 -preset veryslow -movflags +faststart "$OUT/$name.mp4"
  ffmpeg -y -i "$src" -an -vf "$VF" -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 "$OUT/$name.webm"
  ffmpeg -y -i "$src" -vf "scale=448:252:flags=lanczos" -vframes 1 -c:v libwebp -quality 72 "$OUT/$name-poster.webp"
done
