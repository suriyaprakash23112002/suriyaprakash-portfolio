import prisma from "../src/utils/prisma.js";

const TEST_PROJECT_SLUGS = [
  "ui-test-full-stack-dashboard",
  "ui-test-school-website",
];

const TEST_EXPERIENCE_COMPANY =
  "Demo Tech Studio";

const TEST_EDUCATION_INSTITUTIONS = [
  "Demo Institute of Technology",
  "Demo College of Commerce",
];

const clearTestData = async () => {
  await prisma.project.deleteMany({
    where: {
      slug: {
        in: TEST_PROJECT_SLUGS,
      },
    },
  });

  await prisma.experience.deleteMany({
    where: {
      company: TEST_EXPERIENCE_COMPANY,
    },
  });

  await prisma.education.deleteMany({
    where: {
      institution: {
        in: TEST_EDUCATION_INSTITUTIONS,
      },
    },
  });
};

const getTechnologyIds = async () => {
  const skills = await prisma.skill.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  const preferredNames = [
    "React",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Express",
    "Prisma",
    "PostgreSQL",
    "Git",
    "GitHub",
    "Vercel",
  ];

  const normalized = new Map(
    skills.map((skill) => [
      skill.name.toLowerCase().trim(),
      skill.id,
    ])
  );

  const selected = preferredNames
    .map((name) =>
      normalized.get(
        name.toLowerCase().trim()
      )
    )
    .filter(Boolean);

  if (selected.length > 0) {
    return [...new Set(selected)].slice(0, 7);
  }

  return skills
    .map((skill) => skill.id)
    .slice(0, 7);
};

const seedProjects = async () => {
  const technologyIds =
    await getTechnologyIds();

  const projects = [
    {
      title:
        "UI Test Full-Stack Dashboard",
      slug:
        "ui-test-full-stack-dashboard",
      shortDescription:
        "A responsive full-stack dashboard used to verify project cards, metadata, links and technology tags.",
      description:
        "This temporary project exists only for portfolio design testing. It helps verify long descriptions, project periods, featured styling and the full public project layout before real portfolio data is entered.",
      githubUrl:
        "https://github.com/suriyaprakash23112002",
      liveUrl:
        "https://suriyaprakash-portfolio.vercel.app",
      status:
        "PUBLISHED",
      isFeatured:
        true,
      isCurrent:
        true,
      displayOrder:
        0,
      startedAt:
        new Date("2026-07-15T00:00:00.000Z"),
      completedAt:
        null,
    },
    {
      title:
        "UI Test School Website",
      slug:
        "ui-test-school-website",
      shortDescription:
        "A second sample project used to check the compact project list and responsive spacing.",
      description:
        "Temporary test content for validating project list alignment, descriptions, action links and mobile responsiveness.",
      githubUrl:
        "https://github.com/suriyaprakash23112002",
      liveUrl:
        "https://sngacbse.netlify.app",
      status:
        "PUBLISHED",
      isFeatured:
        false,
      isCurrent:
        false,
      displayOrder:
        1,
      startedAt:
        new Date("2026-08-01T00:00:00.000Z"),
      completedAt:
        new Date("2026-09-01T00:00:00.000Z"),
    },
  ];

  for (const projectData of projects) {
    await prisma.project.create({
      data: {
        ...projectData,
        technologies: {
          create:
            technologyIds.map(
              (skillId) => ({
                skill: {
                  connect: {
                    id: skillId,
                  },
                },
              })
            ),
        },
      },
    });
  }
};

const seedExperience = async () => {
  await prisma.experience.create({
    data: {
      company:
        TEST_EXPERIENCE_COMPANY,
      role:
        "Full-Stack Developer Trainee",
      employmentType:
        "TRAINEE",
      location:
        "Bangalore, India",
      companyUrl:
        "https://example.com",
      startDate:
        new Date("2026-07-15T00:00:00.000Z"),
      endDate:
        null,
      isCurrent:
        true,
      summary:
        "Temporary experience content for checking the public experience timeline, responsive layout and current-role presentation.",
      responsibilities: [
        "Built and tested responsive admin interfaces.",
        "Connected frontend pages with REST APIs.",
        "Worked with Prisma and PostgreSQL data flows.",
        "Prepared full-stack applications for deployment.",
      ],
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "Prisma",
        "PostgreSQL",
        "Vercel",
      ],
      displayOrder:
        0,
      isVisible:
        true,
    },
  });
};

const seedEducation = async () => {
  await prisma.education.createMany({
    data: [
      {
        degree:
          "Master of Computer Applications",
        fieldOfStudy:
          "Computer Applications",
        institution:
          "Demo Institute of Technology",
        location:
          "Bangalore, India",
        startYear:
          2024,
        endYear:
          2026,
        isCurrent:
          false,
        grade:
          "UI TEST",
        description:
          "Temporary education record used to verify degree, field, institution, dates, location and result presentation.",
        displayOrder:
          0,
        isVisible:
          true,
      },
      {
        degree:
          "Bachelor of Commerce",
        fieldOfStudy:
          "Computer Applications",
        institution:
          "Demo College of Commerce",
        location:
          "Tamil Nadu, India",
        startYear:
          2021,
        endYear:
          2024,
        isCurrent:
          false,
        grade:
          "UI TEST",
        description:
          "Second temporary education record for testing multiple qualification cards and mobile responsiveness.",
        displayOrder:
          1,
        isVisible:
          true,
      },
    ],
  });
};

const main = async () => {
  const clearOnly =
    process.argv.includes("--clear");

  await clearTestData();

  if (clearOnly) {
    console.log(
      "Temporary portfolio test data cleared."
    );
    return;
  }

  await seedProjects();
  await seedExperience();
  await seedEducation();

  console.log(
    "Temporary portfolio test data created."
  );

  console.log(
    "Created: 2 projects, 1 experience, 2 education records."
  );

  console.log(
    "Remove them later with: npm run seed:test:clear"
  );
};

main()
  .catch((error) => {
    console.error(
      "Test seed failed:",
      error
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
