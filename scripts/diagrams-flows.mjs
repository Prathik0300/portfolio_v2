// Flowcharts redrawn from the projects' original diagrams (CRLite+ and EnsoGrow), in the same theme as the rest.
// Same nodes and the same paths as the originals; only the drawing is new.
import { C, anchors, connect, flowNode, lane, lineLabel, svg, text } from "./diagrams-lib.mjs";

const A = anchors;

// ---------------------------------------------------------------- CRLite+ system architecture
export function crliteArchitecture() {
  const b = [];
  b.push(text(24, 28, "CRLite+ system architecture", { fill: C.yellow, weight: 600, size: 15 }));
  b.push(`<rect x="20" y="44" width="920" height="456" rx="3" fill="none" stroke="${C.faint}" stroke-opacity="0.5"/>`);

  const ext = A(150, 200, 210, 96), api = A(450, 200, 210, 96), gen = A(450, 400, 210, 96);
  const cascade = A(795, 150, 210, 76), dynamic = A(795, 300, 210, 76);
  // the two filter files sit in one group
  b.push(`<rect x="670" y="76" width="250" height="296" rx="3" fill="none" stroke="${C.blue}" stroke-opacity="0.6" stroke-width="1.5"/>`);
  b.push(text(795, 356, "BLOOM FILTERS", { fill: C.blue, weight: 600, size: 12, anchor: "middle" }));

  b.push(flowNode(ext.cx, ext.cy, ext.w, ext.h, ["Chrome extension", "(frontend)", "Manifest V3"], { color: C.blue }));
  b.push(flowNode(api.cx, api.cy, api.w, api.h, ["Node.js backend", "TLS fetch and", "revocation lists"], { color: C.green }));
  b.push(flowNode(gen.cx, gen.cy, gen.w, gen.h, ["Static filter", "generator", "(Python)"], { color: C.purple }));
  b.push(flowNode(cascade.cx, cascade.cy, cascade.w, cascade.h, ["cascadeFilters.json", "static cascade"]));
  b.push(flowNode(dynamic.cx, dynamic.cy, dynamic.w, dynamic.h, ["dynamicFilter.json", "dynamic updates"]));

  b.push(connect(ext.r, api.l));
  b.push(connect(api.r, cascade.l, { label: "serial numbers", mid: 560, labelAt: 2 }));
  b.push(connect(api.r, dynamic.l, { label: "filtered serials", mid: 560, labelAt: 2 }));
  b.push(connect(api.b, gen.t, { label: "filtered serials" }));
  return svg({
    w: 960, h: 520,
    title: "CRLite+ system architecture",
    desc: "The Chrome extension talks to a Node.js backend. The backend sends serial numbers to the static cascade filters file and filtered serials to the dynamic filter file, both Bloom filters, and filtered serials down to the Python static filter generator.",
    body: b.join("\n"),
  });
}

