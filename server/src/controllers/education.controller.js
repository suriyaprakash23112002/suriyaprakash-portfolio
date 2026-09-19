import prisma from "../utils/prisma.js";

import {
  cleanText,
  parseInteger,
} from "../utils/helpers.js";

export const getEducation =
  async (req, res) => {
    try {
      const education =
        await prisma.education.findMany({
          where: {
            isVisible: true,
          },

          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              endYear: "desc",
            },
          ],
        });

      return res.status(200).json({
        success: true,
        education,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve education.",
      });
    }
  };

export const getAdminEducation =
  async (req, res) => {
    try {
      const education =
        await prisma.education.findMany({
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              endYear: "desc",
            },
          ],
        });

      return res.status(200).json({
        success: true,
        education,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve education.",
      });
    }
  };

export const createEducation =
  async (req, res) => {
    try {
      const {
        degree,
        fieldOfStudy,
        institution,
        location,
        startYear,
        endYear,
        isCurrent,
        grade,
        description,
        displayOrder,
        isVisible,
      } = req.body;

      if (
        !degree?.trim() ||
        !institution?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Degree and institution are required.",
        });
      }

      const education =
        await prisma.education.create({
          data: {
            degree:
              degree.trim(),

            fieldOfStudy:
              cleanText(
                fieldOfStudy
              ),

            institution:
              institution.trim(),

            location:
              cleanText(
                location
              ),

            startYear:
              startYear
                ? Number(
                    startYear
                  )
                : null,

            endYear:
              Boolean(
                isCurrent
              )
                ? null
                : endYear
                  ? Number(
                      endYear
                    )
                  : null,

            isCurrent:
              Boolean(
                isCurrent
              ),

            grade:
              cleanText(
                grade
              ),

            description:
              cleanText(
                description
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
          "Education created successfully.",
        education,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to create education.",
      });
    }
  };

export const updateEducation =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.education.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Education record not found.",
        });
      }

      const {
        degree,
        fieldOfStudy,
        institution,
        location,
        startYear,
        endYear,
        isCurrent,
        grade,
        description,
        displayOrder,
        isVisible,
      } = req.body;

      const current =
        typeof isCurrent ===
        "boolean"
          ? isCurrent
          : existing.isCurrent;

      const education =
        await prisma.education.update({
          where: {
            id,
          },

          data: {
            degree:
              degree?.trim() ||
              existing.degree,

            fieldOfStudy:
              fieldOfStudy !==
              undefined
                ? cleanText(
                    fieldOfStudy
                  )
                : existing.fieldOfStudy,

            institution:
              institution?.trim() ||
              existing.institution,

            location:
              location !==
              undefined
                ? cleanText(
                    location
                  )
                : existing.location,

            startYear:
              startYear !==
              undefined
                ? startYear
                  ? Number(
                      startYear
                    )
                  : null
                : existing.startYear,

            endYear:
              current
                ? null
                : endYear !==
                    undefined
                  ? endYear
                    ? Number(
                        endYear
                      )
                    : null
                  : existing.endYear,

            isCurrent:
              current,

            grade:
              grade !==
              undefined
                ? cleanText(
                    grade
                  )
                : existing.grade,

            description:
              description !==
              undefined
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
          "Education updated successfully.",
        education,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to update education.",
      });
    }
  };

export const deleteEducation =
  async (req, res) => {
    try {
      const existing =
        await prisma.education.findUnique({
          where: {
            id:
              req.params.id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Education record not found.",
        });
      }

      await prisma.education.delete({
        where: {
          id:
            req.params.id,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Education deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete education.",
      });
    }
  };