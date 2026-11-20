# Friday 20 November 2026, 14 stories, one front page

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/msmgm/news-image-20261120-entry/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/msmgm/news-image-20261120-entry/reward.svg)](https://make.fun/bounty/news-image-20261120/reward?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

## Overview

This workspace serves as the official competition submission for the `news-image-20261120` bounty hosted on [make.fun](https://make.fun/bounty/news-image-20261120). It encapsulates the most significant global news events of Friday 20 November 2026 into a comprehensive newspaper front page format.

Every reported fact, date, and figure is drawn directly from `NEWS.md`:
1. **GTA 6 debut generates 24.58M copies and $2.36 billion** (Sensor Tower data; Sources: VGC, PSU, Notebookcheck)
2. **Houthi missiles impact Riyadh financial district** (PIF tower hit; Sources: Sky News, Middle East Eye)
3. **Kyiv struck by overnight missile and drone barrage** (3 killed, 3 Dnipro bridges damaged; Sources: Kyiv mayor, Le Monde, BBC)
4. **Anthropic debut closes up 17% around $97** ($83 offer price, ~$81.3B raised; Sources: BBC, The National)
5. **Global equities tumble across markets** (S&P -2%, Nikkei -4.8%; Sources: CNBC, Al Jazeera)
6. **ICJ rules Myanmar guilty of Rohingya genocide** (Historic 9-6 ruling on 19 Nov; Sources: BBC, PBS NewsHour)
7. **Shenzhen hosts historic Trump, Xi, and Putin summit** (Trilateral talks, 4-point declaration; Sources: BBC, The Guardian)
8. **Western allies convene in Berlin for Ukraine talks** (Coalition of the willing; Sources: BBC, France 24)
9. **Iran conflict escalates with Hormuz tanker incidents** (9th month, Brent at $90.05; Sources: Japan Times, CBS)
10. **COP31 draft removes fossil fuel phase-out language** (Antalya draft text; Sources: Japan Times, CBC)
11. **Nvidia Probe & Chip Approvals** (California AG subpoena after CEO Huang resignation)
12. **US Senate Energy Bill** (Permitting overhaul passed 62-33)
13. **Ebola Zero in Kenya** (Last patient discharged after 37 days)
14. **Deep Space Milestones** (Voyager 1 at one light-day, BepiColombo at Mercury, global debt at 100% GDP).

The visual presentation adheres to `IMAGE.md`, featuring a 1024x1024 square canvas, the masthead "FRIDAY 20 NOVEMBER 2026", a 9-panel lead grid, a world map strip, and the concluding ALSO summary list.

## Project Assets and Verification Gate

- **`entry.png`**: The verified 1024x1024 JPEG newspaper front-page asset.
- **`main.ts`**: A robust Node 22 standard library gate program that verifies `entry.png` against format and dimension constraints (PNG or JPEG, max 1 MiB, max 1024x1024 dimensions) and copies it deterministically to the target output directory, throwing an error and copying nothing upon any validation failure.

## Execution and Verification Instructions

To test and verify the entry locally:

```bash
# Set up output directories and execute the validation gate
mkdir -p out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts

# Confirm byte-for-byte consistency across runs
sha256sum out1/entry.png out2/entry.png entry.png
```

To clean up test outputs:
```bash
rm -rf out1 out2
```

## Licensing

Released under the MIT License. Refer to [LICENSE](LICENSE) for full terms.


