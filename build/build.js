// All In — static site generator. Run: node build/build.js
// Writes every English page into the site root. Does not touch /layan/ (Arabic page) or the old assets.
const fs = require('fs');
const path = require('path');
const { WA, services, products, articles } = require('./content');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://firas-i.github.io';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const svc = (slug) => services.find((s) => s.slug === slug);
const fmtDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const NAV = [
  ['services', 'Services', '/services/'],
  ['industries', 'Industries', '/industries/'],
  ['products', 'Products', '/products/'],
  ['insights', 'Insights', '/insights/'],
  ['about', 'About', '/about/'],
];

function layout({ url, section, title, desc, body, type = 'website' }) {
  const depth = url.split('/').filter(Boolean).length - (url.endsWith('.html') ? 1 : 0);
  const pre = depth ? '../'.repeat(depth) : './';
  const nav = NAV.map(([key, label, href]) => {
    const cur = url === href ? ' aria-current="page"' : section === key ? ' aria-current="true"' : '';
    return `<a href="${href}"${cur}>${label}</a>`;
  }).join('\n        ');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${SITE}${url}">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="All In">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${SITE}${url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..650&family=Hanken+Grotesk:wght@400..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-head">
    <div class="wrap">
      <a class="brand" href="/" aria-label="All In, home">All <b>In</b></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
      <nav class="nav" id="nav" aria-label="Main">
        ${nav}
        <a class="btn btn-primary" href="/contact/"${url === '/contact/' ? ' aria-current="page"' : ''}>Talk to us</a>
      </nav>
    </div>
  </header>
  <main id="main">
${body}
  </main>
  <footer class="site-foot">
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="brand" href="/">All <b>In</b></a>
          <p style="margin-top:14px;max-width:34ch">Digital transformation and technology consulting. We advise, and we build what we recommend. Amman, Jordan.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>${services.map((s) => `<li><a href="/services/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Products</h4>
          <ul>${products.map((p) => `<li><a href="/products/${p.slug}/">${esc(p.name)}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Firm</h4>
          <ul>
            <li><a href="/industries/healthcare/">Healthcare</a></li>
            <li><a href="/insights/">Insights</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="${WA}" rel="noopener">WhatsApp</a></li>
            <li><a href="/layan/" lang="ar" dir="rtl">ليان بالعربي</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-base">
        <span>© 2026 All In. Amman, Jordan.</span>
        <span>No invented testimonials or figures appear on this site.</span>
      </div>
    </div>
  </footer>
  <script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
  // Root-relative links are written as "/x" above; make them relative so the site works at any base path.
  const out = html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, a, p) => `${a}="${pre}${p}"`);
  const file = path.join(ROOT, url.endsWith('.html') ? url : url + 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  return url;
}

// ---------- shared blocks ----------
const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb">${items.map(([l, h], i) => (h ? `<a href="${h}">${l}</a>` : `<span aria-current="page">${l}</span>`) + (i < items.length - 1 ? '<span aria-hidden="true">/</span>' : '')).join('')}</nav>`;

const pageHero = ({ trail, eyebrow, h1, lede, extra = '' }) => `
    <section class="page-hero">
      <div class="wrap"><div class="stack">
        ${trail ? crumbs(trail) : ''}
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
        <h1>${h1}</h1>
        <p class="lede">${lede}</p>
        ${extra}
      </div></div>
    </section>`;

const cta = (h2 = 'Tell us what you are trying to fix.', p = 'A short conversation is free and comes with no obligation. You will speak with the person who would do the work.') => `
    <section class="night cta">
      <div class="wrap">
        <h2>${h2}</h2>
        <p class="lede">${p}</p>
        <div class="btn-row">
          <a class="btn btn-honey" href="/contact/">Start a conversation</a>
          <a class="btn btn-ghost" href="${WA}" rel="noopener">Message us on WhatsApp</a>
        </div>
      </div>
    </section>`;

const serviceIndex = (list) => `<ol class="index-list">${list.map((s) => `
          <li><a href="/services/${s.slug}/">
            <span class="n">${String(services.indexOf(s) + 1).padStart(2, '0')}</span>
            <h3>${esc(s.name)}</h3>
            <p>${esc(s.short)}</p>
            <span class="go" aria-hidden="true">→</span>
          </a></li>`).join('')}
        </ol>`;

const productCards = (list) => `<div class="cards">${list.map((p) => `
          <a class="card" href="/products/${p.slug}/">
            <span class="tag">${esc(p.tag)}</span>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.short)}</p>
            <span class="more">View product</span>
          </a>`).join('')}
        </div>`;

