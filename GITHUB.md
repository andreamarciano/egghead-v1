# 📘 Git Quick Reference

A personal cheat sheet for initializing a Git repository, managing commits, working with branches, and connecting to GitHub.

---

## 🔧 Initial Setup

Before doing anything, set your Git user identity (only once per machine):

```bash
git config --global user.name "your-username"
git config --global user.email "your-email@example.com"
```

---

## 📁 Creating a New Repository

1. Initialize a Git repository:

   ```bash
   git init
   ```

   This creates a new repo and sets the default branch to `main`.

2. Check the status of your files:

   ```bash
   git status
   ```

   Useful to see which files are modified, staged, or untracked.

3. Add files to the staging area:

   ```bash
   git add .
   ```

   Adds **all** changes to be committed.

4. Commit the changes:

   ```bash
   git commit -m "Short message"
   ```

   Or, for a more descriptive commit:

   ```bash
   git commit -m "Title" -m "Detailed description"
   ```

5. View commit history:

   ```bash
   git log
   ```

   ### How to navigate:

   | Key       | Action                       |
   | --------- | ---------------------------- |
   | `q`       | Quit (exit log view)         |
   | `↑` / `↓` | Scroll up/down               |
   | `Space`   | Move one page forward        |
   | `b`       | Move one page back           |
   | `/word`   | Search for "word"            |
   | `n`       | Go to the next search result |
   | `h`       | Show help for more commands  |

   ### 📄 Exporting commit history to a file

   You can save the commit log to a text file.

   - Full detailed log:

     ```bash
     git log > git-log.txt
     ```

   - One-line summary per commit:

     ```bash
     git log --oneline > git-log-oneline.txt
     ```

   - Custom format (hash, author, time, message):

     ```bash
     git log --pretty=format:"%h - %an, %ar : %s" > git-log-custom.txt
     ```

---

## 🌐 Connecting to GitHub

1. Add the remote origin:

   ```bash
   git remote add origin https://github.com/your-username/repo-name.git
   ```

2. Push the main branch to GitHub:

   ```bash
   git push -u origin main
   ```

   The `-u` flag sets `origin/main` as the default upstream. After this, you can just run `git push`.

---

## 🌿 Working with Branches

### What is a Branch?

A branch is a separate line of development. You can experiment freely without affecting the main code.

1. Create and switch to a new branch:

   ```bash
   git checkout -b new-branch
   ```

2. Switch between branches:

   ```bash
   git checkout main
   ```

3. Push a new branch to GitHub:

   ```bash
   git push origin new-branch
   ```

4. Merge a branch into main (first switch to `main`):

   ```bash
   git checkout main
   git merge new-branch
   ```

---

## 🧹 Undoing Changes

1. Unstage files (undo `git add`):

   ```bash
   git reset
   ```

2. Undo the last commit (preserves changes in working directory):

   ```bash
   git reset HEAD~1
   ```

3. Reset to a specific commit:

   ```bash
   git reset <commit-hash>
   ```

---

## ✅ Typical Workflow

```bash
git add .
git commit -m "Your message"
git push
```

---

## 🎯 Staging and Committing Specific Files

You don’t always have to add and commit everything. You can work with individual files or even specific changes within a file.

### 🔹 Add a Single File

```bash
git add filename.ext
```

Then commit it:

```bash
git commit -m "Describe the changes made to filename.ext"
```

### 🔸 Example

You modified `index.html`, `style.css`, and `app.js` but only want to commit `style.css`:

```bash
git add style.css
git commit -m "Update footer styles"
```

### ✂️ Add Only Parts of a File

Use interactive mode to selectively stage specific lines or sections of a file:

```bash
git add -p filename.ext
```

You'll be prompted to approve or skip each change (called a _hunk_). This is great for keeping commits focused and clean.

---

## Cloning an Existing Repository

To clone a repository from GitHub to your local machine:

```bash
git clone https://github.com/your-username/repo-name.git
```

This will:

- Create a new folder called `repo-name`
- Download all the project files
- Set `origin` as the remote repository

After cloning, you can start working with Git as usual:

```bash
cd repo-name
git status
```
