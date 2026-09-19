import prisma from "../utils/prisma.js";

/* =========================================================
   CREATE SLUG
========================================================= */

const createSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


/* =========================================================
   GET PUBLIC SKILLS
========================================================= */

export const getSkills = async (req, res) => {
  try {
    const categories =
      await prisma.skillCategory.findMany({
        where: {
          isActive: true,
        },

        orderBy: {
          displayOrder: "asc",
        },

        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          displayOrder: true,

          skills: {
            where: {
              isActive: true,
            },

            orderBy: {
              displayOrder: "asc",
            },

            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
              proficiency: true,
              yearsExperience: true,
              isFeatured: true,
              displayOrder: true,
            },
          },
        },
      });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(
      "Get skills error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve skills.",
    });
  }
};


/* =========================================================
   CREATE SKILL
========================================================= */

export const createSkill = async (req, res) => {
  try {
    const {
      name,
      icon,
      proficiency,
      yearsExperience,
      isFeatured,
      isActive,
      displayOrder,
      categoryId,
    } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message:
          "Skill name and category are required.",
      });
    }

    const category =
      await prisma.skillCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Skill category not found.",
      });
    }

    const slug = createSlug(name);

    const existingSkill =
      await prisma.skill.findUnique({
        where: {
          slug,
        },
      });

    if (existingSkill) {
      return res.status(409).json({
        success: false,
        message:
          "A skill with this name already exists.",
      });
    }

    const numericProficiency =
      proficiency !== undefined &&
      proficiency !== null
        ? Number(proficiency)
        : null;

    if (
      numericProficiency !== null &&
      (
        Number.isNaN(numericProficiency) ||
        numericProficiency < 0 ||
        numericProficiency > 100
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Proficiency must be between 0 and 100.",
      });
    }

    const skill =
      await prisma.skill.create({
        data: {
          name: name.trim(),
          slug,

          icon:
            icon?.trim() || null,

          proficiency:
            numericProficiency,

          yearsExperience:
            yearsExperience !== undefined &&
            yearsExperience !== null
              ? Number(yearsExperience)
              : null,

          isFeatured:
            typeof isFeatured === "boolean"
              ? isFeatured
              : false,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,

          displayOrder:
            displayOrder !== undefined
              ? Number(displayOrder)
              : 0,

          categoryId,
        },

        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Skill created successfully.",
      skill,
    });
  } catch (error) {
    console.error(
      "Create skill error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create skill.",
    });
  }
};


/* =========================================================
   UPDATE SKILL
========================================================= */

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      icon,
      proficiency,
      yearsExperience,
      isFeatured,
      isActive,
      displayOrder,
      categoryId,
    } = req.body;

    const existingSkill =
      await prisma.skill.findUnique({
        where: {
          id,
        },
      });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message:
          "Skill not found.",
      });
    }

    let newCategoryId =
      existingSkill.categoryId;

    if (categoryId) {
      const category =
        await prisma.skillCategory.findUnique({
          where: {
            id: categoryId,
          },
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message:
            "Skill category not found.",
        });
      }

      newCategoryId = categoryId;
    }

    const newName =
      name?.trim() ||
      existingSkill.name;

    const newSlug =
      createSlug(newName);

    const slugConflict =
      await prisma.skill.findFirst({
        where: {
          slug: newSlug,

          NOT: {
            id,
          },
        },
      });

    if (slugConflict) {
      return res.status(409).json({
        success: false,
        message:
          "Another skill with this name already exists.",
      });
    }

    let numericProficiency =
      existingSkill.proficiency;

    if (proficiency !== undefined) {
      numericProficiency =
        proficiency === null
          ? null
          : Number(proficiency);

      if (
        numericProficiency !== null &&
        (
          Number.isNaN(
            numericProficiency
          ) ||
          numericProficiency < 0 ||
          numericProficiency > 100
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Proficiency must be between 0 and 100.",
        });
      }
    }

    const skill =
      await prisma.skill.update({
        where: {
          id,
        },

        data: {
          name: newName,
          slug: newSlug,

          icon:
            icon !== undefined
              ? icon?.trim() || null
              : existingSkill.icon,

          proficiency:
            numericProficiency,

          yearsExperience:
            yearsExperience !== undefined
              ? yearsExperience === null
                ? null
                : Number(
                    yearsExperience
                  )
              : existingSkill.yearsExperience,

          isFeatured:
            typeof isFeatured === "boolean"
              ? isFeatured
              : existingSkill.isFeatured,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : existingSkill.isActive,

          displayOrder:
            displayOrder !== undefined
              ? Number(displayOrder)
              : existingSkill.displayOrder,

          categoryId:
            newCategoryId,
        },

        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Skill updated successfully.",
      skill,
    });
  } catch (error) {
    console.error(
      "Update skill error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update skill.",
    });
  }
};


/* =========================================================
   DELETE SKILL
========================================================= */

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill =
      await prisma.skill.findUnique({
        where: {
          id,
        },

        include: {
          projects: true,
        },
      });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message:
          "Skill not found.",
      });
    }

    if (skill.projects.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "This skill is currently used by one or more projects. Remove it from those projects first.",
      });
    }

    await prisma.skill.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Skill deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete skill error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete skill.",
    });
  }
};