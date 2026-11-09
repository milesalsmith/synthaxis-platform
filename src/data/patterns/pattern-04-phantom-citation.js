// src/data/patterns/pattern-04-phantom-citation.js
// Pattern 04: The Phantom Citation
//
// CASE STUDY: Vijay Ghanshyam Gadiya v. Union of India & Anr.
// (Supreme Court of India, 2 September 2026): a Rs 425.27 crore customs
// penalty set aside because the order relied on AI-hallucinated case law.
// Origin story: Mata v. Avianca, Inc. (S.D.N.Y., sanctions opinion June 22, 2023).
// TARGET: ~18 minutes total
//
// Authored in the block-based schema (see docs/pattern-authoring-guide.md).
// NOTE: every fabricated citation in this file (including the one in the SEE
// chat reconstruction) is constructed for teaching and is only ever presented
// as the "fake" answer. Real works used as "trust" answers are real,
// well-known works with accurate details.

// ============================================
// SEE (3 min): Story -> Trust check -> Impact reveal
// ============================================
const see = {
  title: 'The Cases That Never Happened',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'A Rs 425 crore penalty rested on cases that never existed.',
      body: `In October 2025, a customs officer in Surat, India, fined a diamond trader Rs 425.27 crore (over 4 billion rupees). Customs alleged that natural diamonds had been declared as lab-grown to get a lower tariff.

The penalty order backed itself up with judgments and legal articles. In January 2026 the Gujarat High Court upheld it. The trader, Vijay Ghanshyam Gadiya, then went to the Supreme Court and argued that several of those authorities had been generated with AI.

The court has not said which tool was used. Below is a reconstruction of the kind of exchange that produces citations like these. The case in it was invented for this lesson:`,
    },
    {
      type: 'chat',
      user: 'Find Supreme Court of India judgments holding that misdeclaring imported goods to get a lower duty justifies the maximum penalty.',
      ai: {
        text: `Here is relevant precedent:

**Kalindi Gems Pvt. Ltd. v. Commissioner of Customs, Mumbai**, Civil Appeal No. 4471 of 2017 (Supreme Court of India)

The Court held that deliberate misdeclaration to obtain a lower tariff is itself proof of intent, stating:

> "Where the importer knowingly describes goods so as to attract a lesser duty, the full penalty under Section 114 follows as a matter of course."

The judgment has been followed in later customs appeals involving gemstones and jewellery.`,
        note: 'Reconstruction, not the text from the real order. The case is invented. It has a court, an appeal number, a year, a direct quote, and a statute section, so it looks like real legal authority.',
      },
    },
    {
      type: 'choice',
      question: 'Would you have relied on this in an official decision?',
      subtext: "It has everything a citation needs. There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-cited', label: 'Yes, it has the court, case number, year, and quote', response: "That is the trap. A citation can have every detail in place and still point at nothing." },
        { id: 'maybe-asked', label: "I'd ask the AI to confirm it's real", response: 'This is the most tempting move, and it has failed in court before. We will come back to it.' },
        { id: 'no-search', label: "No, I'd look the case up first", response: "Correct instinct. That is exactly what the Supreme Court did. A citation is a claim about the world, and it can be checked." },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'The Supreme Court checked. Some of the cases did not exist.',
      explanation: `On 2 September 2026, in Vijay Ghanshyam Gadiya v. Union of India, Justices Dipankar Datta and Sheel Nagu said they had individually verified the judgments and articles cited in the customs order. Some of the cases did not exist or had fake citations. Others were real but did not say what the order claimed. The court said this appeared to be a "hallucination of AI".

It did not decide whether the trader had misdeclared anything. It held that relying on this material was fatal to the order and set aside both the penalty and the High Court ruling that had upheld it.`,
      list: {
        title: "Here's what actually happened:",
        items: [
          'An official penalty order cited authorities that could not be found, plus real cases that did not support it',
          'The Gujarat High Court had upheld the order, so its ruling fell too',
          'The Supreme Court sent the case back to be decided again by a different officer, and left it to the appointing authority to decide on action against the officer who wrote the order',
          'This is not new. In Mata v. Avianca (New York, June 2023), lawyers were fined $5,000 for citing six fake cases from ChatGPT, such as "Varghese v. China Southern Airlines"',
          'It is still happening. Bar and Bench reported in November 2026 that the Bombay High Court had quashed another customs order, by consent, after it was shown to cite two Supreme Court judgments that did not exist in any database',
        ],
      },
    },
    {
      type: 'stats',
      title: 'The Impact',
      items: [
        { value: 'Rs 425.27 crore', label: 'Customs penalty set aside', detail: 'Supreme Court of India, 2 September 2026' },
        { value: '2', label: 'Rulings overturned', detail: 'the penalty order and the High Court judgment that upheld it' },
        { value: '2,286', label: 'Court decisions involving AI-hallucinated material', detail: 'tracked worldwide as of 9 November 2026' },
      ],
      source: 'Mint (5 September 2026); AI Hallucination Cases Database, Damien Charlotin (updated 9 November 2026)',
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Embarrassing but contained:', body: 'A sloppy citation gets flagged in review, and you fix it', tone: 'neutral' },
        { label: 'Actually dangerous:', body: 'A fake source ends up in a court filing, an official penalty, a medical summary, or a published article, and other people make decisions on top of it.', tone: 'danger' },
      ],
      conclusion: 'AI models generate text that looks like a citation. They are not looking anything up. A well-formatted reference is not evidence that the source exists.',
      transition: "So how do you spot a phantom? First, let's test your instincts.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI citations — Use it or Check first?
