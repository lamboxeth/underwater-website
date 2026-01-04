# GitHub Setup Instructions

## Option 1: Install Git for Windows (Recommended)

### Step 1: Install Git
1. Download Git for Windows from: https://git-scm.com/download/win
2. Run the installer and use default settings
3. Restart your terminal/PowerShell after installation

### Step 2: Configure Git (if first time)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Underwater website"

# Add remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 2: Use GitHub Desktop (Easier GUI Option)

1. Download GitHub Desktop from: https://desktop.github.com/
2. Install and sign in to your GitHub account
3. In GitHub Desktop:
   - Click "File" → "Add Local Repository"
   - Select your project folder: `C:\Users\0xlambo\underwater-website`
   - Click "Publish repository" to create it on GitHub

---

## Option 3: Manual Upload via GitHub Website

1. Go to https://github.com/new
2. Create a new repository (name it `underwater-website` or any name you prefer)
3. **DO NOT** initialize with README, .gitignore, or license
4. After creating, you'll see "uploading an existing file" option
5. Drag and drop your project folder contents

---

## After Setup (if using Git CLI)

### Create GitHub Repository First:
1. Go to https://github.com/new
2. Repository name: `underwater-website` (or your preferred name)
3. Make it Public or Private (your choice)
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

### Then run these commands:
```bash
git init
git add .
git commit -m "Initial commit: Underwater website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/underwater-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

