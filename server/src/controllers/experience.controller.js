import prisma from "../utils/prisma.js";

import {
  cleanText,
  parseDate,
  parseInteger,
} from "../utils/helpers.js";

const EMPLOYMENT_TYPES = [
  "TRAINEE",
  "INTERNSHIP",
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "FREELANCE",
];

const normalizeStrings = (
  values
) => {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .filter(
      (value) =>
        typeof value ===
          "string" &&
        value.trim()
    )
    .map(
      (value) =>
        value.trim()
    );
};

/* =========================================================
   PUBLIC
========================================================= */

export const getExperiences =
  async (req, res) => {
    try {
      const experiences =
        await prisma.experience.findMany({
          where: {
            isVisible: true,
          },

          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              startDate: "desc",
            },
          ],

          include: {
            careerEvents: {
              where: {
                isVisible: true,
              },

              orderBy: {
                displayOrder: "asc",
              },
            },
          },
        });

      return res.status(200).json({
        success: true,
        experiences,
      });
    } catch (error) {
      console.error(
        "Get experiences error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve experience.",
      });
    }
  };

/* =========================================================
   ADMIN
========================================================= */

export const getAdminExperiences =
  async (req, res) => {
    try {
      const experiences =
        await prisma.experience.findMany({
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              startDate: "desc",
            },
          ],

          include: {
            careerEvents: true,
          },
        });

      return res.status(200).json({
        success: true,
        experiences,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve experience.",
      });
    }
  };

/* =========================================================
   CREATE
========================================================= */

export const createExperience =
  async (req, res) => {
    try {
      const {
        company,
        role,
        employmentType,
        location,
        companyUrl,
        companyLogo,
        startDate,
        endDate,
        isCurrent,
        summary,
        responsibilities,
        technologies,
        displayOrder,
        isVisible,
      } = req.body;

      if (
        !company?.trim() ||
        !role?.trim() ||
        !startDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Company, role and start date are required.",
        });
      }

      const start =
        parseDate(startDate);

      const end =
        parseDate(endDate);

      if (!start) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid start date.",
        });
      }

      if (
        endDate &&
        !end
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid end date.",
        });
      }

      const type =
        employmentType ||
        "FULL_TIME";

      if (
        !EMPLOYMENT_TYPES.includes(
          type
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid employment type.",
        });
      }

      const experience =
        await prisma.experience.create({
          data: {
            company:
              company.trim(),

            role:
              role.trim(),

            employmentType:
              type,

            location:
              cleanText(
                location
              ),

            companyUrl:
              cleanText(
                companyUrl
              ),

            companyLogo:
              cleanText(
                companyLogo
              ),

            startDate:
              start,

            endDate:
              Boolean(
                isCurrent
              )
                ? null
                : end,

            isCurrent:
              Boolean(
                isCurrent
              ),

            summary:
              cleanText(
                summary
              ),

            responsibilities:
              normalizeStrings(
                responsibilities
              ),

            technologies:
              normalizeStrings(
                technologies
              ),

            displayOrder:
              parseInteger(
                displayOrder,
                0
              ),

            isVisible:
              typeof isVisible ===
              "boolean"
                ? isVisible
                : true,
          },
        });

      return res.status(201).json({
        success: true,
        message:
          "Experience created successfully.",
        experience,
      });
    } catch (error) {
      console.error(
        "Create experience error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to create experience.",
      });
    }
  };

/* =========================================================
   UPDATE
========================================================= */

export const updateExperience =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.experience.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Experience not found.",
        });
      }

      const {
        company,
        role,
        employmentType,
        location,
        companyUrl,
        companyLogo,
        startDate,
        endDate,
        isCurrent,
        summary,
        responsibilities,
        technologies,
        displayOrder,
        isVisible,
      } = req.body;

      const type =
        employmentType ||
        existing.employmentType;

      if (
        !EMPLOYMENT_TYPES.includes(
          type
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid employment type.",
        });
      }

      let start =
        existing.startDate;

      if (
        startDate !==
        undefined
      ) {
        start =
          parseDate(
            startDate
          );

        if (!start) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid start date.",
          });
        }
      }

      let end =
        existing.endDate;

      if (
        endDate !==
        undefined
      ) {
        end =
          parseDate(
            endDate
          );

        if (
          endDate &&
          !end
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid end date.",
          });
        }
      }

      const current =
        typeof isCurrent ===
        "boolean"
          ? isCurrent
          : existing.isCurrent;

      const experience =
        await prisma.experience.update({
          where: {
            id,
          },

          data: {
            company:
              company?.trim() ||
              existing.company,

            role:
              role?.trim() ||
              existing.role,

            employmentType:
              type,

            location:
              location !==
              undefined
                ? cleanText(
                    location
                  )
                : existing.location,

            companyUrl:
              companyUrl !==
              undefined
                ? cleanText(
                    companyUrl
                  )
                : existing.companyUrl,

            companyLogo:
              companyLogo !==
              undefined
                ? cleanText(
                    companyLogo
                  )
                : existing.companyLogo,

            startDate:
              start,

            endDate:
              current
                ? null
                : end,

            isCurrent:
              current,

            summary:
              summary !==
              undefined
                ? cleanText(
                    summary
                  )
                : existing.summary,

            responsibilities:
              responsibilities !==
              undefined
                ? normalizeStrings(
                    responsibilities
                  )
                : existing.responsibilities,

            technologies:
              technologies !==
              undefined
                ? normalizeStrings(
                    technologies
                  )
                : existing.technologies,

            displayOrder:
              displayOrder !==
              undefined
                ? parseInteger(
                    displayOrder,
                    existing.displayOrder
                  )
                : existing.displayOrder,

            isVisible:
              typeof isVisible ===
              "boolean"
                ? isVisible
                : existing.isVisible,
          },
        });

      return res.status(200).json({
        success: true,
        message:
          "Experience updated successfully.",
        experience,
      });
    } catch (error) {
      console.error(
        "Update experience error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update experience.",
      });
    }
  };

/* =========================================================
   DELETE
========================================================= */

export const deleteExperience =
  async (req, res) => {
    try {
      const existing =
        await prisma.experience.findUnique({
          where: {
            id:
              req.params.id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Experience not found.",
        });
      }

      await prisma.experience.delete({
        where: {
          id:
            req.params.id,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Experience deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete experience error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete experience.",
      });
    }
  };