// ============================================
const test = {
  title: 'Use It or Check First?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 sources that an AI assistant gave in response to research questions.',
        instruction: 'For each one, decide: would you cite it as-is, or check that it exists first?',
        note: "Don't search anything yet. Go with your gut.",
        legend: {
          trust: { label: 'USE IT', detail: 'Cite as-is', button: 'Use it' },
          verify: { label: 'CHECK FIRST', detail: 'Confirm it exists', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: 'Chen, L. & Okafor, T. (2019). Why Humans Overtrust AI:\nA Meta-Analysis of 214 Studies. Journal of\nApplied Cognitive Computation, 41(3), 112-139.\ndoi:10.1234/jacc.2019.0412',
          code: true,
          context: "You asked: 'Is there research showing people overtrust AI recommendations?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: 'FABRICATED. The title answers your question almost word for word, and nothing about it has been verified. This reference was constructed for the lesson; the journal, authors, and DOI do not point to a real paper.',
          redFlag: 'The title is a perfect fit for your question',
        },
        {
          id: 'item-2',
          prompt: 'Kahneman, D. & Tversky, A. (1979). Prospect Theory:\nAn Analysis of Decision under Risk.\nEconometrica, 47(2), 263-291.',
          code: true,
          context: "You asked: 'What is the original paper on prospect theory?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. This is one of the most-cited papers in economics and psychology, and the details are accurate.',
          meta: 'Econometrica 47(2), 263-291, DOI 10.2307/1914185',
        },
        {
          id: 'item-3',
          prompt: 'Henderson v. Delta Skyways, Inc.,\n782 F.3d 1291 (11th Cir. 2015)\n"An airline owes passengers a duty of care that\nbegins at the jet bridge, not the cabin door."',
          code: true,
          context: "You asked: 'Find precedent on when an airline's duty of care begins.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: 'FABRICATED. This case was constructed for the lesson. The quote is tidy and fits your argument perfectly, but a real opinion would turn up in a legal database when you look up the name or the reporter citation.',
          redFlag: 'A perfect quote, with no way to find it',
        },
        {
          id: 'item-4',
          prompt: 'Brown v. Board of Education of Topeka,\n347 U.S. 483 (1954)',
          code: true,
          context: "You asked: 'Which Supreme Court case ended legal school segregation in the US?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. This is one of the most famous Supreme Court decisions, decided May 17, 1954, and the citation is correct.',
          meta: '347 U.S. 483 (1954)',
        },
        {
          id: 'item-5',
          prompt: "You ask: 'Are you sure that paper exists?'\nAI: 'Yes. I'm confident that study is real and\nwidely cited. You can find it in major\nacademic databases.'",
          code: true,
          context: 'You are checking the Chen & Okafor reference from earlier.',
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Not verification',
          explanation: 'CHECK FIRST. The AI is not looking the paper up. It is generating another confident-sounding sentence. In Mata v. Avianca, the lawyer received this same kind of reassurance, and it was wrong.',
          redFlag: 'The AI vouching for itself',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You correctly identified all 5. You have strong instincts. Let's sharpen them further." },
          { min: 4, message: "4 out of 5! Solid instincts. The red flags ahead will help you catch the last one." },
          { min: 3, message: "3 out of 5. Not bad! Fake citations are built to look right, which is why this training exists." },
          { min: 0, message: "This is tricky, and that's the point. Phantom citations are formatted exactly like real ones. Let's learn what gives them away." },
        ],
      },
      summary: {
        insight: 'In this batch, 3 out of 5 items could not be trusted. The two real works were famous and well documented. The rest looked equally professional, and the only difference was that one set exists.',
      },
    },
  ],
};

