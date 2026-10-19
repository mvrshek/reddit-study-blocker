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
