const HTML = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>دیدپذیری</title>
  <style>
    @font-face { font-family:"IRANSans"; src:url("/fonts/IRANSansWeb-FaNum.ttf") format("truetype"); font-weight:400; font-style:normal; font-display:swap; }
    @font-face { font-family:"IRANSans"; src:url("/fonts/IRANSansWeb-FaNum-Medium.ttf") format("truetype"); font-weight:600; font-style:normal; font-display:swap; }
    @font-face { font-family:"IRANSans"; src:url("/fonts/IRANSansWeb-FaNum-Bold.ttf") format("truetype"); font-weight:700; font-style:normal; font-display:swap; }
    :root { color-scheme: light; --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; --header-h:69px; --filters-h:62px; --sidebar-w:156px; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "IRANSans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); background: var(--bg); }
    .app-shell { min-height:100vh; display:grid; grid-template-columns:minmax(0, 1fr) var(--sidebar-w); grid-template-areas:"main sidebar"; align-items:start; direction:ltr; }
    .app-sidebar { grid-area:sidebar; position:sticky; top:0; height:100vh; overflow:auto; padding:18px 14px; background:var(--panel); border-left:1px solid var(--line); direction:rtl; }
    .app-main { grid-area:main; min-width:0; direction:rtl; }
    .sidebar-brand { padding:4px 8px 18px; border-bottom:1px solid var(--line); margin-bottom:14px; }
    header { position:sticky; top:0; z-index:50; min-height:var(--header-h); padding: 18px 24px; background: var(--panel); border-bottom: 1px solid var(--line); display:flex; gap:16px; align-items:center; justify-content:space-between; }
    .brand { display:flex; gap:14px; align-items:center; }
    .header-tools { display:flex; align-items:center; gap:12px; }
    h1 { margin: 0; font-size: 20px; }
    .page-title { font-size:18px; font-weight:800; color:var(--ink); }
    nav { display:grid; gap:14px; direction:rtl; align-items:stretch; }
    .nav-section { display:grid; gap:6px; padding:0; border:0; background:transparent; }
    .nav-section-title { min-height:28px; display:inline-flex; align-items:center; padding:0 8px; color:var(--muted); background:transparent; font-weight:800; white-space:nowrap; font-size:12px; }
    .nav-section.active .nav-section-title { color:var(--accent); background:#eefbfc; }
    .nav-section-items { display:grid; gap:4px; align-items:stretch; }
    .nav-button { width:100%; height:36px; padding:0 12px; background:#fff; color:var(--ink); border-color:transparent; text-align:right; justify-content:flex-start; }
    .nav-button.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    main { padding: 18px 24px; }
    .page[hidden] { display:none; }
    .filters { position:sticky; top:var(--header-h); z-index:45; display:grid; grid-template-columns: minmax(220px, 1fr) minmax(130px, .5fr) 145px 165px 165px 110px; gap:10px; min-height:var(--filters-h); align-items:center; width:calc(100% + 48px); margin:0 -24px 18px; padding:10px 24px; background:var(--bg); border-bottom:1px solid var(--line); box-shadow:0 8px 16px rgba(22,22,22,.06); }
    .thread-filters { grid-template-columns: minmax(150px, .65fr) minmax(150px, .65fr) minmax(160px, .7fr) minmax(180px, .9fr) minmax(150px, .7fr) 90px 90px 90px minmax(140px, .65fr) 110px; max-width:none; margin:0 -24px 18px; }
    .mobile-filter-toggle { display:none; }
    input, select, button { height: 38px; border: 1px solid var(--line); border-radius: 6px; padding: 0 10px; font: inherit; background: #fff; }
    button { background: var(--accent); color: #fff; border-color: var(--accent); cursor:pointer; }
    .password-wrap { position:relative; display:block; }
    .password-wrap input { width:100%; padding-left:48px; }
    .password-toggle { position:absolute; left:6px; top:5px; width:34px; height:28px; margin:0; padding:0; display:grid; place-items:center; border:1px solid var(--line); background:#fff; color:var(--muted); }
    .password-toggle svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2; }
    .multi-filter { position:relative; min-width:0; }
    .uuid-filter, .hashtag-filter { width:100%; min-width:0; text-align:left; direction:ltr; }
    .hashtag-link { color:#087f8c; font-weight:800; text-decoration:none; cursor:pointer; }
    .hashtag-link:hover { text-decoration:underline; }
    .structured-message { display:grid; gap:8px; white-space:normal; }
    .structured-text { white-space:pre-wrap; overflow-wrap:anywhere; direction:rtl; text-align:right; }
    .structured-code { margin:0; padding:10px 12px; border:1px solid var(--line); border-radius:8px; background:#f6f8fa; color:#172026; direction:ltr; text-align:left; font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; font-size:12px; line-height:1.65; white-space:pre; overflow:auto; max-width:100%; }
    .structured-code-label { display:inline-flex; width:max-content; min-height:20px; align-items:center; padding:0 7px; border:1px solid var(--line); border-radius:999px; background:#eef3f4; color:var(--muted); font-size:10px; font-weight:800; direction:ltr; }
    .structured-preview-badge { flex:0 0 auto; display:inline-flex; align-items:center; height:22px; padding:0 7px; border-radius:999px; background:#eef3f4; color:var(--muted); border:1px solid var(--line); font-size:10px; font-weight:800; }
    .multi-control { position:relative; }
    .multi-button { width:100%; display:grid; grid-template-columns:minmax(0, 1fr) 18px; align-items:center; gap:8px; background:#fff; color:var(--ink); border-color:var(--line); text-align:right; direction:rtl; padding-inline:10px 12px; }
    .multi-button::before { content:"⌄"; grid-column:2; color:var(--muted); font-size:14px; justify-self:center; }
    .multi-clear { position:absolute; left:30px; top:7px; z-index:2; display:none; width:24px; height:24px; padding:0; border-radius:50%; background:#eef3f4; color:var(--muted); border-color:var(--line); font-size:16px; line-height:1; }
    .multi-filter.has-value .multi-clear { display:grid; place-items:center; }
    .multi-filter.has-value .multi-button { padding-left:62px; }
    .multi-clear:hover { background:#dde6e9; color:var(--ink); }
    .multi-label { grid-column:1; grid-row:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-align:right; direction:rtl; }
    .multi-panel { position:fixed; z-index:1200; display:none; width:var(--dropdown-w, 220px); max-height:min(320px, calc(100vh - var(--dropdown-top, 0px) - 12px)); overflow:hidden; padding:6px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 12px 36px rgba(23,32,38,.16); }
    .multi-filter.open .multi-panel { display:grid; grid-template-rows:auto minmax(0, 1fr); gap:6px; }
    .multi-search { width:100%; height:32px; padding:0 8px; border:1px solid var(--line); border-radius:6px; background:#fff; direction:rtl; text-align:right; font-size:12px; }
    .multi-options { min-height:0; overflow:auto; display:grid; gap:2px; overscroll-behavior:contain; }
    .multi-option { min-height:32px; display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:6px; cursor:pointer; }
    .multi-option:hover { background:#f2f6f7; }
    .multi-option input { width:16px; height:16px; flex:0 0 auto; }
    .single-option { width:100%; min-height:32px; display:flex; align-items:center; justify-content:flex-end; padding:6px 8px; border:0; border-radius:6px; background:#fff; color:var(--ink); cursor:pointer; text-align:right; }
    .single-option:hover, .single-option.selected { background:#f2f6f7; }
    .single-option.selected::before { content:"✓"; margin-inline-end:auto; color:var(--accent); font-weight:800; }
    .multi-empty { padding:8px; color:var(--muted); font-size:12px; }
    table { width: 100%; table-layout: fixed; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); direction:rtl; }
    th, td { padding: 6px; border-bottom: 1px solid var(--line); text-align: right; vertical-align: middle; font-size: 12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    th { background: #eef3f4; color: #24343b; position: sticky; top: var(--header-h); z-index:30; }
    .messages-table th { top: calc(var(--header-h) + var(--filters-h)); }
    .groups-table col.group-id { width:10%; }
    .groups-table col.group-name { width:32%; }
    .groups-table col.group-platform { width:7%; }
    .groups-table col.group-bot { width:9%; }
    .groups-table col.group-label { width:14%; }
    .groups-table col.group-username { width:10%; }
    .groups-table col.group-type { width:8%; }
    .groups-table col.group-messages { width:4%; }
    .groups-table col.group-details { width:6%; }
    .groups-table .group-name-cell { overflow:visible; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.5; }
    .senders-table col.sender-id { width:8%; }
    .senders-table col.sender-name { width:8%; }
    .senders-table col.sender-last-name { width:8%; }
    .senders-table col.sender-username { width:10%; }
    .senders-table col.sender-platform { width:6%; }
    .senders-table col.sender-label { width:11%; }
    .senders-table col.sender-last-group { width:22%; }
    .senders-table col.sender-messages { width:5%; }
    .senders-table col.sender-first-seen { width:9%; }
    .senders-table col.sender-last-message { width:8%; }
    .senders-table col.sender-details { width:5%; }
    .senders-table .sender-last-group-cell { overflow:hidden; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.35; }
    .senders-table .sender-date-cell { direction:ltr; text-align:right; line-height:1.35; white-space:normal; }
    .group-label-filter { width:100%; min-width:0; }
    .group-label-filter .multi-button { min-height:32px; font-size:12px; }
    td.body { direction:rtl; text-align:right; }
    .full-cell { overflow:visible; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.45; }
    .message-cell { min-width:0; }
    .message-inner { display:flex; align-items:center; gap:6px; min-width:0; width:100%; }
    .message-inner .clip { flex:1 1 auto; min-width:0; }
    .clip { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .badge { display:inline-flex; align-items:center; height:22px; margin-inline:4px 8px; padding:0 8px; border-radius:999px; background:#fff4d6; color:#7a4a00; border:1px solid #f1cf75; font-size:11px; font-weight:700; direction:ltr; vertical-align:middle; white-space:nowrap; }
    .message-inner .badge { margin-inline:0; }
    .more { flex:0 0 auto; width:24px; height:24px; padding:0; display:inline-grid; place-items:center; border-radius:50%; font-size:16px; font-weight:700; line-height:1; }
    .details-button { height: 28px; padding: 0 8px; font-size: 12px; display:inline-flex; align-items:center; justify-content:center; text-decoration:none; }
    .thread-list { display:grid; gap:14px; max-width:980px; margin:0 auto; direction:rtl; }
    .thread-card { background:var(--panel); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
    .thread-root, .thread-reply, .thread-missing { padding:16px; }
    .thread-replies { border-top:1px solid var(--line); }
    .thread-reply { position:relative; margin-right:var(--thread-reply-indent, 28px); border-right:2px solid var(--line); background:#fff; }
    .thread-reply + .thread-reply { border-top:1px solid var(--line); }
    .thread-expand { padding:10px 16px; margin-right:28px; border-right:2px dashed var(--line); background:#fbfcfd; }
    .thread-expand-button { min-height:30px; padding:0 10px; font-size:12px; }
    .thread-missing { color:var(--muted); background:#fbfcfd; }
    .thread-item { display:grid; grid-template-columns:42px minmax(0, 1fr); gap:10px; align-items:start; }
    .thread-content { min-width:0; }
    .thread-avatar { width:34px; height:34px; border-radius:50%; border:1px solid var(--line); background:#eef3f4; color:#36505a; display:grid; place-items:center; font-weight:800; font-size:13px; direction:ltr; object-fit:cover; }
    .thread-head { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:8px; }
    .thread-author { font-weight:700; color:var(--ink); }
    .thread-muted { color:var(--muted); font-size:12px; }
    .thread-pill { display:inline-flex; align-items:center; height:24px; padding:0 8px; border:1px solid var(--line); border-radius:999px; background:#f7f8fa; color:#24343b; font-size:12px; direction:ltr; }
    .thread-message { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.7; text-align:right; }
    .thread-reactions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:6px; margin-top:8px; direction:ltr; }
    .reaction-chip { display:inline-flex; align-items:center; gap:4px; min-height:24px; padding:2px 6px; border:1px solid var(--line); border-radius:999px; background:#f7f8fa; }
    .reaction-emoji { font-size:15px; line-height:1; }
    .reaction-avatar { width:18px; height:18px; border-radius:50%; border:1px solid var(--line); background:#eef3f4; color:#36505a; display:grid; place-items:center; font-size:10px; font-weight:800; object-fit:cover; direction:ltr; }
    .thread-reply-actions { margin-top:10px; display:grid; gap:8px; direction:rtl; }
    .thread-reply-toggle { height:28px; min-height:28px; padding:0 8px; font-size:12px; }
    .thread-reply-form { width:100%; display:grid; grid-template-columns:minmax(180px, 1fr) auto; gap:8px; direction:rtl; }
    .thread-reply-form[hidden] { display:none; }
    .thread-reply-input { min-height:38px; border:1px solid var(--line); border-radius:6px; padding:8px 10px; resize:vertical; font-family:inherit; font-size:13px; direction:rtl; text-align:right; background:#fff; }
    .thread-reply-submit { min-height:38px; padding:0 12px; }
    .thread-reply-status { grid-column:1 / -1; min-height:18px; color:var(--muted); font-size:11px; }
    .thread-media { clear:both; width:100%; margin-top:12px; margin-bottom:4px; display:flex; justify-content:flex-end; align-items:flex-start; }
    .thread-media.album { justify-content:flex-end; }
    .media-gallery { display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 180px)); gap:8px; justify-content:end; max-width:100%; }
    .media-open.thread-photo-frame { width:180px; height:180px; max-width:100%; padding:0; border:1px solid var(--line); border-radius:8px; background:#f7f8fa; overflow:hidden; display:grid; place-items:center; cursor:zoom-in; }
    .thread-photo { width:100%; height:100%; object-fit:contain; display:block; background:#f7f8fa; }
    .thread-file { display:inline-flex; align-items:center; gap:8px; min-height:34px; padding:0 10px; border:1px solid var(--line); border-radius:8px; background:#f7f8fa; color:var(--ink); text-decoration:none; direction:rtl; }
    .media-actions { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
    .media-actions.album { align-items:flex-start; }
    .media-detail-item { display:grid; gap:6px; justify-items:start; }
    .media-preview { max-width:260px; max-height:220px; border:1px solid var(--line); border-radius:8px; object-fit:contain; display:block; background:#f7f8fa; }
    .media-open { flex:0 0 auto; padding:0; border:0; background:transparent; cursor:zoom-in; display:block; line-height:0; }
    .modal-media { display:grid; gap:14px; justify-items:center; white-space:normal; }
    .modal-image { max-width:100%; max-height:70vh; object-fit:contain; border:1px solid var(--line); border-radius:8px; background:#f7f8fa; }
    td.json { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; }
    td.json .clip { direction:ltr; text-align:left; }
    .meta { min-height:24px; display:flex; align-items:center; gap:8px; color: var(--muted); font-size: 12px; }
    .user-menu { position:relative; direction:ltr; }
    .user-trigger { width:38px; height:38px; padding:0; display:grid; place-items:center; border-radius:50%; border:1px solid var(--line); background:#fff; color:var(--ink); overflow:hidden; }
    .user-avatar { width:100%; height:100%; display:grid; place-items:center; border-radius:50%; background:#eef3f4; color:#36505a; font-weight:800; font-size:13px; object-fit:cover; text-transform:uppercase; }
    .user-panel { position:absolute; left:0; top:calc(100% + 8px); z-index:80; display:none; min-width:220px; padding:8px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 12px 36px rgba(23,32,38,.16); direction:rtl; }
    .user-menu.open .user-panel { display:grid; gap:6px; }
    .user-email { padding:8px; color:var(--muted); font-size:12px; direction:ltr; text-align:left; border-bottom:1px solid var(--line); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .user-action { width:100%; height:34px; display:flex; align-items:center; justify-content:flex-start; background:#fff; color:var(--ink); border-color:transparent; text-align:right; }
    .user-action:hover { background:#f2f6f7; border-color:#f2f6f7; }
    .loading-indicator { display:inline-flex; align-items:center; gap:8px; }
    .spinner { width:18px; height:18px; border-radius:50%; border:2px solid #c9d3d8; border-top-color:var(--accent); animation:spin .75s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }
    .modal-backdrop { position:fixed; inset:0; display:none; align-items:center; justify-content:center; padding:20px; background:rgba(23,32,38,.42); z-index:1000; }
    .modal-backdrop.open { display:flex; }
    .modal { width:min(900px, 100%); max-height:min(82vh, 760px); display:flex; flex-direction:column; background:#fff; border:1px solid var(--line); border-radius:8px; box-shadow:0 20px 70px rgba(23,32,38,.24); direction:rtl; }
    .modal-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; border-bottom:1px solid var(--line); }
    .modal-head h2 { margin:0; font-size:16px; }
    .modal-close { width:34px; height:34px; padding:0; font-size:20px; line-height:1; }
    .modal-body { padding:16px; overflow:auto; white-space:pre-wrap; line-height:1.8; text-align:right; }
    .modal-table-wrap { max-width:100%; overflow:auto; border:1px solid var(--line); white-space:normal; }
    table.modal-table { min-width:760px; table-layout:auto; border:0; box-shadow:none; white-space:normal; }
    .modal-table th, .modal-table td { height:auto; padding:8px 10px; overflow:visible; text-overflow:clip; white-space:normal; line-height:1.55; background:#fff; }
    .modal-table thead th { position:sticky; top:0; z-index:1; background:#e7ecef; font-weight:800; }
    .modal-table tbody tr:hover td { background:#f4f7fb; }
    .confirm-copy { margin:0; color:var(--ink); white-space:normal; }
    .confirm-target { display:inline-block; direction:ltr; font-weight:800; }
    .confirm-target-list { display:grid; gap:6px; max-height:180px; overflow:auto; margin:12px 0; padding:10px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; }
    .confirm-target-item { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:6px 8px; border:1px solid var(--line); border-radius:6px; background:#fff; font-size:12px; }
    .confirm-message-preview { margin:12px 0 0; padding:12px; max-height:220px; overflow:auto; border:1px solid var(--line); border-radius:6px; background:#fff; color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; direction:rtl; text-align:right; line-height:1.8; }
    .confirm-password-row { margin-top:12px; }
    .confirm-error { min-height:20px; margin-top:8px; color:#b42318; font-size:12px; }
    .confirm-actions { display:flex; align-items:center; justify-content:flex-start; gap:10px; margin-top:18px; }
    .confirm-cancel { background:#fff; color:var(--ink); border-color:var(--line); }
    .confirm-danger { background:#b42318; color:#fff; border-color:#b42318; }
    .details-grid { display:grid; gap:10px; white-space:normal; }
    .detail-row { display:grid; grid-template-columns: 190px minmax(0, 1fr); gap:10px; padding:10px; border:1px solid var(--line); border-radius:6px; direction:ltr; text-align:left; }
    .detail-label { color:var(--muted); font-size:12px; font-weight:700; }
    .detail-value { min-width:0; overflow-wrap:anywhere; white-space:pre-wrap; }
    .detail-pre { direction:ltr; text-align:left; font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:12px; line-height:1.55; }
    .chart-panel, .analytics-panel { max-width:1180px; margin:0 auto; padding:18px; background:var(--panel); border:1px solid var(--line); border-radius:8px; }
    .chart-panel.secondary-chart-panel { margin-top:18px; }
    .chart-head { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; margin-bottom:18px; }
    .chart-head h2 { margin:0; font-size:18px; }
    .chart-head p { margin:4px 0 0; color:var(--muted); font-size:12px; }
    .chart-wrap { min-height:380px; overflow-x:auto; overflow-y:hidden; padding:8px 0 2px; }
    .stacked-chart { min-width:720px; height:350px; display:flex; align-items:end; gap:14px; direction:ltr; border-bottom:1px solid var(--line); padding:28px 4px 0; }
    .day-bar { flex:1 0 58px; min-width:58px; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:6px; }
    .bar-total { height:18px; font-size:12px; font-weight:800; color:var(--ink); direction:ltr; }
    .bar-stack { width:100%; min-height:2px; display:flex; flex-direction:column-reverse; border:1px solid var(--line); border-radius:6px 6px 0 0; overflow:hidden; background:#f1f4f6; }
    .bar-segment { width:100%; min-height:2px; cursor:help; }
    .bar-segment:hover { filter:brightness(.92); }
    .bar-label { min-height:34px; color:var(--muted); font-size:11px; text-align:center; line-height:1.35; direction:ltr; }
    .chart-legend { display:grid; gap:10px; margin-top:16px; direction:rtl; }
    .chart-filter-head { display:flex; align-items:center; justify-content:space-between; gap:10px; color:var(--muted); font-size:12px; }
    .chart-filter-head button { height:28px; padding:0 10px; }
    .legend-grid { display:grid; grid-template-columns:repeat(3, minmax(180px, 1fr)); gap:8px; }
    .legend-item { min-height:32px; display:flex; align-items:center; justify-content:flex-start; gap:6px; padding:5px 8px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; color:var(--muted); font-size:12px; cursor:pointer; direction:rtl; text-align:right; }
    .chart-legend .legend-item:hover { background:#eef4f8; border-color:#b8c6d1; color:var(--ink); }
    .legend-item.active { border-color:var(--accent); background:#eefbfc; color:var(--ink); font-weight:700; }
    .chart-legend .legend-item.active:hover { background:var(--accent); border-color:var(--accent); color:#fff; }
    .legend-item.dimmed { opacity:.58; }
    .legend-swatch { width:10px; height:10px; border-radius:2px; flex:0 0 auto; }
    .empty-chart { min-height:240px; display:grid; place-items:center; color:var(--muted); border:1px dashed var(--line); border-radius:8px; }
    .analytics-panel { display:grid; gap:18px; }
    .analytics-summary { display:grid; grid-template-columns:repeat(4, minmax(120px, 1fr)); gap:10px; }
    .analytics-card { padding:14px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; }
    .analytics-card[data-analytics-detail] { cursor:pointer; }
    .analytics-card[data-analytics-detail]:hover { border-color:var(--accent); background:#f4fbfc; }
    .analytics-card strong { display:block; margin-top:8px; font-size:22px; color:var(--ink); direction:rtl; text-align:right; }
    .analytics-card span { color:var(--muted); font-size:12px; }
    .analytics-section-title { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; margin-top:4px; }
    .analytics-section-title h3 { margin:0; font-size:15px; }
    .analytics-section-title p { margin:4px 0 0; color:var(--muted); font-size:12px; }
    .analytics-table th, .analytics-table td { text-align:right; direction:rtl; }
    .analytics-table .metric-number { direction:rtl; text-align:right; white-space:nowrap; }
    .analytics-table .metric-count { direction:ltr; }
    .analytics-table [data-analytics-detail] { cursor:pointer; }
    .analytics-table [data-analytics-detail]:hover { background:#eef4f8; color:var(--ink); }
    .analytics-detail-note { margin:0 0 12px; color:var(--muted); font-size:12px; white-space:normal; }
    .access-panel { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:18px; max-width:1120px; margin:0 auto; }
    .access-panel h2 { margin:0 0 6px; font-size:18px; }
    .bots-panel, .roadmap-panel, .user-groups-panel, .products-panel { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:18px; max-width:1180px; margin:0 auto; }
    .bots-panel h2, .roadmap-panel h2, .user-groups-panel h2, .products-panel h2 { margin:0 0 6px; font-size:18px; }
    .bots-panel p, .roadmap-panel p, .user-groups-panel p, .products-panel p { margin:0 0 16px; }
    .bot-form { display:grid; grid-template-columns:130px minmax(150px, 1fr) minmax(150px, 1fr) minmax(220px, 1.3fr) 110px; gap:10px; align-items:center; margin:14px 0 16px; }
    .bot-form .password-wrap { margin:0; }
    .bot-message { min-height:22px; color:var(--muted); font-size:12px; margin-bottom:10px; }
    .bots-table td:last-child, .bots-table th:last-child { padding-left:12px; }
    .roadmap-form { display:grid; grid-template-columns:repeat(4, minmax(135px, 1fr)) 120px; gap:10px; align-items:center; margin:14px 0 16px; }
    .roadmap-form > * { min-width:0; }
    .roadmap-form textarea { grid-column:1 / -1; min-height:76px; padding:10px; border:1px solid var(--line); border-radius:6px; resize:vertical; font:inherit; direction:rtl; text-align:right; }
    .roadmap-dependencies { grid-column:1 / -1; display:grid; gap:10px; padding:12px; border:1px solid var(--line); background:#fbfcfd; }
    .roadmap-dependency-head { display:flex; align-items:center; justify-content:space-between; gap:10px; color:var(--muted); font-size:12px; font-weight:800; }
    .roadmap-dependency-add { width:38px; height:32px; padding:0; font-size:20px; line-height:1; }
    .roadmap-dependency-list { display:grid; gap:8px; }
    .roadmap-dependency-row { display:grid; grid-template-columns:repeat(4, minmax(120px, 1fr)) 34px; gap:8px; align-items:center; }
    .roadmap-dependency-row > * { min-width:0; }
    .roadmap-dependency-description { grid-column:1 / -1; min-height:96px; padding:10px; border:1px solid var(--line); resize:vertical; font:inherit; direction:rtl; text-align:right; }
    .roadmap-dependency-remove { height:32px; padding:0; color:var(--danger); border-color:#fa4d56; background:#fff; }
    .roadmap-inline-form { display:grid; gap:10px; margin-top:10px; padding:12px; border:1px solid var(--line); background:#fbfcfd; direction:rtl; text-align:right; }
    .roadmap-inline-form h4 { margin:0; font-size:13px; }
    .roadmap-inline-form .roadmap-dependency-row { grid-template-columns:repeat(3, minmax(120px, 1fr)); }
    .roadmap-inline-dependency-list { display:grid; gap:10px; }
    .roadmap-inline-actions { display:flex; align-items:center; justify-content:flex-start; gap:10px; }
    .roadmap-inline-message { min-height:20px; color:var(--muted); font-size:12px; }
    .roadmap-message { min-height:22px; color:var(--muted); font-size:12px; margin-bottom:10px; }
    .roadmap-mini-grid { grid-column:1 / -1; display:grid; grid-template-columns:repeat(3, minmax(180px, 1fr)); gap:10px; }
    .roadmap-checkpoints { grid-column:1 / -1; display:grid; gap:10px; padding:12px; border:1px solid var(--line); background:#fff; }
    .roadmap-checkpoint-row { display:grid; grid-template-columns:minmax(180px, 1fr) minmax(120px, .6fr) minmax(120px, .6fr) minmax(130px, .7fr) 34px; gap:8px; align-items:center; }
    .roadmap-health { display:inline-flex; align-items:center; min-height:24px; padding:0 8px; border-radius:999px; font-size:11px; font-weight:800; border:1px solid var(--line); }
    .roadmap-health.green { color:#087f5b; background:#e6fcf5; border-color:#96f2d7; }
    .roadmap-health.yellow { color:#8a5a00; background:#fff4d6; border-color:#ffd43b; }
    .roadmap-health.red { color:#a2191f; background:#fff1f1; border-color:#ffb3b8; }
    .roadmap-chain { color:var(--muted); font-size:12px; line-height:1.7; direction:ltr; text-align:left; }
    .roadmap-progress { display:grid; gap:4px; min-width:90px; }
    .roadmap-progress-bar { height:7px; border-radius:999px; background:#e5e7eb; overflow:hidden; }
    .roadmap-progress-bar span { display:block; height:100%; background:var(--accent); }
    .roadmap-dashboard { display:grid; gap:16px; margin:16px 0 18px; }
    .roadmap-kpis { display:grid; grid-template-columns:repeat(4, minmax(120px, 1fr)); gap:10px; }
    .roadmap-kpi { min-height:74px; padding:12px; border:1px solid var(--line); border-radius:6px; background:#fff; color:var(--ink); text-align:right; cursor:pointer; }
    .roadmap-kpi strong { display:block; margin-top:6px; font-size:24px; direction:ltr; }
    .roadmap-kpi span { color:var(--muted); font-size:12px; }
    .roadmap-kpi.active { border-color:var(--accent); box-shadow:inset -3px 0 0 var(--accent); }
    .roadmap-filter-bar { display:grid; grid-template-columns:repeat(4, minmax(150px, 1fr)); gap:8px; align-items:start; padding:12px; border:1px solid var(--line); background:#fbfcfd; }
    .roadmap-filter-bar select[multiple] { min-height:42px; height:42px; padding:6px 10px; overflow:hidden; }
    .roadmap-filter-bar input, .roadmap-filter-bar select { min-width:0; }
    .roadmap-matrix-controls { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; }
    .roadmap-matrix-controls h3 { margin:0; font-size:16px; }
    .roadmap-matrix-switches { display:flex; flex-wrap:wrap; gap:8px; }
    .roadmap-matrix-wrap { overflow:auto; border:1px solid var(--line); background:#fff; }
    .roadmap-matrix { display:grid; width:100%; min-width:980px; }
    .roadmap-matrix-head, .roadmap-matrix-row-title, .roadmap-matrix-cell { border-bottom:1px solid var(--line); border-left:1px solid var(--line); padding:8px; min-height:74px; text-align:right; direction:rtl; }
    .roadmap-matrix-head { position:sticky; top:0; z-index:2; min-height:40px; background:#eef1f4; font-size:12px; font-weight:800; }
    .roadmap-matrix-row-title { position:sticky; right:0; z-index:1; display:flex; align-items:flex-start; background:#fff; font-weight:800; line-height:1.6; }
    .roadmap-matrix-head:first-child { position:sticky; right:0; z-index:3; }
    .roadmap-matrix-cell { display:grid; align-content:start; gap:8px; background:#fff; overflow:visible; }
    .roadmap-delivery-card { display:grid; gap:5px; padding:8px; min-height:62px; border:1px solid var(--line); border-right:4px solid var(--card-color, #8d8d8d); border-radius:6px; background:#fff; color:var(--ink); cursor:pointer; font-size:11px; line-height:1.45; text-align:right; white-space:normal; overflow-wrap:anywhere; }
    .roadmap-delivery-card:hover { border-color:var(--accent); background:#f8fbfd; }
    .roadmap-delivery-card strong { display:block; font-size:12px; line-height:1.55; }
    .roadmap-card-meta { color:var(--muted); }
    .roadmap-status-badge, .roadmap-confidence-badge { display:inline-flex; align-items:center; width:max-content; min-height:20px; padding:0 7px; border-radius:999px; border:1px solid var(--line); background:#f4f4f4; color:var(--muted); font-size:10px; font-weight:800; }
    .roadmap-status-badge.status-delivered { color:#0e7a3d; background:#e6f6ec; border-color:#b7e2c5; }
    .roadmap-status-badge.status-at_risk { color:#8a4b00; background:#fff4e5; border-color:#ffd8a8; }
    .roadmap-status-badge.status-blocked { color:#a2191f; background:#fff1f1; border-color:#ffb3b8; }
    .roadmap-status-badge.status-on_track { color:#0f62fe; background:#edf5ff; border-color:#bad8ff; }
    .roadmap-status-badge.status-overdue { color:#a2191f; background:#fff1f1; border-color:#ffb3b8; }
    .roadmap-dep-dot { display:inline-flex; align-items:center; width:max-content; min-height:20px; padding:0 7px; border-radius:999px; border:1px solid var(--line); background:#f4f4f4; color:var(--muted); font-size:10px; font-weight:800; }
    .roadmap-dep-dot.yellow { color:#8a5a00; background:#fff4d6; border-color:#ffd43b; }
    .roadmap-dep-dot.red { color:#a2191f; background:#fff1f1; border-color:#ffb3b8; }
    .roadmap-exec-section { display:grid; gap:10px; padding-top:4px; }
    .roadmap-exec-section h3 { margin:0; font-size:15px; }
    .roadmap-compact-table { display:grid; gap:8px; }
    .roadmap-summary-list { display:grid; gap:8px; }
    .roadmap-summary-item { display:grid; grid-template-columns:minmax(220px, 1.4fr) repeat(4, minmax(110px, .8fr)) auto; gap:10px; align-items:center; padding:10px 12px; border:1px solid var(--line); background:#fff; direction:rtl; text-align:right; }
    .roadmap-summary-item strong { line-height:1.5; }
    .roadmap-summary-meta { color:var(--muted); font-size:12px; line-height:1.5; }
    .roadmap-drawer-backdrop { position:fixed; inset:0; z-index:1001; display:none; background:rgba(22,22,22,.28); }
    .roadmap-drawer-backdrop.open { display:block; }
    .roadmap-drawer { position:absolute; top:0; right:0; width:min(520px, 100%); height:100%; display:flex; flex-direction:column; background:#fff; border-left:1px solid var(--line); box-shadow:-18px 0 50px rgba(0,0,0,.18); direction:rtl; }
    .roadmap-drawer-head { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:14px 16px; border-bottom:1px solid var(--line); }
    .roadmap-drawer-head h2 { margin:0; font-size:17px; }
    .roadmap-drawer-body { padding:16px; overflow:auto; display:grid; gap:14px; }
    .roadmap-drawer-section { display:grid; gap:8px; padding:12px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; }
    .roadmap-drawer-section h3 { margin:0; font-size:13px; }
    .roadmap-drawer-grid { display:grid; grid-template-columns:130px minmax(0, 1fr); gap:8px; font-size:12px; }
    .roadmap-drawer-label { color:var(--muted); font-weight:800; }
    .roadmap-data-details { margin-top:14px; border:1px solid var(--line); background:#fff; }
    .roadmap-data-details summary { cursor:pointer; padding:12px 14px; font-weight:800; background:#eef1f4; }
    .roadmap-data-details .roadmap-table { margin:0; box-shadow:none; border-right:0; border-left:0; }
    .roadmap-data-details .roadmap-table-title { margin:14px 12px 8px; font-size:15px; }
    .roadmap-create-details { margin:12px 0 16px; border:1px solid var(--line); background:#fff; }
    .roadmap-create-details summary { cursor:pointer; padding:12px 14px; font-weight:800; background:#eef1f4; }
    .roadmap-create-details .roadmap-form { margin:12px; }
    .roadmap-create-details .roadmap-message { margin:0 12px 12px; }
    .roadmap-path { margin:16px 0 18px; padding:14px; border:1px solid var(--line); background:#fff; overflow:auto; }
    .roadmap-path-head { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px; }
    .roadmap-path-head h3 { margin:0; font-size:16px; }
    .roadmap-path-note { color:var(--muted); font-size:12px; }
    .roadmap-path-filters { display:grid; grid-template-columns:repeat(2, minmax(180px, 1fr)); gap:10px; margin-bottom:12px; direction:rtl; }
    .roadmap-path-filters select { min-width:0; }
    .roadmap-path-page .roadmap-path { margin:0; min-height:620px; }
    .roadmap-path-page .roadmap-timeline { min-width:1180px; padding-top:280px; padding-bottom:118px; }
    .roadmap-timeline { position:relative; min-width:980px; padding:240px 96px 102px; direction:ltr; }
    .roadmap-axis { position:relative; height:4px; background:#c6c6c6; }
    .roadmap-week-dot { position:absolute; top:50%; width:10px; height:10px; border-radius:50%; background:#fff; border:2px solid var(--muted); transform:translate(-50%, -50%); }
    .roadmap-week-dot.has-items { width:14px; height:14px; border-color:var(--accent); background:var(--accent); }
    .roadmap-month-label { position:absolute; top:24px; transform:translateX(-50%); color:var(--muted); font-size:12px; white-space:nowrap; }
    .roadmap-pin { position:absolute; bottom:8px; width:2px; height:82px; background:var(--pin-color, var(--accent)); transform:translateX(-50%); }
    .roadmap-pin.is-dependency { bottom:auto; top:8px; height:72px; background:repeating-linear-gradient(to bottom, var(--pin-color, var(--accent)) 0 6px, transparent 6px 10px); }
    .roadmap-pin-card { position:absolute; z-index:2; left:50%; bottom:calc(74px + var(--stack-offset, 0px)); width:178px; transform:translateX(-50%); padding:8px; border:1px solid var(--pin-color, var(--line)); border-right:4px solid var(--pin-color, var(--accent)); background:#fbfcfd; color:var(--ink); font-size:11px; line-height:1.5; direction:rtl; text-align:right; box-shadow:0 1px 2px rgba(22,22,22,.08); }
    .roadmap-pin.edge-start .roadmap-pin-card { left:0; transform:none; }
    .roadmap-pin.edge-end .roadmap-pin-card { left:auto; right:0; transform:none; }
    .roadmap-pin.is-dependency .roadmap-pin-card { top:calc(64px + var(--stack-offset, 0px)); bottom:auto; border-style:dashed; background:#fff; }
    .roadmap-pin-kind { display:inline-flex; align-items:center; min-height:18px; padding:0 6px; margin-bottom:4px; border-radius:999px; background:#eef4f8; color:var(--muted); font-size:10px; font-weight:800; }
    .roadmap-pin-card strong { display:block; font-size:12px; margin-bottom:4px; }
    .roadmap-pin.is-outside { background:#8d8d8d; }
    .roadmap-pin.is-outside .roadmap-pin-card { border-color:#8d8d8d; }
    .roadmap-table-title { margin:18px 0 8px; font-size:15px; }
    .roadmap-table th, .roadmap-table td { text-align:right; direction:rtl; }
    .roadmap-table .roadmap-title-cell { overflow:visible; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.5; font-weight:700; }
    .roadmap-table .roadmap-description-cell { overflow:visible; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.6; color:var(--muted); }
    .roadmap-dependency-summary { display:grid; gap:4px; color:var(--muted); font-size:12px; white-space:normal; line-height:1.6; }
    .user-groups-form { display:grid; grid-template-columns:minmax(180px, .8fr) minmax(140px, .7fr) minmax(150px, .75fr) minmax(260px, 1.4fr) 120px; gap:10px; align-items:center; margin:14px 0 16px; }
    .user-groups-message { min-height:22px; color:var(--muted); font-size:12px; margin-bottom:10px; }
    .user-group-list { display:grid; gap:12px; }
    .user-group-card { display:grid; gap:12px; padding:14px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; }
    .user-group-head { display:grid; grid-template-columns:minmax(180px, .8fr) 120px minmax(240px, 1.2fr) auto auto; gap:10px; align-items:center; }
    .user-group-members { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px; }
    .user-group-member { min-height:34px; display:flex; align-items:center; justify-content:flex-start; gap:8px; padding:6px 8px; border:1px solid var(--line); border-radius:6px; background:#fff; font-size:12px; direction:ltr; }
    .user-group-member input { width:15px; height:15px; flex:0 0 auto; }
    .user-group-member span { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .user-group-block-title { margin:4px 0 0; color:var(--muted); font-size:12px; font-weight:800; }
    .products-form { display:grid; grid-template-columns:minmax(150px, .9fr) minmax(120px, .55fr) minmax(150px, .75fr) minmax(170px, .85fr) minmax(180px, 1fr) 120px; gap:10px; align-items:center; margin:14px 0 16px; }
    .products-form > *, .product-head > * { min-width:0; }
    .products-message { min-height:22px; color:var(--muted); font-size:12px; margin-bottom:10px; }
    .product-list { display:grid; gap:12px; }
    .product-card { display:grid; gap:12px; padding:14px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; }
    .product-card.is-child { margin-right:24px; border-right:3px solid var(--accent); }
    .product-head { display:grid; grid-template-columns:minmax(140px, .85fr) minmax(110px, .5fr) minmax(145px, .75fr) minmax(165px, .8fr) minmax(170px, 1fr) 105px 92px 82px; gap:10px; align-items:center; }
    .product-meta { display:flex; flex-wrap:wrap; gap:8px; color:var(--muted); font-size:12px; }
    .broadcast-panel { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:18px; max-width:1120px; margin:0 auto; }
    .broadcast-panel h2 { margin:0 0 6px; font-size:18px; }
    .broadcast-form { display:grid; gap:12px; margin-top:16px; }
    .broadcast-message-input { min-height:140px; border:1px solid var(--line); border-radius:6px; padding:10px; resize:vertical; font-family:inherit; font-size:13px; direction:rtl; text-align:right; }
    .broadcast-groups { display:grid; gap:8px; max-height:360px; overflow:auto; padding:10px; border:1px solid var(--line); border-radius:6px; background:#fff; }
    .broadcast-labels { display:grid; grid-template-columns:repeat(3, minmax(140px, 1fr)); gap:8px; }
    .broadcast-group-grid { display:grid; grid-template-columns:repeat(2, minmax(180px, 1fr)); gap:8px; }
    .broadcast-option { min-height:34px; display:flex; align-items:center; justify-content:flex-start; gap:8px; padding:6px 8px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; font-size:12px; direction:rtl; }
    .broadcast-option input { width:15px; height:15px; flex:0 0 auto; }
    .broadcast-option .group-label-chip { margin-inline-start:auto; padding:2px 6px; border:1px solid var(--line); border-radius:999px; background:#eef4f8; color:var(--muted); font-size:10px; font-weight:700; white-space:nowrap; }
    .broadcast-result { min-height:24px; color:var(--muted); font-size:12px; white-space:pre-wrap; }
    .broadcast-log-panel { margin-top:18px; padding-top:16px; border-top:1px solid var(--line); }
    .broadcast-log-table { margin-top:10px; }
    .broadcast-log-table th, .broadcast-log-table td { text-align:right; direction:rtl; }
    .broadcast-log-table .details-cell { text-align:center; }
    .broadcast-targets-detail { display:grid; gap:6px; }
    .broadcast-target-detail { display:grid; grid-template-columns:minmax(180px, 1fr) auto auto; gap:8px; align-items:center; padding:8px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; }
    .access-tabs { display:flex; justify-content:flex-start; gap:8px; margin:14px 0; direction:ltr; }
    .access-tab { height:32px; padding:0 12px; background:#fff; color:var(--ink); border-color:var(--line); }
    .access-tab.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    .access-section[hidden] { display:none; }
    .access-form { display:grid; grid-template-columns:minmax(220px, 1fr) 120px; gap:10px; margin:14px 0; }
    .access-message { min-height:24px; color:var(--muted); font-size:12px; }
    .access-users-table { margin-top:12px; }
    .access-users-table th, .access-users-table td { text-align:right; direction:rtl; }
    .access-users-table tbody tr { cursor:pointer; }
    .access-users-table tbody tr:hover { background:#f4f8fb; }
    .access-users-table .avatar-cell { text-align:center; }
    .access-table-avatar { width:32px; height:32px; border-radius:50%; border:1px solid var(--line); background:#e8f1ff; color:#0f62fe; display:inline-grid; place-items:center; font-weight:800; font-size:13px; direction:ltr; object-fit:cover; }
    .access-permission-summary { display:flex; flex-wrap:wrap; gap:4px; justify-content:flex-end; }
    .access-permission-chip { display:inline-flex; align-items:center; min-height:22px; padding:0 7px; border:1px solid var(--line); border-radius:999px; background:#f7f8fa; color:var(--muted); font-size:11px; font-weight:700; }
    .access-list { display:grid; gap:10px; margin-top:12px; }
    .access-row { display:grid; gap:10px; padding:12px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; direction:ltr; }
    .access-row.focused { border-color:var(--accent); box-shadow:0 0 0 3px rgba(8,127,140,.14); background:#f0fbfc; }
    .access-row.permissions-dirty { border-color:#78a9ff; box-shadow:0 0 0 2px rgba(15,98,254,.12); }
    .access-main { display:grid; grid-template-columns:minmax(220px, 1fr) minmax(180px, auto) auto; align-items:center; gap:12px; }
    .access-email { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:700; }
    .access-state { min-width:0; color:var(--muted); font-size:12px; line-height:1.6; text-align:right; direction:rtl; }
    .access-actions { display:flex; align-items:center; justify-content:flex-end; gap:10px; }
    .owner-badge { min-height:30px; display:inline-flex; align-items:center; padding:0 10px; border:1px solid #9bd6dd; border-radius:6px; color:var(--accent); background:#f0fbfc; font-size:12px; font-weight:700; }
    .permission-grid { grid-column:1 / -1; display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:8px; direction:ltr; }
    .access-row .permission-grid { grid-column:1 / -1; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); }
    .permission-option { min-height:32px; display:flex; align-items:center; justify-content:flex-start; gap:6px; padding:5px 8px; border:1px solid var(--line); border-radius:6px; background:#fff; font-size:12px; color:var(--ink); }
    .permission-option input { width:14px; height:14px; flex:0 0 auto; }
    .permission-option:has(input:disabled) { opacity:.68; background:#f7f8fa; }
    .group-access-box { grid-column:1 / -1; display:grid; gap:8px; padding:10px; border:1px solid var(--line); border-radius:6px; background:#fff; direction:rtl; }
    .group-access-title { display:flex; justify-content:space-between; gap:10px; color:var(--ink); font-size:12px; font-weight:700; }
    .group-access-title span:last-child { color:var(--muted); font-weight:500; }
    .group-access-grid { display:grid; grid-template-columns:repeat(3, minmax(150px, 1fr)); gap:8px; }
    .group-access-grid.groups { max-height:150px; overflow:auto; padding-inline-end:4px; }
    .group-access-option { min-height:30px; display:flex; align-items:center; justify-content:flex-start; gap:6px; padding:5px 8px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; font-size:12px; color:var(--ink); direction:rtl; }
    .group-access-option .group-label-chip { margin-inline-start:auto; padding:2px 6px; border:1px solid var(--line); border-radius:999px; background:#eef4f8; color:var(--muted); font-size:10px; font-weight:700; white-space:nowrap; }
    .group-access-option input { width:14px; height:14px; flex:0 0 auto; }
    .group-access-option:has(input:disabled) { opacity:.68; background:#f7f8fa; }
    .save-permissions-button { height:30px; padding:0 12px; background:var(--accent); color:#fff; border-color:var(--accent); }
    .save-permissions-button:disabled { cursor:not-allowed; color:var(--muted); border-color:var(--line); background:#f3f5f6; }
    .revoke-button { height:30px; padding:0 10px; background:#fff; color:#b42318; border-color:#f0b8b2; }
    .revoke-button:disabled { cursor:not-allowed; color:var(--muted); border-color:var(--line); background:#f3f5f6; }
    .reactivate-button { height:30px; padding:0 10px; background:#fff; color:var(--accent); border-color:#9bd6dd; }
    .access-log-table { margin-top:12px; direction:ltr; }
    .access-log-table th, .access-log-table td { direction:ltr; text-align:left; }
    .access-log-table th { top:var(--header-h); }
    .access-log-table .details-cell { text-align:center; }
    .access-group-view { display:grid; grid-template-columns:minmax(260px, 1fr) auto; gap:10px; align-items:center; margin:14px 0; }
    .access-group-summary { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:0 0 10px; color:var(--muted); font-size:12px; }
    .access-group-users { display:grid; gap:8px; }
    .access-group-user { display:grid; grid-template-columns:minmax(220px, 1fr) auto auto; gap:10px; align-items:center; padding:10px; border:1px solid var(--line); border-radius:6px; background:#fff; direction:ltr; }
    .access-source-chip { min-height:24px; display:inline-flex; align-items:center; padding:0 8px; border:1px solid var(--line); border-radius:999px; background:#f2f6f8; color:var(--muted); font-size:11px; font-weight:700; direction:rtl; }
    .profile-panel { max-width:640px; margin:0 auto; padding:18px; background:var(--panel); border:1px solid var(--line); border-radius:8px; }
    .profile-panel h2 { margin:0 0 14px; font-size:18px; }
    .profile-form { display:grid; gap:14px; }
    .profile-preview { display:flex; align-items:center; gap:14px; }
    .profile-avatar-large { width:76px; height:76px; display:grid; place-items:center; border:1px solid var(--line); border-radius:50%; background:#eef3f4; color:#36505a; font-weight:800; font-size:22px; object-fit:cover; overflow:hidden; text-transform:uppercase; }
    .profile-email { direction:ltr; text-align:left; font-weight:700; }
    .profile-upload { display:grid; gap:8px; }
    .profile-upload input { padding:7px 10px; height:auto; }
    .telegram-input-wrap { min-height:40px; display:flex; align-items:center; border:1px solid var(--line); border-radius:6px; background:#fff; direction:ltr; overflow:hidden; }
    .telegram-input-wrap:focus-within { outline:2px solid var(--accent); outline-offset:-2px; }
    .telegram-input-prefix { flex:0 0 auto; padding:0 0 0 10px; color:var(--muted); font-weight:800; direction:ltr; }
    .telegram-input-wrap input { min-width:0; flex:1 1 auto; height:38px; border:0; padding:0 10px 0 2px; direction:ltr; text-align:left; }
    .telegram-input-wrap input:focus { outline:0; }
    .profile-message { min-height:22px; color:var(--muted); font-size:12px; }
    :root {
      --ink:#161616;
      --muted:#6f6f6f;
      --line:#e0e0e0;
      --bg:#f4f4f4;
      --panel:#ffffff;
      --accent:#0f62fe;
      --accent-hover:#0353e9;
      --accent-soft:#edf5ff;
      --success:#0e6027;
      --warning-bg:#fcf4d6;
      --warning-border:#f1c21b;
      --warning-text:#684e00;
      --danger:#da1e28;
      --shadow:0 8px 24px rgba(22,22,22,.08);
      --header-h:64px;
      --filters-h:64px;
      --sidebar-w:156px;
    }
    body { color:var(--ink); background:var(--bg); font-size:13px; line-height:1.5; }
    .app-shell { grid-template-columns:minmax(0, 1fr) var(--sidebar-w); grid-template-areas:"main sidebar"; }
    .app-sidebar { padding:16px 8px; background:#fff; border-left:1px solid var(--line); box-shadow:-1px 0 0 rgba(22,22,22,.02); }
    .sidebar-brand { padding:2px 8px 14px; margin-bottom:12px; border-bottom:1px solid var(--line); }
    .sidebar-brand h1 { font-size:22px; line-height:1.3; }
    header { min-height:var(--header-h); padding:12px 24px; background:#fff; border-bottom:1px solid var(--line); box-shadow:0 1px 0 rgba(22,22,22,.02); }
    h1 { font-size:22px; font-weight:800; letter-spacing:0; }
    .page-title { min-height:38px; display:flex; align-items:center; color:#393939; font-size:20px; font-weight:800; }
    .brand { gap:18px; }
    nav { gap:12px; }
    .nav-section { border-radius:0; border:0; background:transparent; }
    .nav-section-title { height:24px; padding:0 8px; background:transparent; color:#6f6f6f; font-size:11px; letter-spacing:0; }
    .nav-section.active .nav-section-title { color:#0f62fe; background:transparent; }
    .nav-section-items { gap:4px; }
    .nav-button { height:34px; padding:0 9px; border-radius:0; border-color:transparent; background:#fff; color:#393939; font-weight:700; justify-content:flex-start; text-align:right; font-size:12px; }
    .nav-button:hover { background:#f4f4f4; border-color:#f4f4f4; }
    .nav-button.active { background:var(--accent); border-color:var(--accent); color:#fff; box-shadow:inset -3px 0 0 rgba(0,0,0,.18); }
    main { padding:18px 24px 28px; }
    .filters { padding:10px 24px; border-bottom:1px solid var(--line); background:var(--bg); }
    input, select, button { border-radius:0; border-color:#c6c6c6; color:var(--ink); }
    input, select { background:#fff; }
    input:focus, select:focus, .multi-button:focus, button:focus { outline:2px solid var(--accent); outline-offset:-2px; }
    button { background:var(--accent); border-color:var(--accent); color:#fff; font-weight:700; }
    button:hover { background:var(--accent-hover); border-color:var(--accent-hover); }
    .multi-button { border-radius:0; border-color:#c6c6c6; background:#fff; color:#393939; font-weight:600; }
    .multi-button:hover { background:#f4f4f4; }
    .multi-clear { border-radius:0; background:#e0e0e0; color:#525252; }
    .multi-panel { border-radius:0; border-color:#8d8d8d; box-shadow:var(--shadow); padding:4px; }
    .multi-option, .single-option { border-radius:0; }
    .multi-option:hover, .single-option:hover, .single-option.selected { background:var(--accent-soft); }
    table { border-color:var(--line); box-shadow:0 1px 0 rgba(22,22,22,.04); }
    th { height:40px; padding:0 10px; background:#e0e0e0; color:#393939; font-size:12px; font-weight:800; border-bottom:1px solid #c6c6c6; }
    td { height:40px; padding:7px 10px; font-size:12px; border-bottom:1px solid var(--line); background:#fff; }
    tbody tr:hover td { background:#f4f7fb; }
    .details-button { height:30px; border-radius:0; background:#393939; border-color:#393939; color:#fff; font-weight:700; }
    .details-button:hover { background:#262626; border-color:#262626; }
    .more { width:26px; height:26px; border-radius:0; background:var(--accent); border-color:var(--accent); }
    .badge { height:22px; border-radius:0; background:var(--warning-bg); color:var(--warning-text); border-color:var(--warning-border); }
    .thread-list { max-width:1040px; gap:12px; }
    .thread-card { border-color:#dfe1e6; border-radius:8px; box-shadow:0 1px 2px rgba(9,30,66,.08); overflow:hidden; }
    .thread-root, .thread-reply, .thread-missing { padding:14px 16px; }
    .thread-replies { border-top:1px solid #dfe1e6; }
    .thread-reply { margin-right:var(--thread-reply-indent, 24px); border-right:2px solid #dfe1e6; background:#fff; }
    .thread-avatar, .reaction-avatar, .user-avatar, .profile-avatar-large { background:#deebff; color:#0747a6; border-color:#b3d4ff; }
    .thread-head { gap:7px; margin-bottom:6px; }
    .thread-author { font-weight:800; }
    .thread-pill { height:24px; border-radius:999px; background:#f4f5f7; border-color:#dfe1e6; color:#44546f; font-weight:600; }
    .thread-muted { color:#626f86; }
    .thread-message { color:#172b4d; line-height:1.75; }
    .reaction-chip { border-color:#dfe1e6; background:#f7f8f9; }
    .media-open.thread-photo-frame, .thread-file, .media-preview, .modal-image { border-color:#dfe1e6; background:#f7f8f9; border-radius:6px; }
    .modal-backdrop { background:rgba(22,22,22,.54); }
    .modal { border-radius:0; border-color:#8d8d8d; box-shadow:0 20px 60px rgba(0,0,0,.28); }
    .modal-head { min-height:54px; padding:12px 16px; background:#fff; border-bottom:1px solid var(--line); }
    .modal-head h2 { font-size:17px; font-weight:800; }
    .modal-close { border-radius:0; }
    .detail-row { border-radius:0; border-color:var(--line); background:#fff; }
    .detail-label { color:#525252; }
    .chart-panel, .analytics-panel, .access-panel, .profile-panel, .bots-panel, .broadcast-panel, .roadmap-panel, .user-groups-panel, .products-panel { border-radius:0; border-color:var(--line); box-shadow:0 1px 0 rgba(22,22,22,.04); }
    .chart-head h2, .access-panel h2, .profile-panel h2, .bots-panel h2, .broadcast-panel h2, .roadmap-panel h2, .user-groups-panel h2, .products-panel h2 { font-size:20px; font-weight:800; }
    .broadcast-message-input, .broadcast-option { border-radius:0; border-color:#dfe1e6; }
    .bar-stack { border-radius:0; border-color:#c6c6c6; }
    .bar-segment { transition:filter .12s ease; }
    .access-tabs { direction:ltr; }
    .access-tab { border-radius:0; border-color:#c6c6c6; font-weight:700; }
    .access-tab.active { background:var(--accent); border-color:var(--accent); }
    .access-row { border-radius:6px; border-color:#dfe1e6; background:#fff; box-shadow:0 1px 2px rgba(9,30,66,.06); }
    .permission-option { border-radius:4px; border-color:#dfe1e6; background:#fafbfc; font-weight:600; }
    .owner-badge { border-radius:999px; background:#e3fcef; border-color:#abf5d1; color:#006644; }
    .revoke-button { border-radius:0; color:var(--danger); border-color:#fa4d56; background:#fff; }
    .revoke-button:hover { background:#fff1f1; color:#a2191f; border-color:#da1e28; }
    .reactivate-button { border-radius:0; color:#0f62fe; border-color:#78a9ff; background:#fff; }
    .reactivate-button:hover { background:#edf5ff; color:#0043ce; border-color:#0f62fe; }
    .user-trigger { border-color:#c6c6c6; background:#fff; }
    .user-panel { border-radius:0; border-color:#8d8d8d; box-shadow:var(--shadow); }
    .user-action { border-radius:0; }
    .user-action:hover { background:var(--accent-soft); border-color:var(--accent-soft); }
    .spinner { border-color:#d0e2ff; border-top-color:var(--accent); }
    @media (max-width: 900px) {
      :root { --header-h:0px; --filters-h:58px; }
      .app-shell { display:block; min-height:100vh; }
      .app-sidebar { position:sticky; top:0; z-index:60; height:auto; max-height:45vh; overflow:auto; padding:10px 14px; border-left:0; border-bottom:1px solid var(--line); box-shadow:0 6px 18px rgba(22,22,22,.08); }
      .sidebar-brand { display:flex; align-items:center; justify-content:space-between; padding:0 2px 10px; margin-bottom:10px; border-bottom:1px solid var(--line); }
      .sidebar-brand h1 { font-size:20px; }
      header { position:static; display:grid; grid-template-columns:1fr auto; align-items:start; gap:10px; padding:12px 14px; }
      .brand { min-width:0; display:grid; gap:10px; }
      .page-title { min-height:34px; font-size:18px; }
      h1 { font-size:20px; }
      nav { width:100%; display:flex; gap:10px; direction:rtl; overflow:auto; padding-bottom:2px; }
      .nav-section { min-width:170px; display:grid; gap:4px; align-items:stretch; }
      .nav-section-title { padding:0 4px; font-size:11px; }
      .nav-section-items { display:grid; grid-template-columns:1fr; gap:4px; }
      .nav-button { min-width:0; width:100%; padding:0 8px; font-size:12px; }
      .header-tools { align-items:start; gap:8px; }
      .meta { max-width:80px; min-height:38px; justify-content:flex-end; font-size:11px; text-align:left; }
      main { padding:12px 14px 22px; }
      .filters { top:0; width:calc(100% + 28px); margin-inline:-14px; padding:10px 14px; grid-template-columns:1fr; gap:8px; align-items:stretch; min-height:var(--filters-h); }
      .mobile-filter-toggle { display:block; width:100%; }
      .filters:not(.mobile-open) > :not(.mobile-filter-toggle) { display:none; }
      .filters.mobile-open > :not(.mobile-filter-toggle) { display:block; }
      .thread-filters { grid-template-columns:1fr 1fr; }
      .thread-filters .mobile-filter-toggle,
      .thread-filters button { grid-column:1 / -1; }
      .multi-panel { width:min(var(--dropdown-w, 100%), calc(100vw - 28px)); max-height:45vh; z-index:1200; }
      .analytics-summary { grid-template-columns:repeat(2, minmax(120px, 1fr)); }
      .messages-table, .groups-table, .senders-table, .bots-table, .roadmap-table, .access-log-table, .broadcast-log-table, .access-users-table, .analytics-table { display:block; border:0; background:transparent; box-shadow:none; }
      .messages-table colgroup, .groups-table colgroup, .senders-table colgroup, .bots-table colgroup, .roadmap-table colgroup, .access-log-table colgroup, .broadcast-log-table colgroup, .access-users-table colgroup, .analytics-table colgroup,
      .messages-table thead, .groups-table thead, .senders-table thead, .bots-table thead, .roadmap-table thead, .access-log-table thead, .broadcast-log-table thead, .access-users-table thead, .analytics-table thead { display:none; }
      .messages-table tbody, .groups-table tbody, .senders-table tbody, .bots-table tbody, .roadmap-table tbody, .access-log-table tbody, .broadcast-log-table tbody, .access-users-table tbody, .analytics-table tbody { display:grid; gap:10px; }
      .messages-table tr, .groups-table tr, .senders-table tr, .bots-table tr, .roadmap-table tr, .access-log-table tr, .broadcast-log-table tr, .access-users-table tr, .analytics-table tr {
        display:grid;
        gap:8px;
        padding:12px;
        border:1px solid var(--line);
        background:#fff;
        box-shadow:0 1px 2px rgba(9,30,66,.08);
      }
      .messages-table td, .groups-table td, .senders-table td, .bots-table td, .roadmap-table td, .access-log-table td, .broadcast-log-table td, .access-users-table td, .analytics-table td {
        min-height:0;
        height:auto;
        display:grid;
        grid-template-columns:minmax(86px, 34%) minmax(0, 1fr);
        gap:10px;
        align-items:start;
        padding:0;
        border:0;
        background:transparent;
        overflow:visible;
        text-overflow:clip;
        white-space:normal;
        overflow-wrap:anywhere;
        font-size:12px;
        text-align:right;
      }
      .messages-table td::before, .groups-table td::before, .senders-table td::before, .bots-table td::before, .roadmap-table td::before, .access-log-table td::before, .broadcast-log-table td::before, .access-users-table td::before, .analytics-table td::before {
        content:attr(data-label);
        color:#525252;
        font-weight:800;
        font-size:11px;
      }
      .messages-table td.body, .messages-table td.message-cell {
        grid-template-columns:1fr;
        padding:10px;
        border:1px solid var(--line);
        background:#f7f8fa;
      }
      .messages-table td.body::before { margin-bottom:4px; }
      .message-inner { align-items:flex-start; }
      .message-inner .clip { white-space:normal; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; }
      .details-button { width:100%; }
      .group-label-filter .multi-button { min-height:36px; }
      .access-log-table { margin-top:10px; direction:rtl; }
      .access-log-table th, .access-log-table td { direction:rtl; text-align:right; }
      .broadcast-log-table { margin-top:10px; direction:rtl; }
      .chart-panel, .analytics-panel, .access-panel, .profile-panel, .bots-panel, .broadcast-panel, .roadmap-panel, .user-groups-panel, .products-panel { padding:14px; }
      .chart-head { align-items:flex-start; flex-direction:column; }
      .legend-grid { grid-template-columns:1fr; }
      .bot-form, .roadmap-form, .user-groups-form, .user-group-head, .products-form, .product-head { grid-template-columns:1fr; }
      .roadmap-form textarea { grid-column:1; }
      .access-form, .access-main { grid-template-columns:1fr; }
      .access-row { direction:rtl; }
      .access-email { white-space:normal; overflow-wrap:anywhere; text-align:left; direction:ltr; }
      .permission-grid, .access-row .permission-grid { grid-template-columns:1fr; direction:rtl; }
      .broadcast-labels, .broadcast-group-grid { grid-template-columns:1fr; }
      .permission-option { justify-content:flex-start; direction:ltr; }
      .access-actions { justify-content:stretch; display:grid; grid-template-columns:1fr; }
      .revoke-button, .reactivate-button, .secondary-button, .save-permissions-button { width:100%; }
      .thread-list { max-width:none; }
      .thread-root, .thread-reply, .thread-missing { padding:12px; }
      .thread-reply { margin-right:min(var(--thread-reply-indent, 10px), 56px); }
      .thread-item { grid-template-columns:34px minmax(0, 1fr); gap:8px; }
      .thread-head { gap:6px; }
      .thread-pill { max-width:100%; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .thread-reply-form { grid-template-columns:1fr; }
      .media-open.thread-photo-frame { width:148px; height:148px; }
      .media-gallery { grid-template-columns:repeat(auto-fit, minmax(112px, 148px)); }
      .detail-row { grid-template-columns:1fr; }
      .modal-backdrop { padding:12px; align-items:flex-start; }
      .modal { max-height:calc(100vh - 24px); }
      .user-panel { left:0; right:auto; max-width:calc(100vw - 28px); }
    }
    @media (max-width: 520px) {
      :root { --header-h:0px; --filters-h:58px; }
      header { grid-template-columns:1fr; }
      .header-tools { width:100%; justify-content:space-between; direction:ltr; }
      .meta { max-width:none; text-align:right; direction:rtl; }
      nav { grid-template-columns:repeat(2, minmax(0, 1fr)); }
      .thread-filters { grid-template-columns:1fr; }
      .signals { grid-template-columns:1fr; }
      .analytics-summary { grid-template-columns:1fr; }
      .messages-table td, .groups-table td, .senders-table td, .bots-table td, .roadmap-table td, .access-log-table td, .broadcast-log-table td, .access-users-table td, .analytics-table td { grid-template-columns:1fr; gap:4px; }
      .messages-table td::before, .groups-table td::before, .senders-table td::before, .bots-table td::before, .roadmap-table td::before, .access-log-table td::before, .broadcast-log-table td::before, .access-users-table td::before, .analytics-table td::before { font-size:10px; }
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="app-sidebar" aria-label="ناوبری اصلی">
      <div class="sidebar-brand">
      <h1>دیدپذیری</h1>
      </div>
      <nav aria-label="صفحه‌های داشبورد">
        <div class="nav-section" id="communicationsNavGroup">
          <span class="nav-section-title">ارتباطات</span>
          <div class="nav-section-items">
            <button class="nav-button" id="dashboardNav" type="button">داشبورد</button>
            <button class="nav-button" id="analyticsNav" type="button">تحلیل</button>
            <button class="nav-button" id="threadsNav" type="button">تردها</button>
            <button class="nav-button active" id="messagesNav" type="button">پیام‌ها</button>
            <button class="nav-button" id="groupsNav" type="button">گروه‌ها</button>
            <button class="nav-button" id="sendersNav" type="button">ارسال‌کننده‌ها</button>
            <button class="nav-button" id="broadcastNav" type="button">اطلاع‌رسانی</button>
            <button class="nav-button" id="botsNav" type="button">بات‌ها</button>
          </div>
        </div>
        <div class="nav-section" id="developmentNavGroup">
          <span class="nav-section-title">توسعه</span>
          <div class="nav-section-items">
            <button class="nav-button" id="roadmapNav" type="button">نقشه راه</button>
            <button class="nav-button" id="roadmapPathNav" type="button">نمای مسیر</button>
            <button class="nav-button" id="productsNav" type="button">محصول‌ها</button>
          </div>
        </div>
        <div class="nav-section" id="managementNavGroup">
          <span class="nav-section-title">مدیریت</span>
          <div class="nav-section-items">
            <button class="nav-button" id="userGroupsNav" type="button">گروه‌بندی کاربران</button>
            <button class="nav-button" id="accessNav" type="button">دسترسی</button>
          </div>
        </div>
      </nav>
    </aside>
    <div class="app-main">
  <header>
    <div class="brand">
      <div class="page-title" id="pageTitle">پیام‌ها</div>
    </div>
    <div class="header-tools">
      <div class="meta" id="status">در حال دریافت...</div>
      <div class="user-menu" id="userMenu">
        <button class="user-trigger" id="userMenuButton" type="button" aria-label="حساب کاربری">
          <span class="user-avatar" id="headerAvatar"></span>
        </button>
        <div class="user-panel" id="userPanel">
          <div class="user-email" id="headerEmail"></div>
          <button class="user-action" id="profileButton" type="button">پروفایل</button>
          <button class="user-action" id="logoutButton" type="button">خروج</button>
        </div>
      </div>
    </div>
  </header>
  <main>
    <section class="page" id="dashboardPage" hidden>
      <section class="chart-panel">
        <div class="chart-head">
          <div>
            <h2>داشبورد</h2>
            <p>تعداد کل پیام‌ها بر اساس روز، با تفکیک رنگی گروه‌ها</p>
          </div>
        </div>
        <div class="chart-wrap" id="dailyChart"></div>
        <div class="chart-legend" id="chartLegend"></div>
      </section>
      <section class="chart-panel secondary-chart-panel">
        <div class="chart-head">
          <div>
            <h2>کاربران پیام‌دهنده</h2>
            <p>تعداد پیام‌ها بر اساس روز، با تفکیک رنگی کاربران</p>
          </div>
        </div>
        <div class="chart-wrap" id="userDailyChart"></div>
        <div class="chart-legend" id="userChartLegend"></div>
      </section>
    </section>
    <section class="page" id="analyticsPage" hidden>
      <section class="analytics-panel">
        <div class="chart-head">
          <div>
            <h2>تحلیل پاسخ‌گویی</h2>
            <p>میانگین زمان پاسخ بر اساس ریپلای‌های واقعی که پیام والدشان در دیتابیس موجود است.</p>
          </div>
        </div>
        <div class="analytics-summary">
          <div class="analytics-card" data-analytics-scope="groups" data-analytics-detail="avg"><span>میانگین کل</span><strong id="analyticsAvg">-</strong></div>
          <div class="analytics-card" data-analytics-scope="groups" data-analytics-detail="count"><span>تعداد پاسخ‌های محاسبه‌شده</span><strong id="analyticsCount">۰</strong></div>
          <div class="analytics-card" data-analytics-scope="groups" data-analytics-detail="min"><span>کمترین زمان پاسخ</span><strong id="analyticsMin">-</strong></div>
          <div class="analytics-card" data-analytics-scope="groups" data-analytics-detail="max"><span>بیشترین زمان پاسخ</span><strong id="analyticsMax">-</strong></div>
        </div>
        <div class="analytics-section-title">
          <div>
            <h3>به تفکیک لیبل</h3>
            <p>میانگین پاسخ‌گویی برای گروه‌های داخلی، مشتریان و پروایدرها</p>
          </div>
        </div>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>لیبل</th>
              <th data-analytics-scope="labels" data-analytics-detail="count">تعداد پاسخ</th>
              <th data-analytics-scope="labels" data-analytics-detail="avg">میانگین</th>
              <th data-analytics-scope="labels" data-analytics-detail="median">میانه</th>
              <th data-analytics-scope="labels" data-analytics-detail="min">کمترین</th>
              <th data-analytics-scope="labels" data-analytics-detail="max">بیشترین</th>
            </tr>
          </thead>
          <tbody id="analyticsLabelRows"></tbody>
        </table>
        <div class="analytics-section-title">
          <div>
            <h3>به تفکیک لیبل افراد</h3>
            <p>میانگین پاسخ‌گویی بر اساس لیبل کسی که پاسخ را ارسال کرده است.</p>
          </div>
        </div>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>لیبل فرد</th>
              <th data-analytics-scope="sender_labels" data-analytics-detail="count">تعداد پاسخ</th>
              <th data-analytics-scope="sender_labels" data-analytics-detail="avg">میانگین</th>
              <th data-analytics-scope="sender_labels" data-analytics-detail="median">میانه</th>
              <th data-analytics-scope="sender_labels" data-analytics-detail="min">کمترین</th>
              <th data-analytics-scope="sender_labels" data-analytics-detail="max">بیشترین</th>
            </tr>
          </thead>
          <tbody id="analyticsSenderLabelRows"></tbody>
        </table>
        <div class="analytics-section-title">
          <div>
            <h3>به تفکیک گروه</h3>
            <p>فقط گروه‌هایی که حداقل یک پاسخ قابل محاسبه دارند نمایش داده می‌شوند.</p>
          </div>
        </div>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>گروه</th>
              <th>پلتفرم</th>
              <th>لیبل</th>
              <th data-analytics-scope="groups" data-analytics-detail="count">تعداد پاسخ</th>
              <th data-analytics-scope="groups" data-analytics-detail="avg">میانگین</th>
              <th data-analytics-scope="groups" data-analytics-detail="median">میانه</th>
              <th data-analytics-scope="groups" data-analytics-detail="min">کمترین</th>
              <th data-analytics-scope="groups" data-analytics-detail="max">بیشترین</th>
            </tr>
          </thead>
          <tbody id="analyticsGroupRows"></tbody>
        </table>
      </section>
    </section>
    <section class="page" id="messagesPage">
      <section class="filters">
        <button class="mobile-filter-toggle" id="messageFilterToggle" type="button">نمایش فیلترها</button>
        <input id="search" placeholder="جست‌وجو در متن پیام، گروه، یوزرنیم..." />
        <input id="hashtagSearch" class="hashtag-filter" type="search" placeholder="# هشتگ" autocomplete="off" />
        <div id="platform" class="multi-filter"></div>
        <div id="group" class="multi-filter"></div>
        <div id="topic" class="multi-filter"></div>
        <button id="refresh">به‌روزرسانی</button>
      </section>
      <table class="messages-table">
        <colgroup>
          <col style="width:6%" />
          <col style="width:8%" />
          <col style="width:12%" />
          <col style="width:7%" />
          <col style="width:6%" />
          <col style="width:6%" />
          <col style="width:7%" />
          <col style="width:25%" />
          <col style="width:10%" />
          <col style="width:8%" />
          <col style="width:5%" />
        </colgroup>
        <thead>
          <tr>
            <th>پلتفرم</th>
            <th>بات</th>
            <th>نام گروه</th>
            <th>تاپیک</th>
            <th>نام فرستنده</th>
            <th>نام خانوادگی فرستنده</th>
            <th>یوزرنیم</th>
            <th>پیام</th>
            <th>زمان ارسال</th>
            <th>زمان ثبت</th>
            <th>جزئیات</th>
          </tr>
        </thead>
        <tbody id="rows"></tbody>
      </table>
    </section>
    <section class="page" id="groupsPage" hidden>
      <table class="groups-table">
        <colgroup>
          <col class="group-id" />
          <col class="group-name" />
          <col class="group-platform" />
          <col class="group-bot" />
          <col class="group-label" />
          <col class="group-username" />
          <col class="group-type" />
          <col class="group-messages" />
          <col class="group-details" />
        </colgroup>
        <thead>
          <tr>
            <th>شناسه گروه</th>
            <th>نام گروه</th>
            <th>پلتفرم</th>
            <th>بات</th>
            <th>لیبل</th>
            <th>یوزرنیم گروه</th>
            <th>نوع گروه</th>
            <th>پیام‌ها</th>
            <th>جزئیات</th>
          </tr>
        </thead>
        <tbody id="groupRows"></tbody>
      </table>
    </section>
    <section class="page" id="sendersPage" hidden>
      <table class="senders-table">
        <colgroup>
          <col class="sender-id" />
          <col class="sender-name" />
          <col class="sender-last-name" />
          <col class="sender-username" />
          <col class="sender-platform" />
          <col class="sender-label" />
          <col class="sender-last-group" />
          <col class="sender-messages" />
          <col class="sender-first-seen" />
          <col class="sender-last-message" />
          <col class="sender-details" />
        </colgroup>
        <thead>
          <tr>
            <th>شناسه فرستنده</th>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>یوزرنیم</th>
            <th>پلتفرم</th>
            <th>لیبل</th>
            <th>آخرین گروه</th>
            <th>پیام‌ها</th>
            <th>زمان پیدا شدن</th>
            <th>آخرین پیام</th>
            <th>جزئیات</th>
          </tr>
        </thead>
        <tbody id="senderRows"></tbody>
      </table>
    </section>
    <section class="page" id="threadsPage" hidden>
      <section class="filters thread-filters">
        <button class="mobile-filter-toggle" id="threadFilterToggle" type="button">نمایش فیلترها</button>
        <div id="threadPlatform" class="multi-filter"></div>
        <input id="threadUuid" class="uuid-filter" type="search" placeholder="UUID" autocomplete="off" />
        <input id="threadHashtag" class="hashtag-filter" type="search" placeholder="# هشتگ" autocomplete="off" />
        <div id="threadLabel" class="multi-filter"></div>
        <div id="threadGroup" class="multi-filter"></div>
        <div id="threadTopic" class="multi-filter"></div>
        <div id="threadYear" class="multi-filter single-filter"></div>
        <div id="threadMonth" class="multi-filter single-filter"></div>
        <div id="threadDay" class="multi-filter single-filter"></div>
        <button id="threadRefresh" type="button">به‌روزرسانی</button>
      </section>
      <div class="thread-list" id="threadRows"></div>
    </section>
    <section class="page" id="roadmapPage" hidden>
      <section class="roadmap-panel">
        <h2>نقشه راه محصول</h2>
        <p class="thread-muted">مدیریت Initiative، Major Delivery، تحویل‌دادنی‌ها، وابستگی‌ها و Checkpointهای مهم.</p>
        <details class="roadmap-create-details">
          <summary>ثبت تحویل‌دادنی جدید</summary>
          <form class="roadmap-form" id="roadmapForm">
          <select id="roadmapItemType" aria-label="نوع مورد">
            <option value="delivery">Delivery / Dependency</option>
            <option value="major">Major Delivery</option>
            <option value="initiative">Initiative / Outcome</option>
          </select>
          <input id="roadmapTitle" type="text" maxlength="180" placeholder="عنوان تحویل‌دادنی" autocomplete="off" required />
          <select id="roadmapInitiative" aria-label="Initiative">
            <option value="">Initiative / Outcome</option>
          </select>
          <select id="roadmapMajor" aria-label="Major Delivery">
            <option value="">Major Delivery</option>
          </select>
          <select id="roadmapProduct" aria-label="محصول">
            <option value="">محصول</option>
          </select>
          <select id="roadmapSubproduct" aria-label="زیرمحصول">
            <option value="">زیرمحصول اختیاری</option>
          </select>
          <select id="roadmapTeam" aria-label="تیم مالک">
            <option value="">تیم مالک</option>
          </select>
          <select id="roadmapStatus" aria-label="وضعیت">
            <option value="not_started">Not Started</option>
            <option value="on_track">On Track</option>
            <option value="at_risk">At Risk</option>
            <option value="blocked">Blocked</option>
            <option value="delivered">Delivered</option>
          </select>
          <select id="roadmapRisk" aria-label="ریسک">
            <option value="low">Risk: Low</option>
            <option value="medium" selected>Risk: Medium</option>
            <option value="high">Risk: High</option>
            <option value="critical">Risk: Critical</option>
          </select>
          <input id="roadmapProgress" type="number" min="0" max="100" step="5" value="0" placeholder="Progress %" />
          <select id="roadmapDeliveryMonth" aria-label="ماه تحویل" required>
            <option value="">ماه تحویل</option>
            <option value="6">شهریور</option>
            <option value="7">مهر</option>
            <option value="8">آبان</option>
            <option value="9">آذر</option>
            <option value="10">دی</option>
            <option value="11">بهمن</option>
            <option value="12">اسفند</option>
          </select>
          <select id="roadmapDeliveryWeek" aria-label="هفته تحویل" required>
            <option value="">هفته تحویل</option>
            <option value="1">هفته اول</option>
            <option value="2">هفته دوم</option>
            <option value="3">هفته سوم</option>
            <option value="4">هفته چهارم</option>
          </select>
          <button type="submit">ثبت تحویل‌دادنی</button>
          <textarea id="roadmapDescription" maxlength="4000" placeholder="توضیحات، محدوده و معیار تحویل"></textarea>
          <div class="roadmap-dependencies">
            <div class="roadmap-dependency-head">
              <span>Dependency Relation: Provider Delivery → blocks → این تحویل‌دادنی</span>
              <button class="roadmap-dependency-add" id="roadmapDependencyAdd" type="button" aria-label="افزودن وابستگی">+</button>
            </div>
            <div class="roadmap-dependency-list" id="roadmapDependencyList"></div>
          </div>
          <div class="roadmap-checkpoints">
            <div class="roadmap-dependency-head">
              <span>Checkpointها / Milestoneها</span>
              <button class="roadmap-dependency-add" id="roadmapCheckpointAdd" type="button" aria-label="افزودن چک‌پوینت">+</button>
            </div>
            <div class="roadmap-dependency-list" id="roadmapCheckpointList"></div>
          </div>
          </form>
          <div class="roadmap-message" id="roadmapMessage"></div>
        </details>
        <section class="roadmap-dashboard" aria-label="Executive Delivery Dashboard">
          <div class="roadmap-kpis" id="roadmapKpis"></div>
          <div class="roadmap-filter-bar">
            <select id="roadmapFilterProduct" multiple size="1" aria-label="فیلتر محصول"></select>
            <select id="roadmapFilterInitiative" multiple size="1" aria-label="فیلتر Initiative"></select>
            <select id="roadmapFilterTeam" multiple size="1" aria-label="فیلتر تیم"></select>
            <select id="roadmapFilterOwner" multiple size="1" aria-label="فیلتر مالک"></select>
            <select id="roadmapFilterStatus" multiple size="1" aria-label="فیلتر وضعیت"></select>
            <select id="roadmapFilterConfidence" multiple size="1" aria-label="فیلتر Confidence"></select>
            <select id="roadmapFilterRange" aria-label="بازه زمانی">
              <option value="all">شهریور تا اسفند</option>
              <option value="next30">۳۰ روز آینده</option>
              <option value="next60">۶۰ روز آینده</option>
              <option value="next90">۹۰ روز آینده</option>
              <option value="risk">Risk / Blocked</option>
              <option value="done">Delivered</option>
            </select>
            <input id="roadmapSearch" type="search" placeholder="Search Delivery" autocomplete="off" />
          </div>
          <div class="roadmap-matrix-controls">
            <h3>Roadmap Matrix</h3>
            <div class="roadmap-matrix-switches">
              <select id="roadmapMatrixRows" aria-label="محور عمودی">
                <option value="initiative_product">Initiative / Product</option>
                <option value="product">Product</option>
                <option value="initiative">Initiative</option>
                <option value="team">Team</option>
              </select>
              <select id="roadmapMatrixGranularity" aria-label="نمای زمانی">
                <option value="month">Month</option>
                <option value="biweekly">Biweekly</option>
              </select>
            </div>
          </div>
          <div class="roadmap-matrix-wrap" id="roadmapMatrix"></div>
          <section class="roadmap-exec-section">
            <h3>Next 30 Days</h3>
            <div class="roadmap-compact-table" id="roadmapNext30"></div>
          </section>
          <section class="roadmap-exec-section">
            <h3>Risks & Dependencies</h3>
            <div class="roadmap-compact-table" id="roadmapRisks"></div>
          </section>
          <section class="roadmap-exec-section">
            <h3>Recently Delivered</h3>
            <div class="roadmap-compact-table" id="roadmapDelivered"></div>
          </section>
        </section>
        <details class="roadmap-data-details">
          <summary>جدول داده‌ها و وابستگی‌ها</summary>
          <table class="roadmap-table">
            <colgroup>
              <col style="width:22%" />
              <col style="width:10%" />
              <col style="width:14%" />
              <col style="width:14%" />
              <col style="width:12%" />
              <col style="width:10%" />
              <col style="width:10%" />
              <col style="width:8%" />
              <col style="width:4%" />
            </colgroup>
            <thead>
              <tr>
                <th>تحویل‌دادنی</th>
                <th>سطح</th>
                <th>مدیر محصول</th>
                <th>محصول</th>
                <th>تیم</th>
                <th>زمان تحویل</th>
                <th>وضعیت</th>
                <th>Progress</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody id="roadmapRows"></tbody>
          </table>
          <h3 class="roadmap-table-title">وابستگی‌ها</h3>
          <table class="roadmap-table roadmap-dependencies-table">
            <colgroup>
              <col style="width:18%" />
              <col style="width:17%" />
              <col style="width:17%" />
              <col style="width:11%" />
              <col style="width:11%" />
              <col style="width:9%" />
              <col style="width:14%" />
              <col style="width:3%" />
            </colgroup>
            <thead>
              <tr>
                <th>وابستگی</th>
                <th>Provider</th>
                <th>Consumer</th>
                <th>Need-by</th>
                <th>Expected</th>
                <th>Health</th>
                <th>Chain</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody id="roadmapDependencyRows"></tbody>
          </table>
        </details>
      </section>
    </section>
    <section class="page roadmap-path-page" id="roadmapPathPage" hidden>
      <section class="roadmap-panel">
        <h2>نمای مسیر راه</h2>
        <p class="thread-muted">نمای بزرگ مسیر تحویل‌دادنی‌ها و وابستگی‌ها بر اساس محصول یا تیم.</p>
        <section class="roadmap-path" aria-label="نمای بزرگ مسیر راه">
          <div class="roadmap-path-head">
            <h3>مسیر شهریور تا اسفند</h3>
            <span class="roadmap-path-note">پین‌های خطی: تحویل‌دادنی‌ها، پین‌های خط‌چین: وابستگی‌ها</span>
          </div>
          <div class="roadmap-path-filters">
            <select id="roadmapFullTimelineProduct" aria-label="فیلتر محصول نمای مسیر"></select>
            <select id="roadmapFullTimelineTeam" aria-label="فیلتر تیم نمای مسیر"></select>
          </div>
          <div class="roadmap-timeline" id="roadmapFullTimeline"></div>
        </section>
      </section>
    </section>
    <section class="page" id="userGroupsPage" hidden>
      <section class="user-groups-panel">
        <h2>گروه‌بندی کاربران</h2>
        <p class="thread-muted">گروه‌های داخلی کاربران برای استفاده عملیاتی؛ این گروه‌ها سطح دسترسی کاربران را تغییر نمی‌دهند.</p>
        <form class="user-groups-form" id="userGroupForm">
          <input id="userGroupName" type="text" maxlength="120" placeholder="نام گروه" autocomplete="off" required />
          <select id="userGroupType" aria-label="نوع گروه">
            <option value="squad">Squad</option>
            <option value="gtm">GTM</option>
            <option value="content">Content</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="account">Account</option>
            <option value="commercial">Commercial</option>
            <option value="product_design">Product Design</option>
            <option value="product_management">Product Management</option>
            <option value="product_operations">Product Operations</option>
            <option value="engineering">Engineering</option>
          </select>
          <select id="userGroupMode" aria-label="ساختار گروه">
            <option value="functional">Functional</option>
            <option value="cross_functional">Cross-Functional</option>
          </select>
          <input id="userGroupDescription" type="text" maxlength="500" placeholder="توضیح کوتاه" autocomplete="off" />
          <button type="submit">ساخت گروه</button>
        </form>
        <div class="user-groups-message" id="userGroupsMessage"></div>
        <div class="user-group-list" id="userGroupList"></div>
      </section>
    </section>
    <section class="page" id="productsPage" hidden>
      <section class="products-panel">
        <h2>محصول‌ها</h2>
        <p class="thread-muted">فهرست محصول‌های داخلی برای استفاده در بخش‌های توسعه و گزارش‌گیری.</p>
        <form class="products-form" id="productForm">
          <input id="productName" type="text" maxlength="140" placeholder="نام محصول" autocomplete="off" required />
          <input id="productKey" type="text" maxlength="80" placeholder="کلید محصول" autocomplete="off" dir="ltr" />
          <select id="productParent" aria-label="محصول مادر">
            <option value="">محصول اصلی</option>
          </select>
          <select id="productOwner" aria-label="مدیر محصول">
            <option value="">بدون مدیر محصول</option>
          </select>
          <input id="productDescription" type="text" maxlength="600" placeholder="توضیح کوتاه" autocomplete="off" />
          <button type="submit">ساخت محصول</button>
        </form>
        <div class="products-message" id="productsMessage"></div>
        <div class="product-list" id="productList"></div>
      </section>
    </section>
    <section class="page" id="botsPage" hidden>
      <section class="bots-panel">
        <h2>مدیریت بات‌ها</h2>
        <p class="thread-muted">بات‌های هر پلتفرم و تعداد گروه‌ها و پیام‌هایی که با هر بات ثبت شده است.</p>
        <form class="bot-form" id="botForm">
          <div id="botPlatform" class="multi-filter single-filter"></div>
          <input id="botName" type="text" placeholder="نام بات" autocomplete="off" />
          <input id="botUsername" type="text" placeholder="یوزرنیم بات" autocomplete="off" dir="ltr" />
          <span class="password-wrap">
            <input id="botToken" type="password" placeholder="توکن بات" autocomplete="off" dir="ltr" />
            <button class="password-toggle" id="botTokenToggle" type="button" aria-label="نمایش توکن">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </span>
          <button type="submit">افزودن بات</button>
        </form>
        <div class="bot-message" id="botMessage"></div>
        <table class="bots-table">
          <colgroup>
            <col style="width:12%" />
            <col style="width:17%" />
            <col style="width:17%" />
            <col style="width:14%" />
            <col style="width:8%" />
            <col style="width:8%" />
            <col style="width:16%" />
            <col style="width:8%" />
          </colgroup>
          <thead>
            <tr>
              <th>پلتفرم</th>
              <th>نام بات</th>
              <th>یوزرنیم بات</th>
              <th>شناسه بات</th>
              <th>گروه‌ها</th>
              <th>پیام‌ها</th>
              <th>آخرین دریافت</th>
              <th>جزئیات</th>
            </tr>
          </thead>
          <tbody id="botRows"></tbody>
        </table>
      </section>
    </section>
    <section class="page" id="broadcastPage" hidden>
      <section class="broadcast-panel">
        <h2>اطلاع‌رسانی گروهی</h2>
        <p class="thread-muted">ارسال پیام گروهی حساس است. فقط گروه‌هایی که به آن‌ها دسترسی دارید قابل انتخاب هستند و قبل از ارسال، پسورد شما دوباره بررسی می‌شود.</p>
        <form class="broadcast-form" id="broadcastForm">
          <div class="group-access-title"><strong>انتخاب سریع بر اساس لیبل</strong><span id="broadcastSelectedCount">۰ گروه انتخاب شده</span></div>
          <div class="broadcast-labels" id="broadcastLabels"></div>
          <div class="group-access-title"><strong>گروه‌ها</strong><span>پیام به همه گروه‌های انتخاب‌شده ارسال می‌شود.</span></div>
          <div class="broadcast-groups">
            <div class="broadcast-group-grid" id="broadcastGroups"></div>
          </div>
          <textarea class="broadcast-message-input" id="broadcastBody" maxlength="3500" placeholder="متن اطلاع‌رسانی..."></textarea>
          <button type="submit">ارسال گروهی</button>
          <div class="broadcast-result" id="broadcastResult"></div>
        </form>
        <section class="broadcast-log-panel">
          <div class="group-access-title">
            <strong>لاگ اطلاع‌رسانی‌ها</strong>
            <button class="secondary-button" id="broadcastLogRefresh" type="button">به‌روزرسانی لاگ</button>
          </div>
          <div class="access-message" id="broadcastLogMessage"></div>
          <table class="broadcast-log-table">
            <colgroup>
              <col style="width:18%" />
              <col style="width:18%" />
              <col style="width:22%" />
              <col style="width:24%" />
              <col style="width:10%" />
              <col style="width:8%" />
            </colgroup>
            <thead>
              <tr>
                <th>فرستنده</th>
                <th>زمان</th>
                <th>گروه‌های هدف</th>
                <th>متن</th>
                <th>نتیجه</th>
                <th>جزئیات</th>
              </tr>
            </thead>
            <tbody id="broadcastLogRows"></tbody>
          </table>
        </section>
      </section>
    </section>
    <section class="page" id="accessPage" hidden>
      <section class="access-panel">
        <h2>دسترسی</h2>
        <p class="thread-muted">فقط ایمیل‌های دامنه toman.ir قابل اضافه شدن هستند. برای کاربر ایمیل دعوت ارسال می‌شود.</p>
        <div class="access-tabs">
          <button class="access-tab active" id="accessUsersTab" type="button">کاربران</button>
          <button class="access-tab" id="accessGroupsTab" type="button">گروه‌ها</button>
          <button class="access-tab" id="accessLogsTab" type="button">لاگ‌ها</button>
        </div>
        <section class="access-section" id="accessUsersSection">
          <form class="access-form" id="accessForm">
            <input id="accessEmail" type="email" placeholder="anything@toman.ir" autocomplete="off" />
            <button type="submit">افزودن</button>
            <div class="permission-grid" id="accessNewPermissions"></div>
          </form>
          <div class="access-message" id="accessMessage"></div>
          <table class="access-users-table">
            <colgroup>
              <col style="width:8%" />
              <col style="width:22%" />
              <col style="width:16%" />
              <col style="width:14%" />
              <col style="width:14%" />
              <col style="width:14%" />
              <col style="width:12%" />
            </colgroup>
            <thead>
              <tr>
                <th>آواتار</th>
                <th>ایمیل</th>
                <th>یوزرنیم تلگرام</th>
                <th>وضعیت</th>
                <th>تاریخ ثبت</th>
                <th>آخرین ورود</th>
                <th>دسترسی‌ها</th>
              </tr>
            </thead>
            <tbody id="accessUserRows"></tbody>
          </table>
          <div class="access-list" id="accessRows"></div>
        </section>
        <section class="access-section" id="accessGroupsSection" hidden>
          <div class="access-group-view">
            <div id="accessGroupSelect" class="multi-filter single-filter"></div>
            <button class="secondary-button" id="accessGroupRefresh" type="button">به‌روزرسانی</button>
          </div>
          <div class="access-group-summary" id="accessGroupSummary"></div>
          <div class="access-group-users" id="accessGroupUsers"></div>
        </section>
        <section class="access-section" id="accessLogsSection" hidden>
          <div class="access-message" id="accessLogMessage"></div>
          <table class="access-log-table">
            <colgroup>
              <col style="width:13%" />
              <col style="width:26%" />
              <col style="width:26%" />
              <col style="width:23%" />
              <col style="width:12%" />
            </colgroup>
            <thead>
              <tr>
                <th>عملیات</th>
                <th>انجام‌دهنده</th>
                <th>کاربر هدف</th>
                <th>زمان (تهران)</th>
                <th>جزئیات</th>
              </tr>
            </thead>
            <tbody id="accessLogRows"></tbody>
          </table>
        </section>
      </section>
    </section>
    <section class="page" id="profilePage" hidden>
      <section class="profile-panel">
        <h2>پروفایل</h2>
        <form class="profile-form" id="profileForm">
          <div class="profile-preview">
            <span class="profile-avatar-large" id="profileAvatar"></span>
            <div>
              <div class="thread-muted">ایمیل</div>
              <div class="profile-email" id="profileEmail"></div>
              <div class="thread-muted" id="profileAvatarHint"></div>
            </div>
          </div>
          <label class="profile-upload">
            <span class="thread-muted">یوزرنیم تلگرام</span>
            <span class="telegram-input-wrap">
              <span class="telegram-input-prefix">@</span>
              <input id="profileTelegramUsername" type="text" inputmode="latin" autocomplete="off" placeholder="نام‌کاربری" />
            </span>
          </label>
          <button type="submit">ذخیره پروفایل</button>
          <div class="profile-message" id="profileMessage"></div>
        </form>
      </section>
    </section>
  </main>
    </div>
  </div>
  <div class="modal-backdrop" id="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal">
      <div class="modal-head">
        <h2 id="modalTitle">متن کامل پیام</h2>
        <button class="modal-close" id="modalClose" type="button" aria-label="بستن">×</button>
      </div>
      <div class="modal-body" id="modalBody"></div>
    </div>
  </div>
  <script>
    const rowsEl = document.getElementById("rows");
    const groupRowsEl = document.getElementById("groupRows");
    const senderRowsEl = document.getElementById("senderRows");
    const threadRowsEl = document.getElementById("threadRows");
    const dailyChartEl = document.getElementById("dailyChart");
    const chartLegendEl = document.getElementById("chartLegend");
    const userDailyChartEl = document.getElementById("userDailyChart");
    const userChartLegendEl = document.getElementById("userChartLegend");
    const statusEl = document.getElementById("status");
    const pageTitleEl = document.getElementById("pageTitle");
    const dashboardNavEl = document.getElementById("dashboardNav");
    const analyticsNavEl = document.getElementById("analyticsNav");
    const messagesNavEl = document.getElementById("messagesNav");
    const roadmapNavEl = document.getElementById("roadmapNav");
    const roadmapPathNavEl = document.getElementById("roadmapPathNav");
    const productsNavEl = document.getElementById("productsNav");
    const userGroupsNavEl = document.getElementById("userGroupsNav");
    const groupsNavEl = document.getElementById("groupsNav");
    const sendersNavEl = document.getElementById("sendersNav");
    const threadsNavEl = document.getElementById("threadsNav");
    const broadcastNavEl = document.getElementById("broadcastNav");
    const botsNavEl = document.getElementById("botsNav");
    const accessNavEl = document.getElementById("accessNav");
    const communicationsNavGroupEl = document.getElementById("communicationsNavGroup");
    const developmentNavGroupEl = document.getElementById("developmentNavGroup");
    const managementNavGroupEl = document.getElementById("managementNavGroup");
    const dashboardPageEl = document.getElementById("dashboardPage");
    const analyticsPageEl = document.getElementById("analyticsPage");
    const messagesPageEl = document.getElementById("messagesPage");
    const groupsPageEl = document.getElementById("groupsPage");
    const sendersPageEl = document.getElementById("sendersPage");
    const threadsPageEl = document.getElementById("threadsPage");
    const roadmapPageEl = document.getElementById("roadmapPage");
    const roadmapPathPageEl = document.getElementById("roadmapPathPage");
    const productsPageEl = document.getElementById("productsPage");
    const userGroupsPageEl = document.getElementById("userGroupsPage");
    const broadcastPageEl = document.getElementById("broadcastPage");
    const botsPageEl = document.getElementById("botsPage");
    const accessPageEl = document.getElementById("accessPage");
    const searchEl = document.getElementById("search");
    const hashtagSearchEl = document.getElementById("hashtagSearch");
    const messageFilterToggleEl = document.getElementById("messageFilterToggle");
    const platformEl = document.getElementById("platform");
    const groupEl = document.getElementById("group");
    const topicEl = document.getElementById("topic");
    const refreshEl = document.getElementById("refresh");
    const threadFilterToggleEl = document.getElementById("threadFilterToggle");
    const threadPlatformEl = document.getElementById("threadPlatform");
    const threadUuidEl = document.getElementById("threadUuid");
    const threadHashtagEl = document.getElementById("threadHashtag");
    const threadLabelEl = document.getElementById("threadLabel");
    const threadGroupEl = document.getElementById("threadGroup");
    const threadTopicEl = document.getElementById("threadTopic");
    const threadYearEl = document.getElementById("threadYear");
    const threadMonthEl = document.getElementById("threadMonth");
    const threadDayEl = document.getElementById("threadDay");
    const threadRefreshEl = document.getElementById("threadRefresh");
    const modalBackdropEl = document.getElementById("modalBackdrop");
    const modalTitleEl = document.getElementById("modalTitle");
    const modalBodyEl = document.getElementById("modalBody");
    const modalCloseEl = document.getElementById("modalClose");
    const userMenuEl = document.getElementById("userMenu");
    const userMenuButtonEl = document.getElementById("userMenuButton");
    let headerAvatarEl = document.getElementById("headerAvatar");
    const headerEmailEl = document.getElementById("headerEmail");
    const profileButtonEl = document.getElementById("profileButton");
    const logoutButtonEl = document.getElementById("logoutButton");
    const profilePageEl = document.getElementById("profilePage");
    const profileFormEl = document.getElementById("profileForm");
    let profileAvatarEl = document.getElementById("profileAvatar");
    const profileEmailEl = document.getElementById("profileEmail");
    const profileAvatarHintEl = document.getElementById("profileAvatarHint");
    const profileTelegramUsernameEl = document.getElementById("profileTelegramUsername");
    const profileMessageEl = document.getElementById("profileMessage");
    const analyticsAvgEl = document.getElementById("analyticsAvg");
    const analyticsCountEl = document.getElementById("analyticsCount");
    const analyticsMinEl = document.getElementById("analyticsMin");
    const analyticsMaxEl = document.getElementById("analyticsMax");
    const analyticsLabelRowsEl = document.getElementById("analyticsLabelRows");
    const analyticsSenderLabelRowsEl = document.getElementById("analyticsSenderLabelRows");
    const analyticsGroupRowsEl = document.getElementById("analyticsGroupRows");
    const accessUsersTabEl = document.getElementById("accessUsersTab");
    const accessGroupsTabEl = document.getElementById("accessGroupsTab");
    const accessLogsTabEl = document.getElementById("accessLogsTab");
    const accessUsersSectionEl = document.getElementById("accessUsersSection");
    const accessGroupsSectionEl = document.getElementById("accessGroupsSection");
    const accessLogsSectionEl = document.getElementById("accessLogsSection");
    const accessFormEl = document.getElementById("accessForm");
    const accessEmailEl = document.getElementById("accessEmail");
    const accessNewPermissionsEl = document.getElementById("accessNewPermissions");
    const accessMessageEl = document.getElementById("accessMessage");
    const accessUserRowsEl = document.getElementById("accessUserRows");
    const accessRowsEl = document.getElementById("accessRows");
    const accessGroupSelectEl = document.getElementById("accessGroupSelect");
    const accessGroupRefreshEl = document.getElementById("accessGroupRefresh");
    const accessGroupSummaryEl = document.getElementById("accessGroupSummary");
    const accessGroupUsersEl = document.getElementById("accessGroupUsers");
    const accessLogMessageEl = document.getElementById("accessLogMessage");
    const accessLogRowsEl = document.getElementById("accessLogRows");
    const botRowsEl = document.getElementById("botRows");
    const botFormEl = document.getElementById("botForm");
    const botPlatformEl = document.getElementById("botPlatform");
    const botNameEl = document.getElementById("botName");
    const botUsernameEl = document.getElementById("botUsername");
    const botTokenEl = document.getElementById("botToken");
    const botTokenToggleEl = document.getElementById("botTokenToggle");
    const botMessageEl = document.getElementById("botMessage");
    const broadcastFormEl = document.getElementById("broadcastForm");
    const broadcastLabelsEl = document.getElementById("broadcastLabels");
    const broadcastGroupsEl = document.getElementById("broadcastGroups");
    const broadcastSelectedCountEl = document.getElementById("broadcastSelectedCount");
    const broadcastBodyEl = document.getElementById("broadcastBody");
    const broadcastResultEl = document.getElementById("broadcastResult");
    const broadcastLogRefreshEl = document.getElementById("broadcastLogRefresh");
    const broadcastLogMessageEl = document.getElementById("broadcastLogMessage");
    const broadcastLogRowsEl = document.getElementById("broadcastLogRows");
    const roadmapRowsEl = document.getElementById("roadmapRows");
    const roadmapDependencyRowsEl = document.getElementById("roadmapDependencyRows");
    const roadmapFormEl = document.getElementById("roadmapForm");
    const roadmapItemTypeEl = document.getElementById("roadmapItemType");
    const roadmapTitleEl = document.getElementById("roadmapTitle");
    const roadmapInitiativeEl = document.getElementById("roadmapInitiative");
    const roadmapMajorEl = document.getElementById("roadmapMajor");
    const roadmapProductEl = document.getElementById("roadmapProduct");
    const roadmapSubproductEl = document.getElementById("roadmapSubproduct");
    const roadmapTeamEl = document.getElementById("roadmapTeam");
    const roadmapStatusEl = document.getElementById("roadmapStatus");
    const roadmapRiskEl = document.getElementById("roadmapRisk");
    const roadmapProgressEl = document.getElementById("roadmapProgress");
    const roadmapDeliveryMonthEl = document.getElementById("roadmapDeliveryMonth");
    const roadmapDeliveryWeekEl = document.getElementById("roadmapDeliveryWeek");
    const roadmapDescriptionEl = document.getElementById("roadmapDescription");
    const roadmapDependencyAddEl = document.getElementById("roadmapDependencyAdd");
    const roadmapDependencyListEl = document.getElementById("roadmapDependencyList");
    const roadmapCheckpointAddEl = document.getElementById("roadmapCheckpointAdd");
    const roadmapCheckpointListEl = document.getElementById("roadmapCheckpointList");
    const roadmapMessageEl = document.getElementById("roadmapMessage");
    const roadmapTimelineEl = document.getElementById("roadmapTimeline");
    const roadmapTimelineProductEl = document.getElementById("roadmapTimelineProduct");
    const roadmapTimelineTeamEl = document.getElementById("roadmapTimelineTeam");
    const roadmapFullTimelineEl = document.getElementById("roadmapFullTimeline");
    const roadmapFullTimelineProductEl = document.getElementById("roadmapFullTimelineProduct");
    const roadmapFullTimelineTeamEl = document.getElementById("roadmapFullTimelineTeam");
    const roadmapKpisEl = document.getElementById("roadmapKpis");
    const roadmapFilterProductEl = document.getElementById("roadmapFilterProduct");
    const roadmapFilterInitiativeEl = document.getElementById("roadmapFilterInitiative");
    const roadmapFilterTeamEl = document.getElementById("roadmapFilterTeam");
    const roadmapFilterOwnerEl = document.getElementById("roadmapFilterOwner");
    const roadmapFilterStatusEl = document.getElementById("roadmapFilterStatus");
    const roadmapFilterConfidenceEl = document.getElementById("roadmapFilterConfidence");
    const roadmapFilterRangeEl = document.getElementById("roadmapFilterRange");
    const roadmapSearchEl = document.getElementById("roadmapSearch");
    const roadmapMatrixRowsEl = document.getElementById("roadmapMatrixRows");
    const roadmapMatrixGranularityEl = document.getElementById("roadmapMatrixGranularity");
    const roadmapMatrixEl = document.getElementById("roadmapMatrix");
    const roadmapNext30El = document.getElementById("roadmapNext30");
    const roadmapRisksEl = document.getElementById("roadmapRisks");
    const roadmapDeliveredEl = document.getElementById("roadmapDelivered");
    document.body.insertAdjacentHTML("beforeend", \`
      <div class="roadmap-drawer-backdrop" id="roadmapDrawerBackdrop">
        <aside class="roadmap-drawer" role="dialog" aria-modal="true" aria-labelledby="roadmapDrawerTitle">
          <div class="roadmap-drawer-head">
            <h2 id="roadmapDrawerTitle">Delivery</h2>
            <button class="modal-close" id="roadmapDrawerClose" type="button" aria-label="بستن">×</button>
          </div>
          <div class="roadmap-drawer-body" id="roadmapDrawerBody"></div>
        </aside>
      </div>\`);
    const roadmapDrawerBackdropEl = document.getElementById("roadmapDrawerBackdrop");
    const roadmapDrawerTitleEl = document.getElementById("roadmapDrawerTitle");
    const roadmapDrawerBodyEl = document.getElementById("roadmapDrawerBody");
    const roadmapDrawerCloseEl = document.getElementById("roadmapDrawerClose");
    const productFormEl = document.getElementById("productForm");
    const productNameEl = document.getElementById("productName");
    const productKeyEl = document.getElementById("productKey");
    const productParentEl = document.getElementById("productParent");
    const productOwnerEl = document.getElementById("productOwner");
    const productDescriptionEl = document.getElementById("productDescription");
    const productsMessageEl = document.getElementById("productsMessage");
    const productListEl = document.getElementById("productList");
    const userGroupFormEl = document.getElementById("userGroupForm");
    const userGroupNameEl = document.getElementById("userGroupName");
    const userGroupTypeEl = document.getElementById("userGroupType");
    const userGroupModeEl = document.getElementById("userGroupMode");
    const userGroupDescriptionEl = document.getElementById("userGroupDescription");
    const userGroupsMessageEl = document.getElementById("userGroupsMessage");
    const userGroupListEl = document.getElementById("userGroupList");
    const currentUserPermissions = new Set(__CURRENT_USER_PERMISSIONS__);
    const currentUser = __CURRENT_USER__;
    const permissionOptions = [
      { key:"dashboard", label:"داشبورد" },
      { key:"analytics", label:"تحلیل" },
      { key:"threads", label:"تردها" },
      { key:"messages", label:"پیام‌ها" },
      { key:"roadmap", label:"نقشه راه" },
      { key:"products", label:"محصول‌ها" },
      { key:"user_groups", label:"گروه‌بندی کاربران" },
      { key:"senders", label:"ارسال‌کننده‌ها" },
      { key:"groups", label:"گروه‌ها" },
      { key:"broadcast", label:"اطلاع‌رسانی" },
      { key:"bots", label:"بات‌ها" },
      { key:"access", label:"دسترسی" },
      { key:"reply", label:"پاسخ" },
    ];
    const fullTextByKey = new Map();
    const detailByKey = new Map();
    const expandedThreadKeys = new Set();
    let dashboardChartData = { days: [], groups: [], userDays: [], users: [] };
    const selectedGroupChartItems = new Set();
    const selectedUserChartItems = new Set();
    let analyticsData = { overall: {}, groups: [], labels: [] };
    let accessGroupOptions = [];
    let accessUserOptions = [];
    let broadcastGroupOptions = [];
    const chartColors = ["#087f8c", "#f25f5c", "#3b82f6", "#f59e0b", "#7c3aed", "#10b981", "#ef476f", "#6b7280", "#06b6d4", "#84cc16"];
    const ownerEmail = "a.eslami@toman.ir";
    let threadFilterOptions = null;
    let currentPage = "messages";
    let loadingToken = 0;
    let pendingConfirm = null;
    let pendingBroadcastConfirm = null;
    const numberFmt = new Intl.NumberFormat("fa-IR");
    const THREAD_UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const THREAD_PLATFORM_CODES = { telegram: 1, bale: 2, whatsapp: 3 };
    const THREAD_PLATFORM_BY_CODE = { 1: "telegram", 2: "bale", 3: "whatsapp" };
    function esc(value) {
      return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    function bytesToUuid(bytes) {
      const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
      return \`\${hex.slice(0, 8)}-\${hex.slice(8, 12)}-\${hex.slice(12, 16)}-\${hex.slice(16, 20)}-\${hex.slice(20)}\`;
    }
    function threadUuidForParts(platform, chatId, messageId) {
      const code = THREAD_PLATFORM_CODES[rowPlatform({ platform })] || THREAD_PLATFORM_CODES.telegram;
      let chat = BigInt(String(chatId || "0"));
      const two64 = 1n << 64n;
      if (chat < 0) chat = two64 + chat;
      const message = BigInt(String(messageId || "0"));
      const bytes = new Uint8Array(16);
      bytes[0] = code;
      for (let index = 0; index < 8; index += 1) bytes[1 + index] = Number((chat >> BigInt((7 - index) * 8)) & 255n);
      for (let index = 0; index < 6; index += 1) bytes[9 + index] = Number((message >> BigInt((5 - index) * 8)) & 255n);
      bytes[15] = bytes.slice(0, 15).reduce((checksum, byte) => checksum ^ byte, 0);
      return bytesToUuid(bytes);
    }
    function threadUuidForKey(key) {
      const [platform, chatId, messageId] = String(key || "").split(":");
      if (!chatId || !messageId) return "";
      return threadUuidForParts(platform, chatId, messageId);
    }
    function threadUuidFromPath() {
      const match = window.location.pathname.match(/^\\/main\\/threads\\/([0-9a-f-]{36})$/i);
      const uuid = match?.[1]?.toLowerCase() || "";
      return THREAD_UUID_PATTERN.test(uuid) ? uuid : "";
    }
    function normalizeThreadUuidInput(value) {
      const match = String(value || "").match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
      return match?.[0]?.toLowerCase() || "";
    }
    function normalizeHashtagInput(value) {
      return String(value || "")
        .split(/[,\s]+/)
        .map((item) => item.trim().replace(/^#+/, "").toLowerCase())
        .filter(Boolean)
        .join(" ");
    }
    function telegramUsernameLocal(value) {
      return String(value || "").trim().replace(/^@+/, "");
    }
    function pagePermission(page) {
      if (page === "roadmap-path") return "roadmap";
      return page === "user-groups" ? "user_groups" : page;
    }
    function canOpen(page) {
      if (page === "products" && currentUserPermissions.has("roadmap")) return true;
      return currentUserPermissions.has(pagePermission(page));
    }
    function selectedPermissions(root) {
      return [...root.querySelectorAll("input[data-permission]:checked")].map(input => input.dataset.permission);
    }
    function selectedGroupAccess(root) {
      return {
        labels: [...root.querySelectorAll("input[data-group-label]:checked")].map(input => input.dataset.groupLabel),
        groups: [...root.querySelectorAll("input[data-group-key]:checked")].map(input => input.dataset.groupKey),
      };
    }
    function syncGroupsBySelectedLabel(labelInput, root) {
      const label = labelInput?.dataset.groupLabel || "";
      if (!label || !root) return;
      root.querySelectorAll('input[data-group-key][data-group-label-value="' + label + '"]').forEach((input) => {
        input.checked = labelInput.checked;
      });
    }
    function isOwnerEmail(email) {
      return String(email || "").trim().toLowerCase() === ownerEmail;
    }
    function initialsFromEmail(email) {
      return String(email || "?").trim().slice(0, 1).toUpperCase() || "?";
    }
    function avatarMarkup(value, className, id, email = currentUser.email) {
      if (value) return \`<img class="\${className}" id="\${id}" src="\${value}" alt="" />\`;
      return \`<span class="\${className}" id="\${id}">\${esc(initialsFromEmail(email))}</span>\`;
    }
    const groupLabelOptions = [
      ["", "بدون لیبل"],
      ["internal_team", "گروه‌های داخلی شرکت"],
      ["customer", "گروه‌های مشتریان"],
      ["provider", "گروه‌های پروایدرهای ما"],
    ];
    function groupLabelText(value) {
      return groupLabelOptions.find(([key]) => key === String(value || ""))?.[1] || "بدون لیبل";
    }
    function groupLabelShort(value) {
      const labels = {
        internal_team: "داخلی",
        customer: "مشتری",
        provider: "پروایدر",
      };
      return labels[String(value || "")] || "";
    }
    const senderLabelOptions = [
      ["", "بدون لیبل"],
      ["internal_team", "افراد داخلی شرکت"],
      ["customer", "افراد مشتری"],
      ["provider", "افراد پروایدرها"],
    ];
    function senderLabelText(value) {
      return senderLabelOptions.find(([key]) => key === String(value || ""))?.[1] || "بدون لیبل";
    }
    function groupAccessHtml(user) {
      const access = user.group_access || { labels: [], groups: [] };
      const labelSet = new Set(access.labels || []);
      const groupSet = new Set(access.groups || []);
      const disabled = user.is_owner ? "disabled" : "";
      const labelOptions = groupLabelOptions
        .filter(([value]) => value)
        .map(([value, label]) => \`<label class="group-access-option"><input type="checkbox" data-group-label="\${esc(value)}" \${labelSet.has(value) ? "checked" : ""} \${disabled} /><span>\${esc(label)}</span></label>\`)
        .join("");
      const groupOptions = accessGroupOptions
        .map((group) => \`<label class="group-access-option"><input type="checkbox" data-group-key="\${esc(group.key)}" data-group-label-value="\${esc(group.group_label || "")}" \${groupSet.has(group.key) || labelSet.has(group.group_label || "") ? "checked" : ""} \${disabled} /><span>\${esc(group.title)}</span>\${groupLabelShort(group.group_label) ? \`<span class="group-label-chip">\${esc(groupLabelShort(group.group_label))}</span>\` : ""}<span class="thread-muted">\${esc(platformText(group.platform))}</span></label>\`)
        .join("");
      const mode = labelSet.size || groupSet.size ? "محدود" : "بدون دسترسی گروهی";
      return \`<div class="group-access-box" data-group-access-email="\${esc(user.email)}" data-owner="\${user.is_owner ? "true" : "false"}">
        <div class="group-access-title"><strong>دسترسی گروه‌ها</strong><span>\${mode}</span></div>
        <div class="thread-muted">اگر هیچ لیبل یا گروهی انتخاب نشود، کاربر هیچ گروهی را نمی‌بیند.</div>
        <div class="group-access-title"><strong>بر اساس لیبل</strong></div>
        <div class="group-access-grid">\${labelOptions}</div>
        <div class="group-access-title"><strong>بر اساس گروه</strong></div>
        <div class="group-access-grid groups">\${groupOptions || '<span class="thread-muted">گروهی برای انتخاب وجود ندارد.</span>'}</div>
      </div>\`;
    }
    function selectedBroadcastGroups() {
      return [...broadcastGroupsEl.querySelectorAll("input[data-broadcast-group]:checked")].map((input) => input.dataset.broadcastGroup);
    }
    function updateBroadcastSelectedCount() {
      const count = selectedBroadcastGroups().length;
      broadcastSelectedCountEl.textContent = count + " گروه انتخاب شده";
    }
    function renderBroadcastGroups() {
      const labels = groupLabelOptions.filter(([value]) => value);
      broadcastLabelsEl.innerHTML = labels.map(([value, label]) => \`
        <label class="broadcast-option">
          <input type="checkbox" data-broadcast-label="\${esc(value)}" />
          <span>\${esc(label)}</span>
        </label>\`).join("");
      broadcastGroupsEl.innerHTML = broadcastGroupOptions.length ? broadcastGroupOptions.map((group) => \`
        <label class="broadcast-option">
          <input type="checkbox" data-broadcast-group="\${esc(group.key)}" data-broadcast-group-label="\${esc(group.group_label || "")}" />
          <span>\${esc(group.title)}</span>
          \${groupLabelShort(group.group_label) ? \`<span class="group-label-chip">\${esc(groupLabelShort(group.group_label))}</span>\` : ""}
          <span class="thread-muted">\${esc(platformText(group.platform))}</span>
        </label>\`).join("") : '<div class="empty">گروهی برای ارسال ندارید.</div>';
      updateBroadcastSelectedCount();
    }
    async function loadBroadcast() {
      const token = showLoading("در حال دریافت گروه‌های مجاز...");
      try {
        const res = await fetch("/api/broadcast-groups");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.groups)) {
          broadcastGroupOptions = [];
          renderBroadcastGroups();
          setStatus(token, data.detail || data.error || "خطا در دریافت گروه‌ها");
          return;
        }
        broadcastGroupOptions = data.groups;
        renderBroadcastGroups();
        broadcastResultEl.textContent = "";
        loadBroadcastLogs(false);
        setStatus(token, data.groups.length + " گروه مجاز");
      } catch (error) {
        broadcastGroupOptions = [];
        renderBroadcastGroups();
        setStatus(token, "خطا در دریافت گروه‌ها");
      }
    }
    function broadcastResultText(log) {
      const sent = Number(log?.sent || 0);
      const failed = Number(log?.failed || 0);
      const total = sent + failed;
      if (!total) return "ثبت شده، بدون نتیجه ارسال";
      if (!failed) return numberFmt.format(sent) + " از " + numberFmt.format(total) + " موفق";
      if (!sent) return numberFmt.format(failed) + " از " + numberFmt.format(total) + " ناموفق";
      return numberFmt.format(sent) + " موفق، " + numberFmt.format(failed) + " ناموفق";
    }
    async function loadBroadcastLogs(showStatus = true) {
      const token = showStatus ? showLoading("در حال دریافت لاگ اطلاع‌رسانی‌ها...") : null;
      try {
        const res = await fetch("/api/broadcast-logs");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.logs)) {
          broadcastLogRowsEl.innerHTML = "";
          broadcastLogMessageEl.textContent = data.detail || data.error || "خطا در دریافت لاگ اطلاع‌رسانی‌ها";
          if (showStatus) setStatus(token, data.detail || data.error || "خطا در دریافت لاگ اطلاع‌رسانی‌ها");
          return;
        }
        broadcastLogRowsEl.innerHTML = data.logs.map((log, index) => {
          const key = "broadcast-log-" + index;
          detailByKey.set(key, broadcastLogDetailsHtml(log));
          const targets = Array.isArray(log.targets) ? log.targets : [];
          const targetText = targets.map((target) => target.chat_title || target.key).filter(Boolean).join("، ");
          const bodyKey = "broadcast-log-body-" + index;
          return \`<tr>
            <td data-label="فرستنده">\${esc(log.sender_email || "-")}</td>
            <td data-label="زمان">\${esc(log.created_at_utc ? tehranDisplay(log.created_at_utc) : "-")}</td>
            <td class="full-cell" data-label="گروه‌های هدف">\${esc(shortText(targetText || "-", 110))}</td>
            <td class="body message-cell" data-label="متن"><div class="message-inner">\${textCell(log.body || "متن در لاگ قدیمی ذخیره نشده است.", bodyKey, 90)}</div></td>
            <td data-label="نتیجه">\${esc(broadcastResultText(log))}</td>
            <td class="details-cell" data-label="جزئیات"><button class="details-button" type="button" data-detail-key="\${esc(key)}">جزئیات</button></td>
          </tr>\`;
        }).join("") || '<tr><td colspan="6" class="empty">اطلاع‌رسانی ثبت نشده است</td></tr>';
        broadcastLogMessageEl.textContent = "";
        if (showStatus) setStatus(token, data.logs.length + " لاگ اطلاع‌رسانی");
      } catch (error) {
        broadcastLogRowsEl.innerHTML = "";
        broadcastLogMessageEl.textContent = "خطا در دریافت لاگ اطلاع‌رسانی‌ها";
        if (showStatus) setStatus(token, "خطا در دریافت لاگ اطلاع‌رسانی‌ها");
      }
    }
    function groupLabelSelect(row) {
      const current = String(row.group_label || "");
      return \`<div class="multi-filter single-filter group-label-filter" data-group-label-filter data-platform="\${esc(row.platform || "telegram")}" data-chat-id="\${esc(row.chat_id)}" data-current="\${esc(current)}"></div>\`;
    }
    function mountGroupLabelFilters() {
      groupRowsEl.querySelectorAll("[data-group-label-filter]").forEach((root) => {
        const filter = createSingleFilter(root, "بدون لیبل", async () => {
          const previous = root.dataset.current || "";
          const nextValue = filter.value();
          root.classList.add("loading");
          try {
            const res = await fetch("/api/groups/label", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ platform: root.dataset.platform || "telegram", chat_id: root.dataset.chatId, group_label: nextValue }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "ذخیره لیبل انجام نشد");
            root.dataset.current = data.group_label || "";
            filter.setValue(root.dataset.current);
            setStatus(loadingToken, "لیبل گروه ذخیره شد");
          } catch (error) {
            filter.setValue(previous);
            setStatus(loadingToken, error.message || "ذخیره لیبل انجام نشد");
          } finally {
            root.classList.remove("loading");
          }
        });
        filter.setOptions(groupLabelOptions.map(([value, label]) => ({ value, label })));
        filter.setValue(root.dataset.current || "");
      });
    }
    function senderLabelSelect(row) {
      const current = String(row.sender_label || "");
      return \`<div class="multi-filter single-filter group-label-filter" data-sender-label-filter data-platform="\${esc(row.platform || "telegram")}" data-sender-id="\${esc(row.sender_id)}" data-current="\${esc(current)}"></div>\`;
    }
    function mountSenderLabelFilters() {
      senderRowsEl.querySelectorAll("[data-sender-label-filter]").forEach((root) => {
        const filter = createSingleFilter(root, "بدون لیبل", async () => {
          const previous = root.dataset.current || "";
          const nextValue = filter.value();
          root.classList.add("loading");
          try {
            const res = await fetch("/api/senders/label", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ platform: root.dataset.platform || "telegram", sender_id: root.dataset.senderId, sender_label: nextValue }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "ذخیره لیبل انجام نشد");
            root.dataset.current = data.sender_label || "";
            filter.setValue(root.dataset.current);
            setStatus(loadingToken, "لیبل ارسال‌کننده ذخیره شد");
          } catch (error) {
            filter.setValue(previous);
            setStatus(loadingToken, error.message || "ذخیره لیبل انجام نشد");
          } finally {
            root.classList.remove("loading");
          }
        });
        filter.setOptions(senderLabelOptions.map(([value, label]) => ({ value, label })));
        filter.setValue(root.dataset.current || "");
      });
    }
    function accessActionText(action) {
      const labels = {
        invite: "دعوت",
        invite_email: "ارسال ایمیل دعوت",
        resend_invite: "ارسال دوباره دعوت",
        revoke: "لغو دسترسی",
        reactivate: "فعال‌سازی دوباره",
        permissions_update: "تغییر دسترسی‌ها",
        group_access_update: "تغییر دسترسی گروه‌ها",
        password_change: "تغییر پسورد",
        password_recovery: "بازیابی پسورد",
        profile_update: "به‌روزرسانی پروفایل",
        bot_create: "ثبت بات",
        bot_rotate: "تغییر توکن بات",
        roadmap_create: "ثبت نقشه راه",
        roadmap_update: "به‌روزرسانی نقشه راه",
        user_group_create: "ساخت گروه کاربران",
        user_group_update: "به‌روزرسانی گروه کاربران",
        user_group_delete: "حذف گروه کاربران",
        product_create: "ساخت محصول",
        product_update: "به‌روزرسانی محصول",
        product_delete: "حذف محصول",
        thread_reply: "ارسال پاسخ",
        group_broadcast: "ارسال اطلاع‌رسانی گروهی",
      };
      return labels[String(action || "")] || String(action || "");
    }
    function syncProfileUi() {
      headerEmailEl.textContent = currentUser.email;
      profileEmailEl.textContent = currentUser.email;
      profileTelegramUsernameEl.value = telegramUsernameLocal(currentUser.telegram_username);
      profileAvatarHintEl.textContent = currentUser.telegram_avatar_url
        ? "عکس از پروفایل تلگرام نمایش داده می‌شود."
        : "برای نمایش عکس، یوزرنیم تلگرام را ثبت کنید و حداقل یک پیام از همان کاربر در گروه‌ها دریافت شده باشد.";
      headerAvatarEl.outerHTML = avatarMarkup(currentUser.telegram_avatar_url, "user-avatar", "headerAvatar", currentUser.email);
      profileAvatarEl.outerHTML = avatarMarkup(currentUser.telegram_avatar_url, "profile-avatar-large", "profileAvatar", currentUser.email);
      headerAvatarEl = document.getElementById("headerAvatar");
      profileAvatarEl = document.getElementById("profileAvatar");
    }
    function permissionGridHtml(selected, prefix, disabled = false) {
      const selectedSet = new Set(Array.isArray(selected) ? selected : []);
      return permissionOptions.map(option => \`
        <label class="permission-option">
          <input type="checkbox" data-permission="\${esc(option.key)}" \${selectedSet.has(option.key) ? "checked" : ""} \${disabled ? "disabled" : ""} />
          <span>\${esc(option.label)}</span>
        </label>\`).join("");
    }
    function permissionSummaryHtml(permissions) {
      const selectedSet = new Set(Array.isArray(permissions) ? permissions : []);
      return permissionOptions
        .filter((option) => selectedSet.has(option.key))
        .map((option) => \`<span class="access-permission-chip">\${esc(option.label)}</span>\`)
        .join("") || '<span class="thread-muted">بدون دسترسی</span>';
    }
    function accessLogDetailsHtml(log) {
      return \`<div class="details-grid">
        <div class="detail-row"><div class="detail-label">عملیات</div><div class="detail-value">\${esc(accessActionText(log.action))}</div></div>
        <div class="detail-row"><div class="detail-label">انجام‌دهنده</div><div class="detail-value">\${esc(log.actor_email || "-")}</div></div>
        <div class="detail-row"><div class="detail-label">کاربر هدف</div><div class="detail-value">\${esc(log.target_email || "-")}</div></div>
        <div class="detail-row"><div class="detail-label">زمان (تهران)</div><div class="detail-value">\${esc(log.created_at_utc ? tehranDisplay(log.created_at_utc) : "-")}</div></div>
        <div class="detail-row"><div class="detail-label">مقدارهای قبلی</div><pre class="detail-value detail-pre">\${esc(JSON.stringify(log.old_values || {}, null, 2))}</pre></div>
        <div class="detail-row"><div class="detail-label">مقدارهای جدید</div><pre class="detail-value detail-pre">\${esc(JSON.stringify(log.new_values || {}, null, 2))}</pre></div>
        <div class="detail-row"><div class="detail-label">متادیتا</div><pre class="detail-value detail-pre">\${esc(JSON.stringify(log.metadata || {}, null, 2))}</pre></div>
      </div>\`;
    }
    function broadcastLogDetailsHtml(log) {
      const targets = Array.isArray(log.targets) ? log.targets : [];
      const targetHtml = targets.length
        ? targets.map((target) => \`<div class="broadcast-target-detail">
            <strong>\${esc(target.chat_title || target.key || "-")}</strong>
            <span>\${esc(platformText(target.platform || ""))}</span>
            <span>\${target.ok ? "موفق" : "ناموفق"}\${target.error ? " · " + esc(target.error) : ""}</span>
          </div>\`).join("")
        : '<span class="thread-muted">گروهی ثبت نشده است.</span>';
      return \`<div class="details-grid">
        \${detailRow("فرستنده", log.sender_email || "-")}
        \${detailRow("زمان (تهران)", log.created_at_utc ? tehranDisplay(log.created_at_utc) : "-")}
        \${detailRow("شناسه اطلاع‌رسانی", log.broadcast_id || "-")}
        \${detailRow("نتیجه", broadcastResultText(log))}
        \${detailRow("متن", log.body || "متن در لاگ قدیمی ذخیره نشده است.")}
        <div class="detail-row"><div class="detail-label">گروه‌های هدف</div><div class="detail-value broadcast-targets-detail">\${targetHtml}</div></div>
        <div class="detail-row"><div class="detail-label">متادیتا</div><pre class="detail-value detail-pre">\${esc(JSON.stringify(log.metadata || {}, null, 2))}</pre></div>
      </div>\`;
    }
    function showAccessSection(section) {
      const isLogs = section === "logs";
      const isGroups = section === "groups";
      accessUsersSectionEl.hidden = isLogs || isGroups;
      accessGroupsSectionEl.hidden = !isGroups;
      accessLogsSectionEl.hidden = !isLogs;
      accessUsersTabEl.classList.toggle("active", !isLogs && !isGroups);
      accessGroupsTabEl.classList.toggle("active", isGroups);
      accessLogsTabEl.classList.toggle("active", isLogs);
      if (isLogs) loadAccessLogs();
      else if (isGroups) loadAccessGroupView();
      else loadAccessUsers();
    }
    const routablePages = ["dashboard", "analytics", "threads", "messages", "roadmap", "roadmap-path", "products", "user-groups", "groups", "senders", "broadcast", "bots", "access", "profile"];
    const pageTitles = {
      dashboard: "داشبورد",
      analytics: "تحلیل",
      threads: "تردها",
      messages: "پیام‌ها",
      roadmap: "نقشه راه",
      "roadmap-path": "نمای مسیر",
      products: "محصول‌ها",
      "user-groups": "گروه‌بندی کاربران",
      groups: "گروه‌ها",
      senders: "ارسال‌کننده‌ها",
      broadcast: "اطلاع‌رسانی",
      bots: "بات‌ها",
      access: "دسترسی",
      profile: "پروفایل",
    };
    function pagePath(page) {
      return "/main/" + page;
    }
    function pageFromPath() {
      const path = window.location.pathname;
      const page = path.startsWith("/main/") ? path.slice(6).split("/")[0] : "messages";
      return routablePages.includes(page) ? page : "messages";
    }
    function firstAccessiblePage() {
      return ["dashboard", "analytics", "threads", "messages", "roadmap", "roadmap-path", "products", "user-groups", "groups", "senders", "broadcast", "bots", "access"].find(canOpen);
    }
    function syncNavGroupVisibility() {
      [communicationsNavGroupEl, developmentNavGroupEl, managementNavGroupEl].forEach((group) => {
        group.hidden = ![...group.querySelectorAll(".nav-button")].some((button) => !button.hidden);
      });
    }
    function syncNavGroupActive(page) {
      communicationsNavGroupEl.classList.toggle("active", ["dashboard", "analytics", "threads", "messages", "groups", "senders", "broadcast", "bots"].includes(page));
      developmentNavGroupEl.classList.toggle("active", page === "roadmap" || page === "roadmap-path" || page === "products");
      managementNavGroupEl.classList.toggle("active", page === "user-groups" || page === "access");
    }
    function setupAccessShell() {
      accessNewPermissionsEl.innerHTML = permissionGridHtml([], "new");
      const navByPage = { dashboard:dashboardNavEl, analytics:analyticsNavEl, threads:threadsNavEl, messages:messagesNavEl, roadmap:roadmapNavEl, "roadmap-path":roadmapPathNavEl, products:productsNavEl, "user-groups":userGroupsNavEl, groups:groupsNavEl, senders:sendersNavEl, broadcast:broadcastNavEl, bots:botsNavEl, access:accessNavEl };
      Object.entries(navByPage).forEach(([page, element]) => { element.hidden = !canOpen(page); });
      syncNavGroupVisibility();
      const firstPage = firstAccessiblePage();
      if (!firstPage) {
        document.querySelector("main").innerHTML = '<section class="empty">برای این حساب هنوز دسترسی به بخشی تعریف نشده است.</section>';
        setStatus(++loadingToken, "بدون دسترسی");
        return;
      }
      const requestedPage = pageFromPath();
      const requestedPath = threadUuidFromPath() ? window.location.pathname : undefined;
      showPage(requestedPage === "profile" || canOpen(requestedPage) ? requestedPage : firstPage, { replace: true, path: requestedPath });
    }
    function tehranDisplay(value) {
      return new Date(value).toLocaleString("fa-IR", { timeZone:"Asia/Tehran", year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit" });
    }
    function showLoading(label = "در حال دریافت داده...") {
      loadingToken += 1;
      statusEl.innerHTML = \`<span class="loading-indicator"><span class="spinner" aria-hidden="true"></span><span>\${esc(label)}</span></span>\`;
      return loadingToken;
    }
    function setStatus(token, text) {
      if (token !== loadingToken) return;
      statusEl.textContent = text;
    }
    function positionFilterPanel(root, panel, button) {
      const rect = button.getBoundingClientRect();
      const width = Math.max(rect.width, 220);
      const gap = 4;
      const maxLeft = Math.max(14, window.innerWidth - width - 14);
      const left = Math.min(Math.max(14, rect.left), maxLeft);
      const top = Math.min(rect.bottom + gap, window.innerHeight - 54);
      panel.style.setProperty("--dropdown-w", width + "px");
      panel.style.setProperty("--dropdown-top", top + "px");
      panel.style.left = left + "px";
      panel.style.top = top + "px";
    }
    function positionOpenFilterPanels() {
      document.querySelectorAll(".multi-filter.open").forEach((root) => {
        const panel = root.querySelector(".multi-panel");
        const button = root.querySelector(".multi-button");
        if (panel && button) positionFilterPanel(root, panel, button);
      });
    }
    function openFilterPanel(root, panel, button) {
      const wasOpen = root.classList.contains("open");
      document.querySelectorAll(".multi-filter.open").forEach((item) => {
        if (item !== root) item.classList.remove("open");
      });
      positionFilterPanel(root, panel, button);
      root.classList.toggle("open");
      if (root.classList.contains("open")) {
        positionFilterPanel(root, panel, button);
        if (!wasOpen) requestAnimationFrame(() => panel.querySelector(".multi-search")?.focus());
      }
    }
      function createMultiFilter(root, placeholder, onChange) {
      const state = { options: [], selected: new Set(), query: "" };
      root.innerHTML = \`<div class="multi-control"><button class="multi-button" type="button"><span class="multi-label">\${esc(placeholder)}</span></button><button class="multi-clear" type="button" aria-label="پاک کردن فیلتر" title="پاک کردن فیلتر">×</button></div><div class="multi-panel"></div>\`;
      const button = root.querySelector(".multi-button");
      const clearButton = root.querySelector(".multi-clear");
      const label = root.querySelector(".multi-label");
      const panel = root.querySelector(".multi-panel");
      const optionMatches = (value) => String(value || "").toLowerCase().includes(state.query.trim().toLowerCase());
      function syncLabel() {
        const values = [...state.selected];
        label.textContent = values.length === 0 ? placeholder : (values.length === 1 ? values[0] : values.length + " انتخاب");
        root.classList.toggle("has-value", values.length > 0);
      }
      function render() {
        const visibleOptions = state.options.filter(optionMatches);
        const optionsHtml = visibleOptions.length
          ? visibleOptions.map((value) => \`<label class="multi-option"><input type="checkbox" value="\${esc(value)}" \${state.selected.has(value) ? "checked" : ""} /><span>\${esc(value)}</span></label>\`).join("")
          : \`<div class="multi-empty">\${state.options.length ? "نتیجه‌ای پیدا نشد" : "موردی نیست"}</div>\`;
        panel.innerHTML = \`<input class="multi-search" type="search" value="\${esc(state.query)}" placeholder="جستجو..." autocomplete="off" /><div class="multi-options">\${optionsHtml}</div>\`;
      }
      button.addEventListener("click", () => openFilterPanel(root, panel, button));
      clearButton.addEventListener("click", () => {
        state.selected.clear();
        root.classList.remove("open");
        render();
        syncLabel();
        onChange?.();
      });
      panel.addEventListener("input", (event) => {
        const search = event.target.closest(".multi-search");
        if (!search) return;
        state.query = search.value;
        render();
        const nextSearch = panel.querySelector(".multi-search");
        nextSearch?.focus();
        nextSearch?.setSelectionRange(nextSearch.value.length, nextSearch.value.length);
      });
      panel.addEventListener("change", (event) => {
        const checkbox = event.target.closest("input[type='checkbox']");
        if (!checkbox) return;
        if (checkbox.checked) state.selected.add(checkbox.value);
        else state.selected.delete(checkbox.value);
        syncLabel();
        onChange?.();
      });
      return {
        setOptions(values) {
          state.options = [...new Set(values.filter(Boolean))].sort();
          state.selected = new Set([...state.selected].filter((value) => state.options.includes(value)));
          render();
          syncLabel();
        },
        values() {
          return [...state.selected];
        },
        setValues(values) {
          state.selected = new Set([...new Set(values.filter(Boolean))].filter((value) => state.options.includes(value)));
          render();
          syncLabel();
        },
        clear() {
          state.selected.clear();
          render();
          syncLabel();
        },
        close() {
          state.query = "";
          root.classList.remove("open");
          render();
        },
      };
    }
    function createSingleFilter(root, placeholder, onChange) {
      const state = { options: [], selected: "", query: "" };
      root.innerHTML = \`<div class="multi-control"><button class="multi-button" type="button"><span class="multi-label">\${esc(placeholder)}</span></button><button class="multi-clear" type="button" aria-label="پاک کردن فیلتر" title="پاک کردن فیلتر">×</button></div><div class="multi-panel"></div>\`;
      const button = root.querySelector(".multi-button");
      const clearButton = root.querySelector(".multi-clear");
      const label = root.querySelector(".multi-label");
      const panel = root.querySelector(".multi-panel");
      function normalizeOption(option) {
        if (option && typeof option === "object") return { value: String(option.value || ""), label: String(option.label || option.value || "") };
        return { value: String(option || ""), label: String(option || "") };
      }
      function selectedLabel() {
        return state.options.find((option) => option.value === state.selected)?.label || "";
      }
      function syncLabel() {
        label.textContent = selectedLabel() || placeholder;
        root.classList.toggle("has-value", Boolean(state.selected));
      }
      function render() {
        const query = state.query.trim().toLowerCase();
        const visibleOptions = query ? state.options.filter((option) => option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query)) : state.options;
        const optionsHtml = visibleOptions.length
          ? visibleOptions.map((option) => \`<button class="single-option \${state.selected === option.value ? "selected" : ""}" type="button" data-value="\${esc(option.value)}">\${esc(option.label)}</button>\`).join("")
          : \`<div class="multi-empty">\${state.options.length ? "نتیجه‌ای پیدا نشد" : "موردی نیست"}</div>\`;
        panel.innerHTML = \`<input class="multi-search" type="search" value="\${esc(state.query)}" placeholder="جستجو..." autocomplete="off" /><div class="multi-options">\${optionsHtml}</div>\`;
      }
      button.addEventListener("click", () => openFilterPanel(root, panel, button));
      clearButton.addEventListener("click", () => {
        state.selected = "";
        root.classList.remove("open");
        render();
        syncLabel();
        onChange?.();
      });
      panel.addEventListener("input", (event) => {
        const search = event.target.closest(".multi-search");
        if (!search) return;
        state.query = search.value;
        render();
        const nextSearch = panel.querySelector(".multi-search");
        nextSearch?.focus();
        nextSearch?.setSelectionRange(nextSearch.value.length, nextSearch.value.length);
      });
      panel.addEventListener("click", (event) => {
        const option = event.target.closest("[data-value]");
        if (!option) return;
        state.selected = option.dataset.value;
        state.query = "";
        root.classList.remove("open");
        render();
        syncLabel();
        onChange?.();
      });
      return {
        setOptions(values) {
          const seen = new Set();
          state.options = values.map(normalizeOption).filter((option) => option.value && !seen.has(option.value) && seen.add(option.value));
          if (!state.options.some((option) => option.value === state.selected)) state.selected = "";
          render();
          syncLabel();
        },
        setValue(value) {
          state.selected = state.options.some((option) => option.value === value) ? value : "";
          render();
          syncLabel();
        },
        value() {
          return state.selected;
        },
        clear() {
          state.selected = "";
          render();
          syncLabel();
        },
        close() {
          state.query = "";
          root.classList.remove("open");
          render();
        },
      };
    }
    const messagePlatformFilter = createMultiFilter(platformEl, "همه پلتفرم‌ها", () => { updateGroupOptions(); updateMessageTopicOptions(); updateFilterButtons(); load(); });
    const messageGroupFilter = createMultiFilter(groupEl, "همه گروه‌ها", () => { updateMessageTopicOptions(); updateFilterButtons(); load(); });
    const messageTopicFilter = createMultiFilter(topicEl, "همه تاپیک‌ها", () => {
      syncGroupsFromSelectedTopics(messageGroupFilter, messageTopicFilter);
      updateMessageTopicOptions();
      updateFilterButtons();
      load();
    });
    const threadPlatformFilter = createMultiFilter(threadPlatformEl, "همه پلتفرم‌ها", () => { updateGroupOptions(); updateThreadTopicOptions(); updateFilterButtons(); loadThreads(); });
    const threadLabelFilter = createMultiFilter(threadLabelEl, "همه نوع گروه‌ها", () => { updateGroupOptions(); updateThreadTopicOptions(); updateFilterButtons(); loadThreads(); });
    const threadGroupFilter = createMultiFilter(threadGroupEl, "همه گروه‌ها", () => { updateThreadTopicOptions(); updateFilterButtons(); loadThreads(); });
    const threadTopicFilter = createMultiFilter(threadTopicEl, "همه تاپیک‌ها", () => {
      syncGroupsFromSelectedTopics(threadGroupFilter, threadTopicFilter);
      updateThreadTopicOptions();
      updateFilterButtons();
      loadThreads();
    });
    const threadYearFilter = createSingleFilter(threadYearEl, "سال", () => { updateThreadDateOptions(); updateFilterButtons(); loadThreads(); });
    const threadMonthFilter = createSingleFilter(threadMonthEl, "ماه", () => { updateThreadDateOptions(); updateFilterButtons(); loadThreads(); });
    const threadDayFilter = createSingleFilter(threadDayEl, "روز", () => { updateFilterButtons(); loadThreads(); });
    const botPlatformFilter = createSingleFilter(botPlatformEl, "پلتفرم بات");
    botPlatformFilter.setOptions([{ value: "telegram", label: "تلگرام" }, { value: "bale", label: "بله" }]);
    botPlatformFilter.setValue("telegram");
    const accessGroupFilter = createSingleFilter(accessGroupSelectEl, "انتخاب گروه", () => renderAccessGroupUsers());
    function appendFilterValues(params, key, values) {
      values.forEach((value) => params.append(key, value));
    }
    function platformValueFromText(value) {
      const text = String(value || "").trim();
      if (text === "تلگرام") return "telegram";
      if (text === "بله") return "bale";
      if (text === "واتساپ") return "whatsapp";
      return text;
    }
    function selectedPlatformValues(filter) {
      return filter.values().map(platformValueFromText).filter(Boolean);
    }
    function platformMatchesFilter(row, filter) {
      const selected = selectedPlatformValues(filter);
      return !selected.length || selected.includes(row.platform || "telegram");
    }
    function messageFiltersActive() {
      return Boolean(searchEl.value.trim() || hashtagSearchEl.value.trim() || messagePlatformFilter.values().length || messageGroupFilter.values().length || messageTopicFilter.values().length);
    }
    function threadFiltersActive() {
      return Boolean(threadUuidEl.value.trim() || threadHashtagEl.value.trim() || threadPlatformFilter.values().length || threadLabelFilter.values().length || threadGroupFilter.values().length || threadTopicFilter.values().length || selectedThreadJalaliDate());
    }
    function activeMessageFilterCount() {
      return (searchEl.value.trim() ? 1 : 0) + (hashtagSearchEl.value.trim() ? 1 : 0) + messagePlatformFilter.values().length + messageGroupFilter.values().length + messageTopicFilter.values().length;
    }
    function activeThreadFilterCount() {
      return (threadUuidEl.value.trim() ? 1 : 0) + (threadHashtagEl.value.trim() ? 1 : 0) + threadPlatformFilter.values().length + threadLabelFilter.values().length + threadGroupFilter.values().length + threadTopicFilter.values().length + (selectedThreadJalaliDate() ? 1 : 0);
    }
    function syncMobileFilterToggle(toggle, filtersRoot, count) {
      if (!toggle || !filtersRoot) return;
      const isOpen = filtersRoot.classList.contains("mobile-open");
      toggle.textContent = isOpen ? "بستن فیلترها" : (count ? "فیلترها (" + numberFmt.format(count) + ")" : "نمایش فیلترها");
      toggle.classList.toggle("secondary-button", isOpen);
    }
    function updateMobileFilterToggles() {
      syncMobileFilterToggle(messageFilterToggleEl, messagesPageEl.querySelector(".filters"), activeMessageFilterCount());
      syncMobileFilterToggle(threadFilterToggleEl, threadsPageEl.querySelector(".filters"), activeThreadFilterCount());
    }
    function updateFilterButtons() {
      refreshEl.textContent = messageFiltersActive() ? "ریست فیلتر" : "به‌روزرسانی";
      threadRefreshEl.textContent = threadFiltersActive() ? "ریست فیلتر" : "به‌روزرسانی";
      updateMobileFilterToggles();
    }
    function resetMessageFilters() {
      searchEl.value = "";
      hashtagSearchEl.value = "";
      messagePlatformFilter.clear();
      messageGroupFilter.clear();
      messageTopicFilter.clear();
      updateMessageTopicOptions();
      updateFilterButtons();
    }
    function resetThreadFilters() {
      threadUuidEl.value = "";
      threadHashtagEl.value = "";
      threadPlatformFilter.clear();
      threadLabelFilter.clear();
      threadGroupFilter.clear();
      threadTopicFilter.clear();
      threadYearFilter.clear();
      threadMonthFilter.clear();
      threadDayFilter.clear();
      updateThreadTopicOptions();
      updateThreadDateOptions();
      updateFilterButtons();
    }
    function syncGroupsFromSelectedTopics(groupFilter, topicFilter) {
      const selectedTopics = topicFilter.values();
      if (!selectedTopics.length) return;
      const groups = (threadFilterOptions?.topics || [])
        .filter((topic) => selectedTopics.includes(topic.topic_name))
        .map((topic) => topic.chat_title)
        .filter(Boolean);
      if (groups.length) groupFilter.setValues(groups);
    }
    function updateThreadDateOptions() {
      const dates = threadFilterOptions?.jalali_dates || [];
      const years = [...new Set(dates.map((date) => date.split("-")[0]))].sort().reverse();
      threadYearFilter.setOptions(years);
      const selectedYear = threadYearFilter.value();
      const months = [...new Set(dates
        .filter((date) => !selectedYear || date.startsWith(selectedYear + "-"))
        .map((date) => date.split("-")[1]))].sort();
      threadMonthFilter.setOptions(months);
      const selectedMonth = threadMonthFilter.value();
      const days = [...new Set(dates
        .filter((date) => (!selectedYear || date.startsWith(selectedYear + "-")) && (!selectedMonth || date.split("-")[1] === selectedMonth))
        .map((date) => date.split("-")[2]))].sort();
      threadDayFilter.setOptions(days);
    }
    function updateThreadTopicOptions() {
      const selectedLabels = new Set(threadLabelFilter.values());
      const topics = (threadFilterOptions?.topics || [])
        .filter((topic) => platformMatchesFilter(topic, threadPlatformFilter))
        .filter((topic) => !selectedLabels.size || selectedLabels.has(topic.group_label_text || groupLabelText(topic.group_label)))
        .filter((topic) => !threadGroupFilter.values().length || threadGroupFilter.values().includes(topic.chat_title))
        .map((topic) => topic.topic_name)
        .filter(Boolean);
      threadTopicFilter.setOptions(topics);
    }
    function updateMessageTopicOptions() {
      const topics = (threadFilterOptions?.topics || [])
        .filter((topic) => platformMatchesFilter(topic, messagePlatformFilter))
        .filter((topic) => !messageGroupFilter.values().length || messageGroupFilter.values().includes(topic.chat_title))
        .map((topic) => topic.topic_name)
        .filter(Boolean);
      messageTopicFilter.setOptions(topics);
    }
    function updateGroupOptions() {
      const groups = threadFilterOptions?.groups || [];
      const messageGroups = groups
        .filter((group) => platformMatchesFilter(group, messagePlatformFilter))
        .map((group) => group.chat_title)
        .filter(Boolean);
      const threadGroups = groups
        .filter((group) => platformMatchesFilter(group, threadPlatformFilter))
        .filter((group) => !threadLabelFilter.values().length || threadLabelFilter.values().includes(group.group_label_text || groupLabelText(group.group_label)))
        .map((group) => group.chat_title)
        .filter(Boolean);
      messageGroupFilter.setOptions(messageGroups);
      threadGroupFilter.setOptions(threadGroups);
    }
    function selectedThreadJalaliDate() {
      const year = threadYearFilter.value();
      const month = threadMonthFilter.value();
      const day = threadDayFilter.value();
      if (!year || !month || !day) return "";
      return \`\${year}-\${month}-\${day}\`;
    }
    async function loadThreadFilterOptions() {
      if (threadFilterOptions) return;
      const res = await fetch("/api/thread-filter-options");
      const data = await res.json();
      if (!res.ok) return;
      threadFilterOptions = data;
      const platforms = (data.platforms || []).map(platformText).filter(Boolean);
      threadPlatformFilter.setOptions(platforms);
      messagePlatformFilter.setOptions(platforms);
      threadLabelFilter.setOptions(groupLabelOptions.filter(([value]) => value).map(([, label]) => label));
      updateGroupOptions();
      updateThreadTopicOptions();
      updateMessageTopicOptions();
      updateThreadDateOptions();
      updateFilterButtons();
    }
    function linkify(value) {
      const source = String(value ?? "");
      const hashtagify = (text) => esc(text).replace(/(^|[^\\p{L}\\p{N}_])#([\\p{L}\\p{N}_][\\p{L}\\p{N}_]*)/gu, (match, prefix, tag) => {
        return \`\${prefix}<a class="hashtag-link" href="#" data-hashtag="\${esc(tag)}">#\${esc(tag)}</a>\`;
      });
      let html = "";
      let cursor = 0;
      source.replace(/https?:\\/\\/[^\\s<]+/g, (url, offset) => {
        html += hashtagify(source.slice(cursor, offset));
        const cleanUrl = url.replace(/[),.;:!?]+$/g, "");
        const suffix = url.slice(cleanUrl.length);
        html += \`<a href="\${esc(cleanUrl)}" target="_blank" rel="noopener noreferrer">\${esc(cleanUrl)}</a>\${hashtagify(suffix)}\`;
        cursor = offset + url.length;
        return url;
      });
      html += hashtagify(source.slice(cursor));
      return html;
    }
    function tryPrettyJson(value) {
      const text = String(value ?? "").trim();
      if (!text || !/^[\\[{]/.test(text)) return "";
      try { return JSON.stringify(JSON.parse(text), null, 2); } catch { return ""; }
    }
    function codeLanguageLabel(value) {
      const label = String(value || "").trim().replace(/[^a-z0-9_+#.-]/gi, "").slice(0, 18);
      return label || "code";
    }
    function looksLikeCode(value) {
      const text = String(value ?? "").trim();
      if (!text.includes("\\n")) return false;
      const lines = text.split("\\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length < 2) return false;
      const codeSignals = lines.filter((line) => /^(const|let|var|function|class|async|await|return|if|for|while|try|catch|import|export|SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|curl\\s|npm\\s|pnpm\\s|yarn\\s|git\\s|<\\/?[a-z][\\s>]|[{}()[\\];,]|\\s{2,}\\S)/i.test(line));
      return codeSignals.length >= Math.max(2, Math.ceil(lines.length * 0.45));
    }
    function fencedCodeHtml(text) {
      const source = String(text ?? "");
      const fencePattern = new RegExp("\\\\x60\\\\x60\\\\x60([^\\\\n\\\\x60]*)\\\\n?([\\\\s\\\\S]*?)\\\\x60\\\\x60\\\\x60", "g");
      let cursor = 0;
      let html = "";
      let matched = false;
      source.replace(fencePattern, (match, lang, code, offset) => {
        matched = true;
        const before = source.slice(cursor, offset);
        if (before.trim()) html += \`<div class="structured-text">\${linkify(before.trim())}</div>\`;
        html += \`<span class="structured-code-label">\${esc(codeLanguageLabel(lang))}</span><pre class="structured-code"><code>\${esc(code.replace(/^\\n|\\n$/g, ""))}</code></pre>\`;
        cursor = offset + match.length;
        return match;
      });
      if (!matched) return "";
      const after = source.slice(cursor);
      if (after.trim()) html += \`<div class="structured-text">\${linkify(after.trim())}</div>\`;
      return \`<div class="structured-message">\${html}</div>\`;
    }
    function renderMessageContent(value) {
      const text = String(value ?? "");
      if (!text) return "";
      const fenced = fencedCodeHtml(text);
      if (fenced) return fenced;
      const prettyJson = tryPrettyJson(text);
      if (prettyJson) {
        return \`<div class="structured-message"><span class="structured-code-label">JSON</span><pre class="structured-code"><code>\${esc(prettyJson)}</code></pre></div>\`;
      }
      if (looksLikeCode(text)) {
        return \`<div class="structured-message"><span class="structured-code-label">code</span><pre class="structured-code"><code>\${esc(text.trim())}</code></pre></div>\`;
      }
      return linkify(text);
    }
    function structuredPreviewBadge(value) {
      const text = String(value ?? "");
      const label = tryPrettyJson(text) ? "JSON" : (fencedCodeHtml(text) || looksLikeCode(text) ? "کد" : "");
      return label ? \`<span class="structured-preview-badge">\${esc(label)}</span>\` : "";
    }
    function jsonText(value) {
      if (value == null) return "";
      if (typeof value === "string") {
        try { return JSON.stringify(JSON.parse(value), null, 2); } catch { return value; }
      }
      return JSON.stringify(value, null, 2);
    }
    function shouldCollapse(value, limit = 90) {
      return String(value ?? "").length > limit || String(value ?? "").includes("\\n");
    }
    function shortText(value, limit = 90) {
      const normalized = String(value ?? "").replace(/\\s+/g, " ").trim();
      return normalized.length > limit ? normalized.slice(0, limit) + "..." : normalized;
    }
    function textCell(value, key, limit = 90) {
      const text = String(value ?? "");
      if (!text) return "";
      fullTextByKey.set(key, renderMessageContent(text));
      const button = \`<button class="more" type="button" data-full-key="\${esc(key)}" aria-label="مشاهده بیشتر" title="مشاهده بیشتر">+</button>\`;
      return \`\${structuredPreviewBadge(text)}<span class="clip">\${linkify(shortText(text, limit))}</span>\${button}\`;
    }
    function fileUrl(row, download = false) {
      if (!row.media_file_id) return "";
      const params = new URLSearchParams({ platform: row.platform || "telegram", file_id: row.media_file_id });
      if (row.bot_id) params.set("bot_id", row.bot_id);
      if (download) params.set("download", "1");
      return "/api/file?" + params.toString();
    }
    function mediaItems(row) {
      const items = Array.isArray(row.media_items) ? row.media_items : [];
      if (items.length) return items;
      return row.media_file_id ? [row] : [];
    }
    function isPhoto(row) {
      return row.message_type === "photo" && row.media_file_id;
    }
    function isPhotoItem(item) {
      return item.message_type === "photo" && item.media_file_id;
    }
    function isDownloadableFile(row) {
      return row.message_type === "document" && row.media_file_id;
    }
    function isDownloadableFileItem(item) {
      return item.message_type === "document" && item.media_file_id;
    }
    function mediaFileName(row) {
      return row.raw_payload_json?.message?.document?.file_name
        || row.raw_payload_json?.edited_message?.document?.file_name
        || row.raw_payload_json?.channel_post?.document?.file_name
        || row.raw_payload_json?.edited_channel_post?.document?.file_name
        || "دانلود فایل";
    }
    function mediaBadge(row) {
      const items = mediaItems(row);
      if (items.length > 1 && items.every(isPhotoItem)) return \`<span class="badge">تصاویر ×\${items.length}</span>\`;
      if (items.length > 1) return \`<span class="badge">رسانه ×\${items.length}</span>\`;
      if (isPhoto(row)) return '<span class="badge">عکس</span>';
      if (isDownloadableFile(row)) return '<span class="badge">فایل</span>';
      return "";
    }
    function mediaDetailHtml(row) {
      const items = mediaItems(row);
      if (items.length > 1) {
        const html = items.map((item, index) => {
          if (isPhotoItem(item)) {
            return \`<div class="media-detail-item"><img class="media-preview" src="\${fileUrl(item)}" alt="" loading="lazy" /><a class="details-button" href="\${fileUrl(item, true)}" download>دانلود عکس \${index + 1}</a></div>\`;
          }
          if (isDownloadableFileItem(item)) {
            return \`<div class="media-detail-item"><a class="details-button" href="\${fileUrl(item, true)}" download>\${esc(mediaFileName(item))}</a></div>\`;
          }
          return "";
        }).join("");
        return \`<div class="detail-row"><div class="detail-label">آلبوم رسانه</div><div class="detail-value media-actions album">\${html}</div></div>\`;
      }
      const item = items[0] || row;
      if (isPhotoItem(item)) {
        return \`<div class="detail-row"><div class="detail-label">رسانه</div><div class="detail-value media-actions"><img class="media-preview" src="\${fileUrl(item)}" alt="" loading="lazy" /><a class="details-button" href="\${fileUrl(item, true)}" download>دانلود عکس</a></div></div>\`;
      }
      if (isDownloadableFileItem(item)) {
        return \`<div class="detail-row"><div class="detail-label">رسانه</div><div class="detail-value media-actions"><a class="details-button" href="\${fileUrl(item, true)}" download>\${esc(mediaFileName(item))}</a></div></div>\`;
      }
      return "";
    }
    function detailValue(value) {
      const text = typeof value === "object" && value !== null ? jsonText(value) : String(value ?? "");
      const renderedMessage = renderMessageContent(text);
      if (renderedMessage !== linkify(text)) return \`<div class="detail-value">\${renderedMessage}</div>\`;
      return \`<span class="\${text.includes("{") || text.includes("[") ? "detail-value detail-pre" : "detail-value"}">\${linkify(text)}</span>\`;
    }
    function detailRow(label, value) {
      return \`<div class="detail-row"><div class="detail-label">\${esc(label)}</div>\${detailValue(value)}</div>\`;
    }
    function detailHtml(row) {
      const details = [
        ["پلتفرم", platformText(row.platform)],
        ["بات", botText(row)],
        ["شناسه بات", row.bot_id],
        ["یوزرنیم بات", row.bot_username],
        ["نام بات", row.bot_name],
        ["شناسه آپدیت", row.update_id],
        ["شناسه پیام", row.message_id],
        ["شناسه گروه", row.chat_id],
        ["نام گروه", row.chat_title],
        ["لیبل", groupLabelText(row.group_label)],
        ["یوزرنیم گروه", row.chat_username],
        ["نوع گروه", row.chat_type],
        ["نام تاپیک", row.topic_name],
        ["شناسه تاپیک", row.message_thread_id],
        ["پیام تاپیکی", row.is_topic_message],
        ["یوزرنیم", row.sender_username],
        ["شناسه فرستنده", row.sender_id],
        ["نام فرستنده", row.sender_first_name],
        ["نام خانوادگی فرستنده", row.sender_last_name],
        ["فرستنده بات است", row.sender_is_bot],
        ["شناسه فایل عکس فرستنده", row.sender_photo_file_id],
        ["شناسه یکتای عکس فرستنده", row.sender_photo_file_unique_id],
        ["شناسه چت فرستنده", row.sender_chat_id],
        ["عنوان چت فرستنده", row.sender_chat_title],
        ["پیام", row.body],
        ["کپشن", row.caption],
        ...(row.edited_at_utc ? [
          ["متن اولیه پیام", row.original_message_content],
          ["آخرین متن ویرایش‌شده پیام", row.latest_edited_message_content],
        ] : []),
        ["تاریخ میلادی (تهران)", row.sent_date],
        ["تاریخ شمسی", row.sent_jalali_date],
        ["زمان (تهران)", row.sent_time],
        ["زمان ثبت (تهران)", row.registered_tehran_datetime],
        ["زمان ثبت (شمسی)", row.registered_jalali_datetime],
        ["زمان ثبت (UTC)", row.received_at_utc],
        ["تأخیر دریافت (ثانیه)", row.receive_delay_seconds],
        ["نوع", row.message_type],
        ["زمان ویرایش", row.edited_at_utc],
        ["شناسه پیام ریپلای", row.reply_to_message_id],
        ["شناسه فایل رسانه", row.media_file_id],
        ["شناسه گروه رسانه", row.media_group_id],
        ["شناسه پیام‌های آلبوم", row.album_message_ids],
        ["مبدأ فوروارد", row.forward_origin_json],
        ["موجودیت‌ها", row.entities_json],
        ["داده خام تلگرام", row.raw_payload_json],
      ];
      return \`<div class="details-grid">\${mediaDetailHtml(row)}\${details.map(([label, value]) => detailRow(label, value)).join("")}</div>\`;
    }
    function groupDetailHtml(row) {
      const details = [
        ["پلتفرم", platformText(row.platform)],
        ["بات", botText(row)],
        ["شناسه بات", row.bot_id],
        ["یوزرنیم بات", row.bot_username],
        ["نام بات", row.bot_name],
        ["شناسه گروه", row.chat_id],
        ["نام گروه", row.chat_title],
        ["یوزرنیم گروه", row.chat_username],
        ["نوع گروه", row.chat_type],
        ["پیام‌ها", row.message_count],
        ["تاپیک‌ها", row.topic_names],
        ["تاریخ عضویت (تهران)", row.joined_date],
        ["زمان عضویت (تهران)", row.joined_time],
        ["آخرین تاریخ مشاهده (تهران)", row.last_seen_date],
        ["آخرین زمان مشاهده (تهران)", row.last_seen_time],
        ["تاریخ آخرین پیام (تهران)", row.last_message_date],
        ["زمان آخرین پیام (تهران)", row.last_message_time],
      ];
      return \`<div class="details-grid">\${details.map(([label, value]) => detailRow(label, value)).join("")}</div>\`;
    }
    function botDetailHtml(row) {
      const details = [
        ["پلتفرم", platformText(row.platform)],
        ["نام بات", row.bot_name],
        ["یوزرنیم بات", row.bot_username],
        ["شناسه بات", row.bot_id],
        ["مسیر وبهوک", row.webhook_path],
        ["وضعیت", row.is_active ? "فعال" : "غیرفعال"],
        ["چهار رقم آخر credential", row.credential_last4],
        ["آخرین تغییر credential", row.credential_updated_tehran],
        ["ثبت‌کننده", row.created_by_email],
        ["گروه‌ها", row.group_count],
        ["پیام‌ها", row.message_count],
        ["اولین مشاهده", row.first_seen_tehran],
        ["آخرین مشاهده", row.last_seen_tehran],
        ["آخرین پیام", row.last_message_tehran],
      ];
      return \`<div class="details-grid">\${details.map(([label, value]) => detailRow(label, value)).join("")}</div>\`;
    }
    function messageContent(row) {
      return row.body || row.caption || (row.message_type ? "[" + row.message_type + "]" : "");
    }
    function platformText(value) {
      const labels = { telegram: "تلگرام", bale: "بله", whatsapp: "واتساپ" };
      const key = String(value || "telegram").toLowerCase();
      return labels[key] || key;
    }
    function botText(row) {
      return row.bot_username || row.bot_name || row.bot_id || "";
    }
    function rowPlatform(row) {
      return String(row?.platform || "telegram").toLowerCase();
    }
    function rowMessageKey(row, messageId = row?.message_id) {
      if (!row?.chat_id || !messageId) return "";
      return \`\${rowPlatform(row)}:\${row.chat_id}:\${messageId}\`;
    }
    function topicLabel(row) {
      return row.topic_name || "";
    }
    function isSyntheticTopicName(row) {
      return /^#\\d+$/.test(String(topicLabel(row) || "").trim());
    }
    function compactMessage(row) {
      const text = messageContent(row);
      return text ? renderMessageContent(text) : '<span class="thread-muted">بدون متن</span>';
    }
    function editedBadge(row) {
      return row.edited_at_utc ? '<span class="badge">ویرایش‌شده</span>' : '';
    }
    function messageWithBadge(row) {
      return \`\${editedBadge(row)}\${mediaBadge(row)}\${compactMessage(row)}\`;
    }
    function threadMedia(row) {
      const items = mediaItems(row);
      if (items.length > 1) {
        const gallery = items.map((item) => {
          if (isPhotoItem(item)) {
            return \`<button class="media-open thread-photo-frame" type="button" data-media-src="\${fileUrl(item)}" data-media-download="\${fileUrl(item, true)}" aria-label="مشاهده عکس"><img class="thread-photo" src="\${fileUrl(item)}" width="180" height="180" alt="" loading="lazy" /></button>\`;
          }
          if (isDownloadableFileItem(item)) {
            return \`<a class="thread-file" href="\${fileUrl(item, true)}" download><span>فایل</span><strong>\${esc(mediaFileName(item))}</strong></a>\`;
          }
          return "";
        }).join("");
        return \`<div class="thread-media album"><div class="media-gallery">\${gallery}</div></div>\`;
      }
      const item = items[0] || row;
      if (isPhotoItem(item)) {
        return \`<div class="thread-media"><button class="media-open thread-photo-frame" type="button" data-media-src="\${fileUrl(item)}" data-media-download="\${fileUrl(item, true)}" aria-label="مشاهده عکس"><img class="thread-photo" src="\${fileUrl(item)}" width="180" height="180" alt="" loading="lazy" /></button></div>\`;
      }
      if (isDownloadableFileItem(item)) {
        return \`<div class="thread-media"><a class="thread-file" href="\${fileUrl(item, true)}" download><span>فایل</span><strong>\${esc(mediaFileName(item))}</strong></a></div>\`;
      }
      return "";
    }
    function isTopicRootReply(row) {
      if (!row.reply_to_message_id || !row.message_thread_id) return false;
      return String(row.reply_to_message_id) === String(row.message_thread_id);
    }
    function isTopicServiceMessage(row) {
      return String(row?.message_type || "").startsWith("forum_topic_");
    }
    function initials(row) {
      const source = [row.sender_first_name, row.sender_last_name].filter(Boolean).join(" ") || row.sender_username || "?";
      return source.trim().slice(0, 1).toUpperCase() || "?";
    }
    function avatar(row) {
      if (row.sender_photo_file_id) {
        const params = new URLSearchParams({ platform: row.platform || "telegram", file_id: row.sender_photo_file_id });
        if (row.bot_id) params.set("bot_id", row.bot_id);
        return \`<img class="thread-avatar" src="/api/profile-photo?\${params.toString()}" alt="" loading="lazy" />\`;
      }
      return \`<span class="thread-avatar">\${esc(initials(row))}</span>\`;
    }
    function reactionInitials(reaction) {
      const source = [reaction.user_first_name, reaction.user_last_name].filter(Boolean).join(" ") || reaction.user_username || "?";
      return source.trim().slice(0, 1).toUpperCase() || "?";
    }
    function reactionAvatar(reaction) {
      if (reaction.user_photo_file_id) {
        return \`<img class="reaction-avatar" src="/api/profile-photo?file_id=\${encodeURIComponent(reaction.user_photo_file_id)}" alt="" loading="lazy" />\`;
      }
      return \`<span class="reaction-avatar">\${esc(reactionInitials(reaction))}</span>\`;
    }
    function reactionEmoji(reaction) {
      if (reaction.reaction_emoji) return reaction.reaction_emoji;
      if (reaction.reaction_type === "paid") return "⭐";
      if (reaction.custom_emoji_id) return "◌";
      return reaction.reaction_type || "";
    }
    function reactionBar(row) {
      const reactions = Array.isArray(row.reactions) ? row.reactions : [];
      if (!reactions.length) return "";
      return \`<div class="thread-reactions">\${reactions.map((reaction) => \`<span class="reaction-chip" title="\${esc(reaction.user_username || reaction.user_first_name || "")}">\${reactionAvatar(reaction)}<span class="reaction-emoji">\${esc(reactionEmoji(reaction))}</span></span>\`).join("")}</div>\`;
    }
    function canReplyToRow(row) {
      return canOpen("reply") && !row.missing && row.chat_id && row.message_id;
    }
    function threadReplyButton(row) {
      if (!canReplyToRow(row)) return "";
      return '<button class="details-button thread-reply-toggle" type="button" data-reply-toggle>پاسخ</button>';
    }
    function messageUuid(row) {
      if (!row?.chat_id || !row?.message_id) return "";
      return threadUuidForParts(row.platform || "telegram", row.chat_id, row.message_id);
    }
    function threadDirectLinkButton(row, uuid) {
      uuid = uuid || messageUuid(row);
      if (!uuid) return "";
      return \`<a class="details-button" href="/main/threads/\${esc(uuid)}">لینک</a>\`;
    }
    function threadContainsUuid(thread, uuid) {
      if (!uuid) return true;
      if (thread.uuid === uuid) return true;
      return [thread.root, ...(thread.replies || [])].some((row) => messageUuid(row) === uuid);
    }
    function threadReplyForm(row) {
      if (!canReplyToRow(row)) return "";
      return \`<div class="thread-reply-actions">
        <form class="thread-reply-form" data-thread-reply data-platform="\${esc(row.platform || "telegram")}" data-chat-id="\${esc(row.chat_id)}" data-message-id="\${esc(row.message_id)}" hidden>
          <textarea class="thread-reply-input" name="body" rows="1" maxlength="3500" placeholder="پاسخ به این پیام..."></textarea>
          <button class="thread-reply-submit" type="submit">ارسال</button>
          <div class="thread-reply-status" data-reply-status></div>
        </form>
      </div>\`;
    }
    function threadNode(row, kind, index, options = {}) {
      if (row.missing) {
        return \`<article class="thread-missing">
          <div class="thread-head">
            <span class="thread-pill">شناسه پیام: \${esc(row.message_id)}</span>
            <span class="thread-muted">پیام اصلی در محدوده فعلی داده‌ها نیست</span>
          </div>
        </article>\`;
      }
      const author = [row.sender_first_name, row.sender_last_name].filter(Boolean).join(" ") || row.sender_username || "نامشخص";
      const depth = Math.max(1, Number(options.depth || 1));
      const indentStyle = kind === "thread-reply" ? \` style="--thread-reply-indent:\${Math.min(depth, 5) * 24}px"\` : "";
      return \`<article class="\${kind}"\${indentStyle}>
        <div class="thread-item">
          \${avatar(row)}
          <div class="thread-content">
            <div class="thread-head">
              <span class="thread-author">\${esc(author)}</span>
              <span class="thread-pill">\${esc(platformText(row.platform))}</span>
              \${botText(row) ? \`<span class="thread-pill">بات: \${esc(botText(row))}</span>\` : ""}
              <span class="thread-muted">\${esc(row.sender_username ? "@" + row.sender_username : "")}</span>
              <span class="thread-muted">\${esc(row.chat_title)}</span>
              \${topicLabel(row) ? \`<span class="thread-pill">تاپیک: \${esc(topicLabel(row))}</span>\` : ""}
              <span class="thread-pill">شناسه پیام: \${esc(row.message_id)}</span>
              \${row.reply_to_message_id ? \`<span class="thread-pill">ریپلای به: \${esc(row.reply_to_message_id)}</span>\` : ""}
              <span class="thread-muted">\${esc(row.sent_jalali_date || "")} \${esc(row.sent_time || "")}</span>
              \${options.showDetails ? \`<button class="details-button" type="button" data-detail-key="thread-detail-\${index}">جزئیات</button>\` : ""}
              \${threadDirectLinkButton(row, options.threadUuid)}
              \${threadReplyButton(row)}
            </div>
            <div class="thread-message">\${messageWithBadge(row)}</div>
            \${threadMedia(row)}
            \${reactionBar(row)}
            \${threadReplyForm(row)}
          </div>
        </div>
      </article>\`;
    }
    function buildThreads(messages) {
      const latestByMessage = new Map();
      for (const row of messages) {
        if (!row.chat_id || !row.message_id) continue;
        const keys = [row.message_id, ...(Array.isArray(row.album_message_ids) ? row.album_message_ids : [])]
          .filter((value) => value != null)
          .map((messageId) => rowMessageKey(row, messageId));
        for (const key of keys) {
          const existing = latestByMessage.get(key);
          if (!existing || Date.parse(row.edited_at_utc || row.sent_at_utc || 0) > Date.parse(existing.edited_at_utc || existing.sent_at_utc || 0)) {
            latestByMessage.set(key, row);
          }
        }
      }
      const repliedToKeys = new Set();
      for (const row of new Set(latestByMessage.values())) {
        if (row.chat_id && row.reply_to_message_id && !isTopicRootReply(row)) {
          repliedToKeys.add(rowMessageKey(row, row.reply_to_message_id));
        }
      }
      function looksLikeDashboardReply(row) {
        const payload = row.raw_payload_json || {};
        const hasReplyChild = repliedToKeys.has(rowMessageKey(row));
        const isBotLike = Boolean(row.sender_is_bot || botText(row) || /bot$/i.test(String(row.sender_username || "")));
        return isBotLike
          && hasReplyChild
          && payload.dashboard_broadcast !== true;
      }
      function inferredDashboardReplyParentId(row) {
        if (row.reply_to_message_id || !looksLikeDashboardReply(row)) return null;
        const messageId = Number(row.message_id);
        if (!Number.isFinite(messageId) || messageId <= 1) return null;
        const previous = latestByMessage.get(rowMessageKey(row, messageId - 1));
        if (!previous || previous.sender_is_bot) return null;
        const sentAt = Date.parse(row.sent_at_utc || 0);
        const previousSentAt = Date.parse(previous.sent_at_utc || 0);
        if (!sentAt || !previousSentAt) return null;
        const diffMs = sentAt - previousSentAt;
        if (diffMs < 0 || diffMs > 5 * 60 * 1000) return null;
        return previous.message_id;
      }
      function parentKeyFor(row) {
        const replyToMessageId = row.reply_to_message_id || inferredDashboardReplyParentId(row);
        if (!replyToMessageId || !row.chat_id || isTopicRootReply({ ...row, reply_to_message_id: replyToMessageId })) return null;
        if (!row.reply_to_message_id) row.reply_to_message_id = replyToMessageId;
        return rowMessageKey(row, replyToMessageId);
      }
      function rootKeyFor(row) {
        let current = row;
        const seen = new Set();
        while (current) {
          const currentKey = rowMessageKey(current);
          if (seen.has(currentKey)) return currentKey;
          seen.add(currentKey);
          const parentKey = parentKeyFor(current);
          if (!parentKey) return currentKey;
          const parent = latestByMessage.get(parentKey);
          if (parent && isTopicServiceMessage(parent)) return currentKey;
          if (!parent) return currentKey;
          current = parent;
        }
        return rowMessageKey(row);
      }
      const childrenByParent = new Map();
      const replyCountByRoot = new Map();
      const rootKeys = new Set();
      const uniqueRows = [...new Set(latestByMessage.values())].filter((row) => !isTopicServiceMessage(row));
      for (const row of uniqueRows) rootKeyFor(row);
      for (const row of uniqueRows) {
        const rowKey = rowMessageKey(row);
        const rootKey = rootKeyFor(row);
        rootKeys.add(rootKey);
        if (rootKey !== rowKey) {
          const parentKey = parentKeyFor(row);
          const parentRow = parentKey ? latestByMessage.get(parentKey) : null;
          const treeParentKey = parentKey && parentRow && !isTopicServiceMessage(parentRow) && rootKeyFor(parentRow) === rootKey
            ? parentKey
            : rootKey;
          const list = childrenByParent.get(treeParentKey) || [];
          list.push(row);
          childrenByParent.set(treeParentKey, list);
          replyCountByRoot.set(rootKey, (replyCountByRoot.get(rootKey) || 0) + 1);
        }
      }
      for (const list of childrenByParent.values()) {
        list.sort((a, b) => {
          const aTime = Date.parse(a.sent_at_utc || 0) || 0;
          const bTime = Date.parse(b.sent_at_utc || 0) || 0;
          if (aTime !== bTime) return aTime - bTime;
          return Number(a.message_id || 0) - Number(b.message_id || 0);
        });
      }
      function descendantsFor(rootKey) {
        const result = [];
        const depthByKey = new Map();
        const walk = (parentKey, depth) => {
          for (const child of childrenByParent.get(parentKey) || []) {
            depthByKey.set(rowMessageKey(child), depth);
            result.push(child);
            walk(rowMessageKey(child), depth + 1);
          }
        };
        walk(rootKey, 1);
        return { replies: result, depthByKey };
      }
      return [...rootKeys].map((key) => {
        const keyParts = key.split(":");
        const root = latestByMessage.get(key) || { missing: true, platform: keyParts[0], chat_id: keyParts[1], message_id: keyParts[2] };
        const { replies, depthByKey } = descendantsFor(key);
        const activityTime = [root, ...replies]
          .map((row) => Date.parse(row.edited_at_utc || row.sent_at_utc || 0) || 0)
          .reduce((latest, time) => Math.max(latest, time), 0);
        const uuid = threadUuidForKey(key);
        return { key, uuid, root, replies, childrenByParent, depthByKey, replyCount: replyCountByRoot.get(key) || 0, activityTime };
      }).sort((a, b) => {
        return b.activityTime - a.activityTime;
      });
    }
    function threadRepliesHtml(thread, indexByRow, options = {}) {
      const replies = thread.replies || [];
      const expanded = expandedThreadKeys.has(thread.uuid) || threadUuidFromPath() === thread.uuid;
      const renderRow = (row, depth) => threadNode(row, "thread-reply", indexByRow.get(row), { ...options, depth });
      const renderTree = (parentKey, depth = 1) => (thread.childrenByParent.get(parentKey) || [])
        .map((reply) => renderRow(reply, depth) + renderTree(rowMessageKey(reply), depth + 1))
        .join("");
      if (replies.length <= 2 || expanded) {
        return renderTree(thread.key);
      }
      const hiddenCount = replies.length - 2;
      const expandButton = \`<div class="thread-expand">
        <button class="secondary-button thread-expand-button" type="button" data-thread-expand="\${esc(thread.uuid)}">نمایش \${numberFmt.format(hiddenCount)} پاسخ قدیمی‌تر</button>
      </div>\`;
      return expandButton + replies.slice(-2).map((reply) => renderRow(reply, thread.depthByKey.get(rowMessageKey(reply)) || 1)).join("");
    }
    function openModal(text) {
      modalTitleEl.textContent = "متن کامل پیام";
      modalBodyEl.innerHTML = text;
      modalBackdropEl.classList.add("open");
    }
    function openDetails(html, title = "جزئیات پیام") {
      modalTitleEl.textContent = title;
      modalBodyEl.innerHTML = html;
      modalBackdropEl.classList.add("open");
    }
    function openMediaModal(src, downloadUrl) {
      modalTitleEl.textContent = "تصویر";
      modalBodyEl.innerHTML = \`<div class="modal-media"><img class="modal-image" src="\${src}" alt="" /><a class="details-button" href="\${downloadUrl || src}" download>دانلود عکس</a></div>\`;
      modalBackdropEl.classList.add("open");
    }
    function openConfirmModal({ title, message, confirmText = "تایید", cancelText = "انصراف" }) {
      modalTitleEl.textContent = title;
      modalBodyEl.innerHTML = \`
        <p class="confirm-copy">\${message}</p>
        <div class="confirm-actions">
          <button class="confirm-cancel" type="button" data-confirm-value="cancel">\${esc(cancelText)}</button>
          <button class="confirm-danger" type="button" data-confirm-value="ok">\${esc(confirmText)}</button>
        </div>
      \`;
      modalBackdropEl.classList.add("open");
      return new Promise(resolve => {
        pendingConfirm = resolve;
      });
    }
    function openBroadcastConfirmModal({ body, groups }) {
      pendingBroadcastConfirm = { body, groups };
      const groupByKey = new Map(broadcastGroupOptions.map((group) => [group.key, group]));
      const targetHtml = groups.map((key) => {
        const group = groupByKey.get(key) || { title: key, platform: "" };
        return '<div class="confirm-target-item">'
          + '<strong>' + esc(group.title || key) + '</strong>'
          + '<span class="thread-muted">' + esc(platformText(group.platform || "")) + '</span>'
          + '</div>';
      }).join("");
      modalTitleEl.textContent = "تایید ارسال گروهی";
      modalBodyEl.innerHTML = '<p class="confirm-copy">این پیام برای <strong>' + numberFmt.format(groups.length) + '</strong> گروه ارسال شود؟</p>'
        + '<div class="confirm-target-list">' + targetHtml + '</div>'
        + '<p class="confirm-copy"><strong>متن پیام</strong></p>'
        + '<div class="confirm-message-preview">' + esc(body) + '</div>'
        + '<div class="confirm-password-row password-wrap">'
          + '<input data-confirm-password type="password" placeholder="پسورد شما برای تایید نهایی" autocomplete="current-password" />'
          + '<button class="password-toggle" data-confirm-password-toggle type="button" aria-label="نمایش پسورد">'
            + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>'
          + '</button>'
        + '</div>'
        + '<div class="confirm-error" data-confirm-error></div>'
        + '<div class="confirm-actions">'
          + '<button class="confirm-cancel" type="button" data-confirm-value="cancel">انصراف</button>'
          + '<button class="confirm-danger" type="button" data-confirm-value="ok">ارسال قطعی</button>'
        + '</div>';
      modalBackdropEl.classList.add("open");
      setTimeout(() => modalBodyEl.querySelector("[data-confirm-password]")?.focus(), 0);
      return new Promise(resolve => {
        pendingConfirm = resolve;
      });
    }
    function closeModal(confirmResult = false) {
      const confirmResolver = pendingConfirm;
      pendingConfirm = null;
      pendingBroadcastConfirm = null;
      modalBackdropEl.classList.remove("open");
      modalBodyEl.textContent = "";
      modalBodyEl.innerHTML = "";
      if (confirmResolver) confirmResolver(confirmResult);
    }
    function loadProfile() {
      profileMessageEl.textContent = "";
      syncProfileUi();
      setStatus(++loadingToken, "پروفایل");
    }
    function filteredChartDays(days, series, valueKey, selectedSet) {
      const activeSeries = selectedSet.size ? series.filter((item) => selectedSet.has(item)) : series;
      return {
        activeSeries,
        days: days.map((day) => {
          const values = day[valueKey] || {};
          const total = activeSeries.reduce((sum, item) => sum + Number(values[item] || 0), 0);
          return { ...day, total };
        }),
      };
    }
    function renderStackedDailyChart(chartEl, legendEl, days, series, valueKey, kind, selectedSet) {
      if (!Array.isArray(days) || !days.length || !Array.isArray(series) || !series.length) {
        chartEl.innerHTML = '<div class="empty-chart">شما به هیچ چیز دسترسی ندارید.</div>';
        legendEl.innerHTML = "";
        return;
      }
      const filtered = filteredChartDays(days, series, valueKey, selectedSet);
      const activeSeries = filtered.activeSeries;
      const displayDays = filtered.days;
      const colorByGroup = new Map(series.map((item, index) => [item, chartColors[index % chartColors.length]]));
      const maxTotal = Math.max(...displayDays.map((day) => Number(day.total || 0)), 1);
      chartEl.innerHTML = \`<div class="stacked-chart">\${displayDays.map((day) => {
        const total = Number(day.total || 0);
        const height = Math.max(2, Math.round((total / maxTotal) * 275));
        const values = day[valueKey] || {};
        const segments = activeSeries.map((item) => {
          const count = Number(values[item] || 0);
          if (!count) return "";
          const segmentHeight = Math.max(2, (count / total) * height);
          return \`<div class="bar-segment" style="height:\${segmentHeight}px;background:\${colorByGroup.get(item)}" title="\${esc(item)}: \${count}"></div>\`;
        }).join("");
        return \`<div class="day-bar">
          <div class="bar-total">\${total}</div>
          <div class="bar-stack" style="height:\${height}px">\${segments}</div>
          <div class="bar-label">\${esc(day.jalali_date || day.date)}<br />\${esc(day.date)}</div>
        </div>\`;
      }).join("")}</div>\`;
      legendEl.innerHTML = \`
        <div class="chart-filter-head">
          <span>\${selectedSet.size ? selectedSet.size + " مورد انتخاب شده" : "همه موارد"}</span>
          <button class="secondary-button" type="button" data-chart-reset="\${kind}" \${selectedSet.size ? "" : "hidden"}>ریست فیلتر</button>
        </div>
        <div class="legend-grid">
          \${series.map((item) => {
            const active = selectedSet.has(item);
            const dimmed = selectedSet.size && !active;
            return \`<button class="legend-item \${active ? "active" : ""} \${dimmed ? "dimmed" : ""}" type="button" data-chart-kind="\${kind}" data-chart-item="\${esc(item)}"><span class="legend-swatch" style="background:\${colorByGroup.get(item)}"></span><span>\${esc(item)}</span></button>\`;
          }).join("")}
        </div>\`;
    }
    function renderDailyChart(days, groups) {
      renderStackedDailyChart(dailyChartEl, chartLegendEl, days, groups, "groups", "groups", selectedGroupChartItems);
    }
    function renderUserDailyChart(days, users) {
      renderStackedDailyChart(userDailyChartEl, userChartLegendEl, days, users, "users", "users", selectedUserChartItems);
    }
    function renderDashboardCharts() {
      renderDailyChart(dashboardChartData.days || [], dashboardChartData.groups || []);
      renderUserDailyChart(dashboardChartData.userDays || [], dashboardChartData.users || []);
    }
    function toggleChartItem(kind, item) {
      const selectedSet = kind === "users" ? selectedUserChartItems : selectedGroupChartItems;
      if (selectedSet.has(item)) selectedSet.delete(item);
      else selectedSet.add(item);
      renderDashboardCharts();
    }
    function resetChartFilter(kind) {
      if (kind === "users") selectedUserChartItems.clear();
      else selectedGroupChartItems.clear();
      renderDashboardCharts();
    }
    async function loadDashboard() {
      const token = showLoading("در حال دریافت نمودار...");
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.days)) {
          dailyChartEl.innerHTML = "";
          chartLegendEl.innerHTML = "";
          userDailyChartEl.innerHTML = "";
          userChartLegendEl.innerHTML = "";
          dashboardChartData = { days: [], groups: [], userDays: [], users: [] };
          setStatus(token, data.detail || data.error || "خطا در دریافت نمودار");
          return;
        }
        dashboardChartData = {
          days: data.days || [],
          groups: data.groups || [],
          userDays: data.user_days || [],
          users: data.users || [],
        };
        selectedGroupChartItems.forEach((item) => { if (!dashboardChartData.groups.includes(item)) selectedGroupChartItems.delete(item); });
        selectedUserChartItems.forEach((item) => { if (!dashboardChartData.users.includes(item)) selectedUserChartItems.delete(item); });
        renderDashboardCharts();
        setStatus(token, data.total_messages + " پیام در " + data.days.length + " روز");
      } catch (error) {
        setStatus(token, "خطا در دریافت نمودار");
      }
    }
    function formatDuration(ms) {
      const totalSeconds = Math.max(0, Math.round(Number(ms || 0) / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      if (days) return days + " روز " + hours + " ساعت";
      if (hours) return hours + " ساعت " + minutes + " دقیقه";
      if (minutes) return minutes + " دقیقه " + seconds + " ثانیه";
      return seconds + " ثانیه";
    }
    function compactDateTime(value) {
      const text = String(value || "").trim();
      if (!text) return "-";
      const [datePart, timePart] = text.split(/\\s+/, 2);
      return esc(datePart || text) + (timePart ? '<br><span class="thread-muted">' + esc(timePart) + '</span>' : "");
    }
    function analyticsMetricCells(row, scope) {
      return '<td class="metric-number metric-count" data-label="تعداد پاسخ" data-analytics-scope="' + esc(scope) + '" data-analytics-detail="count">' + numberFmt.format(row.count || 0) + '</td>'
        + '<td class="metric-number" data-label="میانگین" data-analytics-scope="' + esc(scope) + '" data-analytics-detail="avg">' + esc(formatDuration(row.avg_ms)) + '</td>'
        + '<td class="metric-number" data-label="میانه" data-analytics-scope="' + esc(scope) + '" data-analytics-detail="median">' + esc(formatDuration(row.median_ms)) + '</td>'
        + '<td class="metric-number" data-label="کمترین" data-analytics-scope="' + esc(scope) + '" data-analytics-detail="min">' + esc(formatDuration(row.min_ms)) + '</td>'
        + '<td class="metric-number" data-label="بیشترین" data-analytics-scope="' + esc(scope) + '" data-analytics-detail="max">' + esc(formatDuration(row.max_ms)) + '</td>';
    }
    function analyticsRowsForScope(scope) {
      const key = scope === "labels" ? "labels" : (scope === "sender_labels" ? "sender_labels" : "groups");
      return [...(analyticsData[key] || [])].filter((row) => row.count);
    }
    function analyticsDetailRows(scope, kind) {
      const rows = analyticsRowsForScope(scope);
      if (kind === "min") return rows.filter((row) => row.min_ms > 0).sort((a, b) => a.min_ms - b.min_ms || b.count - a.count).slice(0, 12);
      if (kind === "max") return rows.sort((a, b) => b.max_ms - a.max_ms || b.count - a.count).slice(0, 12);
      if (kind === "median") return rows.sort((a, b) => b.median_ms - a.median_ms || b.count - a.count).slice(0, 12);
      if (kind === "count") return rows.sort((a, b) => b.count - a.count || b.total_ms - a.total_ms).slice(0, 12);
      return rows.sort((a, b) => b.avg_ms - a.avg_ms || b.count - a.count).slice(0, 12);
    }
    function analyticsScopeLabel(scope) {
      if (scope === "labels") return "لیبل‌ها";
      if (scope === "sender_labels") return "لیبل افراد";
      return "گروه‌ها";
    }
    function analyticsKindLabel(kind) {
      return {
        avg: "میانگین زمان پاسخ",
        count: "تعداد پاسخ",
        median: "میانه زمان پاسخ",
        min: "کمترین زمان پاسخ",
        max: "بیشترین زمان پاسخ",
      }[kind] || "میانگین زمان پاسخ";
    }
    function analyticsKindNote(kind) {
      return {
        avg: "مرتب‌سازی بر اساس بیشترین میانگین زمان پاسخ‌گویی انجام شده است.",
        count: "مرتب‌سازی بر اساس بیشترین تعداد پاسخ‌های قابل محاسبه انجام شده است.",
        median: "مرتب‌سازی بر اساس بیشترین میانه زمان پاسخ‌گویی انجام شده است.",
        min: "مرتب‌سازی بر اساس کمترین زمان پاسخ ثبت‌شده انجام شده است.",
        max: "مرتب‌سازی بر اساس بیشترین زمان پاسخ ثبت‌شده انجام شده است.",
      }[kind] || "مرتب‌سازی بر اساس همان ستون انتخاب‌شده انجام شده است.";
    }
    function analyticsPrimaryCells(row, scope) {
      if (scope === "labels") return '<td data-label="لیبل">' + esc(row.label_text || "بدون لیبل") + '</td>';
      if (scope === "sender_labels") return '<td data-label="لیبل فرد">' + esc(row.label_text || "بدون لیبل") + '</td>';
      return '<td data-label="گروه">' + esc(row.chat_title || "بدون نام") + '<br><span class="thread-muted">' + esc(row.chat_id || "") + '</span></td>'
        + '<td data-label="پلتفرم">' + esc(platformText(row.platform)) + '</td>'
        + '<td data-label="لیبل">' + esc(groupLabelText(row.group_label)) + '</td>';
    }
    function analyticsHeaderCells(scope) {
      if (scope === "labels") return '<th>لیبل</th>';
      if (scope === "sender_labels") return '<th>لیبل فرد</th>';
      return '<th>گروه</th><th>پلتفرم</th><th>لیبل</th>';
    }
    function openAnalyticsDetail(kind, scope = "groups") {
      const title = analyticsScopeLabel(scope) + " بر اساس " + analyticsKindLabel(kind);
      const note = analyticsKindNote(kind);
      const rows = analyticsDetailRows(scope, kind);
      const overallTotal = Number(analyticsData.overall?.total_ms || 0);
      const emptyColspan = scope === "groups" ? 9 : 7;
      const tableRows = rows.length ? rows.map((row) => {
        const share = overallTotal ? Math.round((Number(row.total_ms || 0) / overallTotal) * 1000) / 10 : 0;
        return '<tr>'
          + analyticsPrimaryCells(row, scope)
          + '<td class="metric-number metric-count" data-label="تعداد">' + numberFmt.format(row.count || 0) + '</td>'
          + '<td class="metric-number" data-label="میانگین">' + esc(formatDuration(row.avg_ms)) + '</td>'
          + '<td class="metric-number" data-label="میانه">' + esc(formatDuration(row.median_ms)) + '</td>'
          + '<td class="metric-number" data-label="کمترین">' + esc(formatDuration(row.min_ms)) + '</td>'
          + '<td class="metric-number" data-label="بیشترین">' + esc(formatDuration(row.max_ms)) + '</td>'
          + '<td class="metric-number" data-label="سهم از کل">' + (overallTotal ? numberFmt.format(share) + "٪" : "-") + '</td>'
        + '</tr>';
      }).join("") : '<tr><td colspan="' + emptyColspan + '">داده‌ای برای نمایش وجود ندارد.</td></tr>';
      openDetails(
        '<p class="analytics-detail-note">' + esc(note) + '</p>'
        + '<div class="modal-table-wrap"><table class="modal-table"><thead><tr>'
          + analyticsHeaderCells(scope) + '<th>تعداد</th><th>میانگین</th><th>میانه</th><th>کمترین</th><th>بیشترین</th><th>سهم از کل</th>'
        + '</tr></thead><tbody>' + tableRows + '</tbody></table></div>',
        title
      );
    }
    async function loadAnalytics() {
      const token = showLoading("در حال محاسبه تحلیل...");
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        if (!res.ok || !data.overall) {
          analyticsLabelRowsEl.innerHTML = "";
          analyticsSenderLabelRowsEl.innerHTML = "";
          analyticsGroupRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت تحلیل");
          return;
        }
        analyticsData = data;
        const overall = data.overall || {};
        analyticsAvgEl.textContent = overall.count ? formatDuration(overall.avg_ms) : "-";
        analyticsCountEl.textContent = numberFmt.format(overall.count || 0);
        analyticsMinEl.textContent = overall.count ? formatDuration(overall.min_ms) : "-";
        analyticsMaxEl.textContent = overall.count ? formatDuration(overall.max_ms) : "-";
        analyticsLabelRowsEl.innerHTML = (data.labels || []).length
          ? data.labels.map((row) => '<tr>'
              + '<td data-label="لیبل">' + esc(row.label_text || "بدون لیبل") + '</td>'
              + analyticsMetricCells(row, "labels")
            + '</tr>').join("")
          : '<tr><td colspan="6">پاسخ قابل محاسبه‌ای برای لیبل‌ها وجود ندارد.</td></tr>';
        analyticsSenderLabelRowsEl.innerHTML = (data.sender_labels || []).length
          ? data.sender_labels.map((row) => '<tr>'
              + '<td data-label="لیبل فرد">' + esc(row.label_text || "بدون لیبل") + '</td>'
              + analyticsMetricCells(row, "sender_labels")
            + '</tr>').join("")
          : '<tr><td colspan="6">پاسخ قابل محاسبه‌ای برای لیبل افراد وجود ندارد.</td></tr>';
        analyticsGroupRowsEl.innerHTML = (data.groups || []).length
          ? data.groups.map((row) => '<tr>'
              + '<td data-label="گروه">' + esc(row.chat_title || "بدون نام") + '</td>'
              + '<td data-label="پلتفرم">' + esc(platformText(row.platform)) + '</td>'
              + '<td data-label="لیبل">' + esc(groupLabelText(row.group_label)) + '</td>'
              + analyticsMetricCells(row, "groups")
            + '</tr>').join("")
          : '<tr><td colspan="8">پاسخ قابل محاسبه‌ای برای گروه‌ها وجود ندارد.</td></tr>';
        setStatus(token, numberFmt.format(overall.count || 0) + " پاسخ محاسبه‌شده");
      } catch (error) {
        analyticsLabelRowsEl.innerHTML = "";
        analyticsSenderLabelRowsEl.innerHTML = "";
        analyticsGroupRowsEl.innerHTML = "";
        setStatus(token, "خطا در دریافت تحلیل");
      }
    }
    async function load() {
      updateFilterButtons();
      const token = showLoading("در حال دریافت پیام‌ها...");
      try {
        await loadThreadFilterOptions();
        const params = new URLSearchParams();
        if (searchEl.value.trim()) params.set("q", searchEl.value.trim());
        if (normalizeHashtagInput(hashtagSearchEl.value)) params.set("hashtag", normalizeHashtagInput(hashtagSearchEl.value));
        appendFilterValues(params, "platform", selectedPlatformValues(messagePlatformFilter));
        appendFilterValues(params, "group", messageGroupFilter.values());
        appendFilterValues(params, "topic", messageTopicFilter.values());
        const res = await fetch("/api/messages?" + params);
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.messages)) {
          rowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت داده");
          return;
        }
        fullTextByKey.clear();
        detailByKey.clear();
        rowsEl.innerHTML = data.messages.length ? data.messages.map((row, index) => \`
          <tr>
            <td class="full-cell" data-label="پلتفرم">\${esc(platformText(row.platform))}</td>
            <td class="full-cell" data-label="بات">\${esc(botText(row))}</td>
            <td class="full-cell" data-label="نام گروه">\${esc(row.chat_title)}</td>
            <td class="full-cell" data-label="تاپیک">\${esc(topicLabel(row))}</td>
            <td class="full-cell" data-label="نام فرستنده">\${esc(row.sender_first_name)}</td>
            <td class="full-cell" data-label="نام خانوادگی">\${esc(row.sender_last_name)}</td>
            <td class="full-cell" data-label="یوزرنیم">\${esc(row.sender_username)}</td>
            <td class="body message-cell" data-label="پیام"><div class="message-inner">\${editedBadge(row)}\${mediaBadge(row)}\${textCell(row.body || row.caption || "[" + row.message_type + "]", "message-" + index, 115)}</div></td>
            <td class="full-cell" data-label="زمان ارسال">\${esc([row.sent_jalali_date, row.sent_time].filter(Boolean).join(" "))}</td>
            <td class="full-cell" data-label="زمان ثبت">\${esc(row.registered_jalali_datetime)}</td>
            <td data-label="جزئیات"><button class="details-button" type="button" data-detail-key="detail-\${index}">جزئیات</button></td>
          </tr>\`).join("") : '<tr><td colspan="11" class="empty">شما به هیچ چیز دسترسی ندارید.</td></tr>';
        data.messages.forEach((row, index) => detailByKey.set("detail-" + index, detailHtml(row)));
        setStatus(token, data.messages.length + " پیام");
      } catch (error) {
        setStatus(token, "خطا در دریافت داده");
      }
    }
    async function loadGroups() {
      const token = showLoading("در حال دریافت گروه‌ها...");
      try {
        const res = await fetch("/api/groups");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.groups)) {
          groupRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت گروه‌ها");
          return;
        }
        detailByKey.clear();
        groupRowsEl.innerHTML = data.groups.length ? data.groups.map(row => \`
          <tr>
            <td data-label="شناسه گروه">\${esc(row.chat_id)}</td>
            <td class="group-name-cell" data-label="نام گروه">\${esc(row.chat_title)}</td>
            <td data-label="پلتفرم">\${esc(platformText(row.platform))}</td>
            <td class="full-cell" data-label="بات">\${esc(botText(row))}</td>
            <td data-label="لیبل">\${groupLabelSelect(row)}</td>
            <td data-label="یوزرنیم گروه">\${esc(row.chat_username)}</td>
            <td data-label="نوع گروه">\${esc(row.chat_type)}</td>
            <td data-label="پیام‌ها">\${esc(row.message_count)}</td>
            <td data-label="جزئیات"><button class="details-button" type="button" data-detail-key="group-\${esc(row.platform || "telegram")}:\${esc(row.chat_id)}">جزئیات</button></td>
          </tr>\`).join("") : '<tr><td colspan="9" class="empty">شما به هیچ چیز دسترسی ندارید.</td></tr>';
        data.groups.forEach(row => detailByKey.set("group-" + (row.platform || "telegram") + ":" + row.chat_id, groupDetailHtml(row)));
        mountGroupLabelFilters();
        setStatus(token, data.groups.length + " گروه");
      } catch (error) {
        setStatus(token, "خطا در دریافت گروه‌ها");
      }
    }
    function senderDetailHtml(row) {
      const details = [
        ["پلتفرم", platformText(row.platform)],
        ["شناسه فرستنده", row.sender_id],
        ["نام", row.sender_first_name],
        ["نام خانوادگی", row.sender_last_name],
        ["یوزرنیم", row.sender_username ? "@" + row.sender_username : ""],
        ["فرستنده بات است", row.sender_is_bot],
        ["لیبل", senderLabelText(row.sender_label)],
        ["تعداد پیام‌ها", row.message_count],
        ["آخرین گروه", [row.last_chat_title, row.last_chat_id].filter(Boolean).join(" | ")],
        ["اولین مشاهده", row.first_seen_tehran],
        ["آخرین پیام", row.last_message_tehran],
      ];
      return \`<div class="details-grid">\${details.map(([label, value]) => detailRow(label, value)).join("")}</div>\`;
    }
    async function loadSenders() {
      const token = showLoading("در حال دریافت ارسال‌کننده‌ها...");
      try {
        const res = await fetch("/api/senders");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.senders)) {
          senderRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت ارسال‌کننده‌ها");
          return;
        }
        detailByKey.clear();
        senderRowsEl.innerHTML = data.senders.length ? data.senders.map((row) => \`
          <tr>
            <td data-label="شناسه فرستنده">\${esc(row.sender_id)}</td>
            <td data-label="نام">\${esc(row.sender_first_name || "")}</td>
            <td data-label="نام خانوادگی">\${esc(row.sender_last_name || "")}</td>
            <td data-label="یوزرنیم">\${esc(row.sender_username ? "@" + row.sender_username : "")}</td>
            <td data-label="پلتفرم">\${esc(platformText(row.platform))}</td>
            <td data-label="لیبل">\${senderLabelSelect(row)}</td>
            <td class="sender-last-group-cell" data-label="آخرین گروه">\${esc(row.last_chat_title || "-")}<br><span class="thread-muted">\${esc(row.last_chat_id || "")}</span></td>
            <td data-label="پیام‌ها">\${esc(row.message_count)}</td>
            <td class="sender-date-cell" data-label="زمان پیدا شدن">\${compactDateTime(row.first_seen_tehran)}</td>
            <td class="sender-date-cell" data-label="آخرین پیام">\${compactDateTime(row.last_message_tehran)}</td>
            <td data-label="جزئیات"><button class="details-button" type="button" data-detail-key="sender-\${esc(row.platform || "telegram")}:\${esc(row.sender_id)}">جزئیات</button></td>
          </tr>\`).join("") : '<tr><td colspan="11" class="empty">ارسال‌کننده‌ای پیدا نشد.</td></tr>';
        data.senders.forEach(row => detailByKey.set("sender-" + (row.platform || "telegram") + ":" + row.sender_id, senderDetailHtml(row)));
        mountSenderLabelFilters();
        setStatus(token, data.senders.length + " ارسال‌کننده");
      } catch (error) {
        setStatus(token, "خطا در دریافت ارسال‌کننده‌ها");
      }
    }
    async function loadAccessUsers() {
      const token = showLoading("در حال دریافت کاربران...");
      try {
        const groupsRes = await fetch("/api/access-groups");
        const groupsData = await groupsRes.json();
        accessGroupOptions = groupsRes.ok && Array.isArray(groupsData.groups) ? groupsData.groups : [];
        const res = await fetch("/api/access-users");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.users)) {
          accessUserRowsEl.innerHTML = "";
          accessRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت کاربران");
          return;
        }
        accessUserRowsEl.innerHTML = data.users.map((user) => \`
          <tr data-access-jump-email="\${esc(user.email)}">
            <td class="avatar-cell" data-label="آواتار">\${avatarMarkup(user.telegram_avatar_url, "access-table-avatar", "accessAvatar-" + String(user.email).replace(/[^a-zA-Z0-9_-]/g, "-"), user.email)}</td>
            <td class="full-cell" data-label="ایمیل">\${esc(user.email)}</td>
            <td class="full-cell" data-label="یوزرنیم تلگرام">\${esc(user.telegram_username || "-")}</td>
            <td data-label="وضعیت">\${esc(!user.is_active ? "لغوشده" : (user.must_change_password ? "نیازمند تغییر پسورد" : "فعال"))}</td>
            <td data-label="تاریخ ثبت">\${esc(user.created_at_utc ? tehranDisplay(user.created_at_utc) : "-")}</td>
            <td data-label="آخرین ورود">\${esc(user.last_login_at_utc ? tehranDisplay(user.last_login_at_utc) : "بدون ورود")}</td>
            <td data-label="دسترسی‌ها"><div class="access-permission-summary">\${permissionSummaryHtml(user.permissions)}</div></td>
          </tr>\`).join("") || '<tr><td colspan="7" class="empty">کاربری ثبت نشده است</td></tr>';
        accessRowsEl.innerHTML = data.users.map((user) => \`
          <div class="access-row" data-access-card-email="\${esc(user.email)}">
            <div class="access-main">
              <span class="access-email">\${esc(user.email)}</span>
              <span class="access-state">\${!user.is_active ? "لغوشده" : (user.must_change_password ? "نیازمند تغییر پسورد" : "فعال")} · ثبت: \${esc(user.created_at_utc ? tehranDisplay(user.created_at_utc) : "-")} · آخرین ورود: \${esc(user.last_login_at_utc ? tehranDisplay(user.last_login_at_utc) : "بدون ورود")}</span>
              <span class="access-actions">
                <button class="secondary-button" type="button" data-resend-email="\${esc(user.email)}">ارسال دوباره دعوت</button>
                \${user.is_owner
                  ? ""
                  : \`<button class="save-permissions-button" type="button" data-save-permissions-email="\${esc(user.email)}" disabled>ذخیره تغییرات</button>\`}
                \${user.is_owner
                  ? '<span class="owner-badge">مالک</span>'
                  : user.is_active
                  ? \`<button class="revoke-button" type="button" data-revoke-email="\${esc(user.email)}">لغو دسترسی</button>\`
                  : \`<button class="reactivate-button" type="button" data-reactivate-email="\${esc(user.email)}">فعال‌سازی دوباره</button>\`}
              </span>
            </div>
            <div class="permission-grid" data-permission-email="\${esc(user.email)}" data-owner="\${user.is_owner ? "true" : "false"}">\${permissionGridHtml(user.permissions, "user-" + user.email, user.is_owner)}</div>
            \${groupAccessHtml(user)}
          </div>\`).join("");
        setStatus(token, data.users.length + " کاربر");
      } catch (error) {
        setStatus(token, "خطا در دریافت کاربران");
      }
    }
    function userGroupAccessSource(user, group) {
      if (user.is_owner) return "مالک";
      const access = user.group_access || {};
      const labels = new Set(access.labels || []);
      const groups = new Set(access.groups || []);
      if (access.unrestricted) return "همه گروه‌ها";
      if (!labels.size && !groups.size) return "";
      if (labels.has(group.group_label || "")) return groupLabelShort(group.group_label) || "لیبل";
      if (groups.has(group.key)) return "گروه";
      return "";
    }
    function renderAccessGroupUsers() {
      const selectedKey = accessGroupFilter.value();
      const group = accessGroupOptions.find((item) => item.key === selectedKey);
      if (!group) {
        accessGroupSummaryEl.innerHTML = "";
        accessGroupUsersEl.innerHTML = '<div class="empty">یک گروه را انتخاب کنید.</div>';
        return;
      }
      const allowedUsers = accessUserOptions
        .map((user) => ({ user, source: userGroupAccessSource(user, group) }))
        .filter((item) => item.source && item.user.is_active);
      accessGroupSummaryEl.innerHTML = \`
        <span class="access-source-chip">\${esc(platformText(group.platform))}</span>
        <span class="access-source-chip">\${esc(groupLabelShort(group.group_label) || "بدون لیبل")}</span>
        <span>\${esc(group.title)}</span>
        <strong>\${allowedUsers.length} کاربر</strong>
      \`;
      accessGroupUsersEl.innerHTML = allowedUsers.length ? allowedUsers.map(({ user, source }) => \`
        <div class="access-group-user">
          <span class="access-email">\${esc(user.email)}</span>
          <span class="access-source-chip">\${esc(source)}</span>
          <span class="access-state">\${esc(user.last_login_at_utc ? tehranDisplay(user.last_login_at_utc) : "بدون ورود")}</span>
        </div>\`).join("") : '<div class="empty">هیچ کاربر فعالی برای این گروه دسترسی ندارد.</div>';
    }
    async function loadAccessGroupView() {
      const token = showLoading("در حال دریافت دسترسی گروه‌ها...");
      try {
        const [groupsRes, usersRes] = await Promise.all([
          fetch("/api/access-groups"),
          fetch("/api/access-users"),
        ]);
        const groupsData = await groupsRes.json();
        const usersData = await usersRes.json();
        if (!groupsRes.ok || !Array.isArray(groupsData.groups) || !usersRes.ok || !Array.isArray(usersData.users)) {
          accessGroupUsersEl.innerHTML = "";
          accessGroupSummaryEl.innerHTML = "";
          setStatus(token, groupsData.detail || groupsData.error || usersData.detail || usersData.error || "خطا در دریافت دسترسی گروه‌ها");
          return;
        }
        const previous = accessGroupFilter.value();
        accessGroupOptions = groupsData.groups;
        accessUserOptions = usersData.users;
        accessGroupFilter.setOptions(accessGroupOptions.map((group) => ({ value: group.key, label: \`\${group.title} · \${platformText(group.platform)}\${groupLabelShort(group.group_label) ? " · " + groupLabelShort(group.group_label) : ""}\` })));
        if (previous && accessGroupOptions.some((group) => group.key === previous)) accessGroupFilter.setValue(previous);
        renderAccessGroupUsers();
        setStatus(token, accessGroupOptions.length + " گروه");
      } catch (error) {
        accessGroupUsersEl.innerHTML = "";
        accessGroupSummaryEl.innerHTML = "";
        setStatus(token, "خطا در دریافت دسترسی گروه‌ها");
      }
    }
    async function loadAccessLogs() {
      const token = showLoading("در حال دریافت لاگ دسترسی‌ها...");
      try {
        const res = await fetch("/api/access-logs");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.logs)) {
          accessLogRowsEl.innerHTML = "";
          accessLogMessageEl.textContent = data.detail || data.error || "خطا در دریافت لاگ‌ها";
          setStatus(token, data.detail || data.error || "خطا در دریافت لاگ‌ها");
          return;
        }
        detailByKey.clear();
        accessLogRowsEl.innerHTML = data.logs.map((log, index) => {
          const key = "access-log-" + index;
          detailByKey.set(key, accessLogDetailsHtml(log));
          return \`<tr>
            <td data-label="عملیات">\${esc(accessActionText(log.action))}</td>
            <td data-label="انجام‌دهنده">\${esc(log.actor_email || "-")}</td>
            <td data-label="کاربر هدف">\${esc(log.target_email || "-")}</td>
            <td data-label="زمان">\${esc(log.created_at_utc ? tehranDisplay(log.created_at_utc) : "-")}</td>
            <td class="details-cell" data-label="جزئیات"><button class="details-button" type="button" data-detail-key="\${esc(key)}">جزئیات</button></td>
          </tr>\`;
        }).join("") || '<tr><td colspan="5" class="empty">لاگی ثبت نشده است</td></tr>';
        accessLogMessageEl.textContent = "";
        setStatus(token, data.logs.length + " لاگ");
      } catch (error) {
        accessLogRowsEl.innerHTML = "";
        accessLogMessageEl.textContent = "خطا در دریافت لاگ‌ها";
        setStatus(token, "خطا در دریافت لاگ‌ها");
      }
    }
    async function loadBots() {
      const token = showLoading("در حال دریافت بات‌ها...");
      try {
        const res = await fetch("/api/bots");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.bots)) {
          botRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت بات‌ها");
          return;
        }
        detailByKey.clear();
        botRowsEl.innerHTML = data.bots.map((row, index) => {
          const key = "bot-" + index;
          detailByKey.set(key, botDetailHtml(row));
          return \`<tr>
            <td data-label="پلتفرم">\${esc(platformText(row.platform))}</td>
            <td class="full-cell" data-label="نام بات">\${esc(row.bot_name || "-")}</td>
            <td class="full-cell" data-label="یوزرنیم بات">\${esc(row.bot_username || "-")}</td>
            <td data-label="شناسه بات">\${esc(row.bot_id || "-")}</td>
            <td data-label="گروه‌ها">\${esc(row.group_count || 0)}</td>
            <td data-label="پیام‌ها">\${esc(row.message_count || 0)}</td>
            <td class="full-cell" data-label="آخرین دریافت">\${esc(row.last_seen_tehran || "-")}</td>
            <td data-label="جزئیات"><button class="details-button" type="button" data-detail-key="\${esc(key)}">جزئیات</button></td>
          </tr>\`;
        }).join("") || '<tr><td colspan="8" class="empty">باتی ثبت نشده است</td></tr>';
        setStatus(token, data.bots.length + " بات");
      } catch (error) {
        botRowsEl.innerHTML = "";
        setStatus(token, "خطا در دریافت بات‌ها");
      }
    }
    let roadmapProducts = [];
    let roadmapTeams = [];
    let roadmapItems = [];
    let roadmapDashboardFilter = "";
    function productNameById(products, id) {
      const product = products.find((item) => String(item.id) === String(id || ""));
      return product?.name || "";
    }
    function roadmapProductOptions(products, selectedId) {
      const selected = String(selectedId || "");
      return '<option value="">محصول</option>' + products
        .filter((product) => !product.parent_id)
        .map((product) => \`<option value="\${esc(product.id)}" \${String(product.id) === selected ? "selected" : ""}>\${esc(product.name || product.product_key || product.id)}</option>\`)
        .join("");
    }
    function roadmapItemOptions(items, selectedId, types, placeholder) {
      const selected = String(selectedId || "");
      const allowedTypes = new Set(types || []);
      return '<option value="">' + esc(placeholder) + '</option>' + items
        .filter((item) => String(item.status || "") !== "canceled")
        .filter((item) => !allowedTypes.size || allowedTypes.has(String(item.item_type || "delivery")))
        .map((item) => \`<option value="\${esc(item.id)}" \${String(item.id) === selected ? "selected" : ""}>\${esc((item.title || item.id) + " · " + roadmapDeliveryText(item))}</option>\`)
        .join("");
    }
    function roadmapSubproductOptions(products, parentId, selectedId) {
      const selected = String(selectedId || "");
      const parent = String(parentId || "");
      return '<option value="">زیرمحصول اختیاری</option>' + products
        .filter((product) => product.parent_id && String(product.parent_id) === parent)
        .map((product) => \`<option value="\${esc(product.id)}" \${String(product.id) === selected ? "selected" : ""}>\${esc(product.name || product.product_key || product.id)}</option>\`)
        .join("");
    }
    function roadmapTeamOptions(teams, selectedId) {
      const selected = String(selectedId || "");
      return '<option value="">تیم</option>' + teams
        .map((team) => \`<option value="\${esc(team.id)}" \${String(team.id) === selected ? "selected" : ""}>\${esc(userGroupTypeLabel(team.group_type) + " · " + userGroupModeLabel(team.group_mode) + " · " + (team.name || team.id))}</option>\`)
        .join("");
    }
    function syncRoadmapSubproductOptions() {
      roadmapSubproductEl.innerHTML = roadmapSubproductOptions(roadmapProducts, roadmapProductEl.value, roadmapSubproductEl.value);
    }
    function dependencyResolutionText(dep) {
      const month = roadmapPathMonths.find((item) => Number(item.index) === Number(dep?.expected_resolution_month ?? dep?.expected_delivery_month));
      const week = Number(dep?.expected_resolution_week ?? dep?.expected_delivery_week);
      if (month && week >= 1 && week <= 4) return month.label + "، هفته " + numberFmt.format(week);
      return dep?.expected_resolution_date || dep?.expected_delivery_date || "-";
    }
    function roadmapStatusLabel(value) {
      return {
        not_started: "Not Started",
        on_track: "On Track",
        at_risk: "At Risk",
        blocked: "Blocked",
        delivered: "Delivered",
        planned: "Not Started",
        in_progress: "On Track",
      }[String(value || "")] || String(value || "-");
    }
    function roadmapRiskLabel(value) {
      return { low:"Low", medium:"Medium", high:"High", critical:"Critical" }[String(value || "")] || "-";
    }
    function roadmapTypeLabel(value) {
      return { initiative:"Initiative", major:"Major", delivery:"Delivery" }[String(value || "delivery")] || "Delivery";
    }
    function roadmapSlotIndex(month, week) {
      const numericMonth = Number(month);
      const numericWeek = Number(week);
      if (numericMonth >= 6 && numericMonth <= 12 && numericWeek >= 1 && numericWeek <= 4) return (numericMonth - 6) * 4 + numericWeek - 1;
      return null;
    }
    function dependencyHealth(dep) {
      const status = String(dep?.dependency_status || dep?.status || "");
      if (status === "blocked") return { key:"red", label:"Blocked" };
      if (status === "delivered") return { key:"green", label:"Delivered" };
      const expected = roadmapSlotIndex(dep?.expected_delivery_month ?? dep?.expected_resolution_month, dep?.expected_delivery_week ?? dep?.expected_resolution_week);
      const needBy = roadmapSlotIndex(dep?.need_by_month, dep?.need_by_week);
      if (expected === null || needBy === null) return status === "at_risk" ? { key:"yellow", label:"At Risk" } : { key:"green", label:"Healthy" };
      if (expected > needBy) return { key:"red", label:"Late" };
      if (needBy - expected <= 1) return { key:"yellow", label:"Tight" };
      return { key:"green", label:"Healthy" };
    }
    function dependencyNeedByText(dep) {
      const month = roadmapPathMonths.find((item) => Number(item.index) === Number(dep?.need_by_month));
      const week = Number(dep?.need_by_week);
      if (month && week >= 1 && week <= 4) return month.label + "، هفته " + numberFmt.format(week);
      return dep?.need_by_date || "-";
    }
    function roadmapProgressHtml(value) {
      const progress = Math.max(0, Math.min(100, Number(value || 0)));
      return \`<div class="roadmap-progress"><span>\${numberFmt.format(progress)}٪</span><div class="roadmap-progress-bar"><span style="width:\${progress}%"></span></div></div>\`;
    }
    function roadmapChainFor(provider, consumer, items) {
      const titles = [provider?.title || "-", consumer?.title || "-"];
      let cursor = consumer;
      const seen = new Set([String(provider?.id || ""), String(consumer?.id || "")]);
      while (cursor?.parent_roadmap_id) {
        const next = items.find((item) => String(item.id) === String(cursor.parent_roadmap_id));
        if (!next || seen.has(String(next.id))) break;
        titles.push(next.title || "-");
        seen.add(String(next.id));
        cursor = next;
      }
      return titles.join(" → ");
    }
    function syncRoadmapHierarchyOptions() {
      roadmapInitiativeEl.innerHTML = roadmapItemOptions(roadmapItems, roadmapInitiativeEl.value, ["initiative"], "Initiative / Outcome");
      roadmapMajorEl.innerHTML = roadmapItemOptions(roadmapItems, roadmapMajorEl.value, ["major"], "Major Delivery");
      roadmapTeamEl.innerHTML = roadmapTeamOptions(roadmapTeams, roadmapTeamEl.value);
    }
    function dependencySummary(dependencies, products, teams) {
      const list = Array.isArray(dependencies) ? dependencies : [];
      if (!list.length) return '<span>-</span>';
      return list.map((dep) => {
        const resolutionText = dependencyResolutionText(dep);
        const parts = [
          dep.product_id ? productNameById(products, dep.product_id) : "",
          dep.subproduct_id ? productNameById(products, dep.subproduct_id) : "",
          dep.team_id ? (teams.find((team) => String(team.id) === String(dep.team_id))?.name || "") : "",
          resolutionText !== "-" ? "تا " + resolutionText : "",
        ].filter(Boolean).join(" · ");
        return \`<span>\${esc(dep.title || "وابستگی")}\${parts ? " - " + esc(parts) : ""}</span>\`;
      }).join("");
    }
    function dependencyDetailsHtml(dependencies, products, teams) {
      const list = Array.isArray(dependencies) ? dependencies : [];
      if (!list.length) return '<span class="thread-muted">وابستگی ثبت نشده است.</span>';
      return list.map((dep, index) => {
        const teamName = teams.find((team) => String(team.id) === String(dep.team_id))?.name || "";
        return \`<div class="detail-row"><div class="detail-label">وابستگی \${esc(index + 1)}</div><div class="detail-value">
          <strong>\${esc(dep.title || "-")}</strong><br>
          \${dep.roadmap_id ? "نوع: تحویل‌دادنی وابسته<br>" : ""}
          \${dep.child_dependency_count ? "وابستگی‌های زیرمجموعه: " + esc(dep.child_dependency_count) + "<br>" : ""}
          محصول: \${esc(productNameById(products, dep.product_id) || "-")}<br>
          زیرمحصول: \${esc(productNameById(products, dep.subproduct_id) || "-")}<br>
          تیم: \${esc(teamName || "-")}<br>
          تاریخ انتظار حل: \${esc(dependencyResolutionText(dep))}<br>
          \${esc(dep.description || "-")}
        </div></div>\`;
      }).join("");
    }
    function roadmapDependencyRowHtml(value = {}, removable = true) {
      return \`
        <select data-dependency-provider>\${roadmapItemOptions(roadmapItems, value.provider_roadmap_id || value.roadmap_id, ["delivery", "major"], "Provider Delivery جدید")}</select>
        <input data-dependency-title type="text" maxlength="180" placeholder="عنوان Provider جدید" value="\${esc(value.title || "")}" />
        <select data-dependency-need-month>\${roadmapDeliveryMonthOptions(value.need_by_month)}</select>
        <select data-dependency-need-week>\${roadmapDeliveryWeekOptions(value.need_by_week)}</select>
        <select data-dependency-month>\${roadmapDeliveryMonthOptions(value.expected_delivery_month || value.expected_resolution_month)}</select>
        <select data-dependency-week>\${roadmapDeliveryWeekOptions(value.expected_delivery_week || value.expected_resolution_week)}</select>
        <select data-dependency-product>\${roadmapProductOptions(roadmapProducts, value.product_id)}</select>
        <select data-dependency-subproduct>\${roadmapSubproductOptions(roadmapProducts, value.product_id, value.subproduct_id)}</select>
        <select data-dependency-team>\${roadmapTeamOptions(roadmapTeams, value.team_id)}</select>
        \${removable ? '<button class="roadmap-dependency-remove" type="button" aria-label="حذف وابستگی">×</button>' : ""}
        <textarea class="roadmap-dependency-description" data-dependency-description maxlength="1200" placeholder="شرح جزئیات وابستگی">\${esc(value.description || "")}</textarea>
      \`;
    }
    function collectRoadmapDependenciesFrom(root) {
      return [...root.querySelectorAll(".roadmap-dependency-row")].map((row) => ({
        provider_roadmap_id: row.querySelector("[data-dependency-provider]")?.value || null,
        title: row.querySelector("[data-dependency-title]")?.value.trim() || "",
        need_by_month: row.querySelector("[data-dependency-need-month]")?.value || "",
        need_by_week: row.querySelector("[data-dependency-need-week]")?.value || "",
        expected_delivery_month: row.querySelector("[data-dependency-month]")?.value || "",
        expected_delivery_week: row.querySelector("[data-dependency-week]")?.value || "",
        product_id: row.querySelector("[data-dependency-product]")?.value || null,
        subproduct_id: row.querySelector("[data-dependency-subproduct]")?.value || null,
        team_id: row.querySelector("[data-dependency-team]")?.value || null,
        description: row.querySelector("[data-dependency-description]")?.value.trim() || "",
      })).filter((dep) => dep.provider_roadmap_id || dep.title || dep.need_by_month || dep.need_by_week || dep.expected_delivery_month || dep.expected_delivery_week || dep.product_id || dep.subproduct_id || dep.team_id || dep.description);
    }
    const roadmapPathMonths = [
      { index: 6, label: "شهریور" },
      { index: 7, label: "مهر" },
      { index: 8, label: "آبان" },
      { index: 9, label: "آذر" },
      { index: 10, label: "دی" },
      { index: 11, label: "بهمن" },
      { index: 12, label: "اسفند" },
    ];
    function asciiNumber(value) {
      return Number(String(value || "").replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
    }
    function persianMonthDay(dateValue) {
      const date = new Date(String(dateValue || "") + "T12:00:00Z");
      if (Number.isNaN(date.getTime())) return null;
      const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month:"numeric", day:"numeric" }).formatToParts(date);
      return {
        month: asciiNumber(parts.find((part) => part.type === "month")?.value),
        day: asciiNumber(parts.find((part) => part.type === "day")?.value),
      };
    }
    function roadmapDeliveryMonthOptions(selectedValue) {
      const selected = String(selectedValue || "");
      return '<option value="">ماه حل</option>' + roadmapPathMonths
        .map((month) => \`<option value="\${esc(month.index)}" \${String(month.index) === selected ? "selected" : ""}>\${esc(month.label)}</option>\`)
        .join("");
    }
    function roadmapDeliveryWeekOptions(selectedValue) {
      const selected = String(selectedValue || "");
      return '<option value="">هفته حل</option>' + [1, 2, 3, 4]
        .map((week) => \`<option value="\${week}" \${String(week) === selected ? "selected" : ""}>هفته \${numberFmt.format(week)}</option>\`)
        .join("");
    }
    function roadmapDeliveryText(item) {
      return item.delivery_slot || item.delivery_date || "-";
    }
    function roadmapSlotText(monthValue, weekValue) {
      const month = roadmapPathMonths.find((item) => Number(item.index) === Number(monthValue));
      const week = Number(weekValue);
      if (month && week >= 1 && week <= 4) return month.label + "، هفته " + numberFmt.format(week);
      return "";
    }
    function roadmapTimelineIndex(item) {
      const deliveryMonth = Number(item?.timeline_month ?? item?.delivery_month);
      const deliveryWeek = Number(item?.timeline_week ?? item?.delivery_week);
      if (deliveryMonth >= 6 && deliveryMonth <= 12 && deliveryWeek >= 1 && deliveryWeek <= 4) {
        return (deliveryMonth - 6) * 4 + deliveryWeek - 1;
      }
      const parts = persianMonthDay(item?.timeline_date || item?.delivery_date);
      if (!parts) return null;
      const monthOffset = parts.month - 6;
      if (monthOffset < 0 || monthOffset > 6) return null;
      const weekOffset = Math.min(3, Math.max(0, Math.ceil(parts.day / 7) - 1));
      return monthOffset * 4 + weekOffset;
    }
    function roadmapDeliveryItems(items) {
      const hasNonInitiative = items.some((item) => String(item.item_type || "delivery") !== "initiative");
      return items.filter((item) => String(item.status || "") !== "canceled")
        .filter((item) => !hasNonInitiative || String(item.item_type || "delivery") !== "initiative");
    }
    function roadmapStatusKey(item) {
      const value = String(item?.status || "not_started");
      if (value === "delivered") return "done";
      if (value === "on_track" || value === "in_progress") return "in_progress";
      if (value === "at_risk") return "at_risk";
      if (value === "blocked") return "blocked";
      return "planned";
    }
    function roadmapStatusText(item) {
      return {
        planned: "Planned",
        in_progress: "In Progress",
        at_risk: "At Risk",
        blocked: "Blocked",
        done: "Done",
      }[roadmapStatusKey(item)] || roadmapStatusLabel(item?.status);
    }
    function roadmapConfidence(item) {
      const risk = String(item?.risk || "medium");
      if (risk === "low") return "high";
      if (risk === "high" || risk === "critical") return "low";
      return "medium";
    }
    function roadmapConfidenceText(value) {
      return { high: "High", medium: "Medium", low: "Low" }[String(value || "")] || "Medium";
    }
    function roadmapItemSlot(item) {
      return roadmapSlotIndex(item?.delivery_month, item?.delivery_week);
    }
    function roadmapCurrentSlot() {
      const now = new Date();
      const parts = persianMonthDay(now.toISOString().slice(0, 10));
      if (!parts || parts.month < 6 || parts.month > 12) return 0;
      return (parts.month - 6) * 4 + Math.min(3, Math.max(0, Math.ceil(parts.day / 7) - 1));
    }
    function roadmapIsUpcoming(item, slots = 4) {
      if (roadmapStatusKey(item) === "done") return false;
      const slot = roadmapItemSlot(item);
      if (slot === null) return false;
      const current = roadmapCurrentSlot();
      return slot >= current && slot <= current + slots;
    }
    function roadmapIsOverdue(item) {
      if (roadmapStatusKey(item) === "done") return false;
      const slot = roadmapItemSlot(item);
      if (slot === null) return false;
      return slot < roadmapCurrentSlot();
    }
    function roadmapItemProductName(item, products) {
      return productNameById(products, item.subproduct_id || item.product_id) || productNameById(products, item.product_id) || "-";
    }
    function roadmapItemTeamName(item, teams) {
      return teams.find((team) => String(team.id) === String(item.team_id))?.name || "-";
    }
    function roadmapItemInitiativeName(item, items) {
      if (String(item.item_type || "") === "initiative") return item.title || "Initiative";
      const initiative = items.find((candidate) => String(candidate.id) === String(item.initiative_id));
      if (initiative?.title) return initiative.title;
      const major = items.find((candidate) => String(candidate.id) === String(item.major_delivery_id));
      return major?.title || "بدون Initiative";
    }
    function roadmapDependencyHealth(item) {
      const deps = Array.isArray(item?.dependencies) ? item.dependencies : [];
      if (deps.some((dep) => dependencyHealth(dep).key === "red")) return { key: "red", label: "Blocked Dependency" };
      if (deps.some((dep) => dependencyHealth(dep).key === "yellow")) return { key: "yellow", label: "Dependency Risk" };
      return { key: "green", label: "Healthy" };
    }
    function selectedValues(select) {
      return Array.from(select?.selectedOptions || []).map((option) => option.value).filter(Boolean);
    }
    function setSelectOptions(select, options, selected = []) {
      if (!select) return;
      const selectedSet = new Set(selected.map(String));
      const placeholder = select.multiple ? \`<option value="" disabled \${selectedSet.size ? "" : "selected"}>\${esc(select.getAttribute("aria-label") || "فیلتر")}</option>\` : "";
      select.innerHTML = placeholder + options.map((option) => \`<option value="\${esc(option.value)}" \${selectedSet.has(String(option.value)) ? "selected" : ""}>\${esc(option.label)}</option>\`).join("");
    }
    function roadmapPeriodColumns(granularity) {
      if (granularity === "biweekly") {
        return roadmapPathMonths.flatMap((month) => [
          { key: "m" + month.index + "-h1", label: month.label + " ۱-۲" },
          { key: "m" + month.index + "-h2", label: month.label + " ۳-۴" },
        ]);
      }
      return roadmapPathMonths.map((month) => ({ key: "m" + month.index, label: month.label }));
    }
    function roadmapPeriodKey(item, granularity) {
      const month = Number(item?.delivery_month);
      const week = Number(item?.delivery_week);
      if (!(month >= 6 && month <= 12)) return "outside";
      if (granularity === "biweekly") return "m" + month + "-h" + (week <= 2 ? "1" : "2");
      return "m" + month;
    }
    function roadmapRowKey(item, items, products, teams, mode) {
      if (mode === "product") return roadmapItemProductName(item, products);
      if (mode === "initiative") return roadmapItemInitiativeName(item, items);
      if (mode === "team") return roadmapItemTeamName(item, teams);
      return roadmapItemInitiativeName(item, items) + " / " + roadmapItemProductName(item, products);
    }
    function roadmapPopulateDashboardFilters(items, products, teams) {
      const deliveryItems = roadmapDeliveryItems(items);
      setSelectOptions(roadmapFilterProductEl, products.map((product) => ({ value: product.id, label: product.parent_id ? "زیرمحصول: " + (product.name || product.product_key || product.id) : product.name || product.product_key || product.id })), selectedValues(roadmapFilterProductEl));
      const initiativeOptions = [...new Set(deliveryItems.map((item) => roadmapItemInitiativeName(item, items)).filter(Boolean))]
        .map((label) => ({ value: label, label }));
      setSelectOptions(roadmapFilterInitiativeEl, initiativeOptions, selectedValues(roadmapFilterInitiativeEl));
      setSelectOptions(roadmapFilterTeamEl, teams.map((team) => ({ value: team.id, label: team.name || team.id })), selectedValues(roadmapFilterTeamEl));
      const ownerOptions = [...new Set(deliveryItems.map((item) => item.owner_email).filter(Boolean))]
        .map((email) => ({ value: email, label: email }));
      setSelectOptions(roadmapFilterOwnerEl, ownerOptions, selectedValues(roadmapFilterOwnerEl));
      setSelectOptions(roadmapFilterStatusEl, ["planned", "in_progress", "at_risk", "blocked", "done"].map((key) => ({ value: key, label: { planned:"Planned", in_progress:"In Progress", at_risk:"At Risk", blocked:"Blocked", done:"Done" }[key] })), selectedValues(roadmapFilterStatusEl));
      setSelectOptions(roadmapFilterConfidenceEl, ["high", "medium", "low"].map((key) => ({ value: key, label: roadmapConfidenceText(key) })), selectedValues(roadmapFilterConfidenceEl));
    }
    function roadmapFilteredDashboardItems(items, products, teams) {
      let deliveryItems = roadmapDeliveryItems(items);
      const productIds = selectedValues(roadmapFilterProductEl);
      const initiativeNames = selectedValues(roadmapFilterInitiativeEl);
      const teamIds = selectedValues(roadmapFilterTeamEl);
      const owners = selectedValues(roadmapFilterOwnerEl);
      const statuses = selectedValues(roadmapFilterStatusEl);
      const confidences = selectedValues(roadmapFilterConfidenceEl);
      const range = roadmapFilterRangeEl?.value || "all";
      const query = String(roadmapSearchEl?.value || "").trim().toLowerCase();
      if (productIds.length) deliveryItems = deliveryItems.filter((item) => productIds.some((productId) => roadmapItemMatchesProduct(item, products, productId)));
      if (initiativeNames.length) deliveryItems = deliveryItems.filter((item) => initiativeNames.includes(roadmapItemInitiativeName(item, items)));
      if (teamIds.length) deliveryItems = deliveryItems.filter((item) => teamIds.includes(String(item.team_id || "")));
      if (owners.length) deliveryItems = deliveryItems.filter((item) => owners.includes(String(item.owner_email || "")));
      if (statuses.length) deliveryItems = deliveryItems.filter((item) => statuses.includes(roadmapStatusKey(item)));
      if (confidences.length) deliveryItems = deliveryItems.filter((item) => confidences.includes(roadmapConfidence(item)));
      if (range === "next30" || roadmapDashboardFilter === "upcoming") deliveryItems = deliveryItems.filter((item) => roadmapIsUpcoming(item, 4));
      if (range === "next60") deliveryItems = deliveryItems.filter((item) => roadmapIsUpcoming(item, 8));
      if (range === "next90") deliveryItems = deliveryItems.filter((item) => roadmapIsUpcoming(item, 12));
      if (range === "risk" || roadmapDashboardFilter === "risk") deliveryItems = deliveryItems.filter((item) => ["at_risk", "blocked"].includes(roadmapStatusKey(item)) || roadmapDependencyHealth(item).key !== "green");
      if (range === "done" || roadmapDashboardFilter === "delivered") deliveryItems = deliveryItems.filter((item) => roadmapStatusKey(item) === "done");
      if (roadmapDashboardFilter === "blocked") deliveryItems = deliveryItems.filter((item) => roadmapStatusKey(item) === "blocked" || roadmapDependencyHealth(item).key === "red");
      if (query) {
        deliveryItems = deliveryItems.filter((item) => [item.title, item.description, item.owner_email, roadmapItemProductName(item, products), roadmapItemTeamName(item, teams), roadmapItemInitiativeName(item, items)]
          .some((value) => String(value || "").toLowerCase().includes(query)));
      }
      return deliveryItems.sort((left, right) => (roadmapItemSlot(left) ?? 999) - (roadmapItemSlot(right) ?? 999));
    }
    function roadmapCardHtml(item, products, teams) {
      const statusKey = roadmapStatusKey(item);
      const depHealth = roadmapDependencyHealth(item);
      const color = stableColor((item.product_id ? "product:" + item.product_id : "team:" + item.team_id) || item.title);
      return \`<button class="roadmap-delivery-card status-\${esc(statusKey)} \${roadmapIsOverdue(item) ? "is-overdue" : ""}" type="button" data-roadmap-open="\${esc(item.id)}" style="--card-color:\${esc(color)}">
        <strong>\${esc(item.title || "-")}</strong>
        <span class="roadmap-card-meta">\${esc(roadmapItemTeamName(item, teams))}</span>
        <span class="roadmap-status-badge">\${esc(roadmapStatusText(item))}</span>
        \${depHealth.key !== "green" ? \`<span class="roadmap-dep-dot \${esc(depHealth.key)}">Dependency</span>\` : ""}
        \${roadmapIsOverdue(item) ? '<span class="roadmap-dep-dot red">Overdue</span>' : ""}
      </button>\`;
    }
    function renderRoadmapKpis(allItems) {
      if (!roadmapKpisEl) return;
      const deliveries = roadmapDeliveryItems(allItems);
      const upcoming = deliveries.filter((item) => roadmapIsUpcoming(item)).length;
      const risk = deliveries.filter((item) => roadmapStatusKey(item) === "at_risk" || roadmapDependencyHealth(item).key === "yellow").length;
      const blocked = deliveries.filter((item) => roadmapStatusKey(item) === "blocked" || roadmapDependencyHealth(item).key === "red").length;
      const delivered = deliveries.filter((item) => roadmapStatusKey(item) === "done").length;
      const cards = [
        ["upcoming", "Upcoming Deliveries", upcoming],
        ["risk", "At Risk", risk],
        ["blocked", "Blocked", blocked],
        ["delivered", "Delivered", delivered],
      ];
      roadmapKpisEl.innerHTML = cards.map(([key, label, value]) => \`<button class="roadmap-kpi \${roadmapDashboardFilter === key ? "active" : ""}" type="button" data-roadmap-kpi="\${key}"><span>\${esc(label)}</span><strong>\${numberFmt.format(value)}</strong></button>\`).join("");
    }
    function renderRoadmapMatrix(items, products, teams) {
      if (!roadmapMatrixEl) return;
      const granularity = roadmapMatrixGranularityEl?.value || "month";
      const rowMode = roadmapMatrixRowsEl?.value || "initiative_product";
      const columns = roadmapPeriodColumns(granularity);
      const rows = new Map();
      items.forEach((item) => {
        const rowKey = roadmapRowKey(item, roadmapItems, products, teams, rowMode);
        if (!rows.has(rowKey)) rows.set(rowKey, new Map(columns.map((column) => [column.key, []])));
        const key = roadmapPeriodKey(item, granularity);
        if (rows.get(rowKey).has(key)) rows.get(rowKey).get(key).push(item);
      });
      const header = \`<div class="roadmap-matrix-head">محور</div>\${columns.map((column) => \`<div class="roadmap-matrix-head">\${esc(column.label)}</div>\`).join("")}\`;
      const body = [...rows.entries()].map(([rowKey, cells]) => \`<div class="roadmap-matrix-row-title">\${esc(rowKey)}</div>\${columns.map((column) => {
        const cellItems = cells.get(column.key) || [];
        return \`<div class="roadmap-matrix-cell">\${cellItems.map((item) => roadmapCardHtml(item, products, teams)).join("") || '<span class="thread-muted">-</span>'}</div>\`;
      }).join("")}\`).join("");
      const columnMin = granularity === "biweekly" ? 130 : 150;
      roadmapMatrixEl.innerHTML = \`<div class="roadmap-matrix" style="grid-template-columns:minmax(180px, .95fr) repeat(\${columns.length}, minmax(\${columnMin}px, 1fr))">\${header}\${body || \`<div class="empty" style="grid-column:1 / -1">موردی مطابق فیلترها نیست</div>\`}</div>\`;
    }
    function renderRoadmapCompactTable(targetEl, rows, emptyText) {
      if (!targetEl) return;
      targetEl.innerHTML = rows.length ? \`<div class="roadmap-summary-list">\${rows.map((item) => {
        const health = roadmapDependencyHealth(item);
        return \`<article class="roadmap-summary-item">
          <div><strong>\${esc(item.title || "-")}</strong><div class="roadmap-summary-meta">\${esc(roadmapItemProductName(item, roadmapProducts))}</div></div>
          <div class="roadmap-summary-meta">\${esc(item.owner_email || "-")}<br>\${esc(roadmapItemTeamName(item, roadmapTeams))}</div>
          <div>\${esc(roadmapDeliveryText(item))}</div>
          <div><span class="roadmap-status-badge">\${esc(roadmapStatusText(item))}</span></div>
          <div><span class="roadmap-health \${esc(health.key)}">\${esc(health.label)}</span></div>
          <button class="details-button" type="button" data-roadmap-open="\${esc(item.id)}">جزئیات</button>
        </article>\`;
      }).join("")}</div>\` : \`<div class="empty">\${esc(emptyText)}</div>\`;
    }
    function renderRoadmapExecutiveSections(filteredItems) {
      const next30 = filteredItems.filter((item) => roadmapIsUpcoming(item)).slice(0, 8);
      const risks = filteredItems.filter((item) => ["at_risk", "blocked"].includes(roadmapStatusKey(item)) || roadmapDependencyHealth(item).key !== "green").slice(0, 8);
      const delivered = filteredItems.filter((item) => roadmapStatusKey(item) === "done").slice(0, 8);
      renderRoadmapCompactTable(roadmapNext30El, next30, "در ۳۰ روز آینده تحویلی ثبت نشده است.");
      renderRoadmapCompactTable(roadmapRisksEl, risks, "ریسک یا وابستگی بحرانی دیده نمی‌شود.");
      renderRoadmapCompactTable(roadmapDeliveredEl, delivered, "تحویل‌شده‌ای ثبت نشده است.");
    }
    function renderRoadmapExecutiveDashboard(items, products, teams) {
      roadmapPopulateDashboardFilters(items, products, teams);
      renderRoadmapKpis(items);
      const filteredItems = roadmapFilteredDashboardItems(items, products, teams);
      renderRoadmapMatrix(filteredItems, products, teams);
      renderRoadmapExecutiveSections(filteredItems);
    }
    const roadmapColorPalette = ["#0f62fe", "#24a148", "#ff832b", "#8a3ffc", "#da1e28", "#007d79", "#d12771", "#6f6f6f", "#b28600", "#4589ff"];
    function stableColor(key) {
      const source = String(key || "default");
      let hash = 0;
      for (let index = 0; index < source.length; index += 1) hash = ((hash * 31) + source.charCodeAt(index)) >>> 0;
      return roadmapColorPalette[hash % roadmapColorPalette.length];
    }
    function productLineageIds(products, productId) {
      const ids = new Set();
      const direct = String(productId || "");
      if (!direct) return ids;
      ids.add(direct);
      products.filter((product) => String(product.parent_id || "") === direct).forEach((product) => ids.add(String(product.id)));
      return ids;
    }
    function roadmapItemMatchesProduct(item, products, selectedProductId) {
      const selectedIds = productLineageIds(products, selectedProductId);
      if (!selectedIds.size) return true;
      if (selectedIds.has(String(item.product_id || "")) || selectedIds.has(String(item.subproduct_id || ""))) return true;
      return (item.dependencies || []).some((dep) => selectedIds.has(String(dep.product_id || "")) || selectedIds.has(String(dep.subproduct_id || "")));
    }
    function roadmapItemMatchesTeam(item, selectedTeamId) {
      if (!selectedTeamId) return true;
      if (String(item.team_id || "") === String(selectedTeamId)) return true;
      return (item.dependencies || []).some((dep) => String(dep.team_id || "") === String(selectedTeamId));
    }
    function roadmapDependencyPins(items, products, selectedProductId, selectedTeamId) {
      const selectedProductIds = productLineageIds(products, selectedProductId);
      const visibleItemIds = new Set(items.map((item) => String(item.id)));
      return items.flatMap((item) => (item.dependencies || []).map((dep) => ({ item, dep })))
        .filter(({ dep }) => {
          const providerId = String(dep.provider_roadmap_id || dep.roadmap_id || "");
          return !providerId || !visibleItemIds.has(providerId);
        })
        .filter(({ dep }) => !selectedTeamId || String(dep.team_id || "") === String(selectedTeamId))
        .filter(({ dep }) => !selectedProductIds.size || selectedProductIds.has(String(dep.product_id || "")) || selectedProductIds.has(String(dep.subproduct_id || "")))
        .map(({ item, dep }) => ({
          kind: "dependency",
          title: dep.title || "وابستگی",
          subtitle: item.title || "",
          meta: dependencyResolutionText(dep),
          product_id: dep.subproduct_id || dep.product_id || item.subproduct_id || item.product_id,
          team_id: dep.team_id || "",
          roadmap_id: dep.roadmap_id || "",
          timeline_month: dep.expected_resolution_month,
          timeline_week: dep.expected_resolution_week,
          timeline_date: dep.expected_resolution_date,
        }));
    }
    function roadmapTimelineOptions(products, teams, selectedProductId, selectedTeamId) {
      const productOptions = '<option value="">همه محصول‌ها</option>' + products.map((product) => {
        const prefix = product.parent_id ? "زیرمحصول: " : "";
        const label = prefix + (product.name || product.product_key || product.id);
        return \`<option value="\${esc(product.id)}" \${String(product.id) === String(selectedProductId || "") ? "selected" : ""}>\${esc(label)}</option>\`;
      }).join("");
      const teamOptions = '<option value="">همه تیم‌ها</option>' + teams.map((team) => {
        const label = [userGroupTypeLabel(team.group_type), userGroupModeLabel(team.group_mode), team.name || team.id].filter(Boolean).join(" · ");
        return \`<option value="\${esc(team.id)}" \${String(team.id) === String(selectedTeamId || "") ? "selected" : ""}>\${esc(label)}</option>\`;
      }).join("");
      [roadmapTimelineProductEl, roadmapFullTimelineProductEl].filter(Boolean).forEach((select) => { select.innerHTML = productOptions; select.value = selectedProductId || ""; });
      [roadmapTimelineTeamEl, roadmapFullTimelineTeamEl].filter(Boolean).forEach((select) => { select.innerHTML = teamOptions; select.value = selectedTeamId || ""; });
    }
    function renderRoadmapTimeline(targetEl, items, products, teams, filters = {}) {
      const totalPoints = 28;
      const selectedProductId = String(filters.productId || "");
      const selectedTeamId = String(filters.teamId || "");
      const filteredItems = items
        .filter((item) => roadmapItemMatchesProduct(item, products, selectedProductId))
        .filter((item) => roadmapItemMatchesTeam(item, selectedTeamId));
      const deliveryPins = filteredItems.map((item) => ({
        kind: "delivery",
        title: item.title || "-",
        subtitle: productNameById(products, item.subproduct_id || item.product_id) || "-",
        meta: roadmapDeliveryText(item),
        product_id: item.subproduct_id || item.product_id,
        team_id: "",
        timeline_month: item.delivery_month,
        timeline_week: item.delivery_week,
        timeline_date: item.delivery_date,
      }));
      const dependencyPins = roadmapDependencyPins(filteredItems, products, selectedProductId, selectedTeamId);
      const pins = [...deliveryPins, ...dependencyPins];
      const pinsByIndex = new Map();
      const outside = [];
      pins.forEach((pin) => {
        const index = roadmapTimelineIndex(pin);
        if (index === null) outside.push(pin);
        else {
          if (!pinsByIndex.has(index)) pinsByIndex.set(index, []);
          pinsByIndex.get(index).push(pin);
        }
      });
      const laneGap = 4;
      const laneLastIndex = { delivery: [], dependency: [] };
      const scheduledPins = [...pinsByIndex.entries()].sort(([left], [right]) => left - right).flatMap(([index, list]) => list.map((pin) => {
        const laneKey = pin.kind === "dependency" ? "dependency" : "delivery";
        const lane = laneLastIndex[laneKey].findIndex((lastIndex) => index - lastIndex > laneGap);
        const laneIndex = lane >= 0 ? lane : laneLastIndex[laneKey].length;
        laneLastIndex[laneKey][laneIndex] = index;
        return { index, pin, laneIndex };
      })).sort((left, right) => left.index - right.index || left.laneIndex - right.laneIndex);
      const maxDeliveryStack = Math.max(outside.length ? 1 : 0, laneLastIndex.delivery.length);
      const maxDependencyStack = laneLastIndex.dependency.length;
      const stackStep = 138;
      const isFullTimeline = Boolean(targetEl.closest(".roadmap-path-page"));
      const baseTopPadding = isFullTimeline ? 280 : 240;
      const baseBottomPadding = isFullTimeline ? 118 : 102;
      targetEl.style.paddingTop = (baseTopPadding + Math.max(0, maxDeliveryStack - 1) * stackStep) + "px";
      targetEl.style.paddingBottom = (baseBottomPadding + Math.max(0, maxDependencyStack - 1) * stackStep) + "px";
      const dotHtml = Array.from({ length: totalPoints }, (_, index) => {
        const left = (index / (totalPoints - 1)) * 100;
        return \`<span class="roadmap-week-dot \${pinsByIndex.has(index) ? "has-items" : ""}" style="left:\${left}%"></span>\`;
      }).join("");
      const monthHtml = roadmapPathMonths.map((month, index) => {
        const left = (((index * 4) + 1.5) / (totalPoints - 1)) * 100;
        return \`<span class="roadmap-month-label" style="left:\${left}%">\${esc(month.label)}</span>\`;
      }).join("");
      const pinHtml = scheduledPins.map(({ index, pin, laneIndex }) => {
        const left = (index / (totalPoints - 1)) * 100;
        const edgeClass = index <= 1 ? " edge-start" : index >= totalPoints - 2 ? " edge-end" : "";
        const stackOffset = laneIndex * stackStep;
        const colorKey = pin.kind === "dependency" && pin.team_id ? "team:" + pin.team_id : "product:" + (pin.product_id || pin.title);
        const color = stableColor(colorKey);
        return \`<div class="roadmap-pin \${pin.kind === "dependency" ? "is-dependency" : ""}\${edgeClass}" style="left:\${left}%; --stack-offset:\${stackOffset}px; --pin-color:\${esc(color)}">
            <div class="roadmap-pin-card">
              <span class="roadmap-pin-kind">\${pin.kind === "dependency" ? "وابستگی" : "تحویل‌دادنی"}</span>
              <strong>\${esc(pin.title || "-")}</strong>
              <span>\${esc(pin.meta || "-")}</span><br>
              <span>\${esc(pin.subtitle || "-")}</span>
            </div>
          </div>\`;
      }).join("");
      const outsideHtml = outside.length ? \`<div class="roadmap-pin is-outside edge-end" style="left:100%">
        <div class="roadmap-pin-card"><strong>خارج از بازه</strong>\${outside.map((pin) => \`<br>\${esc(pin.title || "-")} · \${esc(pin.meta || "-")}\`).join("")}</div>
      </div>\` : "";
      targetEl.innerHTML = \`<div class="roadmap-axis">\${dotHtml}\${monthHtml}\${pinHtml}\${outsideHtml}</div>\`;
    }
    function refreshRoadmapTimelines() {
      const productId = roadmapTimelineProductEl?.value || roadmapFullTimelineProductEl?.value || "";
      const teamId = roadmapTimelineTeamEl?.value || roadmapFullTimelineTeamEl?.value || "";
      roadmapTimelineOptions(roadmapProducts, roadmapTeams, productId, teamId);
      if (roadmapTimelineEl) renderRoadmapTimeline(roadmapTimelineEl, roadmapItems, roadmapProducts, roadmapTeams, { productId, teamId });
      if (roadmapFullTimelineEl) renderRoadmapTimeline(roadmapFullTimelineEl, roadmapItems, roadmapProducts, roadmapTeams, { productId, teamId });
    }
    function roadmapDrawerField(label, value) {
      return \`<div class="roadmap-drawer-label">\${esc(label)}</div><div>\${value}</div>\`;
    }
    function roadmapDependenciesListHtml(item) {
      const deps = Array.isArray(item.dependencies) ? item.dependencies : [];
      if (!deps.length) return '<span class="thread-muted">وابستگی ثبت نشده است.</span>';
      return deps.map((dep) => {
        const provider = roadmapItems.find((candidate) => String(candidate.id) === String(dep.provider_roadmap_id || dep.roadmap_id));
        const health = dependencyHealth(dep);
        return \`<div class="roadmap-drawer-section">
          <strong>\${esc(dep.title || provider?.title || "-")}</strong>
          <div class="roadmap-drawer-grid">
            \${roadmapDrawerField("Provider", esc(provider?.title || dep.title || "-"))}
            \${roadmapDrawerField("Need-by", esc(dependencyNeedByText(dep)))}
            \${roadmapDrawerField("Expected", esc(dependencyResolutionText(dep)))}
            \${roadmapDrawerField("Health", \`<span class="roadmap-health \${esc(health.key)}">\${esc(health.label)}</span>\`)}
            \${roadmapDrawerField("شرح", esc(dep.description || "-"))}
          </div>
        </div>\`;
      }).join("");
    }
    function roadmapCheckpointsListHtml(item) {
      const checkpoints = Array.isArray(item.checkpoints) ? item.checkpoints : [];
      if (!checkpoints.length) return '<span class="thread-muted">چک‌پوینتی ثبت نشده است.</span>';
      return checkpoints.map((checkpoint) => \`<div class="roadmap-drawer-grid">
        \${roadmapDrawerField("Checkpoint", esc(checkpoint.title || "-"))}
        \${roadmapDrawerField("Expected", esc(roadmapSlotText(checkpoint.expected_month, checkpoint.expected_week) || checkpoint.expected_date || "-"))}
        \${roadmapDrawerField("Status", esc(roadmapStatusLabel(checkpoint.status)))}
      </div>\`).join("");
    }
    function roadmapDrawerHtml(item) {
      const initiative = roadmapItems.find((candidate) => String(candidate.id) === String(item.initiative_id));
      const major = roadmapItems.find((candidate) => String(candidate.id) === String(item.major_delivery_id));
      const depHealth = roadmapDependencyHealth(item);
      return \`<section class="roadmap-drawer-section">
        <h3>Delivery Overview</h3>
        <div class="roadmap-drawer-grid">
          \${roadmapDrawerField("سطح", esc(roadmapTypeLabel(item.item_type)))}
          \${roadmapDrawerField("Initiative", esc(initiative?.title || "-"))}
          \${roadmapDrawerField("Major Delivery", esc(major?.title || "-"))}
          \${roadmapDrawerField("Owner", esc(item.owner_email || "-"))}
          \${roadmapDrawerField("Team", esc(roadmapItemTeamName(item, roadmapTeams)))}
          \${roadmapDrawerField("Product", esc(roadmapItemProductName(item, roadmapProducts)))}
          \${roadmapDrawerField("Target", esc(roadmapDeliveryText(item)))}
          \${roadmapDrawerField("Status", \`<span class="roadmap-status-badge">\${esc(roadmapStatusText(item))}</span>\`)}
          \${roadmapDrawerField("Progress", esc(numberFmt.format(item.progress || 0) + "٪"))}
          \${roadmapDrawerField("Confidence", esc(roadmapConfidenceText(roadmapConfidence(item))))}
          \${roadmapDrawerField("Dependency Health", \`<span class="roadmap-health \${esc(depHealth.key)}">\${esc(depHealth.label)}</span>\`)}
          \${roadmapDrawerField("Last Update", esc(item.updated_at_utc ? tehranDisplay(item.updated_at_utc) : "-"))}
        </div>
      </section>
      <section class="roadmap-drawer-section">
        <h3>Deliverable / Outcome</h3>
        <div>\${item.description ? renderMessageContent(item.description) : '<span class="thread-muted">شرح ثبت نشده است.</span>'}</div>
      </section>
      <section class="roadmap-drawer-section">
        <h3>Dependencies</h3>
        \${roadmapDependenciesListHtml(item)}
      </section>
      <section class="roadmap-drawer-section">
        <h3>افزودن وابستگی</h3>
        <div class="roadmap-inline-form" data-roadmap-dependency-form="\${esc(item.id)}">
          <div class="roadmap-inline-dependency-list" data-roadmap-dependency-list>
            <div class="roadmap-dependency-row">\${roadmapDependencyRowHtml({ need_by_month: item.delivery_month, need_by_week: item.delivery_week }, false)}</div>
          </div>
          <div class="roadmap-inline-actions">
            <button class="secondary-button" type="button" data-roadmap-dependency-add-row="\${esc(item.id)}">+ وابستگی</button>
            <button class="details-button" type="button" data-roadmap-dependency-save="\${esc(item.id)}">ذخیره وابستگی</button>
            <span class="roadmap-inline-message" data-roadmap-dependency-message></span>
          </div>
        </div>
      </section>
      <section class="roadmap-drawer-section">
        <h3>Checkpoints</h3>
        \${roadmapCheckpointsListHtml(item)}
      </section>
      \${isOwnerEmail(currentUser.email) ? \`<section class="roadmap-drawer-section"><button class="revoke-button" type="button" data-roadmap-archive="\${esc(item.id)}">آرشیو</button></section>\` : ""}\`;
    }
    function openRoadmapDrawer(itemId) {
      const item = roadmapItems.find((candidate) => String(candidate.id) === String(itemId));
      if (!item) return;
      roadmapDrawerTitleEl.textContent = item.title || "Delivery";
      roadmapDrawerBodyEl.innerHTML = roadmapDrawerHtml(item);
      roadmapDrawerBackdropEl.classList.add("open");
    }
    function closeRoadmapDrawer() {
      roadmapDrawerBackdropEl.classList.remove("open");
    }
    function roadmapItemDetailsHtml(item) {
      const initiative = roadmapItems.find((candidate) => String(candidate.id) === String(item.initiative_id));
      const major = roadmapItems.find((candidate) => String(candidate.id) === String(item.major_delivery_id));
      const checkpoints = Array.isArray(item.checkpoints) ? item.checkpoints : [];
      return \`<div class="details-grid">
        \${isOwnerEmail(currentUser.email) ? \`<div class="detail-row"><div class="detail-label">عملیات</div><div class="detail-value"><button class="revoke-button" type="button" data-roadmap-archive="\${esc(item.id)}">آرشیو</button></div></div>\` : ""}
        \${detailRow("سطح", roadmapTypeLabel(item.item_type))}
        \${detailRow("عنوان", item.title || "-")}
        \${detailRow("Initiative / Outcome", initiative?.title || "-")}
        \${detailRow("Major Delivery", major?.title || "-")}
        \${detailRow("Owner", item.owner_email || "-")}
        \${detailRow("تیم", roadmapTeams.find((team) => String(team.id) === String(item.team_id))?.name || "-")}
        \${detailRow("محصول", productNameById(roadmapProducts, item.product_id) || "-")}
        \${detailRow("زیرمحصول", productNameById(roadmapProducts, item.subproduct_id) || "-")}
        \${detailRow("Target Date", roadmapDeliveryText(item))}
        \${detailRow("Status", roadmapStatusLabel(item.status))}
        \${detailRow("Risk", roadmapRiskLabel(item.risk))}
        \${detailRow("Progress", numberFmt.format(item.progress || 0) + "٪")}
        \${detailRow("ثبت‌کننده", item.created_by_email || "-")}
        \${detailRow("به‌روزرسانی‌کننده", item.updated_by_email || "-")}
        \${detailRow("آخرین به‌روزرسانی", item.updated_at_utc ? tehranDisplay(item.updated_at_utc) : "-")}
        \${detailRow("توضیحات", item.description || "-")}
        <div class="detail-row"><div class="detail-label">وابستگی‌ها</div><div class="detail-value">\${dependencyDetailsHtml(item.dependencies, roadmapProducts, roadmapTeams)}</div></div>
        <div class="detail-row"><div class="detail-label">افزودن وابستگی</div><div class="detail-value">
          <div class="roadmap-inline-form" data-roadmap-dependency-form="\${esc(item.id)}">
            <h4>Provider Delivery → blocks → این تحویل‌دادنی</h4>
            <div class="roadmap-inline-dependency-list" data-roadmap-dependency-list>
              <div class="roadmap-dependency-row">\${roadmapDependencyRowHtml({ need_by_month: item.delivery_month, need_by_week: item.delivery_week }, false)}</div>
            </div>
            <div class="roadmap-inline-actions">
              <button class="secondary-button" type="button" data-roadmap-dependency-add-row="\${esc(item.id)}">+ وابستگی</button>
              <button class="details-button" type="button" data-roadmap-dependency-save="\${esc(item.id)}">ذخیره وابستگی</button>
              <span class="roadmap-inline-message" data-roadmap-dependency-message></span>
            </div>
          </div>
        </div></div>
        <div class="detail-row"><div class="detail-label">Checkpointها</div><div class="detail-value">\${checkpoints.length ? checkpoints.map((checkpoint) => esc(checkpoint.title || "-") + " · " + esc(roadmapSlotText(checkpoint.expected_month, checkpoint.expected_week) || checkpoint.expected_date || "-") + " · " + esc(roadmapStatusLabel(checkpoint.status))).join("<br>") : '<span class="thread-muted">چک‌پوینتی ثبت نشده است.</span>'}</div></div>
      </div>\`;
    }
    function roadmapDependencyDetailsHtml(dep, parentItem) {
      const provider = roadmapItems.find((item) => String(item.id) === String(dep.provider_roadmap_id || dep.roadmap_id));
      const consumer = roadmapItems.find((item) => String(item.id) === String(dep.consumer_roadmap_id || parentItem?.id));
      const health = dependencyHealth(dep);
      return \`<div class="details-grid">
        \${detailRow("عنوان وابستگی", dep.title || "-")}
        \${detailRow("Provider", provider?.title || dep.title || "-")}
        \${detailRow("Consumer", consumer?.title || parentItem?.title || "-")}
        \${detailRow("Need-by", dependencyNeedByText(dep))}
        \${detailRow("Expected", dependencyResolutionText(dep))}
        \${detailRow("Dependency Health", health.label)}
        \${detailRow("Chain", roadmapChainFor(provider || dep, consumer || parentItem, roadmapItems))}
        \${detailRow("محصول", productNameById(roadmapProducts, dep.product_id) || "-")}
        \${detailRow("زیرمحصول", productNameById(roadmapProducts, dep.subproduct_id) || "-")}
        \${detailRow("تیم", roadmapTeams.find((team) => String(team.id) === String(dep.team_id))?.name || "-")}
        \${detailRow("شرح", dep.description || "-")}
      </div>\`;
    }
    function renderRoadmapDependencyRows(items, products, teams) {
      const dependencyRows = items.flatMap((item) => (item.dependencies || []).map((dep) => ({ parent: item, dep })));
      roadmapDependencyRowsEl.innerHTML = dependencyRows.map(({ parent, dep }, index) => {
        const key = "roadmap-dependency-" + index;
        detailByKey.set(key, roadmapDependencyDetailsHtml(dep, parent));
        const provider = items.find((item) => String(item.id) === String(dep.provider_roadmap_id || dep.roadmap_id)) || dep;
        const consumer = items.find((item) => String(item.id) === String(dep.consumer_roadmap_id || parent.id)) || parent;
        const health = dependencyHealth(dep);
        return \`<tr>
          <td class="roadmap-title-cell" data-label="وابستگی">\${esc(dep.title || "-")}</td>
          <td class="roadmap-title-cell" data-label="Provider">\${esc(provider.title || "-")}</td>
          <td class="roadmap-title-cell" data-label="Consumer">\${esc(consumer.title || "-")}</td>
          <td data-label="Need-by">\${esc(dependencyNeedByText(dep))}</td>
          <td data-label="Expected">\${esc(dependencyResolutionText(dep))}</td>
          <td data-label="Health"><span class="roadmap-health \${esc(health.key)}">\${esc(health.label)}</span></td>
          <td class="roadmap-chain" data-label="Chain">\${esc(roadmapChainFor(provider, consumer, items))}</td>
          <td data-label="عملیات"><button class="details-button" type="button" data-detail-key="\${esc(key)}">جزئیات</button></td>
        </tr>\`;
      }).join("") || '<tr><td colspan="8" class="empty">وابستگی مستقلی برای تحویل‌دادنی‌ها ثبت نشده است</td></tr>';
    }
    function renderRoadmapRows(items, products, teams) {
      roadmapProducts = products;
      roadmapTeams = teams;
      roadmapItems = items;
      syncRoadmapHierarchyOptions();
      roadmapProductEl.innerHTML = roadmapProductOptions(products, roadmapProductEl.value);
      syncRoadmapSubproductOptions();
      refreshRoadmapTimelines();
      renderRoadmapExecutiveDashboard(items, products, teams);
      detailByKey.clear();
      roadmapRowsEl.innerHTML = items.map((item, index) => {
        const key = "roadmap-" + index;
        const initiative = items.find((candidate) => String(candidate.id) === String(item.initiative_id));
        const major = items.find((candidate) => String(candidate.id) === String(item.major_delivery_id));
        const teamName = teams.find((team) => String(team.id) === String(item.team_id))?.name || "";
        detailByKey.set(key, roadmapItemDetailsHtml(item));
        return \`<tr>
          <td class="roadmap-title-cell" data-label="تحویل‌دادنی">\${initiative ? '<span class="thread-muted">Initiative: ' + esc(initiative.title || "-") + '</span><br>' : ""}\${major ? '<span class="thread-muted">Major: ' + esc(major.title || "-") + '</span><br>' : ""}\${esc(item.title || "-")}</td>
          <td data-label="سطح">\${esc(roadmapTypeLabel(item.item_type))}</td>
          <td class="full-cell" data-label="مدیر محصول">\${esc(item.owner_email || "-")}</td>
          <td data-label="محصول">\${esc(productNameById(products, item.product_id) || "-")}</td>
          <td data-label="تیم">\${esc(teamName || "-")}</td>
          <td data-label="زمان تحویل">\${esc(roadmapDeliveryText(item))}</td>
          <td data-label="وضعیت">\${esc(roadmapStatusLabel(item.status))}<br><span class="thread-muted">Risk: \${esc(roadmapRiskLabel(item.risk))}</span></td>
          <td data-label="Progress">\${roadmapProgressHtml(item.progress)}</td>
          <td data-label="عملیات">
            <button class="details-button" type="button" data-detail-key="\${esc(key)}">جزئیات</button>
            \${isOwnerEmail(currentUser.email) ? \`<button class="revoke-button" type="button" data-roadmap-archive="\${esc(item.id)}">آرشیو</button>\` : ""}
          </td>
        </tr>\`;
      }).join("") || '<tr><td colspan="9" class="empty">هنوز تحویل‌دادنی در نقشه راه ثبت نشده است</td></tr>';
      renderRoadmapDependencyRows(items, products, teams);
    }
    async function loadRoadmap() {
      const token = showLoading("در حال دریافت نقشه راه...");
      try {
        const res = await fetch("/api/roadmap");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.items) || !Array.isArray(data.products) || !Array.isArray(data.teams)) {
          roadmapRowsEl.innerHTML = "";
          roadmapDependencyRowsEl.innerHTML = "";
          roadmapMessageEl.textContent = data.detail || data.error || "خطا در دریافت نقشه راه";
          setStatus(token, data.detail || data.error || "خطا در دریافت نقشه راه");
          return;
        }
        renderRoadmapRows(data.items, data.products, data.teams);
        roadmapMessageEl.textContent = "";
        setStatus(token, data.items.length + " تحویل‌دادنی");
      } catch (error) {
        roadmapRowsEl.innerHTML = "";
        roadmapDependencyRowsEl.innerHTML = "";
        roadmapMessageEl.textContent = "خطا در دریافت نقشه راه";
        setStatus(token, "خطا در دریافت نقشه راه");
      }
    }
    function addRoadmapDependencyRow(value = {}) {
      const row = document.createElement("div");
      row.className = "roadmap-dependency-row";
      row.innerHTML = roadmapDependencyRowHtml(value, true);
      roadmapDependencyListEl.appendChild(row);
    }
    function collectRoadmapDependencies() {
      return collectRoadmapDependenciesFrom(roadmapDependencyListEl);
    }
    function addRoadmapCheckpointRow(value = {}) {
      const row = document.createElement("div");
      row.className = "roadmap-checkpoint-row";
      row.innerHTML = \`
        <input data-checkpoint-title type="text" maxlength="180" placeholder="عنوان Checkpoint" value="\${esc(value.title || "")}" />
        <select data-checkpoint-month>\${roadmapDeliveryMonthOptions(value.expected_month)}</select>
        <select data-checkpoint-week>\${roadmapDeliveryWeekOptions(value.expected_week)}</select>
        <select data-checkpoint-status>
          \${["not_started", "on_track", "at_risk", "blocked", "delivered"].map((status) => \`<option value="\${status}" \${String(value.status || "not_started") === status ? "selected" : ""}>\${esc(roadmapStatusLabel(status))}</option>\`).join("")}
        </select>
        <button class="roadmap-dependency-remove" type="button" aria-label="حذف چک‌پوینت">×</button>
      \`;
      roadmapCheckpointListEl.appendChild(row);
    }
    function collectRoadmapCheckpoints() {
      return [...roadmapCheckpointListEl.querySelectorAll(".roadmap-checkpoint-row")].map((row) => ({
        title: row.querySelector("[data-checkpoint-title]")?.value.trim() || "",
        expected_month: row.querySelector("[data-checkpoint-month]")?.value || "",
        expected_week: row.querySelector("[data-checkpoint-week]")?.value || "",
        status: row.querySelector("[data-checkpoint-status]")?.value || "not_started",
      })).filter((checkpoint) => checkpoint.title || checkpoint.expected_month || checkpoint.expected_week);
    }
    function userGroupMemberOptions(group, users) {
      const memberSet = new Set(Array.isArray(group.member_emails) ? group.member_emails.map((email) => String(email).toLowerCase()) : []);
      return users.map((user) => {
        const email = String(user.email || "").toLowerCase();
        const label = [user.email, user.telegram_username ? user.telegram_username : ""].filter(Boolean).join(" · ");
        return \`<label class="user-group-member">
          <input type="checkbox" data-user-group-member="\${esc(email)}" \${memberSet.has(email) ? "checked" : ""} />
          <span>\${esc(label || email)}</span>
        </label>\`;
      }).join("") || '<div class="thread-muted">کاربری برای انتخاب وجود ندارد.</div>';
    }
    function userGroupProductOptions(group, products) {
      const productSet = new Set(Array.isArray(group.product_ids) ? group.product_ids.map((id) => String(id)) : []);
      return products.map((product) => {
        const id = String(product.id || "");
        const parentPrefix = product.parent_id ? "زیرمحصول: " : "";
        const label = parentPrefix + [product.name, product.product_key ? product.product_key : ""].filter(Boolean).join(" · ");
        return \`<label class="user-group-member">
          <input type="checkbox" data-user-group-product="\${esc(id)}" \${productSet.has(id) ? "checked" : ""} />
          <span>\${esc(label || id)}</span>
        </label>\`;
      }).join("") || '<div class="thread-muted">محصولی برای انتخاب وجود ندارد.</div>';
    }
    const userGroupTypeLabels = {
      squad: "Squad",
      gtm: "GTM",
      content: "Content",
      marketing: "Marketing",
      sales: "Sales",
      account: "Account",
      commercial: "Commercial",
      product_design: "Product Design",
      product_management: "Product Management",
      product_operations: "Product Operations",
      engineering: "Engineering",
    };
    const userGroupModeLabels = {
      functional: "Functional",
      cross_functional: "Cross-Functional",
    };
    function userGroupTypeLabel(value) {
      return userGroupTypeLabels[String(value || "squad").toLowerCase()] || userGroupTypeLabels.squad;
    }
    function userGroupModeLabel(value) {
      return userGroupModeLabels[String(value || "functional").toLowerCase()] || userGroupModeLabels.functional;
    }
    function optionsFromLabels(labels, selected) {
      const value = String(selected || "").toLowerCase();
      return Object.entries(labels).map(([key, label]) => \`<option value="\${esc(key)}" \${key === value ? "selected" : ""}>\${esc(label)}</option>\`).join("");
    }
    function userGroupTypeOptions(selected) {
      const value = String(selected || "squad").toLowerCase();
      return optionsFromLabels(userGroupTypeLabels, userGroupTypeLabels[value] ? value : "squad");
    }
    function userGroupModeOptions(selected) {
      const value = String(selected || "functional").toLowerCase();
      return optionsFromLabels(userGroupModeLabels, userGroupModeLabels[value] ? value : "functional");
    }
    function renderUserGroups(groups, users, products) {
      userGroupListEl.innerHTML = groups.map((group) => \`<section class="user-group-card" data-user-group-id="\${esc(group.id)}">
        <div class="user-group-head">
          <input data-user-group-name value="\${esc(group.name || "")}" maxlength="120" aria-label="نام گروه" />
          <select data-user-group-type aria-label="نوع گروه">\${userGroupTypeOptions(group.group_type)}</select>
          <select data-user-group-mode aria-label="ساختار گروه">\${userGroupModeOptions(group.group_mode)}</select>
          <input data-user-group-description value="\${esc(group.description || "")}" maxlength="500" aria-label="توضیح گروه" />
          <button class="secondary-button" type="button" data-user-group-save>ذخیره</button>
          <button class="revoke-button" type="button" data-user-group-delete>حذف</button>
        </div>
        <div class="user-group-block-title">کاربران گروه</div>
        <div class="user-group-members">
          \${userGroupMemberOptions(group, users)}
        </div>
        <div class="user-group-block-title">محصول‌های مرتبط</div>
        <div class="user-group-members">
          \${userGroupProductOptions(group, products)}
        </div>
        <div class="thread-muted">\${esc(userGroupTypeLabel(group.group_type))} · \${esc(userGroupModeLabel(group.group_mode))} · \${esc((group.member_emails || []).length)} عضو · \${esc((group.product_ids || []).length)} محصول</div>
      </section>\`).join("") || '<div class="empty">هنوز گروهی ساخته نشده است.</div>';
    }
    async function loadUserGroups() {
      const token = showLoading("در حال دریافت گروه‌بندی کاربران...");
      try {
        const res = await fetch("/api/user-groups");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.groups) || !Array.isArray(data.users) || !Array.isArray(data.products)) {
          userGroupListEl.innerHTML = "";
          userGroupsMessageEl.textContent = data.detail || data.error || "خطا در دریافت گروه‌بندی کاربران";
          setStatus(token, data.detail || data.error || "خطا در دریافت گروه‌بندی کاربران");
          return;
        }
        renderUserGroups(data.groups, data.users, data.products);
        userGroupsMessageEl.textContent = "";
        setStatus(token, data.groups.length + " گروه کاربری");
      } catch (error) {
        userGroupListEl.innerHTML = "";
        userGroupsMessageEl.textContent = "خطا در دریافت گروه‌بندی کاربران";
        setStatus(token, "خطا در دریافت گروه‌بندی کاربران");
      }
    }
    function productParentOptions(products, selectedId, currentId = "") {
      const selected = String(selectedId || "");
      const current = String(currentId || "");
      return '<option value=""' + (!selected ? " selected" : "") + '>محصول اصلی</option>'
        + products
          .filter((product) => String(product.id) !== current && !product.parent_id)
          .map((product) => \`<option value="\${esc(product.id)}" \${String(product.id) === selected ? "selected" : ""}>\${esc(product.name || product.product_key || product.id)}</option>\`)
          .join("");
    }
    function productManagerOptions(users, selectedEmail) {
      const selected = String(selectedEmail || "").toLowerCase();
      return '<option value=""' + (!selected ? " selected" : "") + '>بدون مدیر محصول</option>'
        + users.map((user) => {
          const email = String(user.email || "").toLowerCase();
          const label = [user.telegram_username || "", user.email || ""].filter(Boolean).join(" · ") || email;
          return \`<option value="\${esc(email)}" \${email === selected ? "selected" : ""}>\${esc(label)}</option>\`;
        }).join("");
    }
    function refreshProductParentOptions(products) {
      productParentEl.innerHTML = productParentOptions(products, productParentEl.value);
    }
    function refreshProductManagerOptions(users) {
      productOwnerEl.innerHTML = productManagerOptions(users, productOwnerEl.value);
    }
    function orderedProducts(products) {
      const childrenByParent = new Map();
      products.forEach((product) => {
        const key = String(product.parent_id || "");
        if (!childrenByParent.has(key)) childrenByParent.set(key, []);
        childrenByParent.get(key).push(product);
      });
      const result = [];
      (childrenByParent.get("") || []).forEach((parent) => {
        result.push({ product: parent, level: 0 });
        (childrenByParent.get(String(parent.id)) || []).forEach((child) => result.push({ product: child, level: 1, parent }));
      });
      products.filter((product) => product.parent_id && !products.some((item) => String(item.id) === String(product.parent_id)))
        .forEach((product) => result.push({ product, level: 0 }));
      return result;
    }
    function renderProducts(products, users) {
      refreshProductParentOptions(products);
      refreshProductManagerOptions(users);
      productListEl.innerHTML = orderedProducts(products).map(({ product, level, parent }) => \`<section class="product-card \${level ? "is-child" : ""}" data-product-id="\${esc(product.id)}">
        <div class="product-head">
          <input data-product-name value="\${esc(product.name || "")}" maxlength="140" aria-label="نام محصول" />
          <input data-product-key value="\${esc(product.product_key || "")}" maxlength="80" aria-label="کلید محصول" dir="ltr" />
          <select data-product-parent aria-label="محصول مادر">\${productParentOptions(products, product.parent_id, product.id)}</select>
          <select data-product-owner aria-label="مدیر محصول">\${productManagerOptions(users, product.owner_email)}</select>
          <input data-product-description value="\${esc(product.description || "")}" maxlength="600" aria-label="توضیح محصول" />
          <select data-product-status aria-label="وضعیت محصول">
            <option value="active" \${product.is_active ? "selected" : ""}>فعال</option>
            <option value="inactive" \${!product.is_active ? "selected" : ""}>غیرفعال</option>
          </select>
          <button class="secondary-button" type="button" data-product-save>ذخیره</button>
          <button class="revoke-button" type="button" data-product-delete>حذف</button>
        </div>
        <div class="product-meta">
          <span>\${level ? "زیرمحصول " + esc(parent?.name || "") : "محصول اصلی"}</span>
          <span>کلید: \${esc(product.product_key || "-")}</span>
          <span>مدیر محصول: \${esc(product.owner_email || "-")}</span>
          <span>\${product.is_active ? "فعال" : "غیرفعال"}</span>
        </div>
      </section>\`).join("") || '<div class="empty">هنوز محصولی ساخته نشده است.</div>';
    }
    async function loadProducts() {
      const token = showLoading("در حال دریافت محصول‌ها...");
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.products) || !Array.isArray(data.users)) {
          productListEl.innerHTML = "";
          productsMessageEl.textContent = data.detail || data.error || "خطا در دریافت محصول‌ها";
          setStatus(token, data.detail || data.error || "خطا در دریافت محصول‌ها");
          return;
        }
        renderProducts(data.products, data.users);
        productsMessageEl.textContent = "";
        setStatus(token, data.products.length + " محصول");
      } catch (error) {
        productListEl.innerHTML = "";
        productsMessageEl.textContent = "خطا در دریافت محصول‌ها";
        setStatus(token, "خطا در دریافت محصول‌ها");
      }
    }
    async function loadThreads() {
      updateFilterButtons();
      const token = showLoading("در حال دریافت تردها...");
      try {
        const threadUuid = threadUuidFromPath();
        let requestedThreadUuid = threadUuid;
        if (!threadUuid) await loadThreadFilterOptions();
        const params = new URLSearchParams();
        params.set("view", "threads");
        if (threadUuid) {
          params.set("thread_uuid", threadUuid);
        } else {
          const uuidRaw = threadUuidEl.value.trim();
          const uuidFilter = normalizeThreadUuidInput(uuidRaw);
          if (uuidRaw && !uuidFilter) {
            threadRowsEl.innerHTML = "";
            setStatus(token, "UUID نامعتبر است");
            return;
          }
          if (uuidFilter) {
            requestedThreadUuid = uuidFilter;
            params.set("thread_uuid", uuidFilter);
          } else {
            if (normalizeHashtagInput(threadHashtagEl.value)) params.set("hashtag", normalizeHashtagInput(threadHashtagEl.value));
            appendFilterValues(params, "platform", selectedPlatformValues(threadPlatformFilter));
            appendFilterValues(params, "label", threadLabelFilter.values());
            appendFilterValues(params, "group", threadGroupFilter.values());
            appendFilterValues(params, "topic", threadTopicFilter.values());
            const jalaliDate = selectedThreadJalaliDate();
            if (jalaliDate) params.set("jalali_date", jalaliDate);
          }
        }
        const res = await fetch("/api/messages?" + params);
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.messages)) {
          threadRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت تردها");
          return;
        }
        fullTextByKey.clear();
        detailByKey.clear();
        data.messages.forEach((row, index) => detailByKey.set("thread-detail-" + index, detailHtml(row)));
        const indexByRow = new Map(data.messages.map((row, index) => [row, index]));
        const threads = buildThreads(data.messages);
        const visibleThreads = requestedThreadUuid ? threads.filter((thread) => threadContainsUuid(thread, requestedThreadUuid)) : threads;
        if (requestedThreadUuid) visibleThreads.forEach((thread) => expandedThreadKeys.add(thread.uuid));
        threadRowsEl.innerHTML = visibleThreads.length ? visibleThreads.map((thread) => {
          const rootIndex = indexByRow.get(thread.root) ?? "missing-" + thread.root.message_id;
          return \`<section class="thread-card">
            \${threadNode(thread.root, "thread-root", rootIndex, { showDetails: Boolean(threadUuid), threadUuid: thread.uuid })}
            <div class="thread-replies">
              \${threadRepliesHtml(thread, indexByRow, { showDetails: Boolean(threadUuid) })}
            </div>
          </section>\`;
        }).join("") : '<div class="empty">ترد موردنظر پیدا نشد یا به آن دسترسی ندارید.</div>';
        setStatus(token, visibleThreads.length + " ترد");
      } catch (error) {
        setStatus(token, "خطا در دریافت تردها");
      }
    }
    function showPage(page, options = {}) {
      if (page !== "profile" && !canOpen(page)) return;
      currentPage = page;
      const nextPath = options.path || pagePath(page);
      if (window.location.pathname !== nextPath) {
        if (options.replace) window.history.replaceState({ page }, "", nextPath);
        else window.history.pushState({ page }, "", nextPath);
      } else if (options.replace) {
        window.history.replaceState({ page }, "", nextPath);
      }
      const isDashboard = page === "dashboard";
      const isAnalytics = page === "analytics";
      const isGroups = page === "groups";
      const isSenders = page === "senders";
      const isThreads = page === "threads";
      const isRoadmap = page === "roadmap";
      const isRoadmapPath = page === "roadmap-path";
      const isProducts = page === "products";
      const isUserGroups = page === "user-groups";
      const isBroadcast = page === "broadcast";
      const isBots = page === "bots";
      const isAccess = page === "access";
      const isProfile = page === "profile";
      dashboardPageEl.hidden = !isDashboard;
      analyticsPageEl.hidden = !isAnalytics;
      messagesPageEl.hidden = isDashboard || isAnalytics || isGroups || isSenders || isThreads || isRoadmap || isRoadmapPath || isProducts || isUserGroups || isBroadcast || isBots || isAccess || isProfile;
      groupsPageEl.hidden = !isGroups;
      sendersPageEl.hidden = !isSenders;
      threadsPageEl.hidden = !isThreads;
      roadmapPageEl.hidden = !isRoadmap;
      roadmapPathPageEl.hidden = !isRoadmapPath;
      productsPageEl.hidden = !isProducts;
      userGroupsPageEl.hidden = !isUserGroups;
      broadcastPageEl.hidden = !isBroadcast;
      botsPageEl.hidden = !isBots;
      accessPageEl.hidden = !isAccess;
      profilePageEl.hidden = !isProfile;
      dashboardNavEl.classList.toggle("active", isDashboard);
      analyticsNavEl.classList.toggle("active", isAnalytics);
      messagesNavEl.classList.toggle("active", !isDashboard && !isAnalytics && !isGroups && !isSenders && !isThreads && !isRoadmap && !isRoadmapPath && !isProducts && !isUserGroups && !isBroadcast && !isBots && !isAccess && !isProfile);
      groupsNavEl.classList.toggle("active", isGroups);
      sendersNavEl.classList.toggle("active", isSenders);
      threadsNavEl.classList.toggle("active", isThreads);
      roadmapNavEl.classList.toggle("active", isRoadmap);
      roadmapPathNavEl.classList.toggle("active", isRoadmapPath);
      productsNavEl.classList.toggle("active", isProducts);
      userGroupsNavEl.classList.toggle("active", isUserGroups);
      broadcastNavEl.classList.toggle("active", isBroadcast);
      botsNavEl.classList.toggle("active", isBots);
      accessNavEl.classList.toggle("active", isAccess);
      syncNavGroupActive(page);
      if (pageTitleEl) pageTitleEl.textContent = pageTitles[page] || "دیدپذیری";
      if (isDashboard) loadDashboard();
      else if (isAnalytics) loadAnalytics();
      else if (isGroups) loadGroups();
      else if (isSenders) loadSenders();
      else if (isThreads) loadThreadFilterOptions().then(loadThreads);
      else if (isRoadmap) loadRoadmap();
      else if (isRoadmapPath) loadRoadmap();
      else if (isProducts) loadProducts();
      else if (isUserGroups) loadUserGroups();
      else if (isBroadcast) loadBroadcast();
      else if (isBots) loadBots();
      else if (isAccess) showAccessSection(accessLogsSectionEl.hidden ? "users" : "logs");
      else if (isProfile) loadProfile();
      else loadThreadFilterOptions().then(load);
    }
    rowsEl.addEventListener("click", event => {
      const button = event.target.closest("[data-full-key]");
      if (button) {
        openModal(fullTextByKey.get(button.dataset.fullKey) || "");
        return;
      }
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "");
    });
    threadRowsEl.addEventListener("click", event => {
      const mediaButton = event.target.closest("[data-media-src]");
      if (mediaButton) {
        openMediaModal(mediaButton.dataset.mediaSrc, mediaButton.dataset.mediaDownload);
        return;
      }
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "");
    });
    groupRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات گروه");
    });
    senderRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات ارسال‌کننده");
    });
    botRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات بات");
    });
    roadmapRowsEl.addEventListener("click", event => {
      const archiveButton = event.target.closest("[data-roadmap-archive]");
      if (archiveButton && !archiveButton.disabled) {
        archiveRoadmapFromButton(archiveButton);
        return;
      }
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات نقشه راه");
    });
    roadmapDependencyRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات وابستگی");
    });
    roadmapProductEl.addEventListener("change", () => {
      roadmapSubproductEl.value = "";
      syncRoadmapSubproductOptions();
    });
    [roadmapTimelineProductEl, roadmapFullTimelineProductEl].filter(Boolean).forEach((select) => {
      select.addEventListener("change", () => {
        if (roadmapTimelineProductEl) roadmapTimelineProductEl.value = select.value;
        if (roadmapFullTimelineProductEl) roadmapFullTimelineProductEl.value = select.value;
        refreshRoadmapTimelines();
      });
    });
    [roadmapTimelineTeamEl, roadmapFullTimelineTeamEl].filter(Boolean).forEach((select) => {
      select.addEventListener("change", () => {
        if (roadmapTimelineTeamEl) roadmapTimelineTeamEl.value = select.value;
        if (roadmapFullTimelineTeamEl) roadmapFullTimelineTeamEl.value = select.value;
        refreshRoadmapTimelines();
      });
    });
    [roadmapFilterProductEl, roadmapFilterInitiativeEl, roadmapFilterTeamEl, roadmapFilterOwnerEl, roadmapFilterStatusEl, roadmapFilterConfidenceEl, roadmapFilterRangeEl, roadmapMatrixRowsEl, roadmapMatrixGranularityEl].filter(Boolean).forEach((control) => {
      control.addEventListener("change", () => {
        if (control === roadmapFilterRangeEl && control.value !== "all") roadmapDashboardFilter = "";
        renderRoadmapExecutiveDashboard(roadmapItems, roadmapProducts, roadmapTeams);
      });
    });
    roadmapSearchEl?.addEventListener("input", () => renderRoadmapExecutiveDashboard(roadmapItems, roadmapProducts, roadmapTeams));
    roadmapKpisEl?.addEventListener("click", event => {
      const button = event.target.closest("[data-roadmap-kpi]");
      if (!button) return;
      roadmapDashboardFilter = roadmapDashboardFilter === button.dataset.roadmapKpi ? "" : button.dataset.roadmapKpi;
      if (roadmapFilterRangeEl) roadmapFilterRangeEl.value = "all";
      renderRoadmapExecutiveDashboard(roadmapItems, roadmapProducts, roadmapTeams);
    });
    [roadmapMatrixEl, roadmapNext30El, roadmapRisksEl, roadmapDeliveredEl].filter(Boolean).forEach((container) => {
      container.addEventListener("click", event => {
        const button = event.target.closest("[data-roadmap-open]");
        if (button) openRoadmapDrawer(button.dataset.roadmapOpen);
      });
    });
    roadmapDrawerCloseEl.addEventListener("click", closeRoadmapDrawer);
    roadmapDrawerBackdropEl.addEventListener("click", async event => {
      if (event.target === roadmapDrawerBackdropEl) closeRoadmapDrawer();
      const archiveButton = event.target.closest("[data-roadmap-archive]");
      if (archiveButton && !archiveButton.disabled) {
        await archiveRoadmapFromButton(archiveButton);
        return;
      }
      const dependencyAddRowButton = event.target.closest("[data-roadmap-dependency-add-row]");
      if (dependencyAddRowButton) {
        const itemId = dependencyAddRowButton.dataset.roadmapDependencyAddRow;
        const item = roadmapItems.find((candidate) => String(candidate.id) === String(itemId));
        const list = roadmapDrawerBodyEl.querySelector('[data-roadmap-dependency-form="' + itemId + '"] [data-roadmap-dependency-list]');
        if (list) {
          list.insertAdjacentHTML("beforeend", \`<div class="roadmap-dependency-row">\${roadmapDependencyRowHtml({ need_by_month: item?.delivery_month, need_by_week: item?.delivery_week }, true)}</div>\`);
        }
        return;
      }
      const dependencyRemoveButton = event.target.closest(".roadmap-inline-form .roadmap-dependency-remove");
      if (dependencyRemoveButton) {
        dependencyRemoveButton.closest(".roadmap-dependency-row")?.remove();
        return;
      }
      const dependencySaveButton = event.target.closest("[data-roadmap-dependency-save]");
      if (dependencySaveButton && !dependencySaveButton.disabled) {
        const itemId = dependencySaveButton.dataset.roadmapDependencySave;
        const form = roadmapDrawerBodyEl.querySelector('[data-roadmap-dependency-form="' + itemId + '"]');
        const messageEl = form?.querySelector("[data-roadmap-dependency-message]");
        const dependencies = form ? collectRoadmapDependenciesFrom(form) : [];
        if (!dependencies.length) {
          if (messageEl) messageEl.textContent = "وابستگی را تکمیل کنید.";
          return;
        }
        dependencySaveButton.disabled = true;
        if (messageEl) messageEl.textContent = "در حال ذخیره...";
        try {
          const res = await fetch("/api/roadmap", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: itemId, dependencies }),
          });
          const data = await res.json();
          if (!res.ok) {
            if (messageEl) messageEl.textContent = data.error || data.detail || "ذخیره وابستگی انجام نشد";
            dependencySaveButton.disabled = false;
            return;
          }
          if (messageEl) messageEl.textContent = "وابستگی ذخیره شد.";
          closeRoadmapDrawer();
          await loadRoadmap();
        } catch (error) {
          if (messageEl) messageEl.textContent = "ذخیره وابستگی انجام نشد";
          dependencySaveButton.disabled = false;
        }
      }
    });
    roadmapDependencyAddEl.addEventListener("click", () => addRoadmapDependencyRow());
    roadmapCheckpointAddEl.addEventListener("click", () => addRoadmapCheckpointRow());
    roadmapDependencyListEl.addEventListener("click", event => {
      const button = event.target.closest(".roadmap-dependency-remove");
      if (button) button.closest(".roadmap-dependency-row")?.remove();
    });
    roadmapCheckpointListEl.addEventListener("click", event => {
      const button = event.target.closest(".roadmap-dependency-remove");
      if (button) button.closest(".roadmap-checkpoint-row")?.remove();
    });
    roadmapDependencyListEl.addEventListener("change", event => {
      const productSelect = event.target.closest("[data-dependency-product]");
      if (!productSelect) return;
      const row = productSelect.closest(".roadmap-dependency-row");
      const subproductSelect = row?.querySelector("[data-dependency-subproduct]");
      if (subproductSelect) subproductSelect.innerHTML = roadmapSubproductOptions(roadmapProducts, productSelect.value, "");
    });
    userGroupListEl.addEventListener("click", async event => {
      const card = event.target.closest("[data-user-group-id]");
      if (!card) return;
      const id = card.dataset.userGroupId;
      if (event.target.closest("[data-user-group-delete]")) {
        const confirmed = await openConfirmModal({
          title: "حذف گروه",
          message: "این گروه کاربری حذف شود؟ عضویت کاربران هم از همین گروه حذف می‌شود.",
          confirmText: "حذف",
          cancelText: "انصراف",
        });
        if (!confirmed) return;
        userGroupsMessageEl.textContent = "در حال حذف گروه...";
        try {
          const res = await fetch("/api/user-groups?id=" + encodeURIComponent(id), { method: "DELETE" });
          const data = await res.json();
          if (!res.ok) {
            userGroupsMessageEl.textContent = data.error || "حذف گروه انجام نشد";
            return;
          }
          userGroupsMessageEl.textContent = "گروه حذف شد.";
          await loadUserGroups();
        } catch (error) {
          userGroupsMessageEl.textContent = "حذف گروه انجام نشد";
        }
        return;
      }
      if (!event.target.closest("[data-user-group-save]")) return;
      const memberEmails = [...card.querySelectorAll("[data-user-group-member]:checked")].map((input) => input.dataset.userGroupMember);
      const productIds = [...card.querySelectorAll("[data-user-group-product]:checked")].map((input) => input.dataset.userGroupProduct);
      const name = card.querySelector("[data-user-group-name]")?.value.trim() || "";
      const groupType = card.querySelector("[data-user-group-type]")?.value || "squad";
      const groupMode = card.querySelector("[data-user-group-mode]")?.value || "functional";
      const description = card.querySelector("[data-user-group-description]")?.value.trim() || "";
      userGroupsMessageEl.textContent = "در حال ذخیره گروه...";
      try {
        const res = await fetch("/api/user-groups", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, name, group_type: groupType, group_mode: groupMode, description, member_emails: memberEmails, product_ids: productIds }),
        });
        const data = await res.json();
        if (!res.ok) {
          userGroupsMessageEl.textContent = data.error || "ذخیره گروه انجام نشد";
          return;
        }
        userGroupsMessageEl.textContent = "گروه ذخیره شد.";
        await loadUserGroups();
      } catch (error) {
        userGroupsMessageEl.textContent = "ذخیره گروه انجام نشد";
      }
    });
    productListEl.addEventListener("click", async event => {
      const card = event.target.closest("[data-product-id]");
      if (!card) return;
      const id = card.dataset.productId;
      if (event.target.closest("[data-product-delete]")) {
        const confirmed = await openConfirmModal({
          title: "حذف محصول",
          message: "این محصول حذف شود؟",
          confirmText: "حذف",
          cancelText: "انصراف",
        });
        if (!confirmed) return;
        productsMessageEl.textContent = "در حال حذف محصول...";
        try {
          const res = await fetch("/api/products?id=" + encodeURIComponent(id), { method: "DELETE" });
          const data = await res.json();
          if (!res.ok) {
            productsMessageEl.textContent = data.error || "حذف محصول انجام نشد";
            return;
          }
          productsMessageEl.textContent = "محصول حذف شد.";
          await loadProducts();
        } catch (error) {
          productsMessageEl.textContent = "حذف محصول انجام نشد";
        }
        return;
      }
      if (!event.target.closest("[data-product-save]")) return;
      const payload = {
        id,
        name: card.querySelector("[data-product-name]")?.value.trim() || "",
        product_key: card.querySelector("[data-product-key]")?.value.trim() || "",
        parent_id: card.querySelector("[data-product-parent]")?.value || null,
        owner_email: card.querySelector("[data-product-owner]")?.value.trim() || "",
        description: card.querySelector("[data-product-description]")?.value.trim() || "",
        is_active: card.querySelector("[data-product-status]")?.value !== "inactive",
      };
      productsMessageEl.textContent = "در حال ذخیره محصول...";
      try {
        const res = await fetch("/api/products", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          productsMessageEl.textContent = data.error || "ذخیره محصول انجام نشد";
          return;
        }
        productsMessageEl.textContent = "محصول ذخیره شد.";
        await loadProducts();
      } catch (error) {
        productsMessageEl.textContent = "ذخیره محصول انجام نشد";
      }
    });
    broadcastLogRowsEl.addEventListener("click", event => {
      const fullButton = event.target.closest("[data-full-key]");
      if (fullButton) {
        openModal(fullTextByKey.get(fullButton.dataset.fullKey) || "");
        return;
      }
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات اطلاع‌رسانی");
    });
    broadcastLogRefreshEl.addEventListener("click", () => loadBroadcastLogs(true));
    async function archiveRoadmapFromButton(archiveButton) {
      if (!archiveButton || archiveButton.disabled) return;
      const id = archiveButton.dataset.roadmapArchive;
      const confirmed = await openConfirmModal({
        title: "آرشیو تحویل‌دادنی",
        message: "این مورد از نقشه‌راه آرشیو شود؟",
        confirmText: "آرشیو",
        cancelText: "انصراف",
      });
      if (!confirmed) return;
      archiveButton.disabled = true;
      roadmapMessageEl.textContent = "در حال آرشیو...";
      try {
        const res = await fetch("/api/roadmap?id=" + encodeURIComponent(id), { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) {
          roadmapMessageEl.textContent = data.error || "آرشیو نقشه راه انجام نشد";
          archiveButton.disabled = false;
          return;
        }
        roadmapMessageEl.textContent = "مورد نقشه‌راه آرشیو شد.";
        closeModal();
        await loadRoadmap();
      } catch (error) {
        roadmapMessageEl.textContent = "آرشیو نقشه راه انجام نشد";
        archiveButton.disabled = false;
      }
    }
    botTokenToggleEl.addEventListener("click", () => {
      botTokenEl.type = botTokenEl.type === "password" ? "text" : "password";
    });
    broadcastLabelsEl.addEventListener("change", (event) => {
      const input = event.target.closest("input[data-broadcast-label]");
      if (!input) return;
      broadcastGroupsEl.querySelectorAll('input[data-broadcast-group-label="' + input.dataset.broadcastLabel + '"]').forEach((groupInput) => {
        groupInput.checked = input.checked;
      });
      updateBroadcastSelectedCount();
    });
    broadcastGroupsEl.addEventListener("change", (event) => {
      if (event.target.closest("input[data-broadcast-group]")) updateBroadcastSelectedCount();
    });
    broadcastFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const groups = selectedBroadcastGroups();
      const body = broadcastBodyEl.value.trim();
      if (!groups.length) {
        broadcastResultEl.textContent = "حداقل یک گروه را انتخاب کنید.";
        return;
      }
      if (!body) {
        broadcastResultEl.textContent = "متن اطلاع‌رسانی را وارد کنید.";
        return;
      }
      const confirmed = await openBroadcastConfirmModal({ body, groups });
      if (!confirmed?.ok) return;
      const data = confirmed.data || {};
      broadcastResultEl.textContent = broadcastResultText(data);
      if (!data.failed) {
        broadcastBodyEl.value = "";
      }
      loadBroadcastLogs(false);
      setTimeout(() => loadBroadcast(), 800);
    });
    botFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      botMessageEl.textContent = "در حال تست و ثبت بات...";
      const payload = {
        platform: botPlatformFilter.value() || "telegram",
        bot_name: botNameEl.value.trim(),
        bot_username: botUsernameEl.value.trim(),
        token: botTokenEl.value.trim(),
      };
      try {
        const res = await fetch("/api/bots", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          botMessageEl.textContent = data.detail || data.error || "ثبت بات انجام نشد";
          return;
        }
        botMessageEl.textContent = "بات ثبت شد و webhook آن تنظیم شد.";
        botTokenEl.value = "";
        botNameEl.value = "";
        botUsernameEl.value = "";
        await loadBots();
      } catch (error) {
        botMessageEl.textContent = "ثبت بات انجام نشد";
      }
    });
    roadmapFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      roadmapMessageEl.textContent = "در حال ثبت تحویل‌دادنی...";
      const payload = {
        item_type: roadmapItemTypeEl.value || "delivery",
        title: roadmapTitleEl.value.trim(),
        initiative_id: roadmapInitiativeEl.value || null,
        major_delivery_id: roadmapMajorEl.value || null,
        product_id: roadmapProductEl.value || null,
        subproduct_id: roadmapSubproductEl.value || null,
        team_id: roadmapTeamEl.value || null,
        status: roadmapStatusEl.value || "not_started",
        risk: roadmapRiskEl.value || "medium",
        progress: roadmapProgressEl.value || 0,
        delivery_month: roadmapDeliveryMonthEl.value,
        delivery_week: roadmapDeliveryWeekEl.value,
        description: roadmapDescriptionEl.value.trim(),
        dependencies: collectRoadmapDependencies(),
        checkpoints: collectRoadmapCheckpoints(),
      };
      try {
        const res = await fetch("/api/roadmap", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          roadmapMessageEl.textContent = data.error || "ثبت تحویل‌دادنی انجام نشد";
          return;
        }
        roadmapMessageEl.textContent = "تحویل‌دادنی در نقشه راه ثبت شد.";
        roadmapItemTypeEl.value = "delivery";
        roadmapTitleEl.value = "";
        roadmapInitiativeEl.value = "";
        roadmapMajorEl.value = "";
        roadmapProductEl.value = "";
        roadmapSubproductEl.value = "";
        roadmapTeamEl.value = "";
        roadmapStatusEl.value = "not_started";
        roadmapRiskEl.value = "medium";
        roadmapProgressEl.value = "0";
        roadmapDeliveryMonthEl.value = "";
        roadmapDeliveryWeekEl.value = "";
        roadmapDescriptionEl.value = "";
        roadmapDependencyListEl.innerHTML = "";
        roadmapCheckpointListEl.innerHTML = "";
        syncRoadmapSubproductOptions();
        await loadRoadmap();
      } catch (error) {
        roadmapMessageEl.textContent = "ثبت تحویل‌دادنی انجام نشد";
      }
    });
    userGroupFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      userGroupsMessageEl.textContent = "در حال ساخت گروه...";
      try {
        const res = await fetch("/api/user-groups", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: userGroupNameEl.value.trim(),
            group_type: userGroupTypeEl.value,
            group_mode: userGroupModeEl.value,
            description: userGroupDescriptionEl.value.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          userGroupsMessageEl.textContent = data.error || "ساخت گروه انجام نشد";
          return;
        }
        userGroupsMessageEl.textContent = "گروه ساخته شد.";
        userGroupNameEl.value = "";
        userGroupTypeEl.value = "squad";
        userGroupModeEl.value = "functional";
        userGroupDescriptionEl.value = "";
        await loadUserGroups();
      } catch (error) {
        userGroupsMessageEl.textContent = "ساخت گروه انجام نشد";
      }
    });
    productFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      productsMessageEl.textContent = "در حال ساخت محصول...";
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: productNameEl.value.trim(),
            product_key: productKeyEl.value.trim(),
            parent_id: productParentEl.value || null,
            owner_email: productOwnerEl.value.trim(),
            description: productDescriptionEl.value.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          productsMessageEl.textContent = data.error || "ساخت محصول انجام نشد";
          return;
        }
        productsMessageEl.textContent = "محصول ساخته شد.";
        productNameEl.value = "";
        productKeyEl.value = "";
        productParentEl.value = "";
        productOwnerEl.value = "";
        productDescriptionEl.value = "";
        await loadProducts();
      } catch (error) {
        productsMessageEl.textContent = "ساخت محصول انجام نشد";
      }
    });
    accessLogRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "");
    });
    [chartLegendEl, userChartLegendEl].forEach((legendEl) => {
      legendEl.addEventListener("click", (event) => {
        const resetButton = event.target.closest("[data-chart-reset]");
        if (resetButton) {
          resetChartFilter(resetButton.dataset.chartReset);
          return;
        }
        const itemButton = event.target.closest("[data-chart-kind][data-chart-item]");
        if (!itemButton) return;
        toggleChartItem(itemButton.dataset.chartKind, itemButton.dataset.chartItem);
      });
    });
    modalCloseEl.addEventListener("click", () => closeModal());
    modalBackdropEl.addEventListener("click", event => { if (event.target === modalBackdropEl) closeModal(); });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeModal();
        closeRoadmapDrawer();
      }
    });
    modalBodyEl.addEventListener("click", async event => {
      const archiveButton = event.target.closest("[data-roadmap-archive]");
      if (archiveButton && !archiveButton.disabled) {
        await archiveRoadmapFromButton(archiveButton);
        return;
      }
      const dependencyAddRowButton = event.target.closest("[data-roadmap-dependency-add-row]");
      if (dependencyAddRowButton) {
        const itemId = dependencyAddRowButton.dataset.roadmapDependencyAddRow;
        const item = roadmapItems.find((candidate) => String(candidate.id) === String(itemId));
        const list = modalBodyEl.querySelector('[data-roadmap-dependency-form="' + itemId + '"] [data-roadmap-dependency-list]');
        if (list) {
          list.insertAdjacentHTML("beforeend", \`<div class="roadmap-dependency-row">\${roadmapDependencyRowHtml({ need_by_month: item?.delivery_month, need_by_week: item?.delivery_week }, true)}</div>\`);
        }
        return;
      }
      const dependencyRemoveButton = event.target.closest(".roadmap-inline-form .roadmap-dependency-remove");
      if (dependencyRemoveButton) {
        dependencyRemoveButton.closest(".roadmap-dependency-row")?.remove();
        return;
      }
      const dependencySaveButton = event.target.closest("[data-roadmap-dependency-save]");
      if (dependencySaveButton && !dependencySaveButton.disabled) {
        const itemId = dependencySaveButton.dataset.roadmapDependencySave;
        const form = modalBodyEl.querySelector('[data-roadmap-dependency-form="' + itemId + '"]');
        const messageEl = form?.querySelector("[data-roadmap-dependency-message]");
        const dependencies = form ? collectRoadmapDependenciesFrom(form) : [];
        if (!dependencies.length) {
          if (messageEl) messageEl.textContent = "وابستگی را تکمیل کنید.";
          return;
        }
        dependencySaveButton.disabled = true;
        if (messageEl) messageEl.textContent = "در حال ذخیره...";
        try {
          const res = await fetch("/api/roadmap", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: itemId, dependencies }),
          });
          const data = await res.json();
          if (!res.ok) {
            if (messageEl) messageEl.textContent = data.error || data.detail || "ذخیره وابستگی انجام نشد";
            dependencySaveButton.disabled = false;
            return;
          }
          if (messageEl) messageEl.textContent = "وابستگی ذخیره شد.";
          closeModal();
          await loadRoadmap();
        } catch (error) {
          if (messageEl) messageEl.textContent = "ذخیره وابستگی انجام نشد";
          dependencySaveButton.disabled = false;
        }
        return;
      }
      const passwordToggle = event.target.closest("[data-confirm-password-toggle]");
      if (passwordToggle) {
        const input = modalBodyEl.querySelector("[data-confirm-password]");
        if (input) input.type = input.type === "password" ? "text" : "password";
        return;
      }
      const confirmButton = event.target.closest("[data-confirm-value]");
      if (!confirmButton || !pendingConfirm) return;
      if (confirmButton.dataset.confirmValue !== "ok") {
        closeModal(false);
        return;
      }
      const passwordInput = modalBodyEl.querySelector("[data-confirm-password]");
      if (passwordInput) {
        const password = passwordInput.value;
        const errorEl = modalBodyEl.querySelector("[data-confirm-error]");
        if (!password) {
          if (errorEl) errorEl.textContent = "برای تایید نهایی پسورد خود را وارد کنید.";
          passwordInput.focus();
          return;
        }
        if (pendingBroadcastConfirm) {
          confirmButton.disabled = true;
          if (errorEl) errorEl.textContent = "در حال ارسال...";
          try {
            const res = await fetch("/api/group-broadcast", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                groups: pendingBroadcastConfirm.groups,
                body: pendingBroadcastConfirm.body,
                password,
              }),
            });
            const data = await res.json();
            if (!res.ok && res.status !== 207) {
              if (errorEl) errorEl.textContent = data.error || "ارسال گروهی انجام نشد";
              confirmButton.disabled = false;
              passwordInput.focus();
              return;
            }
            closeModal({ ok: true, data });
          } catch (error) {
            if (errorEl) errorEl.textContent = "ارسال گروهی انجام نشد";
            confirmButton.disabled = false;
          }
          return;
        }
        closeModal({ ok: true, password });
        return;
      }
      closeModal(true);
    });
    modalBodyEl.addEventListener("change", event => {
      const productSelect = event.target.closest("[data-dependency-product]");
      if (!productSelect) return;
      const row = productSelect.closest(".roadmap-dependency-row");
      const subproductSelect = row?.querySelector("[data-dependency-subproduct]");
      if (subproductSelect) subproductSelect.innerHTML = roadmapSubproductOptions(roadmapProducts, productSelect.value, "");
    });
    threadRowsEl.addEventListener("click", (event) => {
      const expand = event.target.closest("[data-thread-expand]");
      if (expand) {
        expandedThreadKeys.add(expand.dataset.threadExpand || "");
        loadThreads();
        return;
      }
      const toggle = event.target.closest("[data-reply-toggle]");
      if (!toggle) return;
      const content = toggle.closest(".thread-content");
      const form = content?.querySelector("[data-thread-reply]");
      if (!form) return;
      form.hidden = !form.hidden;
      toggle.textContent = form.hidden ? "پاسخ" : "بستن پاسخ";
      if (!form.hidden) form.querySelector("[name='body']")?.focus();
    });
    threadRowsEl.addEventListener("submit", async (event) => {
      const form = event.target.closest("[data-thread-reply]");
      if (!form) return;
      event.preventDefault();
      const input = form.querySelector("[name='body']");
      const status = form.querySelector("[data-reply-status]");
      const button = form.querySelector("button[type='submit']");
      const body = String(input?.value || "").trim();
      if (!body) {
        status.textContent = "متن پاسخ را وارد کنید.";
        return;
      }
      button.disabled = true;
      status.textContent = "در حال ارسال پاسخ...";
      try {
        const res = await fetch("/api/thread-reply", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            platform: form.dataset.platform,
            chat_id: form.dataset.chatId,
            message_id: form.dataset.messageId,
            body,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          status.textContent = data.error || "ارسال پاسخ انجام نشد";
          button.disabled = false;
          return;
        }
        input.value = "";
        status.textContent = "پاسخ ارسال شد.";
        const toggle = form.closest(".thread-content")?.querySelector("[data-reply-toggle]");
        if (toggle) toggle.textContent = "پاسخ";
        form.hidden = true;
        setTimeout(() => loadThreads(), 900);
      } catch (error) {
        status.textContent = "ارسال پاسخ انجام نشد";
        button.disabled = false;
      }
    });
    refreshEl.addEventListener("click", () => {
      if (messageFiltersActive()) resetMessageFilters();
      load();
    });
    threadRefreshEl.addEventListener("click", () => {
      if (threadFiltersActive()) resetThreadFilters();
      loadThreads();
    });
    messageFilterToggleEl.addEventListener("click", () => {
      messagesPageEl.querySelector(".filters")?.classList.toggle("mobile-open");
      updateMobileFilterToggles();
      positionOpenFilterPanels();
    });
    threadFilterToggleEl.addEventListener("click", () => {
      threadsPageEl.querySelector(".filters")?.classList.toggle("mobile-open");
      updateMobileFilterToggles();
      positionOpenFilterPanels();
    });
    dashboardNavEl.addEventListener("click", () => showPage("dashboard"));
    analyticsNavEl.addEventListener("click", () => showPage("analytics"));
    messagesNavEl.addEventListener("click", () => showPage("messages"));
    roadmapNavEl.addEventListener("click", () => showPage("roadmap"));
    roadmapPathNavEl.addEventListener("click", () => showPage("roadmap-path"));
    productsNavEl.addEventListener("click", () => showPage("products"));
    userGroupsNavEl.addEventListener("click", () => showPage("user-groups"));
    groupsNavEl.addEventListener("click", () => showPage("groups"));
    sendersNavEl.addEventListener("click", () => showPage("senders"));
    threadsNavEl.addEventListener("click", () => showPage("threads"));
    broadcastNavEl.addEventListener("click", () => showPage("broadcast"));
    botsNavEl.addEventListener("click", () => showPage("bots"));
    accessNavEl.addEventListener("click", () => showPage("access"));
    userMenuButtonEl.addEventListener("click", () => userMenuEl.classList.toggle("open"));
    profileButtonEl.addEventListener("click", () => {
      userMenuEl.classList.remove("open");
      showPage("profile");
    });
    window.addEventListener("popstate", () => {
      const requestedPage = pageFromPath();
      const fallbackPage = firstAccessiblePage();
      const requestedPath = threadUuidFromPath() ? window.location.pathname : undefined;
      showPage(requestedPage === "profile" || canOpen(requestedPage) ? requestedPage : fallbackPage, { replace: true, path: requestedPath });
    });
    logoutButtonEl.addEventListener("click", async () => {
      userMenuEl.classList.remove("open");
      const confirmed = await openConfirmModal({
        title: "تایید خروج",
        message: "از حساب کاربری خارج شوید؟",
        confirmText: "خروج",
        cancelText: "انصراف",
      });
      if (confirmed) window.location.href = "/logout";
    });
    profileFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const telegramUsername = profileTelegramUsernameEl.value.trim();
      profileMessageEl.textContent = "در حال ذخیره...";
      try {
        const res = await fetch("/api/me", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ telegram_username: telegramUsername }),
        });
        const data = await res.json();
        if (!res.ok) {
          profileMessageEl.textContent = data.error || "ذخیره پروفایل انجام نشد";
          return;
        }
        currentUser.telegram_username = data.user?.telegram_username || "";
        currentUser.telegram_avatar_url = data.user?.telegram_avatar_url || "";
        syncProfileUi();
        profileMessageEl.textContent = "پروفایل ذخیره شد.";
      } catch (error) {
        profileMessageEl.textContent = error.message || "ذخیره پروفایل انجام نشد";
      }
    });
    accessUsersTabEl.addEventListener("click", () => showAccessSection("users"));
    accessGroupsTabEl.addEventListener("click", () => showAccessSection("groups"));
    accessLogsTabEl.addEventListener("click", () => showAccessSection("logs"));
    accessGroupRefreshEl.addEventListener("click", () => loadAccessGroupView());
    analyticsPageEl.addEventListener("click", (event) => {
      const card = event.target.closest("[data-analytics-detail]");
      if (!card) return;
      openAnalyticsDetail(card.dataset.analyticsDetail || "avg", card.dataset.analyticsScope || "groups");
    });
    accessUserRowsEl.addEventListener("click", (event) => {
      const row = event.target.closest("[data-access-jump-email]");
      if (!row) return;
      const email = row.dataset.accessJumpEmail || "";
      const card = accessRowsEl.querySelector(\`[data-access-card-email="\${CSS.escape(email)}"]\`);
      if (!card) return;
      accessRowsEl.querySelectorAll(".access-row.focused").forEach((item) => item.classList.remove("focused"));
      card.classList.add("focused");
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => card.classList.remove("focused"), 2200);
    });
    accessFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const permissions = selectedPermissions(accessNewPermissionsEl);
      if (!permissions.length) {
        accessMessageEl.textContent = "حداقل یک دسترسی باید انتخاب شود.";
        return;
      }
      accessMessageEl.textContent = "در حال افزودن...";
      try {
        const res = await fetch("/api/access-users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: accessEmailEl.value.trim(), permissions }),
        });
        const data = await res.json();
        if (!res.ok) {
          accessMessageEl.textContent = data.error || "افزودن کاربر انجام نشد";
          return;
        }
        accessEmailEl.value = "";
        accessNewPermissionsEl.innerHTML = permissionGridHtml([], "new");
        accessMessageEl.textContent = data.invite_email_sent
          ? "کاربر اضافه شد و ایمیل دعوت ارسال شد."
          : ("کاربر اضافه شد، اما ایمیل دعوت ارسال نشد: " + (data.invite_email_error || "خطای نامشخص"));
        loadAccessUsers();
      } catch (error) {
        accessMessageEl.textContent = "افزودن کاربر انجام نشد";
      }
    });
    accessRowsEl.addEventListener("click", async (event) => {
      const savePermissionsButton = event.target.closest("[data-save-permissions-email]");
      if (savePermissionsButton && !savePermissionsButton.disabled) {
        const email = savePermissionsButton.dataset.savePermissionsEmail;
        const card = savePermissionsButton.closest("[data-access-card-email]");
        const grid = card?.querySelector("[data-permission-email]");
        const groupGrid = card?.querySelector("[data-group-access-email]");
        if (!grid) return;
        if (grid.dataset.owner === "true" || isOwnerEmail(email)) {
          accessMessageEl.textContent = "دسترسی owner قابل تغییر نیست.";
          loadAccessUsers();
          return;
        }
        const permissions = selectedPermissions(grid);
        if (!permissions.length) {
          accessMessageEl.textContent = "حداقل یک دسترسی باید انتخاب شود.";
          return;
        }
        savePermissionsButton.disabled = true;
        savePermissionsButton.textContent = "در حال ذخیره...";
        accessMessageEl.textContent = "در حال ذخیره دسترسی‌ها...";
        try {
          const permissionsRes = await fetch("/api/access-users/permissions", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, permissions, group_access: groupGrid ? selectedGroupAccess(groupGrid) : undefined }),
          });
          const permissionsData = await permissionsRes.json();
          if (!permissionsRes.ok) {
            accessMessageEl.textContent = permissionsData.error || "ذخیره دسترسی انجام نشد";
            savePermissionsButton.textContent = "ذخیره تغییرات";
            savePermissionsButton.disabled = false;
            return;
          }
          card?.classList.remove("permissions-dirty");
          accessMessageEl.textContent = "دسترسی‌ها ذخیره شد.";
          loadAccessUsers();
        } catch (error) {
          accessMessageEl.textContent = "ذخیره دسترسی انجام نشد";
          savePermissionsButton.textContent = "ذخیره تغییرات";
          savePermissionsButton.disabled = false;
        }
        return;
      }
      const resendButton = event.target.closest("[data-resend-email]");
      if (resendButton && !resendButton.disabled) {
        const email = resendButton.dataset.resendEmail;
        resendButton.disabled = true;
        accessMessageEl.textContent = "در حال ارسال دوباره ایمیل دعوت...";
        try {
          const res = await fetch("/api/access-users/resend-invite", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (!res.ok) {
            accessMessageEl.textContent = data.error || "ارسال دوباره ایمیل انجام نشد";
            if (data.retry_after_seconds) {
              let remaining = Number(data.retry_after_seconds);
              resendButton.textContent = remaining + " ثانیه";
              const timer = setInterval(() => {
                remaining -= 1;
                if (remaining <= 0) {
                  clearInterval(timer);
                  resendButton.textContent = "ارسال دوباره دعوت";
                  resendButton.disabled = false;
                  return;
                }
                resendButton.textContent = remaining + " ثانیه";
              }, 1000);
              return;
            }
            resendButton.disabled = false;
            return;
          }
          accessMessageEl.textContent = "ایمیل دعوت دوباره ارسال شد.";
        } catch (error) {
          accessMessageEl.textContent = "ارسال دوباره ایمیل انجام نشد";
          resendButton.disabled = false;
        }
        return;
      }
      const revokeButton = event.target.closest("[data-revoke-email]");
      const reactivateButton = event.target.closest("[data-reactivate-email]");
      const button = revokeButton || reactivateButton;
      if (!button || button.disabled) return;
      const isReactivate = Boolean(reactivateButton);
      const email = isReactivate ? button.dataset.reactivateEmail : button.dataset.revokeEmail;
      const confirmed = await openConfirmModal({
        title: isReactivate ? "تایید فعال‌سازی دوباره" : "تایید لغو دسترسی",
        message: \`دسترسی <span class="confirm-target">\${esc(email)}</span> \${isReactivate ? "دوباره فعال" : "لغو"} شود؟\`,
        confirmText: isReactivate ? "فعال‌سازی دوباره" : "لغو دسترسی",
        cancelText: "انصراف",
      });
      if (!confirmed) return;
      button.disabled = true;
      accessMessageEl.textContent = isReactivate ? "در حال فعال‌سازی..." : "در حال لغو دسترسی...";
      try {
        const res = await fetch(isReactivate ? "/api/access-users/reactivate" : "/api/access-users/revoke", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          accessMessageEl.textContent = data.error || (isReactivate ? "فعال‌سازی انجام نشد" : "لغو دسترسی انجام نشد");
          button.disabled = false;
          return;
        }
        accessMessageEl.textContent = isReactivate ? "دسترسی دوباره فعال شد." : "دسترسی لغو شد.";
        loadAccessUsers();
      } catch (error) {
        accessMessageEl.textContent = isReactivate ? "فعال‌سازی انجام نشد" : "لغو دسترسی انجام نشد";
        button.disabled = false;
      }
    });
    accessRowsEl.addEventListener("change", async (event) => {
      const input = event.target.closest("input[data-permission]");
      const grid = event.target.closest("[data-permission-email]");
      const groupInput = event.target.closest("input[data-group-label], input[data-group-key]");
      const groupGrid = event.target.closest("[data-group-access-email]");
      if (groupInput && groupGrid) {
        if (groupInput.matches("input[data-group-label]")) {
          syncGroupsBySelectedLabel(groupInput, groupGrid);
        }
        const email = groupGrid.dataset.groupAccessEmail;
        if (groupGrid.dataset.owner === "true" || isOwnerEmail(email)) {
          accessMessageEl.textContent = "دسترسی owner قابل تغییر نیست.";
          loadAccessUsers();
          return;
        }
        const card = groupGrid.closest("[data-access-card-email]");
        const saveButton = card?.querySelector("[data-save-permissions-email]");
        card?.classList.add("permissions-dirty");
        if (saveButton) {
          saveButton.disabled = false;
          saveButton.textContent = "ذخیره تغییرات";
        }
        accessMessageEl.textContent = "برای ثبت تغییرات دسترسی، دکمه ذخیره تغییرات را بزنید.";
        return;
      }
      if (!input || !grid) return;
      const email = grid.dataset.permissionEmail;
      if (grid.dataset.owner === "true" || isOwnerEmail(email)) {
        accessMessageEl.textContent = "دسترسی owner قابل تغییر نیست.";
        loadAccessUsers();
        return;
      }
      const card = grid.closest("[data-access-card-email]");
      const saveButton = card?.querySelector("[data-save-permissions-email]");
      card?.classList.add("permissions-dirty");
      if (saveButton) {
        saveButton.disabled = false;
        saveButton.textContent = "ذخیره تغییرات";
      }
      accessMessageEl.textContent = "برای ثبت تغییرات دسترسی، دکمه ذخیره تغییرات را بزنید.";
    });
    searchEl.addEventListener("input", updateFilterButtons);
    searchEl.addEventListener("keydown", e => { if (e.key === "Enter") load(); });
    hashtagSearchEl.addEventListener("input", updateFilterButtons);
    hashtagSearchEl.addEventListener("keydown", e => { if (e.key === "Enter") load(); });
    let threadUuidFilterTimer = null;
    threadUuidEl.addEventListener("input", () => {
      updateFilterButtons();
      clearTimeout(threadUuidFilterTimer);
      threadUuidFilterTimer = setTimeout(() => loadThreads(), 450);
    });
    threadUuidEl.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        clearTimeout(threadUuidFilterTimer);
        loadThreads();
      }
    });
    threadHashtagEl.addEventListener("input", updateFilterButtons);
    threadHashtagEl.addEventListener("keydown", e => { if (e.key === "Enter") loadThreads(); });
    document.addEventListener("click", (event) => {
      const hashtag = event.target.closest("[data-hashtag]");
      if (hashtag) {
        event.preventDefault();
        const value = "#" + (hashtag.dataset.hashtag || "");
        if (currentPage === "threads") {
          threadHashtagEl.value = value;
          loadThreads();
        } else {
          hashtagSearchEl.value = value;
          showPage("messages");
          load();
        }
        updateFilterButtons();
        return;
      }
      if (!event.target.closest(".user-menu")) userMenuEl.classList.remove("open");
      if (!event.target.closest(".multi-filter")) {
        document.querySelectorAll(".multi-filter.open").forEach((filter) => filter.classList.remove("open"));
      }
    });
    window.addEventListener("resize", positionOpenFilterPanels);
    window.addEventListener("scroll", positionOpenFilterPanels, true);
    syncProfileUi();
    setupAccessShell();
    function controlChanged(control) {
      if (!control || control.disabled) return false;
      const tag = control.tagName;
      if (tag === "SELECT") {
        return Array.from(control.options || []).some((option) => option.selected !== option.defaultSelected);
      }
      if (tag === "TEXTAREA") return control.value !== control.defaultValue;
      if (tag === "INPUT") {
        const type = String(control.type || "").toLowerCase();
        if (["button", "submit", "reset", "hidden"].includes(type)) return false;
        if (type === "checkbox" || type === "radio") return control.checked !== control.defaultChecked;
        return control.value !== control.defaultValue;
      }
      return false;
    }
    function containerHasChangedControls(root) {
      if (!root || root.hidden) return false;
      return Array.from(root.querySelectorAll("input, textarea, select")).some(controlChanged);
    }
    function userIsEditingCurrentPage() {
      const active = document.activeElement;
      if (!active || active === document.body) return false;
      if (!active.matches("input, textarea, select, [contenteditable='true']")) return false;
      return Boolean(active.closest(".page:not([hidden])"));
    }
    function currentPageHasUnsavedChanges() {
      if (userIsEditingCurrentPage()) return true;
      if (currentPage === "access") return Boolean(accessRowsEl.querySelector(".permissions-dirty")) || containerHasChangedControls(accessUsersSectionEl);
      if (currentPage === "roadmap") return containerHasChangedControls(roadmapFormEl);
      if (currentPage === "products") return containerHasChangedControls(productsPageEl);
      if (currentPage === "user-groups") return containerHasChangedControls(userGroupsPageEl);
      if (currentPage === "broadcast") return containerHasChangedControls(broadcastPageEl);
      if (currentPage === "bots") return containerHasChangedControls(botsPageEl);
      if (currentPage === "profile") return true;
      return false;
    }
    function autoRefreshCurrentPage() {
      if (currentPageHasUnsavedChanges()) return;
      if (currentPage === "profile") return;
      if (currentPage === "dashboard" && canOpen("dashboard")) loadDashboard();
      else if (currentPage === "analytics" && canOpen("analytics")) loadAnalytics();
      else if (currentPage === "groups" && canOpen("groups")) loadGroups();
      else if (currentPage === "senders" && canOpen("senders")) loadSenders();
      else if (currentPage === "threads" && canOpen("threads")) loadThreads();
      else if (currentPage === "roadmap" && canOpen("roadmap")) loadRoadmap();
      else if (currentPage === "roadmap-path" && canOpen("roadmap-path")) loadRoadmap();
      else if (currentPage === "products" && canOpen("products")) loadProducts();
      else if (currentPage === "user-groups" && canOpen("user-groups")) loadUserGroups();
      else if (currentPage === "broadcast" && canOpen("broadcast")) loadBroadcast();
      else if (currentPage === "bots" && canOpen("bots")) loadBots();
      else if (currentPage === "access" && canOpen("access")) (accessLogsSectionEl.hidden ? (accessGroupsSectionEl.hidden ? loadAccessUsers() : loadAccessGroupView()) : loadAccessLogs());
      else if (canOpen("messages")) load();
    }
    setInterval(autoRefreshCurrentPage, 20000);
  </script>
</body>
</html>`;

const AUTH_FONT_FACE = HTML.match(/@font-face\s*\{[^}]+\}/)?.[0] || "";
const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;
const SECURITY_HEADERS = {
  "content-security-policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "form-action 'self'",
  ].join("; "),
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};
const PASSWORD_HASH_VERSION = "pbkdf2-sha256";
const PASSWORD_HASH_ITERATIONS = 100000;

async function loginHtml(env, error = "", email = "", message = "", authUser = null) {
  const profile = authUser ? await publicUserProfile(env, authUser) : null;
  const profileInitial = htmlEscape((profile?.email || "?").slice(0, 1).toUpperCase());
  const profileAvatar = profile?.telegram_avatar_url
    ? `<img class="signed-avatar" src="${htmlEscape(profile.telegram_avatar_url)}" alt="" />`
    : `<span class="signed-avatar">${profileInitial}</span>`;
  const profileTarget = authUser?.must_change_password ? "/set-password" : defaultMainPathForUser(authUser);
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ورود دیدپذیری</title>
  <style>
    ${AUTH_FONT_FACE}
    :root { color-scheme: light; --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#0f62fe; --accent-dark:#054ada; --soft:#edf5ff; --ok:#087f5b; }
    * { box-sizing: border-box; }
    body { margin:0; min-height:100vh; font-family:"IRANSans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); }
    .landing { min-height:100vh; display:flex; flex-direction:column; }
    .landing-header { height:72px; display:flex; align-items:center; justify-content:space-between; padding:0 clamp(20px, 5vw, 72px); border-bottom:1px solid var(--line); background:rgba(255,255,255,.86); }
    .brand { display:flex; align-items:center; gap:12px; font-weight:900; font-size:24px; }
    .brand-mark { width:38px; height:38px; display:grid; place-items:center; border:1px solid #b8d3ff; border-radius:50%; background:var(--soft); color:var(--accent); font-weight:900; }
    .header-note { color:var(--muted); font-size:13px; }
    .landing-main { width:min(1120px, calc(100vw - 40px)); margin:0 auto; flex:1; display:grid; grid-template-columns:minmax(0, 1fr) minmax(340px, 420px); gap:48px; align-items:center; padding:48px 0; }
    .intro { display:flex; flex-direction:column; gap:22px; }
    h1 { margin:0; font-size:clamp(34px, 5vw, 64px); line-height:1.25; letter-spacing:0; }
    .lead { margin:0; max-width:680px; color:var(--muted); font-size:17px; line-height:2; }
    .signals { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:12px; max-width:720px; }
    .signal { min-height:94px; border:1px solid var(--line); background:#fff; border-radius:8px; padding:14px; }
    .signal strong { display:block; margin-bottom:8px; font-size:15px; }
    .signal span { color:var(--muted); font-size:12px; line-height:1.8; }
    .capabilities { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px 14px; max-width:720px; margin:0; padding:0; list-style:none; color:var(--muted); font-size:13px; line-height:1.9; }
    .capabilities li { position:relative; padding-inline-start:16px; }
    .capabilities li::before { content:""; position:absolute; inset-inline-start:0; top:.85em; width:6px; height:6px; border-radius:50%; background:var(--accent); }
    .product-frame { border:1px solid var(--line); background:#fff; border-radius:8px; overflow:hidden; max-width:680px; box-shadow:0 18px 44px rgba(23,32,38,.08); }
    .frame-bar { height:42px; display:flex; align-items:center; gap:8px; padding:0 14px; border-bottom:1px solid var(--line); background:#f4f6f8; }
    .dot { width:9px; height:9px; border-radius:50%; background:#8d99a6; }
    .dot:first-child { background:#0f62fe; }
    .product-row { display:grid; grid-template-columns:90px 1fr 110px; gap:12px; align-items:center; padding:14px; border-bottom:1px solid var(--line); }
    .product-row:last-child { border-bottom:0; }
    .chip { display:inline-flex; align-items:center; justify-content:center; min-height:28px; border:1px solid #c6d8ff; border-radius:999px; background:var(--soft); color:#284b7a; font-size:12px; font-weight:800; }
    .line { height:10px; border-radius:999px; background:#dfe5eb; }
    .line.short { width:62%; }
    .frame-metrics { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:0; border-top:1px solid var(--line); background:#fbfcfd; }
    .frame-metric { padding:12px; border-inline-start:1px solid var(--line); }
    .frame-metric:first-child { border-inline-start:0; }
    .frame-metric span { display:block; color:var(--muted); font-size:11px; margin-bottom:6px; }
    .frame-metric strong { font-size:16px; }
    .auth-card { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:24px; box-shadow:0 18px 44px rgba(23,32,38,.08); }
    form { width:100%; }
    .auth-card h2 { margin:0 0 8px; font-size:22px; }
    .auth-copy { margin:0 0 16px; color:var(--muted); font-size:13px; line-height:1.9; }
    label { display:block; margin-bottom:8px; color:var(--muted); font-size:13px; }
    input, button { width:100%; height:40px; border-radius:6px; font:inherit; }
    input { border:1px solid var(--line); padding:0 10px; }
    button { margin-top:12px; border:0; background:var(--accent); color:#fff; cursor:pointer; font-weight:800; }
    button:hover { background:var(--accent-dark); }
    .password-wrap { position:relative; }
    .password-wrap input { padding-left:48px; direction:ltr; }
    .password-toggle { position:absolute; left:6px; top:6px; width:34px; height:28px; margin:0; padding:0; display:grid; place-items:center; border:1px solid var(--line); background:#fff; color:var(--muted); }
    .password-toggle svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2; }
    .auth-link { display:block; margin-top:12px; color:var(--accent); font-size:12px; text-align:center; text-decoration:none; }
    .auth-link:hover { text-decoration:underline; }
    .error { min-height:22px; margin-bottom:10px; color:#b42318; font-size:12px; line-height:1.7; }
    .message { min-height:22px; margin-bottom:10px; color:var(--ok); font-size:12px; line-height:1.7; }
    .signed-profile { display:flex; flex-direction:column; align-items:center; gap:12px; padding-top:8px; }
    .signed-avatar { width:64px; height:64px; display:grid; place-items:center; border:1px solid #b8d3ff; border-radius:50%; background:var(--soft); color:var(--accent); font-weight:900; object-fit:cover; }
    .signed-email { direction:ltr; text-align:center; font-weight:900; font-size:16px; overflow-wrap:anywhere; }
    .signed-meta { color:var(--muted); direction:ltr; text-align:center; font-size:13px; min-height:20px; }
    .button-link { display:grid; place-items:center; width:100%; height:40px; margin-top:8px; border-radius:6px; background:var(--accent); color:#fff; text-decoration:none; font-weight:900; }
    .button-link:hover { background:var(--accent-dark); }
    .logout-link { background:#fff; color:#b42318; border:1px solid #f0b8b2; }
    .logout-link:hover { background:#fff1f1; color:#a2191f; }
    .switch-note { margin:8px 0 0; color:var(--muted); text-align:center; font-size:12px; line-height:1.8; }
    @media (max-width: 860px) {
      .landing-header { height:auto; min-height:64px; padding:14px 20px; align-items:flex-start; gap:8px; flex-direction:column; }
      .landing-main { grid-template-columns:1fr; gap:28px; padding:28px 0; }
      .signals { grid-template-columns:1fr; }
      .capabilities { grid-template-columns:1fr; }
      .product-row { grid-template-columns:74px 1fr; }
      .product-row .chip:last-child { grid-column:1 / -1; justify-content:flex-start; padding:0 10px; }
      .frame-metrics { grid-template-columns:1fr; }
      .frame-metric { border-inline-start:0; border-top:1px solid var(--line); }
      .frame-metric:first-child { border-top:0; }
    }
  </style>
</head>
<body>
  <div class="landing">
    <header class="landing-header">
      <div class="brand"><span class="brand-mark">V</span><span>دیدپذیری</span></div>
      <div class="header-note">پایش گفتگوهای کاری، گروه‌ها، تردها و بات‌ها در یک داشبورد واحد</div>
    </header>
    <main class="landing-main">
      <section class="intro">
        <h1>دید کامل روی گفتگوهای عملیاتی</h1>
        <p class="lead">دیدپذیری پیام‌های تلگرام و بله را از گروه‌های کاری، بات‌ها و تردها جمع‌آوری می‌کند تا تیم‌ها بتوانند پیام، فایل، پاسخ، اطلاع‌رسانی و زمان پاسخ‌گویی را در یک پنل واحد دنبال کنند.</p>
        <div class="signals">
          <div class="signal"><strong>مانیتورینگ چندپلتفرمی</strong><span>تلگرام و بله در کنار هم، با تفکیک پلتفرم، بات، گروه، تاپیک و ارسال‌کننده.</span></div>
          <div class="signal"><strong>مکالمه قابل پیگیری</strong><span>تردها، ریپلای‌ها، عکس‌ها، فایل‌ها، ری‌اکشن‌ها و پیام‌های ویرایش‌شده در یک نمای منظم.</span></div>
          <div class="signal"><strong>کنترل و پاسخ امن</strong><span>دسترسی صفحه‌ای و گروهی، پاسخ با بات، اطلاع‌رسانی گروهی و لاگ کامل عملیات.</span></div>
        </div>
        <ul class="capabilities">
          <li>تحلیل زمان پاسخ‌گویی به تفکیک گروه، لیبل و افراد</li>
          <li>مدیریت بات‌ها و credentialها از داخل پنل</li>
          <li>لیبل‌گذاری گروه‌ها و ارسال‌کننده‌ها: داخلی، مشتری، پروایدر</li>
          <li>جستجو و فیلتر پیشرفته با لیست‌های قابل سرچ</li>
        </ul>
        <div class="product-frame" aria-hidden="true">
          <div class="frame-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
          <div class="product-row"><span class="chip">پیام‌ها</span><span class="line"></span><span class="chip">زنده</span></div>
          <div class="product-row"><span class="chip">تردها</span><span class="line short"></span><span class="chip">قابل پاسخ</span></div>
          <div class="product-row"><span class="chip">اطلاع‌رسانی</span><span class="line"></span><span class="chip">با تایید نهایی</span></div>
          <div class="frame-metrics">
            <div class="frame-metric"><span>پلتفرم‌ها</span><strong>تلگرام و بله</strong></div>
            <div class="frame-metric"><span>تحلیل</span><strong>زمان پاسخ‌گویی</strong></div>
            <div class="frame-metric"><span>دسترسی</span><strong>صفحه، لیبل، گروه</strong></div>
          </div>
        </div>
      </section>
      <section class="auth-card">
        ${profile ? `
          <h2>ورود به داشبورد</h2>
          <p class="auth-copy">شما با این پروفایل وارد شده‌اید.</p>
          <div class="signed-profile">
            ${profileAvatar}
            <div class="signed-email">${htmlEscape(profile.email)}</div>
            <div class="signed-meta">${profile.telegram_username ? htmlEscape(profile.telegram_username) : "یوزرنیم تلگرام ثبت نشده"}</div>
            <a class="button-link" href="${profileTarget}">ورود</a>
            <a class="button-link logout-link" href="/logout">این حساب کاربری من نیست</a>
            <p class="switch-note">برای ورود با کاربر دیگر، ابتدا از این حساب خارج شوید.</p>
          </div>
        ` : `
          <form method="post" action="/">
            <h2>ورود به داشبورد</h2>
            <p class="auth-copy">فقط ایمیل‌های مجاز دامنه toman.ir امکان ورود دارند.</p>
            <div class="error">${htmlEscape(error)}</div>
            <div class="message">${htmlEscape(message)}</div>
            <label for="email">ایمیل</label>
            <input id="email" name="email" type="email" autocomplete="username" placeholder="anything@toman.ir" value="${htmlEscape(email)}" autofocus />
            <label for="password">پسورد</label>
            <div class="password-wrap">
              <input id="password" name="password" type="password" autocomplete="current-password" />
              <button class="password-toggle" type="button" data-toggle-password="password" aria-label="نمایش پسورد">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <button type="submit">ورود</button>
            <a class="auth-link" href="/forgot-password">فراموشی رمز عبور؟</a>
          </form>
        `}
      </section>
    </main>
  </div>
  <script>
    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  </script>
</body>
</html>`;
}

function passwordPageHtml(error = "", telegramUsername = "") {
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>تنظیم پسورد</title>
  <style>
    ${AUTH_FONT_FACE}
    :root { --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; --error:#b42318; }
    * { box-sizing:border-box; }
    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:"IRANSans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); }
    form { width:min(420px, calc(100vw - 32px)); background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:22px; }
    h1 { margin:0 0 8px; font-size:20px; }
    p { margin:0 0 16px; color:var(--muted); font-size:13px; line-height:1.8; }
    label { display:block; margin:10px 0 8px; color:var(--muted); font-size:13px; }
    input, button { width:100%; height:40px; border-radius:6px; font:inherit; }
    input { border:1px solid var(--line); padding:0 10px; direction:ltr; }
    button { margin-top:14px; border:0; background:var(--accent); color:#fff; cursor:pointer; }
    .password-wrap { position:relative; }
    .password-wrap input { padding-left:48px; }
    .password-toggle { position:absolute; left:6px; top:6px; width:34px; height:28px; margin:0; padding:0; display:grid; place-items:center; border:1px solid var(--line); background:#fff; color:var(--muted); }
    .password-toggle svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2; }
    .telegram-input-wrap { width:100%; height:40px; display:flex; align-items:center; border:1px solid var(--line); border-radius:6px; background:#fff; direction:ltr; overflow:hidden; }
    .telegram-input-wrap:focus-within { outline:2px solid var(--accent); outline-offset:-2px; }
    .telegram-input-prefix { flex:0 0 auto; padding:0 0 0 10px; color:var(--muted); font-weight:800; direction:ltr; }
    .telegram-input-wrap input { min-width:0; flex:1 1 auto; height:38px; border:0; padding:0 10px 0 2px; direction:ltr; text-align:left; }
    .telegram-input-wrap input:focus { outline:0; }
    .error { min-height:22px; color:var(--error); font-size:12px; }
  </style>
</head>
<body>
  <form method="post" action="/set-password">
    <h1>تنظیم پسورد جدید</h1>
    <p>برای ادامه باید پسورد قوی انتخاب کنید. بعد از ذخیره، خودکار خارج می‌شوید و باید با پسورد جدید وارد شوید.</p>
    <div class="error">${htmlEscape(error)}</div>
    <label for="telegram_username">یوزرنیم تلگرام</label>
    <div class="telegram-input-wrap">
      <span class="telegram-input-prefix">@</span>
      <input id="telegram_username" name="telegram_username" type="text" inputmode="latin" autocomplete="off" placeholder="نام‌کاربری" value="${htmlEscape(telegramUsernameLocal(telegramUsername))}" />
    </div>
    <label for="current_password">پسورد فعلی</label>
    <div class="password-wrap">
      <input id="current_password" name="current_password" type="password" autocomplete="current-password" autofocus />
      <button class="password-toggle" type="button" data-toggle-password="current_password" aria-label="نمایش پسورد فعلی">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <label for="new_password">پسورد جدید</label>
    <div class="password-wrap">
      <input id="new_password" name="new_password" type="password" autocomplete="new-password" />
      <button class="password-toggle" type="button" data-toggle-password="new_password" aria-label="نمایش پسورد جدید">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <label for="new_password_confirm">تکرار پسورد جدید</label>
    <div class="password-wrap">
      <input id="new_password_confirm" name="new_password_confirm" type="password" autocomplete="new-password" />
      <button class="password-toggle" type="button" data-toggle-password="new_password_confirm" aria-label="نمایش تکرار پسورد جدید">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <button type="submit">ذخیره پسورد</button>
  </form>
  <script>
    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  </script>
</body>
</html>`;
}

function forgotPasswordHtml({ error = "", email = "", message = "" } = {}) {
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>فراموشی رمز عبور</title>
  <style>
    ${AUTH_FONT_FACE}
    :root { --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; --error:#b42318; --ok:#087f5b; }
    * { box-sizing:border-box; }
    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:"IRANSans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); }
    form { width:min(420px, calc(100vw - 32px)); background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:22px; }
    h1 { margin:0 0 8px; font-size:20px; }
    p { margin:0 0 16px; color:var(--muted); font-size:13px; line-height:1.8; }
    label { display:block; margin:10px 0 8px; color:var(--muted); font-size:13px; }
    input, button { width:100%; height:40px; border-radius:6px; font:inherit; }
    input { border:1px solid var(--line); padding:0 10px; direction:ltr; }
    button { margin-top:14px; border:0; background:var(--accent); color:#fff; cursor:pointer; }
    .error { min-height:22px; color:var(--error); font-size:12px; line-height:1.7; }
    .message { min-height:22px; color:var(--ok); font-size:12px; line-height:1.7; }
    .auth-link { display:block; margin-top:12px; color:var(--accent); font-size:12px; text-align:center; text-decoration:none; }
  </style>
</head>
<body>
  <form method="post" action="/forgot-password">
    <h1>فراموشی رمز عبور</h1>
    <p>ایمیل سازمانی خود را وارد کنید. اگر دسترسی فعال داشته باشید، ایمیل بازیابی برایتان ارسال می‌شود.</p>
    <div class="error">${htmlEscape(error)}</div>
    <div class="message">${htmlEscape(message)}</div>
    <label for="email">ایمیل</label>
    <input id="email" name="email" type="email" autocomplete="username" placeholder="anything@toman.ir" value="${htmlEscape(email)}" autofocus />
    <button type="submit">ارسال ایمیل بازیابی</button>
    <a class="auth-link" href="/">بازگشت به ورود</a>
  </form>
</body>
</html>`;
}

function recoveryPasswordHtml(error = "", accessToken = "") {
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ثبت رمز عبور جدید</title>
  <style>
    ${AUTH_FONT_FACE}
    :root { --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; --error:#b42318; }
    * { box-sizing:border-box; }
    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:"IRANSans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); }
    form { width:min(420px, calc(100vw - 32px)); background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:22px; }
    h1 { margin:0 0 8px; font-size:20px; }
    p { margin:0 0 16px; color:var(--muted); font-size:13px; line-height:1.8; }
    label { display:block; margin:10px 0 8px; color:var(--muted); font-size:13px; }
    input, button { width:100%; height:40px; border-radius:6px; font:inherit; }
    input { border:1px solid var(--line); padding:0 10px; direction:ltr; }
    button { margin-top:14px; border:0; background:var(--accent); color:#fff; cursor:pointer; }
    button:disabled { opacity:.55; cursor:not-allowed; }
    .password-wrap { position:relative; }
    .password-wrap input { padding-left:48px; }
    .password-toggle { position:absolute; left:6px; top:6px; width:34px; height:28px; margin:0; padding:0; display:grid; place-items:center; border:1px solid var(--line); background:#fff; color:var(--muted); }
    .password-toggle svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2; }
    .error { min-height:22px; color:var(--error); font-size:12px; line-height:1.7; }
    .auth-link { display:block; margin-top:12px; color:var(--accent); font-size:12px; text-align:center; text-decoration:none; }
  </style>
</head>
<body>
  <form method="post" action="/recovery" id="recoveryForm">
    <h1>ثبت رمز عبور جدید</h1>
    <p>پسورد جدید باید حداقل ۱۰ کاراکتر و شامل حروف بزرگ، حروف کوچک، عدد و علامت باشد.</p>
    <div class="error" id="pageError">${htmlEscape(error)}</div>
    <input id="access_token" name="access_token" type="hidden" value="${htmlEscape(accessToken)}" />
    <label for="new_password">پسورد جدید</label>
    <div class="password-wrap">
      <input id="new_password" name="new_password" type="password" autocomplete="new-password" />
      <button class="password-toggle" type="button" data-toggle-password="new_password" aria-label="نمایش پسورد جدید">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <label for="new_password_confirm">تکرار پسورد جدید</label>
    <div class="password-wrap">
      <input id="new_password_confirm" name="new_password_confirm" type="password" autocomplete="new-password" />
      <button class="password-toggle" type="button" data-toggle-password="new_password_confirm" aria-label="نمایش تکرار پسورد جدید">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <button id="submitButton" type="submit">ذخیره رمز جدید</button>
    <a class="auth-link" href="/">بازگشت به ورود</a>
  </form>
  <script>
    const params = new URLSearchParams(location.hash.startsWith("#") ? location.hash.slice(1) : location.search.slice(1));
    const hiddenToken = document.getElementById("access_token");
    const token = params.get("access_token") || hiddenToken.value;
    const error = params.get("error_description") || params.get("error");
    const pageError = document.getElementById("pageError");
    const submitButton = document.getElementById("submitButton");
    if (error) pageError.textContent = decodeURIComponent(error);
    if (token) {
      hiddenToken.value = token;
      history.replaceState(null, "", "/recovery");
    } else if (!pageError.textContent) {
      pageError.textContent = "لینک بازیابی نامعتبر یا منقضی شده است.";
      submitButton.disabled = true;
    }
    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  </script>
</body>
</html>`;
}

const MESSAGE_KEYS = ["message", "edited_message", "channel_post", "edited_channel_post"];
const MEDIA_KEYS = ["photo", "video", "document", "voice", "audio", "video_note", "animation", "sticker", "location", "contact", "poll", "venue"];

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: secureHeaders({
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    }),
  });
}

function text(value, status = 200, contentType = "text/plain; charset=utf-8") {
  return new Response(value, {
    status,
    headers: secureHeaders({
      "content-type": contentType,
      "cache-control": "no-store",
    }),
  });
}

function secureHeaders(headers = {}) {
  return {
    ...SECURITY_HEADERS,
    ...headers,
  };
}

function authEmailError(message, fallback = "ارسال ایمیل انجام نشد") {
  const raw = String(message || fallback);
  const waitMatch = raw.match(/after\s+(\d+)\s+seconds?/i);
  if (waitMatch) {
    const seconds = Number(waitMatch[1]);
    const error = new Error(`برای امنیت، ارسال دوباره ایمیل بعد از ${seconds} ثانیه ممکن است.`);
    error.status = 429;
    error.retry_after_seconds = seconds;
    return error;
  }
  const error = new Error(raw || fallback);
  error.status = 500;
  return error;
}

function htmlEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function redirect(location) {
  return new Response(null, {
    status: 303,
    headers: secureHeaders({ location }),
  });
}

function publicOrigin(request, env) {
  const configured = String(env.PUBLIC_APP_ORIGIN || env.APP_ORIGIN || "").trim().replace(/\/+$/, "");
  if (configured) return configured;
  const origin = new URL(request.url).origin;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) {
    return "https://visibility.fgpt.workers.dev";
  }
  return origin;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validAccessEmail(email) {
  return /^[^@\s]+@toman\.ir$/.test(normalizeEmail(email));
}

function normalizeTelegramUsername(value) {
  const local = telegramUsernameLocal(value);
  return local ? `@${local.toLowerCase()}` : "";
}

function telegramUsernameLocal(value) {
  return String(value || "").trim().replace(/^@+/, "");
}

function validTelegramUsername(value) {
  const local = telegramUsernameLocal(value);
  return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(local);
}

function normalizeGroupLabel(value) {
  const label = String(value || "").trim();
  return GROUP_LABELS.includes(label) ? label : null;
}

function groupLabelValueFromText(value) {
  const label = String(value || "").trim();
  if (GROUP_LABELS.includes(label)) return label;
  const byText = {
    "گروه‌های داخلی شرکت": "internal_team",
    "گروه‌های مشتریان": "customer",
    "گروه‌های پروایدرهای ما": "provider",
  };
  return byText[label] || null;
}

function groupLabelTextServer(value) {
  const labels = {
    internal_team: "گروه‌های داخلی شرکت",
    customer: "گروه‌های مشتریان",
    provider: "گروه‌های پروایدرهای ما",
  };
  return labels[String(value || "")] || "بدون لیبل";
}

function senderLabelTextServer(value) {
  const labels = {
    internal_team: "افراد داخلی شرکت",
    customer: "افراد مشتری",
    provider: "افراد پروایدرها",
  };
  return labels[String(value || "")] || "بدون لیبل";
}

const ACCESS_PERMISSIONS = ["access", "threads", "groups", "messages", "senders", "dashboard", "analytics", "bots", "roadmap", "products", "user_groups"];
const EXTRA_ACCESS_PERMISSIONS = ["reply", "broadcast"];
const FULL_ACCESS_PERMISSIONS = [...ACCESS_PERMISSIONS, ...EXTRA_ACCESS_PERMISSIONS];
const ACCESS_OWNER_EMAIL = "a.eslami@toman.ir";
const GROUP_LABELS = ["internal_team", "customer", "provider"];
const DEFAULT_PLATFORM = "telegram";
const PLATFORM_LABELS = {
  telegram: "تلگرام",
  bale: "بله",
  whatsapp: "واتساپ",
};
const THREAD_UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const THREAD_PLATFORM_CODES = { telegram: 1, bale: 2, whatsapp: 3 };
const THREAD_PLATFORM_BY_CODE = { 1: "telegram", 2: "bale", 3: "whatsapp" };
const API_CACHE_TTL_MS = 60 * 1000;
const SUPABASE_DEFAULT_TIMEOUT_MS = 10000;
const SUPABASE_AUTH_TIMEOUT_MS = 5000;
const SUPABASE_PROFILE_TIMEOUT_MS = 2500;
let dashboardApiCache = null;
let threadFilterOptionsApiCache = null;
const TELEGRAM_MESSAGE_SELECT = [
  "platform",
  "bot_id",
  "bot_username",
  "bot_name",
  "update_id",
  "message_id",
  "chat_id",
  "chat_title",
  "chat_username",
  "chat_type",
  "message_thread_id",
  "is_topic_message",
  "topic_name",
  "sender_id",
  "sender_username",
  "sender_first_name",
  "sender_last_name",
  "sender_is_bot",
  "sender_photo_file_id",
  "sender_photo_file_unique_id",
  "sender_chat_id",
  "sender_chat_title",
  "body",
  "caption",
  "message_type",
  "sent_at_utc",
  "edited_at_utc",
  "reply_to_message_id",
  "media_file_id",
  "media_group_id",
  "forward_origin_json",
  "entities_json",
  "raw_payload_json",
  "received_at_utc",
].join(",");

function normalizePlatform(value) {
  const platform = String(value || DEFAULT_PLATFORM).trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(PLATFORM_LABELS, platform) ? platform : DEFAULT_PLATFORM;
}

function platformLabel(value) {
  const platform = normalizePlatform(value);
  return PLATFORM_LABELS[platform] || platform;
}

function platformQuery(platform = DEFAULT_PLATFORM) {
  return `eq.${normalizePlatform(platform)}`;
}

async function fetchWithTimeout(url, init = {}, timeoutMs = SUPABASE_DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function messageKey(row, messageId = row?.message_id) {
  if (!row?.chat_id || !messageId) return "";
  return `${normalizePlatform(row.platform)}:${row.chat_id}:${messageId}`;
}

function bytesToUuid(bytes) {
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function threadUuidForParts(platform, chatId, messageId) {
  const code = THREAD_PLATFORM_CODES[normalizePlatform(platform)] || THREAD_PLATFORM_CODES.telegram;
  let chat = BigInt(String(chatId || "0"));
  const two64 = 1n << 64n;
  if (chat < 0) chat = two64 + chat;
  const message = BigInt(String(messageId || "0"));
  const bytes = new Uint8Array(16);
  bytes[0] = code;
  for (let index = 0; index < 8; index += 1) bytes[1 + index] = Number((chat >> BigInt((7 - index) * 8)) & 255n);
  for (let index = 0; index < 6; index += 1) bytes[9 + index] = Number((message >> BigInt((5 - index) * 8)) & 255n);
  bytes[15] = bytes.slice(0, 15).reduce((checksum, byte) => checksum ^ byte, 0);
  return bytesToUuid(bytes);
}

function parseThreadUuid(uuid) {
  const match = String(uuid || "").match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  const value = (match?.[0] || String(uuid || "")).toLowerCase();
  if (!THREAD_UUID_PATTERN.test(value)) return null;
  const hex = value.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let index = 0; index < 16; index += 1) bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  const checksum = bytes.slice(0, 15).reduce((current, byte) => current ^ byte, 0);
  if (checksum !== bytes[15]) return null;
  const platform = THREAD_PLATFORM_BY_CODE[bytes[0]];
  if (!platform) return null;
  let chat = 0n;
  for (let index = 0; index < 8; index += 1) chat = (chat << 8n) | BigInt(bytes[1 + index]);
  if (chat & (1n << 63n)) chat -= 1n << 64n;
  let message = 0n;
  for (let index = 0; index < 6; index += 1) message = (message << 8n) | BigInt(bytes[9 + index]);
  if (message <= 0n) return null;
  return { platform, chatId: chat.toString(), messageId: message.toString(), uuid: value };
}

function chatKey(row, chatId = row?.chat_id) {
  if (!chatId) return "";
  return `${normalizePlatform(row?.platform)}:${chatId}`;
}

function mediaGroupKey(row) {
  if (!row?.chat_id || !row?.media_group_id) return "";
  return `${normalizePlatform(row.platform)}:${row.chat_id}:${row.media_group_id}`;
}

function topicThreadKey(row, messageThreadId = row?.message_thread_id) {
  if (!row?.chat_id || !messageThreadId) return "";
  return `${normalizePlatform(row.platform)}:${row.chat_id}:${messageThreadId}`;
}

function parseMessageKey(key) {
  const [platform, chatId, messageId] = String(key || "").split(":");
  return { platform: normalizePlatform(platform), chatId, messageId };
}

function parseMediaGroupKey(key) {
  const [platform, chatId, mediaGroupId] = String(key || "").split(":");
  return { platform: normalizePlatform(platform), chatId, mediaGroupId };
}

function isAccessOwnerEmail(email) {
  return normalizeEmail(email) === ACCESS_OWNER_EMAIL;
}

function normalizeAccessPermissions(value) {
  const source = Array.isArray(value) ? value : (Array.isArray(value?.pages) ? value.pages : []);
  const allowed = new Set(ACCESS_PERMISSIONS);
  const normalized = source.map((item) => String(item || "").trim().toLowerCase()).filter((item) => allowed.has(item));
  const replyEnabled = (Array.isArray(value) && value.includes("reply")) || value?.reply === true;
  const broadcastEnabled = (Array.isArray(value) && value.includes("broadcast")) || value?.broadcast === true;
  if (replyEnabled) normalized.push("reply");
  if (broadcastEnabled) normalized.push("broadcast");
  return [...new Set(normalized)];
}

function normalizeGroupAccess(value) {
  const source = value?.group_access && typeof value.group_access === "object" ? value.group_access : value;
  const labelSet = new Set(GROUP_LABELS);
  const labels = Array.isArray(source?.labels)
    ? [...new Set(source.labels.map((item) => String(item || "").trim()).filter((item) => labelSet.has(item)))]
    : [];
  const groups = Array.isArray(source?.groups)
    ? [...new Set(source.groups.map((item) => {
      const [platform, chatId] = String(item || "").split(":");
      return platform && /^-?\d+$/.test(chatId || "") ? `${normalizePlatform(platform)}:${chatId}` : "";
    }).filter(Boolean))]
    : [];
  return { labels, groups };
}

function accessPayload(pages, groupAccess = {}) {
  const requested = Array.isArray(pages) ? pages.map((item) => String(item || "").trim().toLowerCase()) : [];
  return {
    pages: normalizeAccessPermissions(pages).filter((item) => ACCESS_PERMISSIONS.includes(item)),
    group_access: normalizeGroupAccess(groupAccess),
    reply: requested.includes("reply"),
    broadcast: requested.includes("broadcast"),
  };
}

function accessPermissionsForUser(user) {
  if (isAccessOwnerEmail(user?.email)) return FULL_ACCESS_PERMISSIONS;
  return normalizeAccessPermissions(user?.permissions);
}

function groupAccessForUser(user) {
  if (isAccessOwnerEmail(user?.email)) return { labels: [], groups: [], unrestricted: true };
  const groupAccess = normalizeGroupAccess(user?.permissions);
  return {
    ...groupAccess,
    unrestricted: false,
  };
}

function hasAccessPermission(user, permission) {
  const permissions = accessPermissionsForUser(user);
  if (permission === "products" && permissions.includes("roadmap")) return true;
  return permissions.includes(permission);
}

function hasAnyAccessPermission(user, permissions) {
  return permissions.some((permission) => hasAccessPermission(user, permission));
}

function defaultMainPathForUser(user) {
  const firstPage = ["dashboard", "threads", "messages", "roadmap", "products", "user_groups", "senders", "groups", "broadcast", "bots", "access", "analytics"].find((permission) => hasAccessPermission(user, permission));
  return `/main/${firstPage === "user_groups" ? "user-groups" : (firstPage || "messages")}`;
}

function groupRowAllowedByAccess(row, groupAccess) {
  if (!groupAccess || groupAccess.unrestricted) return true;
  return groupAccess.groups.includes(chatKey(row)) || groupAccess.labels.includes(String(row.group_label || ""));
}

async function allowedChatKeySet(env, user) {
  const groupAccess = groupAccessForUser(user);
  if (groupAccess.unrestricted) return null;
  const params = new URLSearchParams({
    select: "platform,chat_id,group_label",
    limit: "10000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return new Set();
  const rows = await response.json();
  return new Set(rows.filter((row) => groupRowAllowedByAccess(row, groupAccess)).map((row) => chatKey(row)));
}

function rowAllowedByChatSet(row, allowedSet) {
  return !allowedSet || allowedSet.has(chatKey(row));
}

function clientDocumentPayload(payload, key) {
  const fileName = payload?.[key]?.document?.file_name;
  return fileName ? { document: { file_name: fileName } } : undefined;
}

function rawPayloadForClient(payload) {
  if (!payload || typeof payload !== "object") return null;
  const result = {
    redacted: true,
  };
  for (const key of ["dashboard_broadcast", "dashboard_thread_reply", "dashboard_outgoing"]) {
    if (payload[key] === true) result[key] = true;
  }
  for (const key of ["message", "edited_message", "channel_post", "edited_channel_post"]) {
    const value = clientDocumentPayload(payload, key);
    if (value) result[key] = value;
  }
  return result;
}

function messageRowForClient(row) {
  if (!row || typeof row !== "object") return row;
  return {
    ...row,
    raw_payload_json: rawPayloadForClient(row.raw_payload_json),
    reactions: Array.isArray(row.reactions)
      ? row.reactions.map(({ reaction_json, ...reaction }) => reaction)
      : row.reactions,
  };
}

async function verifyUserPassword(user, password) {
  return verifyPasswordHash(password, user?.password_salt, user?.password_hash);
}

function profilePhotoUrlFromRow(row) {
  if (!row?.sender_photo_file_id) return "";
  const params = new URLSearchParams({
    platform: row.platform || "telegram",
    file_id: row.sender_photo_file_id,
  });
  if (row.bot_id) params.set("bot_id", row.bot_id);
  return `/api/profile-photo?${params.toString()}`;
}

async function latestTelegramProfilePhotoForUsername(env, username) {
  const local = telegramUsernameLocal(username);
  if (!local) return null;
  const params = new URLSearchParams({
    select: "platform,bot_id,sender_photo_file_id,sender_photo_file_unique_id,received_at_utc,sent_at_utc",
    platform: "eq.telegram",
    sender_username: `ilike.${local}`,
    sender_photo_file_id: "not.is.null",
    order: "received_at_utc.desc.nullslast,sent_at_utc.desc.nullslast",
    limit: "1",
  });
  try {
    const response = await fetchWithTimeout(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers: supabaseHeaders(env) }, SUPABASE_PROFILE_TIMEOUT_MS);
    if (!response.ok) return null;
    const rows = await response.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

async function publicUserProfile(env, user) {
  const telegramUsername = normalizeTelegramUsername(user?.telegram_username);
  const photoRow = await latestTelegramProfilePhotoForUsername(env, telegramUsername);
  return {
    email: normalizeEmail(user?.email),
    telegram_username: telegramUsername,
    telegram_avatar_url: profilePhotoUrlFromRow(photoRow),
  };
}

function forbiddenAccess() {
  return json({ error: "دسترسی مجاز نیست" }, 403);
}

function strongPassword(password) {
  return typeof password === "string"
    && password.length >= 10
    && /[a-z]/.test(password)
    && /[A-Z]/.test(password)
    && /\d/.test(password)
    && /[^A-Za-z0-9]/.test(password)
    && password !== "changeme";
}

function randomHex(bytes = 16) {
  const values = new Uint8Array(bytes);
  crypto.getRandomValues(values);
  return [...values].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function base64UrlEncode(value) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  return atob(padded);
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return base64UrlEncode(binary);
}

function base64UrlToBytes(value) {
  const binary = base64UrlDecode(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256Hex(value) {
  return bytesToHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

async function pbkdf2Hash(password, salt, iterations = PASSWORD_HASH_ITERATIONS) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new TextEncoder().encode(salt),
      iterations,
    },
    keyMaterial,
    256,
  );
  return bytesToBase64Url(new Uint8Array(bits));
}

async function botCredentialKey(env) {
  const secret = env.BOT_CREDENTIAL_ENCRYPTION_KEY;
  if (!secret || String(secret).length < 24) {
    throw new Error("کلید رمزنگاری بات تنظیم نشده است");
  }
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
}

async function encryptBotCredential(env, token) {
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const key = await botCredentialKey(env);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(token));
  return {
    credential_ciphertext: bytesToBase64Url(new Uint8Array(ciphertext)),
    credential_iv: bytesToBase64Url(iv),
    credential_last4: String(token).slice(-4),
  };
}

async function decryptBotCredential(env, row) {
  if (!row?.credential_ciphertext || !row?.credential_iv) return null;
  const key = await botCredentialKey(env);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64UrlToBytes(row.credential_iv) },
    key,
    base64UrlToBytes(row.credential_ciphertext),
  );
  return new TextDecoder().decode(plaintext);
}

async function legacyHashPassword(password, salt) {
  return sha256Hex(`${salt}:${password}`);
}

async function hashPassword(password, salt) {
  const iterations = PASSWORD_HASH_ITERATIONS;
  const hash = await pbkdf2Hash(password, salt, iterations);
  return `${PASSWORD_HASH_VERSION}$${iterations}$${hash}`;
}

async function verifyPasswordHash(password, salt, storedHash) {
  const hash = String(storedHash || "");
  if (!password || !salt || !hash) return false;
  if (hash.startsWith(`${PASSWORD_HASH_VERSION}$`)) {
    const [, iterationsValue, expected] = hash.split("$");
    const iterations = Number(iterationsValue);
    if (!Number.isInteger(iterations) || iterations < 100000 || !expected) return false;
    return await pbkdf2Hash(password, salt, iterations) === expected;
  }
  return await legacyHashPassword(password, salt) === hash;
}

function passwordHashNeedsUpgrade(storedHash) {
  return !String(storedHash || "").startsWith(`${PASSWORD_HASH_VERSION}$${PASSWORD_HASH_ITERATIONS}$`);
}

function sessionSecret(env) {
  const secret = String(env.SESSION_SECRET || "").trim();
  if (secret.length < 32) {
    throw new Error("SESSION_SECRET must be configured with at least 32 characters");
  }
  return secret;
}

async function signSessionPayload(payload, env) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret(env)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function makeSessionCookie(user, env) {
  const payload = base64UrlEncode(JSON.stringify({
    email: user.email,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    ph: String(user.password_hash || "").slice(0, 16),
  }));
  const signature = await signSessionPayload(payload, env);
  return `${payload}.${signature}`;
}

function clearSessionCookie() {
  return "visibility_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
}

async function dashboardAuthorized(request, env) {
  const cookie = request.headers.get("cookie") || "";
  const session = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("visibility_session="))?.split("=")[1];
  if (!session || !session.includes(".")) return null;
  try {
    const [payload, signature] = session.split(".");
    if (signature !== await signSessionPayload(payload, env)) return null;
    const data = JSON.parse(base64UrlDecode(payload));
    if (!data.email || !data.exp || Date.now() > data.exp) return null;
    const user = await getAccessUserByEmail(env, data.email, SUPABASE_AUTH_TIMEOUT_MS);
    if (!user || String(user.password_hash || "").slice(0, 16) !== data.ph) return null;
    if (!user.is_active && !isAccessOwnerEmail(user.email)) return null;
    return user;
  } catch (error) {
    console.error("dashboard auth failed", error?.message || error);
    return null;
  }
}

async function handleLogin(request, env) {
  if (request.method !== "POST") {
    const authUser = await dashboardAuthorized(request, env);
    const recovered = new URL(request.url).searchParams.get("recovered") === "1";
    return text(await loginHtml(env, "", "", recovered ? "پسورد جدید ذخیره شد. حالا وارد شوید." : "", authUser), 200, "text/html; charset=utf-8");
  }
  const form = await request.formData();
  const email = normalizeEmail(form.get("email"));
  const password = String(form.get("password") || "");
  if (!validAccessEmail(email)) return text(await loginHtml(env, "ایمیل باید به شکل anything@toman.ir باشد.", email), 400, "text/html; charset=utf-8");
  const user = await getAccessUserByEmail(env, email);
  if (!user) {
    return text(await loginHtml(env, "این ایمیل مجوز دسترسی ندارد.", email), 401, "text/html; charset=utf-8");
  }
  if (!user.is_active && !isAccessOwnerEmail(user.email)) {
    return text(await loginHtml(env, "دسترسی این ایمیل لغو شده است.", email), 403, "text/html; charset=utf-8");
  }
  if (!await verifyUserPassword(user, password)) {
    return text(await loginHtml(env, "پسورد وارد شده درست نیست.", email), 401, "text/html; charset=utf-8");
  }
  const now = new Date().toISOString();
  const loginPatch = { last_login_at_utc: now, updated_at_utc: now };
  if (passwordHashNeedsUpgrade(user.password_hash)) {
    try {
      const salt = randomHex();
      loginPatch.password_salt = salt;
      loginPatch.password_hash = await hashPassword(password, salt);
    } catch (error) {
      console.error("password hash upgrade skipped", error?.message || error);
    }
  }
  let updatedUser = user;
  try {
    updatedUser = await patchAccessUser(env, email, loginPatch);
  } catch (error) {
    console.error("login profile update failed", error?.message || error);
    if (loginPatch.password_hash) {
      return text(await loginHtml(env, "به‌روزرسانی امنیتی پسورد انجام نشد. لطفاً دوباره تلاش کنید.", email), 500, "text/html; charset=utf-8");
    }
  }
  let cookieValue;
  try {
    cookieValue = await makeSessionCookie(updatedUser, env);
  } catch (error) {
    return text(await loginHtml(env, "تنظیم SESSION_SECRET سرور معتبر نیست.", email), 500, "text/html; charset=utf-8");
  }
  return new Response(null, {
    status: 303,
    headers: secureHeaders({
      location: user.must_change_password ? "/set-password" : defaultMainPathForUser(user),
      "set-cookie": `visibility_session=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    }),
  });
}

function supabaseHeaders(env, prefer) {
  const headers = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "content-type": "application/json",
  };
  if (prefer) headers.prefer = prefer;
  return headers;
}

function supabasePublishableKey(env) {
  return env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY || "";
}

function supabaseAuthPublicHeaders(env) {
  const key = supabasePublishableKey(env);
  return {
    apikey: key,
    authorization: `Bearer ${key}`,
    "content-type": "application/json",
  };
}

function supabaseAuthAdminHeaders(env) {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "content-type": "application/json",
  };
}

async function readSupabaseJson(response) {
  const textValue = await response.text();
  if (!textValue) return null;
  try {
    return JSON.parse(textValue);
  } catch {
    return null;
  }
}

async function getAccessUserByEmail(env, email, timeoutMs = SUPABASE_DEFAULT_TIMEOUT_MS) {
  const params = new URLSearchParams({
    select: "id,email,password_hash,password_salt,must_change_password,is_active,permissions,telegram_username,last_login_at_utc,created_at_utc,updated_at_utc",
    email: `eq.${normalizeEmail(email)}`,
    limit: "1",
  });
  const response = await fetchWithTimeout(`${env.SUPABASE_URL}/rest/v1/visibility_access_users?${params}`, { headers: supabaseHeaders(env) }, timeoutMs);
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

async function createAccessUser(env, email, permissions = FULL_ACCESS_PERMISSIONS, groupAccess = {}) {
  const normalized = normalizeEmail(email);
  if (!validAccessEmail(normalized)) throw new Error("ایمیل باید از دامنه toman.ir باشد");
  const salt = randomHex();
  const row = {
    email: normalized,
    password_salt: salt,
    password_hash: await hashPassword("changeme", salt),
    must_change_password: true,
    is_active: true,
    permissions: accessPayload(permissions, groupAccess),
    updated_at_utc: new Date().toISOString(),
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_users?on_conflict=email`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=ignore-duplicates,return=representation"),
    body: JSON.stringify(row),
  });
  const body = await readSupabaseJson(response);
  if (!response.ok) throw new Error(body?.message || "ساخت کاربر انجام نشد");
  return Array.isArray(body) ? body[0] : body;
}

async function patchAccessUser(env, email, row) {
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_users?email=eq.${encodeURIComponent(normalizeEmail(email))}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(row),
  });
  const body = await readSupabaseJson(response);
  if (!response.ok) throw new Error(body?.message || "به‌روزرسانی کاربر انجام نشد");
  return Array.isArray(body) ? body[0] : body;
}

async function listAccessUsers(env) {
  const params = new URLSearchParams({
    select: "email,must_change_password,is_active,permissions,telegram_username,last_login_at_utc,created_at_utc",
    order: "created_at_utc.desc",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_users?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return [];
  return response.json();
}

async function insertAccessAuditLog(env, { actorEmail, targetEmail, action, oldValues = {}, newValues = {}, metadata = {} }) {
  const row = {
    actor_email: actorEmail ? normalizeEmail(actorEmail) : null,
    target_email: targetEmail ? normalizeEmail(targetEmail) : null,
    action,
    old_values: oldValues || {},
    new_values: newValues || {},
    metadata: metadata || {},
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_audit_logs`, {
    method: "POST",
    headers: supabaseHeaders(env),
    body: JSON.stringify(row),
  });
  if (!response.ok) {
    const body = await readSupabaseJson(response);
    console.error("access audit log failed", body?.message || response.status);
  }
}

async function listAccessAuditLogs(env) {
  const params = new URLSearchParams({
    select: "id,actor_email,target_email,action,old_values,new_values,metadata,created_at_utc",
    order: "created_at_utc.desc",
    limit: "200",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_audit_logs?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return [];
  return response.json();
}

async function handleSetPassword(request, env, user) {
  if (!user) return redirect("/");
  if (request.method !== "POST") return text(passwordPageHtml(), 200, "text/html; charset=utf-8");
  const form = await request.formData();
  const currentPassword = String(form.get("current_password") || "");
  const newPassword = String(form.get("new_password") || "");
  const newPasswordConfirm = String(form.get("new_password_confirm") || "");
  const rawTelegramUsername = String(form.get("telegram_username") || "").trim();
  if (!validTelegramUsername(rawTelegramUsername)) {
    return text(passwordPageHtml("یوزرنیم تلگرام باید بعد از @ با حرف انگلیسی شروع شود، ۵ تا ۳۲ کاراکتر باشد و فقط شامل حروف انگلیسی، عدد و _ باشد.", rawTelegramUsername), 400, "text/html; charset=utf-8");
  }
  const telegramUsername = normalizeTelegramUsername(rawTelegramUsername);
  if (!await verifyUserPassword(user, currentPassword)) {
    return text(passwordPageHtml("پسورد فعلی درست نیست.", telegramUsername), 401, "text/html; charset=utf-8");
  }
  if (newPassword !== newPasswordConfirm) {
    return text(passwordPageHtml("پسورد جدید و تکرار آن یکسان نیستند.", telegramUsername), 400, "text/html; charset=utf-8");
  }
  if (!strongPassword(newPassword)) {
    return text(passwordPageHtml("پسورد باید حداقل ۱۰ کاراکتر و شامل حروف بزرگ، حروف کوچک، عدد و علامت باشد.", telegramUsername), 400, "text/html; charset=utf-8");
  }
  const salt = randomHex();
  await patchAccessUser(env, user.email, {
    password_salt: salt,
    password_hash: await hashPassword(newPassword, salt),
    must_change_password: false,
    telegram_username: telegramUsername,
    updated_at_utc: new Date().toISOString(),
  });
  await insertAccessAuditLog(env, {
    actorEmail: user.email,
    targetEmail: user.email,
    action: "password_change",
    oldValues: { must_change_password: user.must_change_password },
    newValues: { must_change_password: false, telegram_username: telegramUsername },
  });
  return new Response(null, {
    status: 303,
    headers: secureHeaders({
      location: "/",
      "set-cookie": clearSessionCookie(),
    }),
  });
}

async function ensureSupabaseAuthMirrorUser(env, email) {
  const response = await fetch(`${env.SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: supabaseAuthAdminHeaders(env),
    body: JSON.stringify({
      email,
      password: `${randomHex(24)}Aa1!`,
      email_confirm: true,
      user_metadata: { visibility_access: true },
    }),
  });
  if (response.ok) return;
  const body = await readSupabaseJson(response);
  const message = String(body?.msg || body?.message || body?.error_description || "");
  if (response.status === 400 || response.status === 422) {
    if (/already|registered|exists|duplicate/i.test(message)) return;
  }
  throw new Error(message || "ساخت mirror کاربر در Supabase Auth انجام نشد");
}

async function sendSupabaseRecoveryEmail(env, email, redirectTo) {
  const key = supabasePublishableKey(env);
  if (!key) throw new Error("SUPABASE_PUBLISHABLE_KEY روی Worker تنظیم نشده است");
  const url = new URL(`${env.SUPABASE_URL}/auth/v1/recover`);
  url.searchParams.set("redirect_to", redirectTo);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: supabaseAuthPublicHeaders(env),
    body: JSON.stringify({ email }),
  });
  if (response.ok) return;
  const body = await readSupabaseJson(response);
  const message = body?.msg || body?.message || body?.error_description || "ارسال ایمیل بازیابی انجام نشد";
  throw authEmailError(message, "ارسال ایمیل بازیابی انجام نشد");
}

async function sendSupabaseInviteEmail(env, email, redirectTo) {
  const url = new URL(`${env.SUPABASE_URL}/auth/v1/invite`);
  url.searchParams.set("redirect_to", redirectTo);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: supabaseAuthAdminHeaders(env),
    body: JSON.stringify({
      email,
      data: { visibility_access: true },
    }),
  });
  if (response.ok) return;
  const body = await readSupabaseJson(response);
  const message = body?.msg || body?.message || body?.error_description || "ارسال ایمیل دعوت انجام نشد";
  throw authEmailError(message, "ارسال ایمیل دعوت انجام نشد");
}

async function sendAccessInviteEmail(env, email, origin) {
  await sendSupabaseInviteEmail(env, email, `${origin}/recovery`);
}

async function getSupabaseRecoveryUser(env, accessToken) {
  const key = supabasePublishableKey(env);
  if (!key) throw new Error("SUPABASE_PUBLISHABLE_KEY روی Worker تنظیم نشده است");
  const response = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: key,
      authorization: `Bearer ${accessToken}`,
    },
  });
  const body = await readSupabaseJson(response);
  if (!response.ok || !body?.email) {
    throw new Error(body?.msg || body?.message || "لینک بازیابی نامعتبر یا منقضی شده است");
  }
  return body;
}

async function handleForgotPassword(request, env) {
  if (request.method !== "POST") return text(forgotPasswordHtml(), 200, "text/html; charset=utf-8");
  const form = await request.formData();
  const email = normalizeEmail(form.get("email"));
  if (!validAccessEmail(email)) {
    return text(forgotPasswordHtml({ error: "ایمیل باید به شکل anything@toman.ir باشد.", email }), 400, "text/html; charset=utf-8");
  }
  const user = await getAccessUserByEmail(env, email);
  if (!user || (!user.is_active && !isAccessOwnerEmail(user.email))) {
    return text(forgotPasswordHtml({ error: "این ایمیل دسترسی فعال ندارد.", email }), 403, "text/html; charset=utf-8");
  }
  try {
    await ensureSupabaseAuthMirrorUser(env, email);
    await sendSupabaseRecoveryEmail(env, email, `${publicOrigin(request, env)}/recovery`);
    return text(forgotPasswordHtml({
      email,
      message: "ایمیل بازیابی ارسال شد. لطفاً inbox یا spam را بررسی کنید.",
    }), 200, "text/html; charset=utf-8");
  } catch (error) {
    return text(forgotPasswordHtml({ error: error.message || "ارسال ایمیل بازیابی انجام نشد", email }), error.status || 500, "text/html; charset=utf-8");
  }
}

async function handleRecoveryPassword(request, env) {
  if (request.method !== "POST") return text(recoveryPasswordHtml(), 200, "text/html; charset=utf-8");
  const form = await request.formData();
  const accessToken = String(form.get("access_token") || "");
  const newPassword = String(form.get("new_password") || "");
  const newPasswordConfirm = String(form.get("new_password_confirm") || "");
  if (!accessToken) return text(recoveryPasswordHtml("لینک بازیابی نامعتبر یا منقضی شده است."), 400, "text/html; charset=utf-8");
  if (newPassword !== newPasswordConfirm) {
    return text(recoveryPasswordHtml("پسورد جدید و تکرار آن یکسان نیستند.", accessToken), 400, "text/html; charset=utf-8");
  }
  if (!strongPassword(newPassword)) {
    return text(recoveryPasswordHtml("پسورد باید حداقل ۱۰ کاراکتر و شامل حروف بزرگ، حروف کوچک، عدد و علامت باشد.", accessToken), 400, "text/html; charset=utf-8");
  }
  try {
    const recoveryUser = await getSupabaseRecoveryUser(env, accessToken);
    const email = normalizeEmail(recoveryUser.email);
    const accessUser = await getAccessUserByEmail(env, email);
    if (!accessUser || (!accessUser.is_active && !isAccessOwnerEmail(accessUser.email))) {
      return text(recoveryPasswordHtml("این ایمیل دسترسی فعال ندارد.", accessToken), 403, "text/html; charset=utf-8");
    }
    const salt = randomHex();
    await patchAccessUser(env, email, {
      password_salt: salt,
      password_hash: await hashPassword(newPassword, salt),
      must_change_password: false,
      updated_at_utc: new Date().toISOString(),
    });
    await insertAccessAuditLog(env, {
      actorEmail: email,
      targetEmail: email,
      action: "password_recovery",
      oldValues: { must_change_password: accessUser.must_change_password },
      newValues: { must_change_password: false },
      metadata: { provider: "supabase_auth_recovery" },
    });
    return new Response(null, {
      status: 303,
      headers: secureHeaders({
        location: "/?recovered=1",
        "set-cookie": clearSessionCookie(),
      }),
    });
  } catch (error) {
    return text(recoveryPasswordHtml(error.message || "تغییر پسورد انجام نشد", accessToken), 400, "text/html; charset=utf-8");
  }
}

async function fetchCurrentUser(env, authUser) {
  return json({ user: await publicUserProfile(env, authUser) });
}

async function updateCurrentUserProfile(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const rawTelegramUsername = String(body.telegram_username || "").trim();
  if (!validTelegramUsername(rawTelegramUsername)) {
    return json({ error: "یوزرنیم تلگرام باید بعد از @ با حرف انگلیسی شروع شود، ۵ تا ۳۲ کاراکتر باشد و فقط شامل حروف انگلیسی، عدد و _ باشد." }, 400);
  }
  const telegramUsername = normalizeTelegramUsername(rawTelegramUsername);
  try {
    const user = await patchAccessUser(env, authUser.email, {
      telegram_username: telegramUsername,
      updated_at_utc: new Date().toISOString(),
    });
    return json({ user: await publicUserProfile(env, user) });
  } catch (error) {
    return json({ error: error.message || "ذخیره پروفایل انجام نشد" }, 500);
  }
}

async function fetchAccessUsers(env) {
  const users = await listAccessUsers(env);
  const profiles = await Promise.all(users.map((user) => publicUserProfile(env, user)));
  const profileByEmail = new Map(profiles.map((profile) => [normalizeEmail(profile.email), profile]));
  return json({
    users: users.map((user) => ({
      ...user,
      telegram_avatar_url: profileByEmail.get(normalizeEmail(user.email))?.telegram_avatar_url || "",
      is_owner: isAccessOwnerEmail(user.email),
      is_active: isAccessOwnerEmail(user.email) ? true : user.is_active,
      permissions: accessPermissionsForUser(user),
      group_access: groupAccessForUser(user),
    })),
  });
}

async function fetchAccessAuditLogs(env) {
  return json({ logs: await listAccessAuditLogs(env) });
}

async function fetchAccessGroups(env) {
  const params = new URLSearchParams({
    select: "platform,chat_id,chat_title,group_label,message_count,last_seen_at_utc",
    order: "chat_title.asc",
    limit: "1000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return json({ error: "درخواست گروه‌ها انجام نشد", detail: await response.text() }, 500);
  const groups = (await response.json())
    .filter((row) => row.chat_id && row.chat_title)
    .map((row) => ({
      key: chatKey(row),
      platform: normalizePlatform(row.platform),
      chat_id: row.chat_id,
      title: row.chat_title,
      group_label: row.group_label || "",
      message_count: Number(row.message_count || 0),
    }));
  return json({ groups });
}

async function addAccessUser(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const email = normalizeEmail(body.email);
  if (!validAccessEmail(email)) return json({ error: "ایمیل باید به شکل anything@toman.ir باشد" }, 400);
  const permissions = normalizeAccessPermissions(body.permissions);
  if (!permissions.length) return json({ error: "حداقل یک دسترسی باید انتخاب شود" }, 400);
  try {
    const existing = await getAccessUserByEmail(env, email);
    if (existing) return json({ error: "این ایمیل قبلاً اضافه شده است" }, 409);
    const user = await createAccessUser(env, email, permissions, body.group_access || {});
    let inviteEmailSent = false;
    let inviteEmailError = "";
    try {
      await sendAccessInviteEmail(env, user.email, publicOrigin(request, env));
      inviteEmailSent = true;
    } catch (error) {
      inviteEmailError = error.message || "ارسال ایمیل دعوت انجام نشد";
    }
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: user.email,
      action: "invite",
      newValues: {
        email: user.email,
        must_change_password: user.must_change_password,
        is_active: user.is_active,
        permissions: accessPermissionsForUser(user),
        group_access: groupAccessForUser(user),
      },
      metadata: {
        invite_email_sent: inviteEmailSent,
        invite_email_provider: "supabase_auth_invite",
        ...(inviteEmailError ? { invite_email_error: inviteEmailError } : {}),
      },
    });
    return json({
      user: { email: user.email, must_change_password: user.must_change_password },
      invite_email_sent: inviteEmailSent,
      ...(inviteEmailError ? { invite_email_error: inviteEmailError } : {}),
    }, 201);
  } catch (error) {
    return json({ error: error.message || "ساخت کاربر انجام نشد" }, 500);
  }
}

async function revokeAccessUser(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const email = normalizeEmail(body.email);
  if (!validAccessEmail(email)) return json({ error: "ایمیل نامعتبر است" }, 400);
  if (isAccessOwnerEmail(email)) return json({ error: "دسترسی مالک قابل لغو نیست" }, 400);
  if (email === normalizeEmail(authUser?.email)) return json({ error: "نمی‌توانید دسترسی اکانت فعلی خودتان را لغو کنید" }, 400);
  try {
    const existing = await getAccessUserByEmail(env, email);
    if (!existing) return json({ error: "کاربر پیدا نشد" }, 404);
    const user = await patchAccessUser(env, email, {
      is_active: false,
      updated_at_utc: new Date().toISOString(),
    });
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "revoke",
      oldValues: { is_active: existing.is_active },
      newValues: { is_active: user.is_active },
    });
    return json({ user: { email: user.email, is_active: user.is_active } });
  } catch (error) {
    return json({ error: error.message || "لغو دسترسی انجام نشد" }, 500);
  }
}

async function resendAccessInviteEmail(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const email = normalizeEmail(body.email);
  if (!validAccessEmail(email)) return json({ error: "ایمیل نامعتبر است" }, 400);
  try {
    const existing = await getAccessUserByEmail(env, email);
    if (!existing) return json({ error: "کاربر پیدا نشد" }, 404);
    await sendAccessInviteEmail(env, email, publicOrigin(request, env));
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "invite_email",
      metadata: {
        invite_email_sent: true,
        invite_email_provider: "supabase_auth_invite",
        resend: true,
        target_was_active: existing.is_active,
        target_must_change_password: existing.must_change_password,
        target_had_login: Boolean(existing.last_login_at_utc),
      },
    });
    return json({ email, invite_email_sent: true });
  } catch (error) {
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "invite_email",
      metadata: {
        invite_email_sent: false,
        invite_email_provider: "supabase_auth_invite",
        resend: true,
        invite_email_error: error.message || "ارسال ایمیل دعوت انجام نشد",
      },
    }).catch(() => {});
    return json({
      error: error.message || "ارسال دوباره ایمیل انجام نشد",
      ...(error.retry_after_seconds ? { retry_after_seconds: error.retry_after_seconds } : {}),
    }, error.status || 500);
  }
}

async function reactivateAccessUser(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const email = normalizeEmail(body.email);
  if (!validAccessEmail(email)) return json({ error: "ایمیل نامعتبر است" }, 400);
  try {
    const existing = await getAccessUserByEmail(env, email);
    if (!existing) return json({ error: "کاربر پیدا نشد" }, 404);
    const user = await patchAccessUser(env, email, {
      is_active: true,
      updated_at_utc: new Date().toISOString(),
    });
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "reactivate",
      oldValues: { is_active: existing.is_active },
      newValues: { is_active: user.is_active },
    });
    return json({ user: { email: user.email, is_active: user.is_active } });
  } catch (error) {
    return json({ error: error.message || "فعال‌سازی انجام نشد" }, 500);
  }
}

async function updateAccessUserPermissions(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const email = normalizeEmail(body.email);
  if (!validAccessEmail(email)) return json({ error: "ایمیل نامعتبر است" }, 400);
  if (isAccessOwnerEmail(email)) return json({ error: "دسترسی مالک قابل تغییر نیست" }, 400);
  const permissions = normalizeAccessPermissions(body.permissions);
  if (!permissions.length) return json({ error: "حداقل یک دسترسی باید انتخاب شود" }, 400);
  try {
    const existing = await getAccessUserByEmail(env, email);
    if (!existing) return json({ error: "کاربر پیدا نشد" }, 404);
    const groupAccess = Object.prototype.hasOwnProperty.call(body, "group_access")
      ? normalizeGroupAccess(body.group_access || {})
      : groupAccessForUser(existing);
    const user = await patchAccessUser(env, email, {
      permissions: accessPayload(permissions, groupAccess),
      updated_at_utc: new Date().toISOString(),
    });
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "permissions_update",
      oldValues: { permissions: accessPermissionsForUser(existing), group_access: groupAccessForUser(existing) },
      newValues: { permissions: accessPermissionsForUser(user), group_access: groupAccessForUser(user) },
    });
    return json({ user: { email: user.email, permissions: accessPermissionsForUser(user), group_access: groupAccessForUser(user) } });
  } catch (error) {
    return json({ error: error.message || "ذخیره دسترسی انجام نشد" }, 500);
  }
}

async function updateAccessUserGroupAccess(request, env, authUser) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const email = normalizeEmail(body.email);
  if (!validAccessEmail(email)) return json({ error: "ایمیل نامعتبر است" }, 400);
  if (isAccessOwnerEmail(email)) return json({ error: "دسترسی مالک قابل تغییر نیست" }, 400);
  const groupAccess = normalizeGroupAccess(body.group_access || {});
  try {
    const existing = await getAccessUserByEmail(env, email);
    if (!existing) return json({ error: "کاربر پیدا نشد" }, 404);
    const user = await patchAccessUser(env, email, {
      permissions: accessPayload(accessPermissionsForUser(existing), groupAccess),
      updated_at_utc: new Date().toISOString(),
    });
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "group_access_update",
      oldValues: { group_access: groupAccessForUser(existing) },
      newValues: { group_access: groupAccessForUser(user) },
    });
    return json({ user: { email: user.email, group_access: groupAccessForUser(user) } });
  } catch (error) {
    return json({ error: error.message || "ذخیره دسترسی گروه‌ها انجام نشد" }, 500);
  }
}

function findMessage(update) {
  for (const key of MESSAGE_KEYS) {
    if (update[key]) return { updateKind: key, message: update[key] };
  }
  return { updateKind: null, message: null };
}

function messageType(message) {
  if (message.text !== undefined) return "text";
  for (const key of MEDIA_KEYS) {
    if (message[key] !== undefined) return key;
  }
  for (const key of [
    "forum_topic_created",
    "forum_topic_edited",
    "forum_topic_closed",
    "forum_topic_reopened",
    "new_chat_members",
    "left_chat_member",
    "new_chat_title",
    "pinned_message",
  ]) {
    if (message[key] !== undefined) return key;
  }
  return "unknown";
}

function mediaFileId(message) {
  if (Array.isArray(message.photo) && message.photo.length) {
    return message.photo[message.photo.length - 1]?.file_id ?? null;
  }
  for (const key of ["video", "document", "voice", "audio", "video_note", "animation", "sticker"]) {
    if (message[key]?.file_id) return message[key].file_id;
  }
  return null;
}

function isoFromUnix(value) {
  return value ? new Date(value * 1000).toISOString() : null;
}

const TEHRAN_DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const TEHRAN_TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Tehran",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
const TEHRAN_JALALI_DATE_FORMATTER = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const TEHRAN_OFFSET_MS = 3.5 * 60 * 60 * 1000;

function partsMap(parts) {
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function tehranIsoDateFast(date) {
  return new Date(date.getTime() + TEHRAN_OFFSET_MS).toISOString().slice(0, 10);
}

function jalaliDateFast(date) {
  const jalaliMap = partsMap(TEHRAN_JALALI_DATE_FORMATTER.formatToParts(date));
  return `${jalaliMap.year}-${jalaliMap.month}-${jalaliMap.day}`;
}

function tehranParts(date) {
  const dateMap = partsMap(TEHRAN_DATE_FORMATTER.formatToParts(date));
  const timeMap = partsMap(TEHRAN_TIME_FORMATTER.formatToParts(date));
  return {
    sent_date: `${dateMap.year}-${dateMap.month}-${dateMap.day}`,
    sent_jalali_date: jalaliDateFast(date),
    sent_time: `${timeMap.hour}:${timeMap.minute}:${timeMap.second}`,
    display_timezone: "Asia/Tehran",
  };
}

function tehranDateTimeDisplay(date) {
  if (!date) return null;
  const parts = tehranParts(date);
  return `${parts.sent_date} ${parts.sent_time}`;
}

function tehranJalaliDateTimeDisplay(date) {
  if (!date) return null;
  const parts = tehranParts(date);
  return `${parts.sent_jalali_date} ${parts.sent_time}`;
}

function rowContent(row) {
  return row.body || row.caption || (row.message_type ? `[${row.message_type}]` : "");
}

function normalizeHashtagTerms(value) {
  return String(value || "")
    .split(/[,\s]+/)
    .map((item) => item.trim().replace(/^#+/, "").toLowerCase())
    .filter(Boolean);
}

function extractHashtags(value) {
  const tags = [];
  const pattern = /(^|[^\p{L}\p{N}_])#([\p{L}\p{N}_][\p{L}\p{N}_]*)/gu;
  for (const match of String(value || "").matchAll(pattern)) {
    tags.push(String(match[2] || "").toLowerCase());
  }
  return tags;
}

function rowHashtags(row) {
  return new Set([
    ...extractHashtags(row.body),
    ...extractHashtags(row.caption),
  ]);
}

function rowMatchesHashtags(row, hashtags) {
  if (!hashtags.length) return true;
  const existing = rowHashtags(row);
  return hashtags.some((tag) => existing.has(tag));
}

function withEditHistory(messages, historyRows = messages) {
  const byMessage = new Map();
  for (const row of historyRows) {
    if (!row.chat_id || !row.message_id) continue;
    const key = messageKey(row);
    const list = byMessage.get(key) || [];
    list.push(row);
    byMessage.set(key, list);
  }
  for (const list of byMessage.values()) {
    list.sort((a, b) => {
      const aEdited = a.edited_at_utc ? Date.parse(a.edited_at_utc) : 0;
      const bEdited = b.edited_at_utc ? Date.parse(b.edited_at_utc) : 0;
      if (aEdited !== bEdited) return aEdited - bEdited;
      return Number(a.update_id || 0) - Number(b.update_id || 0);
    });
    const original = list.find((row) => !row.edited_at_utc) || list[0];
    const latestEdited = [...list].reverse().find((row) => row.edited_at_utc) || null;
    for (const row of messages.filter((message) => messageKey(message) === messageKey(original))) {
      row.original_message_content = rowContent(original);
      row.latest_edited_message_content = latestEdited ? rowContent(latestEdited) : null;
    }
  }
  return messages;
}

function withReactions(messages, reactionRows = []) {
  const byMessage = new Map();
  for (const reaction of reactionRows) {
    if (!reaction.chat_id || !reaction.message_id) continue;
    const key = messageKey(reaction);
    const list = byMessage.get(key) || [];
    list.push(reaction);
    byMessage.set(key, list);
  }
  return messages.map((message) => ({
    ...message,
    reactions: byMessage.get(messageKey(message)) || [],
  }));
}

function topicData(message) {
  const created = findTopicPayload(message, "forum_topic_created");
  const edited = findTopicPayload(message, "forum_topic_edited");
  return {
    messageThreadId: message.message_thread_id ?? null,
    isTopicMessage: message.is_topic_message ?? null,
    topicName: created?.name ?? edited?.name ?? null,
    topicIconColor: created?.icon_color ?? null,
    topicIconCustomEmojiId: created?.icon_custom_emoji_id ?? edited?.icon_custom_emoji_id ?? null,
  };
}

function topicNameFromPayload(payload) {
  return findTopicPayload(payload, "forum_topic_created")?.name || findTopicPayload(payload, "forum_topic_edited")?.name || null;
}

function isTopicRootReplyRow(row) {
  if (!row?.reply_to_message_id || !row?.message_thread_id) return false;
  return String(row.reply_to_message_id) === String(row.message_thread_id);
}

function isTopicServiceMessageRow(row) {
  return String(row?.message_type || "").startsWith("forum_topic_");
}

function threadParentKey(row) {
  if (!row?.chat_id || !row?.reply_to_message_id || isTopicRootReplyRow(row)) return null;
  return messageKey(row, row.reply_to_message_id);
}

function latestRowScore(row) {
  return Date.parse(row?.edited_at_utc || row?.sent_at_utc || row?.received_at_utc || 0) || Number(row?.update_id || 0) || 0;
}

function latestMessageMap(rows) {
  const byKey = new Map();
  for (const row of rows) {
    if (!row?.chat_id || !row?.message_id) continue;
    const key = messageKey(row);
    const existing = byKey.get(key);
    if (!existing || latestRowScore(row) >= latestRowScore(existing)) byKey.set(key, row);
  }
  return byKey;
}

function threadRootKeyForRow(row, byKey) {
  let current = row;
  const seen = new Set();
  while (current) {
    const currentKey = messageKey(current);
    if (!currentKey || seen.has(currentKey)) return currentKey;
    seen.add(currentKey);
    const parentKey = threadParentKey(current);
    if (!parentKey) return currentKey;
    const parent = byKey.get(parentKey);
    if (parent && isTopicServiceMessageRow(parent)) return currentKey;
    if (!parent) return currentKey;
    current = parent;
  }
  return messageKey(row);
}

function filterRowsForThread(messages, threadTarget) {
  if (!threadTarget) return messages;
  const byKey = latestMessageMap(messages);
  const targetKey = messageKey({ platform: threadTarget.platform, chat_id: threadTarget.chatId }, threadTarget.messageId);
  const targetRow = byKey.get(targetKey);
  const rootKey = targetRow ? threadRootKeyForRow(targetRow, byKey) : targetKey;
  return messages.filter((row) => !isTopicServiceMessageRow(row) && (messageKey(row) === rootKey || threadRootKeyForRow(row, byKey) === rootKey));
}

async function fetchThreadRowsByTarget(env, headers, threadTarget) {
  const rowsByKey = new Map();
  const addRows = (batch) => {
    for (const row of batch) {
      const key = messageKey(row);
      if (key) rowsByKey.set(key, row);
    }
  };
  async function fetchMessageId(messageId) {
    const params = new URLSearchParams();
    params.set("select", TELEGRAM_MESSAGE_SELECT);
    params.set("platform", `eq.${threadTarget.platform}`);
    params.set("chat_id", `eq.${threadTarget.chatId}`);
    params.set("message_id", `eq.${messageId}`);
    params.set("limit", "20");
    params.set("order", "sent_at_utc.desc.nullslast,update_id.desc");
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  }

  const targetRows = await fetchMessageId(threadTarget.messageId);
  addRows(targetRows);
  let rootMessageId = threadTarget.messageId;
  let current = targetRows[0] || null;
  for (let depth = 0; depth < 12 && current?.reply_to_message_id && !isTopicRootReplyRow(current); depth += 1) {
    const parentRows = await fetchMessageId(current.reply_to_message_id);
    if (!parentRows.length) break;
    addRows(parentRows);
    current = parentRows[0];
    if (isTopicServiceMessageRow(current)) break;
    rootMessageId = current.message_id || rootMessageId;
  }

  const seenMessageIds = new Set();
  let frontier = [rootMessageId];
  for (let depth = 0; depth < 12 && frontier.length; depth += 1) {
    const params = new URLSearchParams();
    params.set("select", TELEGRAM_MESSAGE_SELECT);
    params.set("platform", `eq.${threadTarget.platform}`);
    params.set("chat_id", `eq.${threadTarget.chatId}`);
    params.set("limit", "10000");
    params.set("order", "sent_at_utc.asc.nullslast,message_id.asc,update_id.asc");
    if (depth === 0) {
      params.set("or", `(message_id.eq.${rootMessageId},reply_to_message_id.eq.${rootMessageId})`);
    } else {
      params.set("reply_to_message_id", `in.(${frontier.join(",")})`);
    }
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers });
    if (!response.ok) throw new Error(await response.text());
    const batch = await response.json();
    addRows(batch);
    const next = [];
    for (const row of batch) {
      const messageId = String(row.message_id || "");
      if (!messageId || seenMessageIds.has(messageId)) continue;
      seenMessageIds.add(messageId);
      if (messageId !== String(rootMessageId)) next.push(messageId);
    }
    frontier = next;
  }
  return [...rowsByKey.values()];
}

function messageMatchesSearch(row, query) {
  const normalized = String(query || "").trim().toLowerCase();
  if (!normalized) return true;
  return [
    row.body,
    row.caption,
    row.chat_title,
    row.topic_name,
    row.sender_username,
  ].some((value) => String(value || "").toLowerCase().includes(normalized));
}

async function fetchRowsForGroupLabels(env, headers, labels, authUser, platforms = []) {
  const normalizedLabels = [...new Set(labels.map(normalizeGroupLabel).filter(Boolean))];
  if (!normalizedLabels.length) return [];

  const groupParams = new URLSearchParams();
  groupParams.set("select", "platform,chat_id,chat_title,group_label");
  groupParams.set("group_label", `in.(${normalizedLabels.join(",")})`);
  groupParams.set("limit", "10000");

  const groupResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${groupParams}`, { headers });
  if (!groupResponse.ok) throw new Error(await groupResponse.text());

  const selectedPlatforms = new Set(platforms);
  const groupAccess = groupAccessForUser(authUser);
  const groups = (await groupResponse.json())
    .filter((row) => groupRowAllowedByAccess(row, groupAccess))
    .filter((row) => !selectedPlatforms.size || selectedPlatforms.has(normalizePlatform(row.platform)));
  const groupsByKey = new Map(groups.map((row) => [chatKey(row), row]));
  const keys = [...groupsByKey.keys()].filter(Boolean);
  if (!keys.length) return [];

  const rows = [];
  for (let index = 0; index < keys.length; index += 20) {
    const chunk = keys.slice(index, index + 20);
    const params = new URLSearchParams();
    params.set("select", TELEGRAM_MESSAGE_SELECT);
    params.set("order", "sent_at_utc.desc.nullslast,id.desc");
    params.set("limit", "10000");
    params.set("or", `(${chunk.map((key) => {
      const [platform, chatId] = key.split(":");
      return `and(platform.eq.${normalizePlatform(platform)},chat_id.eq.${chatId})`;
    }).join(",")})`);
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers });
    if (!response.ok) throw new Error(await response.text());
    rows.push(...(await response.json()).map((row) => ({
      ...row,
      group_label: groupsByKey.get(chatKey(row))?.group_label || "",
    })));
  }
  return rows;
}

function enrichMessageRows(rows, topicByThread) {
  return rows.map((row) => {
    const date = row.sent_at_utc ? new Date(row.sent_at_utc) : null;
    const registeredDate = row.received_at_utc ? new Date(row.received_at_utc) : null;
    const mappedTopicName = row.message_thread_id
      ? topicByThread.get(topicThreadKey(row))
      : null;
    const payloadTopicName = topicNameFromPayload(row.raw_payload_json);
    const receiveDelaySeconds = date && registeredDate
      ? Math.max(0, Math.round((registeredDate.getTime() - date.getTime()) / 1000))
      : null;
    return {
      ...row,
      reply_to_message_id: row.reply_to_message_id ?? replyTargetFromPayload(row),
      topic_name: row.topic_name || mappedTopicName || payloadTopicName || null,
      ...(date ? tehranParts(date) : { sent_date: null, sent_jalali_date: null, sent_time: null, display_timezone: "Asia/Tehran" }),
      registered_tehran_datetime: tehranDateTimeDisplay(registeredDate),
      registered_jalali_datetime: tehranJalaliDateTimeDisplay(registeredDate),
      receive_delay_seconds: receiveDelaySeconds,
    };
  });
}

function embeddedReplyMessage(row) {
  const payload = row?.raw_payload_json || {};
  return payload.message?.reply_to_message
    || payload.edited_message?.reply_to_message
    || null;
}

function replyTargetFromPayload(row) {
  const payload = row?.raw_payload_json || {};
  const explicitTarget = Number(payload.reply_target_message_id);
  if (Number.isFinite(explicitTarget) && explicitTarget > 0) return explicitTarget;
  const embeddedTarget = Number(embeddedReplyMessage(row)?.message_id);
  if (Number.isFinite(embeddedTarget) && embeddedTarget > 0) return embeddedTarget;
  return null;
}

function mergeEmbeddedReplyFields(target, source) {
  if (!target || !source) return false;
  let changed = false;
  for (const field of [
    "reply_to_message_id",
    "message_thread_id",
    "is_topic_message",
    "topic_name",
    "topic_icon_color",
    "topic_icon_custom_emoji_id",
    "bot_id",
    "bot_username",
    "bot_name",
    "chat_title",
    "chat_username",
    "chat_type",
    "sender_id",
    "sender_username",
    "sender_first_name",
    "sender_last_name",
    "sender_is_bot",
    "body",
    "caption",
    "message_type",
    "sent_at_utc",
    "edited_at_utc",
    "media_file_id",
    "media_group_id",
    "raw_payload_json",
  ]) {
    if ((target[field] === null || target[field] === undefined || target[field] === "") && source[field] !== null && source[field] !== undefined && source[field] !== "") {
      target[field] = source[field];
      changed = true;
    }
  }
  return changed;
}

function rowFromEmbeddedReplyMessage(parentMessage, childRow) {
  if (!parentMessage?.message_id || !childRow?.chat_id) return null;
  const chat = parentMessage.chat || {};
  const sender = parentMessage.from || {};
  const senderChat = parentMessage.sender_chat || {};
  const sentAt = isoFromUnix(parentMessage.date) || childRow.sent_at_utc || new Date().toISOString();
  const editedAt = isoFromUnix(parentMessage.edit_date);
  const topic = topicData(parentMessage);
  return {
    platform: normalizePlatform(childRow.platform),
    bot_id: childRow.bot_id ?? null,
    bot_username: childRow.bot_username ?? null,
    bot_name: childRow.bot_name ?? null,
    update_id: childRow.update_id ? -Math.abs(Number(childRow.update_id)) : syntheticUpdateId(),
    message_id: parentMessage.message_id,
    chat_id: chat.id ?? childRow.chat_id ?? null,
    chat_title: chat.title ?? childRow.chat_title ?? null,
    chat_username: chat.username ?? childRow.chat_username ?? null,
    chat_type: chat.type ?? childRow.chat_type ?? null,
    message_thread_id: topic.messageThreadId ?? childRow.message_thread_id ?? null,
    is_topic_message: topic.isTopicMessage ?? childRow.is_topic_message ?? null,
    topic_name: topic.topicName ?? childRow.topic_name ?? null,
    topic_icon_color: topic.topicIconColor ?? childRow.topic_icon_color ?? null,
    topic_icon_custom_emoji_id: topic.topicIconCustomEmojiId ?? childRow.topic_icon_custom_emoji_id ?? null,
    sender_id: sender.id ?? null,
    sender_username: sender.username ?? null,
    sender_first_name: sender.first_name ?? null,
    sender_last_name: sender.last_name ?? null,
    sender_is_bot: sender.is_bot ?? null,
    sender_photo_file_id: null,
    sender_photo_file_unique_id: null,
    sender_chat_id: senderChat.id ?? null,
    sender_chat_title: senderChat.title ?? null,
    body: parentMessage.text ?? null,
    caption: parentMessage.caption ?? null,
    message_type: messageType(parentMessage),
    sent_at_utc: sentAt,
    sent_date: sentAt.slice(0, 10),
    sent_time: sentAt.slice(11, 19),
    edited_at_utc: editedAt,
    reply_to_message_id: parentMessage.reply_to_message?.message_id ?? null,
    forward_origin_json: parentMessage.forward_origin ?? null,
    entities_json: parentMessage.entities ?? parentMessage.caption_entities ?? null,
    media_file_id: mediaFileId(parentMessage),
    media_group_id: parentMessage.media_group_id ?? null,
    raw_payload_json: { embedded_reply_parent: true, message: parentMessage },
    received_at_utc: childRow.received_at_utc ?? new Date().toISOString(),
  };
}

function embeddedReplyAncestorRows(messages, topicByThread, knownRows = messages) {
  const knownKeys = new Set(messages.filter((row) => row.chat_id && row.message_id).map((row) => messageKey(row)));
  const byKey = latestMessageMap(knownRows);
  for (const [key, row] of latestMessageMap(messages)) byKey.set(key, row);
  const extras = [];
  const queue = [...messages];
  const processed = new Set();
  while (queue.length) {
    const childRow = queue.shift();
    const parentMessage = embeddedReplyMessage(childRow);
    const parentRow = rowFromEmbeddedReplyMessage(parentMessage, childRow);
    if (!parentRow) continue;
    const key = messageKey(parentRow);
    const relationKey = `${messageKey(childRow) || "unknown"}>${key}`;
    if (!key || processed.has(relationKey)) continue;
    processed.add(relationKey);
    const enrichedParent = enrichMessageRows([parentRow], topicByThread)[0];
    const existing = byKey.get(key);
    if (existing) {
      mergeEmbeddedReplyFields(existing, enrichedParent);
      queue.push(existing);
      continue;
    }
    if (knownKeys.has(key)) continue;
    knownKeys.add(key);
    byKey.set(key, enrichedParent);
    extras.push(enrichedParent);
    queue.push(enrichedParent);
  }
  return extras;
}

async function fetchMessageRowsByKeys(env, headers, keys) {
  const rows = [];
  const chunks = [];
  for (let index = 0; index < keys.length; index += 40) chunks.push(keys.slice(index, index + 40));
  for (const chunk of chunks) {
    const params = new URLSearchParams();
    params.set("select", TELEGRAM_MESSAGE_SELECT);
    params.set("order", "edited_at_utc.desc.nullslast,sent_at_utc.desc.nullslast,update_id.desc");
    params.set("limit", "10000");
    params.set("or", `(${chunk.map((key) => {
      const { platform, chatId, messageId } = parseMessageKey(key);
      return `and(platform.eq.${platform},chat_id.eq.${chatId},message_id.eq.${messageId})`;
    }).join(",")})`);
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers });
    if (!response.ok) throw new Error(await response.text());
    rows.push(...await response.json());
  }
  return rows;
}

async function withThreadAncestors(env, headers, messages, topicByThread) {
  const allRows = [...messages];
  const baseKeys = new Set(messages.filter((row) => row.chat_id && row.message_id).map((row) => messageKey(row)));
  for (const row of embeddedReplyAncestorRows(messages, topicByThread, allRows)) {
    const key = messageKey(row);
    if (key && !baseKeys.has(key)) {
      baseKeys.add(key);
      allRows.push(row);
    }
  }
  for (let depth = 0; depth < 12; depth += 1) {
    const latest = latestMessageMap(allRows);
    const missingParentKeys = [...new Set([...latest.values()]
      .map(threadParentKey)
      .filter((key) => key && !latest.has(key)))];
    if (!missingParentKeys.length) break;
    const parentRows = await fetchMessageRowsByKeys(env, headers, missingParentKeys);
    const newRows = enrichMessageRows(parentRows, topicByThread).filter((row) => {
      const key = messageKey(row);
      if (baseKeys.has(key)) return false;
      baseKeys.add(key);
      return true;
    });
    const embeddedRows = embeddedReplyAncestorRows(newRows, topicByThread, allRows).filter((row) => {
      const key = messageKey(row);
      if (!key || baseKeys.has(key)) return false;
      baseKeys.add(key);
      return true;
    });
    if (!newRows.length && !embeddedRows.length) break;
    allRows.push(...newRows, ...embeddedRows);
  }
  return allRows;
}

async function fetchMediaGroupRows(env, headers, groupKeys) {
  const rows = [];
  const chunks = [];
  for (let index = 0; index < groupKeys.length; index += 30) chunks.push(groupKeys.slice(index, index + 30));
  for (const chunk of chunks) {
    const params = new URLSearchParams();
    params.set("select", TELEGRAM_MESSAGE_SELECT);
    params.set("order", "sent_at_utc.asc.nullslast,message_id.asc");
    params.set("limit", "10000");
    params.set("or", `(${chunk.map((key) => {
      const { platform, chatId, mediaGroupId } = parseMediaGroupKey(key);
      return `and(platform.eq.${platform},chat_id.eq.${chatId},media_group_id.eq.${mediaGroupId})`;
    }).join(",")})`);
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers });
    if (!response.ok) throw new Error(await response.text());
    rows.push(...await response.json());
  }
  return rows;
}

async function withMediaGroupRows(env, headers, messages, topicByThread) {
  const keys = [...new Set(messages
    .filter((row) => row.chat_id && row.media_group_id)
    .map((row) => mediaGroupKey(row)))];
  if (!keys.length) return messages;
  const existingKeys = new Set(messages.filter((row) => row.chat_id && row.message_id).map((row) => messageKey(row)));
  const rows = await fetchMediaGroupRows(env, headers, keys);
  const extras = enrichMessageRows(rows, topicByThread).filter((row) => {
    const key = messageKey(row);
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });
  return extras.length ? [...messages, ...extras] : messages;
}

function mediaItemFromRow(row) {
  return {
    update_id: row.update_id,
    message_id: row.message_id,
    message_type: row.message_type,
    media_file_id: row.media_file_id,
    media_group_id: row.media_group_id,
    raw_payload_json: row.raw_payload_json,
  };
}

function aggregateMediaGroups(messages) {
  const groups = new Map();
  const passthrough = [];
  for (const row of messages) {
    if (!row.chat_id || !row.media_group_id) {
      passthrough.push(row);
      continue;
    }
    const key = mediaGroupKey(row);
    const list = groups.get(key) || [];
    list.push(row);
    groups.set(key, list);
  }
  const aggregated = [...passthrough];
  for (const list of groups.values()) {
    list.sort((a, b) => Number(a.message_id || 0) - Number(b.message_id || 0));
    const base = list.find((row) => row.body || row.caption) || list[0];
    const mediaItems = list
      .filter((row) => row.media_file_id)
      .map(mediaItemFromRow);
    const messageIds = list.map((row) => row.message_id).filter((value) => value != null);
    const reactions = list.flatMap((row) => Array.isArray(row.reactions) ? row.reactions : []);
    aggregated.push({
      ...base,
      media_items: mediaItems,
      album_message_ids: messageIds,
      album_update_ids: list.map((row) => row.update_id).filter((value) => value != null),
      reactions,
      media_file_id: base.media_file_id || mediaItems[0]?.media_file_id || null,
      message_type: mediaItems.length > 1 ? "media_group" : base.message_type,
    });
  }
  return aggregated.sort((a, b) => {
    const aTime = Date.parse(a.sent_at_utc || a.received_at_utc || 0);
    const bTime = Date.parse(b.sent_at_utc || b.received_at_utc || 0);
    if (aTime !== bTime) return bTime - aTime;
    return Number(b.message_id || 0) - Number(a.message_id || 0);
  });
}

function findTopicPayload(value, key) {
  if (!value || typeof value !== "object") return null;
  if (value[key]?.name) return value[key];
  for (const child of Array.isArray(value) ? value : Object.values(value)) {
    const found = findTopicPayload(child, key);
    if (found) return found;
  }
  return null;
}

function realTopicName(value) {
  const topicName = String(value || "").trim();
  return topicName && !/^#\d+$/.test(topicName) ? topicName : "";
}

function reactionType(reaction) {
  return reaction?.type || "unknown";
}

function reactionEmojiValue(reaction) {
  return reaction?.type === "emoji" ? reaction.emoji ?? null : null;
}

function customEmojiId(reaction) {
  return reaction?.type === "custom_emoji" ? reaction.custom_emoji_id ?? null : null;
}

async function deletePreviousReactions(env, reactionUpdate, platform = DEFAULT_PLATFORM) {
  const normalizedPlatform = normalizePlatform(platform);
  const chatId = reactionUpdate.chat?.id;
  const messageId = reactionUpdate.message_id;
  const userId = reactionUpdate.user?.id;
  const actorChatId = reactionUpdate.actor_chat?.id;
  if (!chatId || !messageId || (!userId && !actorChatId)) return;

  const params = new URLSearchParams();
  params.set("platform", platformQuery(normalizedPlatform));
  params.set("chat_id", `eq.${chatId}`);
  params.set("message_id", `eq.${messageId}`);
  if (userId) params.set("user_id", `eq.${userId}`);
  if (actorChatId) params.set("actor_chat_id", `eq.${actorChatId}`);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_message_reactions?${params}`, {
    method: "DELETE",
    headers: supabaseHeaders(env, "return=minimal"),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function handleMessageReaction(env, update, platform = DEFAULT_PLATFORM) {
  const normalizedPlatform = normalizePlatform(platform);
  const reactionUpdate = update.message_reaction;
  if (!reactionUpdate?.chat?.id || !reactionUpdate.message_id) {
    return json({ ok: true, ignored: "message_reaction" });
  }

  await deletePreviousReactions(env, reactionUpdate, normalizedPlatform);
  const newReactions = Array.isArray(reactionUpdate.new_reaction) ? reactionUpdate.new_reaction : [];
  if (!newReactions.length) return json({ ok: true, reaction: "removed" });

  const user = reactionUpdate.user ?? {};
  const actorChat = reactionUpdate.actor_chat ?? {};
  const userPhoto = user.id ? await fetchSenderProfilePhoto(env, normalizedPlatform, user.id) : {};
  const reactedAt = isoFromUnix(reactionUpdate.date);
  const rows = newReactions.map((reaction) => ({
    update_id: update.update_id,
    platform: normalizedPlatform,
    chat_id: reactionUpdate.chat.id,
    message_id: reactionUpdate.message_id,
    user_id: user.id ?? null,
    actor_chat_id: actorChat.id ?? null,
    reaction_type: reactionType(reaction),
    reaction_emoji: reactionEmojiValue(reaction),
    custom_emoji_id: customEmojiId(reaction),
    reaction_json: reaction,
    user_username: user.username ?? actorChat.username ?? null,
    user_first_name: user.first_name ?? actorChat.title ?? null,
    user_last_name: user.last_name ?? null,
    user_photo_file_id: userPhoto.sender_photo_file_id ?? null,
    user_photo_file_unique_id: userPhoto.sender_photo_file_unique_id ?? null,
    reacted_at_utc: reactedAt,
    raw_payload_json: update,
    updated_at_utc: new Date().toISOString(),
  }));

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_message_reactions`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=minimal"),
    body: JSON.stringify(rows),
  });
  if (!response.ok) return json({ ok: false, error: await response.text() }, 500);
  return json({ ok: true, reaction: true });
}

function isPrivateChat(message) {
  return message.chat?.type === "private";
}

function isBotCommand(message) {
  const text = message.text || message.caption || "";
  const entities = message.entities || message.caption_entities || [];
  return entities.some((entity) => entity.type === "bot_command" && entity.offset === 0) || text.trim().startsWith("/");
}

function botPlatformConfig(env, platform = DEFAULT_PLATFORM) {
  const normalizedPlatform = normalizePlatform(platform);
  if (normalizedPlatform === "bale") {
    return {
      platform: "bale",
      botId: env.BALE_BOT_ID || env.BALE_BOT_USERNAME || "bale_default",
      botUsername: env.BALE_BOT_USERNAME || "toman_accountmanagement_bot",
      botName: env.BALE_BOT_NAME || "بات بله",
      token: env.BALE_BOT_TOKEN,
      apiBase: "https://tapi.bale.ai",
      fileBase: "https://tapi.bale.ai/file",
      webhookPath: "/bale-webhook",
      secret: env.BALE_WEBHOOK_SECRET,
    };
  }
  return {
    platform: "telegram",
    botId: env.TELEGRAM_BOT_ID || env.TELEGRAM_BOT_USERNAME || "telegram_default",
    botUsername: env.TELEGRAM_BOT_USERNAME || null,
    botName: env.TELEGRAM_BOT_NAME || "بات تلگرام",
    token: env.TELEGRAM_BOT_TOKEN,
    apiBase: "https://api.telegram.org",
    fileBase: "https://api.telegram.org/file",
    webhookPath: "/telegram-webhook",
    secret: env.TELEGRAM_WEBHOOK_SECRET,
  };
}

function normalizeBotUsername(value) {
  const username = String(value || "").trim().replace(/^@+/, "");
  return username ? `@${username}` : null;
}

function botIdentity(config) {
  const username = normalizeBotUsername(config.botUsername);
  return {
    platform: normalizePlatform(config.platform),
    bot_id: String(config.botId || config.botUsername || `${config.platform}_default`).trim(),
    bot_username: username,
    bot_name: config.botName || username || platformLabel(config.platform),
  };
}

function botPlatformRuntimeConfig(platform, token, overrides = {}) {
  const normalizedPlatform = normalizePlatform(platform);
  const base = botPlatformConfig({}, normalizedPlatform);
  return {
    ...base,
    platform: normalizedPlatform,
    token,
    apiBase: overrides.apiBase || overrides.api_base || base.apiBase,
    fileBase: overrides.fileBase || overrides.file_base || base.fileBase,
    webhookPath: overrides.webhookPath || overrides.webhook_path || base.webhookPath,
    secret: overrides.secret || base.secret,
    botId: overrides.botId || overrides.bot_id || `${normalizedPlatform}_stored`,
    botUsername: overrides.botUsername || overrides.bot_username || null,
    botName: overrides.botName || overrides.bot_name || platformLabel(normalizedPlatform),
  };
}

async function upsertBot(env, config, update = null) {
  const bot = botIdentity(config);
  const now = new Date().toISOString();
  const updateDate = isoFromUnix(update?.message?.date || update?.edited_message?.date || update?.my_chat_member?.date) || now;
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_bots?on_conflict=platform,bot_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=merge-duplicates,return=minimal"),
    body: JSON.stringify({
      ...bot,
      webhook_path: config.webhookPath,
      is_active: true,
      last_seen_at_utc: updateDate,
      last_update_at_utc: updateDate,
      updated_at_utc: now,
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  return bot;
}

async function getStoredBot(env, platform, botId) {
  const params = new URLSearchParams({
    select: "platform,bot_id,bot_username,bot_name,webhook_path,is_active,credential_ciphertext,credential_iv,credential_last4,webhook_secret_hash,api_base,file_base",
    platform: `eq.${normalizePlatform(platform)}`,
    bot_id: `eq.${botId}`,
    limit: "1",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_bots?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  return rows[0] || null;
}

async function botApiWithToken(platform, token, method, payload = null) {
  const config = botPlatformRuntimeConfig(platform, token);
  const init = payload ? {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  } : {};
  const response = await fetch(`${config.apiBase}/bot${token}/${method}`, init);
  const body = await readSupabaseJson(response);
  if (!response.ok || body?.ok === false) {
    throw new Error(body?.description || body?.message || `${platformLabel(platform)} ${method} failed`);
  }
  return body;
}

async function setStoredBotWebhook(request, platform, token, botId, webhookSecret) {
  const origin = new URL(request.url).origin;
  const webhookUrl = new URL(`${origin}/bot-webhook/${normalizePlatform(platform)}/${encodeURIComponent(botId)}`);
  const normalizedPlatform = normalizePlatform(platform);
  if (normalizedPlatform === "telegram") {
    const payload = {
      url: webhookUrl.toString(),
      allowed_updates: TELEGRAM_ALLOWED_UPDATES,
      drop_pending_updates: false,
      secret_token: webhookSecret,
    };
    return botApiWithToken(normalizedPlatform, token, "setWebhook", payload);
  }
  if (normalizedPlatform === "bale") {
    webhookUrl.searchParams.set("secret", webhookSecret);
    return botApiWithToken(normalizedPlatform, token, "setWebhook", { url: webhookUrl.toString() });
  }
  throw new Error("این پلتفرم هنوز برای افزودن بات پشتیبانی نمی‌شود");
}

async function addBotFromDashboard(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const platform = normalizePlatform(body.platform);
  if (!["telegram", "bale"].includes(platform)) return json({ error: "فعلاً فقط تلگرام و بله پشتیبانی می‌شود" }, 400);
  const token = String(body.token || "").trim();
  if (token.length < 20) return json({ error: "توکن بات نامعتبر است" }, 400);
  const inputUsername = normalizeBotUsername(body.bot_username);
  const inputName = String(body.bot_name || "").trim();

  try {
    const me = await botApiWithToken(platform, token, "getMe");
    const result = me?.result || {};
    const botId = String(result.id || inputUsername || `${platform}_${randomHex(6)}`);
    const botUsername = normalizeBotUsername(result.username || inputUsername);
    const botName = inputName || result.first_name || result.name || botUsername || platformLabel(platform);
    const encrypted = await encryptBotCredential(env, token);
    const webhookSecret = randomHex(24);
    await setStoredBotWebhook(request, platform, token, botId, webhookSecret);
    const now = new Date().toISOString();
    const webhookPath = `/bot-webhook/${platform}/${encodeURIComponent(botId)}`;
    const row = {
      platform,
      bot_id: botId,
      bot_username: botUsername,
      bot_name: botName,
      webhook_path: webhookPath,
      webhook_secret_hash: await sha256Hex(webhookSecret),
      created_by_email: normalizeEmail(authUser.email),
      api_base: botPlatformConfig(env, platform).apiBase,
      file_base: botPlatformConfig(env, platform).fileBase,
      is_active: true,
      credential_updated_at_utc: now,
      updated_at_utc: now,
      ...encrypted,
    };
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_bots?on_conflict=platform,bot_id`, {
      method: "POST",
      headers: supabaseHeaders(env, "resolution=merge-duplicates,return=representation"),
      body: JSON.stringify(row),
    });
    const saved = await readSupabaseJson(response);
    if (!response.ok) throw new Error(saved?.message || "ذخیره بات انجام نشد");
    await insertAccessAuditLog(env, {
      actorEmail: authUser.email,
      targetEmail: authUser.email,
      action: "bot_create",
      newValues: { platform, bot_id: botId, bot_username: botUsername, bot_name: botName },
      metadata: { webhook_path: webhookPath, credential_last4: encrypted.credential_last4 },
    });
    return json({ bot: Array.isArray(saved) ? saved[0] : saved });
  } catch (error) {
    return json({ error: error.message || "ثبت بات انجام نشد" }, 400);
  }
}

async function handleStoredBotWebhook(request, env) {
  const url = new URL(request.url);
  const [, , platformPart, ...botIdParts] = url.pathname.split("/");
  const platform = normalizePlatform(platformPart);
  const botId = decodeURIComponent(botIdParts.join("/"));
  if (!botId) return text("not found", 404);
  const stored = await getStoredBot(env, platform, botId);
  if (!stored || !stored.is_active) return text("not found", 404);
  if (stored.webhook_secret_hash) {
    const incomingSecret = platform === "telegram"
      ? request.headers.get("x-telegram-bot-api-secret-token")
      : url.searchParams.get("secret");
    if (!incomingSecret || await sha256Hex(incomingSecret) !== stored.webhook_secret_hash) {
      return text("unauthorized", 401);
    }
  }
  const token = await decryptBotCredential(env, stored);
  if (!token) return text("credential missing", 503);
  const config = botPlatformRuntimeConfig(platform, token, {
    botId: stored.bot_id,
    botUsername: stored.bot_username,
    botName: stored.bot_name,
    apiBase: stored.api_base || undefined,
    fileBase: stored.file_base || undefined,
    webhookPath: stored.webhook_path,
  });
  return handleBotWebhookWithConfig(request, env, config);
}

async function sendBotMessage(env, platform, chatId, textValue, runtimeConfig = null, options = {}) {
  const config = runtimeConfig || botPlatformConfig(env, platform);
  if (!config.token || !chatId) return { ok: false, body: null, result: null, config };
  const payload = {
    chat_id: chatId,
    text: textValue,
    disable_notification: true,
  };
  if (options.replyToMessageId) {
    payload.reply_to_message_id = Number(options.replyToMessageId);
    payload.allow_sending_without_reply = false;
  }
  const response = await fetch(`${config.apiBase}/bot${config.token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await readSupabaseJson(response);
  return {
    ok: response.ok && body?.ok !== false,
    body,
    result: body?.result || null,
    config,
  };
}

function syntheticUpdateId() {
  return -Number(`${Date.now()}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`);
}

function outgoingBotMessageRow(apiMessage, sourceRow, runtimeConfig, textValue, replyToMessageId, metadata = {}) {
  if (!apiMessage?.message_id) return null;
  const platform = normalizePlatform(runtimeConfig?.platform || sourceRow?.platform);
  const bot = botIdentity({ ...runtimeConfig, platform });
  const chat = apiMessage.chat || {};
  const sender = apiMessage.from || {};
  const sentAt = isoFromUnix(apiMessage.date) || new Date().toISOString();
  const topic = topicData(apiMessage);
  const parsedReplyToMessageId = Number(replyToMessageId);
  const fallbackReplyToMessageId = Number.isFinite(parsedReplyToMessageId) && parsedReplyToMessageId > 0
    ? parsedReplyToMessageId
    : null;
  return {
    platform,
    bot_id: bot.bot_id,
    bot_username: bot.bot_username,
    bot_name: bot.bot_name,
    update_id: syntheticUpdateId(),
    message_id: apiMessage.message_id,
    chat_id: chat.id ?? sourceRow?.chat_id ?? null,
    chat_title: chat.title ?? sourceRow?.chat_title ?? null,
    chat_username: chat.username ?? sourceRow?.chat_username ?? null,
    chat_type: chat.type ?? sourceRow?.chat_type ?? null,
    message_thread_id: topic.messageThreadId ?? sourceRow?.message_thread_id ?? null,
    is_topic_message: topic.isTopicMessage ?? sourceRow?.is_topic_message ?? null,
    topic_name: topic.topicName ?? sourceRow?.topic_name ?? null,
    topic_icon_color: topic.topicIconColor ?? sourceRow?.topic_icon_color ?? null,
    topic_icon_custom_emoji_id: topic.topicIconCustomEmojiId ?? sourceRow?.topic_icon_custom_emoji_id ?? null,
    sender_id: sender.id ?? (Number.isFinite(Number(bot.bot_id)) ? Number(bot.bot_id) : null),
    sender_username: sender.username ?? (bot.bot_username ? bot.bot_username.replace(/^@/, "") : null),
    sender_first_name: sender.first_name ?? bot.bot_name ?? null,
    sender_last_name: sender.last_name ?? null,
    sender_is_bot: true,
    sender_photo_file_id: null,
    sender_photo_file_unique_id: null,
    sender_chat_id: null,
    sender_chat_title: null,
    body: apiMessage.text ?? textValue,
    caption: apiMessage.caption ?? null,
    message_type: messageType(apiMessage),
    sent_at_utc: sentAt,
    sent_date: sentAt.slice(0, 10),
    sent_time: sentAt.slice(11, 19),
    edited_at_utc: isoFromUnix(apiMessage.edit_date),
    reply_to_message_id: apiMessage.reply_to_message?.message_id ?? fallbackReplyToMessageId,
    forward_origin_json: apiMessage.forward_origin ?? null,
    entities_json: apiMessage.entities ?? apiMessage.caption_entities ?? null,
    media_file_id: mediaFileId(apiMessage),
    media_group_id: apiMessage.media_group_id ?? null,
    raw_payload_json: {
      dashboard_outgoing: true,
      ...metadata,
      reply_target_message_id: fallbackReplyToMessageId,
      reply_target_key: fallbackReplyToMessageId ? messageKey(sourceRow, fallbackReplyToMessageId) : null,
      message: apiMessage,
    },
    received_at_utc: new Date().toISOString(),
  };
}

async function persistOutgoingBotMessage(env, apiMessage, sourceRow, runtimeConfig, textValue, replyToMessageId, metadata = {}) {
  const row = outgoingBotMessageRow(apiMessage, sourceRow, runtimeConfig, textValue, replyToMessageId, metadata);
  if (!row) return null;
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?on_conflict=platform,update_id,message_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=ignore-duplicates,return=representation"),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
  const saved = await response.json();
  return Array.isArray(saved) ? saved[0] : saved;
}

async function runtimeConfigForMessageBot(env, row) {
  const platform = normalizePlatform(row?.platform);
  const botId = String(row?.bot_id || "").trim();
  const defaultConfig = botPlatformConfig(env, platform);
  if (!botId || botId === defaultConfig.botId || botId === `${platform}_default`) return defaultConfig;
  try {
    const stored = await getStoredBot(env, platform, botId);
    if (!stored || !stored.is_active) return defaultConfig;
    const token = await decryptBotCredential(env, stored);
    if (!token) return defaultConfig;
    return botPlatformRuntimeConfig(platform, token, {
      botId: stored.bot_id,
      botUsername: stored.bot_username,
      botName: stored.bot_name,
      apiBase: stored.api_base || undefined,
      fileBase: stored.file_base || undefined,
      webhookPath: stored.webhook_path,
    });
  } catch {
    return defaultConfig;
  }
}

async function fetchSenderProfilePhoto(env, platform, senderId, runtimeConfig = null) {
  const config = runtimeConfig || botPlatformConfig(env, platform);
  if (config.platform !== "telegram" || !config.token || !senderId) return {};
  try {
    const url = new URL(`${config.apiBase}/bot${config.token}/getUserProfilePhotos`);
    url.searchParams.set("user_id", senderId);
    url.searchParams.set("limit", "1");
    const response = await fetch(url, { signal: AbortSignal.timeout(2500) });
    if (!response.ok) return {};
    const data = await response.json();
    const sizes = data?.result?.photos?.[0];
    if (!Array.isArray(sizes) || !sizes.length) return {};
    const smallest = [...sizes].sort((a, b) => Number(a.file_size || 0) - Number(b.file_size || 0))[0];
    return {
      sender_photo_file_id: smallest?.file_id ?? null,
      sender_photo_file_unique_id: smallest?.file_unique_id ?? null,
    };
  } catch {
    return {};
  }
}

async function fetchTelegramProfilePhoto(request, env, authUser) {
  const url = new URL(request.url);
  const platform = normalizePlatform(url.searchParams.get("platform"));
  const botId = url.searchParams.get("bot_id");
  let token = env.TELEGRAM_BOT_TOKEN;
  let apiBase = "https://api.telegram.org";
  let fileBase = "https://api.telegram.org/file";
  if (botId && botId !== "telegram_default") {
    const stored = await getStoredBot(env, platform, botId);
    token = await decryptBotCredential(env, stored);
    apiBase = stored?.api_base || botPlatformConfig(env, platform).apiBase;
    fileBase = stored?.file_base || botPlatformConfig(env, platform).fileBase;
  }
  if (!token) return text("توکن تلگرام تنظیم نشده است", 503);
  const fileId = url.searchParams.get("file_id");
  if (!fileId) return text("شناسه فایل ارسال نشده است", 400);
  if (!await canAccessFileReference(env, authUser, "sender_photo_file_id", fileId, platform)) {
    return forbiddenAccess();
  }

  const fileResponse = await fetch(`${apiBase}/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`);
  if (!fileResponse.ok) return text("دریافت اطلاعات عکس پروفایل انجام نشد", 502);
  const fileData = await fileResponse.json();
  const filePath = fileData?.result?.file_path;
  if (!filePath) return text("عکس پروفایل پیدا نشد", 404);

  const imageResponse = await fetch(`${fileBase}/bot${token}/${filePath}`);
  if (!imageResponse.ok || !imageResponse.body) return text("دریافت عکس پروفایل انجام نشد", 502);
  return new Response(imageResponse.body, {
    status: 200,
    headers: secureHeaders({
      "content-type": imageResponse.headers.get("content-type") || "image/jpeg",
      "cache-control": "private, max-age=86400",
    }),
  });
}

function contentTypeFromPath(filePath, fallback = "application/octet-stream") {
  const lower = String(filePath || "").toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".pdf")) return "application/pdf";
  return fallback;
}

async function canAccessFileReference(env, authUser, column, fileId, platform) {
  if (groupAccessForUser(authUser).unrestricted) return true;
  if (!fileId || !["media_file_id", "sender_photo_file_id"].includes(column)) return false;
  const params = new URLSearchParams({
    select: "platform,chat_id",
    [column]: `eq.${fileId}`,
    limit: "100",
  });
  if (platform) params.set("platform", `eq.${normalizePlatform(platform)}`);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return false;
  const allowedSet = await allowedChatKeySet(env, authUser);
  return (await response.json()).some((row) => rowAllowedByChatSet(row, allowedSet));
}

async function fetchBotFile(request, env, authUser) {
  const url = new URL(request.url);
  const platform = normalizePlatform(url.searchParams.get("platform"));
  const botId = url.searchParams.get("bot_id");
  let config = botPlatformConfig(env, platform);
  if (botId && botId !== `${platform}_default`) {
    const stored = await getStoredBot(env, platform, botId);
    const token = await decryptBotCredential(env, stored);
    config = botPlatformRuntimeConfig(platform, token, {
      botId: stored?.bot_id,
      botUsername: stored?.bot_username,
      botName: stored?.bot_name,
      apiBase: stored?.api_base || undefined,
      fileBase: stored?.file_base || undefined,
    });
  }
  if (!config.token) return text(`توکن ${platformLabel(platform)} تنظیم نشده است`, 503);
  const fileId = url.searchParams.get("file_id");
  if (!fileId) return text("شناسه فایل ارسال نشده است", 400);
  if (!await canAccessFileReference(env, authUser, "media_file_id", fileId, platform)) {
    return forbiddenAccess();
  }

  const fileResponse = await fetch(`${config.apiBase}/bot${config.token}/getFile?file_id=${encodeURIComponent(fileId)}`);
  if (!fileResponse.ok) return text("دریافت اطلاعات فایل انجام نشد", 502);
  const fileData = await fileResponse.json();
  const filePath = fileData?.result?.file_path;
  if (!filePath) return text("فایل پیدا نشد", 404);

  const fileDownloadResponse = await fetch(`${config.fileBase}/bot${config.token}/${filePath}`);
  if (!fileDownloadResponse.ok || !fileDownloadResponse.body) return text("دریافت فایل انجام نشد", 502);
  const telegramType = fileDownloadResponse.headers.get("content-type") || "";
  const headers = new Headers(secureHeaders({
    "content-type": telegramType.startsWith("application/octet-stream") ? contentTypeFromPath(filePath, telegramType) : (telegramType || contentTypeFromPath(filePath)),
    "cache-control": "private, max-age=86400",
  }));
  if (url.searchParams.get("download") === "1") {
    const filename = filePath.split("/").pop() || "telegram-file";
    headers.set("content-disposition", `attachment; filename="${filename.replace(/"/g, "")}"`);
  }
  return new Response(fileDownloadResponse.body, { status: 200, headers });
}

async function rejectPrivateUser(env, platform, message, runtimeConfig = null) {
  try {
    await sendBotMessage(env, platform, message.chat?.id, "مجاز به ادامه عملیات نیستید.", runtimeConfig);
  } catch {
    return false;
  }
  return true;
}

function activeMemberStatus(status) {
  return ["member", "administrator", "creator"].includes(status);
}

function leftMemberStatus(status) {
  return ["left", "kicked"].includes(status);
}

async function insertChat(env, row) {
  if (!row.chat_id) return;
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_chats?on_conflict=platform,chat_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=ignore-duplicates,return=minimal"),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function patchChat(env, chatId, row) {
  if (!chatId) return;
  const platform = normalizePlatform(row.platform);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_chats?platform=eq.${platform}&chat_id=eq.${chatId}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=minimal"),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function upsertChatFromMessage(env, platform, message, update, bot = {}) {
  const normalizedPlatform = normalizePlatform(platform);
  const chat = message.chat ?? {};
  if (!chat.id) return;
  const now = new Date().toISOString();
  const seenAt = isoFromUnix(message.date) || now;
  await insertChat(env, {
    platform: normalizedPlatform,
    bot_id: bot.bot_id ?? null,
    bot_username: bot.bot_username ?? null,
    bot_name: bot.bot_name ?? null,
    chat_id: chat.id,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    joined_at_utc: seenAt,
    first_seen_at_utc: seenAt,
    last_seen_at_utc: seenAt,
    raw_payload_json: update,
    updated_at_utc: now,
  });
  await patchChat(env, chat.id, {
    platform: normalizedPlatform,
    bot_id: bot.bot_id ?? null,
    bot_username: bot.bot_username ?? null,
    bot_name: bot.bot_name ?? null,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    last_seen_at_utc: seenAt,
    raw_payload_json: update,
    updated_at_utc: now,
  });
}

async function upsertChatFromMembership(env, platform, update, bot = {}) {
  const normalizedPlatform = normalizePlatform(platform);
  const membership = update.my_chat_member;
  if (!membership?.chat?.id) return false;

  const chat = membership.chat;
  const joinedAt = isoFromUnix(membership.date) || new Date().toISOString();
  const oldStatus = membership.old_chat_member?.status;
  const newStatus = membership.new_chat_member?.status;
  const isJoinEvent = leftMemberStatus(oldStatus) && activeMemberStatus(newStatus);
  const now = new Date().toISOString();

  await insertChat(env, {
    platform: normalizedPlatform,
    bot_id: bot.bot_id ?? null,
    bot_username: bot.bot_username ?? null,
    bot_name: bot.bot_name ?? null,
    chat_id: chat.id,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    joined_at_utc: isJoinEvent ? joinedAt : null,
    first_seen_at_utc: joinedAt,
    last_seen_at_utc: joinedAt,
    raw_payload_json: update,
    updated_at_utc: now,
  });

  const patch = {
    platform: normalizedPlatform,
    bot_id: bot.bot_id ?? null,
    bot_username: bot.bot_username ?? null,
    bot_name: bot.bot_name ?? null,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    last_seen_at_utc: joinedAt,
    raw_payload_json: update,
    updated_at_utc: now,
  };
  if (isJoinEvent) patch.joined_at_utc = joinedAt;
  await patchChat(env, chat.id, patch);
  return true;
}

async function upsertTopic(env, platform, message, update, bot = {}) {
  const normalizedPlatform = normalizePlatform(platform);
  const chat = message.chat ?? {};
  const topic = topicData(message);
  if (!chat.id || !topic.messageThreadId || !topic.topicName) return;

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_topics?on_conflict=platform,chat_id,message_thread_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=merge-duplicates,return=minimal"),
    body: JSON.stringify({
      platform: normalizedPlatform,
      bot_id: bot.bot_id ?? null,
      bot_username: bot.bot_username ?? null,
      bot_name: bot.bot_name ?? null,
      chat_id: chat.id,
      message_thread_id: topic.messageThreadId,
      topic_name: topic.topicName,
      icon_color: topic.topicIconColor,
      icon_custom_emoji_id: topic.topicIconCustomEmojiId,
      raw_payload_json: update,
      updated_at_utc: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error(await response.text());
}

const TELEGRAM_ALLOWED_UPDATES = ["message", "edited_message", "channel_post", "edited_channel_post", "message_reaction", "message_reaction_count", "my_chat_member"];

async function botApi(env, platform, method, payload = null) {
  const config = botPlatformConfig(env, platform);
  if (!config.token) throw new Error(`${platformLabel(config.platform)} token is not configured`);
  const init = payload ? {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  } : {};
  const response = await fetch(`${config.apiBase}/bot${config.token}/${method}`, init);
  const body = await readSupabaseJson(response);
  if (!response.ok || body?.ok === false) {
    throw new Error(body?.description || body?.message || `${platformLabel(config.platform)} ${method} failed`);
  }
  return body;
}

async function fetchTelegramWebhookInfo(env) {
  try {
    const body = await botApi(env, "telegram", "getWebhookInfo");
    return json({ webhook: body.result || body });
  } catch (error) {
    return json({ error: error.message || "دریافت وضعیت webhook انجام نشد" }, 500);
  }
}

async function fetchBaleWebhookInfo(env) {
  try {
    const body = await botApi(env, "bale", "getWebhookInfo");
    return json({ webhook: body.result || body });
  } catch (error) {
    return json({ error: error.message || "دریافت وضعیت webhook بله انجام نشد" }, 500);
  }
}

async function resetTelegramWebhook(request, env) {
  try {
    const origin = new URL(request.url).origin;
    const payload = {
      url: `${origin}/telegram-webhook`,
      allowed_updates: TELEGRAM_ALLOWED_UPDATES,
      drop_pending_updates: false,
    };
    if (env.TELEGRAM_WEBHOOK_SECRET) payload.secret_token = env.TELEGRAM_WEBHOOK_SECRET;
    const body = await botApi(env, "telegram", "setWebhook", payload);
    const info = await botApi(env, "telegram", "getWebhookInfo");
    return json({ ok: true, result: body.result, webhook: info.result || info });
  } catch (error) {
    return json({ error: error.message || "ریست وبهوک انجام نشد" }, 500);
  }
}

async function resetBaleWebhook(request, env) {
  try {
    const origin = new URL(request.url).origin;
    const webhookUrl = new URL(`${origin}/bale-webhook`);
    if (env.BALE_WEBHOOK_SECRET) webhookUrl.searchParams.set("secret", env.BALE_WEBHOOK_SECRET);
    const body = await botApi(env, "bale", "setWebhook", { url: webhookUrl.toString() });
    const info = await botApi(env, "bale", "getWebhookInfo");
    return json({ ok: true, result: body.result, webhook: info.result || info });
  } catch (error) {
    return json({ error: error.message || "ریست وبهوک بله انجام نشد" }, 500);
  }
}

async function handleBotWebhookWithConfig(request, env, config) {
  const normalizedPlatform = normalizePlatform(config.platform);
  if (request.method !== "POST") return text("ok");
  const url = new URL(request.url);
  if (normalizedPlatform === "telegram" && config.secret && request.headers.get("x-telegram-bot-api-secret-token") !== config.secret) {
    return text("unauthorized", 401);
  }
  if (normalizedPlatform === "bale" && config.secret && url.searchParams.get("secret") !== config.secret) {
    return text("unauthorized", 401);
  }

  const update = await request.json();
  const bot = await upsertBot(env, config, update);
  if (update.message_reaction) return handleMessageReaction(env, update, normalizedPlatform);
  if (update.message_reaction_count) return json({ ok: true, ignored: "message_reaction_count" });

  if (update.my_chat_member && await upsertChatFromMembership(env, normalizedPlatform, update, bot)) {
    return json({ ok: true, membership: true });
  }

  const { message } = findMessage(update);
  if (!message) return json({ ok: true, ignored: true });

  if (isPrivateChat(message)) {
    await rejectPrivateUser(env, normalizedPlatform, message, config);
    return json({ ok: true, rejected: "private_chat" });
  }
  if (isBotCommand(message)) {
    return json({ ok: true, ignored: "bot_command" });
  }

  await upsertChatFromMessage(env, normalizedPlatform, message, update, bot);
  await upsertTopic(env, normalizedPlatform, message, update, bot);

  const chat = message.chat ?? {};
  const sender = message.from ?? {};
  const senderChat = message.sender_chat ?? {};
  const sentAt = isoFromUnix(message.date);
  const editedAt = isoFromUnix(message.edit_date);
  const topic = topicData(message);
  const senderPhoto = await fetchSenderProfilePhoto(env, normalizedPlatform, sender.id, config);

  const row = {
    platform: normalizedPlatform,
    bot_id: bot.bot_id,
    bot_username: bot.bot_username,
    bot_name: bot.bot_name,
    update_id: update.update_id,
    message_id: message.message_id ?? null,
    chat_id: chat.id ?? null,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    message_thread_id: topic.messageThreadId,
    is_topic_message: topic.isTopicMessage,
    topic_name: topic.topicName,
    topic_icon_color: topic.topicIconColor,
    topic_icon_custom_emoji_id: topic.topicIconCustomEmojiId,
    sender_id: sender.id ?? null,
    sender_username: sender.username ?? null,
    sender_first_name: sender.first_name ?? null,
    sender_last_name: sender.last_name ?? null,
    sender_is_bot: sender.is_bot ?? null,
    sender_photo_file_id: senderPhoto.sender_photo_file_id ?? null,
    sender_photo_file_unique_id: senderPhoto.sender_photo_file_unique_id ?? null,
    sender_chat_id: senderChat.id ?? null,
    sender_chat_title: senderChat.title ?? null,
    body: message.text ?? null,
    caption: message.caption ?? null,
    message_type: messageType(message),
    sent_at_utc: sentAt,
    sent_date: sentAt?.slice(0, 10) ?? null,
    sent_time: sentAt?.slice(11, 19) ?? null,
    edited_at_utc: editedAt,
    reply_to_message_id: message.reply_to_message?.message_id ?? null,
    forward_origin_json: message.forward_origin ?? null,
    entities_json: message.entities ?? message.caption_entities ?? null,
    media_file_id: mediaFileId(message),
    media_group_id: message.media_group_id ?? null,
    raw_payload_json: update,
  };

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?on_conflict=platform,update_id,message_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=ignore-duplicates,return=minimal"),
    body: JSON.stringify(row),
  });
  if (!response.ok) {
    return json({ ok: false, error: await response.text() }, 500);
  }
  return json({ ok: true });
}

async function handleBotWebhook(request, env, platform = DEFAULT_PLATFORM) {
  return handleBotWebhookWithConfig(request, env, botPlatformConfig(env, platform));
}

async function handleTelegramWebhook(request, env) {
  return handleBotWebhook(request, env, "telegram");
}

async function handleBaleWebhook(request, env) {
  return handleBotWebhook(request, env, "bale");
}

async function fetchMessages(request, env, authUser) {
  const url = new URL(request.url);
  const params = new URLSearchParams();
  params.set("select", TELEGRAM_MESSAGE_SELECT);
  params.set("order", "sent_at_utc.desc.nullslast,id.desc");
  params.set("limit", "500");

  const filters = [];
  const q = url.searchParams.get("q");
  const hashtags = [...new Set(url.searchParams.getAll("hashtag").flatMap(normalizeHashtagTerms))];
  const platforms = [...new Set(url.searchParams.getAll("platform").map(normalizePlatform).filter(Boolean))];
  const labels = url.searchParams.getAll("label").map(groupLabelValueFromText).filter(Boolean);
  const groups = url.searchParams.getAll("group").map((value) => value.trim()).filter(Boolean);
  const topicsFilter = url.searchParams.getAll("topic").map((value) => value.trim()).filter(Boolean);
  const jalaliDateFilter = url.searchParams.get("jalali_date");
  const chatId = url.searchParams.get("chat_id");
  const senderId = url.searchParams.get("sender_id");
  const view = url.searchParams.get("view");
  const threadTarget = parseThreadUuid(url.searchParams.get("thread_uuid"));
  if (url.searchParams.has("thread_uuid") && !threadTarget) {
    return json({ error: "شناسه ترد نامعتبر است" }, 400);
  }
  if (q) {
    const pattern = `*${q.replace(/[%*]/g, "")}*`;
    filters.push(`body.ilike.${pattern},caption.ilike.${pattern},chat_title.ilike.${pattern},topic_name.ilike.${pattern},sender_username.ilike.${pattern}`);
  }
  if (hashtags.length) {
    for (const hashtag of hashtags) {
      const pattern = `*#${hashtag.replace(/[%*]/g, "")}*`;
      filters.push(`body.ilike.${pattern},caption.ilike.${pattern}`);
    }
    params.set("limit", "2000");
  }
  if (filters.length) params.set("or", `(${filters.join(",")})`);
  if (platforms.length === 1) params.set("platform", `eq.${platforms[0]}`);
  else if (platforms.length > 1) params.set("platform", `in.(${platforms.join(",")})`);
  if (chatId) params.set("chat_id", `eq.${chatId}`);
  if (senderId) params.set("sender_id", `eq.${senderId}`);
  if (threadTarget) {
    params.set("platform", `eq.${threadTarget.platform}`);
    params.set("chat_id", `eq.${threadTarget.chatId}`);
    params.set("limit", "10000");
  }

  const headers = supabaseHeaders(env);
  let sourceRows = [];
  if (!threadTarget && !labels.length) {
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, {
      headers,
    });
    if (!response.ok) {
      return json({ error: "درخواست دیتابیس انجام نشد", detail: await response.text() }, 500);
    }
    sourceRows = await response.json();
  }

  const topicsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_topics?select=platform,chat_id,message_thread_id,topic_name&limit=10000`, {
    headers,
  });
  if (!topicsResponse.ok) {
    return json({ error: "درخواست تاپیک‌ها از دیتابیس انجام نشد", detail: await topicsResponse.text() }, 500);
  }

  const topics = await topicsResponse.json();
  const topicByThread = new Map(
    topics.map((topicRow) => [topicThreadKey(topicRow), topicRow.topic_name])
  );
  const allowedSet = await allowedChatKeySet(env, authUser);
  if (threadTarget) {
    try {
      sourceRows = await fetchThreadRowsByTarget(env, headers, threadTarget);
    } catch (error) {
      return json({ error: "درخواست ترد از دیتابیس انجام نشد", detail: String(error?.message || error) }, 500);
    }
  } else if (labels.length) {
    try {
      sourceRows = await fetchRowsForGroupLabels(env, headers, labels, authUser, platforms);
    } catch (error) {
      return json({ error: "درخواست پیام‌های لیبل از دیتابیس انجام نشد", detail: String(error?.message || error) }, 500);
    }
  }
  const rows = sourceRows.filter((row) => rowAllowedByChatSet(row, allowedSet));
  let messages = enrichMessageRows(rows, topicByThread);
  if (q && (labels.length || hashtags.length)) {
    messages = messages.filter((row) => messageMatchesSearch(row, q));
  }
  if (hashtags.length) {
    messages = messages.filter((row) => rowMatchesHashtags(row, hashtags));
  }
  if (topicsFilter.length) {
    const normalizedTopics = topicsFilter.map((value) => value.toLowerCase());
    messages = messages.filter((row) => normalizedTopics.includes(String(row.topic_name || "").toLowerCase()));
  }
  if (groups.length) {
    const normalizedGroups = groups.map((value) => value.toLowerCase());
    messages = messages.filter((row) => normalizedGroups.includes(String(row.chat_title || "").toLowerCase()));
  }
  if (labels.length) {
    messages = messages.filter((row) => labels.includes(String(row.group_label || "")));
  }
  if (jalaliDateFilter) {
    messages = messages.filter((row) => String(row.sent_jalali_date || "") === jalaliDateFilter);
  }
  if (view === "threads") {
    try {
      messages = await withThreadAncestors(env, headers, messages, topicByThread);
      if (threadTarget) messages = filterRowsForThread(messages, threadTarget);
    } catch (error) {
      return json({ error: "درخواست پیام‌های اصلی ترد از دیتابیس انجام نشد", detail: String(error?.message || error) }, 500);
    }
  }
  try {
    messages = await withMediaGroupRows(env, headers, messages, topicByThread);
  } catch (error) {
    return json({ error: "درخواست گروه رسانه از دیتابیس انجام نشد", detail: String(error?.message || error) }, 500);
  }
  let historyRows = messages;
  const editedKeys = [...new Set(
    messages
      .filter((row) => row.edited_at_utc && row.chat_id && row.message_id)
      .map((row) => messageKey(row))
  )];
  if (editedKeys.length) {
    const historyParams = new URLSearchParams();
    historyParams.set("select", "platform,update_id,message_id,chat_id,body,caption,message_type,edited_at_utc");
    historyParams.set("order", "edited_at_utc.asc.nullsfirst,update_id.asc");
    historyParams.set("limit", "10000");
    historyParams.set("or", `(${editedKeys.map((key) => {
      const { platform: keyPlatform, chatId: chatIdValue, messageId: messageIdValue } = parseMessageKey(key);
      return `and(platform.eq.${keyPlatform},chat_id.eq.${chatIdValue},message_id.eq.${messageIdValue})`;
    }).join(",")})`);
    const historyResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${historyParams}`, {
      headers,
    });
    if (historyResponse.ok) historyRows = await historyResponse.json();
  }
  let reactionRows = [];
  const reactionKeys = [...new Set(
    messages
      .filter((row) => row.chat_id && row.message_id)
      .map((row) => messageKey(row))
  )];
  if (reactionKeys.length) {
    const reactionParams = new URLSearchParams();
    reactionParams.set("select", [
      "platform",
      "chat_id",
      "message_id",
      "user_id",
      "actor_chat_id",
      "reaction_type",
      "reaction_emoji",
      "custom_emoji_id",
      "user_username",
      "user_first_name",
      "user_last_name",
      "user_photo_file_id",
      "user_photo_file_unique_id",
      "reacted_at_utc",
    ].join(","));
    reactionParams.set("limit", "10000");
    reactionParams.set("order", "reacted_at_utc.asc.nullslast,id.asc");
    reactionParams.set("or", `(${reactionKeys.map((key) => {
      const { platform: keyPlatform, chatId: chatIdValue, messageId: messageIdValue } = parseMessageKey(key);
      return `and(platform.eq.${keyPlatform},chat_id.eq.${chatIdValue},message_id.eq.${messageIdValue})`;
    }).join(",")})`);
    const reactionsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_message_reactions?${reactionParams}`, {
      headers,
    });
    if (reactionsResponse.ok) reactionRows = await reactionsResponse.json();
  }
  messages = aggregateMediaGroups(withReactions(withEditHistory(messages, historyRows), reactionRows)).map(messageRowForClient);
  return json({ messages });
}

async function fetchGroups(request, env, authUser) {
  const params = new URLSearchParams();
  params.set("select", "platform,bot_id,bot_username,bot_name,chat_id,chat_title,chat_username,chat_type,group_label,joined_at_utc,first_seen_at_utc,last_seen_at_utc,message_count,last_message_at_utc");
  params.set("order", "first_seen_at_utc.desc.nullslast,joined_at_utc.desc.nullslast,last_seen_at_utc.desc.nullslast");
  params.set("limit", "1000");

  const headers = supabaseHeaders(env);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${params}`, { headers });
  if (!response.ok) {
    return json({ error: "درخواست گروه‌ها از دیتابیس انجام نشد", detail: await response.text() }, 500);
  }

  const topicParams = new URLSearchParams();
  topicParams.set("select", "platform,chat_id,topic_name,message_thread_id");
  topicParams.set("limit", "10000");
  const topicsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_topics?${topicParams}`, { headers });
  if (!topicsResponse.ok) {
    return json({ error: "درخواست تاپیک‌ها از دیتابیس انجام نشد", detail: await topicsResponse.text() }, 500);
  }
  const topicsByChat = new Map();
  for (const topic of await topicsResponse.json()) {
    const topicName = realTopicName(topic.topic_name);
    if (!topic.chat_id || !topicName) continue;
    const list = topicsByChat.get(chatKey(topic)) || [];
    if (!list.includes(topicName)) list.push(topicName);
    topicsByChat.set(chatKey(topic), list);
  }

  const groupAccess = groupAccessForUser(authUser);
  const rows = (await response.json()).filter((row) => groupRowAllowedByAccess(row, groupAccess));
  const groups = rows.map((row) => {
    const joinedAt = row.joined_at_utc || row.first_seen_at_utc;
    const joined = joinedAt ? tehranParts(new Date(joinedAt)) : { sent_date: null, sent_time: null };
    const lastSeen = row.last_seen_at_utc ? tehranParts(new Date(row.last_seen_at_utc)) : { sent_date: null, sent_time: null };
    const lastMessage = row.last_message_at_utc ? tehranParts(new Date(row.last_message_at_utc)) : { sent_date: null, sent_time: null };
    return {
      ...row,
      topic_names: (topicsByChat.get(chatKey(row)) || []).join(", "),
      message_count: Number(row.message_count || 0),
      joined_date: joined.sent_date,
      joined_time: joined.sent_time,
      last_seen_date: lastSeen.sent_date,
      last_seen_time: lastSeen.sent_time,
      last_message_date: lastMessage.sent_date,
      last_message_time: lastMessage.sent_time,
      display_timezone: "Asia/Tehran",
    };
  });
  return json({ groups });
}

async function fetchSenders(request, env, authUser) {
  const headers = supabaseHeaders(env);
  const params = new URLSearchParams();
  params.set("select", [
    "platform",
    "update_id",
    "sender_id",
    "sender_username",
    "sender_first_name",
    "sender_last_name",
    "sender_is_bot",
    "sender_photo_file_id",
    "sender_photo_file_unique_id",
    "chat_id",
    "chat_title",
    "sent_at_utc",
    "received_at_utc",
  ].join(","));
  params.set("order", "sent_at_utc.desc.nullslast,received_at_utc.desc.nullslast,update_id.desc");
  params.set("limit", "10000");
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers });
  if (!response.ok) {
    return json({ error: "درخواست ارسال‌کننده‌ها از دیتابیس انجام نشد", detail: await response.text() }, 500);
  }

  const labelParams = new URLSearchParams();
  labelParams.set("select", "platform,sender_id,sender_label");
  labelParams.set("limit", "10000");
  const labelsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_sender_labels?${labelParams}`, { headers });
  if (!labelsResponse.ok) {
    return json({ error: "درخواست لیبل ارسال‌کننده‌ها انجام نشد", detail: await labelsResponse.text() }, 500);
  }

  const labelsBySender = new Map(
    (await labelsResponse.json()).map((row) => [`${normalizePlatform(row.platform)}:${row.sender_id}`, row.sender_label || ""])
  );
  const allowedSet = await allowedChatKeySet(env, authUser);
  const sendersByKey = new Map();
  for (const row of (await response.json()).filter((item) => rowAllowedByChatSet(item, allowedSet))) {
    if (row.sender_id === null || row.sender_id === undefined || row.sender_id === "") continue;
    const platform = normalizePlatform(row.platform);
    const senderId = String(row.sender_id);
    const key = `${platform}:${senderId}`;
    const sentAt = row.sent_at_utc || row.received_at_utc || null;
    const existing = sendersByKey.get(key);
    if (!existing) {
      sendersByKey.set(key, {
        platform,
        sender_id: senderId,
        sender_username: row.sender_username || "",
        sender_first_name: row.sender_first_name || "",
        sender_last_name: row.sender_last_name || "",
        sender_is_bot: row.sender_is_bot,
        sender_photo_file_id: row.sender_photo_file_id || "",
        sender_photo_file_unique_id: row.sender_photo_file_unique_id || "",
        sender_label: labelsBySender.get(key) || "",
        message_count: 1,
        last_chat_id: row.chat_id === null || row.chat_id === undefined ? "" : String(row.chat_id),
        last_chat_title: row.chat_title || "",
        first_seen_at_utc: sentAt,
        first_seen_tehran: sentAt ? tehranJalaliDateTimeDisplay(new Date(sentAt)) : "",
        last_message_at_utc: sentAt,
        last_message_tehran: sentAt ? tehranJalaliDateTimeDisplay(new Date(sentAt)) : "",
        display_timezone: "Asia/Tehran",
      });
      continue;
    }
    existing.message_count += 1;
    if (!existing.sender_username && row.sender_username) existing.sender_username = row.sender_username;
    if (!existing.sender_first_name && row.sender_first_name) existing.sender_first_name = row.sender_first_name;
    if (!existing.sender_last_name && row.sender_last_name) existing.sender_last_name = row.sender_last_name;
    if (!existing.sender_photo_file_id && row.sender_photo_file_id) existing.sender_photo_file_id = row.sender_photo_file_id;
    if (!existing.sender_photo_file_unique_id && row.sender_photo_file_unique_id) existing.sender_photo_file_unique_id = row.sender_photo_file_unique_id;
    if (sentAt && (!existing.first_seen_at_utc || Date.parse(sentAt) < Date.parse(existing.first_seen_at_utc))) {
      existing.first_seen_at_utc = sentAt;
      existing.first_seen_tehran = tehranJalaliDateTimeDisplay(new Date(sentAt));
    }
  }
  const senders = [...sendersByKey.values()].sort((a, b) => {
    const byDate = Date.parse(b.first_seen_at_utc || 0) - Date.parse(a.first_seen_at_utc || 0);
    if (byDate) return byDate;
    return String(a.sender_first_name || a.sender_username || a.sender_id).localeCompare(String(b.sender_first_name || b.sender_username || b.sender_id));
  });
  return json({ senders });
}

async function listBroadcastGroups(env, authUser) {
  const params = new URLSearchParams();
  params.set("select", "platform,bot_id,bot_username,bot_name,chat_id,chat_title,chat_username,chat_type,group_label,message_count,last_message_at_utc");
  params.set("order", "last_message_at_utc.desc.nullslast,chat_title.asc");
  params.set("limit", "1000");
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) throw new Error(await response.text());
  const groupAccess = groupAccessForUser(authUser);
  return (await response.json())
    .filter((row) => row.chat_id && row.chat_title)
    .filter((row) => groupRowAllowedByAccess(row, groupAccess))
    .map((row) => ({
      ...row,
      key: chatKey(row),
      platform: normalizePlatform(row.platform),
      title: row.chat_title,
      group_label: row.group_label || "",
      message_count: Number(row.message_count || 0),
    }));
}

async function fetchBroadcastGroups(env, authUser) {
  try {
    return json({ groups: await listBroadcastGroups(env, authUser) });
  } catch (error) {
    return json({ error: "درخواست گروه‌های اطلاع‌رسانی انجام نشد", detail: error.message || String(error) }, 500);
  }
}

function broadcastBodyParts(textValue, fallbackEmail = "") {
  const text = String(textValue || "");
  const match = text.match(/^([^:\s]+@[^:\s]+)\s*:\s*\n?([\s\S]*)$/);
  return {
    sender: normalizeEmail(match?.[1] || fallbackEmail),
    body: match ? match[2].trim() : text,
  };
}

async function listBroadcastMessageLogs(env, authUser, allowedByKey, unrestricted) {
  const params = new URLSearchParams({
    select: "platform,bot_id,bot_username,bot_name,chat_id,chat_title,message_id,body,raw_payload_json,sent_at_utc,received_at_utc",
    sender_is_bot: "eq.true",
    order: "received_at_utc.desc",
    limit: "500",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return [];
  const grouped = new Map();
  for (const row of await response.json()) {
    const payload = row.raw_payload_json || {};
    if (payload.dashboard_broadcast !== true) continue;
    const key = chatKey(row);
    const group = allowedByKey.get(key);
    if (!unrestricted && !group) continue;
    const parts = broadcastBodyParts(row.body, payload.broadcast_sender_email || authUser.email);
    const broadcastId = payload.broadcast_id
      || `${parts.sender}:${parts.body}:${String(row.sent_at_utc || row.received_at_utc || "").slice(0, 16)}`;
    const existing = grouped.get(broadcastId) || {
      id: `message-${broadcastId}`,
      sender_email: parts.sender,
      created_at_utc: row.received_at_utc || row.sent_at_utc,
      broadcast_id: payload.broadcast_id || "",
      body: parts.body,
      sent: 0,
      failed: 0,
      targets: [],
      metadata: { source: "telegram_messages_fallback", broadcast_id: payload.broadcast_id || "" },
    };
    existing.sent += 1;
    existing.targets.push({
      key,
      platform: normalizePlatform(row.platform),
      chat_title: row.chat_title || group?.title || key,
      ok: true,
      error: "",
      message_id: row.message_id || null,
    });
    if (Date.parse(row.received_at_utc || 0) > Date.parse(existing.created_at_utc || 0)) {
      existing.created_at_utc = row.received_at_utc || row.sent_at_utc;
    }
    grouped.set(broadcastId, existing);
  }
  return [...grouped.values()];
}

async function fetchBroadcastLogs(env, authUser) {
  try {
    const params = new URLSearchParams({
      select: "id,actor_email,target_email,action,old_values,new_values,metadata,created_at_utc",
      action: "eq.group_broadcast",
      order: "created_at_utc.desc",
      limit: "200",
    });
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_audit_logs?${params}`, { headers: supabaseHeaders(env) });
    if (!response.ok) return json({ error: "درخواست لاگ اطلاع‌رسانی انجام نشد", detail: await response.text() }, 500);
    const allowedGroups = await listBroadcastGroups(env, authUser);
    const allowedByKey = new Map(allowedGroups.map((group) => [group.key, group]));
    const unrestricted = groupAccessForUser(authUser).unrestricted;
    const auditLogs = (await response.json()).map((row) => {
      const metadata = row.metadata || {};
      const newValues = row.new_values || {};
      const resultItems = Array.isArray(metadata.results) ? metadata.results : [];
      const groupKeys = Array.isArray(newValues.groups) ? newValues.groups : [];
      const titles = Array.isArray(metadata.group_titles) ? metadata.group_titles : [];
      const targets = resultItems.length ? resultItems : groupKeys.map((key, index) => ({
        key,
        chat_title: titles[index] || allowedByKey.get(key)?.title || key,
        ok: true,
      }));
      const visibleTargets = targets
        .map((target) => {
          const key = target.key || "";
          const group = allowedByKey.get(key);
          if (!unrestricted && !group) return null;
          const [platform] = String(key).split(":");
          return {
            key,
            platform: normalizePlatform(target.platform || group?.platform || platform),
            chat_title: target.chat_title || group?.title || key,
            ok: target.ok !== false,
            error: target.error || "",
            message_id: target.message_id || null,
          };
        })
        .filter(Boolean);
      if (!unrestricted && !visibleTargets.length) return null;
      return {
        id: row.id,
        sender_email: row.actor_email,
        created_at_utc: row.created_at_utc,
        broadcast_id: metadata.broadcast_id || "",
        body: metadata.message_body || metadata.body || "",
        sent: Number(newValues.sent || visibleTargets.filter((target) => target.ok).length || 0),
        failed: Number(newValues.failed || visibleTargets.filter((target) => !target.ok).length || 0),
        targets: visibleTargets,
        metadata,
      };
    }).filter(Boolean);
    const messageLogs = await listBroadcastMessageLogs(env, authUser, allowedByKey, unrestricted);
    const auditBroadcastIds = new Set(auditLogs.map((log) => log.broadcast_id).filter(Boolean));
    const logs = [
      ...auditLogs,
      ...messageLogs.filter((log) => !log.broadcast_id || !auditBroadcastIds.has(log.broadcast_id)),
    ].sort((a, b) => Date.parse(b.created_at_utc || 0) - Date.parse(a.created_at_utc || 0));
    return json({ logs });
  } catch (error) {
    return json({ error: "درخواست لاگ اطلاع‌رسانی انجام نشد", detail: error.message || String(error) }, 500);
  }
}

async function sendGroupBroadcast(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const messageBody = String(body.body || "").trim();
  const password = String(body.password || "");
  const requestedGroups = Array.isArray(body.groups)
    ? [...new Set(body.groups.map((item) => {
      const [platform, chatId] = String(item || "").split(":");
      return platform && /^-?\d+$/.test(chatId || "") ? `${normalizePlatform(platform)}:${chatId}` : "";
    }).filter(Boolean))]
    : [];
  if (!requestedGroups.length) return json({ error: "حداقل یک گروه را انتخاب کنید" }, 400);
  if (requestedGroups.length > 100) return json({ error: "در هر نوبت حداکثر ۱۰۰ گروه قابل ارسال است" }, 400);
  if (!messageBody) return json({ error: "متن اطلاع‌رسانی را وارد کنید" }, 400);
  if (messageBody.length > 3500) return json({ error: "متن اطلاع‌رسانی بیش از حد طولانی است" }, 400);
  if (!await verifyUserPassword(authUser, password)) return json({ error: "پسورد واردشده درست نیست" }, 401);

  try {
    const allowedGroups = await listBroadcastGroups(env, authUser);
    const groupByKey = new Map(allowedGroups.map((group) => [group.key, group]));
    const disallowed = requestedGroups.filter((key) => !groupByKey.has(key));
    if (disallowed.length) return forbiddenAccess();
    const broadcastId = randomHex(8);
    const outgoingText = `${normalizeEmail(authUser.email)} :\n${messageBody}`;
    const results = [];
    for (const key of requestedGroups) {
      const group = groupByKey.get(key);
      try {
        const runtimeConfig = await runtimeConfigForMessageBot(env, group);
        const sent = await sendBotMessage(env, group.platform, group.chat_id, outgoingText, runtimeConfig);
        if (!sent.ok) {
          results.push({ key, platform: group.platform, chat_title: group.chat_title, ok: false, error: sent.body?.description || sent.body?.error || "ارسال توسط بات انجام نشد" });
          continue;
        }
        await persistOutgoingBotMessage(env, sent.result, group, runtimeConfig, outgoingText, null, { dashboard_broadcast: true, broadcast_id: broadcastId, broadcast_sender_email: normalizeEmail(authUser.email) });
        results.push({ key, platform: group.platform, chat_title: group.chat_title, ok: true, message_id: sent.result?.message_id || null });
      } catch (error) {
        results.push({ key, platform: group?.platform || key.split(":")[0], chat_title: group?.chat_title || key, ok: false, error: error.message || String(error) });
      }
    }
    dashboardApiCache = null;
    threadFilterOptionsApiCache = null;
    const sentCount = results.filter((result) => result.ok).length;
    const failedCount = results.length - sentCount;
    try {
      await insertAccessAuditLog(env, {
        actorEmail: authUser.email,
        targetEmail: authUser.email,
        action: "group_broadcast",
        newValues: { groups: requestedGroups, sent: sentCount, failed: failedCount },
        metadata: { broadcast_id: broadcastId, group_titles: results.map((result) => result.chat_title), results, message_body: messageBody, message_length: messageBody.length },
      });
    } catch (auditError) {
      console.error("group broadcast audit failed", auditError?.message || auditError);
    }
    return json({ ok: failedCount === 0, sent: sentCount, failed: failedCount, results }, failedCount ? 207 : 200);
  } catch (error) {
    return json({ error: error.message || "ارسال گروهی انجام نشد" }, 500);
  }
}

async function fetchSingleMessageForReply(env, platform, chatId, messageId) {
  const params = new URLSearchParams();
  params.set("select", TELEGRAM_MESSAGE_SELECT);
  params.set("platform", `eq.${normalizePlatform(platform)}`);
  params.set("chat_id", `eq.${chatId}`);
  params.set("message_id", `eq.${messageId}`);
  params.set("limit", "1");
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, {
    headers: supabaseHeaders(env),
  });
  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  return rows[0] || null;
}

async function sendThreadReply(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const platform = normalizePlatform(body.platform);
  const chatId = String(body.chat_id || "").trim();
  const messageId = String(body.message_id || "").trim();
  const replyBody = String(body.body || "").trim();
  if (!/^-?\d+$/.test(chatId) || !/^\d+$/.test(messageId)) return json({ error: "شناسه پیام یا گروه نامعتبر است" }, 400);
  if (!replyBody) return json({ error: "متن پاسخ را وارد کنید" }, 400);
  if (replyBody.length > 3500) return json({ error: "متن پاسخ بیش از حد طولانی است" }, 400);

  try {
    const row = await fetchSingleMessageForReply(env, platform, chatId, messageId);
    if (!row) return json({ error: "پیام مقصد پیدا نشد" }, 404);
    const allowedSet = await allowedChatKeySet(env, authUser);
    if (!rowAllowedByChatSet(row, allowedSet)) return forbiddenAccess();
    const runtimeConfig = await runtimeConfigForMessageBot(env, row);
    const outgoingText = `${normalizeEmail(authUser.email)} :\n${replyBody}`;
    const sent = await sendBotMessage(env, platform, chatId, outgoingText, runtimeConfig, { replyToMessageId: messageId });
    if (!sent.ok) return json({ error: "ارسال پاسخ توسط بات انجام نشد", detail: sent.body || null }, 502);
    await persistOutgoingBotMessage(env, sent.result, row, runtimeConfig, outgoingText, messageId, { dashboard_thread_reply: true });
    try {
      await insertAccessAuditLog(env, {
        actorEmail: authUser.email,
        targetEmail: authUser.email,
        action: "thread_reply",
        newValues: { platform, chat_id: chatId, message_id: messageId },
        metadata: { bot_id: row.bot_id || null, chat_title: row.chat_title || null },
      });
    } catch (auditError) {
      console.error("thread reply audit failed", auditError?.message || auditError);
    }
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message || "ارسال پاسخ انجام نشد" }, 500);
  }
}

async function fetchGroupStatsRow(env, platform, chatId) {
  const params = new URLSearchParams({
    select: "platform,chat_id,chat_title,group_label",
    platform: `eq.${normalizePlatform(platform)}`,
    chat_id: `eq.${chatId}`,
    limit: "1",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  return rows[0] || null;
}

async function userCanAccessSender(env, authUser, platform, senderId) {
  if (groupAccessForUser(authUser).unrestricted) return true;
  const params = new URLSearchParams({
    select: "platform,chat_id",
    platform: `eq.${normalizePlatform(platform)}`,
    sender_id: `eq.${senderId}`,
    limit: "1000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) throw new Error(await response.text());
  const allowedSet = await allowedChatKeySet(env, authUser);
  return (await response.json()).some((row) => rowAllowedByChatSet(row, allowedSet));
}

async function updateGroupLabel(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const chatId = String(body.chat_id || "").trim();
  const platform = normalizePlatform(body.platform);
  if (!/^-?\d+$/.test(chatId)) return json({ error: "شناسه گروه نامعتبر است" }, 400);
  const groupLabel = normalizeGroupLabel(body.group_label);
  if (body.group_label && !groupLabel) {
    return json({ error: "لیبل گروه نامعتبر است" }, 400);
  }
  const currentGroup = await fetchGroupStatsRow(env, platform, chatId);
  if (!currentGroup) return json({ error: "گروه پیدا نشد" }, 404);
  const allowedSet = await allowedChatKeySet(env, authUser);
  if (!rowAllowedByChatSet(currentGroup, allowedSet)) return forbiddenAccess();
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_chats?platform=eq.${platform}&chat_id=eq.${encodeURIComponent(chatId)}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify({
      group_label: groupLabel,
      updated_at_utc: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    return json({ error: "ذخیره لیبل گروه انجام نشد", detail: await response.text() }, 500);
  }
  const rows = await response.json();
  const saved = rows?.[0] || {};
  await insertAccessAuditLog(env, {
    actorEmail: authUser?.email,
    targetEmail: authUser?.email,
    action: "group_label_update",
    oldValues: { platform, chat_id: chatId, group_label: currentGroup.group_label || "" },
    newValues: { platform, chat_id: chatId, group_label: saved.group_label || "" },
    metadata: { chat_title: currentGroup.chat_title || "" },
  });
  return json({ group_label: rows?.[0]?.group_label || "" });
}

async function updateSenderLabel(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const platform = normalizePlatform(body.platform);
  const senderId = String(body.sender_id || "").trim();
  if (!senderId || senderId.length > 128) return json({ error: "شناسه ارسال‌کننده نامعتبر است" }, 400);
  const senderLabel = normalizeGroupLabel(body.sender_label);
  if (body.sender_label && !senderLabel) {
    return json({ error: "لیبل ارسال‌کننده نامعتبر است" }, 400);
  }
  if (!await userCanAccessSender(env, authUser, platform, senderId)) return forbiddenAccess();
  const existingParams = new URLSearchParams({
    select: "sender_label",
    platform: `eq.${platform}`,
    sender_id: `eq.${senderId}`,
    limit: "1",
  });
  const existingResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_sender_labels?${existingParams}`, { headers: supabaseHeaders(env) });
  const existingRows = existingResponse.ok ? await existingResponse.json() : [];
  const oldSenderLabel = existingRows?.[0]?.sender_label || "";
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_sender_labels?on_conflict=platform,sender_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=merge-duplicates,return=representation"),
    body: JSON.stringify({
      platform,
      sender_id: senderId,
      sender_label: senderLabel,
      updated_at_utc: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    return json({ error: "ذخیره لیبل ارسال‌کننده انجام نشد", detail: await response.text() }, 500);
  }
  const rows = await response.json();
  await insertAccessAuditLog(env, {
    actorEmail: authUser?.email,
    targetEmail: authUser?.email,
    action: "sender_label_update",
    oldValues: { platform, sender_id: senderId, sender_label: oldSenderLabel },
    newValues: { platform, sender_id: senderId, sender_label: rows?.[0]?.sender_label || "" },
  });
  return json({ sender_label: rows?.[0]?.sender_label || "" });
}

const ROADMAP_STATUSES = ["not_started", "on_track", "at_risk", "blocked", "delivered", "canceled"];
const ROADMAP_PRIORITIES = ["low", "medium", "high", "critical"];
const ROADMAP_ITEM_TYPES = ["initiative", "major", "delivery"];
const ROADMAP_DELIVERY_MONTHS = new Map([
  [6, "شهریور"],
  [7, "مهر"],
  [8, "آبان"],
  [9, "آذر"],
  [10, "دی"],
  [11, "بهمن"],
  [12, "اسفند"],
]);
const ROADMAP_DELIVERY_WEEKS = new Map([
  [1, "هفته اول"],
  [2, "هفته دوم"],
  [3, "هفته سوم"],
  [4, "هفته چهارم"],
]);
const ROADMAP_DELIVERY_FALLBACK_DATES_1405 = {
  6: "2026-08-23",
  7: "2026-09-23",
  8: "2026-10-23",
  9: "2026-11-22",
  10: "2026-12-22",
  11: "2027-01-21",
  12: "2027-02-20",
};

function normalizeRoadmapStatus(value) {
  const status = String(value || "").trim().toLowerCase();
  const mapped = { planned: "not_started", in_progress: "on_track" }[status] || status;
  return ROADMAP_STATUSES.includes(mapped) ? mapped : "not_started";
}

function normalizeRoadmapPriority(value) {
  const priority = String(value || "").trim().toLowerCase();
  return ROADMAP_PRIORITIES.includes(priority) ? priority : "medium";
}

function normalizeRoadmapItemType(value) {
  const itemType = String(value || "").trim().toLowerCase();
  return ROADMAP_ITEM_TYPES.includes(itemType) ? itemType : "delivery";
}

function normalizeRoadmapProgress(value) {
  const progress = Number.parseInt(String(value ?? "0"), 10);
  if (!Number.isFinite(progress)) return 0;
  return Math.max(0, Math.min(100, progress));
}

function normalizeRoadmapDate(value) {
  const date = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
}

function normalizeRoadmapDeliveryMonth(value) {
  const month = Number.parseInt(String(value || ""), 10);
  return ROADMAP_DELIVERY_MONTHS.has(month) ? month : null;
}

function normalizeRoadmapDeliveryWeek(value) {
  const week = Number.parseInt(String(value || ""), 10);
  return ROADMAP_DELIVERY_WEEKS.has(week) ? week : null;
}

function roadmapDeliverySlotText(monthValue, weekValue) {
  const month = normalizeRoadmapDeliveryMonth(monthValue);
  const week = normalizeRoadmapDeliveryWeek(weekValue);
  if (!month || !week) return "";
  return `${ROADMAP_DELIVERY_MONTHS.get(month)}، ${ROADMAP_DELIVERY_WEEKS.get(week)}`;
}

function fallbackRoadmapDeliveryDate(monthValue, weekValue) {
  const month = normalizeRoadmapDeliveryMonth(monthValue);
  const week = normalizeRoadmapDeliveryWeek(weekValue);
  const monthStart = ROADMAP_DELIVERY_FALLBACK_DATES_1405[month];
  if (!monthStart || !week) return "";
  const date = new Date(`${monthStart}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + (week - 1) * 7);
  return date.toISOString().slice(0, 10);
}

function normalizeRoadmapEntityId(value) {
  if (value === null || value === undefined || value === "") return null;
  const id = Number.parseInt(String(value), 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

async function normalizeRoadmapParent(env, value) {
  const id = normalizeRoadmapEntityId(value);
  if (!id) return null;
  const row = await fetchRoadmapItemById(env, id);
  if (!row || row.status === "canceled") throw new Error("تحویل‌دادنی بالادستی نامعتبر است");
  return id;
}

async function roadmapParentCreatesCycle(env, itemId, parentId) {
  const targetId = Number(itemId);
  let currentId = Number(parentId);
  const visited = new Set();
  while (currentId) {
    if (currentId === targetId) return true;
    if (visited.has(currentId)) return true;
    visited.add(currentId);
    const row = await fetchRoadmapItemById(env, currentId);
    currentId = Number(row?.parent_roadmap_id || 0);
  }
  return false;
}

async function normalizeRoadmapProducts(env, productIdValue, subproductIdValue) {
  const productId = normalizeRoadmapEntityId(productIdValue);
  const subproductId = normalizeRoadmapEntityId(subproductIdValue);
  if (!productId && subproductId) throw new Error("برای انتخاب زیرمحصول، محصول هم باید انتخاب شود");
  const products = await fetchProductRows(env);
  const product = productId ? products.find((item) => Number(item.id) === productId && !item.parent_id) : null;
  if (productId && !product) throw new Error("محصول نامعتبر است");
  const subproduct = subproductId ? products.find((item) => Number(item.id) === subproductId && Number(item.parent_id) === productId) : null;
  if (subproductId && !subproduct) throw new Error("زیرمحصول نامعتبر است");
  const ownerEmail = normalizeEmail(subproduct?.owner_email || product?.owner_email || "");
  return { product_id: productId, subproduct_id: subproductId, owner_email: ownerEmail || null };
}

async function normalizeRoadmapDependencies(env, value) {
  const list = Array.isArray(value) ? value : [];
  if (list.length > 20) throw new Error("تعداد وابستگی‌ها بیش از حد مجاز است");
  const [products, teams] = await Promise.all([fetchProductRows(env), fetchUserGroupRows(env)]);
  const productIds = new Set(products.filter((product) => !product.parent_id).map((product) => Number(product.id)));
  const subproductsByParent = new Map();
  products.filter((product) => product.parent_id).forEach((product) => {
    const key = Number(product.parent_id);
    if (!subproductsByParent.has(key)) subproductsByParent.set(key, new Set());
    subproductsByParent.get(key).add(Number(product.id));
  });
  const teamIds = new Set(teams.map((team) => Number(team.id)));
  const existingIds = new Set();
  for (const item of list) {
    const providerId = normalizeRoadmapEntityId(item?.provider_roadmap_id || item?.roadmap_id);
    if (!providerId) continue;
    const provider = await fetchRoadmapItemById(env, providerId);
    if (!provider || provider.status === "canceled") throw new Error("Provider وابستگی نامعتبر است");
    existingIds.add(providerId);
  }
  return list.map((item) => {
    const providerRoadmapId = normalizeRoadmapEntityId(item?.provider_roadmap_id || item?.roadmap_id);
    const title = String(item?.title || "").trim().replace(/\s+/g, " ");
    const description = String(item?.description || "").trim();
    const needByMonth = normalizeRoadmapDeliveryMonth(item?.need_by_month);
    const needByWeek = normalizeRoadmapDeliveryWeek(item?.need_by_week);
    const hasNeedBySlot = item?.need_by_month || item?.need_by_week;
    const expectedMonth = normalizeRoadmapDeliveryMonth(item?.expected_delivery_month || item?.expected_resolution_month);
    const expectedWeek = normalizeRoadmapDeliveryWeek(item?.expected_delivery_week || item?.expected_resolution_week);
    const hasExpectedSlot = item?.expected_delivery_month || item?.expected_delivery_week || item?.expected_resolution_month || item?.expected_resolution_week;
    const legacyExpectedDate = normalizeRoadmapDate(item?.expected_delivery_date || item?.expected_resolution_date || "");
    const productId = normalizeRoadmapEntityId(item?.product_id);
    const subproductId = normalizeRoadmapEntityId(item?.subproduct_id);
    const teamId = normalizeRoadmapEntityId(item?.team_id);
    if (!providerRoadmapId && !title) throw new Error("عنوان یا Provider وابستگی الزامی است");
    if (title.length > 180) throw new Error("عنوان وابستگی بیش از حد طولانی است");
    if (description.length > 1200) throw new Error("شرح وابستگی بیش از حد طولانی است");
    if (hasNeedBySlot && (!needByMonth || !needByWeek)) throw new Error("ماه و هفته Need-by وابستگی نامعتبر است");
    if (hasExpectedSlot && (!expectedMonth || !expectedWeek)) throw new Error("ماه و هفته انتظار حل وابستگی نامعتبر است");
    if (!hasExpectedSlot && item?.expected_resolution_date && !legacyExpectedDate) throw new Error("تاریخ انتظار حل وابستگی نامعتبر است");
    if (productId && !productIds.has(productId)) throw new Error("محصول وابستگی نامعتبر است");
    if (subproductId && (!productId || !subproductsByParent.get(productId)?.has(subproductId))) throw new Error("زیرمحصول وابستگی نامعتبر است");
    if (teamId && !teamIds.has(teamId)) throw new Error("تیم وابستگی نامعتبر است");
    const needByDate = hasNeedBySlot ? fallbackRoadmapDeliveryDate(needByMonth, needByWeek) : "";
    const expectedDate = hasExpectedSlot ? fallbackRoadmapDeliveryDate(expectedMonth, expectedWeek) : legacyExpectedDate;
    return {
      provider_roadmap_id: providerRoadmapId,
      title,
      description,
      need_by_date: needByDate || "",
      need_by_month: needByMonth,
      need_by_week: needByWeek,
      expected_resolution_date: expectedDate || "",
      expected_resolution_month: expectedMonth,
      expected_resolution_week: expectedWeek,
      expected_delivery_date: expectedDate || "",
      expected_delivery_month: expectedMonth,
      expected_delivery_week: expectedWeek,
      product_id: productId,
      subproduct_id: subproductId,
      team_id: teamId,
    };
  });
}

function roadmapItemForClient(row) {
  return {
    id: row.id,
    item_type: row.item_type || "delivery",
    title: row.title || "",
    description: row.description || "",
    owner_email: row.owner_email || "",
    product_id: row.product_id || null,
    subproduct_id: row.subproduct_id || null,
    dependencies: Array.isArray(row.dependencies_json) ? row.dependencies_json : [],
    checkpoints: [],
    parent_roadmap_id: row.parent_roadmap_id || null,
    initiative_id: row.initiative_id || null,
    major_delivery_id: row.major_delivery_id || null,
    team_id: row.team_id || null,
    priority: row.priority || "medium",
    status: normalizeRoadmapStatus(row.status),
    progress: normalizeRoadmapProgress(row.progress),
    risk: normalizeRoadmapPriority(row.risk),
    delivery_date: row.delivery_date || "",
    delivery_month: row.delivery_month || null,
    delivery_week: row.delivery_week || null,
    delivery_slot: roadmapDeliverySlotText(row.delivery_month, row.delivery_week),
    created_by_email: row.created_by_email || "",
    updated_by_email: row.updated_by_email || "",
    created_at_utc: row.created_at_utc || "",
    updated_at_utc: row.updated_at_utc || "",
  };
}

function roadmapCheckpointForClient(row) {
  return {
    id: row.id,
    roadmap_item_id: row.roadmap_item_id,
    title: row.title || "",
    expected_date: row.expected_date || "",
    expected_month: row.expected_month || null,
    expected_week: row.expected_week || null,
    status: normalizeRoadmapStatus(row.status),
  };
}

async function fetchRoadmapDependencyRows(env) {
  const params = new URLSearchParams({
    select: "id,provider_roadmap_id,consumer_roadmap_id,need_by_date,need_by_month,need_by_week,expected_delivery_date,expected_delivery_month,expected_delivery_week,dependency_status,description",
    order: "need_by_month.asc.nullslast,need_by_week.asc.nullslast,created_at_utc.asc",
    limit: "2000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_dependencies?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) return [];
  return Array.isArray(body) ? body : [];
}

async function fetchRoadmapCheckpointRows(env) {
  const params = new URLSearchParams({
    select: "id,roadmap_item_id,title,expected_date,expected_month,expected_week,status",
    order: "expected_month.asc.nullslast,expected_week.asc.nullslast,created_at_utc.asc",
    limit: "3000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_checkpoints?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) return [];
  return Array.isArray(body) ? body : [];
}

async function fetchRoadmapItems(env) {
  const params = new URLSearchParams({
    select: "id,item_type,title,description,owner_email,product_id,subproduct_id,parent_roadmap_id,initiative_id,major_delivery_id,team_id,dependencies_json,priority,status,progress,risk,delivery_date,delivery_month,delivery_week,created_by_email,updated_by_email,created_at_utc,updated_at_utc",
    status: "neq.canceled",
    order: "item_type.asc,delivery_month.asc.nullslast,delivery_week.asc.nullslast,delivery_date.asc,status.asc,created_at_utc.desc",
    limit: "1000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_items?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) return json({ error: "دریافت نقشه راه انجام نشد", detail: body?.message || body || response.status }, 500);
  const [products, teams, dependencyRows, checkpointRows] = await Promise.all([
    fetchProductRows(env),
    fetchUserGroupRows(env),
    fetchRoadmapDependencyRows(env),
    fetchRoadmapCheckpointRows(env),
  ]);
  const items = (Array.isArray(body) ? body : []).map(roadmapItemForClient);
  const itemsById = new Map(items.map((item) => [String(item.id), item]));
  checkpointRows.forEach((checkpoint) => {
    const item = itemsById.get(String(checkpoint.roadmap_item_id));
    if (item) item.checkpoints.push(roadmapCheckpointForClient(checkpoint));
  });
  const childrenByParent = new Map();
  items.forEach((item) => {
    const parentId = String(item.parent_roadmap_id || "");
    if (!parentId) return;
    if (!childrenByParent.has(parentId)) childrenByParent.set(parentId, []);
    childrenByParent.get(parentId).push(item);
  });
  dependencyRows.forEach((row) => {
    const consumer = itemsById.get(String(row.consumer_roadmap_id));
    const provider = itemsById.get(String(row.provider_roadmap_id));
    if (!consumer || !provider) return;
    consumer.dependencies.push({
      id: row.id,
      provider_roadmap_id: provider.id,
      consumer_roadmap_id: consumer.id,
      roadmap_id: provider.id,
      title: provider.title,
      description: row.description || provider.description || "",
      need_by_date: row.need_by_date || "",
      need_by_month: row.need_by_month || null,
      need_by_week: row.need_by_week || null,
      expected_delivery_date: row.expected_delivery_date || provider.delivery_date,
      expected_delivery_month: row.expected_delivery_month || provider.delivery_month,
      expected_delivery_week: row.expected_delivery_week || provider.delivery_week,
      expected_resolution_date: row.expected_delivery_date || provider.delivery_date,
      expected_resolution_month: row.expected_delivery_month || provider.delivery_month,
      expected_resolution_week: row.expected_delivery_week || provider.delivery_week,
      dependency_status: normalizeRoadmapStatus(row.dependency_status),
      product_id: provider.product_id,
      subproduct_id: provider.subproduct_id,
      team_id: provider.team_id,
    });
  });
  items.forEach((item) => {
    const childDependencies = (childrenByParent.get(String(item.id)) || []).map((child) => ({
      roadmap_id: child.id,
      provider_roadmap_id: child.id,
      consumer_roadmap_id: item.id,
      title: child.title,
      description: child.description,
      need_by_date: item.delivery_date,
      need_by_month: item.delivery_month,
      need_by_week: item.delivery_week,
      expected_resolution_date: child.delivery_date,
      expected_resolution_month: child.delivery_month,
      expected_resolution_week: child.delivery_week,
      expected_delivery_date: child.delivery_date,
      expected_delivery_month: child.delivery_month,
      expected_delivery_week: child.delivery_week,
      dependency_status: child.status,
      product_id: child.product_id,
      subproduct_id: child.subproduct_id,
      team_id: child.team_id,
      child_dependency_count: (childrenByParent.get(String(child.id)) || []).length,
    })).filter((dep) => !(item.dependencies || []).some((existing) => String(existing.provider_roadmap_id || existing.roadmap_id) === String(dep.provider_roadmap_id)));
    item.dependencies = [...item.dependencies, ...childDependencies];
  });
  return json({
    items,
    products: products.map(productForClient),
    teams: teams.map((team) => ({ id: team.id, name: team.name || "", group_type: normalizeUserGroupType(team.group_type), group_mode: normalizeUserGroupMode(team.group_mode) })),
  });
}

async function fetchRoadmapItemById(env, id) {
  const params = new URLSearchParams({
    select: "id,item_type,title,description,owner_email,product_id,subproduct_id,parent_roadmap_id,initiative_id,major_delivery_id,team_id,dependencies_json,priority,status,progress,risk,delivery_date,delivery_month,delivery_week,created_by_email,updated_by_email,created_at_utc,updated_at_utc",
    id: `eq.${id}`,
    limit: "1",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_items?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

async function normalizeRoadmapHierarchy(env, value, expectedType, fieldLabel) {
  const id = normalizeRoadmapEntityId(value);
  if (!id) return null;
  const row = await fetchRoadmapItemById(env, id);
  if (!row || row.status === "canceled" || String(row.item_type || "delivery") !== expectedType) throw new Error(fieldLabel + " نامعتبر است");
  return id;
}

async function roadmapPayloadFromBody(body, authUser, env, partial = false) {
  const payload = {};
  if (!partial || Object.prototype.hasOwnProperty.call(body, "title")) {
    const title = String(body.title || "").trim().replace(/\s+/g, " ");
    if (title.length < 2 || title.length > 180) throw new Error("عنوان تحویل‌دادنی باید بین ۲ تا ۱۸۰ کاراکتر باشد");
    payload.title = title;
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "description")) {
    const description = String(body.description || "").trim();
    if (description.length > 4000) throw new Error("توضیحات بیش از حد طولانی است");
    payload.description = description;
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "item_type")) {
    payload.item_type = normalizeRoadmapItemType(body.item_type);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "initiative_id")) {
    payload.initiative_id = await normalizeRoadmapHierarchy(env, body.initiative_id, "initiative", "Initiative");
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "major_delivery_id")) {
    payload.major_delivery_id = await normalizeRoadmapHierarchy(env, body.major_delivery_id, "major", "Major Delivery");
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "team_id")) {
    const teamId = normalizeRoadmapEntityId(body.team_id);
    if (teamId) {
      const teams = await fetchUserGroupRows(env);
      if (!teams.some((team) => Number(team.id) === teamId)) throw new Error("تیم مالک نامعتبر است");
    }
    payload.team_id = teamId;
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "status")) {
    payload.status = normalizeRoadmapStatus(body.status);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "risk")) {
    payload.risk = normalizeRoadmapPriority(body.risk);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "progress")) {
    payload.progress = normalizeRoadmapProgress(body.progress);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "delivery_month") || Object.prototype.hasOwnProperty.call(body, "delivery_week")) {
    const deliveryMonth = normalizeRoadmapDeliveryMonth(body.delivery_month);
    const deliveryWeek = normalizeRoadmapDeliveryWeek(body.delivery_week);
    if (!deliveryMonth || !deliveryWeek) throw new Error("ماه و هفته تحویل نامعتبر است");
    payload.delivery_month = deliveryMonth;
    payload.delivery_week = deliveryWeek;
    payload.delivery_date = fallbackRoadmapDeliveryDate(deliveryMonth, deliveryWeek);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "product_id") || Object.prototype.hasOwnProperty.call(body, "subproduct_id")) {
    Object.assign(payload, await normalizeRoadmapProducts(env, body.product_id, body.subproduct_id));
    if (!payload.owner_email) payload.owner_email = normalizeEmail(authUser.email);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(body, "dependencies")) {
    payload.dependencies_json = await normalizeRoadmapDependencies(env, body.dependencies);
  }
  return payload;
}

async function createChildRoadmapDependencies(env, parentItem, dependencies, authUser) {
  const list = Array.isArray(dependencies) ? dependencies : [];
  if (!list.length || !parentItem?.id) return [];
  const now = new Date().toISOString();
  const products = await fetchProductRows(env);
  const ownerEmailFor = (dep) => {
    const productId = Number(dep.product_id || 0);
    const subproductId = Number(dep.subproduct_id || 0);
    const product = productId ? products.find((item) => Number(item.id) === productId) : null;
    const subproduct = subproductId ? products.find((item) => Number(item.id) === subproductId) : null;
    return normalizeEmail(subproduct?.owner_email || product?.owner_email || parentItem.owner_email || authUser.email);
  };
  const existingProviderDeps = list.filter((dep) => dep.provider_roadmap_id);
  const newProviderDeps = list.filter((dep) => !dep.provider_roadmap_id);
  const rows = newProviderDeps.map((dep) => ({
    title: dep.title,
    description: dep.description || "",
    owner_email: ownerEmailFor(dep),
    product_id: dep.product_id || parentItem.product_id || null,
    subproduct_id: dep.subproduct_id || parentItem.subproduct_id || null,
    parent_roadmap_id: parentItem.id,
    initiative_id: parentItem.initiative_id || null,
    major_delivery_id: parentItem.major_delivery_id || null,
    team_id: dep.team_id || null,
    dependencies_json: [],
    priority: parentItem.priority || "medium",
    item_type: "delivery",
    status: "not_started",
    progress: 0,
    risk: parentItem.risk || "medium",
    delivery_date: dep.expected_resolution_date || parentItem.delivery_date,
    delivery_month: dep.expected_resolution_month || parentItem.delivery_month,
    delivery_week: dep.expected_resolution_week || parentItem.delivery_week,
    created_by_email: normalizeEmail(authUser.email),
    updated_by_email: normalizeEmail(authUser.email),
    created_at_utc: now,
    updated_at_utc: now,
  }));
  let savedProviders = [];
  if (rows.length) {
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_items`, {
      method: "POST",
      headers: supabaseHeaders(env, "return=representation"),
      body: JSON.stringify(rows),
    });
    const saved = await readSupabaseJson(response);
    if (!response.ok) throw new Error(saved?.message || "ثبت وابستگی‌های نقشه راه انجام نشد");
    savedProviders = Array.isArray(saved) ? saved : [];
  }
  const relationRows = [
    ...existingProviderDeps.map((dep) => ({ dep, providerId: dep.provider_roadmap_id })),
    ...newProviderDeps.map((dep, index) => ({ dep, providerId: savedProviders[index]?.id })),
  ].filter((entry) => entry.providerId).map(({ dep, providerId }) => ({
    provider_roadmap_id: providerId,
    consumer_roadmap_id: parentItem.id,
    need_by_date: dep.need_by_date || parentItem.delivery_date || null,
    need_by_month: dep.need_by_month || parentItem.delivery_month || null,
    need_by_week: dep.need_by_week || parentItem.delivery_week || null,
    expected_delivery_date: dep.expected_delivery_date || dep.expected_resolution_date || null,
    expected_delivery_month: dep.expected_delivery_month || dep.expected_resolution_month || null,
    expected_delivery_week: dep.expected_delivery_week || dep.expected_resolution_week || null,
    dependency_status: dependencyStatusFromSlots(dep, parentItem),
    description: dep.description || "",
    created_by_email: normalizeEmail(authUser.email),
    updated_by_email: normalizeEmail(authUser.email),
    created_at_utc: now,
    updated_at_utc: now,
  }));
  if (relationRows.length) await insertRoadmapDependencyRelations(env, relationRows);
  return savedProviders;
}

function dependencyStatusFromSlots(dep, consumerItem) {
  if (dep.status) return normalizeRoadmapStatus(dep.status);
  const expected = (Number(dep.expected_delivery_month || dep.expected_resolution_month || 0) - 6) * 4 + Number(dep.expected_delivery_week || dep.expected_resolution_week || 0);
  const needBy = (Number(dep.need_by_month || consumerItem?.delivery_month || 0) - 6) * 4 + Number(dep.need_by_week || consumerItem?.delivery_week || 0);
  if (expected > 0 && needBy > 0 && expected > needBy) return "at_risk";
  return "on_track";
}

async function insertRoadmapDependencyRelations(env, rows) {
  if (!rows.length) return [];
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_dependencies?on_conflict=provider_roadmap_id,consumer_roadmap_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=merge-duplicates,return=representation"),
    body: JSON.stringify(rows),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) throw new Error(saved?.message || "ثبت رابطه وابستگی انجام نشد");
  return Array.isArray(saved) ? saved : [];
}

async function createRoadmapCheckpoints(env, roadmapItemId, checkpoints, authUser) {
  const list = Array.isArray(checkpoints) ? checkpoints : [];
  if (!list.length || !roadmapItemId) return [];
  const now = new Date().toISOString();
  const rows = list.map((checkpoint) => {
    const month = normalizeRoadmapDeliveryMonth(checkpoint.expected_month);
    const week = normalizeRoadmapDeliveryWeek(checkpoint.expected_week);
    const title = String(checkpoint.title || "").trim().replace(/\s+/g, " ");
    if (!title) throw new Error("عنوان Checkpoint الزامی است");
    if ((checkpoint.expected_month || checkpoint.expected_week) && (!month || !week)) throw new Error("ماه و هفته Checkpoint نامعتبر است");
    return {
      roadmap_item_id: roadmapItemId,
      title,
      expected_date: month && week ? fallbackRoadmapDeliveryDate(month, week) : null,
      expected_month: month,
      expected_week: week,
      status: normalizeRoadmapStatus(checkpoint.status),
      created_by_email: normalizeEmail(authUser.email),
      updated_by_email: normalizeEmail(authUser.email),
      created_at_utc: now,
      updated_at_utc: now,
    };
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_checkpoints`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(rows),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) throw new Error(saved?.message || "ثبت Checkpointها انجام نشد");
  return Array.isArray(saved) ? saved : [];
}

async function createRoadmapItem(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  let payload;
  try {
    payload = await roadmapPayloadFromBody(body, authUser, env);
  } catch (error) {
    return json({ error: error.message || "داده نقشه راه نامعتبر است" }, 400);
  }
  const childDependencies = Array.isArray(payload.dependencies_json) ? payload.dependencies_json : [];
  const checkpoints = Array.isArray(body.checkpoints) ? body.checkpoints : [];
  payload.dependencies_json = [];
  const now = new Date().toISOString();
  const row = {
    ...payload,
    created_by_email: normalizeEmail(authUser.email),
    updated_by_email: normalizeEmail(authUser.email),
    created_at_utc: now,
    updated_at_utc: now,
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_items`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(row),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: "ثبت تحویل‌دادنی انجام نشد", detail: saved?.message || saved || response.status }, 500);
  const item = Array.isArray(saved) ? saved[0] : saved;
  try {
    await createChildRoadmapDependencies(env, item || row, childDependencies, authUser);
    await createRoadmapCheckpoints(env, item?.id, checkpoints, authUser);
  } catch (error) {
    return json({ error: error.message || "ثبت وابستگی‌ها یا Checkpointهای نقشه راه انجام نشد" }, 500);
  }
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: row.owner_email,
    action: "roadmap_create",
    newValues: roadmapItemForClient(item || row),
    metadata: { roadmap_id: item?.id || null, title: row.title },
  });
  return json({ item: roadmapItemForClient(item || row) }, 201);
}

async function updateRoadmapItem(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const id = Number.parseInt(String(body.id || ""), 10);
  if (!Number.isFinite(id) || id <= 0) return json({ error: "شناسه نقشه راه نامعتبر است" }, 400);
  const existing = await fetchRoadmapItemById(env, id);
  if (!existing) return json({ error: "آیتم نقشه راه پیدا نشد" }, 404);
  let payload;
  try {
    payload = await roadmapPayloadFromBody(body, authUser, env, true);
  } catch (error) {
    return json({ error: error.message || "داده نقشه راه نامعتبر است" }, 400);
  }
  const dependencyAdditions = Array.isArray(payload.dependencies_json) ? payload.dependencies_json : [];
  if (Object.prototype.hasOwnProperty.call(payload, "dependencies_json")) delete payload.dependencies_json;
  if (dependencyAdditions.some((dep) => Number(dep.provider_roadmap_id || dep.roadmap_id || 0) === id)) {
    return json({ error: "تحویل‌دادنی نمی‌تواند به خودش وابسته شود" }, 400);
  }
  if (payload.parent_roadmap_id && Number(payload.parent_roadmap_id) === id) return json({ error: "تحویل‌دادنی نمی‌تواند وابسته به خودش باشد" }, 400);
  if (payload.parent_roadmap_id && await roadmapParentCreatesCycle(env, id, payload.parent_roadmap_id)) {
    return json({ error: "زنجیره وابستگی نمی‌تواند چرخه داشته باشد" }, 400);
  }
  if (!Object.keys(payload).length && !dependencyAdditions.length) return json({ error: "چیزی برای به‌روزرسانی ارسال نشده است" }, 400);
  payload.updated_by_email = normalizeEmail(authUser.email);
  payload.updated_at_utc = new Date().toISOString();
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_items?id=eq.${id}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(payload),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: "به‌روزرسانی نقشه راه انجام نشد", detail: saved?.message || saved || response.status }, 500);
  const item = Array.isArray(saved) ? saved[0] : saved;
  if (dependencyAdditions.length) {
    try {
      await createChildRoadmapDependencies(env, item || { ...existing, ...payload }, dependencyAdditions, authUser);
    } catch (error) {
      return json({ error: error.message || "ثبت وابستگی‌های نقشه راه انجام نشد" }, 500);
    }
  }
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: item?.owner_email || existing.owner_email,
    action: "roadmap_update",
    oldValues: roadmapItemForClient(existing),
    newValues: roadmapItemForClient(item || { ...existing, ...payload }),
    metadata: { roadmap_id: id, title: item?.title || existing.title },
  });
  return json({ item: roadmapItemForClient(item || { ...existing, ...payload }) });
}

async function archiveRoadmapItem(request, env, authUser) {
  if (!isAccessOwnerEmail(authUser?.email)) return forbiddenAccess();
  const url = new URL(request.url);
  const id = Number.parseInt(String(url.searchParams.get("id") || ""), 10);
  if (!Number.isFinite(id) || id <= 0) return json({ error: "شناسه نقشه راه نامعتبر است" }, 400);
  const existing = await fetchRoadmapItemById(env, id);
  if (!existing) return json({ error: "آیتم نقشه راه پیدا نشد" }, 404);
  const payload = {
    status: "canceled",
    updated_by_email: normalizeEmail(authUser.email),
    updated_at_utc: new Date().toISOString(),
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_roadmap_items?id=eq.${id}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(payload),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: "آرشیو نقشه راه انجام نشد", detail: saved?.message || saved || response.status }, 500);
  const item = Array.isArray(saved) ? saved[0] : saved;
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: item?.owner_email || existing.owner_email,
    action: "roadmap_update",
    oldValues: roadmapItemForClient(existing),
    newValues: roadmapItemForClient(item || { ...existing, ...payload }),
    metadata: { roadmap_id: id, title: item?.title || existing.title, archived: true },
  });
  return json({ item: roadmapItemForClient(item || { ...existing, ...payload }) });
}

function normalizeProductName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeProductKey(value) {
  return String(value || "").trim().replace(/\s+/g, "-").toLowerCase();
}

function normalizeProductParentId(value) {
  if (value === null || value === undefined || value === "") return null;
  const id = Number.parseInt(String(value), 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

function productForClient(row) {
  return {
    id: row.id,
    parent_id: row.parent_id || null,
    name: row.name || "",
    product_key: row.product_key || "",
    owner_email: row.owner_email || "",
    description: row.description || "",
    is_active: row.is_active !== false,
    created_by_email: row.created_by_email || "",
    updated_by_email: row.updated_by_email || "",
    created_at_utc: row.created_at_utc || "",
    updated_at_utc: row.updated_at_utc || "",
  };
}

async function fetchProductRows(env) {
  const params = new URLSearchParams({
    select: "id,parent_id,name,product_key,owner_email,description,is_active,created_by_email,updated_by_email,created_at_utc,updated_at_utc",
    order: "parent_id.asc.nullsfirst,name.asc",
    limit: "1000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_products?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) throw new Error(body?.message || "دریافت محصول‌ها انجام نشد");
  return Array.isArray(body) ? body : [];
}

async function fetchProducts(env) {
  try {
    const [rows, users] = await Promise.all([
      fetchProductRows(env),
      listAccessUsers(env),
    ]);
    return json({
      products: rows.map(productForClient),
      users: users.map((user) => ({
        email: normalizeEmail(user.email),
        telegram_username: user.telegram_username || "",
        is_active: isAccessOwnerEmail(user.email) ? true : Boolean(user.is_active),
        is_owner: isAccessOwnerEmail(user.email),
      })),
    });
  } catch (error) {
    return json({ error: error.message || "دریافت محصول‌ها انجام نشد" }, 500);
  }
}

async function fetchProductById(env, id) {
  const params = new URLSearchParams({
    select: "id,parent_id,name,product_key,owner_email,description,is_active,created_by_email,updated_by_email,created_at_utc,updated_at_utc",
    id: `eq.${id}`,
    limit: "1",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_products?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

async function validateProductParent(env, parentId, currentId = null) {
  if (!parentId) return null;
  if (currentId && Number(parentId) === Number(currentId)) throw new Error("محصول نمی‌تواند زیرمحصول خودش باشد");
  const parent = await fetchProductById(env, parentId);
  if (!parent) throw new Error("محصول مادر پیدا نشد");
  if (parent.parent_id) throw new Error("محصول مادر باید محصول اصلی باشد");
  return parent.id;
}

function productPayloadFromBody(body) {
  const name = normalizeProductName(body.name);
  if (name.length < 2 || name.length > 140) throw new Error("نام محصول باید بین ۲ تا ۱۴۰ کاراکتر باشد");
  const productKey = normalizeProductKey(body.product_key);
  if (productKey && !/^[a-z0-9][a-z0-9._-]{1,78}[a-z0-9]$/.test(productKey)) throw new Error("کلید محصول باید با حروف انگلیسی، عدد، نقطه، خط تیره یا زیرخط باشد");
  const ownerEmail = body.owner_email ? normalizeEmail(body.owner_email) : "";
  if (body.owner_email && !ownerEmail) throw new Error("مدیر محصول نامعتبر است");
  const description = String(body.description || "").trim();
  if (description.length > 600) throw new Error("توضیح محصول بیش از حد طولانی است");
  return {
    name,
    product_key: productKey || null,
    owner_email: ownerEmail || null,
    description,
    is_active: body.is_active !== false,
  };
}

async function createProduct(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  let payload;
  try {
    payload = productPayloadFromBody(body);
    payload.parent_id = await validateProductParent(env, normalizeProductParentId(body.parent_id));
  } catch (error) {
    return json({ error: error.message || "اطلاعات محصول نامعتبر است" }, 400);
  }
  const now = new Date().toISOString();
  const row = {
    ...payload,
    created_by_email: normalizeEmail(authUser.email),
    updated_by_email: normalizeEmail(authUser.email),
    created_at_utc: now,
    updated_at_utc: now,
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_products`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(row),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: saved?.code === "23505" ? "محصولی با این نام یا کلید وجود دارد" : "ساخت محصول انجام نشد", detail: saved?.message || saved || response.status }, 400);
  const product = Array.isArray(saved) ? saved[0] : saved;
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: authUser.email,
    action: "product_create",
    newValues: product || row,
    metadata: { product_id: product?.id || null, name: row.name, parent_id: row.parent_id },
  });
  return json({ product: productForClient(product || row) }, 201);
}

async function updateProduct(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const id = Number.parseInt(String(body.id || ""), 10);
  if (!Number.isFinite(id) || id <= 0) return json({ error: "شناسه محصول نامعتبر است" }, 400);
  const existing = await fetchProductById(env, id);
  if (!existing) return json({ error: "محصول پیدا نشد" }, 404);
  let payload;
  try {
    payload = productPayloadFromBody(body);
    payload.parent_id = await validateProductParent(env, normalizeProductParentId(body.parent_id), id);
  } catch (error) {
    return json({ error: error.message || "اطلاعات محصول نامعتبر است" }, 400);
  }
  const patch = {
    ...payload,
    updated_by_email: normalizeEmail(authUser.email),
    updated_at_utc: new Date().toISOString(),
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_products?id=eq.${id}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(patch),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: saved?.code === "23505" ? "محصولی با این نام یا کلید وجود دارد" : "ذخیره محصول انجام نشد", detail: saved?.message || saved || response.status }, 400);
  const product = Array.isArray(saved) ? saved[0] : saved;
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: authUser.email,
    action: "product_update",
    oldValues: existing,
    newValues: product || { ...existing, ...patch },
    metadata: { product_id: id, name: patch.name, parent_id: patch.parent_id },
  });
  return json({ product: productForClient(product || { ...existing, ...patch }) });
}

async function deleteProduct(request, env, authUser) {
  const id = Number.parseInt(String(new URL(request.url).searchParams.get("id") || ""), 10);
  if (!Number.isFinite(id) || id <= 0) return json({ error: "شناسه محصول نامعتبر است" }, 400);
  const existing = await fetchProductById(env, id);
  if (!existing) return json({ error: "محصول پیدا نشد" }, 404);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_products?id=eq.${id}`, {
    method: "DELETE",
    headers: supabaseHeaders(env, "return=minimal"),
  });
  if (!response.ok) return json({ error: "حذف محصول انجام نشد", detail: await response.text() }, 500);
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: authUser.email,
    action: "product_delete",
    oldValues: existing,
    metadata: { product_id: id, name: existing.name },
  });
  return json({ ok: true });
}

function normalizeUserGroupName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

const USER_GROUP_TYPES = new Set([
  "squad",
  "gtm",
  "content",
  "marketing",
  "sales",
  "account",
  "commercial",
  "product_design",
  "product_management",
  "product_operations",
  "engineering",
]);
const USER_GROUP_MODES = new Set(["functional", "cross_functional"]);

function normalizeUserGroupType(value) {
  const groupType = String(value || "").trim().toLowerCase();
  return USER_GROUP_TYPES.has(groupType) ? groupType : "squad";
}

function normalizeUserGroupMode(value) {
  const groupMode = String(value || "").trim().toLowerCase();
  return USER_GROUP_MODES.has(groupMode) ? groupMode : "functional";
}

function userGroupForClient(group, membersByGroup, productsByGroup = new Map()) {
  return {
    id: group.id,
    name: group.name || "",
    group_type: normalizeUserGroupType(group.group_type),
    group_mode: normalizeUserGroupMode(group.group_mode),
    description: group.description || "",
    member_emails: membersByGroup.get(String(group.id)) || [],
    product_ids: productsByGroup.get(String(group.id)) || [],
    created_by_email: group.created_by_email || "",
    updated_by_email: group.updated_by_email || "",
    created_at_utc: group.created_at_utc || "",
    updated_at_utc: group.updated_at_utc || "",
  };
}

async function fetchUserGroupRows(env) {
  const params = new URLSearchParams({
    select: "id,name,group_type,group_mode,description,created_by_email,updated_by_email,created_at_utc,updated_at_utc",
    order: "group_type.asc,group_mode.asc,name.asc",
    limit: "1000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_groups?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) throw new Error(body?.message || "دریافت گروه‌های کاربران انجام نشد");
  return Array.isArray(body) ? body : [];
}

async function fetchUserGroupMemberRows(env) {
  const params = new URLSearchParams({
    select: "group_id,user_email",
    order: "user_email.asc",
    limit: "10000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_group_members?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) throw new Error(body?.message || "دریافت عضویت گروه‌های کاربران انجام نشد");
  return Array.isArray(body) ? body : [];
}

async function fetchUserGroupProductRows(env) {
  const params = new URLSearchParams({
    select: "group_id,product_id",
    order: "product_id.asc",
    limit: "10000",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_group_products?${params}`, { headers: supabaseHeaders(env) });
  const body = await readSupabaseJson(response);
  if (!response.ok) throw new Error(body?.message || "دریافت محصول‌های گروه‌ها انجام نشد");
  return Array.isArray(body) ? body : [];
}

function membersByGroupId(memberRows) {
  const map = new Map();
  memberRows.forEach((row) => {
    const key = String(row.group_id || "");
    if (!key) return;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(normalizeEmail(row.user_email));
  });
  return map;
}

function productsByGroupId(productRows) {
  const map = new Map();
  productRows.forEach((row) => {
    const key = String(row.group_id || "");
    if (!key) return;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(Number(row.product_id));
  });
  return map;
}

async function fetchUserGroups(env) {
  try {
    const [groups, memberRows, productRows, users, products] = await Promise.all([
      fetchUserGroupRows(env),
      fetchUserGroupMemberRows(env),
      fetchUserGroupProductRows(env),
      listAccessUsers(env),
      fetchProductRows(env),
    ]);
    const members = membersByGroupId(memberRows);
    const groupProducts = productsByGroupId(productRows);
    return json({
      groups: groups.map((group) => userGroupForClient(group, members, groupProducts)),
      users: users.map((user) => ({
        email: normalizeEmail(user.email),
        telegram_username: user.telegram_username || "",
        is_active: isAccessOwnerEmail(user.email) ? true : Boolean(user.is_active),
        is_owner: isAccessOwnerEmail(user.email),
      })),
      products: products.map(productForClient),
    });
  } catch (error) {
    return json({ error: error.message || "دریافت گروه‌بندی کاربران انجام نشد" }, 500);
  }
}

async function fetchUserGroupById(env, id) {
  const params = new URLSearchParams({
    select: "id,name,group_type,group_mode,description,created_by_email,updated_by_email,created_at_utc,updated_at_utc",
    id: `eq.${id}`,
    limit: "1",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_groups?${params}`, { headers: supabaseHeaders(env) });
  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

function normalizeMemberEmails(value, validEmails) {
  const validSet = new Set(validEmails.map(normalizeEmail));
  return [...new Set((Array.isArray(value) ? value : [])
    .map(normalizeEmail)
    .filter((email) => validSet.has(email)))];
}

function normalizeProductIds(value, validIds) {
  const validSet = new Set(validIds.map((id) => String(id)));
  return [...new Set((Array.isArray(value) ? value : [])
    .map((item) => Number.parseInt(String(item || ""), 10))
    .filter((id) => Number.isFinite(id) && id > 0 && validSet.has(String(id))))];
}

async function createUserGroup(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const name = normalizeUserGroupName(body.name);
  if (name.length < 2 || name.length > 120) return json({ error: "نام گروه باید بین ۲ تا ۱۲۰ کاراکتر باشد" }, 400);
  const groupType = normalizeUserGroupType(body.group_type);
  const groupMode = normalizeUserGroupMode(body.group_mode);
  const description = String(body.description || "").trim();
  if (description.length > 500) return json({ error: "توضیح گروه بیش از حد طولانی است" }, 400);
  const now = new Date().toISOString();
  const row = {
    name,
    group_type: groupType,
    group_mode: groupMode,
    description,
    created_by_email: normalizeEmail(authUser.email),
    updated_by_email: normalizeEmail(authUser.email),
    created_at_utc: now,
    updated_at_utc: now,
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_groups`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(row),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: saved?.code === "23505" ? "گروهی با این نام وجود دارد" : "ساخت گروه انجام نشد", detail: saved?.message || saved || response.status }, 400);
  const group = Array.isArray(saved) ? saved[0] : saved;
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: authUser.email,
    action: "user_group_create",
    newValues: group || row,
    metadata: { user_group_id: group?.id || null, name, group_type: groupType, group_mode: groupMode },
  });
  return json({ group: userGroupForClient(group || row, new Map()) }, 201);
}

async function replaceUserGroupMembers(env, groupId, memberEmails) {
  const deleteResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_group_members?group_id=eq.${groupId}`, {
    method: "DELETE",
    headers: supabaseHeaders(env, "return=minimal"),
  });
  if (!deleteResponse.ok) throw new Error("پاک‌سازی عضویت‌های قبلی انجام نشد");
  if (!memberEmails.length) return;
  const now = new Date().toISOString();
  const rows = memberEmails.map((email) => ({ group_id: groupId, user_email: email, created_at_utc: now }));
  const insertResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_group_members`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=minimal"),
    body: JSON.stringify(rows),
  });
  if (!insertResponse.ok) throw new Error("ذخیره عضویت کاربران انجام نشد");
}

async function replaceUserGroupProducts(env, groupId, productIds) {
  const deleteResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_group_products?group_id=eq.${groupId}`, {
    method: "DELETE",
    headers: supabaseHeaders(env, "return=minimal"),
  });
  if (!deleteResponse.ok) throw new Error("پاک‌سازی محصول‌های قبلی گروه انجام نشد");
  if (!productIds.length) return;
  const now = new Date().toISOString();
  const rows = productIds.map((productId) => ({ group_id: groupId, product_id: productId, created_at_utc: now }));
  const insertResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_group_products`, {
    method: "POST",
    headers: supabaseHeaders(env, "return=minimal"),
    body: JSON.stringify(rows),
  });
  if (!insertResponse.ok) throw new Error("ذخیره محصول‌های گروه انجام نشد");
}

async function updateUserGroup(request, env, authUser) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "درخواست نامعتبر است" }, 400);
  }
  const id = Number.parseInt(String(body.id || ""), 10);
  if (!Number.isFinite(id) || id <= 0) return json({ error: "شناسه گروه نامعتبر است" }, 400);
  const existing = await fetchUserGroupById(env, id);
  if (!existing) return json({ error: "گروه پیدا نشد" }, 404);
  const name = normalizeUserGroupName(body.name);
  if (name.length < 2 || name.length > 120) return json({ error: "نام گروه باید بین ۲ تا ۱۲۰ کاراکتر باشد" }, 400);
  const groupType = normalizeUserGroupType(body.group_type);
  const groupMode = normalizeUserGroupMode(body.group_mode);
  const description = String(body.description || "").trim();
  if (description.length > 500) return json({ error: "توضیح گروه بیش از حد طولانی است" }, 400);
  const [users, products] = await Promise.all([listAccessUsers(env), fetchProductRows(env)]);
  const memberEmails = normalizeMemberEmails(body.member_emails, users.map((user) => user.email));
  const productIds = normalizeProductIds(body.product_ids, products.map((product) => product.id));
  const patch = {
    name,
    group_type: groupType,
    group_mode: groupMode,
    description,
    updated_by_email: normalizeEmail(authUser.email),
    updated_at_utc: new Date().toISOString(),
  };
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_groups?id=eq.${id}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=representation"),
    body: JSON.stringify(patch),
  });
  const saved = await readSupabaseJson(response);
  if (!response.ok) return json({ error: saved?.code === "23505" ? "گروهی با این نام وجود دارد" : "ذخیره گروه انجام نشد", detail: saved?.message || saved || response.status }, 400);
  try {
    await Promise.all([
      replaceUserGroupMembers(env, id, memberEmails),
      replaceUserGroupProducts(env, id, productIds),
    ]);
  } catch (error) {
    return json({ error: error.message || "ذخیره گروه انجام نشد" }, 500);
  }
  const group = Array.isArray(saved) ? saved[0] : saved;
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: authUser.email,
    action: "user_group_update",
    oldValues: existing,
    newValues: { ...(group || { ...existing, ...patch }), member_emails: memberEmails, product_ids: productIds },
    metadata: { user_group_id: id, name, group_type: groupType, group_mode: groupMode, product_ids: productIds },
  });
  return json({ group: userGroupForClient(group || { ...existing, ...patch }, new Map([[String(id), memberEmails]]), new Map([[String(id), productIds]])) });
}

async function deleteUserGroup(request, env, authUser) {
  const id = Number.parseInt(String(new URL(request.url).searchParams.get("id") || ""), 10);
  if (!Number.isFinite(id) || id <= 0) return json({ error: "شناسه گروه نامعتبر است" }, 400);
  const existing = await fetchUserGroupById(env, id);
  if (!existing) return json({ error: "گروه پیدا نشد" }, 404);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_user_groups?id=eq.${id}`, {
    method: "DELETE",
    headers: supabaseHeaders(env, "return=minimal"),
  });
  if (!response.ok) return json({ error: "حذف گروه انجام نشد", detail: await response.text() }, 500);
  await insertAccessAuditLog(env, {
    actorEmail: authUser.email,
    targetEmail: authUser.email,
    action: "user_group_delete",
    oldValues: existing,
    metadata: { user_group_id: id, name: existing.name },
  });
  return json({ ok: true });
}

async function fetchBots(env) {
  const params = new URLSearchParams();
  params.set("select", "platform,bot_id,bot_username,bot_name,webhook_path,is_active,first_seen_at_utc,last_seen_at_utc,last_update_at_utc,credential_last4,credential_updated_at_utc,created_by_email,message_count,group_count,last_message_at_utc");
  params.set("order", "last_seen_at_utc.desc.nullslast,platform.asc");
  params.set("limit", "1000");
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_bot_stats?${params}`, {
    headers: supabaseHeaders(env),
  });
  if (!response.ok) {
    return json({ error: "درخواست بات‌ها از دیتابیس انجام نشد", detail: await response.text() }, 500);
  }
  const bots = (await response.json()).map((row) => ({
    ...row,
    message_count: Number(row.message_count || 0),
    group_count: Number(row.group_count || 0),
    first_seen_tehran: row.first_seen_at_utc ? tehranDateTimeDisplay(new Date(row.first_seen_at_utc)) : null,
    last_seen_tehran: row.last_seen_at_utc ? tehranDateTimeDisplay(new Date(row.last_seen_at_utc)) : null,
    last_message_tehran: row.last_message_at_utc ? tehranDateTimeDisplay(new Date(row.last_message_at_utc)) : null,
    credential_updated_tehran: row.credential_updated_at_utc ? tehranDateTimeDisplay(new Date(row.credential_updated_at_utc)) : null,
    display_timezone: "Asia/Tehran",
  }));
  return json({ bots });
}

async function fetchDashboard(request, env, authUser) {
  const restricted = !groupAccessForUser(authUser).unrestricted;
  if (!restricted && dashboardApiCache && Date.now() - dashboardApiCache.createdAt < API_CACHE_TTL_MS) {
    return json(dashboardApiCache.data);
  }
  const params = new URLSearchParams();
  params.set("select", "platform,chat_id,sent_at_utc,chat_title,sender_id,sender_username,sender_first_name,sender_last_name");
  params.set("sent_at_utc", "not.is.null");
  params.set("order", "sent_at_utc.asc");
  params.set("limit", "10000");
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, {
    headers: supabaseHeaders(env),
  });
  if (!response.ok) {
    return json({ error: "درخواست داشبورد از دیتابیس انجام نشد", detail: await response.text() }, 500);
  }
  const byDate = new Map();
  const byUserDate = new Map();
  const groupTotals = new Map();
  const userTotals = new Map();
  let totalMessages = 0;
  const allowedSet = await allowedChatKeySet(env, authUser);
  for (const row of (await response.json()).filter((item) => rowAllowedByChatSet(item, allowedSet))) {
    if (!row.sent_at_utc) continue;
    const sentDate = new Date(row.sent_at_utc);
    const tehranDate = tehranIsoDateFast(sentDate);
    const group = `${platformLabel(row.platform)} / ${row.chat_title || "بدون نام"}`;
    const senderName = [row.sender_first_name, row.sender_last_name].filter(Boolean).join(" ").trim();
    const senderUsername = row.sender_username ? `@${row.sender_username}` : "";
    const user = senderName
      ? (senderUsername ? `${senderName} (${senderUsername})` : senderName)
      : (senderUsername || (row.sender_id ? `کاربر ${row.sender_id}` : "کاربر ناشناس"));
    const day = byDate.get(tehranDate) || { date: tehranDate, jalali_date: null, total: 0, groups: {} };
    if (!day.jalali_date) day.jalali_date = jalaliDateFast(sentDate);
    day.total += 1;
    day.groups[group] = (day.groups[group] || 0) + 1;
    byDate.set(tehranDate, day);
    const userDay = byUserDate.get(tehranDate) || { date: tehranDate, jalali_date: null, total: 0, users: {} };
    if (!userDay.jalali_date) userDay.jalali_date = jalaliDateFast(sentDate);
    userDay.total += 1;
    userDay.users[user] = (userDay.users[user] || 0) + 1;
    byUserDate.set(tehranDate, userDay);
    groupTotals.set(group, (groupTotals.get(group) || 0) + 1);
    userTotals.set(user, (userTotals.get(user) || 0) + 1);
    totalMessages += 1;
  }
  const days = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const userDays = [...byUserDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const groups = [...groupTotals.entries()].sort((a, b) => b[1] - a[1]).map(([group]) => group);
  const users = [...userTotals.entries()].sort((a, b) => b[1] - a[1]).map(([user]) => user);
  const data = { days, groups, user_days: userDays, users, total_messages: totalMessages, display_timezone: "Asia/Tehran" };
  if (!restricted) dashboardApiCache = { createdAt: Date.now(), data };
  return json(data);
}

function responseMetricBucket() {
  return { count: 0, total_ms: 0, min_ms: null, max_ms: null, values: [] };
}

function addResponseMetric(bucket, ms) {
  bucket.count += 1;
  bucket.total_ms += ms;
  bucket.min_ms = bucket.min_ms === null ? ms : Math.min(bucket.min_ms, ms);
  bucket.max_ms = bucket.max_ms === null ? ms : Math.max(bucket.max_ms, ms);
  bucket.values.push(ms);
}

function finishResponseMetric(bucket) {
  const values = [...bucket.values].sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);
  const median = values.length
    ? (values.length % 2 ? values[middle] : Math.round((values[middle - 1] + values[middle]) / 2))
    : 0;
  return {
    count: bucket.count,
    total_ms: bucket.total_ms,
    avg_ms: bucket.count ? Math.round(bucket.total_ms / bucket.count) : 0,
    median_ms: median,
    min_ms: bucket.min_ms ?? 0,
    max_ms: bucket.max_ms ?? 0,
  };
}

function isDashboardGeneratedMessage(row) {
  const payload = row?.raw_payload_json || {};
  return Boolean(row?.sender_is_bot || payload.dashboard_thread_reply === true || payload.dashboard_broadcast === true);
}

async function fetchAnalytics(request, env, authUser) {
  const headers = supabaseHeaders(env);
  const groupParams = new URLSearchParams();
  groupParams.set("select", "platform,chat_id,chat_title,group_label");
  groupParams.set("limit", "10000");
  const messageParams = new URLSearchParams();
  messageParams.set("select", "platform,chat_id,chat_title,message_id,reply_to_message_id,message_thread_id,is_topic_message,topic_name,sender_id,sender_is_bot,sent_at_utc,raw_payload_json");
  messageParams.set("sent_at_utc", "not.is.null");
  messageParams.set("order", "sent_at_utc.asc");
  messageParams.set("limit", "10000");
  const senderLabelParams = new URLSearchParams();
  senderLabelParams.set("select", "platform,sender_id,sender_label");
  senderLabelParams.set("limit", "10000");
  const [groupsResponse, messagesResponse, senderLabelsResponse] = await Promise.all([
    fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${groupParams}`, { headers }),
    fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${messageParams}`, { headers }),
    fetch(`${env.SUPABASE_URL}/rest/v1/visibility_sender_labels?${senderLabelParams}`, { headers }),
  ]);
  if (!groupsResponse.ok) return json({ error: "درخواست گروه‌ها از دیتابیس انجام نشد", detail: await groupsResponse.text() }, 500);
  if (!messagesResponse.ok) return json({ error: "درخواست پیام‌ها از دیتابیس انجام نشد", detail: await messagesResponse.text() }, 500);
  if (!senderLabelsResponse.ok) return json({ error: "درخواست لیبل افراد از دیتابیس انجام نشد", detail: await senderLabelsResponse.text() }, 500);

  const groupByKey = new Map((await groupsResponse.json()).map((group) => [chatKey(group), group]));
  const senderLabelByKey = new Map((await senderLabelsResponse.json()).map((row) => [`${normalizePlatform(row.platform)}:${row.sender_id}`, row.sender_label || ""]));
  const allowedSet = await allowedChatKeySet(env, authUser);
  const rows = (await messagesResponse.json()).filter((row) => rowAllowedByChatSet(row, allowedSet));
  const byMessage = new Map();
  for (const row of rows) {
    const key = messageKey(row);
    if (key) byMessage.set(key, row);
  }

  const overall = responseMetricBucket();
  const byGroup = new Map();
  const byLabel = new Map();
  const bySenderLabel = new Map();

  for (const row of rows) {
    if (!row.reply_to_message_id || isTopicRootReplyRow(row) || isDashboardGeneratedMessage(row)) continue;
    const parent = byMessage.get(messageKey(row, row.reply_to_message_id));
    if (!parent || isDashboardGeneratedMessage(parent)) continue;
    const replyAt = Date.parse(row.sent_at_utc);
    const parentAt = Date.parse(parent.sent_at_utc);
    const diff = replyAt - parentAt;
    if (!Number.isFinite(diff) || diff <= 0) continue;

    const groupKey = chatKey(row);
    const group = groupByKey.get(groupKey) || row;
    const label = group?.group_label || "";
    const senderLabel = row.sender_id ? (senderLabelByKey.get(`${normalizePlatform(row.platform)}:${row.sender_id}`) || "") : "";
    if (!byGroup.has(groupKey)) {
      byGroup.set(groupKey, {
        platform: normalizePlatform(row.platform),
        chat_id: row.chat_id,
        chat_title: group?.chat_title || row.chat_title || "بدون نام",
        group_label: label,
        bucket: responseMetricBucket(),
      });
    }
    if (!byLabel.has(label)) {
      byLabel.set(label, {
        group_label: label,
        label_text: groupLabelTextServer(label),
        bucket: responseMetricBucket(),
      });
    }
    if (!bySenderLabel.has(senderLabel)) {
      bySenderLabel.set(senderLabel, {
        sender_label: senderLabel,
        label_text: senderLabelTextServer(senderLabel),
        bucket: responseMetricBucket(),
      });
    }
    addResponseMetric(overall, diff);
    addResponseMetric(byGroup.get(groupKey).bucket, diff);
    addResponseMetric(byLabel.get(label).bucket, diff);
    addResponseMetric(bySenderLabel.get(senderLabel).bucket, diff);
  }

  const groups = [...byGroup.values()]
    .map((row) => ({ ...row, ...finishResponseMetric(row.bucket), bucket: undefined }))
    .sort((a, b) => b.count - a.count || a.chat_title.localeCompare(b.chat_title));
  const labels = [...byLabel.values()]
    .map((row) => ({ ...row, ...finishResponseMetric(row.bucket), bucket: undefined }))
    .sort((a, b) => b.count - a.count || a.label_text.localeCompare(b.label_text));
  const senderLabels = [...bySenderLabel.values()]
    .map((row) => ({ ...row, ...finishResponseMetric(row.bucket), bucket: undefined }))
    .sort((a, b) => b.count - a.count || a.label_text.localeCompare(b.label_text));
  return json({
    overall: finishResponseMetric(overall),
    labels,
    sender_labels: senderLabels,
    groups,
    display_timezone: "Asia/Tehran",
    rule: "response_time = reply.sent_at_utc - parent.sent_at_utc",
  });
}

async function fetchThreadFilterOptions(request, env, authUser) {
  const restricted = !groupAccessForUser(authUser).unrestricted;
  if (!restricted && threadFilterOptionsApiCache && Date.now() - threadFilterOptionsApiCache.createdAt < API_CACHE_TTL_MS) {
    return json(threadFilterOptionsApiCache.data);
  }
  const headers = supabaseHeaders(env);
  const groupParams = new URLSearchParams();
  groupParams.set("select", "platform,chat_id,chat_title,group_label,message_count,last_seen_at_utc");
  groupParams.set("order", "message_count.desc,last_seen_at_utc.desc");
  groupParams.set("limit", "1000");
  const groupsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${groupParams}`, { headers });
  if (!groupsResponse.ok) {
    return json({ error: "درخواست گروه‌ها از دیتابیس انجام نشد", detail: await groupsResponse.text() }, 500);
  }

  const dateParams = new URLSearchParams();
  dateParams.set("select", "platform,chat_id,sent_at_utc");
  dateParams.set("sent_at_utc", "not.is.null");
  dateParams.set("order", "sent_at_utc.desc");
  dateParams.set("limit", "10000");
  const datesResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${dateParams}`, { headers });
  if (!datesResponse.ok) {
    return json({ error: "درخواست تاریخ‌ها از دیتابیس انجام نشد", detail: await datesResponse.text() }, 500);
  }

  const topicsParams = new URLSearchParams();
  topicsParams.set("select", "platform,chat_id,topic_name,message_thread_id");
  topicsParams.set("limit", "10000");
  const topicsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_topics?${topicsParams}`, { headers });
  if (!topicsResponse.ok) {
    return json({ error: "درخواست تاپیک‌ها از دیتابیس انجام نشد", detail: await topicsResponse.text() }, 500);
  }
  const groupAccess = groupAccessForUser(authUser);
  const groups = (await groupsResponse.json())
    .filter((group) => group.chat_title && groupRowAllowedByAccess(group, groupAccess))
    .map((group) => ({
      ...group,
      group_label: group.group_label || "",
      group_label_text: groupLabelTextServer(group.group_label),
    }));
  const platforms = [...new Set(groups.map((group) => normalizePlatform(group.platform)))];
  const groupTitleById = new Map(groups.map((group) => [chatKey(group), group.chat_title]));
  const groupLabelById = new Map(groups.map((group) => [chatKey(group), group.group_label || ""]));
  const topicsByKey = new Map();
  for (const topic of await topicsResponse.json()) {
    const topicName = realTopicName(topic.topic_name);
    const chatTitle = groupTitleById.get(chatKey(topic)) || "";
    if (!chatTitle || !topicName) continue;
    topicsByKey.set(`${normalizePlatform(topic.platform)}:${topic.chat_id}:${topic.message_thread_id || topicName}`, {
      platform: normalizePlatform(topic.platform),
      chat_id: topic.chat_id,
      chat_title: chatTitle,
      group_label: groupLabelById.get(chatKey(topic)) || "",
      group_label_text: groupLabelTextServer(groupLabelById.get(chatKey(topic))),
      topic_name: topicName,
    });
  }
  const topics = [...topicsByKey.values()].sort((a, b) => a.chat_title.localeCompare(b.chat_title) || a.topic_name.localeCompare(b.topic_name));
  const dateByTehranDay = new Map();
  const allowedSet = await allowedChatKeySet(env, authUser);
  for (const row of (await datesResponse.json()).filter((item) => rowAllowedByChatSet(item, allowedSet))) {
    if (!row.sent_at_utc) continue;
    const sentDate = new Date(row.sent_at_utc);
    const tehranDate = tehranIsoDateFast(sentDate);
    if (!dateByTehranDay.has(tehranDate)) dateByTehranDay.set(tehranDate, sentDate);
  }
  const jalaliDates = [...dateByTehranDay.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([, date]) => jalaliDateFast(date));
  const data = { groups, topics, platforms, jalali_dates: jalaliDates };
  if (!restricted) threadFilterOptionsApiCache = { createdAt: Date.now(), data };
  return json(data);
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      console.error("unhandled worker error", error?.stack || error?.message || error);
      const url = new URL(request.url);
      if (!url.pathname.startsWith("/api/") && request.headers.get("cookie")?.includes("visibility_session=")) {
        return new Response(null, {
          status: 303,
          headers: secureHeaders({
            location: "/",
            "set-cookie": clearSessionCookie(),
            "cache-control": "no-store",
          }),
        });
      }
      if (url.pathname.startsWith("/api/")) {
        return json({ error: "خطای موقت سرور. لطفاً دوباره تلاش کنید." }, 500);
      }
      return text("خطای موقت سرور. لطفاً دوباره تلاش کنید.", 500);
    }
  },
};

async function handleRequest(request, env) {
    const url = new URL(request.url);
    if ((url.pathname.startsWith("/assets/") || url.pathname.startsWith("/fonts/")) && env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      const headers = new Headers(assetResponse.headers);
      for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers,
      });
    }
    if (url.pathname === "/telegram-webhook") return handleTelegramWebhook(request, env);
    if (url.pathname === "/bale-webhook") return handleBaleWebhook(request, env);
    if (url.pathname.startsWith("/bot-webhook/")) return handleStoredBotWebhook(request, env);
    if (url.pathname === "/login") return redirect("/");
    if (url.pathname === "/") return handleLogin(request, env);
    if (url.pathname === "/forgot-password") return handleForgotPassword(request, env);
    if (url.pathname === "/recovery") return handleRecoveryPassword(request, env);
    if (url.pathname === "/logout") {
      return new Response(null, {
        status: 303,
        headers: secureHeaders({
          location: "/",
          "set-cookie": clearSessionCookie(),
        }),
      });
    }
    const authUser = await dashboardAuthorized(request, env);
    if (url.pathname === "/set-password") return handleSetPassword(request, env, authUser);
    const apiPath = url.pathname.startsWith("/api/");
    if (!authUser) {
      if (apiPath) return json({ error: "Unauthorized" }, 401);
      return redirect("/");
    }
    if (authUser.must_change_password) {
      if (apiPath) return json({ error: "تغییر پسورد الزامی است" }, 403);
      return redirect("/set-password");
    }
    if (url.pathname === "/") return redirect(defaultMainPathForUser(authUser));
    if (url.pathname === "/main") return redirect(defaultMainPathForUser(authUser));
    if (url.pathname === "/main" || url.pathname.startsWith("/main/")) {
      const html = HTML
        .replace("__CURRENT_USER_PERMISSIONS__", JSON.stringify(accessPermissionsForUser(authUser)))
        .replace("__CURRENT_USER__", JSON.stringify(await publicUserProfile(env, authUser)));
      return text(html, 200, "text/html; charset=utf-8");
    }
    if (url.pathname === "/api/debug") return text("Not found", 404);
    if (url.pathname === "/api/me" && request.method === "GET") return fetchCurrentUser(env, authUser);
    if (url.pathname === "/api/me" && request.method === "PATCH") return updateCurrentUserProfile(request, env, authUser);
    if (url.pathname === "/api/telegram-webhook-info" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/telegram-webhook-reset" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/bale-webhook-info" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/bale-webhook-reset" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/telegram-webhook-info" && request.method === "GET") return fetchTelegramWebhookInfo(env);
    if (url.pathname === "/api/telegram-webhook-reset" && request.method === "POST") return resetTelegramWebhook(request, env);
    if (url.pathname === "/api/bale-webhook-info" && request.method === "GET") return fetchBaleWebhookInfo(env);
    if (url.pathname === "/api/bale-webhook-reset" && request.method === "POST") return resetBaleWebhook(request, env);
    if (url.pathname === "/api/access-users" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname.startsWith("/api/access-users/") && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/access-groups" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/access-logs" && !hasAccessPermission(authUser, "access")) return forbiddenAccess();
    if (url.pathname === "/api/access-users" && request.method === "GET") return fetchAccessUsers(env);
    if (url.pathname === "/api/access-users" && request.method === "POST") return addAccessUser(request, env, authUser);
    if (url.pathname === "/api/access-users/resend-invite" && request.method === "POST") return resendAccessInviteEmail(request, env, authUser);
    if (url.pathname === "/api/access-users/revoke" && request.method === "POST") return revokeAccessUser(request, env, authUser);
    if (url.pathname === "/api/access-users/reactivate" && request.method === "POST") return reactivateAccessUser(request, env, authUser);
    if (url.pathname === "/api/access-users/permissions" && request.method === "POST") return updateAccessUserPermissions(request, env, authUser);
    if (url.pathname === "/api/access-users/group-access" && request.method === "POST") return updateAccessUserGroupAccess(request, env, authUser);
    if (url.pathname === "/api/access-groups" && request.method === "GET") return fetchAccessGroups(env);
    if (url.pathname === "/api/access-logs" && request.method === "GET") return fetchAccessAuditLogs(env);
    if (url.pathname === "/api/messages") {
      const view = url.searchParams.get("view");
      if (view === "threads" ? !hasAccessPermission(authUser, "threads") : !hasAccessPermission(authUser, "messages")) return forbiddenAccess();
      return fetchMessages(request, env, authUser);
    }
    if (url.pathname === "/api/thread-reply" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "reply")) return forbiddenAccess();
      return sendThreadReply(request, env, authUser);
    }
    if (url.pathname === "/api/broadcast-groups" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "broadcast")) return forbiddenAccess();
      return fetchBroadcastGroups(env, authUser);
    }
    if (url.pathname === "/api/broadcast-logs" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "broadcast")) return forbiddenAccess();
      return fetchBroadcastLogs(env, authUser);
    }
    if (url.pathname === "/api/group-broadcast" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "broadcast")) return forbiddenAccess();
      return sendGroupBroadcast(request, env, authUser);
    }
    if (url.pathname === "/api/groups") {
      if (!hasAccessPermission(authUser, "groups")) return forbiddenAccess();
      return fetchGroups(request, env, authUser);
    }
    if (url.pathname === "/api/groups/label" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "groups")) return forbiddenAccess();
      return updateGroupLabel(request, env, authUser);
    }
    if (url.pathname === "/api/senders") {
      if (!hasAccessPermission(authUser, "senders")) return forbiddenAccess();
      return fetchSenders(request, env, authUser);
    }
    if (url.pathname === "/api/senders/label" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "senders")) return forbiddenAccess();
      return updateSenderLabel(request, env, authUser);
    }
    if (url.pathname === "/api/bots" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "bots")) return forbiddenAccess();
      return fetchBots(env);
    }
    if (url.pathname === "/api/bots" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "bots")) return forbiddenAccess();
      return addBotFromDashboard(request, env, authUser);
    }
    if (url.pathname === "/api/roadmap" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "roadmap")) return forbiddenAccess();
      return fetchRoadmapItems(env);
    }
    if (url.pathname === "/api/roadmap" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "roadmap")) return forbiddenAccess();
      return createRoadmapItem(request, env, authUser);
    }
    if (url.pathname === "/api/roadmap" && request.method === "PATCH") {
      if (!hasAccessPermission(authUser, "roadmap")) return forbiddenAccess();
      return updateRoadmapItem(request, env, authUser);
    }
    if (url.pathname === "/api/roadmap" && request.method === "DELETE") {
      if (!hasAccessPermission(authUser, "roadmap")) return forbiddenAccess();
      return archiveRoadmapItem(request, env, authUser);
    }
    if (url.pathname === "/api/products" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "products")) return forbiddenAccess();
      return fetchProducts(env);
    }
    if (url.pathname === "/api/products" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "products")) return forbiddenAccess();
      return createProduct(request, env, authUser);
    }
    if (url.pathname === "/api/products" && request.method === "PATCH") {
      if (!hasAccessPermission(authUser, "products")) return forbiddenAccess();
      return updateProduct(request, env, authUser);
    }
    if (url.pathname === "/api/products" && request.method === "DELETE") {
      if (!hasAccessPermission(authUser, "products")) return forbiddenAccess();
      return deleteProduct(request, env, authUser);
    }
    if (url.pathname === "/api/user-groups" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "user_groups")) return forbiddenAccess();
      return fetchUserGroups(env);
    }
    if (url.pathname === "/api/user-groups" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "user_groups")) return forbiddenAccess();
      return createUserGroup(request, env, authUser);
    }
    if (url.pathname === "/api/user-groups" && request.method === "PATCH") {
      if (!hasAccessPermission(authUser, "user_groups")) return forbiddenAccess();
      return updateUserGroup(request, env, authUser);
    }
    if (url.pathname === "/api/user-groups" && request.method === "DELETE") {
      if (!hasAccessPermission(authUser, "user_groups")) return forbiddenAccess();
      return deleteUserGroup(request, env, authUser);
    }
    if (url.pathname === "/api/dashboard") {
      if (!hasAccessPermission(authUser, "dashboard")) return forbiddenAccess();
      return fetchDashboard(request, env, authUser);
    }
    if (url.pathname === "/api/analytics") {
      if (!hasAccessPermission(authUser, "analytics")) return forbiddenAccess();
      return fetchAnalytics(request, env, authUser);
    }
    if (url.pathname === "/api/thread-filter-options") {
      if (!hasAnyAccessPermission(authUser, ["messages", "threads"])) return forbiddenAccess();
      return fetchThreadFilterOptions(request, env, authUser);
    }
    if (url.pathname === "/api/profile-photo") {
      if (!hasAnyAccessPermission(authUser, ["messages", "threads"])) return forbiddenAccess();
      return fetchTelegramProfilePhoto(request, env, authUser);
    }
    if (url.pathname === "/api/file") {
      if (!hasAnyAccessPermission(authUser, ["messages", "threads"])) return forbiddenAccess();
      return fetchBotFile(request, env, authUser);
    }
    if (url.pathname === "/api/telegram-file") {
      if (!hasAnyAccessPermission(authUser, ["messages", "threads"])) return forbiddenAccess();
      return fetchBotFile(request, env, authUser);
    }
    return text("Not found", 404);
}
