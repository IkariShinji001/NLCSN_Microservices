function generateCorrelationId() {
  // Tạo một chuỗi ngẫu nhiên dựa trên thời gian và một số ngẫu nhiên
  return Date.now().toString() + Math.random().toString();
}

module.exports = generateCorrelationId