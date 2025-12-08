# Extension Options and Recommendations

This document provides guidance on extending the Modern React Template with additional features, tools, and integrations that go beyond the core template capabilities.

## 📚 Table of Contents

- [TypeDoc Custom Theming](#typedoc-custom-theming)
- [Error Logging Frameworks](#error-logging-frameworks)
- [Plug-and-Play Options](#plug-and-play-options)
- [Infrastructure as Code (IaC)](#infrastructure-as-code-iac)
- [Extensibility Scripts](#extensibility-scripts)
- [Cloud Deployment Options](#cloud-deployment-options)
- [Additional Recommendations](#additional-recommendations)

---

## TypeDoc Custom Theming

**Status:** ✅ Already Implemented

This template includes a custom TypeDoc theme for enhanced documentation.

### Current Setup

The template includes a custom TypeDoc theme located in `typedoc-theme/`:

```
typedoc-theme/
├── assets/
│   └── custom.css       # Custom styling
└── theme.js             # Theme configuration
```

### Configuration

TypeDoc is configured with two output formats:

1. **Markdown Documentation** (`docs/`) - Committed to repository
   ```bash
   npm run docs:md
   ```
   - Configuration: `typedoc.json`
   - Output: `docs/`
   - Uses: `typedoc-plugin-markdown`

2. **HTML Documentation** (`docs-html/`) - Deployed to GitHub Pages
   ```bash
   npm run docs:html
   ```
   - Configuration: `typedoc.html.json`
   - Output: `docs-html/`
   - Custom CSS: `typedoc-theme/assets/custom.css`

### Customization

To customize the TypeDoc theme:

1. **Modify Styles**: Edit `typedoc-theme/assets/custom.css`
2. **Adjust Theme**: Edit `typedoc-theme/theme.js`
3. **Update Config**: Modify `typedoc.html.json` for additional options

### Additional TypeDoc Options

Consider these additional TypeDoc features:

```json
{
  "categorizeByGroup": true,
  "groupOrder": ["Components", "Hooks", "Utils", "*"],
  "sort": ["source-order"],
  "searchInComments": true,
  "lightHighlightTheme": "light-plus",
  "darkHighlightTheme": "dark-plus"
}
```

---

## Error Logging Frameworks

**Status:** ⚠️ Recommended Options

For production applications, consider integrating an error logging and monitoring framework.

### Recommended Solutions

#### 1. **Sentry** (Recommended for Most Projects)

**Pros:**
- Comprehensive error tracking
- Performance monitoring
- Release tracking
- Source map support
- Free tier available

**Installation:**
```bash
npm install @sentry/react
```

**Basic Setup:**
```tsx
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Environment Variables:**
```env
VITE_SENTRY_DSN=your-sentry-dsn
```

**Error Boundary:**
```tsx
import { ErrorBoundary } from '@sentry/react';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {/* Your app */}
    </ErrorBoundary>
  );
}
```

#### 2. **LogRocket**

**Best for:** Session replay and user behavior analysis

**Installation:**
```bash
npm install logrocket
```

**Basic Setup:**
```tsx
import LogRocket from 'logrocket';

LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID);
```

#### 3. **Rollbar**

**Best for:** Detailed error analysis and workflow integrations

**Installation:**
```bash
npm install rollbar
```

#### 4. **Custom Solution with Winston/Pino**

**Best for:** Self-hosted solutions or simple logging needs

**Installation:**
```bash
npm install pino pino-pretty
```

**Basic Setup:**
```tsx
// src/utils/logger.ts
import pino from 'pino';

export const logger = pino({
  level: import.meta.env.MODE === 'production' ? 'info' : 'debug',
  browser: {
    asObject: true,
  },
});
```

### Implementation Guidelines

1. **Add to `.env.example`:**
   ```env
   # Error logging
   VITE_SENTRY_DSN=your-sentry-dsn
   VITE_ERROR_LOGGING_ENABLED=true
   ```

2. **Create utility wrapper:**
   ```tsx
   // src/utils/errorLogger.ts
   import * as Sentry from '@sentry/react';
   
   export function logError(error: Error, context?: Record<string, unknown>) {
     if (import.meta.env.VITE_ERROR_LOGGING_ENABLED === 'true') {
       Sentry.captureException(error, { extra: context });
     }
     console.error('Error:', error, context);
   }
   ```

3. **Use in error boundaries:**
   ```tsx
   // src/components/ErrorBoundary.tsx
   import { Component, ReactNode } from 'react';
   import { logError } from '../utils/errorLogger';
   
   export class ErrorBoundary extends Component<
     { children: ReactNode },
     { hasError: boolean }
   > {
     componentDidCatch(error: Error, errorInfo: unknown) {
       logError(error, { errorInfo });
     }
   }
   ```

---

## Plug-and-Play Options

**Status:** ⚠️ Framework Recommendations

### Component Libraries

While this template emphasizes custom, accessible components, you may want to integrate established libraries:

#### 1. **Radix UI** (Recommended)

**Why:** Unstyled, accessible primitives that work with Tailwind

```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

**Benefits:**
- WCAG 2.1 AA+ compliant
- Headless (bring your own styles)
- Composable primitives
- Works perfectly with Tailwind tokens

**Example:**
```tsx
import * as Dialog from '@radix-ui/react-dialog';

export function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-primary text-white">
        Open
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50" />
        <Dialog.Content className="bg-white rounded-lg">
          {/* Content */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

#### 2. **Headless UI**

**Why:** Official Tailwind-designed components

```bash
npm install @headlessui/react
```

#### 3. **Shadcn/ui**

**Why:** Copy-paste component collection (not a library)

Visit [ui.shadcn.com](https://ui.shadcn.com/) and copy components directly into your project.

### Form Libraries

#### **React Hook Form** (Already Compatible)

```bash
npm install react-hook-form @hookform/resolvers
```

**Integration with Zod:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### Icon Libraries

#### **Lucide React** (Recommended)

```bash
npm install lucide-react
```

**Why:**
- Beautiful, consistent icons
- Tree-shakeable
- TypeScript support
- Actively maintained

**Example:**
```tsx
import { Check, X, AlertCircle } from 'lucide-react';

<Check className="text-success" />
<X className="text-error" />
<AlertCircle className="text-warning" />
```

### Utility Libraries

#### **date-fns**

```bash
npm install date-fns
```

**Why:** Modern, tree-shakeable date utilities

#### **immer**

```bash
npm install immer
```

**Why:** Simplifies immutable state updates in reducers

```tsx
import { produce } from 'immer';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      draft.items.push(action.payload);
      break;
  }
});
```

---

## Infrastructure as Code (IaC)

**Status:** ⚠️ Recommendations for Deployment Automation

### Option 1: **AWS CDK** (Recommended for AWS)

**Best for:** TypeScript-first AWS infrastructure

**Installation:**
```bash
npm install -D aws-cdk-lib constructs
npm install -g aws-cdk
```

**Setup:**
```bash
mkdir infrastructure
cd infrastructure
cdk init app --language typescript
```

**Example Stack for S3 + CloudFront:**

```typescript
// infrastructure/lib/web-app-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class WebAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for static hosting
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Outputs
    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
    });
    new cdk.CfnOutput(this, 'DistributionDomain', {
      value: distribution.distributionDomainName,
    });
  }
}
```

**Package.json scripts:**
```json
{
  "scripts": {
    "cdk:deploy": "cd infrastructure && cdk deploy",
    "cdk:destroy": "cd infrastructure && cdk destroy",
    "cdk:synth": "cd infrastructure && cdk synth",
    "deploy:aws": "npm run build && npm run cdk:deploy"
  }
}
```

### Option 2: **Terraform**

**Best for:** Multi-cloud or cloud-agnostic deployments

**Installation:**
```bash
# Install Terraform CLI from terraform.io
# Or use a package manager
brew install terraform
```

**Setup:**
```bash
mkdir terraform
cd terraform
```

**Example Configuration:**

```hcl
# terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# S3 bucket for static website
resource "aws_s3_bucket" "website" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = "S3Origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.website.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.website.domain_name
}
```

**Variables:**
```hcl
# terraform/variables.tf
variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "S3 bucket name"
  type        = string
}
```

### Option 3: **Pulumi**

**Best for:** TypeScript-native IaC with better type safety

```bash
npm install -D @pulumi/pulumi @pulumi/aws
pulumi new aws-typescript
```

### Comparison Matrix

| Feature | AWS CDK | Terraform | Pulumi |
|---------|---------|-----------|--------|
| **Language** | TypeScript/Python/Java | HCL | TypeScript/Python/Go |
| **Cloud Support** | AWS-focused | Multi-cloud | Multi-cloud |
| **Type Safety** | ✅ Excellent | ❌ Limited | ✅ Excellent |
| **Learning Curve** | Medium | Medium | Low (if using TS) |
| **Community** | Large | Very Large | Growing |
| **Best For** | AWS-only projects | Multi-cloud | TypeScript teams |

### Recommended Approach

1. **Start Simple**: Use GitHub Actions + Pages for initial deployment
2. **Add IaC Later**: When you need custom domains, CDNs, or backends
3. **Choose Based on Cloud**: AWS CDK for AWS, Terraform for multi-cloud
4. **Version Control**: Commit IaC configs to repository

---

## Extensibility Scripts

**Status:** ⚠️ Framework for Future Extensions

Create a scripts framework for common template extensions.

### Proposed Scripts Structure

```
scripts/
├── extensions/
│   ├── add-authentication.js      # Add auth scaffolding
│   ├── add-api-layer.js           # Add API client setup
│   ├── add-component.js           # Generate new component
│   ├── add-page.js                # Generate new page
│   └── add-feature.js             # Full feature scaffolding
├── utils/
│   ├── fileUtils.js               # File operations
│   ├── templateUtils.js           # Template rendering
│   └── promptUtils.js             # CLI prompts
└── templates/
    ├── component/                 # Component templates
    ├── page/                      # Page templates
    ├── auth/                      # Auth templates
    └── api/                       # API templates
