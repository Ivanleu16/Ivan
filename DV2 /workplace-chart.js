const workplaceSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 600,
  "height": 440,
  "title": {
    "text": "Work has changed differently in every industry",
    "subtitle": [
      "Each industry from 1994 (faint) to 2026 (solid). Bubble size is the number of jobs.",
      "Earnings are shown against the all-industry average. Sources: ABS Labour Account and Average Weekly Earnings."
    ]
  },
  "data": { "url": "data/workplace_change_hours_earnings.csv" },
  "transform": [
    { "calculate": "indexof(['Mining','Manufacturing','Health Care and Social Assistance'], datum.industry) >= 0 ? datum.industry : 'Other industries'", "as": "focus" },
    { "calculate": "datum.industry === 'Health Care and Social Assistance' ? 'Health care' : datum.industry", "as": "label" }
  ],
  "layer": [
    {
      "data": { "values": [{ "y": 100 }] },
      "mark": { "type": "rule", "color": "#c3c2b7", "strokeDash": [4, 4] },
      "encoding": {
        "y": { "field": "y", "type": "quantitative", "scale": { "zero": false, "domain": [40, 220] } }
      }
    },
    {
      "mark": { "type": "line", "strokeWidth": 2, "opacity": 0.6 },
      "encoding": {
        "x": { "field": "hours_per_week", "type": "quantitative", "scale": { "zero": false, "domain": [22, 44] }, "title": "Average hours worked per job each week" },
        "y": { "field": "earnings_vs_all_industries_pct", "type": "quantitative", "scale": { "zero": false, "domain": [40, 220] }, "title": "Weekly earnings (% of all-industry average)" },
        "detail": { "field": "industry" },
        "order": { "field": "period" },
        "color": {
          "field": "focus", "type": "nominal", "legend": null,
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health Care and Social Assistance", "Other industries"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#b3b2ab"]
          }
        }
      }
    },
    {
      "mark": { "type": "circle", "stroke": "#fcfcfb", "strokeWidth": 1 },
      "encoding": {
        "x": { "field": "hours_per_week", "type": "quantitative" },
        "y": { "field": "earnings_vs_all_industries_pct", "type": "quantitative" },
        "color": {
          "field": "focus", "type": "nominal", "legend": null,
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health Care and Social Assistance", "Other industries"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#b3b2ab"]
          }
        },
        "size": { "field": "filled_jobs_thousands", "type": "quantitative", "scale": { "range": [30, 1800] }, "legend": null },
        "opacity": { "condition": { "test": "datum.period === '1994'", "value": 0.3 }, "value": 0.9 },
        "tooltip": [
          { "field": "label", "title": "Industry" },
          { "field": "period", "title": "Year" },
          { "field": "hours_per_week", "title": "Hours per week" },
          { "field": "weekly_earnings", "title": "Weekly earnings ($)", "format": "," },
          { "field": "earnings_vs_all_industries_pct", "title": "% of average" },
          { "field": "filled_jobs_thousands", "title": "Jobs (thousands)", "format": "," }
        ]
      }
    },
    {
      "transform": [{ "filter": "datum.period === '2026' && datum.focus !== 'Other industries'" }],
      "mark": { "type": "text", "dx": 30, "align": "left", "fontWeight": "bold", "fontSize": 13 },
      "encoding": {
        "x": { "field": "hours_per_week", "type": "quantitative" },
        "y": { "field": "earnings_vs_all_industries_pct", "type": "quantitative" },
        "text": { "field": "label" },
        "color": {
          "field": "focus", "type": "nominal", "legend": null,
          "scale": {
            "domain": ["Manufacturing", "Mining", "Health Care and Social Assistance", "Other industries"],
            "range": ["#2a78d6", "#eb6834", "#1baf7a", "#b3b2ab"]
          }
        }
      }
    }
  ]
};

vegaEmbed("#workplace-chart", workplaceSpec);