// Cloudflare D1 için kategoriler API

export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    // D1 database connection
    const db = env.D1_DATABASE;
    
    // Tüm kategorileri getir
    const categories = await db.prepare(`
      SELECT DISTINCT category, COUNT(*) as count 
      FROM blogs 
      WHERE published = 1 
      GROUP BY category 
      ORDER BY count DESC
    `).all();
    
    return new Response(JSON.stringify({
      success: true,
      data: categories.map(cat => cat.category)
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Categories D1 API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Sunucu hatası',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
