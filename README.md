- [Features](#features)
  - [Time](#time)
  - [Steps](#steps)
  - [Heart Rate](#heart-rate)
  - [Battery Level](#battery-level)
  - [Complications](#complications)
    - [Glitch](#glitch)
    - [None](#none)
    - [Upcoming](#upcoming)
- [Background](#background)
- [Licensing](#licensing)
- [Developer Stuff](#developer-stuff)
  - [Names](#names)
  - [Fonts](#fonts)
    - [Dot-matrix](#dot-matrix)
    - [16-Segment](#16-segment)
  - [Local settings location](#local-settings-location)
  - [Setup](#setup)
    - [Generate Fonts](#generate-fonts)


# Features

## Time
Or lack thereof.  I don't actually care about seeing the time on my fitbit.  I have a watch I use for that. See the [Background Section](#background) for details.

## Steps
Steps are front and center. I may change this to be the primary goal.  For the time being, this is not configurable.  After `999` steps, it will display as `1.00k`. After `9999` steps, it will display as `10.0k`.  I'm assuming nobody will get 100k steps in a day.  If you do, [IT'S TIME TO STOP!](https://youtu.be/x0dHUXLmSYQ)

## Heart Rate
Heart rate is the secondary stat, on the bottom.  This is not configurable, and I do not have any plans to make it so.

## Battery Level
Its a useful stat, in the top right.  This is not configurable, and I do not have any plans to make it so.

## Complications
Admittedly, this is a complete afterthought.  While mocking up the UI, I felt that this area needed *something*, but I didn't have a good sense of what *I* wanted there.  So, I decided to make it a single selection of the following:

### Glitch
Once per tick, a random selection of all the characters in the dot-matrix font is displayed.  There is no great meaning here.  It's gibberish.

### None
The complication is filled with full blocks; "█"

### Upcoming

- [ ] Time
- [ ] Date
- [ ] Altitude
- [ ] Weather
- [ ] Model
- [ ] Main Goal Progress
- [ ] Time to Sunset/Sunrise


# Background

I wanted a watch face that was basically just steps and heart rate. I already have a really nice watch, and didn't want to not use it. Also, I've had terrible luck with FitBits breaking 30s after the 1y warranty expires.

The name comes from the aforementioned watch. It uses small tritium vials for illumination; [Tritium radioluminescence](https://en.wikipedia.org/wiki/Tritium_radioluminescence) relies on the beta-decay of tritium, hence the name. (β-decay)

# Licensing

I currntly intend to add a payment gate to this code. However, if you're reading this, ask nicely, and I might send a discount code ;)

To the best of my knowledge, all external resources (e.g. fonts) permit commercial use.

# Developer Stuff

## Names

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

## Fonts

Font-Image generation is covered [here](#generate-fonts).

### Dot-matrix

Official name is Repetition Scrolling.  These heights are useful for determining positioning.

| font size | width | height |
| --------- | ----- | ------ |
| 120       | 66    | 82     |
| 100       | 55    | 69     |
| 50        | 28    | 35     |

### 16-Segment

TODO

## Local settings location

my local settings path is `C:\Users\drake\AppData\Roaming\Fitbit OS Simulator\vulcan\companion\app_72f2cf03-6f6e-4e60-b834-feca06a79361\settingsstorage`


## Setup

Perform the [general install instructions](https://dev.fitbit.com/getting-started/) as specified in the getting started guide, then run the following command.  Note: I do not have a folder with the entire watchface, as specified in the guide.

    npm install .

### Generate Fonts

The following are 2 example commands for generating fitfont images.  note, the second (with the cat command) only works on linux.

    npx fitfont-generate ..\fonts\repetition-scrolling\repet___.ttf 120 █1234567890.k-
    npx fitfont-generate ..\fonts\repetition-scrolling\repet___.ttf 50 $(cat chars.txt)

To crispen the images, reducing them to purely black/white, run the following command on linux:

    find . -path "*.png" -exec convert '{}' -posterize 2 '{}' \;







