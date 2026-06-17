/* GSAP animations for each Git concept SVG (free plugins only) */

function drawLine(tl, el, duration, position) {
  const len = el.getTotalLength();
  gsap.set(el, { strokeDasharray: len });
  tl.fromTo(el, { strokeDashoffset: len }, { strokeDashoffset: 0, duration, ease: "power2.inOut" }, position);
}

function loopTimeline(vars) {
  return gsap.timeline({ repeat: -1, repeatDelay: vars.repeatDelay ?? 2, repeatRefresh: true, ...vars });
}

function initAnimations() {
  if (typeof gsap === "undefined") return;

  animateRepository();
  animateClone();
  animateBranch();
  animateCommit();
  animatePushPull();
  animateDiff();
  animateMerge();
  animateRebase();
  animateConflict();
  animatePullRequest();
  animateIssue();
}

function animateRepository() {
  const tl = loopTimeline({ repeatDelay: 1.5 });
  tl.from("#repo-folder", { scale: 0, transformOrigin: "center", duration: 0.5, ease: "back.out(1.7)" })
    .from("#repo-files .file", { opacity: 0, x: -10, stagger: 0.15, duration: 0.3 }, "-=0.2")
    .from("#repo-cloud", { opacity: 0, y: -15, duration: 0.4 }, "-=0.1")
    .to("#repo-link", { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
    .to("#repo-label-remote", { opacity: 1, duration: 0.3 });
}

function animateClone() {
  gsap.set("#clone-packet", { x: 0, y: 0 });
  const tl = loopTimeline({});
  tl.from("#clone-remote", { opacity: 0, scale: 0.8, duration: 0.4 })
    .from("#clone-local", { opacity: 0, scale: 0.8, duration: 0.4 }, "-=0.2")
    .from("#clone-arrow", { opacity: 0, duration: 0.2 })
    .to("#clone-packet", { motionPath: { path: "#clone-path", align: "#clone-path", alignOrigin: [0.5, 0.5] }, duration: 1.2, ease: "power1.inOut" })
    .to("#clone-local-files .clone-file", { opacity: 1, stagger: 0.12, duration: 0.25 }, "-=0.4")
    .to("#clone-label", { opacity: 1, duration: 0.3 });
}

function animateBranch() {
  const tl = loopTimeline({});
  drawLine(tl, document.querySelector("#branch-main-line"), 0.8, 0);
  tl.from("#branch-main-commits circle", { scale: 0, transformOrigin: "center", stagger: 0.2, duration: 0.3, ease: "back.out(2)" }, "-=0.4");
  drawLine(tl, document.querySelector("#branch-fork"), 0.5, "-=0.1");
  tl.from("#branch-feature-commits circle", { scale: 0, transformOrigin: "center", stagger: 0.2, duration: 0.3, ease: "back.out(2)" }, "-=0.2")
    .to("#branch-label-feature", { opacity: 1, duration: 0.3 });
}

function animateCommit() {
  const tl = loopTimeline({});
  drawLine(tl, document.querySelector("#commit-timeline"), 0.6, 0);
  tl.from("#commit-existing circle", { scale: 0, transformOrigin: "center", stagger: 0.15, duration: 0.25, ease: "back.out(2)" }, "-=0.3")
    .from("#commit-camera", { opacity: 0, scale: 0.5, transformOrigin: "center", duration: 0.4, ease: "back.out(1.7)" })
    .to("#commit-flash", { opacity: 1, scale: 1.5, transformOrigin: "center", duration: 0.15 })
    .to("#commit-flash", { opacity: 0, duration: 0.3 })
    .from("#commit-new", { scale: 0, transformOrigin: "center", duration: 0.4, ease: "back.out(2)" })
    .from("#commit-message", { opacity: 0, y: 5, duration: 0.3 });
}

function animatePushPull() {
  gsap.set("#pp-remote-commit", { scale: 0, transformOrigin: "center" });
  gsap.set("#pp-local-new", { scale: 0, transformOrigin: "center" });
  gsap.set("#pp-push-dot", { x: 0, y: 0 });
  gsap.set("#pp-pull-dot", { x: 0, y: 0 });

  const tl = loopTimeline({ repeatDelay: 1 });
  tl.from("#pp-local", { opacity: 0, x: -20, duration: 0.4 })
    .from("#pp-remote", { opacity: 0, x: 20, duration: 0.4 }, "-=0.3")
    .to("#pp-push-dot", { motionPath: { path: "#pp-push-path", align: "#pp-push-path", alignOrigin: [0.5, 0.5] }, duration: 0.8, ease: "power2.inOut" })
    .to("#pp-remote-commit", { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.2")
    .to("#pp-pull-dot", { motionPath: { path: "#pp-pull-path", align: "#pp-pull-path", alignOrigin: [0.5, 0.5] }, duration: 0.8, ease: "power2.inOut" })
    .to("#pp-local-new", { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.2");
}

function animateDiff() {
  const tl = loopTimeline({});
  tl.from("#diff-left", { opacity: 0, x: -15, duration: 0.4 })
    .from("#diff-right", { opacity: 0, x: 15, duration: 0.4 }, "-=0.3")
    .from("#diff-highlight-remove", { scaleX: 0, transformOrigin: "left", duration: 0.4 })
    .from("#diff-highlight-add", { scaleX: 0, transformOrigin: "left", duration: 0.4 }, "-=0.2")
    .from("#diff-minus", { opacity: 0, scale: 0, transformOrigin: "center", duration: 0.3, ease: "back.out(2)" }, "-=0.1")
    .from("#diff-plus", { opacity: 0, scale: 0, transformOrigin: "center", duration: 0.3, ease: "back.out(2)" }, "-=0.2");
}

function animateMerge() {
  const tl = loopTimeline({});
  drawLine(tl, document.querySelector("#merge-main"), 0.6, 0);
  drawLine(tl, document.querySelector("#merge-feature"), 0.5, "-=0.2");
  tl.from("#merge-main-commits circle, #merge-feature-commits circle", { scale: 0, transformOrigin: "center", stagger: 0.12, duration: 0.25, ease: "back.out(2)" }, "-=0.3");
  drawLine(tl, document.querySelector("#merge-join"), 0.5, undefined);
  tl.from("#merge-result", { scale: 0, transformOrigin: "center", duration: 0.4, ease: "back.out(2)" }, "-=0.2")
    .to("#merge-label", { opacity: 1, duration: 0.3 });
}

function animateRebase() {
  const tl = loopTimeline({});
  drawLine(tl, document.querySelector("#rebase-main"), 0.5, 0);
  tl.from("#rebase-main-commits circle", { scale: 0, transformOrigin: "center", stagger: 0.15, duration: 0.25, ease: "back.out(2)" }, "-=0.2");
  drawLine(tl, document.querySelector("#rebase-old-feature"), 0.4, undefined);
  tl.from("#rebase-old-commits g", { scale: 0, transformOrigin: "center", stagger: 0.12, duration: 0.2, ease: "back.out(2)" }, "-=0.1")
    .to("#rebase-old-commits", { opacity: 0, y: 10, duration: 0.4 });
  drawLine(tl, document.querySelector("#rebase-new-feature"), 0.4, undefined);
  tl.from("#rebase-new-commits g", { scale: 0, transformOrigin: "center", stagger: 0.12, duration: 0.25, ease: "back.out(2)" }, "-=0.2")
    .to("#rebase-label", { opacity: 1, duration: 0.3 });
}

function animateConflict() {
  gsap.set("#conflict-check", { scale: 0, transformOrigin: "center" });

  const tl = loopTimeline({});
  drawLine(tl, document.querySelector("#conflict-branch-a"), 0.5, 0);
  drawLine(tl, document.querySelector("#conflict-branch-b"), 0.5, "-=0.3");
  tl.from("#conflict-markers", { opacity: 0, duration: 0.3 })
    .to("#conflict-shake", { x: "+=4", duration: 0.08, repeat: 5, yoyo: true, ease: "power1.inOut" })
    .to("#conflict-markers", { opacity: 0, duration: 0.3 })
    .from("#conflict-resolved", { opacity: 0, scale: 0.9, transformOrigin: "center", duration: 0.4, ease: "back.out(1.5)" })
    .to("#conflict-check", { scale: 1, duration: 0.3, ease: "back.out(2)" });
}

function animatePullRequest() {
  const tl = loopTimeline({});
  drawLine(tl, document.querySelector("#pr-feature-branch"), 0.5, 0);
  tl.from("#pr-commits circle", { scale: 0, transformOrigin: "center", stagger: 0.15, duration: 0.25, ease: "back.out(2)" }, "-=0.2")
    .from("#pr-card", { opacity: 0, y: 20, duration: 0.5, ease: "back.out(1.5)" })
    .from("#pr-review-icon", { scale: 0, transformOrigin: "center", duration: 0.3, ease: "back.out(2)" }, "-=0.1")
    .to("#pr-checks .check", { opacity: 1, stagger: 0.2, duration: 0.2 });
  drawLine(tl, document.querySelector("#pr-merge-arrow"), 0.5, undefined);
  tl.from("#pr-merged", { scale: 0, transformOrigin: "center", duration: 0.4, ease: "back.out(2)" }, "-=0.2");
}

function animateIssue() {
  gsap.set("#issue-assignee", { opacity: 0 });
  gsap.set("#issue-check", { scale: 0, transformOrigin: "center" });

  const tl = loopTimeline({});
  tl.from("#issue-board", { opacity: 0, y: 10, duration: 0.4 })
    .from("#issue-new", { opacity: 0, scale: 0.8, transformOrigin: "center top", duration: 0.5, ease: "back.out(1.5)" })
    .from("#issue-tag-bug", { scale: 0, transformOrigin: "center", duration: 0.3, ease: "back.out(2)" }, "-=0.1")
    .to("#issue-assignee", { opacity: 1, duration: 0.3 })
    .to("#issue-status", { attr: { fill: "#28a745" }, duration: 0.3 })
    .to("#issue-status-open", { opacity: 0, duration: 0.2 })
    .to("#issue-status-closed", { opacity: 1, duration: 0.2 }, "-=0.2")
    .to("#issue-check", { scale: 1, duration: 0.3, ease: "back.out(2)" });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(MotionPathPlugin);

  const repoLink = document.querySelector("#repo-link");
  if (repoLink) {
    const len = repoLink.getTotalLength();
    gsap.set(repoLink, { strokeDasharray: len, strokeDashoffset: len });
  }

  initAnimations();
});
