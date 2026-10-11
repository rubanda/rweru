export const quizQuestions = [
  {
    title: "What kind of business are you building for?",
    options: [
      "Services or consulting",
      "Shop or restaurant",
      "Hotel or tourism",
      "Church or community",
      "A new idea",
    ],
  },
  {
    title: "What should customers be able to do?",
    options: [
      "Learn about us and get in touch",
      "Book an appointment or stay",
      "Order and pay",
      "Sign in and manage membership",
      "Buy and sell with each other",
    ],
  },
  {
    title: "What slows your team down most?",
    options: [
      "People cannot find us online",
      "Bookings and follow-ups",
      "Orders and payment tracking",
      "Scattered member records",
      "Repeated admin work",
    ],
  },
  {
    title: "Who needs to use it?",
    options: [
      "Customers only",
      "Customers and a small team",
      "Members and administrators",
      "Multiple businesses or branches",
    ],
  },
  {
    title: "How soon do you want to start?",
    options: [
      "As soon as possible",
      "In the next 1–3 months",
      "Later this year",
      "Just exploring",
    ],
  },
] as const;

export type ProductPlan = {
  title: string;
  description: string;
  features: string[];
  firstStep: string;
  answers: string[];
};

export function validAnswers(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === quizQuestions.length &&
    value.every(
      (answer, index) =>
        Number.isInteger(answer) &&
        answer >= 0 &&
        answer < quizQuestions[index].options.length,
    )
  );
}

export function buildProductPlan(answers: number[]): ProductPlan {
  if (!validAnswers(answers))
    throw new Error("Please answer all five questions.");
  const plans = [
    {
      title: "A website that brings in enquiries",
      description:
        "Give your business a clear home online and make it easy for customers to take the next step.",
      features: [
        "Mobile-friendly service pages",
        "Enquiry form and WhatsApp link",
        "Search-friendly content",
        "Simple content management",
      ],
    },
    {
      title: "A booking website",
      description:
        "Turn interest into confirmed appointments or stays without the back-and-forth.",
      features: [
        "Services and availability",
        "Booking requests and confirmations",
        "Team booking dashboard",
        "Reminders and payment integration",
      ],
    },
    {
      title: "An online shop",
      description:
        "Let customers browse, order, and pay while your team keeps track of fulfilment.",
      features: [
        "Product catalogue",
        "Cart and checkout",
        "Payment integration",
        "Order management dashboard",
      ],
    },
    {
      title: "A member portal",
      description:
        "Bring your people, communications, and day-to-day administration into one shared space.",
      features: [
        "Member profiles and secure sign-in",
        "Events and registrations",
        "Announcements",
        "Administrator roles and reports",
      ],
    },
    {
      title: "A focused marketplace",
      description:
        "Start with one category and connect buyers and sellers through a trustworthy platform.",
      features: [
        "Buyer and seller profiles",
        "Listings and search",
        "Transaction workflow",
        "Moderation and reporting",
      ],
    },
  ];
  // The customer's desired action is the strongest signal; operations add scope.
  const base = plans[answers[1]];
  const features = [...base.features];
  if (answers[3] === 3) features.push("Branch access and permissions");
  if (answers[2] === 4) features.push("One automated admin workflow");
  return {
    ...base,
    features,
    firstStep:
      answers[4] === 3
        ? "List your three most important customer tasks. Test the idea with five potential users before building."
        : "Start with a short discovery session, agree on one core workflow, and launch a small first version.",
    answers: answers.map(
      (answer, index) =>
        `${quizQuestions[index].title} ${quizQuestions[index].options[answer]}`,
    ),
  };
}

// Owner-editable planning assumptions. Money stays hidden until approved ranges are configured.
export const estimatorConfig = {
  baseWeeks: 2,
  weeksPerPage: 0.15,
  weeksPerFeature: 0.8,
  mobileWeeks: 4,
  uncertainty: 1.5,
  pricing: null as null | {
    currency: string;
    base: number;
    perPage: number;
    perFeature: number;
    mobile: number;
    uncertainty: number;
  },
};

export const featureOptions = [
  "Bookings",
  "Payments",
  "Member accounts",
  "Admin dashboard",
  "Notifications",
  "Reports",
];

export function estimateProject(
  pages: number,
  features: number,
  mobile: boolean,
) {
  const weeks =
    estimatorConfig.baseWeeks +
    pages * estimatorConfig.weeksPerPage +
    features * estimatorConfig.weeksPerFeature +
    (mobile ? estimatorConfig.mobileWeeks : 0);
  const price = estimatorConfig.pricing;
  const amount = price
    ? price.base +
      pages * price.perPage +
      features * price.perFeature +
      (mobile ? price.mobile : 0)
    : null;
  return {
    minWeeks: Math.ceil(weeks),
    maxWeeks: Math.ceil(weeks * estimatorConfig.uncertainty),
    price:
      price && amount !== null
        ? {
            currency: price.currency,
            min: Math.round(amount),
            max: Math.round(amount * price.uncertainty),
          }
        : null,
  };
}

export function planText(plan: ProductPlan) {
  return `RWERU · Your starter product plan\n\n${plan.title}\n${plan.description}\n\nFirst version\n${plan.features.map((feature) => `• ${feature}`).join("\n")}\n\nNext step\n${plan.firstStep}\n\nYour answers\n${plan.answers.join("\n")}\n\nA starting point for discussion, not a final specification or quote.\nrweru.com/contact`;
}

export function contactHref(message: string) {
  const number = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "250793126602"
  ).replace(/\D/g, "");
  return number && /^\d{8,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `/contact?message=${encodeURIComponent(message)}`;
}