```

### Example: Component Generator

```javascript
// scripts/extensions/add-component.js
#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import prompts from 'prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateComponent() {
  const response = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Component name (PascalCase):',
      validate: (value) =>
        /^[A-Z][a-zA-Z0-9]*$/.test(value) || 'Must be PascalCase',
    },
    {
      type: 'select',
      name: 'type',
      message: 'Component type:',
      choices: [
        { title: 'Functional Component', value: 'functional' },
        { title: 'With forwardRef', value: 'forwardRef' },
        { title: 'With Context', value: 'context' },
      ],
    },
    {
      type: 'confirm',
      name: 'includeStories',
      message: 'Include Storybook stories?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'includeTests',
      message: 'Include tests?',
      initial: true,
    },
  ]);

  const componentDir = join(
    process.cwd(),
    'src',
    'components',
    response.name
  );

  await mkdir(componentDir, { recursive: true });

  // Generate component file
  const componentContent = generateComponentContent(response);
  await writeFile(
    join(componentDir, `${response.name}.tsx`),
    componentContent
  );

  // Generate index file
  await writeFile(
    join(componentDir, 'index.ts'),
    `export { ${response.name} } from './${response.name}';\nexport type { ${response.name}Props } from './${response.name}';\n`
  );

  // Generate test file
  if (response.includeTests) {
    const testContent = generateTestContent(response);
    await writeFile(
      join(componentDir, `${response.name}.test.tsx`),
      testContent
    );
  }

  // Generate stories file
  if (response.includeStories) {
    const storiesContent = generateStoriesContent(response);
    await writeFile(
      join(componentDir, `${response.name}.stories.tsx`),
      storiesContent
    );
  }

  console.log(`✅ Component ${response.name} created successfully!`);
  console.log(`📁 Location: ${componentDir}`);
}

