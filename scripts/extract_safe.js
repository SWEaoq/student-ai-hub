const Sparkles = "Sparkles";
const Code = "Code";
const PenTool = "PenTool";
const Presentation = "Presentation";
const Cpu = "Cpu";
const Zap = "Zap";
const Layout = "Layout";
const Palette = "Palette";
const Search = "Search";
const Terminal = "Terminal";
const Bot = "Bot";
const Workflow = "Workflow";
const FileText = "FileText";
const GitGraph = "GitGraph";
const Mail = "Mail";
const User = "User";
const BookOpen = "BookOpen";
const MessageSquare = "MessageSquare";
const Briefcase = "Briefcase";
const Brain = "Brain";
const Smartphone = "Smartphone";
const Globe = "Globe";
const Server = "Server";
const Layers = "Layers";
const GraduationCap = "GraduationCap";
const SiOpenai = "SiOpenai";
const SiAnthropic = "SiAnthropic";
const SiNotion = "SiNotion";
const SiGoogle = "SiGoogle";
const SiFigma = "SiFigma";
const CursorIcon = "CursorIcon";
const GammaIcon = "GammaIcon";
const GensparkIcon = "GensparkIcon";
const PerplexityIcon = "PerplexityIcon";
const MidjourneyIcon = "MidjourneyIcon";
const CONTENT = {
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
    academy: {
      title: "Build with",
      title_accent: "AI",
      subtitle: "Learn to build real software from zero to deployment. Step-by-step guides for every stack.",
      chooseCategory: "Choose Your Path",
      chooseStack: "Select a Stack",
      startLearning: "Start Learning",
      backToCategories: "Back to Categories",
      sections: "Sections",
      checkpoint: "Checkpoint",
      completed: "Completed",
      nextSection: "Next Section",
      prevSection: "Previous Section",
      estimatedTime: "Estimated Time",
      difficulty: "Difficulty",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      copyCode: "Copy Code",
      codeCopied: "Copied!",
    },
    common: {
      back: "Back",
      searchPlaceholder: "Search tools...",
      noResults: "No tools found. Try a different search.",
      visitWebsite: "Visit Website",
      getFreeTier: "Get Free Tier",
      installation: "Installation",
      examplePrompts: "Example Prompts",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      copyright: "© 2024 Student AI Hub. Built with React & Tailwind.",
      gem: "GEM",
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
    academy: {
      title: "ابنِ مع",
      title_accent: "الذكاء الاصطناعي",
      subtitle: "تعلم كيف تبني تطبيقات حقيقية من الصفر لين الـ Deploy. شروحات عملية خطوة بخطوة لكل الـ Stacks.",
      chooseCategory: "اختر مسارك",
      chooseStack: "اختر الـ Stack",
      startLearning: "ابدأ التعلم",
      backToCategories: "رجوع للتصنيفات",
      sections: "الأقسام",
      checkpoint: "محطة",
      completed: "خلصتها",
      nextSection: "القسم الجاي",
      prevSection: "القسم اللي راح",
      estimatedTime: "الوقت المتوقع",
      difficulty: "المستوى",
      beginner: "مبتدئ",
      intermediate: "متوسط",
      advanced: "متقدم",
      copyCode: "انسخ الكود",
      codeCopied: "تم النسخ!",
    },
    common: {
      back: "رجوع",
      searchPlaceholder: "ابحث عن الأدوات...",
      noResults: "ما لقينا أي نتائج. جرب بحث ثاني.",
      visitWebsite: "زيارة الموقع",
      getFreeTier: "احصل على النسخة المجانية",
      installation: "التثبيت",
      examplePrompts: "أمثلة للأوامر",
      privacy: "الخصوصية",
      terms: "الشروط",
      contact: "اتصل بنا",
      copyright: "© 2024 Student AI Hub. مبني بـ React & Tailwind.",
      gem: "جوهرة",
    },
  },
};

