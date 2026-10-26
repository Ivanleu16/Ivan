const agricultureSurveySpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 480,
  "height": { "step": 40 },
  "title": {
    "text": "Farmers report gains from technology, but cost holds many back",
    "subtitle": [
      "Survey results from Australian farmers and grain growers. Each bar has a different group of respondents,",
      "so hover for the base. Amber bars are adoption and benefits, grey bars are barriers."
    ]
  },
  "data": { "url": "data/agriculture_technology_survey.csv" },
  "transform": [
    { "calculate": "datum.type === 'Barrier' ? 'Barrier' : 'Adoption, interest and benefits'", "as": "group" }
  ],
  "mark": { "type": "bar", "size": 24, "cornerRadiusEnd": 4 },
  "encoding": {
    "y": {
      "field": "measure", "type": "nominal", "sort": null, "title": null,
      "axis": { "labelLimit": 360 }
    },
    "x": {
      "field": "value_pct", "type": "quantitative",
      "scale": { "domain": [0, 100] },
      "title": "Share of respondents (%)"
    },
    "color": {
      "field": "group", "type": "nominal",
      "scale": { "domain": ["Adoption, interest and benefits", "Barrier"], "range": ["#eda100", "#898781"] },
      "legend": { "title": null, "orient": "top" }
    },
    "tooltip": [
      { "field": "measure", "title": "Measure" },
      { "field": "value_pct", "title": "Share (%)" },
      { "field": "base", "title": "Respondents" },
      { "field": "survey", "title": "Survey" }
    ]
  }
};

vegaEmbed("#agriculture-technology", agricultureSurveySpec);