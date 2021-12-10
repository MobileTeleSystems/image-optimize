# Microservice for responsive resize, compression and optimization of images on the fly for web pages.

Optimizing images helps reduce image weight and increases website loading speed, which is very important for both users and search engines. For these purposes, we have created a microservice that perfectly copes with this task.

Features:
- Resize images for the user's screen size,
- Image compressions to reduce traffic,
- Converting images to modern formats such as webp and avif,
- Works with dynamically content, compression occurs on the fly,
- High compression speed, an average picture is processed in just 200 ms,
- Includes exporter of metrics for Prometheus,
- Supports basic authorization for multiple domains and endpoints,
- Supports security restrictions for allowed addresses.

### Try
To try the microservice features, run the container with the command:
```sh
docker run -it --rm -p 3000:3000 mts-optimize
```

Now you can open the browser and check the work with the command:
```sh
http://localhost:3000/optimize?size=1060&format=webp&src=https://tb.mts.ru/static/landing/images-index2/banner/slider/partners.png
```

By changing the src, size, format parameters, you can choose the path to the image, the final size and the image format.

### Use
To start the microservice in production, use the command:
```sh
docker run -d --restart always -p 3000:3000 mts-optimize
```

### Container parameters
- `-e PORT=3000` - the port on which the microservice will be launched, default 3000.
- `-e ALLOW_SIZES="100,200,1024-1920"` - an array of allowed sizes for the resulting images, default 100-1920. Use specific values to prevent heavy loads on the server.
- `-e ALLOW_SOURCES="https%3A%2F%2Ftb.mts.ru%2F"` - url array of allowed addresses for image sources, default * (any). Use comma as separator. It is recommended to apply encodeURIComponent to url.
- `-e BASIC_AUTHS="https%3A%2F%2Ftb.mts.ru%2F"` - an array of endpoints with basic authorization parameters, default empty. Has format encodeURIComponent("url"):login:password. Use comma as separator.

### Components for web
Right now you can use sample from the ./components-samples/ReactLazyImg.ts(add link after publishing) file. Just copy the file to your project and use it. The component inherits interface of the html img element. The component automatically check the most suitable picture in size and formats supported by the browser and selects the most optimal picture for display.

Sample for use in React:
```typescript
<LazyImg
    alt="Sample of work mts-optimize"
    src="/static/landing/images-getmeback/phone-fon.png"
/>
```