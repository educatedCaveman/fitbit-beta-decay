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

const dummy = {"values": ["0"]}


function mySettings(props) {
  return (
    <Page>
      <Section title="Complication">
        <Select
          label={`Complication`}
          selectViewTitle="Complication"
          settingsKey="complication"
          options={[
            {name:"Glitch",         value: "1"},
            {name:"Time",           value: "2"},
            {name:"Date",           value: "3"},
            {name:"Model",          value: "4"},
            {name:"Sunset/Sunrise", value: "5"},
            {name:"None",           value: "99"}
          ]}
          onSelection={(selection) => props.settingsStorage.setItem('complication', selection.values[0].value)}
        />
        {/* Show/Hide the extra options for the Date Complication */}
        { (JSON.parse(props.settingsStorage.getItem('complication') ?? JSON.stringify(dummy))).values[0].value === "3" &&
          <Select
            label='Date Format'
            selectViewTitle='Format'
            settingsKey='dateFmt'
            options={[
              {name:"MM/DD", value:"1"},
              {name:"MM-DD", value:"2"},
              {name:"DD/MM", value:"3"},
              {name:"DD-MM", value:"4"},
              {name:"Oct31", value:"5"},
              {name:"OCT31", value:"6"},
              {name:"31Oct", value:"7"},
              {name:"31OCT", value:"8"},
              {name:"Fri13", value:"9"},
              {name:"FRI13", value:"10"},
              {name:"13Fri", value:"11"},
              {name:"13FRI", value:"12"}
            ]}
            onSelection={(fmtSelection) => props.settingsStorage.setItem('dateFmt', fmtSelection.values[0].value)}
          />
        }
        {/* Show/Hide the extra options for the Model Complication */}
        { (JSON.parse(props.settingsStorage.getItem('complication') ?? JSON.stringify(dummy))).values[0].value === "4" &&
          <Select
            label='Format'
            selectViewTitle='Model Format'
            settingsKey='modelFmt'
            options={[
              {name:"Truncated - e.g. \"VERSA\"", value:"1"},
              {name:"Squished - e.g. \"VRSA3\"", value:"2"},
              {name:"Codename - e.g. \"ATLAS\"", value:"3"}
            ]}
            onSelection={(fmtSelection) => props.settingsStorage.setItem('modelFmt', fmtSelection.values[0].value)}
          />
        }
        {/* Show/Hide the extra options for the Sun Times Complication */}
        { (JSON.parse(props.settingsStorage.getItem('complication') ?? JSON.stringify(dummy))).values[0].value === "5" &&
          <Slider
          label={String("Refresh Interval: " + props.settingsStorage.getItem('sunInterval') + "h")}
            selectViewTitle='Refresh Interval'
            settingsKey='sunInterval'
            min="1" max="12" step="1"
            onSelection={(fmtSelection) => props.settingsStorage.setItem('sunInterval', fmtSelection.values[0].value)}
          />
        }
      </Section>


      <Section title="Text Color">
        <ColorSelect settingsKey="colorText" colors={colorSet} />
      </Section>


      <Section title="Text Background Color">
        <Slider 
          label={String("Opactity: " + props.settingsStorage.getItem('opacityTextBackground') + "%")}
          settingsKey="opacityTextBackground" 
          min="0" max="100"
          onChange={value => props.settingsStorage.setItem('opacityTextBackground', value)}
        />
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