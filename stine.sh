#!/bin/bash
FILE="stine.css"

CSS_LINES=(
".container { display: flex; align-items: center; justify-content: center; }"
".header { background-color: #1a1a2e; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }"
".btn { border-radius: 8px; cursor: pointer; transition: all 0.3s ease; }"
".btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }"
"body { margin: 0; font-family: 'Segoe UI', sans-serif; background: #f5f5f5; }"
".card { border-radius: 12px; padding: 24px; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }"
".nav-link { text-decoration: none; color: #333; font-weight: 500; }"
".nav-link:hover { color: #0077ff; }"
".grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }"
".text-muted { color: #6c757d; font-size: 0.875rem; }"
".badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; }"
".overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); }"
"h1, h2, h3 { margin: 0 0 16px; line-height: 1.3; }"
"a { color: inherit; text-decoration: none; }"
".input { width: 100%; padding: 10px 14px; border: 1px solid #ddd; border-radius: 6px; outline: none; }"
".input:focus { border-color: #0077ff; box-shadow: 0 0 0 3px rgba(0,119,255,0.15); }"
".flex { display: flex; gap: 12px; }"
".hidden { display: none !important; }"
".sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }"
".w-full { width: 100%; }"
".rounded { border-radius: 8px; }"
".shadow { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }"
".p-4 { padding: 1rem; }"
".m-auto { margin: auto; }"
".text-center { text-align: center; }"
".font-bold { font-weight: 700; }"
".uppercase { text-transform: uppercase; letter-spacing: 0.05em; }"
".transition { transition: all 0.2s ease-in-out; }"
".relative { position: relative; }"
".absolute { position: absolute; }"
"@media (max-width: 768px) { .container { flex-direction: column; } }"
":root { --primary: #0077ff; --secondary: #6c757d; --radius: 8px; }"
".divider { border: none; border-top: 1px solid #eee; margin: 16px 0; }"
".avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }"
".truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }"
".sidebar { width: 260px; min-height: 100vh; background: #1e1e2e; padding: 24px; }"
".main { flex: 1; padding: 32px; }"
".tag { background: #eef2ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 12px; }"
".progress { height: 6px; border-radius: 3px; background: #e5e7eb; overflow: hidden; }"
".progress-bar { height: 100%; background: #0077ff; transition: width 0.4s ease; }"
)

# Create the file with a comment header
echo "/* Generated CSS - $(date) */" > "$FILE"
echo "" >> "$FILE"

echo "▶ Writing to $FILE — Press Ctrl+C to stop"
echo ""

line_count=0

while true; do
  # Pick a random line
  LINE="${CSS_LINES[$RANDOM % ${#CSS_LINES[@]}]}"

  # Append to file
  echo "$LINE" >> "$FILE"
  (( line_count++ ))

  # Print to terminal with count
  echo "[$line_count] $LINE"

  # Every 100 lines written, delete the last 50 lines from the file
  if (( line_count % 100 == 0 )); then
    total_lines=$(wc -l < "$FILE")
    if (( total_lines > 50 )); then
      keep=$(( total_lines - 50 ))
      tmp=$(mktemp)
      head -n "$keep" "$FILE" > "$tmp" && mv "$tmp" "$FILE"
      echo ""
      echo "🗑  Deleted last 50 lines at line_count=$line_count (file had $total_lines lines, kept $keep)"
      echo ""
    fi
  fi

  # Random delay between 10 and 15 seconds
  delay=$(( RANDOM % 6 + 10 ))
  sleep "$delay"
done