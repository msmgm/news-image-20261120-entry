# Friday 20 November 2026: 14 stories, one front page

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/msmgm/news-image-20261120-entry/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/msmgm/news-image-20261120-entry/reward.svg)](https://make.fun/bounty/news-image-20261120/reward?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

## Overview

This repository is the competition entry for `news-image-20261120` on [make.fun](https://make.fun/bounty/news-image-20261120). It captures the major news stories of Friday 20 November 2026 in a newspaper front-page layout.

Every fact, date, and number is sourced strictly from `NEWS.md`:
1. **GTA 6 launch tops $2.3 billion** (24.58M copies, ~$2.36B day one; Sources: Sensor Tower via VGC/PSU/Notebookcheck)
2. **Houthi missile damages Riyadh's tallest tower** (PIF tower hit, no injuries; Sources: Sky News, Middle East Eye)
3. **Russia overnight attack on Kyiv** (3 killed, three Dnipro bridges damaged; Sources: Kyiv mayor, Le Monde, BBC)
4. **Anthropic IPO closes +17% at ~$97** ($83 offer, ~$81.3B raised; Sources: BBC, The National)
5. **Stocks fall: S&P -2% (5th straight loss), Nikkei -4.8%** (Sources: CNBC, Al Jazeera)
6. **ICJ: Myanmar committed genocide against Rohingya** (Thu 19 Nov ruling, 9-6; Sources: BBC, PBS NewsHour, UN News)
7. **Trump, Xi & Putin summit in Shenzhen** (First three-way summit, "peace declaration"; Sources: BBC, The Guardian)
8. **Ukraine's allies meet in Berlin** (Coalition of the willing; Sources: BBC, France 24)
9. **Iran war: Hormuz tanker attacks intensify** (9th month, Brent $90.05; Sources: Japan Times, Middle East Eye, CBS)
10. **COP31 draft drops fossil-fuel phase-out** (Antalya draft; Sources: Japan Times, CBC)
11. **California opens probe into Nvidia after CEO Huang resigns**
12. **US Senate passes energy permitting overhaul 62-33**
13. **Kenya discharges last Ebola patient**
14. **Voyager 1 reaches one light-day from Earth** + BepiColombo reaches Mercury orbit; IMF warns global public debt nearing 100% of GDP.

The visual layout adheres precisely to `IMAGE.md` (1024x1024 canvas, masthead "FRIDAY 20 NOVEMBER 2026", 9-panel lead grid, world map strip, and "Also on 20 November" summary).

## Assets and Implementation

- **`entry.png`**: The 1024x1024 JPEG newspaper front-page image.
- **`main.ts`**: A Node 22 standard-library script that validates `entry.png` against the competition gate (supports PNG or JPEG, at most 1 MiB, at most 1024x1024) and performs a deterministic byte-for-byte copy to the output directory. The script throws an Error and copies nothing if any gate check fails.

## Run and Verify Locally

To verify the entry locally:

```bash
# Test validation and deterministic copy
mkdir -p out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts

# Compare outputs byte-for-byte
sha256sum out1/entry.png out2/entry.png entry.png
```

Clean up test directories:
```bash
rm -rf out1 out2
```

## License

MIT License, see [LICENSE](LICENSE).

