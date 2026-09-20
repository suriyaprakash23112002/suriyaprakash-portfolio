import prisma from "../utils/prisma.js";

/* =========================================================
   GET PUBLIC PROFILE
========================================================= */

export const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        key: "main",
      },
      select: {
        id: true,
        fullName: true,
        headline: true,
        heroText: true,
        shortBio: true,
        longBio: true,
        location: true,
        email: true,
        phone: true,
        githubUrl: true,
        linkedinUrl: true,
        whatsappUrl: true,
        resumeUrl: true,
        profileImageUrl: true,
        heroImageUrl: true,
        availableForWork: true,
        availabilityText: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve profile.",
    });
  }
};


/* =========================================================
   UPDATE PROFILE
========================================================= */

export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      headline,
      heroText,
      shortBio,
      longBio,
      location,
      email,
      phone,
      githubUrl,
      linkedinUrl,
      whatsappUrl,
      resumeUrl,
      profileImageUrl,
      heroImageUrl,
      availableForWork,
      availabilityText,
    } = req.body;

    if (!fullName || !headline) {
      return res.status(400).json({
        success: false,
        message: "Full name and headline are required.",
      });
    }

    const profile = await prisma.profile.upsert({
      where: {
        key: "main",
      },

      update: {
        fullName: fullName.trim(),
        headline: headline.trim(),

        heroText:
          heroText?.trim() || null,

        shortBio:
          shortBio?.trim() || null,

        longBio:
          longBio?.trim() || null,

        location:
          location?.trim() || null,

        email:
          email?.trim().toLowerCase() || null,

        phone:
          phone?.trim() || null,

        githubUrl:
          githubUrl?.trim() || null,

        linkedinUrl:
          linkedinUrl?.trim() || null,

        whatsappUrl:
          whatsappUrl?.trim() || null,

        resumeUrl:
          resumeUrl?.trim() || null,

        profileImageUrl:
          profileImageUrl?.trim() || null,

        heroImageUrl:
          heroImageUrl?.trim() || null,

        availableForWork:
          typeof availableForWork === "boolean"
            ? availableForWork
            : true,

        availabilityText:
          availabilityText?.trim() || null,
      },

      create: {
        key: "main",

        fullName: fullName.trim(),
        headline: headline.trim(),

        heroText:
          heroText?.trim() || null,

        shortBio:
          shortBio?.trim() || null,

        longBio:
          longBio?.trim() || null,

        location:
          location?.trim() || null,

        email:
          email?.trim().toLowerCase() || null,

        phone:
          phone?.trim() || null,

        githubUrl:
          githubUrl?.trim() || null,

        linkedinUrl:
          linkedinUrl?.trim() || null,

        whatsappUrl:
          whatsappUrl?.trim() || null,

        resumeUrl:
          resumeUrl?.trim() || null,

        profileImageUrl:
          profileImageUrl?.trim() || null,

        heroImageUrl:
          heroImageUrl?.trim() || null,

        availableForWork:
          typeof availableForWork === "boolean"
            ? availableForWork
            : true,

        availabilityText:
          availabilityText?.trim() || null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};