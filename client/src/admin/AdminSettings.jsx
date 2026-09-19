import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSettings,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../services/api";
import "./AdminSettings.css";

const emptyForm = {
  key: "",
  value: "",
  type: "STRING",
};

const getList = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.settings)) return data.settings;
  if (Array.isArray(data?.data?.settings)) return data.data.settings;
  if (Array.isArray(data?.data)) return data.data;

  if (data?.settings && typeof data.settings === "object") {
    return Object.entries(data.settings).map(([key, value]) => ({
      key,
      value:
        typeof value === "object" && value !== null
          ? value?.value ?? JSON.stringify(value)
          : String(value ?? ""),
      type:
        typeof value === "object" && value !== null
          ? value?.type || "STRING"
          : "STRING",
    }));
  }

  return [];
};

function AdminSettings() {
  const [settings, setSettings] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingKey, setEditingKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/settings");
      setSettings(getList(response));
    } catch (err) {
      console.error("Settings load error:", err);
      setError(err?.response?.data?.message || "Unable to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const openCreate = () => {
    setEditingKey(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (setting) => {
    setEditingKey(setting?.id || setting?.key);
    setForm({
      key: setting?.key || setting?.name || "",
      value:
        typeof setting?.value === "string"
          ? setting.value
          : JSON.stringify(setting?.value ?? ""),
      type: setting?.type || setting?.valueType || "STRING",
    });
    setModalOpen(true);
  };

  const saveSetting = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingKey) {
        await api.put(`/settings/${editingKey}`, form);
      } else {
        await api.post("/settings", form);
      }

      setMessage(
        editingKey
          ? "Setting updated successfully."
          : "Setting created successfully."
      );
      setModalOpen(false);
      await loadSettings();
    } catch (err) {
      console.error("Setting save error:", err);
      setError(err?.response?.data?.message || "Unable to save setting.");
    } finally {
      setSaving(false);
    }
  };

  const removeSetting = async (setting) => {
    const identifier = setting?.id || setting?.key;
    if (!identifier) return;

    if (!window.confirm(`Delete setting "${setting.key}"?`)) return;

    try {
      await api.delete(`/settings/${identifier}`);
      setMessage("Setting deleted successfully.");
      await loadSettings();
    } catch (err) {
      console.error("Setting delete error:", err);
      setError(err?.response?.data?.message || "Unable to delete setting.");
    }
  };

  return (
    <div className="admin-settings">
      <div className="admin-settings-header">
        <div>
          <span>SITE CONFIGURATION</span>
          <h1>Settings</h1>
          <p>Manage reusable portfolio settings such as resume and contact values.</p>
        </div>

        <div className="admin-settings-actions">
          <button type="button" onClick={loadSettings}>
            <FiRefreshCw />
            Refresh
          </button>
          <button type="button" className="primary" onClick={openCreate}>
            <FiPlus />
            Add Setting
          </button>
        </div>
      </div>

      {error && <div className="admin-settings-alert error">{error}</div>}
      {message && <div className="admin-settings-alert success">{message}</div>}

      <div className="admin-settings-guide">
        <FiSettings />
        <div>
          <span>USEFUL KEYS</span>
          <p>
            Examples: email, whatsapp, resumeUrl, githubUrl, linkedinUrl,
            footerText.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="admin-settings-loading">Loading settings...</div>
      ) : (
        <div className="admin-settings-table-wrap">
          <table className="admin-settings-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Type</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {settings.map((setting, index) => (
                <tr key={setting?.id || setting?.key || index}>
                  <td>
                    <strong>{setting?.key || setting?.name}</strong>
                  </td>
                  <td>
                    <span className="admin-settings-value">
                      {typeof setting?.value === "object"
                        ? JSON.stringify(setting.value)
                        : String(setting?.value ?? "")}
                    </span>
                  </td>
                  <td>{setting?.type || setting?.valueType || "STRING"}</td>
                  <td>
                    <div className="admin-settings-row-actions">
                      <button type="button" onClick={() => openEdit(setting)}>
                        <FiEdit2 />
                      </button>
                      <button type="button" onClick={() => removeSetting(setting)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {settings.length === 0 && (
                <tr>
                  <td colSpan="4">
                    <div className="admin-settings-empty">
                      No site settings created yet.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="admin-settings-modal-backdrop">
          <form className="admin-settings-modal" onSubmit={saveSetting}>
            <div className="admin-settings-modal-header">
              <div>
                <span>SETTING EDITOR</span>
                <h2>{editingKey ? "Edit Setting" : "Add Setting"}</h2>
              </div>
              <button type="button" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <label>
              Key
              <input
                value={form.key}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    key: event.target.value,
                  }))
                }
                required
              />
            </label>

            <label>
              Value
              <textarea
                rows="5"
                value={form.value}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    value: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Type
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    type: event.target.value,
                  }))
                }
              >
                <option value="STRING">String</option>
                <option value="NUMBER">Number</option>
                <option value="BOOLEAN">Boolean</option>
                <option value="JSON">JSON</option>
              </select>
            </label>

            <div className="admin-settings-modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="primary" disabled={saving}>
                <FiSave />
                {saving ? "Saving..." : "Save Setting"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
