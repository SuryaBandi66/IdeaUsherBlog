# 📌 Idea Usher Blog API Documentation

## 🌐 Base URL

http://your-load-balancer/api

### 1️⃣ Create a Post (Upload Image to S3)

**POST** `/api/posts`

- **Request Body (JSON)**

```json
{
  "title": "My First Post",
  "description": "This is my first blog post",
  "tags": ["technology", "blog"]
}

{
  "id": "12345",
  "title": "My First Post",
  "description": "This is my first blog post",
  "tags": ["technology", "blog"],
  "image": "https://s3.amazonaws.com/my-bucket/image123.jpg",
  "createdAt": "2025-02-28T12:00:00Z"
}
```