// ============================================
// OBSERVE (5 min): 4 red flags + matching + method
// ============================================
const observe = {
  title: 'The Red Flags',
  estimatedTime: 5,
  steps: [
    {
      type: 'cardGrid',
      heading: 'Phantom citations follow predictable patterns.',
      subtext: 'They are built to look like real references, but they tend to share four giveaways.',
      cards: [
        { emoji: '🎯', label: 'The Perfect Fit Title' },
        { emoji: '📚', label: 'Real Journal, Fake Article' },
        { emoji: '🔎', label: 'Unverifiable Details' },
        { emoji: '🗣️', label: 'The AI Vouches for Itself' },
      ],
    },
    {
      type: 'concept',
      emoji: '🎯',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Perfect Fit Title',
      description: 'The source conveniently supports your exact claim, in nearly your exact words.',
      rows: [
        { label: 'Your question:', variant: 'quote', tone: 'neutral', value: 'Is there evidence that remote work improves productivity in small firms?' },
        { label: 'AI cites:', variant: 'code', tone: 'danger', value: 'Remote Work Improves Productivity in Small Firms: Evidence from 40 Companies' },
      ],
      note: 'Real research is rarely a perfect mirror of your question.',
      why: 'The AI generates the most plausible-looking reference for what you asked. A title that echoes your prompt is exactly what it is optimizing for.',
      spot: 'If the title reads like your own sentence, treat it as unconfirmed until you find the paper.',
    },
    {
      type: 'concept',
      emoji: '📚',
      eyebrow: 'Red Flag 2 of 4',
      name: 'Real Journal, Fake Article',
      description: 'The journal, the author, or the court is real. The specific paper or case is not, or does not say what the AI claims.',
      compare: {
        left: {
          label: '❌ What the AI gets wrong:',
          tone: 'danger',
          items: [
            'A real journal with an article that was never published',
            'A real author credited with a paper they did not write',
            'A real case name with the wrong court, year, or holding',
            'A real paper cited with the wrong volume or pages',
          ],
        },
        right: {
          label: '✓ What a real source does:',
          tone: 'good',
          items: [
            'Appears in the journal\'s own archive',
            'Appears on the author\'s publication list',
            'Appears in a case-law database with matching details',
            'Is the same paper wherever you look it up',
          ],
        },
      },
      why: 'The AI has seen plenty of real journal names and famous authors, so using them makes a fake feel anchored in reality.',
      spot: 'A real name on the reference does not make the reference real. The customs order in the Gadiya case mixed cases that did not exist with real cases that did not say what it claimed. Look up the specific article or case, not just the venue.',
    },
    {
      type: 'concept',
      emoji: '🔎',
      eyebrow: 'Red Flag 3 of 4',
      name: 'Unverifiable Details',
      description: "The citation's specifics fall apart when you try to follow them.",
      compare: {
        left: {
          label: '❌ Phantom citation:',
          tone: 'danger',
          items: [
            'The DOI returns "DOI Not Found"',
            'The exact title has no hits in Google Scholar',
            'The volume, issue, and page range do not line up',
            'The reporter cite opens a different case',
          ],
        },
        right: {
          label: '✓ Real citation:',
          tone: 'good',
          items: [
            'The DOI resolves to the paper',
            'The exact title appears in Scholar or a library catalog',
            'Volume, issue, and pages match',
            'The cite opens the same case',
          ],
        },
      },
      why: 'The AI predicts what a citation looks like. It does not check that the DOI, page numbers, and volume belong together.',
      spot: 'Follow at least one concrete detail: click the DOI, or search for the exact title in quotation marks.',
    },
    {
      type: 'concept',
      emoji: '🗣️',
      eyebrow: 'Red Flag 4 of 4',
      name: 'The AI Vouches for Itself',
      description: "Asking the AI 'is this real?' is not verification.",
      rows: [
        { label: 'You ask:', variant: 'quote', tone: 'neutral', value: 'Is that case a real one?' },
        { label: 'AI replies:', variant: 'quote', tone: 'danger', value: 'Yes, it is a real case, and you can find it in legal research databases.' },
      ],
      note: 'This paraphrases the kind of reassurance the lawyer in Mata v. Avianca described getting. It did not make the cases exist.',
      why: 'The AI is not checking any database when you ask. It continues the conversation with whatever sounds most consistent, and a confident yes is consistent.',
      spot: 'Only an independent source counts as confirmation: a database, a publisher site, or the document itself.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each situation, identify which red flag it shows:',
      options: [
        { id: 'flag-1', emoji: '🎯', label: 'The Perfect Fit Title' },
        { id: 'flag-2', emoji: '📚', label: 'Real Journal, Fake Article' },
        { id: 'flag-3', emoji: '🔎', label: 'Unverifiable Details' },
        { id: 'flag-4', emoji: '🗣️', label: 'The AI Vouches for Itself' },
      ],
      items: [
        { prompt: "A paper's title repeats your research question almost word for word", correct: 'flag-1', explanation: 'The title mirrors your prompt, which is what a generated reference does.' },
        { prompt: 'A well-known economics journal is named, but the issue contains no such article', correct: 'flag-2', explanation: 'The venue is real, but the specific article is not.' },
        { prompt: 'The DOI you click on shows "DOI Not Found"', correct: 'flag-3', explanation: 'A concrete detail failed when you followed it.' },
        { prompt: "'Yes, I'm certain that case is real,' says the AI after you ask", correct: 'flag-4', explanation: 'The AI cannot confirm itself. You need a database.' },
        {
          prompt: 'Kahneman & Tversky (1979), Prospect Theory, Econometrica 47(2), 263-291',
          correct: 'trick-question',
          explanation: "Trick question! This one is real. It is a landmark paper, and the details are accurate.",
          extra: { id: 'trick-question', label: "✓ It's actually real" },
        },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'The Source Trace',
      tagline: 'Follow every citation to the real thing before you rely on it.',
      steps: [
        { number: 1, action: 'Copy the exact title', detail: 'The full title or case name, exactly as the AI wrote it. Keep authors, year, and any DOI or reporter cite.', time: '5 seconds' },
        { number: 2, action: 'Search a trustworthy index', detail: "Google Scholar or a library catalog for papers (quote the title). CourtListener, Google Scholar case law, Westlaw, or Lexis for cases. PubMed for medicine.", time: '20 seconds' },
        { number: 3, action: 'Resolve the DOI or cite', detail: 'Open doi.org/<doi> or look up the reporter citation. Does it land on the same title, authors, and year?', time: '15 seconds' },
        { number: 4, action: 'Open the source and find the claim', detail: 'Read the abstract or the opinion. Find the quote or finding the AI described. Real source, wrong claim still counts as a failure.', time: '2 minutes' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'The exact title appears in an independent index',
            'The DOI or reporter cite resolves to the same work',
            'Authors, year, and venue match across sources',
            'You can read the passage the AI described',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            'No results for the exact title or case name',
            'DOI missing, broken, or pointing at something else',
            'Details differ between the AI and the real record',
            'The only "proof" is the AI itself',
          ],
        },
      },
      footer: 'A few minutes of tracing is cheap. A sanction, a retraction, or a decision thrown out by a higher court is not.',
    },
  ],
};

