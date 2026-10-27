const manufacturingTechSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 520,
  "height": { "step": 26 },
  "title": {
    "text": "Manufacturers lead on some technologies and lag on others",
    "subtitle": [
      "Share of manufacturing businesses using each technology, minus the share of all businesses.",
      "Percentage points, year ended 30 June 2025. Source: ABS Characteristics of Australian Business."
    ]
  },
  "data": { "url": "data/manufacturing_technology_use.csv" },
  "transform": [
    { "calculate": "datum.manufacturing_pct - datum.all_businesses_pct", "as": "gap" },
    { "calculate": "datum.gap >= 0 ? 'Manufacturing ahead' : 'Manufacturing behind'", "as": "direction" }
  ],
  "layer": [
    {
      "mark": { "type": "bar", "size": 16, "cornerRadiusEnd": 3 },
      "encoding": {
        "y": {
          "field": "item", "type": "nominal", "title": null,
          "sort": { "field": "gap", "order": "descending" },
          "axis": { "labelLimit": 360, "domain": false, "ticks": false, "labelPadding": 130 }
        },
        "x": { "field": "gap", "type": "quantitative", "title": "Percentage points difference" },
        "color": {
          "field": "direction", "type": "nominal",
          "scale": { "domain": ["Manufacturing ahead", "Manufacturing behind"], "range": ["#2a78d6", "#898781"] },
          "legend": { "title": null, "orient": "top" }
        },
        "tooltip": [
          { "field": "item", "title": "Technology or practice" },
          { "field": "manufacturing_pct", "title": "Manufacturing (%)" },
          { "field": "all_businesses_pct", "title": "All businesses (%)" },
          { "field": "gap", "title": "Difference (points)", "format": "+.1f" }
        ]
      }
    },
    {
      "mark": { "type": "rule", "color": "#c3c2b7" },
      "encoding": { "x": { "datum": 0 } }
    }
  ]
};

vegaEmbed("#manufacturing-tech", manufacturingTechSpec);