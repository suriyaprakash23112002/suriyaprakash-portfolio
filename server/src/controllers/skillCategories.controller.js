import prisma from "../utils/prisma.js";

import {
  slugify,
  cleanText,
  parseInteger,
} from "../utils/helpers.js";

/* =========================================================
   PUBLIC CATEGORIES
========================================================= */

export const getSkillCategories =
  async (req, res) => {
    try {
      const categories =
        await prisma.skillCategory.findMany({
          where: {
            isActive: true,
          },

          orderBy: {
            displayOrder: "asc",
          },

          include: {
            skills: {
              where: {
                isActive: true,
              },

              orderBy: {
                displayOrder: "asc",
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
        "Get skill categories error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve skill categories.",
      });
    }
  };

/* =========================================================
   ADMIN CATEGORIES
========================================================= */

export const getAdminSkillCategories =
  async (req, res) => {
    try {
      const categories =
        await prisma.skillCategory.findMany({
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              createdAt: "asc",
            },
          ],

          include: {
            _count: {
              select: {
                skills: true,
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
        "Get admin categories error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve categories.",
      });
    }
  };

/* =========================================================
   CREATE CATEGORY
========================================================= */

export const createSkillCategory =
  async (req, res) => {
    try {
      const {
        name,
        description,
        displayOrder,
        isActive,
      } = req.body;

      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Category name is required.",
        });
      }

      const slug = slugify(name);

      const existing =
        await prisma.skillCategory.findUnique({
          where: {
            slug,
          },
        });

      if (existing) {
        return res.status(409).json({
          success: false,
          message:
            "A category with this name already exists.",
        });
      }

      const category =
        await prisma.skillCategory.create({
          data: {
            name: name.trim(),
            slug,

            description:
              cleanText(description),

            displayOrder:
              parseInteger(
                displayOrder,
                0
              ),

            isActive:
              typeof isActive ===
              "boolean"
                ? isActive
                : true,
          },
        });

      return res.status(201).json({
        success: true,
        message:
          "Skill category created successfully.",
        category,
      });
    } catch (error) {
      console.error(
        "Create category error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to create category.",
      });
    }
  };

/* =========================================================
   UPDATE CATEGORY
========================================================= */

export const updateSkillCategory =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.skillCategory.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Skill category not found.",
        });
      }

      const {
        name,
        description,
        displayOrder,
        isActive,
      } = req.body;

      const newName =
        name?.trim() ||
        existing.name;

      const slug =
        slugify(newName);

      const conflict =
        await prisma.skillCategory.findFirst({
          where: {
            slug,

            NOT: {
              id,
            },
          },
        });

      if (conflict) {
        return res.status(409).json({
          success: false,
          message:
            "Another category already uses this name.",
        });
      }

      const category =
        await prisma.skillCategory.update({
          where: {
            id,
          },

          data: {
            name: newName,
            slug,

            description:
              description !== undefined
                ? cleanText(
                    description
                  )
                : existing.description,

            displayOrder:
              displayOrder !==
              undefined
                ? parseInteger(
                    displayOrder,
                    existing.displayOrder
                  )
                : existing.displayOrder,

            isActive:
              typeof isActive ===
              "boolean"
                ? isActive
                : existing.isActive,
          },
        });

      return res.status(200).json({
        success: true,
        message:
          "Skill category updated successfully.",
        category,
      });
    } catch (error) {
      console.error(
        "Update category error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update category.",
      });
    }
  };

/* =========================================================
   DELETE CATEGORY
========================================================= */

export const deleteSkillCategory =
  async (req, res) => {
    try {
      const { id } = req.params;

      const category =
        await prisma.skillCategory.findUnique({
          where: {
            id,
          },

          include: {
            _count: {
              select: {
                skills: true,
              },
            },
          },
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message:
            "Skill category not found.",
        });
      }

      if (
        category._count.skills > 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Move or delete the skills inside this category before deleting it.",
        });
      }

      await prisma.skillCategory.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Skill category deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete category error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete category.",
      });
    }
  };