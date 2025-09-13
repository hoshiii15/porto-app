# MongoDB Atlas Setup (Free Tier)

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project (e.g., "Portfolio-Project")

## Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0 Sandbox)
3. Select AWS as provider
4. Choose region closest to your users
5. Name your cluster (e.g., "portfolio-cluster")
6. Click "Create Cluster"

## Step 3: Setup Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `portfolio-user`
5. Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Setup Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, restrict to your EC2 IP
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Node.js driver
5. Copy the connection string
6. Replace `<password>` with your database user password

Example connection string:
```
mongodb+srv://portfolio-user:<password>@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

Save this connection string - you'll need it for your backend environment variables!
