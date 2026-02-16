import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Loader2 } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogsData } from '../data/blogs'; // Fallback
import { blogOperations } from '../lib/appwrite';


const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      // Try to fetch from Appwrite first
      const appwriteBlog = await blogOperations.getBlogBySlug(id);
      if (appwriteBlog) {
        setBlog({
          id: appwriteBlog.slug || appwriteBlog.$id,
          title: appwriteBlog.title,
          excerpt: appwriteBlog.excerpt,
          content: appwriteBlog.content,
          coverImage: appwriteBlog.coverImage,
          date: appwriteBlog.createdAt || appwriteBlog.$createdAt,
          readTime: appwriteBlog.readTime,
          tags: appwriteBlog.tags || [],
          author: appwriteBlog.author
        });
      } else {
        // Fallback to static data
        const staticBlog = blogsData.find(b => b.id === id);
        if (staticBlog) {
          setBlog(staticBlog);
        } else {
          setNotFound(true);
        }
      }
    } catch (error) {
      console.error('Error loading blog:', error);
      // Fallback to static data
      const staticBlog = blogsData.find(b => b.id === id);
      if (staticBlog) {
        setBlog(staticBlog);
      } else {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // If blog not found, redirect to blog list
  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 size={48} className="text-red-500 animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-red-400 hover:text-red-300 mb-10 transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-video rounded-2xl overflow-hidden mb-10 shadow-2xl border border-white/5 relative"
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 not-prose">
            <span className="flex items-center gap-2">
              <User size={18} />
              {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(blog.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {blog.readTime}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10 not-prose">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-red-400/70 bg-red-500/5 rounded-lg border border-red-500/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-10" />

          {/* Content */}
          <div 
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: blog.content
                .split('\n')
                .map(line => {
                  // Convert markdown-style headers
                  if (line.startsWith('## ')) {
                    return `<h2 class="text-3xl font-bold font-display text-white mt-14 mb-5">${line.substring(3)}</h2>`;
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 class="text-2xl font-bold font-display text-white mt-10 mb-4">${line.substring(4)}</h3>`;
                  }
                  // Convert code blocks
                  if (line.startsWith('```')) {
                    return line.replace('```', '<pre class="bg-[#0a0a0a] p-5 rounded-xl overflow-x-auto my-6 border border-white/5"><code>').replace('```', '</code></pre>');
                  }
                  // Convert inline code
                  const codeRegex = /`([^`]+)`/g;
                  line = line.replace(codeRegex, '<code class="bg-[#0a0a0a] px-2 py-1 rounded-lg text-red-400 border border-white/5">$1</code>');
                  
                  // Regular paragraphs
                  if (line.trim() && !line.startsWith('<')) {
                    return `<p class="mb-5 text-gray-400">${line}</p>`;
                  }
                  return line;
                })
                .join('\n')
            }}
          />
        </motion.article>

        {/* Back to Blog Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg shadow-red-500/10"
            >
              <ArrowLeft size={20} />
              View All Posts
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;
