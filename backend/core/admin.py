from django.contrib import admin
from .models import Testimonial, Partner, Founder, TeamMember, Feature, Stat, GalleryCategory, GalleryImage, JobOpening, Benefit, FAQ, JobApplication, CourseCategory, Course, ContactInfo, CallRequest

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'location', 'text')

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'subtitle', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name', 'subtitle')
    list_editable = ('order', 'is_active')

@admin.register(Founder)
class FounderAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name', 'position')
    list_editable = ('order', 'is_active')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name', 'position')
    list_editable = ('order', 'is_active')

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    list_editable = ('order', 'is_active')

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('value', 'label', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('value', 'label')
    list_editable = ('order', 'is_active')

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1

@admin.register(GalleryCategory)
class GalleryCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name',)
    list_editable = ('order', 'is_active')
    inlines = [GalleryImageInline]

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'caption', 'is_active', 'order')
    list_filter = ('category', 'is_active')
    search_fields = ('caption', 'category__name')
    list_editable = ('order', 'is_active')

@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'job_type', 'location', 'is_active', 'created_at')
    list_filter = ('department', 'job_type', 'is_active')
    search_fields = ('title', 'department', 'location')
    list_editable = ('is_active',)

@admin.register(Benefit)
class BenefitAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    list_editable = ('order', 'is_active')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('question', 'answer')
    list_editable = ('order', 'is_active')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'job', 'email', 'mobile', 'applied_at')
    list_filter = ('job', 'applied_at')
    search_fields = ('name', 'email', 'mobile', 'cover_letter')
    readonly_fields = ('applied_at',)

class CourseInline(admin.TabularInline):
    model = Course
    extra = 1
    fields = ('title', 'image', 'description', 'button_text', 'link', 'is_active', 'order')

@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    inlines = [CourseInline]

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'button_text', 'link', 'is_active', 'order')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')
    list_editable = ('is_active', 'order')

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('address', 'phone', 'email', 'updated_at')

@admin.register(CallRequest)
class CallRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile', 'email', 'preferred_time', 'interest', 'status', 'created_at')
    list_filter = ('status', 'preferred_time', 'created_at')
    search_fields = ('name', 'mobile', 'email', 'interest', 'message')
    list_editable = ('status',)
    readonly_fields = ('created_at',)

