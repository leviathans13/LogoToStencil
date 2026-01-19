# LogoToStencil

A Next.js application for customizing report cover logos and converting them to stencils.

## Features

- 🎨 Modern UI built with Next.js and Tailwind CSS
- 📤 File upload supporting PNG and JPG formats
- 👁️ Real-time preview of original and processed images
- ⚙️ Adjustable settings (Brightness, Contrast, Threshold)
- 🔄 Loading state during image processing
- 📱 Responsive two-column layout
- 💻 Clean, modular TypeScript code

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start customizing by uploading a logo image (PNG or JPG format). The page features a two-column layout with controls on the left and preview on the right.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main page with two-column layout
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── FileUpload.tsx      # File upload component with validation
│   ├── ImagePreview.tsx    # Image preview component
│   └── LoadingState.tsx    # Loading overlay component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Image Handling:** Next.js Image component

## Features in Detail

### File Upload
- Click to upload or drag-and-drop support
- Format validation (PNG, JPG only)
- File size limit (10MB max)
- Visual feedback during upload

### Image Processing
- Simulated processing with loading state
- Real-time preview updates
- Settings controls for brightness, contrast, and threshold

### Layout
- **Left Column:** Upload controls and original preview
- **Right Column:** Result preview and instructions
- Responsive design that adapts to different screen sizes

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
