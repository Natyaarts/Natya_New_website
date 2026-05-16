import os
import django
import shutil

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'natya_backend.settings')
django.setup()

from core.models import CourseCategory, Course

def seed_courses():
    # Ensure courses media directory exists
    os.makedirs('media/courses', exist_ok=True)
    
    # Copy sample image if available
    sample_img = 'media/gallery/ChatGPT_Image_May_16_2026_04_20_13_PM.png'
    dest_img = 'media/courses/sample_course.png'
    if os.path.exists(sample_img):
        shutil.copy(sample_img, dest_img)
    else:
        # Fallback to frontend hero if needed
        hero_img = '../frontend/public/img/hero.png'
        if os.path.exists(hero_img):
            shutil.copy(hero_img, dest_img)

    categories_data = [
        {
            "name": "Classical Dance",
            "order": 1,
            "courses": [
                {
                    "title": "Bharatanatyam Foundation & Advanced",
                    "description": "Master the intricate footwork, mudras, and abhinaya of Bharatanatyam under the guidance of seasoned gurus. Ideal for both beginners and aspiring performers.",
                    "button_text": "Enroll Now",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Bharatanatyam",
                    "order": 1
                },
                {
                    "title": "Kathak Repertoire & Rhythm",
                    "description": "Immerse yourself in the elegant spins, rapid chakkars, and expressive storytelling of Kathak. Learn traditional compositions and rhythmic mastery.",
                    "button_text": "Enroll Now",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Kathak",
                    "order": 2
                },
                {
                    "title": "Mohiniyattam Grace & Lyrical Flow",
                    "description": "Experience the enchanting, swaying movements of Kerala's classical dance form. Focuses on gentle posture, eye movements, and subtle expressions.",
                    "button_text": "Learn More",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Mohiniyattam",
                    "order": 3
                }
            ]
        },
        {
            "name": "Vocals & Music",
            "order": 2,
            "courses": [
                {
                    "title": "Carnatic Vocal Mastery",
                    "description": "A structured curriculum covering Sarali Varisais to advanced Kritis. Develop pitch perfection, raga lakshana, and manodharma singing.",
                    "button_text": "Enroll Now",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Carnatic%20Vocals",
                    "order": 1
                },
                {
                    "title": "Hindustani Classical Singing",
                    "description": "Explore the rich tradition of khayal, dhrupad, and tarana. Learn voice modulation, breath control, and deep raga exploration.",
                    "button_text": "Enroll Now",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Hindustani%20Vocals",
                    "order": 2
                }
            ]
        },
        {
            "name": "Instrumental & Percussion",
            "order": 3,
            "courses": [
                {
                    "title": "Mridangam & Tala System",
                    "description": "Learn the foundational strokes, complex solkattus, and accompaniment techniques for Carnatic concerts from master percussionists.",
                    "button_text": "Enroll Now",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Mridangam",
                    "order": 1
                },
                {
                    "title": "Violin Classical & Fusion",
                    "description": "Master bowing techniques, fingering precision, and raga phrasing on the violin. Suitable for solo performance and accompaniment.",
                    "button_text": "Enroll Now",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Violin",
                    "order": 2
                }
            ]
        },
        {
            "name": "Workshops & Online",
            "order": 4,
            "courses": [
                {
                    "title": "Abhinaya & Expression Masterclass",
                    "description": "An intensive weekend workshop focusing entirely on facial expressions, emotional depth, and character portrayal in classical dance.",
                    "button_text": "Register for Workshop",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Abhinaya%20Workshop",
                    "order": 1
                },
                {
                    "title": "Global Online One-on-One Mentorship",
                    "description": "Personalized digital sessions tailored to your pace and goals. High-quality audio/video feedback and flexible scheduling for international students.",
                    "button_text": "Book Demo Session",
                    "link": "https://wa.me/918113000000?text=I%20am%20interested%20in%20Online%20Mentorship",
                    "order": 2
                }
            ]
        }
    ]

    print("Clearing existing course categories...")
    CourseCategory.objects.all().delete()

    for cat_data in categories_data:
        cat = CourseCategory.objects.create(name=cat_data["name"], order=cat_data["order"])
        print(f"Created category: {cat.name}")
        for c_data in cat_data["courses"]:
            course = Course.objects.create(
                category=cat,
                title=c_data["title"],
                description=c_data["description"],
                button_text=c_data["button_text"],
                link=c_data["link"],
                order=c_data["order"],
                image='courses/sample_course.png'
            )
            print(f"  Created course: {course.title}")

if __name__ == '__main__':
    seed_courses()
    print("Courses seeded successfully!")
