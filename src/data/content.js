import {
  Sparkles,
  Code,
  PenTool,
  Presentation,
  Cpu,
  Zap,
  Layout,
  Palette,
  Search,
  Terminal,
  Bot,
  Workflow,
  FileText,
  GitGraph,
  Mail,
  User,
  BookOpen,
  MessageSquare,
  Briefcase,
  Brain,
} from "lucide-react";
import {
  SiOpenai,
  SiAnthropic,
  SiNotion,
  SiGoogle,
  SiFigma,
} from "react-icons/si";
import {
  CursorIcon,
  GammaIcon,
  GensparkIcon,
  PerplexityIcon,
  MidjourneyIcon,
} from "../components/CustomIcons";

export const CONTENT = {
  en: {
    nav: {
      version: "v2.3.0 (Creator Edition)",
      login: "Login",
    },
    hero: {
      title1: "DON'T JUST LEARN.",
      title1_accent: "CREATE.",
      title2: "BUILD THE",
      title2_accent: "FUTURE.",
      subtitle:
        "The ultimate toolkit for students, founders, and creators. From aceing exams to launching your first startup.",
    },
    categories: {
      all: "All Tools",
      writing: "Content & Copy",
      slides: "Startup & Pitch",
      design: "Code & Build",
      productivity: "Productivity",
      coding: "Coding & Dev",
      research: "Research & Study",
    },
    cards: {
      hackTitle: "PRO TIP",
      freeTier: "Free Tier Available",
      hack: "HACK",
    },
    vault: {
      title: "The Creator",
      title_accent: "Vault",
      copy: "Copy Prompt",
      copied: "Copied!",
    },
    footer: {
      text: "BUILT FOR BUILDERS. POWERED BY STUDENTS.",
      sub: "Use AI to create value, not just to pass exams.",
    },
    playbook: {
      title: "The AI",
      title_accent: "Playbook",
      step: "Step",
    },
  },
  ar: {
    nav: {
      version: "نسخة المبدعين 2.3",
      login: "دخول",
    },
    hero: {
      title1: "لا تدرس وبس..",
      title1_accent: "ابدع.",
      title2: "اصنع",
      title2_accent: "المستقبل.",
      subtitle:
        "الأدوات اللي تحتاجها، سواء للمذاكرة، للمشاريع الجانبية، أو حتى لو تبي تبدأ ستارت أب.",
    },
    categories: {
      all: "الكل",
      writing: "كتابة ومحتوى",
      slides: "عروض وشركات",
      design: "تصميم وبناء",
      productivity: "إنتاجية",
      coding: "برمجة وتطوير",
      research: "بحث ودراسة",
    },
    cards: {
      hackTitle: "نصيحة محترف",
      freeTier: "فيه خطة مجانية",
      hack: "نصيحة",
    },
    vault: {
      title: "مكتبة",
      title_accent: "المبدعين",
      copy: "نسخ الأمر",
      copied: "تم النسخ!",
    },
    footer: {
      text: "تم التطوير بواسطة المبدعين، للمبدعين",
      sub: "استخدم الذكاء الاصطناعي عشان تبني قيمة حقيقية، مو بس عشان تنجح.",
    },
    playbook: {
      title: "الشروحات",
      title_accent: "",
      step: "خطوة",
    },
  },
};

