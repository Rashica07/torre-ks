# MAGFA GROUP — Cinematic Portfolio Site

A premium, single-page marketing site with a scroll-scrubbed canvas hero.

## Frame Extraction (Required for Hero)

The hero uses a scroll-scrubbed frame sequence — not a `<video>` tag. You must extract frames from your source video.

### Step 1 — Place source video

```bash
mkdir -p input public/frames
# Copy your source video to:
# input/source.mp4
```

### Step 2 — Extract frames (ffmpeg required)

```bash
ffmpeg -i input/source.mp4 \
  -vf "fps=24,scale='min(1920,iw)':'-2':flags=lanczos" \
  -q:v 3 public/frames/frame_%04d.jpg
```

### Step 3 — Count frames & update constant

```bash
ls public/frames | wc -l
# Take that number and update:
# src/lib/constants.ts → FRAME_COUNT
```

### Optional — Convert to WebP (~40% smaller)

```bash
for f in public/frames/*.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp" && rm "$f"
done
# Then update FRAME_EXT = "webp" in src/lib/constants.ts
```

> If you don't have ffmpeg, a Node.js/WASM alternative using `@ffmpeg/ffmpeg` can be used — ask for the script.

## Dev

```bash
npm run dev
```

## Build

```bash
npm run build
```
