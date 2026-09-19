import prisma from "../utils/prisma.js";

import {
  slugify,
  cleanText,
  uniqueIds,
  parseDate,
  parseInteger,
} from "../utils/helpers.js";

const PROJECT_STATUSES = [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
];

const projectInclude = {
  images: {
    orderBy: {
      displayOrder: "asc",
    },
  },

  technologies: {
    include: {
      skill: {
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
        },
      },
    },
  },
};

/* =========================================================
   VALIDATE TECHNOLOGIES
========================================================= */

const validateTechnologies =
  async (technologyIds) => {
    const ids =
      uniqueIds(technologyIds);

    if (!ids.length) {
      return [];
    }

    const skills =
      await prisma.skill.findMany({
        where: {
          id: {
            in: ids,
          },
        },

        select: {
          id: true,
        },
      });

    if (
      skills.length !== ids.length
    ) {
      return null;
    }

    return ids;
  };

/* =========================================================
   NORMALIZE IMAGES
========================================================= */

const normalizeImages = (
  images = []
) => {
  if (!Array.isArray(images)) {
    return [];
  }

  return images
    .filter(
      (image) =>
        typeof image?.url ===
          "string" &&
        image.url.trim()
    )
    .map((image, index) => ({
      url: image.url.trim(),

      altText:
        cleanText(
          image.altText
        ),

      caption:
        cleanText(
          image.caption
        ),

      isCover:
        Boolean(
          image.isCover
        ),

      displayOrder:
        parseInteger(
          image.displayOrder,
          index
        ),
    }));
};

/* =========================================================
   PUBLIC PROJECTS
========================================================= */

export const getProjects =
  async (req, res) => {
    try {
      const where = {
        status: "PUBLISHED",
      };

      if (
        req.query.featured ===
        "true"
      ) {
        where.isFeatured = true;
      }

      if (
        req.query.current ===
        "true"
      ) {
        where.isCurrent = true;
      }

      const projects =
        await prisma.project.findMany({
          where,

          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              createdAt: "desc",
            },
          ],

          include:
            projectInclude,
        });

      return res.status(200).json({
        success: true,
        projects,
      });
    } catch (error) {
      console.error(
        "Get projects error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve projects.",
      });
    }
  };

/* =========================================================
   PROJECT BY SLUG
========================================================= */

export const getProjectBySlug =
  async (req, res) => {
    try {
      const project =
        await prisma.project.findFirst({
          where: {
            slug:
              req.params.slug,

            status:
              "PUBLISHED",
          },

          include:
            projectInclude,
        });

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found.",
        });
      }

      return res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      console.error(
        "Get project error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve project.",
      });
    }
  };

/* =========================================================
   ADMIN PROJECTS
========================================================= */

export const getAdminProjects =
  async (req, res) => {
    try {
      const projects =
        await prisma.project.findMany({
          orderBy: [
            {
              displayOrder: "asc",
            },
            {
              createdAt: "desc",
            },
          ],

          include:
            projectInclude,
        });

      return res.status(200).json({
        success: true,
        projects,
      });
    } catch (error) {
      console.error(
        "Admin projects error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve projects.",
      });
    }
  };

/* =========================================================
   CREATE PROJECT
========================================================= */

export const createProject =
  async (req, res) => {
    try {
      const {
        title,
        shortDescription,
        description,
        githubUrl,
        liveUrl,
        status,
        isFeatured,
        isCurrent,
        displayOrder,
        startedAt,
        completedAt,
        technologyIds,
        images,
      } = req.body;

      if (!title?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Project title is required.",
        });
      }

      const slug =
        slugify(title);

      const duplicate =
        await prisma.project.findUnique({
          where: {
            slug,
          },
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "A project with this title already exists.",
        });
      }

      const projectStatus =
        status || "DRAFT";

      if (
        !PROJECT_STATUSES.includes(
          projectStatus
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid project status.",
        });
      }

      const technologies =
        await validateTechnologies(
          technologyIds
        );

      if (technologies === null) {
        return res.status(400).json({
          success: false,
          message:
            "One or more selected technologies are invalid.",
        });
      }

      const startDate =
        parseDate(startedAt);

      const completionDate =
        parseDate(completedAt);

      if (
        startedAt &&
        !startDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid project start date.",
        });
      }

      if (
        completedAt &&
        !completionDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid project completion date.",
        });
      }

      const normalizedImages =
        normalizeImages(images);

      const project =
        await prisma.project.create({
          data: {
            title:
              title.trim(),

            slug,

            shortDescription:
              cleanText(
                shortDescription
              ),

            description:
              cleanText(
                description
              ),

            githubUrl:
              cleanText(
                githubUrl
              ),

            liveUrl:
              cleanText(
                liveUrl
              ),

            status:
              projectStatus,

            isFeatured:
              Boolean(
                isFeatured
              ),

            isCurrent:
              Boolean(
                isCurrent
              ),

            displayOrder:
              parseInteger(
                displayOrder,
                0
              ),

            startedAt:
              startDate,

            completedAt:
              completionDate,

            images: {
              create:
                normalizedImages,
            },

            technologies: {
              create:
                technologies.map(
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

          include:
            projectInclude,
        });

      return res.status(201).json({
        success: true,
        message:
          "Project created successfully.",
        project,
      });
    } catch (error) {
      console.error(
        "Create project error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to create project.",
      });
    }
  };

