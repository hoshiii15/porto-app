#!/bin/bash

# AWS Deployment Script untuk Portfolio
# Run this script untuk deploy ke AWS

echo "🚀 Starting AWS Deployment Process..."

# Colors untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    echo "Download from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}AWS CLI is not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI is configured${NC}"

# Configuration - Update these values
S3_BUCKET="portfolio-frontend-hoshiii15"
CLOUDFRONT_DISTRIBUTION_ID="YOUR_DISTRIBUTION_ID"
EC2_HOST="ec2-user@your-ec2-public-ip"
EC2_KEY_PATH="~/.ssh/portfolio-keypair.pem"

echo -e "${YELLOW}📦 Building Frontend...${NC}"
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Create production environment
echo "NEXT_PUBLIC_API_URL=http://your-ec2-public-ip" > .env.production.local

# Build for production
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

echo -e "${YELLOW}☁️ Uploading to S3...${NC}"
aws s3 sync out/ s3://$S3_BUCKET --delete

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ S3 upload successful${NC}"
else
    echo -e "${RED}❌ S3 upload failed${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ CloudFront invalidation started${NC}"
else
    echo -e "${RED}❌ CloudFront invalidation failed${NC}"
fi

echo -e "${YELLOW}🚀 Deploying Backend to EC2...${NC}"
cd ../

# Create deployment package
tar -czf backend-deploy.tar.gz backend/ --exclude=node_modules --exclude=.env

# Upload to EC2
scp -i $EC2_KEY_PATH backend-deploy.tar.gz $EC2_HOST:~/

# Deploy on EC2
ssh -i $EC2_KEY_PATH $EC2_HOST << 'EOF'
    echo "Extracting backend files..."
    tar -xzf backend-deploy.tar.gz
    
    cd backend
    
    echo "Installing/updating dependencies..."
    npm install --production
    
    echo "Restarting application with PM2..."
    pm2 restart portfolio-backend || pm2 start server.js --name "portfolio-backend"
    
    echo "Checking application status..."
    pm2 status
    
    echo "Cleaning up..."
    cd ..
    rm backend-deploy.tar.gz
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend deployment successful${NC}"
else
    echo -e "${RED}❌ Backend deployment failed${NC}"
fi

# Clean up local files
rm -f backend-deploy.tar.gz

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${YELLOW}Your portfolio is now live at:${NC}"
echo -e "Frontend: https://d123456789.cloudfront.net"
echo -e "Backend API: http://your-ec2-public-ip:5000/api"

echo -e "${YELLOW}💡 Next steps:${NC}"
echo "1. Update your CloudFront distribution ID in this script"
echo "2. Update your EC2 host and key path"
echo "3. Consider setting up a custom domain with Route 53"
echo "4. Setup SSL certificate for your domain"
