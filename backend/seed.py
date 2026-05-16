from core.models import Testimonial

data = [
    { "name": "Ananya S.", "location": "USA", "text": "Learning Bharatanatyam online seemed impossible until I found Natya. The structured curriculum and live feedback from verified tutors are absolutely incredible." },
    { "name": "David M.", "location": "UK", "text": "The Carnatic vocal teachers are extremely patient and highly qualified. The Natya app makes practicing along with recorded sessions so easy and convenient." },
    { "name": "Priya K.", "location": "Singapore", "text": "I've been a student for 2 years. Kalakshetra Anjali's guidance has transformed my understanding of classical dance completely." }
]

for item in data:
    Testimonial.objects.get_or_create(name=item["name"], defaults=item)

print("Seed done")
