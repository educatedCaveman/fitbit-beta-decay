// TODO: add a custom color selector?
// TODO: add opacity slider?
const colorSet = [
    {color: "black"},
    {color: "#1a1a1a"},
    {color: "#2b2b2b"},
    {color: "dimgrey"},
    {color: "grey"},
    {color: "lightgrey"},
    {color: "white"},
    {color: "darkred"},
    {color: "maroon"},
    {color: "crimson"},
    {color: "red"}, 
    {color: "orangered"},
    {color: "orange"},
    {color: "coral"},
    {color: "goldenrod"},
    {color: "gold"},   
    {color: "yellow"},  
    {color: "greenyellow"},
    {color: "palegreen"},
    {color: "springgreen"},
    {color: "lime"},
    {color: "limegreen"},
    {color: "green"},
    {color: "darkgreen"},
    {color: "darkslategrey"}, 
    {color: "olive"},
    {color: "navy"},
    {color: "blue"},
    {color: "dodgerblue"},
    {color: "deepskyblue"},
    {color: "cyan"},
    {color: "aquamarine"},
    {color: "darkslateblue"},
    {color: "slateblue"},
    {color: "purple"},
    {color: "fuchsia"},
    {color: "orchid"},
    {color: "palevioletred"}, 
    {color: "plum"}, 
    {color: "lavender"},
    {color: "lightpink"},
    {color: "deeppink"},
    {color: "saddlebrown"},
    {color: "rosybrown"},
    {color: "darkgoldenrod"},
    {color: "darkkhaki"},
    {color: "khaki"},
    {color: "wheat"},   
    {color: "lemonchiffon"}, 
    {color: "beige"}, 
  ];
  
  const color_options = [
    ['Background Color', 'colorBackground'],
    ['Text Background Color', 'colorTextBackground'],
    ['Text Color', 'colorText'],
  ];
  
  const widget_option = [
    ['Widget', 'widgetType'],
  ];
  
  function mySettings(props) {
    return (
      <Page>
        {widget_option.map(([title, settingsKey]) =>
          <Section title={title}>
            <Select
              label={`Widget`}
              settingsKey={settingsKey}
              options={[
                {name:"Glitch", value:"1"},
                {name:"Altitude", value:"2"},
                {name:"Weather", value:"3"},
                {name:"Model", value:"4"},
                {name:"Time", value:"5"},
                {name:"Date", value:"6"},
                {name:"Goal Progress", value:"7"},
                {name:"Time until sunrise/sunset", value:"8"},
              ]}
              // onSelection={(selection) => console.log(selection)}              
              onSelection={(selection) => console.log(JSON.stringify(selection, null, 4))}
              // onSelection={(selection) => console.log(selection.values[0].name)}
            />
          </Section>
        )}

        {color_options.map(([title, settingsKey]) =>
          <Section title={title}>
            <ColorSelect
              settingsKey={settingsKey}
              colors={colorSet} />
          </Section>
        )}

      </Page>
    );
  }
  
  registerSettingsPage(mySettings);