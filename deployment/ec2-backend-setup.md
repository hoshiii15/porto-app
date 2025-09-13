# EC2 Setup untuk Backend Node.js

## Step 1: Launch EC2 Instance
1. Di AWS Console, go to EC2 service
2. Click "Launch Instance"
3. Name: `portfolio-backend`

## Step 2: Choose AMI
- Select "Amazon Linux 2023 AMI" (Free tier eligible)

## Step 3: Choose Instance Type
- Select "t2.micro" (Free tier eligible)
- 1 vCPU, 1 GB RAM

## Step 4: Key Pair
- Create new key pair: `portfolio-keypair`
- Download .pem file (save it safely!)

## Step 5: Network Settings
- Create new security group: `portfolio-backend-sg`
- Allow SSH (port 22) from your IP
- Allow HTTP (port 80) from anywhere (0.0.0.0/0)
- Allow HTTPS (port 443) from anywhere (0.0.0.0/0)
- Allow Custom TCP (port 5000) from anywhere for API

## Step 6: Storage
- 8 GB gp3 (Free tier eligible)

## Step 7: Launch Instance
- Click "Launch Instance"
- Wait for instance to be running

## Step 8: Connect to Instance
1. Select your instance
2. Click "Connect"
3. Use EC2 Instance Connect (browser-based)
   OR
4. Use SSH with your key pair:
   ```bash
   ssh -i "portfolio-keypair.pem" ec2-user@your-public-ip
   ```

## Step 9: Install Node.js and Git on EC2
```bash
# Update system
sudo yum update -y

# Install Node.js (using NodeSource repository)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Git
sudo yum install -y git

# Install PM2 (process manager)
sudo npm install -g pm2

# Verify installations
node --version
npm --version
git --version
```

## Step 10: Clone and Setup Backend
```bash
# Clone your repository
git clone https://github.com/hoshiii15/porto-app.git
cd porto-app/backend

# Install dependencies
npm install

# Create production environment file
sudo nano .env
```

### Environment variables (.env):
```env
MONGO_URI=mongodb+srv://portfolio-user:<password>@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=production
```

## Step 11: Start Backend with PM2
```bash
# Start application with PM2
pm2 start server.js --name "portfolio-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system reboot
pm2 startup
# Follow the command it gives you (copy-paste and run)

# Check status
pm2 status
pm2 logs portfolio-backend
```

## Step 12: Setup Nginx (Reverse Proxy)
```bash
# Install Nginx
sudo yum install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Create Nginx configuration
sudo nano /etc/nginx/conf.d/portfolio.conf
```

### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or public IP

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        # This will serve your frontend later
        root /var/www/html/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

Your backend should now be accessible at:
- `http://your-ec2-public-ip/api/profile`
- `http://your-ec2-public-ip/api/projects`
