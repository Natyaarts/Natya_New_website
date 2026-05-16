from rest_framework import viewsets, serializers, permissions
from .models import Testimonial, Partner, Founder, TeamMember, Feature, Stat, GalleryCategory, GalleryImage, JobOpening, Benefit, FAQ, JobApplication, CourseCategory, Course, ContactInfo, CallRequest

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True).order_by('created_at')
    serializer_class = TestimonialSerializer

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.filter(is_active=True).order_by('order', '-created_at')
    serializer_class = PartnerSerializer

class FounderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Founder
        fields = '__all__'

class FounderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Founder.objects.filter(is_active=True)
    serializer_class = FounderSerializer

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feature.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = FeatureSerializer

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'

class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = StatSerializer

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'

class GalleryCategorySerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = GalleryCategory
        fields = ['id', 'name', 'order', 'images']

class GalleryCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryCategory.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = GalleryCategorySerializer

class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryImage.objects.filter(is_active=True).order_by('order', '-created_at')
    serializer_class = GalleryImageSerializer

class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = '__all__'

class JobOpeningViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobOpening.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = JobOpeningSerializer

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = '__all__'

class BenefitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Benefit.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = BenefitSerializer

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = FAQSerializer

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all().order_by('-applied_at')
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.AllowAny]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseCategorySerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()

    class Meta:
        model = CourseCategory
        fields = ['id', 'name', 'order', 'courses']

    def get_courses(self, obj):
        active_courses = obj.courses.filter(is_active=True).order_by('order', '-created_at')
        return CourseSerializer(active_courses, many=True, context=self.context).data

class CourseCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseCategory.objects.filter(is_active=True).order_by('order', 'id')
    serializer_class = CourseCategorySerializer

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_active=True).order_by('order', '-created_at')
    serializer_class = CourseSerializer

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer

class CallRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallRequest
        fields = '__all__'

class CallRequestViewSet(viewsets.ModelViewSet):
    queryset = CallRequest.objects.all().order_by('-created_at')
    serializer_class = CallRequestSerializer
    permission_classes = [permissions.AllowAny]