function generateComponentContent({ name, type }) {
  if (type === 'forwardRef') {
    return `import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

/**
 * ${name}
 *
 * [Add description here]
 *
 * @example
 * \`\`\`tsx
 * <${name}>
 *   Content
 * </${name}>
 * \`\`\`
 */

export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {
  // Add props here
}

export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        ${name}
      </div>
    );
  }
);

${name}.displayName = '${name}';
`;
  }

  return `import type { ReactNode } from 'react';

/**
 * ${name}
 *
 * [Add description here]
 */

export interface ${name}Props {
  children?: ReactNode;
}

export function ${name}({ children }: ${name}Props) {
  return <div>{children}</div>;
}
`;
}

function generateTestContent({ name }) {
  return `import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />);
    expect(screen.getByText('${name}')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(<${name} />);
    // Add accessibility tests
  });
});
`;
}

function generateStoriesContent({ name }) {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;
}

generateComponent().catch(console.error);
```

### Package.json Scripts

```json
{
  "scripts": {
    "generate:component": "node scripts/extensions/add-component.js",
    "generate:page": "node scripts/extensions/add-page.js",
    "generate:feature": "node scripts/extensions/add-feature.js",
    "extend:auth": "node scripts/extensions/add-authentication.js",
    "extend:api": "node scripts/extensions/add-api-layer.js"
  }
}
```

### Dependencies

```bash
npm install -D prompts @types/prompts
```

### Usage Examples

```bash
# Generate a new component
npm run generate:component

