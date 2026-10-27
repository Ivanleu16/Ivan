const miningTileSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Mining deaths cluster in Queensland and Western Australia",
    "subtitle": [
      "Worker fatalities in mining by state or territory, 2017 to 2021 (five-year total).",
    ],
    "anchor": "start",
    "fontSize": 15,
    "subtitleFontSize": 12,
    "subtitleColor": "#5f5e58"
  },
  "width": { "step": 110 },
  "height": { "step": 110 },
  "background": "#fcfcfb",
  "config": { "view": { "stroke": null } },
  "data": { "url": "data/mining_fatalities_by_state.csv" },
  "transform": [
    {
      "lookup": "state_abbr",
      "from": {
        "data": {
          "values": [
            { "abbr": "NT",  "col": 1, "row": 0 },
            { "abbr": "QLD", "col": 2, "row": 0 },
            { "abbr": "WA",  "col": 0, "row": 1 },
            { "abbr": "SA",  "col": 1, "row": 1 },
            { "abbr": "NSW", "col": 2, "row": 1 },
            { "abbr": "VIC", "col": 2, "row": 2 },
            { "abbr": "ACT", "col": 3, "row": 2 },
            { "abbr": "TAS", "col": 2, "row": 3 }
          ]
        },
        "key": "abbr",
        "fields": ["col", "row"]
      }
    }
  ],
  "encoding": {
    "x": { "field": "col", "type": "ordinal", "axis": null, "scale": { "domain": [0, 1, 2, 3], "paddingInner": 0.06 } },
    "y": { "field": "row", "type": "ordinal", "axis": null, "scale": { "domain": [0, 1, 2, 3], "paddingInner": 0.06 } }
  },
  "layer": [
    {
      "mark": { "type": "rect", "cornerRadius": 6 },
      "encoding": {
        "color": {
          "field": "mining_fatalities",
          "type": "quantitative",
          "scale": { "domain": [0, 10], "range": ["#fde5da", "#eb6834", "#7a3b1e"] },
          "legend": {
            "title": "Mining deaths, 2017 to 2021",
            "orient": "bottom",
            "direction": "horizontal",
            "gradientLength": 200
          }
        },
        "tooltip": [
          { "field": "state_name", "title": "State" },
          { "field": "mining_fatalities", "title": "Mining deaths, 2017 to 2021" }
        ]
      }
    },
    {
      "mark": { "type": "text", "fontSize": 15, "fontWeight": "bold", "dy": -12 },
      "encoding": {
        "text": { "field": "state_abbr" },
        "color": { "condition": { "test": "datum.mining_fatalities >= 6", "value": "#ffffff" }, "value": "#1a1a18" }
      }
    },
    {
      "mark": { "type": "text", "fontSize": 24, "fontWeight": "bold", "dy": 14 },
      "encoding": {
        "text": { "field": "mining_fatalities" },
        "color": { "condition": { "test": "datum.mining_fatalities >= 6", "value": "#ffffff" }, "value": "#1a1a18" }
      }
    }
  ]
};

vegaEmbed("#tile-map", miningTileSpec, { "actions": false });