const TOOLS = [
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

const PROMPTS = [
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
  {
    category: "design",
    content: {
      en: {
        title: "System Architecture",
        text: "Design a scalable architecture for [APP IDEA]. Include database schema (SQL vs NoSQL), API structure (REST vs GraphQL), and cloud infrastructure recommendations.",
        tag: "Architecture",
      },
      ar: {
        title: "هندسة النظام",
        text: "صمم بنية تقنية قابلة للتوسع لـ [فكرة التطبيق]. عطني مخطط قاعدة البيانات (SQL ولا NoSQL)، هيكل الـ API، واقتراحات للبنية التحتية السحابية (Cloud).",
        tag: "هندسة برمجيات",
      },
    },
  },
  {
    category: "slides",
    content: {
      en: {
        title: "The Pitch Refiner",
        text: "Critique this slide content: '[SLIDE CONTENT]'. Make it more persuasive for investors, focusing on the problem/solution fit and market opportunity.",
        tag: "Pitching",
      },
      ar: {
        title: "مدقق العروض",
        text: "انقد محتوى هالشريحة: '[محتوى الشريحة]'. خله أكثر إقناعاً للمستثمرين، وركز على توافق المشكلة مع الحل وفرصة السوق.",
        tag: "عروض استثمارية",
      },
    },
  },
  {
    category: "productivity",
    content: {
      en: {
        title: "Smart Study Plan",
        text: "Create a 4-week study schedule for [SUBJECT]. I have [HOURS] hours per week. Include active recall sessions and spaced repetition checkpoints.",
        tag: "Study Plan",
      },
      ar: {
        title: "خطة المذاكرة الذكية",
        text: "سوي لي جدول مذاكرة لمدة 4 أسابيع لـ [المادة]. عندي [عدد الساعات] ساعات في الأسبوع. ضمن فيه جلسات استرجاع نشط (Active Recall) ومراجعة متباعدة.",
        tag: "تخطيط دراسي",
      },
    },
  },
  {
    category: "writing",
    content: {
      en: {
        title: "Content Repurposing",
        text: "Turn this long-form blog post/essay into 3 engaging tweets, 1 LinkedIn post, and a 15-second TikTok script. Keep the tone [DESIRED TONE].",
        tag: "Content Growth",
      },
      ar: {
        title: "إعادة تدوير المحتوى",
        text: "حول هالمقال الطويل لـ 3 تغريدات رهيبة، وبوست لينكد إن، وسكريبت تيك توك مدته 15 ثانية. خل النبرة [النبرة المطلوبة].",
        tag: "صناعة محتوى",
      },
    },
  },
  {
    category: "research",
    content: {
      en: {
        title: "The Concept Simplifier",
        text: "Explain [COMPLEX TOPIC] to me like I'm 12 years old. Then, provide a detailed breakdown for a university student, including key concepts and real-world examples.",
        tag: "Learning",
      },
      ar: {
        title: "بسطها لي",
        text: "اشرح لي [موضوع معقد] وكأني عمري 12 سنة. بعدين، عطني تفصيل دقيق يناسب طالب جامعة، مع ذكر المفاهيم الأساسية وأمثلة من الواقع.",
        tag: "تعلم",
      },
    },
  },
];

const GUIDES = [
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
        title: 'أنشئ مخططات UML فوراً',
        desc: 'لا تضيع وقتك في الرسم اليدوي. استخدم الذكاء الاصطناعي لإنشاء المخططات.',
        steps: [
          'افتح ChatGPT أو Claude.',
          'اكتب الأمر: "Generate a Class Diagram for a [E-commerce App] using Mermaid.js syntax."',
          'انسخ كود Mermaid الناتج.',
          'الصقه في موقع Mermaid.live (أداة مجانية) وسيتحول إلى مخطط فوراً.'
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
        title: 'حوّل ملاحظاتك إلى اختبارات',
        desc: 'أفضل طريقة للمراجعة هي اختبار نفسك (الاسترجاع النشط).',
        steps: [
          'ارفع ملف المحاضرة (PDF) على Claude أو Gemini.',
          'اكتب الأمر: "أنشئ لي اختباراً صعباً من ١٠ أسئلة خيارات متعددة بناءً على الملف، مع وضع الإجابات في النهاية."',
          'حل الاختبار دون النظر إلى الإجابات.',
          'اطلب من الذكاء الاصطناعي شرح الأسئلة التي تعثرت فيها.'
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
        desc: 'أصلح الكود الذي يعمل ولكن يعطي نتائج خاطئة.',
        steps: [
          'انسخ جزء الكود الخاص بك.',
          'اشرح المشكلة: "الكود يعمل ولكن يعيد لي Null بينما أتوقع Array".',
          'اكتب الأمر: "تتبع الكود خطوة بخطوة واكتشف الخلل المنطقي."',
          'انسخ الحل وعدله في المحرر.'
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
        title: 'تلخيص الأوراق العلمية بسرعة',
        desc: 'حوّل الأوراق العلمية المعقدة إلى ملخصات سهلة الفهم.',
        steps: [
          'ارفع ملف الـ PDF على Claude أو Gemini.',
          'اكتب الأمر: "لخص هذه الورقة في 3 نقاط: المنهجية، النتائج، والتطبيقات."',
          'اسأل أسئلة متابعة: "اشرح لي [مفهوم معين] بطريقة مبسطة."',
          'استخدم Perplexity للعثور على أوراق مشابهة.'
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
        title: 'كتابة رسائل بريد احترافية',
        desc: 'احصل على فرص أفضل مع رسائل مخصصة وجذابة.',
        steps: [
          'استخدم ChatGPT لإنشاء هيكل الرسالة.',
          'اكتب الأمر: "اكتب رسالة باردة (Cold Email) لـ [الهدف] أعرض فيها [الخدمة]. اجعلها أقل من 100 كلمة ومخصصة."',
          'استخدم Perplexity للبحث عن أخبار الشركة أو الشخص.',
          'اطلب من الذكاء الاصطناعي التعديل: "اجعل النبرة أكثر ودية وأقل تسويقاً."',
          'أرسل الرسالة خلال ساعات العمل (9-11 صباحاً بالتوقيت المحلي).'
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
        desc: 'اجعل سيرتك متوافقة مع أنظمة الفرز الإلكتروني (ATS) وجذابة.',
        steps: [
          'ارفع سيرتك الذاتية على Claude أو ChatGPT.',
          'اكتب الأمر: "راجع هذه السيرة لوظيفة [المسمى الوظيفي]. اقترح تحسينات لنظام ATS وركز على المهارات المطلوبة."',
          'اطلب: "أعد صياغة الخبرات باستخدام أفعال قوية (Action Verbs) ونتائج قابلة للقياس."',
          'استخدم Gamma أو ChatGPT لإنشاء خطاب تغطية (Cover Letter) مناسب.',
          'اختبر السيرة باستخدام أدوات فحص ATS المجانية.'
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
        title: 'أنشئ محتوى واسع الانتشار',
        desc: 'أنشئ منشورات جذابة تلقى صدى لدى جمهورك.',
        steps: [
          'استخدم ChatGPT للعصف الذهني: "أعطني 10 أفكار لمنشورات LinkedIn حول [الموضوع] تستهدف [الجمهور]."',
          'اكتب الأمر: "اكتب سلسلة تغريدات (Thread) من 5 تغريدات عن [الموضوع]. اجعلها جذابة مع بدايات قوية وفوائد واضحة."',
          'استخدم Gamma لإنشاء منشورات متتابعة (Carousel) بصرية لـ Instagram أو LinkedIn.',
          'اطلب من الذكاء الاصطناعي تكييف المحتوى للمنصات المختلفة (نبرة Twitter تختلف عن LinkedIn).',
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
        desc: 'أنشئ توثيقاً احترافياً لمشاريعك البرمجية.',
        steps: [
          'انسخ الدالة أو الكلاس (Class) إلى ChatGPT أو Claude.',
          'اكتب الأمر: "أنشئ توثيقاً شاملاً لهذا الكود يتضمن: وصف الدالة، المعاملات، القيم المرجعة، وأمثلة الاستخدام."',
          'اطلب: "حول هذا التوثيق لصيغة JSDoc/TypeDoc."',
          'استخدم التوثيق لإنشاء ملف README.md للمشروع على GitHub.',
          'حدّث التوثيق عند كل تحديث للكود.'
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
        desc: 'قسّم المشاريع المعقدة إلى خطوات عملية قابلة للتنفيذ.',
        steps: [
          'اشرح فكرة مشروعك لـ ChatGPT: "أريد بناء [فكرة التطبيق] يخدم [المستخدمين المستهدفين]."',
          'اطلب: "قسم هذا المشروع لخارطة طريق خطوة بخطوة مع معالم رئيسية ومهام محددة."',
          'اسأل: "اقترح لي حزمة تقنية (Tech Stack) مع شرح أسباب الاختيار."',
          'اكتب الأمر: "أنشئ تصميم قاعدة بيانات لـ [الميزة] مع توضيح العلاقات."',
          'استخدم Notion أو Gamma لرسم الخارطة ومتابعة التقدم.'
        ]
      }
    }
  }
];

const ACADEMY_CATEGORIES = [
  {
    id: 'mobile',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    content: {
      en: {
        name: 'Mobile Development',
        description: 'Build native and cross-platform mobile apps with Flutter, React Native, and more.',
      },
      ar: {
        name: 'تطوير تطبيقات الجوال',
        description: 'ابنِ تطبيقات جوال أصلية (Native) وعابرة للمنصات (Cross-platform) باستخدام Flutter و React Native وغيرها.',
      },
    },
    stacks: ['flutter', 'react-native'],
  },
  {
    id: 'web-frontend',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    content: {
      en: {
        name: 'Web Frontend',
        description: 'Create stunning web interfaces with React, Vue, Angular, and modern frameworks.',
      },
      ar: {
        name: 'واجهات الويب (Frontend)',
        description: 'أنشئ واجهات ويب مذهلة باستخدام React و Vue و Angular وأطر العمل الحديثة.',
      },
    },
    stacks: ['react', 'vue', 'angular'],
  },
  {
    id: 'backend',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    content: {
      en: {
        name: 'Backend Development',
        description: 'Build robust APIs and server-side applications with Node.js, Python, and more.',
      },
      ar: {
        name: 'تطوير الواجهة الخلفية (Backend)',
        description: 'ابنِ واجهات برمجة تطبيقات (APIs) وأنظمة خوادم قوية باستخدام Node.js و Python وغيرها.',
      },
    },
    stacks: ['nodejs', 'python-django', 'python-flask'],
  },
  {
    id: 'fullstack',
    icon: Layers,
    color: 'from-orange-500 to-red-500',
    content: {
      en: {
        name: 'Full-Stack Frameworks',
        description: 'End-to-end solutions with Next.js, Remix, SvelteKit, and modern full-stack tools.',
      },
      ar: {
        name: 'أطر العمل الشاملة (Full Stack)',
        description: 'حلول متكاملة من البداية للنهاية باستخدام Next.js و Remix و SvelteKit وغيرها.',
      },
    },
    stacks: ['nextjs', 'remix', 'sveltekit'],
  },
];

const ACADEMY_TUTORIALS = {
  flutter: {
    category: 'mobile',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'beginner',
    estimatedTime: '4-6 hours',
    content: {
      en: {
        name: 'Flutter Mobile App Development',
        tagline: 'Build beautiful native apps for iOS and Android',
        description: 'Learn Flutter from scratch and build your first mobile app with AI assistance. This comprehensive guide covers setup, basics, state management, and using AI to accelerate development.',
      },
      ar: {
        name: 'تطوير تطبيقات Flutter',
        tagline: 'أنشئ تطبيقات أصلية (Native) رائعة لـ iOS و Android',
        description: 'تعلم Flutter من الصفر وأنشئ أول تطبيق جوال لك بمساعدة الذكاء الاصطناعي. يغطي هذا الدليل الشامل الإعداد والأساسيات وإدارة الحالة واستخدام الذكاء الاصطناعي لتسريع التطوير.',
      },
    },
    sections: [
      {
        id: 'setup',
        content: {
          en: {
            title: 'Setup & Installation',
            description: 'Get Flutter installed and your development environment ready.',
            steps: [
              'Download Flutter SDK from flutter.dev for your operating system (Windows, macOS, or Linux)',
              'Extract the zip file and add Flutter to your PATH environment variable',
              'Run `flutter doctor` in your terminal to check for any missing dependencies',
              'Install Android Studio (for Android development) or Xcode (for iOS on macOS)',
              'Run `flutter doctor` again and install any additional tools it recommends',
              'Create your first Flutter project with: `flutter create my_first_app`',
              'Navigate to the project: `cd my_first_app`',
              'Run the app: `flutter run` or use your IDE\'s run button',
            ],
            codeExamples: [
              {
                title: 'Check Flutter Installation',
                code: 'flutter doctor',
                language: 'bash',
              },
              {
                title: 'Create New Project',
                code: 'flutter create my_first_app\ncd my_first_app\nflutter run',
                language: 'bash',
              },
            ],
            checkpoints: [
              'Flutter SDK installed and added to PATH',
              'flutter doctor shows no critical issues',
              'First Flutter app runs successfully',
            ],
          },
          ar: {
            title: 'الإعداد والتركيب',
            description: 'قم بتثبيت Flutter وتجهيز بيئة التطوير.',
            steps: [
              'حمّل Flutter SDK من flutter.dev لنظام التشغيل الخاص بك (Windows أو macOS أو Linux)',
              'استخرج ملف zip وأضف Flutter إلى متغير البيئة PATH',
              'شغّل `flutter doctor` في الطرفية للتحقق من أي متطلبات مفقودة',
              'ثبت Android Studio (لتطوير Android) أو Xcode (لـ iOS على macOS)',
              'شغّل `flutter doctor` مرة أخرى وثبت أي أدوات إضافية مقترحة',
              'أنشئ أول مشروع Flutter باستخدام الأمر: `flutter create my_first_app`',
              'انتقل إلى مجلد المشروع: `cd my_first_app`',
              'شغّل التطبيق: `flutter run` أو استخدم زر التشغيل في بيئة التطوير (IDE)',
            ],
            codeExamples: [
              {
                title: 'التحقق من تثبيت Flutter',
                code: 'flutter doctor',
                language: 'bash',
              },
              {
                title: 'إنشاء مشروع جديد',
                code: 'flutter create my_first_app\ncd my_first_app\nflutter run',
                language: 'bash',
              },
            ],
            checkpoints: [
              'تم تثبيت Flutter SDK وإضافته إلى مسار النظام (PATH)',
              'الأمر flutter doctor لا يظهر أي مشاكل حرجة',
              'أول تطبيق Flutter يعمل بنجاح',
            ],
          },
        },
      },
      {
        id: 'basics',
        content: {
          en: {
            title: 'Flutter Basics',
            description: 'Understand widgets, state management, and the Flutter architecture.',
            steps: [
              'Understand that everything in Flutter is a Widget - buttons, text, layouts, everything',
              'Learn about StatelessWidget (immutable) and StatefulWidget (mutable state)',
              'Explore the widget tree concept: widgets are composed of other widgets',
              'Practice with basic widgets: Text, Container, Column, Row, Scaffold',
              'Learn about Material Design widgets (MaterialApp, AppBar, FloatingActionButton)',
              'Understand hot reload: press `r` in terminal or save file to see changes instantly',
              'Create your first custom widget by extracting a widget into its own class',
              'Learn about the BuildContext and how widgets access their context',
            ],
            codeExamples: [
              {
                title: 'Basic Flutter App Structure',
                code: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My First App',
      home: Scaffold(
        appBar: AppBar(title: Text('Hello Flutter')),
        body: Center(
          child: Text('Welcome to Flutter!'),
        ),
      ),
    );
  }
}`,
                language: 'dart',
              },
              {
                title: 'Stateful Widget Example',
                code: `class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`,
                language: 'dart',
              },
            ],
            checkpoints: [
              'Created a basic Flutter app with MaterialApp and Scaffold',
              'Built a StatefulWidget with working state changes',
              'Understand the difference between Stateless and Stateful widgets',
            ],
          },
          ar: {
            title: 'أساسيات Flutter',
            description: 'فهم العناصر (Widgets) وإدارة الحالة وبنية Flutter.',
            steps: [
              'افهم أن كل شيء في Flutter هو عبارة عن Widget - الأزرار، النصوص، التخطيطات، كل شيء',
              'تعلم الفرق بين StatelessWidget (ثابت) و StatefulWidget (حالة متغيرة)',
              'استكشف مفهوم شجرة العناصر (Widget Tree): العناصر تتكون من عناصر أخرى',
              'تدرب على العناصر الأساسية: Text و Container و Column و Row و Scaffold',
              'تعلم عن عناصر تصميم المواد (Material Design) مثل MaterialApp و AppBar و FloatingActionButton',
              'افهم خاصية إعادة التحميل السريع (Hot Reload): اضغط `r` في الطرفية أو احفظ الملف لرؤية التغييرات فوراً',
              'أنشئ أول Widget مخصص لك عن طريق استخراج widget إلى كلاس منفصل',
              'تعلم عن BuildContext وكيف تصل العناصر إلى سياقها',
            ],
            codeExamples: [
              {
                title: 'هيكل تطبيق Flutter الأساسي',
                code: `import 'package:flutter/material.dart';
 
 void main() {
   runApp(MyApp());
 }
 
 class MyApp extends StatelessWidget {
   @override
   Widget build(BuildContext context) {
     return MaterialApp(
       title: 'My First App',
       home: Scaffold(
         appBar: AppBar(title: Text('Hello Flutter')),
         body: Center(
           child: Text('Welcome to Flutter!'),
         ),
       ),
     );
   }
 }`,
                language: 'dart',
              },
              {
                title: 'مثال على Stateful Widget',
                code: `class Counter extends StatefulWidget {
   @override
   _CounterState createState() => _CounterState();
 }
 
 class _CounterState extends State<Counter> {
   int _count = 0;
 
   void _increment() {
     setState(() {
       _count++;
     });
   }
 
   @override
   Widget build(BuildContext context) {
     return Column(
       children: [
         Text('Count: $_count'),
         ElevatedButton(
           onPressed: _increment,
           child: Text('Increment'),
         ),
       ],
     );
   }
 }`,
                language: 'dart',
              },
            ],
            checkpoints: [
              'تم إنشاء تطبيق Flutter أساسي باستخدام MaterialApp و Scaffold',
              'تم بناء Stateful Widget تعمل بشكل صحيح',
              'فهم الفرق بين Stateless و Stateful widgets',
            ],
          },
        },
      },
      {
        id: 'ai-integration',
        content: {
          en: {
            title: 'Using AI to Build Features',
            description: 'Leverage AI tools like Cursor and ChatGPT to accelerate Flutter development.',
            steps: [
              'Open Cursor (AI code editor) or your IDE with AI assistance',
              'Describe the feature you want: "Create a login screen with email and password fields, a login button, and validation"',
              'Let AI generate the widget structure - review and understand the generated code',
              'Ask AI to explain complex Flutter concepts: "Explain how BuildContext works in Flutter"',
              'Use AI to debug errors: paste error message and code, ask for fixes',
              'Generate API integration code: "Create a function to fetch user data from this API endpoint"',
              'Ask AI to refactor code: "Make this widget more reusable and follow Flutter best practices"',
              'Use AI to generate test cases: "Write unit tests for this widget"',
              'Iterate with AI: ask follow-up questions and refine the generated code',
            ],
            codeExamples: [
              {
                title: 'Example AI Prompt for Flutter',
                code: `// Ask AI: "Create a Flutter widget for a todo list item with checkmark, text, and delete button"

class TodoItem extends StatelessWidget {
  final String text;
  final bool isCompleted;
  final VoidCallback onToggle;
  final VoidCallback onDelete;

  TodoItem({
    required this.text,
    required this.isCompleted,
    required this.onToggle,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Checkbox(
        value: isCompleted,
        onChanged: (_) => onToggle(),
      ),
      title: Text(
        text,
        style: TextStyle(
          decoration: isCompleted ? TextDecoration.lineThrough : null,
        ),
      ),
      trailing: IconButton(
        icon: Icon(Icons.delete),
        onPressed: onDelete,
      ),
    );
  }
}`,
                language: 'dart',
              },
            ],
            checkpoints: [
              'Successfully used AI to generate a Flutter widget',
              'Integrated AI-generated code into your app',
              'Used AI to debug and fix at least one error',
            ],
          },
          ar: {
            title: 'استخدام الذكاء الاصطناعي لبناء الميزات',
            description: 'استخدم أدوات الذكاء الاصطناعي مثل Cursor و ChatGPT لتسريع تطوير Flutter.',
            steps: [
              'افتح Cursor (محرر أكواد مدعوم بالذكاء الاصطناعي) أو بيئة التطوير الخاصة بك مع مساعد الذكاء الاصطناعي',
              'اشرح الميزة المطلوبة: "أنشئ شاشة تسجيل دخول تحتوي على حقول للبريد الإلكتروني وكلمة المرور، وزر تسجيل، والتحقق من صحة البيانات (Validation)"',
              'دع الذكاء الاصطناعي يولد هيكل الـ Widget - راجع وافهم الكود الناتج',
              'اطلب من الذكاء الاصطناعي شرح مفاهيم Flutter المعقدة: "اشرح لي كيفية عمل BuildContext في Flutter"',
              'استخدم الذكاء الاصطناعي لتصحيح الأخطاء: الصق رسالة الخطأ والكود واطلب الحل',
              'أنشئ كود تكامل API: "أنشئ دالة لجلب بيانات المستخدم من نقطة الاتصال (API endpoint) هذه"',
              'اطلب من الذكاء الاصطناعي إعادة هيكلة الكود: "اجعل هذا الـ Widget قابلاً لإعادة الاستخدام واتبع أفضل الممارسات"',
              'استخدم الذكاء الاصطناعي لتوليد اختبارات: "اكتب اختبارات الوحدات (Unit Tests) لهذا الـ Widget"',
              'كرر العملية مع الذكاء الاصطناعي: اطرح أسئلة متابعة وحسن الكود الناتج',
            ],
            codeExamples: [
              {
                title: 'مثال لأمر الذكاء الاصطناعي لـ Flutter',
                code: `// اطلب من الذكاء الاصطناعي: "أنشئ Flutter widget لعنصر قائمة مهام مع مربع اختيار، نص، وزر حذف"
 
 class TodoItem extends StatelessWidget {
   final String text;
   final bool isCompleted;
   final VoidCallback onToggle;
   final VoidCallback onDelete;
 
   TodoItem({
     required this.text,
     required this.isCompleted,
     required this.onToggle,
     required this.onDelete,
   });
 
   @override
   Widget build(BuildContext context) {
     return ListTile(
       leading: Checkbox(
         value: isCompleted,
         onChanged: (_) => onToggle(),
       ),
       title: Text(
         text,
         style: TextStyle(
           decoration: isCompleted ? TextDecoration.lineThrough : null,
         ),
       ),
       trailing: IconButton(
         icon: Icon(Icons.delete),
         onPressed: onDelete,
       ),
     );
   }
 }`,
                language: 'dart',
              },
            ],
            checkpoints: [
              'تم استخدام الذكاء الاصطناعي بنجاح لتوليد Flutter widget',
              'تم دمج الكود الذي ولده الذكاء الاصطناعي في التطبيق',
              'تم استخدام الذكاء الاصطناعي لتصحيح خطأ واحد على الأقل',
            ],
          },
        },
      },
    ],
  },
  react: {
    category: 'web-frontend',
    icon: Code,
    color: 'from-cyan-500 to-blue-500',
    difficulty: 'beginner',
    estimatedTime: '3-5 hours',
    content: {
      en: {
        name: 'React Web Development',
        tagline: 'Build modern, interactive web applications',
        description: 'Master React from the ground up. Learn components, hooks, state management, and how to use AI tools to build features faster.',
      },
      ar: {
        name: 'تطوير الويب باستخدام React',
        tagline: 'أنشئ تطبيقات ويب حديثة وتفاعلية',
        description: 'احترف React من البداية. تعلم المكونات (Components)، والـ Hooks، وإدارة الحالة، وكيفية استخدام أدوات الذكاء الاصطناعي لبناء الميزات بشكل أسرع.',
      },
    },
    sections: [
      {
        id: 'setup',
        content: {
          en: {
            title: 'Setup & Installation',
            description: 'Get your React development environment ready.',
            steps: [
              'Install Node.js from nodejs.org (LTS version recommended)',
              'Verify installation: run `node --version` and `npm --version` in terminal',
              'Install a code editor: VS Code is recommended with the ES7+ React/Redux extension',
              'Create a new React app using Vite: `npm create vite@latest my-react-app -- --template react`',
              'Navigate to project: `cd my-react-app`',
              'Install dependencies: `npm install`',
              'Start development server: `npm run dev`',
              'Open http://localhost:5173 in your browser to see your app',
            ],
            codeExamples: [
              {
                title: 'Create React App with Vite',
                code: 'npm create vite@latest my-react-app -- --template react\ncd my-react-app\nnpm install\nnpm run dev',
                language: 'bash',
              },
            ],
            checkpoints: [
              'Node.js and npm installed',
              'React app created and running',
              'Development server shows app in browser',
            ],
          },
          ar: {
            title: 'الإعداد والتركيب',
            description: 'جهز بيئة تطوير React الخاصة بك.',
            steps: [
              'ثبت Node.js من موقع nodejs.org (يوصى بإصدار LTS)',
              'تحقق من التثبيت: شغل `node --version` و `npm --version` في الطرفية',
              'ثبت محرر أكواد: يوصى بـ VS Code مع إضافة ES7+ React/Redux',
              'أنشئ تطبيق React جديد باستخدام Vite بالأمر: `npm create vite@latest my-react-app -- --template react`',
              'انتقل إلى المجلد: `cd my-react-app`',
              'ثبت المكتبات اللازمة: `npm install`',
              'شغل خادم التطوير: `npm run dev`',
              'افتح http://localhost:5173 في المتصفح لرؤية تطبيقك',
            ],
            codeExamples: [
              {
                title: 'إنشاء تطبيق React باستخدام Vite',
                code: 'npm create vite@latest my-react-app -- --template react\ncd my-react-app\nnpm install\nnpm run dev',
                language: 'bash',
              },
            ],
            checkpoints: [
              'تم تثبيت Node.js و npm',
              'تطبيق React تم إنشاؤه ويعمل',
              'خادم التطوير يعرض التطبيق في المتصفح',
            ],
          },
        },
      },
      {
        id: 'basics',
        content: {
          en: {
            title: 'React Basics',
            description: 'Learn components, JSX, props, and state management.',
            steps: [
              'Understand JSX: JavaScript syntax that looks like HTML but is actually JavaScript',
              'Learn about Components: reusable pieces of UI that return JSX',
              'Master Props: data passed from parent to child components',
              'Understand State: component data that can change (use useState hook)',
              'Practice with Event Handlers: onClick, onChange, onSubmit',
              'Learn about Conditional Rendering: {condition && <Component />}',
              'Understand Lists and Keys: map over arrays to render lists',
              'Learn about useEffect: run code when component mounts or updates',
            ],
            codeExamples: [
              {
                title: 'Basic React Component',
                code: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Ahmed" />
    </div>
  );
}`,
                language: 'jsx',
              },
              {
                title: 'Component with State',
                code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
                language: 'jsx',
              },
            ],
            checkpoints: [
              'Created a functional component with props',
              'Built a component with useState hook',
              'Implemented event handlers and conditional rendering',
            ],
          },
          ar: {
            title: 'أساسيات React',
            description: 'تعلم المكونات (Components) و JSX و Props وإدارة الحالة.',
            steps: [
              'افهم JSX: صيغة تشبه HTML ولكنها في الواقع JavaScript محسن',
              'تعلم عن المكونات (Components): أجزاء واجهة مستخدم قابلة لإعادة الاستخدام تُرجع JSX',
              'أتقن الخصائص (Props): البيانات التي تُمرر من المكون الأب إلى الابن',
              'افهم الحالة (State): بيانات المكون التي يمكن أن تتغير (استخدم useState hook)',
              'تدرب على معالجات الأحداث (Event Handlers) مثل: onClick و onChange و onSubmit',
              'تعلم عن العرض الشرطي (Conditional Rendering): {condition && <Component />}',
              'افهم القوائم والمفاتيح (Lists & Keys): استخدم map على المصفوفات لعرض القوائم',
              'تعلم عن useEffect: لتشغيل كود عندما يتم تحميل المكون أو تحديثه',
            ],
            codeExamples: [
              {
                title: 'مكون React أساسي',
                code: `function Welcome({ name }) {
   return <h1>Hello, {name}!</h1>;
 }
 
 function App() {
   return (
     <div>
       <Welcome name="Sara" />
       <Welcome name="Ahmed" />
     </div>
   );
 }`,
                language: 'jsx',
              },
              {
                title: 'مكون يستخدم State',
                code: `import { useState } from 'react';
 
 function Counter() {
   const [count, setCount] = useState(0);
 
   return (
     <div>
       <p>You clicked {count} times</p>
       <button onClick={() => setCount(count + 1)}>
         Click me
       </button>
     </div>
   );
 }`,
                language: 'jsx',
              },
            ],
            checkpoints: [
              'تم إنشاء مكون وظيفي (Functional Component) مع props',
              'تم بناء مكون يستخدم useState hook',
              'تم تطبيق معالجات الأحداث والعرض الشرطي',
            ],
          },
        },
      },
      {
        id: 'ai-integration',
        content: {
          en: {
            title: 'Using AI to Build Features',
            description: 'Accelerate React development with AI assistants like Cursor, ChatGPT, and Claude.',
            steps: [
              'Open Cursor or your IDE with AI chat enabled',
              'Describe the component: "Create a React component for a product card with image, title, price, and add to cart button"',
              'Let AI generate the component code - review structure and props',
              'Ask AI to add features: "Add loading state and error handling to this API call"',
              'Use AI to fix bugs: paste error message, ask "What\'s wrong with this React code?"',
              'Generate custom hooks: "Create a useFetch hook that handles loading and error states"',
              'Ask for best practices: "How can I optimize this component for performance?"',
              'Use AI to write tests: "Generate React Testing Library tests for this component"',
              'Refactor with AI: "Make this code more maintainable and follow React patterns"',
            ],
            codeExamples: [
              {
                title: 'Example AI-Generated Component',
                code: `// Ask AI: "Create a React component for a todo list with add and delete functionality"

import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
                language: 'jsx',
              },
            ],
            checkpoints: [
              'Used AI to generate a React component',
              'Integrated AI code into your project',
              'Used AI to debug and optimize code',
            ],
          },
          ar: {
            title: 'استخدام الذكاء الاصطناعي لبناء الميزات',
            description: 'سرّع تطوير React باستخدام أدوات الذكاء الاصطناعي مثل Cursor و ChatGPT و Claude.',
            steps: [
              'افتح Cursor أو بيئة التطوير الخاصة بك مع تفعيل محادثة الذكاء الاصطناعي',
              'اشرح المكون المطلوب: "أنشئ React component لبطاقة منتج مع صورة وعنوان وسعر وزر إضافة للسلة"',
              'دع الذكاء الاصطناعي يولد كود المكون - راجع الهيكل والـ props',
              'اطلب من الذكاء الاصطناعي إضافة ميزات: "أضف حالة التحميل (loading state) ومعالجة الأخطاء (error handling) لطلب الـ API هذا"',
              'استخدم الذكاء الاصطناعي لتصحيح الأخطاء: الصق رسالة الخطأ واسأل "ما المشكلة في كود React هذا؟"',
              'أنشئ خطافات مخصصة (Custom Hooks): "أنشئ useFetch hook يتعامل مع حالات التحميل والأخطاء"',
              'اطلب أفضل الممارسات: "كيف يمكنني تحسين أداء هذا المكون؟"',
              'استخدم الذكاء الاصطناعي لكتابة الاختبارات: "ولد اختبارات باستخدام React Testing Library لهذا المكون"',
              'أعد الهيكلة مع الذكاء الاصطناعي: "اجعل هذا الكود أسهل في الصيانة واتبع أنماط React القياسية"',
            ],
            codeExamples: [
              {
                title: 'مثال لمكون مولد بالذكاء الاصطناعي',
                code: `// اطلب من الذكاء الاصطناعي: "أنشئ React component لقائمة مهام مع وظائف الإضافة والحذف"
 
 import { useState } from 'react';
 
 function TodoList() {
   const [todos, setTodos] = useState([]);
   const [input, setInput] = useState('');
 
   const addTodo = () => {
     if (input.trim()) {
       setTodos([...todos, { id: Date.now(), text: input }]);
       setInput('');
     }
   };
 
   const deleteTodo = (id) => {
     setTodos(todos.filter(todo => todo.id !== id));
   };
 
   return (
     <div>
       <input
         value={input}
         onChange={(e) => setInput(e.target.value)}
         placeholder="Add a todo"
       />
       <button onClick={addTodo}>Add</button>
       <ul>
         {todos.map(todo => (
           <li key={todo.id}>
             {todo.text}
             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
           </li>
         ))}
       </ul>
     </div>
   );
 }`,
                language: 'jsx',
              },
            ],
            checkpoints: [
              'تم استخدام الذكاء الاصطناعي لتوليد React component',
              'تم دمج كود الذكاء الاصطناعي في المشروع',
              'تم استخدام الذكاء الاصطناعي لتصحيح وتحسين الكود',
            ],
          },
        },
      },
    ],
  },
};

// Helper to flatten CONTENT for site_settings
function flattenContent(obj, prefix = '') {
  let result = {};
  for (const key in obj) {
    if (key === 'en' || key === 'ar') continue; 
  }
  return result;
}

// Better approach for CONTENT:
// Iterate through 'en' keys, find matching 'ar' keys, build the object.
function processContent() {
  const settings = [];
  const en = CONTENT.en;
  const ar = CONTENT.ar;

  function recurse(obj, parentKey = '') {
    for (const key in obj) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        recurse(obj[key], currentKey);
      } else {
        // It's a leaf value (string)
        // Find corresponding value in AR
        // We need to traverse AR object using the currentKey path
        const arValue = getNestedValue(ar, currentKey);
        settings.push({
          key: currentKey,
          value: {
            en: obj[key],
            ar: arValue || ''
          }
        });
      }
    }
  }

  recurse(en);
  return settings;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const allData = {
  site_settings: processContent(),
  tools: TOOLS.map(t => {
    const { icon, ...rest } = t;
    return {
      ...rest,
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || t.id)
    };
  }), 
  prompts: PROMPTS.map(p => ({
    ...p,
    id: p.content.en.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  })),
  playbooks: GUIDES.map(g => {
    const { icon, ...rest } = g;
    return {
      ...rest,
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || g.id)
    };
  }),
  academy_categories: ACADEMY_CATEGORIES.map(c => {
    const { icon, ...rest } = c;
    return {
      ...rest,
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || c.id)
    };
  }),
  academy_tutorials: Object.entries(ACADEMY_TUTORIALS).map(([key, t]) => {
    const { icon, ...rest } = t;
    return {
      ...rest,
      id: key, // Use the dictionary key as ID
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || key)
    };
  })
};

console.log(JSON.stringify(allData, null, 2));
