import { MetadataRoute } from 'next';
import { API_URL } from '@/config/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://natyaarts.com';

  // Core static routes
  const staticRoutes = [
    '',
    '/about',
    '/courses',
    '/gallery',
    '/career',
    '/contact',
    '/terms',
    '/privacy',
    '/refund',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('/terms') || route.includes('/privacy') || route.includes('/refund') ? 0.5 : 0.8,
  }));

  // Fetch dynamic course routes from Django API
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/courses/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const courses = await res.json();
      if (Array.isArray(courses)) {
        dynamicRoutes = courses.map((course: any) => ({
          url: `${baseUrl}/courses/${course.slug}`,
          lastModified: new Date(course.updated_at || new Date()),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
      }
    }
  } catch (err) {
    console.error('Error fetching courses for sitemap:', err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
