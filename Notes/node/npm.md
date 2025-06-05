# 5. NPM - Node Package Manager

Install, manage, and share third-party libraries and tools.

## 📦 Common NPM Commands

```bash
npm                     # Shows help info
npm --version/-v        # Shows the installed NPM version
npm i/install pkg_name  # Installs a package locally (adds it to node_modules)
npm install -g pkg_name # Installs a package globally (available everywhere)

npm uninstall pkg_name  # Removes a package
```

---

## 📄 `package.json` File

This file tracks:

- Your project metadata (name, version, etc.)
- The list of installed dependencies
- Scripts you can run (like `npm run dev`)

You can create it manually with:

```bash
npm init       # Step-by-step
npm init -y    # Auto-generate with defaults
```

---

## 🔧 Installing Dev Dependencies

Some tools (like linters or test runners) are needed only during development:

```bash
npm install some-dev-tool --save-dev
# or shorthand:
npm i some-dev-tool -D
```

---

## Bonus Tip 💡

To remove `node_modules` and reinstall everything from scratch:

```bash
rm -rf node_modules
npm install
```