export const TOOLS = [
  {
    id: "perplexity",
    category: "writing",
    color: "from-teal-400 to-cyan-600",
    icon: PerplexityIcon,
    website: "https://perplexity.ai",
    hasFreeTier: true,
    content: {
      en: {
        name: "Perplexity",
        tag: "The Knowledge Engine",
        description:
          "AI-powered search engine that provides real-time answers with citations. Excellent for research papers, academic queries, and fact-checking with source attribution.",
      },
      ar: {
        name: "Perplexity",
        tag: "محرك المعرفة",
        description:
          "محرك بحث مدعوم بالذكاء الاصطناعي يوفر إجابات فورية مع المصادر. ممتاز للأوراق البحثية والاستعلامات الأكاديمية والتحقق من الحقائق.",
      },
    },
    installation: {
      en: "1. Go to perplexity.ai\n2. Sign up with Google or Apple.\n3. (Optional) Download the mobile app.",
      ar: "1. اذهب إلى perplexity.ai\n2. سجل الدخول باستخدام Google أو Apple.\n3. (اختياري) حمل التطبيق.",
    },
    examplePrompts: [
      {
        title: { en: "Literature Review", ar: "مراجعة الأدبيات" },
        prompt: {
          en: "Find 5 recent academic papers on [TOPIC] and summarize their key findings.",
          ar: "ابحث عن 5 أوراق أكاديمية حديثة حول [الموضوع] ولخص نتائجها الرئيسية.",
        },
      },
    ],
  },
  {
    id: "claude",
    category: "writing",
    color: "from-orange-400 to-red-500",
    icon: SiAnthropic,
    website: "https://claude.ai",
    hasFreeTier: true,
    content: {
      en: {
        name: "Claude",
        tag: "The Human Writer",
        description:
          "Advanced AI assistant known for natural, conversational writing and exceptional code generation. Supports large file uploads for document analysis.",
      },
      ar: {
        name: "Claude 3.5 Sonnet",
        tag: "الكاتب البشري",
        description:
          "مساعد ذكاء اصطناعي متقدم معروف بكتابته الطبيعية والمحادثة. قوي جداً في البرمجة وتحليل الملفات الكبيرة.",
      },
    },
    installation: {
      en: "1. Go to claude.ai\n2. Sign up with email.\n3. Start a new chat.",
      ar: "1. اذهب إلى claude.ai\n2. سجل بالبريد الإلكتروني.\n3. ابدأ محادثة جديدة.",
    },
    examplePrompts: [
      {
        title: { en: "Text Analysis", ar: "تحليل النص" },
        prompt: {
          en: "Analyze the tone and style of this text: [PASTE TEXT]",
          ar: "حلل نبرة وأسلوب هذا النص: [الصق النص]",
        },
      },
    ],
  },
  {
    id: "chatgpt",
    category: "writing",
    color: "from-green-400 to-emerald-600",
    icon: SiOpenai,
    website: "https://chat.openai.com",
    hasFreeTier: true,
    content: {
      en: {
        name: "ChatGPT",
        tag: "The Strategist",
        description:
          "Versatile AI assistant perfect for brainstorming, content creation, and strategic thinking. Free tier includes GPT-3.5, with GPT-4o available in Plus.",
      },
      ar: {
        name: "ChatGPT 4o",
        tag: "المخطط الاستراتيجي",
        description:
          "مساعد ذكاء اصطناعي متعدد الاستخدامات ممتاز للعصف الذهني وإنشاء المحتوى والتفكير الاستراتيجي. الخطة المجانية تشمل GPT-3.5.",
      },
    },
    installation: {
      en: "1. Visit chat.openai.com\n2. Create an OpenAI account.\n3. Upgrade to Plus for best results.",
      ar: "1. قم بزيارة chat.openai.com\n2. أنشئ حساب OpenAI.\n3. قم بالترقية إلى Plus للحصول على أفضل النتائج.",
    },
    examplePrompts: [
      {
        title: { en: "Creative Writing", ar: "الكتابة الإبداعية" },
        prompt: {
          en: "Write a short story about a time traveler who gets stuck in 2024.",
          ar: "اكتب قصة قصيرة عن مسافر عبر الزمن علق في عام 2024.",
        },
      },
    ],
  },
  {
    id: "notion",
    category: "productivity",
    color: "from-gray-600 to-gray-900",
    icon: SiNotion,
    website: "https://www.notion.so/product/notion-for-education",
    hasFreeTier: true,
    studentLink: "https://www.notion.so/product/notion-for-education",
    content: {
      en: {
        name: "Notion AI",
        tag: "Second Brain",
        description:
          "All-in-one workspace with integrated AI. Organize notes, manage projects, and automate workflows. Students get Personal Pro plan free with verified .edu email.",
      },
      ar: {
        name: "Notion AI",
        tag: "العقل الثاني",
        description:
          "مساحة عمل شاملة مع ذكاء اصطناعي متكامل. نظم ملاحظاتك، أدر مشاريعك، وأتمت المهام. الطلاب يحصلون على خطة Personal Pro مجاناً بإيميل الجامعة.",
      },
    },
    installation: {
      en: "1. Visit notion.so/product/notion-for-education\n2. Sign up with your .edu email address\n3. Verify student status to get Personal Pro free\n4. Enable AI in settings to access AI features",
      ar: "1. زر notion.so/product/notion-for-education\n2. سجل بإيميل الجامعة\n3. تحقق من حالة الطالب للحصول على Personal Pro مجاناً\n4. فعل الذكاء الاصطناعي في الإعدادات",
    },
    examplePrompts: [
      {
        title: { en: "Summarization", ar: "التلخيص" },
        prompt: {
          en: "Summarize this meeting transcript into action items.",
          ar: "لخص نص هذا الاجتماع إلى بنود عمل.",
        },
      },
    ],
  },
  {
    id: "cursor",
    category: "design",
    color: "from-violet-600 to-indigo-600",
    icon: CursorIcon,
    website: "https://cursor.com",
    hasFreeTier: true,
    content: {
      en: {
        name: "Cursor",
        tag: "The Code Wizard",
        description:
          "AI-powered code editor built for pair programming. Features AI chat, autocomplete, and Composer mode for generating entire features across multiple files.",
      },
      ar: {
        name: "Cursor",
        tag: "ساحر الكود",
        description:
          "محرر كود مدعوم بالذكاء الاصطناعي للبرمجة الزوجية. يتضمن محادثة AI، الإكمال التلقائي، ووضع Composer لتوليد ميزات كاملة عبر ملفات متعددة.",
      },
    },
    installation: {
      en: "1. Download from cursor.sh\n2. Install VS Code extensions automatically.\n3. Log in with GitHub.",
      ar: "1. حمل من cursor.sh\n2. ثبت إضافات VS Code تلقائيًا.\n3. سجل الدخول باستخدام GitHub.",
    },
    examplePrompts: [
      {
        title: { en: "Code Generation", ar: "توليد الكود" },
        prompt: {
          en: "Write a Python script to scrape data from a website.",
          ar: "اكتب سكريبت Python لاستخراج البيانات من موقع ويب.",
        },
      },
    ],
  },
  {
    id: "midjourney",
    category: "design",
    color: "from-blue-600 to-indigo-800",
    icon: MidjourneyIcon,
    website: "https://midjourney.com",
    hasFreeTier: false,
    content: {
      en: {
        name: "Midjourney",
        tag: "Art Director",
        description:
          "Premium AI image generation tool for creating stunning, artistic visuals. Accessible via Discord. Subscription required after trial period.",
      },
      ar: {
        name: "Midjourney",
        tag: "المخرج الفني",
        description:
          "أداة متميزة لتوليد الصور بالذكاء الاصطناعي لإنشاء صور فنية مذهلة. متاح عبر Discord. يتطلب اشتراك بعد فترة التجربة.",
      },
    },
    installation: {
      en: "1. Join the Midjourney Discord server.\n2. Go to a #newbies channel.\n3. Type /imagine.",
      ar: "1. انضم إلى خادم Midjourney على Discord.\n2. اذهب إلى قناة #newbies.\n3. اكتب /imagine.",
    },
    examplePrompts: [
      {
        title: { en: "Logo Design", ar: "تصميم الشعار" },
        prompt: { en: "/imagine prompt: minimal vector logo of a fox, flat design", ar: "/imagine prompt: شعار متجه بسيط لثعلب، تصميم مسطح" },
      },
    ],
  },
  {
    id: "antigravity",
    category: "design",
    color: "from-blue-500 to-cyan-400",
    icon: SiGoogle,
    website: "https://ai.google.dev",
    hasFreeTier: true,
    content: {
      en: {
        name: "Google Antigravity",
        tag: "Agentic IDE",
        description:
          "Experimental AI-powered development environment for building software with autonomous agents. Great for prototyping and automating repetitive code tasks.",
      },
      ar: {
        name: "Google Antigravity",
        tag: "مطور المستقبل",
        description:
          "بيئة تطوير تجريبية مدعومة بالذكاء الاصطناعي لبناء البرمجيات بوكلاء مستقلين. ممتاز للنماذج الأولية وأتمتة مهام الكود المتكررة.",
      },
    },
    installation: {
      en: "1. Access via Google AI Studio.\n2. Enable experimental features.\n3. Connect your codebase.",
      ar: "1. الوصول عبر Google AI Studio.\n2. تفعيل الميزات التجريبية.\n3. اربط قاعدة الكود الخاصة بك.",
    },
    examplePrompts: [
      {
        title: { en: "System Design", ar: "تصميم النظام" },
        prompt: {
          en: "Design a scalable architecture for a social media app.",
          ar: "صمم بنية قابلة للتوسع لتطبيق تواصل اجتماعي.",
        },
      },
    ],
  },
  {
    id: "gemini",
    category: "writing",
    color: "from-blue-400 to-purple-600",
    icon: SiGoogle,
    website: "https://gemini.google.com",
    hasFreeTier: true,
    content: {
      en: {
        name: "Gemini Advanced",
        tag: "Data Analyst",
        description:
          "Google's AI assistant with strong data analysis capabilities. Process large documents, analyze datasets, and get insights from uploaded files. Free tier available with usage limits.",
      },
      ar: {
        name: "Gemini Advanced",
        tag: "محلل البيانات",
        description:
          "مساعد Google للذكاء الاصطناعي بقدرات تحليل بيانات قوية. معالجة مستندات كبيرة، تحليل مجموعات البيانات، والحصول على رؤى من الملفات المرفوعة. خطة مجانية متاحة.",
      },
    },
    installation: {
      en: "1. Go to gemini.google.com\n2. Sign in with Google.\n3. Try Gemini Advanced.",
      ar: "1. اذهب إلى gemini.google.com\n2. سجل الدخول باستخدام Google.\n3. جرب Gemini Advanced.",
    },
    examplePrompts: [
      {
        title: { en: "Data Analysis", ar: "تحليل البيانات" },
        prompt: {
          en: "Analyze this dataset and find trends.",
          ar: "حلل هذه البيانات وجد الاتجاهات.",
        },
      },
    ],
  },
  {
    id: "gamma",
    category: "slides",
    color: "from-yellow-400 to-orange-600",
    icon: GammaIcon,
    website: "https://gamma.app",
    hasFreeTier: true,
    content: {
      en: {
        name: "Gamma App",
        tag: "Pitch Deck Pro",
        description:
          "AI-powered presentation tool that creates beautiful pitch decks and websites from simple text prompts. Perfect for startup presentations and project showcases.",
      },
      ar: {
        name: "Gamma App",
        tag: "ملعب العروض",
        description:
          "أداة عروض تقديمية مدعومة بالذكاء الاصطناعي تنشئ عروض تقديمية ومواقع جميلة من نصوص بسيطة. مثالي لعروض المشاريع الناشئة.",
      },
    },
    installation: {
      en: "1. Sign up at gamma.app\n2. Choose 'Presentation' or 'Webpage'.\n3. Enter your topic.",
      ar: "1. سجل في gamma.app\n2. اختر 'عرض تقديمي' أو 'صفحة ويب'.\n3. أدخل موضوعك.",
    },
    examplePrompts: [
      {
        title: { en: "Pitch Deck", ar: "عرض تقديمي" },
        prompt: {
          en: "Create a 10-slide pitch deck for a coffee shop startup.",
          ar: "أنشئ عرضًا تقديميًا من 10 شرائح لشركة ناشئة لمقهى.",
        },
      },
    ],
  },
  {
    id: "genspark",
    category: "research",
    color: "from-indigo-400 to-cyan-600",
    icon: GensparkIcon,
    website: "https://genspark.ai",
    hasFreeTier: true,
    content: {
      en: {
        name: "Genspark",
        tag: "Market Researcher",
        description:
          'AI search engine that generates comprehensive research "Sparkpages" with deep market analysis, competitor insights, and curated sources for any topic.',
      },
      ar: {
        name: "Genspark",
        tag: "باحث السوق",
        description:
          'محرك بحث ذكي ينشئ صفحات "Sparkpages" شاملة مع تحليل سوقي عميق ورؤى المنافسين ومصادر مختارة لأي موضوع.',
      },
    },
    installation: {
      en: "1. Visit genspark.ai\n2. Enter your research query.\n3. Review the Sparkpages.",
      ar: "1. قم بزيارة genspark.ai\n2. أدخل استعلام البحث الخاص بك.\n3. راجع صفحات Sparkpages.",
    },
    examplePrompts: [
      {
        title: { en: "Competitor Analysis", ar: "تحليل المنافسين" },
        prompt: {
          en: "Analyze the top 3 competitors in the electric bike market.",
          ar: "حلل أكبر 3 منافسين في سوق الدراجات الكهربائية.",
        },
      },
    ],
  },
  {
    id: "figma",
    category: "design",
    color: "from-pink-500 to-rose-500",
    icon: SiFigma,
    website: "https://www.figma.com/education",
    hasFreeTier: true,
    studentLink: "https://www.figma.com/education",
    content: {
      en: {
        name: "Figma AI",
        tag: "Product Designer",
        description:
          "Professional design tool with AI features for creating UI/UX mockups and prototypes. Students and educators get free access to Figma Education with verified academic email.",
      },
      ar: {
        name: "Figma AI",
        tag: "مصمم المنتجات",
        description:
          "أداة تصميم احترافية مع ميزات الذكاء الاصطناعي لإنشاء نماذج وواجهات UI/UX. الطلاب والمعلمون يحصلون على وصول مجاني لـ Figma Education بإيميل أكاديمي.",
      },
    },
    installation: {
      en: "1. Visit figma.com/education\n2. Sign up with your academic email (.edu or university domain)\n3. Verify your student/educator status\n4. Create designs and use AI features like Figma Make",
      ar: "1. زر figma.com/education\n2. سجل بإيميل الجامعة\n3. تحقق من حالة الطالب/المعلم\n4. أنشئ تصاميم واستخدم ميزات AI مثل Figma Make",
    },
    examplePrompts: [
      {
        title: { en: "UI Design", ar: "تصميم واجهة المستخدم" },
        prompt: {
          en: "Design a login screen for a fitness app.",
          ar: "صمم شاشة تسجيل دخول لتطبيق لياقة بدنية.",
        },
      },
    ],
  },
  {
    id: "uxpilot",
    category: "design",
    color: "from-purple-500 to-fuchsia-600",
    icon: Terminal,
    website: "https://uxpilot.ai",
    hasFreeTier: true,
    content: {
      en: {
        name: "UXPilot",
        tag: "UX Consultant",
        description:
          "AI-powered UX analysis tool that reviews app screenshots and provides actionable usability feedback. Great for validating UI/UX designs before development.",
      },
      ar: {
        name: "UXPilot",
        tag: "مستشار التجربة",
        description:
          "أداة تحليل UX مدعومة بالذكاء الاصطناعي تراجع لقطات الشاشة وتوفر ملاحظات عملية. ممتاز للتحقق من تصاميم UI/UX قبل التطوير.",
      },
    },
    installation: {
      en: "1. Go to uxpilot.ai\n2. Upload screenshots.\n3. Get feedback.",
      ar: "1. اذهب إلى uxpilot.ai\n2. ارفع لقطات الشاشة.\n3. احصل على الملاحظات.",
    },
    examplePrompts: [
      {
        title: { en: "UX Audit", ar: "تدقيق تجربة المستخدم" },
        prompt: {
          en: "Audit this checkout flow for friction points.",
          ar: "دقق مسار الدفع هذا بحثًا عن نقاط الاحتكاك.",
        },
      },
    ],
  },
];

