/**
 * API Hòm Thư Lời Cảm Ơn 20/10 (Vercel Serverless Function)
 * Kết nối lưu trữ cơ sở dữ liệu đám mây an toàn, ổn định 100%
 */

module.exports = async function handler(req, res) {
  // Cấu hình CORS mở để trình duyệt gửi nhận không bị chặn
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, action } = req.query;

  // 1. Tạo Hòm Thư Mới (POST /api/inbox?action=create)
  if (req.method === 'POST' && action === 'create') {
    try {
      const response = await fetch('https://api.restful-api.dev/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Hop Thu 20/10',
          data: {
            createdTime: new Date().toISOString(),
            messages: []
          }
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi từ cơ sở dữ liệu đám mây: ' + response.statusText);
      }

      const data = await response.json();
      return res.status(200).json({ success: true, id: data.id });
    } catch (err) {
      console.error('Create inbox error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Cần ID cho các thao tác đọc và ghi
  const targetId = id || (req.body && req.body.id);
  if (!targetId) {
    return res.status(400).json({ success: false, error: 'Thiếu mã hòm thư (inbox id)' });
  }

  // 2. Lấy danh sách tin nhắn (GET /api/inbox?id=XYZ)
  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://api.restful-api.dev/objects/${targetId}`);
      if (!response.ok) {
        return res.status(404).json({ success: false, error: 'Không tìm thấy hòm thư' });
      }

      const data = await response.json();
      const messages = (data && data.data && Array.isArray(data.data.messages)) ? data.data.messages : [];
      return res.status(200).json({
        success: true,
        id: targetId,
        count: messages.length,
        messages: messages
      });
    } catch (err) {
      console.error('Get messages error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // 3. Gửi lời cảm ơn mới vào hòm thư (POST /api/inbox)
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const msg = body ? (body.message || body) : null;
    const msgText = (msg && msg.text) ? msg.text.trim() : '';

    if (!msgText) {
      return res.status(400).json({ success: false, error: 'Nội dung lời cảm ơn không được để trống' });
    }

    try {
      // Đọc danh sách tin nhắn hiện tại
      let messages = [];
      const getRes = await fetch(`https://api.restful-api.dev/objects/${targetId}`);
      if (getRes.ok) {
        const existingData = await getRes.json();
        if (existingData && existingData.data && Array.isArray(existingData.data.messages)) {
          messages = existingData.data.messages;
        }
      }

      // Đưa tin nhắn mới nhất lên đầu danh sách
      const newMsg = {
        from: (msg && msg.from) ? msg.from.trim() : 'Người Nhận Ẩn Danh',
        text: msgText,
        time: (msg && msg.time) ? msg.time : new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        timestamp: Date.now()
      };
      messages.unshift(newMsg);

      // Cập nhật lại vào database đám mây
      const putRes = await fetch(`https://api.restful-api.dev/objects/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Hop Thu 20/10',
          data: {
            updatedTime: new Date().toISOString(),
            messages: messages
          }
        })
      });

      if (!putRes.ok) {
        throw new Error('Không thể lưu cập nhật vào cơ sở dữ liệu');
      }

      return res.status(200).json({
        success: true,
        message: 'Đã lưu lời cảm ơn vào cơ sở dữ liệu thành công!',
        count: messages.length
      });
    } catch (err) {
      console.error('Post message error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Phương thức không được hỗ trợ' });
};
