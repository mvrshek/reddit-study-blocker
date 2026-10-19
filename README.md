# Study Mode — Reddit Blocker

A small Chrome extension that redirects Reddit to a quiet study reminder page. Includes an on/off switch in the toolbar popup and beginner-friendly JavaScript comments.

## What version 1 does

- Study mode starts **on** when you first install the extension.
- New visits to `reddit.com` and its subdomains, including `www.reddit.com` and `old.reddit.com`, redirect to the reminder page.
- The toolbar popup turns study mode on or off and previews the reminder page.
- Chrome remembers the on/off setting across normal browser restarts.
- Other websites and search engines work normally.
- The extension sends no data to a server and has no analytics or external dependencies.

This version has a manual switch. Timed sessions, study goals, Instagram, and LinkedIn can be added later.

## 1. Open the project in VS Code

1. Download and extract the ZIP. In Windows, right-click it and choose **Extract All**.
2. Put the extracted `reddit-study-blocker` folder somewhere permanent, such as `Documents`.
3. In VS Code, choose **File → Open Folder** and select the folder that directly contains `manifest.json`.
4. Click `popup.js` to read the JavaScript. Save edits with **Ctrl+S**.

VS Code edits the files; Chrome runs the extension. You do **not** need Python, Node.js, npm, Live Server, or the Run and Debug button for this project.

## 2. Install it in Chrome

1. Type `chrome://extensions` into Chrome's address bar.
2. Turn on **Developer mode** in the upper-right corner.
3. Click **Load unpacked**.
4. Select the extracted folder containing `manifest.json`, not the ZIP or its parent folder.
5. Click Chrome's puzzle-piece Extensions button and pin **Study Mode — Reddit Blocker**.
6. Open `https://www.reddit.com/` in a new tab. The reminder page should appear.
7. Click the Study Mode toolbar icon and select **Turn study mode off**. Open Reddit again; it should load normally.
8. Turn study mode back on before studying.

Keep the extracted folder in place: Chrome loads the extension files from that location.

## 3. Edit and see your changes

Try changing `Reddit can wait.` in `blocked.html` to your own message.

1. Edit a file in VS Code.
2. Save it with **Ctrl+S**.
3. Visit `chrome://extensions` and click the circular **Reload** arrow on this extension.
4. Reopen its popup or open Reddit in a fresh tab.

Changing `styles.css` changes the colors, spacing, and fonts. Changing `popup.js` changes the button behavior. JavaScript files use the `.js` extension, and `//` starts a single-line comment.

## How the files fit together

| File | Role |
| --- | --- |
| `manifest.json` | Registers the extension, permissions, toolbar popup, and rule file. |
| `rules.json` | Tells Chrome which navigations to redirect and where. |
| `popup.html` | Defines the popup's text and buttons. |
| `popup.js` | Reads the enabled ruleset and changes it when you click the switch. |
| `blocked.html` | The separate study reminder page. |
| `styles.css` | Styles the popup and reminder page. |

Chrome's `declarativeNetRequest` engine performs the redirects, so the extension does not need a background loop or a running popup. `popup.js` calls `getEnabledRulesets()` to read the current setting and `updateEnabledRulesets()` to change it. Chrome is the source of truth, so there is no second setting to synchronize.

Only `blocked.html` is exposed as a web accessible resource so Chrome can redirect a navigation into it. Its match list uses `<all_urls>` to support navigations initiated from search results and other websites. That entry exposes the reminder page; it does not grant access to read all websites. The only requested host access is Reddit.

The **Clear this tab** link opens `about:blank` in the current tab. It does not close another tab or change your study-mode setting.

## 4. Put it on GitHub from VS Code

This creates a source-code repository; people who download it can install it using **Load unpacked**. GitHub Pages is not needed to run the extension.

### Install Git if needed

Open **Terminal → New Terminal** in VS Code and run:

```powershell
git --version
```

If Git is not recognized, install it from <https://git-scm.com/downloads/win>, then completely close and reopen VS Code. Check `git --version` again.

### Make the first commit

Make sure the VS Code terminal is inside the project folder. Then run:

```powershell
git init -b main
git add .
git commit -m "Add Reddit study blocker extension"
```

If Git asks you to configure an author, run the following with your own details, then retry the commit. These commands apply to this project only:

```powershell
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB COMMIT EMAIL"
git commit -m "Add Reddit study blocker extension"
```

You can find a GitHub-provided noreply commit email under **GitHub → Settings → Emails** if you prefer to use that address for public commits.

### Publish the repository

1. Press **Ctrl+Shift+P** in VS Code.
2. Search for **Publish to GitHub** and run it.
3. Sign in to GitHub when prompted.
4. Name the repository `reddit-study-blocker`.
5. Choose **Public** if you want it visible on your GitHub profile, or **Private** for personal access.
6. If VS Code asks which files to include, include the project source files and README.
7. Open the repository link after publication finishes.

The ZIP does not contain an initialized `.git` repository. You create that on your own computer with `git init` above, so its commits use your identity.

### Alternative: publish using a GitHub repository URL

Use this route instead of **Publish to GitHub** if you prefer terminal commands:

1. At <https://github.com/new>, create a repository named `reddit-study-blocker`.
2. Leave the README, `.gitignore`, and license initialization options off, since you already have local files.
3. After the first local commit, run the following, replacing `YOUR_USERNAME`:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/reddit-study-blocker.git
git push -u origin main
```

Follow the GitHub sign-in prompt. Run only one publishing route; if you already published from VS Code, a remote called `origin` should already exist.

### Upload future changes

After editing and saving your code, use:

```powershell
git add .
git commit -m "Update study reminder page"
git push
```

Reload the extension in Chrome separately to see local code changes. Publishing to GitHub does not automatically update an unpacked extension on someone else's computer.

## Troubleshooting and limits

- **Could not load manifest:** Select the inner folder containing `manifest.json`. Make sure Windows did not rename it `manifest.json.txt`.
- **Popup shows study mode off:** Turn it on, then navigate to Reddit again. Already-open reminder pages stay as reminder pages until you leave them.
- **Reddit was already open:** This version does not replace existing tabs or intercept every in-page navigation. Close those tabs, or refresh/open Reddit after enabling study mode. Browser Back/Forward restores may also reuse a previously loaded page. This is a first navigation-redirect prototype, not a strict lockout.
- **Reddit still loads:** Check that Chrome has granted the extension site access to Reddit. A site service worker or restored page can avoid a new network request; try a fresh tab, and if needed clear Reddit site data (which may sign you out).
- **Chrome warns about access to Reddit:** The redirect requires access to the site you are choosing to redirect.
- **Other browsers, browser profiles, mobile apps, and incognito:** They are outside this initial installation's scope. Test in the normal Chrome profile where you loaded it.
- **Turning off or uninstalling the extension:** Restores normal browsing. This extension is a study aid you control.
- **Opening `popup.html` as a normal file:** Its Chrome extension APIs are available when Chrome loads the extension, not when you double-click the HTML file. Use the toolbar popup.

## Ideas for later versions

- A 25/50/90-minute timer with `chrome.alarms` and a saved end timestamp.
- A study goal shown on the reminder page.
- Instagram and LinkedIn rules with matching host permissions.
- Handling distracting tabs that are already open.

## References

- [Chrome: load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)
- [Chrome: declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest)
- [Chrome: web accessible resources](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources)
- [VS Code: JavaScript](https://code.visualstudio.com/docs/languages/javascript)
- [VS Code: GitHub](https://code.visualstudio.com/docs/sourcecontrol/github)
- [GitHub: add locally hosted code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
