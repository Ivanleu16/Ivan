const safetySpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 520,
    "height": { "step": 38 },
  "title": {
    "text": "Operators report big safety gains. Regulator data shows small ones.",
    "subtitle": [
      "Reported reductions in incidents. Orange bars are company claims, grey bars are independent regulator data.",
      "The two are not like for like, so read them as context rather than a test."
    ]
  },
  "data": { "url": "data/safety_all.csv" },
  "transform": [
    { "filter": "datum.unit === 'percent_reduction'" }
  ],
  "mark": { "type": "bar", "size": 22, "cornerRadiusEnd": 4 },
  "encoding": {
    "y": {
      "field": "measure", "type": "nominal", "sort": null,
      "title": null, "axis": { "labelLimit": 380 }
    },
    "x": {
      "field": "value", "type": "quantitative",
      "scale": { "domain": [0, 100] },
      "title": "Reduction reported (%)"
    },
    "color": {
      "field": "category", "type": "nominal",
      "scale": {
        "domain": ["operator_claim", "regulator_change"],
        "range": ["#eb6834", "#898781"]
      },
      "legend": {
        "title": null, "orient": "top",
        "labelExpr": "datum.value === 'operator_claim' ? 'Operator reported' : 'Regulator data'"
      }
    },
    "tooltip": [
      { "field": "measure", "title": "Measure" },
      { "field": "value", "title": "Reduction (%)" },
      { "field": "region_or_site", "title": "Site" },
      { "field": "period", "title": "Period" },
      { "field": "note", "title": "Evidence" }
    ]
  }
};

vegaEmbed("#safety-chart", safetySpec);