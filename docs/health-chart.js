const healthSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 480,
  "height": 320,
  "title": {
    "text": "Robotic surgery has grown by about three quarters in five years",
    "subtitle": [
      "da Vinci robotic procedures per year, Australia and New Zealand combined.",
      "Source: Royal Australasian College of Surgeons working party report, 2023."
    ]
  },
  "data": { "url": "data/robotic_surgery_procedures.csv" },
  "encoding": {
    "x": { "field": "year", "type": "ordinal", "title": null, "axis": { "labelAngle": 0 } },
    "y": { "field": "procedures", "type": "quantitative", "title": "Procedures per year", "axis": { "format": ",.0f" } }
  },
  "layer": [
    {
      "mark": { "type": "bar", "size": 44, "cornerRadiusEnd": 4, "color": "#1baf7a" },
      "encoding": {
        "tooltip": [
          { "field": "year", "title": "Year" },
          { "field": "procedures", "title": "Procedures", "format": "," },
          { "field": "platform", "title": "Platform" },
          { "field": "region", "title": "Region" }
        ]
      }
    },
    {
      "mark": { "type": "text", "dy": -8, "fontSize": 12 },
      "encoding": { "text": { "field": "procedures", "type": "quantitative", "format": "," } }
    }
  ]
};

vegaEmbed("#health-chart", healthSpec);