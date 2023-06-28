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
      <Section title="Complication">
        <Select
          label={`Complication`}
          selectViewTitle="Complication"
          settingsKey="complication"
          options={[
            {name:"Glitch", value: "1"},
            {name:"Time", value: "2"},
            {name:"Date", value: "3"},
            {name:"Model", value: "4"}
            {name:"None", value: "99"}
          ]}
          // {"values":[{"name":"Glitch","value":"1"}],"selected":[0]}
          onSelection={(selection) => props.settingsStorage.setItem('complication', selection.values[0].value)}
        />

        <Select
          label='Date Format'
          selectViewTitle='Format'
          settingsKey='dateFmt'
          disabled={JSON.parse(props.settingsStorage.getItem('complication')).values[0].value != "3"}
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

        {/* trying to hide the toggle when the complication isn't the model */}
        {/* { JSON.parse(settings.toggle || 'false') && <TextInput label="Truncate Model" settingsKey="modelTruncate"/> } */}
        {/* { JSON.parse(props.settingsStorage.getItem('complication')).values[0].value != "4" && <TextInput label="Truncate Model" settingsKey="modelTruncate"/> } */}

        <Select
          label='Model Name Format'
          selectViewTitle='Model Format'
          settingsKey='modelFmt'
          disabled={JSON.parse(props.settingsStorage.getItem('complication')).values[0].value != "4"}
          options={[
            {name:"Truncated - e.g. \"VERSA\" for a Versa 3", value:"1"},
            {name:"Squished - e.g. \"VRSA3\" for a Versa 3", value:"2"},
            {name:"Codename - e.g. \"ATLAS\" for a Versa 3", value:"3"}
          ]}
          onSelection={(fmtSelection) => props.settingsStorage.setItem('dateFmt', fmtSelection.values[0].value)}
        />

      </Section>
      <Section title="Text Color">
        <ColorSelect settingsKey="colorText" colors={colorSet} />
      </Section>
      <Section title="Text Background Color">
        <Slider 
          label="Opacity" settingsKey="opacityTextBackground" min="0" max="100"
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