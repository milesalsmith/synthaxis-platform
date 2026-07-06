// src/data/patterns/pattern-01-confident-fabrication.js
// Pattern 01: The Confident Fabrication
// 
// CASE STUDY: The huggingface-cli incident (March 2024)
// TARGET: 15 minutes total
// AUDIENCE: Anyone using AI for work — no technical knowledge assumed
//
// STRUCTURE:
// S (3 min): Story + "Would you have trusted this?" + Impact reveal
// T (4 min): 5 AI outputs — mark Trust/Verify — get scored
// O (5 min): 4 red flags with examples + matching exercise + verification method
// P (3 min): Fresh scenario + verify 3 packages + final score

export const lesson = {
  // ============================================
  // SECTION 1: Metadata
  // ============================================
  id: 'pattern-01',
  patternNumber: 1,
  title: 'Confident Fabrication',
  subtitle: 'When AI Invents Things That Don\'t Exist',
  description: 'Learn to spot when AI recommends tools, packages, or resources that sound real but don\'t actually exist.',
  estimatedTime: 15,
  
  // For the completion screen
  skillLearned: 'Verifying AI-recommended tools and packages',
  verificationMethod: 'The 30-Second Check',
  
  caseStudy: {
    name: 'The huggingface-cli incident',
    date: 'March 2024',
    researcher: 'Bar Lanyado, Lasso Security',
    source: 'https://www.lasso.security/blog/ai-package-hallucinations'
  },
  
  nextLesson: {
    id: 'pattern-02',
    title: 'The Plausible Syntax',
    teaser: 'Code that looks right but won\'t run.'
  },

  // ============================================
  // SECTION 2: STOP Protocol Phases
  // ============================================
  phases: {
    
    // ==========================================
    // SEE (3 minutes)
    // Story → Trust check → Impact reveal
    // ==========================================
    see: {
      title: "The Tool That Didn't Exist",
      estimatedTime: 3,
      
      // Part 1: Set the scene (no jargon)
      intro: {
        headline: "A developer needed help with a simple task.",
        context: `Imagine you're working on a project. You've created something — maybe a document, a design, or some code — and you want to share it online.

You ask an AI assistant for help. Here's the conversation:`
      },
      
      // Part 2: The AI conversation
      conversation: {
        userMessage: "How do I upload my files to Hugging Face?",
        aiResponse: {
          text: `To upload files to Hugging Face, you'll need to install the command-line tool first.

**Step 1:** Open your terminal and run:
\`\`\`
pip install huggingface-cli
\`\`\`

**Step 2:** Log in to your account:
\`\`\`
huggingface-cli login
\`\`\`

**Step 3:** Upload your files:
\`\`\`
huggingface-cli upload ./my-files my-username/my-project
\`\`\`

That's it! Your files will be live on Hugging Face.`,
          note: "This looks like a helpful, professional response."
        }
      },
      
      // Part 3: Trust check — first interaction
      trustCheck: {
        question: "Be honest: would you have followed these instructions?",
        subtext: "There's no wrong answer here. We're testing your instincts.",
        options: [
          { 
            id: 'yes-trusted', 
            label: "Yes, I would have run the install command",
            response: "You're not alone. Over 30,000 developers did exactly that."
          },
          { 
            id: 'maybe-searched', 
            label: "Maybe, but I'd Google it first",
            response: "Good instinct — but most people don't. They trust the AI."
          },
          { 
            id: 'no-suspicious', 
            label: "No, something seems off",
            response: "Interesting! What made you hesitate? Hold that thought."
          }
        ]
      },
      
      // Part 4: The reveal
      reveal: {
        headline: "The tool doesn't exist.",
        explanation: `"huggingface-cli" is not a real tool. The AI made it up.

It sounds real. The name follows normal naming patterns. The instructions are formatted professionally. But when you run that install command, you're trying to download something that was never created.`,
        
        whatHappened: {
          title: "Here's what actually happened:",
          steps: [
            "A security researcher named Bar Lanyado noticed AI kept recommending this fake tool",
            "He created an empty placeholder with that name to track how many people tried to install it",
            "In just 3 months, over 30,000 developers attempted to download it",
            "Major companies — including Alibaba — had copied these instructions into their official documentation"
          ]
        }
      },
      
      // Part 5: Impact stats
      impact: {
        stats: [
          { value: '30,000+', label: 'Download attempts', detail: 'in just 3 months' },
          { value: 'Alibaba', label: 'Major company fooled', detail: 'put it in their docs' },
          { value: '20%', label: 'AI suggestions affected', detail: 'contain fabricated tools' }
        ],
        source: 'Lasso Security Research, March 2024'
      },
      
      // Part 6: Why this matters
      whyItMatters: {
        title: "Why is this dangerous?",
        points: [
          {
            scenario: "Annoying but harmless:",
            outcome: "The install fails, you waste time debugging"
          },
          {
            scenario: "Actually dangerous:",
            outcome: "A bad actor registers the fake name first and fills it with malware. Now 30,000 developers just installed malicious code."
          }
        ],
        conclusion: "This isn't hypothetical. Security researchers call this attack 'slopsquatting' — and it's already happening."
      },
      
      transition: "So how do you protect yourself? First, let's test your instincts."
    },

    // ==========================================
    // TEST (4 minutes)  
    // 5 AI recommendations — Trust or Verify?
    // ==========================================
    test: {
      title: "Trust or Verify?",
      estimatedTime: 4,
      
      intro: {
        headline: "Here are 5 tools that AI assistants have recommended.",
        instruction: "For each one, decide: would you trust it and install immediately, or verify it first?",
        note: "Don't actually search anything yet — go with your gut."
      },
      
      items: [
        {
          id: 'item-1',
          aiSaid: "To convert PDFs, install the pdf-toolkit-pro package",
          context: "You asked: 'How do I convert PDF files to images?'",
          isReal: false,
          realName: null,
          explanation: "FABRICATED. The '-pro' suffix is a red flag. Real tools rarely use it. This package doesn't exist.",
          redFlag: "The '-pro' suffix"
        },
        {
          id: 'item-2', 
          aiSaid: "You can use the requests library to make HTTP calls",
          context: "You asked: 'How do I fetch data from a website in Python?'",
          isReal: true,
          downloads: "50M+ per month",
          explanation: "REAL. 'requests' is one of the most popular Python packages. It has over 50 million downloads per month.",
          redFlag: null
        },
        {
          id: 'item-3',
          aiSaid: "Install react-component-toolkit for pre-built UI elements", 
          context: "You asked: 'How do I add buttons and forms to my React app?'",
          isReal: false,
          realName: null,
          explanation: "FABRICATED. The name sounds perfect for what you need — too perfect. AI invented it to match your question.",
          redFlag: "Name matches your question too perfectly"
        },
        {
          id: 'item-4',
          aiSaid: "Use lodash for utility functions like sorting and filtering",
          context: "You asked: 'Is there a library for common JavaScript operations?'",
          isReal: true,
          downloads: "40M+ per week",
          explanation: "REAL. Lodash is a hugely popular JavaScript utility library used by millions of developers.",
          redFlag: null
        },
        {
          id: 'item-5',
          aiSaid: "Install fastapi-authentication-plus for secure login systems",
          context: "You asked: 'How do I add user login to my FastAPI app?'",
          isReal: false,
          realName: "fastapi-users",
          explanation: "FABRICATED. Again, the '-plus' suffix. The real package for this is called 'fastapi-users'.",
          redFlag: "The '-plus' suffix"
        }
      ],
      
      // Scoring feedback
      scoring: {
        perfect: {
          threshold: 5,
          message: "Perfect! You correctly identified all 5. You have strong instincts — let's sharpen them further."
        },
        good: {
          threshold: 4,
          message: "4 out of 5! Solid instincts. The patterns we'll learn next will help you catch that last one."
        },
        okay: {
          threshold: 3,
          message: "3 out of 5 — not bad! The fabricated ones are tricky. That's exactly why this training exists."
        },
        needsWork: {
          threshold: 0,
          message: "This is tricky — and that's the point. AI fabrications are designed to sound real. Let's learn the patterns that give them away."
        }
      },
      
      summary: {
        fabricatedCount: 3,
        realCount: 2,
        insight: "In this batch, 3 out of 5 AI recommendations were fabricated. Research shows about 20% of AI tool suggestions don't exist. Let's learn how to spot them."
      },
      
      transition: "Now let's learn the specific patterns that give fabrications away."
    },

    // ==========================================
    // OBSERVE (5 minutes)
    // Red flags + Matching exercise + The 30-Second Check
    // ==========================================
    observe: {
      title: "The Red Flags",
      estimatedTime: 5,
      
      intro: {
        headline: "AI fabrications follow predictable patterns.",
        subtext: "Security researchers analyzed thousands of AI responses. They found 4 red flags that appear again and again."
      },
      
      // The 4 red flags — detailed explanations
      redFlags: [
        {
          id: 'flag-1',
          name: 'The Premium Suffix',
          icon: '🏷️',
          description: 'AI loves adding "-pro", "-plus", "-toolkit", or "-advanced" to make fake tools sound legitimate.',
          examples: {
            fake: ['pdf-toolkit-pro', 'react-forms-plus', 'auth-advanced', 'data-toolkit'],
            real: ['react', 'express', 'pandas', 'tensorflow']
          },
          whyItHappens: "AI has learned that 'pro' and 'plus' sound professional. So when it invents something, it adds these suffixes to seem credible.",
          howToSpot: "If a tool name ends in -pro, -plus, -toolkit, or -advanced, verify it before installing."
        },
        {
          id: 'flag-2',
          name: 'The Perfect Match',
          icon: '🎯',
          description: 'The tool name matches your exact question suspiciously well.',
          examples: {
            yourQuestion: "How do I add authentication to FastAPI?",
            aiInvents: "fastapi-authentication-helper",
            reality: "Real tools rarely have names that perfectly describe your specific use case"
          },
          whyItHappens: "AI generates names based on your question. If you ask about 'FastAPI authentication', it constructs 'fastapi-authentication-something'.",
          howToSpot: "If the tool name reads like a description of your exact problem, be suspicious."
        },
        {
          id: 'flag-3',
          name: 'The Naming Mixup',
          icon: '🔀',
          description: 'AI confuses naming conventions — mixing hyphens and underscores, or getting capitalization wrong.',
          examples: {
            realPackage: 'huggingface_hub (underscore)',
            aiFabricated: 'huggingface-cli (hyphen)',
            note: "The real package uses an underscore. AI invented one with a hyphen."
          },
          whyItHappens: "Different programming ecosystems have different naming conventions. AI muddles them together.",
          howToSpot: "If you know the ecosystem's conventions, mismatches are a warning sign."
        },
        {
          id: 'flag-4',
          name: 'The Ecosystem Blend',
          icon: '🔗',
          description: 'AI mashes together real tool names to create something that sounds familiar but doesn\'t exist.',
          examples: {
            realTools: ['jscodeshift', 'react-codemod'],
            aiInvents: 'react-codeshift',
            note: "Both real tools exist. AI combined them into something that doesn't."
          },
          whyItHappens: "AI recognizes patterns in real tool names and recombines them incorrectly.",
          howToSpot: "If a name sounds like two tools you've heard of merged together, check if it actually exists."
        }
      ],
      
      // Matching exercise
      matchingExercise: {
        title: "Quick Check: Match the Red Flag",
        instruction: "For each fabricated tool, identify which red flag gives it away:",
        items: [
          {
            tool: "express-routing-pro",
            correctFlag: 'flag-1', // Premium Suffix
            explanation: "The '-pro' suffix is the giveaway."
          },
          {
            tool: "mongodb-query-helper",
            correctFlag: 'flag-2', // Perfect Match
            explanation: "It's too perfectly named for 'MongoDB queries'."
          },
          {
            tool: "numpy_pandas-toolkit", 
            correctFlag: 'flag-4', // Ecosystem Blend
            explanation: "It mashes 'numpy' and 'pandas' together."
          },
          {
            tool: "Django-REST-framework",
            correctFlag: 'trick-question',
            isReal: true,
            explanation: "Trick question! This one is actually real. It's a popular API framework."
          }
        ]
      },
      
      // The verification method
      verificationMethod: {
        name: "The 30-Second Check",
        tagline: "One simple habit that prevents 100% of fabrication problems.",
        
        steps: [
          {
            number: 1,
            action: "Copy the exact name",
            detail: "Not just part of it — the whole thing, exactly as AI wrote it",
            time: "2 seconds"
          },
          {
            number: 2,
            action: "Open the package registry",
            detail: "For Python: pypi.org | For JavaScript: npmjs.com | For others: search '[language] package registry'",
            time: "5 seconds"
          },
          {
            number: 3,
            action: "Search the exact name",
            detail: "Paste it directly into the search box",
            time: "3 seconds"
          },
          {
            number: 4,
            action: "Check the results",
            detail: "No results? AI made it up. Has results? Check: downloads, last update, and description match what AI claimed.",
            time: "20 seconds"
          }
        ],
        
        whatToLookFor: {
          good: [
            "High download count (thousands or millions)",
            "Recent updates (within the last year)", 
            "Description matches what AI said it does",
            "Has documentation and a source code link"
          ],
          suspicious: [
            "Very few downloads (under 100)",
            "Created very recently (especially if AI calls it 'popular')",
            "No documentation",
            "Description doesn't match what AI claimed"
          ]
        },
        
        whyItWorks: "This check takes 30 seconds. Debugging a failed install takes 30 minutes. Recovering from malware takes days. The math is simple."
      },
      
      transition: "You've learned the red flags. You've learned the 30-Second Check. Now let's put it all together."
    },

    // ==========================================
    // PRACTICE (6 minutes)
    // Know Your Registry → Drill (10 packages) → Your Toolkit → Takeaways
    // ==========================================
    practice: {
      title: "Your Turn",
      estimatedTime: 6,
      
      // Step 1: Know Your Registry — visual learning
      knowYourRegistry: {
        headline: "Know Your Registry",
        subtext: "Before we drill, let's see what legitimate packages actually look like on PyPI.",
        
        // Example of a real, trustworthy package
        legitimateExample: {
          name: 'requests',
          version: '2.31.0',
          description: 'Python HTTP for Humans.',
          stats: {
            downloads: '50,234,891',
            downloadLabel: 'downloads/month',
            firstRelease: 'Feb 14, 2011',
            lastUpdate: '3 days ago',
            versions: 142,
            maintainers: ['Kenneth Reitz', 'Nate Prewitt', 'Seth Larson'],
            repository: 'github.com/psf/requests',
            license: 'Apache 2.0'
          },
          goodSigns: [
            { label: 'High downloads', detail: '50M+/month means heavily vetted by the community' },
            { label: '12+ years old', detail: 'Established packages have track records' },
            { label: 'Known maintainers', detail: 'Real people you can look up' },
            { label: 'GitHub linked', detail: 'You can inspect the actual code' },
            { label: '142 versions', detail: 'Active, ongoing development' }
          ]
        },
        
        // What a suspicious package looks like
        suspiciousExample: {
          name: 'requests-pro',
          version: '1.0.0',
          description: 'Enhanced HTTP requests library with extra features.',
          stats: {
            downloads: '47',
            downloadLabel: 'downloads/month',
            firstRelease: '3 days ago',
            lastUpdate: '3 days ago',
            versions: 1,
            maintainers: [],
            repository: null,
            license: 'MIT'
          },
          redFlags: [
            { label: '47 downloads', detail: 'Almost no usage = untested, possibly malicious' },
            { label: 'Created 3 days ago', detail: 'No track record whatsoever' },
            { label: 'No maintainer info', detail: 'Anonymous = no accountability' },
            { label: 'No repository', detail: 'Cannot inspect code before installing' },
            { label: 'Single version', detail: 'No development history' },
            { label: '"-pro" suffix', detail: 'Classic hallucination pattern on real package name' }
          ]
        },
        
        comparison: {
          title: "Side by Side: Spot the Difference",
          instruction: "Same screen, very different story. Train your eye to see these differences instantly."
        }
      },
      
      // Step 2: The Drill — 10 packages with registry info
      drill: {
        enabled: true,
        title: "The Verification Drill",
        subtitle: "10 packages. Registry info included. Spot the fakes.",
        description: "Use what you just learned. Look at the numbers, dates, and maintainers.",
        packageCount: 10,
        targetTime: 120 // 2 minutes target
      },
      
      // Step 3: Your Toolkit — CLI commands for verification
      toolkit: {
        headline: "Your Verification Toolkit",
        subtext: "Quick commands to verify packages before installing.",
        
        commands: [
          {
            title: 'Check if package exists (Python)',
            ecosystem: 'pip',
            command: 'pip index versions requests',
            output: `requests (2.31.0)
Available versions: 2.31.0, 2.30.0, 2.29.0, 2.28.2, ...`,
            whatToLookFor: 'Multiple versions = established package. "No matching distribution" = doesn\'t exist.'
          },
          {
            title: 'View package details (Python)',
            ecosystem: 'pip',
            command: 'pip show requests',
            output: `Name: requests
Version: 2.31.0
Summary: Python HTTP for Humans.
Home-page: https://requests.readthedocs.io
Author: Kenneth Reitz`,
            whatToLookFor: 'Real homepage, known author, clear summary.'
          },
          {
            title: 'Check npm package (JavaScript)',
            ecosystem: 'npm',
            command: 'npm view lodash',
            output: `lodash@4.17.21 | MIT | deps: none | versions: 114
Lodash modular utilities.
https://lodash.com/

maintainers:
- jdalton`,
            whatToLookFor: '114 versions, known maintainer, real website.'
          },
          {
            title: 'Quick browser check',
            ecosystem: 'web',
            command: 'Open: pypi.org/project/[package-name]',
            output: '[Visual inspection of registry page]',
            whatToLookFor: 'Download count, release history, GitHub link, maintainer info.'
          }
        ],
        
        quickReference: {
          title: "The 30-Second Check",
          steps: [
            "Copy the exact package name from AI output",
            "Open pypi.org (Python) or npmjs.com (JavaScript)",
            "Search for the exact name",
            "Check: downloads > 1000? First release > 1 month ago? Has GitHub link?"
          ]
        }
      },
      
      // Step 4: Takeaways
      keyTakeaways: [
        "AI fabricates package names that follow predictable patterns",
        "Red flags: premium suffixes (-pro, -plus, -toolkit), perfect matches to your question, conflations of real names",
        "Registry signals: download count, release history, maintainer info, repository link",
        "The 30-Second Check prevents installing malicious or non-existent packages",
        "Trust but verify: AI is helpful, but verification is your responsibility"
      ],
      
      checklist: {
        title: "Your Fabrication Detection Checklist",
        items: [
          "Does the name end in -pro, -plus, -toolkit, or -advanced?",
          "Does the name match my exact question suspiciously well?",
          "Does it combine two real package/framework names?",
          "Have I searched for the exact name on the package registry?",
          "Does it have 1000+ downloads and multiple versions?",
          "Is there a linked GitHub repository with actual code?"
        ]
      },
      
      completionMessage: {
        title: "Pattern Learned: Confident Fabrication",
        summary: "You can now spot when AI invents packages that don't exist. You know the red flags, you've seen what real vs fake registries look like, and you have the tools to verify.",
        nextStep: "Pattern 2 teaches you to spot code that looks correct but won't actually run."
      }
    }
  }
};

export default lesson;