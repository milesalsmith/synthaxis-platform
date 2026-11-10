// src/data/patterns/pattern-04-phantom-citation.js
// Pattern 04: Phantom Citation
//
// CASE STUDY: Vijay Ghanshyam Gadiya v. Union of India & Anr.
// (Supreme Court of India, 2 September 2026): a Rs 425.27 crore customs
// penalty set aside because the order relied on AI-hallucinated case law.
// Origin story: Mata v. Avianca, Inc. (S.D.N.Y., sanctions opinion June 22, 2023).
// TARGET: about 10 minutes total
//
// Authored in the block-based schema (see docs/pattern-authoring-guide.md).
// NOTE: every fabricated citation in this file (including the one in the SEE
// chat reconstruction) is constructed for teaching and is only ever presented
// as the "fake" answer. Real works used as "trust" answers are real,
// well-known works with accurate details.

// ============================================
// SEE: Story -> Trust check -> Impact reveal
// ============================================
const see = {
  title: 'Cases That Never Happened',
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
      subtext: "It has everything a citation needs. There's no wrong answer here. Go with your first reaction.",
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
      title: 'Impact',
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
      transition: 'So how would you have caught Kalindi Gems before it went into an order? Next, you test it the way the Supreme Court did.',
    },
  ],
};

// ============================================
// TEST: Spot what to test in the AI citation -> run the tests
// ============================================
const test = {
  title: 'Testing the Citation',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before this goes into an order, look at what it actually claims.',
      instruction: 'Tap the parts of this answer you would want to test. Some parts are fine. Some are exactly where a phantom hides.',
      source: 'From the AI answer (reconstruction)',
      segments: [
        { text: 'Here is relevant precedent:', note: 'Just framing. The AI says "precedent", but saying so does not make it precedent.' },
        { text: ' ' },
        { text: 'Kalindi Gems Pvt. Ltd. v. Commissioner of Customs, Mumbai', flag: { label: 'Case name', explanation: 'This is the claim everything rests on: that a judgment with these parties exists. The names are plausible, which is exactly what a model is good at. Plausible is not the same as findable.' } },
        { text: ', Civil Appeal No. 4471 of 2017', flag: { label: 'Appeal number and year', explanation: 'A precise number and year feel like proof. They are only proof if they belong to this case. Models often attach real-looking numbers to invented names, or real numbers to the wrong case.' } },
        { text: ' (Supreme Court of India)', note: 'The court is real. Naming a real court is a surface signal: it tells you where to look, not that the case is there.' },
        { text: ' ' },
        { text: 'The Court held that deliberate misdeclaration to obtain a lower tariff is itself proof of intent, stating:', note: 'A paraphrase of the holding. It stands or falls with the quote below, so test the quote.' },
        { text: ' ' },
        { text: '"Where the importer knowingly describes goods so as to attract a lesser duty, the full penalty under Section 114 follows as a matter of course."', flag: { label: 'Direct quote', explanation: 'A quote that fits the argument perfectly is the part most worth checking. Even when a case is real, the Gadiya court found the order cited real judgments for things they did not say.' } },
        { text: ' ' },
        { text: 'The judgment has been followed in later customs appeals involving gemstones and jewellery.', note: 'No later case is named, so there is nothing here to look up. It adds weight without adding evidence.' },
      ],
      summary: 'Three things to test: does the case exist, do the number and year belong to it, and does the judgment really say that? Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You are the officer about to sign the order, or the judge reviewing it. You have a browser and a few minutes. Which tests actually tell you whether this authority is real?',
      claim: {
        label: 'Citation',
        text: 'Kalindi Gems Pvt. Ltd. v. Commissioner of Customs, Mumbai, Civil Appeal No. 4471 of 2017 (Supreme Court of India): "Where the importer knowingly describes goods so as to attract a lesser duty, the full penalty under Section 114 follows as a matter of course."',
      },
      rounds: [
        {
          title: 'Test 1: Does the case exist?',
          question: 'What do you check first?',
          options: [
            {
              id: 'ask-ai',
              label: 'Ask the AI: "Is Kalindi Gems a real judgment?"',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Yes, Kalindi Gems Pvt. Ltd. v. Commissioner of Customs is a Supreme Court judgment on customs penalties. You can find it in standard legal databases.',
              feedback: 'The model is not looking anything up. In Mata v. Avianca, ChatGPT assured the lawyer that the cases "indeed exist" and "can be found in reputable legal databases such as LexisNexis and Westlaw." They did not exist.',
            },
            {
              id: 'search-db',
              label: 'Search the exact case name in a judgments database (Indian Kanoon, the Supreme Court of India judgment search, SCC Online)',
              useful: true,
              resultLabel: 'Illustrative (the case was invented for this lesson)',
              result: 'Search: "Kalindi Gems"\nNo matching judgments.',
              feedback: 'A Supreme Court judgment that later appeals supposedly followed would be indexed, and would turn up in later judgments too. No hit for the exact name is a strong warning. Try the party names separately and common spelling variants before you conclude.',
              kit: 'Search the exact case name in a judgments database (Indian Kanoon, SCI judgments, SCC Online; CourtListener for US cases)',
            },
            {
              id: 'format',
              label: 'Check the citation format: parties, appeal number, court, all in order',
              useful: false,
              feedback: 'Format is the easiest part to generate. The fake cases in Mata v. Avianca were formatted like real citations, and so were the authorities in the Gadiya order.',
            },
          ],
        },
        {
          title: 'Test 2: Do the details belong together?',
          question: 'Say a search turns up a case with a similar name, or an appeal numbered 4471 of 2017. How do you know it is the same case?',
          options: [
            {
              id: 'match-details',
              label: 'Look up the appeal number and year, and compare parties, court and date with the citation',
              useful: true,
              resultLabel: 'Illustrative',
              result: 'Civil Appeal No. 4471 of 2017\nParties: do not match Kalindi Gems\nSubject: not a customs penalty',
              feedback: 'Every detail has to point at the same judgment: name, number, year and court. For US cases the same goes for volume, reporter and page. A real number attached to a different case is still a phantom.',
              kit: 'Check that the number, year and court belong to that same case (volume, reporter and page for US cites)',
            },
            {
              id: 'signed',
              label: 'An official signed an order relying on it, and the High Court upheld it',
              useful: false,
              feedback: 'That is exactly what happened in the Gadiya case. A signed penalty order and a High Court ruling did not make the authorities real. The Supreme Court judges checked the citations themselves.',
            },
            {
              id: 'close-enough',
              label: 'Accept the case with the similar name as close enough',
              useful: false,
              feedback: 'A near match is a different case. The Gadiya court found both kinds of problem: cases that did not exist, and real cases that did not say what the order claimed.',
            },
          ],
        },
        {
          title: 'Test 3: Does the judgment say that?',
          question: 'Last check before anything goes into an order or a filing. What settles whether the quoted rule is real law?',
          options: [
            {
              id: 'open-judgment',
              label: 'Open the full judgment and find the quoted sentence',
              useful: true,
              resultLabel: 'What this shows',
              result: 'For Kalindi Gems: there is no judgment to open.\nFor a real case: you can read whether the passage is there and what the court actually held.',
              feedback: 'This is the only test that catches the second kind of phantom: a real case cited for something it does not say. Read the passage in context, not just the sentence.',
              kit: 'Open the judgment itself and find the quoted passage',
            },
            {
              id: 'search-quote',
              label: 'Search a distinctive phrase from the quote, in quotation marks',
              useful: true,
              resultLabel: 'Illustrative',
              result: 'Search: "follows as a matter of course" "lesser duty"\nNo matching judgments.',
              feedback: 'A real quotation appears in its judgment, and often in later judgments that cite it. A phrase with no source anywhere was probably generated.',
              kit: 'Search a distinctive phrase from the quote in quotation marks',
            },
            {
              id: 'summary',
              label: "Rely on the AI's summary of the holding, or a blog post that summarises it",
              useful: false,
              feedback: 'Summaries are where holdings get bent. Only the judgment itself tells you what the court decided.',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what is Kalindi Gems Pvt. Ltd. v. Commissioner of Customs?',
        options: [
          { id: 'unreported', label: 'A real judgment the databases happen to miss', correct: false, feedback: 'Supreme Court judgments are published and indexed, and a judgment that later appeals followed would leave a trail. If you truly cannot find it, ask whoever cited it for a copy. That is what the court in Mata v. Avianca did.' },
          { id: 'phantom', label: 'A phantom citation: an invented case with a real-looking number and a made-up quote', correct: true, feedback: 'Right. It was invented for this lesson, and it is the same kind of material the Supreme Court found in the Gadiya order. The name, the number and the quote all failed when followed.' },
          { id: 'typo', label: 'A real case with a typo in the citation', correct: false, feedback: 'A typo explains one wrong detail. Here the name, the number and the quote all failed to turn up anything.' },
        ],
      },
      kit: {
        title: 'Your Phantom Citation Test Kit',
        footer: 'A few minutes in a judgments database. The Supreme Court did exactly this, and it undid a Rs 425.27 crore penalty.',
      },
    },
  ],
};

// ============================================
// OBSERVE: 4 red flags + matching + method
// ============================================
const observe = {
  title: 'Red Flags',
  steps: [
    {
      type: 'cardGrid',
      heading: 'Phantom citations follow predictable patterns.',
      subtext: 'They are built to look like real references, but they tend to share four giveaways.',
      cards: [
        { emoji: '🎯', label: 'Perfect Fit Title' },
        { emoji: '📚', label: 'Real Journal, Fake Article' },
        { emoji: '🔎', label: 'Unverifiable Details' },
        { emoji: '🗣️', label: 'AI Vouches for Itself' },
      ],
    },
    {
      type: 'concept',
      emoji: '🎯',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Perfect Fit Title',
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
      name: 'AI Vouches for Itself',
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
        { id: 'flag-1', emoji: '🎯', label: 'Perfect Fit Title' },
        { id: 'flag-2', emoji: '📚', label: 'Real Journal, Fake Article' },
        { id: 'flag-3', emoji: '🔎', label: 'Unverifiable Details' },
        { id: 'flag-4', emoji: '🗣️', label: 'AI Vouches for Itself' },
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
      name: 'Source Trace',
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Real works checked on Crossref, OpenAlex, arXiv and Wikipedia in November
// 2026. Made-up works (Okonkwo & Brandt 2020; Halvorsen & Adeyemi 2021;
// The Trust Machine by Tessa Varnham) returned no match on Crossref or
// Open Library at the time of writing.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Trace the Source',
        instruction: 'Six short exercises. Spot the invented part, diagnose a wrong claim, read a real lookup result, pick the checks, and fix a citation.',
        note: 'Some sources here are completely real. Checking a citation is not the same as distrusting it.',
      },
      items: [
        {
          id: 'p4-spot-fake',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'What does research say about AI errors in healthcare?'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: 'A good starting point is ' },
            { text: 'Okonkwo, R. & Brandt, S. (2020)', flag: true },
            { text: ', ' },
            { text: '"Hallucination Rates in Clinical Decision Support Chatbots"', flag: true },
            { text: ', ' },
            { text: 'The Lancet Digital Health, 2(8), e412-e421.' },
            { text: ' ' },
            { text: 'The authors found that chatbots gave unsupported advice in about one in five answers.', flag: true },
            { text: ' ' },
            { text: 'It is worth reading in full.' },
          ],
          explanation: "The journal is real. The article is not: we made up the authors, title and finding for this lesson, and a Crossref search for them finds nothing. The title also mirrors your question almost word for word. Look up the article in the journal's own archive, not just the journal name.",
          takeaway: 'Real journal, made-up article',
        },
        {
          id: 'p4-diagnose-miranda',
          kind: 'choose',
          label: 'Diagnose',
          context: "You asked: 'What did Miranda v. Arizona decide?'",
          prompt: 'What is wrong with this answer?',
          artifact: { label: 'AI answer (illustrative)', text: 'Miranda v. Arizona, 384 U.S. 436 (1966), held that police must obtain a warrant before making any arrest.' },
          options: [
            { id: 'fake', label: 'The case does not exist', feedback: 'It does. Miranda v. Arizona is a landmark 1966 US Supreme Court decision.' },
            { id: 'cite', label: 'The citation number is wrong', feedback: '384 U.S. 436 (1966) is the correct citation. Every detail you could look up checks out, which is what makes this one tricky.' },
            { id: 'holding', label: 'The case is real, but it did not decide that', correct: true, feedback: 'Right. Miranda is about warnings before police question someone in custody: the right to stay silent and to have a lawyer. It is not about arrest warrants.' },
            { id: 'nothing', label: 'Nothing. The case, number and year are all correct', feedback: 'They are, and the claim is still false. A correct citation does not make the summary correct.' },
          ],
          explanation: 'A quick existence check would pass here. Only reading the opinion, or a reliable summary of it, shows the holding is wrong. This is the second kind of phantom the Gadiya court found: real cases cited for things they did not say.',
          takeaway: 'Real case, wrong claim. Open the source and read what it held',
        },
        {
          id: 'p4-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Which paper introduced the Transformer architecture?'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer' },
          segments: [
            { text: 'The Transformer was introduced in ' },
            { text: 'Vaswani et al. (2017)' },
            { text: ', ' },
            { text: '"Attention Is All You Need"' },
            { text: ', ' },
            { text: 'Advances in Neural Information Processing Systems 30 (NeurIPS 2017).' },
            { text: ' ' },
            { text: 'A preprint is on arXiv as ' },
            { text: '1706.03762' },
            { text: '.' },
          ],
          explanation: 'Nothing is invented. This is the paper that introduced the Transformer. arXiv lists it as 1706.03762, submitted in June 2017 by Ashish Vaswani, Noam Shazeer, Niki Parmar and colleagues. A real source takes seconds to confirm, and confirming it is the habit, not suspicion.',
          takeaway: 'A quick trace confirms real sources too',
        },
        {
          id: 'p4-evidence-doi',
          kind: 'choose',
          label: 'Read the evidence',
          context: 'The AI cited (illustrative): Halvorsen, K. & Adeyemi, T. (2021). Why Language Models Invent Sources. Nature, 597, 211-215. doi:10.1038/171737a0\n\nYou looked up the DOI in Crossref. These are the key fields of the real record.',
          prompt: 'What does this tell you?',
          artifact: {
            label: 'Crossref record for 10.1038/171737a0',
            code: true,
            text: '$ curl -s https://api.crossref.org/works/10.1038/171737a0\n\ntitle:   Molecular Structure of Nucleic Acids:\n         A Structure for Deoxyribose Nucleic Acid\nauthors: Watson, Crick\njournal: Nature, volume 171, pages 737-738\nissued:  1953-04-25',
          },
          options: [
            { id: 'real', label: 'The DOI works, so the citation is real', feedback: 'A DOI that resolves only proves the DOI exists. It has to point at the same title, authors and year.' },
            { id: 'mismatch', label: 'The DOI belongs to a different paper. Search for the cited title itself before using it.', correct: true, feedback: 'Right. A real identifier attached to an invented reference is a common kind of phantom.' },
            { id: 'typo', label: 'Crossref has a typo. The citation is probably fine.', feedback: 'Crossref records come from the publisher. This really is the DOI of the 1953 Watson and Crick paper.' },
            { id: 'ask', label: 'Ask the AI for the correct DOI', feedback: 'It produced the first pairing. A new DOI from the same source is not evidence either.' },
          ],
          explanation: 'The DOI is real: it belongs to the 1953 Watson and Crick paper on the structure of DNA. The cited paper is not: we invented it for this lesson, and Crossref finds no such title. Every detail of a citation has to point at the same work.',
          takeaway: 'A working DOI must lead to the same title, authors and year',
        },
        {
          id: 'p4-pick-book',
          kind: 'pickAll',
          label: 'Pick the test',
          context: 'The AI quoted a book. (The book, author and quote were invented for this lesson.)',
          prompt: 'Which checks could actually confirm this quote?',
          artifact: {
            label: 'AI answer (illustrative)',
            text: 'As Tessa Varnham argues in The Trust Machine: How Algorithms Earned Our Faith (Oxford University Press, 2018, p. 143), "people defer to a confident voice long after it has stopped being right."',
          },
          options: [
            { id: 'catalogue', label: 'Search the title and author in a library catalogue (WorldCat, Open Library)', correct: true, feedback: 'A published book is catalogued. No record at all is a strong warning sign.' },
            { id: 'publisher', label: "Search Oxford University Press's own catalogue", correct: true, feedback: 'A publisher lists the books it has published.' },
            { id: 'page', label: 'Get the book and turn to page 143', correct: true, feedback: 'The only check that confirms the quote itself, not just the book.' },
            { id: 'isbn', label: 'Ask the AI for the ISBN', feedback: 'It can generate an ISBN as easily as a title. An ISBN only helps once you look it up somewhere else.' },
            { id: 'quotes', label: 'Find the quote on a quotes website', feedback: 'Quote sites copy each other and are full of misattributed lines. Some copy AI output.' },
          ],
          explanation: 'Catalogues confirm the book exists. Only the book confirms the quote. Here, Open Library has no book with this title. A precise page number is easy to generate and proves nothing on its own.',
          takeaway: 'Catalogues confirm the book. Only the page confirms the quote',
        },
        {
          id: 'p4-fix-citation',
          kind: 'choose',
          label: 'Fix it',
          context: 'The AI cited a famous paper, but some details are wrong:',
          prompt: 'You checked the record. Which citation is correct?',
          artifact: { label: 'AI answer (illustrative)', code: true, text: 'Kahneman, D. & Tversky, A. (1981). Prospect Theory:\nAn Analysis of Decision under Risk. Econometrica,\n49(3), 112-140.' },
          optionsCode: true,
          options: [
            { id: 'asis', label: 'Kahneman, D. & Tversky, A. (1981). Prospect Theory:\nAn Analysis of Decision under Risk. Econometrica,\n49(3), 112-140.', feedback: 'A real paper with the wrong year, volume, issue and pages. Anyone following it would land in the wrong place.' },
            { id: 'right', label: 'Kahneman, D. & Tversky, A. (1979). Prospect Theory:\nAn Analysis of Decision under Risk. Econometrica,\n47(2), 263-291.', correct: true, feedback: 'Right. This matches the record for doi:10.2307/1914185.' },
            { id: 'journal', label: 'Kahneman, D. & Tversky, A. (1979). Prospect Theory:\nAn Analysis of Decision under Risk. Journal of\nFinance, 47(2), 263-291.', feedback: 'Right year and pages, wrong journal. Every detail has to match.' },
            { id: 'swap', label: 'Tversky, A. & Kahneman, D. (1974). Judgment under\nUncertainty: Heuristics and Biases. Science,\n185, 1124-1131.', feedback: 'A real paper by the same two authors, but a different one. Swapping in a nearby real source is still a wrong citation.' },
          ],
          explanation: 'Prospect Theory appeared in Econometrica, volume 47, issue 2, in 1979, starting on page 263 (doi:10.2307/1914185). Correct a citation from the record, not from memory or from the AI.',
          takeaway: 'Fix citations from the record, not from memory',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You can tell phantoms from real sources, including real sources cited for the wrong thing.' },
          { min: 4, message: 'Solid. Look again at the ones you missed and note which step of the Source Trace would have caught them.' },
          { min: 0, message: 'These were subtle on purpose. The habit of tracing every source matters more than gut feeling.' },
        ],
      },
      summary: {
        insight: 'One article was invented in a real journal, one real case was cited for the wrong rule, one real DOI was attached to a fake paper, and one citation was simply correct. The same question settled each: does the source exist, and does it say that?',
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
        title: 'Source Trace',
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
    'A Source Trace takes minutes and protects you from sanctions, retractions, and corrections',
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
  estimatedTime: 10,

  skillLearned: 'Verifying AI-provided citations and sources',
  verificationMethod: 'Source Trace',

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
