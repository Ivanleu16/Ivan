const incomeSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 600,
  "height": 440,
  "title": {
    "text": "Work has changed differently in every industry",
    "subtitle": [
      "Each industry from 1994-95 (faint) to 2025-26 (solid). Bubble size is the number of jobs.",
      "Income is shown against the all-industry average. Source: ABS Labour Account."
    ]
  },
  "data": { "url": "data/workplace_change_labour_account.csv" },
  "transform": [
    { "calculate": "indexof(['Mining','Manufacturing','Health care and social assistance','Agriculture, forestry and fishing'], datum.industry) >= 0 ? datum.industry : 'Other industries'", "as": "focus" },
    { "calculate": "datum.industry === 'Health care and social assistance' ? 'Health care' : datum.industry === 'Agriculture, forestry and fishing' ? 'Agriculture' : datum.industry", "as": "label" }
  ],
  "layer": [
    {
      "data": { "values": [{ "y": 100 }] },
      "mark": { "type": "rule", "color": "#c3c2b7", "strokeDash": [4, 4] },
      "encoding": {
        "y": { "field": "y", "type": "quantitative", "scale": { "zero": false, "domain": [30, 240] } }
      }
    },
    {
      "mark": { "type": "line", "strokeWidth": 2, "opacity": 0.6 },
      "encoding": {
        "x": { "field": "hours_per_week", "type": "quantitative", "scale": { "zero": false, "domain": [20, 46] }, "title": "Average hours worked per job each week" },
        "y": { "field": "income_vs_all_industries_pct", "type": "quantitative", "scale": { "zero": false, "domain": [30, 240] }, "title": "Income per person (% of all-industry average)" },
        "detail": { "field": "industry" },
        "order": { "field": "period" },
        "color": {
          "field": "focus", "type": "nominal", "legend": null,
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health care and social assistance", "Agriculture, forestry and fishing", "Other industries"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#b3b2ab"]
          }
        }
      }
    },
    {
      "mark": { "type": "circle", "stroke": "#fcfcfb", "strokeWidth": 1 },
      "encoding": {
        "x": { "field": "hours_per_week", "type": "quantitative" },
        "y": { "field": "income_vs_all_industries_pct", "type": "quantitative" },
        "color": {
          "field": "focus", "type": "nominal", "legend": null,
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health care and social assistance", "Agriculture, forestry and fishing", "Other industries"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#b3b2ab"]
          }
        },
        "size": { "field": "filled_jobs_thousands", "type": "quantitative", "scale": { "range": [30, 1800] }, "legend": null },
        "opacity": { "condition": { "test": "datum.period === '1994-95'", "value": 0.3 }, "value": 0.9 },
        "tooltip": [
          { "field": "label", "title": "Industry" },
          { "field": "period", "title": "Period" },
          { "field": "hours_per_week", "title": "Hours per week" },
          { "field": "annual_income_per_person", "title": "Income per person ($ a year)", "format": "," },
          { "field": "income_vs_all_industries_pct", "title": "% of average" },
          { "field": "filled_jobs_thousands", "title": "Jobs (thousands)", "format": "," }
        ]
      }
    },
    {
      "transform": [{ "filter": "datum.period === '2025-26' && datum.focus !== 'Other industries'" }],
      "mark": { "type": "text", "dx": 30, "align": "left", "fontWeight": "bold", "fontSize": 13 },
      "encoding": {
        "x": { "field": "hours_per_week", "type": "quantitative" },
        "y": { "field": "income_vs_all_industries_pct", "type": "quantitative" },
        "text": { "field": "label" },
        "color": {
          "field": "focus", "type": "nominal", "legend": null,
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health care and social assistance", "Agriculture, forestry and fishing", "Other industries"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#b3b2ab"]
          }
        }
      }
    }
  ]
};

vegaEmbed("#change-in-income", incomeSpec);