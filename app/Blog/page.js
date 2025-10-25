'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaClock, FaEye, FaTag, FaFilter, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const BlogPage = () => {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Blogları getir (D1 API)
  const fetchBlogs = async (page = 1, category = '', search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        ...(category && { category }),
        ...(search && { search })
      });

      const response = await fetch(`/api/blogs-d1?${params}`);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data.blogs);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Bloglar alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Kategorileri getir (D1 API)
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories-d1');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Kategoriler alınırken hata:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, selectedCategory, searchTerm);
  }, [currentPage, selectedCategory, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs(1, selectedCategory, searchTerm);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2B2B2B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
            Blog (Cloudflare D1)
          </h1>
          <p className="text-lg" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
            Teknoloji, geliştirme ve daha fazlası hakkındaki yazılarım (Edge Database)
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bloglarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 transition-all duration-300"
                  style={{
                    backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                    color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                  }}
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }} />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }} />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                  color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                }}
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div 
                className="h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border overflow-hidden"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
                }}
              >
                {/* Cover Image */}
                {blog.cover_image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category */}
                  <div className="mb-3">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(43, 43, 43, 0.1)',
                        color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
                      }}
                    >
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    <Link 
                      href={`/blog-d1/${blog.slug}`}
                      className="hover:underline transition-colors"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p 
                    className="text-sm mb-4 line-clamp-3 leading-relaxed"
                    style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}
                  >
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  {blog.tags && JSON.parse(blog.tags || '[]').length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {JSON.parse(blog.tags).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs"
                          style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }}
                        >
                          <FaTag className="text-xs" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs" style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }}>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {formatDate(blog.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {blog.reading_time} dk
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <FaEye />
                      {blog.views}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.total > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2"
          >
            <button
              onClick={() => handlePageChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
              }}
            >
              Önceki
            </button>

            <div className="flex gap-1">
              {Array.from({ length: pagination.total }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                    page === pagination.current
                      ? 'bg-[#2B2B2B] text-white'
                      : ''
                  }`}
                  style={{
                    backgroundColor: page === pagination.current 
                      ? '#2B2B2B' 
                      : theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                    color: page === pagination.current 
                      ? '#FFFFFF' 
                      : theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(pagination.current + 1)}
              disabled={pagination.current === pagination.total}
              className="px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
              }}
            >
              Sonraki
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              Henüz blog yazısı bulunmuyor.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
