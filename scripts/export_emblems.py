“””
Majestic — Emblem PNG Batch Export
#63 — SVG masters → PNG exports at 5 sizes × 4 colour states

Emblems:
1-ignition-casper     Casper / Fire
2-broadcast-eli       Eli / Air
3-foundation-olivia   Olivia / Earth
4-resonance-destiny   Destiny / Water
5-convergence-majestic  Majestic master

Colour states:
monochrome   Black paths on transparent background (original)
accent       Avatar primary accent colour
white        White paths (for dark backgrounds)
dark         Threshold deep (#1A1A2E) paths

Sizes (px): 24, 48, 80, 120, 200
Output: 5 emblems × 4 states × 5 sizes = 100 PNGs
“””

import os
import re
import cairosvg

# ── Config ────────────────────────────────────────────────────────────────────

SVG_DIR = “/home/claude/emblems/svg”
OUT_DIR = “/mnt/user-data/outputs/majestic-emblems”

SIZES = [24, 48, 80, 120, 200]

EMBLEMS = {
“1-ignition-casper”:      “#C94B2C”,   # Casper / Fire — primary accent
“2-broadcast-eli”:        “#A8B4C8”,   # Eli / Air
“3-foundation-olivia”:    “#5C6B3A”,   # Olivia / Earth
“4-resonance-destiny”:    “#2A7B8C”,   # Destiny / Water
“5-convergence-majestic”: “#9500FF”,   # Majestic master — brand purple
}

COLOUR_STATES = {
“monochrome”: “#000000”,
“white”:      “#F0EDE8”,   # bone white — Majestic off-white
“dark”:       “#1A1A2E”,   # threshold deep
# accent is per-emblem — handled separately
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def recolour_svg(svg_text: str, colour: str) -> str:
“”“Replace all fill=“black” / fill=”#000000” with the target colour.”””
svg = re.sub(r’fill=“black”’, f’fill=”{colour}”’, svg_text)
svg = re.sub(r’fill=”#000000”’, f’fill=”{colour}”’, svg)
svg = re.sub(r’fill=”#000”’, f’fill=”{colour}”’, svg)
return svg

def export_png(svg_text: str, out_path: str, size: int):
cairosvg.svg2png(
bytestring=svg_text.encode(“utf-8”),
write_to=out_path,
output_width=size,
output_height=size,
)

# ── Main ──────────────────────────────────────────────────────────────────────

os.makedirs(OUT_DIR, exist_ok=True)
count = 0
errors = []

for emblem_name, accent_hex in EMBLEMS.items():
svg_path = os.path.join(SVG_DIR, f”{emblem_name}.svg”)
with open(svg_path, “r”) as f:
svg_source = f.read()

```
# Build all 4 colour state variants
states = {**COLOUR_STATES, "accent": accent_hex}

for state_name, colour_hex in states.items():
    recoloured = recolour_svg(svg_source, colour_hex)

    for size in SIZES:
        filename = f"{emblem_name}_{state_name}_{size}px.png"
        out_path = os.path.join(OUT_DIR, filename)
        try:
            export_png(recoloured, out_path, size)
            count += 1
            print(f"  ✓  {filename}")
        except Exception as e:
            errors.append(f"  ✗  {filename}: {e}")
            print(errors[-1])
```

print(f”\n{‘─’*50}”)
print(f”Done — {count} PNGs exported to {OUT_DIR}”)
if errors:
print(f”{len(errors)} errors:”)
for e in errors:
print(e)
else:
print(“Zero errors. Clean run.”)