# Generate a new page
npm run generate:page

# Add authentication scaffolding
npm run extend:auth

# Add API client layer
npm run extend:api
```

---

## Cloud Deployment Options

**Status:** ⚠️ Deployment Guides

### AWS Deployment

#### Option 1: **S3 + CloudFront** (Static Hosting)

**Cost:** ~$1-5/month for small sites

**GitHub Actions Deployment:**

```yaml
# .github/workflows/deploy-aws.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install and Build
        run: |
          npm ci
          npm run build
          
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
          
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
          
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

**Required Secrets:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

#### Option 2: **AWS Amplify**

**Best for:** Automatic deployments with backend integration

1. Connect GitHub repository to AWS Amplify
2. Configure build settings (auto-detected)
3. Deploy automatically on push

**Amplify Build Spec:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### Option 3: **AWS ECS/Fargate** (Containerized)

**Best for:** Server-side rendering or backend integration

1. Create Dockerfile
2. Push to ECR
3. Deploy to ECS

### Azure Deployment

#### **Azure Static Web Apps**

**Best for:** Integrated CI/CD with serverless APIs

**GitHub Actions (Auto-generated):**

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "dist"
```

**Features:**
- Free SSL certificates
- Custom domains
- Serverless API integration
- Staging environments for PRs

### Google Cloud Platform (GCP)

#### **Firebase Hosting**

**Best for:** Quick deployments with Firebase integration

**Installation:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

**Configuration:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Deployment:**
```bash
npm run build
firebase deploy --only hosting
```

**GitHub Actions:**
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

### Vercel (Recommended for Simplicity)

**Best for:** Zero-config deployments

1. Import GitHub repository to Vercel
2. Auto-detects Vite configuration
3. Deploys automatically on push

**Configuration (optional):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm ci"
}
```

### Netlify

**Best for:** Form handling and edge functions

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Comparison Matrix

| Platform | Complexity | Cost | Best For |
|----------|------------|------|----------|
| **GitHub Pages** | ⭐ | Free | Open source demos |
| **Vercel** | ⭐ | Free tier | Quick deployments |
| **Netlify** | ⭐ | Free tier | Form handling |
| **Firebase** | ⭐⭐ | Free tier | Firebase integration |
| **AWS S3+CloudFront** | ⭐⭐⭐ | ~$1-5/mo | Custom domains, AWS ecosystem |
| **Azure Static Web Apps** | ⭐⭐ | Free tier | Azure ecosystem |
| **AWS Amplify** | ⭐⭐ | Usage-based | Backend integration |

---

## Additional Recommendations

### Performance Monitoring

