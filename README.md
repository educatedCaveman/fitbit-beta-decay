# README.md

These are notes take while developing the watchface.

## Notes

| font size | width | height |
| --------- | ----- | ------ |
| 120       | 66    | 82     |
| 100       | 55    | 69     |
| 50        | 28    | 35     |

## Useful Commands

### setup

perform the general install instructions as specified in the getting started guide

    cd beta-decay
    npm install .

### post-setup

generate the fonts:

    npx fitfont-generate ..\fonts\repetition-scrolling\repet___.ttf 120 █1234567890.k-
    npx fitfont-generate ..\fonts\repetition-scrolling\repet___.ttf 50 $(cat chars.txt)

crispen the images, reducing them to purely black/white. to be run on linux. not sure how to do it on windows, if its possible.

    find . -path "*.png" -exec convert '{}' -posterize 2 '{}' \;

## Background

I wanted a watch face that was basically just steps and heart rate. I already have a really nice watch, and didn't want to not use it. Also, I've had terrible luck with FitBits breaking 30s after the 1y warranty expires.

The name comes from the aforementioned watch. It uses small tritium vials for illumination; [Tritium radioluminescence](https://en.wikipedia.org/wiki/Tritium_radioluminescence) relies on the beta-decay of tritium, hence the name. (β-decay)