// ---------------------------------------------------------------- CRLite+ data flow
export function crliteDataFlow() {
  const W = 1120;
  const b = [];
  const AQ = C.aqua, BL = C.blue;

  // ---- offline generation
  b.push(lane(20, 20, W - 40, 270, "OFFLINE GENERATION", C.faint));
  const rev = A(150, 100, 190, 66), val = A(150, 215, 190, 66);
  const py = A(410, 158, 190, 84), black = A(680, 100, 190, 66), white = A(680, 215, 190, 66), json = A(950, 158, 190, 84);
  b.push(flowNode(rev.cx, rev.cy, rev.w, rev.h, ["Revoked serial", "dataset (simulated)"]));
  b.push(flowNode(val.cx, val.cy, val.w, val.h, ["Valid serial", "dataset (simulated)"]));
  b.push(flowNode(py.cx, py.cy, py.w, py.h, ["bloomFilter.py", "MurmurHash3,", "k hash seeds"], { color: AQ }));
  b.push(flowNode(black.cx, black.cy, black.w, black.h, ["Blacklist Bloom", "filter (level 1)"], { color: BL }));
  b.push(flowNode(white.cx, white.cy, white.w, white.h, ["Whitelist Bloom", "filter (level 2)"], { color: BL }));
  b.push(flowNode(json.cx, json.cy, json.w, json.h, ["cascadeFilters.json", "bit arrays + metadata:", "m, k, seeds, version"]));
  b.push(connect(rev.r, py.l));
  b.push(connect(val.r, py.l));
  b.push(connect(py.r, black.l));
  b.push(connect(py.r, white.l));
  b.push(connect(black.r, json.l));
  b.push(connect(white.r, json.l));

  // ---- distribution
  b.push(lane(20, 310, W - 40, 150, "DISTRIBUTION", C.faint));
  const pack = A(150, 392, 190, 84), ver = A(410, 392, 190, 46);
  b.push(flowNode(pack.cx, pack.cy, pack.w, pack.h, ["cascadeFilters.json", "packaged with the", "extension build"]));
  b.push(flowNode(ver.cx, ver.cy, ver.w, ver.h, "compressed / versioned", { kind: "pill" }));
  b.push(connect(json.b, pack.t, { via: [[json.cx, 300], [pack.cx, 300]] }));
  b.push(connect(pack.r, ver.l));

  // ---- runtime in the browser, with the backend it calls
  const top = 480;
  b.push(lane(20, top, W - 40, 450, "RUNTIME: BROWSER", C.faint));
  const col = (i) => 130 + i * 175, nw = 150;
  const r1 = top + 80, r2 = r1 + 130, r3 = r2 + 125;
  const ext = A(col(0), r1, nw, 70), tab = A(col(1), r1, nw, 70), hash = A(col(2), r1, nw, 70), inbl = A(col(3), r1, nw + 10, 80), allow = A(col(4), r1, 110, 46);
  const errl = A(col(0), r2, 130, 52), node = A(col(1), r2, nw, 70), wl = A(col(3), r2, nw, 56), inwl = A(col(4), r2, nw + 10, 80), allowfp = A(col(5), r2, 130, 56);
  const berr = A(col(1), r3, 176, 56), block = A(col(4), r3, nw, 60);

  b.push(flowNode(ext.cx, ext.cy, ext.w, ext.h, ["Extension loads", "cascadeFilters.json", "on startup"], { color: BL }));
  b.push(flowNode(tab.cx, tab.cy, tab.w, tab.h, ["On tab load:", "request cert serial", "from the backend"], { color: BL }));
  b.push(flowNode(hash.cx, hash.cy, hash.w, hash.h, ["Hash serial", "(SHA-256 + seeds)", "blacklist check"], { color: BL }));
  b.push(flowNode(inbl.cx, inbl.cy, inbl.w, inbl.h, "in blacklist?", { kind: "decision" }));
  b.push(flowNode(allow.cx, allow.cy, allow.w, allow.h, "Allow", { kind: "pill", color: C.green }));
  b.push(flowNode(errl.cx, errl.cy, errl.w, errl.h, ["Error loading", "filters"], { kind: "pill", color: C.orange }));
  b.push(flowNode(node.cx, node.cy, node.w, node.h, ["Node.js backend:", "TLS socket fetch,", "returns serial"], { color: C.green, dash: true }));
  b.push(flowNode(wl.cx, wl.cy, wl.w, wl.h, ["Whitelist", "Bloom check"], { color: BL }));
  b.push(flowNode(inwl.cx, inwl.cy, inwl.w, inwl.h, "in whitelist?", { kind: "decision" }));
  b.push(flowNode(allowfp.cx, allowfp.cy, allowfp.w, allowfp.h, ["Allow (false", "positive)"], { kind: "pill", color: C.green }));
  b.push(flowNode(berr.cx, berr.cy, berr.w, berr.h, ["Backend", "communication error"], { kind: "pill", color: C.orange }));
  b.push(flowNode(block.cx, block.cy, block.w, block.h, ["Block (redirect", "to blocked.html)"], { kind: "pill", color: C.orange }));

  b.push(connect([190, pack.b[1]], [190, ext.t[1]]));
  b.push(connect(ext.r, tab.l));
  b.push(connect(tab.r, hash.l));
  b.push(connect(hash.r, inbl.l));
  b.push(connect(inbl.r, allow.l, { label: "no" }));
  b.push(connect(inbl.b, wl.t, { label: "yes" }));
  b.push(connect(wl.r, inwl.l));
  b.push(connect(inwl.r, allowfp.l, { label: "yes" }));
  b.push(connect(inwl.b, block.t, { label: "no" }));
  b.push(connect(ext.b, errl.t, { style: "err" }));
  // the browser asks the backend, and the backend answers
  b.push(connect([tab.cx - 22, tab.b[1]], [node.cx - 22, node.t[1]], { style: "msg" }));
  b.push(connect([node.cx + 22, node.t[1]], [tab.cx + 22, tab.b[1]], { style: "msg" }));
  b.push(lineLabel(tab.cx - 30, (tab.b[1] + node.t[1]) / 2 + 4, "request serial", { fill: C.aqua, anchor: "end" }));
  b.push(lineLabel(tab.cx + 30, (tab.b[1] + node.t[1]) / 2 + 4, "serial + cert metadata", { fill: C.aqua, anchor: "start" }));
  b.push(connect(node.b, berr.t, { style: "err" }));
  // both errors end in a block
  const bus = block.cy + 62;
  b.push(connect(errl.b, block.b, { style: "err", via: [[errl.cx, bus], [block.cx, bus]] }));
  b.push(connect(berr.r, block.l, { style: "err" }));
  return svg({
    w: W, h: top + 470,
    title: "CRLite+ data flow",
    desc: "Offline, a Python script builds a blacklist and a whitelist Bloom filter from simulated revoked and valid serial datasets and writes cascadeFilters.json. The file is packaged with the extension build, compressed and versioned. At runtime the extension loads it, asks the Node.js backend for a certificate's serial on each tab load, hashes it, and checks the blacklist: not in it means allow. If it is, a whitelist check decides between allow as a false positive and block, which redirects to blocked.html. Errors loading the filters or reaching the backend also end in a block.",
    body: b.join("\n"),
  });
}

