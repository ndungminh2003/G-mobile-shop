import React from 'react';

const EncodedEmail = ({ email }) => {
  // Hàm để mã hóa email
  const encodeEmail = (email) => {
    const atIndex = email.indexOf('@'); // Tìm vị trí của ký tự "@"
    if (atIndex > 3) {
      // Mã hóa các ký tự từ vị trí thứ 3 đến trước ký tự "@"
      const encodedEmail =
        email.substring(0, 3) + email.substring(3, atIndex).replace(/./g, '*') + email.substring(atIndex);
      return encodedEmail;
    } else {
      return email; // Trả về email gốc nếu không đủ ký tự để mã hóa
    }
  };

  return <span>{encodeEmail(email)}</span>;
};

export default EncodedEmail;
