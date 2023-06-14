npx fitfont-generate ..\Segment16C_Bold.ttf 100 \"▌1234567890:_-."
find . -path "*.png" -exec convert '{}' -posterize 2 '{}' \; 