/* =========================================================
   UPDATE PROJECT
========================================================= */

export const updateProject =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.project.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found.",
        });
      }

      const {
        title,
        shortDescription,
        description,
        githubUrl,
        liveUrl,
        status,
        isFeatured,
        isCurrent,
        displayOrder,
        startedAt,
        completedAt,
        technologyIds,
        images,
      } = req.body;

      const newTitle =
        title?.trim() ||
        existing.title;

      const newSlug =
        slugify(newTitle);

      const duplicate =
        await prisma.project.findFirst({
          where: {
            slug:
              newSlug,

            NOT: {
              id,
            },
          },
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Another project already uses this title.",
        });
      }

      const projectStatus =
        status ||
        existing.status;

      if (
        !PROJECT_STATUSES.includes(
          projectStatus
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid project status.",
        });
      }

      let technologies = null;

      if (
        technologyIds !==
        undefined
      ) {
        technologies =
          await validateTechnologies(
            technologyIds
          );

        if (
          technologies === null
        ) {
          return res.status(400).json({
            success: false,
            message:
              "One or more selected technologies are invalid.",
          });
        }
      }

      let startDate =
        existing.startedAt;

      if (
        startedAt !==
        undefined
      ) {
        startDate =
          parseDate(
            startedAt
          );

        if (
          startedAt &&
          !startDate
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid project start date.",
          });
        }
      }

      let completionDate =
        existing.completedAt;

      if (
        completedAt !==
        undefined
      ) {
        completionDate =
          parseDate(
            completedAt
          );

        if (
          completedAt &&
          !completionDate
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid project completion date.",
          });
        }
      }

      const project =
        await prisma.$transaction(
          async (tx) => {
            await tx.project.update({
              where: {
                id,
              },

              data: {
                title:
                  newTitle,

                slug:
                  newSlug,

                shortDescription:
                  shortDescription !==
                  undefined
                    ? cleanText(
                        shortDescription
                      )
                    : existing.shortDescription,

                description:
                  description !==
                  undefined
                    ? cleanText(
                        description
                      )
                    : existing.description,

                githubUrl:
                  githubUrl !==
                  undefined
                    ? cleanText(
                        githubUrl
                      )
                    : existing.githubUrl,

                liveUrl:
                  liveUrl !==
                  undefined
                    ? cleanText(
                        liveUrl
                      )
                    : existing.liveUrl,

                status:
                  projectStatus,

                isFeatured:
                  typeof isFeatured ===
                  "boolean"
                    ? isFeatured
                    : existing.isFeatured,

                isCurrent:
                  typeof isCurrent ===
                  "boolean"
                    ? isCurrent
                    : existing.isCurrent,

                displayOrder:
                  displayOrder !==
                  undefined
                    ? parseInteger(
                        displayOrder,
                        existing.displayOrder
                      )
                    : existing.displayOrder,

                startedAt:
                  startDate,

                completedAt:
                  completionDate,
              },
            });

            if (
              technologies !== null
            ) {
              await tx.projectTechnology.deleteMany({
                where: {
                  projectId:
                    id,
                },
              });

              if (
                technologies.length
              ) {
                await tx.projectTechnology.createMany({
                  data:
                    technologies.map(
                      (
                        skillId
                      ) => ({
                        projectId:
                          id,
                        skillId,
                      })
                    ),
                });
              }
            }

            if (
              images !==
              undefined
            ) {
              const normalizedImages =
                normalizeImages(
                  images
                );

              await tx.projectImage.deleteMany({
                where: {
                  projectId:
                    id,
                },
              });

              if (
                normalizedImages.length
              ) {
                await tx.projectImage.createMany({
                  data:
                    normalizedImages.map(
                      (image) => ({
                        ...image,
                        projectId:
                          id,
                      })
                    ),
                });
              }
            }

            return tx.project.findUnique({
              where: {
                id,
              },

              include:
                projectInclude,
            });
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Project updated successfully.",
        project,
      });
    } catch (error) {
      console.error(
        "Update project error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update project.",
      });
    }
  };

/* =========================================================
   DELETE PROJECT
========================================================= */

export const deleteProject =
  async (req, res) => {
    try {
      const project =
        await prisma.project.findUnique({
          where: {
            id:
              req.params.id,
          },
        });

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found.",
        });
      }

      await prisma.project.delete({
        where: {
          id:
            req.params.id,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Project deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete project.",
      });
    }
  };