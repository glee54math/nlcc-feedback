import { useState, useEffect } from 'react';
import {
  getAllSnacks,
  addSnack,
  updateSnack,
  deleteSnack,
} from '../services/snackService';
import type { Snack } from '../types/snack';
import { SNACK_CATEGORIES } from '../utils/categories';

export const AdminPage = () => {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSnack, setEditingSnack] = useState<Snack | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'chips' as string,
    imageUrl: '',
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    loadSnacks();
  }, []);

  const loadSnacks = async () => {
    try {
      setLoading(true);
      const fetchedSnacks = await getAllSnacks();
      setSnacks(fetchedSnacks.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error loading snacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSnack = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // addSnack now automatically uses snack name as document ID
      const newSnackId = await addSnack({
        name: formData.name,
        category: formData.category,
        imageUrl: formData.imageUrl,
        yearsOffered: [formData.year],
      });
      
      console.log(`✅ Added snack with ID: ${newSnackId}`);
      await loadSnacks();
      resetForm();
    } catch (error) {
      console.error('Error adding snack:', error);
      alert('Failed to add snack: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleUpdateSnack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSnack) return;

    try {
      const yearsSet = new Set(editingSnack.yearsOffered);
      yearsSet.add(formData.year);

      await updateSnack(editingSnack.id, {
        name: formData.name,
        category: formData.category,
        imageUrl: formData.imageUrl,
        yearsOffered: Array.from(yearsSet),
      });
      await loadSnacks();
      resetForm();
    } catch (error) {
      console.error('Error updating snack:', error);
      alert('Failed to update snack');
    }
  };

  const handleDeleteSnack = async (snackId: string) => {
    if (!confirm('Are you sure you want to delete this snack?')) return;

    try {
      await deleteSnack(snackId);
      await loadSnacks();
    } catch (error) {
      console.error('Error deleting snack:', error);
      alert('Failed to delete snack');
    }
  };

  const handleToggleYear = async (snack: Snack, year: number) => {
    try {
      const yearsSet = new Set(snack.yearsOffered);
      if (yearsSet.has(year)) {
        yearsSet.delete(year);
      } else {
        yearsSet.add(year);
      }

      await updateSnack(snack.id, {
        yearsOffered: Array.from(yearsSet),
      });
      await loadSnacks();
    } catch (error) {
      console.error('Error toggling year:', error);
      alert('Failed to update snack');
    }
  };

  const startEdit = (snack: Snack) => {
    setEditingSnack(snack);
    setFormData({
      name: snack.name,
      category: snack.category,
      imageUrl: snack.imageUrl,
      year: new Date().getFullYear(),
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'chips',
      imageUrl: '',
      year: new Date().getFullYear(),
    });
    setShowAddForm(false);
    setEditingSnack(null);
  };

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading snacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Snack Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">
            Manage snacks for retreat feedback
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add New Snack'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingSnack ? 'Edit Snack' : 'Add New Snack'}
            </h2>
            <form
              onSubmit={editingSnack ? handleUpdateSnack : handleAddSnack}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Snack Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Doritos Nacho Cheese"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Document ID will be: {formData.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() || '(enter name)'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {SNACK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year to Add
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  {editingSnack ? 'Update Snack' : 'Add Snack'}
                </button>
                {editingSnack && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Snack
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document ID
                  </th>
                  {years.map((year) => (
                    <th
                      key={year}
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {year}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {snacks.map((snack) => (
                  <tr key={snack.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={snack.imageUrl}
                          alt={snack.name}
                          className="w-12 h-12 rounded object-cover mr-3"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {snack.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {snack.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-mono">
                      {snack.id}
                    </td>
                    {years.map((year) => (
                      <td key={year} className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleToggleYear(snack, year)}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            transition-colors mx-auto
                            ${
                              snack.yearsOffered.includes(year)
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }
                          `}
                        >
                          {snack.yearsOffered.includes(year) && (
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </button>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEdit(snack)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSnack(snack.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {snacks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No snacks added yet. Click "Add New Snack" to get started!
          </div>
        )}
      </main>
    </div>
  );
};