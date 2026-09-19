import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSettings,
  FiTrash2,
} from "react-icons/fi";

import api from "../services/api";
import {
  AdminAlert,
  AdminEmptyState,
  AdminLoader,
  AdminModal,
  AdminPageHeader,
  AdminSaving,
} from "./AdminUI";

const emptyForm = {
  key: "",
  value: "",
  valueType: "TEXT",
  description: "",
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
      const response = await api.get("/settings/admin/all");
      setSettings(response?.data?.settings || []);
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
    setEditingKey(setting.key);
    setForm({
      key: setting.key,
      value: setting.value ?? "",
      valueType: setting.valueType || "TEXT",
      description: setting.description || "",
    });
    setModalOpen(true);
  };

  const saveSetting = async (event) => {
    event.preventDefault();

    const key = form.key.trim();
    if (!key) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await api.put(`/settings/${encodeURIComponent(editingKey || key)}`, {
        value: form.value,
        valueType: form.valueType,
        description: form.description,
      });

      if (editingKey && editingKey !== key) {
        await api.put(`/settings/${encodeURIComponent(key)}`, {
          value: form.value,
          valueType: form.valueType,
          description: form.description,
        });
        await api.delete(`/settings/${encodeURIComponent(editingKey)}`);
      }

      setMessage(editingKey ? "Setting updated successfully." : "Setting created successfully.");
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
    if (!window.confirm(`Delete setting "${setting.key}"?`)) return;

    try {
      setError("");
      setMessage("");
      await api.delete(`/settings/${encodeURIComponent(setting.key)}`);
      setMessage("Setting deleted successfully.");
      await loadSettings();
    } catch (err) {
      console.error("Setting delete error:", err);
      setError(err?.response?.data?.message || "Unable to delete setting.");
    }
  };

  if (loading) {
    return <AdminLoader label="Loading settings..." />;
  }

  return (
    <div className="admin-ui-page">
      <AdminPageHeader
        eyebrow="SITE CONFIGURATION"
        title="Settings"
        description="Manage reusable portfolio values and feature configuration."
        actions={
          <>
            <button type="button" className="admin-ui-button" onClick={loadSettings}>
              <FiRefreshCw />
              Refresh
            </button>
            <button
              type="button"
              className="admin-ui-button admin-ui-button-primary"
              onClick={openCreate}
            >
              <FiPlus />
              Add Setting
            </button>
          </>
        }
      />

      <AdminAlert type="error">{error}</AdminAlert>
      <AdminAlert type="success">{message}</AdminAlert>

      <section className="admin-ui-panel">
        <div className="admin-ui-section-title">
          <div>
            <span>CONFIGURATION</span>
            <h2>Site settings</h2>
          </div>
          <span>{settings.length} ITEMS</span>
        </div>

        {settings.length === 0 ? (
          <AdminEmptyState
            icon={<FiSettings />}
            title="No settings yet"
            description="Add a setting to manage reusable portfolio values."
          />
        ) : (
          <div className="admin-ui-table-wrap">
            <table className="admin-ui-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {settings.map((setting) => (
                  <tr key={setting.id || setting.key}>
                    <td><strong>{setting.key}</strong></td>
                    <td>{setting.value}</td>
                    <td>
                      <span className="admin-ui-badge">{setting.valueType}</span>
                    </td>
                    <td>{setting.description || "—"}</td>
                    <td>
                      <div className="admin-ui-actions">
                        <button
                          type="button"
                          className="admin-ui-icon-button"
                          onClick={() => openEdit(setting)}
                          aria-label="Edit setting"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          className="admin-ui-icon-button admin-ui-button-danger"
                          onClick={() => removeSetting(setting)}
                          aria-label="Delete setting"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="SETTING EDITOR"
        title={editingKey ? "Edit Setting" : "Add Setting"}
        footer={
          <>
            <button
              type="button"
              className="admin-ui-button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="admin-settings-form"
              className="admin-ui-button admin-ui-button-primary"
              disabled={saving}
            >
              {saving ? <AdminSaving /> : <><FiSave />Save Setting</>}
            </button>
          </>
        }
      >
        <form id="admin-settings-form" onSubmit={saveSetting}>
          <div className="admin-ui-form-grid">
            <label className="admin-ui-field admin-ui-field-full">
              <span>Key</span>
              <input
                value={form.key}
                onChange={(event) =>
                  setForm((previous) => ({ ...previous, key: event.target.value }))
                }
                required
              />
            </label>

            <label className="admin-ui-field admin-ui-field-full">
              <span>Value</span>
              <textarea
                value={form.value}
                onChange={(event) =>
                  setForm((previous) => ({ ...previous, value: event.target.value }))
                }
              />
            </label>

            <label className="admin-ui-field">
              <span>Type</span>
              <select
                value={form.valueType}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    valueType: event.target.value,
                  }))
                }
              >
                <option value="TEXT">Text</option>
                <option value="NUMBER">Number</option>
                <option value="BOOLEAN">Boolean</option>
                <option value="JSON">JSON</option>
              </select>
            </label>

            <label className="admin-ui-field">
              <span>Description</span>
              <input
                value={form.description}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
              />
            </label>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminSettings;