export const PROMPTS = [
  {
    category: "study",
    content: {
      en: {
        title: "The Project Roadmap",
        text: "I want to build a [APP IDEA] that helps [TARGET AUDIENCE]. Break this down into a step-by-step roadmap for a solo developer (MVP), including recommended tech stack and database schema.",
        tag: "Building",
      },
      ar: {
        title: "خارطة طريق المشروع",
        text: "أبي أبني تطبيق [فكرة التطبيق] يخدم [الجمهور المستهدف]. قسم لي المشروع لخطوات عملية لمطور واحد (MVP)، واقترح علي التقنيات المناسبة (Tech Stack) وتصميم قاعدة البيانات.",
        tag: "بناء",
      },
    },
  },
  {
    category: "writing",
    content: {
      en: {
        title: "The Freelance Cold Email",
        text: "Write a cold email to a potential client offering my services as a [YOUR SKILL]. Keep it under 100 words, professional, punchy, and focus on the value I bring to their business.",
        tag: "Freelance",
      },
      ar: {
        title: "إيميل العميل (Freelance)",
        text: "اكتب لي إيميل تسويقي (Cold Email) لعميل محتمل أعرض فيه خدماتي كـ [مهارتك]. خله أقل من 100 كلمة، احترافي، قوي، وركز على الفائدة اللي بضيفها للبزنس حقهم.",
        tag: "فريلانسر",
      },
    },
  },
  {
    category: "coding",
    content: {
      en: {
        title: "The Code Debugger",
        text: "I am getting [ERROR] in this [LANGUAGE] code. Explain why this error happens, fix the code, and add comments explaining the fix.",
        tag: "Coding",
      },
      ar: {
        title: "منقذ الأخطاء (Debugger)",
        text: "قاعد يطلع لي الخطأ [ERROR] في كود لغة [LANGUAGE]. اشرح لي ليش هذا الخطأ يصير، وصلح الكود، وحط تعليقات (Comments) تشرح وش عدلت بالضبط.",
        tag: "برمجة",
      },
    },
  },
];

