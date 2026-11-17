<div align="center">

<img src="logo.png" alt="ProxyBook logo" width="96" height="96">

# ProxyBook

**Every proxy, on the record.**

A shared ledger for tracking who covered which class for whom, so nobody has to remember "you owe me three."

<a href="https://proxybook.vercel.app"><img src="https://img.shields.io/badge/Live-proxybook.vercel.app-3B5BFF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo"></a>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Backend-Google_Apps_Script-4285F4?style=flat-square&logo=google&logoColor=white" alt="Google Apps Script">
<img src="https://img.shields.io/badge/Hosted_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
<img src="https://img.shields.io/badge/Build_step-none-3B5BFF?style=flat-square" alt="No build step">

</div>

---

## <img src="https://api.iconify.design/lucide/book-open.svg?color=%233B5BFF" width="26" height="26" align="top"> About

A **proxy** is when one student covers a class for another, for example by marking attendance. ProxyBook keeps a running balance for each friend:

- You did 2 proxies for a friend, so they owe you **2**.
- They did 1 for you, so the balance drops to **+1** in your favour.
- When you are square, **settle up** and the balance returns to zero. The history stays.

When both people have ProxyBook accounts, entries are **confirmed by the other person** before they count, so the ledger is something both sides agree on.

---

## <img src="https://api.iconify.design/lucide/sparkles.svg?color=%233B5BFF" width="26" height="26" align="top"> Features

| | Feature | Details |
|:-:|---|---|
| <img src="https://api.iconify.design/lucide/home.svg?color=%233B5BFF" width="22"> | **Dashboard** | Total proxies owed to you, drawn as hand-sketched tally marks in groups of five. Shows how many classes you owe, plus your top five balances. |
| <img src="https://api.iconify.design/lucide/arrow-up-right.svg?color=%233B5BFF" width="22"> | **Log a proxy** | Two buttons: *I did a proxy* and *They did a proxy*. Add subject, number of classes (1 to 20), date and a note. |
| <img src="https://api.iconify.design/lucide/inbox.svg?color=%233B5BFF" width="22"> | **Requests inbox** | Accept or decline incoming claims, and cancel your own pending ones. A bell badge shows how many are waiting. |
| <img src="https://api.iconify.design/lucide/users.svg?color=%233B5BFF" width="22"> | **Friends** | Add friends by name, optionally with a username (to sync accounts) and a phone number. Synced friends confirm each other's entries. |
| <img src="https://api.iconify.design/lucide/book-open.svg?color=%233B5BFF" width="22"> | **Ledger** | Searchable list of balances (`+3 owed`, `You owe 2`, `Settled`). Expand a friend to see their last 10 entries. |
| <img src="https://api.iconify.design/lucide/check-circle.svg?color=%233B5BFF" width="22"> | **Settle up** | Adds a settlement entry that zeroes the balance without deleting history. |
| <img src="https://api.iconify.design/lucide/send.svg?color=%233B5BFF" width="22"> | **Nudge** | Opens a prefilled WhatsApp reminder, or copies the message to your clipboard if no phone number is saved. |
| <img src="https://api.iconify.design/lucide/activity.svg?color=%233B5BFF" width="22"> | **Activity log** | Full history filterable by friend, with one-tap **Undo last entry**. Undo adds a reversal instead of deleting, so the audit trail stays intact. |
| <img src="https://api.iconify.design/lucide/settings.svg?color=%233B5BFF" width="22"> | **Account settings** | Change name, username and password, or delete your account (type `DELETE` to confirm). |
| <img src="https://api.iconify.design/lucide/moon.svg?color=%233B5BFF" width="22"> | **Light and dark theme** | Remembered between visits and applied before first paint to avoid a flash. |

### <img src="https://api.iconify.design/lucide/zap.svg?color=%233B5BFF" width="22" height="22" align="top"> Polish and performance

- Responsive layout with a slide-out menu, focus trapping and Escape-to-close.
- Skeleton loaders and a short welcome splash animation.
- Local caching of boot data and history, with background sync (at most every 15 seconds) and a refresh when the tab regains focus.
- Automatic retry for read-only requests, and a 30-second timeout with friendly error messages.
- A wake-up ping to the backend while you type your credentials, to hide Apps Script cold starts.
- All user-supplied text is HTML-escaped before rendering.

