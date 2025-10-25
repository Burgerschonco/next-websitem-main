'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaTimes, FaBlog, FaList } from 'react-icons/fa';
import Link from 'next/link';

const AdminPanel = () => {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    tags: '',
    published: false,
    readingTime: 5
  });

  // Blogları getir
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Bloglar alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingBlog 
        ? `/api/admin/blogs/${editingBlog._id}`
        : '/api/admin/blogs';
      
      const method = editingBlog ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowForm(false);
        setEditingBlog(null);
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          coverImage: '',
          category: '',
          tags: '',
          published: false,
          readingTime: 5
        });
        fetchBlogs();
        alert(editingBlog ? 'Blog güncellendi!' : 'Blog oluşturuldu!');
      } else {
        alert(data.message || 'Hata oluştu');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu');
    }
  };

  // Blog sil
  const handleDelete = async (id) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return;
    
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchBlogs();
        alert('Blog silindi!');
      } else {
        alert(data.message || 'Hata oluştu');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu');
    }
  };

  // Düzenle
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage || '',
      category: blog.category,
      tags: blog.tags.join(', '),
      published: blog.published,
      readingTime: blog.readingTime || 5
    });
    setShowForm(true);
  };

  // Form reset
  const resetForm = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      category: '',
      tags: '',
      published: false,
      readingTime: 5
    });
    setShowForm(false);
  };

  if (loading) {
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
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
              Admin Panel
            </h1>
            <p style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              Blog yazılarını yönet
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/blog"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
              }}
            >
              <FaList />
              Blogları Gör
            </Link>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B2B2B] text-white hover:bg-[#1A1A1A] transition-all duration-300 hover:scale-105"
            >
              <FaPlus />
              Yeni Blog
            </button>
          </div>
        </motion.div>

        {/* Blog List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-6 rounded-2xl border"
              style={{ 
                backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
                    {blog.title}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded" style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(43, 43, 43, 0.1)',
                      color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
                    }}>
                      {blog.category}
                    </span>
                    <span className={`px-2 py-1 rounded ${blog.published ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                      {blog.published ? 'Yayında' : 'Taslak'}
                    </span>
                    <span style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }}>
                      {blog.meta.views} görüntülenme
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                      color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                    }}
                    title="Düzenle"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110 text-red-500"
                    style={{
                      backgroundColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
                    }}
                    title="Sil"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl"
              style={{ backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
                  {editingBlog ? 'Blog Düzenle' : 'Yeni Blog'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                    color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                    Başlık
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{
                      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                      borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                      color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                    Özet
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{
                      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                      borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                      color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                    İçerik
                  </label>
                  <textarea
                    required
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{
                      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                      borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                      color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                      Kategori
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                        borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                        color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                      Etiketler (virgülle ayırın)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="React, Next.js, JavaScript"
                      className="w-full px-4 py-3 rounded-xl border-2"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                        borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                        color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                      Kapak Resmi URL
                    </label>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                        borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                        color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                      Okuma Süresi (dakika)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.readingTime}
                      onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) || 5 })}
                      className="w-full px-4 py-3 rounded-xl border-2"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                        borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                        color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <label htmlFor="published" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                    Yayınla
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B2B2B] text-white hover:bg-[#1A1A1A] transition-all duration-300"
                  >
                    <FaSave />
                    {editingBlog ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                      color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                    }}
                  >
                    İptal
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
