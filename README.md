# 🤖 AI Resume Builder

A modern, one-page web application built with Next.js 15 that helps users create professional resumes using AI assistance. Generate, customize, and download beautiful resumes in minutes.

## ✨ Features

### 🎯 Core Functionality
- **One-Page Application**: Everything accessible through modals and sections
- **AI-Powered Content Generation**: Uses OpenAI to create professional summaries and enhance work experience descriptions
- **Multiple Professional Templates**: Modern, Minimalist, Classic, and Creative designs
- **Live Preview**: Real-time preview of your resume as you make changes
- **PDF Export**: High-quality PDF generation with Puppeteer
- **Custom Styling**: Choose accent colors and fonts

### 📋 Resume Sections
- Personal Information & Contact Details
- Professional Summary (AI-generated)
- Work Experience (AI-enhanced descriptions)
- Education
- Skills & Certifications
- Custom section ordering

### 🎨 Templates
1. **Modern**: Clean two-column layout with accent colors
2. **Minimalist**: Simple, elegant single-column design
3. **Classic**: Traditional professional format
4. **Creative**: Eye-catching design for creative fields

### 💰 Pricing Structure (Ready for Future Integration)
- **Free**: 1 resume download, basic templates, AI generation
- **Pro ($9.99)**: Unlimited downloads, all templates, full customization
- **Premium ($19.99)**: Everything + LinkedIn optimization, ATS scoring

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, Tailwind CSS 4
- **Animations**: Framer Motion
- **AI Integration**: OpenAI GPT API
- **PDF Generation**: Puppeteer
- **Icons**: React Icons
- **Development**: ESLint, PostCSS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables (optional)**
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
ai-resume-builder/
├── app/
│   ├── components/
│   │   ├── Header.js                 # Navigation header
│   │   ├── HeroSection.js           # Landing page hero
│   │   ├── InputFormModal.js        # Multi-step form modal
│   │   ├── TemplateModal.js         # Template selection
│   │   ├── PreviewModal.js          # Live preview & download
│   │   ├── PricingModal.js          # Pricing plans
│   │   └── templates/
│   │       ├── ResumeTemplate.js    # Template renderer
│   │       ├── ModernTemplate.js    # Modern template
│   │       ├── MinimalistTemplate.js # Minimalist template
│   │       ├── ClassicTemplate.js   # Classic template
│   │       └── CreativeTemplate.js  # Creative template
│   ├── actions/
│   │   └── ai-actions.js           # Server actions for OpenAI
│   ├── api/
│   │   └── generate-pdf/
│   │       └── route.js            # PDF generation API
│   ├── layout.js                   # Root layout
│   ├── page.js                     # Main application page
│   └── globals.css                 # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🎨 Usage

### Basic Workflow
1. **Get Started**: Click "Build My Resume Now" to begin
2. **Enter Information**: Fill out the 4-step form:
   - Personal information & target job title
   - Work experience
   - Education & skills
   - AI content generation
3. **Choose Template**: Select from 4 professional templates
4. **Customize**: Pick accent colors and fonts
5. **Preview & Download**: Review your resume and download as PDF

### AI Features
- **Professional Summary**: AI generates compelling summaries based on your information
- **Work Experience Enhancement**: AI improves your job descriptions with action verbs and quantified achievements
- **ATS Optimization**: Content is optimized for Applicant Tracking Systems

## 🔧 Development

### Key Components
- **Server Actions**: AI integration happens server-side for security
- **Modal System**: Everything is modal-based for a smooth single-page experience
- **Template System**: Modular template architecture for easy additions
- **PDF Generation**: Server-side HTML to PDF conversion

### Code Patterns
- Server components for data fetching
- Client components for interactivity
- Server actions for AI integration
- API routes only for PDF generation
- Responsive design with Tailwind CSS

## 🔮 Future Features

### Planned Enhancements
- **Payment Integration**: Stripe integration for Pro/Premium plans
- **User Accounts**: Save and manage multiple resumes
- **Cover Letter Generator**: AI-powered cover letter creation
- **LinkedIn Integration**: Import profile data
- **ATS Scoring**: Real-time resume optimization scores
- **More Templates**: Additional professional designs
- **Collaboration**: Share and get feedback on resumes

### Technical Improvements
- **Database Integration**: User data persistence
- **Authentication**: NextAuth integration
- **Performance**: Better caching and optimization
- **Testing**: Comprehensive test suite
- **Deployment**: Production-ready configuration

## 📝 Environment Variables

```bash
# Required for AI features
OPENAI_API_KEY=your_openai_api_key_here

# Optional
NODE_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

1. **PDF Generation Fails**
   - Ensure Puppeteer is properly installed
   - Check server memory limits

2. **AI Features Not Working**
   - Verify OpenAI API key is set
   - Check API quota and billing

3. **Dependencies Issues**
   - Use `--legacy-peer-deps` flag with npm install
   - Ensure Node.js 18+ is installed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js 15 and AI assistance**
