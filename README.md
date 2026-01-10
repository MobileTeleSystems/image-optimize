# 🖼️ Image Optimize

**High-performance microservice for on-the-fly image optimization, resizing, and format conversion**

[![Docker Image](https://img.shields.io/docker/v/mtsrus/image-optimize?label=Docker&logo=docker&sort=semver)](https://hub.docker.com/r/mtsrus/image-optimize)
[![Docker Pulls](https://img.shields.io/docker/pulls/mtsrus/image-optimize?logo=docker)](https://hub.docker.com/r/mtsrus/image-optimize)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/042786e7f0304d1ea29d83f8c1522a55)](https://www.codacy.com/gh/MobileTeleSystems/image-optimize/dashboard)
[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

[Quick Start](#-quick-start) •
[API Reference](#-api-reference) •
[Configuration](#%EF%B8%8F-configuration) •
[Deployment](#-deployment) •
[Contributing](#-contributing)

---

## 📋 Overview

**Image Optimize** is a lightweight, production-ready microservice that optimizes images dynamically. Built with [NestJS](https://nestjs.com/) and powered by [Sharp](https://sharp.pixelplumbing.com/), it delivers exceptional performance for modern web applications.

### Why Image Optimize?

Optimizing images is critical for web performance — reducing page load times, saving bandwidth, and improving SEO rankings. This microservice handles all optimization on-the-fly, requiring no pre-processing or storage of optimized variants.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **Dynamic Resizing** | Resize images to any width, perfect for responsive designs |
| 🗜️ **Smart Compression** | Reduce file sizes with configurable quality settings (1-100) |
| 🎨 **Modern Formats** | Convert to WebP, AVIF, JPEG, or PNG on demand |
| ⚡ **High Performance** | Average processing time ~200ms per image |
| 📊 **Prometheus Metrics** | Built-in `/metrics` endpoint for monitoring |
| 🔐 **Security Controls** | Allowlist for sources, size restrictions, Basic Auth support |
| 🐳 **Docker Ready** | Production-optimized container image |

---

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Pull and run the latest version
docker run -d --name image-optimize -p 3000:3000 mtsrus/image-optimize
```

### Test the Service

Open in your browser or use curl:

```bash
curl "http://localhost:3000/optimize?src=https://example.com/image.png&size=800&format=webp"
```

### Example Request

```
http://localhost:3000/optimize?src=https://example.com/photo.jpg&size=1200&format=avif&quality=85
```

---

## 📖 API Reference

### `GET /optimize`

Optimizes and returns an image based on the provided parameters.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `src` | string | ✅ | — | URL-encoded source image URL |
| `size` | integer | ✅ | — | Target width in pixels |
| `format` | string | ✅ | — | Output format: `jpeg`, `png`, `webp`, `avif` |
| `quality` | integer | ❌ | format default | Compression quality (1-100) |

#### Response

- **Success (200)**: Returns the optimized image with appropriate `Content-Type` header
- **Error (400)**: Returns JSON with error details

#### Example

```bash
# Convert to WebP with 80% quality, resized to 1920px width
curl -o optimized.webp \
  "http://localhost:3000/optimize?src=https%3A%2F%2Fexample.com%2Fimage.png&size=1920&format=webp&quality=80"
```

### `GET /metrics`

Returns Prometheus-compatible metrics for monitoring.

```bash
curl http://localhost:3000/metrics
```

---

## ⚙️ Configuration

Configure the service using environment variables:

### Core Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP server port |
| `SHARP_CONCURRENCY` | `0` | libvips thread count (`0` = auto-detect CPU cores) |

### Security Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `ALLOW_SIZES` | `100-1920` | Allowed output sizes (comma-separated values or ranges) |
| `ALLOW_SOURCES` | `*` | Allowed source URLs (URL-encoded, comma-separated) |
| `BASIC_AUTHS` | — | Basic auth credentials for sources (see format below) |

#### ALLOW_SIZES Examples

```bash
# Allow specific sizes only
-e ALLOW_SIZES="320,640,1024,1920"

# Allow a range
-e ALLOW_SIZES="100-2000"

# Mix of specific values and ranges
-e ALLOW_SIZES="320,640,1024-1920"
```

#### ALLOW_SOURCES Examples

```bash
# Allow images only from specific domains
-e ALLOW_SOURCES="https%3A%2F%2Fcdn.example.com%2F,https%3A%2F%2Fimages.example.org%2F"
```

#### BASIC_AUTHS Format

For sources requiring authentication:

```bash
# Format: encodeURIComponent(url):encodeURIComponent(login):encodeURIComponent(password)
-e BASIC_AUTHS="https%3A%2F%2Fsecure.example.com%2F:admin:secret123"
```

---

## 🐳 Deployment

### Docker Compose

```yaml
services:
  image-optimize:
    image: mtsrus/image-optimize:latest
    restart: always
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - ALLOW_SIZES=320,640,1024,1280,1920
      - ALLOW_SOURCES=https%3A%2F%2Fcdn.yoursite.com%2F
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/metrics"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: image-optimize
spec:
  replicas: 3
  selector:
    matchLabels:
      app: image-optimize
  template:
    metadata:
      labels:
        app: image-optimize
    spec:
      containers:
        - name: image-optimize
          image: mtsrus/image-optimize:latest
          ports:
            - containerPort: 3000
          env:
            - name: ALLOW_SIZES
              value: "320,640,1024,1280,1920"
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "1000m"
          livenessProbe:
            httpGet:
              path: /metrics
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: image-optimize
spec:
  selector:
    app: image-optimize
  ports:
    - port: 80
      targetPort: 3000
```

### Production Recommendations

- **Scaling**: Run multiple replicas behind a load balancer
- **Caching**: Use a CDN or reverse proxy (nginx, Varnish) to cache optimized images
- **Memory**: Allocate at least 256MB RAM per instance
- **Monitoring**: Scrape `/metrics` endpoint with Prometheus

---

## 🧩 Frontend Integration

### React Component

Use our official React component for seamless integration:

```bash
npm install @mts/image-optimize-react
```

```jsx
import { OptimizedImage } from '@mts/image-optimize-react';

function App() {
  return (
    <OptimizedImage
      src="https://cdn.example.com/photo.jpg"
      optimizerUrl="https://your-optimizer.com/optimize"
      alt="Optimized photo"
    />
  );
}
```

👉 [image-optimize-react on GitHub](https://github.com/MobileTeleSystems/image-optimize-react)

---

## 🛠️ Development

### Prerequisites

- Node.js 24+
- npm 10+

### Local Setup

```bash
# Clone the repository
git clone https://github.com/MobileTeleSystems/image-optimize.git
cd image-optimize

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Build for production
npm run build
```

### Project Structure

```
src/
├── controllers/
│   ├── optimize-controller/   # Main optimization endpoint
│   └── metrics/               # Prometheus metrics endpoint
├── services/
│   ├── optimize.service.ts    # Image processing logic (Sharp)
│   ├── img-loader.service.ts  # Remote image fetching
│   └── allow.service.ts       # Security validations
├── enums/
│   └── formats.ts             # Supported output formats
└── main.ts                    # Application entry point
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- [Docker Hub](https://hub.docker.com/r/mtsrus/image-optimize)
- [GitHub Repository](https://github.com/MobileTeleSystems/image-optimize)
- [React Component](https://github.com/MobileTeleSystems/image-optimize-react)
- [Report a Bug](https://github.com/MobileTeleSystems/image-optimize/issues)
- [Security Policy](SECURITY.md)

---

**Made with ❤️ by [MTS](https://github.com/MobileTeleSystems)**
