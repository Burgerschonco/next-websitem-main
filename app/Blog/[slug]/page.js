'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaEye, FaTag, FaArrowLeft, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const BlogDetail = () => {
  const { theme } = useTheme();
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs-d1?slug=${params.slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setBlog(data.data);
        } else {
          setError('Blog bulunamadı');
        }
      } catch (error) {
        console.error('Blog alınırken hata:', error);
        setError('Blog yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold my-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold my-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold my-8">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p class="my-4">')
      .replace(/^(.*)$/gim, '<p class="my-4">$1</p>')
      .replace(/<p class="my-4"><\/p>/g, '')
      .replace(/<p class="my-4"><h/g, '<h')
      .replace(/<\/h><\/p>/g, '</h>')
      .replace(/<p class="my-4">(#+) (.*$)/gim, '$1 $2');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2B2B2B]"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
            Blog Bulunamadı
          </h1>
          <p className="text-lg mb-8" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
            Aradığınız blog yazısı bulunamadı.
          </p>
          <Link 
            href="/blog-d1"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B2B2B] text-white hover:bg-[#1A1A1A] transition-all duration-300"
          >
            <FaArrowLeft />
            Bloglara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/blog-d1"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
              color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
            }}
          >
            <FaArrowLeft />
            Bloglara Dön
          </Link>
        </motion.div>

        {/* Blog Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Cover Image */}
          {blog.cover_image && (
            <motion.div 
              className="h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            {/* Category */}
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(43, 43, 43, 0.1)',
                color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
              }}
            >
              {blog.category}
            </span>

            {/* Date */}
            <span className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              <FaCalendarAlt />
              {formatDate(blog.created_at)}
            </span>

            {/* Reading Time */}
            <span className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              <FaClock />
              {blog.reading_time} dakika okuma süresi
            </span>

            {/* Views */}
            <span className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              <FaEye />
              {blog.views} görüntülenme
            </span>
          </div>

          {/* Tags */}
          {blog.tags && JSON.parse(blog.tags || '[]').length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {JSON.parse(blog.tags).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(43, 43, 43, 0.05)',
                    color: theme === 'dark' ? '#B8B8B8' : '#666'
                  }}
                >
                  <FaTag className="text-xs" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none"
          style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}
          dangerouslySetInnerHTML={{ 
            __html: formatContent(blog.content) 
          }}
        />

        {/* Edit Button (Admin için) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t"
          style={{ borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6' }}
        >
          <Link 
            href={`/admin?edit=${blog.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
              color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
            }}
          >
            <FaEdit />
            Yazıyı Düzenle
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