export const GUIDES = [
    {
        id: 'uml',
        icon: GitGraph,
        content: {
            en: {
                title: 'Generate UML Diagrams Instantly',
                desc: 'Stop drawing boxes manually. Use AI to code diagrams.',
                steps: [
                    'Open ChatGPT or Claude.',
                    'Prompt: "Generate a Class Diagram for a [E-commerce App] using Mermaid.js syntax."',
                    'Copy the code block it generates.',
                    'Paste it into the Mermaid.live editor (free tool).'
                ]
            },
            ar: {
                title: 'ارسم مخططات UML بثواني',
                desc: 'لا تضيع وقتك ترسم مربعات. خل الذكاء الاصطناعي يكتب كود الرسمة.',
                steps: [
                    'افتح ChatGPT أو Claude.',
                    'اكتب الأمر: "Generate a Class Diagram for a [E-commerce App] using Mermaid.js syntax."',
                    'انسخ كود الـ Mermaid اللي طلع لك.',
                    'الصقه في موقع Mermaid.live (أداة مجانية) وبيتحول لرسمة فوراً.'
                ]
            }
        }
    },
    {
        id: 'quiz',
        icon: FileText,
        content: {
            en: {
                title: 'Turn PDF Notes into Quizzes',
                desc: 'The best active recall method for exams.',
                steps: [
                    'Upload your lecture slides (PDF) to Claude or Gemini.',
                    'Prompt: "Based on this file, create a 10-question multiple choice hard quiz with answer key."',
                    'Take the quiz without looking at answers.',
                    'Ask AI to explain the ones you got wrong.'
                ]
            },
            ar: {
                title: 'حول ملخصاتك لاختبارات',
                desc: 'أفضل طريقة للمراجعة هي اختبار نفسك (Active Recall).',
                steps: [
                    'ارفع ملف المحاضرة (PDF) على Claude أو Gemini.',
                    'اكتب الأمر: "سوي لي اختبار صعب من ١٠ أسئلة خيارات متعددة بناءً على الملف، مع الإجابات في النهاية."',
                    'حل الاختبار بدون ما تغش.',
                    'اطلب من AI يشرح لك الأسئلة اللي غلطت فيها.'
                ]
            }
        }
    },
    {
        id: 'code',
        icon: Workflow,
        content: {
            en: {
                title: 'Debug Logic Errors (Not just syntax)',
                desc: 'Fix code that runs but gives the wrong result.',
                steps: [
                    'Copy your code snippet.',
                    'Explain expected vs actual behavior: "It returns null but I expect an Array."',
                    'Ask: "Trace the execution flow step-by-step and find the logic flaw."',
                    'Paste the fixed code back into Cursor.'
                ]
            },
            ar: {
                title: 'تصحيح الأخطاء المنطقية',
                desc: 'صلح الكود اللي يشتغل بس يعطيك نتائج غلط.',
                steps: [
                    'انسخ الكود حقك.',
                    'اشرح المشكلة: "الكود شغال بس يرجع لي Null وأنا أتوقع Array".',
                    'اكتب الأمر: "تتبع الكود خطوة بخطوة وطلع لي وين المشكلة في المنطق."',
                    'انسخ الحل وعدله في Cursor.'
                ]
            }
        }
    },
    {
        id: 'research',
        icon: BookOpen,
        content: {
            en: {
                title: 'Summarize Research Papers Fast',
                desc: 'Turn dense academic papers into digestible summaries.',
                steps: [
                    'Upload the PDF paper to Claude or Gemini.',
                    'Prompt: "Summarize this paper in 3 key points: methodology, findings, and implications."',
                    'Ask follow-up questions: "Explain [specific concept] in simple terms."',
                    'Use Perplexity to find related papers on the same topic.'
                ]
            },
            ar: {
                title: 'لخص الأوراق العلمية بسرعة',
                desc: 'حول الأوراق العلمية المعقدة لملخصات سهلة الفهم.',
                steps: [
                    'ارفع ملف الـ PDF على Claude أو Gemini.',
                    'اكتب الأمر: "لخص هذه الورقة في 3 نقاط: المنهجية، النتائج، والتطبيقات."',
                    'اسأل أسئلة متابعة: "اشرح لي [مفهوم معين] بطريقة بسيطة."',
                    'استخدم Perplexity عشان تلقى أوراق مشابهة.'
                ]
            }
        }
    },
    {
        id: 'cold-email',
        icon: Mail,
        content: {
            en: {
                title: 'Write Cold Emails That Get Responses',
                desc: 'Get your foot in the door with personalized outreach.',
                steps: [
                    'Use ChatGPT to draft the email structure.',
                    'Prompt: "Write a cold email to [TARGET] offering [SERVICE]. Keep it under 100 words, personalize the opening."',
                    'Use Perplexity to research the recipient\'s recent work/company news.',
                    'Ask AI to refine: "Make this sound more conversational and less salesy."',
                    'Send during business hours (9-11 AM their timezone).'
                ]
            },
            ar: {
                title: 'اكتب إيميلات باردة تجذب الرد',
                desc: 'احصل على فرصتك مع إيميلات مخصصة.',
                steps: [
                    'استخدم ChatGPT عشان تسوي هيكل الإيميل.',
                    'اكتب الأمر: "اكتب إيميل بارد لـ [الهدف] أعرض فيه [الخدمة]. خله أقل من 100 كلمة ومخصص."',
                    'استخدم Perplexity عشان تبحث عن أخبار الشركة أو الشخص.',
                    'اطلب من AI يعدل: "خله يبدو أكثر محادثة وأقل تسويق."',
                    'أرسل خلال ساعات العمل (9-11 صباحاً بالتوقيت المحلي).'
                ]
            }
        }
    },
    {
        id: 'resume',
        icon: Briefcase,
        content: {
            en: {
                title: 'Optimize Your Resume with AI',
                desc: 'Make your resume ATS-friendly and compelling.',
                steps: [
                    'Upload your resume to Claude or ChatGPT.',
                    'Prompt: "Review this resume for [JOB TITLE] position. Suggest improvements for ATS optimization and highlight relevant skills."',
                    'Ask: "Rewrite my experience bullets using action verbs and quantifiable results."',
                    'Use Gamma or ChatGPT to create a matching cover letter.',
                    'Test your resume with an ATS checker (free tools available online).'
                ]
            },
            ar: {
                title: 'حسّن سيرتك الذاتية بالذكاء الاصطناعي',
                desc: 'اجعل سيرتك متوافقة مع أنظمة الفحص وجذابة.',
                steps: [
                    'ارفع سيرتك الذاتية على Claude أو ChatGPT.',
                    'اكتب الأمر: "راجع هذه السيرة لشغل [المسمى الوظيفي]. اقترح تحسينات لـ ATS وركز على المهارات المطلوبة."',
                    'اطلب: "أعد كتابة خبراتي باستخدام أفعال إنجليزية ونتائج قابلة للقياس."',
                    'استخدم Gamma أو ChatGPT عشان تسوي خطاب تغطية متطابق.',
                    'اختبر السيرة مع أداة ATS (أدوات مجانية متوفرة).'
                ]
            }
        }
    },
    {
        id: 'social-media',
        icon: MessageSquare,
        content: {
            en: {
                title: 'Create Viral Social Media Content',
                desc: 'Generate engaging posts that resonate with your audience.',
                steps: [
                    'Use ChatGPT to brainstorm content ideas: "Give me 10 LinkedIn post ideas for [TOPIC] targeting [AUDIENCE]."',
                    'Prompt: "Write a Twitter/X thread (5 tweets) about [TOPIC]. Make it engaging with hooks and clear takeaways."',
                    'Use Gamma to create visual carousel posts for Instagram/LinkedIn.',
                    'Ask AI to adapt the same content for different platforms (Twitter vs LinkedIn tone).',
                    'Schedule posts using free tools like Buffer or Hootsuite.'
                ]
            },
            ar: {
                title: 'أنشئ محتوى فيروسي لوسائل التواصل',
                desc: 'انشئ منشورات جذابة تلامس جمهورك.',
                steps: [
                    'استخدم ChatGPT عشان تسوي عصف ذهني: "اعطني 10 أفكار لمنشورات LinkedIn عن [الموضوع] للجمهور [الجمهور المستهدف]."',
                    'اكتب الأمر: "اكتب thread تويتر (5 تغريدات) عن [الموضوع]. خله جذاب مع hooks وخلاصات واضحة."',
                    'استخدم Gamma عشان تسوي منشورات كراسل بصرية لـ Instagram/LinkedIn.',
                    'اطلب من AI يعدل نفس المحتوى لمواقع مختلفة (نبرة تويتر مختلفة عن LinkedIn).',
                    'جدول المنشورات باستخدام أدوات مجانية مثل Buffer.'
                ]
            }
        }
    },
    {
        id: 'documentation',
        icon: FileText,
        content: {
            en: {
                title: 'Generate Code Documentation',
                desc: 'Create professional documentation for your projects.',
                steps: [
                    'Copy your code function/class to ChatGPT or Claude.',
                    'Prompt: "Generate comprehensive documentation for this code including: function description, parameters, return values, and usage examples."',
                    'Ask: "Convert this to JSDoc/TypeDoc format."',
                    'Use the generated docs to create a README.md for your GitHub repo.',
                    'Keep documentation in sync by regenerating when you update code.'
                ]
            },
            ar: {
                title: 'أنشئ توثيق للكود',
                desc: 'سوي توثيق احترافي لمشاريعك.',
                steps: [
                    'انسخ الدالة/الكلاس للكود على ChatGPT أو Claude.',
                    'اكتب الأمر: "سوي توثيق شامل لهذا الكود يتضمن: وصف الدالة، المعاملات، القيم المرجعة، وأمثلة استخدام."',
                    'اطلب: "حول هذا لصيغة JSDoc/TypeDoc."',
                    'استخدم التوثيق عشان تسوي README.md للمشروع على GitHub.',
                    'حدّث التوثيق كل ما عدلت الكود.'
                ]
            }
        }
    },
    {
        id: 'project-planning',
        icon: Brain,
        content: {
            en: {
                title: 'Plan Your Project from Scratch',
                desc: 'Break down complex projects into actionable steps.',
                steps: [
                    'Describe your project idea to ChatGPT: "I want to build [APP IDEA] that helps [TARGET USERS]."',
                    'Ask: "Break this down into a step-by-step roadmap with milestones and deliverables."',
                    'Request: "Create a tech stack recommendation with explanations for each choice."',
                    'Prompt: "Generate a database schema for [FEATURE] with relationships."',
                    'Use Notion or Gamma to visualize the roadmap and track progress.'
                ]
            },
            ar: {
                title: 'خطط مشروعك من الصفر',
                desc: 'قسم المشاريع المعقدة لخطوات عملية.',
                steps: [
                    'اشرح فكرة مشروعك لـ ChatGPT: "أبي أبني [فكرة التطبيق] يخدم [المستخدمين المستهدفين]."',
                    'اطلب: "قسم هذا لخارطة طريق خطوة بخطوة مع معالم وقوائم مهام."',
                    'اسأل: "اقترح لي tech stack مع شرح لكل خيار."',
                    'اكتب الأمر: "سوي تصميم قاعدة بيانات لـ [الميزة] مع العلاقات."',
                    'استخدم Notion أو Gamma عشان ترسم الخارطة وتتابع التقدم.'
                ]
            }
        }
    }
];
