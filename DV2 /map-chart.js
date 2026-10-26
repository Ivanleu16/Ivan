const mapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 700,
  "height": 600,
  "title": {
    "text": "Where Australia's mines are",
    "subtitle": "Mines per 100,000 square kilometres, 2024",
    "anchor": "start"
  },
  "data": {
    "url": "data/states.topojson",
    "format": { "type": "topojson", "feature": "STE_2026_AUST_GDA2020" }
  },
  "transform": [
    { "filter": "datum.properties.STE_CODE26 !== '9' && datum.properties.STE_CODE26 !== 'Z'" },
    {
      "lookup": "properties.STE_NAME26",
      "from": {
        "data": {
          "url": "data/state_mines.csv",
          "format": {
            "type": "csv",
            "parse": { "mines_total": "number", "mines_per_100k_sq_km": "number" }
          }
        },
        "key": "state_name",
        "fields": ["state_name", "mines_total", "mines_per_100k_sq_km"]
      }
    }
  ],
  "projection": { "type": "mercator" },
  "mark": { "type": "geoshape", "stroke": "#fcfcfb", "strokeWidth": 1.5 },
  "encoding": {
    "color": {
      "field": "mines_per_100k_sq_km",
      "type": "quantitative",
      "scale": { "range": ["#cde2fb", "#184f95"] },
      "legend": { "title": "Mines per 100,000 km²", "orient": "bottom-left", "direction": "horizontal" }
    },
    "tooltip": [
      { "field": "state_name", "type": "nominal", "title": "State" },
      { "field": "mines_total", "type": "quantitative", "title": "Mines" },
      { "field": "mines_per_100k_sq_km", "type": "quantitative", "title": "Mines per 100,000 km²", "format": ".1f" }
    ]
  }
};

vegaEmbed("#mine-map", mapSpec);