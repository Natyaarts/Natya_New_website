from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TestimonialViewSet, PartnerViewSet, FounderViewSet, TeamMemberViewSet, FeatureViewSet, StatViewSet, GalleryCategoryViewSet, GalleryImageViewSet, JobOpeningViewSet, BenefitViewSet, FAQViewSet, JobApplicationViewSet, CourseCategoryViewSet, CourseViewSet, ContactInfoViewSet, CallRequestViewSet

router = DefaultRouter()
router.register(r'testimonials', TestimonialViewSet)
router.register(r'partners', PartnerViewSet)
router.register(r'founders', FounderViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'features', FeatureViewSet)
router.register(r'stats', StatViewSet)
router.register(r'gallery-categories', GalleryCategoryViewSet)
router.register(r'gallery-images', GalleryImageViewSet)
router.register(r'jobs', JobOpeningViewSet)
router.register(r'benefits', BenefitViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'job-applications', JobApplicationViewSet)
router.register(r'course-categories', CourseCategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'contact-info', ContactInfoViewSet)
router.register(r'call-requests', CallRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