---

## <img src="https://api.iconify.design/lucide/layers.svg?color=%233B5BFF" width="26" height="26" align="top"> Tech stack

| Layer | Choice |
|---|---|
| Frontend | Vanilla JavaScript (ES modules), HTML, CSS. No framework, no bundler. |
| Routing | Hash-based single-page app (`#/home`, `#/ledger`, ...) |
| Icons | Inline Lucide-style SVG paths |
| Fonts | Bricolage Grotesque and Figtree (Google Fonts) |
| Backend | Google Apps Script web app (Google Sheet as data store) |
| Hosting | Vercel (static) |

---

## <img src="https://api.iconify.design/lucide/folder-tree.svg?color=%233B5BFF" width="26" height="26" align="top"> Project structure

```text
ProxyBook/
├── index.html    # App shell: header, sidebar, mount point
├── app.js        # All client logic: routing, views, API client, state
├── styles.css    # Styling and light/dark themes
├── config.js     # API_URL pointing to the Apps Script deployment
├── logo.png      # Logo
└── vercel.json   # Cache headers for the logo
```

---

## <img src="https://api.iconify.design/lucide/rocket.svg?color=%233B5BFF" width="26" height="26" align="top"> Getting started

ProxyBook has no build step. Because `app.js` uses ES modules, serve it over HTTP instead of opening the file directly.

```bash
# clone
git clone https://github.com/<your-username>/ProxyBook.git
cd ProxyBook

# serve locally (pick one)
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed local URL.

### Point it at your own backend

Edit `config.js`:

```js
export const API_URL = 'https://script.google.com/macros/s/<YOUR_DEPLOYMENT_ID>/exec';
```

### Deploy

Import the repository into [Vercel](https://vercel.com) as a static site. No build command or output directory is needed.

---

## <img src="https://api.iconify.design/lucide/plug.svg?color=%233B5BFF" width="26" height="26" align="top"> API contract

The frontend talks to a single Apps Script endpoint using `POST` with a `text/plain` body, which avoids CORS preflight requests.

**Request**

```json
{ "action": "addProxy", "token": "<session token>", "payload": { } }
```

**Response**

```json
{ "ok": true,  "data": { } }
{ "ok": false, "error": { "code": "session", "message": "..." } }
```

An error with `code: "session"` clears the local session and sends the user to the login screen.

| Area | Actions |
|---|---|
| Auth | `signup`, `login`, `logout`, `changePassword`, `deleteAccount`, `ping` |
| Profile | `boot`, `updateProfile`, `setUsername`, `checkUsername`, `lookupUser` |
| Friends | `addFriend`, `deleteFriend` |
| Ledger | `addProxy`, `listProxies`, `settleFriend`, `undoLast` |
| Requests | `respondRequest`, `cancelRequest` |

> This repository contains the frontend only. To self-host, implement a backend that honours the contract above.

---

## <img src="https://api.iconify.design/lucide/map.svg?color=%233B5BFF" width="26" height="26" align="top"> Roadmap

- [ ] Self-service password reset (currently handled manually by the sheet owner)
- [ ] Include the Apps Script backend source in the repo

---

## <img src="https://api.iconify.design/lucide/user.svg?color=%233B5BFF" width="26" height="26" align="top"> Author

**Harsheel Kumar Sahoo**

<a href="https://harsheel.vercel.app"><img src="https://img.shields.io/badge/Portfolio-harsheel.vercel.app-3B5BFF?style=flat-square&logo=vercel&logoColor=white" alt="Portfolio"></a>
<a href="https://proxybook.vercel.app"><img src="https://img.shields.io/badge/ProxyBook-proxybook.vercel.app-3B5BFF?style=flat-square&logo=vercel&logoColor=white" alt="ProxyBook live"></a>

<div align="center">
<sub>Built with <img src="https://api.iconify.design/lucide/heart.svg?color=%233B5BFF" width="13" height="13" align="center"> by Harsheel</sub>
</div>
