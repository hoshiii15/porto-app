# Route 53 Domain Setup (Optional)

## Option 1: Register New Domain with Route 53
1. Go to Route 53 service
2. Click "Register Domain"
3. Search for available domain (e.g., hoseaportofolio.com)
4. Add to cart and purchase ($12-15/year)

## Option 2: Use Existing Domain
If you have domain from other registrar:
1. Update nameservers to Route 53
2. Create hosted zone in Route 53

## Setup DNS Records
1. Go to Route 53 Hosted Zones
2. Click on your domain
3. Create records:

### Frontend (CloudFront)
- Type: A
- Name: @ (root domain)
- Alias: Yes
- Route traffic to: CloudFront distribution

### API Subdomain (EC2)
- Type: A
- Name: api
- Value: Your EC2 public IP

### WWW Redirect
- Type: CNAME
- Name: www
- Value: your-domain.com

## Update SSL Certificate
1. Go to AWS Certificate Manager
2. Request public certificate
3. Add domain names:
   - your-domain.com
   - www.your-domain.com
   - api.your-domain.com
4. Use DNS validation
5. Add CNAME records to Route 53

## Update CloudFront with SSL
1. Edit CloudFront distribution
2. Add Alternate Domain Names (CNAMEs)
3. Select your SSL certificate
4. Save changes

## Update Nginx on EC2
Update your Nginx config to use domain:
```nginx
server {
    listen 80;
    server_name api.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location /api {
        proxy_pass http://localhost:5000;
        # ... other proxy settings
    }
}
```

Final URLs:
- Frontend: https://your-domain.com
- API: https://api.your-domain.com
