from core.models import Feature, Stat

features_data = [
    {
        "title": "Structured Paths",
        "description": "Level-based curriculum and practice plans for steady progress.",
        "order": 1
    },
    {
        "title": "Caring Faculty",
        "description": "Experienced mentors with clear, regular feedback.",
        "order": 2
    },
    {
        "title": "Performance Ready",
        "description": "Stage exposure, assessments, and recordings to showcase growth.",
        "order": 3
    }
]

for f in features_data:
    Feature.objects.get_or_create(title=f["title"], defaults={"description": f["description"], "order": f["order"]})

stats_data = [
    {"value": "1000+", "label": "Happy Customers", "order": 1},
    {"value": "50", "label": "Faculty", "order": 2},
    {"value": "2020", "label": "Founded", "order": 3}
]

for s in stats_data:
    Stat.objects.get_or_create(value=s["value"], defaults={"label": s["label"], "order": s["order"]})

print("Seed features and stats done")
