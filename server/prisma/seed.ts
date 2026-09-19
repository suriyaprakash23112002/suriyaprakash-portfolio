import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

import {
  PrismaClient,
  AdminRole,
} from "../src/generated/prisma/client";

/* =========================================================
   DATABASE CONNECTION
========================================================= */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is missing in your .env file."
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

/* =========================================================
   ADMIN
========================================================= */

async function seedAdmin() {
  const adminName = process.env.ADMIN_NAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminName) {
    throw new Error(
      "ADMIN_NAME is missing in .env"
    );
  }

  if (!adminEmail) {
    throw new Error(
      "ADMIN_EMAIL is missing in .env"
    );
  }

  if (!adminPassword) {
    throw new Error(
      "ADMIN_PASSWORD is missing in .env"
    );
  }

  const hashedPassword = await bcrypt.hash(
    adminPassword,
    12
  );

  const admin =
    await prisma.adminUser.upsert({
      where: {
        email: adminEmail,
      },

      update: {
        name: adminName,
        password: hashedPassword,
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },

      create: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    });

  console.log(
    `✓ Admin created/updated: ${admin.email}`
  );
}

/* =========================================================
   PROFILE
========================================================= */

async function seedProfile() {
  const profile =
    await prisma.profile.upsert({
      where: {
        key: "main",
      },

      update: {
        fullName: "Suriyaprakash",

        headline:
          "Full-Stack Developer",

        heroText:
          "I build modern full-stack web applications from frontend interfaces to backend APIs and databases.",

        shortBio:
          "Full-Stack Developer focused on building responsive, scalable and practical web applications.",

        longBio:
          "I enjoy building complete web applications and working across frontend development, backend APIs, database design and deployment.",

        email:
          "suriyaprakashkumaran567@gmail.com",

        githubUrl:
          "https://github.com/suriyaprakash23112002",

        linkedinUrl:
          "https://www.linkedin.com/in/suriyaprakash-k-20821b352",

        availableForWork: true,

        availabilityText:
          "Available for opportunities",
      },

      create: {
        key: "main",

        fullName: "Suriyaprakash",

        headline:
          "Full-Stack Developer",

        heroText:
          "I build modern full-stack web applications from frontend interfaces to backend APIs and databases.",

        shortBio:
          "Full-Stack Developer focused on building responsive, scalable and practical web applications.",

        longBio:
          "I enjoy building complete web applications and working across frontend development, backend APIs, database design and deployment.",

        email:
          "suriyaprakashkumaran567@gmail.com",

        githubUrl:
          "https://github.com/suriyaprakash23112002",

        linkedinUrl:
          "https://www.linkedin.com/in/suriyaprakash-k-20821b352",

        availableForWork: true,

        availabilityText:
          "Available for opportunities",
      },
    });

  console.log(
    `✓ Profile created/updated: ${profile.fullName}`
  );
}

/* =========================================================
   SKILL CATEGORIES
========================================================= */

async function seedSkillCategories() {
  const categories = [
    {
      name: "Programming Languages",
      slug: "programming-languages",
      description:
        "Programming languages used for frontend, backend and application development.",
      displayOrder: 1,
    },

    {
      name: "Frontend",
      slug: "frontend",
      description:
        "Technologies used to build responsive and interactive user interfaces.",
      displayOrder: 2,
    },

    {
      name: "Backend",
      slug: "backend",
      description:
        "Server-side technologies used to build APIs and application logic.",
      displayOrder: 3,
    },

    {
      name: "Database",
      slug: "database",
      description:
        "Database technologies and ORM tools used for application data.",
      displayOrder: 4,
    },

    {
      name: "Tools & Deployment",
      slug: "tools-deployment",
      description:
        "Development, version control and deployment tools.",
      displayOrder: 5,
    },
  ];

  const categoryIds: Record<
    string,
    string
  > = {};

  for (const category of categories) {
    const savedCategory =
      await prisma.skillCategory.upsert({
        where: {
          slug: category.slug,
        },

        update: {
          name: category.name,
          description:
            category.description,
          displayOrder:
            category.displayOrder,
          isActive: true,
        },

        create: {
          name: category.name,
          slug: category.slug,
          description:
            category.description,
          displayOrder:
            category.displayOrder,
          isActive: true,
        },
      });

    categoryIds[category.slug] =
      savedCategory.id;
  }

  console.log(
    `✓ ${categories.length} skill categories created/updated`
  );

  return categoryIds;
}

/* =========================================================
   SKILLS
========================================================= */

