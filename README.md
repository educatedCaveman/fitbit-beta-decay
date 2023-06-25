# README.md

These are notes take while developing the watchface.

## Notes

| font size | width | height |
| --------- | ----- | ------ |
| 120       | 66    | 82     |
| 100       | 55    | 69     |
| 50        | 28    | 35     |

### names for multiple versions

| display type | platform    | cost | description/name           | alt name               |
| ------------ | ----------- | ---- | -------------------------- | ---------------------- |
| dot-matrix   | hera / rhea | paid | beta-decay                 | beta-decay (v2)        |
| dot-matrix   | hera / rhea | free | beta-decay (free)          | beta-decay (v2, free)  |
| dot-matrix   | older       | paid | beta-decay (legacy)        | beta-decay             |
| dot-matrix   | older       | free | beta-decay (legacy, free)  | beta-decay             |
| 16-segment   | hera / rhea | paid | alpha-decay                | alpha-decay (v2)       |
| 16-segment   | hera / rhea | free | alpha-decay (free)         | alpha-decay (v2, free) |
| 16-segment   | older       | paid | alpha-decay (legacy)       | alpha-decay            |
| 16-segment   | older       | free | alpha-decay (legacy, free) | alpha-decay            |

### settings

my local settings path is `C:\Users\drake\AppData\Roaming\Fitbit OS Simulator\vulcan\companion\app_72f2cf03-6f6e-4e60-b834-feca06a79361\settingsstorage`

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

## Licensing

I currntly intend to add a payment gate to this code. However, if you're reading this, ask nicely, and I might send a discount code ;)

To the best of my knowledge, all external resources (e.g. fonts) permit commercial use.