const articleList = (list) => `<ul class="article-list">${list.map((a) => `
          <li><a href="/insights/${a.slug}/">
            <span class="meta"><span>${esc(a.topic)}</span><span aria-hidden="true">·</span><time datetime="${a.date}">${fmtDate(a.date)}</time><span aria-hidden="true">·</span><span>${a.read}</span></span>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.summary)}</p>
          </a></li>`).join('')}
        </ul>`;

const ticks = (items, cls = '') => `<ul class="ticks ${cls}">${items.map((t) => `<li><span>${t}</span></li>`).join('')}</ul>`;
const steps = (items) => `<ol class="steps">${items.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;
const rows = (items) => `<dl class="rows">${items.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;

const audioDemo = `
          <div class="demo">
            <span class="tag">Real call · unedited · Arabic</span>
            <h3>A dental appointment request, start to finish</h3>
            <audio controls preload="none" src="/assets/audio/layan-demo.mp3">Your browser cannot play this recording. <a href="/assets/audio/layan-demo.mp3">Download the MP3</a>.</audio>
            <p>You will hear an Arabic greeting, a price question, an appointment request, the phone number read back digit by digit, and a confirmation that the request was logged.</p>
          </div>`;

const pages = [];
const add = (p) => pages.push(layout(p));

// ---------- home ----------
add({
  url: '/', section: 'home',
  title: 'All In | Digital transformation & technology consulting',
  desc: 'All In is a technology consulting firm in Amman. We plan digital transformation, build AI agents and integrations, and test what we ship.',
  body: `
    <section class="hero">
      <div class="wrap"><div class="stack">
        <p class="eyebrow">Digital transformation · Technology consulting · Amman</p>
        <h1>Strategy that ends in working software.</h1>
        <p class="lede">All In helps organisations decide what to modernise, then designs, builds and tests it. The people who advise you are the people who write the code.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="/contact/">Talk to us</a>
          <a class="btn btn-ghost" href="/services/">See our services</a>
        </div>
      </div></div>
    </section>

    <section style="padding-top:0">
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">What we do</p>
          <h2>Seven service lines, one accountable team.</h2>
        </div>
        ${serviceIndex(services)}
      </div>
    </section>

    <section class="surface">
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">How we work</p>
          <h2>Three commitments we make on every engagement.</h2>
        </div>
        ${rows([
          ['We build what we recommend', 'Advice is cheap when someone else has to make it work. Our recommendations come with an offer to deliver them, and we write them accordingly.'],
          ['We start small and finish', 'The first project is sized to be completed and judged. It earns the right to a second one.'],
          ['We write the limits down', 'Every system we ship, especially an AI one, comes with a plain statement of what it does, what it will not do, and when a person takes over.'],
        ])}
      </div>
    </section>

    <section class="night">
      <div class="wrap">
        <div class="split" style="margin-bottom:clamp(32px,5vw,56px)">
          <div class="sec-head" style="margin:0">
            <p class="eyebrow">Products</p>
            <h2>We run our own AI products, so our advice has been tested in production.</h2>
            <p class="lede">Layan is our AI receptionist for clinics, on WhatsApp and on the phone. Do not take our word for it. Listen to a complete call.</p>
            <p><a class="arrow-link" href="/products/">All products</a></p>
          </div>
          ${audioDemo}
        </div>
        ${productCards(products)}
      </div>
    </section>

    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Industries</p>
          <h2>Healthcare first.</h2>
          <p class="lede">We began with private clinics because the problem is plain: patients ask after hours, and nobody answers. What we learned there about safety limits and human hand-over shapes everything else we build.</p>
          <p><a class="arrow-link" href="/industries/healthcare/">Our healthcare work</a></p>
        </div>
        <div class="panel">
          <h3>Outside healthcare?</h3>
          <p class="muted">Our services are not sector-specific. Integration, testing, analysis and web delivery work the same way in retail, education, professional services and the public sector. If we lack experience in your field we will tell you in the first call.</p>
          <p><a class="arrow-link" href="/industries/">Industries</a></p>
        </div>
      </div>
    </section>

    <section class="surface">
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">Insights</p>
          <h2>What we have learned by building.</h2>
        </div>
        ${articleList(articles)}
      </div>
    </section>

    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">A young firm, stated plainly</p>
          <h2>No logo wall. No borrowed numbers.</h2>
        </div>
        <div class="measure" style="display:grid;gap:16px">
          <p>All In is new. You will not find a page of client logos or a counter of "projects delivered" here, because we would have to make them up.</p>
          <p>What we can show you is our own product working: a recorded call you can listen to, limits we have written down, and the way we explain our reasoning. Judge us on that, and on the first conversation.</p>
          <p><a class="arrow-link" href="/about/">About the firm</a></p>
        </div>
      </div>
    </section>
${cta()}`,
});

// ---------- services ----------
add({
  url: '/services/', section: 'services',
  title: 'Services | All In',
  desc: 'Digital transformation strategy, AI and automation, architecture, systems integration, quality engineering, business analysis and web delivery.',
  body: `${pageHero({
    eyebrow: 'Services',
    h1: 'From the first question to the running system.',
    lede: 'Seven service lines that cover the path from deciding what to change, to building it, to proving it works. Engage us for one, or for the whole path.',
  })}
    <section>
      <div class="wrap">${serviceIndex(services)}</div>
    </section>
    <section class="surface">
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">How engagements are shaped</p>
          <h2>Three ways to work with us.</h2>
        </div>
        <div class="cards">
          <div class="card"><span class="tag">Fixed scope</span><h3>Assessment</h3><p>A defined question answered in writing: a process review, an architecture review, a test strategy, a roadmap. Agreed scope and price before we begin.</p></div>
          <div class="card"><span class="tag">Fixed scope or phased</span><h3>Build</h3><p>We design, build, test and launch a system: an agent, an integration, a portal, a website. Delivered in stages you can inspect.</p></div>
          <div class="card"><span class="tag">Monthly</span><h3>Ongoing</h3><p>Operation and improvement of something we built, or senior technical advice on call for your team.</p></div>
        </div>
      </div>
    </section>
${cta('Not sure which service you need?', 'Describe the problem in your own words. We will tell you where we would start, and whether we are the right people for it.')}`,
});

services.forEach((s, i) => add({
  url: `/services/${s.slug}/`, section: 'services',
  title: `${s.name} | All In`,
  desc: s.short,
  body: `${pageHero({
    trail: [['Services', '/services/'], [esc(s.name)]],
    eyebrow: `Service ${String(i + 1).padStart(2, '0')}`,
    h1: esc(s.name),
    lede: s.lede,
    extra: `<div class="btn-row"><a class="btn btn-primary" href="/contact/">Discuss this service</a></div>`,
  })}
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">The problem</p>
          <h2>Where this usually starts.</h2>
        </div>
        <p class="lede" style="color:var(--ink)">${s.problem}</p>
      </div>
    </section>
    <section class="surface">
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">What we do</p>
          <h2>The work, in plain terms.</h2>
        </div>
        ${rows(s.what)}
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">How an engagement runs</p>
          <h2>${s.steps.length} stages, each with something you can review.</h2>
        </div>
        ${steps(s.steps)}
      </div>
    </section>
    <section class="surface">
      <div class="wrap two-col">
        <div class="panel">
          <h3>What you receive</h3>
          ${ticks(s.outputs)}
        </div>
        <div class="panel">
          <h3>${s.product ? 'See it in our own products' : 'Related services'}</h3>
          ${s.product ? `<p class="muted">Everything on this page is how we built Layan and our other agents.</p>
          <ul class="ticks">${products.map((p) => `<li><a href="/products/${p.slug}/">${esc(p.name)}</a></li>`).join('')}</ul>
          <h3 style="margin-top:8px">Related services</h3>` : ''}
          <ul class="ticks">${s.related.map((r) => `<li><a href="/services/${r}/">${esc(svc(r).name)}</a></li>`).join('')}</ul>
        </div>
      </div>
    </section>
${cta()}`,
}));

// ---------- industries ----------
add({
  url: '/industries/', section: 'industries',
  title: 'Industries | All In',
  desc: 'All In works first in healthcare, with services that apply across sectors.',
  body: `${pageHero({
    eyebrow: 'Industries',
    h1: 'One sector in depth, before many in passing.',
    lede: 'We would rather know one industry properly than list twelve. Healthcare is where our products run today. Our services apply wherever the same problems appear.',
  })}
    <section>
      <div class="wrap">
        <div class="cards">
          <a class="card" href="/industries/healthcare/">
            <span class="tag">Current focus</span>
            <h3>Healthcare</h3>
            <p>Private clinics and practices: patient communication after hours, reception workload, websites and the systems behind the front desk.</p>
            <span class="more">Healthcare</span>
          </a>
          <div class="card">
            <span class="tag">By engagement</span>
            <h3>Other sectors</h3>
            <p>Integration, quality engineering, business analysis and web delivery are sector-neutral. We take on work in other fields when the problem is one we know how to solve, and we say so when it is not.</p>
          </div>
        </div>
      </div>
    </section>
${cta('Working in another sector?', 'Tell us about the problem. If it is close to what we do well, we will say how we would approach it.')}`,
});

add({
  url: '/industries/healthcare/', section: 'industries',
  title: 'Healthcare | All In',
  desc: 'Technology consulting and AI products for private clinics: after-hours patient communication, reception workload, and safe limits for AI.',
  body: `${pageHero({
    trail: [['Industries', '/industries/'], ['Healthcare']],
    eyebrow: 'Industry',
    h1: 'Healthcare',
    lede: 'Clinics close. Patients do not stop asking. We help private practices answer every enquiry, lighten the load on reception, and adopt AI without taking clinical risks.',
  })}
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">What we see</p>
          <h2>The front desk is where clinics lose patients.</h2>
        </div>
        ${rows([
          ['Enquiries arrive after hours', 'People message and call when they remember: after work, late at night, on the weekend. An unanswered patient asks the next clinic.'],
          ['Reception is overloaded at peak', 'The same questions about prices, hours and location are answered dozens of times, while the phone keeps ringing.'],
          ['Tools do not connect', 'Messages, calls and the appointment book live in separate places, and the receptionist is the integration.'],
          ['AI raises fair concerns', 'Owners worry, correctly, about an assistant giving medical advice or making promises the clinic cannot keep.'],
        ])}
      </div>
    </section>
    <section class="night">
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">Our products for clinics</p>
          <h2>Layan answers on WhatsApp and on the phone.</h2>
          <p class="lede">An AI receptionist in Jordanian Arabic that answers common questions from the clinic’s own information and takes appointment requests. Confirmation stays with your staff.</p>
        </div>
        ${productCards(products.slice(0, 2))}
      </div>
    </section>
    <section>
      <div class="wrap two-col">
        <div class="panel">
          <h3>The limits we hold in healthcare</h3>
          ${ticks(['Assistants introduce themselves as AI from the first message', 'No diagnosis and no medical advice', 'No medicine names, including common painkillers', 'No appointment is confirmed without your staff', 'Anything that sounds life-threatening is directed to emergency services at once'])}
        </div>
        <div class="panel">
          <h3>Services clinics ask us for</h3>
          <ul class="ticks">
            <li><a href="/services/ai-automation/">AI &amp; Intelligent Automation</a></li>
            <li><a href="/services/systems-integration/">Systems Integration &amp; APIs</a></li>
            <li><a href="/services/web-digital-products/">Web &amp; Digital Products</a></li>
            <li><a href="/services/business-analysis/">Business Analysis &amp; Process Design</a></li>
          </ul>
          <p class="muted">Arabic-speaking clinic owner? <a href="/layan/" lang="ar" dir="rtl">صفحة ليان بالعربي</a></p>
        </div>
      </div>
    </section>
${cta('Run a clinic?', 'Message us and we will arrange a short call to see whether Layan suits your practice. Free, and with no obligation.')}`,
});

// ---------- products ----------
add({
  url: '/products/', section: 'products',
  title: 'Products | All In',
  desc: 'AI products from All In: Layan Chat, Layan Voice Agent, omnichannel chat and voice bots, and custom AI agents.',
  body: `${pageHero({
    eyebrow: 'Products',
    h1: 'AI agents you can hear and try before you buy.',
    lede: 'Four products, built and operated by us. Two are ready-made for clinics. Two are built around your business and your channels.',
  })}
    <section>
      <div class="wrap">${productCards(products)}</div>
    </section>
    <section class="night">
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Proof, not promises</p>
          <h2>Listen to Layan take a real call.</h2>
          <p class="lede">A complete booking call, recorded as it happened and not edited. The call is in Arabic.</p>
          <p><a class="arrow-link" href="/products/layan-voice/">Layan Voice Agent</a></p>
        </div>
        ${audioDemo}
      </div>
    </section>
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Common to every product</p>
          <h2>The same rules, whichever one you choose.</h2>
        </div>
        ${rows([
          ['It says it is an AI', 'From the first message or the first second of a call. Nobody is misled about who they are talking to.'],
          ['It answers from your information', 'Hours, services and prices come from you. What it has not been given, it does not guess.'],
          ['It hands over to people', 'Requests land in one queue for your staff, with the details they need to act.'],
          ['Its limits are written down', 'You receive the list of what the agent will and will not do before it goes live.'],
        ])}
      </div>
    </section>
${cta('Want to hear it live?', 'We can arrange a live demonstration call or chat, set up with details from your own business.')}`,
});

const productHero = (p, lede, extra = '') => pageHero({
  trail: [['Products', '/products/'], [esc(p.name)]],
  eyebrow: esc(p.tag), h1: esc(p.name), lede, extra,
});
const P = (slug) => products.find((p) => p.slug === slug);

add({
  url: '/products/layan-chat/', section: 'products',
  title: 'Layan Chat | All In',
  desc: 'Layan Chat is an AI receptionist for clinics on WhatsApp. It answers in Jordanian Arabic and takes appointment requests after hours.',
  body: `${productHero(P('layan-chat'), 'Layan answers your clinic’s WhatsApp within seconds, at any hour, in Jordanian Arabic. It handles the common questions and takes appointment requests. Your receptionist confirms them in the morning.',
    `<div class="btn-row"><a class="btn btn-primary" href="${WA}" rel="noopener">Try Layan for your clinic</a><a class="btn btn-ghost" href="/layan/" lang="ar" dir="rtl">الصفحة بالعربي</a></div>`)}
    <section>
      <div class="wrap">
        <div class="sec-head">
          <p class="eyebrow">How a conversation goes</p>
          <h2>Three things Layan does in every chat.</h2>
        </div>
        ${steps([
          ['Introduces itself and answers', 'It says it is an AI assistant in its first message, then answers from the hours, services and prices the clinic provided.'],
          ['Takes a request, not a booking', 'It records what the patient wants and when suits them. Layan does not see the schedule, so confirming the time stays with reception.'],
          ['Asks little, and never pushes', 'A suitable time and how to reach the patient. It does not ask about medical conditions or collect details it does not need.'],
        ])}
      </div>
    </section>
    <section class="surface">
      <div class="wrap two-col">
        <div class="panel">
          <h3>Layan does</h3>
          ${ticks(['Answer repeated questions from your clinic’s information: hours, address, services, and the prices you choose to share', 'Take appointment requests and messages for the doctor', 'Direct life-threatening situations to emergency services immediately', 'Speak Jordanian Arabic, and continue in English if the patient switches'])}
        </div>
        <div class="panel">
          <h3>Layan does not</h3>
          ${ticks(['Diagnose or give medical advice', 'Name any medicine or painkiller', 'Confirm an appointment by itself, or promise a specific call-back time', 'Guess a price or a fact it was not given'], 'no')}
        </div>
      </div>
    </section>
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">The morning after</p>
          <h2>Reception opens to a ready list.</h2>
          <p class="lede">Every conversation becomes an open request in one list. The receptionist calls, confirms the time and closes it. Layan does not replace her. It prepares her morning.</p>
        </div>
        <div class="panel">
          <h3>Pricing</h3>
          <p class="price">By clinic<small>Depends on message volume and what you want answered. Ask us for a quote.</small></p>
          ${ticks(['Instant replies on the clinic’s WhatsApp', 'Common questions and appointment requests', 'One request list shared with Layan Voice'])}
          <p><a class="arrow-link" href="${WA}" rel="noopener">Ask for a WhatsApp quote</a></p>
        </div>
      </div>
    </section>
    <section class="surface">
      <div class="wrap">
        <div class="sec-head"><p class="eyebrow">Setup</p><h2>From first call to a clinic that answers, in days.</h2></div>
        ${steps([
          ['We talk for 20 minutes', 'We collect the clinic’s hours, services, the prices you want mentioned, and contact numbers. Nothing technical is asked of you.'],
          ['We prepare Layan', 'We load your clinic’s details and connect Layan to the clinic’s WhatsApp.'],
          ['Layan starts answering', 'Every request reaches reception in one list. We adjust with you in the first weeks.'],
        ])}
      </div>
    </section>
${cta('Tonight, another patient will ask.', 'Message us on WhatsApp and we will arrange a short call to see whether Layan suits your clinic.')}`,
});

add({
  url: '/products/layan-voice/', section: 'products',
  title: 'Layan Voice Agent | All In',
  desc: 'Layan Voice Agent answers your clinic’s phone in Jordanian Arabic around the clock. Listen to a real, unedited booking call.',
  body: `${productHero(P('layan-voice'), 'Layan answers your clinic’s phone line around the clock in a Jordanian voice. It answers questions, takes appointment requests and reads the phone number back to be sure. Available now.',
    `<div class="btn-row"><a class="btn btn-primary" href="#listen">Listen to a real call</a><a class="btn btn-ghost" href="${WA}" rel="noopener">Book a live demo</a></div>`)}
    <section class="night" id="listen">
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Judge with your own ears</p>
          <h2>One complete call, exactly as recorded.</h2>
          <p class="lede">No editing and no script. The call is in Arabic. If you would like to hear a live one, message us and we will call you.</p>
          ${ticks(['Arabic greeting', 'A question about price', 'An appointment request', 'The phone number repeated digit by digit', 'Confirmation that the request is logged'])}
        </div>
        ${audioDemo}
      </div>
    </section>
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">On a call</p>
          <h2>What Layan does when the phone rings.</h2>
        </div>
        ${rows([
          ['Answers every call', 'After hours, on Fridays and during the rush, when the front desk cannot pick up.'],
          ['Answers from your information', 'Hours, location, services and the prices you set. If it does not have an answer it gives the reception number.'],
          ['Takes appointment requests', 'What the caller needs and when suits them, with the phone number read back to confirm it.'],
          ['Does not transfer calls', 'It gives the reception number, or takes a message and your team calls back.'],
          ['Stops for emergencies', 'If the caller describes a threat to life, Layan stops everything and tells them to call emergency services on 911.'],
        ])}
      </div>
    </section>
    <section class="surface">
      <div class="wrap two-col">
        <div class="panel">
          <h3>Pricing</h3>
          <p class="price">JOD 200–350<small>one-time setup</small></p>
          <p class="price">JOD 70–140<small>per month</small></p>
          <p class="muted">The range depends on call volume and how much the clinic wants answered.</p>
        </div>
        <div class="panel">
          <h3>Included</h3>
          ${ticks(['Answers around the clock in Jordanian Arabic', 'Appointment requests and answers to patient questions', 'Connection to your clinic’s phone number', 'Every call delivered to reception as an open request', 'Free adjustments during the first month'])}
          <p><a class="arrow-link" href="${WA}" rel="noopener">Book Layan</a></p>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Pairs with</p>
          <h2>One receptionist, two channels.</h2>
          <p class="lede">Layan Chat covers WhatsApp with the same knowledge and the same request list, so reception has one place to look in the morning.</p>
        </div>
        ${productCards([P('layan-chat')])}
      </div>
    </section>
${cta('Hear Layan answer as your clinic.', 'Send us your clinic’s name on WhatsApp and we will set up a live demonstration call.')}`,
});

add({
  url: '/products/omnichannel-bots/', section: 'products',
  title: 'Chat & Voice Bots, Omnichannel | All In',
  desc: 'One AI assistant across WhatsApp, Instagram, Facebook Messenger, your website and your mobile app, with voice on the phone.',
  body: `${productHero(P('omnichannel-bots'), 'Your customers choose the channel. We put one assistant behind all of them, with one set of answers and one queue for your staff.',
    `<ul class="chips" aria-label="Supported channels"><li>WhatsApp</li><li>Instagram</li><li>Facebook Messenger</li><li>Website widget</li><li>Mobile app</li><li>Phone (voice)</li></ul>`)}
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Channels we deliver today</p>
          <h2>Five chat channels and the phone.</h2>
        </div>
        ${rows([
          ['WhatsApp', 'Connected to your business number. Where most customers in Jordan and the region already message you.'],
          ['Instagram', 'Direct messages answered with the same knowledge, so a question under your latest post does not wait until morning.'],
          ['Facebook Messenger', 'Page messages handled alongside the others, in one place.'],
          ['Website widget', 'A chat window on your site that answers visitors and collects their request before they leave.'],
          ['Mobile app', 'The same assistant embedded inside your own iOS or Android app.'],
          ['Voice', 'A phone agent that answers calls, built on the technology behind Layan Voice.'],
        ])}
      </div>
    </section>
    <section class="surface">
      <div class="wrap">
        <div class="sec-head"><p class="eyebrow">Why one assistant, not six</p><h2>Consistency is the product.</h2></div>
        <div class="cards">
          <div class="card"><h3>One source of answers</h3><p>Update a price or an opening time once, and every channel gives the new answer.</p></div>
          <div class="card"><h3>One queue for staff</h3><p>Requests from every channel arrive in a single list with the channel, contact and what was asked.</p></div>
          <div class="card"><h3>One set of limits</h3><p>The same written rules about what the assistant will not do apply everywhere it speaks.</p></div>
          <div class="card"><h3>Arabic and English</h3><p>Built Arabic-first, including dialect, and comfortable when a customer switches language mid-conversation.</p></div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="sec-head"><p class="eyebrow">Delivery</p><h2>How we roll it out.</h2></div>
        ${steps([
          ['Scope', 'Which questions it answers, which requests it takes, and what it must refuse.'],
          ['First channel', 'We launch on the channel that carries the most traffic and tune it on real conversations.'],
          ['Add channels', 'The remaining channels are connected to the same assistant, one at a time.'],
          ['Operate', 'Monitoring, updates to your information, and regular review of real transcripts.'],
        ])}
        <p class="note" style="margin-top:36px">Pricing depends on the number of channels and the volume of conversations. Connecting some channels requires business accounts with the platform owner, such as a WhatsApp Business account. We guide you through that setup.</p>
      </div>
    </section>
${cta('Which channels do your customers use?', 'Tell us where the messages come in today and we will propose where to start.')}`,
});

add({
  url: '/products/custom-ai-agents/', section: 'products',
  title: 'Custom AI Agents | All In',
  desc: 'AI agents designed around one of your workflows, with written limits, tests you can re-run, and a human hand-over.',
  body: `${productHero(P('custom-ai-agents'), 'When a ready-made bot does not fit, we build an agent around one specific job in your organisation: its inputs, its rules, its systems and the person who takes over when it stops.',
    `<div class="btn-row"><a class="btn btn-primary" href="/contact/">Describe your workflow</a></div>`)}
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Good candidates</p>
          <h2>Work an agent can take on.</h2>
          <p class="muted">These are examples of the kind of task that suits an agent, not a list of past projects.</p>
        </div>
        ${rows([
          ['Intake and triage', 'Reading incoming requests, forms or emails, extracting the details and routing each one to the right person.'],
          ['Front-line answers', 'Answering customer or employee questions from your own documents and policies.'],
          ['Scheduling and follow-up', 'Collecting availability, sending reminders and chasing the replies nobody has time to chase.'],
          ['Document preparation', 'Drafting routine documents from structured data for a person to review and approve.'],
          ['Internal assistants', 'Helping staff find procedures, past decisions and records across the systems you already have.'],
        ])}
      </div>
    </section>
    <section class="surface">
      <div class="wrap">
        <div class="sec-head"><p class="eyebrow">What every agent ships with</p><h2>Four things you can hold us to.</h2></div>
        <div class="cards">
          <div class="card"><h3>A written scope</h3><p>What the agent does, what it refuses, and when it stops and hands over. Agreed before build.</p></div>
          <div class="card"><h3>A test set</h3><p>Scenarios, including attempts to push it past its limits, that are re-run after every change.</p></div>
          <div class="card"><h3>A hand-over</h3><p>A queue or notification that gives your staff everything they need to finish the job.</p></div>
          <div class="card"><h3>A record</h3><p>Conversations and actions are logged so you can review what the agent did and why.</p></div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="sec-head"><p class="eyebrow">Process</p><h2>From one workflow to a working agent.</h2></div>
        ${steps([
          ['Choose the job', 'One task with a clear owner and a clear definition of done.'],
          ['Write the rules', 'Scope, refusals and hand-over, reviewed with the people who do the work today.'],
          ['Build and connect', 'The agent, plus the integrations to your channels and systems.'],
          ['Test and launch', 'Evaluated against the test set, then released to real use under watch.'],
        ])}
        <p class="note" style="margin-top:36px">Custom agents are scoped and priced per project. This product is the delivery side of our <a href="/services/ai-automation/">AI &amp; Intelligent Automation</a> service. If you are still deciding what to automate, start there.</p>
      </div>
    </section>
${cta('Have a task in mind?', 'Describe it in a few lines. We will tell you honestly whether an agent is the right tool.')}`,
});

// ---------- insights ----------
add({
  url: '/insights/', section: 'insights',
  title: 'Insights | All In',
  desc: 'Practical writing from All In on AI agents, digital transformation and quality engineering.',
  body: `${pageHero({
    eyebrow: 'Insights',
    h1: 'Notes from the work.',
    lede: 'Short, practical pieces on what we learn while building and testing real systems. No trend reports.',
  })}
    <section><div class="wrap">${articleList(articles)}</div></section>
${cta()}`,
});

articles.forEach((a) => add({
  url: `/insights/${a.slug}/`, section: 'insights', type: 'article',
  title: `${a.title} | All In`,
  desc: a.summary,
  body: `
    <section class="page-hero">
      <div class="wrap"><div class="stack">
        ${crumbs([['Insights', '/insights/'], [esc(a.topic)]])}
        <h1>${esc(a.title)}</h1>
        <p class="lede">${esc(a.summary)}</p>
        <p class="meta"><span>All In</span><span aria-hidden="true">·</span><time datetime="${a.date}">${fmtDate(a.date)}</time><span aria-hidden="true">·</span><span>${a.read}</span></p>
      </div></div>
    </section>
    <section>
      <div class="wrap"><article class="prose">${a.body}
      </article></div>
    </section>
    <section class="surface">
      <div class="wrap">
        <div class="sec-head"><p class="eyebrow">Keep reading</p><h2>More insights</h2></div>
        ${articleList(articles.filter((x) => x !== a))}
      </div>
    </section>
${cta()}`,
}));

// ---------- about ----------
add({
  url: '/about/', section: 'about',
  title: 'About | All In',
  desc: 'All In is a founder-led technology consulting firm in Amman, Jordan. We advise on digital transformation and build what we recommend.',
  body: `${pageHero({
    eyebrow: 'About',
    h1: 'A small firm that does the work itself.',
    lede: 'All In is a founder-led technology consulting firm based in Amman, Jordan. We advise on digital transformation, and we design, build and test the systems that advice leads to.',
  })}
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Why we exist</p>
          <h2>Advice and delivery belong together.</h2>
        </div>
        <div class="measure" style="display:grid;gap:16px">
          <p>Too many organisations pay for a strategy from one firm and a build from another, and then spend a year discovering that the two do not meet. We think the people who recommend a system should be prepared to build it and be judged on whether it works.</p>
          <p>Our background is in building AI systems, integrating business software, testing it properly and analysing the processes it serves. Those four disciplines are the firm.</p>
          <p>We also run our own products. Layan, our AI receptionist for clinics, is how we test our methods on ourselves before we recommend them to anyone else.</p>
        </div>
      </div>
    </section>
    <section class="surface">
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Principles</p>
          <h2>How we behave.</h2>
        </div>
        ${rows([
          ['Plain language', 'If we cannot explain it without jargon, we do not understand it well enough to sell it.'],
          ['Honest scope', 'We say what we have not done before. We recommend an off-the-shelf tool when it is the better answer.'],
          ['No invented proof', 'No fabricated testimonials, client logos or statistics. What we show is real, or it is labelled as an example.'],
          ['Safety before features', 'For AI systems, the limits are designed first and tested on every change.'],
          ['You own the result', 'Code, documentation and data belong to you at the end of the engagement.'],
        ])}
      </div>
    </section>
    <section>
      <div class="wrap split">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">Being early</p>
          <h2>What a young firm means for you.</h2>
        </div>
        <div class="measure" style="display:grid;gap:16px">
          <p>We are at the beginning, and we think that works in your favour. You speak directly with the person building your solution, not with an account manager. Decisions are quick. Your project is not one of two hundred.</p>
          <p>It also means we choose engagements carefully and start with a scope we are certain we can deliver.</p>
          <p><a class="arrow-link" href="/contact/">Start a conversation</a></p>
        </div>
      </div>
    </section>
${cta()}`,
});

// ---------- contact ----------
add({
  url: '/contact/', section: 'contact',
  title: 'Contact | All In',
  desc: 'Contact All In in Amman, Jordan. Message us on WhatsApp or send a short description of what you are trying to fix.',
  body: `${pageHero({
    eyebrow: 'Contact',
    h1: 'Tell us what you are trying to fix.',
    lede: 'A few lines are enough. We usually reply the same day during working hours, Amman time.',
  })}
    <section>
      <div class="wrap split">
        <div style="display:grid;gap:24px;align-content:start">
          <div class="panel">
            <h3>Fastest: WhatsApp</h3>
            <p class="muted">Message us directly. This is the same number clinic owners use to try Layan.</p>
            <p><a class="btn btn-honey" href="${WA}" rel="noopener">Open WhatsApp</a></p>
            <p class="muted">+962 7 9297 7389</p>
          </div>
          <div class="panel">
            <h3>What happens next</h3>
            ${ticks(['We read your message and reply with questions or a time to talk', 'A short call, free and without obligation', 'If we can help, a written scope and price. If we cannot, we say so'])}
          </div>
        </div>
        <form class="form panel" id="contact-form" data-wa="${WA}" novalidate>
          <h3>Send a message</h3>
          <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="f-org">Organisation <span class="muted" style="font-weight:400">(optional)</span></label><input id="f-org" name="org" type="text" autocomplete="organization"></div>
          <div class="field"><label for="f-topic">What is it about?</label>
            <select id="f-topic" name="topic">
              <option>Not sure yet</option>
              ${services.map((s) => `<option>${esc(s.name)}</option>`).join('')}
              ${products.map((p) => `<option>${esc(p.name)}</option>`).join('')}
            </select>
          </div>
          <div class="field"><label for="f-message">Your message</label><textarea id="f-message" name="message" required></textarea></div>
          <button class="btn btn-primary" type="submit">Send via WhatsApp</button>
          <p class="form-msg" id="form-msg" role="status" aria-live="polite">This form opens WhatsApp with your message filled in. Nothing is stored on this site.</p>
        </form>
      </div>
    </section>`,
});

// ---------- 404 ----------
add({
  url: '/404.html', section: '',
  title: 'Page not found | All In',
  desc: 'This page does not exist.',
  body: `${pageHero({
    eyebrow: 'Error 404',
    h1: 'That page is not here.',
    lede: 'The link may be old or mistyped. These will get you back on track.',
    extra: `<div class="btn-row"><a class="btn btn-primary" href="/">Home</a><a class="btn btn-ghost" href="/services/">Services</a><a class="btn btn-ghost" href="/products/">Products</a></div>`,
  })}`,
});
// The 404 page is served from any path, so its links must be absolute.
{
  const f = path.join(ROOT, '404.html');
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/(href|src)="\.\/([^"]*)"/g, '$1="/$2"'));
}

// ---------- sitemap + robots ----------
const urls = pages.filter((u) => !u.endsWith('.html')).concat('/layan/');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages (+ /layan/ kept as is = ${pages.length + 1}).`);
