import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import JobOpening, Benefit, FAQ

benefits = [
    {"title": "Craft & mentoring", "description": "Weekly reviews, constructive feedback, and growth plans.", "order": 1},
    {"title": "Healthy rhythms", "description": "Respect for deep work and humane schedules.", "order": 2},
    {"title": "Learning stipend", "description": "Courses, books, performances — level up your art.", "order": 3},
    {"title": "Remote-friendly", "description": "Great work from anywhere, with periodic meetups.", "order": 4},
]

for b in benefits:
    Benefit.objects.get_or_create(title=b["title"], defaults={"description": b["description"], "order": b["order"]})

faqs = [
    {"question": "How do I apply?", "answer": "Use “Apply” on any listing or email careers@natyaarts.com with your portfolio/CV and a short note.", "order": 1},
    {"question": "Do you hire remotely?", "answer": "Yes — most roles are remote-first. Some teaching/production roles may require occasional on-site work.", "order": 2},
    {"question": "I don’t see a perfect role.", "answer": "Send an open application; we’ll reach out when there’s a fit.", "order": 3},
]

for f in faqs:
    FAQ.objects.get_or_create(question=f["question"], defaults={"answer": f["answer"], "order": f["order"]})

jobs = [
    {"title": "Senior Bharathanatyam Instructor", "department": "Academic", "job_type": "Full-time", "location": "Remote / Calicut"},
    {"title": "Video Editor & Motion Designer", "department": "Production", "job_type": "Contract", "location": "Calicut"},
    {"title": "Student Success Coordinator", "department": "Operations", "job_type": "Full-time", "location": "Remote"},
]

for j in jobs:
    JobOpening.objects.get_or_create(title=j["title"], defaults={"department": j["department"], "job_type": j["job_type"], "location": j["location"]})

print("Seed careers done")
