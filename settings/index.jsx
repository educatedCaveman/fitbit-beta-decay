const colorSet = [
  {color: "black"},
  {color: "darkslategrey"},
  {color: "dimgrey"},
  {color: "grey"},
  {color: "lightgrey"},
  {color: "beige"},
  {color: "white"},
  {color: "maroon"},
  {color: "saddlebrown"},
  {color: "darkgoldenrod"},
  {color: "goldenrod"},
  {color: "rosybrown"},
  {color: "wheat"},
  {color: "navy"},
  {color: "blue"},
  {color: "dodgerblue"},
  {color: "deepskyblue"},
  {color: "aquamarine"},
  {color: "cyan"},
  {color: "olive"},
  {color: "darkgreen"},
  {color: "green"},
  {color: "springgreen"},
  {color: "limegreen"},
  {color: "palegreen"},
  {color: "lime"},
  {color: "greenyellow"},
  {color: "darkslateblue"},
  {color: "slateblue"},
  {color: "purple"},
  {color: "fuchsia"},
  {color: "plum"},
  {color: "orchid"},
  {color: "lavender"},
  {color: "darkkhaki"},
  {color: "khaki"},
  {color: "lemonchiffon"},
  {color: "yellow"},
  {color: "gold"},
  {color: "orangered"},
  {color: "orange"},
  {color: "coral"},
  {color: "lightpink"},
  {color: "palevioletred"},
  {color: "deeppink"},
  {color: "darkred"},
  {color: "crimson"},
  {color: "red"}       
];

function mySettings(props) {
  return (
    <Page>
      <Section title="Text Color">
        <ColorSelect settingsKey="colorText" colors={colorSet} />
      </Section>
      <Section title="Text Background Color">
        <Slider 
          label="Opacity" 
          settingsKey="opacityTextBackground" 
          min="0" 
          max="100"
          onChange={value => props.settingsStorage.setItem('opacityTextBackground', value)}/>
        <ColorSelect settingsKey="colorTextBackground" colors={colorSet} />
      </Section>
      <Section title="Background Color">
        <ColorSelect settingsKey="colorBackground" colors={colorSet} />
      </Section>
      <Section title="Label Color">
        <ColorSelect settingsKey="colorLabel" colors={colorSet} />
      </Section>
      <Section>
        <Button
          list
          label="Reset Settings"
          onClick={() => props.settingsStorage.clear()}
        />
      </Section>
    </Page>
  )
}

registerSettingsPage(mySettings);