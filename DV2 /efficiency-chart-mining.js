const efficiencySpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Operators report gains from driverless trucks and drills",
    "subtitle": [
      "Improvements reported by the companies themselves, not independent measures.",
      "Each figure measures something different, so compare within a row, not across."
    ]
  },
  "data": { "url": "data/efficiency_claims.csv" },
  "transform": [{ "filter": "datum.unit === 'percent'" }],
  "facet": {
    "row": {
      "field": "technology", "type": "nominal", "title": null,
      "sort": ["Haul trucks", "Drills"],
      "header": { "labelAngle": 0, "labelAlign": "left", "labelFontWeight": "bold", "labelFontSize": 13 }
    }
  },
  "spec": {
    "width": 460,
    "height": { "step": 36 },
    "layer": [
      {
        "mark": { "type": "bar", "size": 22, "cornerRadiusEnd": 4, "color": "#eb6834" },
        "encoding": {
          "y": { "field": "measure", "type": "nominal", "sort": null, "title": null, "axis": { "labelLimit": 300 } },
          "x": { "field": "value", "type": "quantitative", "scale": { "domain": [0, 40] }, "title": "Reported improvement (%)" },
          "tooltip": [
            { "field": "company", "title": "Company" },
            { "field": "measure", "title": "Measure" },
            { "field": "value", "title": "Reported (%)" },
            { "field": "year", "title": "Year" },
            { "field": "evidence", "title": "Evidence" }
          ]
        }
      },
      {
        "mark": { "type": "text", "align": "left", "dx": 6, "fontSize": 12 },
        "encoding": {
          "y": { "field": "measure", "type": "nominal", "sort": null },
          "x": { "field": "value", "type": "quantitative" },
          "text": { "field": "company" }
        }
      }
    ]
  },
  "resolve": { "scale": { "y": "independent" } }
};

vegaEmbed("#efficiency-chart-mining", efficiencySpec);