async function seedSkills(
  categoryIds: Record<string, string>
) {
  const skills = [
    /* Programming Languages */

    {
      name: "JavaScript",
      slug: "javascript",
      icon: "javascript",
      category:
        "programming-languages",
      displayOrder: 1,
      isFeatured: true,
    },

    {
      name: "Python",
      slug: "python",
      icon: "python",
      category:
        "programming-languages",
      displayOrder: 2,
      isFeatured: true,
    },

    /* Frontend */

    {
      name: "HTML",
      slug: "html",
      icon: "html5",
      category: "frontend",
      displayOrder: 1,
      isFeatured: false,
    },

    {
      name: "CSS",
      slug: "css",
      icon: "css3",
      category: "frontend",
      displayOrder: 2,
      isFeatured: false,
    },

    {
      name: "React",
      slug: "react",
      icon: "react",
      category: "frontend",
      displayOrder: 3,
      isFeatured: true,
    },

    /* Backend */

    {
      name: "Node.js",
      slug: "nodejs",
      icon: "nodejs",
      category: "backend",
      displayOrder: 1,
      isFeatured: true,
    },

    {
      name: "Express.js",
      slug: "expressjs",
      icon: "express",
      category: "backend",
      displayOrder: 2,
      isFeatured: true,
    },

    {
      name: "REST API",
      slug: "rest-api",
      icon: "api",
      category: "backend",
      displayOrder: 3,
      isFeatured: true,
    },

    /* Database */

    {
      name: "PostgreSQL",
      slug: "postgresql",
      icon: "postgresql",
      category: "database",
      displayOrder: 1,
      isFeatured: true,
    },

    {
      name: "Prisma",
      slug: "prisma",
      icon: "prisma",
      category: "database",
      displayOrder: 2,
      isFeatured: true,
    },

    /* Tools */

    {
      name: "Git",
      slug: "git",
      icon: "git",
      category:
        "tools-deployment",
      displayOrder: 1,
      isFeatured: false,
    },

    {
      name: "GitHub",
      slug: "github",
      icon: "github",
      category:
        "tools-deployment",
      displayOrder: 2,
      isFeatured: true,
    },

    {
      name: "Vercel",
      slug: "vercel",
      icon: "vercel",
      category:
        "tools-deployment",
      displayOrder: 3,
      isFeatured: false,
    },

    {
      name: "Neon",
      slug: "neon",
      icon: "neon",
      category:
        "tools-deployment",
      displayOrder: 4,
      isFeatured: false,
    },
  ];

  for (const skill of skills) {
    const categoryId =
      categoryIds[skill.category];

    if (!categoryId) {
      throw new Error(
        `Category not found: ${skill.category}`
      );
    }

    await prisma.skill.upsert({
      where: {
        slug: skill.slug,
      },

      update: {
        name: skill.name,
        icon: skill.icon,
        categoryId,
        displayOrder:
          skill.displayOrder,
        isFeatured:
          skill.isFeatured,
        isActive: true,
      },

      create: {
        name: skill.name,
        slug: skill.slug,
        icon: skill.icon,
        categoryId,
        displayOrder:
          skill.displayOrder,
        isFeatured:
          skill.isFeatured,
        isActive: true,
      },
    });
  }

  console.log(
    `✓ ${skills.length} skills created/updated`
  );
}

/* =========================================================
   DEFAULT SITE SETTINGS
========================================================= */

async function seedSiteSettings() {
  const settings = [
    {
      key: "site_title",
      value:
        "Suriyaprakash | Full-Stack Developer",
      description:
        "Main portfolio website title",
    },

    {
      key: "site_description",
      value:
        "Full-Stack Developer portfolio of Suriyaprakash.",
      description:
        "Portfolio SEO description",
    },

    {
      key: "footer_text",
      value:
        "Designed and developed by Suriyaprakash",
      description:
        "Text displayed in the website footer",
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: {
        key: setting.key,
      },

      update: {
        value: setting.value,
        description:
          setting.description,
      },

      create: {
        key: setting.key,
        value: setting.value,
        description:
          setting.description,
      },
    });
  }

  console.log(
    `✓ ${settings.length} site settings created/updated`
  );
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  console.log("");
  console.log(
    "===================================="
  );
  console.log(
    "Starting portfolio database seed..."
  );
  console.log(
    "===================================="
  );
  console.log("");

  await seedAdmin();

  await seedProfile();

  const categoryIds =
    await seedSkillCategories();

  await seedSkills(categoryIds);

  await seedSiteSettings();

  console.log("");
  console.log(
    "===================================="
  );
  console.log(
    "Portfolio database seed completed!"
  );
  console.log(
    "===================================="
  );
  console.log("");
}

/* =========================================================
   RUN
========================================================= */

main()
  .catch((error) => {
    console.error("");
    console.error(
      "❌ Database seed failed:"
    );

    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });