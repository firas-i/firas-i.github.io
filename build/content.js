// All In — site content. Edit copy here, then run: node build/build.js
// Rules for this file: no invented clients, no invented numbers, no named third-party systems we have not delivered on.

const WA = 'https://wa.me/962792977389';

const services = [
  {
    slug: 'digital-transformation',
    name: 'Digital Transformation Strategy',
    short: 'Decide what to change first, what it will cost, and how you will know it worked.',
    lede: 'Most transformation plans fail in the gap between the slide and the system. We write strategy that an engineering team can start building on Monday, and we stay to build it.',
    problem: 'You know the organisation needs to modernise. What you do not have is an honest picture of where the work actually happens today, which changes will pay back, and in what order to make them.',
    what: [
      ['Current-state assessment', 'We sit with the people doing the work and map how requests, records and decisions really move, including the spreadsheets and WhatsApp groups nobody admits to.'],
      ['Opportunity sizing', 'Each candidate change gets a plain estimate: effort, risk, who it affects, and what you would measure to prove it helped.'],
      ['Roadmap and sequencing', 'A short, ordered list of initiatives. The first one is always small enough to finish and visible enough to earn trust for the second.'],
      ['Build-or-buy decisions', 'When an off-the-shelf tool is the right answer we say so, even when it means less work for us.'],
      ['Change and adoption planning', 'Training, ownership and the awkward first month are planned up front, not discovered after go-live.'],
    ],
    steps: [
      ['Listen', 'Interviews and observation with the teams who own the process. No questionnaires sent from a distance.'],
      ['Map', 'A current-state map and a list of friction points, reviewed with you until it matches reality.'],
      ['Decide', 'A ranked roadmap with one recommended first project and the reasoning behind the order.'],
      ['Deliver', 'We can build the first initiative ourselves, or hand over a brief any competent team can execute.'],
    ],
    outputs: ['Current-state process map', 'Ranked opportunity list with effort and risk', '6 to 12 month roadmap', 'A scoped brief for the first project'],
    related: ['business-analysis', 'ai-automation', 'technology-consulting'],
  },
  {
    slug: 'ai-automation',
    name: 'AI & Intelligent Automation',
    short: 'Put language models and automation to work on real tasks, with limits you can explain to a regulator.',
    lede: 'We design, build and operate AI agents and automations that take work off your team. Every one ships with written limits: what it may do, what it must never do, and when it hands over to a person.',
    problem: 'Demos are easy. The hard part is an assistant that behaves the same way on its thousandth conversation as on its first, admits what it does not know, and leaves a record your staff can act on.',
    what: [
      ['Use-case selection', 'We look for tasks that are frequent, bounded and currently handled late or not at all. Those are where automation earns its keep first.'],
      ['Conversational agents', 'Chat and voice assistants that answer from your own information and collect structured requests. Our Layan products are built this way.'],
      ['Workflow automation', 'Document intake, classification, routing, reminders and follow-ups connected to the systems you already run.'],
      ['Guardrails and escalation', 'Refusal rules, safety routing and human hand-off are designed before the first prompt is written.'],
      ['Evaluation and monitoring', 'Test conversations, regression checks on every change, and a review loop so behaviour improves instead of drifting.'],
    ],
    steps: [
      ['Pick one task', 'A single job with a clear owner and a clear definition of done.'],
      ['Write the rules', 'What the agent does, what it refuses, and where the person takes over.'],
      ['Build and test', 'A working agent, tested against realistic and adversarial conversations.'],
      ['Run and tune', 'We monitor real usage with you and adjust in the first weeks.'],
    ],
    outputs: ['A working agent or automation in your channels', 'Written scope and refusal rules', 'Test set you can re-run after every change', 'Hand-over queue for your staff'],
    related: ['systems-integration', 'quality-engineering', 'digital-transformation'],
    product: true,
  },
  {
    slug: 'technology-consulting',
    name: 'Technology Consulting & Architecture',
    short: 'Independent advice on platforms, architecture and vendors from people who still write the code.',
    lede: 'When you are about to commit budget to a platform, a vendor or a rebuild, we give you a second opinion grounded in how the system will actually be built and run.',
    problem: 'Technology decisions are expensive to reverse. Vendors have a product to sell and internal teams have habits to protect. You need someone whose only interest is that the thing works.',
    what: [
      ['Architecture review', 'We read the design, the code and the infrastructure, then tell you where it will bend and where it will break.'],
      ['Solution design', 'Target architecture for a new system: components, data flows, hosting, security boundaries and a build sequence.'],
      ['Vendor and platform selection', 'Requirements, a shortlist, structured demos and a recommendation with the trade-offs spelled out.'],
      ['Technical due diligence', 'An independent read on a product or codebase before you buy, partner or inherit it.'],
      ['Fractional technical leadership', 'A senior technical voice in your planning and vendor meetings, for teams not ready to hire one full time.'],
    ],
    steps: [
      ['Frame the decision', 'What exactly is being decided, by when, and what would make it a mistake.'],
      ['Gather evidence', 'Documents, code, demos and conversations with the people who will live with the outcome.'],
      ['Recommend', 'A written recommendation with alternatives and the reasons we set them aside.'],
      ['Support', 'We stay available through procurement and the first build milestones.'],
    ],
    outputs: ['Written recommendation with trade-offs', 'Architecture diagrams and decision records', 'Risk register with mitigations', 'Build sequence and rough effort'],
    related: ['systems-integration', 'digital-transformation', 'web-digital-products'],
  },
  {
    slug: 'systems-integration',
    name: 'Systems Integration & APIs',
    short: 'Make the systems you already own talk to each other, so people stop retyping data.',
    lede: 'Most organisations do not need another system. They need the ones they have to share data reliably. We design and build the integrations, APIs and data flows that make that happen.',
    problem: 'The booking system does not know about the billing system. Staff copy records between screens, and every copy is a chance for an error that surfaces weeks later.',
    what: [
      ['Integration design', 'Which system owns which data, what moves where, how often, and what happens when one side is down.'],
      ['API development', 'Clean, documented APIs in front of existing systems so new channels and partners can connect safely.'],
      ['Messaging and channel integration', 'WhatsApp Business, telephony, social messaging, email and SMS connected to your back office.'],
      ['Data migration', 'Planned, rehearsed and reconciled moves from old systems to new ones.'],
      ['Monitoring and error handling', 'Retries, alerts and a clear place to look when a message does not arrive.'],
    ],
    steps: [
      ['Inventory', 'Systems, owners, data and the manual steps that currently bridge them.'],
      ['Design', 'Interface contracts and failure behaviour agreed before any code is written.'],
      ['Build', 'Integrations built and tested against real, messy data.'],
      ['Operate', 'Monitoring in place and a runbook your team can follow.'],
    ],
    outputs: ['Integration map and interface contracts', 'Working, tested integrations', 'API documentation', 'Monitoring and a support runbook'],
    related: ['technology-consulting', 'quality-engineering', 'ai-automation'],
  },
  {
    slug: 'quality-engineering',
    name: 'Quality Engineering & Testing',
    short: 'Find out whether the software works before your customers do, including the AI parts.',
    lede: 'We set up testing that catches real defects early: test strategy, automated suites, and evaluation for AI systems whose answers are never exactly the same twice.',
    problem: 'Releases slip because nobody is sure what still works. Manual checks take days, automated tests are flaky, and the new AI feature has no tests at all because nobody knows how to write them.',
    what: [
      ['Test strategy', 'What to test at which level, what to automate, and what is not worth the effort.'],
      ['Test automation', 'UI, API and integration suites that run on every change and that the team trusts.'],
      ['AI and agent evaluation', 'Scenario sets, refusal checks and regression runs for chat and voice agents and other model-driven features.'],
      ['Release readiness', 'An independent check before go-live: functional, performance, accessibility and basic security.'],
      ['QA process coaching', 'Working with your team on reviews, definitions of done and defect triage.'],
    ],
    steps: [
      ['Assess', 'Where defects come from today and where they are caught.'],
      ['Prioritise', 'The riskiest flows get coverage first.'],
      ['Automate', 'Suites built into your delivery pipeline.'],
      ['Hand over', 'Your team owns and extends the tests.'],
    ],
    outputs: ['Test strategy document', 'Automated suites in your pipeline', 'AI evaluation set with pass criteria', 'Release readiness report'],
    related: ['ai-automation', 'systems-integration', 'web-digital-products'],
  },
  {
    slug: 'business-analysis',
    name: 'Business Analysis & Process Design',
    short: 'Turn what the business needs into requirements a delivery team can build without guessing.',
    lede: 'We translate between the people who run the operation and the people who build the software, so the thing delivered is the thing that was needed.',
    problem: 'The project brief says "a portal". Three departments mean three different things by it. The gap is discovered at user acceptance, when it is most expensive to close.',
    what: [
      ['Requirements discovery', 'Workshops and interviews that surface what people actually need, including the needs they have stopped noticing.'],
      ['Process mapping and redesign', 'Current and future-state flows, with the handovers and exceptions that usually get left out.'],
      ['Functional specifications', 'User stories, acceptance criteria and data definitions written to be built and tested against.'],
      ['Backlog and scope management', 'A prioritised backlog and a clear line between this release and the next.'],
      ['Acceptance support', 'Test scenarios for the business, and help running user acceptance properly.'],
    ],
    steps: [
      ['Discover', 'Who is affected, what they do today, what they need.'],
      ['Model', 'Processes and data drawn out and validated with the people in them.'],
      ['Specify', 'Requirements with acceptance criteria and priorities.'],
      ['Validate', 'We stay through build and acceptance to keep intent and delivery aligned.'],
    ],
    outputs: ['Process maps, current and future state', 'Requirements with acceptance criteria', 'Prioritised backlog', 'User acceptance scenarios'],
    related: ['digital-transformation', 'quality-engineering', 'web-digital-products'],
  },
  {
    slug: 'web-digital-products',
    name: 'Web & Digital Products',
    short: 'Websites, portals and internal tools that load fast, read clearly and are easy to keep up to date.',
    lede: 'We design and build the customer-facing and internal software that your strategy calls for, from a clinic website to a custom operations dashboard.',
    problem: 'Your website was built years ago and nobody can update it. Your internal tool is a shared spreadsheet with a colour code only two people understand.',
    what: [
      ['Websites and landing pages', 'Fast, accessible, bilingual where needed, and written to be found and understood.'],
      ['Customer portals', 'Booking, requests and account self-service connected to your back office.'],
      ['Internal tools and dashboards', 'Purpose-built screens for the work your team does every day.'],
      ['Arabic and English by design', 'Right-to-left and left-to-right handled properly, not as an afterthought.'],
      ['Maintenance and improvement', 'Hosting, updates and steady improvement after launch.'],
    ],
    steps: [
      ['Brief', 'Audience, goals, content and what success looks like.'],
      ['Design', 'Structure and visual design reviewed on real devices.'],
      ['Build', 'Clean, tested code with content you can edit.'],
      ['Launch and care', 'Go-live, monitoring and a plan for what comes next.'],
    ],
    outputs: ['A live, tested product', 'Source code and documentation you own', 'Editing guide for your team', 'Support plan'],
    related: ['technology-consulting', 'quality-engineering', 'business-analysis'],
  },
];