// ---------------------------------------------------------------- EnsoGrow user flow
export function ensogrowUserFlow() {
  const W = 1120, P = 72, y = (r) => 90 + r * P;
  const b = [];
  const U = C.aqua, FE = C.blue, G = C.purple;
  const H = y(21) + 80;
  b.push(lane(20, 40, 290, H - 60, "USER", U));
  b.push(lane(330, 40, 490, H - 60, "FRONT END", FE));
  b.push(lane(840, 40, 260, H - 60, "GEMINI", G));

  const N = {};
  const add = (id, cx, r, w, h, label, opt) => {
    N[id] = A(cx, y(r), w, h);
    b.push(flowNode(cx, y(r), w, h, label, opt));
  };
  const Ux = 165, Fx = 470, Sx = 735, Gx = 970;
  // user lane
  add("land", Ux, 0, 140, 40, "Landing", { kind: "pill", color: U });
  add("click", Ux, 1, 200, 46, ["Click “Sign in", "with Google”"], { color: U });
  add("autherr", Ux, 2, 140, 40, "Auth error", { kind: "pill", color: C.orange });
  add("retry", Ux, 3, 160, 40, "Retry auth", { color: U });
  add("form", Ux, 4, 200, 46, ["Fill onboarding", "form"], { color: U });
  add("subm", Ux, 5, 200, 40, "Submit onboarding", { color: U });
  add("browse", Ux, 7, 200, 46, ["Browse", "recommendations"], { color: U });
  add("select", Ux, 8, 200, 40, "Select plant", { color: U });
  add("viewd", Ux, 9, 200, 46, ["View plant", "details"], { color: U });
  add("start", Ux, 10, 200, 40, "Start growing", { color: U });
  add("remind", Ux, 11, 200, 46, ["Set reminder", "(optional)"], { color: U });
  add("dash", Ux, 12, 200, 40, "View dashboard", { color: U });
  add("health", Ux, 13, 200, 40, "Update health", { color: U });
  add("doc", Ux, 14, 200, 40, "Open Doctor AI", { color: U });
  add("camden", Ux, 15, 150, 40, "Camera denied", { kind: "pill", color: C.orange });
  add("capture", Ux, 16, 200, 40, "Capture image", { color: U });
  add("confirm", Ux, 17, 200, 40, "Confirm image", { color: U });
  add("retake", Ux, 18, 200, 40, "Retake image", { color: U });
  add("apply", Ux, 19, 200, 40, "Apply fix", { color: U });
  add("care", Ux, 20, 200, 46, ["Ongoing care", "loop"], { color: U });
  add("end", Ux, 21, 110, 40, "End", { kind: "pill", color: U });
  // front end, main column and side column
  add("sso", Fx, 1, 220, 40, "Google SSO", { color: FE });
  add("dec", Fx, 2, 190, 56, "Signed in?", { kind: "decision" });
  add("onb", Fx, 4, 220, 46, ["Show", "onboarding"], { color: FE });
  add("ctx", Fx, 5, 220, 40, "Submit context", { color: FE });
  add("load", Fx, 6, 220, 40, "Show loading", { color: FE });
  add("recs", Fx, 7, 220, 46, ["Show", "recommendations"], { color: FE });
  add("pdet", Fx, 8, 220, 40, "Show plant details", { color: FE });
  add("guide", Fx, 9, 220, 40, "Show guide", { color: FE });
  add("addd", Fx, 10, 220, 40, "Add to dashboard", { color: FE });
  add("sdash", Fx, 12, 220, 40, "Show dashboard", { color: FE });
  add("opencam", Fx, 14, 220, 40, "Open camera", { color: FE });
  add("diag", Fx, 19, 220, 40, "Show diagnosis", { color: FE });
  add("save", Fx, 20, 220, 40, "Save to history", { color: FE });
  add("srem", Sx, 11, 150, 46, ["Show", "reminder"], { color: FE });
  add("profile", Sx, 12, 150, 46, ["Show plant", "profile"], { color: FE });
  add("shealth", Sx, 13, 150, 46, ["Show health", "update"], { color: FE });
  add("camperm", Sx, 14, 150, 52, ["Camera", "permission denied"], { kind: "pill", color: C.orange });
  add("fgerr", Sx, 21, 150, 40, "Gemini error", { color: C.orange });
  // Gemini lane
  add("actx", Gx, 5, 200, 46, ["Analyze", "context"], { color: G });
  add("gret", Gx, 7, 200, 46, ["Return", "recommendations"], { kind: "pill", color: G });
  add("aimg", Gx, 17, 200, 46, ["Analyze", "image"], { color: G });
  add("gdiag", Gx, 19, 200, 46, ["Return", "diagnosis"], { kind: "pill", color: G });
  add("gerr", Gx, 21, 160, 40, "Gemini error", { kind: "pill", color: C.orange });

  const gutter = 42;
  // sign in
  b.push(connect(N.land.b, N.click.t));
  b.push(connect(N.click.r, N.sso.l, { style: "msg", label: "sign in" }));
  b.push(connect(N.sso.b, N.dec.t));
  b.push(connect(N.dec.b, N.onb.t, { label: "yes" }));
  b.push(connect(N.dec.l, N.autherr.r, { style: "err", label: "no" }));
  b.push(connect(N.autherr.b, N.retry.t));
  b.push(connect(N.retry.l, N.click.l, { style: "err", via: [[gutter, N.retry.cy], [gutter, N.click.cy]] }));
  // onboarding and recommendations
  b.push(connect(N.onb.l, N.form.r, { style: "msg", label: "show form" }));
  b.push(connect(N.form.b, N.subm.t));
  b.push(connect(N.subm.r, N.ctx.l, { style: "msg", label: "submit" }));
  b.push(connect(N.ctx.r, N.actx.l, { style: "msg", label: "send context" }));
  b.push(connect(N.ctx.b, N.load.t));
  b.push(connect(N.actx.b, N.gret.t));
  b.push(connect(N.gret.l, N.recs.r, { style: "msg", label: "recommendations" }));
  b.push(connect(N.load.b, N.recs.t));
  b.push(connect(N.subm.b, N.browse.t));
  b.push(connect(N.recs.l, N.browse.r, { style: "msg", label: "show list" }));
  // picking a plant
  b.push(connect(N.browse.b, N.select.t));
  b.push(connect(N.select.b, N.viewd.t));
  b.push(connect(N.viewd.b, N.start.t));
  b.push(connect(N.start.b, N.remind.t));
  b.push(connect(N.remind.b, N.dash.t));
  b.push(connect(N.select.r, N.pdet.l, { style: "msg", label: "select" }));
  b.push(connect(N.pdet.b, N.guide.t));
  b.push(connect(N.guide.l, N.viewd.r, { style: "msg", label: "guide" }));
  b.push(connect(N.start.r, N.addd.l, { style: "msg", label: "add" }));
  b.push(connect(N.addd.b, N.sdash.t));
  b.push(connect(N.remind.r, N.srem.l, { style: "msg", label: "set", labelAt: 0 }));
  // dashboard
  b.push(connect(N.sdash.l, N.dash.r, { style: "msg", label: "show" }));
  b.push(connect(N.sdash.r, N.profile.l, { label: "profile" }));
  b.push(connect(N.dash.b, N.health.t));
  b.push(connect(N.dash.l, N.doc.l, { via: [[gutter + 10, N.dash.cy], [gutter + 10, N.doc.cy]] }));
  b.push(connect(N.health.r, N.shealth.l, { style: "msg", label: "update" }));
  // plant doctor
  b.push(connect(N.doc.r, N.opencam.l, { style: "msg", label: "open" }));
  b.push(connect(N.opencam.r, N.camperm.l, { style: "err", label: "denied" }));
  b.push(connect(N.camperm.b, N.camden.r, { style: "err", via: [[N.camperm.cx, N.camden.cy]] }));
  b.push(connect(N.opencam.b, N.capture.r, { via: [[N.opencam.cx, N.capture.cy]], label: "granted", labelAt: 1 }));
  b.push(connect(N.capture.b, N.confirm.t));
  b.push(connect(N.confirm.r, N.aimg.l, { style: "msg", label: "analyze" }));
  b.push(connect(N.confirm.b, N.retake.t, { style: "err", label: "retake" }));
  b.push(connect(N.retake.l, N.capture.l, { style: "err", via: [[gutter, N.retake.cy], [gutter, N.capture.cy]] }));
  b.push(connect(N.aimg.b, N.gdiag.t));
  b.push(connect(N.gdiag.l, N.diag.r, { style: "msg", label: "diagnosis" }));
  b.push(connect(N.diag.l, N.apply.r, { style: "msg", label: "show fix" }));
  b.push(connect(N.diag.b, N.save.t));
  b.push(connect(N.save.l, N.care.r, { style: "msg", label: "saved" }));
  b.push(connect(N.apply.b, N.care.t));
  b.push(connect(N.care.b, N.end.t));
  // when Gemini fails
  b.push(connect(N.aimg.r, N.gerr.r, { style: "err", via: [[1090, N.aimg.cy], [1090, N.gerr.cy]], label: "fails", labelAt: 1, labelDx: -30 }));
  b.push(connect(N.gerr.l, N.fgerr.r, { style: "err", label: "error" }));

  // key
  const kx = 560, ky = y(15) + 34;
  const key = [
    ["flow", C.faint, false, "step to step"],
    ["msg", C.aqua, true, "message between lanes"],
    ["err", C.orange, true, "error or retry"],
  ];
  key.forEach(([, color, dash, label], i) => {
    const yy = ky + i * 22;
    b.push(`<path d="M${kx},${yy} L${kx + 36},${yy}" stroke="${color}" stroke-width="1.5"${dash ? ' stroke-dasharray="5 4"' : ""}/>`);
    b.push(text(kx + 48, yy + 4, label, { fill: C.dim, size: 12 }));
  });
  return svg({
    w: W, h: H,
    title: "EnsoGrow user flow",
    desc: "A swimlane diagram with three lanes: the user, the front end, and Gemini. The user signs in with Google, fills an onboarding form, gets plant recommendations from Gemini, picks a plant and adds it to the dashboard with an optional reminder, then updates its health or opens the Doctor AI. The Doctor AI opens the camera, the user captures and confirms a photo, Gemini returns a diagnosis, and the user applies the fix, which is saved to history. Auth, camera permission and Gemini errors have their own paths.",
    body: b.join("\n"),
  });
}

