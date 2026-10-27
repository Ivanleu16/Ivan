const dotMapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 700,
  "height": 600,
  "title": {
    "text": "Where mines are automated",
    "subtitle": "Grey dots are mines. Orange dots have publicly reported autonomous haul trucks, a partial list.",
    "anchor": "start"
  },
  "projection": { "type": "mercator" },
  "layer": [
    {
      "data": {
        "url": "data/states.topojson",
        "format": { "type": "topojson", "feature": "STE_2026_AUST_GDA2020" }
      },
      "transform": [
        { "filter": "datum.properties.STE_CODE26 !== '9' && datum.properties.STE_CODE26 !== 'Z'" }
      ],
      "mark": { "type": "geoshape", "fill": "#e1e0d9", "stroke": "#fcfcfb", "strokeWidth": 1.5 }
    },
    {
      "data": { "url": "data/operating_mines_2024.csv" },
      "transform": [{ "filter": "datum.state !== 'IOT'" }],
      "mark": { "type": "circle", "size": 22, "color": "#898781", "opacity": 0.7 },
      "encoding": {
        "longitude": { "field": "longitude", "type": "quantitative" },
        "latitude": { "field": "latitude", "type": "quantitative" },
        "tooltip": [
          { "field": "name", "type": "nominal", "title": "Mine" },
          { "field": "state", "type": "nominal", "title": "State" },
          { "field": "status", "type": "nominal", "title": "Status" },
          { "field": "commodity_group", "type": "nominal", "title": "Commodity" }
        ]
      }
    },
    {
      "data": { "url": "data/mines_with_autonomous_haulage.csv" },
      "mark": { "type": "circle", "size": 170, "color": "#eb6834", "opacity": 1, "stroke": "#fcfcfb", "strokeWidth": 2 },
      "encoding": {
        "longitude": { "field": "longitude", "type": "quantitative" },
        "latitude": { "field": "latitude", "type": "quantitative" },
        "tooltip": [
          { "field": "name", "type": "nominal", "title": "Mine" },
          { "field": "operator", "type": "nominal", "title": "Operator" },
          { "field": "technology", "type": "nominal", "title": "Technology" },
          { "field": "evidence", "type": "nominal", "title": "Reported" },
          { "field": "confidence", "type": "nominal", "title": "Confidence" }
        ]
      }
    }
  ]
};

vegaEmbed("#mine-with-autodriving", dotMapSpec);