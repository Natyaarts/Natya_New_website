from django.db import models

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    text = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.location}"

class Partner(models.Model):
    name = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100, blank=True)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.name

class Founder(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.name

class Feature(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.ImageField(upload_to='features/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title

class Stat(models.Model):
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.value} {self.label}"

class GalleryCategory(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Gallery Categories'

    def __str__(self):
        return self.name

class GalleryImage(models.Model):
    category = models.ForeignKey(GalleryCategory, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery/')
    caption = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.category.name} - {self.id}"

class JobOpening(models.Model):
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    job_type = models.CharField(max_length=50)
    location = models.CharField(max_length=100, default='Calicut')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Benefit(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.question

class JobApplication(models.Model):
    job = models.ForeignKey(JobOpening, related_name='applications', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    cv = models.FileField(upload_to='cvs/')
    cover_letter = models.TextField(blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.name} - {self.job.title if self.job else 'Open Application'}"

class CourseCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Course Categories'

    def __str__(self):
        return self.name

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, related_name='courses', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='courses/')
    description = models.TextField()
    button_text = models.CharField(max_length=50, default='Enroll Now')
    link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

class ContactInfo(models.Model):
    address = models.TextField(default="Natya Arts, SG Arcade, KT Gopalan Rd, Kottooli, Kozhikode, Kerala 673016")
    phone = models.CharField(max_length=50, default="+91 75598 61455")
    whatsapp = models.CharField(max_length=50, default="+91 75598 61455")
    email = models.EmailField(default="info@natyaarts.com")
    twitter = models.URLField(blank=True, default="https://twitter.com")
    instagram = models.URLField(blank=True, default="https://instagram.com")
    facebook = models.URLField(blank=True, default="https://facebook.com")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Info & Settings"
        verbose_name_plural = "Contact Info & Settings"

    def __str__(self):
        return "Natya Arts Contact Info (Singleton)"

class CallRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Contacted', 'Contacted'),
        ('Closed', 'Closed'),
    ]
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    preferred_time = models.CharField(max_length=50, blank=True, null=True)
    interest = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Call Back Request"
        verbose_name_plural = "Call Back Requests"

    def __str__(self):
        return f"{self.name} ({self.mobile}) - {self.status}"

