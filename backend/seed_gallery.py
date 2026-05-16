import os
import django
import shutil
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import GalleryCategory, GalleryImage

categories = [
    "Performances",
    "Workshops",
    "Behind the Scenes",
    "Student Highlights"
]

for order, cat_name in enumerate(categories, 1):
    GalleryCategory.objects.get_or_create(name=cat_name, defaults={'order': order})

print("Seed gallery categories done")
