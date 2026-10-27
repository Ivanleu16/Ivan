const healthOutcomesSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Robotic prostate surgery means shorter stays but costs more per case",
    "subtitle": [
      "Radical prostatectomy in Victoria, 5,581 patients, 2010 to 2013. Source: Basto et al., BJU International, 2016.",
      "Costs are extra dollars per robotic case compared with the other methods."
    ]
  },
  "resolve": { "scale": { "color": "independent" } },
  "hconcat": [
    {
      "width": 170, "height": { "step": 44 },
      "data": { "url": "data/prostatectomy_outcomes_victoria.csv" },
      "mark": { "type": "bar", "size": 26, "cornerRadiusEnd": 4 },
      "encoding": {
        "y": { "field": "method", "type": "nominal", "title": null, "sort": ["Robotic", "Laparoscopic", "Open"] },
        "x": { "field": "length_of_stay_days", "type": "quantitative", "title": "Days in hospital", "scale": { "domain": [0, 6] } },
        "color": {
          "field": "method", "type": "nominal", "legend": null,
          "scale": { "domain": ["Robotic", "Laparoscopic", "Open"], "range": ["#1baf7a", "#898781", "#898781"] }
        },
        "tooltip": [
          { "field": "method", "title": "Method" },
          { "field": "length_of_stay_days", "title": "Average days in hospital" }
        ]
      }
    },
    {
      "width": 170, "height": { "step": 44 },
      "data": { "url": "data/prostatectomy_outcomes_victoria.csv" },
      "mark": { "type": "bar", "size": 26, "cornerRadiusEnd": 4 },
      "encoding": {
        "y": { "field": "method", "type": "nominal", "title": null, "axis": null, "sort": ["Robotic", "Laparoscopic", "Open"] },
        "x": { "field": "transfusion_pct", "type": "quantitative", "title": "Needed a blood transfusion (%)", "scale": { "domain": [0, 20] } },
        "color": {
          "field": "method", "type": "nominal", "legend": null,
          "scale": { "domain": ["Robotic", "Laparoscopic", "Open"], "range": ["#1baf7a", "#898781", "#898781"] }
        },
        "tooltip": [
          { "field": "method", "title": "Method" },
          { "field": "transfusion_pct", "title": "Transfusion rate (%)" }
        ]
      }
    },
    {
      "width": 220, "height": { "step": 44 },
      "data": { "url": "data/prostatectomy_extra_cost_victoria.csv" },
      "transform": [
        { "fold": ["extra_cost_vs_open_aud", "extra_cost_vs_laparoscopic_aud"], "as": ["comparison", "extra_cost"] },
        { "calculate": "datum.comparison === 'extra_cost_vs_open_aud' ? 'Compared with open' : 'Compared with laparoscopic'", "as": "compared_with" }
      ],
      "mark": { "type": "bar", "size": 16, "cornerRadiusEnd": 3 },
      "encoding": {
        "y": { "field": "da_vinci_model", "type": "nominal", "title": "da Vinci model", "sort": null },
        "yOffset": { "field": "compared_with", "type": "nominal" },
        "x": { "field": "extra_cost", "type": "quantitative", "title": "Extra cost per robotic case (A$)", "axis": { "format": ",.0f" } },
        "color": {
          "field": "compared_with", "type": "nominal",
          "scale": { "domain": ["Compared with open", "Compared with laparoscopic"], "range": ["#eb6834", "#7a3b1e"] },
          "legend": { "title": null, "orient": "bottom" }
        },
        "tooltip": [
          { "field": "da_vinci_model", "title": "da Vinci model" },
          { "field": "compared_with", "title": "Comparison" },
          { "field": "extra_cost", "title": "Extra cost (A$)", "format": "," }
        ]
      }
    }
  ]
};

vegaEmbed("#health-outcome-chart", healthOutcomesSpec);