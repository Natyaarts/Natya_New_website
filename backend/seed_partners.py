from core.models import Partner

data = [
    { "name": "PARTNER", "subtitle": "ONE" },
    { "name": "GLOBAL", "subtitle": "ARTS" },
    { "name": "CULTURE", "subtitle": "HUB" }
]

for i, item in enumerate(data):
    Partner.objects.get_or_create(name=item["name"], defaults={"subtitle": item["subtitle"], "order": i})

print("Seed partners done")
