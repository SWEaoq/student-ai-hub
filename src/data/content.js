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
    content: {
      en: {
        name: "Perplexity",
        tag: "The Knowledge Engine",
        description:
          "Real-time search engine that cites every single source. Better than Google for research.",
        hack: 'Use "Focus Mode" to search only academic papers or Reddit discussions.',
      },
      ar: {
        name: "Perplexity",
        tag: "محرك المعرفة",
        description:
          "محرك بحث فوري يعطيك المصادر لكل معلومة. أفضل من قوقل بمراحل للبحوث.",
        hack: 'استخدم "Focus Mode" عشان تبحث بس في الأوراق العلمية أو نقاشات ريديت.',
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
    content: {
      en: {
        name: "Claude",
        tag: "The Human Writer",
        description:
          "Known for more natural, less robotic writing and exceptional coding abilities.",
        hack: "Upload your entire lecture notes (PDF) and ask it to create a quiz.",
      },
      ar: {
        name: "Claude 3.5 Sonnet",
        tag: "الكاتب البشري",
        description:
          "معروف بكتابته الطبيعية جداً (ما تحسها روبوت) وقوي جداً في البرمجة.",
        hack: "ارفع له ملفات المحاضرات كاملة (PDF) واطلب منه يسوي لك اختبار تجريبي.",
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
    content: {
      en: {
        name: "ChatGPT",
        tag: " The Strategist",
        description:
          "Perfect for refining business models, marketing copy, and brainstorming.",
        hack: 'Ask it to "Act as a VC investor" to find holes in your project logic.',
      },
      ar: {
        name: "ChatGPT 4o",
        tag: "المخطط الاستراتيجي",
        description:
          "ممتاز جداً لترتيب أفكار مشاريعك، كتابة محتوى تسويقي، والعصف الذهني.",
        hack: 'اطلب منه "يتقمص شخصية مستثمر" عشان يطلع لك العيوب في فكرة مشروعك.',
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
    website: "https://notion.so",
    content: {
      en: {
        name: "Notion AI",
        tag: "Second Brain",
        description:
          "All-in-one workspace. AI summarizes notes, plans projects, and writes emails.",
        hack: "Students get the Personal Pro plan for FREE with a .edu email.",
      },
      ar: {
        name: "Notion AI",
        tag: "العقل الثاني",
        description:
          "مساحة عمل شاملة. الذكاء الاصطناعي يلخص ملاحظاتك، يرتب مشاريعك، ويكتب إيميلاتك.",
        hack: "الطلاب ياخذون خطة Personal Pro مجااااناً إذا سجلت بإيميل الجامعة.",
      },
    },
    installation: {
      en: "1. Download Notion desktop app.\n2. Enable AI in settings.\n3. Use Space key to invoke AI.",
      ar: "1. حمل تطبيق Notion لسطح المكتب.\n2. فعل الذكاء الاصطناعي في الإعدادات.\n3. استخدم مفتاح المسافة لاستدعاء الذكاء الاصطناعي.",
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
    content: {
      en: {
        name: "Cursor",
        tag: "The Code Wizard",
        description:
          "Build MVPs faster. It predicts your next code edit across files.",
        hack: 'Use "Composer" (Cmd+I) to generate entire features for your app in one go.',
      },
      ar: {
        name: "Cursor",
        tag: "ساحر الكود",
        description:
          "ابني تطبيقاتك (MVP) بسرعة خيالية. يتوقع الكود ويعدل في ملفات متعددة.",
        hack: 'استخدم ميزة "Composer" (Cmd+I) عشان تبني ميزات كاملة لتطبيقك بضغطة زر.',
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
    content: {
      en: {
        name: "Midjourney",
        tag: "Art Director",
        description:
          "Generate hyper-realistic images for your presentations, ads, or mockups.",
        hack: 'Use parameters like "--v" or "--stylize" to control the output quality.',
      },
      ar: {
        name: "Midjourney",
        tag: "المخرج الفني",
        description:
          "صمم صور واقعية جداً لعروضك التقديمية، إعلاناتك، أو نماذجك.",
        hack: 'استخدم أوامر مثل "--v" أو "--stylize" للتحكم في جودة الصور.',
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
    content: {
      en: {
        name: "Google Antigravity",
        tag: "Agentic IDE",
        description:
          "Let AI Agents build the boring parts of your software architecture.",
        hack: "Great for prototyping backend logic without writing boilerplate code.",
      },
      ar: {
        name: "Google Antigravity",
        tag: "مطور المستقبل",
        description:
          "خلي وكلاء الذكاء الاصطناعي يبنون لك البنية التحتية لمشروعك.",
        hack: "رهيب جداً في بناء النماذج الأولية (Prototypes) بدون ما تضيع وقت في الكود الروتيني.",
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
    content: {
      en: {
        name: "Gemini Advanced",
        tag: "Data Analyst",
        description:
          "Analyze huge datasets or documents for your research projects.",
        hack: "Upload your entire project repo or PDF library to get semantic answers.",
      },
      ar: {
        name: "Gemini Advanced",
        tag: "محلل البيانات",
        description: "حلل بيانات ضخمة أو ملفات كثيرة عشان تدعم أبحاث مشاريعك.",
        hack: "ارفع ملفات مشروعك كاملة أو مكتبة الـ PDF واسأله أي سؤال عن المحتوى.",
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
    content: {
      en: {
        name: "Gamma App",
        tag: "Pitch Deck Pro",
        description:
          "Create investor-ready pitch decks and websites in minutes.",
        hack: 'Use the "Web Page" mode to create a quick landing page for your idea.',
      },
      ar: {
        name: "Gamma App",
        tag: "ملعب العروض",
        description:
          "سوّي عروض تقديمية للمستثمرين (Pitch Decks) أو مواقع بسيطة بدقائق.",
        hack: 'استخدم وضع "Web Page" عشان تسوي صفحة هبوط (Landing Page) سريعة لفكرتك.',
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
    content: {
      en: {
        name: "Genspark",
        tag: "Market Researcher",
        description:
          'Generate deep market reports and competitor analysis "Sparkpages".',
        hack: "Use this to validate your startup idea against real-time market data.",
      },
      ar: {
        name: "Genspark",
        tag: "باحث السوق",
        description:
          'طلع تقارير سوقية عميقة وحلل المنافسين بصفحات "Sparkpages".',
        hack: "استخدمه عشان تتأكد من جدوى فكرة مشروعك بناءً على بيانات السوق الحالية.",
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
    website: "https://figma.com/education",
    content: {
      en: {
        name: "Figma AI",
        tag: "Product Designer",
        description:
          "Generate UI mockups for your app idea just by describing it.",
        hack: 'Use "Figma Make" to turn your prompt into a clickable prototype.',
      },
      ar: {
        name: "Figma AI",
        tag: "مصمم المنتجات",
        description: "صمم واجهات تطبيقك (UI) بمجرد وصفها بالكلام.",
        hack: 'استخدم "Figma Make" عشان تحول الوصف حقك لنموذج تجريبي قابل للنقر.',
      },
    },
    installation: {
      en: "1. Sign up for Figma Education.\n2. Create a new design file.\n3. Use AI plugins.",
      ar: "1. سجل في Figma Education.\n2. أنشئ ملف تصميم جديد.\n3. استخدم إضافات الذكاء الاصطناعي.",
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
    content: {
      en: {
        name: "UXPilot",
        tag: "UX Consultant",
        description:
          "Analyze your app screenshots for usability issues before launching.",
        hack: 'Great for getting "professional" feedback on your side project UI.',
      },
      ar: {
        name: "UXPilot",
        tag: "مستشار التجربة",
        description:
          "حلل صور تطبيقك عشان تكتشف مشاكل الاستخدام قبل ما تطلق المشروع.",
        hack: 'ممتاز جداً عشان تاخذ رأي "احترافي" في تصميم مشروعك الجانبي.',
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
    }
];
