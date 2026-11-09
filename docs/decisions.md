# garilleti.me — decision log

What was decided for the site, why, and where. Add a bullet in the same PR that makes the decision. Keep replaced decisions and mark them "(replaced by …)": the history of why is the point. Dates are merge dates. "Reason not recorded" means no source states one.

## Rules that apply to every change

- **No location anywhere on the site.** Owner rule from the redesign brief. (2026-11-05, #14)
- **Every fact comes from the owner.** `lib/data.ts` and the case studies hold only facts he gave or approved; no new claims, numbers, employers or skills without his OK. (2026-11-05, #14)
- **Never push to `main`; the owner merges.** `main` deploys production on Vercel. (2026-11-05, #14)
- **Lighthouse no worse than before on every visual change.** Owner rule from the redesign brief. (2026-11-05, #14)
- **Drafts stay local.** The repository is public: draft articles, open questions for the owner and unreviewed numbers live on a local-only branch and are previewed with `vercel deploy` from the local tree. An article is committed only when it is `status: "ready"`. Drafts with open questions were pushed once and had to be removed. (2026-11-09)
- **No Claude session links in commits, PRs or issues.** The repository is public. Seven commits on `main` from #17–#19 still carry one; they stay, because rewriting `main` is not allowed. (2026-11-09)
- **Legal limits for case studies.** Never describe how Tardeo's sources are collected, never mention Instagram as a source, never name venues or promoters. For the Alexa skill, never name the film site it read. Whisperland names only Carlos Merchán. (2026-11-09, #17)

## Design

- **Run-trace look: mono labels, spans and a timeline for experience.** Picked by the owner from three directions reviewed with Codex and Grok. (2026-11-05, #14)
- **Screenshot tests guard the home page at phone and desktop width, light and dark.** Baselines are macOS renders. (2026-11-05, #15)
- **Colour themes change background and accent together, with a shuffle button.** Owner request: the colour button should change the background too. (2026-11-05, #16)
- **Case studies are MDX pages under `/projects/<slug>`, statically generated, with an image viewer (arrows, keys, swipe, Esc).** Owner request for a gallery he could browse. (2026-11-09, #17)
- **Social posts appear as a still and a link, not the platform's embed script.** The embed loads third-party code and cookies and slows the page. (2026-11-09, #18)
- **The portfolio's links to tardeo.ai carry `?s=garilleti`.** The Tardeo dashboard counts visits per tag; the visible link text stays "tardeo.ai". (2026-11-09, #19)
- **The case studies lead the home page as "Selected work" cards, right after the intro; the other projects follow as a list.** The case studies were only reachable through small links. Three directions were compared (cards, an animated trace hero, a sticky scroll story); Codex and Grok both picked the cards as the fastest to skim and the safest for Lighthouse. (#20)
- **Each card says what the project is, leads with a claim and adds two or three facts.** The owner did not want "€2–3 a day" as Tardeo's headline; Grok and a fresh Claude review both put held-out accuracy first for Tardeo, "did not replicate" for the evals and "1 in 10 users posted" for Whisperland. (#20)
- **Motion is CSS only: scroll-driven reveals, a small hover lift, nothing on the headline, and none of it under reduced motion.** (replaced by the scroll fade-ins below) Keeps the page free of animation JavaScript; browsers without scroll-driven animations show the content without the effect. Screenshot tests run with reduced motion so the reveals are settled. (#20)
- **Pages start below the sticky header after client navigation (`scroll-mt-24` on `main`).** On phones a case study opened 57 px down, under the header. (#20)
- **Blocks fade and lift in once as they scroll into view; section rules draw from the left; cards stagger and their covers settle from a slight zoom; timeline and diagram bars draw with the scroll.** A small IntersectionObserver adds a class once per block, so text never fades back out while someone scrolls up to re-read it. The hidden state needs JavaScript and full motion, so content is never blank without either. The name and photo never animate: they are what the page paints first. (#22)
- **The three oldest projects fold under "Earlier projects".** The list stays complete; the first screen of it shows what is current. (#22)
- **"All work" on a case study goes back to Selected work.** It pointed at the other-projects list. (#22)
- **Card text corrected:** Tardeo's claim no longer mixes its held-out score with a separate ten-model run, and the evals card says plainly that the gain disappeared on new images. (#22)
- **The intro states the current and previous lead roles; the motto and "I like automating things" go.** The headline now matches the OpenVPN entry: agents retrieve information and call tools, with a person approving every change. Owner approved. (#23)
- **Cognigy's highlights carry the Live Agent redesign: the before and after for agents, the subscription design with read replicas and metric-based autoscaling, and load tests with real browsers.** The team of 7 and the integrations stay in the description; the scale moved to the highlights so it is not said twice. Owner's facts and approval. The numbers are not attributed to a named customer, at the owner's request; the public customer list still names it. (#23)
- **Phones get a menu for the sections (Work, Experience, Projects, Contact).** The section links were hidden on phones, so Experience sat below three case studies with no shortcut. The menu closes on a link, Esc or a tap outside; on the narrowest phones the Shuffle button drops its label so the header still fits. (#23)