#### **Web Vitals Monitoring**

```bash
npm install web-vitals
```

```tsx
// src/utils/reportWebVitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export function reportWebVitals() {
  onCLS(console.log);
  onFID(console.log);
  onFCP(console.log);
  onLCP(console.log);
  onTTFB(console.log);
}
```

```tsx
// src/main.tsx
import { reportWebVitals } from './utils/reportWebVitals';

reportWebVitals();
```

### Analytics

#### **Privacy-Friendly Analytics**

**Plausible:**
```tsx
// src/utils/analytics.ts
export function trackPageView() {
  if (window.plausible) {
    window.plausible('pageview');
  }
}
```

**Umami:**
```html
<!-- index.html -->
<script
  defer
  src="https://analytics.example.com/script.js"
  data-website-id="your-website-id"
></script>
```

### Internationalization (i18n)

#### **react-i18next**

```bash
npm install react-i18next i18next
```

**Setup:**
```tsx
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
      },
    },
    es: {
      translation: {
        welcome: 'Bienvenido',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### Authentication

#### **Supabase Auth**

```bash
npm install @supabase/supabase-js
```

**Setup:**
```tsx
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

**Auth Hook:**
```tsx
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user };
}
```

#### **Clerk**

```bash
npm install @clerk/clerk-react
```

#### **Auth0**

```bash
npm install @auth0/auth0-react
```

### Database Integration

#### **Supabase** (Recommended for Postgres)

```bash
npm install @supabase/supabase-js
```

#### **Firebase Firestore**

```bash
npm install firebase
```

#### **PocketBase** (Self-hosted)

```bash
npm install pocketbase
```

### Testing Enhancements

#### **Chromatic (Visual Regression)**

```bash
npm install -D chromatic
```

```bash
npx chromatic --project-token=your-token
```

#### **Percy (Visual Testing)**

```bash
npm install -D @percy/cli @percy/playwright
```

### Code Quality Enhancements

#### **Type Coverage**

```bash
npm install -D type-coverage
```

```json
{
  "scripts": {
    "type-coverage": "type-coverage --at-least 95"
  }
}
```

#### **Bundle Analysis**

```bash
npm install -D rollup-plugin-visualizer
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

### API Mocking

#### **MSW (Mock Service Worker)**

```bash
npm install -D msw
```

**Setup:**
```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([{ id: '1', name: 'John' }]);
  }),
];
```

```tsx
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

```tsx
// src/main.tsx
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  worker.start();
}
```

---

## Implementation Priority

### Phase 1: Immediate Value (Low Effort, High Impact)

1. ✅ **Error Logging**: Sentry integration (~1 hour)
2. ✅ **Component Generator**: Script for new components (~2 hours)
3. ✅ **Web Vitals**: Basic performance monitoring (~30 minutes)

### Phase 2: Enhanced Development (Medium Effort)

1. ⚠️ **Radix UI**: Add accessible primitives (~2 hours)
2. ⚠️ **MSW**: API mocking for development (~2 hours)
3. ⚠️ **React Hook Form**: Form handling (~1 hour)

### Phase 3: Production Readiness (Higher Effort)

1. ⚠️ **Authentication**: Supabase/Clerk setup (~4 hours)
2. ⚠️ **IaC**: AWS CDK or Terraform (~8 hours)
3. ⚠️ **i18n**: Internationalization (~4 hours)

### Phase 4: Advanced Features (Project-Specific)

1. ⚠️ **Database Integration** (~varies)
2. ⚠️ **Analytics** (~2 hours)
3. ⚠️ **Visual Regression Testing** (~4 hours)

---

## Conclusion

This template provides a solid foundation, and these extensions allow you to grow it based on your specific needs:

- **Start simple**: Use the template as-is for learning or prototyping
- **Add strategically**: Only integrate tools you actually need
- **Maintain quality**: Ensure all additions maintain accessibility and testing standards
- **Stay flexible**: Use IaC for deployment automation when needed

For questions or suggestions about these extensions, please open an issue on GitHub.
