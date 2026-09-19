import api from "./api";

export const getPortfolio =
  async () => {
    const response =
      await api.get(
        "/portfolio"
      );

    return response.data;
  };

export const getProfile =
  async () => {
    const response =
      await api.get(
        "/profile"
      );

    return response.data;
  };

export const getSkills =
  async () => {
    const response =
      await api.get(
        "/skills"
      );

    return response.data;
  };

export const getProjects =
  async () => {
    const response =
      await api.get(
        "/projects"
      );

    return response.data;
  };

export const getExperience =
  async () => {
    const response =
      await api.get(
        "/experience"
      );

    return response.data;
  };

export const getCareer =
  async () => {
    const response =
      await api.get(
        "/career"
      );

    return response.data;
  };

export const getEducation =
  async () => {
    const response =
      await api.get(
        "/education"
      );

    return response.data;
  };