// ============================================
// PRACTICE (6 min): Drill -> Toolkit -> Completion
// ============================================
const practice = {
  title: 'Your Turn',
  estimatedTime: 6,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Practice Drill: Citation Check',
        instruction: 'Five more sources, and these are subtler. Decide whether you would cite each one or check it first.',
        note: 'Use the four red flags and The Source Trace.',
        legend: {
          trust: { label: 'USE IT', detail: 'Cite as-is', button: 'Use it' },
          verify: { label: 'CHECK FIRST', detail: 'Confirm it exists', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          prompt: 'Okonkwo, R. & Brandt, S. (2020). Hallucination Rates\nin Clinical Decision Support Chatbots.\nThe Lancet Digital Health, 2(8), e412-e421.',
          code: true,
          context: "You asked: 'What does research say about AI errors in healthcare?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: 'FABRICATED. The authors and article were constructed for this lesson. The journal is real, but the article is not, and the title is a neat fit for your question. Real journal does not equal real article.',
          redFlag: 'Real journal, made-up article',
        },
        {
          id: 'drill-2',
          prompt: 'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J.,\nJones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I.\n(2017). Attention Is All You Need. Advances in Neural\nInformation Processing Systems 30 (NeurIPS 2017).',
          code: true,
          context: "You asked: 'Which paper introduced the Transformer architecture?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. This is the paper that introduced the Transformer. It also has an arXiv entry, so you can read it yourself.',
          meta: 'NeurIPS 2017, arXiv:1706.03762',
        },
        {
          id: 'drill-3',
          prompt: "Miranda v. Arizona, 384 U.S. 436 (1966), held that\npolice must obtain a warrant before making\nany arrest.",
          code: true,
          context: "You asked: 'What did Miranda v. Arizona decide?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Real case, wrong claim',
          explanation: 'CHECK FIRST. The case and citation are real, but the holding is wrong. Miranda concerned warnings given before custodial interrogation, not arrest warrants. A real citation can still carry a false claim, so open the source and read it.',
          redFlag: 'Real source, but it does not say that',
        },
        {
          id: 'drill-4',
          prompt: 'Watson, J. D. & Crick, F. H. C. (1953). Molecular Structure\nof Nucleic Acids: A Structure for Deoxyribose Nucleic Acid.\nNature, 171, 737-738. doi:10.1038/171737a0',
          code: true,
          context: "You asked: 'Where was the DNA double helix first described?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: "REAL. This is the 1953 Nature paper describing the double-helix structure of DNA. Notice that it's very short, which is also accurate: two pages.",
          meta: 'Nature 171, 737-738 (1953)',
        },
        {
          id: 'drill-5',
          prompt: 'As Eleanor Whitcombe argues in The Trust Machine:\nHow Algorithms Earned Our Faith (Oxford University\nPress, 2018, p. 143), "people defer to a confident\nvoice long after it has stopped being right."',
          code: true,
          context: "You asked: 'Is there a book that discusses why we trust algorithms?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: "FABRICATED. The book, author, and quote were constructed for this lesson. A real book can be found in a library catalog like WorldCat or on the publisher's site, and a page-specific quote is something you can check once you have the book.",
          redFlag: 'A specific page and quote, but no way to find the book',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: 'Flawless. You can tell phantoms from the real thing, including the cases where the source is real but the claim is not.' },
          { min: 4, message: '4 out of 5. You are well calibrated. Re-read the item you missed and trace which red flag you skipped.' },
          { min: 3, message: '3 out of 5. These were harder on purpose. Run The Source Trace on the ones you missed.' },
          { min: 0, message: 'These were designed to be subtle. The habit of tracing every source matters more than gut feeling.' },
        ],
      },
      summary: {
        insight: 'Phantom citations come in several forms: an invented paper in a real journal, a real case with a false holding, or a book that was never printed. The Source Trace catches all of them, because it asks the same question each time: does the source exist, and does it say that?',
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick techniques to check a citation before you rely on it.',
      commands: [
        {
          title: 'Resolve a DOI',
          ecosystem: 'web',
          command: 'https://doi.org/10.1038/171737a0',
          output: `-> Redirects to the publisher page:
Molecular Structure of Nucleic Acids: A Structure for
Deoxyribose Nucleic Acid
Nature 171, 737-738 (1953)

(A fake DOI shows: "DOI Not Found")`,
          whatToLookFor: 'The page should show the same title, authors, journal, and year as the citation. "DOI Not Found" means the identifier was invented or mistyped.',
        },
        {
          title: 'Query the Crossref API',
          ecosystem: 'cli',
          command: 'curl -s https://api.crossref.org/works/10.1038/171737a0',
          output: `{"status":"ok","message-type":"work","message":{
  "title":["Molecular Structure of Nucleic Acids: ..."],
  "container-title":["Nature"],
  "volume":"171", "page":"737-738", ...}}

# For a DOI that does not exist:
Resource not found.`,
          whatToLookFor: 'Compare title, journal, volume, and pages with the AI citation. "Resource not found" means the DOI is not registered in Crossref. Note that some real works use other DOI registrars, so search by title next.',
        },
        {
          title: 'Search the exact title in Google Scholar',
          ecosystem: 'web',
          command: 'scholar.google.com  ->  "Prospect Theory: An Analysis of Decision under Risk"',
          output: `Prospect theory: An analysis of decision under risk
D Kahneman, A Tversky - Econometrica, 1979
... Cited by (many)

(A fake title shows: "Your search did not match any articles")`,
          whatToLookFor: 'Put the title in quotation marks. A real paper shows the same authors, year, and venue. No match means you need a second source, not that you should trust the AI.',
        },
        {
          title: 'Look up a case citation',
          ecosystem: 'web',
          command: 'courtlistener.com  ->  search: "Henderson v. Delta Skyways"',
          output: `No results found.

(A real case, e.g. a lookup of 347 U.S. 483, lists:
Brown v. Board of Education of Topeka, 347 U.S. 483 (1954))`,
          whatToLookFor: 'Search by case name and by reporter cite. The court, year, and parties should match. Then open the opinion and read the passage. A free database is a good first check; for high stakes work use an official database.',
        },
      ],
      quickReference: {
        title: 'The Source Trace',
        steps: [
          'Copy the exact title or case name from the AI output',
          'Search it in quotes in Scholar, PubMed, a library catalog, or a case-law database',
          'Resolve the DOI at doi.org or the reporter cite',
          'Open the source and find the passage the AI described',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Phantom Citation',
      summary: "You can now spot sources that look scholarly but don't exist. You know the four red flags, you've seen why asking the AI to confirm itself fails, and you have a repeatable trace for checking any citation.",
      // NOTE: no `checklist` here on purpose; the phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'Up Next', body: 'Pattern 5 covers numbers with nothing behind them: made-up statistics stated with total confidence.' },
    },
  ],

  keyTakeaways: [
    'AI can generate citations that look right but refer to papers, cases, or books that do not exist',
    'Red flags: perfect-fit titles, real journals with fake articles, details that do not resolve, and the AI vouching for itself',
    "Asking the AI 'is this real?' is not verification. Use an independent database or the document itself",
    'A real source can still be misquoted, so open it and find the claim',
    'The Source Trace takes minutes and protects you from sanctions, retractions, and corrections',
  ],
  checklist: {
    title: 'Your Citation Checklist',
    items: [
      'Does the title suspiciously match my exact question?',
      'Have I searched the exact title or case name in an independent index?',
      'Does the DOI or reporter cite resolve to the same work?',
      'Do the authors, year, volume, and pages agree across sources?',
      'Have I opened the source and found the quote or finding myself?',
      'Am I relying on the AI itself to confirm the source is real?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-04',
  patternNumber: 4,
  title: 'Phantom Citation',
  subtitle: "Sources and cases that don't exist",
  description: 'Learn to spot when AI cites papers, cases, and books that look real but were never published.',
  estimatedTime: 15,

  skillLearned: 'Verifying AI-provided citations and sources',
  verificationMethod: 'The Source Trace',

  caseStudy: {
    name: 'Vijay Ghanshyam Gadiya v. Union of India & Anr. (Supreme Court of India)',
    date: '2 September 2026',
    researcher: 'Reported by Mint (Justices Dipankar Datta and Sheel Nagu, Supreme Court of India)',
    source: 'https://www.livemint.com/money/personal-finance/supreme-court-sets-aside-425-crore-penalty-over-fake-legal-citations-says-material-appears-to-be-hallucination-of-ai-11788579780578.html',
  },

  nextLesson: {
    id: 'pattern-05',
    title: 'Statistics Invention',
    teaser: 'Numbers with nothing behind them.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
