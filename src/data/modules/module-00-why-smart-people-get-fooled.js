// src/data/modules/module-00-why-smart-people-get-fooled.js
// Module 0: Why Smart People Get Fooled by AI
//
// PURPOSE: Create the "oh shit" moment before Pattern 1
// TIME: 10 minutes
// STRUCTURE: Trust Test → 3 Biases → The Formula → Transition
//
// This module is NOT a pattern — it's psychological priming.
// Users leave understanding WHY they're vulnerable, then learn HOW to spot errors.

export const module00 = {
  // ============================================
  // SECTION 1: Metadata
  // ============================================
  id: 'module-00',
  type: 'foundation', // Different from 'pattern' type
  title: 'Why Smart People Get Fooled',
  subtitle: 'The psychology that makes AI mistakes invisible',
  description: 'Before you learn the patterns, understand why your brain is wired to trust AI — even when it\'s wrong.',
  estimatedTime: 10,
  
  // For navigation
  nextModule: {
    id: 'pattern-01',
    title: 'Confident Fabrication',
    teaser: 'When AI invents things that don\'t exist.'
  },

  // ============================================
  // SECTION 2: The Trust Test
  // ============================================
  trustTest: {
    title: "The Trust Test",
    estimatedTime: 2,
    
    intro: {
      headline: "Quick test. Trust your gut.",
      subtext: "You'll see two explanations of the same topic. Which one would you trust more?"
    },
    
    // The two explanations - user picks one
    explanations: {
      topic: "Why do we dream?",
      
      optionA: {
        id: 'fluent',
        text: `Dreams occur during REM sleep as a result of the brain's memory consolidation processes. According to the activation-synthesis hypothesis developed by Harvard researchers, the brainstem generates random neural activity during sleep, which the cortex then attempts to interpret by creating narrative experiences. This explains why dreams often feature fragmented imagery and illogical sequences — they are essentially the brain's attempt to make sense of random signals.`,
        style: 'fluent', // Sounds authoritative
        isCorrect: false,
        issues: [
          'Oversimplifies a complex debate',
          'Presents one theory as settled science',
          'The "Harvard researchers" framing adds false authority',
          'Ignores competing theories (Freudian, evolutionary, etc.)'
        ]
      },
      
      optionB: {
        id: 'clunky',
        text: `We don't fully know why we dream. There are several theories — some scientists think it's about processing memories, others think it might be random brain activity that we try to make sense of, and some think dreams have psychological meaning. The honest answer is that dream research is still ongoing and scientists disagree about the basics.`,
        style: 'clunky', // Sounds uncertain
        isCorrect: true,
        strengths: [
          'Acknowledges uncertainty',
          'Presents multiple perspectives',
          'Doesn\'t overclaim',
          'Actually reflects scientific consensus (that there isn\'t one)'
        ]
      }
    },
    
    // The reveal
    reveal: {
      ifChoseA: {
        headline: "You trusted the confident one.",
        message: "Most people do. The first explanation sounds more authoritative — but it oversimplifies a complex topic and presents one theory as fact. The second explanation is actually more accurate because it acknowledges what we don't know.",
        emotion: "surprise"
      },
      ifChoseB: {
        headline: "Good instincts.",
        message: "You picked the more accurate explanation. But here's the thing: most people pick the other one. The fluent, confident explanation just *feels* more trustworthy — even when it's wrong.",
        emotion: "validation"
      },
      universal: {
        headline: "This is the problem.",
        message: "AI writes like Option A. Confident. Fluent. Authoritative. And your brain is wired to trust it."
      }
    }
  },

  // ============================================
  // SECTION 3: The Three Biases
  // ============================================
  biases: {
    title: "Three Biases That Make You Vulnerable",
    estimatedTime: 5,
    
    intro: {
      headline: "Your brain has shortcuts.",
      subtext: "These shortcuts usually help. But AI exploits them perfectly."
    },
    
    items: [
      {
        id: 'authority',
        name: 'Authority Bias',
        icon: '🎓',
        color: 'blue',
        oneLiner: "If it sounds like a textbook, it must be true.",
        description: "Humans instinctively trust authoritative voices. When information is presented with confidence, structure, and technical terminology, we assume it's credible.",
        
        aiExploit: "AI outputs look like textbooks, academic papers, and expert explanations — even when they're completely made up.",
        
        example: {
          aiSays: `"According to research published in the European Journal of Cognitive Science (2019), working memory capacity directly correlates with creative problem-solving ability (r = 0.73, p < 0.001)."`,
          reality: "This journal doesn't exist. The study doesn't exist. But the format is so authoritative that most people wouldn't question it.",
          redFlag: "Authority in language ≠ authority in knowledge."
        }
      },
      {
        id: 'fluency',
        name: 'Fluency Bias',
        icon: '✨',
        color: 'violet',
        oneLiner: "If it reads smoothly, it must be correct.",
        description: "Psychologists call this 'cognitive ease.' When something is easy to read, well-structured, and grammatically perfect, your brain assumes it's more likely to be true.",
        
        aiExploit: "AI is extremely fluent. Every sentence flows. Every paragraph is structured. This makes AI persuasive even when wrong.",
        
        example: {
          aiSays: `"The Industrial Revolution began in France in the early 1700s, driven primarily by innovations in steam power and textile manufacturing that would later spread to Britain and the rest of Europe."`,
          reality: "This is historically wrong (it started in Britain, mid-1700s). But the sentence is so smooth that it feels true.",
          redFlag: "Fluent explanations can still be false."
        }
      },
      {
        id: 'automation',
        name: 'Automation Bias',
        icon: '🤖',
        color: 'amber',
        oneLiner: "The machine probably knows more than me.",
        description: "Humans tend to trust machine outputs over their own judgment. Pilots trust autopilot. Doctors trust diagnostic software. And we trust AI, even when something feels off.",
        
        aiExploit: "When you doubt an AI output, your brain says: 'But the AI has access to so much data...' So you override your own instincts.",
        
        example: {
          userThinks: `"That statistic seems way too high..."`,
          userDoes: `Accepts it anyway because "the AI must have access to data I don't."`,
          reality: "AI doesn't 'access' data. It predicts text patterns. It has no idea if what it's saying is true.",
          redFlag: "AI outputs are predictions, not knowledge."
        }
      }
    ],
    
    // Mini-quiz after explaining biases
    quiz: {
      instruction: "Quick check — which bias is this?",
      items: [
        {
          scenario: `You read an AI explanation that includes phrases like "studies have shown" and "according to researchers at MIT" — but you don't verify the sources.`,
          correctBias: 'authority',
          explanation: "The academic language triggered your Authority Bias. The phrasing made it sound credible without actually being verified."
        },
        {
          scenario: `An AI gives you a step-by-step explanation that's beautifully structured with clear headers and bullet points. You assume it's correct because it's so well-organized.`,
          correctBias: 'fluency',
          explanation: "The clean formatting triggered your Fluency Bias. Structure and clarity don't guarantee accuracy."
        },
        {
          scenario: `You notice an AI-generated code snippet looks slightly wrong, but you run it anyway thinking "the AI probably knows a method I don't."`,
          correctBias: 'automation',
          explanation: "You overrode your own judgment because of Automation Bias. You trusted the machine over your instincts."
        }
      ]
    }
  },

  // ============================================
  // SECTION 4: The Formula
  // ============================================
  formula: {
    title: "The AI Persuasion Formula",
    estimatedTime: 2,
    
    intro: {
      headline: "Here's why AI mistakes slip through.",
      subtext: "When these three things combine, even smart people get fooled."
    },
    
    equation: {
      components: [
        { label: 'Confidence', icon: '💪', description: 'AI never hedges. It states everything as fact.' },
        { label: 'Fluency', icon: '✨', description: 'Every sentence is grammatically perfect.' },
        { label: 'Machine Authority', icon: '🤖', description: 'We assume AI "knows" things.' }
      ],
      result: {
        label: 'Unearned Trust',
        description: 'Even when the answer is completely wrong.'
      }
    },
    
    insight: {
      text: "This is why AI hallucinations are dangerous. They don't look like mistakes. They look like expertise.",
      emphasis: "Your job isn't to stop trusting AI. It's to verify before you trust."
    }
  },

  // ============================================
  // SECTION 5: Transition to Patterns
  // ============================================
  transition: {
    title: "The Good News",
    estimatedTime: 1,
    
    content: {
      headline: "AI mistakes follow patterns.",
      subtext: "Once you learn to recognize them, you'll spot them instantly.",
      
      setup: [
        "AI doesn't make random errors.",
        "It makes predictable errors.",
        "The same types of hallucinations appear again and again.",
        "Learn the patterns. Spot them forever."
      ],
      
      preview: {
        title: "The 10 Patterns",
        description: "Each pattern takes 15 minutes. Total training: 2.5 hours. Then you're done.",
        patterns: [
          { number: 1, name: 'Confident Fabrication', teaser: 'AI invents tools that don\'t exist' },
          { number: 2, name: 'Plausible Syntax', teaser: 'Code that looks right but won\'t run' },
          { number: 3, name: 'Version Hallucination', teaser: 'Outdated APIs recommended as current' },
          { number: 4, name: 'Phantom Citation', teaser: 'Sources that don\'t exist' },
          { number: 5, name: 'Statistics Invention', teaser: 'Made-up numbers with fake precision' }
        ],
        more: '...and 5 more patterns'
      }
    },
    
    cta: {
      headline: "Ready to start?",
      buttonText: "Begin Pattern 1: Confident Fabrication",
      subtext: "Learn to spot when AI invents packages, libraries, and tools that don't exist."
    }
  },

  // ============================================
  // SECTION 6: Key Takeaways (for completion screen)
  // ============================================
  keyTakeaways: [
    "AI triggers three cognitive biases: Authority, Fluency, and Automation",
    "Confident + fluent + machine-generated = dangerous combination",
    "AI outputs are predictions, not knowledge",
    "Your brain is wired to trust AI — awareness is the first defense",
    "AI mistakes follow predictable patterns you can learn to spot"
  ],
  
  completionMessage: {
    title: "Foundation Complete",
    summary: "You understand why AI is so convincing — and why that's dangerous. Now let's learn the specific patterns that AI mistakes follow.",
    nextStep: "Pattern 1 teaches you to spot when AI invents tools, packages, and libraries that don't exist."
  }
};

export default module00;