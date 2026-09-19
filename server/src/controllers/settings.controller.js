import prisma from "../utils/prisma.js";

import {
  cleanText,
} from "../utils/helpers.js";

const VALUE_TYPES = [
  "TEXT",
  "NUMBER",
  "BOOLEAN",
  "JSON",
];

const convertSetting = (
  setting
) => {
  switch (
    setting.valueType
  ) {
    case "NUMBER":
      return Number(
        setting.value
      );

    case "BOOLEAN":
      return (
        setting.value ===
        "true"
      );

    case "JSON":
      try {
        return JSON.parse(
          setting.value
        );
      } catch {
        return null;
      }

    default:
      return setting.value;
  }
};

export const getSettings =
  async (req, res) => {
    try {
      const settings =
        await prisma.siteSetting.findMany({
          orderBy: {
            key: "asc",
          },
        });

      const data = {};

      settings.forEach(
        (setting) => {
          data[setting.key] =
            convertSetting(
              setting
            );
        }
      );

      return res.status(200).json({
        success: true,
        settings: data,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve settings.",
      });
    }
  };

export const getAdminSettings =
  async (req, res) => {
    try {
      const settings =
        await prisma.siteSetting.findMany({
          orderBy: {
            key: "asc",
          },
        });

      return res.status(200).json({
        success: true,
        settings,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve settings.",
      });
    }
  };

export const updateSetting =
  async (req, res) => {
    try {
      const { key } =
        req.params;

      const {
        value,
        valueType,
        description,
      } = req.body;

      if (
        value === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Setting value is required.",
        });
      }

      const type =
        valueType ||
        "TEXT";

      if (
        !VALUE_TYPES.includes(
          type
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid setting value type.",
        });
      }

      let storedValue;

      if (
        type === "JSON"
      ) {
        storedValue =
          typeof value ===
          "string"
            ? value
            : JSON.stringify(
                value
              );
      } else {
        storedValue =
          String(value);
      }

      const setting =
        await prisma.siteSetting.upsert({
          where: {
            key,
          },

          update: {
            value:
              storedValue,

            valueType:
              type,

            description:
              description !==
              undefined
                ? cleanText(
                    description
                  )
                : undefined,
          },

          create: {
            key,

            value:
              storedValue,

            valueType:
              type,

            description:
              cleanText(
                description
              ),
          },
        });

      return res.status(200).json({
        success: true,
        message:
          "Setting saved successfully.",
        setting,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to save setting.",
      });
    }
  };

export const deleteSetting =
  async (req, res) => {
    try {
      const existing =
        await prisma.siteSetting.findUnique({
          where: {
            key:
              req.params.key,
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Setting not found.",
        });
      }

      await prisma.siteSetting.delete({
        where: {
          key:
            req.params.key,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Setting deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete setting.",
      });
    }
  };