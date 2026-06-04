import { Metadata } from "next";
import { notFound } from "next/navigation";
import { API_URL } from "@/config/api";
import { slugify } from "@/utils/slugify";
import CourseDetailClient from "./CourseDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourseBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/course-categories/`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const categories = await res.json();
    if (!Array.isArray(categories)) return null;
    
    for (const cat of categories) {
      const courses = cat.courses || [];
      for (const course of courses) {
        if (slugify(course.title) === slug) {
          return {
            ...course,
            category_name: cat.name
          };
        }
      }
    }
  } catch (err) {
    console.error("Error fetching course by slug:", err);
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  const imageUrl = course.image 
    ? (course.image.startsWith("http") ? course.image : `${API_URL.replace("/api", "")}${course.image}`)
    : "https://natyaarts.com/img/hero.png";

  return {
    title: `${course.title} | Classical Arts Course`,
    description: course.description.substring(0, 160),
    keywords: `${course.title}, ${course.category_name}, Natya, Learn ${course.title} online`,
    alternates: {
      canonical: `/courses/${slug}`,
    },
    openGraph: {
      title: `${course.title} | Natya Arts Academy`,
      description: course.description.substring(0, 160),
      url: `https://natyaarts.com/courses/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${course.title} course preview`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Natya Arts Academy`,
      description: course.description.substring(0, 160),
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/courses/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const courses = await res.json();
      if (Array.isArray(courses)) {
        return courses.map((course: any) => ({
          slug: slugify(course.title),
        }));
      }
    }
  } catch (err) {
    console.error("Error generating static params for courses:", err);
  }
  return [];
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