// ---------------------------------------------------------------- EnsoGrow task flow
export function ensogrowTaskFlow() {
  const W = 1000, X0 = 30, PITCH = 160, NW = 130, NH = 60, TAG = 16;
  const b = [];
  let y = 20;

  const tasks = [
    {
      title: "1  Sign in and set up",
      rows: [
        [
          { l: ["Click “Sign in", "with Google”"], tag: "authentication" },
          { l: ["Google", "consent"] },
          { l: ["Return", "to app"] },
          { l: ["Enter", "city"], tag: "onboarding input" },
          { l: ["Enter", "dimensions"] },
          { l: ["Enter sunlight", "hours"] },
        ],
        [
          { l: "Submit" },
          { l: ["All fields", "filled?"], decision: true, branch: { l: ["Show inline", "validation"], edge: "no", note: "back to the form" } },
          { l: ["Request", "recommendations"], tag: "recommendations" },
          { l: ["Gemini returned", "recommendations?"], decision: true, w: 146, branch: { l: ["Show retry and", "edit setup"], edge: "no", note: "back to setup" } },
          { l: ["Show", "recommendations"] },
        ],
      ],
    },
    {
      title: "2  Start growing a plant",
      rows: [
        [
          { l: ["Browse", "plant list"], tag: "browse recommendations" },
          { l: ["Tap", "plant card"] },
          { l: ["View step-by-", "step plan"], tag: "view plant details" },
          { l: ["Click", "Start Growing"] },
          { l: ["Confirm start", "date and", "reminders"] },
          { l: ["Plant added", "to dashboard"], tag: "dashboard update" },
        ],
      ],
    },
    {
      title: "3  Update plant health",
      rows: [
        [
          { l: ["Select", "plant"], tag: "dashboard" },
          { l: ["Click", "Update Health"] },
          { l: ["Choose", "status"], tag: "update health" },
          { l: ["Add optional", "notes"] },
          { l: "Save" },
          { l: ["Dashboard", "updates growth"], tag: "progress update" },
        ],
      ],
    },
    {
      title: "4  Diagnose with the plant doctor",
      rows: [
        [
          { l: ["Click", "Doctor AI"], tag: "diagnosis start" },
          { l: ["Camera", "permission", "granted?"], decision: true, branch: { l: ["Show upload", "image fallback"], edge: "no", join: 3 } },
          { l: ["Open", "camera"] },
          { l: ["Capture", "plant photo"], tag: "capture image" },
          { l: ["Confirm", "photo"] },
          { l: ["Photo", "quality OK?"], decision: true, branch: { l: ["Prompt", "retake"], edge: "no", loop: 3 } },
        ],
        [
          { l: ["Send to", "Gemini"], tag: "diagnosis" },
          { l: ["Gemini returns", "diagnosis"] },
          { l: ["Diagnosis", "certain?"], decision: true, branch: { l: ["Ask follow-up", "questions"], edge: "no", join: 3 } },
          { l: ["Show", "cure plan"] },
          { l: ["Click Save to", "plant history", "or Apply Fix"], tag: "save result" },
          { l: ["Dashboard shows", "care action", "suggested"] },
        ],
        [{ l: "End", pill: true }],
      ],
    },
  ];

  for (const task of tasks) {
    b.push(text(X0, y + 14, task.title, { fill: C.yellow, weight: 600, size: 15 }));
    y += 30;
    let prev = null; // last node of the previous row, to draw the wrap-around arrow
    task.rows.forEach((row) => {
      const hasBranch = row.some((n) => n.branch);
      const cy = y + TAG + NH / 2;
      const branchCy = cy + NH / 2 + 56;
      const bottom = hasBranch ? branchCy + 25 : cy + NH / 2;
      const yWrap = bottom + 16;
      const nodes = row.map((n, i) => {
        const cx = X0 + NW / 2 + i * PITCH;
        const w = n.pill ? 90 : (n.w ?? NW);
        const h = n.pill ? 40 : n.decision ? NH + 4 : NH;
        const kind = n.decision ? "decision" : n.pill ? "pill" : "box";
        b.push(flowNode(cx, cy, w, h, n.l, { kind, color: n.pill ? C.green : undefined }));
        if (n.tag) b.push(text(cx - NW / 2, cy - NH / 2 - 6, n.tag, { fill: C.faint, size: 11 }));
        return { ...n, a: A(cx, cy, w, h) };
      });
      if (prev) {
        const first = nodes[0].a;
        b.push(connect(prev.r, first.t, { via: [[prev.r[0] + 16, prev.r[1]], [prev.r[0] + 16, prev.yWrap], [first.cx, prev.yWrap]] }));
      }
      nodes.forEach((n, i) => {
        if (i < nodes.length - 1) b.push(connect(n.a.r, nodes[i + 1].a.l, { label: n.decision ? "yes" : undefined }));
        if (!n.branch) return;
        const bn = A(n.a.cx, branchCy, NW, 50);
        b.push(flowNode(bn.cx, bn.cy, bn.w, bn.h, n.branch.l, { color: C.orange }));
        b.push(connect(n.a.b, bn.t, { label: n.branch.edge, style: "err" }));
        if (n.branch.loop !== undefined) {
          const t = nodes[n.branch.loop].a;
          b.push(connect(bn.l, t.b, { style: "err", via: [[t.cx, bn.cy]] }));
        }
        if (n.branch.join !== undefined) {
          const t = nodes[n.branch.join].a;
          b.push(connect(bn.r, t.b, { style: "flow", via: [[t.cx, bn.cy]] }));
        }
        if (n.branch.note) b.push(text(bn.cx, bn.cy + 25 + 14, n.branch.note, { fill: C.faint, size: 11, anchor: "middle" }));
      });
      prev = { r: nodes[nodes.length - 1].a.r, yWrap };
      y = yWrap + 22;
    });
    y += 16;
  }
  // key
  const ky = y;
  b.push(`<polygon points="${X0},${ky + 8} ${X0 + 8},${ky} ${X0 + 24},${ky} ${X0 + 32},${ky + 8} ${X0 + 24},${ky + 16} ${X0 + 8},${ky + 16}" fill="none" stroke="${C.yellow}" stroke-width="1.5"/>`);
  b.push(text(X0 + 44, ky + 12, "decision", { fill: C.dim, size: 12 }));
  b.push(`<rect x="${X0 + 150}" y="${ky}" width="24" height="16" rx="3" fill="none" stroke="${C.orange}" stroke-width="1.5"/>`);
  b.push(text(X0 + 186, ky + 12, "problem or retry path", { fill: C.dim, size: 12 }));
  return svg({
    w: W, h: y + 36,
    title: "EnsoGrow task flow",
    desc: "Four tasks drawn as step sequences. Sign in and set up: Google sign-in, then city, dimensions and sunlight, with inline validation if a field is missing, then Gemini recommendations with a retry path. Start growing a plant: browse, pick, view the plan, start growing and add it to the dashboard. Update plant health: choose a status, add notes and save. Diagnose with the plant doctor: camera permission or an upload fallback, capture and confirm a photo with a retake path, send to Gemini, ask follow-up questions if the diagnosis is uncertain, show a cure plan, then save or apply the fix.",
    body: b.join("\n"),
  });
}