const products = [
  { slug: 'layan-chat', name: 'Layan Chat', tag: 'Healthcare · WhatsApp', short: 'An AI receptionist that answers your clinic’s WhatsApp in Jordanian Arabic, day and night, and takes appointment requests.' },
  { slug: 'layan-voice', name: 'Layan Voice', tag: 'Healthcare · Phone', short: 'The same receptionist on your clinic’s phone line. Listen to a real, unedited booking call.' },
  { slug: 'omnichannel-bots', name: 'Omnichannel Chat & Voice Bots', tag: 'Any sector · 5 chat channels + phone', short: 'One assistant across WhatsApp, Instagram, Facebook Messenger, your website and your mobile app.' },
  { slug: 'custom-ai-agents', name: 'Custom AI Agents', tag: 'Built to order', short: 'Agents designed around one of your workflows, with written limits and a human hand-over.' },
];

const articles = [
  {
    slug: 'what-an-ai-receptionist-should-refuse',
    title: 'What an AI receptionist should refuse to do',
    date: '2026-11-10', read: '5 min read', topic: 'AI in healthcare',
    summary: 'The most important design work on a clinic assistant is the list of things it will not do. Here is ours, and why each line is there.',
    body: `
<p>When we started building Layan, our AI receptionist for clinics, the first document we wrote was not a prompt or a feature list. It was a list of refusals. Everything the assistant can do is easier to get right once you have decided, in writing, what it must never do.</p>
<p>A clinic is a poor place for experiments. The person messaging at midnight may be in pain, frightened, or asking on behalf of a child. An assistant that is merely helpful most of the time is not good enough. It has to be predictable.</p>
<h2>It does not diagnose or advise</h2>
<p>The most common request a clinic assistant receives, after prices and opening hours, is some version of "is this normal?" The honest answer is that a receptionist does not know, and neither does a language model. Layan says so, and offers to take a message for the doctor or an appointment request. It does not name medicines or painkillers, even common ones. That is the clinician's job.</p>
<h2>It does not confirm appointments</h2>
<p>Layan takes an appointment <em>request</em>: what the patient wants and when suits them. Confirmation stays with the human receptionist, who can see the real schedule. This sounds like a limitation. In practice it is the feature clinics trust most, because a double booking made by a machine at 2 a.m. is worse than no booking at all.</p>
<h2>It does not guess</h2>
<p>Prices, services and working hours come from information the clinic gives us. If a question falls outside that, the assistant says it does not have the answer and gives the reception number. A confident wrong price costs the clinic an argument at the front desk the next morning.</p>
<h2>It drops everything for an emergency</h2>
<p>If a message suggests a threat to life, the conversation stops being about appointments. The assistant directs the person to emergency services and the clinic's number immediately. There is no attempt to triage and no follow-up question first.</p>
<h2>It says what it is</h2>
<p>From the first message and the first second of a call, Layan introduces itself as an AI assistant. People adjust how they speak when they know, and they forgive limits they were told about in advance. Pretending to be human gains nothing and risks the clinic's reputation.</p>
<h2>Why write the refusals first</h2>
<p>Three reasons. First, refusals are testable: you can write a conversation that tempts the assistant to cross each line and check, after every change, that it still holds. Second, they are explainable. A clinic owner can read the list in two minutes and decide whether they are comfortable. Third, they keep scope honest. Every new capability has to be checked against the list before it ships.</p>
<p>If you are evaluating any AI assistant for a sensitive setting, ask the vendor for their refusal list. If they do not have one, you have learned what you needed to know.</p>`,
  },
  {
    slug: 'start-with-the-process-not-the-model',
    title: 'Start with the process, not the model',
    date: '2026-11-06', read: '4 min read', topic: 'Digital transformation',
    summary: 'A practical order of work for automation projects, and the questions to settle before anyone opens an AI tool.',
    body: `
<p>The usual way an automation project starts is with a tool. Someone sees a demo, the tool is impressive, and the question becomes "where can we use this?" It is the wrong question, and it produces pilots that impress in a meeting and are quietly switched off three months later.</p>
<p>The better order is the boring one. Start with the process.</p>
<h2>1. Find the work that is late or dropped</h2>
<p>Do not begin with the work your team does well. Begin with the work that is not getting done: the calls that ring out after closing, the enquiries answered two days late, the follow-ups nobody has time to send. Automating these adds capacity without threatening anyone's job, which matters more for adoption than any technical choice.</p>
<h2>2. Write down what "done" means</h2>
<p>For each candidate task, describe the finished result in one sentence a new employee would understand. "A request appears in the reception queue with the patient's name, number, what they want and when." If you cannot write that sentence, the task is not ready to automate. It needs analysis first.</p>
<h2>3. Decide where the person stays in the loop</h2>
<p>Almost no process should be automated end to end on day one. Decide which step keeps a human decision, and design the hand-over so that the person receives everything they need in one place. A good hand-over is the difference between an assistant staff rely on and one they work around.</p>
<h2>4. Only now, choose the technology</h2>
<p>With the task, the definition of done and the hand-over fixed, the technology choice is usually straightforward, and sometimes it is not AI at all. A form and a reminder rule solve more problems than people expect. When a language model is the right tool, you now know exactly what to ask of it and how to test whether it delivers.</p>
<h2>5. Measure the thing you set out to fix</h2>
<p>Pick one measure tied to the original problem, such as how many after-hours enquiries received a reply, and look at it weekly for the first two months. Resist dashboards with twenty charts. One number that the business owner cares about keeps the project honest.</p>
<h2>What this looks like in practice</h2>
<p>None of this is sophisticated. It is simply the order in which the questions have to be answered, and skipping ahead to step four does not make steps one to three go away. It only means you answer them later, under pressure, with a tool already purchased.</p>`,
  },
  {
    slug: 'testing-ai-agents',
    title: 'Testing AI agents: what changes when the software talks back',
    date: '2026-11-02', read: '5 min read', topic: 'Quality engineering',
    summary: 'Classic test automation assumes the same input gives the same output. Agents break that assumption. Here is how we test them anyway.',
    body: `
<p>A conventional test is a simple promise: given this input, the system produces that output. An AI agent breaks the promise on purpose. Ask it the same question twice and you will get two differently worded answers, both possibly correct. Teams used to exact-match assertions often conclude that agents cannot be tested. They can. The tests just check different things.</p>
<h2>Test behaviour, not wording</h2>
<p>Instead of asserting the exact reply, assert properties of it. Did the agent state the correct price? Did it avoid naming a medicine? Did it collect the phone number and read it back? Each property is a yes or no question that can be checked automatically, by rules where possible and by a second model acting as a grader where judgement is needed.</p>
<h2>Write scenarios, not single prompts</h2>
<p>Real conversations have turns. A caller changes their mind, answers a different question from the one asked, or switches language halfway through. A useful test set is made of short scripted scenarios with a goal and a persona, not isolated questions. We keep three kinds: ordinary requests, awkward but legitimate ones, and attempts to push the agent past its limits.</p>
<h2>Give refusals their own suite</h2>
<p>Every rule about what the agent must not do deserves at least a handful of tests that actively try to make it do that thing. These are the tests that matter most and the ones most likely to regress when someone "improves" a prompt. Run them on every change, without exception.</p>
<h2>Run each test more than once</h2>
<p>Because outputs vary, a single pass tells you little. Run each scenario several times and look at the pass rate. A behaviour that holds nine times out of ten is a defect in a safety rule and may be acceptable in a matter of tone. Decide the threshold per test, in advance.</p>
<h2>Test the hand-over, not just the conversation</h2>
<p>The agent's real output is rarely the chat itself. It is the record that lands in front of a member of staff: the request, the contact details, the summary. Check that the record is complete and correct, because that is where a polite conversation turns into a missed appointment.</p>
<h2>Keep reading real transcripts</h2>
<p>No test set anticipates everything. A regular review of real conversations, with permission and with personal details handled properly, is where new scenarios come from. Every surprising transcript becomes a test, and the suite grows in the direction reality pushes it.</p>
<p>None of this replaces ordinary testing. The integrations around the agent, the telephony, the queue, the notifications, still need conventional automated tests. The agent adds a layer on top, and that layer needs its own discipline.</p>`,
  },
];

module.exports = { WA, services, products, articles };
