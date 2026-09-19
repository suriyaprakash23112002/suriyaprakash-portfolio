import prisma from "../utils/prisma.js";

import {
  cleanText,
  parseDate,
  parseInteger,
} from "../utils/helpers.js";

const EVENT_TYPES = [
  "ROLE",
  "PROMOTION",
  "PROJECT",
  "MILESTONE",
];

export const getCareerJourney =
  async (req, res) => {
    try {
      const career =
        await prisma.careerJourney.findMany({
          where: {
            isVisible: true,
          },

          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              startDate: "asc",
            },
          ],

          include: {
            experience: {
              select: {
                id: true,
                company: true,
                role: true,
              },
            },
          },
        });

      return res.status(200).json({
        success: true,
        career,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve career journey.",
      });
    }
  };

export const getAdminCareerJourney =
  async (req, res) => {
    try {
      const career =
        await prisma.careerJourney.findMany({
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              startDate: "asc",
            },
          ],

          include: {
            experience: true,
          },
        });

      return res.status(200).json({
        success: true,
        career,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve career journey.",
      });
    }
  };

export const createCareerJourney =
  async (req, res) => {
    try {
      const {
        title,
        organization,
        description,
        eventType,
        startDate,
        endDate,
        icon,
        displayOrder,
        isVisible,
        experienceId,
      } = req.body;

      if (
        !title?.trim() ||
        !startDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title and start date are required.",
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
        eventType || "ROLE";

      if (
        !EVENT_TYPES.includes(
          type
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid career event type.",
        });
      }

      if (experienceId) {
        const experience =
          await prisma.experience.findUnique({
            where: {
              id:
                experienceId,
            },
          });

        if (!experience) {
          return res.status(404).json({
            success: false,
            message:
              "Experience not found.",
          });
        }
      }

      const career =
        await prisma.careerJourney.create({
          data: {
            title:
              title.trim(),

            organization:
              cleanText(
                organization
              ),

            description:
              cleanText(
                description
              ),

            eventType:
              type,

            startDate:
              start,

            endDate:
              end,

            icon:
              cleanText(
                icon
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

            experienceId:
              experienceId ||
              null,
          },
        });

      return res.status(201).json({
        success: true,
        message:
          "Career event created successfully.",
        career,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to create career event.",
      });
    }
  };

export const updateCareerJourney =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.careerJourney.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Career event not found.",
        });
      }

      const {
        title,
        organization,
        description,
        eventType,
        startDate,
        endDate,
        icon,
        displayOrder,
        isVisible,
        experienceId,
      } = req.body;

      const type =
        eventType ||
        existing.eventType;

      if (
        !EVENT_TYPES.includes(
          type
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid career event type.",
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

      if (
        experienceId
      ) {
        const experience =
          await prisma.experience.findUnique({
            where: {
              id:
                experienceId,
            },
          });

        if (!experience) {
          return res.status(404).json({
            success: false,
            message:
              "Experience not found.",
          });
        }
      }

      const career =
        await prisma.careerJourney.update({
          where: {
            id,
          },

          data: {
            title:
              title?.trim() ||
              existing.title,

            organization:
              organization !==
              undefined
                ? cleanText(
                    organization
                  )
                : existing.organization,

            description:
              description !==
              undefined
                ? cleanText(
                    description
                  )
                : existing.description,

            eventType:
              type,

            startDate:
              start,

            endDate:
              end,

            icon:
              icon !==
              undefined
                ? cleanText(
                    icon
                  )
                : existing.icon,

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

            experienceId:
              experienceId !==
              undefined
                ? experienceId ||
                  null
                : existing.experienceId,
          },
        });

      return res.status(200).json({
        success: true,
        message:
          "Career event updated successfully.",
        career,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to update career event.",
      });
    }
  };

export const deleteCareerJourney =
  async (req, res) => {
    try {
      const existing =
        await prisma.careerJourney.findUnique({
          where: {
            id:
              req.params.id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Career event not found.",
        });
      }

      await prisma.careerJourney.delete({
        where: {
          id:
            req.params.id,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Career event deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete career event.",
      });
    }
  };