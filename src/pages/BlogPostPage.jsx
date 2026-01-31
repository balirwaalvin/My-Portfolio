import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogsData } from '../data/blogs';

const BlogPostPage = () => {
  const { id } = useParams();
  const blog = blogsData.find(b => b.id === id);

  // If blog not found, redirect to blog list
  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl"
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 not-prose">
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
          <div className="flex flex-wrap gap-2 mb-8 not-prose">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div 
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: blog.content
                .split('\n')
                .map(line => {
                  // Convert markdown-style headers
                  if (line.startsWith('## ')) {
                    return `<h2 class="text-3xl font-bold text-white mt-12 mb-4">${line.substring(3)}</h2>`;
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 class="text-2xl font-bold text-white mt-8 mb-3">${line.substring(4)}</h3>`;
                  }
                  // Convert code blocks
                  if (line.startsWith('```')) {
                    return line.replace('```', '<pre class="bg-slate-900 p-4 rounded-lg overflow-x-auto my-6"><code>').replace('```', '</code></pre>');
                  }
                  // Convert inline code
                  const codeRegex = /`([^`]+)`/g;
                  line = line.replace(codeRegex, '<code class="bg-slate-900 px-2 py-1 rounded text-indigo-300">$1</code>');
                  
                  // Regular paragraphs
                  if (line.trim() && !line.startsWith('<')) {
                    return `<p class="mb-4">${line}</p>`;
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
          className="mt-16 pt-8 border-t border-slate-800"
        >
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            View All Posts
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;
