from core.models import Founder, TeamMember

# Seed Founders
founders_data = [
    {
        "name": "Kalamandalam Sivaprasad",
        "position": "Founder",
        "message": "Natya Learning, a leading Art startup based in India has been a pioneer in the realm of performing arts education by transcending geographical boundaries.",
        "order": 1
    },
    {
        "name": "Kalakshetra Anjali",
        "position": "Co-Founder",
        "message": "Moving forward, Natya will remain dedicated to championing the vibrant heritage of Indian art, fostering unity and creativity while bridging communities and cultures across the world.",
        "order": 2
    }
]

for f in founders_data:
    Founder.objects.get_or_create(name=f["name"], defaults={"position": f["position"], "message": f["message"], "order": f["order"]})

# Seed Team Members
team_data = [
    { "name": "Team Member 1", "position": "Senior Instructor", "order": 1 },
    { "name": "Team Member 2", "position": "Head of Operations", "order": 2 },
    { "name": "Team Member 3", "position": "Student Coordinator", "order": 3 }
]

for t in team_data:
    TeamMember.objects.get_or_create(name=t["name"], defaults={"position": t["position"], "order": t["order"]})

print("Seed founders and team done")
