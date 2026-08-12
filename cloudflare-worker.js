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
    :root { color-scheme: light; --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; --header-h:69px; --filters-h:62px; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "IRANSans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); background: var(--bg); }
    header { position:sticky; top:0; z-index:50; min-height:var(--header-h); padding: 18px 24px; background: var(--panel); border-bottom: 1px solid var(--line); display:flex; gap:16px; align-items:center; justify-content:space-between; }
    .brand { display:flex; gap:14px; align-items:center; }
    .header-tools { display:flex; align-items:center; gap:12px; }
    h1 { margin: 0; font-size: 20px; }
    nav { display:flex; gap:8px; direction:ltr; }
    .nav-button { height:32px; padding:0 12px; background:#fff; color:var(--ink); border-color:var(--line); }
    .nav-button.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    main { padding: 18px 24px; }
    .page[hidden] { display:none; }
    .filters { position:sticky; top:var(--header-h); z-index:45; display:grid; grid-template-columns: 1fr 150px 170px 170px 110px; gap:10px; min-height:var(--filters-h); align-items:center; width:calc(100% + 48px); margin:0 -24px 18px; padding:10px 24px; background:var(--bg); border-bottom:1px solid var(--line); box-shadow:0 8px 16px rgba(22,22,22,.06); }
    .thread-filters { grid-template-columns: minmax(200px, 1fr) minmax(170px, .8fr) 105px 105px 105px minmax(150px, .7fr) 110px; max-width:none; margin:0 -24px 18px; }
    input, select, button { height: 38px; border: 1px solid var(--line); border-radius: 6px; padding: 0 10px; font: inherit; background: #fff; }
    button { background: var(--accent); color: #fff; border-color: var(--accent); cursor:pointer; }
    .password-wrap { position:relative; display:block; }
    .password-wrap input { width:100%; padding-left:48px; }
    .password-toggle { position:absolute; left:6px; top:5px; width:34px; height:28px; margin:0; padding:0; display:grid; place-items:center; border:1px solid var(--line); background:#fff; color:var(--muted); }
    .password-toggle svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2; }
    .multi-filter { position:relative; min-width:0; }
    .multi-control { position:relative; }
    .multi-button { width:100%; display:flex; align-items:center; justify-content:space-between; gap:8px; background:#fff; color:var(--ink); border-color:var(--line); text-align:right; padding-inline-start:38px; }
    .multi-button::before { content:"⌄"; color:var(--muted); font-size:14px; }
    .multi-clear { position:absolute; left:7px; top:7px; z-index:2; display:none; width:24px; height:24px; padding:0; border-radius:50%; background:#eef3f4; color:var(--muted); border-color:var(--line); font-size:16px; line-height:1; }
    .multi-filter.has-value .multi-clear { display:grid; place-items:center; }
    .multi-clear:hover { background:#dde6e9; color:var(--ink); }
    .multi-label { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .multi-panel { position:absolute; inset-inline:0; top:calc(100% + 4px); z-index:12; display:none; max-height:260px; overflow:auto; padding:6px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 12px 36px rgba(23,32,38,.16); }
    .multi-filter.open .multi-panel { display:grid; gap:2px; }
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
    .group-label-select { width:100%; min-width:0; height:32px; padding:0 8px; font-size:12px; }
    td.body { direction:rtl; text-align:right; }
    .full-cell { overflow:visible; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.45; }
    .message-cell { min-width:0; }
    .message-inner { display:flex; align-items:center; gap:6px; min-width:0; width:100%; }
    .message-inner .clip { flex:1 1 auto; min-width:0; }
    .clip { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .badge { display:inline-flex; align-items:center; height:22px; margin-inline-end:6px; padding:0 8px; border-radius:999px; background:#fff4d6; color:#7a4a00; border:1px solid #f1cf75; font-size:11px; font-weight:700; direction:ltr; }
    .more { flex:0 0 auto; width:24px; height:24px; padding:0; display:inline-grid; place-items:center; border-radius:50%; font-size:16px; font-weight:700; line-height:1; }
    .details-button { height: 28px; padding: 0 8px; font-size: 12px; }
    .thread-list { display:grid; gap:14px; max-width:980px; margin:0 auto; direction:rtl; }
    .thread-card { background:var(--panel); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
    .thread-root, .thread-reply, .thread-missing { padding:16px; }
    .thread-replies { border-top:1px solid var(--line); }
    .thread-reply { position:relative; margin-right:28px; border-right:2px solid var(--line); background:#fff; }
    .thread-reply + .thread-reply { border-top:1px solid var(--line); }
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
    .confirm-copy { margin:0; color:var(--ink); white-space:normal; }
    .confirm-target { display:inline-block; direction:ltr; font-weight:800; }
    .confirm-actions { display:flex; align-items:center; justify-content:flex-start; gap:10px; margin-top:18px; }
    .confirm-cancel { background:#fff; color:var(--ink); border-color:var(--line); }
    .confirm-danger { background:#b42318; color:#fff; border-color:#b42318; }
    .details-grid { display:grid; gap:10px; white-space:normal; }
    .detail-row { display:grid; grid-template-columns: 190px minmax(0, 1fr); gap:10px; padding:10px; border:1px solid var(--line); border-radius:6px; direction:ltr; text-align:left; }
    .detail-label { color:var(--muted); font-size:12px; font-weight:700; }
    .detail-value { min-width:0; overflow-wrap:anywhere; white-space:pre-wrap; }
    .detail-pre { direction:ltr; text-align:left; font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:12px; line-height:1.55; }
    .chart-panel { max-width:1180px; margin:0 auto; padding:18px; background:var(--panel); border:1px solid var(--line); border-radius:8px; }
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
    .legend-item.active { border-color:var(--accent); background:#eefbfc; color:var(--ink); font-weight:700; }
    .legend-item.dimmed { opacity:.58; }
    .legend-swatch { width:10px; height:10px; border-radius:2px; flex:0 0 auto; }
    .empty-chart { min-height:240px; display:grid; place-items:center; color:var(--muted); border:1px dashed var(--line); border-radius:8px; }
    .access-panel { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:18px; max-width:1120px; margin:0 auto; }
    .access-panel h2 { margin:0 0 6px; font-size:18px; }
    .bots-panel { background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:18px; max-width:1180px; margin:0 auto; }
    .bots-panel h2 { margin:0 0 6px; font-size:18px; }
    .bots-panel p { margin:0 0 16px; }
    .bot-form { display:grid; grid-template-columns:130px minmax(150px, 1fr) minmax(150px, 1fr) minmax(220px, 1.3fr) 110px; gap:10px; align-items:center; margin:14px 0 16px; }
    .bot-form .password-wrap { margin:0; }
    .bot-message { min-height:22px; color:var(--muted); font-size:12px; margin-bottom:10px; }
    .bots-table td:last-child, .bots-table th:last-child { padding-left:12px; }
    .access-tabs { display:flex; justify-content:flex-start; gap:8px; margin:14px 0; direction:ltr; }
    .access-tab { height:32px; padding:0 12px; background:#fff; color:var(--ink); border-color:var(--line); }
    .access-tab.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    .access-section[hidden] { display:none; }
    .access-form { display:grid; grid-template-columns:minmax(220px, 1fr) 120px; gap:10px; margin:14px 0; }
    .access-message { min-height:24px; color:var(--muted); font-size:12px; }
    .access-list { display:grid; gap:10px; margin-top:12px; }
    .access-row { display:grid; gap:10px; padding:12px; border:1px solid var(--line); border-radius:6px; background:#fbfcfd; direction:ltr; }
    .access-main { display:grid; grid-template-columns:minmax(220px, 1fr) minmax(180px, auto) auto; align-items:center; gap:12px; }
    .access-email { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:700; }
    .access-state { min-width:0; color:var(--muted); font-size:12px; line-height:1.6; text-align:right; direction:rtl; }
    .access-actions { display:flex; align-items:center; justify-content:flex-end; gap:10px; }
    .owner-badge { min-height:30px; display:inline-flex; align-items:center; padding:0 10px; border:1px solid #9bd6dd; border-radius:6px; color:var(--accent); background:#f0fbfc; font-size:12px; font-weight:700; }
    .permission-grid { grid-column:1 / -1; display:grid; grid-template-columns:repeat(5, minmax(100px, 1fr)); gap:8px; direction:ltr; }
    .access-row .permission-grid { grid-column:1 / -1; grid-template-columns:repeat(5, minmax(120px, 1fr)); }
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
    }
    body { color:var(--ink); background:var(--bg); font-size:13px; line-height:1.5; }
    header { min-height:var(--header-h); padding:12px 24px; background:#fff; border-bottom:1px solid var(--line); box-shadow:0 1px 0 rgba(22,22,22,.02); }
    h1 { font-size:22px; font-weight:800; letter-spacing:0; }
    .brand { gap:18px; }
    nav { gap:6px; }
    .nav-button { height:34px; border-radius:0; border-color:#c6c6c6; background:#fff; color:#393939; font-weight:600; }
    .nav-button:hover { background:#e8e8e8; }
    .nav-button.active { background:var(--accent); border-color:var(--accent); color:#fff; box-shadow:inset 0 -2px 0 rgba(0,0,0,.18); }
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
    .thread-reply { margin-right:24px; border-right:2px solid #dfe1e6; background:#fff; }
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
    .chart-panel, .access-panel, .profile-panel, .bots-panel { border-radius:0; border-color:var(--line); box-shadow:0 1px 0 rgba(22,22,22,.04); }
    .chart-head h2, .access-panel h2, .profile-panel h2, .bots-panel h2 { font-size:20px; font-weight:800; }
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
      :root { --header-h:0px; --filters-h:246px; }
      header { position:static; display:grid; grid-template-columns:1fr auto; align-items:start; gap:10px; padding:12px 14px; }
      .brand { min-width:0; display:grid; gap:10px; }
      h1 { font-size:20px; }
      nav { width:100%; display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; direction:rtl; }
      .nav-button { min-width:0; width:100%; padding:0 6px; font-size:12px; }
      .header-tools { align-items:start; gap:8px; }
      .meta { max-width:80px; min-height:38px; justify-content:flex-end; font-size:11px; text-align:left; }
      main { padding:12px 14px 22px; }
      .filters { top:0; width:calc(100% + 28px); margin-inline:-14px; padding:10px 14px; grid-template-columns:1fr; gap:8px; align-items:stretch; }
      .thread-filters { grid-template-columns:1fr 1fr; }
      .thread-filters button { grid-column:1 / -1; }
      .multi-panel { position:fixed; inset-inline:14px; top:auto; max-height:45vh; z-index:1200; }
      .messages-table, .groups-table, .bots-table, .access-log-table { display:block; border:0; background:transparent; box-shadow:none; }
      .messages-table colgroup, .groups-table colgroup, .bots-table colgroup, .access-log-table colgroup,
      .messages-table thead, .groups-table thead, .bots-table thead, .access-log-table thead { display:none; }
      .messages-table tbody, .groups-table tbody, .bots-table tbody, .access-log-table tbody { display:grid; gap:10px; }
      .messages-table tr, .groups-table tr, .bots-table tr, .access-log-table tr {
        display:grid;
        gap:8px;
        padding:12px;
        border:1px solid var(--line);
        background:#fff;
        box-shadow:0 1px 2px rgba(9,30,66,.08);
      }
      .messages-table td, .groups-table td, .bots-table td, .access-log-table td {
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
      .messages-table td::before, .groups-table td::before, .bots-table td::before, .access-log-table td::before {
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
      .group-label-select { height:36px; }
      .access-log-table { margin-top:10px; direction:rtl; }
      .access-log-table th, .access-log-table td { direction:rtl; text-align:right; }
      .chart-panel, .access-panel, .profile-panel, .bots-panel { padding:14px; }
      .chart-head { align-items:flex-start; flex-direction:column; }
      .legend-grid { grid-template-columns:1fr; }
      .bot-form { grid-template-columns:1fr; }
      .access-form, .access-main { grid-template-columns:1fr; }
      .access-row { direction:rtl; }
      .access-email { white-space:normal; overflow-wrap:anywhere; text-align:left; direction:ltr; }
      .permission-grid, .access-row .permission-grid { grid-template-columns:1fr; direction:rtl; }
      .permission-option { justify-content:flex-start; direction:ltr; }
      .access-actions { justify-content:stretch; display:grid; grid-template-columns:1fr; }
      .revoke-button, .reactivate-button, .secondary-button { width:100%; }
      .thread-list { max-width:none; }
      .thread-root, .thread-reply, .thread-missing { padding:12px; }
      .thread-reply { margin-right:10px; }
      .thread-item { grid-template-columns:34px minmax(0, 1fr); gap:8px; }
      .thread-head { gap:6px; }
      .thread-pill { max-width:100%; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .media-open.thread-photo-frame { width:148px; height:148px; }
      .media-gallery { grid-template-columns:repeat(auto-fit, minmax(112px, 148px)); }
      .detail-row { grid-template-columns:1fr; }
      .modal-backdrop { padding:12px; align-items:flex-start; }
      .modal { max-height:calc(100vh - 24px); }
      .user-panel { left:0; right:auto; max-width:calc(100vw - 28px); }
    }
    @media (max-width: 520px) {
      :root { --header-h:0px; --filters-h:246px; }
      header { grid-template-columns:1fr; }
      .header-tools { width:100%; justify-content:space-between; direction:ltr; }
      .meta { max-width:none; text-align:right; direction:rtl; }
      nav { grid-template-columns:repeat(2, minmax(0, 1fr)); }
      .thread-filters { grid-template-columns:1fr; }
      .signals { grid-template-columns:1fr; }
      .messages-table td, .groups-table td, .bots-table td, .access-log-table td { grid-template-columns:1fr; gap:4px; }
      .messages-table td::before, .groups-table td::before, .bots-table td::before, .access-log-table td::before { font-size:10px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <h1>دیدپذیری</h1>
      <nav aria-label="صفحه‌های داشبورد">
        <button class="nav-button" id="dashboardNav" type="button">داشبورد</button>
        <button class="nav-button active" id="messagesNav" type="button">پیام‌ها</button>
        <button class="nav-button" id="groupsNav" type="button">گروه‌ها</button>
        <button class="nav-button" id="threadsNav" type="button">تردها</button>
        <button class="nav-button" id="botsNav" type="button">بات‌ها</button>
        <button class="nav-button" id="accessNav" type="button">دسترسی</button>
      </nav>
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
    <section class="page" id="messagesPage">
      <section class="filters">
        <input id="search" placeholder="جست‌وجو در متن پیام، گروه، یوزرنیم..." />
        <div id="group" class="multi-filter"></div>
        <div id="topic" class="multi-filter"></div>
        <div id="platform" class="multi-filter"></div>
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
    <section class="page" id="threadsPage" hidden>
      <section class="filters thread-filters">
        <div id="threadGroup" class="multi-filter"></div>
        <div id="threadTopic" class="multi-filter"></div>
        <div id="threadYear" class="multi-filter single-filter"></div>
        <div id="threadMonth" class="multi-filter single-filter"></div>
        <div id="threadDay" class="multi-filter single-filter"></div>
        <div id="threadPlatform" class="multi-filter"></div>
        <button id="threadRefresh" type="button">به‌روزرسانی</button>
      </section>
      <div class="thread-list" id="threadRows"></div>
    </section>
    <section class="page" id="botsPage" hidden>
      <section class="bots-panel">
        <h2>مدیریت بات‌ها</h2>
        <p class="thread-muted">بات‌های هر پلتفرم و تعداد گروه‌ها و پیام‌هایی که با هر بات ثبت شده است.</p>
        <form class="bot-form" id="botForm">
          <select id="botPlatform">
            <option value="telegram">تلگرام</option>
            <option value="bale">بله</option>
          </select>
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
          <div class="access-list" id="accessRows"></div>
        </section>
        <section class="access-section" id="accessGroupsSection" hidden>
          <div class="access-group-view">
            <select id="accessGroupSelect" aria-label="انتخاب گروه">
              <option value="">انتخاب گروه</option>
            </select>
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
    const threadRowsEl = document.getElementById("threadRows");
    const dailyChartEl = document.getElementById("dailyChart");
    const chartLegendEl = document.getElementById("chartLegend");
    const userDailyChartEl = document.getElementById("userDailyChart");
    const userChartLegendEl = document.getElementById("userChartLegend");
    const statusEl = document.getElementById("status");
    const dashboardNavEl = document.getElementById("dashboardNav");
    const messagesNavEl = document.getElementById("messagesNav");
    const groupsNavEl = document.getElementById("groupsNav");
    const threadsNavEl = document.getElementById("threadsNav");
    const botsNavEl = document.getElementById("botsNav");
    const accessNavEl = document.getElementById("accessNav");
    const dashboardPageEl = document.getElementById("dashboardPage");
    const messagesPageEl = document.getElementById("messagesPage");
    const groupsPageEl = document.getElementById("groupsPage");
    const threadsPageEl = document.getElementById("threadsPage");
    const botsPageEl = document.getElementById("botsPage");
    const accessPageEl = document.getElementById("accessPage");
    const searchEl = document.getElementById("search");
    const platformEl = document.getElementById("platform");
    const groupEl = document.getElementById("group");
    const topicEl = document.getElementById("topic");
    const refreshEl = document.getElementById("refresh");
    const threadPlatformEl = document.getElementById("threadPlatform");
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
    const currentUserPermissions = new Set(__CURRENT_USER_PERMISSIONS__);
    const currentUser = __CURRENT_USER__;
    const permissionOptions = [
      { key:"access", label:"دسترسی" },
      { key:"threads", label:"تردها" },
      { key:"groups", label:"گروه‌ها" },
      { key:"messages", label:"پیام‌ها" },
      { key:"dashboard", label:"داشبورد" },
      { key:"bots", label:"بات‌ها" },
    ];
    const fullTextByKey = new Map();
    const detailByKey = new Map();
    let dashboardChartData = { days: [], groups: [], userDays: [], users: [] };
    const selectedGroupChartItems = new Set();
    const selectedUserChartItems = new Set();
    let accessGroupOptions = [];
    let accessUserOptions = [];
    const chartColors = ["#087f8c", "#f25f5c", "#3b82f6", "#f59e0b", "#7c3aed", "#10b981", "#ef476f", "#6b7280", "#06b6d4", "#84cc16"];
    const ownerEmail = "a.eslami@toman.ir";
    let threadFilterOptions = null;
    let currentPage = "messages";
    let loadingToken = 0;
    let pendingConfirm = null;
    function esc(value) {
      return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    function telegramUsernameLocal(value) {
      return String(value || "").trim().replace(/^@+/, "");
    }
    function canOpen(page) {
      return currentUserPermissions.has(page);
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
    function groupLabelSelect(row) {
      const current = String(row.group_label || "");
      return \`<select class="group-label-select" data-platform="\${esc(row.platform || "telegram")}" data-chat-id="\${esc(row.chat_id)}" data-previous="\${esc(current)}" aria-label="لیبل گروه">\${groupLabelOptions.map(([value, label]) => \`<option value="\${esc(value)}" \${current === value ? "selected" : ""}>\${esc(label)}</option>\`).join("")}</select>\`;
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
    const routablePages = ["dashboard", "messages", "groups", "threads", "bots", "access", "profile"];
    function pagePath(page) {
      return "/main/" + page;
    }
    function pageFromPath() {
      const path = window.location.pathname;
      const page = path.startsWith("/main/") ? path.slice(6).split("/")[0] : "messages";
      return routablePages.includes(page) ? page : "messages";
    }
    function firstAccessiblePage() {
      return ["messages", "threads", "groups", "dashboard", "bots", "access"].find(canOpen);
    }
    function setupAccessShell() {
      accessNewPermissionsEl.innerHTML = permissionGridHtml([], "new");
      const navByPage = { dashboard:dashboardNavEl, messages:messagesNavEl, groups:groupsNavEl, threads:threadsNavEl, bots:botsNavEl, access:accessNavEl };
      Object.entries(navByPage).forEach(([page, element]) => { element.hidden = !canOpen(page); });
      const firstPage = firstAccessiblePage();
      if (!firstPage) {
        document.querySelector("main").innerHTML = '<section class="empty">برای این حساب هنوز دسترسی به بخشی تعریف نشده است.</section>';
        setStatus(++loadingToken, "بدون دسترسی");
        return;
      }
      const requestedPage = pageFromPath();
      showPage(requestedPage === "profile" || canOpen(requestedPage) ? requestedPage : firstPage, { replace: true });
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
    function createMultiFilter(root, placeholder, onChange) {
      const state = { options: [], selected: new Set() };
      root.innerHTML = \`<div class="multi-control"><button class="multi-button" type="button"><span class="multi-label">\${esc(placeholder)}</span></button><button class="multi-clear" type="button" aria-label="پاک کردن فیلتر" title="پاک کردن فیلتر">×</button></div><div class="multi-panel"></div>\`;
      const button = root.querySelector(".multi-button");
      const clearButton = root.querySelector(".multi-clear");
      const label = root.querySelector(".multi-label");
      const panel = root.querySelector(".multi-panel");
      function syncLabel() {
        const values = [...state.selected];
        label.textContent = values.length === 0 ? placeholder : (values.length === 1 ? values[0] : values.length + " انتخاب");
        root.classList.toggle("has-value", values.length > 0);
      }
      function render() {
        if (!state.options.length) {
          panel.innerHTML = \`<div class="multi-empty">موردی نیست</div>\`;
          return;
        }
        panel.innerHTML = state.options.map((value) => \`<label class="multi-option"><input type="checkbox" value="\${esc(value)}" \${state.selected.has(value) ? "checked" : ""} /><span>\${esc(value)}</span></label>\`).join("");
      }
      button.addEventListener("click", () => root.classList.toggle("open"));
      clearButton.addEventListener("click", () => {
        state.selected.clear();
        root.classList.remove("open");
        render();
        syncLabel();
        onChange?.();
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
          root.classList.remove("open");
        },
      };
    }
    function createSingleFilter(root, placeholder, onChange) {
      const state = { options: [], selected: "" };
      root.innerHTML = \`<div class="multi-control"><button class="multi-button" type="button"><span class="multi-label">\${esc(placeholder)}</span></button><button class="multi-clear" type="button" aria-label="پاک کردن فیلتر" title="پاک کردن فیلتر">×</button></div><div class="multi-panel"></div>\`;
      const button = root.querySelector(".multi-button");
      const clearButton = root.querySelector(".multi-clear");
      const label = root.querySelector(".multi-label");
      const panel = root.querySelector(".multi-panel");
      function syncLabel() {
        label.textContent = state.selected || placeholder;
        root.classList.toggle("has-value", Boolean(state.selected));
      }
      function render() {
        if (!state.options.length) {
          panel.innerHTML = \`<div class="multi-empty">موردی نیست</div>\`;
          return;
        }
        panel.innerHTML = state.options.map((value) => \`<button class="single-option \${state.selected === value ? "selected" : ""}" type="button" data-value="\${esc(value)}">\${esc(value)}</button>\`).join("");
      }
      button.addEventListener("click", () => root.classList.toggle("open"));
      clearButton.addEventListener("click", () => {
        state.selected = "";
        root.classList.remove("open");
        render();
        syncLabel();
        onChange?.();
      });
      panel.addEventListener("click", (event) => {
        const option = event.target.closest("[data-value]");
        if (!option) return;
        state.selected = option.dataset.value;
        root.classList.remove("open");
        render();
        syncLabel();
        onChange?.();
      });
      return {
        setOptions(values) {
          state.options = [...new Set(values.filter(Boolean))];
          if (!state.options.includes(state.selected)) state.selected = "";
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
          root.classList.remove("open");
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
      return Boolean(searchEl.value.trim() || messagePlatformFilter.values().length || messageGroupFilter.values().length || messageTopicFilter.values().length);
    }
    function threadFiltersActive() {
      return Boolean(threadPlatformFilter.values().length || threadGroupFilter.values().length || threadTopicFilter.values().length || selectedThreadJalaliDate());
    }
    function updateFilterButtons() {
      refreshEl.textContent = messageFiltersActive() ? "ریست فیلتر" : "به‌روزرسانی";
      threadRefreshEl.textContent = threadFiltersActive() ? "ریست فیلتر" : "به‌روزرسانی";
    }
    function resetMessageFilters() {
      searchEl.value = "";
      messagePlatformFilter.clear();
      messageGroupFilter.clear();
      messageTopicFilter.clear();
      updateMessageTopicOptions();
      updateFilterButtons();
    }
    function resetThreadFilters() {
      threadPlatformFilter.clear();
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
      const topics = (threadFilterOptions?.topics || [])
        .filter((topic) => platformMatchesFilter(topic, threadPlatformFilter))
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
      updateGroupOptions();
      updateThreadTopicOptions();
      updateMessageTopicOptions();
      updateThreadDateOptions();
      updateFilterButtons();
    }
    function linkify(value) {
      const escaped = esc(value);
      return escaped.replace(/(https?:\\/\\/[^\\s<]+)/g, (url) => {
        const cleanUrl = url.replace(/[),.;:!?]+$/g, "");
        const suffix = url.slice(cleanUrl.length);
        return \`<a href="\${cleanUrl}" target="_blank" rel="noopener noreferrer">\${cleanUrl}</a>\${suffix}\`;
      });
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
      fullTextByKey.set(key, linkify(text));
      const button = \`<button class="more" type="button" data-full-key="\${esc(key)}" aria-label="مشاهده بیشتر" title="مشاهده بیشتر">+</button>\`;
      return \`<span class="clip">\${linkify(shortText(text, limit))}</span>\${button}\`;
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
      return text ? linkify(text) : '<span class="thread-muted">بدون متن</span>';
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
      return Boolean(row.is_topic_message)
        && String(row.reply_to_message_id) === String(row.message_thread_id)
        && isSyntheticTopicName(row);
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
    function threadNode(row, kind, index) {
      if (row.missing) {
        return \`<article class="thread-missing">
          <div class="thread-head">
            <span class="thread-pill">شناسه پیام: \${esc(row.message_id)}</span>
            <span class="thread-muted">پیام اصلی در محدوده فعلی داده‌ها نیست</span>
          </div>
        </article>\`;
      }
      const author = [row.sender_first_name, row.sender_last_name].filter(Boolean).join(" ") || row.sender_username || "نامشخص";
      return \`<article class="\${kind}">
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
              <button class="details-button" type="button" data-detail-key="thread-detail-\${index}">جزئیات</button>
            </div>
            <div class="thread-message">\${messageWithBadge(row)}</div>
            \${threadMedia(row)}
            \${reactionBar(row)}
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
      function parentKeyFor(row) {
        if (!row.reply_to_message_id || !row.chat_id || isTopicRootReply(row)) return null;
        return rowMessageKey(row, row.reply_to_message_id);
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
          if (!parent) return currentKey;
          current = parent;
        }
        return rowMessageKey(row);
      }
      const repliesByRoot = new Map();
      const rootKeys = new Set();
      for (const row of new Set(latestByMessage.values())) {
        const rowKey = rowMessageKey(row);
        const rootKey = rootKeyFor(row);
        rootKeys.add(rootKey);
        if (rootKey !== rowKey) {
          const list = repliesByRoot.get(rootKey) || [];
          list.push(row);
          repliesByRoot.set(rootKey, list);
        }
      }
      return [...rootKeys].map((key) => {
        const keyParts = key.split(":");
        const root = latestByMessage.get(key) || { missing: true, platform: keyParts[0], chat_id: keyParts[1], message_id: keyParts[2] };
        const replies = (repliesByRoot.get(key) || []).sort((a, b) => Number(a.message_id || 0) - Number(b.message_id || 0));
        return { root, replies };
      }).sort((a, b) => {
        const aTime = Date.parse(a.root.sent_at_utc || a.replies[0]?.sent_at_utc || 0);
        const bTime = Date.parse(b.root.sent_at_utc || b.replies[0]?.sent_at_utc || 0);
        return bTime - aTime;
      });
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
    function closeModal(confirmResult = false) {
      const confirmResolver = pendingConfirm;
      pendingConfirm = null;
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
    async function load() {
      updateFilterButtons();
      const token = showLoading("در حال دریافت پیام‌ها...");
      try {
        await loadThreadFilterOptions();
        const params = new URLSearchParams();
        if (searchEl.value.trim()) params.set("q", searchEl.value.trim());
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
        setStatus(token, data.groups.length + " گروه");
      } catch (error) {
        setStatus(token, "خطا در دریافت گروه‌ها");
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
          accessRowsEl.innerHTML = "";
          setStatus(token, data.detail || data.error || "خطا در دریافت کاربران");
          return;
        }
        accessRowsEl.innerHTML = data.users.map((user) => \`
          <div class="access-row">
            <div class="access-main">
              <span class="access-email">\${esc(user.email)}</span>
              <span class="access-state">\${!user.is_active ? "لغوشده" : (user.must_change_password ? "نیازمند تغییر پسورد" : "فعال")} · \${esc(user.last_login_at_utc ? tehranDisplay(user.last_login_at_utc) : "بدون ورود")}</span>
              <span class="access-actions">
                <button class="secondary-button" type="button" data-resend-email="\${esc(user.email)}">ارسال دوباره دعوت</button>
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
      const selectedKey = accessGroupSelectEl.value;
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
        const previous = accessGroupSelectEl.value;
        accessGroupOptions = groupsData.groups;
        accessUserOptions = usersData.users;
        accessGroupSelectEl.innerHTML = '<option value="">انتخاب گروه</option>' + accessGroupOptions.map((group) => \`<option value="\${esc(group.key)}">\${esc(group.title)} · \${esc(platformText(group.platform))}\${groupLabelShort(group.group_label) ? " · " + esc(groupLabelShort(group.group_label)) : ""}</option>\`).join("");
        if (previous && accessGroupOptions.some((group) => group.key === previous)) accessGroupSelectEl.value = previous;
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
    async function loadThreads() {
      updateFilterButtons();
      const token = showLoading("در حال دریافت تردها...");
      try {
        await loadThreadFilterOptions();
        const params = new URLSearchParams();
        appendFilterValues(params, "platform", selectedPlatformValues(threadPlatformFilter));
        appendFilterValues(params, "group", threadGroupFilter.values());
        appendFilterValues(params, "topic", threadTopicFilter.values());
        params.set("view", "threads");
        const jalaliDate = selectedThreadJalaliDate();
        if (jalaliDate) params.set("jalali_date", jalaliDate);
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
        threadRowsEl.innerHTML = threads.length ? threads.map((thread) => {
          const rootIndex = indexByRow.get(thread.root) ?? "missing-" + thread.root.message_id;
          return \`<section class="thread-card">
            \${threadNode(thread.root, "thread-root", rootIndex)}
            <div class="thread-replies">
              \${thread.replies.map((reply) => threadNode(reply, "thread-reply", indexByRow.get(reply))).join("")}
            </div>
          </section>\`;
        }).join("") : '<div class="empty">شما به هیچ چیز دسترسی ندارید.</div>';
        setStatus(token, threads.length + " ترد");
      } catch (error) {
        setStatus(token, "خطا در دریافت تردها");
      }
    }
    function showPage(page, options = {}) {
      if (page !== "profile" && !canOpen(page)) return;
      currentPage = page;
      const nextPath = pagePath(page);
      if (window.location.pathname !== nextPath) {
        if (options.replace) window.history.replaceState({ page }, "", nextPath);
        else window.history.pushState({ page }, "", nextPath);
      } else if (options.replace) {
        window.history.replaceState({ page }, "", nextPath);
      }
      const isDashboard = page === "dashboard";
      const isGroups = page === "groups";
      const isThreads = page === "threads";
      const isBots = page === "bots";
      const isAccess = page === "access";
      const isProfile = page === "profile";
      dashboardPageEl.hidden = !isDashboard;
      messagesPageEl.hidden = isDashboard || isGroups || isThreads || isBots || isAccess || isProfile;
      groupsPageEl.hidden = !isGroups;
      threadsPageEl.hidden = !isThreads;
      botsPageEl.hidden = !isBots;
      accessPageEl.hidden = !isAccess;
      profilePageEl.hidden = !isProfile;
      dashboardNavEl.classList.toggle("active", isDashboard);
      messagesNavEl.classList.toggle("active", !isDashboard && !isGroups && !isThreads && !isBots && !isAccess && !isProfile);
      groupsNavEl.classList.toggle("active", isGroups);
      threadsNavEl.classList.toggle("active", isThreads);
      botsNavEl.classList.toggle("active", isBots);
      accessNavEl.classList.toggle("active", isAccess);
      if (isDashboard) loadDashboard();
      else if (isGroups) loadGroups();
      else if (isThreads) loadThreadFilterOptions().then(loadThreads);
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
    botRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "", "جزئیات بات");
    });
    botTokenToggleEl.addEventListener("click", () => {
      botTokenEl.type = botTokenEl.type === "password" ? "text" : "password";
    });
    botFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      botMessageEl.textContent = "در حال تست و ثبت بات...";
      const payload = {
        platform: botPlatformEl.value,
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
    groupRowsEl.addEventListener("change", async event => {
      const select = event.target.closest(".group-label-select");
      if (!select) return;
      const previous = select.dataset.previous ?? "";
      select.disabled = true;
      try {
        const res = await fetch("/api/groups/label", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ platform: select.dataset.platform || "telegram", chat_id: select.dataset.chatId, group_label: select.value }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "ذخیره لیبل انجام نشد");
        select.dataset.previous = data.group_label || "";
        setStatus(loadingToken, "لیبل گروه ذخیره شد");
      } catch (error) {
        select.value = previous;
        setStatus(loadingToken, error.message || "ذخیره لیبل انجام نشد");
      } finally {
        select.disabled = false;
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
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
    modalBodyEl.addEventListener("click", event => {
      const confirmButton = event.target.closest("[data-confirm-value]");
      if (!confirmButton || !pendingConfirm) return;
      closeModal(confirmButton.dataset.confirmValue === "ok");
    });
    refreshEl.addEventListener("click", () => {
      if (messageFiltersActive()) resetMessageFilters();
      load();
    });
    threadRefreshEl.addEventListener("click", () => {
      if (threadFiltersActive()) resetThreadFilters();
      loadThreads();
    });
    dashboardNavEl.addEventListener("click", () => showPage("dashboard"));
    messagesNavEl.addEventListener("click", () => showPage("messages"));
    groupsNavEl.addEventListener("click", () => showPage("groups"));
    threadsNavEl.addEventListener("click", () => showPage("threads"));
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
      showPage(requestedPage === "profile" || canOpen(requestedPage) ? requestedPage : fallbackPage, { replace: true });
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
    accessGroupSelectEl.addEventListener("change", () => renderAccessGroupUsers());
    accessGroupRefreshEl.addEventListener("click", () => loadAccessGroupView());
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
        accessMessageEl.textContent = "در حال ذخیره دسترسی گروه‌ها...";
        try {
          const res = await fetch("/api/access-users/group-access", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, group_access: selectedGroupAccess(groupGrid) }),
          });
          const data = await res.json();
          if (!res.ok) {
            accessMessageEl.textContent = data.error || "ذخیره دسترسی گروه‌ها انجام نشد";
            loadAccessUsers();
            return;
          }
          accessMessageEl.textContent = "دسترسی گروه‌ها ذخیره شد.";
        } catch (error) {
          accessMessageEl.textContent = "ذخیره دسترسی گروه‌ها انجام نشد";
          loadAccessUsers();
        }
        return;
      }
      if (!input || !grid) return;
      const email = grid.dataset.permissionEmail;
      if (grid.dataset.owner === "true" || isOwnerEmail(email)) {
        accessMessageEl.textContent = "دسترسی owner قابل تغییر نیست.";
        loadAccessUsers();
        return;
      }
      const permissions = selectedPermissions(grid);
      accessMessageEl.textContent = "در حال ذخیره دسترسی‌ها...";
      try {
        const res = await fetch("/api/access-users/permissions", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, permissions }),
        });
        const data = await res.json();
        if (!res.ok) {
          accessMessageEl.textContent = data.error || "ذخیره دسترسی انجام نشد";
          loadAccessUsers();
          return;
        }
        accessMessageEl.textContent = "دسترسی‌ها ذخیره شد.";
      } catch (error) {
        accessMessageEl.textContent = "ذخیره دسترسی انجام نشد";
        loadAccessUsers();
      }
    });
    searchEl.addEventListener("input", updateFilterButtons);
    searchEl.addEventListener("keydown", e => { if (e.key === "Enter") load(); });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".user-menu")) userMenuEl.classList.remove("open");
      for (const filter of [messagePlatformFilter, messageGroupFilter, messageTopicFilter, threadPlatformFilter, threadGroupFilter, threadTopicFilter, threadYearFilter, threadMonthFilter, threadDayFilter]) {
        if (!event.target.closest(".multi-filter")) filter.close();
      }
    });
    syncProfileUi();
    setupAccessShell();
    setInterval(() => { if (currentPage === "profile") return; if (currentPage === "dashboard" && canOpen("dashboard")) loadDashboard(); else if (currentPage === "groups" && canOpen("groups")) loadGroups(); else if (currentPage === "threads" && canOpen("threads")) loadThreads(); else if (currentPage === "bots" && canOpen("bots")) loadBots(); else if (currentPage === "access" && canOpen("access")) (accessLogsSectionEl.hidden ? (accessGroupsSectionEl.hidden ? loadAccessUsers() : loadAccessGroupView()) : loadAccessLogs()); else if (canOpen("messages")) load(); }, 20000);
  </script>
</body>
</html>`;

const AUTH_FONT_FACE = HTML.match(/@font-face\s*\{[^}]+\}/)?.[0] || "";
const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

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
    .product-frame { border:1px solid var(--line); background:#fff; border-radius:8px; overflow:hidden; max-width:680px; box-shadow:0 18px 44px rgba(23,32,38,.08); }
    .frame-bar { height:42px; display:flex; align-items:center; gap:8px; padding:0 14px; border-bottom:1px solid var(--line); background:#f4f6f8; }
    .dot { width:9px; height:9px; border-radius:50%; background:#8d99a6; }
    .dot:first-child { background:#0f62fe; }
    .product-row { display:grid; grid-template-columns:90px 1fr 110px; gap:12px; align-items:center; padding:14px; border-bottom:1px solid var(--line); }
    .product-row:last-child { border-bottom:0; }
    .chip { display:inline-flex; align-items:center; justify-content:center; min-height:28px; border:1px solid #c6d8ff; border-radius:999px; background:var(--soft); color:#284b7a; font-size:12px; font-weight:800; }
    .line { height:10px; border-radius:999px; background:#dfe5eb; }
    .line.short { width:62%; }
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
      .product-row { grid-template-columns:74px 1fr; }
      .product-row .chip:last-child { grid-column:1 / -1; justify-content:flex-start; padding:0 10px; }
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
        <h1>یک نمای روشن از پیام‌های عملیاتی تیم‌ها</h1>
        <p class="lead">دیدپذیری پیام‌های تلگرام و بله را از گروه‌های کاری جمع‌آوری می‌کند و با ساختار قابل جستجو، ترد، گروه، بات و دسترسی نمایش می‌دهد.</p>
        <div class="signals">
          <div class="signal"><strong>پیام‌ها و فایل‌ها</strong><span>متن، عکس، فایل، ریپلای، ویرایش و زمان ثبت پیام در یک ساختار قابل پیگیری.</span></div>
          <div class="signal"><strong>ترد و گروه</strong><span>نمایش مکالمه‌ها مثل ترد و مدیریت گروه‌ها با لیبل و پلتفرم.</span></div>
          <div class="signal"><strong>دسترسی کنترل‌شده</strong><span>ورود سازمانی، سطح دسترسی صفحه‌ها و لاگ تغییرات اکسس.</span></div>
        </div>
        <div class="product-frame" aria-hidden="true">
          <div class="frame-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
          <div class="product-row"><span class="chip">تلگرام</span><span class="line"></span><span class="chip">۱۲۸ پیام</span></div>
          <div class="product-row"><span class="chip">بله</span><span class="line short"></span><span class="chip">۴ گروه</span></div>
          <div class="product-row"><span class="chip">تردها</span><span class="line"></span><span class="chip">زنده</span></div>
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
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function text(value, status = 200, contentType = "text/plain; charset=utf-8") {
  return new Response(value, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
  });
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
    headers: { location },
  });
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

const ACCESS_PERMISSIONS = ["access", "threads", "groups", "messages", "dashboard", "bots"];
const FULL_ACCESS_PERMISSIONS = [...ACCESS_PERMISSIONS];
const ACCESS_OWNER_EMAIL = "a.eslami@toman.ir";
const GROUP_LABELS = ["internal_team", "customer", "provider"];
const DEFAULT_PLATFORM = "telegram";
const PLATFORM_LABELS = {
  telegram: "تلگرام",
  bale: "بله",
  whatsapp: "واتساپ",
};
const API_CACHE_TTL_MS = 60 * 1000;
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

function messageKey(row, messageId = row?.message_id) {
  if (!row?.chat_id || !messageId) return "";
  return `${normalizePlatform(row.platform)}:${row.chat_id}:${messageId}`;
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
  const source = Array.isArray(value) ? value : (Array.isArray(value?.pages) ? value.pages : FULL_ACCESS_PERMISSIONS);
  const allowed = new Set(ACCESS_PERMISSIONS);
  const normalized = source.map((item) => String(item || "").trim().toLowerCase()).filter((item) => allowed.has(item));
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
  return {
    pages: normalizeAccessPermissions(pages),
    group_access: normalizeGroupAccess(groupAccess),
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
  return accessPermissionsForUser(user).includes(permission);
}

function hasAnyAccessPermission(user, permissions) {
  return permissions.some((permission) => hasAccessPermission(user, permission));
}

function defaultMainPathForUser(user) {
  const firstPage = ["messages", "threads", "groups", "dashboard", "bots", "access"].find((permission) => hasAccessPermission(user, permission));
  return `/main/${firstPage || "messages"}`;
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
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, { headers: supabaseHeaders(env) });
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

async function hashPassword(password, salt) {
  return sha256Hex(`${salt}:${password}`);
}

function sessionSecret(env) {
  return env.SESSION_SECRET || env.SUPABASE_SERVICE_ROLE_KEY || env.DASHBOARD_PASSWORD || "visibility-session";
}

async function signSessionPayload(payload, env) {
  return sha256Hex(`${payload}.${sessionSecret(env)}`);
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
  const [payload, signature] = session.split(".");
  if (signature !== await signSessionPayload(payload, env)) return null;
  let data;
  try {
    data = JSON.parse(base64UrlDecode(payload));
  } catch {
    return null;
  }
  if (!data.email || !data.exp || Date.now() > data.exp) return null;
  const user = await getAccessUserByEmail(env, data.email);
  if (!user || String(user.password_hash || "").slice(0, 16) !== data.ph) return null;
  if (!user.is_active && !isAccessOwnerEmail(user.email)) return null;
  return user;
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
  if (await hashPassword(password, user.password_salt) !== user.password_hash) {
    return text(await loginHtml(env, "پسورد وارد شده درست نیست.", email), 401, "text/html; charset=utf-8");
  }
  await patchAccessUser(env, email, { last_login_at_utc: new Date().toISOString(), updated_at_utc: new Date().toISOString() });
  const cookieValue = await makeSessionCookie(user, env);
  return new Response(null, {
    status: 303,
    headers: {
      location: user.must_change_password ? "/set-password" : defaultMainPathForUser(user),
      "set-cookie": `visibility_session=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    },
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

async function getAccessUserByEmail(env, email) {
  const params = new URLSearchParams({
    select: "id,email,password_hash,password_salt,must_change_password,is_active,permissions,telegram_username,last_login_at_utc,created_at_utc,updated_at_utc",
    email: `eq.${normalizeEmail(email)}`,
    limit: "1",
  });
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/visibility_access_users?${params}`, { headers: supabaseHeaders(env) });
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
  if (await hashPassword(currentPassword, user.password_salt) !== user.password_hash) {
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
    headers: {
      location: "/",
      "set-cookie": clearSessionCookie(),
    },
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
    await sendSupabaseRecoveryEmail(env, email, `${new URL(request.url).origin}/recovery`);
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
      headers: {
        location: "/?recovered=1",
        "set-cookie": clearSessionCookie(),
      },
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
  return json({
    users: users.map((user) => ({
      ...user,
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
      await sendAccessInviteEmail(env, user.email, new URL(request.url).origin);
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
    await sendAccessInviteEmail(env, email, new URL(request.url).origin);
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
    const user = await patchAccessUser(env, email, {
      permissions: accessPayload(permissions, groupAccessForUser(existing)),
      updated_at_utc: new Date().toISOString(),
    });
    await insertAccessAuditLog(env, {
      actorEmail: authUser?.email,
      targetEmail: email,
      action: "permissions_update",
      oldValues: { permissions: accessPermissionsForUser(existing) },
      newValues: { permissions: accessPermissionsForUser(user) },
    });
    return json({ user: { email: user.email, permissions: accessPermissionsForUser(user) } });
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
  return Boolean(row.is_topic_message)
    && String(row.reply_to_message_id) === String(row.message_thread_id)
    && /^#\d+$/.test(String(row.topic_name || "").trim());
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
      topic_name: row.topic_name || mappedTopicName || payloadTopicName || null,
      ...(date ? tehranParts(date) : { sent_date: null, sent_jalali_date: null, sent_time: null, display_timezone: "Asia/Tehran" }),
      registered_tehran_datetime: tehranDateTimeDisplay(registeredDate),
      registered_jalali_datetime: tehranJalaliDateTimeDisplay(registeredDate),
      receive_delay_seconds: receiveDelaySeconds,
    };
  });
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
    if (!newRows.length) break;
    allRows.push(...newRows);
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

async function sendBotMessage(env, platform, chatId, textValue, runtimeConfig = null) {
  const config = runtimeConfig || botPlatformConfig(env, platform);
  if (!config.token || !chatId) return false;
  const response = await fetch(`${config.apiBase}/bot${config.token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: textValue,
      disable_notification: true,
    }),
  });
  return response.ok;
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
    headers: {
      "content-type": imageResponse.headers.get("content-type") || "image/jpeg",
      "cache-control": "private, max-age=86400",
    },
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
  const headers = new Headers({
    "content-type": telegramType.startsWith("application/octet-stream") ? contentTypeFromPath(filePath, telegramType) : (telegramType || contentTypeFromPath(filePath)),
    "cache-control": "private, max-age=86400",
  });
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
  const platforms = [...new Set(url.searchParams.getAll("platform").map(normalizePlatform).filter(Boolean))];
  const groups = url.searchParams.getAll("group").map((value) => value.trim()).filter(Boolean);
  const topicsFilter = url.searchParams.getAll("topic").map((value) => value.trim()).filter(Boolean);
  const jalaliDateFilter = url.searchParams.get("jalali_date");
  const chatId = url.searchParams.get("chat_id");
  const senderId = url.searchParams.get("sender_id");
  const view = url.searchParams.get("view");
  if (q) {
    const pattern = `*${q.replace(/[%*]/g, "")}*`;
    filters.push(`body.ilike.${pattern},caption.ilike.${pattern},chat_title.ilike.${pattern},topic_name.ilike.${pattern},sender_username.ilike.${pattern}`);
  }
  if (filters.length) params.set("or", `(${filters.join(",")})`);
  if (platforms.length === 1) params.set("platform", `eq.${platforms[0]}`);
  else if (platforms.length > 1) params.set("platform", `in.(${platforms.join(",")})`);
  if (chatId) params.set("chat_id", `eq.${chatId}`);
  if (senderId) params.set("sender_id", `eq.${senderId}`);

  const headers = supabaseHeaders(env);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, {
    headers,
  });
  if (!response.ok) {
    return json({ error: "درخواست دیتابیس انجام نشد", detail: await response.text() }, 500);
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
  const rows = (await response.json()).filter((row) => rowAllowedByChatSet(row, allowedSet));
  let messages = enrichMessageRows(rows, topicByThread);
  if (topicsFilter.length) {
    const normalizedTopics = topicsFilter.map((value) => value.toLowerCase());
    messages = messages.filter((row) => normalizedTopics.includes(String(row.topic_name || "").toLowerCase()));
  }
  if (groups.length) {
    const normalizedGroups = groups.map((value) => value.toLowerCase());
    messages = messages.filter((row) => normalizedGroups.includes(String(row.chat_title || "").toLowerCase()));
  }
  if (jalaliDateFilter) {
    messages = messages.filter((row) => String(row.sent_jalali_date || "") === jalaliDateFilter);
  }
  if (view === "threads") {
    try {
      messages = await withThreadAncestors(env, headers, messages, topicByThread);
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
      "reaction_json",
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
  messages = aggregateMediaGroups(withReactions(withEditHistory(messages, historyRows), reactionRows));
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

async function updateGroupLabel(request, env) {
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
  return json({ group_label: rows?.[0]?.group_label || "" });
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
    const user = senderName || (row.sender_username ? `@${row.sender_username}` : (row.sender_id ? `کاربر ${row.sender_id}` : "کاربر ناشناس"));
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
  const groups = (await groupsResponse.json()).filter((group) => group.chat_title && groupRowAllowedByAccess(group, groupAccess));
  const platforms = [...new Set(groups.map((group) => normalizePlatform(group.platform)))];
  const groupTitleById = new Map(groups.map((group) => [chatKey(group), group.chat_title]));
  const topicsByKey = new Map();
  for (const topic of await topicsResponse.json()) {
    const topicName = realTopicName(topic.topic_name);
    const chatTitle = groupTitleById.get(chatKey(topic)) || "";
    if (!chatTitle || !topicName) continue;
    topicsByKey.set(`${normalizePlatform(topic.platform)}:${topic.chat_id}:${topic.message_thread_id || topicName}`, {
      platform: normalizePlatform(topic.platform),
      chat_id: topic.chat_id,
      chat_title: chatTitle,
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
    const url = new URL(request.url);
    if ((url.pathname.startsWith("/assets/") || url.pathname.startsWith("/fonts/")) && env.ASSETS) {
      return env.ASSETS.fetch(request);
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
        headers: {
          location: "/",
          "set-cookie": clearSessionCookie(),
        },
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
    if (url.pathname === "/api/groups") {
      if (!hasAccessPermission(authUser, "groups")) return forbiddenAccess();
      return fetchGroups(request, env, authUser);
    }
    if (url.pathname === "/api/groups/label" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "groups")) return forbiddenAccess();
      return updateGroupLabel(request, env);
    }
    if (url.pathname === "/api/bots" && request.method === "GET") {
      if (!hasAccessPermission(authUser, "bots")) return forbiddenAccess();
      return fetchBots(env);
    }
    if (url.pathname === "/api/bots" && request.method === "POST") {
      if (!hasAccessPermission(authUser, "bots")) return forbiddenAccess();
      return addBotFromDashboard(request, env, authUser);
    }
    if (url.pathname === "/api/dashboard") {
      if (!hasAccessPermission(authUser, "dashboard")) return forbiddenAccess();
      return fetchDashboard(request, env, authUser);
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
  },
};
