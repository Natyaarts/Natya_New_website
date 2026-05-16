import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'natya_backend.settings')
django.setup()

from core.models import ContactInfo

def seed_contact_info():
    if not ContactInfo.objects.exists():
        ContactInfo.objects.create(
            address="Natya Arts, SG Arcade, KT Gopalan Rd, Kottooli, Kozhikode, Kerala 673016",
            phone="+91 75598 61455",
            whatsapp="+91 75598 61455",
            email="info@natyaarts.com",
            twitter="https://twitter.com/natyaarts",
            instagram="https://instagram.com/natyaarts",
            facebook="https://facebook.com/natyaarts"
        )
        print("Successfully seeded ContactInfo singleton.")
    else:
        print("ContactInfo already exists.")

if __name__ == '__main__':
    seed_contact_info()
