# S3 + CloudFront Setup untuk Frontend Next.js

## Step 1: Build Frontend untuk Production

Di local computer Anda:

```bash
cd "d:\Kuliah\Kuliah\Butuh Uang SMT an\PortoWeb\frontend"

# Update environment untuk production
# Create .env.production.local
echo "NEXT_PUBLIC_API_URL=http://your-ec2-public-ip" > .env.production.local

# Build untuk static export
npm run build
npm run export
```

## Step 2: Create S3 Bucket

1. Go to S3 service di AWS Console
2. Click "Create bucket"
3. Bucket name: `portfolio-frontend-hoshiii15` (must be globally unique)
4. Region: Same as your EC2 instance
5. Uncheck "Block all public access"
6. Check "I acknowledge..." warning
7. Click "Create bucket"

## Step 3: Configure S3 for Static Website Hosting

1. Click on your bucket name
2. Go to "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Enable "Static website hosting"
6. Index document: `index.html`
7. Error document: `index.html` (for SPA routing)
8. Click "Save changes"

## Step 4: Set Bucket Policy for Public Access

1. Go to "Permissions" tab
2. Click "Bucket policy"
3. Add this policy (replace YOUR-BUCKET-NAME):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

## Step 5: Upload Frontend Files to S3

### Option A: Using AWS CLI (Recommended)

```bash
# Install AWS CLI
# Download from: https://aws.amazon.com/cli/

# Configure AWS CLI
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Region: us-east-1 (or your region)
# Output format: json

# Upload files
cd frontend/out
aws s3 sync . s3://portfolio-frontend-hoshiii15 --delete
```

### Option B: Using AWS Console

1. Go to your S3 bucket
2. Click "Upload"
3. Drag and drop all files from `frontend/out` folder
4. Click "Upload"

## Step 6: Create CloudFront Distribution

1. Go to CloudFront service
2. Click "Create Distribution"
3. **Origin Settings:**

   - Origin Domain: Select your S3 bucket
   - Origin Path: leave empty
   - Origin Access: "Origin access control settings"
   - Create new OAC if needed

4. **Default Cache Behavior:**

   - Viewer Protocol Policy: "Redirect HTTP to HTTPS"
   - Allowed HTTP Methods: GET, HEAD, OPTIONS
   - Cache key and origin requests: "Cache policy and origin request policy"
   - Cache Policy: "Caching Optimized"

5. **Distribution Settings:**

   - Price Class: "Use all edge locations"
   - Default Root Object: `index.html`

6. Click "Create Distribution"

## Step 7: Update S3 Bucket Policy for CloudFront

1. Go back to S3 bucket
2. Copy CloudFront Distribution ARN
3. Update bucket policy to allow CloudFront access
4. Remove public access and only allow CloudFront

## Step 8: Configure Custom Error Pages (for SPA)

1. In CloudFront distribution
2. Go to "Error Pages" tab
3. Create custom error response:
   - HTTP Error Code: 404
   - Error Caching Minimum TTL: 0
   - Customize Error Response: Yes
   - Response Page Path: /index.html
   - HTTP Response Code: 200

## Step 9: Update Frontend Environment

Update your frontend to use the CloudFront domain:

```bash
# In frontend/.env.production.local
NEXT_PUBLIC_API_URL=http://your-ec2-public-ip
```

Rebuild and redeploy:

```bash
npm run build
npm run export
aws s3 sync out/ s3://portfolio-frontend-hoshiii15 --delete
```

## Step 10: Invalidate CloudFront Cache

After uploading new files:

```bash
aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

Your frontend will be available at:

- CloudFront Domain: `https://d123456789.cloudfront.net`
- S3 Website: `http://portfolio-frontend-hoshiii15.s3-website-us-east-1.amazonaws.com`
