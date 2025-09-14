# 🚀 AWS Free Tier Deployment - Quick Start Guide

## Prerequisites Checklist ✅

- [ ] AWS Account with Free Tier access
- [ ] AWS CLI installed and configured
- [ ] Git installed
- [ ] Node.js installed (v18+)

## 🎯 Quick Deployment Steps

### 1. Setup MongoDB Atlas (5 minutes)

```bash
# Follow: deployment/mongodb-atlas-setup.md
# Get connection string: mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 2. Setup EC2 Backend (15 minutes)

```bash
# Follow: deployment/ec2-backend-setup.md
# Launch t2.micro instance
# Install Node.js, Git, PM2
# Clone repo and start backend
```

### 3. Setup S3 + CloudFront Frontend (10 minutes)

```bash
# Follow: deployment/s3-cloudfront-setup.md
# Create S3 bucket
# Build and upload frontend
# Create CloudFront distribution
```

### 4. Test Your Deployment

```bash
# Test backend API
curl http://your-ec2-ip:5000/api/profile

# Test frontend
# Visit your CloudFront URL
```

## 💰 Cost Breakdown (Free Tier)

| Service       | Free Tier Limit | Monthly Cost |
| ------------- | --------------- | ------------ |
| EC2 t2.micro  | 750 hours       | $0           |
| S3 Storage    | 5GB             | $0           |
| CloudFront    | 50GB transfer   | $0           |
| MongoDB Atlas | 512MB storage   | $0           |
| **Total**     |                 | **$0/month** |

## 🔧 Production Optimizations

### Security

- [ ] Setup Security Groups properly
- [ ] Use IAM roles instead of keys
- [ ] Enable AWS WAF
- [ ] Setup SSL certificates

### Performance

- [ ] Enable CloudFront caching
- [ ] Setup auto-scaling for EC2
- [ ] Use Elastic Load Balancer
- [ ] Optimize S3 bucket policies

### Monitoring

- [ ] Setup CloudWatch alarms
- [ ] Configure log monitoring
- [ ] Setup health checks

## 🆘 Troubleshooting

### Common Issues:

**Backend not starting:**

```bash
# Check logs
pm2 logs portfolio-backend

# Check if port is open
sudo netstat -tlnp | grep :5000
```

**Frontend not loading:**

```bash
# Check S3 bucket policy
# Verify CloudFront distribution
# Check CORS settings
```

**Database connection failed:**

```bash
# Verify MongoDB Atlas connection string
# Check Network Access settings in Atlas
# Ensure EC2 security group allows outbound connections
```

## 📞 Support

If you need help:

1. Check AWS Free Tier usage in Billing Dashboard
2. Review CloudWatch logs
3. Check this repository's Issues section
4. AWS Documentation: https://docs.aws.amazon.com/

## 🎉 Success URLs

After successful deployment:

- **Frontend**: https://d123456789.cloudfront.net
- **Admin Panel**: https://d123456789.cloudfront.net/admin
- **API Endpoint**: http://your-ec2-ip:5000/api
- **Health Check**: http://your-ec2-ip:5000/api/profile

Happy deploying! 🚀
